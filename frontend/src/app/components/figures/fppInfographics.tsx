import { Infographic } from "@/app/components/figures/Infographic";

// Original infographics for CPL Flight Planning & Performance (subject A.4),
// built from fpp-notes.ts. Same visual language as Met/Air Law, with diagrams.

// ── mini diagrams ──
function ASI() {
  // simplified airspeed indicator arcs
  const cx = 90, cy = 90, r = 70;
  const pt = (deg: number, rr: number) => [cx + rr * Math.cos((deg - 90) * Math.PI / 180), cy + rr * Math.sin((deg - 90) * Math.PI / 180)];
  const arc = (a: number, b: number, rr: number) => {
    const [x1, y1] = pt(a, rr), [x2, y2] = pt(b, rr);
    return `M ${x1} ${y1} A ${rr} ${rr} 0 ${b - a > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  };
  return (
    <svg viewBox="0 0 300 180" className="w-full">
      <circle cx={cx} cy={cy} r={r + 6} fill="#0f172a" />
      <path d={arc(30, 110, r)} stroke="#fff" strokeWidth="7" fill="none" />
      <path d={arc(40, 250, r - 9)} stroke="#22c55e" strokeWidth="7" fill="none" />
      <path d={arc(250, 320, r - 9)} stroke="#eab308" strokeWidth="7" fill="none" />
      <path d={arc(320, 324, r)} stroke="#ef4444" strokeWidth="9" fill="none" />
      <text x={190} y={40} fontSize="10" fill="#fff">white arc = flap range (VS0–VFE)</text>
      <text x={190} y={62} fontSize="10" fill="#22c55e">green = normal (VS1–VNO)</text>
      <text x={190} y={84} fontSize="10" fill="#eab308">yellow = caution (VNO–VNE)</text>
      <text x={190} y={106} fontSize="10" fill="#ef4444">red line = VNE</text>
      <text x={190} y={132} fontSize="10" fill="#94a3b8">VX best angle · VY best rate</text>
      <text x={190} y={150} fontSize="10" fill="#94a3b8">VA manoeuvring · V1/VR/V2 take-off</text>
    </svg>
  );
}
function DeclaredDistances() {
  return (
    <svg viewBox="0 0 320 120" className="w-full">
      <rect x={30} y={44} width={180} height={16} fill="#334155" />
      {[50, 80, 110, 140, 170].map((x) => <rect key={x} x={x} y={50} width={16} height={4} fill="#e2e8f0" />)}
      <rect x={210} y={44} width={30} height={16} fill="#64748b" />
      <rect x={240} y={48} width={30} height={8} fill="#94a3b8" opacity="0.6" />
      <text x={225} y={38} fontSize="8" textAnchor="middle" fill="#64748b">stopway</text>
      <text x={255} y={72} fontSize="8" textAnchor="middle" fill="#64748b">clearway</text>
      {[["TORA", 30, 210, 76, "#1d4ed8"], ["ASDA (+stopway)", 30, 240, 90, "#b45309"], ["TODA (+clearway)", 30, 270, 104, "#15803d"]].map(([l, x1, x2, y, c]) => (
        <g key={l as string}>
          <line x1={x1 as number} y1={y as number} x2={x2 as number} y2={y as number} stroke={c as string} strokeWidth="1.5" />
          <text x={(x2 as number) + 4} y={(y as number) + 3} fontSize="8" fill={c as string}>{l}</text>
        </g>
      ))}
    </svg>
  );
}
function Seesaw() {
  return (
    <svg viewBox="0 0 320 120" className="w-full">
      <line x1={20} y1={80} x2={300} y2={80} stroke="#94a3b8" strokeWidth="2" />
      <line x1={40} y1={20} x2={40} y2={92} stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x={40} y={106} fontSize="9" textAnchor="middle" fill="#334155">datum</text>
      <polygon points="150,80 140,96 160,96" fill="#0f766e" />
      <text x={150} y={110} fontSize="9" textAnchor="middle" fill="#0f766e">CG</text>
      <rect x={90} y={60} width={22} height={20} fill="#1d4ed8" /><text x={101} y={54} fontSize="8" textAnchor="middle" fill="#1d4ed8">mass</text>
      <line x1={40} y1={40} x2={101} y2={40} stroke="#b45309" strokeWidth="1.4" /><text x={70} y={35} fontSize="8" textAnchor="middle" fill="#b45309">arm</text>
      <text x={200} y={40} fontSize="10" fill="#334155">Moment = mass × arm</text>
      <text x={200} y={58} fontSize="10" fill="#334155">CG = ΣMoment ÷ ΣMass</text>
      <text x={200} y={76} fontSize="10" fill="#334155">%MAC = (CG−LEMAC)/MAC ×100</text>
    </svg>
  );
}
function PETdiagram() {
  return (
    <svg viewBox="0 0 320 110" className="w-full">
      <line x1={20} y1={55} x2={300} y2={55} stroke="#334155" strokeWidth="2" />
      <circle cx={20} cy={55} r="5" fill="#1d4ed8" /><text x={20} y={78} fontSize="10" textAnchor="middle" fill="#1d4ed8">A</text>
      <circle cx={300} cy={55} r="5" fill="#1d4ed8" /><text x={300} y={78} fontSize="10" textAnchor="middle" fill="#1d4ed8">B</text>
      <circle cx={200} cy={55} r="6" fill="#ef4444" /><text x={200} y={44} fontSize="9" textAnchor="middle" fill="#ef4444">PET</text>
      <text x={100} y={30} fontSize="9" textAnchor="middle" fill="#15803d">out (O) = TAS − HW</text>
      <text x={250} y={30} fontSize="9" textAnchor="middle" fill="#b45309">home (H) = TAS + HW</text>
      <text x={160} y={100} fontSize="10" fill="#334155">PET = D×H/(O+H)   ·   PSR = E×O×H/(O+H)</text>
    </svg>
  );
}

export function PerformanceClassification() {
  return (
    <Infographic title="Aeroplane Performance Classification" tagline="Classes A/B/C and gross vs net"
      panels={[
        { heading: "PERFORMANCE CLASSES", tone: "blue", points: ["Class A — most large multi-engine turbine aeroplanes (>9 pax or >5700 kg).", "Class B — light propeller aeroplanes (≤9 pax and ≤5700 kg) — most CPL trainers.", "Class C — older large piston aeroplanes."] },
        { heading: "GROSS vs NET", tone: "teal", points: ["Gross performance = the average a fleet achieves.", "Net performance = gross reduced by a safety margin — used for OBSTACLE clearance.", "Obstacles are cleared on the NET flight path."] },
        { heading: "MASS LIMITS", tone: "purple", wide: true, points: ["Dispatch take-off mass is the LOWEST of the field-length, climb (WAT), obstacle and en-route limited masses.", "Class A must continue the take-off and clear obstacles on the net path after an engine failure at/after V1."] },
      ]}
      keyPoints={["Class B = light props (≤9 pax, ≤5700 kg).", "Net = gross − safety margin (for obstacles).", "TOM = lowest of field/climb/obstacle/en-route limits."]}
      summary="Know your class, and remember obstacles are cleared on the NET flight path." />
  );
}
export function Certification() {
  return (
    <Infographic title="Certification & Load Factors" tagline="Category limit load factors"
      panels={[
        { heading: "CATEGORY LIMIT LOAD FACTORS", tone: "blue", points: ["Normal: +3.8 g / −1.52 g (no aerobatics).", "Utility: +4.4 g / −1.76 g (limited manoeuvres).", "Acrobatic: +6.0 g / −3.0 g (aerobatics per the AFM).", "Commuter: +3.8 g / −1.52 g."] },
        { heading: "STRUCTURAL MARGIN", tone: "teal", points: ["Ultimate load = limit load × 1.5 safety factor.", "Exceeding the limit load risks permanent deformation.", "Manoeuvring speed VA protects the airframe from full control inputs."] },
      ]}
      keyPoints={["Normal +3.8 g; Utility +4.4 g; Acrobatic +6.0 g.", "Ultimate = 1.5 × limit load.", "Aerobatics only in the Acrobatic category."]}
      summary="Fly within the category's load factors — the airframe is only certified to those limits." />
  );
}
export function StagesAirspeed() {
  return (
    <Infographic title="Stages of Flight & Airspeed" tagline="The V-speeds and the airspeed chain"
      panels={[
        { heading: "THE AIRSPEED CHAIN", tone: "blue", svg: <ASI />, points: ["IAS → (instrument/position error) → CAS → (compressibility) → EAS → (density) → TAS.", "For a constant IAS, TAS increases with altitude (thinner air)."] },
        { heading: "KEY V-SPEEDS", tone: "teal", points: ["VX best angle of climb (obstacles); VY best rate of climb.", "VA manoeuvring — no full/abrupt control inputs above it.", "V1 decision · VR rotate · V2 take-off safety speed.", "VNE never exceed (red line); VNO max structural cruise."] },
        { heading: "TAKE-OFF SPEED ORDER", tone: "purple", wide: true, points: ["VS < VMCA < V2min; VR ≥ V1 and ≥ 1.05 VMCA; V2 ≥ 1.1 VMCA and ≥ 1.13 VSR.", "VREF (landing) ≥ 1.23 VSR0."] },
      ]}
      keyPoints={["IAS→CAS→EAS→TAS.", "VX angle, VY rate.", "V1 decision, VR rotate, V2 safety.", "VREF ≥ 1.23 VSR0."]}
      summary="The V-speeds are guaranteed marks — learn the chain and the take-off order cold." />
  );
}
export function MetAerodromeTerminology() {
  return (
    <Infographic title="Meteorological & Aerodrome Terminology" tagline="ISA, altitudes and declared distances"
      panels={[
        { heading: "ATMOSPHERE & ALTITUDES", tone: "blue", points: ["ISA temp = 15 − 2×(alt in thousands of ft); ISA deviation = OAT − ISA temp.", "Pressure altitude = elevation + (1013 − QNH) × 30 ft.", "Density altitude ≈ pressure altitude + 120 × ISA deviation.", "High/hot/humid = high density altitude = worse performance."] },
        { heading: "DECLARED DISTANCES", tone: "green", svg: <DeclaredDistances />, points: ["TORA; TODA = TORA + clearway; ASDA = TORA + stopway; LDA.", "Required distances (TORR/TODR/LDR) must be ≤ the available ones.", "Balanced field: accelerate-go = accelerate-stop."] },
      ]}
      keyPoints={["PA = elev + (1013−QNH)×30.", "DA ≈ PA + 120×ISA-dev.", "TODA=+clearway, ASDA=+stopway.", "ACN must not exceed PCN."]}
      summary="Two families: the atmospheric altitudes and the aerodrome declared distances — know both." />
  );
}
export function PerformanceTerminology() {
  return (
    <Infographic title="Performance Terminology" tagline="Climb, cruise and the speeds that matter"
      panels={[
        { heading: "CLIMB & DESCENT", tone: "blue", points: ["Rate of climb depends on EXCESS POWER; angle of climb on EXCESS THRUST.", "% gradient = ROC × 0.9868 ÷ TAS.", "Service ceiling: where ROC falls to a small residual (e.g. 100 ft/min)."] },
        { heading: "RANGE & ENDURANCE", tone: "teal", points: ["Range = distance for the fuel; endurance = time for the fuel.", "Best range speed > best endurance speed.", "Both change with mass, altitude and wind."] },
        { heading: "GROUND DISTANCE", tone: "purple", wide: true, points: ["GNM = ANM × GS ÷ TAS, or GNM = ANM + [time × (±wind)]/60.", "Headwind shortens ground distance for a given air distance; tailwind lengthens it."] },
      ]}
      keyPoints={["ROC ← excess power; angle ← excess thrust.", "%gradient = ROC×0.9868/TAS.", "Best range speed > best endurance speed.", "GNM = ANM×GS/TAS."]}
      summary="Separate the ideas: power drives rate, thrust drives angle; range is distance, endurance is time." />
  );
}
export function FactorsAffectingPerformance() {
  return (
    <Infographic title="Factors Affecting Performance" tagline="What lengthens the runway and cuts the climb"
      panels={[
        { heading: "AIR DENSITY", tone: "blue", points: ["High density altitude (hot, high, low pressure, humid) = thin air.", "→ longer take-off/landing, poorer climb, higher TAS for a given IAS."] },
        { heading: "MASS", tone: "teal", points: ["Higher mass → longer ground runs, reduced climb gradient & rate.", "Best-range/endurance speeds increase with mass."] },
        { heading: "WIND & SLOPE", tone: "amber", points: ["Headwind shortens take-off/landing; tailwind lengthens (heavily penalised on landing).", "Upslope lengthens take-off; downslope lengthens landing."] },
        { heading: "SURFACE & CONTAMINATION", tone: "purple", points: ["Grass, wet or contaminated surfaces increase distances (apply the CAP factors).", "Dry grass ×1.2, wet grass ×1.3; slope 1%→×1.05."] },
      ]}
      keyPoints={["High/hot/humid = high DA = worse performance.", "Headwind good, tailwind bad.", "Upslope hurts take-off; downslope hurts landing.", "Apply surface & slope factors."]}
      summary="Density, mass, wind, slope and surface all move the numbers — always apply the factors." />
  );
}
export function SEPPerformanceData() {
  return (
    <Infographic title="SEP Performance Data (CAP 698)" tagline="Reading the single-engine graphs"
      panels={[
        { heading: "NAVIGATING THE CAPS", tone: "blue", points: ["Identify SEP1/MEP1 (bottom-right) and the figure/table number.", "Confirm the header conditions (surface, flap, slope) match the question.", "CAP 698 covers take-off, landing, accelerate-stop, ROC, % gradient, wind components."] },
        { heading: "THE METHOD", tone: "teal", points: ["Enter OAT/pressure-altitude → mass → wind → obstacle in turn.", "Read the distance, then apply the runway-surface & slope FACTORS.", "% gradient = ROC × 0.9868 ÷ TAS if the lines are hard to read."] },
        { heading: "RUNWAY FACTORS", tone: "amber", wide: true, points: ["Take-off: dry grass ×1.2, wet grass ×1.3, required ×1.25. Landing: dry grass ×1.15, required ×1.43.", "Slope: 1% ×1.05, 1.5% ×1.075, 2% ×1.1. Upslope = take-off yes; downslope = landing yes."] },
      ]}
      keyPoints={["Match the header conditions to the question.", "Plot temp/PA → mass → wind → obstacle.", "Apply surface & slope factors last.", "%gradient = ROC×0.9868/TAS."]}
      summary="Locate the right figure, plot the chain, then apply the factors — practise on your CAP 698." />
  );
}
export function MEPPerformanceData() {
  return (
    <Infographic title="MEP Performance Data (CAP 697)" tagline="Reading the multi-engine graphs"
      panels={[
        { heading: "CAP 697 FIGURES", tone: "blue", points: ["Climb (Fig 3.1), range/endurance (Fig 3.2/3.5), power tables (Fig 3.3/3.4), descent (Fig 3.6), ROC (Fig 3.7).", "Power settings top-right: high speed 75%, economy 65%, long range 45%."] },
        { heading: "WIND & TEMPERATURE", tone: "teal", points: ["GNM = ANM × GS ÷ TAS (Fig 2.4) or GNM = ANM + [time×wind]/60 (Fig 2.1/3.1/3.6).", "Work out ISA deviation — range changes ~1 nm per °C from ISA.", "Apply standard holding fuel of 30 min where relevant."] },
        { heading: "MIXTURE & BRAKES", tone: "purple", wide: true, points: ["Full-rich answered normally; leaned to 25°F rich of peak EGT → skip a line/read backwards.", "Heavy-duty brakes: multiply the answer (Fig 3.2 7%→×0.93, Fig 3.4 13%→×0.87)."] },
      ]}
      keyPoints={["Power: 75% high speed, 65% economy, 45% long range.", "GNM = ANM×GS/TAS.", "Leaned mixture → read differently.", "Heavy-duty brakes → apply the %."]}
      summary="MEP graphs add power settings, mixture and brake corrections — read the header carefully." />
  );
}
export function MEPCalculations() {
  return (
    <Infographic title="MEP Performance Calculations" tagline="Single-engine climb and the drift-down"
      panels={[
        { heading: "ONE ENGINE INOPERATIVE", tone: "red", points: ["The critical engine failure roughly HALVES thrust but cuts climb by far more.", "Single-engine ROC is much lower than all-engine — read the OEI curve on Fig 3.7.", "On a conventional twin the LEFT engine is critical."] },
        { heading: "CLIMB & DRIFT-DOWN", tone: "blue", points: ["Determine the all-engine and single-engine rate of climb for the conditions.", "Above the single-engine ceiling the aircraft drifts down to a level it can maintain.", "% gradient = ROC × 0.9868 ÷ TAS."] },
      ]}
      keyPoints={["OEI ≠ half performance — climb falls much more.", "Left engine critical on a conventional twin.", "Read the OEI curve for single-engine ROC."]}
      summary="An engine failure costs climb, not just thrust — know the single-engine numbers." />
  );
}
export function MassBalance() {
  return (
    <Infographic title="Mass & Balance" tagline="Moments, CG, %MAC and CG movement"
      panels={[
        { heading: "THE MOMENT METHOD", tone: "blue", svg: <Seesaw />, points: ["Moment = mass × arm; CG = ΣMoment ÷ ΣMass.", "%MAC = (CG − LEMAC) ÷ MAC × 100.", "Loads forward of datum = negative arm; aft = positive."] },
        { heading: "CG MOVEMENT", tone: "teal", points: ["Load ADDED: ΔCG = load × (arm − old CG) ÷ new total mass.", "Load MOVED: ΔCG = load × distance moved ÷ total mass.", "Load to shift for a target ΔCG = total × ΔCG ÷ distance shifted."] },
        { heading: "THE MASS LADDER", tone: "purple", points: ["BEM → +operational items → DOM → +traffic load → ZFM → +fuel → TOM → −trip → Landing Mass.", "Each is capped by its maximum (MZFM, MTOM, MLM).", "Fuel mass = litres × SG; 1 IMP gal = 1.2 US gal."] },
        { heading: "TAIL LOAD", tone: "amber", points: ["Normally a DOWNLOAD on the tailplane in cruise.", "Moving the CG AFT reduces the required download (less drag, but less stability).", "Too far aft = unstable; too far forward = heavy, higher stall speed."] },
      ]}
      keyPoints={["Moment = mass×arm; CG = ΣM/ΣM.", "%MAC = (CG−LEMAC)/MAC×100.", "CG shift (add) = load×(arm−CG)/new total.", "Fuel mass = L×SG."]}
      summary="Every load is a moment — master the sheet, %MAC and CG-movement sums." />
  );
}
export function FlightPlanningGeneral() {
  return (
    <Infographic title="Flight Planning General (PET / PSR & Fuel)" tagline="Critical point, safe return and fuel"
      panels={[
        { heading: "PET & PSR", tone: "blue", svg: <PETdiagram />, points: ["PET (critical point) = D × H ÷ (O + H) — a TIME/decision point, independent of endurance.", "PSR (point of safe return) = Endurance × O × H ÷ (O + H) — a FUEL/return point.", "O = groundspeed out, H = groundspeed home; GS = TAS ± wind component."] },
        { heading: "FUEL PLAN", tone: "teal", points: ["Block = taxi + trip + contingency + alternate + final reserve (+ additional).", "Safe endurance = usable fuel ÷ fuel flow (reserve excluded for the PSR).", "Minimum block fuel questions: sum start/taxi + climb + cruise + reserve."] },
        { heading: "WORKED VALUES", tone: "purple", wide: true, points: ["Example PET: TAS 300, 500 nm, 60 kt HW → O=240, H=360 → PET = 500×360/600 = 300 nm.", "Example PSR: GS out 435, back 385, endurance 9 h → 9×435×385/820 ≈ 1 838 nm."] },
      ]}
      keyPoints={["PET = D×H/(O+H) — time/decision point.", "PSR = E×O×H/(O+H) — fuel/return point.", "PET doesn't depend on endurance; PSR does.", "Headwind out → PET beyond half-way."]}
      summary="PET is about time to a decision; PSR is about the fuel to get home — learn both formulas." />
  );
}
