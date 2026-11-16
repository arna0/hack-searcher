// SQLite database (Node 22.13+ built-in `node:sqlite`). File: DB_FILE (default ./data/hack-searcher.db).
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { hashPassword } from './auth';

const file = process.env.DB_FILE || path.resolve('data', 'hack-searcher.db');
fs.mkdirSync(path.dirname(file), { recursive: true });
export const db = new DatabaseSync(file);
db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  stack TEXT NOT NULL DEFAULT '',
  level TEXT NOT NULL DEFAULT 'Junior',
  bio TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  looking_for_team INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS hackathons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  starts_on TEXT NOT NULL,
  ends_on TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Online',
  prize TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  tags TEXT NOT NULL DEFAULT '',
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  hackathon_id INTEGER REFERENCES hackathons(id) ON DELETE SET NULL,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  open_roles TEXT NOT NULL DEFAULT '',
  max_size INTEGER NOT NULL DEFAULT 4,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS team_members (
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (team_id, user_id)
);
CREATE TABLE IF NOT EXISTS invites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL CHECK (kind IN ('invite', 'request')),
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  from_user INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (team_id, from_user, to_user)
);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_user INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_messages_pair ON messages (from_user, to_user, created_at);
CREATE INDEX IF NOT EXISTS idx_invites_to ON invites (to_user, status);
`);

/** Sample data on first run so a fresh install isn't empty. Demo password: demo1234 */
export function seedIfEmpty() {
  const { n } = db.prepare('SELECT COUNT(*) AS n FROM users').get() as { n: number };
  if (n > 0) return;
  const hash = hashPassword('demo1234');
  const people: [string, string, string, string, string, string][] = [
    ['Arnur', 'arnur@example.com', 'Full-stack developer', 'TypeScript, Python', 'Middle', 'NIS student. Builds AI tools and civic apps at hackathons.'],
    ['Daniyar Sadykov', 'daniyar@example.com', 'Flutter developer', 'Dart, Firebase', 'Senior', 'Flutter apps for two startups in Almaty. Likes clean state management.'],
    ['Aruzhan Bekova', 'aruzhan@example.com', 'UI/UX designer', 'Figma, Framer', 'Middle', 'Designs in Figma, tests with real users, hates lorem ipsum.'],
    ['Timur Akhmetov', 'timur@example.com', 'Backend developer', 'Go, PostgreSQL', 'Lead', 'Go backends and Postgres. Two hackathon finals in 2025.'],
    ['Inkar Seitkali', 'inkar@example.com', 'ML engineer', 'Python, PyTorch', 'Middle', 'ML student, works on recommendation models in PyTorch.'],
    ['Kenzhe Bolat', 'kenzhe@example.com', 'Blockchain developer', 'Solidity, Rust', 'Senior', 'Solana and Rust. Built two hackathon dApps on devnet.'],
  ];
  const addUser = db.prepare('INSERT INTO users (name, email, password_hash, role, stack, level, bio, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  for (const [name, email, role, stack, level, bio] of people) addUser.run(name, email, hash, role, stack, level, bio, 'Shymkent');

  const addEvent = db.prepare('INSERT INTO hackathons (title, starts_on, ends_on, location, prize, tags) VALUES (?, ?, ?, ?, ?, ?)');
  addEvent.run('Shymkent Smart City Hack', '2026-12-05', '2026-12-07', 'Shymkent', '1 500 000 ₸', 'civic,ai');
  addEvent.run('AI for Good Hackathon', '2027-01-16', '2027-01-18', 'Online', '$10,000', 'ai,education');
  addEvent.run('Solana Student Sprint', '2027-02-20', '2027-02-22', 'Almaty', '$5,000', 'web3');

  const team = db.prepare('INSERT INTO teams (name, description, hackathon_id, owner_id, open_roles) VALUES (?, ?, ?, ?, ?)')
    .run('City Pulse', 'Residents rate city problems; the city hall sees what to fix first.', 1, 1, 'Designer,Mobile developer');
  db.prepare('INSERT INTO team_members (team_id, user_id, role) VALUES (?, ?, ?)').run(Number(team.lastInsertRowid), 1, 'Full-stack developer');
  console.log('[db] seeded sample users (password demo1234), hackathons and a team');
}
