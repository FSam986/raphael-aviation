"use client";
// "The Regulations" tab: the South African Civil Aviation Regulations for this
// section, reproduced as written (official legislative text), grouped by Part and
// Subpart, with a find box and expandable regulations. Loaded on demand.
import { useEffect, useMemo, useState } from "react";
import type { RegRef } from "@/app/data/sa-car-map";

type Reg = { no: string; title: string; text: string[] };
type Part = { part: number; title: string; subparts: { title: string; regs: Reg[] }[] };

// Indent sub-paragraphs the way the regulations are laid out: (1) → (a) → (i).
function level(line: string): number {
  if (/^\(\d+\)/.test(line)) return 0;
  if (/^\([ivxl]+\)/i.test(line) && !/^\([a-h]\)/i.test(line)) return 2;
  if (/^\([a-z]{1,2}\)/.test(line)) return 1;
  return 1;
}

export function RegulationText({ refs }: { refs: RegRef[] }) {
  const [parts, setParts] = useState<Part[] | null>(null);
  const [find, setFind] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  useEffect(() => { import("@/app/data/sa-car.json").then((m) => setParts(m.default as Part[])); }, []);

  const view = useMemo(() => {
    if (!parts) return [];
    const q = find.trim().toLowerCase();
    return refs.flatMap((r) => {
      const p = parts.find((x) => x.part === r.part); if (!p) return [];
      const subs = p.subparts
        .filter((s) => !r.subparts || r.subparts.some((pre) => s.title.startsWith(pre)))
        .map((s) => ({ ...s, regs: q ? s.regs.filter((g) => (g.no + " " + g.title + " " + g.text.join(" ")).toLowerCase().includes(q)) : s.regs }))
        .filter((s) => s.regs.length);
      return subs.length ? [{ ...p, subparts: subs }] : [];
    });
  }, [parts, refs, find]);

  if (!parts) return <div className="text-chart-ink-faint text-sm py-8 text-center">Loading the regulations…</div>;
  const total = view.reduce((n, p) => n + p.subparts.reduce((m, s) => m + s.regs.length, 0), 0);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-gold/25 bg-gold/[0.05] px-4 py-3 text-[13px] text-chart-ink-dim leading-relaxed">
        The South African Civil Aviation Regulations, reproduced <strong className="text-chart-ink">as written</strong>. Exam questions quote this wording,
        so read the exact text. Always check the current gazetted version for amendments.
      </div>
      <input value={find} onChange={(e) => setFind(e.target.value)} placeholder="Find in the regulations — e.g. class rating, recency, 7700, night…"
        aria-label="Find in the regulations"
        className="w-full bg-chart-ground-2 border border-chart-line focus:border-gold/60 outline-none rounded-xl px-4 py-2.5 text-sm text-chart-ink placeholder:text-chart-ink-faint" />
      {find && <div className="text-xs text-chart-ink-faint">{total} regulation{total === 1 ? "" : "s"} contain “{find}”</div>}
      {view.map((p) => (
        <section key={p.part} className="space-y-3">
          <h3 className="font-display font-bold text-2xl text-chart-ink">CAR Part {p.part} — {p.title}</h3>
          {p.subparts.map((s) => (
            <div key={s.title} className="space-y-2">
              <div className="mono text-[11px] tracking-[0.14em] uppercase text-data">{s.title}</div>
              {s.regs.map((g) => {
                const k = `${p.part}-${g.no}`; const isOpen = open[k] ?? (!!find || s.regs.length <= 3);
                return (
                  <div key={k} className="rounded-xl border border-chart-line bg-chart-ground-2 overflow-hidden">
                    <button onClick={() => setOpen((o) => ({ ...o, [k]: !isOpen }))} aria-expanded={isOpen}
                      className="w-full flex items-baseline gap-3 px-4 py-3 text-left hover:bg-chart-ground transition-colors">
                      <span className="mono text-xs text-gold-deep shrink-0">{g.no}</span>
                      <span className="text-chart-ink font-semibold text-[15px] flex-1">{g.title}</span>
                      <span className="text-chart-ink-faint text-xs">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 space-y-1.5 text-[14px] leading-relaxed text-chart-ink-dim">
                        {g.text.map((line, i) => (
                          <p key={i} style={{ paddingLeft: `${level(line) * 1.25}rem` }}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </section>
      ))}
      {!view.length && <div className="text-chart-ink-faint text-sm py-6 text-center">No regulation contains that wording.</div>}
    </div>
  );
}
