// Original teaching schematics for IR All-Weather-Operations flight procedures.
// These are in-house vector diagrams of the *generic* method (approach segments,
// approach lighting / PAPI, straight-departure splay) — NOT reproductions of the
// copyrighted SACAA AIP or Jeppesen plates in the AVEX AWO books, which students
// read from their own charts. Same visual language as the other figure sets.

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full rounded-lg border border-zinc-800 bg-white p-2">{children}</div>;
}

// C.3.6 — the five instrument-approach segments and the 3° final path.
import { SkyDuskScene, NightApproachScene, SkyDayScene } from "@/app/components/figures/figureScene";

export function ApproachSegments() {
  const plane = (x: number, y: number, r = 0) => (
    <g transform={`translate(${x},${y}) rotate(${r})`} fill="#0f172a">
      <polygon points="0,0 14,3 14,4 0,7" />
      <polygon points="5,3 8,-3 9,-3 9,3" />
    </g>
  );
  return (
    <Frame>
      <svg viewBox="0 0 360 210" className="w-full">
        <SkyDuskScene w={360} />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Instrument approach — segments &amp; profile</text>
        {/* ground / runway */}
        <rect x={300} y={168} width={52} height={7} fill="#0f172a" />
        <text x={326} y={188} fontSize="8" textAnchor="middle" fill="#64748b">RWY / THR</text>
        {/* stepped plan of segments */}
        <line x1={16} y1={60} x2={92} y2={60} stroke="#1d4ed8" strokeWidth="1.6" />
        <line x1={92} y1={60} x2={168} y2={60} stroke="#2563eb" strokeWidth="1.6" />
        <line x1={168} y1={60} x2={244} y2={60} stroke="#7c3aed" strokeWidth="1.6" />
        {[["IAF", 54], ["IF", 130], ["FAF", 206], ["MAPt", 282]].map(([t, x]) => (
          <g key={t as string}>
            <circle cx={x as number} cy={60} r={3} fill="#0f172a" />
            <text x={x as number} y={50} fontSize="8" textAnchor="middle" fill="#0f172a">{t}</text>
          </g>
        ))}
        {plane(30, 56)}
        <text x={54} y={74} fontSize="7.5" textAnchor="middle" fill="#1d4ed8">initial</text>
        <text x={130} y={74} fontSize="7.5" textAnchor="middle" fill="#2563eb">intermediate</text>
        <text x={206} y={74} fontSize="7.5" textAnchor="middle" fill="#7c3aed">final</text>
        {/* 3 degree descent profile */}
        <line x1={92} y1={100} x2={300} y2={168} stroke="#15803d" strokeWidth="1.8" />
        <text x={196} y={128} fontSize="8" transform="rotate(18 196 128)" fill="#15803d">3° descent path</text>
        {/* missed approach */}
        <path d="M282 60 q26 -20 52 -6" stroke="#b45309" strokeWidth="1.6" fill="none" strokeDasharray="5 4" markerEnd="url(#ah)" />
        <defs><marker id="ah" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#b45309" /></marker></defs>
        <text x={322} y={40} fontSize="7.5" textAnchor="middle" fill="#b45309">missed approach</text>
        <text x={196} y={200} fontSize="8" textAnchor="middle" fill="#64748b">DA/DH (precision) or MDA/MDH (non-precision) at/​before the MAPt</text>
      </svg>
    </Frame>
  );
}

// C.3.7 — approach lighting system + PAPI on-slope indication.
export function ApproachLightingPAPI() {
  return (
    <Frame>
      <svg viewBox="0 0 360 200" className="w-full">
        <NightApproachScene w={360} h={200} />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#e2e8f0">Approach lighting &amp; PAPI</text>
        {/* runway */}
        <rect x={150} y={150} width={190} height={24} fill="#334155" />
        <line x1={150} y1={162} x2={340} y2={162} stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="10 8" />
        {/* threshold green bar */}
        <rect x={148} y={150} width={4} height={24} fill="#16a34a" />
        <text x={150} y={188} fontSize="8" textAnchor="middle" fill="#16a34a">green THR</text>
        {/* runway end red */}
        <rect x={338} y={150} width={4} height={24} fill="#dc2626" />
        {/* centre-line approach lights (900 m CAT I) */}
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={20 + i * 14} y={160} width={7} height={4} fill="#fbbf24" />
        ))}
        {/* crossbar 300 m from threshold */}
        <rect x={104} y={150} width={4} height={24} fill="#fbbf24" />
        <text x={64} y={148} fontSize="8" textAnchor="middle" fill="#cbd5e1">centre-line row (≈900 m, CAT I)</text>
        <text x={106} y={186} fontSize="7.5" textAnchor="middle" fill="#94a3b8">crossbar 300 m</text>
        {/* PAPI wing bar */}
        <text x={120} y={60} fontSize="9" fontWeight="bold" fill="#e2e8f0">PAPI (on slope = 2 white / 2 red)</text>
        {["#ffffff", "#ffffff", "#dc2626", "#dc2626"].map((c, i) => (
          <circle key={i} cx={70 + i * 20} cy={80} r={7} fill={c} stroke="#0f172a" strokeWidth="1" />
        ))}
        <text x={250} y={80} fontSize="8" fill="#cbd5e1">all white = high</text>
        <text x={250} y={96} fontSize="8" fill="#cbd5e1">all red = low</text>
      </svg>
    </Frame>
  );
}

// C.3.4 — straight instrument departure: ±15° splay and climb gradient.
export function StraightDeparture() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <SkyDayScene h={200} />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Straight departure &amp; climb gradient</text>
        {/* runway */}
        <rect x={30} y={150} width="90" height="10" fill="#334155" />
        <text x={75} y={174} fontSize="8" textAnchor="middle" fill="#64748b">RWY</text>
        {/* extended centre line */}
        <line x1={120} y1={155} x2={320} y2={155} stroke="#94a3b8" strokeWidth="1" strokeDasharray="6 5" />
        {/* +/-15 degree splay */}
        <line x1={120} y1={155} x2={320} y2={100} stroke="#1d4ed8" strokeWidth="1.4" />
        <line x1={120} y1={155} x2={320} y2={210 - 0} stroke="#1d4ed8" strokeWidth="1.4" />
        <path d="M170 155 A50 50 0 0 0 165 141" fill="none" stroke="#1d4ed8" strokeWidth="1" />
        <text x={185} y={140} fontSize="8" fill="#1d4ed8">±15°</text>
        <text x={250} y={92} fontSize="8" fill="#1d4ed8">initial track within 15° of centre line</text>
        {/* climb gradient profile */}
        <line x1={30} y1={150} x2={30} y2={40} stroke="#cbd5e1" strokeWidth="1" />
        <line x1={30} y1={150} x2={230} y2={70} stroke="#15803d" strokeWidth="1.8" />
        <text x={130} y={100} fontSize="8" transform="rotate(-22 130 100)" fill="#15803d">min climb gradient (%)</text>
        <text x={30} y={196} fontSize="7.5" fill="#64748b">ROC(fpm) ≈ gradient% × GS(kt) × 1.013</text>
      </svg>
    </Frame>
  );
}
