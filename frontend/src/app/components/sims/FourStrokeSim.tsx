"use client";

import { useEffect, useRef, useState } from "react";

// Four-stroke (Otto) cycle: 720° of crank = one cycle = one power stroke.
// 0–180 Induction (inlet open) · 180–360 Compression · 360–540 Power (spark
// at TDC, both valves shut) · 540–720 Exhaust (exhaust open).
const STROKES = [
  { name: "Induction", at: "Inlet valve OPEN — piston draws in the fuel/air mixture", color: "#3b82f6" },
  { name: "Compression", at: "Both valves SHUT — mixture compressed, pressure & temp rise", color: "#f59e0b" },
  { name: "Power", at: "Spark fires at TDC — burning gas forces the piston down", color: "#ef4444" },
  { name: "Exhaust", at: "Exhaust valve OPEN — piston pushes out the burnt gas", color: "#71717a" },
];

export default function FourStrokeSim() {
  const [angle, setAngle] = useState(10);
  const [playing, setPlaying] = useState(true);
  const raf = useRef<number | null>(null);
  const last = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const tick = (t: number) => {
      if (!last.current) last.current = t;
      const dt = t - last.current;
      last.current = t;
      setAngle((a) => (a + dt * 0.06) % 720);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      last.current = 0;
    };
  }, [playing]);

  const stroke = Math.floor(angle / 180) % 4;
  const s = STROKES[stroke];
  // piston position: 0 = TDC (top), 1 = BDC (bottom). cos gives TDC at 0/360/720.
  const rad = (angle * Math.PI) / 180;
  const pos = (1 - Math.cos(rad)) / 2; // 0 at TDC, 1 at BDC
  const pistonY = 70 + pos * 110;
  const crankX = 150 + 36 * Math.sin(rad);
  const crankY = 250 - 36 * Math.cos(rad);

  const inletOpen = stroke === 0;
  const exhaustOpen = stroke === 3;
  const spark = stroke === 2 && angle % 180 < 25;
  const combusting = stroke === 2;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Crank angle" value={`${Math.round(angle)}°`} />
        <Stat label="Stroke" value={s.name} color={s.color} />
        <Stat label="Power strokes / cycle" value="1 (every 720°)" />
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setPlaying((p) => !p)} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-white text-sm hover:bg-zinc-700">
          {playing ? "Pause" : "Play"}
        </button>
        <input type="range" min={0} max={719} value={Math.round(angle)} onChange={(e) => { setPlaying(false); setAngle(+e.target.value); }} className="flex-1 accent-yellow-400" />
        <span className="text-zinc-400 text-xs w-24 shrink-0">drag to scrub</span>
      </div>

      <svg viewBox="0 0 300 300" className="w-full max-w-sm mx-auto rounded-xl bg-zinc-900 border border-zinc-800">
        {/* cylinder */}
        <rect x={110} y={40} width={80} height={170} rx={6} fill="#18181b" stroke="#3f3f46" />
        {/* combustion space */}
        <rect x={113} y={43} width={74} height={pistonY - 43} fill={combusting ? "#7f1d1d" : stroke === 1 ? "#78350f" : "#0c4a6e"} opacity={0.5} />
        {/* valves */}
        <g>
          <rect x={126} y={28} width={10} height={18 + (inletOpen ? 10 : 0)} rx={2} fill={inletOpen ? "#3b82f6" : "#52525b"} />
          <text x={131} y={22} fill="#93c5fd" fontSize={9} textAnchor="middle">IN</text>
          <rect x={164} y={28} width={10} height={18 + (exhaustOpen ? 10 : 0)} rx={2} fill={exhaustOpen ? "#a1a1aa" : "#52525b"} />
          <text x={169} y={22} fill="#d4d4d8" fontSize={9} textAnchor="middle">EX</text>
        </g>
        {/* spark plug */}
        <circle cx={150} cy={46} r={4} fill={spark ? "#fde047" : "#3f3f46"} />
        {spark && <g stroke="#fde047" strokeWidth={1.5}><line x1={150} y1={50} x2={146} y2={58} /><line x1={150} y1={50} x2={154} y2={57} /></g>}
        {/* piston */}
        <rect x={114} y={pistonY} width={72} height={26} rx={3} fill="#a1a1aa" stroke="#71717a" />
        {/* conrod */}
        <line x1={150} y1={pistonY + 13} x2={crankX} y2={crankY} stroke="#d4d4d8" strokeWidth={5} strokeLinecap="round" />
        {/* crank */}
        <circle cx={150} cy={250} r={40} fill="none" stroke="#3f3f46" strokeWidth={2} />
        <line x1={150} y1={250} x2={crankX} y2={crankY} stroke="#eab308" strokeWidth={4} strokeLinecap="round" />
        <circle cx={crankX} cy={crankY} r={5} fill="#eab308" />
        <circle cx={150} cy={250} r={6} fill="#52525b" />
      </svg>

      <div className="rounded-xl p-3 border" style={{ borderColor: s.color + "55", background: s.color + "11" }}>
        <div className="text-sm font-bold" style={{ color: s.color }}>{s.name} stroke</div>
        <div className="text-zinc-300 text-sm mt-0.5">{s.at}</div>
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed">
        &lsquo;Suck, squeeze, bang, blow&rsquo;. One power stroke every two crankshaft revolutions (720°). Valve timing actually opens slightly before and closes after TDC/BDC (valve lead/lag and overlap) to improve breathing.
      </p>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
      <div className="text-[11px] text-zinc-500">{label}</div>
      <div className="text-base font-bold" style={{ color: color ?? "#fff" }}>{value}</div>
    </div>
  );
}
