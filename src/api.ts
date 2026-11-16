// Talks to the Hack Searcher server when one is running (same origin, or VITE_API_URL).
// On GitHub Pages there is no server, so the app keeps its sample data.
const BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

export interface ApiPerson {
  id: number;
  name: string;
  role: string;
  stack: string;
  level: string;
  bio: string;
}

export async function apiOnline(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/api/health`, { signal: AbortSignal.timeout(3000) });
    return res.ok && (await res.json()).ok === true;
  } catch {
    return false;
  }
}

export async function fetchPeople(): Promise<ApiPerson[]> {
  const res = await fetch(`${BASE}/api/people`);
  if (!res.ok) throw new Error('Could not load people');
  return res.json();
}
