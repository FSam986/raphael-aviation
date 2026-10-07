// Accurate, reusable aircraft/aerofoil silhouettes for the figures. These are
// factual geometric shapes (an aerofoil section, a plan/side aircraft outline) —
// not reproductions of any copyrighted artwork. Local unit coordinates; place
// and size with x/y/s and rotate with rot (deg).

// Cambered aerofoil section — leading edge at the local origin, chord ~100 to +x,
// rounded LE, thicker upper surface, sharp trailing edge. aoa tilts nose (LE) up.
export function Airfoil({ x, y, s = 1, aoa = 0, fill = "#334155", stroke = "#0f172a" }:
  { x: number; y: number; s?: number; aoa?: number; fill?: string; stroke?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${-aoa}) scale(${s})`}>
      <path d="M0,0 C5,-8 18,-11 34,-10 C56,-9 82,-4 100,0 C80,-1 52,1.6 32,2.2 C15,2.6 4,2.2 0,0 Z"
        fill={fill} stroke={stroke} strokeWidth={0.6} strokeLinejoin="round" />
    </g>
  );
}

// Plan-view (top) aircraft — nose toward −y (up) at rot 0. Swept wings + tailplane.
export function PlaneTop({ x, y, s = 1, rot = 0, fill = "#0f172a" }:
  { x: number; y: number; s?: number; rot?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} fill={fill}>
      <path d="M0,-24 L3,-9 L28,-1 L28,3 L4,5 L4,14 L11,20 L11,23 L0,20 L-11,23 L-11,20 L-4,14 L-4,5 L-28,3 L-28,-1 L-3,-9 Z" />
    </g>
  );
}

// Side-view aircraft — nose toward +x (right) at rot 0. Fuselage, fin, wing.
export function PlaneSide({ x, y, s = 1, rot = 0, fill = "#0f172a" }:
  { x: number; y: number; s?: number; rot?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} fill={fill}>
      <path d="M-30,1.5 Q-33,0 -27,-2 L-22,-2 L-18,-11 L-14,-11 L-12,-2 L21,-3 Q32,-3 35,0 Q31,3 21,3 L-12,3 Z" />
      <path d="M-9,2.5 L5,2.5 L-4,10 Z" />
    </g>
  );
}
