// ============================================================================
// SACAA CPL — FLIGHT PLANNING & PERFORMANCE STUDY NOTES
// Original study material for the CPL Flight Planning & Performance syllabus
// (Appendix 2.0A, subject A.4). Written from standard aircraft-performance
// theory and the SA CARs in original wording — NOT copied from any textbook.
// Section ids match sacaa-syllabus.ts. Graph-plotting practice for the SEP/MEP
// data sections is added when the performance manual (CAP 698 graphs) is loaded.
// ============================================================================

import type { AirLawSectionNote } from "./airlaw-notes";

export const FPP_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "A.4.1",
    title: "Aeroplane Performance Classification",
    intro:
      "Aeroplanes are grouped into performance classes that set what margins they must meet — especially the ability to keep flying after an engine failure. Know the classes and the idea of the net (not gross) flight path used for obstacle clearance.",
    blocks: [
      {
        heading: "1. The performance classes",
        points: [
          "Class A: multi-engine turbine transport aeroplanes (and large aeroplanes). Must be able to continue the take-off after failure of the critical engine at/after V1 and clear obstacles on a NET flight path.",
          "Class B: light propeller-driven aeroplanes (broadly ≤9 passengers and ≤5700 kg) — the class most CPL trainers fall into.",
          "Class C: large piston-engine aeroplanes (historic transport types).",
        ],
      },
      {
        heading: "2. Gross vs net, and dispatch",
        points: [
          "Gross performance is the average a fleet achieves; NET performance is gross reduced by a safety margin, and is what must clear obstacles.",
          "The take-off is planned so that after an engine failure the net take-off flight path clears obstacles by the required margin.",
          "Dispatch (take-off mass) is limited by the most restrictive of the field-length, climb (WAT), obstacle and en-route requirements.",
        ],
      },
    ],
    mustKnow: [
      "Class A = multi-engine turbine transport; Class B = light props (≤9 pax/≤5700 kg); Class C = large piston.",
      "Net flight path = gross minus a safety margin; obstacles are cleared on the NET path.",
      "Class A must continue take-off after engine failure at/after V1.",
      "Take-off mass is limited by the most restrictive of field, climb (WAT), obstacle and en-route limits.",
    ],
    traps: [
      "Obstacle clearance uses the NET flight path, not the gross.",
      "Most CPL single/twin trainers are Performance Class B.",
    ],
  },
  {
    sectionId: "A.4.2",
    title: "Certification",
    intro:
      "Before an aeroplane flies it must be certificated to an airworthiness category, each with its own limit load factors and permitted manoeuvres. Know the categories and their g-limits.",
    blocks: [
      {
        heading: "1. Categories & load factors",
        points: [
          "Airworthiness categories (SA-CATS 21 / design standards): Normal, Utility, Acrobatic, Commuter and Transport.",
          "Limit load factors: Normal +3.8g / −1.52g; Utility +4.4g / −1.76g; Acrobatic +6.0g / −3.0g.",
          "Normal category prohibits acrobatic manoeuvres; Utility allows limited manoeuvres (e.g. spins if approved); Acrobatic allows manoeuvres subject to the flight manual.",
        ],
      },
    ],
    mustKnow: [
      "Categories: Normal, Utility, Acrobatic, Commuter, Transport.",
      "Limit load factors: Normal +3.8/−1.52, Utility +4.4/−1.76, Acrobatic +6.0/−3.0.",
      "The type certificate and flight manual define permitted manoeuvres.",
    ],
    traps: [
      "Normal category = no acrobatics; higher g-limits belong to Utility and Acrobatic.",
    ],
  },
  {
    sectionId: "A.4.4",
    title: "Stages of Flight & Airspeed Terminology",
    intro:
      "Performance work lives on precise airspeed definitions. Learn the IAS→CAS→TAS chain and the V-speeds cold — they underlie every take-off, climb and landing calculation.",
    blocks: [
      {
        heading: "1. The airspeed chain",
        points: [
          "IAS (indicated) → CAS (corrected for position/instrument error) → EAS (corrected for compressibility) → TAS (corrected for density).",
          "TAS increases relative to IAS as altitude increases (density falls); at sea level in ISA, CAS ≈ TAS.",
          "Ground speed = TAS ± wind component.",
        ],
      },
      {
        heading: "2. Key V-speeds",
        points: [
          "VS / VS0 / VS1 — stall speeds (clean / landing config / specified config); VA — manoeuvring speed (never make full control deflections above it).",
          "VNO — max structural cruising (yellow arc top); VNE — never exceed (red line); VFE — max flap extended; VLO / VLE — max gear operating / extended.",
          "VX — best angle of climb (max height per distance); VY — best rate of climb (max height per time).",
          "V1 — take-off decision speed; VR — rotate; V2 — take-off safety speed; VLOF — lift-off; VREF — landing reference; VMCG / VMCA — minimum control speed ground / air.",
        ],
      },
    ],
    mustKnow: [
      "IAS → CAS → EAS → TAS; TAS > IAS with altitude.",
      "VX = best angle (obstacle clearance); VY = best rate (fastest to height).",
      "VA = manoeuvring speed — no full/abrupt control inputs above it.",
      "V1 decision, VR rotate, V2 take-off safety speed.",
      "VNE red line (never exceed); VNO top of the normal (green/yellow) range.",
    ],
    traps: [
      "VX (angle) is lower than VY (rate) at sea level; they converge at the absolute ceiling.",
      "Above VA, full control deflection can overstress the airframe.",
    ],
  },
  {
    sectionId: "A.4.5",
    title: "Meteorological & Aerodrome Terminology",
    intro:
      "Two families of terms drive every performance chart: the atmospheric ones (ISA, pressure and density altitude) and the aerodrome distances (TORA/TODA/ASDA/LDA, clearway, stopway). Nail the definitions and the density-altitude idea.",
    blocks: [
      {
        heading: "1. Atmosphere & altitudes",
        points: [
          "ISA sea level: 1013.25 hPa, +15°C; lapse ~2°C/1000 ft. ISA deviation = actual OAT − ISA temperature.",
          "Pressure altitude = altitude on the 1013.25 hPa setting. Density altitude = pressure altitude corrected for temperature (rises with heat, humidity and altitude).",
          "Rule of thumb: density altitude ≈ pressure altitude + 120 ft × (OAT − ISA temperature in °C).",
          "SAT/OAT (static air temp) vs TAT (total air temp, includes ram rise at speed).",
        ],
      },
      {
        heading: "📐 Key formulas (altitudes)",
        points: [
          "ISA temperature at a level = 15 − 2 × (altitude in thousands of ft).",
          "ISA deviation = OAT − ISA temperature.",
          "Pressure altitude = elevation + (1013 − QNH) × 30 ft  (low QNH → higher PA).",
          "Density altitude ≈ pressure altitude + 120 ft × ISA deviation.",
          "Airspeed order: IAS → (instrument/position error) → CAS → (compressibility) → EAS → (density) → TAS.",
        ],
      },
      {
        heading: "✍ Worked example — pressure & density altitude",
        points: [
          "Given: airfield elevation 4 000 ft, QNH 1030 hPa, OAT +28°C.",
          "PA = 4 000 + (1013 − 1030) × 30 = 4 000 − 510 = 3 490 ≈ 3 500 ft.",
          "ISA temp at 3 500 ft = 15 − 2 × 3.5 = +8°C;  ISA deviation = 28 − 8 = +20°C.",
          "DA ≈ 3 500 + 120 × 20 = 3 500 + 2 400 = 5 900 ft — the aircraft performs as if at ~5 900 ft.",
        ],
      },
      {
        heading: "2. Aerodrome distances",
        points: [
          "TORA (take-off run available); TODA = TORA + clearway; ASDA = TORA + stopway; LDA (landing distance available).",
          "TORR/TODR/LDR are the REQUIRED distances the aeroplane needs — must be ≤ the available ones.",
          "Clearway: obstacle-free area beyond the runway for the initial climb. Stopway: area able to support an aborted take-off.",
          "Balanced field length: where accelerate-go distance equals accelerate-stop distance (V1 optimised). Runway slope and surface, and WAT (weight-altitude-temperature) limits, also affect the numbers. ACN must not exceed the pavement's PCN.",
        ],
      },
    ],
    mustKnow: [
      "TODA = TORA + clearway; ASDA = TORA + stopway; LDA = landing length available.",
      "Density altitude ≈ pressure altitude + 120 × (OAT − ISA); high/hot/humid = high DA = worse performance.",
      "Required distances (TORR/TODR/LDR) must be ≤ available (TORA/TODA/LDA).",
      "Balanced field: accelerate-go distance = accelerate-stop distance.",
      "ACN (aircraft) must not exceed PCN (pavement).",
    ],
    traps: [
      "Clearway feeds TODA; stopway feeds ASDA — don't swap them.",
      "Density altitude, not pressure altitude, drives actual performance.",
    ],
  },
  {
    sectionId: "A.4.7",
    title: "Performance Terminology",
    intro:
      "Performance is a balance of forces and of power/thrust available vs required. Understand the climb and descent force diagrams, the difference between climb angle and gradient, and the ceilings.",
    blocks: [
      {
        heading: "1. Climb, descent & glide",
        points: [
          "In a steady climb: Thrust = Drag + Weight × sin(climb angle). Rate of climb depends on EXCESS POWER (power available − power required); climb angle depends on EXCESS THRUST.",
          "Climb gradient = height gained ÷ horizontal distance (often as a %); it is degraded by higher mass, altitude and temperature, and improved by headwind.",
          "Best glide (max range in a glide) is flown at the speed for maximum lift/drag ratio (L/D max); it is independent of weight, but a heavier aircraft glides the same distance at a higher speed.",
        ],
      },
      {
        heading: "2. Ceilings, range & endurance",
        points: [
          "Absolute ceiling: rate of climb = 0. Service ceiling: rate of climb reduced to a small value (e.g. 100 ft/min).",
          "Endurance (time airborne) is best at the speed for minimum power required (minimum fuel flow); range (distance) is best near the speed for maximum L/D (piston) or a higher speed for jets.",
          "Specific fuel consumption (SFC) and specific range (nm per unit fuel) measure efficiency.",
        ],
      },
    ],
    mustKnow: [
      "Rate of climb ← excess POWER; climb angle ← excess THRUST.",
      "Best glide = max L/D speed; heavier weight → same distance, higher speed.",
      "Absolute ceiling: RoC = 0; service ceiling: RoC ≈ 100 ft/min.",
      "Endurance at min power required; range near max L/D (piston).",
      "Climb gradient = height ÷ horizontal distance.",
    ],
    traps: [
      "Glide DISTANCE is unaffected by weight (only the best-glide speed changes).",
      "Angle of climb comes from excess thrust; rate of climb from excess power — different things.",
    ],
  },
  {
    sectionId: "A.4.8",
    title: "Factors Affecting Performance",
    intro:
      "Everything on a performance chart traces back to a handful of variables. Know which way each one moves take-off, climb and landing performance.",
    blocks: [
      {
        heading: "1. The variables",
        points: [
          "Air density (temperature, pressure, altitude, humidity): lower density (hot/high/humid) → less lift, thrust and climb, and longer take-off/landing runs.",
          "Mass: higher mass → higher stall/lift-off speed, longer take-off and landing, lower climb rate/angle.",
          "Wind: headwind shortens take-off and landing runs and steepens the climb path over the ground; tailwind lengthens them.",
          "Runway slope and surface: an upslope and a soft/contaminated surface lengthen the take-off run; a downslope helps take-off but lengthens landing.",
          "Configuration: flap increases lift and drag — some flap shortens take-off but reduces climb; more flap shortens the landing.",
        ],
      },
    ],
    mustKnow: [
      "Hot / high / humid = high density altitude = worse performance, longer runs.",
      "Higher mass → longer take-off & landing, lower climb.",
      "Headwind shortens the run and steepens the ground climb path; tailwind lengthens.",
      "Upslope & soft/wet surface lengthen the take-off run.",
      "Flap: increases lift and drag — shortens ground run but reduces climb.",
    ],
    traps: [
      "Density altitude combines temperature, pressure and humidity — not just altitude.",
      "A downhill slope helps the take-off but HURTS the landing distance.",
    ],
  },
  {
    sectionId: "A.4.9",
    title: "SEP Performance Data (CAP 698)",
    intro:
      "For single-engine piston aircraft, you read take-off, climb, cruise and landing figures off manufacturer/CAP graphs. This section covers how the variables move those numbers; the graph-reading drills come with the performance manual.",
    blocks: [
      {
        heading: "1. Reading the data",
        points: [
          "Take-off and landing graphs are entered with pressure altitude, temperature, mass, wind and (sometimes) slope, working through each grid to a distance.",
          "Climb data gives best rate/angle speeds and time/fuel/distance to climb; cruise data gives TAS and fuel flow for a power setting and altitude.",
          "Always apply the corrections in the order the chart specifies, and factor for wind (head/tail component) and runway condition.",
        ],
      },
      {
        heading: "2. How the variables move SEP figures",
        points: [
          "Higher pressure altitude / temperature → longer take-off and landing, lower climb.",
          "Headwind reduces the required distance; tailwind increases it (often heavily penalised on landing).",
          "Higher mass → longer ground runs and reduced climb; best-range and best-endurance speeds shift with mass.",
        ],
      },
      {
        heading: "📐 Key formulas (graph work)",
        points: [
          "Ground distance from air distance: GNM = ANM + [time × (+TW or −HW)] ÷ 60.",
          "Alternative: GNM = ANM × GS ÷ TAS  (get TAS from the graph, then GS = TAS ± wind).",
          "Climb gradient from rate of climb: % gradient = ROC × 0.9868 ÷ TAS.",
          "ISA deviation = OAT − ISA temp (range increases ~1 nm per °C above ISA, decreases per °C below).",
          "Runway factors (CAP 698): dry grass ×1.2, wet grass ×1.3, take-off required ×1.25, landing required ×1.43; slope 1% ×1.05, 1.5% ×1.075, 2% ×1.1.",
        ],
      },
    ],
    mustKnow: [
      "Enter take-off/landing charts with pressure altitude, temperature, mass, wind (and slope).",
      "High/hot/heavy → longer runs, lower climb.",
      "Headwind shortens, tailwind lengthens the required distance.",
      "Apply chart corrections in the specified order.",
    ],
    traps: [
      "Read pressure altitude (1013 set), not indicated altitude, into the graphs.",
      "Graph-plotting practice needs the performance manual — loaded next.",
    ],
  },
  {
    sectionId: "A.4.10",
    title: "MEP Performance Data (CAP 698)",
    intro:
      "Multi-engine piston performance adds the engine-failure case: asymmetric thrust, the critical engine, and minimum control speed. Know these concepts; the numerical graph drills come with the manual.",
    blocks: [
      {
        heading: "1. The critical engine & Vmc",
        points: [
          "On a conventional twin, both propellers turning clockwise (seen from behind), the descending blade of the RIGHT engine produces more thrust and a longer moment arm — so the LEFT engine is the 'critical' engine (its failure is most adverse). This is asymmetric blade effect (P-factor).",
          "VMCA (minimum control speed, air): the slowest speed at which directional control can be maintained with the critical engine inoperative and take-off power on the other — below it, the aircraft cannot be held straight.",
          "A failed engine's windmilling propeller adds drag and yaw; feathering it reduces drag markedly.",
        ],
      },
      {
        heading: "2. Engine-inoperative performance",
        points: [
          "With one engine out, climb performance falls dramatically (much more than 50%) because of the extra drag and asymmetry.",
          "Single-engine ceiling and drift-down define how high the aircraft can stay on one engine.",
          "Take-off, climb, cruise and landing graphs are read like the SEP charts but include the engine-out case and Vmc limits.",
        ],
      },
    ],
    mustKnow: [
      "Critical engine (conventional twin) = the LEFT engine, due to asymmetric blade effect (P-factor).",
      "VMCA = slowest speed to keep straight with the critical engine out and full power on the live engine.",
      "Feather a failed prop to cut drag; a windmilling prop adds drag and yaw.",
      "Losing one of two engines cuts climb performance far more than half.",
    ],
    traps: [
      "On a conventional twin the LEFT engine is critical — not the right.",
      "One engine out ≠ half performance — climb falls much more.",
    ],
  },
  {
    sectionId: "A.4.11",
    title: "Specific Performance & Cruise Control",
    intro:
      "Cruise efficiency comes down to two ratios: distance per unit fuel (specific range) and time per unit fuel (specific endurance). Know which speed maximises each, how weight and wind shift them, and what SFC means.",
    blocks: [
      {
        heading: "1. Specific range vs endurance",
        points: [
          "Specific range = NM per unit fuel — best near the max-L/D (minimum-drag) speed for a piston aircraft; it is what matters for getting the most distance.",
          "Specific endurance = time per unit fuel — best at the minimum-fuel-flow (minimum-power) speed, slower than the range speed.",
          "Specific Fuel Consumption (SFC) = fuel burned per unit of power (or thrust) per hour; a lower SFC is a more efficient engine.",
        ],
      },
      {
        heading: "2. Weight & wind effects",
        points: [
          "Heavier aircraft needs more lift → more drag → higher fuel flow → LESS specific range. As fuel burns off, range improves — hence step climbs / cruise control.",
          "Wind changes RANGE (ground NM per unit fuel) but NOT endurance (time aloft per unit fuel is wind-independent).",
          "A headwind reduces specific range; adjust the cruise speed slightly for the best ground miles per unit fuel.",
        ],
      },
    ],
    mustKnow: [
      "Specific range = NM/fuel; specific endurance = time/fuel.",
      "Range improves as the aircraft gets lighter.",
      "Wind affects range, not endurance.",
    ],
    traps: [
      "Endurance speed is slower than range speed — don't confuse them.",
      "SFC is per unit POWER/THRUST, not total fuel carried.",
    ],
  },
  {
    sectionId: "A.4.12",
    title: "Mass & Balance",
    intro:
      "Mass and balance is the numerical heart of Flight Planning: every load has a moment, and the aircraft is only safe to fly when the total mass and the centre of gravity both sit inside the limits. Master the moment method, %MAC and CG-movement calculations — they are guaranteed exam marks.",
    blocks: [
      {
        heading: "📐 Key formulas",
        points: [
          "Moment = Mass × Arm (arm is the distance from the datum).",
          "CG = Total Moment ÷ Total Mass  (ΣMoment / ΣMass).",
          "% MAC = (CG − LEMAC) ÷ MAC × 100.",
          "CG shift when a load is ADDED/REMOVED: ΔCG = load × (load arm − old CG) ÷ new total mass.",
          "CG shift when a load is MOVED: ΔCG = load moved × distance moved ÷ total mass.",
          "Load to shift for a required ΔCG: load = total mass × ΔCG ÷ distance shifted.",
          "Fuel to load to move the CG: fuel = total × CG diff ÷ (station diff − CG diff).",
          "Fuel mass = volume × specific gravity (litres × SG = kg). 1 US gal = 3.785 L, 1 IMP gal = 4.546 L, 1 IMP gal = 1.2 US gal.",
        ],
      },
      {
        heading: "✍ Worked example — % MAC",
        points: [
          "Given: LEMAC = 14 m, MAC = 4.6 m, CG = 15.15 m.",
          "% MAC = (15.15 − 14) ÷ 4.6 × 100 = 1.15 ÷ 4.6 × 100 = 25%.",
          "So the CG lies at 25% of the mean aerodynamic chord — well inside a typical 15–35% range.",
        ],
      },
      {
        heading: "✍ Worked example — fuel to move the CG",
        points: [
          "Given: mass 47 800 kg, CG at 30% MAC, want 23% MAC; LEMAC 16 m, TEMAC 19.5 m (MAC 3.5 m); tank arm 16 m; fuel SG 0.72.",
          "CG₁ = 16 + 30×3.5/100 = 17.05 m;  CG₂ = 16 + 23×3.5/100 = 16.805 m.",
          "Fuel = 47 800 × (17.05 − 16.805) ÷ [(17.05 − 16) − (17.05 − 16.805)] = 47 800 × 0.245 ÷ 0.805 = 14 548 kg.",
          "= 14 548 ÷ 0.72 = 20 205 L = 5 338 US gal = 4 448 IMP gal.",
        ],
      },
      {
        heading: "The masses (know the ladder)",
        points: [
          "Basic Empty Mass (BEM) → + operational items = Dry Operating Mass (DOM).",
          "DOM + traffic load (payload) = Zero Fuel Mass (ZFM) — must not exceed MZFM.",
          "ZFM + take-off fuel = Take-Off Mass (TOM) — must not exceed MTOM.",
          "TOM − trip fuel = Landing Mass — must not exceed MLM.",
          "Traffic load = ZFM − DOM; the allowed traffic load is limited by the most restrictive of MZFM, MTOM and MLM.",
        ],
      },
    ],
    mustKnow: [
      "Moment = mass × arm; CG = ΣMoment ÷ ΣMass.",
      "% MAC = (CG − LEMAC) ÷ MAC × 100.",
      "CG movement (load added) = load × (arm − CG) ÷ new total mass.",
      "Fuel mass = litres × SG; 1 IMP gal = 1.2 US gal = 4.546 L.",
      "Mass ladder: BEM → DOM → ZFM → TOM → Landing Mass, each capped by its max.",
    ],
    traps: [
      "Loads FORWARD of the datum have a negative arm (negative moment); AFT loads are positive.",
      "% MAC uses LEMAC (leading edge), not the datum.",
      "Convert fuel volume to MASS with SG before adding it to the moment sheet.",
      "The allowed traffic load is the LOWEST of the ZFM-, TOM- and LM-derived limits, not just MZFM − DOM.",
    ],
  },
  {
    sectionId: "A.4.13",
    title: "Flight Planning General (PET / PSR & Fuel)",
    intro:
      "This is the classic navigation-numeracy of flight planning: the Point of Equal Time (Critical Point), the Point of Safe Return (Point of No Return), and the fuel plan. Learn the three formulas and the difference between them — a PET is about TIME to a decision point, a PSR is about the FUEL to get home.",
    blocks: [
      {
        heading: "📐 Key formulas",
        points: [
          "Point of Equal Time (PET / Critical Point): distance from departure = D × H ÷ (O + H), where O = groundspeed ON (out) and H = groundspeed HOME (back).",
          "Time to the PET = PET distance ÷ O.",
          "Point of Safe Return (PSR / PNR): distance = Endurance × O × H ÷ (O + H).",
          "Groundspeed = TAS ± wind component (+ tailwind, − headwind).",
          "Ground distance from air distance: GNM = ANM × GS ÷ TAS  (or GNM = ANM + [time × wind]/60).",
          "Safe endurance = usable fuel ÷ fuel flow (leave the fixed reserve OUT of the PSR endurance).",
        ],
      },
      {
        heading: "✍ Worked example — PET",
        points: [
          "Given: TAS 300 kt, still-air distance A→B 500 nm, wind 60 kt HEAD on the way out.",
          "O (out) = 300 − 60 = 240 kt;  H (home) = 300 + 60 = 360 kt.",
          "PET = 500 × 360 ÷ (240 + 360) = 180 000 ÷ 600 = 300 nm from A.",
          "Note the PET is DOWNWIND of half-way, because you fly slower outbound.",
        ],
      },
      {
        heading: "✍ Worked example — PSR",
        points: [
          "Given: GS out 435 kt, GS back 385 kt, safe endurance 9 h.",
          "PSR = 9 × 435 × 385 ÷ (435 + 385) = 9 × 167 475 ÷ 820 ≈ 1 838 nm from the departure point.",
          "Beyond this distance you no longer have the fuel to return to your start point.",
        ],
      },
    ],
    mustKnow: [
      "PET = D × H ÷ (O + H); it is a TIME/decision point (independent of endurance).",
      "PSR = Endurance × O × H ÷ (O + H); it is a FUEL/return point.",
      "O = groundspeed out, H = groundspeed home; GS = TAS ± wind component.",
      "GNM = ANM × GS ÷ TAS.",
    ],
    traps: [
      "PET does NOT depend on endurance; PSR does.",
      "With a headwind OUT, the PET moves BEYOND the half-way point (toward the destination).",
      "Use SAFE endurance (usable fuel minus the fixed reserve) for the PSR.",
      "Keep O and H consistent — both as groundspeeds, not TAS.",
    ],
  },
];

export function getFPPNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  return FPP_NOTES.find((n) => n.sectionId === sectionId);
}
