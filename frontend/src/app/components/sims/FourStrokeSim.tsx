"use client";

import { useEffect, useRef, useState } from "react";

// Continuously-animated four-stroke engine. Crank angle advances every frame;
// the piston follows real crank/conrod kinematics, the crank and conrod move,
// valves open on their phases, spark/combustion fire on the power stroke.
// 720° crank = one cycle: 0–180 Intake · 180–360 Compression · 360–540 Power ·
// 540–720 Exhaust.
const STROKES = [
  { name: "Intake", color: "#3b82f6", note: "Inlet valve open — piston draws in the fuel/air mixture" },
  { name: "Compression", color: "#22c55e", note: "Both valves shut — the mixture is compressed" },
  { name: "Power", color: "#ef4444", note: "Spark fires at TDC — burning gas drives the piston down" },
  { name: "Exhaust", color: "#f59e0b", note: "Exhaust valve open — burnt gas is pushed out" },
];

const R = 34; // crank radius (px)
const L = 92; // conrod length (px)
const PIVOT_Y = 250; // crank centre

export default function FourStrokeSim() {
  const [angle, setAngle] = useState(10);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const raf = useRef<number | null>(null);
  const last = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const tick = (t: number) => {
      if (!last.current) last.current = t;
      const dt = t - last.current;
      last.current = t;
      setAngle((a) => (a + dt * 0.12 * speed) % 720);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); last.current = 0; };
  }, [playing, speed]);

  const stroke = Math.floor(angle / 180) % 4;
  const s = STROKES[stroke];
  const rad = (angle * Math.PI) / 180;

  // crank pin position
  const crankX = 150 + R * Math.sin(rad);
  const crankY = PIVOT_Y - R * Math.cos(rad);
  // piston pin via conrod (slider-crank): y = pivot - (R cosθ + sqrt(L² - R²sin²θ))
  const pistonPinY = PIVOT_Y - (R * Math.cos(rad) + Math.sqrt(L * L - (R * Math.sin(rad)) ** 2));
  const pistonTop = pistonPinY - 26;

  const inletOpen = stroke === 0;
  const exhaustOpen = stroke === 3;
  const power = stroke === 2;
  const spark = power && angle % 180 < 22;
  const combH = pistonTop - 46; // height of gas space above piston

  const valveLift = (open: boolean) => (open ? 11 : 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Crank angle" value={`${Math.round(angle)}°`} />
        <Stat label="Stroke" value={s.name} color={s.color} />
        <Stat label="Power strokes / cycle" value="1 (per 720°)" />
      </div>

      <svg viewBox="0 0 300 320" className="w-full max-w-xs mx-auto rounded-xl border border-zinc-800" style={{ background: "#0b0e13" }}>
        <defs>
          <linearGradient id="cyl" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3f3f46" /><stop offset="0.5" stopColor="#71717a" /><stop offset="1" stopColor="#3f3f46" />
          </linearGradient>
          <linearGradient id="pist" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6b7280" /><stop offset="0.5" stopColor="#e5e7eb" /><stop offset="1" stopColor="#6b7280" />
          </linearGradient>
          <linearGradient id="rod" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#9ca3af" /><stop offset="0.5" stopColor="#f3f4f6" /><stop offset="1" stopColor="#9ca3af" />
          </linearGradient>
          <radialGradient id="fire" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fff2b0" /><stop offset="0.4" stopColor="#f97316" /><stop offset="1" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* cylinder head ports + valves */}
        <rect x={108} y={44} width={84} height={pistonTop - 44} fill={power ? "#7f1d1d" : stroke === 1 ? "#78350f" : "#0c4a6e"} opacity={0.45} />
        {power && <circle cx={150} cy={combH + 24} r={26} fill="url(#fire)" opacity={spark ? 1 : 0.7} />}
        {/* gas flow arrows */}
        {inletOpen && <g fill="#60a5fa"><polygon points="128,70 122,60 134,60" /><polygon points="128,84 122,74 134,74" /></g>}
        {exhaustOpen && <g fill="#fb923c"><polygon points="172,60 166,70 178,70" /><polygon points="172,46 166,56 178,56" /></g>}
        {/* valves */}
        <g>
          <rect x={125 - 3} y={28} width={6} height={20 + valveLift(inletOpen)} rx={2} fill="#a1a1aa" />
          <ellipse cx={125} cy={48 + valveLift(inletOpen)} rx={11} ry={4} fill={inletOpen ? "#3b82f6" : "#52525b"} />
          <text x={125} y={22} fill="#93c5fd" fontSize={9} textAnchor="middle">IN</text>
          <rect x={175 - 3} y={28} width={6} height={20 + valveLift(exhaustOpen)} rx={2} fill="#a1a1aa" />
          <ellipse cx={175} cy={48 + valveLift(exhaustOpen)} rx={11} ry={4} fill={exhaustOpen ? "#fb923c" : "#52525b"} />
          <text x={175} y={22} fill="#fdba74" fontSize={9} textAnchor="middle">EX</text>
        </g>
        {/* spark plug */}
        <circle cx={150} cy={44} r={4} fill={spark ? "#fde047" : "#52525b"} />
        {spark && <g stroke="#fde047" strokeWidth={1.5}><line x1={150} y1={48} x2={146} y2={56} /><line x1={150} y1={48} x2={154} y2={55} /></g>}

        {/* cylinder walls */}
        <rect x={104} y={40} width={8} height={185} fill="url(#cyl)" />
        <rect x={188} y={40} width={8} height={185} fill="url(#cyl)" />

        {/* piston */}
        <rect x={112} y={pistonTop} width={76} height={28} rx={3} fill="url(#pist)" stroke="#52525b" />
        <rect x={112} y={pistonTop + 6} width={76} height={2} fill="#3f3f46" />
        <rect x={112} y={pistonTop + 11} width={76} height={2} fill="#3f3f46" />
        <circle cx={150} cy={pistonPinY} r={5} fill="#3f3f46" />

        {/* conrod */}
        <line x1={150} y1={pistonPinY} x2={crankX} y2={crankY} stroke="url(#rod)" strokeWidth={8} strokeLinecap="round" />

        {/* crankcase + crank */}
        <circle cx={150} cy={PIVOT_Y} r={R + 10} fill="#18181b" stroke="#27272a" strokeWidth={2} />
        <circle cx={150} cy={PIVOT_Y} r={R} fill="none" stroke="#3f3f46" strokeWidth={2} strokeDasharray="3 4" />
        <line x1={150} y1={PIVOT_Y} x2={crankX} y2={crankY} stroke="#eab308" strokeWidth={6} strokeLinecap="round" />
        <circle cx={crankX} cy={crankY} r={6} fill="#facc15" />
        <circle cx={150} cy={PIVOT_Y} r={7} fill="#52525b" stroke="#71717a" />
      </svg>

      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={() => setPlaying((p) => !p)} className="px-4 py-2 rounded-lg bg-zinc-800 text-white text-sm hover:bg-zinc-700">
          {playing ? "❚❚ Pause" : "► Run"}
        </button>
        <input type="range" min={0} max={719} value={Math.round(angle)} onChange={(e) => { setPlaying(false); setAngle(+e.target.value); }} className="flex-1 min-w-[140px] accent-yellow-400" />
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <span>speed</span>
          {[0.5, 1, 2].map((v) => (
            <button key={v} onClick={() => setSpeed(v)} className={`px-2 py-1 rounded ${speed === v ? "bg-yellow-400 text-black" : "bg-zinc-800 text-zinc-300"}`}>{v}×</button>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-3 border" style={{ borderColor: s.color + "55", background: s.color + "14" }}>
        <div className="text-sm font-bold" style={{ color: s.color }}>{stroke + 1}. {s.name} stroke</div>
        <div className="text-zinc-300 text-sm mt-0.5">{s.note}</div>
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed">
        &lsquo;Suck, squeeze, bang, blow&rsquo;. The piston follows the crank through real slider-crank kinematics — one power stroke every two crank revolutions (720°). Valves open slightly before, and close after, TDC/BDC (lead, lag and overlap) to improve breathing.
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
