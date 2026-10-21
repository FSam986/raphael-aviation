"use client";

import { useEffect, useRef, useState } from "react";

// Four-stroke (Otto) cycle, rendered engine art cycled as a flipbook so the
// engine visibly "runs". One cycle = 720° crank = one power stroke.
const STROKES = [
  { n: 1, name: "Intake", img: "/sims/4stroke_intake.png", color: "#3b82f6",
    bullets: ["Inlet valve OPEN", "Piston moves DOWN", "Fuel/air mixture drawn in"] },
  { n: 2, name: "Compression", img: "/sims/4stroke_compression.png", color: "#22c55e",
    bullets: ["Both valves SHUT", "Piston moves UP", "Mixture compressed — pressure & temp rise"] },
  { n: 3, name: "Power", img: "/sims/4stroke_power.png", color: "#ef4444",
    bullets: ["Spark fires at TDC", "Burning gas forces piston DOWN", "The only stroke that does work"] },
  { n: 4, name: "Exhaust", img: "/sims/4stroke_exhaust.png", color: "#f59e0b",
    bullets: ["Exhaust valve OPEN", "Piston moves UP", "Burnt gas expelled"] },
];

export default function FourStrokeSim() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => setI((p) => (p + 1) % 4), 1300);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [playing]);

  const s = STROKES[i];

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-start flex-col sm:flex-row">
        <div className="relative shrink-0 mx-auto">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white z-10 flex items-center gap-1.5" style={{ background: s.color }}>
            <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center text-[10px]">{s.n}</span>
            {s.name.toUpperCase()}
          </div>
          {STROKES.map((st, k) => (
            <img key={st.name} src={st.img} alt={st.name} width={180}
              className="rounded-xl border border-zinc-800 transition-opacity duration-500"
              style={{ opacity: k === i ? 1 : 0, position: k === i ? "relative" : "absolute", inset: 0 }} />
          ))}
        </div>

        <div className="flex-1 space-y-3 w-full">
          <div className="grid grid-cols-4 gap-1.5">
            {STROKES.map((st, k) => (
              <button key={st.name} onClick={() => { setPlaying(false); setI(k); }}
                className="py-2 rounded-lg text-[11px] font-semibold transition-colors"
                style={{ background: k === i ? st.color : "#27272a", color: k === i ? "#fff" : "#a1a1aa" }}>
                {st.n}. {st.name}
              </button>
            ))}
          </div>
          <div className="rounded-xl p-3 border" style={{ borderColor: s.color + "55", background: s.color + "14" }}>
            <ul className="space-y-1">
              {s.bullets.map((b) => (
                <li key={b} className="text-sm text-zinc-200 flex gap-2"><span style={{ color: s.color }}>•</span>{b}</li>
              ))}
            </ul>
          </div>
          <button onClick={() => setPlaying((p) => !p)} className="px-4 py-2 rounded-lg bg-zinc-800 text-white text-sm hover:bg-zinc-700">
            {playing ? "❚❚ Pause cycle" : "► Run the engine"}
          </button>
        </div>
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed">
        &lsquo;Suck, squeeze, bang, blow&rsquo;. One power stroke every two crankshaft revolutions (720°). Valves actually open slightly before, and close after, TDC/BDC (valve lead, lag and overlap) to improve cylinder filling and scavenging.
      </p>
    </div>
  );
}
