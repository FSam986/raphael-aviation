"use client";

import { useMemo, useState } from "react";

// Fully-coded, physics-responsive aerofoil. Streamlines are recomputed every
// frame from the angle of attack: they bend around the section, compress (speed
// up) over the top, and SEPARATE into turbulence past the critical angle (stall).
const CRIT = 16;
const CLMAX = 1.5;
function clFor(a: number): number {
  if (a <= CRIT) return Math.max(0, 0.25 + (a + 4) * (CLMAX / (CRIT + 4)));
  return Math.max(0.5, CLMAX - (a - CRIT) * 0.22);
}

const CX = 340, CY = 172, CHORD = 230; // airfoil centre + chord
const PIVOT = CX - CHORD * 0.25; // rotate about quarter-chord

// a cambered aerofoil section, chord along x, before rotation
function foilPath(): string {
  const x0 = CX - CHORD / 2, x1 = CX + CHORD / 2;
  return `M${x0},${CY} C${x0 + 30},${CY - 34} ${CX + 20},${CY - 30} ${x1},${CY - 4} C${CX + 10},${CY + 2} ${x0 + 40},${CY + 16} ${x0},${CY} Z`;
}

export default function AerofoilSim() {
  const [aoa, setAoa] = useState(6);
  const cl = clFor(aoa);
  const stalled = aoa > CRIT;
  const warn = !stalled && aoa > CRIT - 3;
  const accent = stalled ? "#ef4444" : warn ? "#f59e0b" : "#22c55e";
  const sep = Math.max(0, aoa - (CRIT - 4)) / 8; // separation progress 0..1

  // deflection of a streamline passing at entry height y0, at x, for this AoA
  const streams = useMemo(() => {
    const lines: { d: string; upper: boolean }[] = [];
    const ys = [70, 96, 122, 144, 168, 196, 224, 252, 278];
    for (const y0 of ys) {
      const above = y0 < CY; // upper-surface line
      const dist = Math.abs(y0 - CY);
      const near = 1 / (1 + dist / 55); // 1 at centreline, falls with distance
      const pts: [number, number][] = [];
      for (let x = 30; x <= 650; x += 14) {
        const prox = Math.exp(-((x - CX) ** 2) / (2 * 115 * 115));
        // hug the surface: upper lines rise, lower lines dip, scaled by AoA
        const hug = (above ? -1 : 1) * (14 + aoa * 1.5) * prox * near;
        // downwash aft of the section, grows with AoA
        const aft = x > CX ? aoa * 0.85 * (1 - Math.exp(-(x - CX) / 150)) * (0.5 + near * 0.6) : 0;
        let y = y0 + hug + aft;
        // STALL: upper lines separate — break away above the aft section into turbulence
        if (stalled && above && x > CX - 40) {
          const t = (x - (CX - 40)) / 240;
          y -= sep * 26 * Math.max(0, 1 - t); // lift off the surface
          y += sep * 10 * Math.sin((x + aoa * 8) / 16); // ragged
        }
        pts.push([x, y]);
      }
      lines.push({ d: pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(0) + "," + p[1].toFixed(1)).join(" "), upper: above });
    }
    return lines;
  }, [aoa, stalled, sep]);

  const eddies = useMemo(() => {
    if (!stalled) return [];
    const out: { x: number; y: number; r: number }[] = [];
    const n = 6 + Math.round(sep * 5);
    for (let i = 0; i < n; i++) out.push({ x: CX + 10 + (i % 4) * 60, y: CY - 40 - (Math.floor(i / 4) * 26) - sep * 10, r: 5 + (i % 3) * 4 });
    return out;
  }, [stalled, sep]);

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
  const liftLen = 26 + cl * 95;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Angle of attack" value={`${aoa}°`} />
        <Stat label="Lift coefficient CL" value={cl.toFixed(2)} />
        <Stat label="State" value={stalled ? "STALLED" : warn ? "Near stall" : "Attached"} color={accent} />
      </div>

      <svg viewBox="0 0 680 320" className="w-full rounded-xl border border-zinc-800">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b1f3a" /><stop offset="1" stopColor="#061120" />
          </linearGradient>
          <linearGradient id="wing" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f1f5f9" /><stop offset="0.5" stopColor="#cbd5e1" /><stop offset="1" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
        <rect x={0} y={0} width={680} height={320} fill="url(#sky)" />

        {streams.map((l, i) => (
          <path key={i} d={l.d} fill="none" stroke={l.upper ? "#38bdf8" : "#f87171"} strokeWidth={1.6} opacity={0.85}
            strokeDasharray={stalled && l.upper ? "6 5" : undefined} />
        ))}
        {eddies.map((e, i) => (
          <circle key={i} cx={e.x} cy={e.y} r={e.r} fill="none" stroke="#fca5a5" strokeWidth={1.6} opacity={0.8} />
        ))}

        <g transform={`rotate(${-aoa} ${PIVOT} ${CY})`}>
          <path d={foilPath()} fill="url(#wing)" stroke="#475569" strokeWidth={1.4} />
          <line x1={CX - CHORD / 2} y1={CY} x2={CX + CHORD / 2} y2={CY - 4} stroke="#64748b" strokeWidth={0.8} strokeDasharray="4 3" />
        </g>

        {/* lift vector (perpendicular to the free stream = up) */}
        <line x1={CX - 10} y1={CY - 6} x2={CX - 10} y2={CY - 6 - liftLen} stroke={stalled ? "#ef4444" : "#22c55e"} strokeWidth={5} />
        <polygon points={`${CX - 10},${CY - 6 - liftLen - 12} ${CX - 17},${CY - 6 - liftLen + 4} ${CX - 3},${CY - 6 - liftLen + 4}`} fill={stalled ? "#ef4444" : "#22c55e"} />
        <text x={CX + 2} y={CY - 6 - liftLen + 4} fill={stalled ? "#fca5a5" : "#86efac"} fontSize={14} fontWeight={700}>Lift</text>

        <text x={16} y={92} fill="#7dd3fc" fontSize={12}>Low pressure / high velocity</text>
        <text x={16} y={270} fill="#fca5a5" fontSize={12}>High pressure / low velocity</text>
        {(warn || stalled) && (
          <text x={CX} y={46} fill={accent} fontSize={15} fontWeight={700} textAnchor="middle">{stalled ? "STALL — airflow separated" : "Approaching stall"}</text>
        )}
      </svg>

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
          <path d={curve} fill="none" stroke="#38bdf8" strokeWidth={2} />
          <circle cx={dotX} cy={dotY} r={5} fill={accent} stroke="#fff" strokeWidth={1.5} />
        </svg>
        <p className="flex-1 min-w-[180px] text-zinc-400 text-sm leading-relaxed">
          Faster flow over the top means lower pressure (Bernoulli); the pressure difference is lift. Lift rises with angle of attack until the <span className="text-white font-medium">critical angle (~16°)</span> — then the flow separates, lift collapses and the wing stalls, at <em>any</em> airspeed.
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
