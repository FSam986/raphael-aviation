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

import type { GraphSpec } from "@/app/components/GraphPlot";
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
      path: {
        // fractions across the chart (x 0→1) and up the distance axis (y 0→1 of 8000 ft)
        pts: [
          [0.196, 0.0],
          [0.196, 0.337],
          [0.357, 0.337],
          [0.592, 0.40],
          [0.795, 0.35],
          [1.0, 0.431],
        ],
        readout: "≈ 3 450 ft",
      },
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
      path: {
        pts: [
          [0.25, 0.0],
          [0.25, 0.148],
          [0.357, 0.148],
          [0.592, 0.20],
          [0.795, 0.29],
          [1.0, 0.325],
        ],
        readout: "≈ 2 600 ft",
      },
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
      path: {
        pts: [
          [0.214, 0.0],
          [0.214, 0.20],
          [0.357, 0.20],
          [0.592, 0.22],
          [0.795, 0.18],
          [1.0, 0.25],
        ],
        readout: "≈ 1 500 ft",
      },
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
    graphRef: "CAP 698 · SEP1 · Figure 2.5 — Range profile",
    diagram: "cruise",
    given: ["Cruise altitude: 6 000 ft", "Recommended cruise power", "Fuel available for cruise: standard tanks", "ISA conditions"],
    ask: "Estimate the still-air range.",
    steps: [
      "Enter the range graph at the cruise altitude (6 000 ft) and the chosen power setting.",
      "Follow the curve to the fuel/weight condition given.",
      "Read the still-air range (nm) on the axis; correct for wind by adjusting ground distance.",
    ],
    answer: "≈ 500 nm still air. Calibrated read; confirm on your CAP 698.",
    difficulty: "medium",
    graph: {
      x: { label: "Pressure altitude (ft)", min: 0, max: 12000, step: 2000 },
      y: { label: "Still-air range (nm)", min: 300, max: 700, step: 100 },
      curves: [
        { label: "Economy", pts: [[0, 500], [6000, 545], [12000, 585]] },
        { label: "Recommended", pts: [[0, 460], [6000, 500], [12000, 540]] },
        { label: "High speed", pts: [[0, 410], [6000, 450], [12000, 485]] },
      ],
      // 6 000 ft up to the Recommended curve, then left to the range axis
      red: [[6000, 300], [6000, 500], [0, 500]],
      readout: "≈ 500 nm",
    },
  },
  {
    id: "PLOT-49-006",
    sectionId: "A.4.9",
    graphRef: "CAP 698 · SEP1 · Figure 2.5 — Endurance profile",
    diagram: "cruise",
    given: ["Cruise altitude: 4 000 ft", "Economy cruise power", "Usable fuel for cruise: standard"],
    ask: "Estimate the endurance.",
    steps: [
      "Enter the endurance graph at 4 000 ft and the economy power setting.",
      "Follow to the usable-fuel condition.",
      "Read the endurance (hours) on the axis.",
    ],
    answer: "≈ 4.5 hours. Calibrated read; confirm on your CAP 698.",
    difficulty: "medium",
    graph: {
      x: { label: "Pressure altitude (ft)", min: 0, max: 10000, step: 2000 },
      y: { label: "Endurance (hours)", min: 2, max: 6, step: 1 },
      curves: [
        { label: "Economy", pts: [[0, 4.2], [4000, 4.5], [8000, 4.8], [10000, 5.0]] },
        { label: "Recommended", pts: [[0, 3.6], [4000, 3.9], [8000, 4.2], [10000, 4.4]] },
      ],
      // 4 000 ft up to the Economy curve, then left to the endurance axis
      red: [[4000, 2], [4000, 4.5], [0, 4.5]],
      readout: "≈ 4.5 h",
    },
  },
  // ===== A.4.10 — MEP1 (CAP 697) =====
  {
    id: "PLOT-410-001",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · Figure 3.1 — Climb",
    diagram: "climb",
    given: ["Pressure altitude: 2 000 ft", "OAT: +15 °C", "Mass: near MTOM", "Both engines operating"],
    ask: "Find the all-engine rate of climb.",
    steps: [
      "Enter the MEP climb graph at the pressure altitude on the bottom axis (2 000 ft).",
      "Go UP to the mass curve (MTOM).",
      "Read ACROSS to the rate-of-climb axis; note the single-engine value would be far lower.",
    ],
    answer: "≈ 1 200 ft/min all-engine. Calibrated read; confirm on your CAP 698 Fig 3.6/3.7.",
    difficulty: "hard",
    graph: {
      x: { label: "Pressure altitude (ft)", min: 0, max: 12000, step: 2000 },
      y: { label: "All-engine rate of climb (ft/min)", min: 200, max: 1600, step: 200 },
      curves: [
        { label: "MTOM", pts: [[0, 1280], [2000, 1200], [6000, 960], [12000, 640]] },
        { label: "Light", pts: [[0, 1480], [2000, 1400], [6000, 1160], [12000, 860]] },
      ],
      // 2 000 ft up to the MTOM curve, then left to the RoC axis
      red: [[2000, 200], [2000, 1200], [0, 1200]],
      readout: "≈ 1 200 ft/min",
    },
  },
  {
    id: "PLOT-410-002",
    sectionId: "A.4.10",
    graphRef: "CAP 698 · MEP1 · Figure 3.2 — Range",
    diagram: "cruise",
    given: ["Cruise altitude: 8 000 ft", "Standard temperature", "Cruise power setting per Figure 3.3"],
    ask: "Estimate the range at standard temperature.",
    steps: [
      "Set the cruise power/fuel flow from the power-setting table (Figure 3.3) for 8 000 ft.",
      "Enter the range graph at 8 000 ft and follow to the fuel/mass condition.",
      "Read the range (nm); adjust for wind to get ground range.",
    ],
    answer: "≈ 800 nm still air. Calibrated read; confirm on your CAP 698 Fig 3.x.",
    difficulty: "hard",
    graph: {
      x: { label: "Pressure altitude (ft)", min: 0, max: 14000, step: 2000 },
      y: { label: "Still-air range (nm)", min: 600, max: 1000, step: 100 },
      curves: [
        { label: "Economy", pts: [[0, 800], [8000, 860], [14000, 910]] },
        { label: "Recommended", pts: [[0, 740], [8000, 800], [14000, 850]] },
      ],
      // 8 000 ft up to the Recommended curve, then left to the range axis
      red: [[8000, 600], [8000, 800], [0, 800]],
      readout: "≈ 800 nm",
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
];

import { FPP_GUIDE_PLOTTING } from "@/app/data/fpp-plotting-guide";

// Hand-built plotting exercises plus the generated ones from the guide's Q1–86.
export const FPP_ALL_PLOTTING: PlottingQuestion[] = [...FPP_PLOTTING, ...FPP_GUIDE_PLOTTING];

export function getFPPPlottingBySection(sectionId: string): PlottingQuestion[] {
  return FPP_ALL_PLOTTING.filter((p) => p.sectionId === sectionId);
}
