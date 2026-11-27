// Original teaching schematics for the Night Rating (NR1–NR4).
// In-house vector diagrams; same white-card frame as the other figure sets.

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full rounded-lg border border-zinc-800 bg-white p-2">{children}</div>;
}

const RAD = Math.PI / 180;
// Sector path from bearing a1 to a2 (degrees clockwise from the nose = up).
function sector(cx: number, cy: number, r: number, a1: number, a2: number) {
  const p = (a: number) => `${cx + r * Math.sin(a * RAD)} ${cy - r * Math.cos(a * RAD)}`;
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${p(a1)} A ${r} ${r} 0 ${large} 1 ${p(a2)} Z`;
}

// NR1 / NR4 — navigation-light arcs (top view) + how other aircraft appear.
export function NavLightsSectors() {
  const cx = 150, cy = 130, r = 95;
  return (
    <Frame>
      <svg viewBox="0 0 400 260" className="w-full" role="img" aria-label="Navigation light arcs: red left 110°, green right 110°, white tail 140°">
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Navigation lights — arcs of visibility (top view)</text>
        <path d={sector(cx, cy, r, 0, 110)} fill="#16a34a" opacity="0.22" stroke="#16a34a" />
        <path d={sector(cx, cy, r, 250, 360)} fill="#dc2626" opacity="0.22" stroke="#dc2626" />
        <path d={sector(cx, cy, r, 110, 250)} fill="#94a3b8" opacity="0.25" stroke="#64748b" />
        {/* aircraft, nose up */}
        <path d={`M ${cx} ${cy - 30} L ${cx + 4} ${cy - 8} L ${cx + 34} ${cy} L ${cx + 34} ${cy + 5} L ${cx + 4} ${cy + 4} L ${cx + 3} ${cy + 20} L ${cx + 12} ${cy + 25} L ${cx - 12} ${cy + 25} L ${cx - 3} ${cy + 20} L ${cx - 4} ${cy + 4} L ${cx - 34} ${cy + 5} L ${cx - 34} ${cy} L ${cx - 4} ${cy - 8} Z`} fill="#1e293b" />
        <circle cx={cx - 34} cy={cy + 2} r={3.5} fill="#dc2626" />
        <circle cx={cx + 34} cy={cy + 2} r={3.5} fill="#16a34a" />
        <circle cx={cx} cy={cy + 26} r={3.5} fill="#f8fafc" stroke="#0f172a" />
        <text x={cx - 78} y={cy - 40} fontSize="10" fontWeight="bold" fill="#b91c1c">RED 110°</text>
        <text x={cx + 40} y={cy - 40} fontSize="10" fontWeight="bold" fill="#15803d">GREEN 110°</text>
        <text x={cx} y={cy + 80} fontSize="10" fontWeight="bold" fill="#334155" textAnchor="middle">WHITE 140°</text>
        <text x={cx} y={cy - r - 4} fontSize="8.5" fill="#334155" textAnchor="middle">dead ahead</text>
        {/* what you see */}
        <g fontSize="9" fill="#0f172a">
          <text x={262} y={44} fontWeight="bold">What you see</text>
          <circle cx={268} cy={62} r={4} fill="#dc2626" /><circle cx={280} cy={62} r={4} fill="#16a34a" />
          <text x={290} y={65}>red + green: head-on</text>
          <circle cx={268} cy={84} r={4} fill="#dc2626" />
          <text x={290} y={87}>red only: its LEFT side</text>
          <circle cx={268} cy={106} r={4} fill="#16a34a" />
          <text x={290} y={109}>green only: its RIGHT side</text>
          <circle cx={268} cy={128} r={4} fill="#f8fafc" stroke="#0f172a" />
          <text x={290} y={131}>white only: you are behind</text>
          <rect x={258} y={146} width={136} height={58} rx={4} fill="#fef2f2" stroke="#fca5a5" />
          <text x={264} y={162} fontWeight="bold" fill="#b91c1c">Red on your RIGHT,</text>
          <text x={264} y={175}>constant bearing:</text>
          <text x={264} y={188}>it has right of way —</text>
          <text x={264} y={200} fontWeight="bold">YOU give way</text>
          <text x={258} y={226} fontSize="8.5" fill="#475569">Beacon (red) + strobes (white)</text>
          <text x={258} y={238} fontSize="8.5" fill="#475569">= anti-collision lights</text>
        </g>
      </svg>
    </Frame>
  );
}

// NR3 — rods vs cones across the retina, the foveal night blind spot, and the
// dark-adaptation curve.
export function NightVisionDiagram() {
  return (
    <Frame>
      <svg viewBox="0 0 400 230" className="w-full" role="img" aria-label="Rods and cones distribution and dark adaptation curve">
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Night vision — rods, cones &amp; dark adaptation</text>
        {/* receptor density chart */}
        <g transform="translate(20 30)">
          <line x1={0} y1={140} x2={170} y2={140} stroke="#334155" />
          <line x1={0} y1={0} x2={0} y2={140} stroke="#334155" />
          <path d="M 0 120 C 40 110 60 60 80 140 C 100 60 120 110 170 120" fill="none" stroke="#475569" strokeWidth="2.5" />
          <path d="M 0 136 L 70 132 L 80 10 L 90 132 L 170 136" fill="none" stroke="#d97706" strokeWidth="2.5" />
          <rect x={74} y={0} width={12} height={140} fill="#0f172a" opacity="0.08" />
          <text x={80} y={155} fontSize="8.5" textAnchor="middle" fill="#0f172a">fovea</text>
          <text x={4} y={170} fontSize="8.5" fill="#475569">periphery</text>
          <text x={130} y={170} fontSize="8.5" fill="#475569">periphery</text>
          <text x={92} y={18} fontSize="9" fill="#b45309" fontWeight="bold">cones (colour, detail)</text>
          <text x={110} y={100} fontSize="9" fill="#334155" fontWeight="bold">rods (dim light)</text>
          <text x={80} y={186} fontSize="8.5" textAnchor="middle" fill="#b91c1c">no rods at fovea → night blind spot</text>
          <text x={80} y={198} fontSize="8.5" textAnchor="middle" fill="#0f172a">look 10–15° off-centre</text>
        </g>
        {/* dark adaptation curve */}
        <g transform="translate(225 30)">
          <line x1={0} y1={140} x2={160} y2={140} stroke="#334155" />
          <line x1={0} y1={0} x2={0} y2={140} stroke="#334155" />
          <text x={-6} y={8} fontSize="8" textAnchor="end" fill="#475569">high</text>
          <text x={4} y={-4} fontSize="8.5" fill="#475569">sensitivity</text>
          <path d="M 0 130 C 15 100 25 92 35 90 C 45 89 50 89 55 88 C 75 60 110 25 160 18" fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
          <line x1={35} y1={140} x2={35} y2={90} stroke="#94a3b8" strokeDasharray="3 3" />
          <line x1={150} y1={140} x2={150} y2={20} stroke="#94a3b8" strokeDasharray="3 3" />
          <text x={35} y={152} fontSize="8.5" textAnchor="middle" fill="#0f172a">≈7 min</text>
          <text x={150} y={152} fontSize="8.5" textAnchor="middle" fill="#0f172a">≈30 min</text>
          <text x={40} y={82} fontSize="8.5" fill="#b45309">cones adapted</text>
          <text x={70} y={34} fontSize="8.5" fill="#1d4ed8">rods fully adapted</text>
          <text x={80} y={170} fontSize="8.5" textAnchor="middle" fill="#475569">time in the dark</text>
          <text x={80} y={186} fontSize="8.5" textAnchor="middle" fill="#b91c1c">a bright flash resets it in seconds</text>
          <text x={80} y={198} fontSize="8.5" textAnchor="middle" fill="#0f172a">hypoxia from ≈5 000 ft dims it</text>
        </g>
      </svg>
    </Frame>
  );
}

// NR4 — aerodrome night lighting colours: runway, taxiway, stop bar, beacon, obstacle.
export function AerodromeNightLighting() {
  const rwyY = 70;
  return (
    <Frame>
      <svg viewBox="0 0 400 240" className="w-full" role="img" aria-label="Aerodrome night lighting colours">
        <rect x={0} y={0} width={400} height={240} fill="#0b1220" rx={6} />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#e2e8f0">Aerodrome lighting at night</text>
        {/* runway */}
        <rect x={40} y={rwyY} width={320} height={34} fill="#1f2937" />
        {Array.from({ length: 11 }).map((_, i) => {
          const x = 50 + i * 30;
          const c = x > 300 ? "#facc15" : "#f8fafc";
          return <g key={i}><circle cx={x} cy={rwyY - 2} r={2.6} fill={c} /><circle cx={x} cy={rwyY + 36} r={2.6} fill={c} /></g>;
        })}
        {Array.from({ length: 5 }).map((_, i) => <circle key={i} cx={40} cy={rwyY + 4 + i * 6.5} r={2.6} fill="#22c55e" />)}
        {Array.from({ length: 5 }).map((_, i) => <circle key={i} cx={360} cy={rwyY + 4 + i * 6.5} r={2.6} fill="#ef4444" />)}
        <text x={40} y={rwyY - 10} fontSize="8.5" fill="#22c55e" textAnchor="middle">threshold GREEN</text>
        <text x={360} y={rwyY - 10} fontSize="8.5" fill="#ef4444" textAnchor="middle">end RED</text>
        <text x={170} y={rwyY - 10} fontSize="8.5" fill="#e2e8f0" textAnchor="middle">edge WHITE</text>
        <text x={318} y={rwyY + 50} fontSize="8" fill="#facc15" textAnchor="middle">yellow last 600 m</text>
        {/* taxiway */}
        <path d="M 150 104 L 150 200 L 300 200" fill="none" stroke="#1f2937" strokeWidth="22" />
        {Array.from({ length: 6 }).map((_, i) => <g key={i}><circle cx={138} cy={115 + i * 15} r={2.4} fill="#3b82f6" /><circle cx={162} cy={115 + i * 15} r={2.4} fill="#3b82f6" /></g>)}
        {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={150} cy={118 + i * 15} r={2.2} fill={i < 2 ? (i % 2 ? "#facc15" : "#22c55e") : "#22c55e"} />)}
        {Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={170 + i * 16} cy={200} r={2.2} fill="#22c55e" />)}
        {/* stop bar */}
        {Array.from({ length: 5 }).map((_, i) => <circle key={i} cx={142 + i * 4} cy={150} r={2} fill="#ef4444" />)}
        <text x={170} y={153} fontSize="8.5" fill="#ef4444">stop bar RED</text>
        <text x={100} y={130} fontSize="8.5" fill="#3b82f6" textAnchor="end">taxiway edge BLUE</text>
        <text x={230} y={222} fontSize="8.5" fill="#22c55e" textAnchor="middle">centreline GREEN</text>
        {/* beacon */}
        <g transform="translate(330 165)">
          <rect x={-3} y={0} width={6} height={30} fill="#64748b" />
          <circle cx={-5} cy={-2} r={5} fill="#f8fafc" />
          <circle cx={5} cy={-2} r={5} fill="#22c55e" />
          <text x={0} y={-12} fontSize="8.5" fill="#e2e8f0" textAnchor="middle">beacon white/green</text>
        </g>
        {/* obstacle mast */}
        <g transform="translate(40 150)">
          <path d="M 0 70 L 8 0 L 16 70" fill="none" stroke="#64748b" strokeWidth="2" />
          <circle cx={8} cy={0} r={3.5} fill="#ef4444" />
          <circle cx={8} cy={35} r={3} fill="#ef4444" />
          <text x={26} y={10} fontSize="8.5" fill="#e2e8f0">obstacle: steady red (low)</text>
          <text x={26} y={22} fontSize="8.5" fill="#e2e8f0">flashing red (medium)</text>
          <text x={26} y={34} fontSize="8.5" fill="#e2e8f0">flashing white (high)</text>
        </g>
      </svg>
    </Frame>
  );
}
