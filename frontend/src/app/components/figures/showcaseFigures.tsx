// Quality-bar showcase: realistic aircraft, aligned runway, modern instrument
// panel, and radio-nav / propagation concepts (VOR/DME, SSR, GNSS, HF skip).
// In-house vector art — accurate, dense, modern. Refined for the study figures.

import type { ReactNode } from "react";

function Plate({ badge, title, accent, dark = false, children, vb }: { badge: string; title: string; accent: string; dark?: boolean; children: ReactNode; vb: string }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-800" style={{ background: dark ? "#0b1120" : "#fff" }}>
      <svg viewBox={vb} className="w-full" fontFamily="ui-sans-serif, system-ui, sans-serif">
        <rect x="0" y="0" width="400" height="42" fill={dark ? "#020617" : "#0f172a"} />
        <rect x="14" y="11" width="66" height="20" rx="5" fill={accent} />
        <text x="47" y="25" fontSize="11" fontWeight="800" fill="#fff" textAnchor="middle">{badge}</text>
        <text x="90" y="26" fontSize="14" fontWeight="800" fill="#fff">{title}</text>
        {children}
      </svg>
    </div>
  );
}

/* ── Realistic aircraft primitives ─────────────────────────────── */

// Side-view narrow-body airliner, nose-right, climbing pose when rot>0.
export function AirlinerSide({ x, y, s = 1, rot = 0, id = "al" }: { x: number; y: number; s?: number; rot?: number; id?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${-rot})`}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" /><stop offset="45%" stopColor="#eef2f7" /><stop offset="100%" stopColor="#c3cbd6" />
        </linearGradient>
        <linearGradient id={`${id}-wing`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" /><stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="2.5" stdDeviation="2.2" floodColor="#0f172a" floodOpacity="0.28" /></filter>
      </defs>
      <g filter={`url(#${id}-sh)`}>
        {/* far wing + engine (behind) */}
        <path d="M6,7 L44,7 L20,30 L4,30 Z" fill={`url(#${id}-wing)`} opacity="0.75" />
        {/* horizontal stabiliser */}
        <path d="M-64,-2 L-40,-3 L-44,-12 L-60,-12 Z" fill={`url(#${id}-wing)`} />
        {/* tail fin */}
        <path d="M-58,-4 L-40,-40 L-30,-40 L-40,-4 Z" fill="#1e3a8a" />
        <path d="M-49,-20 L-40,-40 L-30,-40 L-37,-20 Z" fill="#3b82f6" opacity="0.7" />
        {/* fuselage */}
        <path d="M70,-2 C64,-13 52,-16 34,-16 L-58,-14 C-66,-14 -70,-8 -70,-2 C-70,6 -64,12 -50,13 L36,12 C56,12 66,6 70,-2 Z" fill={`url(#${id}-body)`} stroke="#94a3b8" strokeWidth="0.6" />
        {/* nose cockpit window */}
        <path d="M70,-2 C66,-9 60,-12 52,-13 C56,-9 57,-4 56,-1 Z" fill="#1e293b" />
        {/* livery cheatline */}
        <path d="M-66,2 L64,1" stroke="#1e3a8a" strokeWidth="2.4" strokeLinecap="round" />
        {/* cabin windows */}
        {Array.from({ length: 22 }).map((_, i) => <circle key={i} cx={44 - i * 5} cy={-5} r={1.15} fill="#334155" />)}
        {/* near wing (front) */}
        <path d="M18,8 L60,9 L30,33 L8,33 Z" fill={`url(#${id}-wing)`} stroke="#64748b" strokeWidth="0.5" />
        {/* winglet */}
        <path d="M56,9 L64,4 L66,9 L60,12 Z" fill="#1e3a8a" />
        {/* engine nacelle under near wing */}
        <g><ellipse cx="30" cy="24" rx="12" ry="7" fill="#475569" /><ellipse cx="41" cy="24" rx="3.4" ry="6" fill="#0b1120" /><ellipse cx="19" cy="24" rx="2.4" ry="6" fill="#64748b" /></g>
        {/* main gear */}
        <line x1="16" y1="12" x2="14" y2="24" stroke="#334155" strokeWidth="1.6" /><circle cx="14" cy="25" r="3" fill="#0f172a" />
        <line x1="52" y1="10" x2="54" y2="20" stroke="#334155" strokeWidth="1.6" /><circle cx="55" cy="21" r="2.6" fill="#0f172a" />
      </g>
    </g>
  );
}

// Top-view high-wing light aircraft (Cessna-like), nose-up.
export function LightPlaneTop({ x, y, s = 1, rot = 0, id = "lp" }: { x: number; y: number; s?: number; rot?: number; id?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
      <defs>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#e2e8f0" /><stop offset="50%" stopColor="#f8fafc" /><stop offset="100%" stopColor="#cbd5e1" /></linearGradient>
        <linearGradient id={`${id}-w`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f1f5f9" /><stop offset="100%" stopColor="#b8c2d0" /></linearGradient>
        <filter id={`${id}-s`}><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.3" /></filter>
      </defs>
      <g filter={`url(#${id}-s)`}>
        <rect x="-30" y="-3.5" width="60" height="7" rx="3.5" fill={`url(#${id}-w)`} stroke="#94a3b8" strokeWidth="0.5" />{/* wing */}
        <path d="M-3,-26 C-3,-30 3,-30 3,-26 L4,20 L2,26 L-2,26 L-4,20 Z" fill={`url(#${id}-f)`} stroke="#94a3b8" strokeWidth="0.5" />{/* fuselage */}
        <rect x="-9" y="18" width="18" height="4.5" rx="2" fill={`url(#${id}-w)`} stroke="#94a3b8" strokeWidth="0.4" />{/* tailplane */}
        <path d="M-2,-26 L2,-26 L1,-31 L-1,-31 Z" fill="#334155" />{/* spinner */}
        <ellipse cx="0" cy="-31" rx="16" ry="2" fill="#334155" opacity="0.5" />{/* prop disc */}
        <path d="M-2.6,-20 L2.6,-20 L2,-11 L-2,-11 Z" fill="#1e3a8a" opacity="0.85" />{/* windscreen/cabin */}
        <circle cx="0" cy="2" r="1.4" fill="#1e3a8a" />
      </g>
    </g>
  );
}

// Perspective runway receding to a vanishing point, with markings.
function RunwayPersp({ id = "rw" }: { id?: string }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-tar`} x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#3f4652" /><stop offset="100%" stopColor="#1f2530" /></linearGradient>
        <linearGradient id={`${id}-grass`} x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#3f6f43" /><stop offset="100%" stopColor="#213a24" /></linearGradient>
      </defs>
      <rect x="0" y="150" width="400" height="140" fill={`url(#${id}-grass)`} />
      {/* runway trapezoid */}
      <path d="M120,290 L280,290 L214,158 L186,158 Z" fill={`url(#${id}-tar)`} />
      {/* threshold bars */}
      {[-3, -2, -1, 1, 2, 3].map((k) => <rect key={k} x={200 + k * 9 - 3} y="278" width="6" height="10" fill="#e5e7eb" />)}
      {/* centreline dashes (converging) */}
      {[0, 1, 2, 3, 4].map((k) => { const t = k / 5; const w = 4 - t * 3; const y = 288 - t * 122; return <rect key={k} x={200 - w / 2} y={y} width={w} height={10 - t * 7} fill="#f8fafc" />; })}
      {/* runway number */}
      <text x="200" y="286" fontSize="9" fontWeight="800" fill="#e5e7eb" textAnchor="middle" transform="rotate(0 200 286)">09</text>
    </g>
  );
}

/* ── Plate 1: Aircraft realism + runway alignment (departure) ─────── */
export function DepartureScene() {
  return (
    <Plate badge="AIRCRAFT" title="Take-off & Climb" accent="#2563eb" vb="0 0 400 300">
      <defs><linearGradient id="dep-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#bcdcff" /><stop offset="100%" stopColor="#eaf4ff" /></linearGradient></defs>
      <rect x="0" y="42" width="400" height="118" fill="url(#dep-sky)" />
      <RunwayPersp />
      {/* light aircraft aligned on the centreline, still on ground */}
      <LightPlaneTop x={200} y={250} s={1.15} rot={0} id="dep-lp" />
      {/* airliner climbing away, aligned with runway heading */}
      <AirlinerSide x={280} y={92} s={0.82} rot={12} id="dep-al" />
      <path d="M196,180 Q235,150 268,104" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
      <text x="392" y="70" fontSize="8.5" fill="#1e3a8a" fontWeight="700" textAnchor="end">rotate → positive climb</text>
      <text x="150" y="250" fontSize="8" fill="#0f172a" textAnchor="end" fontWeight="700">line up on</text>
      <text x="150" y="260" fontSize="8" fill="#0f172a" textAnchor="end" fontWeight="700">the centreline</text>
    </Plate>
  );
}

/* ── Modern instruments (glass bezel) ───────────────────────────── */
function Bezel({ r = 46, id }: { r?: number; id: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-glass`} cx="38%" cy="32%" r="75%"><stop offset="0%" stopColor="#1c2636" /><stop offset="70%" stopColor="#0b1120" /><stop offset="100%" stopColor="#05080f" /></radialGradient>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4b5563" /><stop offset="50%" stopColor="#1f2937" /><stop offset="100%" stopColor="#374151" /></linearGradient>
      </defs>
      <circle r={r + 5} fill={`url(#${id}-ring)`} />
      <circle r={r + 1} fill="#0b1120" />
      <circle r={r} fill={`url(#${id}-glass)`} />
    </>
  );
}
const glare = (id: string, r = 46) => <ellipse cx={-r * 0.28} cy={-r * 0.42} rx={r * 0.5} ry={r * 0.28} fill="#ffffff" opacity="0.05" transform="rotate(-25)" />;

// Attitude indicator
function ADI({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Bezel id={id} />
      <defs>
        <clipPath id={`${id}-c`}><circle r="42" /></clipPath>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2f86e6" /><stop offset="100%" stopColor="#1e6fd0" /></linearGradient>
        <linearGradient id={`${id}-gnd`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a5a2b" /><stop offset="100%" stopColor="#5f3d1c" /></linearGradient>
      </defs>
      <g clipPath={`url(#${id}-c)`}>
        <g transform="rotate(-12)">
          <rect x="-70" y="-70" width="140" height="72" fill={`url(#${id}-sky)`} />
          <rect x="-70" y="-2" width="140" height="72" fill={`url(#${id}-gnd)`} />
          <rect x="-70" y="-2.5" width="140" height="2.5" fill="#f8fafc" />
          {[-30, -20, -10, 10, 20, 30].map((p) => <g key={p}><rect x="-12" y={p * 0.9 - 0.4} width="24" height="0.8" fill="#e5e7eb" opacity="0.8" /></g>)}
        </g>
      </g>
      {/* bank scale */}
      {[-60, -30, 0, 30, 60].map((a) => { const rad = (a - 90) * Math.PI / 180; return <line key={a} x1={40 * Math.cos(rad)} y1={40 * Math.sin(rad)} x2={45 * Math.cos(rad)} y2={45 * Math.sin(rad)} stroke="#fff" strokeWidth="1.4" />; })}
      <path d="M0,-45 l-4,-7 l8,0 Z" fill="#f59e0b" />
      {/* fixed aircraft symbol */}
      <path d="M-30,0 L-8,0 M8,0 L30,0 M0,0 l0,6" stroke="#f59e0b" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <circle r="2.2" fill="#f59e0b" />
      {glare(id)}
      <text y="60" fontSize="7" fill="#94a3b8" textAnchor="middle" fontWeight="700">ATTITUDE</text>
    </g>
  );
}

// Airspeed indicator
function ASI({ x, y, id }: { x: number; y: number; id: string }) {
  const arc = (from: number, to: number, col: string, rr: number) => {
    const a0 = (from * 3.4 - 120) * Math.PI / 180, a1 = (to * 3.4 - 120) * Math.PI / 180;
    const large = to - from > 53 ? 1 : 0;
    return <path d={`M${rr * Math.cos(a0)},${rr * Math.sin(a0)} A${rr},${rr} 0 ${large} 1 ${rr * Math.cos(a1)},${rr * Math.sin(a1)}`} stroke={col} strokeWidth="4" fill="none" />;
  };
  return (
    <g transform={`translate(${x} ${y})`}>
      <Bezel id={id} />
      {arc(4, 33, "#22c55e", 34)}{arc(33, 47, "#facc15", 34)}{arc(47, 52, "#ef4444", 34)}{arc(9, 20, "#ffffff", 40)}
      {Array.from({ length: 11 }).map((_, i) => { const a = (i * 34 - 120) * Math.PI / 180; return <g key={i}><line x1={38 * Math.cos(a)} y1={38 * Math.sin(a)} x2={44 * Math.cos(a)} y2={44 * Math.sin(a)} stroke="#fff" strokeWidth="1.3" /><text x={31 * Math.cos(a)} y={31 * Math.sin(a) + 3} fontSize="6.5" fill="#e5e7eb" textAnchor="middle">{i * 4}</text></g>; })}
      <line x1="0" y1="4" x2={30 * Math.cos((28 * 3.4 - 120) * Math.PI / 180)} y2={30 * Math.sin((28 * 3.4 - 120) * Math.PI / 180)} stroke="#f8fafc" strokeWidth="2.4" strokeLinecap="round" />
      <circle r="3" fill="#e5e7eb" />
      {glare(id)}
      <text y="60" fontSize="7" fill="#94a3b8" textAnchor="middle" fontWeight="700">AIRSPEED · kt</text>
    </g>
  );
}

// Altimeter
function ALT({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Bezel id={id} />
      {Array.from({ length: 10 }).map((_, i) => { const a = (i * 36 - 90) * Math.PI / 180; return <g key={i}><line x1={38 * Math.cos(a)} y1={38 * Math.sin(a)} x2={44 * Math.cos(a)} y2={44 * Math.sin(a)} stroke="#fff" strokeWidth="1.4" /><text x={30 * Math.cos(a)} y={30 * Math.sin(a) + 3} fontSize="7" fill="#e5e7eb" textAnchor="middle">{i}</text></g>; })}
      {/* Kollsman window */}
      <rect x="14" y="-6" width="26" height="12" rx="2" fill="#020617" stroke="#334155" /><text x="27" y="3" fontSize="6.5" fill="#22c55e" textAnchor="middle" fontWeight="700">1013</text>
      <line x1="0" y1="0" x2="0" y2="-40" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" />{/* 100s */}
      <line x1="0" y1="0" x2="20" y2="-14" stroke="#f8fafc" strokeWidth="3.4" strokeLinecap="round" />{/* 1000s (short fat) */}
      <circle r="3" fill="#e5e7eb" />
      {glare(id)}
      <text y="60" fontSize="7" fill="#94a3b8" textAnchor="middle" fontWeight="700">ALTIMETER · ft</text>
    </g>
  );
}

export function InstrumentPanel() {
  return (
    <Plate badge="INSTR" title="Flight Instruments" accent="#22c55e" dark vb="0 0 400 190">
      <rect x="8" y="50" width="384" height="132" rx="10" fill="#111827" stroke="#1f2937" />
      <ASI x={78} y={116} id="asi" />
      <ADI x={200} y={116} id="adi" />
      <ALT x={322} y={116} id="alt" />
    </Plate>
  );
}

/* ── Plate: VOR radials + DME slant range ───────────────────────── */
export function VORDME() {
  const R = 66, cx = 150, cy = 150;
  return (
    <Plate badge="RAD-NAV" title="VOR / DME" accent="#7c3aed" vb="0 0 400 300">
      <rect x="0" y="42" width="400" height="258" fill="#f1f5f9" />
      {/* compass rose */}
      <circle cx={cx} cy={cy} r={R} fill="#fff" stroke="#cbd5e1" />
      {Array.from({ length: 36 }).map((_, i) => { const a = (i * 10 - 90) * Math.PI / 180; const maj = i % 3 === 0; return <line key={i} x1={cx + (R - (maj ? 8 : 4)) * Math.cos(a)} y1={cy + (R - (maj ? 8 : 4)) * Math.sin(a)} x2={cx + R * Math.cos(a)} y2={cy + R * Math.sin(a)} stroke="#475569" strokeWidth={maj ? 1.2 : 0.6} />; })}
      {[["N", 0], ["E", 90], ["S", 180], ["W", 270]].map(([l, d]) => { const a = ((d as number) - 90) * Math.PI / 180; return <text key={l as string} x={cx + (R - 16) * Math.cos(a)} y={cy + (R - 16) * Math.sin(a) + 3} fontSize="8" fontWeight="800" fill="#0f172a" textAnchor="middle">{l as string}</text>; })}
      {/* selected radial 045 highlighted */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => { const a = (d - 90) * Math.PI / 180; const sel = d === 45; return <line key={d} x1={cx} y1={cy} x2={cx + (sel ? 150 : R) * Math.cos(a)} y2={cy + (sel ? 150 : R) * Math.sin(a)} stroke={sel ? "#7c3aed" : "#c4b5fd"} strokeWidth={sel ? 2 : 0.8} strokeDasharray={sel ? "0" : "3 3"} />; })}
      {/* VOR/DME station */}
      <g transform={`translate(${cx} ${cy})`}><circle r="7" fill="#7c3aed" /><rect x="-2" y="-16" width="4" height="10" fill="#7c3aed" /><circle r="2.4" fill="#fff" /></g>
      <text x={cx} y={cy + R + 16} fontSize="8" fontWeight="700" fill="#5b21b6" textAnchor="middle">VOR/DME station</text>
      {/* aircraft on the 045 radial */}
      <LightPlaneTop x={cx + 150 * Math.cos((45 - 90) * Math.PI / 180)} y={cy + 150 * Math.sin((45 - 90) * Math.PI / 180)} s={1.2} rot={135} id="vd-lp" />
      {/* callout on the selected radial */}
      <text x="255" y="98" fontSize="8" fontWeight="800" fill="#5b21b6" transform="rotate(-45 255 98)">RADIAL 045° (QDR)</text>
      {/* right info panel */}
      <g transform="translate(288 66)">
        <rect x="0" y="0" width="104" height="216" rx="6" fill="#fff" stroke="#e2e8f0" />
        <text x="10" y="18" fontSize="8.5" fontWeight="800" fill="#5b21b6">VOR — bearing</text>
        {["VHF 108–118 MHz", "360 radials FROM stn", "radial = QDR"].map((t, i) => <text key={i} x="10" y={32 + i * 13} fontSize="7" fill="#334155">{t}</text>)}
        <text x="10" y="90" fontSize="8.5" fontWeight="800" fill="#0891b2">DME — distance</text>
        {["UHF, pulse-pair", "slant range in NM", "ground range < slant", "max error overhead", "(the 'cone of silence')"].map((t, i) => <text key={i} x="10" y={104 + i * 13} fontSize="7" fill="#334155">{t}</text>)}
        <text x="10" y="180" fontSize="8.5" fontWeight="800" fill="#0f172a">Co-located</text>
        {["VOR/DME → fix", "ident: Morse 2–3 ltrs"].map((t, i) => <text key={i} x="10" y={194 + i * 13} fontSize="7" fill="#334155">{t}</text>)}
      </g>
    </Plate>
  );
}

/* ── Plate: radio propagation (ground/sky wave, skip) + SSR + GNSS ─ */
export function RadioPropagation() {
  return (
    <Plate badge="RADIO" title="Propagation · SSR · GNSS" accent="#0891b2" vb="0 0 400 320">
      <defs>
        <linearGradient id="rp-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0b2545" /><stop offset="100%" stopColor="#13315c" /></linearGradient>
        <linearGradient id="rp-ion" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" /><stop offset="100%" stopColor="#7c3aed" stopOpacity="0" /></linearGradient>
      </defs>
      <rect x="0" y="42" width="400" height="278" fill="url(#rp-sky)" />
      {/* ionosphere band */}
      <path d="M0,96 Q200,70 400,96 L400,120 Q200,96 0,120 Z" fill="url(#rp-ion)" />
      <text x="12" y="90" fontSize="8" fontWeight="700" fill="#c4b5fd">IONOSPHERE</text>
      {/* earth curve */}
      <path d="M-40,300 Q200,232 440,300 L440,320 L-40,320 Z" fill="#1f3b2c" />
      <path d="M-40,300 Q200,232 440,300" stroke="#3f6f43" strokeWidth="2" fill="none" />
      {/* HF transmitter */}
      <g transform="translate(60 250)"><line x1="0" y1="0" x2="0" y2="-22" stroke="#e2e8f0" strokeWidth="1.6" /><path d="M-6,-22 L0,-30 L6,-22" stroke="#e2e8f0" strokeWidth="1.4" fill="none" /></g>
      {/* sky wave: up to ionosphere, refract down (skip) */}
      <path d="M60,246 Q150,120 230,110" stroke="#f59e0b" strokeWidth="2" fill="none" />
      <path d="M230,110 Q300,120 340,244" stroke="#f59e0b" strokeWidth="2" fill="none" />
      <text x="150" y="150" fontSize="7.5" fill="#fcd34d" transform="rotate(-30 150 150)">sky wave</text>
      {/* ground wave hugging surface */}
      <path d="M64,252 Q120,250 150,258" stroke="#22d3ee" strokeWidth="2" fill="none" />
      <text x="92" y="270" fontSize="7.5" fill="#67e8f9">ground wave</text>
      {/* skip zone bracket */}
      <line x1="150" y1="262" x2="330" y2="248" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" />
      <text x="235" y="252" fontSize="7.5" fontWeight="700" fill="#fca5a5" textAnchor="middle" transform="rotate(-4 235 252)">SKIP ZONE (no reception)</text>
      {/* first sky-wave return marker */}
      <circle cx="340" cy="244" r="3" fill="#f59e0b" /><text x="340" y="262" fontSize="7" fill="#fcd34d" textAnchor="middle">skip distance</text>

      {/* GNSS satellite */}
      <g transform="translate(330 78)">
        <rect x="-4" y="-4" width="8" height="10" rx="1" fill="#e2e8f0" /><rect x="-16" y="-3" width="10" height="8" fill="#3b82f6" /><rect x="6" y="-3" width="10" height="8" fill="#3b82f6" />
        <line x1="0" y1="6" x2="0" y2="14" stroke="#e2e8f0" strokeWidth="1" />
      </g>
      <path d="M330,94 L300,150" stroke="#93c5fd" strokeWidth="0.9" strokeDasharray="3 3" />
      <text x="352" y="80" fontSize="7.5" fill="#93c5fd">GNSS</text>

      {/* SSR: ground radar interrogates transponder */}
      <g transform="translate(250 250)"><rect x="-3" y="-14" width="6" height="14" fill="#e2e8f0" /><path d="M-10,-16 A10 10 0 0 1 10,-16 Z" fill="#94a3b8" /></g>
      <text x="250" y="270" fontSize="7" fill="#cbd5e1" textAnchor="middle">SSR radar</text>
      {/* aircraft receiving SSR + GNSS */}
      <AirlinerSide x={300} y={150} s={0.6} rot={4} id="rp-al" />
      <path d="M256,240 Q278,195 296,158" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 3" /><text x="262" y="205" fontSize="6.5" fill="#86efac" transform="rotate(-55 262 205)">1030↑ 1090↓ MHz</text>
    </Plate>
  );
}
