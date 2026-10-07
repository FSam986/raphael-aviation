// Cessna 172 Skyhawk — the single aircraft used across all illustrations.
// Drawn from every angle (side, top, front) as reusable primitives, high-wing
// strut-braced with fixed tricycle gear and a two-blade tractor prop.
// In-house vector art; livery stripe in a neutral blue.

const STRIPE = "#2563eb";

function defs(id: string) {
  return (
    <defs>
      <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" /><stop offset="55%" stopColor="#eef2f7" /><stop offset="100%" stopColor="#c7cfdb" />
      </linearGradient>
      <linearGradient id={`${id}-wing`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbfcfe" /><stop offset="100%" stopColor="#b9c2d0" />
      </linearGradient>
      <radialGradient id={`${id}-spin`} cx="35%" cy="35%" r="70%"><stop offset="0%" stopColor="#cbd5e1" /><stop offset="100%" stopColor="#475569" /></radialGradient>
      <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="2" stdDeviation="1.8" floodColor="#0f172a" floodOpacity="0.28" /></filter>
    </defs>
  );
}

/* SIDE view — nose to the RIGHT. rot = pitch up (deg). */
export function Cessna172Side({ x, y, s = 1, rot = 0, id = "c172s" }: { x: number; y: number; s?: number; rot?: number; id?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${-rot})`}>
      {defs(id)}
      <g filter={`url(#${id}-sh)`}>
        {/* horizontal stabiliser + elevator (tail, left) */}
        <path d="M-60,-5 L-40,-6 L-40,-3 L-60,-2 Z" fill={`url(#${id}-wing)`} stroke="#94a3b8" strokeWidth="0.4" />
        {/* swept vertical fin + dorsal fillet + rudder */}
        <path d="M-52,-6 L-40,-6 L-33,-28 L-40,-28 Z" fill={`url(#${id}-body)`} stroke="#94a3b8" strokeWidth="0.5" />
        <path d="M-40,-6 L-22,-7 L-33,-27 L-40,-28 Z" fill={`url(#${id}-body)`} stroke="#94a3b8" strokeWidth="0.4" opacity="0.9" />
        <path d="M-52,-6 L-49,-14 L-43,-14 L-40,-6 Z" fill={STRIPE} opacity="0.85" />
        {/* fuselage: cabin bulge up front, slender tail cone */}
        <path d="M46,4 C44,10 34,11 22,10 L-52,-3 C-56,-3 -56,-6 -52,-6 L-30,-9 C-14,-16 2,-16 20,-14 C34,-13 44,-6 46,4 Z" fill={`url(#${id}-body)`} stroke="#94a3b8" strokeWidth="0.6" />
        {/* nose cowl + spinner + prop */}
        <path d="M46,4 C50,2 52,-2 51,-6 L44,-6 C44,-1 44,2 44,5 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.4" />
        <ellipse cx="52" cy="-2" rx="4" ry="6" fill={`url(#${id}-spin)`} />
        <rect x="54" y="-22" width="2.4" height="40" rx="1.2" fill="#334155" />
        {/* livery stripe */}
        <path d="M-50,-4 L44,0" stroke={STRIPE} strokeWidth="2.2" strokeLinecap="round" />
        {/* wrap windscreen + cabin door windows */}
        <path d="M40,-5 C36,-11 30,-14 22,-14 L20,-6 L38,-4 Z" fill="#1e293b" opacity="0.9" />
        <path d="M18,-13 L2,-13 L2,-5 L18,-5 Z" fill="#26364d" opacity="0.85" />
        <line x1="10" y1="-13" x2="10" y2="-5" stroke="#0f172a" strokeWidth="0.6" />
        {/* HIGH WING — thin airfoil above cabin (edge-on) */}
        <path d="M34,-16 L-16,-15 C-20,-15 -20,-18 -16,-18 L34,-19 C38,-19 38,-16 34,-16 Z" fill={`url(#${id}-wing)`} stroke="#94a3b8" strokeWidth="0.5" />
        {/* lift strut */}
        <line x1="8" y1="7" x2="20" y2="-15" stroke="#cbd5e1" strokeWidth="1.6" /><line x1="8" y1="7" x2="20" y2="-15" stroke="#64748b" strokeWidth="0.5" />
        {/* fixed tricycle gear with spats */}
        <path d="M6,9 C4,15 2,19 1,22" stroke="#475569" strokeWidth="2" fill="none" /><ellipse cx="1" cy="23" rx="4.5" ry="4.5" fill="#1f2937" /><path d="M-4,21 a6 4 0 0 1 10 0 Z" fill="#cbd5e1" opacity="0.9" />
        <line x1="40" y1="7" x2="41" y2="21" stroke="#475569" strokeWidth="2" /><circle cx="41" cy="23" r="4" fill="#1f2937" /><path d="M36,21 a5 3.5 0 0 1 10 0 Z" fill="#cbd5e1" opacity="0.9" />
      </g>
    </g>
  );
}

/* TOP (plan) view — nose UP. rot spins in plane. */
export function Cessna172Top({ x, y, s = 1, rot = 0, id = "c172t" }: { x: number; y: number; s?: number; rot?: number; id?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
      {defs(id)}
      <g filter={`url(#${id}-sh)`}>
        {/* fuselage spine */}
        <path d="M0,-32 C4,-32 5,-26 5,-16 L4,22 C4,27 2,30 0,30 C-2,30 -4,27 -4,22 L-5,-16 C-5,-26 -4,-32 0,-32 Z" fill={`url(#${id}-body)`} stroke="#94a3b8" strokeWidth="0.6" />
        {/* tail horizontal stabiliser */}
        <path d="M-18,24 L18,24 L15,29 L-15,29 Z" fill={`url(#${id}-wing)`} stroke="#94a3b8" strokeWidth="0.5" />
        {/* vertical fin edge-on */}
        <path d="M-1.6,20 L1.6,20 L1,30 L-1,30 Z" fill="#94a3b8" />
        {/* HIGH WING — span:length ≈ 1.33 (11 m : 8.28 m), slight taper, over cabin */}
        <path d="M-42,-10 L42,-10 C45,-10 45,-4 42,-3 L-42,-3 C-45,-4 -45,-10 -42,-10 Z" fill={`url(#${id}-wing)`} stroke="#94a3b8" strokeWidth="0.6" />
        {/* struts (faint, under wing) */}
        <line x1="-4" y1="0" x2="-30" y2="-6" stroke="#94a3b8" strokeWidth="1" opacity="0.7" /><line x1="4" y1="0" x2="30" y2="-6" stroke="#94a3b8" strokeWidth="1" opacity="0.7" />
        {/* livery stripe down the spine */}
        <line x1="0" y1="-24" x2="0" y2="20" stroke={STRIPE} strokeWidth="2.2" strokeLinecap="round" />
        {/* windscreen + cabin roof */}
        <path d="M-4,-14 C-4,-18 4,-18 4,-14 L3,-6 L-3,-6 Z" fill="#1e293b" opacity="0.9" />
        {/* spinner + prop disc */}
        <circle cx="0" cy="-32" r="2.4" fill="#334155" />
        <ellipse cx="0" cy="-32" rx="15" ry="2.6" fill="#334155" opacity="0.45" />
      </g>
    </g>
  );
}

/* FRONT view — nose toward viewer. */
export function Cessna172Front({ x, y, s = 1, id = "c172f" }: { x: number; y: number; s?: number; id?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {defs(id)}
      <g filter={`url(#${id}-sh)`}>
        {/* HIGH WING with shallow dihedral */}
        <path d="M-54,-16 L-4,-20 L4,-20 L54,-16 L54,-12 L4,-16 L-4,-16 L-54,-12 Z" fill={`url(#${id}-wing)`} stroke="#94a3b8" strokeWidth="0.6" />
        {/* fuselage body (rounded) */}
        <ellipse cx="0" cy="-2" rx="11" ry="15" fill={`url(#${id}-body)`} stroke="#94a3b8" strokeWidth="0.6" />
        {/* windscreen (two panes) */}
        <path d="M-8,-12 C-8,-17 8,-17 8,-12 L6,-4 L-6,-4 Z" fill="#26364d" /><line x1="0" y1="-15" x2="0" y2="-4" stroke="#0f172a" strokeWidth="0.6" />
        {/* struts */}
        <line x1="-9" y1="6" x2="-32" y2="-14" stroke="#64748b" strokeWidth="1.4" /><line x1="9" y1="6" x2="32" y2="-14" stroke="#64748b" strokeWidth="1.4" />
        {/* spinner + 2-blade prop (vertical) */}
        <rect x="-1.6" y="-30" width="3.2" height="52" rx="1.6" fill="#334155" />
        <ellipse cx="0" cy="-2" rx="3.4" ry="3.4" fill="#475569" />
        {/* nose gear + splayed main gear */}
        <line x1="0" y1="13" x2="0" y2="22" stroke="#475569" strokeWidth="2" /><circle cx="0" cy="23" r="3.2" fill="#1f2937" />
        <line x1="-7" y1="10" x2="-22" y2="22" stroke="#475569" strokeWidth="2" /><ellipse cx="-23" cy="23" rx="4" ry="3.4" fill="#1f2937" />
        <line x1="7" y1="10" x2="22" y2="22" stroke="#475569" strokeWidth="2" /><ellipse cx="23" cy="23" rx="4" ry="3.4" fill="#1f2937" />
        {/* stripe hint on nose */}
        <ellipse cx="0" cy="6" rx="10" ry="4" fill={STRIPE} opacity="0.8" />
      </g>
    </g>
  );
}
