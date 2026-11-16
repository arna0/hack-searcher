// Talks to the Hack Searcher server when one is running (same origin, or VITE_API_URL).
// On GitHub Pages there is no server, so the app keeps its sample data.
const BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';
const TOKEN_KEY = 'hs_token';

export interface ApiPerson {
  id: number;
  name: string;
  role: string;
  stack: string;
  level: string;
  bio: string;
  city?: string;
  email?: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  hackathon: string | null;
  owner_id: number;
  size: number;
  max_size: number;
  openRoles: string[];
  members: { id: number; name: string; role: string }[];
}

export interface Invite {
  id: number;
  kind: 'invite' | 'request';
  team_id: number;
  team: string;
  from_user: number;
  fromName: string;
  to_user: number;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Hackathon {
  id: number;
  title: string;
  starts_on: string;
}

let token: string | null = null;
try {
  token = localStorage.getItem(TOKEN_KEY);
} catch {
  /* storage blocked */
}

function setToken(next: string | null) {
  token = next;
  try {
    if (next) localStorage.setItem(TOKEN_KEY, next);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage blocked */
  }
}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
  const body = res.status === 204 ? null : await res.json().catch(() => null);
  if (res.status === 401 && token && path !== '/api/auth/login') setToken(null);
  if (!res.ok) throw new Error((body && body.error) || `Request failed (${res.status})`);
  return body as T;
}

const post = <T>(path: string, data: unknown = {}) => call<T>(path, { method: 'POST', body: JSON.stringify(data) });

export async function apiOnline(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/api/health`, { signal: AbortSignal.timeout(3000) });
    return res.ok && (await res.json()).ok === true;
  } catch {
    return false;
  }
}

export const hasSession = () => Boolean(token);

export async function signIn(email: string, password: string) {
  const r = await post<{ token: string; user: ApiPerson }>('/api/auth/login', { email, password });
  setToken(r.token);
  return r.user;
}

export async function signUp(data: { name: string; email: string; password: string; role: string; stack: string }) {
  const r = await post<{ token: string; user: ApiPerson }>('/api/auth/register', data);
  setToken(r.token);
  return r.user;
}

export const signOut = () => setToken(null);
export const fetchMe = () => call<ApiPerson>('/api/me');
export const fetchPeople = () => call<ApiPerson[]>('/api/people');
export const fetchTeams = () => call<Team[]>('/api/teams');
export const fetchHackathons = () => call<Hackathon[]>('/api/hackathons');
export const fetchInvites = () => call<Invite[]>('/api/invites');
export const createTeam = (data: { name: string; description: string; hackathonId?: number; openRoles: string[] }) => post<Team>('/api/teams', data);
export const askToJoin = (teamId: number, message = '') => post<Invite>(`/api/teams/${teamId}/join`, { message });
export const invitePerson = (teamId: number, userId: number) => post<Invite>(`/api/teams/${teamId}/invite`, { userId });
export const answerInvite = (id: number, answer: 'accept' | 'decline') => post<Invite>(`/api/invites/${id}/${answer}`);
