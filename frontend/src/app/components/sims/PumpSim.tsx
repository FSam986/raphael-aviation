"use client";

import { useEffect, useRef, useState } from "react";

type Kind = "gear" | "vane" | "piston" | "centrifugal";
const KINDS: { id: Kind; label: string; disp: string; note: string }[] = [
  { id: "gear", label: "Gear", disp: "Positive displacement", note: "Fluid is trapped between the gear teeth and the casing and carried from inlet to outlet — a fixed volume per revolution, so it builds high pressure and NEEDS a relief valve." },
  { id: "vane", label: "Vane", disp: "Positive displacement", note: "Sliding vanes in an eccentric rotor sweep a volume that expands at the inlet (drawing fluid in) and contracts at the outlet (delivering it). Fixed volume per rev." },
  { id: "piston", label: "Piston", disp: "Positive displacement", note: "A reciprocating piston draws fluid through the inlet check valve on the down-stroke and delivers it through the outlet check valve on the up-stroke. Very high pressures." },
  { id: "centrifugal", label: "Centrifugal", disp: "Non-positive", note: "A spinning impeller flings fluid outward by centrifugal force — HIGH flow, LOW pressure. It won't build high pressure and won't dead-head, so it's used as a fuel booster, not for hydraulics." },
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
      setA((p) => (p + dt * 0.1) % 360);
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
          <button key={k.id} onClick={() => setKind(k.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${kind === k.id ? "bg-yellow-400 text-black" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}>{k.label}</button>
        ))}
      </div>

      <svg viewBox="0 0 400 240" className="w-full rounded-xl border border-zinc-800">
        <defs>
          <linearGradient id="pbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#141922" /><stop offset="1" stopColor="#0a0d13" /></linearGradient>
          <radialGradient id="metal" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stopColor="#e5e7eb" /><stop offset="0.5" stopColor="#9ca3af" /><stop offset="1" stopColor="#4b5563" /></radialGradient>
          <linearGradient id="inlet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1e3a8a" /><stop offset="1" stopColor="#3b82f6" /></linearGradient>
          <linearGradient id="outlet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ef4444" /><stop offset="1" stopColor="#7f1d1d" /></linearGradient>
          <radialGradient id="fblue" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#93c5fd" /><stop offset="1" stopColor="#2563eb" /></radialGradient>
        </defs>
        <rect x={0} y={0} width={400} height={240} fill="url(#pbg)" />
        <text x={20} y={22} fill="#93c5fd" fontSize={11}>INLET · suction</text>
        <text x={300} y={22} fill="#fca5a5" fontSize={11}>OUTLET · pressure</text>
        {kind === "gear" && <Gear a={a} />}
        {kind === "vane" && <Vane a={a} />}
        {kind === "piston" && <Piston a={a} />}
        {kind === "centrifugal" && <Centrifugal a={a} />}
      </svg>

      <div className="grid grid-cols-2 gap-3">
        <Stat label="Type" value={info.disp} color={positive ? "#f59e0b" : "#3b82f6"} />
        <Stat label="Characteristic" value={positive ? "High pressure · fixed flow/rev" : "High flow · low pressure"} />
      </div>
      <div className="rounded-xl p-3 border border-zinc-800 bg-zinc-900/50">
        <div className="text-sm font-bold text-white">{info.label} pump</div>
        <div className="text-zinc-300 text-sm mt-0.5">{info.note}</div>
      </div>
    </div>
  );
}

function fluid(cx: number, cy: number, r: number, a: number, n: number, spin = 1) {
  return Array.from({ length: n }).map((_, i) => {
    const ang = ((a * spin + (i * 360) / n) * Math.PI) / 180;
    return <circle key={i} cx={cx + r * Math.cos(ang)} cy={cy + r * Math.sin(ang)} r={3.5} fill="url(#fblue)" opacity={0.9} />;
  });
}

function toothGear(cx: number, dir: number, a: number) {
  const teeth = 10, rOut = 34, rIn = 24;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a0 = ((a * dir + i * 36) * Math.PI) / 180;
    const a1 = ((a * dir + i * 36 + 18) * Math.PI) / 180;
    const a2 = ((a * dir + (i + 1) * 36) * Math.PI) / 180;
    d += `${i ? "L" : "M"}${cx + rOut * Math.cos(a0)},${120 + rOut * Math.sin(a0)} L${cx + rOut * Math.cos(a1)},${120 + rOut * Math.sin(a1)} L${cx + rIn * Math.cos(a1)},${120 + rIn * Math.sin(a1)} L${cx + rIn * Math.cos(a2)},${120 + rIn * Math.sin(a2)} `;
  }
  return d + "Z";
}

function Gear({ a }: { a: number }) {
  return (
    <g>
      <rect x={30} y={112} width={95} height={16} rx={6} fill="url(#inlet)" />
      <rect x={275} y={112} width={95} height={16} rx={6} fill="url(#outlet)" />
      <rect x={118} y={70} width={164} height={100} rx={14} fill="#1f2630" stroke="#3f4654" />
      <path d={toothGear(165, 1, a)} fill="url(#metal)" stroke="#334155" strokeWidth={1} />
      <path d={toothGear(235, -1, a)} fill="url(#metal)" stroke="#334155" strokeWidth={1} />
      <circle cx={165} cy={120} r={6} fill="#1f2937" /><circle cx={235} cy={120} r={6} fill="#1f2937" />
      {fluid(165, 120, 40, a, 7)}{fluid(235, 120, 40, -a, 7)}
    </g>
  );
}

function Vane({ a }: { a: number }) {
  return (
    <g>
      <rect x={30} y={112} width={80} height={16} rx={6} fill="url(#inlet)" />
      <rect x={290} y={112} width={80} height={16} rx={6} fill="url(#outlet)" />
      <circle cx={200} cy={120} r={72} fill="#1f2630" stroke="#3f4654" strokeWidth={2} />
      <g transform={`rotate(${a} 208 120)`}>
        <circle cx={208} cy={120} r={42} fill="url(#metal)" stroke="#334155" />
        {Array.from({ length: 6 }).map((_, i) => {
          const ang = (i * 60 * Math.PI) / 180;
          return <rect key={i} x={208 + 40 * Math.cos(ang) - 2} y={120 + 40 * Math.sin(ang) - 14} width={4} height={28} rx={2} fill="#cbd5e1" transform={`rotate(${i * 60 + 90} ${208 + 40 * Math.cos(ang)} ${120 + 40 * Math.sin(ang)})`} />;
        })}
        <circle cx={208} cy={120} r={8} fill="#1f2937" />
      </g>
      {fluid(200, 120, 58, a, 9)}
    </g>
  );
}

function Piston({ a }: { a: number }) {
  const pos = (1 - Math.cos((a * Math.PI) / 180)) / 2;
  const px = 150 + pos * 64;
  const intake = Math.sin((a * Math.PI) / 180) > 0;
  return (
    <g>
      <rect x={118} y={92} width={168} height={56} rx={8} fill="#1f2630" stroke="#3f4654" />
      <rect x={122} y={96} width={px - 122} height={48} fill="url(#fblue)" opacity={0.3} />
      <rect x={px} y={97} width={26} height={46} rx={4} fill="url(#metal)" stroke="#334155" />
      <line x1={px + 26} y1={120} x2={px + 64} y2={120} stroke="#cbd5e1" strokeWidth={5} strokeLinecap="round" />
      <rect x={120} y={150} width={14} height={18} rx={3} fill="url(#inlet)" />
      <circle cx={140} cy={166} r={8} fill={intake ? "#3b82f6" : "#475569"} stroke="#1e3a8a" />
      <text x={140} y={190} fill="#93c5fd" fontSize={9} textAnchor="middle">inlet</text>
      <rect x={183} y={72} width={14} height={20} rx={3} fill="url(#outlet)" />
      <circle cx={190} cy={72} r={8} fill={!intake ? "#ef4444" : "#475569"} stroke="#7f1d1d" />
      <text x={190} y={60} fill="#fca5a5" fontSize={9} textAnchor="middle">outlet</text>
      <text x={235} y={185} fill="#94a3b8" fontSize={10} textAnchor="middle">{intake ? "Down-stroke: drawing in" : "Up-stroke: delivering"}</text>
    </g>
  );
}

function Centrifugal({ a }: { a: number }) {
  return (
    <g>
      <rect x={192} y={36} width={16} height={52} rx={6} fill="url(#inlet)" />
      <text x={150} y={52} fill="#93c5fd" fontSize={10}>in · centre</text>
      <path d="M278,112 h92 v16 h-92 z" fill="url(#outlet)" />
      <circle cx={200} cy={120} r={80} fill="#1f2630" stroke="#3f4654" strokeWidth={2} />
      <g transform={`rotate(${a} 200 120)`}>
        <circle cx={200} cy={120} r={66} fill="#171c24" />
        {Array.from({ length: 7 }).map((_, i) => {
          const ang = (i * (360 / 7) * Math.PI) / 180;
          return <path key={i} d={`M${200 + 14 * Math.cos(ang)},${120 + 14 * Math.sin(ang)} Q${200 + 46 * Math.cos(ang + 0.55)},${120 + 46 * Math.sin(ang + 0.55)} ${200 + 64 * Math.cos(ang + 0.95)},${120 + 64 * Math.sin(ang + 0.95)}`} fill="none" stroke="url(#metal)" strokeWidth={4} strokeLinecap="round" />;
        })}
        <circle cx={200} cy={120} r={12} fill="url(#metal)" stroke="#334155" />
      </g>
      {fluid(200, 120, 72, a, 11, 1.5)}
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
