// Original, illustrated "cheat-code" infographics for CPL Navigation. In-house
// vector art (globe, wind triangle, 1-in-60 geometry, chart projections) with
// soft gradient grounds and topical motifs — nothing reproduced from any
// textbook or third-party chart. Same figure-frame contract as the other sets.

import { SkyDayScene, MapGridScene } from "@/app/components/figures/figureScene";
import { PlaneTop } from "@/app/components/figures/shapes";

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full overflow-hidden rounded-lg border border-zinc-800 bg-white">{children}</div>;
}

// A.9.1 — Earth, great circle vs rhumb line, convergency.
export function EarthGCRL() {
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <defs>
          <radialGradient id="nav-sky" cx="35%" cy="30%" r="90%">
            <stop offset="0%" stopColor="#eef2ff" /><stop offset="100%" stopColor="#dbeafe" />
          </radialGradient>
          <radialGradient id="nav-globe" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#60a5fa" /><stop offset="70%" stopColor="#2563eb" /><stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
        </defs>
        <SkyDayScene />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#0f172a">The Earth: great circle vs rhumb line</text>
        {/* globe */}
        <circle cx={92} cy={112} r={72} fill="url(#nav-globe)" />
        {/* meridians (converging) */}
        {[-1, -0.5, 0, 0.5, 1].map((k) => (
          <ellipse key={k} cx={92} cy={112} rx={Math.abs(k) * 62 + 6} ry={72} fill="none" stroke="#bfdbfe" strokeOpacity="0.6" strokeWidth="1" />
        ))}
        {[0.4, 0, -0.4].map((k) => (
          <ellipse key={"p" + k} cx={92} cy={112 - k * 60} rx={72 * Math.cos(Math.asin(k))} ry={12 * Math.cos(Math.asin(k)) + 2} fill="none" stroke="#bfdbfe" strokeOpacity="0.55" strokeWidth="1" />
        ))}
        {/* great circle (straightish chord) vs rhumb (bowed) */}
        <line x1={44} y1={150} x2={140} y2={74} stroke="#f59e0b" strokeWidth="2.4" />
        <path d="M44 150 Q78 132 140 74" stroke="#ef4444" strokeWidth="2.2" fill="none" strokeDasharray="5 4" />
        <circle cx={44} cy={150} r={3} fill="#fff" /><circle cx={140} cy={74} r={3} fill="#fff" />
        {/* legend + facts */}
        <g fontSize="9">
          <line x1={184} y1={44} x2={200} y2={44} stroke="#f59e0b" strokeWidth="2.4" /><text x={206} y={47} fill="#0f172a" fontWeight="bold">Great circle — shortest</text>
          <text x={206} y={60} fontSize="8" fill="#334155">cuts meridians at changing angles</text>
          <line x1={184} y1={74} x2={200} y2={74} stroke="#ef4444" strokeWidth="2.2" strokeDasharray="4 3" /><text x={206} y={77} fill="#0f172a" fontWeight="bold">Rhumb line — constant dir</text>
          <text x={206} y={90} fontSize="8" fill="#334155">same angle at every meridian</text>
        </g>
        <rect x={184} y={102} width={144} height={48} rx={6} fill="#ffffff" stroke="#93c5fd" />
        <text x={192} y={118} fontSize="8.5" fill="#1d4ed8" fontWeight="bold">1′ lat = 1 NM · 1° = 60 NM</text>
        <text x={192} y={131} fontSize="8.5" fill="#0f172a">Convergency = ch.long × sin(mean lat)</text>
        <text x={192} y={144} fontSize="8.5" fill="#0f172a">Conversion angle = ½ convergency</text>
        <text x={12} y={200} fontSize="8" fill="#334155">GC lies on the POLE-ward side of the RL. Meridians &amp; equator are both GC and RL.</text>
      </svg>
    </Frame>
  );
}

// A.9.7 — triangle of velocities (wind triangle).
export function WindTriangle() {
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <defs>
          <linearGradient id="nav-tri" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ecfeff" /><stop offset="100%" stopColor="#cffafe" />
          </linearGradient>
        </defs>
        <SkyDayScene />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#0f172a">Triangle of velocities</text>
        {/* vectors */}
        <line x1={60} y1={150} x2={200} y2={70} stroke="#1d4ed8" strokeWidth="3" markerEnd="url(#na)" />
        <line x1={200} y1={70} x2={250} y2={110} stroke="#0891b2" strokeWidth="3" markerEnd="url(#nc)" />
        <line x1={60} y1={150} x2={250} y2={110} stroke="#15803d" strokeWidth="3" markerEnd="url(#ng)" />
        <defs>
          <marker id="na" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1d4ed8" /></marker>
          <marker id="nc" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#0891b2" /></marker>
          <marker id="ng" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#15803d" /></marker>
        </defs>
        {/* small aircraft at start (original silhouette) */}
        <PlaneTop x={60} y={150} s={0.85} rot={60} />
        <text x={120} y={100} fontSize="9" fill="#1d4ed8" fontWeight="bold" transform="rotate(-30 120 100)">AIR: heading + TAS</text>
        <text x={214} y={82} fontSize="9" fill="#0891b2" fontWeight="bold">WIND (from)</text>
        <text x={140} y={144} fontSize="9" fill="#15803d" fontWeight="bold">GROUND: track + GS</text>
        {/* facts card */}
        <rect x={12} y={162} width={316} height={40} rx={6} fill="#ffffff" stroke="#67e8f9" />
        <text x={18} y={177} fontSize="9" fill="#0e7490" fontWeight="bold">AIR vector + WIND vector = GROUND vector</text>
        <text x={18} y={191} fontSize="8.5" fill="#0f172a">Drift = heading − track · apply WCA INTO wind to make good track · GS×time = distance</text>
      </svg>
    </Frame>
  );
}

// A.9.8 — 1-in-60 rule geometry.
export function OneInSixty() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <defs>
          <linearGradient id="nav-map" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7fee7" /><stop offset="100%" stopColor="#ecfccb" />
          </linearGradient>
        </defs>
        <MapGridScene h={200} />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#0f172a">The 1-in-60 rule</text>
        {/* required track and actual track */}
        <line x1={30} y1={70} x2={300} y2={70} stroke="#64748b" strokeWidth="1.6" strokeDasharray="6 4" />
        <text x={210} y={64} fontSize="8.5" fill="#64748b">required track</text>
        <line x1={30} y1={70} x2={170} y2={110} stroke="#dc2626" strokeWidth="2" />
        <text x={70} y={104} fontSize="8.5" fill="#dc2626">actual track</text>
        <line x1={170} y1={70} x2={170} y2={110} stroke="#1d4ed8" strokeWidth="1.4" />
        <text x={176} y={94} fontSize="8" fill="#1d4ed8">off-track</text>
        <line x1={170} y1={110} x2={300} y2={70} stroke="#15803d" strokeWidth="2" strokeDasharray="4 3" />
        <text x={236} y={100} fontSize="8" fill="#15803d">regain</text>
        <text x={44} y={84} fontSize="8" fill="#dc2626">gone →</text>
        <text x={236} y={64} fontSize="8" fill="#15803d">to go →</text>
        {/* aircraft */}
        <PlaneTop x={162} y={106} s={0.72} rot={106} />
        {/* formulas */}
        <rect x={12} y={126} width={316} height={62} rx={6} fill="#ffffff" stroke="#a3e635" />
        <text x={18} y={142} fontSize="9" fill="#3f6212" fontWeight="bold">Track error° = (off-track ÷ distance GONE) × 60</text>
        <text x={18} y={157} fontSize="9" fill="#3f6212" fontWeight="bold">Closing angle° = (off-track ÷ distance TO-GO) × 60</text>
        <text x={18} y={172} fontSize="9" fill="#dc2626" fontWeight="bold">To REGAIN track: alter heading by (track error + closing angle)</text>
        <text x={18} y={184} fontSize="8" fill="#334155">To just PARALLEL the track: alter by the track error only.</text>
      </svg>
    </Frame>
  );
}

// A.9.5 — Mercator vs Lambert cheat comparison.
export function ChartProjections() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <defs>
          <linearGradient id="nav-chart" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f3ff" /><stop offset="100%" stopColor="#ede9fe" />
          </linearGradient>
        </defs>
        <MapGridScene h={200} />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#0f172a">Mercator vs Lambert — cheat card</text>
        {/* Mercator mini */}
        <rect x={14} y={30} width={150} height={70} rx={4} fill="#ffffff" stroke="#c4b5fd" />
        <text x={22} y={44} fontSize="9" fontWeight="bold" fill="#6d28d9">MERCATOR (cylindrical)</text>
        {[46,60,74,88].map((y)=><line key={y} x1={22} y1={y} x2={156} y2={y} stroke="#ddd6fe" />)}
        {[40,70,100,130].map((x)=><line key={x} x1={x} y1={54} x2={x} y2={96} stroke="#ddd6fe" />)}
        <line x1={26} y1={92} x2={152} y2={58} stroke="#f59e0b" strokeWidth="2" />
        <path d="M26 92 Q90 66 152 58" stroke="#ef4444" strokeWidth="1.8" fill="none" strokeDasharray="4 3" />
        {/* Lambert mini */}
        <rect x={176} y={30} width={150} height={70} rx={4} fill="#ffffff" stroke="#c4b5fd" />
        <text x={184} y={44} fontSize="9" fontWeight="bold" fill="#6d28d9">LAMBERT (conic)</text>
        {[196,226,256,286,316].map((x)=><line key={x} x1={x} y1={52} x2={251+(x-251)*0.5} y2={96} stroke="#ddd6fe" />)}
        {[58,74,90].map((y,i)=><path key={y} d={`M186 ${y+8} Q251 ${y-6} 316 ${y+8}`} stroke="#ddd6fe" fill="none" />)}
        <line x1={190} y1={90} x2={312} y2={58} stroke="#f59e0b" strokeWidth="2" />
        <path d="M190 90 Q251 84 312 58" stroke="#ef4444" strokeWidth="1.8" fill="none" strokeDasharray="4 3" />
        {/* legend + facts */}
        <g fontSize="8">
          <line x1={16} y1={112} x2={30} y2={112} stroke="#f59e0b" strokeWidth="2" /><text x={34} y={115} fill="#0f172a">great circle</text>
          <line x1={104} y1={112} x2={118} y2={112} stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 3" /><text x={122} y={115} fill="#0f172a">rhumb line</text>
        </g>
        <rect x={12} y={124} width={316} height={64} rx={6} fill="#ffffff" stroke="#c4b5fd" />
        <text x={18} y={140} fontSize="8.5" fill="#6d28d9" fontWeight="bold">MERCATOR: rhumb STRAIGHT, GC curved · scale × sec lat (measure at mid-lat)</text>
        <text x={18} y={156} fontSize="8.5" fill="#6d28d9" fontWeight="bold">LAMBERT: GC ~STRAIGHT, rhumb curved · scale near-constant (2 std parallels)</text>
        <text x={18} y={172} fontSize="8" fill="#334155">Both orthomorphic (bearings correct). Lambert convergence n = sin(parallel of origin).</text>
        <text x={18} y={184} fontSize="8" fill="#334155">Use Lambert for radio nav (GC bearings plot straight).</text>
      </svg>
    </Frame>
  );
}
