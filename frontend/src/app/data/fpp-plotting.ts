// ============================================================================
// SACAA CPL — FLIGHT PLANNING & PERFORMANCE: GRAPH-PLOTTING PRACTICE
// Worked plotting exercises for the SEP/MEP performance graphs (CAP 697/698).
//
// IMPORTANT (copyright): the CAP 697/698 graphs are UK CAA Crown-copyright and
// are NOT reproduced here. Each exercise gives the scenario, the exact plotting
// METHOD (the red-line path), and the deduced value. The student plots on their
// OWN CAP manual — which SACAA candidates use in the exam anyway. The on-screen
// graphs are ORIGINAL redrawn replicas (real axis scales/values + gridded), not
// scans of the CAP artwork. Worked-example values are anchored to the manual;
// other reads are calibrated — always confirm the exact figure on your manual.
// ============================================================================

import type { GraphSpec } from "@/app/components/GraphSolve";
import type { CarpetSpec } from "@/app/components/CarpetPlot";

export type PlotDiagram = "takeoff" | "landing" | "climb" | "cruise";

export interface PlottingQuestion {
  id: string;
  sectionId: string; // A.4.9 / A.4.10 / A.4.11
  graphRef: string; // which CAP figure to open in the manual
  diagram: PlotDiagram; // which original method schematic to show
  given: string[]; // the scenario
  ask: string; // what to find
  steps: string[]; // the red-line plotting method, in order
  answer: string; // deduced value (confirm on manual)
  difficulty: "easy" | "medium" | "hard";
  graph?: GraphSpec; // single-panel gridded replica (climb/cruise curves)
  carpet?: CarpetSpec; // faithful multi-panel CAP 698 distance carpet
}

export const FPP_PLOTTING: PlottingQuestion[] = [
  // ===== A.4.9 — SEP1 (CAP 698) =====
  {
    id: "PLOT-49-001",
    sectionId: "A.4.9",
    graphRef: "CAP 698 · SEP1 · Figure 2.1 — Take-off distance (flaps up)",
    diagram: "takeoff",
    // The manual's own worked example on Figure 2.1 — exact anchor values.
    given: [
      "OAT: +15 °C",
      "Pressure altitude: 5 653 ft",
      "Take-off mass: 3 650 lb",
      "Wind: 10 kt headwind",
      "Flaps up, paved / level / dry runway",
    ],
    ask: "Find the total take-off distance over a 50 ft obstacle.",
    steps: [
      "Enter the OAT axis at +15 °C and go UP to the 5 653 ft pressure-altitude curve (interpolate between 4 000 and 6 000 ft).",
      "Go RIGHT to the mass reference line.",
      "Follow the mass guide curves to 3 650 lb, then carry on to the wind reference line.",
      "From the wind reference, follow the HEADWIND guide (headwind shortens the distance) for 10 kt.",
      "Follow the obstacle guides to the 50 ft height, then read across to the DISTANCE axis.",
    ],
    answer: "≈ 3 450 ft over a 50 ft obstacle (ground roll ≈ 1 900 ft). Manual worked example — Figure 2.1.",
    difficulty: "medium",
    carpet: {
      variant: "takeoff",
      distanceMax: 8000,
      oatC: 15,
      massLb: 3650,
      windKt: 10, // 10 kt headwind
      paLevelFt: 2050, // OAT 15 °C up to the 5 653 ft PA curve
      afterMassFt: 2050, // 3 650 lb sits on the mass reference line (no change)
      groundRollFt: 1900, // 10 kt headwind shortens it → manual's 1 900 ft ground roll
      totalFt: 3450, // parallel the obstacle grid to 50 ft → manual's 3 450 ft
      readout: "≈ 3 450 ft",
    },
  },
  {
    id: "PLOT-49-002",
    sectionId: "A.4.9",
    graphRef: "CAP 698 · SEP1 · Figure 2.1 — Take-off distance (flaps up)",
    diagram: "takeoff",
    given: ["OAT: +30 °C (ISA +15 at SL)", "Pressure altitude: sea level", "Take-off mass: 3 650 lb (max)", "Wind: 10 kt tailwind", "Flaps up, paved / level / dry"],
    ask: "Find the take-off distance and note the tailwind effect.",
    steps: [
      "Enter the OAT axis at +30 °C, up to the sea-level pressure-altitude curve.",
      "Right to the mass reference; follow the guides to 3 650 lb.",
      "At the wind reference, follow the TAILWIND guide (tailwind LENGTHENS the distance, heavily penalised) for 10 kt.",
      "Follow the obstacle guides to 50 ft and read across to the DISTANCE axis.",
    ],
    answer: "≈ 2 600 ft — markedly longer than the same case with a headwind. Calibrated read; confirm on your CAP 698.",
    difficulty: "hard",
    carpet: {
      variant: "takeoff",
      distanceMax: 8000,
      oatC: 30,
      massLb: 3650,
      windKt: -10, // 10 kt TAILWIND
      paLevelFt: 1850, // OAT 30 °C up to the sea-level PA curve
      afterMassFt: 1850, // 3 650 lb on the mass reference line
      groundRollFt: 2000, // tailwind LENGTHENS the ground roll
      totalFt: 2600, // parallel the obstacle grid to 50 ft
      readout: "≈ 2 600 ft",
    },
  },
  {
    id: "PLOT-49-003",
    sectionId: "A.4.9",
    graphRef: "CAP 698 · SEP1 · Figure 2.4 — Landing distance",
    diagram: "landing",
    given: ["OAT: +20 °C", "Pressure altitude: 2 000 ft", "Landing mass: 3 400 lb", "Wind: 8 kt headwind", "Flaps landing, paved / dry"],
    ask: "Find the landing distance from 50 ft.",
    steps: [
      "Enter the OAT axis at +20 °C and go up to the 2 000 ft pressure-altitude curve.",
      "Right to the mass reference; follow the guides to 3 400 lb.",
      "At the wind reference, apply the 8 kt HEADWIND guide (shortens the landing).",
      "Follow the obstacle guides to 50 ft and read across to the DISTANCE axis.",
    ],
    answer: "≈ 1 500 ft from 50 ft. Calibrated read; confirm on your CAP 698 Fig 2.4.",
    difficulty: "medium",
    carpet: {
      variant: "landing",
      distanceMax: 6000,
      oatC: 20,
      massLb: 3400,
      windKt: 8, // 8 kt headwind
      paLevelFt: 1500, // OAT 20 °C up to the 2 000 ft PA curve
      afterMassFt: 1200, // 3 400 lb is lighter than max → parallel the grid down
      groundRollFt: 1050, // 8 kt headwind shortens the landing
      totalFt: 1500, // parallel the obstacle grid to 50 ft
      readout: "≈ 1 500 ft",
    },
  },
  {
    id: "PLOT-49-004",
    sectionId: "A.4.9",
    graphRef: "CAP 698 · SEP1 · Figure 2.3 — Climb",
    diagram: "climb",
    given: ["Pressure altitude: 4 000 ft", "OAT: +10 °C", "Mass: 3 400 lb", "Speed: best rate of climb (Vy)"],
    ask: "Find the rate of climb available.",
    steps: [
      "Enter the climb graph at the mass on the bottom axis (3 400 lb).",
      "Go UP to the 4 000 ft pressure-altitude curve.",
      "Read ACROSS to the rate-of-climb axis.",
    ],
    answer: "≈ 650 ft/min. Calibrated read; confirm on your CAP 698 Fig 2.3.",
    difficulty: "medium",
    graph: {
      x: { label: "Mass (lb)", min: 2800, max: 3650, step: 200 },
      y: { label: "Rate of climb (ft/min)", min: 300, max: 1000, step: 100 },
      curves: [
        { label: "SL", pts: [[2800, 960], [3200, 870], [3400, 820], [3650, 760]] },
        { label: "4 000 ft", pts: [[2800, 800], [3200, 710], [3400, 650], [3650, 590]] },
        { label: "8 000 ft", pts: [[2800, 640], [3200, 540], [3400, 490], [3650, 440]] },
      ],
      // 3 400 lb up to the 4 000 ft curve, then left to the RoC axis
      red: [[3400, 300], [3400, 650], [2800, 650]],
      readout: "≈ 650 ft/min",
    },
  },
  {
    id: "PLOT-49-005",
    sectionId: "A.4.9",
    graphRef: "CAP 697 · SEP1 · Figure 2.4 — Range profile",
    diagram: "cruise",
    given: ["Mass: 3 663 lb before engine start", "Cruise altitude: 11 500 ft", "Power: full throttle / 2 500 rpm", "Sea-level departure, zero wind, ISA", "Range includes cruise climb + reserve at economy cruise"],
    ask: "Find the still-air range.",
    steps: [
      "Enter Figure 2.4 at the cruise pressure altitude (11 500 ft).",
      "Move across to the full-throttle / 2 500 rpm power condition.",
      "Drop vertically to read the still-air range.",
    ],
    answer: "Range = 866 NM — CAP 697 Fig 2.4 worked example (verified against the manual).",
    difficulty: "medium",
    graph: {
      x: { label: "Pressure altitude — ft", min: 0, max: 14000, step: 2000 },
      y: { label: "Still-air range — NM", min: 600, max: 1000, step: 100 },
      curves: [
        { label: "FT / 2 500 rpm", pts: [[0, 742], [6000, 812], [11500, 866], [14000, 892]] },
        { label: "economy", pts: [[0, 804], [6000, 872], [11500, 922], [14000, 946]] },
      ],
      red: [[11500, 600], [11500, 866], [0, 866]],
      readout: "866 NM",
    },
  },
  {
    id: "PLOT-49-006",
    sectionId: "A.4.9",
    graphRef: "CAP 697 · SEP1 · Figure 2.5 — Endurance profile",
    diagram: "cruise",
    given: ["Mass: 3 663 lb before engine start", "Cruise altitude: 11 500 ft", "Power: full throttle / 2 500 rpm", "Sea-level departure, ISA", "Endurance includes cruise climb + reserve at economy cruise"],
    ask: "Find the endurance.",
    steps: [
      "Enter Figure 2.5 at the cruise pressure altitude (11 500 ft).",
      "Move across to the full-throttle / 2 500 rpm power condition.",
      "Drop vertically to read the endurance.",
    ],
    answer: "Endurance = 5.4 hours (5 h 24 min) — CAP 697 Fig 2.5 worked example (verified against the manual).",
    difficulty: "medium",
    graph: {
      x: { label: "Pressure altitude — ft", min: 0, max: 14000, step: 2000 },
      y: { label: "Endurance — hours", min: 3, max: 7, step: 1 },
      curves: [
        { label: "FT / 2 500 rpm", pts: [[0, 4.6], [6000, 5.1], [11500, 5.4], [14000, 5.6]] },
        { label: "economy", pts: [[0, 5.2], [6000, 5.7], [11500, 6.0], [14000, 6.2]] },
      ],
      red: [[11500, 3], [11500, 5.4], [0, 5.4]],
      readout: "5.4 hr",
    },
  },
  // ===== A.4.10 — MEP1 (CAP 697) =====
  {
    id: "PLOT-410-001",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · Figure 3.1 — Climb (rate of climb & gradient)",
    diagram: "climb",
    given: ["Pressure altitude: 11 500 ft", "Weight: 3 600 lb", "TAS 120 kt (from the nav computer)", "Both engines operating"],
    ask: "Find the rate of climb (and the climb gradient).",
    steps: [
      "Calculate the TAS on the nav computer (120 kt).",
      "Enter Figure 3.1 at the pressure altitude (11 500 ft), across to the 3 600 lb mass, and read the rate of climb.",
      "Parallel the grid to the TAS to read the climb gradient on the right axis.",
    ],
    answer: "Graphical ROC = 515 fpm; TAS 120 kt; climb gradient 4.2% — CAP 698 Fig 3.1 worked example (verified against the manual).",
    difficulty: "hard",
    graph: {
      x: { label: "Pressure altitude — ft", min: 0, max: 16000, step: 2000 },
      y: { label: "Rate of climb — fpm", min: 0, max: 2000, step: 400 },
      curves: [
        { label: "3 600 lb", pts: [[0, 1200], [6000, 850], [11500, 515], [16000, 250]] },
        { label: "light", pts: [[0, 1450], [6000, 1080], [11500, 720], [16000, 430]] },
      ],
      red: [[11500, 0], [11500, 515], [0, 515]],
      readout: "515 fpm",
    },
  },
  {
    id: "PLOT-410-002",
    sectionId: "A.4.10",
    graphRef: "CAP 697 · MEP1 · Figure 3.2 — Range at standard temperatures",
    diagram: "cruise",
    given: ["Usable fuel: 123 gal (4 750 lb)", "Cruise altitude: 16 500 ft", "Climb at max continuous power; descent 1 000 fpm / 145 kt IAS, no wind", "4.2 gal for start/taxi/take-off; range includes climb & descent"],
    ask: "Find the still-air range, with and without reserve.",
    steps: [
      "Enter Figure 3.2 at the left axis with the cruise pressure altitude (16 500 ft).",
      "Move across to the power/temperature condition.",
      "Drop vertically to read the still-air range (with and without reserve).",
    ],
    answer: "Range = 942 NM (with reserve) / 1 060 NM (no reserve) — CAP 697 Fig 3.2 worked example (verified against the manual).",
    difficulty: "hard",
    graph: {
      x: { label: "Pressure altitude — ft", min: 0, max: 20000, step: 4000 },
      y: { label: "Still-air range — NM", min: 600, max: 1200, step: 100 },
      curves: [
        { label: "no reserve", pts: [[0, 940], [8000, 1005], [16500, 1060], [20000, 1085]] },
        { label: "with reserve", pts: [[0, 822], [8000, 888], [16500, 942], [20000, 965]] },
      ],
      red: [[16500, 600], [16500, 942], [0, 942]],
      readout: "942 NM (reserve)",
    },
  },

  // ===== A.4.12 — MASS & BALANCE (CAP 696) =====
  {
    id: "PLOT-412-001",
    sectionId: "A.4.12",
    graphRef: "CAP 696 · SEP1 · Figure 2.5 — Centre of Gravity Envelope",
    diagram: "cruise",
    given: [
      "SEP1: BEM 2 415 lb, BEM moment ÷100 = 1 876.46 (CG 77.7 in)",
      "Two front-seat occupants: 360 lb at arm 79 in",
      "Fuel: 50 US gal = 300 lb at arm 75 in (moment ÷100 = 225)",
      "Datum 39 in fwd of firewall; CG limits fwd 74.0–80.4 in, aft 87.7 in; MTOM 3 650 lb",
    ],
    ask: "Find the take-off mass and CG, and confirm it lies inside the envelope.",
    steps: [
      "Zero-Fuel: mass = 2 415 + 360 = 2 775 lb; moment ÷100 = 1 876.46 + (360×79÷100 = 284.4) = 2 160.86; CG = 216 086 ÷ 2 775 = 77.9 in.",
      "Take-off: add fuel → mass = 2 775 + 300 = 3 075 lb; moment ÷100 = 2 160.86 + 225 = 2 385.86; CG = 238 586 ÷ 3 075 = 77.6 in.",
      "Plot the 3 075 lb / 77.6 in point on Figure 2.5 — it must fall inside the envelope (fwd limit at this mass ≈ 75 in, aft 87.7 in).",
    ],
    answer: "TOM ≈ 3 075 lb, CG ≈ 77.6 in — inside the envelope. Confirm on your CAP 696 Fig 2.5.",
    difficulty: "hard",
    graph: {
      x: { label: "CG — inches aft of datum", min: 68, max: 92, step: 2 },
      y: { label: "Weight — lb", min: 2000, max: 3800, step: 200 },
      curves: [
        { label: "Fwd limit", pts: [[74, 2100], [74, 2350], [80.4, 3650]] },
        { label: "Aft limit", pts: [[87.7, 2100], [87.7, 3650]] },
        { label: "MTOM 3 650", pts: [[80.4, 3650], [87.7, 3650]] },
      ],
      // plot the take-off point: up the 77.6 in line to 3 075 lb
      red: [[77.6, 2000], [77.6, 3075]],
      readout: "TOM 3 075 lb @ 77.6 in ✓",
    },
  },
  {
    id: "PLOT-412-002",
    sectionId: "A.4.12",
    graphRef: "CAP 696 · SEP1 · Figure 2.5 — Centre of Gravity Envelope",
    diagram: "cruise",
    given: [
      "SEP1 loaded to MTOM 3 650 lb",
      "Baggage Zone C (arm 180 in) is loaded heavily",
      "Resulting CG works out to 88.5 in aft of datum",
    ],
    ask: "Plot 3 650 lb / 88.5 in — is the aircraft legal for take-off?",
    steps: [
      "Enter the envelope at CG 88.5 in on the bottom axis and go up to 3 650 lb.",
      "The point lies to the RIGHT of the aft limit line (87.7 in).",
      "The CG is beyond the aft limit → NOT legal. Move load forward (reduce Zone C, add to Zone A/front) and re-check.",
    ],
    answer: "Outside the envelope (aft of the 87.7 in limit) — NOT legal; shift load forward.",
    difficulty: "hard",
    graph: {
      x: { label: "CG — inches aft of datum", min: 68, max: 92, step: 2 },
      y: { label: "Weight — lb", min: 2000, max: 3800, step: 200 },
      curves: [
        { label: "Fwd limit", pts: [[74, 2100], [74, 2350], [80.4, 3650]] },
        { label: "Aft limit", pts: [[87.7, 2100], [87.7, 3650]] },
        { label: "MTOM 3 650", pts: [[80.4, 3650], [87.7, 3650]] },
      ],
      red: [[88.5, 2000], [88.5, 3650]],
      readout: "88.5 in → aft of limit ✗",
    },
  },
  {
    id: "PLOT-412-003",
    sectionId: "A.4.12",
    graphRef: "CAP 696 · MEP1 · Figure 3.3 — Centre of Gravity Envelope",
    diagram: "cruise",
    given: [
      "MEP1 example loading manifest (Fig 3.2): Take-off Mass 4 748 lb",
      "Take-off moment ÷100 = 4 458.14 → CG = 445 814 ÷ 4 748 = 93.9 in",
      "Datum 78.4 in; CG limits fwd 82.0–90.8 in, aft 94.6 in; MSTOM 4 750 lb",
    ],
    ask: "Plot the take-off point and confirm the CG is within limits.",
    steps: [
      "Enter the envelope at CG 93.9 in and go up to 4 748 lb.",
      "Check against the aft limit (94.6 in) and the fwd limit (≈90.8 in at this mass).",
      "93.9 in lies between the limits → within the envelope. Re-check the landing CG after fuel burn the same way.",
    ],
    answer: "TOM 4 748 lb, CG 93.9 in — inside the envelope (fwd 90.8 / aft 94.6). Confirm on CAP 696 Fig 3.3.",
    difficulty: "hard",
    graph: {
      x: { label: "CG — inches aft of datum", min: 80, max: 96, step: 2 },
      y: { label: "Weight — lb", min: 3000, max: 4800, step: 200 },
      curves: [
        { label: "Fwd limit", pts: [[82, 3200], [82, 3400], [90.8, 4750]] },
        { label: "Aft limit", pts: [[94.6, 3200], [94.6, 4750]] },
        { label: "MTOM 4 750", pts: [[90.8, 4750], [94.6, 4750]] },
      ],
      red: [[93.9, 3000], [93.9, 4748]],
      readout: "TOM 4 748 lb @ 93.9 in ✓",
    },
  },

  // ===== A.4.10 — MEP1 take-off / accelerate-stop / landing (CAP 698) =====
  {
    id: "PLOT-410-003",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · Figure 3.1 — Take-off (Normal Procedure, flaps up)",
    diagram: "takeoff",
    given: ["OAT +21 °C", "Pressure altitude 2 000 ft", "Take-off mass 3 969 lb", "Headwind 9 kt", "Paved, level, dry"],
    ask: "Find the take-off distance over a 50 ft obstacle.",
    steps: [
      "Enter at OAT +21 °C, go up to the 2 000 ft pressure-altitude curve.",
      "Across to the 3 969 lb mass reference line, then to the 9 kt headwind line.",
      "Continue to the ground-roll reference line and read the take-off distance over 50 ft (ground roll ≈ 1 350 ft; TOD ≈ 1 650 ft).",
    ],
    answer: "Ground roll ≈ 1 350 ft, take-off distance over 50 ft ≈ 1 650 ft. Confirm on CAP 698 Fig 3.1.",
    difficulty: "hard",
    graph: {
      x: { label: "Take-off mass — lb", min: 3000, max: 4800, step: 300 },
      y: { label: "TOD over 50 ft — ft", min: 500, max: 3500, step: 500 },
      curves: [
        { label: "SL", pts: [[3000, 980], [3969, 1380], [4750, 1950]] },
        { label: "2 000 ft", pts: [[3000, 1180], [3969, 1650], [4750, 2300]] },
        { label: "4 000 ft", pts: [[3000, 1420], [3969, 2000], [4750, 2780]] },
      ],
      red: [[3969, 500], [3969, 1650], [3000, 1650]],
      readout: "TOD ≈ 1 650 ft",
    },
  },
  {
    id: "PLOT-410-004",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · Figure 3.2 — Accelerate/Stop Distance (flaps 0°)",
    diagram: "takeoff",
    given: ["OAT +21 °C", "Pressure altitude 2 000 ft", "Take-off mass 3 970 lb", "Headwind 9 kt", "Max braking, engine failure at V1"],
    ask: "Find the accelerate-stop distance (ASD).",
    steps: [
      "Enter at OAT +21 °C, up to the 2 000 ft pressure-altitude curve.",
      "Across to the 3 970 lb mass line, then to the 9 kt headwind line.",
      "Read the accelerate-stop distance (≈ 3 280 ft). Note: reduce by 7% if heavy-duty brakes are fitted.",
    ],
    answer: "ASD ≈ 3 280 ft. Confirm on CAP 698 Fig 3.2.",
    difficulty: "hard",
    graph: {
      x: { label: "Take-off mass — lb", min: 3000, max: 4800, step: 300 },
      y: { label: "Accelerate-stop distance — ft", min: 2000, max: 6000, step: 1000 },
      curves: [
        { label: "SL", pts: [[3000, 2300], [3970, 2900], [4750, 3900]] },
        { label: "2 000 ft", pts: [[3000, 2600], [3970, 3280], [4750, 4400]] },
        { label: "4 000 ft", pts: [[3000, 3050], [3970, 3850], [4750, 5150]] },
      ],
      red: [[3970, 2000], [3970, 3280], [3000, 3280]],
      readout: "ASD ≈ 3 280 ft",
    },
  },
  {
    id: "PLOT-410-005",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · Figure 3.3 — Take-off (Maximum Effort / short field, flaps 25°)",
    diagram: "takeoff",
    given: ["OAT +21 °C", "Pressure altitude 2 000 ft", "Take-off mass 4 250 lb", "Headwind 9 kt", "Flaps 25°, max-effort technique"],
    ask: "Find the max-effort take-off distance over a 50 ft obstacle.",
    steps: [
      "Enter at OAT +21 °C, up to the 2 000 ft pressure-altitude curve.",
      "Across to the 4 250 lb mass line, then to the 9 kt headwind line.",
      "Read ground roll (≈ 800 ft) and take-off distance over 50 ft (≈ 1 050 ft) — far shorter than the flaps-up normal take-off.",
    ],
    answer: "Ground roll ≈ 800 ft, TOD over 50 ft ≈ 1 050 ft. Confirm on CAP 698 Fig 3.3.",
    difficulty: "hard",
    graph: {
      x: { label: "Take-off mass — lb", min: 3000, max: 4800, step: 300 },
      y: { label: "TOD over 50 ft — ft", min: 500, max: 2000, step: 250 },
      curves: [
        { label: "SL", pts: [[3000, 620], [4250, 920], [4750, 1050]] },
        { label: "2 000 ft", pts: [[3000, 700], [4250, 1050], [4750, 1210]] },
        { label: "4 000 ft", pts: [[3000, 820], [4250, 1240], [4750, 1430]] },
      ],
      red: [[4250, 500], [4250, 1050], [3000, 1050]],
      readout: "TOD ≈ 1 050 ft",
    },
  },
  {
    id: "PLOT-410-006",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · Figure 3.4 — Accelerate/Stop Distance (flaps 25°)",
    diagram: "takeoff",
    given: ["OAT +22 °C", "Pressure altitude 3 000 ft", "Take-off mass 4 000 lb", "Headwind 10 kt", "Flaps 25°, max braking"],
    ask: "Find the accelerate-stop distance (flaps 25°).",
    steps: [
      "Enter at OAT +22 °C, up to the 3 000 ft pressure-altitude curve.",
      "Across to the 4 000 lb mass line, then to the 10 kt headwind line.",
      "Read the accelerate-stop distance (≈ 2 100 ft). Reduce 13% if heavy-duty brakes are fitted.",
    ],
    answer: "ASD ≈ 2 100 ft. Confirm on CAP 698 Fig 3.4.",
    difficulty: "hard",
    graph: {
      x: { label: "Take-off mass — lb", min: 3000, max: 4800, step: 300 },
      y: { label: "Accelerate-stop distance — ft", min: 1000, max: 4000, step: 500 },
      curves: [
        { label: "SL", pts: [[3000, 1550], [4000, 1950], [4750, 2550]] },
        { label: "3 000 ft", pts: [[3000, 1700], [4000, 2100], [4750, 2800]] },
        { label: "5 000 ft", pts: [[3000, 1900], [4000, 2380], [4750, 3200]] },
      ],
      red: [[4000, 1000], [4000, 2100], [3000, 2100]],
      readout: "ASD ≈ 2 100 ft",
    },
  },
  {
    id: "PLOT-410-007",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · Figure 3.10 — Landing Distance (short field)",
    diagram: "landing",
    given: ["OAT +22 °C", "Pressure altitude 3 000 ft", "Headwind 10 kt", "Gross mass 3 650 lb", "Flaps 40°, full-stall touchdown, max braking"],
    ask: "Find the total landing distance over a 50 ft barrier, and the barrier speed.",
    steps: [
      "Enter at OAT +22 °C, up to the 3 000 ft pressure-altitude curve.",
      "Across to the 3 650 lb mass line, then to the 10 kt headwind line; read the ground roll (≈ 1 110 ft).",
      "Continue to the barrier reference line for the total landing distance over 50 ft (≈ 1 825 ft); read barrier speed ≈ 74 kt from the mass line.",
    ],
    answer: "Total over 50 ft = 1 825 ft (graphical) — CAP 698 Fig 3.10 short-field landing worked example (verified). Ground roll ≈ 1 110 ft.",
    difficulty: "hard",
    graph: {
      x: { label: "Gross mass — lb", min: 3000, max: 4600, step: 200 },
      y: { label: "Landing distance over 50 ft — ft", min: 500, max: 3500, step: 500 },
      curves: [
        { label: "SL", pts: [[3000, 1450], [3650, 1680], [4513, 2050]] },
        { label: "3 000 ft", pts: [[3000, 1580], [3650, 1825], [4513, 2230]] },
        { label: "6 000 ft", pts: [[3000, 1740], [3650, 2010], [4513, 2460]] },
      ],
      red: [[3650, 500], [3650, 1825], [3000, 1825]],
      readout: "Total ≈ 1 825 ft",
    },
  },

  // ===== A.4.10 — de-factoring take-off distances (CAP 698 MEP1 method) =====
  {
    id: "PLOT-410-008",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · §2.2 — Factorising take-off distance",
    diagram: "takeoff",
    given: [
      "Normal take-off, graphical TOD from Figure 3.1 = 1 650 ft",
      "Runway: wet grass (surface factor ×1.3)",
      "Slope: 1.5% uphill → ×1.075 (+5% per 1% upslope)",
      "Regulatory (JAR) factor ×1.15",
    ],
    ask: "Calculate the Take-off Distance Required (TODR).",
    steps: [
      "Apply the surface factor: 1 650 × 1.3 = 2 145 ft.",
      "Apply the slope factor: 2 145 × 1.075 = 2 306 ft.",
      "Apply the regulatory factor: 2 306 × 1.15 = 2 652 ft.",
      "Downslope is never factored; the same surface/slope factors apply to TORA and ASDA.",
    ],
    answer: "TODR = 1 650 × 1.3 × 1.075 × 1.15 ≈ 2 652 ft.",
    difficulty: "hard",
  },
  {
    id: "PLOT-410-009",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · §2.2 — Field-length-limited take-off mass",
    diagram: "takeoff",
    given: [
      "Max-effort short field; TORA 2 400 ft, ASDA 2 500 ft, TODA 2 600 ft",
      "Slope factor ×1.1, surface/condition ×1.2 (grass/dry)",
      "Regulation: TORA ×1.0, ASDA ×1.3, TODA ×1.15",
    ],
    ask: "Find the de-factored distances and the field-length-limited take-off mass.",
    steps: [
      "De-factor each by dividing out the factors: TORA 2 400 ÷ (1.1×1.2×1.0) = 1 818 ft.",
      "ASDA 2 500 ÷ (1.1×1.2×1.3) = 1 457 ft; TODA 2 600 ÷ (1.1×1.2×1.15) = 1 713 ft.",
      "The limiting (shortest) de-factored distance is ASDA 1 457 ft — enter the graph with 1 457 ft to read the field-length-limited TOM.",
    ],
    answer: "De-factored TORA 1 818 / ASDA 1 457 / TODA 1 713 ft → limiting 1 457 ft → field-length-limited TOM ≈ 4 000 lb.",
    difficulty: "hard",
  },

  // ===== A.4.9 — SEP1 time/fuel/distance to climb (CAP 697 Fig 2.1) =====
  {
    id: "PLOT-49-007",
    sectionId: "A.4.9",
    graphRef: "CAP 697 · SEP1 · Figure 2.1 — Time, Fuel and Distance to Climb",
    diagram: "climb",
    given: [
      "Aerodrome pressure altitude 5 653 ft, OAT +15 °C",
      "Cruise pressure altitude 11 500 ft, OAT −5 °C",
      "Initial climb mass 3 650 lb; climb speed 110 kt, full throttle 2 500 rpm",
    ],
    ask: "Find the time, fuel and distance for the climb.",
    steps: [
      "At the aerodrome: enter +15 °C, up to 5 653 ft, across to 3 650 lb, drop to read ≈ 6.5 min, 2.5 US gal, 12.5 NM.",
      "At top of climb: enter −5 °C, up to 11 500 ft, across to 3 650 lb, drop to read ≈ 18.0 min, 6.0 US gal, 36.0 NM.",
      "Subtract the aerodrome values from the top-of-climb values: 18.0−6.5, 6.0−2.5, 36.0−12.5.",
    ],
    answer: "Climb = 11.5 min, 3.5 US gal, 23.5 NM — CAP 697 Fig 2.1 worked example (verified against the manual).",
    difficulty: "hard",
    graph: {
      x: { label: "Outside air temperature — °C", min: -20, max: 40, step: 10 },
      y: { label: "Pressure altitude — ft (climb curves)", min: 0, max: 16000, step: 2000 },
      curves: [
        { label: "TOC 11 500 ft", pts: [[-20, 11500], [40, 11500]] },
        { label: "Aerodrome 5 653 ft", pts: [[-20, 5653], [40, 5653]] },
      ],
      red: [[-5, 0], [-5, 11500], [15, 11500], [15, 5653]],
      readout: "Δ = 11.5 min / 3.5 gal / 23.5 NM",
    },
  },

  // ===== A.4.10 — MEP1 climb performance & balked/normal landing (CAP 698) =====
  {
    id: "PLOT-410-010",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · Figure 3.6/3.7 — Take-off & Climb Performance (gear retracted)",
    diagram: "climb",
    given: ["OAT +10 °C", "Pressure altitude 10 000 ft", "Take-off mass 4 000 lb", "Gear up, flaps 0°, climb speed 92 kt IAS"],
    ask: "Find the all-engine and one-engine-inoperative rates of climb.",
    steps: [
      "Enter at OAT +10 °C, up to the 10 000 ft pressure-altitude line, across to the 4 000 lb mass curve.",
      "On the 2-engine grid read the all-engine rate of climb (≈ 1 650 fpm at take-off power).",
      "On the single-engine grid read the OEI rate of climb (≈ 300 fpm at take-off power; ≈ 220 fpm at MCP from Fig 3.7).",
    ],
    answer: "All-engine ≈ 1 650 fpm; OEI ≈ 300 fpm (take-off power) / 220 fpm (MCP). Confirm on CAP 698 Fig 3.6/3.7.",
    difficulty: "hard",
    graph: {
      x: { label: "Pressure altitude — ft", min: 0, max: 16000, step: 2000 },
      y: { label: "All-engine rate of climb — fpm", min: 400, max: 2600, step: 400 },
      curves: [
        { label: "3 500 lb", pts: [[0, 2500], [10000, 1850], [16000, 1250]] },
        { label: "4 000 lb", pts: [[0, 2300], [10000, 1650], [16000, 1050]] },
        { label: "4 750 lb", pts: [[0, 2050], [10000, 1380], [16000, 820]] },
      ],
      red: [[10000, 400], [10000, 1650], [0, 1650]],
      readout: "≈ 1 650 fpm (2-eng)",
    },
  },
  {
    id: "PLOT-410-011",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · Figure 3.8 — Balked Landing Climb Performance",
    diagram: "climb",
    given: ["OAT +22 °C", "Pressure altitude 3 000 ft", "Max landing mass 4 513 lb", "Take-off power, gear & flaps 40° down, 85 kt IAS (= 91 kt TAS)"],
    ask: "Find the rate of climb and convert it to a still-air climb gradient.",
    steps: [
      "Enter at OAT +22 °C, up to the 3 000 ft pressure-altitude line, across to read the rate of climb (≈ 810 fpm).",
      "Convert: Gradient % = (ROC fpm ÷ TAS kt) × (6000 ÷ 6080) = (810 ÷ 91) × (6000 ÷ 6080).",
      "= 8.78% — well above the 2.5% minimum balked-landing gradient.",
    ],
    answer: "ROC ≈ 810 fpm → gradient = (810 ÷ 91) × (6000 ÷ 6080) ≈ 8.78% (min required 2.5%). Confirm on CAP 698 Fig 3.8.",
    difficulty: "hard",
    graph: {
      x: { label: "Outside air temperature — °C", min: -20, max: 40, step: 10 },
      y: { label: "Rate of climb — fpm", min: 400, max: 1100, step: 100 },
      curves: [
        { label: "SL", pts: [[-20, 1080], [22, 900], [40, 820]] },
        { label: "3 000 ft", pts: [[-20, 990], [22, 810], [40, 730]] },
        { label: "6 000 ft", pts: [[-20, 900], [22, 720], [40, 640]] },
      ],
      red: [[22, 400], [22, 810], [-20, 810]],
      readout: "ROC ≈ 810 fpm → 8.78%",
    },
  },
  {
    id: "PLOT-410-012",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · Figure 3.9 — Landing Distance (Normal Procedure, flaps 40°)",
    diagram: "landing",
    given: ["OAT +22 °C", "Pressure altitude 3 000 ft", "Headwind 10 kt", "Gross mass 3 650 lb", "Full-stall touchdown, max braking, paved/dry"],
    ask: "Find the total landing distance over a 50 ft barrier and the barrier speed.",
    steps: [
      "Enter at OAT +22 °C, up to the 3 000 ft pressure-altitude curve, across to the 3 650 lb mass line, then the 10 kt headwind line.",
      "Read ground roll (≈ 1 120 ft) and total landing distance over 50 ft (≈ 2 220 ft); barrier speed ≈ 82 kt.",
      "Apply the landing factors for slope/surface/condition and the 1.43 regulatory factor to get the Landing Distance Required.",
    ],
    answer: "Total over 50 ft = 2 220 ft (graphical) — CAP 698 Fig 3.9 normal-landing worked example (verified). Ground roll ≈ 1 120 ft.",
    difficulty: "hard",
    graph: {
      x: { label: "Gross mass — lb", min: 3000, max: 4600, step: 200 },
      y: { label: "Landing distance over 50 ft — ft", min: 600, max: 3400, step: 400 },
      curves: [
        { label: "SL", pts: [[3000, 1950], [3650, 2080], [4513, 2480]] },
        { label: "3 000 ft", pts: [[3000, 2080], [3650, 2220], [4513, 2650]] },
        { label: "6 000 ft", pts: [[3000, 2230], [3650, 2380], [4513, 2840]] },
      ],
      red: [[3650, 600], [3650, 2220], [3000, 2220]],
      readout: "Total ≈ 2 220 ft",
    },
  },
  {
    id: "PLOT-410-013",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · §5.3 — Landing distance required (factoring)",
    diagram: "landing",
    given: [
      "Graphical landing distance from Figure 3.9 = 2 220 ft",
      "Slope 1% down → ×1.05; grass surface ×1.15; wet condition ×1.15",
      "Regulatory factor ×1.43 (landing must be ≤ 70% of LDA)",
    ],
    ask: "Calculate the Landing Distance Required (LDR).",
    steps: [
      "Multiply the graphical distance by each factor: 2 220 × 1.05 × 1.15 × 1.15 × 1.43.",
      "= 2 220 × 1.05 = 2 331; × 1.15 = 2 681; × 1.15 = 3 083; × 1.43 = 4 408 ft.",
      "Upslope is not factored for landing; the 1.43 regulatory factor is the 1 ÷ 0.70 field-length rule.",
    ],
    answer: "LDR = 2 220 × 1.05 × 1.15 × 1.15 × 1.43 ≈ 4 408 ft.",
    difficulty: "hard",
  },
  {
    id: "PLOT-410-014",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · §3.2 — Climb gradient from rate of climb",
    diagram: "climb",
    given: [
      "Missed-approach climb, Figure 3.7 OEI grid",
      "Rate of climb = 300 fpm; TAS = 102 kt",
      "Minimum missed-approach gradient = 0.75%",
    ],
    ask: "Convert the rate of climb to a still-air gradient and check it against the minimum.",
    steps: [
      "Still-air gradient % = (ROC fpm ÷ TAS kt) × (6000 ÷ 6080).",
      "= (300 ÷ 102) × (6000 ÷ 6080) = 2.94% ≈ 2.9%.",
      "2.9% exceeds the 0.75% minimum missed-approach gradient → compliant.",
    ],
    answer: "Gradient = (300 ÷ 102) × (6000 ÷ 6080) ≈ 2.9% — above the 0.75% minimum.",
    difficulty: "hard",
  },

  // ===== A.4.10 — MEP1 cruise performance (CAP 697 Section 3) =====
  {
    id: "PLOT-410-015",
    sectionId: "A.4.10",
    graphRef: "CAP 697 · MEP1 · Figure 3.4 — Speed v Power (True Airspeed)",
    diagram: "cruise",
    given: ["OAT +13 °C", "Pressure altitude 16 500 ft", "Power 55%", "Mixture leaned, cowl flaps closed, mid cruise mass 4 450 lb"],
    ask: "Find the cruise true airspeed.",
    steps: [
      "Enter at OAT +13 °C, up to the 16 500 ft pressure-altitude line.",
      "Across to the 55% power curve.",
      "Read the true airspeed on the right-hand axis (≈ 172 kt).",
    ],
    answer: "TAS ≈ 172 kt. Confirm on CAP 697 Fig 3.4.",
    difficulty: "hard",
    graph: {
      x: { label: "Outside air temperature — °C", min: -40, max: 40, step: 10 },
      y: { label: "True airspeed — kt", min: 120, max: 200, step: 20 },
      curves: [
        { label: "45%", pts: [[-40, 164], [13, 155], [40, 150]] },
        { label: "55%", pts: [[-40, 182], [13, 172], [40, 166]] },
        { label: "65%", pts: [[-40, 192], [13, 182], [40, 176]] },
        { label: "75%", pts: [[-40, 199], [13, 190], [40, 184]] },
      ],
      red: [[13, 120], [13, 172], [-40, 172]],
      readout: "TAS ≈ 172 kt",
    },
  },
  {
    id: "PLOT-410-016",
    sectionId: "A.4.10",
    graphRef: "CAP 697 · MEP1 · Figure 3.5 — Endurance",
    diagram: "cruise",
    given: ["Cruise pressure altitude 16 500 ft", "Power 45%", "Usable fuel 123 US gal", "Mixture leaned, cowl flaps closed"],
    ask: "Find the safe endurance (45 min reserve) and the maximum endurance (no reserve).",
    steps: [
      "Enter the left axis at the cruise pressure altitude (16 500 ft).",
      "Move across to the 45% power grid line — read the SAFE endurance (with 45 min reserve) ≈ 6.2 hr.",
      "Move to the 'no reserve' 45% line for the MAXIMUM endurance ≈ 6.95 hr.",
    ],
    answer: "Safe endurance ≈ 6.2 hr (45 min reserve); maximum endurance ≈ 6.95 hr. Confirm on CAP 697 Fig 3.5.",
    difficulty: "hard",
    graph: {
      x: { label: "Pressure altitude — ft", min: 5000, max: 25000, step: 5000 },
      y: { label: "Endurance — hr", min: 3, max: 8, step: 1 },
      curves: [
        { label: "45% (no reserve)", pts: [[5000, 7.6], [16500, 6.95], [25000, 6.3]] },
        { label: "45% (45 min reserve)", pts: [[5000, 6.9], [16500, 6.2], [25000, 5.6]] },
        { label: "55%", pts: [[5000, 5.6], [16500, 5.0], [25000, 4.5]] },
        { label: "65%", pts: [[5000, 4.6], [16500, 4.1], [25000, 3.7]] },
      ],
      red: [[16500, 3], [16500, 6.2], [5000, 6.2]],
      readout: "Safe ≈ 6.2 hr / Max ≈ 6.95 hr",
    },
  },
  {
    id: "PLOT-410-017",
    sectionId: "A.4.10",
    graphRef: "CAP 697 · MEP1 · Figure 3.6 — Fuel, Time and Distance to Descend",
    diagram: "cruise",
    given: [
      "Cruise altitude 16 500 ft, OAT +13 °C",
      "Destination altitude 3 000 ft, OAT +22 °C",
      "145 kt IAS, 1 000 fpm descent, no wind",
    ],
    ask: "Find the fuel, time and distance for the descent.",
    steps: [
      "At cruise: enter +13 °C, up to 16 500 ft, read ≈ 6 US gal, 16 min, 45 NM.",
      "At destination: enter +22 °C, up to 3 000 ft, read ≈ 1 US gal, 3 min, 8 NM.",
      "Subtract: fuel 6−1, time 16−3, distance 45−8.",
    ],
    answer: "Descent = 5 US gal, 13 min, 37 NM — CAP 697 Fig 3.6 worked example (verified against the manual).",
    difficulty: "hard",
  },

  // ===== A.4.9 — SEP1 cruise power settings table (CAP 697 Table 2.2.x) =====
  {
    id: "PLOT-49-008",
    sectionId: "A.4.9",
    graphRef: "CAP 697 · SEP1 · Table 2.2.1 — Recommended Cruise Power (25 in Hg / 2 500 rpm)",
    diagram: "cruise",
    given: ["Table 2.2.1 (25.0 in Hg / 2 500 rpm, cruise lean, 3 400 lb)", "ISA deviation 0 °C", "Pressure altitude 8 000 ft"],
    ask: "Read the manifold pressure, fuel flow and airspeeds.",
    steps: [
      "Select the correct table (2.2.1 for 25 in Hg / 2 500 rpm) and the ISA-deviation block (0 °C).",
      "Enter at the 8 000 ft row (IOAT +2 °C).",
      "Read across: MAP 22.3 in Hg, fuel flow 79.3 PPH (13.2 GPH), 152 KIAS, 169 KTAS. Shaded = full-throttle operation.",
    ],
    answer: "MAP 22.3 in Hg, fuel flow 79.3 PPH / 13.2 GPH, 152 KIAS, 169 KTAS. Confirm on CAP 697 Table 2.2.1.",
    difficulty: "medium",
  },
  {
    id: "PLOT-49-009",
    sectionId: "A.4.9",
    graphRef: "CAP 697 · SEP1 — Economy vs recommended cruise fuel flow",
    diagram: "cruise",
    given: ["Pressure altitude 8 000 ft, ISA deviation 0 °C", "Compare 2 500 rpm (Table 2.2.1) with 2 100 rpm (Table 2.2.2)"],
    ask: "How much fuel flow is saved by the lower-rpm economy setting?",
    steps: [
      "Table 2.2.1 (2 500 rpm) at 8 000 ft / ISA 0: fuel flow 79.3 PPH (13.2 GPH), 169 KTAS.",
      "Table 2.2.2 (2 100 rpm) at 8 000 ft / ISA 0: fuel flow 61.9 PPH (10.3 GPH), 148 KTAS.",
      "Saving ≈ 17.4 PPH (2.9 GPH) for ≈ 21 kt less TAS — the economy/endurance trade-off.",
    ],
    answer: "2 500 rpm: 79.3 PPH / 169 KTAS. 2 100 rpm: 61.9 PPH / 148 KTAS. Economy setting saves ≈ 2.9 GPH for ≈ 21 kt less speed.",
    difficulty: "medium",
  },

  // ===== A.4.11 — MRJT1 medium-range jet transport (CAP 697/698, Class A / ATPL) =====
  {
    id: "PLOT-411-001",
    sectionId: "A.4.11",
    graphRef: "CAP 697 · MRJT1 · Figure 4.1 — Optimum Cruise Altitude",
    diagram: "cruise",
    given: ["MRJT1 twin turbofan, Class A", "Cruise weight 56 800 kg", "Long-Range Cruise profile"],
    ask: "Find the optimum cruise altitude.",
    steps: [
      "Enter the graph with the cruise (or brake-release) weight on the appropriate scale — 56 800 kg.",
      "Travel vertically to the LRC cruise-profile line.",
      "Move horizontally left to read the optimum cruise altitude ≈ 33 500 ft.",
    ],
    answer: "Optimum cruise altitude ≈ 33 500 ft. (Off-optimum penalty: −1% at 2 000 ft below, −4% at 4 000 ft below.) Confirm on CAP 697 Fig 4.1.",
    difficulty: "hard",
    graph: {
      x: { label: "Cruise weight — ×1 000 kg", min: 40, max: 70, step: 5 },
      y: { label: "Optimum altitude — ×1 000 ft", min: 28, max: 38, step: 2 },
      curves: [
        { label: "LRC", pts: [[40, 37.5], [56.8, 33.5], [70, 28.5]] },
        { label: "M0.78", pts: [[40, 36.5], [56.8, 32.5], [70, 27.8]] },
      ],
      red: [[56.8, 28], [56.8, 33.5], [40, 33.5]],
      readout: "≈ 33 500 ft",
    },
  },
  {
    id: "PLOT-411-002",
    sectionId: "A.4.11",
    graphRef: "CAP 697 · MRJT1 · Figure 4.2 — Short-Distance Cruise Altitude",
    diagram: "cruise",
    given: ["Trip distance 177 NM", "Temperature deviation ISA +20 °C", "Brake-release weight 52 000 kg"],
    ask: "Find the cruise pressure altitude for this short sector.",
    steps: [
      "Enter the graph with the trip distance (177 NM), up to the ISA +20 °C temperature-deviation line.",
      "Across to the brake-release-weight reference line, then parallel the grid to 52 000 kg.",
      "Continue across to read the cruise pressure altitude ≈ 28 000 ft (below the max-operating-altitude line).",
    ],
    answer: "Cruise altitude ≈ 28 000 ft. Confirm on CAP 697 Fig 4.2.",
    difficulty: "hard",
  },
  {
    id: "PLOT-411-003",
    sectionId: "A.4.11",
    graphRef: "CAP 697 · MRJT1 · Figure 4.3.1 — Simplified Flight Planning (LRC)",
    diagram: "cruise",
    given: ["Trip distance 350 NM", "Cruise altitude 29 000 ft", "Estimated landing weight 30 000 kg", "Average wind 50 kt headwind", "ISA +20 °C"],
    ask: "Find the trip fuel required and the trip time.",
    steps: [
      "Enter at the trip distance (350 NM), down to the wind reference line, parallel to the 50 kt headwind line.",
      "Up to the 29 000 ft cruise-altitude grid, across to the 30 000 kg landing-weight line; read FUEL REQUIRED ≈ 2 300 kg on the right axis.",
      "Return to the altitude grid, up to the ISA-deviation reference, parallel to ISA +20 °C; read TRIP TIME ≈ 1.05 hr on the left axis.",
    ],
    answer: "Trip fuel ≈ 2 300 kg, trip time ≈ 1.05 hr. (Apply cost-index / anti-ice / A-C corrections as required.) Confirm on CAP 697 Fig 4.3.1.",
    difficulty: "hard",
  },
  {
    id: "PLOT-411-004",
    sectionId: "A.4.11",
    graphRef: "CAP 698 · MRJT1 · Figure 4.1 — Wind Components for Take-off and Landing",
    diagram: "takeoff",
    given: ["Reported W/V 330°/30 kt", "Runway 02 (020° magnetic)"],
    ask: "Find the headwind and crosswind components.",
    steps: [
      "Relative wind angle = 330 − 020 = ... take the acute angle to the runway = 50°.",
      "Enter the graph at 30 kt on the wind-velocity arc, follow it to the 50° relative-direction line.",
      "Read across for the along-track (head) component ≈ 19 kt, and down for the crosswind ≈ 23 kt (left to right).",
    ],
    answer: "Headwind ≈ 19 kt, crosswind ≈ 23 kt (left to right). Confirm on CAP 698 Fig 4.1.",
    difficulty: "medium",
  },
  {
    id: "PLOT-411-005",
    sectionId: "A.4.11",
    graphRef: "CAP 698 · MRJT1 · Figure 4.2 — QNH to Pressure Altitude",
    diagram: "cruise",
    given: ["Aerodrome elevation 2 500 ft", "QNH 29.48 in Hg"],
    ask: "Find the aerodrome pressure altitude (all MRJT graphs use pressure altitude).",
    steps: [
      "Find the QNH band 29.44–29.55 in Hg in the conversion table → correction +400 ft.",
      "Pressure altitude = elevation + correction = 2 500 + 400.",
      "Use this pressure altitude (not elevation) to enter every performance graph.",
    ],
    answer: "Pressure altitude = 2 500 + 400 = 2 900 ft. Confirm on CAP 698 Fig 4.2.",
    difficulty: "medium",
  },
  {
    id: "PLOT-411-006",
    sectionId: "A.4.11",
    graphRef: "CAP 697 · MRJT1 · Figure 4.4 — Holding Fuel Flow (flaps retracted)",
    diagram: "cruise",
    given: ["Holding pressure altitude 15 000 ft", "Hold-entry weight 50 000 kg", "Racetrack pattern at minimum-drag KIAS (min 210 KIAS)"],
    ask: "Find the holding fuel flow.",
    steps: [
      "Enter the table at the 15 000 ft row and the 50 000 kg weight column (interpolate if needed).",
      "Read the fuel flow ≈ 2 220 kg/hr for the racetrack hold.",
      "If the hold is flown straight-and-level, reduce the fuel flow by 5% → ≈ 2 109 kg/hr.",
    ],
    answer: "Racetrack holding fuel flow ≈ 2 220 kg/hr (≈ 2 109 kg/hr straight-and-level). Confirm on CAP 697 Fig 4.4.",
    difficulty: "hard",
  },
  {
    id: "PLOT-411-007",
    sectionId: "A.4.11",
    graphRef: "CAP 698 · MRJT1 · Figure 4.3 — Total Air Temperature at ISA",
    diagram: "cruise",
    given: ["Flying in ISA conditions", "Pressure altitude 35 000 ft", "Indicated Mach number 0.78"],
    ask: "Find the ISA/TAT and use it to judge the temperature deviation.",
    steps: [
      "Enter at the 35 000 ft pressure altitude and go UP to the Mach 0.78 curve.",
      "From that intersection, read ACROSS to the TAT axis: ISA/TAT ≈ −28 °C (the TAT the gauge shows in ISA at that level/Mach).",
      "Compare the actual TAT with this ISA/TAT: the difference is the temperature deviation from standard.",
    ],
    answer: "ISA/TAT ≈ −28 °C at FL350 / M0.78; actual TAT minus this = the ISA deviation. Confirm on CAP 698 Fig 4.3.",
    difficulty: "hard",
    // Original redrawn replica — curves computed from the ram-rise relation
    // TAT = SAT·(1 + 0.2·M²) with ISA SAT at each level (not a copy of CAP artwork).
    // Enter at the PRESSURE ALTITUDE, go up to the Mach curve, read TAT on the y-axis.
    graph: {
      x: { label: "Pressure altitude — ft", min: 0, max: 40000, step: 10000 },
      y: { label: "TAT at ISA — °C", min: -45, max: 60, step: 15 },
      curves: [
        { label: "M0.70", pts: [[0, 43.2], [10000, 21.5], [20000, -0.2], [30000, -22.0], [36090, -35.2], [40000, -35.3]] },
        { label: "M0.74", pts: [[0, 46.6], [10000, 24.6], [20000, 2.6], [30000, -19.3], [36090, -32.7], [40000, -32.8]] },
        { label: "M0.78", pts: [[0, 50.1], [10000, 27.9], [20000, 5.6], [30000, -16.6], [36090, -30.1], [40000, -30.1]] },
        { label: "M0.82", pts: [[0, 53.8], [10000, 31.3], [20000, 8.8], [30000, -13.6], [36090, -27.3], [40000, -27.4]] },
      ],
      red: [[35000, -45], [35000, -27.7], [0, -27.7]],
      readout: "≈ −28 °C",
    },
  },
  {
    id: "PLOT-411-008",
    sectionId: "A.4.11",
    graphRef: "CAP 697 · MRJT1 · Figure 4.5.1 — En-route Climb (280 KIAS / M0.74)",
    diagram: "climb",
    given: ["ISA deviation block −5 to −15 °C", "Top-of-climb pressure altitude 35 000 ft", "Brake-release weight 60 000 kg"],
    ask: "Read the time, fuel and air distance to climb (and the average TAS).",
    steps: [
      "Select the table for the ISA-deviation block, enter at the top-of-climb pressure altitude (35 000 ft).",
      "Read across to the 60 000 kg brake-release-weight column for Time/Fuel and Distance/TAS.",
      "Correct fuel for a high-elevation departure from the sub-table; ground distance = air distance × GS ÷ TAS.",
    ],
    answer: "Read Time/Fuel (min / kg) and Distance/TAS from the 60 000 kg column at FL350 in the −5 to −15 block; values are from brake release. Confirm on CAP 697 Fig 4.5.1.",
    difficulty: "hard",
  },

  // ===== A.4.11 — MRJT1 take-off performance limits (CAP 698 Section 4) =====
  {
    id: "PLOT-411-009",
    sectionId: "A.4.11",
    graphRef: "CAP 698 · MRJT1 · Figure 4.4 — Take-off Performance Field Length Limit",
    diagram: "takeoff",
    given: ["Field length available (TORA) 9 600 ft", "Runway slope 1% uphill", "Wind 20 kt headwind", "Flaps 15°", "OAT +33 °C, pressure altitude 2 000 ft, PMC on"],
    ask: "Find the field-length-limited take-off mass.",
    steps: [
      "Enter with TORA 9 600 ft, up to the slope reference line, parallel to 1% uphill, then to the wind line and parallel to 20 kt headwind.",
      "To the flap reference line (15°), draw a vertical through the weight grid.",
      "Enter at OAT +33 °C, up to 2 000 ft pressure altitude, across to the mass reference, follow the grid to the vertical line and read the Field-Length-Limited TOM ≈ 63 000 kg.",
    ],
    answer: "Field-length-limited TOM ≈ 63 000 kg. Confirm on CAP 698 Fig 4.4.",
    difficulty: "hard",
    graph: {
      x: { label: "Field length available (TORA) — ft", min: 3000, max: 14000, step: 1000 },
      y: { label: "Field-length-limit mass — kg", min: 30000, max: 70000, step: 10000 },
      curves: [
        { label: "Flaps 15°", pts: [[3000, 38000], [9600, 63000], [14000, 70000]] },
        { label: "Flaps 5°", pts: [[3000, 35000], [9600, 58000], [14000, 66000]] },
      ],
      red: [[9600, 30000], [9600, 63000], [3000, 63000]],
      readout: "≈ 63 000 kg",
    },
  },
  {
    id: "PLOT-411-010",
    sectionId: "A.4.11",
    graphRef: "CAP 698 · MRJT1 · Figure 4.5 — Take-off Performance Climb Limit",
    diagram: "climb",
    given: ["OAT +33 °C", "Pressure altitude 2 000 ft", "Flaps 15°", "PMC on"],
    ask: "Find the climb-limited take-off mass.",
    steps: [
      "Enter at aerodrome OAT +33 °C, up to the 2 000 ft pressure-altitude line.",
      "Across to the flap reference line (15°).",
      "Read the climb-limit mass ≈ 53 400 kg. Correct for packs/anti-ice as noted on the graph.",
    ],
    answer: "Climb-limited TOM ≈ 53 400 kg. Confirm on CAP 698 Fig 4.5.",
    difficulty: "hard",
    graph: {
      x: { label: "Airport OAT — °C", min: -10, max: 70, step: 10 },
      y: { label: "Climb-limit mass — kg", min: 30000, max: 65000, step: 5000 },
      curves: [
        { label: "SL", pts: [[-10, 64000], [33, 58000], [70, 47000]] },
        { label: "2 000 ft", pts: [[-10, 60000], [33, 53400], [70, 42000]] },
        { label: "4 000 ft", pts: [[-10, 56000], [33, 49000], [70, 38000]] },
      ],
      red: [[33, 30000], [33, 53400], [-10, 53400]],
      readout: "≈ 53 400 kg",
    },
  },
  {
    id: "PLOT-411-011",
    sectionId: "A.4.11",
    graphRef: "CAP 698 · MRJT1 · Figure 4.6 — Take-off Tyre Speed Limit",
    diagram: "takeoff",
    given: ["OAT +33 °C, pressure altitude 2 000 ft", "Flaps 15°, PMC on", "Tyres 210 mph", "Graphical (uncorrected, 225 mph / flaps 5°) limit 80 400 kg"],
    ask: "Find the tyre-speed-limited take-off mass.",
    steps: [
      "Read the uncorrected limit for 225 mph tyres / flaps 5° = 80 400 kg.",
      "Apply the conditional corrections: 15° flap + 210 mph tyres = −1 500 kg.",
      "Tyre-speed-limited mass = 80 400 − 1 500 = 78 900 kg (rarely limiting except hot/high/tailwind).",
    ],
    answer: "Tyre-speed-limited TOM = 80 400 − 1 500 = 78 900 kg. Confirm on CAP 698 Fig 4.6.",
    difficulty: "hard",
  },
  {
    id: "PLOT-411-012",
    sectionId: "A.4.11",
    graphRef: "CAP 698 · MRJT1 · Figure 4.7 — Take-off Brake Energy Limit (VMBE)",
    diagram: "takeoff",
    given: ["Take-off mass 64 000 kg", "Pressure altitude 5 600 ft", "OAT −10 °C", "Runway slope 1.5% uphill", "Wind 10 kt headwind, PMC on"],
    ask: "Find VMBE (maximum brake energy speed).",
    steps: [
      "From the graph read the uncorrected VMBE ≈ 165 kt for the mass/altitude/temperature.",
      "Slope correction: +2 kt per 1% uphill → ×1.5% ≈ +3 kt. Wind: +3 kt per 10 kt headwind → +3 kt.",
      "VMBE = 165 + 3 + 3 = 171 kt. If V1 would exceed VMBE, set V1 = VMBE and reduce the brake-release mass.",
    ],
    answer: "VMBE = 165 + 3 + 3 = 171 kt. Confirm on CAP 698 Fig 4.7.",
    difficulty: "hard",
  },
  {
    id: "PLOT-411-013",
    sectionId: "A.4.11",
    graphRef: "CAP 698 · MRJT1 — Regulated (performance-limited) take-off mass",
    diagram: "takeoff",
    given: [
      "Field-length-limited TOM 63 000 kg (Fig 4.4)",
      "Climb-limited TOM 53 400 kg (Fig 4.5)",
      "Tyre-speed limit 78 900 kg, VMBE not limiting",
      "Maximum structural TOM 62 800 kg",
    ],
    ask: "Determine the regulated (performance-limited) take-off mass.",
    steps: [
      "The regulated TOM is the LOWEST of all the limiting masses.",
      "Compare: structural 62 800, field-length 63 000, climb 53 400, tyre 78 900.",
      "The climb limit (53 400 kg) is the most restrictive → that is the regulated TOM.",
    ],
    answer: "Regulated TOM = 53 400 kg (climb-limited — the lowest of the structural, field-length, climb, tyre and brake-energy limits).",
    difficulty: "hard",
  },
  {
    id: "PLOT-411-014",
    sectionId: "A.4.11",
    graphRef: "CAP 698 · MRJT1 · Figure 4.8 — Take-off V speeds (flaps 5°)",
    diagram: "takeoff",
    given: ["Flaps 5°, PMC on", "Take-off mass 60 000 kg", "Density sub-graph gives column A", "Level runway, nil wind"],
    ask: "Read V1, VR and V2, and state the V-speed order.",
    steps: [
      "Use the density sub-graph (pressure altitude + temperature) to pick the column — column A here.",
      "Enter the flaps-5° table at 60 000 kg in column A: V1 = 144, VR = 148, V2 = 155 KIAS.",
      "Correct V1 for slope/wind from the top sub-table if required, and check V1 ≥ VMCG (from the VMCG table) — V1 must not be below VMCG nor above VR/VMBE.",
    ],
    answer: "Flaps 5°, 60 000 kg, column A: V1 144, VR 148, V2 155 KIAS. Confirm on CAP 698 Fig 4.8.",
    difficulty: "hard",
  },
  {
    id: "PLOT-411-015",
    sectionId: "A.4.11",
    graphRef: "CAP 698 · MRJT1 · Figure 4.8 — Stabiliser trim setting",
    diagram: "takeoff",
    given: ["Flaps 5°", "Take-off CG 18% MAC", "Take-off mass 60 000 kg"],
    ask: "Find the take-off stabiliser trim setting.",
    steps: [
      "Enter the flaps-5° stabiliser-trim table at the take-off CG (18% MAC) → 3¼ units.",
      "Apply the mass correction: at or below 45 350 kg subtract ½ unit; at or above 61 250 kg add ½ unit — 60 000 kg needs no correction.",
      "The setting must lie between 1 and 5¾ units.",
    ],
    answer: "Stabiliser trim ≈ 3¼ units (flaps 5°, CG 18% MAC, 60 000 kg). Confirm on CAP 698 Fig 4.8.",
    difficulty: "hard",
  },

  // ============================================================================
  // ORIGINAL practice set — authored scenarios grounded in factual data (not a
  // copy of any book/manual question). Mass & balance answers are EXACT arithmetic
  // (verifiable); graph/carpet reads are representative → confirm on your CAP manual.
  // ============================================================================

  // ----- Mass & balance (CG envelope) — exact computed answers -----
  {
    id: "PLOT-MB-001", sectionId: "A.4.12",
    graphRef: "CAP 696 · SEP1 · Centre-of-gravity envelope",
    diagram: "takeoff",
    given: ["Empty 2 450 lb @ 79.0 in", "Front seats 400 lb @ 75 in", "Rear seats 300 lb @ 82 in", "Baggage 100 lb @ 95 in", "LEMAC 74 in, MAC 60 in"],
    ask: "Find the take-off mass, CG and %MAC, and check the envelope.",
    steps: [
      "Σ mass = 2 450 + 400 + 300 + 100 = 3 250 lb.",
      "Σ moment = 2 450×79 + 400×75 + 300×82 + 100×95 = 257 650 lb·in.",
      "CG = 257 650 ÷ 3 250 = 79.3 in; %MAC = (79.3 − 74) ÷ 60 × 100 = 8.8%.",
      "Plot (79.3 in, 3 250 lb) — inside the fwd/aft limits and below MTOM 3 650.",
    ],
    answer: "TOM 3 250 lb, CG 79.3 in (8.8% MAC) — inside the envelope. Exact arithmetic (verified).",
    difficulty: "medium",
    graph: {
      x: { label: "CG — inches aft of datum", min: 68, max: 92, step: 4 },
      y: { label: "Weight — lb", min: 2000, max: 3800, step: 200 },
      curves: [
        { label: "fwd limit", pts: [[74, 2100], [74, 2350], [80.4, 3650]] },
        { label: "aft limit", pts: [[87.7, 2100], [87.7, 3650]] },
        { label: "MTOM 3 650", pts: [[80.4, 3650], [87.7, 3650]] },
      ],
      red: [[79.3, 2000], [79.3, 3250]],
      readout: "79.3 in / 3 250 lb ✓",
    },
  },
  {
    id: "PLOT-MB-002", sectionId: "A.4.12",
    graphRef: "CAP 696 · SEP1 · Centre-of-gravity envelope",
    diagram: "takeoff",
    given: ["Empty 2 500 lb @ 78.5 in", "Rear seats 350 lb @ 95 in", "Baggage 200 lb @ 98 in", "LEMAC 74 in, MAC 60 in"],
    ask: "Find the CG and %MAC and check the envelope (watch the aft loading).",
    steps: [
      "Σ mass = 2 500 + 350 + 200 = 3 050 lb.",
      "Σ moment = 2 500×78.5 + 350×95 + 200×98 = 249 100 lb·in.",
      "CG = 249 100 ÷ 3 050 = 81.7 in; %MAC = (81.7 − 74) ÷ 60 × 100 = 12.8%.",
      "Plot (81.7 in, 3 050 lb) — still forward of the 87.7 in aft limit, so legal.",
    ],
    answer: "CG 81.7 in (12.8% MAC) at 3 050 lb — inside the envelope. Exact arithmetic (verified).",
    difficulty: "medium",
    graph: {
      x: { label: "CG — inches aft of datum", min: 68, max: 92, step: 4 },
      y: { label: "Weight — lb", min: 2000, max: 3800, step: 200 },
      curves: [
        { label: "fwd limit", pts: [[74, 2100], [74, 2350], [80.4, 3650]] },
        { label: "aft limit", pts: [[87.7, 2100], [87.7, 3650]] },
        { label: "MTOM 3 650", pts: [[80.4, 3650], [87.7, 3650]] },
      ],
      red: [[81.7, 2000], [81.7, 3050]],
      readout: "81.7 in / 3 050 lb ✓",
    },
  },
  {
    id: "PLOT-MB-003", sectionId: "A.4.12",
    graphRef: "CAP 696 · SEP1 · Centre-of-gravity envelope",
    diagram: "takeoff",
    given: ["Empty 2 400 lb @ 80.0 in", "Front seats 500 lb @ 74 in", "Fuel 250 lb @ 70 in", "LEMAC 74 in, MAC 60 in"],
    ask: "Find the CG and %MAC (forward loading) and check the envelope.",
    steps: [
      "Σ mass = 2 400 + 500 + 250 = 3 150 lb.",
      "Σ moment = 2 400×80 + 500×74 + 250×70 = 246 500 lb·in.",
      "CG = 246 500 ÷ 3 150 = 78.3 in; %MAC = (78.3 − 74) ÷ 60 × 100 = 7.1%.",
      "Plot (78.3 in, 3 150 lb) — aft of the forward limit, so legal.",
    ],
    answer: "CG 78.3 in (7.1% MAC) at 3 150 lb — inside the envelope. Exact arithmetic (verified).",
    difficulty: "medium",
    graph: {
      x: { label: "CG — inches aft of datum", min: 68, max: 92, step: 4 },
      y: { label: "Weight — lb", min: 2000, max: 3800, step: 200 },
      curves: [
        { label: "fwd limit", pts: [[74, 2100], [74, 2350], [80.4, 3650]] },
        { label: "aft limit", pts: [[87.7, 2100], [87.7, 3650]] },
        { label: "MTOM 3 650", pts: [[80.4, 3650], [87.7, 3650]] },
      ],
      red: [[78.3, 2000], [78.3, 3150]],
      readout: "78.3 in / 3 150 lb ✓",
    },
  },
  {
    id: "PLOT-MB-004", sectionId: "A.4.12",
    graphRef: "CAP 696 · SEP1 · Centre-of-gravity envelope",
    diagram: "takeoff",
    given: ["Empty 2 550 lb @ 79.0 in", "Seats 600 lb @ 85 in", "Baggage 150 lb @ 98 in", "LEMAC 74 in, MAC 60 in"],
    ask: "Find the CG and %MAC and check the envelope.",
    steps: [
      "Σ mass = 2 550 + 600 + 150 = 3 300 lb.",
      "Σ moment = 2 550×79 + 600×85 + 150×98 = 267 150 lb·in.",
      "CG = 267 150 ÷ 3 300 = 81.0 in; %MAC = (81.0 − 74) ÷ 60 × 100 = 11.6%.",
      "Plot (81.0 in, 3 300 lb) — inside the envelope, below MTOM.",
    ],
    answer: "CG 81.0 in (11.6% MAC) at 3 300 lb — inside the envelope. Exact arithmetic (verified).",
    difficulty: "medium",
    graph: {
      x: { label: "CG — inches aft of datum", min: 68, max: 92, step: 4 },
      y: { label: "Weight — lb", min: 2000, max: 3800, step: 200 },
      curves: [
        { label: "fwd limit", pts: [[74, 2100], [74, 2350], [80.4, 3650]] },
        { label: "aft limit", pts: [[87.7, 2100], [87.7, 3650]] },
        { label: "MTOM 3 650", pts: [[80.4, 3650], [87.7, 3650]] },
      ],
      red: [[81.0, 2000], [81.0, 3300]],
      readout: "81.0 in / 3 300 lb ✓",
    },
  },

  // ----- Climb / cruise / range / endurance (representative reads) -----
  {
    id: "PLOT-CRE-001", sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · Figure 3.1 — Climb",
    diagram: "climb",
    given: ["Pressure altitude 8 000 ft", "Mass 3 500 lb", "Both engines operating"],
    ask: "Read the all-engine rate of climb.",
    steps: ["Enter at 8 000 ft pressure altitude.", "Up to the 3 500 lb mass curve.", "Read across to the rate-of-climb axis."],
    answer: "≈ 900 fpm (representative read — confirm on your CAP 698 Fig 3.1).",
    difficulty: "medium",
    graph: {
      x: { label: "Pressure altitude — ft", min: 0, max: 14000, step: 2000 },
      y: { label: "Rate of climb — fpm", min: 0, max: 1600, step: 400 },
      curves: [{ label: "3 500 lb", pts: [[0, 1500], [4000, 1250], [8000, 900], [14000, 450]] }, { label: "light", pts: [[0, 1700], [4000, 1450], [8000, 1120], [14000, 680]] }],
      red: [[8000, 0], [8000, 900], [0, 900]],
      readout: "≈ 900 fpm",
    },
  },
  {
    id: "PLOT-CRE-002", sectionId: "A.4.9",
    graphRef: "CAP 697 · SEP1 · Figure 2.4 — Range profile",
    diagram: "cruise",
    given: ["Cruise pressure altitude 10 000 ft", "Full-throttle cruise, ISA, standard tanks"],
    ask: "Read the still-air range.",
    steps: ["Enter at 10 000 ft.", "Up to the cruise-power curve.", "Read the still-air range."],
    answer: "≈ 690 NM (representative read — confirm on your CAP 697 Fig 2.4).",
    difficulty: "medium",
    graph: {
      x: { label: "Pressure altitude — ft", min: 0, max: 14000, step: 2000 },
      y: { label: "Still-air range — NM", min: 400, max: 900, step: 100 },
      curves: [{ label: "cruise", pts: [[0, 560], [6000, 640], [10000, 690], [14000, 720]] }, { label: "economy", pts: [[0, 620], [6000, 705], [10000, 760], [14000, 795]] }],
      red: [[10000, 400], [10000, 690], [0, 690]],
      readout: "≈ 690 NM",
    },
  },
  {
    id: "PLOT-CRE-003", sectionId: "A.4.9",
    graphRef: "CAP 697 · SEP1 · Figure 2.5 — Endurance profile",
    diagram: "cruise",
    given: ["Cruise pressure altitude 6 000 ft", "Economy cruise, ISA, standard tanks"],
    ask: "Read the endurance.",
    steps: ["Enter at 6 000 ft.", "Up to the economy-power curve.", "Read the endurance."],
    answer: "≈ 4.4 hr (representative read — confirm on your CAP 697 Fig 2.5).",
    difficulty: "medium",
    graph: {
      x: { label: "Pressure altitude — ft", min: 0, max: 12000, step: 2000 },
      y: { label: "Endurance — hours", min: 2, max: 6, step: 1 },
      curves: [{ label: "economy", pts: [[0, 3.8], [6000, 4.4], [12000, 4.9]] }, { label: "cruise", pts: [[0, 3.3], [6000, 3.8], [12000, 4.2]] }],
      red: [[6000, 2], [6000, 4.4], [0, 4.4]],
      readout: "≈ 4.4 hr",
    },
  },
  {
    id: "PLOT-CRE-004", sectionId: "A.4.10",
    graphRef: "CAP 697 · MEP1 · Figure 3.4 — True airspeed",
    diagram: "cruise",
    given: ["OAT +10 °C", "Power 65%", "Cruise altitude per the condition curves"],
    ask: "Read the true airspeed.",
    steps: ["Enter the OAT axis at +10 °C.", "Up to the 65% power curve.", "Read across (left) to the TAS axis."],
    answer: "≈ 170 kt (representative read — confirm on your CAP 697 Fig 3.4).",
    difficulty: "medium",
    graph: {
      x: { label: "Outside air temperature — °C", min: -30, max: 40, step: 10 },
      y: { label: "True airspeed — kt", min: 120, max: 200, step: 20 },
      curves: [{ label: "75%", pts: [[-30, 195], [10, 182], [40, 173]] }, { label: "65%", pts: [[-30, 185], [10, 170], [40, 161]] }, { label: "55%", pts: [[-30, 174], [10, 159], [40, 150]] }],
      red: [[10, 120], [10, 170], [-30, 170]],
      readout: "≈ 170 kt",
    },
  },

  // ----- Take-off / landing distance (carpet, representative) -----
  {
    id: "PLOT-TL-001", sectionId: "A.4.9",
    graphRef: "CAP 698 · SEP1 · Figure 2.1 — Take-off distance (flaps up)",
    diagram: "takeoff",
    given: ["OAT +35 °C", "Pressure altitude 2 200 ft", "Take-off mass 3 400 lb", "Wind 5 kt headwind", "50 ft obstacle"],
    ask: "Find the take-off distance over a 50 ft obstacle.",
    steps: ["Enter OAT +35 °C up to the 2 200 ft PA curve.", "Parallel the mass guides to 3 400 lb, then the headwind guides to 5 kt.", "Parallel the obstacle guides to 50 ft and read the distance."],
    answer: "≈ 3 100 ft over 50 ft (representative — confirm on your CAP 698 Fig 2.1).",
    difficulty: "medium",
    carpet: { variant: "takeoff", distanceMax: 8000, oatC: 35, massLb: 3400, windKt: 5, paLevelFt: 2200, afterMassFt: 1900, groundRollFt: 1800, totalFt: 3100, readout: "≈ 3 100 ft" },
  },
  {
    id: "PLOT-TL-002", sectionId: "A.4.9",
    graphRef: "CAP 698 · SEP1 · Figure 2.1 — Take-off distance (flaps up)",
    diagram: "takeoff",
    given: ["OAT 0 °C", "Pressure altitude 1 400 ft", "Take-off mass 3 200 lb", "Wind 15 kt headwind", "50 ft obstacle"],
    ask: "Find the take-off distance over a 50 ft obstacle.",
    steps: ["Enter OAT 0 °C up to the 1 400 ft PA curve.", "Parallel the mass guides to 3 200 lb, then the headwind guides to 15 kt (a strong headwind shortens it).", "Parallel the obstacle guides to 50 ft and read the distance."],
    answer: "≈ 1 900 ft over 50 ft (representative — confirm on your CAP 698 Fig 2.1).",
    difficulty: "medium",
    carpet: { variant: "takeoff", distanceMax: 8000, oatC: 0, massLb: 3200, windKt: 15, paLevelFt: 1400, afterMassFt: 1050, groundRollFt: 850, totalFt: 1900, readout: "≈ 1 900 ft" },
  },
  {
    id: "PLOT-TL-003", sectionId: "A.4.9",
    graphRef: "CAP 698 · SEP1 · Figure 2.4 — Landing distance",
    diagram: "landing",
    given: ["OAT +20 °C", "Pressure altitude 1 300 ft", "Landing mass 3 200 lb", "Wind 10 kt headwind", "50 ft screen"],
    ask: "Find the landing distance from 50 ft.",
    steps: ["Enter OAT +20 °C up to the 1 300 ft PA curve.", "Parallel the mass guides to 3 200 lb, then the headwind guides to 10 kt.", "Parallel the obstacle guides to 50 ft and read the distance."],
    answer: "≈ 1 350 ft from 50 ft (representative — confirm on your CAP 698 Fig 2.4).",
    difficulty: "medium",
    carpet: { variant: "landing", distanceMax: 6000, oatC: 20, massLb: 3200, windKt: 10, paLevelFt: 1300, afterMassFt: 1050, groundRollFt: 900, totalFt: 1350, readout: "≈ 1 350 ft" },
  },
  {
    id: "PLOT-TL-004", sectionId: "A.4.9",
    graphRef: "CAP 698 · SEP1 · Figure 2.1 — Take-off distance (flaps up)",
    diagram: "takeoff",
    given: ["OAT +25 °C", "Pressure altitude 1 900 ft", "Take-off mass 3 650 lb (max)", "Wind 5 kt tailwind", "50 ft obstacle"],
    ask: "Find the take-off distance over a 50 ft obstacle (note the tailwind penalty).",
    steps: ["Enter OAT +25 °C up to the 1 900 ft PA curve.", "3 650 lb sits on the mass reference; parallel the TAILWIND guides to 5 kt (lengthens the distance).", "Parallel the obstacle guides to 50 ft and read the distance."],
    answer: "≈ 2 900 ft over 50 ft (representative — confirm on your CAP 698 Fig 2.1).",
    difficulty: "medium",
    carpet: { variant: "takeoff", distanceMax: 8000, oatC: 25, massLb: 3650, windKt: -5, paLevelFt: 1900, afterMassFt: 1900, groundRollFt: 2050, totalFt: 2900, readout: "≈ 2 900 ft" },
  },
];

import { FPP_GUIDE_PLOTTING } from "@/app/data/fpp-plotting-guide";

// Hand-built plotting exercises plus the generated ones from the guide's Q1–86.
export const FPP_ALL_PLOTTING: PlottingQuestion[] = [...FPP_PLOTTING, ...FPP_GUIDE_PLOTTING];

export function getFPPPlottingBySection(sectionId: string): PlottingQuestion[] {
  return FPP_ALL_PLOTTING.filter((p) => p.sectionId === sectionId);
}
