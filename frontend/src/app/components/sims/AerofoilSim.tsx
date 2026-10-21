"use client";

import { useMemo, useState } from "react";

// Angle of attack → lift / stall simulator. Physics: CL rises ~linearly with
// AoA (slope ~0.1/deg) to the critical angle (~16°), then the boundary layer
// separates and CL collapses. Stall speed Vs ∝ √(W / (ρ·S·CLmax)).
const CRIT = 16;
const CLMAX = 1.5;

function clFor(a: number): number {
  if (a <= CRIT) return Math.max(0, 0.25 + (a + 4) * (CLMAX / (CRIT + 4)));
  return Math.max(0.5, CLMAX - (a - CRIT) * 0.22);
}

export default function AerofoilSim() {
  const [aoa, setAoa] = useState(6);
  const cl = clFor(aoa);
  const stalled = aoa > CRIT;
  const warn = !stalled && aoa > CRIT - 3;
  const liftLen = 34 + cl * 90;

  const curve = useMemo(() => {
    let d = "";
    for (let a = -4; a <= 20; a++) {
      const x = 40 + ((a + 4) / 24) * 250;
      const y = 150 - (clFor(a) / CLMAX) * 120;
      d += (a === -4 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
    }
    return d;
  }, []);

  const streams = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i < 6; i++) {
      const y0 = 70 + i * 24;
      const bend = (1 - Math.abs(y0 - 160) / 95) * (6 + aoa * 1.1);
      if (!stalled) {
        out.push(`M60,${y0} C230,${y0 - bend} 370,${y0 - bend} 640,${y0}`);
      } else if (y0 < 160) {
        out.push(`M60,${y0} C210,${y0 - bend * 0.4} 320,${y0 - 4} 350,${y0 + 8}`);
      } else {
        out.push(`M60,${y0} C230,${y0 - bend * 0.5} 370,${y0 - bend * 0.5} 640,${y0}`);
      }
    }
    return out;
  }, [aoa, stalled]);

  const eddies = useMemo(() => {
    if (!stalled) return [];
    const out: { x: number; y: number; r: number }[] = [];
    for (let i = 0; i < 7; i++) out.push({ x: 380 + (i % 4) * 58, y: 86 + Math.floor(i / 4) * 40 + (i % 2) * 18, r: 5 + (i % 3) * 3 });
    return out;
  }, [stalled]);

  const dotX = 40 + ((aoa + 4) / 24) * 250;
  const dotY = 150 - (cl / CLMAX) * 120;
  const accent = stalled ? "#ef4444" : warn ? "#f59e0b" : "#22c55e";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Angle of attack" value={`${aoa}°`} />
        <Stat label="Lift coefficient CL" value={cl.toFixed(2)} />
        <Stat label="State" value={stalled ? "STALLED" : warn ? "Near stall" : "Attached"} color={accent} />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-zinc-400 text-xs w-28 shrink-0">Angle of attack</span>
        <input type="range" min={-4} max={20} step={1} value={aoa} onChange={(e) => setAoa(+e.target.value)} className="flex-1 accent-yellow-400" />
        <span className="text-white text-sm font-mono w-10 text-right">{aoa}°</span>
      </div>

      <svg viewBox="0 0 680 300" className="w-full rounded-xl bg-zinc-900 border border-zinc-800">
        {streams.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#3b82f6" strokeWidth={1.5} opacity={0.75} />
        ))}
        {eddies.map((e, i) => (
          <circle key={i} cx={e.x} cy={e.y} r={e.r} fill="none" stroke="#f87171" strokeWidth={1.4} opacity={0.75} />
        ))}
        <g transform={`translate(300 160) rotate(${-aoa})`}>
          <path d="M-120,0 C-90,-26 60,-30 120,-6 C70,2 -60,16 -120,0 Z" fill={stalled ? "#ef4444" : "#3b82f6"} stroke={stalled ? "#b91c1c" : "#1d4ed8"} strokeWidth={1.5} />
          <line x1={-120} y1={0} x2={120} y2={-6} stroke="#e2e8f0" strokeWidth={1} strokeDasharray="4 3" />
        </g>
        <line x1={300} y1={150} x2={300} y2={150 - liftLen} stroke={stalled ? "#ef4444" : "#22c55e"} strokeWidth={4} />
        <polygon points={`300,${150 - liftLen - 10} 294,${150 - liftLen + 6} 306,${150 - liftLen + 6}`} fill={stalled ? "#ef4444" : "#22c55e"} />
        <text x={312} y={150 - liftLen + 2} fill={stalled ? "#f87171" : "#4ade80"} fontSize={13} fontWeight={600}>Lift</text>
        <line x1={40} y1={162} x2={150} y2={162} stroke="#71717a" strokeWidth={2} />
        <polygon points="150,162 140,157 140,167" fill="#71717a" />
        <text x={42} y={152} fill="#a1a1aa" fontSize={11}>Relative airflow</text>
      </svg>

      <div className="flex gap-4 items-center flex-wrap">
        <svg viewBox="0 0 300 170" className="w-72 max-w-full shrink-0">
          <line x1={40} y1={150} x2={290} y2={150} stroke="#3f3f46" />
          <line x1={40} y1={20} x2={40} y2={150} stroke="#3f3f46" />
          <text x={165} y={168} fill="#71717a" fontSize={11} textAnchor="middle">Angle of attack →</text>
          <text x={14} y={85} fill="#71717a" fontSize={11} textAnchor="middle" transform="rotate(-90 14 85)">CL</text>
          <path d={curve} fill="none" stroke="#3b82f6" strokeWidth={2} />
          <circle cx={dotX} cy={dotY} r={5} fill={accent} stroke="#fff" strokeWidth={1.5} />
        </svg>
        <p className="flex-1 min-w-[180px] text-zinc-400 text-sm leading-relaxed">
          Lift rises almost linearly with angle of attack until the <span className="text-white font-medium">critical angle (~16°)</span>. Beyond it the boundary layer separates, CL collapses and the wing stalls — at <em>any</em> airspeed or attitude. Stall speed Vs ∝ √(weight ÷ CLmax).
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
      <div className="text-[11px] text-zinc-500">{label}</div>
      <div className="text-lg font-bold" style={{ color: color ?? "#fff" }}>{value}</div>
    </div>
  );
}
