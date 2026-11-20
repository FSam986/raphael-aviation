// Original teaching schematics for IR flight procedures & special operations.
// In-house vector diagrams of the GENERIC method only (cold-temperature
// altimetry, the minimum-altitude family, holding entry sectors, the transition
// layer, microburst windshear, hydroplaning, the stabilised-approach gate) —
// NOT reproductions of any SACAA AIP, Jeppesen plate or textbook figure. Same
// visual language as awoFigures.tsx: a white Frame and plain labelled SVG.

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full rounded-lg border border-zinc-800 bg-white p-2">{children}</div>;
}

// C.3.3 — cold-temperature altimetry: in air colder than ISA the altimeter
// over-reads, so TRUE height is lower than indicated ("hot to cold, look out below").
export function ColdTempAltimetry() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Cold-temperature altimetry error</text>
        {/* terrain + obstacle */}
        <path d="M250 180 L300 120 L330 150 L360 110 L400 150 L400 180 Z" fill="#cbd5e1" />
        <rect x={358} y={96} width={4} height={18} fill="#0f172a" /><text x={366} y={104} fontSize="7.5" fill="#334155">obstacle</text>
        <rect x={0} y={180} width={400} height={30} fill="#94a3b8" />
        {/* indicated altitude = constant flat line */}
        <line x1={20} y1={70} x2={380} y2={70} stroke="#1d4ed8" strokeWidth="2" strokeDasharray="6 4" />
        <text x={24} y={64} fontSize="8" fill="#1d4ed8">indicated altitude (what you fly)</text>
        {/* true path sags toward terrain in cold air */}
        <path d="M20 70 C140 92, 240 120, 380 120" fill="none" stroke="#dc2626" strokeWidth="2.2" />
        <text x={150} y={112} fontSize="8" fill="#dc2626">TRUE height — LOWER in cold air</text>
        {/* gap arrows */}
        <line x1={300} y1={70} x2={300} y2={116} stroke="#b45309" strokeWidth="1.2" />
        <text x={304} y={96} fontSize="7.5" fill="#b45309">error</text>
        {/* plane on the indicated line */}
        <g transform="translate(60,66)" fill="#0f172a"><polygon points="0,0 14,3 14,4 0,7" /><polygon points="5,3 8,-3 9,-3 9,3" /></g>
        <text x={10} y={202} fontSize="7.6" fill="#334155">Colder than ISA → add the cold-temperature correction to minima/crossing altitudes. ≈ 4 ft per 1000 ft per °C below ISA.</text>
      </svg>
    </Frame>
  );
}

// C.3.5 — the en-route minimum-altitude family over a terrain profile.
export function MinimumAltitudes() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">En-route minimum altitudes</text>
        {/* terrain */}
        <path d="M0 180 L60 150 L110 165 L170 120 L210 150 L270 100 L320 140 L400 150 L400 185 L0 185 Z" fill="#cbd5e1" />
        <line x1={270} y1={100} x2={270} y2={88} stroke="#0f172a" strokeWidth="2" /><text x={274} y={90} fontSize="7" fill="#334155">highest obstacle</text>
        {/* MOCA (just above terrain) */}
        <line x1={20} y1={78} x2={380} y2={78} stroke="#16a34a" strokeWidth="1.8" strokeDasharray="5 4" />
        <text x={24} y={74} fontSize="7.6" fill="#15803d">MOCA — obstacle clearance only (navaid ≤ 22 NM)</text>
        {/* MEA (above MOCA) */}
        <line x1={20} y1={56} x2={380} y2={56} stroke="#1d4ed8" strokeWidth="1.8" />
        <text x={24} y={52} fontSize="7.6" fill="#1d4ed8">MEA — obstacle clearance + navaid signal + comms</text>
        {/* MORA band */}
        <line x1={20} y1={38} x2={380} y2={38} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x={24} y={34} fontSize="7.6" fill="#7c3aed">MORA / Grid MORA — off-route obstacle clearance</text>
        {/* obstacle clearance arrow */}
        <line x1={270} y1={100} x2={270} y2={78} stroke="#15803d" strokeWidth="1" /><text x={300} y={92} fontSize="7" fill="#15803d">1000 ft (2000 mountainous)</text>
        {/* MSA inset */}
        <circle cx={360} cy={168} r={20} fill="none" stroke="#0f172a" strokeWidth="1" />
        <line x1={360} y1={148} x2={360} y2={188} stroke="#94a3b8" strokeWidth="0.8" /><line x1={340} y1={168} x2={380} y2={168} stroke="#94a3b8" strokeWidth="0.8" />
        <text x={360} y={200} fontSize="6.6" textAnchor="middle" fill="#334155">MSA 25 NM</text>
      </svg>
    </Frame>
  );
}

// C.3.2 / C.3.6 — ICAO holding and its three entry sectors (right-hand pattern).
export function HoldingEntry() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Holding pattern — entry sectors</text>
        {/* holding fix */}
        <circle cx={150} cy={110} r={4} fill="#0f172a" /><text x={132} y={108} fontSize="8" fill="#0f172a">fix</text>
        {/* racetrack (right turns): inbound to the fix along the inbound track, outbound parallel */}
        <path d="M150 110 L250 110 A24 24 0 0 1 250 158 L150 158 A24 24 0 0 1 150 110 Z" fill="#e0e7ff" stroke="#1d4ed8" strokeWidth="1.6" />
        <polygon points="190,158 180,154 180,162" fill="#1d4ed8" /><text x={196} y={172} fontSize="7.5" fill="#1d4ed8">inbound track</text>
        <text x={210} y={128} fontSize="7" fill="#1d4ed8">1 min legs; right turns (std)</text>
        {/* sector dividing lines: 70 deg line through the fix */}
        <line x1={150} y1={110} x2={40} y2={110} stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="4 3" />
        <line x1={150} y1={110} x2={90} y2={40} stroke="#dc2626" strokeWidth="1.2" />
        <text x={96} y={46} fontSize="7" fill="#dc2626">70°</text>
        {/* sector labels */}
        <text x={60} y={70} fontSize="8" fill="#7c3aed" fontWeight="bold">parallel</text>
        <text x={60} y={150} fontSize="8" fill="#15803d" fontWeight="bold">direct</text>
        <text x={120} y={70} fontSize="8" fill="#b45309" fontWeight="bold">teardrop</text>
        <text x={10} y={198} fontSize="7.6" fill="#334155">Direct: turn right onto the hold. Parallel: fly the reciprocal, turn left back. Teardrop: 30° offset, then turn to the inbound.</text>
      </svg>
    </Frame>
  );
}

// C.3.3 — transition altitude / level / layer and which setting to use.
export function TransitionLayer() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Transition altitude, level &amp; layer</text>
        {/* bands */}
        <rect x={40} y={30} width={320} height={44} fill="#dbeafe" />
        <rect x={40} y={74} width={320} height={28} fill="#fde68a" />
        <rect x={40} y={102} width={320} height={70} fill="#dcfce7" />
        {/* lines */}
        <line x1={40} y1={74} x2={360} y2={74} stroke="#1d4ed8" strokeWidth="1.6" /><text x={44} y={70} fontSize="7.6" fill="#1d4ed8">Transition LEVEL (lowest FL on 1013)</text>
        <line x1={40} y1={102} x2={360} y2={102} stroke="#15803d" strokeWidth="1.6" /><text x={44} y={114} fontSize="7.6" fill="#15803d">Transition ALTITUDE (QNH below)</text>
        {/* labels */}
        <text x={200} y={54} fontSize="8.5" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">Flight LEVELS on 1013.25</text>
        <text x={200} y={92} fontSize="7.6" fontStyle="italic" fill="#92400e" textAnchor="middle">transition LAYER</text>
        <text x={200} y={142} fontSize="8.5" fontWeight="bold" fill="#166534" textAnchor="middle">ALTITUDES on QNH</text>
        {/* set-arrows */}
        <path d="M24 150 L24 50" stroke="#0f172a" strokeWidth="1.2" markerEnd="url(#up)" /><text x={6} y={120} fontSize="7" fill="#0f172a" transform="rotate(-90 6 120)">climb: set 1013 at TA</text>
        <path d="M376 50 L376 150" stroke="#0f172a" strokeWidth="1.2" markerEnd="url(#dn)" /><text x={392} y={100} fontSize="7" fill="#0f172a" transform="rotate(90 392 100)">descend: set QNH at TL</text>
        <defs>
          <marker id="up" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto"><path d="M0,6 L3,0 L6,6 Z" fill="#0f172a" /></marker>
          <marker id="dn" markerWidth="6" markerHeight="6" refX="3" refY="1" orient="auto"><path d="M0,0 L6,0 L3,6 Z" fill="#0f172a" /></marker>
        </defs>
        <text x={200} y={196} fontSize="7.6" textAnchor="middle" fill="#334155">1 hPa ≈ 30 ft. QNH = altitude AMSL; QNE = 1013.25 standard setting for flight levels.</text>
      </svg>
    </Frame>
  );
}

// C.5.4 — microburst on the approach: performance-increasing then -decreasing shear.
export function Microburst() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#eff6ff" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Microburst windshear on approach</text>
        {/* cloud + downdraft shaft */}
        <ellipse cx={200} cy={44} rx={70} ry={20} fill="#64748b" />
        <path d="M170 60 L160 120 M200 62 L200 130 M230 60 L240 120" stroke="#475569" strokeWidth="2" />
        <text x={200} y={96} fontSize="8" fill="#1e293b" textAnchor="middle">downdraft</text>
        {/* outflow */}
        <path d="M170 150 L110 150" stroke="#2563eb" strokeWidth="2" markerEnd="url(#mb)" />
        <path d="M230 150 L290 150" stroke="#2563eb" strokeWidth="2" markerEnd="url(#mb)" />
        <defs><marker id="mb" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#2563eb" /></marker></defs>
        <text x={120} y={144} fontSize="7" fill="#1d4ed8">outflow</text><text x={266} y={144} fontSize="7" fill="#1d4ed8">outflow</text>
        {/* ground + runway */}
        <rect x={0} y={178} width={400} height={32} fill="#86895f" />
        <rect x={150} y={176} width={110} height={5} fill="#334155" />
        {/* intended path */}
        <line x1={40} y1={120} x2={260} y2={178} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="5 4" />
        {/* actual path: balloon up (headwind) then sink (downdraft+tailwind) */}
        <path d="M40 120 C90 104, 120 110, 150 128 C180 150, 210 182, 250 190" fill="none" stroke="#dc2626" strokeWidth="2.2" />
        <text x={66} y={100} fontSize="7.4" fill="#15803d">1 headwind ↑ — performance INCREASES (balloons high)</text>
        <text x={150} y={116} fontSize="7.4" fill="#b45309">2 downdraft</text>
        <text x={196} y={200} fontSize="7.4" fill="#dc2626">3 tailwind ↓ — performance LOSS, undershoot</text>
        <text x={10} y={30} fontSize="7.4" fill="#334155">Recognise the early gain as a warning; go around with max thrust before the loss develops.</text>
      </svg>
    </Frame>
  );
}

// C.5.6 — dynamic hydroplaning on a contaminated runway.
export function Hydroplaning() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Dynamic hydroplaning</text>
        {/* runway surface with water film */}
        <rect x={0} y={150} width={400} height={60} fill="#334155" />
        <rect x={0} y={142} width={400} height={10} fill="#60a5fa" opacity={0.7} />
        <text x={340} y={140} fontSize="7.5" fill="#1d4ed8">water film</text>
        {/* tyre lifted by a water wedge */}
        <circle cx={150} cy={118} r={34} fill="#1f2937" stroke="#0f172a" strokeWidth="2" />
        <circle cx={150} cy={118} r={12} fill="#9ca3af" />
        {/* wedge of water under the tyre */}
        <path d="M118 150 Q150 128 182 150 Z" fill="#60a5fa" />
        <path d="M112 150 L122 150" stroke="#1d4ed8" strokeWidth="2" markerEnd="url(#hw)" />
        <defs><marker id="hw" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto"><path d="M6,0 L0,3 L6,6 Z" fill="#1d4ed8" /></marker></defs>
        <text x={128} y={168} fontSize="7" fill="#1d4ed8">water wedge lifts the tyre</text>
        {/* formula box */}
        <rect x={236} y={40} width={150} height={70} rx={6} fill="#ffffff" stroke="#cbd5e1" />
        <text x={246} y={56} fontSize="8.4" fontWeight="bold" fill="#0f172a">Hydroplaning speed</text>
        <text x={246} y={74} fontSize="9" fill="#dc2626">Vp (kt) ≈ 9 × √(tyre psi)</text>
        <text x={246} y={90} fontSize="7.4" fill="#334155">e.g. 36 psi → ≈ 54 kt</text>
        <text x={246} y={102} fontSize="7.4" fill="#334155">(spin-up; lower on spin-down)</text>
        <text x={10} y={200} fontSize="7.4" fill="#334155">Types: dynamic (standing water), viscous (thin film), reverted-rubber (locked wheel, steam). Avoid harsh braking; the tyre stops gripping and steering is lost.</text>
      </svg>
    </Frame>
  );
}

// C.3.4 — turning instrument departure (turn > 15°, not before the obstacle-clearance height).
export function TurningDeparture() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#eef2ff" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Turning departure (SID)</text>
        {/* runway */}
        <rect x={30} y={150} width={70} height={10} fill="#334155" /><text x={65} y={174} fontSize="8" textAnchor="middle" fill="#64748b">RWY</text>
        {/* extended centre line */}
        <line x1={100} y1={155} x2={210} y2={155} stroke="#94a3b8" strokeWidth="1" strokeDasharray="6 5" />
        {/* straight initial segment then turn */}
        <path d="M100 155 L200 150 Q250 148 270 110 L300 60" fill="none" stroke="#1d4ed8" strokeWidth="2.2" markerEnd="url(#td)" />
        <defs><marker id="td" markerWidth="7" markerHeight="7" refX="4" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#1d4ed8" /></marker></defs>
        {/* turn point marker + altitude note */}
        <circle cx={222} cy={149} r={4} fill="#dc2626" />
        <text x={150} y={168} fontSize="7.4" fill="#1d4ed8">straight to the turn point</text>
        {/* turn angle arc */}
        <path d="M232 149 A20 20 0 0 1 240 132" fill="none" stroke="#7c3aed" strokeWidth="1.2" />
        <text x={246} y={140} fontSize="7.4" fill="#7c3aed">turn &gt; 15°</text>
        {/* obstacle clearance gate */}
        <line x1={222} y1={149} x2={222} y2={120} stroke="#b45309" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x={226} y={116} fontSize="7" fill="#b45309">turn not before ≥120 m (394 ft)</text>
        <text x={226} y={126} fontSize="7" fill="#b45309">obstacle clearance (≈ &gt;500 ft AGL)</text>
        <text x={10} y={200} fontSize="7.6" fill="#334155">A turn of more than 15° from the extended centre line; the SID guarantees clearance only if the published climb gradient is met.</text>
      </svg>
    </Frame>
  );
}

// C.3.7 — declared distances: TORA / TODA / ASDA / LDA with clearway & stopway.
export function DeclaredDistances() {
  return (
    <Frame>
      <svg viewBox="0 0 400 200" className="w-full">
        <rect x={0} y={0} width={400} height={200} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Declared distances</text>
        {/* runway, stopway, clearway */}
        <rect x={40} y={70} width={240} height={16} fill="#334155" />
        <text x={160} y={82} fontSize="8" textAnchor="middle" fill="#e2e8f0">RUNWAY</text>
        <rect x={280} y={70} width={40} height={16} fill="#b45309" /><text x={300} y={100} fontSize="7" textAnchor="middle" fill="#b45309">stopway</text>
        <rect x={320} y={72} width={48} height={12} fill="none" stroke="#16a34a" strokeDasharray="3 3" /><text x={344} y={100} fontSize="7" textAnchor="middle" fill="#15803d">clearway</text>
        {/* distance brackets */}
        {[["TORA", 40, 280, 120, "#1d4ed8"], ["ASDA = TORA + stopway", 40, 320, 138, "#b45309"], ["TODA = TORA + clearway", 40, 368, 156, "#15803d"], ["LDA (landing)", 40, 280, 174, "#7c3aed"]].map(([t,x1,x2,y,c])=>(
          <g key={t as string}>
            <line x1={x1 as number} y1={y as number} x2={x2 as number} y2={y as number} stroke={c as string} strokeWidth="1.4" />
            <line x1={x1 as number} y1={(y as number)-3} x2={x1 as number} y2={(y as number)+3} stroke={c as string} strokeWidth="1.4" />
            <line x1={x2 as number} y1={(y as number)-3} x2={x2 as number} y2={(y as number)+3} stroke={c as string} strokeWidth="1.4" />
            <text x={(x1 as number)+4} y={(y as number)-3} fontSize="7.4" fill={c as string}>{t as string}</text>
          </g>
        ))}
        <text x={10} y={196} fontSize="7" fill="#334155">Clearway ≥150 m wide, under aerodrome control; stopway must support an aborted take-off.</text>
      </svg>
    </Frame>
  );
}

// C.3.6 — precision (DA/DH) vs non-precision (MDA/MDH) minima.
export function ApproachMinima() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Precision vs non-precision minima</text>
        <rect x={0} y={180} width={400} height={30} fill="#94a3b8" />
        <rect x={320} y={176} width={70} height={6} fill="#334155" />
        {/* precision: continuous path to DA */}
        <line x1={30} y1={56} x2={356} y2={178} stroke="#15803d" strokeWidth="2" />
        <text x={70} y={60} fontSize="8" fill="#15803d">precision — continuous glide path</text>
        <line x1={150} y1={102} x2={150} y2={150} stroke="#1d4ed8" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx={150} cy={102} r={3.5} fill="#1d4ed8" /><text x={100} y={146} fontSize="7.4" fill="#1d4ed8">DA/DH (go-around may start below)</text>
        {/* non-precision: step down then level at MDA */}
        <path d="M30 70 L120 118 L240 118" fill="none" stroke="#b45309" strokeWidth="2" />
        <line x1={120} y1={118} x2={356} y2={118} stroke="#b45309" strokeWidth="0.8" strokeDasharray="4 3" />
        <text x={242} y={114} fontSize="7.4" fill="#b45309">MDA/MDH — do NOT descend below</text>
        <text x={242} y={128} fontSize="7" fill="#b45309">without the required visual reference</text>
        <circle cx={300} cy={118} r={3.5} fill="#b45309" /><text x={300} y={140} fontSize="7" textAnchor="middle" fill="#b45309">MAPt</text>
        <text x={10} y={202} fontSize="7.4" fill="#334155">OCH + operational margin → DH (precision) or MDH (non-precision); read minima by aircraft category A–D.</text>
      </svg>
    </Frame>
  );
}

// C.5.1 — de-icing / anti-icing fluids and the holdover clock.
export function DeIcing() {
  return (
    <Frame>
      <svg viewBox="0 0 400 200" className="w-full">
        <rect x={0} y={0} width={400} height={200} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">De-icing / anti-icing &amp; holdover</text>
        {/* step 1: de-ice */}
        <rect x={20} y={34} width={170} height={70} rx={6} fill="#fff7ed" stroke="#fb923c" />
        <text x={28} y={50} fontSize="8.4" fontWeight="bold" fill="#9a3412">1 · De-ice — Type I</text>
        <text x={28} y={64} fontSize="7.4" fill="#7c2d12">thin, heated, usually orange</text>
        <text x={28} y={76} fontSize="7.4" fill="#7c2d12">removes existing frost/ice/snow</text>
        <text x={28} y={92} fontSize="7.4" fill="#334155">clean-aircraft concept: nothing</text>
        <text x={28} y={102} fontSize="7.4" fill="#334155">adhering to critical surfaces</text>
        {/* step 2: anti-ice */}
        <rect x={210} y={34} width={170} height={70} rx={6} fill="#eff6ff" stroke="#60a5fa" />
        <text x={218} y={50} fontSize="8.4" fontWeight="bold" fill="#1e40af">2 · Anti-ice — Type II/III/IV</text>
        <text x={218} y={64} fontSize="7.4" fill="#1e3a8a">thicker (pseudoplastic); delays</text>
        <text x={218} y={76} fontSize="7.4" fill="#1e3a8a">further build-up on clean wings</text>
        <text x={218} y={92} fontSize="7.4" fill="#334155">holdover clock STARTS at the</text>
        <text x={218} y={102} fontSize="7.4" fill="#334155">final (anti-icing) application</text>
        {/* holdover bar */}
        <text x={20} y={132} fontSize="8" fontWeight="bold" fill="#0f172a">Holdover Time (a range)</text>
        <rect x={20} y={140} width={360} height={12} rx={6} fill="#dcfce7" />
        <rect x={20} y={140} width={150} height={12} rx={6} fill="#86efac" />
        <text x={176} y={150} fontSize="7.2" fill="#166534">↑ shortens with heavier precip, colder temp, wind, high humidity</text>
        <text x={10} y={178} fontSize="7.4" fill="#334155">Exceed the HOT, or see/suspect contamination → pre-take-off check or re-treat. Even thin frost raises stall speed.</text>
        <text x={10} y={192} fontSize="7.4" fill="#334155">Holdover begins at the START of the anti-icing step, not when de-icing began.</text>
      </svg>
    </Frame>
  );
}

// A.7.3 / POF — V-speeds shown on the ASI colour arcs, plus the off-dial speeds.
export function VSpeeds() {
  const cx = 108, cy = 108, R = 66;
  const pt = (deg: number, r: number) => [cx + r * Math.cos((deg - 90) * Math.PI / 180), cy + r * Math.sin((deg - 90) * Math.PI / 180)];
  // gauge sweep ~ 230° clockwise from lower-left; map speed bands to angles
  const arc = (a0: number, a1: number, r: number = R) => {
    const [x0, y0] = pt(a0, r); const [x1, y1] = pt(a1, r);
    return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)},${y1.toFixed(1)}`;
  };
  return (
    <Frame>
      <svg viewBox="0 0 400 230" className="w-full">
        <rect x={0} y={0} width={400} height={230} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">V-speeds on the ASI</text>
        {/* dial */}
        <circle cx={cx} cy={cy} r={R + 10} fill="#0f172a" />
        <circle cx={cx} cy={cy} r={R + 10} fill="none" stroke="#334155" strokeWidth="2" />
        {/* arcs: white (Vs0→Vfe), green (Vs1→Vno), yellow (Vno→Vne), red radial at Vne */}
        <path d={arc(210, 300, R - 9)} fill="none" stroke="#f8fafc" strokeWidth="5" />
        <path d={arc(225, 330)} fill="none" stroke="#22c55e" strokeWidth="5" />
        <path d={arc(330, 355)} fill="none" stroke="#eab308" strokeWidth="5" />
        {(() => { const [x0,y0]=pt(355,R-6); const [x1,y1]=pt(355,R+6); return <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="#dc2626" strokeWidth="3" />; })()}
        {/* needle */}
        {(() => { const [x,y]=pt(270,R-14); return <line x1={cx} y1={cy} x2={x} y2={y} stroke="#e2e8f0" strokeWidth="2.4" />; })()}
        <circle cx={cx} cy={cy} r={4} fill="#e2e8f0" />
        {/* arc callouts */}
        {[["Vs0", 210, "#e2e8f0"], ["Vfe", 300, "#e2e8f0"], ["Vs1", 225, "#4ade80"], ["Vno", 330, "#facc15"], ["Vne", 355, "#f87171"]].map(([t,deg,c])=>{
          const [x,y]=pt(deg as number, R+22); return <text key={t as string} x={x} y={y} fontSize="8" fontWeight="bold" fill={c as string} textAnchor="middle">{t as string}</text>;
        })}
        {/* legend of arcs */}
        <g fontSize="7.4" fill="#334155">
          <rect x={196} y={34} width={10} height={6} fill="#f8fafc" stroke="#94a3b8" /><text x={210} y={40}>White arc — flap operating (Vs0→Vfe)</text>
          <rect x={196} y={48} width={10} height={6} fill="#22c55e" /><text x={210} y={54}>Green arc — normal operating (Vs1→Vno)</text>
          <rect x={196} y={62} width={10} height={6} fill="#eab308" /><text x={210} y={68}>Yellow arc — caution (Vno→Vne)</text>
          <rect x={196} y={76} width={10} height={6} fill="#dc2626" /><text x={210} y={82}>Red line — never exceed (Vne)</text>
        </g>
        {/* off-dial speeds */}
        <g fontSize="7.4" fill="#0f172a">
          <text x={196} y={104} fontWeight="bold">Not marked on the dial:</text>
          <text x={196} y={118}>Vx — best angle of climb (obstacle)</text>
          <text x={196} y={130}>Vy — best rate of climb (altitude/time)</text>
          <text x={196} y={142}>Va — manoeuvring (varies with mass)</text>
          <text x={196} y={154}>Vyse — blue line, best single-engine ROC</text>
          <text x={196} y={166}>V1 / Vr / V2 — decision / rotate / safety</text>
        </g>
        <text x={10} y={214} fontSize="7.4" fill="#334155">Vs0 = stall landing config; Vs1 = stall clean. White top = Vfe; green top = Vno; red line = Vne.</text>
        <text x={10} y={226} fontSize="7.4" fill="#334155">Va is lower at lighter weights — reduce it when light; fly at/below Va in turbulence.</text>
      </svg>
    </Frame>
  );
}

// C.3.6 — STAR: linking the en-route structure to the IAF with constraints.
export function STARArrival() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">STAR — arrival routing &amp; constraints</text>
        {/* en-route airway in */}
        <line x1={20} y1={44} x2={90} y2={44} stroke="#1d4ed8" strokeWidth="2" markerEnd="url(#st)" />
        <defs><marker id="st" markerWidth="7" markerHeight="7" refX="4" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#1d4ed8" /></marker></defs>
        <text x={20} y={36} fontSize="7.4" fill="#1d4ed8">en-route airway</text>
        {/* STAR winding path through waypoints */}
        <path d="M90 44 L160 44 L210 90 L190 140 L260 160 L320 150" fill="none" stroke="#7c3aed" strokeWidth="2.2" />
        {/* waypoints */}
        {[["ENTRY", 90, 44], ["WPT", 210, 90], ["WPT", 190, 140], ["IAF", 320, 150]].map(([t,x,y])=>(
          <g key={String(x)}>
            <polygon points={`${(x as number)-5},${y} ${x as number},${(y as number)-5} ${(x as number)+5},${y} ${x as number},${(y as number)+5}`} fill="#7c3aed" />
            <text x={x as number} y={(y as number)-8} fontSize="7.4" textAnchor="middle" fill="#0f172a">{t as string}</text>
          </g>
        ))}
        {/* constraint callouts */}
        <text x={216} y={104} fontSize="7" fill="#b45309">cross at/below FL120, 250 kt</text>
        <text x={120} y={160} fontSize="7" fill="#b45309">speed/altitude 'windows' step you down</text>
        <text x={300} y={176} fontSize="7.4" fill="#15803d">IAF → the instrument approach</text>
        <text x={10} y={200} fontSize="7.4" fill="#334155">The STAR delivers you from the airway system to the initial approach fix; descend/slow to meet each published window, then set QNH below the transition level.</text>
      </svg>
    </Frame>
  );
}

// C.3.6 — circling (visual manoeuvring) approach area.
export function CirclingApproach() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#eef2ff" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Circling approach area</text>
        {/* circling area */}
        <ellipse cx={200} cy={115} rx={150} ry={78} fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.2" strokeDasharray="6 4" />
        <text x={70} y={60} fontSize="7.6" fill="#1d4ed8">circling area (radius by category A–D)</text>
        {/* runways (two) */}
        <rect x={176} y={110} width={70} height="8" fill="#334155" transform="rotate(20 200 114)" />
        <text x={250} y={128} fontSize="7.4" fill="#334155">landing runway</text>
        {/* arrival on the instrument final, then circle to land */}
        <path d="M40 70 L150 104" fill="none" stroke="#15803d" strokeWidth="1.8" /><text x={44} y="66" fontSize="7" fill="#15803d">instrument final</text>
        <path d="M150 104 C120 140, 170 180, 230 150 C270 130, 250 118, 220 116" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeDasharray="5 3" markerEnd="url(#ca)" />
        <defs><marker id="ca" markerWidth="7" markerHeight="7" refX="4" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#dc2626" /></marker></defs>
        <text x={150} y={176} fontSize="7" fill="#dc2626">visual manoeuvre to land</text>
        {/* prohibited sector (obstacle) */}
        <path d="M320 70 L350 50 L360 90 Z" fill="#fca5a5" />
        <text x={316} y={46} fontSize="7" fill="#b91c1c">sector prohibited (obstacle)</text>
        <text x={10} y={204} fontSize="7.4" fill="#334155">Stay inside the circling area and at/above the circling OCH/MDA until in position to land; if you lose sight of the runway, go around.</text>
      </svg>
    </Frame>
  );
}

// A.10.4 / C.3.6 — flying a DME arc and intercepting the final radial.
export function DMEArc() {
  const cx = 206, cy = 196, Rarc = 126; // station low-centre; arc arches above it, within the frame
  const pt = (deg: number, r: number): [number, number] => [cx + r * Math.cos((deg - 90) * Math.PI / 180), cy + r * Math.sin((deg - 90) * Math.PI / 180)];
  const [sx, sy] = pt(302, Rarc);   // arc start (upper-left)
  const [ex, ey] = pt(58, Rarc);    // arc end (upper-right)
  const [lx, ly] = pt(302, Rarc + 9); // lead-turn point just outside the arc
  const [ix, iy] = pt(302, Rarc + 44); // inbound radial extends beyond
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">DME arc &amp; radial intercept</text>
        {/* station near the bottom */}
        <circle cx={cx} cy={cy} r={4} fill="#1d4ed8" /><text x={cx + 8} y={cy - 2} fontSize="7.6" fill="#1d4ed8">VOR/DME</text>
        {/* the constant-DME arc, arching above the station */}
        <path d={`M${sx.toFixed(1)},${sy.toFixed(1)} A${Rarc},${Rarc} 0 0 1 ${ex.toFixed(1)},${ey.toFixed(1)}`} fill="none" stroke="#15803d" strokeWidth="2.4" />
        <text x={150} y={46} fontSize="7.6" fill="#15803d">10 DME arc (constant range)</text>
        {/* initial radial inbound, with the lead-turn point */}
        <line x1={ix} y1={iy} x2={sx} y2={sy} stroke="#1d4ed8" strokeWidth="1.6" strokeDasharray="5 3" />
        <circle cx={lx} cy={ly} r={3.5} fill="#dc2626" />
        <text x={lx - 6} y={ly + 2} fontSize="7" textAnchor="end" fill="#dc2626">lead turn ≈ 0.5 NM early</text>
        {/* final radial from the arc end inbound to the station */}
        <line x1={ex} y1={ey} x2={cx} y2={cy} stroke="#7c3aed" strokeWidth="1.8" markerEnd="url(#da2)" />
        <defs><marker id="da2" markerWidth="7" markerHeight="7" refX="4" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#7c3aed" /></marker></defs>
        <text x={300} y={120} fontSize="7.2" fill="#7c3aed">turn inbound on the</text>
        <text x={300} y={131} fontSize="7.2" fill="#7c3aed">final approach radial</text>
        {/* technique note */}
        <text x={120} y={150} fontSize="7.2" fill="#334155">'turn 10 / twist 10' —</text>
        <text x={120} y={161} fontSize="7.2" fill="#334155">small steps keep the station</text>
        <text x={120} y={172} fontSize="7.2" fill="#334155">~90° off the wingtip.</text>
      </svg>
    </Frame>
  );
}

// C.3.6 — the three phases of the missed approach.
export function MissedApproach() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Missed approach — three phases</text>
        <rect x={0} y={182} width={400} height={28} fill="#94a3b8" />
        <rect x={40} y={178} width={70} height={6} fill="#334155" /><text x={75} y={200} fontSize="7.4" textAnchor="middle" fill="#334155">RWY</text>
        {/* final approach down to DA/MDA, then go-around */}
        <line x1={30} y1={60} x2={150} y2={150} stroke="#15803d" strokeWidth="1.8" />
        <circle cx={150} cy={150} r={4} fill="#dc2626" /><text x={150} y={168} fontSize="7.4" textAnchor="middle" fill="#dc2626">DA/DH or MAPt</text>
        {/* initial: establish climb */}
        <line x1={150} y1={150} x2={210} y2={140} stroke="#1d4ed8" strokeWidth="2" />
        <text x={150} y={134} fontSize="7.2" fill="#1d4ed8">1 INITIAL — go-around, gear/flap, climb set</text>
        {/* intermediate: climb established */}
        <line x1={210} y1={140} x2={300} y2={96} stroke="#7c3aed" strokeWidth="2" />
        <text x={226} y={124} fontSize="7.2" fill="#7c3aed">2 INTERMEDIATE — climb established</text>
        {/* final: to the holding/clearance */}
        <path d="M300 96 L356 60" stroke="#b45309" strokeWidth="2" markerEnd="url(#ma)" />
        <defs><marker id="ma" markerWidth="7" markerHeight="7" refX="4" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#b45309" /></marker></defs>
        <text x={300} y={84} fontSize="7.2" fill="#b45309">3 FINAL — to a fix / hold, en-route</text>
        <text x={10} y={204} fontSize="7.4" fill="#334155">Fly the PUBLISHED missed-approach track and climb. On a precision approach the go-around may begin at the DA while descending slightly below it.</text>
      </svg>
    </Frame>
  );
}

// C.3.2 — maximum holding speeds by level, and the leg timing.
export function HoldingSpeeds() {
  return (
    <Frame>
      <svg viewBox="0 0 400 200" className="w-full">
        <rect x={0} y={0} width={400} height={200} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Holding — max speeds &amp; leg timing</text>
        {/* speed-by-level table */}
        <g fontSize="8" fill="#0f172a">
          <rect x={20} y={32} width={210} height={84} rx={6} fill="#ffffff" stroke="#cbd5e1" />
          <text x={28} y={48} fontWeight="bold" fill="#1d4ed8">Max holding IAS (ICAO)</text>
          <text x={28} y={64}>≤ 14 000 ft — 230 kt</text>
          <text x={28} y={80}>14 001–20 000 ft — 240 kt</text>
          <text x={28} y={96}>20 001–34 000 ft — 265 kt</text>
          <text x={28} y={110}>above 34 000 ft — 0.83 M</text>
        </g>
        {/* timing */}
        <g fontSize="8" fill="#0f172a">
          <rect x={246} y={32} width={134} height={84} rx={6} fill="#ffffff" stroke="#cbd5e1" />
          <text x={254} y={48} fontWeight="bold" fill="#15803d">Inbound leg time</text>
          <text x={254} y={64}>≤ 14 000 ft — 1 min</text>
          <text x={254} y={80}>above 14 000 ft — 1½ min</text>
          <text x={254} y={100} fontSize="7.2" fill="#334155">Time the INBOUND leg;</text>
          <text x={254} y={110} fontSize="7.2" fill="#334155">adjust the outbound for wind.</text>
        </g>
        {/* mini racetrack */}
        <path d="M60 150 L150 150 A16 16 0 0 1 150 182 L60 182 A16 16 0 0 1 60 150 Z" fill="#e0e7ff" stroke="#1d4ed8" strokeWidth="1.4" />
        <polygon points="110,150 102,146 102,154" fill="#1d4ed8" /><text x={160} y={170} fontSize="7.2" fill="#1d4ed8">standard = right turns</text>
        <text x={10} y={196} fontSize="7.2" fill="#334155">Hold at or below the max IAS for the level so the pattern stays inside its protected airspace.</text>
      </svg>
    </Frame>
  );
}

// C.3.4 / C.3.6 — SID/STAR vertical profile with crossing restrictions.
export function VerticalProfile() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Crossing restrictions (vertical profile)</text>
        <line x1={30} y1={30} x2={30} y2={180} stroke="#cbd5e1" strokeWidth="1" />
        <line x1={30} y1={180} x2={380} y2={180} stroke="#cbd5e1" strokeWidth="1" />
        <text x={14} y={110} fontSize="8" fill="#334155" transform="rotate(-90 14 110)">altitude</text>
        {/* climb profile (SID) */}
        <path d="M30 180 L120 120 L220 80 L320 50" fill="none" stroke="#1d4ed8" strokeWidth="2.2" />
        {/* restriction gates */}
        <g fontSize="7.2">
          <line x1={120} y1={110} x2={120} y2={150} stroke="#15803d" strokeWidth="1.2" /><text x={124} y={140} fill="#15803d">cross at/ABOVE 4000</text>
          <line x1={220} y1={70} x2={220} y2={110} stroke="#b45309" strokeWidth="1.2" /><text x={160} y={70} fill="#b45309">cross at/BELOW FL100</text>
          <line x1={320} y1={40} x2={320} y2={70} stroke="#7c3aed" strokeWidth="1.2" /><text x={300} y={38} fill="#7c3aed">cross AT FL180</text>
          <line x1={270} y1={62} x2={270} y2={92} stroke="#0f172a" strokeWidth="1.2" strokeDasharray="3 2" /><text x={236} y={104} fill="#0f172a">window: 6000–FL100</text>
        </g>
        {/* gate markers */}
        {[[120,120,"#15803d"],[220,80,"#b45309"],[320,50,"#7c3aed"]].map(([x,y,c])=>(<circle key={String(x)} cx={x as number} cy={y as number} r={3.4} fill={c as string} />))}
        <text x={10} y={202} fontSize="7.4" fill="#334155">'Above' = minimum, 'below' = maximum, 'at' = mandatory, a window = both. Plan the climb/descent to satisfy every gate.</text>
      </svg>
    </Frame>
  );
}

// C.3.5 — PBN / RNP lateral containment (the ±accuracy corridor).
export function RNPContainment() {
  return (
    <Frame>
      <svg viewBox="0 0 400 200" className="w-full">
        <rect x={0} y={0} width={400} height={200} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">PBN / RNP lateral containment</text>
        {/* desired track */}
        <line x1={30} y1={100} x2={370} y2={100} stroke="#1d4ed8" strokeWidth="2" />
        <text x={300} y={96} fontSize="7.6" fill="#1d4ed8">desired track</text>
        {/* +/- 1x RNP corridor (95%) */}
        <line x1={30} y1={74} x2={370} y2={74} stroke="#15803d" strokeWidth="1.4" strokeDasharray="6 4" />
        <line x1={30} y1={126} x2={370} y2={126} stroke="#15803d" strokeWidth="1.4" strokeDasharray="6 4" />
        <rect x={30} y={74} width={340} height={52} fill="#bbf7d0" opacity={0.4} />
        {/* +/- 2x RNP containment */}
        <line x1={30} y1={52} x2={370} y2={52} stroke="#b45309" strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1={30} y1={148} x2={370} y2={148} stroke="#b45309" strokeWidth="1.2" strokeDasharray="3 3" />
        {/* aircraft wandering within 1x RNP */}
        <path d="M40 100 C110 88, 170 112, 240 96 C300 84, 340 108, 366 100" fill="none" stroke="#dc2626" strokeWidth="1.8" />
        {/* labels */}
        <text x={34} y={70} fontSize="7.2" fill="#15803d">± 1 × RNP — stay here 95% of the time</text>
        <text x={34} y={48} fontSize="7.2" fill="#b45309">± 2 × RNP — containment (alert if exceeded)</text>
        <text x={10} y={178} fontSize="7.4" fill="#334155">RNP 1 = ±1 NM, RNP APCH 0.3 = ±0.3 NM. An RNP system MONITORS its own accuracy and ALERTS the crew if it cannot keep it.</text>
        <text x={10} y={192} fontSize="7.4" fill="#334155">That on-board monitoring &amp; alerting is what separates RNP from plain RNAV.</text>
      </svg>
    </Frame>
  );
}

// C.5.8 — the stabilised-approach gate.
export function StabilisedApproach() {
  return (
    <Frame>
      <svg viewBox="0 0 400 210" className="w-full">
        <rect x={0} y={0} width={400} height={210} fill="#f8fafc" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Stabilised-approach gate</text>
        {/* ground + runway */}
        <rect x={0} y={180} width={400} height={30} fill="#94a3b8" />
        <rect x={320} y={176} width={70} height={6} fill="#334155" />
        {/* glide path */}
        <line x1={30} y1={60} x2={356} y2={178} stroke="#15803d" strokeWidth="2" />
        <text x={120} y={96} fontSize="8" transform="rotate(20 120 96)" fill="#15803d">glide path (≈3°)</text>
        {/* gates */}
        <line x1={120} y1={96} x2={120} y2={150} stroke="#1d4ed8" strokeWidth="1.4" strokeDasharray="4 3" />
        <circle cx={120} cy={96} r={4} fill="#1d4ed8" /><text x={92} y={146} fontSize="7.6" fill="#1d4ed8">1000 ft (IMC)</text>
        <line x1={200} y1={125} x2={200} y2={162} stroke="#7c3aed" strokeWidth="1.4" strokeDasharray="4 3" />
        <circle cx={200} cy={125} r={4} fill="#7c3aed" /><text x={176} y={158} fontSize="7.6" fill="#7c3aed">500 ft (VMC)</text>
        {/* go around if not stable */}
        <path d="M120 96 q-24 -26 -52 -18" fill="none" stroke="#dc2626" strokeWidth="1.6" strokeDasharray="5 4" markerEnd="url(#ga)" />
        <defs><marker id="ga" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" /></marker></defs>
        <text x={40} y={66} fontSize="7.6" fill="#dc2626">not stable → GO AROUND</text>
        {/* criteria card */}
        <rect x={236} y={36} width={150} height={82} rx={6} fill="#ffffff" stroke="#cbd5e1" />
        <text x={244} y={50} fontSize="7.8" fontWeight="bold" fill="#0f172a">Stable means:</text>
        <text x={244} y={64} fontSize="7.2" fill="#334155">• on the correct path &amp; track</text>
        <text x={244} y={76} fontSize="7.2" fill="#334155">• at approach speed (VREF range)</text>
        <text x={244} y={88} fontSize="7.2" fill="#334155">• in the landing configuration</text>
        <text x={244} y={100} fontSize="7.2" fill="#334155">• normal rate of descent/thrust</text>
        <text x={244} y={112} fontSize="7.2" fill="#334155">• checks/briefing complete</text>
      </svg>
    </Frame>
  );
}
