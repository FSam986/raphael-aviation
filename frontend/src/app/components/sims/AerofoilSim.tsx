"use client";

import { useMemo, useState } from "react";

// CL rises ~linearly with AoA (slope ~0.1/deg) to the critical angle (~16°),
// then the boundary layer separates and CL collapses — the stall.
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
  const tilt = (aoa - 4) * 0.5; // visual tilt of the rendered airfoil
  const accent = stalled ? "#ef4444" : warn ? "#f59e0b" : "#22c55e";

  const curve = useMemo(() => {
    let d = "";
    for (let a = -4; a <= 20; a++) {
      const x = 40 + ((a + 4) / 24) * 250;
      const y = 150 - (clFor(a) / CLMAX) * 120;
      d += (a === -4 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
    }
    return d;
  }, []);
  const dotX = 40 + ((aoa + 4) / 24) * 250;
  const dotY = 150 - (cl / CLMAX) * 120;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Angle of attack" value={`${aoa}°`} />
        <Stat label="Lift coefficient CL" value={cl.toFixed(2)} />
        <Stat label="State" value={stalled ? "STALLED" : warn ? "Near stall" : "Attached"} color={accent} />
      </div>

      <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-[#071428]">
        <img src="/sims/airfoil_scene.png" alt="Aerofoil in airflow" className="w-full block transition-transform duration-200"
          style={{ transform: `rotate(${tilt}deg) scale(1.04)` }} />
        {/* stall turbulence overlay */}
        {stalled && (
          <svg viewBox="0 0 560 290" className="absolute inset-0 w-full h-full pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <circle key={i} cx={300 + (i % 4) * 55} cy={120 + Math.floor(i / 4) * 34} r={7 + (i % 3) * 4} fill="none" stroke="#fca5a5" strokeWidth={2} opacity={0.8} />
            ))}
          </svg>
        )}
        {/* lift strength bar */}
        <div className="absolute top-2 right-2 bg-black/55 rounded-lg px-2.5 py-1.5">
          <div className="text-[10px] text-zinc-300 mb-1">Lift</div>
          <div className="w-3 h-20 bg-zinc-800 rounded relative overflow-hidden">
            <div className="absolute bottom-0 inset-x-0 transition-all" style={{ height: `${(cl / CLMAX) * 100}%`, background: accent }} />
          </div>
        </div>
        {(stalled || warn) && (
          <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md text-xs font-bold text-white" style={{ background: accent }}>
            {stalled ? "STALL — flow separated" : "Approaching stall"}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-zinc-400 text-xs w-28 shrink-0">Angle of attack</span>
        <input type="range" min={-4} max={20} step={1} value={aoa} onChange={(e) => setAoa(+e.target.value)} className="flex-1 accent-yellow-400" />
        <span className="text-white text-sm font-mono w-10 text-right">{aoa}°</span>
      </div>

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
