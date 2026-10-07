// Original "cheat-code" infographics for CPL Radio Navigation. In-house vector
// art (Q-code compass, ILS geometry, SSR pulse trains, GPS ranging) with soft
// gradient grounds and topical motifs — nothing reproduced from any textbook,
// SACAA chart or branded instrument. Same figure-frame contract as other sets.

import { SkyDuskScene, RadarScopeScene, SpaceScene, LabelChip, StormScene, SkyDayScene, MapGridScene } from "@/app/components/figures/figureScene";
import { PlaneSide, PlaneTop } from "@/app/components/figures/shapes";

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full overflow-hidden rounded-lg border border-zinc-800 bg-white">{children}</div>;
}

// A.10.2 — ADF Q-codes & the QDM formula.
export function ADFQCodes() {
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <defs>
          <radialGradient id="rn-adf-sky" cx="30%" cy="25%" r="95%">
            <stop offset="0%" stopColor="#f0fdfa" /><stop offset="100%" stopColor="#ccfbf1" />
          </radialGradient>
          <radialGradient id="rn-adf-dial" cx="40%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#134e4a" /><stop offset="100%" stopColor="#042f2e" />
          </radialGradient>
        </defs>
        <SkyDuskScene />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#0f172a">ADF / NDB — bearings &amp; Q-codes</text>
        {/* dial */}
        <circle cx={90} cy={116} r={72} fill="url(#rn-adf-dial)" />
        <circle cx={90} cy={116} r={72} fill="none" stroke="#5eead4" strokeWidth="1.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const r = (a - 90) * Math.PI / 180;
          return <line key={a} x1={90 + 60 * Math.cos(r)} y1={116 + 60 * Math.sin(r)} x2={90 + 72 * Math.cos(r)} y2={116 + 72 * Math.sin(r)} stroke="#5eead4" strokeWidth="1.4" />;
        })}
        <text x={90} y={58} fontSize="9" fill="#f0fdfa" textAnchor="middle">N</text>
        {/* aircraft nose + needle to station */}
        <path d="M90 116 l0 -46" stroke="#fbbf24" strokeWidth="3" />
        <path d="M90 70 l-4 8 l8 0 z" fill="#fbbf24" />
        <path d="M90 116 l34 -30" stroke="#f87171" strokeWidth="2.6" />
        <circle cx={124} cy={86} r={3.2} fill="#f87171" />
        <text x={128} y={82} fontSize="7.5" fill="#fca5a5">NDB</text>
        <text x={96} y={96} fontSize="7.5" fill="#fde68a">RB</text>
        {/* Q-code table */}
        <g>
          <rect x={182} y={34} width={148} height={92} rx={6} fill="#ffffff" stroke="#5eead4" />
          <text x={190} y={48} fontSize="8.5" fontWeight="bold" fill="#0f766e">QDM  mag bearing TO</text>
          <text x={190} y={63} fontSize="8.5" fontWeight="bold" fill="#0f766e">QDR  mag bearing FROM</text>
          <text x={190} y={78} fontSize="8.5" fontWeight="bold" fill="#0f766e">QTE  true bearing FROM</text>
          <text x={190} y={93} fontSize="8.5" fontWeight="bold" fill="#0f766e">QUJ  true bearing TO</text>
          <text x={190} y={112} fontSize="8" fill="#334155">QDL = request a series</text>
        </g>
        <rect x={182} y={134} width={148} height={40} rx={6} fill="#ecfeff" stroke="#22d3ee" />
        <text x={190} y={150} fontSize="9" fontWeight="bold" fill="#155e75">QDM = Heading(M) + RB</text>
        <text x={190} y={165} fontSize="8.5" fill="#0f172a">QDR = QDM ± 180  (−360 if &gt;360)</text>
        <text x={12} y={200} fontSize="8" fill="#334155">Loop finds direction · sense aerial kills the 180° ambiguity · both needed for a bearing.</text>
      </svg>
    </Frame>
  );
}

// A.10.3 — ILS geometry: localiser, glide path, markers, sectors.
export function ILSGeometry() {
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <defs>
          <linearGradient id="rn-ils-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eff6ff" /><stop offset="100%" stopColor="#dbeafe" />
          </linearGradient>
        </defs>
        <SkyDuskScene />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#0f172a">ILS geometry &amp; sectors</text>
        {/* runway */}
        <rect x={40} y={150} width={150} height={12} fill="#334155" />
        <line x1={54} y1={156} x2={190} y2={156} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="6 6" />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={42} y={151 + i * 3} width={8} height={1.6} fill="#e2e8f0" />)}
        {/* localiser sectors */}
        <polygon points="190,156 320,120 320,156" fill="#3b82f6" fillOpacity="0.18" />
        <polygon points="190,156 320,156 320,192" fill="#eab308" fillOpacity="0.20" />
        <LabelChip x={236} y={109} w={100} />
        <text x={332} y={118} fontSize="7.5" fill="#1d4ed8" textAnchor="end">150 Hz (blue) — right</text>
        <LabelChip x={238} y={181} w={98} />
        <text x={332} y={190} fontSize="7.5" fill="#a16207" textAnchor="end">90 Hz (yellow) — left</text>
        <circle cx={196} cy={156} r={4} fill="#1e3a8a" />
        <LabelChip x={44} y={130} w={168} />
        <text x={48} y={140} fontSize="7.5" fill="#1e3a8a">LOC ~300 m past upwind end (IDENT)</text>
        {/* glide path */}
        <line x1={54} y1={150} x2={300} y2={60} stroke="#ef4444" strokeWidth="2.4" />
        <text x={214} y={92} fontSize="8" fill="#b91c1c" transform="rotate(-20 214 92)">3° glide path</text>
        {/* aircraft descending toward the runway */}
        <PlaneSide x={252} y={82} s={1.05} rot={192} />
        {/* markers */}
        {[["OM", 96, "dashes"], ["MM", 140, "dot-dash"], ["IM", 176, "dots"]].map(([n, x]) => (
          <g key={String(n)}>
            <rect x={Number(x) - 8} y={168} width={16} height={8} rx={2} fill="#f59e0b" />
            <text x={Number(x)} y={186} fontSize="7" fill="#92400e" textAnchor="middle">{n}</text>
          </g>
        ))}
        {/* facts card */}
        <rect x={214} y={128} width={116} height={54} rx={6} fill="#ffffff" stroke="#93c5fd" />
        <text x={220} y={142} fontSize="7.6" fill="#1d4ed8" fontWeight="bold">Markers all on 75 MHz</text>
        <text x={220} y={154} fontSize="7.6" fill="#0f172a">GP full-scale ±0.7°</text>
        <text x={220} y={166} fontSize="7.6" fill="#0f172a">ROD ≈ GP × GS × 100/60</text>
        <text x={220} y={178} fontSize="7.6" fill="#0f172a">CAT I to 200 ft; false GP ≥6°</text>
      </svg>
    </Frame>
  );
}

// A.10.5 — SSR modes (pulse spacing) & squawk codes.
export function SSRModes() {
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <defs>
          <linearGradient id="rn-ssr-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#faf5ff" /><stop offset="100%" stopColor="#ede9fe" />
          </linearGradient>
        </defs>
        <RadarScopeScene />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#0f172a">SSR — modes, pulses &amp; squawks</text>
        {/* pulse trains */}
        {[["Mode A", 44, 30, "ident"], ["Mode B", 82, 52, "ident"], ["Mode C", 120, 66, "altitude"]].map(([n, y, gap, use]) => (
          <g key={String(n)}>
            <text x={14} y={Number(y) + 4} fontSize="8" fontWeight="bold" fill="#6d28d9">{n}</text>
            <line x1={70} y1={Number(y)} x2={230} y2={Number(y)} stroke="#c4b5fd" strokeWidth="1" />
            <rect x={72} y={Number(y) - 9} width={5} height={9} fill="#7c3aed" />
            <rect x={72 + Number(gap)} y={Number(y) - 9} width={5} height={9} fill="#7c3aed" />
            <text x={80} y={Number(y) - 12} fontSize="7" fill="#5b21b6">{String(gap === 30 ? "8" : gap === 52 ? "17" : "21")} µs</text>
            <text x={236} y={Number(y) + 3} fontSize="7.5" fill="#334155">{use}</text>
          </g>
        ))}
        <text x={14} y={92} fontSize="7.5" fill="#334155">P1 → P3 spacing selects the mode</text>
        {/* squawk card */}
        <rect x={14} y={132} width={150} height={62} rx={6} fill="#ffffff" stroke="#c4b5fd" />
        <text x={22} y={148} fontSize="9" fontWeight="bold" fill="#6d28d9">Emergency squawks</text>
        <text x={22} y={162} fontSize="8.5" fill="#b91c1c">7500 — hijack</text>
        <text x={22} y={175} fontSize="8.5" fill="#a16207">7600 — comms failure</text>
        <text x={22} y={188} fontSize="8.5" fill="#0f172a">7700 — emergency</text>
        {/* freq/facts card */}
        <rect x={176} y={132} width={154} height={62} rx={6} fill="#f5f3ff" stroke="#a78bfa" />
        <text x={184} y={148} fontSize="8.5" fill="#5b21b6" fontWeight="bold">Interrogate 1030 / reply 1090 MHz</text>
        <text x={184} y={162} fontSize="8" fill="#0f172a">Frame 20.3 µs · 4096 codes</text>
        <text x={184} y={175} fontSize="8" fill="#0f172a">P2 = side-lobe suppression</text>
        <text x={184} y={188} fontSize="8" fill="#0f172a">Mode S: selective, 24-bit, 25 ft</text>
      </svg>
    </Frame>
  );
}

// A.10.12 — GPS ranging & segments.
export function GPSFix() {
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <defs>
          <radialGradient id="rn-gps-space" cx="50%" cy="20%" r="100%">
            <stop offset="0%" stopColor="#0b1220" /><stop offset="100%" stopColor="#1e293b" />
          </radialGradient>
        </defs>
        <SpaceScene />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#e2e8f0">GNSS / GPS — ranging &amp; segments</text>
        {/* earth arc */}
        <path d="M0 200 Q170 150 340 200" fill="#1d4ed8" fillOpacity="0.35" />
        <circle cx={170} cy={196} r={4} fill="#22d3ee" />
        <text x={176} y={194} fontSize="7.5" fill="#67e8f9">receiver</text>
        {/* satellites + ranges */}
        {[[70, 58], [170, 42], [270, 60]].map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y + 8} x2={170} y2={196} stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
            {/* solar panels */}
            <rect x={x - 24} y={y - 4} width={14} height={9} fill="#1e3a8a" stroke="#93c5fd" strokeWidth="0.4" />
            <rect x={x + 10} y={y - 4} width={14} height={9} fill="#1e3a8a" stroke="#93c5fd" strokeWidth="0.4" />
            <line x1={x - 17} y1={y - 4} x2={x - 17} y2={y + 5} stroke="#93c5fd" strokeWidth="0.4" />
            <line x1={x + 17} y1={y - 4} x2={x + 17} y2={y + 5} stroke="#93c5fd" strokeWidth="0.4" />
            <line x1={x - 10} y1={y + 0.5} x2={x + 10} y2={y + 0.5} stroke="#cbd5e1" strokeWidth="1" />
            {/* body + dish */}
            <rect x={x - 6} y={y - 6} width={12} height={12} rx={1.5} fill="#facc15" stroke="#a16207" strokeWidth="0.6" />
            <circle cx={x} cy={y + 9} r={3} fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
          </g>
        ))}
        <text x={40} y={96} fontSize="7.5" fill="#93c5fd">3 ranges → 2D · 4th → clock bias (3D)</text>
        {/* cards */}
        <rect x={14} y={112} width={150} height={82} rx={6} fill="#0f172a" stroke="#334155" />
        <text x={22} y={128} fontSize="8.5" fontWeight="bold" fill="#7dd3fc">Constellation</text>
        <text x={22} y={142} fontSize="8" fill="#e2e8f0">24 sats · 6 planes · 55°</text>
        <text x={22} y={155} fontSize="8" fill="#e2e8f0">Civil C/A on L₁ 1575.42 MHz</text>
        <text x={22} y={168} fontSize="8" fill="#e2e8f0">RAIM needs a 5th satellite</text>
        <text x={22} y={181} fontSize="8" fill="#e2e8f0">GDOP worst = sats close</text>
        <rect x={176} y={112} width={154} height={82} rx={6} fill="#0f172a" stroke="#334155" />
        <text x={184} y={128} fontSize="8.5" fontWeight="bold" fill="#fca5a5">Errors</text>
        <text x={184} y={142} fontSize="8" fill="#e2e8f0">Ephemeris = wrong orbit</text>
        <text x={184} y={155} fontSize="8" fill="#e2e8f0">Ionospheric = signal delay</text>
        <text x={184} y={168} fontSize="8" fill="#e2e8f0">Multipath = airframe reflect</text>
        <text x={184} y={181} fontSize="8" fill="#e2e8f0">Doppler → groundspeed</text>
      </svg>
    </Frame>
  );
}

// A.10.4 — DME: secondary radar, 63 MHz offset, slant range.
export function DMEPrinciple() {
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <SkyDuskScene />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#0f172a">DME — distance measuring equipment</text>
        {/* aircraft + ground station + slant triangle */}
        <PlaneSide x={258} y={60} s={1.15} rot={-6} />
        <rect x={60} y={150} width={14} height={18} fill="#334155" /><rect x={64} y={138} width={6} height={14} fill="#334155" />
        <text x={48} y={182} fontSize="7.5" fill="#334155">DME station</text>
        <line x1={70} y1={138} x2={258} y2={66} stroke="#dc2626" strokeWidth="2" /><text x={150} y={92} fontSize="7.5" fill="#dc2626" transform="rotate(-20 150 92)">slant range</text>
        <line x1={70} y1={150} x2={258} y2={150} stroke="#64748b" strokeWidth="1" strokeDasharray="4 3" /><text x={150} y={162} fontSize="7" fill="#64748b">ground range</text>
        <line x1={258} y1={66} x2={258} y2={150} stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" /><text x={262} y={112} fontSize="7" fill="#64748b">height</text>
        {/* interrogation/reply */}
        <text x={100} y={112} fontSize="7" fill="#1d4ed8">interrogate →</text>
        <text x={110} y={124} fontSize="7" fill="#16a34a">← reply (+63 MHz)</text>
        {/* facts */}
        <rect x={12} y={170} width={316} height={34} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={18} y={183} fontSize="7.6" fill="#0f172a">UHF 962–1213 MHz · reply differs by 63 MHz · fixed 50 µs delay · random PRF (jitter)</text>
        <text x={18} y={195} fontSize="7.6" fill="#0f172a">R = 0.162×(T−50)/2 NM · reads SLANT range (error worst high &amp; close) · saturates &gt;100 a/c</text>
      </svg>
    </Frame>
  );
}

// A.10.6 — Weather radar: beams, colour scale, contour.
export function WeatherRadarModes() {
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <StormScene />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#0f172a">Airborne weather radar</text>
        {/* pencil vs cosecant beam */}
        <g transform="translate(20,60)">
          <path d="M0 20 L70 8 L70 32 Z" fill="#22d3ee" opacity={0.5} /><text x={0} y={52} fontSize="7.5" fill="#0e7490" fontWeight="bold">pencil (WEA)</text>
          <path d="M0 90 L70 66 L70 96 L60 110 Z" fill="#a78bfa" opacity={0.5} /><text x={0} y={126} fontSize="7.5" fill="#6d28d9" fontWeight="bold">cosecant (MAP ≤60 NM)</text>
        </g>
        {/* colour intensity scale */}
        {[["#16a34a", "light", 0], ["#eab308", "moderate", 1], ["#dc2626", "heavy", 2], ["#d946ef", "severe", 3]].map(([c, t, i]) => (
          <g key={i as number}><rect x={150} y={44 + (i as number) * 22} width={20} height={16} rx={2} fill={c as string} /><text x={176} y={56 + (i as number) * 22} fontSize="8" fill="#0f172a">{t}</text></g>
        ))}
        <text x={150} y={40} fontSize="7.5" fontWeight="bold" fill="#0f172a">Colour = intensity/turbulence</text>
        {/* facts */}
        <rect x={12} y={150} width={316} height={54} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={18} y={163} fontSize="7.6" fill="#0f172a">SHF ~9375 MHz (3 cm): short λ reflects large water drops. Pencil beam = best resolution.</text>
        <text x={18} y={175} fontSize="7.6" fill="#0f172a">Gyro-stabilised in pitch &amp; roll · tilt ±15° · STC evens near/far returns.</text>
        <text x={18} y={187} fontSize="7.6" fill="#0f172a">Iso-echo / CONTOUR blanks strongest cores to black = worst turbulence.</text>
        <text x={18} y={199} fontSize="7.6" fill="#b91c1c">Never radiate on the ground near people/buildings.</text>
      </svg>
    </Frame>
  );
}

// A.10.9 — Radio altimeter: FM-CW sweep.
export function RadioAltimeter() {
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <SkyDayScene />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#0f172a">Radio altimeter — FM-CW</text>
        {/* frequency-time sawtooth (transmit vs echo, offset in time) */}
        <line x1={40} y1={40} x2={40} y2={130} stroke="#94a3b8" /><line x1={40} y1={130} x2={200} y2={130} stroke="#94a3b8" />
        <text x={16} y={54} fontSize="7" fill="#64748b">freq</text><text x={168} y={142} fontSize="7" fill="#64748b">time →</text>
        <polyline points="40,120 80,50 80,120 120,50 120,120 160,50 160,120 200,50" fill="none" stroke="#1d4ed8" strokeWidth="1.8" />
        <polyline points="52,120 92,50 92,120 132,50 132,120 172,50" fill="none" stroke="#dc2626" strokeWidth="1.6" strokeDasharray="4 3" />
        <text x={120} y={46} fontSize="7" fill="#1d4ed8">tx</text><text x={140} y={128} fontSize="7" fill="#dc2626">echo (delayed)</text>
        <text x={44} y={150} fontSize="7.5" fill="#334155">Δf between tx &amp; echo ∝ height</text>
        {/* facts */}
        <rect x={214} y={30} width={116} height={104} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={220} y={44} fontSize="8" fontWeight="bold" fill="#0f172a">Key values</text>
        <text x={220} y={58} fontSize="7.4" fill="#0f172a">SHF 4200–4400 MHz</text>
        <text x={220} y={70} fontSize="7.4" fill="#0f172a">FM sweep ±50 MHz</text>
        <text x={220} y={82} fontSize="7.4" fill="#0f172a">Range 0–2500 ft AGL</text>
        <text x={220} y={94} fontSize="7.4" fill="#0f172a">Reads lowest wheels → gnd</text>
        <text x={220} y={106} fontSize="7.4" fill="#0f172a">±3 ft/3% (&lt;500), ±5% above</text>
        <text x={220} y={118} fontSize="7.4" fill="#0f172a">Feeds GPWS / autoland</text>
        <text x={220} y={130} fontSize="7" fill="#64748b">Pointer masks above 2500 ft</text>
        <text x={12} y={196} fontSize="7.6" fill="#334155">Height from FREQUENCY change (not pulse timing). Mushing (antennas far) vs leakage (too close).</text>
      </svg>
    </Frame>
  );
}

// A.10.10 — ELT frequencies & rules.
export function ELTCard() {
  return (
    <Frame>
      <svg viewBox="0 0 340 190" className="w-full">
        <SkyDuskScene h={190} />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#0f172a">Emergency Locator Transmitter (ELT)</text>
        <rect x={12} y={28} width={158} height={64} rx={5} fill="#ffffff" opacity={0.95} stroke="#cbd5e1" />
        <text x={20} y={42} fontSize="8.5" fontWeight="bold" fill="#b91c1c">Analogue</text>
        <text x={20} y={56} fontSize="8" fill="#0f172a">121.5 MHz &amp; 243 MHz</text>
        <text x={20} y={69} fontSize="7.3" fill="#334155">emission A3X · homing beacon</text>
        <text x={20} y={83} fontSize="7.3" fill="#334155">audio downsweep 1600→300 Hz</text>
        <rect x={176} y={28} width={152} height={64} rx={5} fill="#ffffff" opacity={0.95} stroke="#cbd5e1" />
        <text x={184} y={42} fontSize="8.5" fontWeight="bold" fill="#166534">Digital / EPIRB</text>
        <text x={184} y={56} fontSize="8" fill="#0f172a">406 MHz</text>
        <text x={184} y={69} fontSize="7.3" fill="#334155">satellite-detected, carries</text>
        <text x={184} y={81} fontSize="7.3" fill="#334155">aircraft/owner ID</text>
        {/* downsweep motif */}
        <path d="M20 118 Q60 108 100 128 Q140 148 180 128 Q220 108 260 128" fill="none" stroke="#0e7490" strokeWidth="1.4" opacity={0.6} />
        <rect x={12} y={150} width={316} height={34} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={18} y={163} fontSize="7.6" fill="#0f172a">Armed by 5 G impact · ~87 NM LOS from 10 000 ft · 50 h · mounted in the tail.</text>
        <text x={18} y={175} fontSize="7.6" fill="#0f172a">Analogue tested every 3 months, in the FIRST 5 min of the hour, a few pulses only.</text>
      </svg>
    </Frame>
  );
}

// A.10.11 — RNAV waypoint (Rho-Theta).
export function RNAVWaypoint() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <MapGridScene h={200} />
        <text x={12} y={18} fontSize="11" fontWeight="bold" fill="#0f172a">Area navigation (RNAV) — Rho-Theta</text>
        {/* triangle VOR/DME - aircraft - waypoint */}
        <circle cx={90} cy={60} r={5} fill="none" stroke="#1d4ed8" strokeWidth="1.5" /><circle cx={90} cy={60} r={2} fill="#1d4ed8" />
        <text x={64} y={52} fontSize="7.5" fill="#1d4ed8">VOR/DME</text>
        <PlaneTop x={64} y={150} s={0.8} rot={78} />
        <text x={40} y={168} fontSize="7.5" fill="#334155">aircraft</text>
        <polygon points="250,120 258,110 266,120 258,130" fill="#16a34a" /><text x={240} y={106} fontSize="7.5" fill="#166534">waypoint (phantom)</text>
        <line x1={90} y1={64} x2={66} y2={148} stroke="#64748b" strokeWidth="1.2" /><text x={68} y={108} fontSize="7" fill="#64748b">DME (Rho)</text>
        <line x1={90} y1={64} x2={250} y2={120} stroke="#64748b" strokeWidth="1.2" /><text x={150} y={84} fontSize="7" fill="#64748b">radial (Theta)</text>
        <line x1={66} y1={148} x2={250} y2={120} stroke="#15803d" strokeWidth="2" /><text x={140} y={150} fontSize="7.5" fill="#15803d">track/dist to WPT</text>
        {/* facts */}
        <rect x={12} y={170} width={316} height={26} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={18} y={182} fontSize="7.6" fill="#0f172a">CLC solves the triangle from DME range + VOR bearing. CDI reads NM (not degrees).</text>
        <text x={18} y={192} fontSize="7.6" fill="#0f172a">B-RNAV ±5 NM · P-RNAV ±1 NM (95%) · approach full-scale 1.25 NM, within 25 NM.</text>
      </svg>
    </Frame>
  );
}
