import { Infographic } from "@/app/components/figures/Infographic";

// Aircraft Technical & General (A.1) infographics — structured visual cheat
// sheets (no aircraft renders), same language as the met/air-law infographics.
// One per syllabus aspect A.1.1–A.1.8, built from the exam-critical facts.

export function AtgElements() {
  return (
    <Infographic
      title="Elements & Terminology"
      tagline="The vocabulary the rest of the paper is built on"
      panels={[
        { heading: "Matter & forces", tone: "blue", points: [
          "Mass (kg) vs weight (force = mass × g)",
          "Pressure = force ÷ area · stress = load ÷ cross-section",
          "Work = force × distance · power = work ÷ time",
        ]},
        { heading: "Materials", tone: "teal", points: [
          "Aluminium alloy — light, strong, main airframe metal",
          "Steel — high-stress fittings · composites — light, stiff, no fatigue limit",
          "Fatigue = failure from repeated load cycles below ultimate",
        ]},
      ]}
      keyPoints={[
        "Ultimate load = 1.5 × limit load (the safety factor)",
        "Tension, compression, shear, bending, torsion — know each",
      ]}
      summary="Everything downstream — engines, structures, aerodynamics — is these basics applied."
    />
  );
}

export function AtgAirframeSystems() {
  return (
    <Infographic
      title="Airframe & Systems"
      tagline="Structure, hydraulics, pneumatics, pressurisation"
      panels={[
        { heading: "Structure", tone: "slate", points: [
          "Monocoque / semi-monocoque — skin carries the load",
          "Fail-safe & safe-life design philosophies",
          "Flight controls: ailerons (roll), elevator (pitch), rudder (yaw)",
        ]},
        { heading: "Hydraulics", tone: "blue", points: [
          "Incompressible fluid transmits force · reservoir + pump + actuators",
          "Accumulator stores pressure (and dampens surges)",
          "Relief valve limits maximum system pressure",
        ]},
        { heading: "Pressurisation", tone: "teal", points: [
          "Outflow valve controls cabin altitude",
          "Max differential protects the fuselage structure",
          "Bleed air (turbine) or engine-driven (piston) source",
        ]},
        { heading: "Ice & rain protection", tone: "purple", points: [
          "Anti-ice = prevent · de-ice = remove (boots)",
          "Electric, bleed-air (thermal) or fluid (TKS) systems",
        ]},
      ]}
      keyPoints={[
        "Scissor / torsion link keeps the nose-wheel aligned",
        "Static bonding bleeds off charge — prevents radio static",
      ]}
      summary="Learn what each system does, its single-point failures, and the warning it gives."
    />
  );
}

export function AtgElectrics() {
  return (
    <Infographic
      title="Electrical Systems"
      tagline="Generation, distribution, protection"
      panels={[
        { heading: "Generation", tone: "amber", points: [
          "Alternator (AC→DC) charges better at low rpm than a DC generator",
          "Needs battery to excite the field initially",
          "Paralleled generators share load equally (equalising circuit)",
        ]},
        { heading: "Distribution", tone: "blue", points: [
          "Bus bar = central distribution point",
          "Load-shedding sheds non-essential buses on failure",
          "Battery is the emergency reserve",
        ]},
        { heading: "Protection", tone: "red", points: [
          "Circuit breakers / fuses protect against overcurrent",
          "Reset a CB once only — never hold it in",
        ]},
      ]}
      keyPoints={[
        "Low battery voltage → weak field → poor generator output",
        "Ammeter + / − shows charge / discharge",
      ]}
      summary="Know the failure drill: what you lose, what the battery keeps alive, and for how long."
    />
  );
}

export function AtgPiston() {
  return (
    <Infographic
      title="Piston Engines"
      tagline="The four-stroke cycle and its traps"
      panels={[
        { heading: "4-stroke cycle", tone: "blue", points: [
          "Induction · Compression · Power · Exhaust",
          "‘Suck · Squeeze · Bang · Blow’",
          "One power stroke every two crank revolutions",
        ]},
        { heading: "Mixture", tone: "green", points: [
          "Air thins with altitude → mixture richens → LEAN on climb",
          "Too rich = rough/cold · too lean = high CHT, detonation risk",
        ]},
        { heading: "Detonation vs pre-ignition", tone: "red", points: [
          "Detonation = uncontrolled explosion after the spark (high CHT)",
          "Pre-ignition = charge fires early on a hot spot before the plug",
          "Cure detonation: richer mixture, lower power, cooler",
        ]},
        { heading: "Ignition & carb ice", tone: "amber", points: [
          "Dual magnetos — engine-driven, independent of the battery",
          "Mag drop on test normal; a dead cut = fault",
          "Carb ice: low power, high humidity, +0 to +25℃ — use carb heat",
        ]},
      ]}
      keyPoints={[
        "Supercharger / turbocharger restores sea-level power with altitude",
        "CHT & EGT are your health gauges — lean to peak EGT with care",
      ]}
      summary="Three topics carry the paper; the piston engine's mixture and detonation traps are reliably examined."
    />
  );
}

export function AtgTurbine() {
  return (
    <Infographic
      title="Gas Turbine Engines"
      tagline="Continuous constant-pressure cycle"
      panels={[
        { heading: "Working cycle", tone: "blue", points: [
          "Suck · Squeeze · Bang · Blow — but continuous",
          "Intake → compressor → combustion → turbine → exhaust",
          "Turbine drives the compressor; thrust = mass flow × velocity change",
        ]},
        { heading: "Start sequence", tone: "green", points: [
          "Rotate (starter) → igniters ON → fuel ON",
          "Igniter fires BEFORE fuel is introduced",
          "Watch EGT for light-up within limits",
        ]},
        { heading: "Start faults", tone: "red", points: [
          "Hot start = EGT overtemp (too much fuel / weak rotation)",
          "Hung start = stuck at low rpm · wet start = no light-up, fuel pools",
          "Low battery → slow rotation → hung/wet start",
        ]},
        { heading: "Indications", tone: "slate", points: [
          "EPR or N1 = thrust · N2 = core speed",
          "EGT = key temperature limit",
        ]},
      ]}
      keyPoints={[
        "Types: turbojet, turbofan, turboprop, turboshaft",
        "FOD and compressor stall are the handling hazards",
      ]}
      summary="The start sequence and its failures (hot / hung / wet) are the classic turbine exam questions."
    />
  );
}

export function AtgEmergencyEquip() {
  return (
    <Infographic
      title="Emergency Equipment"
      tagline="Fire, oxygen, survival"
      panels={[
        { heading: "Fire", tone: "red", points: [
          "Fire triangle: fuel + heat + oxygen — remove one to extinguish",
          "Hand extinguisher required on ALL aircraft",
          "Halon / BCF for cabin & engine; never water on electrical/fuel fires",
        ]},
        { heading: "Oxygen", tone: "blue", points: [
          "Required >120 min at 10 000–12 000 ft · always above 12 000 ft",
          "Hypoxia is insidious — no reliable warning to the pilot",
          "Chemical, gaseous or on-board (OBOGS) systems",
        ]},
        { heading: "Survival & escape", tone: "teal", points: [
          "ELT transmits 121.5 / 406 MHz · life rafts for extended over-water",
          "Smoke hoods / crew masks for cockpit smoke",
        ]},
      ]}
      keyPoints={[
        "Class A/B/C/D fires — match the extinguishing agent",
        "Over-water: rafts/limits depend on distance from land & engines",
      ]}
      summary="Know the agent for each fire and the altitude thresholds for oxygen cold."
    />
  );
}

export function AtgHazards() {
  return (
    <Infographic
      title="Operational Hazards"
      tagline="Fuel, contamination, static, environment"
      panels={[
        { heading: "Fuel", tone: "amber", points: [
          "Drain sumps — water sinks (denser than Avgas/Jet A1)",
          "Check grade & colour: Avgas 100LL blue · Jet A1 clear/straw",
          "Misfuelling and contamination are leading causes of failure",
        ]},
        { heading: "Static & lightning", tone: "purple", points: [
          "Bonding/earthing during refuel prevents spark ignition",
          "Poor bonding → precipitation (radio) static in flight",
        ]},
        { heading: "Environment", tone: "blue", points: [
          "Volcanic ash — avoid; abrasive + melts in the turbine",
          "Icing, FOD and bird strike are take-off/landing hazards",
        ]},
      ]}
      keyPoints={[
        "Water contamination = engine stoppage risk — always sump before flight",
        "Hazard questions reward the practical ‘what would you do’ answer",
      ]}
      summary="Most hazard marks come from fuel checks and the static/bonding link to radio noise."
    />
  );
}

export function AtgSubsonicAero() {
  return (
    <Infographic
      title="Subsonic Aerodynamics"
      tagline="The biggest single ATG topic"
      panels={[
        { heading: "Lift & stall", tone: "blue", points: [
          "L = ½ρV²S·CL · lift grows with AoA until the critical angle (~16°)",
          "Stall = exceeding CLmax / critical AoA — at ANY speed/attitude",
          "Centre of pressure moves FORWARD as AoA increases",
        ]},
        { heading: "Drag", tone: "green", points: [
          "Induced drag ∝ 1/V² — worst slow / high AoA (reduced by high aspect ratio)",
          "Parasite drag ∝ V² — worst fast",
          "Total drag minimum at VMD = best glide speed",
        ]},
        { heading: "Stall speed factors", tone: "red", points: [
          "↑ with weight, load factor and forward CG",
          "Vs ∝ √(load factor) — at 2 g the stall speed rises ×1.41",
          "Ice/contamination raises stall speed, lowers CLmax",
        ]},
        { heading: "Load factor in turns", tone: "amber", points: [
          "n = 1 ÷ cos(bank) · 60° bank = 2 g",
          "Stall speed in the turn = Vs × √n",
        ]},
      ]}
      keyPoints={[
        "High-lift devices: flaps ↑ CLmax & drag · slats delay the stall",
        "Washout makes the root stall first — keeps aileron authority",
      ]}
      summary="Lift, the two drags and the stall-speed drivers are examined every sitting — own them."
    />
  );
}
