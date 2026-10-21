"use client";

import { useEffect, useRef, useState } from "react";

type Kind = "gear" | "vane" | "piston" | "centrifugal";
const KINDS: { id: Kind; label: string; disp: string; note: string }[] = [
  { id: "gear", label: "Gear", disp: "Positive displacement", note: "Fluid is trapped between the gear teeth and the casing and carried from inlet to outlet — a fixed volume per revolution, so it builds high pressure and NEEDS a relief valve." },
  { id: "vane", label: "Vane", disp: "Positive displacement", note: "Sliding vanes in an eccentric rotor sweep an expanding then contracting volume — draws in at the wide gap, delivers at the narrow gap. Fixed volume per rev." },
  { id: "piston", label: "Piston", disp: "Positive displacement", note: "A reciprocating piston draws fluid through the inlet check valve on the down-stroke and delivers it through the outlet check valve on the up-stroke. Very high pressures." },
  { id: "centrifugal", label: "Centrifugal", disp: "Non-positive", note: "A spinning impeller flings fluid outward by centrifugal force — HIGH flow, LOW pressure. It will not build high pressure and won't dead-head, so it's used as a fuel booster, not for hydraulics." },
];

export default function PumpSim() {
  const [kind, setKind] = useState<Kind>("gear");
  const [a, setA] = useState(0);
  const raf = useRef<number | null>(null);
  const last = useRef(0);

  useEffect(() => {
    const tick = (t: number) => {
      if (!last.current) last.current = t;
      const dt = t - last.current; last.current = t;
      setA((p) => (p + dt * 0.12) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); last.current = 0; };
  }, []);

  const info = KINDS.find((k) => k.id === kind)!;
  const positive = kind !== "centrifugal";

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5 flex-wrap">
        {KINDS.map((k) => (
          <button key={k.id} onClick={() => setKind(k.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${kind === k.id ? "bg-yellow-400 text-black" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}>
            {k.label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 400 240" className="w-full rounded-xl bg-zinc-900 border border-zinc-800">
        <text x={20} y={24} fill="#60a5fa" fontSize={11}>INLET (suction)</text>
        <text x={300} y={24} fill="#f87171" fontSize={11}>OUTLET (pressure)</text>
        {kind === "gear" && <Gear a={a} />}
        {kind === "vane" && <Vane a={a} />}
        {kind === "piston" && <Piston a={a} />}
        {kind === "centrifugal" && <Centrifugal a={a} />}
      </svg>

      <div className="grid grid-cols-2 gap-3">
        <Stat label="Type" value={info.disp} color={positive ? "#f59e0b" : "#3b82f6"} />
        <Stat label="Characteristic" value={positive ? "High pressure, fixed flow/rev" : "High flow, low pressure"} />
      </div>
      <div className="rounded-xl p-3 border border-zinc-800 bg-zinc-900/50">
        <div className="text-sm font-bold text-white">{info.label} pump</div>
        <div className="text-zinc-300 text-sm mt-0.5">{info.note}</div>
      </div>
    </div>
  );
}

function dots(cx: number, cy: number, r: number, a: number, n: number, color: string, spin = 1) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const ang = ((a * spin + (i * 360) / n) * Math.PI) / 180;
    out.push(<circle key={i} cx={cx + r * Math.cos(ang)} cy={cy + r * Math.sin(ang)} r={3} fill={color} opacity={0.8} />);
  }
  return out;
}

function Gear({ a }: { a: number }) {
  const teeth = (cx: number, dir: number) =>
    Array.from({ length: 8 }).map((_, i) => {
      const ang = ((a * dir + i * 45) * Math.PI) / 180;
      return <line key={i} x1={cx} y1={120} x2={cx + 30 * Math.cos(ang)} y2={120 + 30 * Math.sin(ang)} stroke="#a1a1aa" strokeWidth={3} strokeLinecap="round" />;
    });
  return (
    <g>
      <line x1={40} y1={120} x2={120} y2={120} stroke="#1d4ed8" strokeWidth={10} opacity={0.4} />
      <line x1={280} y1={120} x2={360} y2={120} stroke="#b91c1c" strokeWidth={10} opacity={0.4} />
      <circle cx={160} cy={120} r={34} fill="#27272a" stroke="#52525b" />
      <circle cx={240} cy={120} r={34} fill="#27272a" stroke="#52525b" />
      {teeth(160, 1)}{teeth(240, -1)}
      {dots(160, 120, 40, a, 6, "#60a5fa", 1)}
      {dots(240, 120, 40, -a, 6, "#f87171", 1)}
    </g>
  );
}

function Vane({ a }: { a: number }) {
  return (
    <g>
      <line x1={40} y1={120} x2={110} y2={120} stroke="#1d4ed8" strokeWidth={10} opacity={0.4} />
      <line x1={290} y1={120} x2={360} y2={120} stroke="#b91c1c" strokeWidth={10} opacity={0.4} />
      <circle cx={200} cy={120} r={70} fill="#18181b" stroke="#52525b" />
      <circle cx={210} cy={120} r={40} fill="#27272a" stroke="#71717a" />
      {Array.from({ length: 6 }).map((_, i) => {
        const ang = ((a + i * 60) * Math.PI) / 180;
        const ex = 210 + 10 * Math.cos(ang); // eccentric centre offset
        return <line key={i} x1={ex} y1={120} x2={200 + 66 * Math.cos(ang)} y2={120 + 66 * Math.sin(ang)} stroke="#a1a1aa" strokeWidth={2.5} />;
      })}
      {dots(200, 120, 55, a, 8, "#93c5fd", 1)}
    </g>
  );
}

function Piston({ a }: { a: number }) {
  const pos = (1 - Math.cos((a * Math.PI) / 180)) / 2; // 0 top .. 1 bottom
  const px = 150 + pos * 70;
  const intake = Math.sin((a * Math.PI) / 180) > 0; // down-stroke draws in
  return (
    <g>
      <rect x={120} y={95} width={160} height={50} rx={6} fill="#18181b" stroke="#52525b" />
      <rect x={px} y={97} width={24} height={46} rx={3} fill="#a1a1aa" stroke="#71717a" />
      <line x1={px + 24} y1={120} x2={px + 60} y2={120} stroke="#d4d4d8" strokeWidth={4} />
      {/* inlet check valve (bottom-left) */}
      <circle cx={140} cy={170} r={8} fill={intake ? "#3b82f6" : "#3f3f46"} />
      <text x={140} y={192} fill="#93c5fd" fontSize={9} textAnchor="middle">inlet</text>
      <line x1={140} y1={145} x2={140} y2={162} stroke="#1d4ed8" strokeWidth={6} opacity={0.4} />
      {/* outlet check valve (top-left) */}
      <circle cx={190} cy={70} r={8} fill={!intake ? "#ef4444" : "#3f3f46"} />
      <text x={190} y={60} fill="#f87171" fontSize={9} textAnchor="middle">outlet</text>
      <line x1={190} y1={78} x2={190} y2={95} stroke="#b91c1c" strokeWidth={6} opacity={0.4} />
      <text x={230} y={190} fill="#71717a" fontSize={10} textAnchor="middle">{intake ? "Down-stroke: drawing in" : "Up-stroke: delivering"}</text>
    </g>
  );
}

function Centrifugal({ a }: { a: number }) {
  return (
    <g>
      <line x1={190} y1={40} x2={190} y2={85} stroke="#1d4ed8" strokeWidth={8} opacity={0.4} />
      <text x={150} y={55} fill="#60a5fa" fontSize={10}>in (centre)</text>
      <line x1={330} y1={120} x2={370} y2={120} stroke="#b91c1c" strokeWidth={10} opacity={0.4} />
      <circle cx={200} cy={120} r={78} fill="#18181b" stroke="#52525b" />
      <g transform={`rotate(${a} 200 120)`}>
        {Array.from({ length: 6 }).map((_, i) => {
          const ang = (i * 60 * Math.PI) / 180;
          return <path key={i} d={`M${200 + 12 * Math.cos(ang)},${120 + 12 * Math.sin(ang)} Q${200 + 45 * Math.cos(ang + 0.5)},${120 + 45 * Math.sin(ang + 0.5)} ${200 + 62 * Math.cos(ang + 0.9)},${120 + 62 * Math.sin(ang + 0.9)}`} fill="none" stroke="#a1a1aa" strokeWidth={3} />;
        })}
        <circle cx={200} cy={120} r={10} fill="#71717a" />
      </g>
      {dots(200, 120, 70, a, 10, "#93c5fd", 1.4)}
    </g>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
      <div className="text-[11px] text-zinc-500">{label}</div>
      <div className="text-sm font-bold" style={{ color: color ?? "#fff" }}>{value}</div>
    </div>
  );
}
