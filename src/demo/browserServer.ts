// In-browser version of the Hack Searcher API for the GitHub Pages demo.
// Same endpoints and response shapes as server/index.ts; data lives in this browser's
// localStorage, so every visitor gets their own copy and it survives reloads.
// Passwords are hashed with PBKDF2 (Web Crypto) even here.

type Row = Record<string, any>;
interface DB {
  users: Row[];
  hackathons: Row[];
  teams: Row[];
  members: { team_id: number; user_id: number; role: string }[];
  invites: Row[];
  messages: Row[];
  sessions: Record<string, number>;
  seq: number;
}

const KEY = 'hs_demo_db_v1';
export const DEMO_PASSWORD = 'demo1234';
const now = () => new Date().toISOString();
const today = () => new Date().toISOString().slice(0, 10);

async function hash(password: string, salt = crypto.randomUUID()) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 100_000, hash: 'SHA-256' }, key, 256);
  return `${salt}:${btoa(String.fromCharCode(...new Uint8Array(bits)))}`;
}
const check = async (password: string, stored: string) => (await hash(password, stored.split(':')[0])) === stored;

async function seed(): Promise<DB> {
  const db: DB = { users: [], hackathons: [], teams: [], members: [], invites: [], messages: [], sessions: {}, seq: 0 };
  const pw = await hash(DEMO_PASSWORD);
  const people = [
    ['Arnur', 'arnur@example.com', 'Full-stack developer', 'TypeScript, Python', 'Middle', 'NIS student. Builds AI tools and civic apps at hackathons.'],
    ['Daniyar Sadykov', 'daniyar@example.com', 'Flutter developer', 'Dart, Firebase', 'Senior', 'Flutter apps for two startups in Almaty. Likes clean state management.'],
    ['Aruzhan Bekova', 'aruzhan@example.com', 'UI/UX designer', 'Figma, Framer', 'Middle', 'Designs in Figma, tests with real users, hates lorem ipsum.'],
    ['Timur Akhmetov', 'timur@example.com', 'Backend developer', 'Go, PostgreSQL', 'Lead', 'Go backends and Postgres. Two hackathon finals in 2025.'],
    ['Inkar Seitkali', 'inkar@example.com', 'ML engineer', 'Python, PyTorch', 'Middle', 'ML student, works on recommendation models in PyTorch.'],
    ['Kenzhe Bolat', 'kenzhe@example.com', 'Blockchain developer', 'Solidity, Rust', 'Senior', 'Solana and Rust. Built two hackathon dApps on devnet.'],
  ];
  people.forEach(([name, email, role, stack, level, bio], i) =>
    db.users.push({ id: ++db.seq, name, email, password_hash: pw, role, stack, level, bio, city: 'Shymkent', looking_for_team: 1, created_at: `2026-11-0${i + 1}T10:00:00.000Z` }),
  );
  const events = [
    ['Shymkent Smart City Hack', '2026-12-05', '2026-12-07', 'Shymkent', '1 500 000 ₸', 'civic,ai'],
    ['AI for Good Hackathon', '2027-01-16', '2027-01-18', 'Online', '$10,000', 'ai,education'],
    ['Solana Student Sprint', '2027-02-20', '2027-02-22', 'Almaty', '$5,000', 'web3'],
  ];
  for (const [title, starts_on, ends_on, location, prize, tags] of events)
    db.hackathons.push({ id: ++db.seq, title, starts_on, ends_on, location, prize, url: '', tags, created_by: null });
  const team = { id: ++db.seq, name: 'City Pulse', description: 'Residents rate city problems; the city hall sees what to fix first.', hackathon_id: db.hackathons[0].id, owner_id: 1, open_roles: 'Designer,Mobile developer', max_size: 4, created_at: now() };
  db.teams.push(team);
  db.members.push({ team_id: team.id, user_id: 1, role: 'Full-stack developer' });
  return db;
}

let db: DB;
const save = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch {
    /* storage full or blocked: keep working in memory */
  }
};
async function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return (db = JSON.parse(raw));
  } catch {
    /* fall through to seed */
  }
  db = await seed();
  save();
}
export async function resetDemo() {
  db = await seed();
  save();
}

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
const fail = (status: number, message: string): never => {
  throw new HttpError(status, message);
};
const text = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const pub = (u: Row) => ({ id: u.id, name: u.name, role: u.role, stack: u.stack, level: u.level, bio: u.bio, city: u.city, lookingForTeam: u.looking_for_team, createdAt: u.created_at });
const userById = (id: number) => db.users.find((u) => u.id === id);
const teamView = (t: Row) => {
  const members = db.members.filter((m) => m.team_id === t.id).map((m) => ({ id: m.user_id, name: userById(m.user_id)?.name ?? '?', role: m.role }));
  return { ...t, hackathon: db.hackathons.find((h) => h.id === t.hackathon_id)?.title ?? null, size: members.length, members, openRoles: String(t.open_roles).split(',').filter(Boolean) };
};
const inviteView = (i: Row) => ({ ...i, team: db.teams.find((t) => t.id === i.team_id)?.name, fromName: userById(i.from_user)?.name });

function auth(headers: Headers) {
  const h = headers.get('Authorization') || '';
  const uid = h.startsWith('Bearer ') ? db.sessions[h.slice(7)] : undefined;
  if (!uid || !userById(uid)) fail(401, 'Sign in first');
  return uid!;
}
const session = (uid: number) => {
  const token = crypto.randomUUID();
  db.sessions[token] = uid;
  return token;
};

async function handle(method: string, path: string, query: URLSearchParams, body: Row, headers: Headers): Promise<[number, unknown]> {
  const seg = path.split('/').filter(Boolean); // e.g. ['teams', '3', 'invite']
  const route = `${method} /${seg.map((s) => (/^\d+$/.test(s) ? ':id' : s)).join('/')}`;
  const id = Number(seg.find((s) => /^\d+$/.test(s)));

  switch (route) {
    case 'GET /health':
      return [200, { ok: true, demo: 'browser' }];

    case 'POST /auth/register': {
      const name = text(body.name, 80);
      const email = text(body.email, 120).toLowerCase();
      if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) fail(400, 'Enter your name and a valid email');
      if (String(body.password || '').length < 8) fail(400, 'Password must be at least 8 characters');
      if (db.users.some((u) => u.email === email)) fail(409, 'This email is already registered');
      const user = { id: ++db.seq, name, email, password_hash: await hash(body.password), role: text(body.role, 80), stack: text(body.stack, 200), level: text(body.level, 30) || 'Junior', bio: text(body.bio), city: text(body.city, 80), looking_for_team: 1, created_at: now() };
      db.users.push(user);
      return [201, { token: session(user.id), user: pub(user) }];
    }
    case 'POST /auth/login': {
      const user = db.users.find((u) => u.email === text(body.email, 120).toLowerCase());
      if (!user || !(await check(String(body.password || ''), user.password_hash))) fail(401, 'Wrong email or password');
      return [200, { token: session(user!.id), user: pub(user!) }];
    }
    case 'GET /me': {
      const u = userById(auth(headers))!;
      return [200, { ...pub(u), email: u.email }];
    }
    case 'PATCH /me': {
      const u = userById(auth(headers))!;
      for (const f of ['name', 'role', 'stack', 'level', 'bio', 'city']) if (f in body) u[f] = text(body[f]);
      if ('lookingForTeam' in body) u.looking_for_team = body.lookingForTeam ? 1 : 0;
      return [200, { ...pub(u), email: u.email }];
    }

    case 'GET /people': {
      const q = text(query.get('q'), 80).toLowerCase();
      const role = text(query.get('role'), 40).toLowerCase();
      return [200, db.users
        .filter((u) => u.looking_for_team && `${u.name} ${u.role} ${u.stack}`.toLowerCase().includes(q) && `${u.role} ${u.stack}`.toLowerCase().includes(role))
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .map(pub)];
    }
    case 'GET /people/:id':
      return userById(id) ? [200, pub(userById(id)!)] : fail(404, 'Not found');

    case 'GET /hackathons':
      return [200, [...db.hackathons].sort((a, b) => a.starts_on.localeCompare(b.starts_on)).map((h) => ({ ...h, status: h.ends_on < today() ? 'past' : 'upcoming' }))];
    case 'POST /hackathons': {
      const uid = auth(headers);
      const title = text(body.title, 120);
      const starts = text(body.startsOn, 10);
      if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(starts)) fail(400, 'Title and start date (YYYY-MM-DD) are required');
      const h = { id: ++db.seq, title, starts_on: starts, ends_on: text(body.endsOn, 10) || starts, location: text(body.location, 80) || 'Online', prize: text(body.prize, 40), url: text(body.url, 300), tags: text(body.tags, 120), created_by: uid };
      db.hackathons.push(h);
      return [201, h];
    }

    case 'GET /teams':
      return [200, [...db.teams].reverse().map(teamView)];
    case 'GET /teams/:id': {
      const t = db.teams.find((x) => x.id === id);
      return t ? [200, teamView(t)] : fail(404, 'Not found');
    }
    case 'POST /teams': {
      const uid = auth(headers);
      const name = text(body.name, 80);
      if (!name) fail(400, 'Team name is required');
      const roles = Array.isArray(body.openRoles) ? body.openRoles.map((r: unknown) => text(r, 40)).filter(Boolean).join(',') : '';
      const t = { id: ++db.seq, name, description: text(body.description, 1000), hackathon_id: Number(body.hackathonId) || null, owner_id: uid, open_roles: roles, max_size: Math.min(10, Math.max(2, Number(body.maxSize) || 4)), created_at: now() };
      db.teams.push(t);
      db.members.push({ team_id: t.id, user_id: uid, role: 'Owner' });
      return [201, teamView(t)];
    }
    case 'POST /teams/:id/invite':
    case 'POST /teams/:id/join': {
      const uid = auth(headers);
      const t = db.teams.find((x) => x.id === id) ?? fail(404, 'Team not found');
      const isInvite = seg[2] === 'invite';
      if (isInvite && t.owner_id !== uid) fail(403, 'Only the team owner can invite');
      const from = uid;
      const to = isInvite ? Number(body.userId) : t.owner_id;
      const member = isInvite ? to : uid;
      if (!userById(to)) fail(404, 'Person not found');
      if (db.members.some((m) => m.team_id === t.id && m.user_id === member)) fail(409, isInvite ? 'Already in the team' : 'You are already in this team');
      if (db.invites.some((i) => i.team_id === t.id && i.from_user === from && i.to_user === to)) fail(409, isInvite ? 'Already invited' : 'Request already sent');
      const inv = { id: ++db.seq, kind: isInvite ? 'invite' : 'request', team_id: t.id, from_user: from, to_user: to, message: text(body.message), status: 'pending', created_at: now() };
      db.invites.push(inv);
      return [201, inv];
    }
    case 'GET /invites': {
      const uid = auth(headers);
      return [200, db.invites.filter((i) => i.to_user === uid || i.from_user === uid).reverse().map(inviteView)];
    }
    case 'POST /invites/:id/accept':
    case 'POST /invites/:id/decline': {
      const uid = auth(headers);
      const inv = db.invites.find((i) => i.id === id);
      if (!inv || inv.to_user !== uid) fail(404, 'Invite not found');
      if (inv!.status !== 'pending') fail(409, 'Already answered');
      inv!.status = seg[2] === 'accept' ? 'accepted' : 'declined';
      if (inv!.status === 'accepted') {
        const member = inv!.kind === 'invite' ? inv!.to_user : inv!.from_user;
        if (!db.members.some((m) => m.team_id === inv!.team_id && m.user_id === member)) db.members.push({ team_id: inv!.team_id, user_id: member, role: '' });
      }
      return [200, inv];
    }

    case 'GET /conversations': {
      const uid = auth(headers);
      const latest = new Map<number, Row>();
      for (const m of db.messages) if (m.from_user === uid || m.to_user === uid) latest.set(m.from_user === uid ? m.to_user : m.from_user, m);
      return [200, [...latest.entries()].reverse().map(([other, m]) => ({ id: other, name: userById(other)?.name, lastMessage: m.text, at: m.created_at, unread: db.messages.filter((x) => x.from_user === other && x.to_user === uid && !x.read).length }))];
    }
    case 'GET /messages/:id': {
      const uid = auth(headers);
      const thread = db.messages.filter((m) => (m.from_user === uid && m.to_user === id) || (m.from_user === id && m.to_user === uid));
      thread.forEach((m) => m.to_user === uid && (m.read = 1));
      return [200, thread];
    }
    case 'POST /messages': {
      const uid = auth(headers);
      const to = Number(body.toUserId);
      const t = text(body.text, 2000);
      if (!t) fail(400, 'Message is empty');
      if (to === uid || !userById(to)) fail(404, 'Recipient not found');
      const m = { id: ++db.seq, from_user: uid, to_user: to, text: t, read: 0, created_at: now() };
      db.messages.push(m);
      return [201, m];
    }
  }
  return fail(404, `No route for ${method} /api${path}`);
}

export async function installBrowserServer() {
  await load();
  const realFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url, location.href);
    const m = url.origin === location.origin ? url.pathname.match(/\/api(\/.*)$/) : null;
    if (!m) return realFetch(input, init);
    const method = (init?.method || 'GET').toUpperCase();
    let body: Row = {};
    if (typeof init?.body === 'string') {
      try {
        body = JSON.parse(init.body);
      } catch {
        /* empty */
      }
    }
    try {
      const [status, data] = await handle(method, m[1].replace(/\/$/, ''), url.searchParams, body, new Headers(init?.headers));
      if (method !== 'GET' || m[1].startsWith('/messages') || m[1].startsWith('/me')) save();
      return new Response(status === 204 ? null : JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
      const status = err instanceof HttpError ? err.status : 500;
      return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Error' }), { status, headers: { 'Content-Type': 'application/json' } });
    }
  };
}
