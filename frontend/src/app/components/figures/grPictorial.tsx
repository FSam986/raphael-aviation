// Pictorial "teach-the-whole-topic" infographics for General Radiotelephony.
// Drawn scenes (not text tables) so the concept is learnable from the picture
// alone — colour-coded, labelled, with a legend, in the style of the met plates.
// In-house vector art; nothing reproduced from any source.

import type { ReactNode } from "react";

function Plate({ badge, title, accent, children, vb = "0 0 400 560" }: { badge: string; title: string; accent: string; children: ReactNode; vb?: string }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-800 bg-white">
      <svg viewBox={vb} className="w-full" fontFamily="ui-sans-serif, system-ui, sans-serif">
        {/* header */}
        <rect x="0" y="0" width="400" height="46" fill="#0f172a" />
        <rect x="14" y="12" width="70" height="22" rx="5" fill={accent} />
        <text x="49" y="27" fontSize="12" fontWeight="800" fill="#fff" textAnchor="middle">{badge}</text>
        <text x="94" y="28" fontSize="15" fontWeight="800" fill="#fff">{title}</text>
        {children}
      </svg>
    </div>
  );
}

// small drawn aircraft (top-down) at (x,y), scale s, colour c
const Plane = ({ x, y, s = 1, c = "#0f172a", r = 0 }: { x: number; y: number; s?: number; c?: string; r?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${r})`}>
    <path d="M0,-9 L2,-2 L13,3 L13,6 L2,3 L2,9 L6,12 L6,14 L0,12 L-6,14 L-6,12 L-2,9 L-2,3 L-13,6 L-13,3 L-2,-2 Z" fill={c} />
  </g>
);

// ── GR3 — SA airspace as a vertical cross-section ("wedding cake") ──
export function AirspaceCrossSection() {
  return (
    <Plate badge="GR-3" title="SA Airspace" accent="#2563eb">
      {/* altitude axis */}
      {([["FL650", 70, "top of FIR"], ["FL460", 120, "above = Class G"], ["FL195", 210, "CTA top"], ["FL100", 300, "250 kt below"], ["SFC", 470, "ground"]] as [string, number, string][]).map(([lab, y, note]) => (
        <g key={lab}>
          <line x1="58" y1={y} x2="392" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
          <text x="54" y={y + 3} fontSize="8.5" fontWeight="700" fill="#334155" textAnchor="end">{lab}</text>
          <text x="54" y={y + 12} fontSize="6.5" fill="#94a3b8" textAnchor="end">{note}</text>
        </g>
      ))}

      {/* Class G everywhere (backdrop) + above FL460 */}
      <rect x="58" y="70" width="334" height="50" fill="#94a3b8" opacity="0.10" />
      <text x="225" y="98" fontSize="9" fontWeight="700" fill="#64748b" textAnchor="middle">CLASS G — uncontrolled information airspace</text>

      {/* CTA on top of the cake, Class C, FL195 down to ~FL145/CTA base */}
      <rect x="120" y="120" width="210" height="90" fill="#2563eb" opacity="0.16" stroke="#2563eb" />
      <text x="225" y="150" fontSize="10" fontWeight="800" fill="#1d4ed8" textAnchor="middle">CTA / upper TMA</text>
      <text x="225" y="164" fontSize="7.5" fill="#334155" textAnchor="middle">Class C · from ≥700 ft AGL</text>
      <text x="225" y="176" fontSize="7.5" fill="#334155" textAnchor="middle">(Cape Town CTA A = Class A)</text>

      {/* wedding-cake TMA steps */}
      <rect x="150" y="210" width="150" height="60" fill="#2563eb" opacity="0.20" stroke="#2563eb" />
      <rect x="112" y="270" width="226" height="55" fill="#2563eb" opacity="0.24" stroke="#2563eb" />
      <text x="225" y="245" fontSize="10" fontWeight="800" fill="#1d4ed8" textAnchor="middle">TMA (Class C)</text>
      <text x="225" y="300" fontSize="8" fill="#1e3a8a" textAnchor="middle">stepped bases → lower away from field</text>

      {/* CTR column surface→up around the field */}
      <rect x="188" y="325" width="74" height="145" fill="#2563eb" opacity="0.28" stroke="#2563eb" strokeDasharray="5 4" />
      <text x="225" y="352" fontSize="9.5" fontWeight="800" fill="#1d4ed8" textAnchor="middle">CTR</text>
      <text x="225" y="364" fontSize="7" fill="#1e3a8a" textAnchor="middle">Class C · SFC up</text>

      {/* ATZ small at field */}
      <path d="M188 470 A 37 26 0 0 1 262 470 Z" fill="#16a34a" opacity="0.30" stroke="#16a34a" />
      <text x="225" y="458" fontSize="7.5" fontWeight="700" fill="#166534" textAnchor="middle">ATZ ≥5 NM</text>

      {/* aerodrome: runway + tower */}
      <rect x="170" y="470" width="110" height="4" fill="#334155" />
      <rect x="205" y="470" width="40" height="2" fill="#fff" />
      <g transform="translate(150 458)"><rect x="0" y="0" width="8" height="14" fill="#475569" /><rect x="-2" y="-4" width="12" height="5" rx="1" fill="#0ea5e9" /></g>

      {/* airway corridor + prohibited/restricted/danger off to the right */}
      <g transform="translate(300 300)">
        <rect x="0" y="0" width="80" height="18" rx="3" fill="#ef4444" opacity="0.14" stroke="#ef4444" /><text x="40" y="12" fontSize="7" fontWeight="700" fill="#b91c1c" textAnchor="middle">FAP prohibited</text>
        <rect x="0" y="22" width="80" height="18" rx="3" fill="#f59e0b" opacity="0.16" stroke="#f59e0b" /><text x="40" y="34" fontSize="7" fontWeight="700" fill="#b45309" textAnchor="middle">FAR restricted</text>
        <rect x="0" y="44" width="80" height="18" rx="3" fill="#f59e0b" opacity="0.10" stroke="#f59e0b" /><text x="40" y="56" fontSize="7" fontWeight="700" fill="#b45309" textAnchor="middle">FAD danger</text>
      </g>

      {/* aircraft icons at levels */}
      <Plane x={95} y={160} s={0.9} c="#1d4ed8" />
      <Plane x={100} y={245} s={0.9} c="#1d4ed8" />
      <Plane x={225} y={410} s={1.1} c="#16a34a" />

      {/* legend */}
      <rect x="8" y="500" width="384" height="52" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
      {([["#2563eb", "Class C — most SA controlled airspace (CTR/TMA/CTA)"], ["#16a34a", "Class D (Grand Central only) · ATZ Class G = AFIS"], ["#94a3b8", "Class F advisory / Class G information (uncontrolled)"]] as [string, string][]).map(([c, t], i) => (
        <g key={t}><rect x="16" y={508 + i * 14} width="12" height="9" rx="2" fill={c} opacity="0.5" stroke={c} /><text x="34" y={516 + i * 14} fontSize="7.8" fill="#334155">{t}</text></g>
      ))}
      <text x="384" y="548" fontSize="7" fill="#94a3b8" textAnchor="end">No Class B or E in SA · FIR SFC→FL650</text>
    </Plate>
  );
}

// ── GR5 — light-gun (ALDIS) signals as a tower→aircraft scene + matrix ──
export function LightGunSignals() {
  const rows: [string, string, string, boolean][] = [
    ["#22c55e", "Cleared to LAND", "Cleared TAKE-OFF", false],
    ["#ef4444", "Give way, keep circling", "STOP", false],
    ["#22c55e", "Return for landing*", "Cleared to TAXI", true],
    ["#ef4444", "Unsafe — do NOT land", "Taxi clear of area", true],
    ["#e5e7eb", "Land here → apron*", "Return to start", true],
  ];
  return (
    <Plate badge="GR-5" title="Light-Gun Signals" accent="#f59e0b" vb="0 0 400 500">
      {/* sky scene: tower firing beams to an aircraft in flight + one on ground */}
      <rect x="0" y="46" width="400" height="150" fill="#dbeafe" />
      {/* control tower */}
      <g transform="translate(30 96)"><rect x="0" y="20" width="16" height="70" fill="#475569" /><rect x="-6" y="4" width="28" height="20" rx="2" fill="#0f172a" /><rect x="-3" y="8" width="22" height="9" fill="#38bdf8" /></g>
      {/* light beams */}
      <path d="M52 108 L150 70" stroke="#22c55e" strokeWidth="3" opacity="0.7" /><path d="M52 112 L150 150" stroke="#ef4444" strokeWidth="3" opacity="0.6" strokeDasharray="6 5" />
      {/* aircraft in flight */}
      <Plane x={165} y={68} s={1.4} c="#0f172a" r={20} />
      <text x="188" y="60" fontSize="8" fill="#0f172a">in flight</text>
      {/* aircraft on ground */}
      <rect x="120" y="176" width="180" height="4" fill="#334155" /><Plane x={210} y={168} s={1.4} c="#166534" r={90} />
      <text x="232" y="164" fontSize="8" fill="#166534">on ground</text>

      {/* matrix header */}
      <text x="14" y="216" fontSize="8.5" fontWeight="800" fill="#0f172a">SIGNAL</text>
      <text x="66" y="216" fontSize="8.5" fontWeight="800" fill="#1d4ed8">IN FLIGHT</text>
      <text x="210" y="216" fontSize="8.5" fontWeight="800" fill="#166534">ON THE GROUND</text>

      {rows.map(([c, air, gnd, flash], i) => {
        const y = 226 + i * 46;
        return (
          <g key={i}>
            <rect x="8" y={y} width="384" height="42" rx="5" fill={c === "#e5e7eb" ? "#f1f5f9" : c} opacity={c === "#e5e7eb" ? 1 : 0.10} stroke={c} />
            {/* the light itself: steady = solid dot, flashing = dot ring */}
            <circle cx="30" cy={y + 19} r="9" fill={c} stroke="#0f172a" strokeWidth="0.5" />
            {flash && <circle cx="30" cy={y + 19} r="14" fill="none" stroke={c} strokeWidth="1.5" strokeDasharray="3 3" />}
            <text x="30" y={y + 37} fontSize="6.5" fill="#475569" textAnchor="middle">{flash ? "flashes" : "steady"}</text>
            <text x="52" y={y + 24} fontSize="8" fill="#0f172a">{air}</text>
            <line x1="202" y1={y + 4} x2="202" y2={y + 38} stroke="#e2e8f0" />
            <text x="210" y={y + 24} fontSize="8" fill="#334155">{gnd}</text>
          </g>
        );
      })}
      <text x="14" y="490" fontSize="7.5" fill="#64748b">Red pyrotechnic (air) = do not land yet. * Acknowledge: day → rock wings (air) / move ailerons (ground); night → flash lights twice.</text>
    </Plate>
  );
}

// ── GR6 — wake turbulence: vortex scene + avoidance + category table ──
export function WakeTurbulencePictorial() {
  return (
    <Plate badge="GR-6" title="Wake Turbulence" accent="#dc2626" vb="0 0 400 500">
      <rect x="0" y="46" width="400" height="250" fill="#eff6ff" />
      {/* flight path */}
      <line x1="20" y1="100" x2="380" y2="100" stroke="#94a3b8" strokeDasharray="6 5" /><text x="24" y="94" fontSize="7.5" fill="#64748b">flight path (lift produced)</text>
      {/* heavy generating aircraft (front view) */}
      <g transform="translate(300 100)">
        <ellipse cx="0" cy="0" rx="10" ry="7" fill="#0f172a" /><rect x="-46" y="-2" width="92" height="4" rx="2" fill="#0f172a" /><rect x="-4" y="-16" width="8" height="12" fill="#0f172a" />
      </g>
      <text x="300" y="72" fontSize="8" fontWeight="700" fill="#0f172a" textAnchor="middle">HEAVY</text>
      {/* counter-rotating vortices spiralling from tips, sinking + drifting */}
      {[-1, 1].map((d) => (
        <g key={d}>
          {[0, 1, 2, 3].map((k) => (
            <circle key={k} cx={300 + d * 46 - k * 34} cy={100 + k * 22} r={14 - k * 1.5} fill="none" stroke={d < 0 ? "#2563eb" : "#dc2626"} strokeWidth="2" opacity={0.75 - k * 0.13} />
          ))}
        </g>
      ))}
      <text x="150" y="150" fontSize="8" fill="#dc2626">vortices sink 500–1000 ft & drift downwind →</text>
      {/* wind arrow */}
      <g transform="translate(40 200)"><line x1="0" y1="0" x2="40" y2="0" stroke="#0891b2" strokeWidth="2" /><path d="M40 0 l-7 -4 v8 z" fill="#0891b2" /><text x="0" y="-6" fontSize="7.5" fill="#0891b2">WIND</text></g>

      {/* runway + avoidance rule */}
      <rect x="40" y="270" width="320" height="8" fill="#334155" /><rect x="90" y="272" width="220" height="2" fill="#fff" />
      <circle cx="130" cy="274" r="4" fill="#dc2626" /><text x="130" y="292" fontSize="7" fill="#b91c1c" textAnchor="middle">heavy rotates</text>
      <circle cx="300" cy="274" r="4" fill="#16a34a" /><text x="300" y="292" fontSize="7" fill="#166534" textAnchor="middle">heavy touchdown</text>
      <Plane x={95} y={250} s={1.1} c="#16a34a" r={90} />
      <text x="150" y="250" fontSize="7.5" fontWeight="700" fill="#166534">DEPART: rotate BEFORE the heavy's point, climb above/upwind</text>
      <Plane x={340} y={250} s={1.1} c="#16a34a" r={90} />
      <text x="200" y="264" fontSize="7.5" fontWeight="700" fill="#166534" textAnchor="end">LAND: stay above its path, touch down BEYOND its point →</text>

      {/* category table */}
      <text x="14" y="318" fontSize="9" fontWeight="800" fill="#0f172a">Wake category (by max take-off mass)</text>
      {([["L", "Light", "#22c55e"], ["M", "Medium", "#f59e0b"], ["H", "Heavy", "#ef4444"], ["J", "Super (A380)", "#7c3aed"]] as [string, string, string][]).map(([k, n, c], i) => (
        <g key={k} transform={`translate(${14 + i * 96} 328)`}>
          <rect x="0" y="0" width="88" height="34" rx="5" fill={c} opacity="0.12" stroke={c} />
          <text x="10" y="22" fontSize="16" fontWeight="800" fill={c}>{k}</text>
          <text x="30" y="15" fontSize="8" fontWeight="700" fill="#0f172a">{n}</text>
          <text x="30" y="27" fontSize="7" fill="#475569">follower</text>
        </g>
      ))}

      {/* legend / key facts */}
      <rect x="8" y="374" width="384" height="118" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
      {[
        "Strongest when HEAVY · CLEAN · SLOW (high angle of attack).",
        "Vortices form only while the wing produces lift (rotate → touchdown).",
        "Lighter the follower behind a heavy → GREATER separation needed.",
        "A light crosswind can hold a vortex over the runway — beware.",
        "Helicopter downwash in the hover/taxi is a significant hazard too.",
      ].map((t, i) => (
        <g key={i}><circle cx="20" cy={388 + i * 21} r="2.5" fill="#dc2626" /><text x="30" y={391 + i * 21} fontSize="8" fill="#334155">{t}</text></g>
      ))}
    </Plate>
  );
}
