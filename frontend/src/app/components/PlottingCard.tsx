"use client";

import { useState } from "react";
import { PlottingDiagram } from "@/app/components/PlottingDiagram";
import { GraphPlot } from "@/app/components/GraphPlot";
import { CarpetPlot } from "@/app/components/CarpetPlot";
import type { PlottingQuestion } from "@/app/data/fpp-plotting";

export function PlottingCard({ q, index }: { q: PlottingQuestion; index: number }) {
  const [reveal, setReveal] = useState(false);

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-mono text-yellow-400/60">
          {index + 1}. {q.sectionId} · plotting
        </div>
        <div className="text-[10px] text-zinc-600">{q.graphRef}</div>
      </div>

      <div className="text-sm text-white font-medium mb-2">{q.ask}</div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 mb-3">
        <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Given</div>
        <ul className="space-y-0.5">
          {q.given.map((g, i) => (
            <li key={i} className="text-xs text-zinc-300">• {g}</li>
          ))}
        </ul>
      </div>

      {q.carpet ? (
        <CarpetPlot spec={q.carpet} reveal={reveal} />
      ) : q.graph ? (
        <GraphPlot spec={q.graph} reveal={reveal} />
      ) : (
        <PlottingDiagram type={q.diagram} reveal={reveal} />
      )}

      <button
        onClick={() => setReveal((r) => !r)}
        className="mt-3 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors"
      >
        {reveal ? "Hide solution" : "Show plotted solution ✏️"}
      </button>

      {reveal && (
        <div className="mt-4 space-y-3">
          <div>
            <div className="text-red-400 text-xs font-bold uppercase tracking-wider mb-1">Plotting steps</div>
            <ol className="space-y-1">
              {q.steps.map((s, i) => (
                <li key={i} className="text-xs text-zinc-300 flex gap-2">
                  <span className="text-red-400 font-bold shrink-0">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-3">
            <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Answer </span>
            <span className="text-sm text-white">{q.answer}</span>
          </div>
        </div>
      )}
    </div>
  );
}
