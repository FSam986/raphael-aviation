// One flagship illustration per exam paper, in the modern visual-first style
// learnt from the reference set. Accurate, dense, teach-the-topic pictorially.
// Cessna 172 is the standard aircraft. In-house vector art — nothing copied.

import type { ReactNode } from "react";
import { Cessna172Side, Cessna172Top, Cessna172Front } from "@/app/components/figures/cessna172";

function Plate({ badge, title, accent, children, vb, dark = false }: { badge: string; title: string; accent: string; children: ReactNode; vb: string; dark?: boolean }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-800" style={{ background: dark ? "#0b1120" : "#fff" }}>
      <svg viewBox={vb} className="w-full" fontFamily="ui-sans-serif, system-ui, sans-serif">
        <rect x="0" y="0" width="400" height="44" fill={dark ? "#020617" : "#0f172a"} />
        <rect x="14" y="12" width="74" height="20" rx="5" fill={accent} />
        <text x="51" y="26" fontSize="10.5" fontWeight="800" fill="#fff" textAnchor="middle">{badge}</text>
        <text x="98" y="27" fontSize="14" fontWeight="800" fill="#fff">{title}</text>
        {children}
      </svg>
    </div>
  );
}
const arrow = (x1: number, y1: number, x2: number, y2: number, col: string, w = 3, id = "") => {
  const a = Math.atan2(y2 - y1, x2 - x1); const h = 6;
  return <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth={w} strokeLinecap="round" /><path d={`M${x2},${y2} L${x2 - h * Math.cos(a - 0.4)},${y2 - h * Math.sin(a - 0.4)} L${x2 - h * Math.cos(a + 0.4)},${y2 - h * Math.sin(a + 0.4)} Z`} fill={col} /></g>;
};

/* ── AIRCRAFT STANDARD — Cessna 172 three-view with dimensions ── */
export function CessnaStandard() {
  return (
    <Plate badge="AIRCRAFT" title="Cessna 172 — the standard" accent="#2563eb" vb="0 0 400 300">
      <rect x="0" y="44" width="400" height="256" fill="#f8fafc" />
      {/* TOP */}
      <Cessna172Top x={95} y={150} s={1.45} />
      <text x="95" y="66" fontSize="8" fontWeight="700" fill="#475569" textAnchor="middle">TOP</text>
      <g stroke="#94a3b8" strokeWidth="0.7"><line x1="30" y1="110" x2="160" y2="110" /><line x1="30" y1="107" x2="30" y2="113" /><line x1="160" y1="107" x2="160" y2="113" /></g>
      <text x="95" y="105" fontSize="7.5" fill="#334155" textAnchor="middle">span 11.0 m</text>
      {/* FRONT */}
      <Cessna172Front x={300} y={116} s={1.3} />
      <text x="300" y="66" fontSize="8" fontWeight="700" fill="#475569" textAnchor="middle">FRONT</text>
      <text x="300" y="158" fontSize="7" fill="#334155" textAnchor="middle">track 2.54 m</text>
      {/* SIDE */}
      <Cessna172Side x={210} y={240} s={1.6} />
      <text x="60" y="240" fontSize="8" fontWeight="700" fill="#475569">SIDE</text>
      <g stroke="#94a3b8" strokeWidth="0.7"><line x1="120" y1="278" x2="300" y2="278" /><line x1="120" y1="275" x2="120" y2="281" /><line x1="300" y1="275" x2="300" y2="281" /></g>
      <text x="210" y="288" fontSize="7.5" fill="#334155" textAnchor="middle">length 8.28 m · height 2.72 m</text>
    </Plate>
  );
}

/* ── METEOROLOGY — warm & cold fronts cross-section ── */
export function MetFronts() {
  const cloud = (cx: number, cy: number, s: number, fill = "#e2e8f0") => (
    <g transform={`translate(${cx} ${cy}) scale(${s})`} fill={fill} stroke="#94a3b8" strokeWidth="0.4">
      <ellipse cx="0" cy="0" rx="12" ry="7" /><ellipse cx="9" cy="2" rx="9" ry="6" /><ellipse cx="-9" cy="2" rx="8" ry="5" />
    </g>
  );
  return (
    <Plate badge="MET" title="Warm & Cold Fronts" accent="#0891b2" vb="0 0 400 300">
      <rect x="0" y="44" width="200" height="256" fill="#eff6ff" /><rect x="200" y="44" width="200" height="256" fill="#fef2f2" />
      <line x1="200" y1="44" x2="200" y2="300" stroke="#cbd5e1" strokeDasharray="3 3" />
      <text x="100" y="62" fontSize="10" fontWeight="800" fill="#1d4ed8" textAnchor="middle">WARM FRONT</text>
      <text x="300" y="62" fontSize="10" fontWeight="800" fill="#b91c1c" textAnchor="middle">COLD FRONT</text>
      {/* ground */}
      <rect x="0" y="270" width="400" height="30" fill="#3f6f43" />
      {/* WARM front: shallow slope, warm air rides over cold, stratiform + rain */}
      <path d="M6,270 L150,150" stroke="#dc2626" strokeWidth="2" />
      <path d="M170,270 L60,270" stroke="#0f172a" strokeWidth="0" />
      {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={20 + k * 26} cy={270 - k * 22} r="4" fill="#dc2626" />)}
      {cloud(60, 240, 0.8)}{cloud(95, 205, 0.9)}{cloud(130, 172, 1)}
      <text x="52" y="250" fontSize="7" fill="#334155">Ns</text><text x="92" y="196" fontSize="7" fill="#334155">As</text><text x="128" y="160" fontSize="7" fill="#334155">Cs/Ci</text>
      {[0, 1, 2, 3].map((k) => <line key={k} x1={40 + k * 7} y1={262} x2={38 + k * 7} y2={270} stroke="#2563eb" strokeWidth="0.8" />)}
      <text x="18" y="230" fontSize="7.5" fill="#7f1d1d">warm air</text><text x="150" y="266" fontSize="7.5" fill="#1e3a8a" textAnchor="end">cold air</text>
      <text x="100" y="290" fontSize="7.5" fontWeight="700" fill="#0f172a" textAnchor="middle">slope ≈ 1:150 (gentle)</text>
      {/* COLD front: steep, cold undercuts warm, Cu/Cb */}
      <path d="M300,270 C290,220 280,150 300,90" stroke="#2563eb" strokeWidth="2" fill="none" />
      {[0, 1, 2, 3].map((k) => <g key={k}>{arrow(220 + k * 4, 250 - k * 2, 255 + k * 4, 250 - k * 2, "#2563eb", 1.4)}</g>)}
      <g transform="translate(295 130)" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.4"><ellipse cx="0" cy="0" rx="18" ry="26" /><ellipse cx="-14" cy="14" rx="10" ry="9" /><ellipse cx="12" cy="18" rx="9" ry="8" /><rect x="-20" y="-30" width="40" height="10" rx="5" fill="#e2e8f0" /></g>
      <text x="300" y="120" fontSize="7.5" fill="#334155" textAnchor="middle">Cb</text>
      {[0, 1, 2].map((k) => <line key={k} x1={288 + k * 8} y1={162} x2={285 + k * 8} y2={175} stroke="#2563eb" strokeWidth="1" />)}
      <text x="335" y="230" fontSize="7.5" fill="#7f1d1d">warm air</text><text x="240" y="266" fontSize="7.5" fill="#1e3a8a">cold air undercuts</text>
      <text x="300" y="290" fontSize="7.5" fontWeight="700" fill="#0f172a" textAnchor="middle">slope ≈ 1:50 (steep)</text>
    </Plate>
  );
}

/* ── NAVIGATION — triangle of velocities ── */
export function NavTriangle() {
  return (
    <Plate badge="NAV" title="Triangle of Velocities" accent="#7c3aed" vb="0 0 400 300">
      <rect x="0" y="44" width="400" height="256" fill="#f8fafc" />
      {/* north */}
      <g transform="translate(40 80)"><line x1="0" y1="18" x2="0" y2="-6" stroke="#0f172a" strokeWidth="1.4" /><path d="M0,-10 l-4,7 l8,0 Z" fill="#0f172a" /><text x="0" y="32" fontSize="8" fontWeight="700" textAnchor="middle">N</text></g>
      {/* air vector: heading + TAS (blue) */}
      {arrow(90, 250, 250, 120, "#2563eb", 3)}
      <text x="150" y="205" fontSize="8.5" fontWeight="800" fill="#1d4ed8" transform="rotate(-39 150 205)">HDG / TAS (air vector)</text>
      {/* wind vector (cyan) from head of air vector */}
      {arrow(250, 120, 320, 150, "#0891b2", 3)}
      <text x="255" y="118" fontSize="8.5" fontWeight="800" fill="#0e7490">W/V (wind)</text>
      {/* ground vector: track + GS (green) origin to head of wind */}
      {arrow(90, 250, 320, 150, "#16a34a", 3)}
      <text x="180" y="235" fontSize="8.5" fontWeight="800" fill="#15803d" transform="rotate(-24 180 235)">TR / GS (ground vector)</text>
      {/* drift angle marker */}
      <path d="M140,224 A 60 60 0 0 1 155 210" fill="none" stroke="#ef4444" strokeWidth="1.4" />
      <text x="168" y="222" fontSize="8" fontWeight="700" fill="#b91c1c">drift</text>
      {/* Cessna on the track line */}
      <Cessna172Top x={205} y={205} s={0.8} rot={65} />
      {/* legend */}
      <g transform="translate(250 210)">
        <rect x="0" y="0" width="140" height="82" rx="6" fill="#fff" stroke="#e2e8f0" />
        <text x="10" y="16" fontSize="8" fontWeight="800" fill="#0f172a">Air vector + Wind = Ground</text>
        {[["#2563eb", "HDG & TAS — where nose points"], ["#0891b2", "W/V — wind pushes aircraft"], ["#16a34a", "TR & GS — actual path/speed"], ["#ef4444", "drift = HDG − TR angle"]].map(([c, t], i) => (
          <g key={i}><rect x="10" y={24 + i * 13} width="10" height="5" fill={c as string} /><text x="26" y={29 + i * 13} fontSize="7" fill="#334155">{t as string}</text></g>
        ))}
      </g>
    </Plate>
  );
}

/* ── FLIGHT PLANNING & PERFORMANCE — weight & balance / CG envelope ── */
export function FppWeightBalance() {
  return (
    <Plate badge="FPP" title="Weight & Balance" accent="#f59e0b" vb="0 0 400 300">
      <rect x="0" y="44" width="400" height="256" fill="#f8fafc" />
      {/* datum + arms on a Cessna side */}
      <Cessna172Side x={210} y={110} s={1.7} />
      <line x1="150" y1="70" x2="150" y2="150" stroke="#ef4444" strokeWidth="1.4" strokeDasharray="4 3" /><text x="150" y="66" fontSize="7.5" fontWeight="700" fill="#b91c1c" textAnchor="middle">DATUM</text>
      {([["pilot+pax", 210, 118], ["fuel", 235, 100], ["baggage", 285, 120]] as [string, number, number][]).map(([l, x, y]) => (
        <g key={l}><line x1="150" y1="150" x2={x} y2="150" stroke="#94a3b8" strokeWidth="0.6" /><line x1={x} y1="150" x2={x} y2={y} stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" /><text x={x} y="162" fontSize="6.5" fill="#334155" textAnchor="middle">{l}</text></g>
      ))}
      <text x="90" y="150" fontSize="7" fill="#334155">arm →</text>
      {/* formula */}
      <rect x="14" y="176" width="180" height="40" rx="6" fill="#fffbeb" stroke="#fde68a" />
      <text x="24" y="192" fontSize="9" fontWeight="800" fill="#92400e">CG = Σ moments ÷ Σ weight</text>
      <text x="24" y="207" fontSize="7.5" fill="#334155">moment = weight × arm (each item)</text>
      {/* CG envelope graph */}
      <g transform="translate(210 176)">
        <rect x="0" y="0" width="176" height="112" rx="6" fill="#fff" stroke="#e2e8f0" />
        <text x="88" y="14" fontSize="8" fontWeight="800" fill="#0f172a" textAnchor="middle">CG envelope</text>
        <line x1="24" y1="98" x2="164" y2="98" stroke="#475569" /><line x1="24" y1="98" x2="24" y2="24" stroke="#475569" />
        <text x="90" y="108" fontSize="6.5" fill="#64748b" textAnchor="middle">CG (arm)</text><text x="14" y="60" fontSize="6.5" fill="#64748b" transform="rotate(-90 14 60)" textAnchor="middle">weight</text>
        <path d="M50,90 L70,34 L120,34 L140,66 L120,90 Z" fill="#22c55e" opacity="0.14" stroke="#16a34a" />
        <circle cx="96" cy="62" r="3.5" fill="#dc2626" /><text x="102" y="60" fontSize="6.5" fontWeight="700" fill="#b91c1c">loaded</text>
        <text x="90" y="86" fontSize="6" fill="#15803d" textAnchor="middle">within limits ✓</text>
      </g>
    </Plate>
  );
}

/* ── PRINCIPLES OF FLIGHT — four forces + airfoil ── */
export function PofFourForces() {
  return (
    <Plate badge="POF" title="Four Forces & Aerofoil" accent="#16a34a" vb="0 0 400 300">
      <rect x="0" y="44" width="400" height="256" fill="#eef6ff" />
      {/* Cessna level with four forces balanced */}
      <Cessna172Side x={150} y={140} s={1.9} />
      {arrow(150, 120, 150, 70, "#2563eb", 3)}<text x="150" y="64" fontSize="9" fontWeight="800" fill="#1d4ed8" textAnchor="middle">LIFT</text>
      {arrow(150, 165, 150, 215, "#dc2626", 3)}<text x="150" y="228" fontSize="9" fontWeight="800" fill="#b91c1c" textAnchor="middle">WEIGHT</text>
      {arrow(150, 143, 250, 143, "#16a34a", 3)}<text x="258" y="146" fontSize="9" fontWeight="800" fill="#15803d">THRUST</text>
      {arrow(150, 143, 60, 143, "#f59e0b", 3)}<text x="52" y="146" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="end">DRAG</text>
      <text x="200" y="180" fontSize="7.5" fill="#334155">steady level flight: Lift = Weight, Thrust = Drag</text>
      {/* airfoil inset with AoA */}
      <g transform="translate(210 210)">
        <rect x="0" y="0" width="176" height="82" rx="6" fill="#fff" stroke="#e2e8f0" />
        <path d="M20,55 C40,40 90,38 150,48 C100,50 55,52 20,55 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="0.6" />
        <line x1="20" y1="55" x2="150" y2="48" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 2" /><text x="150" y="60" fontSize="6" fill="#64748b">chord</text>
        {arrow(6, 62, 40, 58, "#0891b2", 1.6)}<text x="4" y="72" fontSize="6.5" fill="#0e7490">relative airflow</text>
        <path d="M22,58 A 18 18 0 0 1 40 55" fill="none" stroke="#ef4444" strokeWidth="1" /><text x="30" y="50" fontSize="7" fontWeight="700" fill="#b91c1c">α</text>
        {arrow(80, 44, 80, 18, "#2563eb", 1.8)}<text x="84" y="24" fontSize="6.5" fill="#1d4ed8">lift</text>
        <text x="96" y="76" fontSize="6.5" fill="#334155">L = ½ ρ V² S C_L</text>
      </g>
    </Plate>
  );
}

/* ── AIRCRAFT TECHNICAL (AGK) — four-stroke cycle ── */
export function AgkFourStroke() {
  const cyl = (x: number, label: string, pistonY: number, inO: boolean, exO: boolean, spark: boolean, col: string) => (
    <g transform={`translate(${x} 70)`}>
      <rect x="0" y="0" width="60" height="120" rx="4" fill="#f1f5f9" stroke="#94a3b8" />
      {/* valves */}
      <rect x="10" y="-6" width="8" height="14" rx="1" fill={inO ? "#22c55e" : "#94a3b8"} /><rect x="42" y="-6" width="8" height="14" rx="1" fill={exO ? "#ef4444" : "#94a3b8"} />
      <text x="14" y="-10" fontSize="6" fill="#16a34a" textAnchor="middle">in</text><text x="46" y="-10" fontSize="6" fill="#b91c1c" textAnchor="middle">ex</text>
      {/* combustion space */}
      <rect x="6" y="10" width="48" height={pistonY - 10} fill={spark ? "#fca5a5" : "#dbeafe"} opacity="0.7" />
      {spark && <circle cx="30" cy="16" r="2.5" fill="#f59e0b" />}
      {/* piston */}
      <rect x="6" y={pistonY} width="48" height="18" rx="2" fill="#64748b" /><line x1="30" y1={pistonY + 18} x2="30" y2="112" stroke="#334155" strokeWidth="2" />
      <text x="30" y="132" fontSize="7.5" fontWeight="800" fill={col} textAnchor="middle">{label}</text>
    </g>
  );
  return (
    <Plate badge="AGK" title="Four-Stroke Cycle" accent="#dc2626" vb="0 0 400 240">
      <rect x="0" y="44" width="400" height="196" fill="#f8fafc" />
      {cyl(20, "1 INTAKE", 78, true, false, false, "#16a34a")}
      {cyl(112, "2 COMPRESS", 22, false, false, false, "#2563eb")}
      {cyl(212, "3 POWER", 78, false, false, true, "#dc2626")}
      {cyl(312, "4 EXHAUST", 22, false, true, false, "#64748b")}
      <text x="200" y="212" fontSize="8.5" fontWeight="700" fill="#0f172a" textAnchor="middle">"Suck · Squeeze · Bang · Blow"  —  one power stroke every 2 crank revolutions</text>
      <text x="200" y="228" fontSize="7" fill="#64748b" textAnchor="middle">green = inlet valve open · red = exhaust valve open · orange = spark (ignition)</text>
    </Plate>
  );
}

/* ── HUMAN PERFORMANCE — hypoxia / time of useful consciousness ── */
export function HpHypoxia() {
  const rows: [string, string, number][] = [
    ["FL180", "20–30 min", 0.9], ["FL250", "3–5 min", 0.55], ["FL300", "1–2 min", 0.32], ["FL350", "30–60 s", 0.18], ["FL400", "15–20 s", 0.1],
  ];
  return (
    <Plate badge="HP" title="Hypoxia · TUC vs Altitude" accent="#7c3aed" vb="0 0 400 280">
      <rect x="0" y="44" width="400" height="236" fill="#f8fafc" />
      {/* climbing Cessna */}
      <Cessna172Side x={70} y={90} s={1.1} rot={12} />
      <text x="14" y="62" fontSize="8" fontWeight="700" fill="#5b21b6">Time of Useful Consciousness</text>
      {rows.map(([fl, t, w], i) => {
        const y = 78 + i * 34; const bw = w * 200;
        return (
          <g key={fl}>
            <text x="150" y={y + 14} fontSize="9" fontWeight="800" fill="#0f172a" textAnchor="end">{fl}</text>
            <rect x="160" y={y} width={bw} height="22" rx="4" fill="#7c3aed" opacity="0.8" />
            <text x={160 + bw + 6} y={y + 15} fontSize="8.5" fontWeight="800" fill="#5b21b6">{t}</text>
          </g>
        );
      })}
      <text x="14" y="262" fontSize="7.5" fill="#64748b">Higher & faster onset with altitude. Symptoms: euphoria, blue lips/nails, poor judgement, tunnel vision. Values approximate.</text>
    </Plate>
  );
}
