// Passwords: scrypt with a random salt. Sessions: signed tokens (HMAC-SHA256), 30 days.
import { scryptSync, randomBytes, timingSafeEqual, createHmac } from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';

const SECRET = process.env.AUTH_SECRET || randomBytes(32).toString('hex');
if (!process.env.AUTH_SECRET) console.warn('[auth] AUTH_SECRET not set: sign-ins reset when the server restarts');

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}

export function checkPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const a = Buffer.from(hash, 'hex');
  const b = scryptSync(password, salt, 64);
  return a.length === b.length && timingSafeEqual(a, b);
}

const sign = (data: string) => createHmac('sha256', SECRET).update(data).digest('base64url');

export function createToken(userId: number) {
  const payload = Buffer.from(JSON.stringify({ uid: userId, exp: Date.now() + 30 * 864e5 })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function readToken(token: string): number | null {
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = sign(payload);
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  const { uid, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
  return exp > Date.now() ? uid : null;
}

export interface AuthedRequest extends Request {
  userId?: number;
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const uid = header.startsWith('Bearer ') ? readToken(header.slice(7)) : null;
  if (!uid) return res.status(401).json({ error: 'Sign in first' });
  req.userId = uid;
  next();
}
