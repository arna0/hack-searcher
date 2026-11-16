// Hack Searcher API. Run: npm start (serves the built app too). Port: PORT (default 8080).
import 'dotenv/config';
import express, { type Response } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { db, seedIfEmpty } from './db';
import { checkPassword, createToken, hashPassword, requireAuth, type AuthedRequest } from './auth';

seedIfEmpty();
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const PUBLIC_USER = 'id, name, role, stack, level, bio, city, looking_for_team AS lookingForTeam, created_at AS createdAt';
const bad = (res: Response, msg: string, code = 400) => res.status(code).json({ error: msg });
const text = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// ---------- accounts ----------
app.post('/api/auth/register', (req, res) => {
  const name = text(req.body.name, 80);
  const email = text(req.body.email, 120).toLowerCase();
  const password = typeof req.body.password === 'string' ? req.body.password : '';
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return bad(res, 'Enter your name and a valid email');
  if (password.length < 8) return bad(res, 'Password must be at least 8 characters');
  if (db.prepare('SELECT 1 FROM users WHERE email = ?').get(email)) return bad(res, 'This email is already registered', 409);
  const r = db
    .prepare('INSERT INTO users (name, email, password_hash, role, stack, level, bio, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run(name, email, hashPassword(password), text(req.body.role, 80), text(req.body.stack, 200), text(req.body.level, 30) || 'Junior', text(req.body.bio), text(req.body.city, 80));
  const id = Number(r.lastInsertRowid);
  res.status(201).json({ token: createToken(id), user: db.prepare(`SELECT ${PUBLIC_USER} FROM users WHERE id = ?`).get(id) });
});

app.post('/api/auth/login', (req, res) => {
  const row = db.prepare('SELECT id, password_hash FROM users WHERE email = ?').get(text(req.body.email, 120).toLowerCase()) as
    | { id: number; password_hash: string }
    | undefined;
  if (!row || !checkPassword(String(req.body.password || ''), row.password_hash)) return bad(res, 'Wrong email or password', 401);
  res.json({ token: createToken(row.id), user: db.prepare(`SELECT ${PUBLIC_USER} FROM users WHERE id = ?`).get(row.id) });
});

app.get('/api/me', requireAuth, (req: AuthedRequest, res) => {
  res.json(db.prepare(`SELECT ${PUBLIC_USER}, email FROM users WHERE id = ?`).get(req.userId!));
});

app.patch('/api/me', requireAuth, (req: AuthedRequest, res) => {
  const fields = ['name', 'role', 'stack', 'level', 'bio', 'city'] as const;
  for (const f of fields) if (f in req.body) db.prepare(`UPDATE users SET ${f} = ? WHERE id = ?`).run(text(req.body[f]), req.userId!);
  if ('lookingForTeam' in req.body) db.prepare('UPDATE users SET looking_for_team = ? WHERE id = ?').run(req.body.lookingForTeam ? 1 : 0, req.userId!);
  res.json(db.prepare(`SELECT ${PUBLIC_USER}, email FROM users WHERE id = ?`).get(req.userId!));
});

// ---------- people ----------
app.get('/api/people', (req, res) => {
  const q = `%${text(req.query.q, 80).toLowerCase()}%`;
  const role = `%${text(req.query.role, 40).toLowerCase()}%`;
  res.json(
    db
      .prepare(
        `SELECT ${PUBLIC_USER} FROM users
         WHERE looking_for_team = 1 AND lower(name || ' ' || role || ' ' || stack) LIKE ? AND lower(role || ' ' || stack) LIKE ?
         ORDER BY created_at DESC LIMIT 100`,
      )
      .all(q, role),
  );
});
app.get('/api/people/:id', (req, res) => {
  const user = db.prepare(`SELECT ${PUBLIC_USER} FROM users WHERE id = ?`).get(Number(req.params.id));
  return user ? res.json(user) : bad(res, 'Not found', 404);
});

// ---------- hackathons ----------
app.get('/api/hackathons', (_req, res) => {
  res.json(db.prepare("SELECT *, CASE WHEN ends_on < date('now') THEN 'past' ELSE 'upcoming' END AS status FROM hackathons ORDER BY starts_on").all());
});
app.post('/api/hackathons', requireAuth, (req: AuthedRequest, res) => {
  const title = text(req.body.title, 120);
  const starts = text(req.body.startsOn, 10);
  const ends = text(req.body.endsOn, 10) || starts;
  if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(starts)) return bad(res, 'Title and start date (YYYY-MM-DD) are required');
  const r = db
    .prepare('INSERT INTO hackathons (title, starts_on, ends_on, location, prize, url, tags, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run(title, starts, ends, text(req.body.location, 80) || 'Online', text(req.body.prize, 40), text(req.body.url, 300), text(req.body.tags, 120), req.userId!);
  res.status(201).json(db.prepare('SELECT * FROM hackathons WHERE id = ?').get(Number(r.lastInsertRowid)));
});

// ---------- teams ----------
const teamQuery = `SELECT t.*, h.title AS hackathon,
  (SELECT COUNT(*) FROM team_members m WHERE m.team_id = t.id) AS size,
  (SELECT json_group_array(json_object('id', u.id, 'name', u.name, 'role', m.role))
     FROM team_members m JOIN users u ON u.id = m.user_id WHERE m.team_id = t.id) AS members
  FROM teams t LEFT JOIN hackathons h ON h.id = t.hackathon_id`;
const withMembers = (row: any) => row && { ...row, members: JSON.parse(row.members), openRoles: row.open_roles.split(',').filter(Boolean) };

app.get('/api/teams', (_req, res) => res.json((db.prepare(`${teamQuery} ORDER BY t.created_at DESC`).all() as any[]).map(withMembers)));
app.get('/api/teams/:id', (req, res) => {
  const team = withMembers(db.prepare(`${teamQuery} WHERE t.id = ?`).get(Number(req.params.id)));
  return team ? res.json(team) : bad(res, 'Not found', 404);
});
app.post('/api/teams', requireAuth, (req: AuthedRequest, res) => {
  const name = text(req.body.name, 80);
  if (!name) return bad(res, 'Team name is required');
  const roles = Array.isArray(req.body.openRoles) ? req.body.openRoles.map((r: unknown) => text(r, 40)).filter(Boolean).join(',') : '';
  const r = db
    .prepare('INSERT INTO teams (name, description, hackathon_id, owner_id, open_roles, max_size) VALUES (?, ?, ?, ?, ?, ?)')
    .run(name, text(req.body.description, 1000), Number(req.body.hackathonId) || null, req.userId!, roles, Math.min(10, Math.max(2, Number(req.body.maxSize) || 4)));
  const teamId = Number(r.lastInsertRowid);
  db.prepare('INSERT INTO team_members (team_id, user_id, role) VALUES (?, ?, ?)').run(teamId, req.userId!, 'Owner');
  res.status(201).json(withMembers(db.prepare(`${teamQuery} WHERE t.id = ?`).get(teamId)));
});

// ---------- invites and join requests ----------
// invite: team owner -> person. request: person -> team owner. Accepting adds the person to the team.
app.post('/api/teams/:id/invite', requireAuth, (req: AuthedRequest, res) => {
  const team = db.prepare('SELECT * FROM teams WHERE id = ?').get(Number(req.params.id)) as any;
  if (!team) return bad(res, 'Team not found', 404);
  if (team.owner_id !== req.userId) return bad(res, 'Only the team owner can invite', 403);
  const to = Number(req.body.userId);
  if (!db.prepare('SELECT 1 FROM users WHERE id = ?').get(to)) return bad(res, 'Person not found', 404);
  if (db.prepare('SELECT 1 FROM team_members WHERE team_id = ? AND user_id = ?').get(team.id, to)) return bad(res, 'Already in the team', 409);
  try {
    const r = db.prepare("INSERT INTO invites (kind, team_id, from_user, to_user, message) VALUES ('invite', ?, ?, ?, ?)").run(team.id, req.userId!, to, text(req.body.message));
    res.status(201).json(db.prepare('SELECT * FROM invites WHERE id = ?').get(Number(r.lastInsertRowid)));
  } catch {
    bad(res, 'Already invited', 409);
  }
});
app.post('/api/teams/:id/join', requireAuth, (req: AuthedRequest, res) => {
  const team = db.prepare('SELECT * FROM teams WHERE id = ?').get(Number(req.params.id)) as any;
  if (!team) return bad(res, 'Team not found', 404);
  if (db.prepare('SELECT 1 FROM team_members WHERE team_id = ? AND user_id = ?').get(team.id, req.userId!)) return bad(res, 'You are already in this team', 409);
  try {
    const r = db.prepare("INSERT INTO invites (kind, team_id, from_user, to_user, message) VALUES ('request', ?, ?, ?, ?)").run(team.id, req.userId!, team.owner_id, text(req.body.message));
    res.status(201).json(db.prepare('SELECT * FROM invites WHERE id = ?').get(Number(r.lastInsertRowid)));
  } catch {
    bad(res, 'Request already sent', 409);
  }
});
app.get('/api/invites', requireAuth, (req: AuthedRequest, res) => {
  res.json(
    db
      .prepare(
        `SELECT i.*, t.name AS team, f.name AS fromName FROM invites i
         JOIN teams t ON t.id = i.team_id JOIN users f ON f.id = i.from_user
         WHERE i.to_user = ? OR i.from_user = ? ORDER BY i.created_at DESC`,
      )
      .all(req.userId!, req.userId!),
  );
});
app.post('/api/invites/:id/:answer', requireAuth, (req: AuthedRequest, res) => {
  const answer = req.params.answer;
  if (answer !== 'accept' && answer !== 'decline') return bad(res, 'Use accept or decline', 404);
  const inv = db.prepare('SELECT * FROM invites WHERE id = ?').get(Number(req.params.id)) as any;
  if (!inv || inv.to_user !== req.userId) return bad(res, 'Invite not found', 404);
  if (inv.status !== 'pending') return bad(res, 'Already answered', 409);
  const status = answer === 'accept' ? 'accepted' : 'declined';
  db.prepare('UPDATE invites SET status = ? WHERE id = ?').run(status, inv.id);
  if (status === 'accepted') {
    const member = inv.kind === 'invite' ? inv.to_user : inv.from_user;
    db.prepare('INSERT OR IGNORE INTO team_members (team_id, user_id) VALUES (?, ?)').run(inv.team_id, member);
  }
  res.json({ ...inv, status });
});

// ---------- messages ----------
app.get('/api/conversations', requireAuth, (req: AuthedRequest, res) => {
  res.json(
    db
      .prepare(
        `SELECT u.id, u.name, m.text AS lastMessage, m.created_at AS at,
           (SELECT COUNT(*) FROM messages x WHERE x.from_user = u.id AND x.to_user = ? AND x.read = 0) AS unread
         FROM messages m JOIN users u ON u.id = CASE WHEN m.from_user = ? THEN m.to_user ELSE m.from_user END
         WHERE m.id IN (SELECT MAX(id) FROM messages WHERE from_user = ? OR to_user = ?
                        GROUP BY CASE WHEN from_user = ? THEN to_user ELSE from_user END)
         ORDER BY m.id DESC`,
      )
      .all(req.userId!, req.userId!, req.userId!, req.userId!, req.userId!),
  );
});
app.get('/api/messages/:userId', requireAuth, (req: AuthedRequest, res) => {
  const other = Number(req.params.userId);
  db.prepare('UPDATE messages SET read = 1 WHERE from_user = ? AND to_user = ?').run(other, req.userId!);
  res.json(
    db
      .prepare('SELECT * FROM messages WHERE (from_user = ? AND to_user = ?) OR (from_user = ? AND to_user = ?) ORDER BY id LIMIT 500')
      .all(req.userId!, other, other, req.userId!),
  );
});
app.post('/api/messages', requireAuth, (req: AuthedRequest, res) => {
  const to = Number(req.body.toUserId);
  const body = text(req.body.text, 2000);
  if (!body) return bad(res, 'Message is empty');
  if (to === req.userId || !db.prepare('SELECT 1 FROM users WHERE id = ?').get(to)) return bad(res, 'Recipient not found', 404);
  const r = db.prepare('INSERT INTO messages (from_user, to_user, text) VALUES (?, ?, ?)').run(req.userId!, to, body);
  res.status(201).json(db.prepare('SELECT * FROM messages WHERE id = ?').get(Number(r.lastInsertRowid)));
});

// ---------- the app ----------
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

const PORT = Number(process.env.PORT || 8080);
app.listen(PORT, () => console.log(`Hack Searcher API on http://localhost:${PORT}`));
