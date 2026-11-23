"use client";
// The exact wording of named regulations (e.g. ["61.05.1", "61.05.5"]), shown
// inside a Learn topic. Loads the CAR text on demand, so pages stay light.
import { useEffect, useState } from "react";

type Reg = { no: string; title: string; text: string[] };
type Part = { part: number; subparts: { regs: Reg[] }[] };

let cache: Map<string, Reg> | null = null;

function level(line: string): number {
  if (/^\(\d+\)/.test(line)) return 0;
  if (/^\([ivxl]+\)/i.test(line) && !/^\([a-h]\)/i.test(line)) return 2;
  return 1;
}

export function RegulationExcerpt({ nos }: { nos: string[] }) {
  const [regs, setRegs] = useState<Map<string, Reg> | null>(cache);
  useEffect(() => {
    if (cache) return;
    import("@/app/data/sa-car.json").then((m) => {
      const map = new Map<string, Reg>();
      // Keep the fullest copy of each regulation number.
      for (const p of m.default as Part[]) for (const s of p.subparts) for (const r of s.regs)
        if (r.text.length > (map.get(r.no)?.text.length ?? -1)) map.set(r.no, r);
      cache = map; setRegs(map);
    });
  }, []);

  if (!regs) return <div className="text-chart-ink-faint text-sm py-4">Loading the regulation text…</div>;
  const found = nos.map((n) => regs.get(n)).filter((r): r is Reg => !!r && r.text.length > 0);
  if (!found.length) return null;
  return (
    <div className="mt-6 rounded-xl border border-gold/25 bg-gold/[0.04] p-4 sm:p-5 space-y-5">
      <div className="text-gold text-xs font-bold uppercase tracking-wider">The regulation, as written</div>
      {found.map((r) => (
        <div key={r.no}>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="mono text-xs text-gold-deep shrink-0">{r.no}</span>
            <span className="text-chart-ink font-semibold text-[15px]">{r.title}</span>
          </div>
          <div className="space-y-1.5 text-[14px] leading-relaxed text-chart-ink-dim">
            {r.text.map((line, i) => <p key={i} style={{ paddingLeft: `${level(line) * 1.25}rem` }}>{line}</p>)}
          </div>
        </div>
      ))}
      <p className="text-[11px] text-chart-ink-faint">South African Civil Aviation Regulations, reproduced as written. Always check the current gazetted version for amendments.</p>
    </div>
  );
}
