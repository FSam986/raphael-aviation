// Flat-vector Cessna 172 + scenery, in the clean flat style of the reference
// terrain art. Crisp outlines, flat fills, one shadow tone — NOT soft-gradient
// blobs. Traced to the C172 dimensioned three-view. In-house vector art.

const OUT = "#243244";      // outline
const BODY = "#f5f7fa";     // fuselage
const BODY2 = "#d9dfe8";    // fuselage shadow
const WING = "#e7ebf1";     // wing
const WING2 = "#c4ccd8";    // wing shadow
const GLASS = "#263852";    // windows
const STRIPE = "#2f6fed";   // cheatline
const TYRE = "#2a3340";

// ── Flat-vector terrain backdrop (sky, hills, pines, rocks) ──
export function FlatTerrain({ w = 400, h = 220 }: { w?: number; h?: number }) {
  const pine = (x: number, y: number, s: number, c: string, c2: string) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-2" y="0" width="4" height="7" fill="#7c5a3a" />
      <path d="M0,-22 L11,-4 L-11,-4 Z" fill={c} /><path d="M0,-22 L11,-4 L0,-4 Z" fill={c2} />
      <path d="M0,-14 L13,6 L-13,6 Z" fill={c} /><path d="M0,-14 L13,6 L0,6 Z" fill={c2} />
      <path d="M0,-6 L15,16 L-15,16 Z" fill={c} /><path d="M0,-6 L15,16 L0,16 Z" fill={c2} />
    </g>
  );
  const rock = (x: number, y: number, s: number) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-16,8 L-10,-6 L4,-9 L15,-2 L18,8 Z" fill="#9aa4b0" /><path d="M-10,-6 L4,-9 L15,-2 L0,-1 Z" fill="#c2cad4" />
    </g>
  );
  return (
    <g>
      <defs>
        <linearGradient id="ft-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7cc0f0" /><stop offset="100%" stopColor="#cfe9fb" /></linearGradient>
      </defs>
      <rect x="0" y="0" width={w} height={h} fill="url(#ft-sky)" />
      {/* distant mountains */}
      <path d={`M0,${h * 0.62} L70,${h * 0.34} L120,${h * 0.58} L200,${h * 0.3} L270,${h * 0.56} L340,${h * 0.38} L${w},${h * 0.6} L${w},${h} L0,${h} Z`} fill="#5b7f5f" />
      <path d={`M120,${h * 0.58} L200,${h * 0.3} L245,${h * 0.44} L200,${h * 0.42} Z`} fill="#6d9070" opacity="0.7" />
      {/* rolling hills */}
      <path d={`M0,${h * 0.72} Q120,${h * 0.6} 240,${h * 0.72} T${w},${h * 0.72} L${w},${h} L0,${h} Z`} fill="#6fae55" />
      <path d={`M0,${h * 0.84} Q140,${h * 0.74} 300,${h * 0.86} T${w},${h * 0.86} L${w},${h} L0,${h} Z`} fill="#5c9c46" />
      <rect x="0" y={h * 0.9} width={w} height={h * 0.1} fill="#4f8d3d" />
      {/* clouds */}
      <g fill="#ffffff" opacity="0.9"><ellipse cx="70" cy="34" rx="20" ry="9" /><ellipse cx="90" cy="30" rx="16" ry="10" /><ellipse cx="300" cy="26" rx="22" ry="9" /><ellipse cx="322" cy="30" rx="15" ry="8" /></g>
      {/* trees + rocks framing */}
      {pine(24, h * 0.78, 1.1, "#2f7d3f", "#3f9350")}
      {pine(50, h * 0.82, 0.85, "#2b6f39", "#3a884a")}
      {pine(w - 30, h * 0.8, 1.15, "#2f7d3f", "#3f9350")}
      {rock(70, h * 0.94, 0.9)}
      {rock(w - 70, h * 0.95, 1.05)}
    </g>
  );
}

// ── Cessna 172, flat-vector SIDE view. Nose RIGHT. ──
export function CessnaFlatSide({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${-rot})`} stroke={OUT} strokeWidth="1.1" strokeLinejoin="round">
      {/* horizontal stabiliser */}
      <path d="M-92,-6 L-64,-8 L-64,-2 L-92,-1 Z" fill={WING} />
      {/* swept vertical fin with dorsal fillet + rudder */}
      <path d="M-84,-8 L-68,-40 L-58,-40 L-52,-11 Z" fill={BODY} />
      <path d="M-84,-8 L-52,-11 L-52,-8 Z" fill={BODY2} stroke="none" />
      {/* fuselage: cowl → cabin → rear-window step-down → tailcone */}
      <path d="M84,-4
               C86,-12 82,-18 72,-19
               L48,-20 C42,-27 30,-28 16,-26
               L2,-18 L-20,-14
               C-50,-11 -74,-10 -86,-6
               C-74,-2 -50,0 -20,1
               L60,2 C74,2 82,2 84,-4 Z" fill={BODY} />
      {/* belly shadow */}
      <path d="M-86,-6 C-74,-2 -50,0 -20,1 L60,2 C74,2 82,2 84,-4 L82,0 C74,4 60,5 -20,4 C-52,3 -74,1 -86,-3 Z" fill={BODY2} stroke="none" />
      {/* cowl + spinner + prop */}
      <path d="M84,-4 C90,-5 93,-9 92,-14 L80,-15 C80,-9 80,-6 80,-3 Z" fill={BODY2} />
      <path d="M92,-9 L101,-9 L94,-14 Z" fill={BODY2} />{/* spinner */}
      <line x1="100" y1="-34" x2="100" y2="16" stroke={OUT} strokeWidth="2.4" strokeLinecap="round" />{/* prop */}
      {/* cheatline */}
      <path d="M-82,-5 L80,-2" stroke={STRIPE} strokeWidth="3" strokeLinecap="round" />
      {/* windscreen + doors + rear window */}
      <path d="M72,-6 C66,-14 56,-18 46,-18 L44,-8 L70,-5 Z" fill={GLASS} strokeWidth="0.8" />
      <path d="M40,-18 L14,-18 L16,-7 L40,-7 Z" fill={GLASS} strokeWidth="0.8" />
      <line x1="27" y1="-18" x2="27" y2="-7" stroke={BODY} strokeWidth="1.4" />
      <path d="M8,-16 L-18,-12 L-16,-6 L10,-7 Z" fill={GLASS} strokeWidth="0.8" />{/* rear step-down window */}
      {/* HIGH WING — thin airfoil on the cabin roof */}
      <path d="M64,-20 L-20,-18 C-26,-18 -26,-24 -20,-24 L64,-25 C72,-25 72,-20 64,-20 Z" fill={WING} />
      <path d="M64,-20 L-20,-18 C-26,-18 -26,-21 -20,-21 L64,-22 Z" fill={WING2} stroke="none" />
      {/* lift strut (thin, attaches wing root to lower fuselage) */}
      <line x1="34" y1="1" x2="22" y2="-21" strokeWidth="2.3" strokeLinecap="round" />
      {/* main gear (spring leg) + pant */}
      <path d="M20,2 C14,8 8,16 6,22" fill="none" strokeWidth="2.6" />
      <path d="M-4,22 C-4,16 16,16 16,22 C16,27 -4,27 -4,22 Z" fill={BODY} /><ellipse cx="6" cy="24" rx="5" ry="5" fill={TYRE} />
      {/* nose gear + pant */}
      <line x1="74" y1="2" x2="74" y2="16" strokeWidth="2.4" />
      <path d="M66,18 C66,13 82,13 82,18 C82,22 66,22 66,18 Z" fill={BODY} /><ellipse cx="74" cy="20" rx="4.4" ry="4.4" fill={TYRE} />
    </g>
  );
}
