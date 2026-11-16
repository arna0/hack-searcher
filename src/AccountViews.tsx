import React, { useEffect, useState } from 'react';
import { Users, Plus, Check, X, LogOut } from 'lucide-react';
import {
  answerInvite,
  askToJoin,
  createTeam,
  fetchHackathons,
  fetchInvites,
  fetchTeams,
  signIn,
  signUp,
  type ApiPerson,
  type Hackathon,
  type Invite,
  type Team,
} from './api';

const input =
  'w-full px-3 py-2.5 rounded-lg bg-brand-bg border border-brand-border text-sm text-white placeholder:text-brand-text-dim outline-none focus:border-brand-primary/60 transition-colors';
const primary =
  'px-4 py-2.5 rounded-lg bg-brand-primary text-[#1a0d07] text-sm font-semibold hover:brightness-110 transition disabled:opacity-50 cursor-pointer';
const secondary = 'px-3.5 py-2 rounded-lg border border-brand-border text-sm text-stone-200 hover:border-white/30 transition-colors cursor-pointer';

function Page({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 pb-28">
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="text-sm text-brand-text-dim mt-1 mb-8">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

/** Shown when the app runs without the server (GitHub Pages demo). */
export function NeedsServer({ what }: { what: string }) {
  return (
    <Page title={what} subtitle="This part uses the Hack Searcher server.">
      <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 max-w-xl">
        <p className="text-sm text-stone-300 leading-relaxed">
          You're looking at the GitHub Pages demo, which has no server, so accounts and teams aren't available here. Run the app
          on your computer with <code className="text-brand-secondary">npm run build &amp;&amp; npm start</code> (see the README) and this
          page will work.
        </p>
      </div>
    </Page>
  );
}

export function SignInView({ onSignedIn }: { onSignedIn: (user: ApiPerson) => void }) {
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '', stack: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      onSignedIn(mode === 'in' ? await signIn(form.email, form.password) : await signUp(form));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Page
      title={mode === 'in' ? 'Sign in' : 'Create your profile'}
      subtitle={mode === 'in' ? 'Welcome back. Sign in to join teams and invite people.' : 'Other students will see your role, stack and bio.'}
    >
      <form onSubmit={submit} className="max-w-sm space-y-3">
        {mode === 'up' && (
          <>
            <input className={input} placeholder="Your name" value={form.name} onChange={set('name')} required autoComplete="name" />
            <input className={input} placeholder="Role, e.g. Backend developer" value={form.role} onChange={set('role')} />
            <input className={input} placeholder="Stack, e.g. Python, FastAPI" value={form.stack} onChange={set('stack')} />
          </>
        )}
        <input className={input} type="email" placeholder="Email" value={form.email} onChange={set('email')} required autoComplete="email" />
        <input
          className={input}
          type="password"
          placeholder={mode === 'up' ? 'Password (8+ characters)' : 'Password'}
          value={form.password}
          onChange={set('password')}
          required
          minLength={mode === 'up' ? 8 : undefined}
          autoComplete={mode === 'up' ? 'new-password' : 'current-password'}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className={`${primary} w-full`} disabled={busy}>
          {busy ? 'Please wait…' : mode === 'in' ? 'Sign in' : 'Create account'}
        </button>
        <p className="text-sm text-brand-text-dim pt-2">
          {mode === 'in' ? 'New here? ' : 'Already have an account? '}
          <button type="button" onClick={() => setMode(mode === 'in' ? 'up' : 'in')} className="text-brand-primary hover:underline cursor-pointer">
            {mode === 'in' ? 'Create a profile' : 'Sign in'}
          </button>
        </p>
      </form>
    </Page>
  );
}

export function TeamsView({ me, notify, onSignOut }: { me: ApiPerson; notify: (msg: string, type?: 'success' | 'error' | 'info') => void; onSignOut: () => void }) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', hackathonId: '', roles: '' });

  const reload = () =>
    Promise.all([fetchTeams(), fetchInvites(), fetchHackathons()])
      .then(([t, i, h]) => {
        setTeams(t);
        setInvites(i);
        setHackathons(h);
      })
      .catch((e) => notify(e.message, 'error'));
  useEffect(() => {
    reload();
  }, []);

  const run = async (fn: () => Promise<unknown>, ok: string) => {
    try {
      await fn();
      notify(ok, 'success');
      reload();
    } catch (e) {
      notify(e instanceof Error ? e.message : 'Something went wrong', 'error');
    }
  };

  const incoming = invites.filter((i) => i.to_user === me.id && i.status === 'pending');
  const sentPending = new Set(invites.filter((i) => i.from_user === me.id && i.status === 'pending').map((i) => i.team_id));
  const isMember = (t: Team) => t.members.some((m) => m.id === me.id);

  return (
    <Page title="Teams" subtitle={`Signed in as ${me.name}. Create a team, answer invites, or ask to join one.`}>
      {incoming.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-medium text-stone-300 mb-3">Waiting for your answer</h2>
          <div className="space-y-2">
            {incoming.map((i) => (
              <div key={i.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-brand-secondary/30 bg-brand-secondary/[0.06] p-4">
                <p className="text-sm text-stone-200 flex-1 min-w-[200px]">
                  {i.kind === 'invite' ? (
                    <>
                      <b className="text-white">{i.fromName}</b> invited you to <b className="text-white">{i.team}</b>
                    </>
                  ) : (
                    <>
                      <b className="text-white">{i.fromName}</b> wants to join <b className="text-white">{i.team}</b>
                    </>
                  )}
                  {i.message && <span className="block text-brand-text-dim mt-0.5">“{i.message}”</span>}
                </p>
                <button className={primary} onClick={() => run(() => answerInvite(i.id, 'accept'), 'Accepted')}>
                  <Check className="w-4 h-4 inline -mt-0.5 mr-1" />
                  Accept
                </button>
                <button className={secondary} onClick={() => run(() => answerInvite(i.id, 'decline'), 'Declined')}>
                  <X className="w-4 h-4 inline -mt-0.5 mr-1" />
                  Decline
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-stone-300">All teams</h2>
        <div className="flex gap-2">
          <button className={secondary} onClick={onSignOut} title="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
          <button className={primary} onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 inline -mt-0.5 mr-1" />
            New team
          </button>
        </div>
      </div>

      {showForm && (
        <form
          className="rounded-2xl border border-brand-border bg-brand-surface p-5 mb-6 grid gap-3 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            run(
              () =>
                createTeam({
                  name: form.name,
                  description: form.description,
                  hackathonId: Number(form.hackathonId) || undefined,
                  openRoles: form.roles.split(',').map((r) => r.trim()).filter(Boolean),
                }),
              'Team created',
            ).then(() => {
              setShowForm(false);
              setForm({ name: '', description: '', hackathonId: '', roles: '' });
            });
          }}
        >
          <input className={input} placeholder="Team name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <select className={input} value={form.hackathonId} onChange={(e) => setForm({ ...form, hackathonId: e.target.value })}>
            <option value="">No hackathon yet</option>
            {hackathons.map((h) => (
              <option key={h.id} value={h.id}>
                {h.title} · {h.starts_on}
              </option>
            ))}
          </select>
          <input className={`${input} sm:col-span-2`} placeholder="What are you building?" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className={`${input} sm:col-span-2`} placeholder="Roles you need, comma separated (e.g. Designer, Mobile developer)" value={form.roles} onChange={(e) => setForm({ ...form, roles: e.target.value })} />
          <div className="sm:col-span-2 flex justify-end">
            <button className={primary}>Create team</button>
          </div>
        </form>
      )}

      {teams.length === 0 ? (
        <p className="text-sm text-brand-text-dim">No teams yet. Create the first one.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {teams.map((t) => (
            <article key={t.id} className="rounded-2xl border border-brand-border bg-brand-surface p-5 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{t.name}</h3>
                  {t.hackathon && <p className="text-xs text-brand-secondary mt-0.5">{t.hackathon}</p>}
                </div>
                <span className="text-xs text-brand-text-dim shrink-0">
                  <Users className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                  {t.size}/{t.max_size}
                </span>
              </div>
              {t.description && <p className="text-sm text-stone-300 mt-3 leading-relaxed">{t.description}</p>}
              <p className="text-xs text-brand-text-dim mt-3">{t.members.map((m) => m.name).join(', ')}</p>
              {t.openRoles.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {t.openRoles.map((r) => (
                    <span key={r} className="text-xs text-stone-300 bg-white/[0.04] border border-brand-border rounded-md px-2 py-0.5">
                      needs {r}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-brand-border">
                {isMember(t) ? (
                  <p className="text-sm text-emerald-400">{t.owner_id === me.id ? 'Your team' : "You're in this team"}</p>
                ) : sentPending.has(t.id) ? (
                  <p className="text-sm text-brand-text-dim">Request sent, waiting for the owner</p>
                ) : t.size >= t.max_size ? (
                  <p className="text-sm text-brand-text-dim">Team is full</p>
                ) : (
                  <button className={secondary} onClick={() => run(() => askToJoin(t.id), `Request sent to ${t.name}`)}>
                    Ask to join
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </Page>
  );
}
