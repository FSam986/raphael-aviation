"use client";

import { useState } from "react";
import { simsForSection } from "./registry";

export function SimPanel({ sectionId }: { sectionId: string }) {
  const sims = simsForSection(sectionId);
  const [active, setActive] = useState(0);
  if (sims.length === 0) return null;
  const sim = sims[Math.min(active, sims.length - 1)];
  const Sim = sim.Component;

  return (
    <div className="max-w-3xl space-y-4">
      {sims.length > 1 && (
        <div className="flex gap-1.5 flex-wrap">
          {sims.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${i === active ? "bg-gold/15 text-gold" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}>
              {s.title.split(" — ")[0]}
            </button>
          ))}
        </div>
      )}
      <div>
        <h3 className="text-white font-bold">{sim.title}</h3>
        <p className="text-zinc-500 text-xs mt-0.5">{sim.blurb}</p>
      </div>
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
        <Sim />
      </div>
      <p className="text-[11px] text-zinc-600">Interactive teaching simulator — drag the controls. Physics simplified for clarity; confirm exact figures against your textbook and the SACAA syllabus.</p>
    </div>
  );
}

export { simsForSection };
