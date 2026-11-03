"use client";

import type { PlottingQuestion } from "@/app/data/fpp-plotting";

// For plotting questions that are NOT a faithful on-screen 2-axis graph — a factor
// CALCULATION, a TABLE look-up, or a complex CAP/MRJT chart we don't redraw — we
// show an honest "look-up" card instead of a graph with no axis values. It names
// the exact CAP figure/table to open and lists the entry values; the worked steps
// and answer appear below on reveal. (Questions that DO have a faithful gridded
// graph use GraphPlot/CarpetPlot with real axis values.)

function classify(ref: string, ask: string): string {
  const s = (ref + " " + ask).toLowerCase();
  if (s.includes("table")) return "Table look-up";
  if (/calculate|factor|convert|regulated|limited take-off mass|de-factor/.test(s)) return "Calculation";
  return "Chart look-up";
}

export function MethodPanel({ q }: { q: PlottingQuestion }) {
  const kind = classify(q.graphRef, q.ask);
  const [figure, ...rest] = q.graphRef.split("—");
  const title = rest.join("—").trim();

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">{kind}</span>
        <span className="text-xs text-zinc-200 font-medium">{figure.trim()}</span>
      </div>
      {title && <div className="text-sm text-white font-semibold mb-3">{title}</div>}

      <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1.5">Enter with</div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {q.given.map((g, i) => (
          <span key={i} className="text-xs text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1">{g}</span>
        ))}
      </div>

      <div className="flex items-start gap-2 text-xs text-zinc-400 bg-zinc-900/40 border border-zinc-800 rounded-lg p-2.5">
        <span className="text-sky-400 shrink-0">↳</span>
        <span>
          {kind === "Calculation"
            ? "Work the figures through the steps below — no graph to plot. Confirm any graphical input on the named CAP figure."
            : `Read the result on ${figure.trim()} in your CAP manual (allowed in the exam), then check the worked steps and answer below.`}
        </span>
      </div>
    </div>
  );
}
