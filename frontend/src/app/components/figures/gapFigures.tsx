// Gap-filling figures & memory tables so every subject has syllabus-aligned
// illustrations. Original vector art; accurate to standard theory. Tables reuse
// the shared Table renderer over subtle topical scenes.

import { CockpitScene, SkyDayScene, MapGridScene, RadioWaveScene, SkyDuskScene } from "@/app/components/figures/figureScene";
import { Table } from "@/app/components/figures/referenceFigures";
import { Airfoil, PlaneTop } from "@/app/components/figures/shapes";

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full overflow-hidden rounded-lg border border-zinc-800 bg-white">{children}</div>;
}

/* ── A.7.1.d — Vertical Speed Indicator (VSI / IVSI) ──────────────────────── */
export function VSIFigure() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <CockpitScene h={200} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Vertical Speed Indicator (VSI)</text>
        {/* dial */}
        <circle cx={78} cy={104} r={62} fill="#0f172a" /><circle cx={78} cy={104} r={58} fill="#0b1220" />
        {[-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2].map((v, i) => {
          const deg = 180 + v * 65; const rad = (deg - 90) * Math.PI / 180;
          const [x1, y1] = [78 + 54 * Math.cos(rad), 104 + 54 * Math.sin(rad)];
          const [x2, y2] = [78 + 48 * Math.cos(rad), 104 + 48 * Math.sin(rad)];
          const [lx, ly] = [78 + 40 * Math.cos(rad), 104 + 40 * Math.sin(rad)];
          return <g key={i}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e2e8f0" strokeWidth={1} /><text x={lx} y={ly + 3} fontSize="6.5" fill="#e2e8f0" textAnchor="middle">{Math.abs(v)}</text></g>;
        })}
        <line x1={78} y1={104} x2={30} y2={90} stroke="#f8fafc" strokeWidth={2.4} /><circle cx={78} cy={104} r={3.5} fill="#e2e8f0" />
        <text x={78} y={150} fontSize="6.5" fill="#94a3b8" textAnchor="middle">×1000 ft/min</text>
        {/* how it works */}
        <rect x={164} y={26} width={168} height={70} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={170} y={39} fontSize="8" fontWeight="bold" fill="#0f172a">How it works</text>
        <text x={170} y={52} fontSize="7.3" fill="#334155">Static feeds a capsule + a metered</text>
        <text x={170} y={62} fontSize="7.3" fill="#334155">leak to the case. In a climb the case</text>
        <text x={170} y={72} fontSize="7.3" fill="#334155">lags → pressure difference = rate.</text>
        <text x={170} y={85} fontSize="7.3" fill="#b45309">Inherent lag ~6–9 s (aneroid VSI).</text>
        <rect x={164} y={102} width={168} height={54} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={170} y={115} fontSize="8" fontWeight="bold" fill="#166534">IVSI</text>
        <text x={170} y={127} fontSize="7.3" fill="#334155">Accelerometer pump cancels the lag →</text>
        <text x={170} y={137} fontSize="7.3" fill="#334155">instantaneous indication.</text>
        <text x={170} y={150} fontSize="7.3" fill="#b91c1c">Blocked static → VSI reads ZERO.</text>
        <text x={10} y={190} fontSize="7.4" fill="#64748b">Only instrument that reads a RATE. Lags until the static pressure rate stabilises.</text>
      </svg>
    </Frame>
  );
}

/* ── A.7.2.e — Turn coordinator & rate of turn ────────────────────────────── */
export function TurnRateFigure() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <CockpitScene h={200} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Turn coordinator &amp; rate of turn</text>
        {/* mini aircraft symbol banked */}
        <circle cx={72} cy={92} r={54} fill="#0f172a" /><circle cx={72} cy={92} r={50} fill="#0b1220" />
        <g transform="rotate(-18 72 92)" stroke="#f8fafc" strokeWidth={3} fill="none"><line x1={40} y1={92} x2={104} y2={92} /><circle cx={72} cy={92} r={4} fill="#f8fafc" /></g>
        <text x={40} y={60} fontSize="6.5" fill="#e2e8f0">L</text><text x={100} y={60} fontSize="6.5" fill="#e2e8f0">R</text>
        {/* slip ball */}
        <rect x={54} y={130} width={36} height={10} rx={5} fill="#1e293b" stroke="#64748b" /><circle cx={72} cy={135} r={4} fill="#e2e8f0" />
        <text x={72} y={152} fontSize="6.5" fill="#94a3b8" textAnchor="middle">balance ball</text>
        {/* facts */}
        <rect x={150} y={24} width={182} height={72} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={156} y={37} fontSize="8" fontWeight="bold" fill="#0f172a">Rate of turn</text>
        <text x={156} y={50} fontSize="7.4" fill="#334155">Rate 1 = 3°/sec → 360° in 2 min</text>
        <text x={156} y={62} fontSize="7.4" fill="#334155">Rate 2 = 6°/sec → 360° in 1 min</text>
        <text x={156} y={75} fontSize="7.4" fill="#0f172a">Bank for rate 1 ≈ (TAS ÷ 10) + 7</text>
        <text x={156} y={87} fontSize="7.4" fill="#334155">Radius ∝ TAS² ; faster → wider turn</text>
        <rect x={150} y={102} width={182} height={54} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={156} y={115} fontSize="8" fontWeight="bold" fill="#b45309">Ball = balance</text>
        <text x={156} y={127} fontSize="7.4" fill="#334155">Ball out = slip/skid → 'step on the ball'.</text>
        <text x={156} y={139} fontSize="7.4" fill="#334155">Turn needle = RATE; AH = attitude.</text>
        <text x={156} y={151} fontSize="7.4" fill="#334155">Turn coordinator senses roll AND yaw.</text>
        <text x={10} y={190} fontSize="7.4" fill="#64748b">Rate gyro, 1 dof, spring-restrained; precession ∝ rate of turn.</text>
      </svg>
    </Frame>
  );
}

/* ── A.7.5 — Air temperature: SAT / RAT / TAT & ram rise ──────────────────── */
export function TemperatureFigure() {
  const rows = [
    ["SAT / OAT", "Static (true) air temp — undisturbed air", "the real ambient"],
    ["RAT", "Ram Air Temp — sensed, includes some ram rise", "measured value"],
    ["TAT", "Total Air Temp — SAT + full ram rise (adiabatic)", "SAT + ram rise"],
    ["Ram rise", "≈ (TAS/100)² °C  (rises with speed²)", "heats the probe"],
    ["Recovery factor", "fraction of ram rise the probe actually senses", "≈ 0.8 typical"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 158" className="w-full">
        <SkyDayScene h={158} />
        <Table x={10} y={6} w={320} cols={["Term", "Meaning", "Value"]} colX={[6, 92, 228]} rows={rows} title="Air temperature — SAT / RAT / TAT" />
        <text x={12} y={152} fontSize="6.9" fill="#475569">TAT = SAT + ram rise. Corrected OAT is needed for TAS and true altitude.</text>
      </svg>
    </Frame>
  );
}

/* ── A.7.9 — Powerplant & system monitoring instruments ───────────────────── */
export function EngineInstruments() {
  const rows = [
    ["RPM / N1 N2", "Tacho — mechanical or tacho-generator", "%/rpm"],
    ["MAP", "Manifold pressure — set power with RPM", "inHg"],
    ["EGT / CHT", "Exhaust / cyl-head temp — mixture", "°C"],
    ["Oil P / T", "Bourdon / bimetallic — lubrication", "psi/°C"],
    ["Fuel qty / flow", "Capacitance / float; flow = burn", "L, GPH"],
    ["Torque", "Turboprop power output", "%, ft-lb"],
    ["Chip detector", "Magnetic plug — metal = wear", "warn"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 158" className="w-full">
        <CockpitScene h={158} />
        <Table x={10} y={6} w={320} cols={["Instrument", "What it senses", "Unit"]} colX={[6, 92, 278]} rows={rows} title="Engine & system monitoring" />
      </svg>
    </Frame>
  );
}

/* ── A.9.2 — North references, variation & deviation ──────────────────────── */
export function NorthVariation() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <MapGridScene h={200} />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">North references — T / M / C</text>
        {/* three north arrows fanning from a point */}
        <g transform="translate(96,120)">
          <line x1={0} y1={0} x2={0} y2={-80} stroke="#0f172a" strokeWidth={2} /><text x={-4} y={-84} fontSize="8" fill="#0f172a" textAnchor="end">TN</text>
          <line x1={0} y1={0} x2={22} y2={-77} stroke="#dc2626" strokeWidth={2} /><text x={26} y={-78} fontSize="8" fill="#dc2626">MN</text>
          <line x1={0} y1={0} x2={34} y2={-73} stroke="#1d4ed8" strokeWidth={2} /><text x={38} y={-70} fontSize="8" fill="#1d4ed8">CN</text>
          <path d="M0 -50 A50 50 0 0 1 15 -47" fill="none" stroke="#dc2626" strokeWidth={1} /><text x={8} y={-40} fontSize="6.5" fill="#dc2626">var</text>
          <path d="M15 -47 A50 50 0 0 1 24 -43" fill="none" stroke="#1d4ed8" strokeWidth={1} /><text x={26} y={-36} fontSize="6.5" fill="#1d4ed8">dev</text>
        </g>
        {/* rules */}
        <rect x={168} y={26} width={164} height={130} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={174} y={40} fontSize="8" fontWeight="bold" fill="#0f172a">Applying corrections</text>
        <text x={174} y={54} fontSize="7.4" fill="#334155">True ± Variation = Magnetic</text>
        <text x={174} y={66} fontSize="7.4" fill="#334155">Magnetic ± Deviation = Compass</text>
        <text x={174} y={82} fontSize="7.4" fontWeight="bold" fill="#b45309">Variation West → Magnetic BEST</text>
        <text x={174} y={94} fontSize="7.4" fontWeight="bold" fill="#b45309">Variation East → Magnetic LEAST</text>
        <text x={174} y={110} fontSize="7.4" fill="#334155">Isogonals = lines of equal variation.</text>
        <text x={174} y={122} fontSize="7.4" fill="#334155">Agonic = zero variation.</text>
        <text x={174} y={138} fontSize="7.4" fill="#334155">Deviation from aircraft magnetism;</text>
        <text x={174} y={150} fontSize="7.4" fill="#334155">removed by a compass swing.</text>
        <text x={10} y={190} fontSize="7.4" fill="#64748b">Radio bearings: QTE/QDR true &amp; magnetic FROM · QUJ/QDM to the station.</text>
      </svg>
    </Frame>
  );
}

/* ── A.9.3 — Distance units & conversions (memory table) ──────────────────── */
export function DistanceConversions() {
  const rows = [
    ["1 NM", "1.852 km · 6080 ft · 1.15 SM", "= 1′ of latitude"],
    ["1 SM", "1.609 km · 5280 ft · 0.87 NM", "statute mile"],
    ["1 km", "0.54 NM · 3280 ft · 0.62 SM", "—"],
    ["1° latitude", "60 NM", "along a meridian"],
    ["1° longitude", "60 NM × cos(lat)", "shrinks toward poles"],
    ["1 m", "3.28 ft", "—"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 158" className="w-full">
        <MapGridScene h={158} />
        <Table x={10} y={6} w={320} cols={["Unit", "Equals", "Note"]} colX={[6, 72, 214]} rows={rows} title="Distance units &amp; conversions" />
        <text x={12} y={152} fontSize="6.9" fill="#475569">Departure (E-W distance) = ch.long(min) × cos(mean latitude) NM.</text>
      </svg>
    </Frame>
  );
}

/* ── A.9.4 — Time: arc-to-time & day types ────────────────────────────────── */
export function TimeConversions() {
  const rows = [
    ["360°", "24 hours", "1 full rotation"],
    ["15°", "1 hour", "15° per hour"],
    ["1°", "4 minutes", "arc → time"],
    ["15′ arc", "1 minute", "—"],
    ["1′ arc", "4 seconds", "—"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 176" className="w-full">
        <SkyDayScene h={176} />
        <Table x={10} y={6} w={196} cols={["Arc", "Time", "Note"]} colX={[6, 60, 120]} rows={rows} title="Arc-to-time conversion" />
        <rect x={214} y={22} width={118} height={112} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={220} y={36} fontSize="8" fontWeight="bold" fill="#0f172a">Time facts</text>
        <text x={220} y={49} fontSize="7.2" fill="#334155">LMT = UTC ± (long ÷ 15°)</text>
        <text x={220} y={61} fontSize="7.2" fill="#334155">East longitude → time AHEAD</text>
        <text x={220} y={73} fontSize="7.2" fill="#334155">Sidereal day &lt; solar day (~4 min)</text>
        <text x={220} y={85} fontSize="7.2" fill="#334155">Civil twilight: sun 6° below horizon</text>
        <text x={220} y={97} fontSize="7.2" fill="#334155">Equinox ~21 Mar / 23 Sep</text>
        <text x={220} y={109} fontSize="7.2" fill="#334155">Solstice ~21 Jun / 22 Dec</text>
        <text x={220} y={121} fontSize="7.2" fill="#334155">Date line ≈ 180° meridian</text>
        <text x={12} y={168} fontSize="6.9" fill="#475569">SA is UTC+2 (no DST). Convert arc to time before adding/subtracting longitude.</text>
      </svg>
    </Frame>
  );
}

/* ── GR6 — Wake turbulence separation ─────────────────────────────────────── */
export function WakeTurbulence() {
  const rows = [
    ["Super behind —", "—", "—"],
    ["Heavy / Heavy", "wingtip vortices sink & spread", "4 NM"],
    ["Medium / Heavy", "worst: light behind heavy, slow, clean", "5 NM"],
    ["Light / Heavy", "greatest hazard", "6 NM"],
    ["Light / Medium", "—", "5 NM"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 190" className="w-full">
        <SkyDayScene h={190} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Wake turbulence</text>
        {/* vortices behind aircraft */}
        <PlaneTop x={48} y={56} s={1.1} rot={90} />
        <g stroke="#0ea5e9" fill="none" strokeWidth={1.2} opacity={0.6}>
          <path d="M70 50 q20 -8 40 0 q20 8 40 0" /><path d="M70 62 q20 8 40 0 q20 -8 40 0" />
        </g>
        <text x={150} y={54} fontSize="7" fill="#0369a1">counter-rotating tip vortices (sink ~500–1000 ft, spread out)</text>
        <Table x={10} y={78} w={320} cols={["Behind / ahead", "Note", "Radar sep"]} colX={[6, 108, 250]} rows={rows.slice(1)} />
        <text x={12} y={182} fontSize="6.9" fill="#475569">Strongest: HEAVY, CLEAN, SLOW. Avoid by staying above/upwind; rotate before &amp; land beyond its point.</text>
      </svg>
    </Frame>
  );
}

/* ── GR7 — Flight plans & Search and Rescue ───────────────────────────────── */
export function FlightPlanSAR() {
  return (
    <Frame>
      <svg viewBox="0 0 340 190" className="w-full">
        <SkyDuskScene h={190} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Flight plans &amp; SAR phases</text>
        <rect x={10} y={24} width={320} height={54} rx={5} fill="#ffffff" opacity={0.95} stroke="#cbd5e1" />
        <text x={16} y={37} fontSize="8" fontWeight="bold" fill="#0f172a">Flight plan</text>
        <text x={16} y={50} fontSize="7.3" fill="#334155">File ≥ 60 min before departure (or as required). Include alternate &amp; endurance.</text>
        <text x={16} y={62} fontSize="7.3" fill="#334155">CLOSE it on arrival — an unclosed plan triggers SAR.</text>
        <text x={16} y={74} fontSize="7.3" fill="#b91c1c">Report airborne, and any change &gt; specified time/level/route.</text>
        {/* SAR phases */}
        {[["INCERFA", "Uncertainty — no contact / overdue < 30 min", "#eab308"],
          ["ALERFA", "Alert — grave concern, apprehension", "#f97316"],
          ["DETRESFA", "Distress — SAR launched", "#dc2626"]].map(([n, d, c], i) => (
          <g key={i}>
            <rect x={10} y={86 + i * 26} width={320} height={22} rx={4} fill="#ffffff" opacity={0.95} stroke={c as string} />
            <rect x={10} y={86 + i * 26} width={70} height={22} rx={4} fill={c as string} opacity={0.85} />
            <text x={45} y={100 + i * 26} fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">{n}</text>
            <text x={88} y={100 + i * 26} fontSize="7.4" fill="#0f172a">{d}</text>
          </g>
        ))}
        <text x={12} y={182} fontSize="6.9" fill="#475569">Phases escalate as the overdue time grows. 121.5 MHz is the SAR / distress frequency.</text>
      </svg>
    </Frame>
  );
}

/* ── GR8 — Emergency & urgency phraseology ────────────────────────────────── */
export function EmergencyPhraseology() {
  return (
    <Frame>
      <svg viewBox="0 0 340 180" className="w-full">
        <RadioWaveScene h={180} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Emergency &amp; urgency calls</text>
        <rect x={10} y={24} width={320} height={44} rx={5} fill="#fff1f2" opacity={0.96} stroke="#fecaca" />
        <text x={16} y={38} fontSize="9" fontWeight="bold" fill="#b91c1c">MAYDAY ×3 — DISTRESS</text>
        <text x={16} y={51} fontSize="7.4" fill="#0f172a">Grave &amp; imminent danger, immediate assistance. On 121.5 or current frequency.</text>
        <text x={16} y={63} fontSize="7.4" fill="#334155">M-I-P-D-A-N-G-O: Mayday·ID·Position·Problem·Alt·Nature·Souls·Intentions.</text>
        <rect x={10} y={74} width={320} height={40} rx={5} fill="#fffbeb" opacity={0.96} stroke="#fde68a" />
        <text x={16} y={88} fontSize="9" fontWeight="bold" fill="#b45309">PAN PAN ×3 — URGENCY</text>
        <text x={16} y={101} fontSize="7.4" fill="#0f172a">Urgent, concerning safety, but no immediate danger.</text>
        <text x={16} y={112} fontSize="7.4" fill="#334155">e.g. unsure of position, sick passenger, minor tech problem.</text>
        <rect x={10} y={120} width={320} height={38} rx={5} fill="#ffffff" opacity={0.95} stroke="#cbd5e1" />
        <text x={16} y={133} fontSize="7.6" fontWeight="bold" fill="#0f172a">Cancel: "…distress/urgency traffic ended."</text>
        <text x={16} y={145} fontSize="7.3" fill="#334155">Imposing silence: "STOP TRANSMITTING — MAYDAY."  Squawk 7700.</text>
        <text x={16} y={155} fontSize="7.3" fill="#334155">MEDICAL = PAN PAN MEDICAL ×3 (medical urgency).</text>
      </svg>
    </Frame>
  );
}

/* ── A.8 — Meteorology key numbers (memory table) ─────────────────────────── */
export function MetKeyNumbers() {
  const rows = [
    ["ISA MSL", "15°C · 1013.25 hPa · 1.225 kg/m³", "sea level"],
    ["ISA lapse", "1.98°C / 1000 ft (≈2°) to tropopause", "temperature"],
    ["Tropopause", "36 090 ft · −56.5°C (mid-lat)", "isothermal above"],
    ["Pressure lapse", "≈ 1 hPa / 30 ft (near MSL)", "27 ft/hPa at alt"],
    ["DALR / SALR", "3.0°C / ~1.5°C per 1000 ft", "dry / saturated"],
    ["Dew-point rule", "cloud base ft = (T−Dp)/2.5 × 1000", "spread"],
    ["Buys Ballot (S.Hem)", "back to wind → LOW on your RIGHT", "gradient wind"],
    ["Wind backs/veers", "backs = anticlockwise; veers = clockwise", "direction change"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 176" className="w-full">
        <SkyDayScene h={176} />
        <Table x={10} y={6} w={320} cols={["Item", "Value", "Note"]} colX={[6, 108, 250]} rows={rows} title="Meteorology — numbers to memorise" />
      </svg>
    </Frame>
  );
}

/* ── A.7.3 — EFIS / Flight director (PFD & ND) ────────────────────────────── */
export function EFISFlightDirector() {
  return (
    <Frame>
      <svg viewBox="0 0 340 190" className="w-full">
        <CockpitScene h={190} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">EFIS — PFD, ND &amp; flight director</text>
        {/* PFD attitude */}
        <rect x={12} y={24} width={110} height={90} rx={4} fill="#0b1220" stroke="#334155" />
        <rect x={14} y={26} width={106} height={42} fill="#2563eb" /><rect x={14} y={68} width={106} height={44} fill="#7c4a12" />
        <line x1={14} y1={68} x2={120} y2={68} stroke="#e2e8f0" strokeWidth={1} />
        {/* flight director bars (magenta) */}
        <line x1={40} y1={70} x2={94} y2={70} stroke="#d946ef" strokeWidth={2} /><line x1={67} y1={58} x2={67} y2={82} stroke="#d946ef" strokeWidth={2} />
        <text x={67} y={124} fontSize="7.5" fill="#0f172a" textAnchor="middle">PFD (attitude)</text>
        {/* ND */}
        <rect x={132} y={24} width="90" height={90} rx={4} fill="#0b1220" stroke="#334155" />
        <circle cx={177} cy={78} r={30} fill="none" stroke="#22c55e" strokeWidth={1} />
        <polygon points="177,52 173,64 181,64" fill="#e2e8f0" /><text x={177} y={124} fontSize="7.5" fill="#0f172a" textAnchor="middle">ND (map/track)</text>
        {/* colour key */}
        <rect x={230} y={24} width={102} height={130} rx={4} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={236} y={37} fontSize="8" fontWeight="bold" fill="#0f172a">EFIS colours</text>
        {[["#d946ef", "FD bars / active mode"], ["#22c55e", "engaged / normal"], ["#eab308", "cautions"], ["#dc2626", "warnings / limits"], ["#ffffff", "current data"], ["#06b6d4", "sky / selected"]].map(([c, t], i) => (
          <g key={i}><rect x={236} y={45 + i * 15} width={9} height={9} fill={c as string} stroke="#94a3b8" strokeWidth={0.4} /><text x={250} y={53 + i * 15} fontSize="6.9" fill="#334155">{t}</text></g>
        ))}
        <text x={10} y={144} fontSize="7.4" fill="#334155">Flight director computes commands (magenta bars); autopilot flies to them. ADI = attitude, HSI = nav.</text>
        <text x={10} y={168} fontSize="7.4" fill="#64748b">PFD replaces the six-pack; ND shows map, weather, traffic. Data from ADC + AHRS + FMS.</text>
      </svg>
    </Frame>
  );
}

/* ── A.7.6 — Autopilot axes & modes ───────────────────────────────────────── */
export function AutopilotModes() {
  return (
    <Frame>
      <svg viewBox="0 0 340 176" className="w-full">
        <CockpitScene h={176} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Autopilot — axes &amp; modes</text>
        {/* aircraft with 3 axes */}
        <g transform="translate(70,80)">
          <ellipse cx={0} cy={0} rx={40} ry={7} fill="#0f172a" /><rect x={-3} y={-26} width={6} height={26} fill="#0f172a" /><polygon points="0,-26 -10,-14 10,-14" fill="#0f172a" />
          <line x1={-50} y1={0} x2={50} y2={0} stroke="#dc2626" strokeWidth={1.2} strokeDasharray="3 2" /><text x={52} y={2} fontSize="6.5" fill="#dc2626">roll</text>
          <line x1={0} y1={-34} x2={0} y2={30} stroke="#16a34a" strokeWidth={1.2} strokeDasharray="3 2" /><text x={2} y={40} fontSize="6.5" fill="#16a34a">yaw</text>
          <line x1={-30} y1={-18} x2={30} y2={18} stroke="#1d4ed8" strokeWidth={1.2} strokeDasharray="3 2" /><text x={32} y={20} fontSize="6.5" fill="#1d4ed8">pitch</text>
        </g>
        <text x={70} y={134} fontSize="7" fill="#334155" textAnchor="middle">1/2/3-axis autopilots</text>
        <rect x={150} y={24} width={182} height={64} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={156} y={37} fontSize="8" fontWeight="bold" fill="#dc2626">Lateral (roll) modes</text>
        <text x={156} y={50} fontSize="7.3" fill="#334155">HDG · NAV (VOR/GPS) · LOC · APR</text>
        <text x={156} y={62} fontSize="7.3" fill="#334155">Wing-leveller is the simplest (1-axis).</text>
        <text x={156} y={78} fontSize="7.3" fill="#334155">Holds/tracks a heading or course.</text>
        <rect x={150} y={94} width={182} height={62} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={156} y={107} fontSize="8" fontWeight="bold" fill="#1d4ed8">Vertical (pitch) modes</text>
        <text x={156} y={120} fontSize="7.3" fill="#334155">ALT hold · VS · IAS · ALT capture · GS</text>
        <text x={156} y={132} fontSize="7.3" fill="#334155">Yaw damper counters Dutch roll.</text>
        <text x={156} y={146} fontSize="7.3" fill="#b91c1c">Servos move controls; pilot can override/disconnect.</text>
        <text x={10} y={168} fontSize="7.2" fill="#64748b">Inputs: attitude (AHRS), air data (ADC), nav (VOR/ILS/GPS/FMS). Sensing → computer → servos.</text>
      </svg>
    </Frame>
  );
}

/* ── A.7.8 — Stall warning ────────────────────────────────────────────────── */
export function StallWarning() {
  return (
    <Frame>
      <svg viewBox="0 0 340 176" className="w-full">
        <SkyDayScene h={176} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Stall warning systems</text>
        <defs><marker id="aff" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0ea5e9" /></marker></defs>
        {/* aerofoil at high AoA */}
        <Airfoil x={44} y={70} s={1.15} aoa={16} fill="#334155" />
        {/* chord + AoA angle vs relative wind */}
        <line x1={40} y1={73} x2={150} y2={73} stroke="#94a3b8" strokeWidth={0.8} strokeDasharray="3 2" />
        <path d="M96 73 A56 56 0 0 0 92 65" fill="none" stroke="#0f172a" strokeWidth={0.8} /><text x={100} y={70} fontSize="6.5" fill="#0f172a">AoA</text>
        {/* relative airflow arrows (from ahead, slightly below) */}
        {[54, 66, 78].map((yy, i) => <line key={i} x1={6} y1={yy + 6} x2={34} y2={yy} stroke="#0ea5e9" strokeWidth={1} markerEnd="url(#aff)" />)}
        <text x={6} y={100} fontSize="6.7" fill="#0369a1">relative airflow</text>
        {/* separated flow over the top = stall */}
        <path d="M96 58 q7 -7 14 0 q-7 7 -14 0 M112 56 q6 -6 12 0 q-6 6 -12 0" fill="none" stroke="#dc2626" strokeWidth={1} />
        <text x={92} y={44} fontSize="6.7" fill="#b91c1c">airflow separates → STALL</text>
        <circle cx={40} cy={74} r={2.4} fill="#dc2626" /><text x={8} y={112} fontSize="6.6" fill="#dc2626">stagnation point moves aft/down as AoA ↑</text>
        <rect x={170} y={24} width={162} height={64} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={176} y={37} fontSize="8" fontWeight="bold" fill="#0f172a">Detectors</text>
        <text x={176} y={50} fontSize="7.3" fill="#334155">Pneumatic reed (suction) horn.</text>
        <text x={176} y={62} fontSize="7.3" fill="#334155">Electric AoA vane / flapper switch.</text>
        <text x={176} y={74} fontSize="7.3" fill="#334155">AoA-vane senses angle, not speed.</text>
        <text x={176} y={85} fontSize="7.3" fill="#b45309">Warns ~5–10 kt above the stall.</text>
        <rect x={170} y={94} width={162} height={40} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={176} y={107} fontSize="8" fontWeight="bold" fill="#166534">Protection (large a/c)</text>
        <text x={176} y={119} fontSize="7.3" fill="#334155">Stick SHAKER = warning.</text>
        <text x={176} y={130} fontSize="7.3" fill="#b91c1c">Stick PUSHER = pitch down to prevent stall.</text>
        <text x={10} y={152} fontSize="7.3" fill="#334155">AoA (not IAS) triggers the stall — a wing stalls at a fixed AoA regardless of speed/attitude.</text>
        <text x={10} y={166} fontSize="7.2" fill="#64748b">Heated where fitted; some feed an AoA indexer for approach.</text>
      </svg>
    </Frame>
  );
}

/* ── A.9.6 — Relative velocity (closing / opening) ────────────────────────── */
export function RelativeVelocity() {
  return (
    <Frame>
      <svg viewBox="0 0 340 160" className="w-full">
        <SkyDayScene h={160} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Relative velocity — closing &amp; opening</text>
        {/* head-on closing */}
        <PlaneTop x={44} y={54} s={0.9} rot={90} fill="#0f172a" />
        <PlaneTop x={188} y={54} s={0.9} rot={270} fill="#334155" />
        <text x={66} y={42} fontSize="7" fill="#16a34a">250 →</text><text x={150} y={42} fontSize="7" fill="#dc2626">← 180</text>
        <text x={90} y={78} fontSize="7.4" fontWeight="bold" fill="#0f172a">Head-on: closing = sum = 430 kt</text>
        {/* same direction */}
        <PlaneTop x={44} y={104} s={0.9} rot={90} fill="#0f172a" />
        <PlaneTop x={150} y={104} s={0.9} rot={90} fill="#334155" />
        <text x={64} y={92} fontSize="7" fill="#16a34a">250 →</text><text x={172} y={92} fontSize="7" fill="#dc2626">180 →</text>
        <text x={90} y={128} fontSize="7.4" fontWeight="bold" fill="#0f172a">Same track: closing = difference = 70 kt</text>
        <rect x={214} y={40} width={118} height={62} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={220} y={53} fontSize="7.6" fontWeight="bold" fill="#0f172a">Time to meet =</text>
        <text x={220} y={65} fontSize="7.4" fill="#334155">distance ÷ closing speed</text>
        <text x={220} y={80} fontSize="7.3" fill="#334155">Opposite → add speeds.</text>
        <text x={220} y={92} fontSize="7.3" fill="#334155">Same way → subtract.</text>
        <text x={10} y={152} fontSize="7.2" fill="#64748b">Controlled time of arrival: adjust speed so separation/spacing is maintained at a fix.</text>
      </svg>
    </Frame>
  );
}

/* ── GR1 — Radio frequency spectrum (memory table) ────────────────────────── */
export function RadioSpectrum() {
  const rows = [
    ["VLF", "3–30 kHz", "very long range, submarines"],
    ["LF", "30–300 kHz", "NDB (lower), long-range"],
    ["MF", "300 kHz–3 MHz", "NDB, AM broadcast"],
    ["HF", "3–30 MHz", "long-range oceanic voice (sky wave)"],
    ["VHF", "30–300 MHz", "COM, VOR, ILS LOC, marker"],
    ["UHF", "300 MHz–3 GHz", "DME, SSR, GPS, ILS G/S"],
    ["SHF", "3–30 GHz", "radar, radio altimeter"],
    ["EHF", "30–300 GHz", "satcom, advanced radar"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 176" className="w-full">
        <RadioWaveScene h={176} />
        <Table x={10} y={6} w={320} cols={["Band", "Frequency", "Typical use"]} colX={[6, 52, 150]} rows={rows} title="Radio spectrum — bands & uses" />
        <text x={12} y={170} fontSize="6.9" fill="#475569">Higher frequency → shorter wavelength, more line-of-sight, less diffraction, less static.</text>
      </svg>
    </Frame>
  );
}

/* ── GR2 — Principles of radio operation ──────────────────────────────────── */
export function RadioOperation() {
  return (
    <Frame>
      <svg viewBox="0 0 340 170" className="w-full">
        <RadioWaveScene h={170} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Principles of radio operation</text>
        <rect x={10} y={22} width={158} height={62} rx={5} fill="#ffffff" opacity={0.95} stroke="#cbd5e1" />
        <text x={16} y={35} fontSize="8" fontWeight="bold" fill="#0f172a">Set controls</text>
        <text x={16} y={48} fontSize="7.3" fill="#334155">Squelch: mutes background hiss</text>
        <text x={16} y={59} fontSize="7.3" fill="#334155">until a signal breaks through.</text>
        <text x={16} y={71} fontSize="7.3" fill="#334155">Volume · frequency · PTT to transmit.</text>
        <text x={16} y={81} fontSize="7.2" fill="#b45309">25 / 8.33 kHz channel spacing.</text>
        <rect x={174} y={22} width={158} height={62} rx={5} fill="#ffffff" opacity={0.95} stroke="#cbd5e1" />
        <text x={180} y={35} fontSize="8" fontWeight="bold" fill="#0f172a">Operating type</text>
        <text x={180} y={48} fontSize="7.3" fill="#334155">Simplex: one frequency, take turns.</text>
        <text x={180} y={59} fontSize="7.3" fill="#334155">Half-duplex: 2 freq, one at a time.</text>
        <text x={180} y={71} fontSize="7.3" fill="#334155">AM (A3E) voice on VHF COM.</text>
        <text x={180} y={81} fontSize="7.2" fill="#334155">Only one may transmit at a time.</text>
        <rect x={10} y={92} width={322} height={44} rx={5} fill="#ffffff" opacity={0.95} stroke="#cbd5e1" />
        <text x={16} y={105} fontSize="8" fontWeight="bold" fill="#166534">Good technique</text>
        <text x={16} y={117} fontSize="7.3" fill="#334155">Listen before transmitting · be brief &amp; clear · standard phraseology · read back clearances.</text>
        <text x={16} y={129} fontSize="7.3" fill="#334155">A stuck mic (PTT jammed) blocks the whole frequency — release it.</text>
        <text x={10} y={152} fontSize="7.2" fill="#64748b">VHF is line-of-sight: range ≈ 1.25(√ht₁+√ht₂) ft. Signal fades in valleys / behind terrain.</text>
      </svg>
    </Frame>
  );
}

/* ── GR3 — Airspace classes & VMC minima ──────────────────────────────────── */
export function AirspaceClasses() {
  const rows = [
    ["A", "IFR only", "yes", "all from all"],
    ["B", "IFR & VFR", "yes", "all from all"],
    ["C", "IFR & VFR", "yes", "IFR/IFR & IFR/VFR"],
    ["D", "IFR & VFR", "yes", "IFR/IFR; traffic info"],
    ["E", "IFR & VFR", "IFR only", "IFR/IFR"],
    ["G", "IFR & VFR", "no", "none (info on request)"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 186" className="w-full">
        <SkyDayScene h={186} />
        <Table x={10} y={6} w={320} cols={["Class", "Traffic", "Clearance", "Separation"]} colX={[6, 46, 130, 210]} rows={rows} title="Airspace classes (ICAO)" />
        <rect x={10} y={124} width={322} height={40} rx={5} fill="#ffffff" opacity={0.95} stroke="#cbd5e1" />
        <text x={16} y={137} fontSize="8" fontWeight="bold" fill="#0f172a">VMC minima (typical)</text>
        <text x={16} y={149} fontSize="7.3" fill="#334155">At/above FL100: 8 km vis, 1500 m horiz / 1000 ft vert from cloud.</text>
        <text x={16} y={160} fontSize="7.3" fill="#334155">Below FL100: 5 km vis; Class G low/slow: clear of cloud, in sight of surface.</text>
        <text x={10} y={180} fontSize="7.2" fill="#64748b">Class F = advisory. Controlled = A–E; uncontrolled = G. SACAA follows the ICAO scheme.</text>
      </svg>
    </Frame>
  );
}

/* ── GR4 — SA CAR Part 91 quick card ──────────────────────────────────────── */
export function Part91Card() {
  return (
    <Frame>
      <svg viewBox="0 0 340 176" className="w-full">
        <MapGridScene h={176} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">SA CAR Part 91 — key rules</text>
        <rect x={10} y={22} width={158} height={64} rx={5} fill="#ffffff" opacity={0.95} stroke="#cbd5e1" />
        <text x={16} y={35} fontSize="8" fontWeight="bold" fill="#0f172a">Cruising levels (VFR)</text>
        <text x={16} y={48} fontSize="7.3" fill="#334155">Mag track 000–179° → ODD +500 ft</text>
        <text x={16} y={59} fontSize="7.3" fill="#334155">Mag track 180–359° → EVEN +500 ft</text>
        <text x={16} y={71} fontSize="7.3" fill="#334155">(IFR = odd/even without the +500)</text>
        <text x={16} y={82} fontSize="7.2" fill="#b45309">Applies above 3000 ft AGL.</text>
        <rect x={174} y={22} width={158} height={64} rx={5} fill="#ffffff" opacity={0.95} stroke="#cbd5e1" />
        <text x={180} y={35} fontSize="8" fontWeight="bold" fill="#0f172a">Altimeter setting</text>
        <text x={180} y={48} fontSize="7.3" fill="#334155">Below transition alt: QNH.</text>
        <text x={180} y={59} fontSize="7.3" fill="#334155">Above transition level: 1013.2 (FL).</text>
        <text x={180} y={71} fontSize="7.3" fill="#334155">SA transition altitude commonly high-veld dependent.</text>
        <rect x={10} y={94} width={322} height={44} rx={5} fill="#ffffff" opacity={0.95} stroke="#cbd5e1" />
        <text x={16} y={107} fontSize="8" fontWeight="bold" fill="#166534">Also know</text>
        <text x={16} y={119} fontSize="7.3" fill="#334155">Min heights: 500 ft from person/vessel/structure; 1000 ft over built-up (congested) areas.</text>
        <text x={16} y={130} fontSize="7.3" fill="#334155">Right of way: give way to the right; converging → aircraft on the right has priority.</text>
        <text x={10} y={154} fontSize="7.2" fill="#64748b">Fuel reserves, O₂ above FL100/125, and documents to carry are Part 91 too.</text>
      </svg>
    </Frame>
  );
}
