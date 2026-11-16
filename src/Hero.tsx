import React from 'react';

type Person = { id: number; name: string; role: string; stack: string; level: string };

const initials = (name: string) => name.split(' ').map((p) => p[0]).slice(0, 2).join('');

/** First screen: big mixed-weight headline on the left, a stack of profile cards on the right. */
export function Hero({ people, onFind, onJoin }: { people: Person[]; onFind: () => void; onJoin: () => void }) {
  const cards = people.slice(0, 3);
  return (
    <section className="relative min-h-[calc(100vh-11rem)] flex flex-col">
      <div className="flex-1 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center py-10">
        <div>
          <p className="text-[13px] text-brand-text-dim mb-6">Hackathon teams · Shymkent and online</p>
          <h2 className="text-[40px] sm:text-[56px] leading-[1.08] tracking-tight text-white">
            <span className="font-light">Find your</span>
            <br />
            <span className="font-bold">hackathon team</span>
            <br />
            <span className="font-light">before the weekend</span>
          </h2>
          <p className="text-[15px] text-stone-300 leading-relaxed mt-6 max-w-sm">
            See who's looking for a team, invite them in one click, and agree on roles before the clock starts.
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-9">
            <button
              onClick={onFind}
              className="px-9 py-4 rounded-full bg-brand-primary text-[#1a1a14] text-[12px] font-bold uppercase tracking-[0.1em] shadow-[0_10px_30px_-10px_rgba(223,232,160,0.6)] hover:brightness-105 transition cursor-pointer"
            >
              Find teammates
            </button>
            <button onClick={onJoin} className="text-sm text-white underline underline-offset-4 decoration-white/40 hover:decoration-white cursor-pointer">
              Create a profile
            </button>
          </div>
        </div>

        <div className="relative h-[340px] sm:h-[420px] hidden md:block">
          {cards.map((p, i) => (
            <div
              key={p.id}
              className="absolute w-[300px] rounded-2xl border border-brand-border bg-[#262626] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
              style={{ top: `${i * 92}px`, left: `${[18, 0, 30][i]}%`, transform: `rotate(${[-3, 2, -1][i]}deg)`, zIndex: 3 - i }}
            >
              <div className="flex items-center gap-3">
                <span className={`w-11 h-11 rounded-full grid place-items-center font-semibold ${i === 0 ? 'bg-brand-primary text-[#1a1a14]' : 'bg-white/[0.07] text-stone-200'}`}>
                  {initials(p.name)}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate">{p.name}</p>
                  <p className="text-xs text-brand-text-dim truncate">{p.role} · {p.level}</p>
                </div>
              </div>
              <div className="flex gap-1.5 mt-4">
                {p.stack.split(',').map((s) => (
                  <span key={s} className="text-[11px] text-stone-300 border border-brand-border rounded-full px-2.5 py-0.5">{s.trim()}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onFind} className="mx-auto mb-2 flex items-center gap-2 text-xs text-brand-text-dim hover:text-white transition cursor-pointer">
        <span className="w-4 h-6 rounded-full border border-current grid justify-items-center pt-1">
          <span className="w-0.5 h-1.5 rounded-full bg-current animate-bounce" />
        </span>
        Scroll down
      </button>
    </section>
  );
}

