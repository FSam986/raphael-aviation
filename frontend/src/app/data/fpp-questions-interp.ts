// SACAA CPL — FLIGHT PLANNING & PERFORMANCE: TABLE INTERPOLATION (A.4.9 / SEP1)
//
// Interpolation on the CAP 697 SEP1 cruise-power tables (Fig 2.2 / 2.3):
//   Table 2.2.1  25.0 in Hg / 2 500 rpm — recommended cruise
//   Table 2.2.2  25.0 in Hg / 2 100 rpm — recommended cruise
//   Table 2.3.1  21.0 in Hg / 2 100 rpm — economy cruise
// Each table is tabulated in 2 000 ft steps within three ISA-deviation blocks
// (ISA−20, ISA, ISA+20). Non-tabulated altitudes/temperatures require linear
// interpolation (the tables' own §3.1 Method of Use, step d). EVERY answer here
// is computed directly from the manual's tabulated values — distractors are the
// classic errors (using the nearest row/block without interpolating, interpolating
// the wrong variable, or assuming manifold pressure changes when it does not).
//
// Interpolation is a core, heavily-examined SACAA FPP skill; the main FPP bank had
// only 3 such questions, so this set fills that gap.

import type { AirLawQuestion } from "@/app/data/airlaw-questions";

export const FPP_INTERP_QUESTIONS: AirLawQuestion[] = [
  // ───────── ISA-deviation interpolation (between temperature blocks) ─────────
  {
    id: "FPI-01", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1 — 25 in Hg / 2 500 rpm) Pressure altitude 8 000 ft, ISA−10 °C. The KIAS and fuel flow (GPH) are:",
    optionA: "154.5 KIAS and 13.5 GPH", optionB: "152 KIAS and 13.2 GPH", optionC: "157 KIAS and 13.8 GPH", optionD: "154.5 KIAS and 13.2 GPH",
    correctAnswer: "a",
    explanation: "ISA−10 lies midway between the ISA−20 (157 KIAS / 13.8 GPH) and ISA 0 (152 KIAS / 13.2 GPH) blocks at 8 000 ft. Mean = 154.5 KIAS, 13.5 GPH. Options B/C use a single block without interpolating; D interpolates speed only.",
    difficulty: "medium",
  },
  {
    id: "FPI-02", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1 — 25 in Hg / 2 500 rpm) Pressure altitude 6 000 ft, ISA+10 °C. The KIAS and fuel flow (GPH) are:",
    optionA: "156.5 KIAS and 14.1 GPH", optionB: "159 KIAS and 14.4 GPH", optionC: "154 KIAS and 13.8 GPH", optionD: "156.5 KIAS and 14.4 GPH",
    correctAnswer: "a",
    explanation: "ISA+10 is midway between the ISA 0 (159 KIAS / 14.4 GPH) and ISA+20 (154 KIAS / 13.8 GPH) blocks at 6 000 ft → 156.5 KIAS, 14.1 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-03", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1 — 25 in Hg / 2 500 rpm) Pressure altitude 10 000 ft, ISA−10 °C. The manifold pressure is:",
    optionA: "20.6 in Hg", optionB: "21.6 in Hg", optionC: "20.0 in Hg", optionD: "19.9 in Hg",
    correctAnswer: "a",
    explanation: "At 10 000 ft the manifold pressure is 20.6 in Hg in BOTH the ISA−20 and ISA 0 blocks, so interpolating for ISA−10 leaves it unchanged at 20.6 in Hg — only fuel flow and the speeds change with temperature.",
    difficulty: "medium",
  },
  {
    id: "FPI-04", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.3.1 — economy 21 in Hg / 2 100 rpm) Pressure altitude 8 000 ft, ISA−10 °C. The KIAS and fuel flow (GPH) are:",
    optionA: "129 KIAS and 9.7 GPH", optionB: "126 KIAS and 9.6 GPH", optionC: "132 KIAS and 9.8 GPH", optionD: "129 KIAS and 9.6 GPH",
    correctAnswer: "a",
    explanation: "ISA−10 is midway between ISA−20 (132 KIAS / 9.8 GPH) and ISA 0 (126 KIAS / 9.6 GPH) at 8 000 ft on the economy table → 129 KIAS, 9.7 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-05", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.2 — 25 in Hg / 2 100 rpm) Pressure altitude 10 000 ft, ISA−10 °C. The KIAS and fuel flow (GPH) are:",
    optionA: "129 KIAS and 9.9 GPH", optionB: "126 KIAS and 9.8 GPH", optionC: "132 KIAS and 10.0 GPH", optionD: "129 KIAS and 9.8 GPH",
    correctAnswer: "a",
    explanation: "ISA−10 is midway between ISA−20 (132 KIAS / 10.0 GPH) and ISA 0 (126 KIAS / 9.8 GPH) at 10 000 ft → 129 KIAS, 9.9 GPH.",
    difficulty: "medium",
  },

  // ───────── Altitude interpolation (between 2 000 ft rows in one block) ─────────
  {
    id: "FPI-06", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1 — 25 in Hg / 2 500 rpm, ISA block) Pressure altitude 9 000 ft at ISA. The KIAS and fuel flow (GPH) are:",
    optionA: "148.5 KIAS and 12.7 GPH", optionB: "152 KIAS and 13.2 GPH", optionC: "145 KIAS and 12.2 GPH", optionD: "148.5 KIAS and 13.2 GPH",
    correctAnswer: "a",
    explanation: "9 000 ft is midway between the 8 000 ft (152 KIAS / 13.2 GPH) and 10 000 ft (145 KIAS / 12.2 GPH) rows → 148.5 KIAS, 12.7 GPH. B/C use a single row.",
    difficulty: "medium",
  },
  {
    id: "FPI-07", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1 — 25 in Hg / 2 500 rpm, ISA block) Pressure altitude 11 000 ft at ISA. The manifold pressure and fuel flow (GPH) are:",
    optionA: "19.9 in Hg and 11.8 GPH", optionB: "20.6 in Hg and 12.2 GPH", optionC: "19.1 in Hg and 11.3 GPH", optionD: "19.9 in Hg and 11.3 GPH",
    correctAnswer: "a",
    explanation: "11 000 ft is midway between 10 000 ft (20.6 in Hg / 12.2 GPH) and 12 000 ft (19.1 in Hg / 11.3 GPH) → 19.85 ≈ 19.9 in Hg, 11.75 ≈ 11.8 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-08", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1 — 25 in Hg / 2 500 rpm, ISA−20 block) Pressure altitude 13 000 ft at ISA−20. The KIAS and fuel flow (GPH) are:",
    optionA: "139 KIAS and 11.3 GPH", optionB: "143 KIAS and 11.7 GPH", optionC: "135 KIAS and 10.9 GPH", optionD: "139 KIAS and 11.7 GPH",
    correctAnswer: "a",
    explanation: "13 000 ft is midway between 12 000 ft (143 KIAS / 11.7 GPH) and 14 000 ft (135 KIAS / 10.9 GPH) in the ISA−20 block → 139 KIAS, 11.3 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-09", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1 — 25 in Hg / 2 500 rpm, ISA+20 block) Pressure altitude 7 000 ft at ISA+20. The KIAS and fuel flow (GPH) are:",
    optionA: "150.5 KIAS and 13.3 GPH", optionB: "154 KIAS and 13.8 GPH", optionC: "147 KIAS and 12.7 GPH", optionD: "150.5 KIAS and 13.8 GPH",
    correctAnswer: "a",
    explanation: "7 000 ft is midway between 6 000 ft (154 KIAS / 13.8 GPH) and 8 000 ft (147 KIAS / 12.7 GPH) in the ISA+20 block → 150.5 KIAS, 13.25 ≈ 13.3 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-10", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.3.1 — economy 21 in Hg / 2 100 rpm, ISA block) Pressure altitude 11 000 ft at ISA. The KIAS and KTAS are:",
    optionA: "121 KIAS and 140 KTAS", optionB: "126 KIAS and 143 KTAS", optionC: "116 KIAS and 137 KTAS", optionD: "121 KIAS and 143 KTAS",
    correctAnswer: "a",
    explanation: "11 000 ft is midway between 10 000 ft (126 KIAS / 143 KTAS) and 12 000 ft (116 KIAS / 137 KTAS) → 121 KIAS, 140 KTAS.",
    difficulty: "medium",
  },
  {
    id: "FPI-11", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.2 — 25 in Hg / 2 100 rpm, ISA block) Pressure altitude 9 000 ft at ISA. The KIAS and fuel flow (GPH) are:",
    optionA: "130 KIAS and 10.1 GPH", optionB: "134 KIAS and 10.3 GPH", optionC: "126 KIAS and 9.8 GPH", optionD: "130 KIAS and 10.3 GPH",
    correctAnswer: "a",
    explanation: "9 000 ft is midway between 8 000 ft (134 KIAS / 10.3 GPH) and 10 000 ft (126 KIAS / 9.8 GPH) → 130 KIAS, 10.05 ≈ 10.1 GPH.",
    difficulty: "medium",
  },

  // ───────── Two-variable (altitude AND temperature both non-tabulated) ─────────
  {
    id: "FPI-12", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1 — 25 in Hg / 2 500 rpm) Pressure altitude 9 000 ft, ISA−10 °C. The KIAS and fuel flow (GPH) are (double interpolation):",
    optionA: "151 KIAS and 13.0 GPH", optionB: "148.5 KIAS and 12.7 GPH", optionC: "153.5 KIAS and 13.3 GPH", optionD: "147.5 KIAS and 12.5 GPH",
    correctAnswer: "a",
    explanation: "Interpolate 9 000 ft in each block first: ISA−20 → 153.5 KIAS / 13.25 GPH, ISA 0 → 148.5 KIAS / 12.7 GPH. Then interpolate midway for ISA−10 → 151 KIAS, ≈13.0 GPH. B forgets the ISA step; C forgets it the other way; D uses the wrong altitude (10 000 ft).",
    difficulty: "hard",
  },

  // ───────── Method / concept ─────────
  {
    id: "FPI-13", sectionId: "A.4.9",
    question: "On the CAP 697 SEP1 cruise-power tables, to read values at 9 000 ft pressure altitude within a single ISA-deviation block you must:",
    optionA: "interpolate midway between the 8 000 ft and 10 000 ft rows", optionB: "use the 8 000 ft row (nearest below)", optionC: "use the 10 000 ft row (nearest above)", optionD: "interpolate between the ISA−20 and ISA 0 blocks",
    correctAnswer: "a",
    explanation: "The tables are tabulated every 2 000 ft, so 9 000 ft lies midway between the 8 000 and 10 000 ft rows and requires linear interpolation between them (Table §3.1 step d). Block (temperature) interpolation is a separate step, needed only when the ISA deviation is also non-tabulated.",
    difficulty: "easy",
  },
  {
    id: "FPI-14", sectionId: "A.4.9",
    question: "On the CAP 697 SEP1 cruise-power tables, extracting data at a tabulated altitude but a temperature of ISA+10 °C requires you to:",
    optionA: "interpolate midway between the ISA 0 and ISA+20 blocks", optionB: "use the ISA 0 block", optionC: "use the ISA+20 block", optionD: "interpolate between the 8 000 ft and 10 000 ft rows",
    correctAnswer: "a",
    explanation: "ISA+10 lies midway between the tabulated ISA 0 and ISA+20 deviation blocks, so take the mean of the two blocks' values at that altitude. The altitude rows are not interpolated here because the altitude is already tabulated.",
    difficulty: "easy",
  },

  // ───────── Direct reads (value sits on a tabulated row & block) ─────────
  {
    id: "FPI-15", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1 — 25 in Hg / 2 500 rpm) Pressure altitude 6 000 ft, ISA+20 °C. Read the manifold pressure and fuel flow (GPH):",
    optionA: "24.1 in Hg and 13.8 GPH", optionB: "25.0 in Hg and 14.4 GPH", optionC: "24.1 in Hg and 14.4 GPH", optionD: "22.3 in Hg and 12.7 GPH",
    correctAnswer: "a",
    explanation: "6 000 ft and ISA+20 are both tabulated, so read straight off the row: MAP 24.1 in Hg, fuel flow 13.8 GPH — no interpolation needed.",
    difficulty: "easy",
  },
  {
    id: "FPI-16", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.3 — 23 in Hg / 2 300 rpm) Pressure altitude 4 000 ft, ISA. Read the KIAS and KTAS:",
    optionA: "148 KIAS and 154 KTAS", optionB: "147 KIAS and 149 KTAS", optionC: "153 KIAS and 154 KTAS", optionD: "148 KIAS and 160 KTAS",
    correctAnswer: "a",
    explanation: "Direct read on Table 2.2.3 at 4 000 ft / ISA: 148 KIAS, 154 KTAS.",
    difficulty: "easy",
  },
  {
    id: "FPI-17", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.3.1 — economy 21 in Hg / 2 100 rpm) Pressure altitude 10 000 ft, ISA−20 °C. Read the fuel flow (GPH) and KTAS:",
    optionA: "10.0 GPH and 144 KTAS", optionB: "9.8 GPH and 143 KTAS", optionC: "10.0 GPH and 141 KTAS", optionD: "9.5 GPH and 139 KTAS",
    correctAnswer: "a",
    explanation: "Direct read on the economy table at 10 000 ft / ISA−20: 10.0 GPH, 144 KTAS.",
    difficulty: "easy",
  },
  {
    id: "FPI-26", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.3.1 — economy 21 in Hg / 2 100 rpm) Pressure altitude 12 000 ft, ISA. Read the manifold pressure and fuel flow (GPH):",
    optionA: "19.3 in Hg and 9.3 GPH", optionB: "20.8 in Hg and 9.8 GPH", optionC: "19.3 in Hg and 9.8 GPH", optionD: "21.0 in Hg and 8.6 GPH",
    correctAnswer: "a",
    explanation: "Both 12 000 ft and ISA are tabulated — read straight off: MAP 19.3 in Hg (full throttle no longer available), 9.3 GPH.",
    difficulty: "easy",
  },

  // ───────── Altitude interpolation (between 2 000 ft rows) ─────────
  {
    id: "FPI-19", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1, ISA block) Pressure altitude 5 000 ft at ISA. The manifold pressure and KTAS are:",
    optionA: "24.6 in Hg and 170 KTAS", optionB: "25.0 in Hg and 170 KTAS", optionC: "24.1 in Hg and 171 KTAS", optionD: "24.6 in Hg and 171 KTAS",
    correctAnswer: "a",
    explanation: "5 000 ft is midway between 4 000 ft (25.0 in Hg / 170 KTAS) and 6 000 ft (24.1 / 171) → 24.55 ≈ 24.6 in Hg, 170.5 ≈ 170 KTAS.",
    difficulty: "medium",
  },
  {
    id: "FPI-20", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.3, ISA block) Pressure altitude 7 000 ft at ISA. The KIAS and fuel flow (GPH) are:",
    optionA: "146.5 KIAS and 12.0 GPH", optionB: "148 KIAS and 12.0 GPH", optionC: "145 KIAS and 11.9 GPH", optionD: "146.5 KIAS and 11.9 GPH",
    correctAnswer: "a",
    explanation: "7 000 ft is midway between 6 000 ft (148 KIAS / 12.0 GPH) and 8 000 ft (145 / 11.9) → 146.5 KIAS, 11.95 ≈ 12.0 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-21", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.3.1 — economy, ISA−20 block) Pressure altitude 3 000 ft at ISA−20. The KIAS and KTAS are:",
    optionA: "129 KIAS and 127.5 KTAS", optionB: "128 KIAS and 125 KTAS", optionC: "130 KIAS and 130 KTAS", optionD: "129 KIAS and 130 KTAS",
    correctAnswer: "a",
    explanation: "3 000 ft is midway between 2 000 ft (128 KIAS / 125 KTAS) and 4 000 ft (130 / 130) → 129 KIAS, 127.5 KTAS.",
    difficulty: "medium",
  },
  {
    id: "FPI-22", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1, ISA+20 block) Pressure altitude 15 000 ft at ISA+20. The KIAS and fuel flow (GPH) are:",
    optionA: "118 KIAS and 10.0 GPH", optionB: "123 KIAS and 10.3 GPH", optionC: "113 KIAS and 9.6 GPH", optionD: "118 KIAS and 10.3 GPH",
    correctAnswer: "a",
    explanation: "15 000 ft is midway between 14 000 ft (123 KIAS / 10.3 GPH) and 16 000 ft (113 / 9.6) → 118 KIAS, 9.95 ≈ 10.0 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-23", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.2 — 25 in Hg / 2 100 rpm, ISA−20 block) Pressure altitude 11 000 ft at ISA−20. The KIAS and fuel flow (GPH) are:",
    optionA: "127.5 KIAS and 9.8 GPH", optionB: "132 KIAS and 10.0 GPH", optionC: "123 KIAS and 9.5 GPH", optionD: "127.5 KIAS and 10.0 GPH",
    correctAnswer: "a",
    explanation: "11 000 ft is midway between 10 000 ft (132 KIAS / 10.0 GPH) and 12 000 ft (123 / 9.5) → 127.5 KIAS, 9.75 ≈ 9.8 GPH.",
    difficulty: "medium",
  },

  // ───────── ISA interpolation ─────────
  {
    id: "FPI-18", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1) Pressure altitude 14 000 ft, ISA−10 °C. The KIAS and fuel flow (GPH) are:",
    optionA: "132 KIAS and 10.8 GPH", optionB: "135 KIAS and 10.9 GPH", optionC: "129 KIAS and 10.6 GPH", optionD: "132 KIAS and 10.6 GPH",
    correctAnswer: "a",
    explanation: "ISA−10 is midway between ISA−20 (135 KIAS / 10.9 GPH) and ISA 0 (129 / 10.6) at 14 000 ft → 132 KIAS, 10.75 ≈ 10.8 GPH.",
    difficulty: "medium",
  },

  // ───────── Two-variable (altitude AND temperature) ─────────
  {
    id: "FPI-24", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1) Pressure altitude 7 000 ft, ISA+10 °C. The KIAS and fuel flow (GPH) are (double interpolation):",
    optionA: "153 KIAS and 13.5 GPH", optionB: "155.5 KIAS and 13.8 GPH", optionC: "150.5 KIAS and 13.3 GPH", optionD: "147 KIAS and 12.7 GPH",
    correctAnswer: "a",
    explanation: "Interpolate 7 000 ft in each block first: ISA 0 → 155.5 KIAS / 13.8 GPH, ISA+20 → 150.5 / 13.25. Then midway for ISA+10 → 153 KIAS, ≈13.5 GPH.",
    difficulty: "hard",
  },

  // ───────── Method / concept ─────────
  {
    id: "FPI-25", sectionId: "A.4.9",
    question: "Reading the CAP 697 cruise tables, interpolation is NOT required when:",
    optionA: "both the pressure altitude and the ISA deviation fall on tabulated values", optionB: "the pressure altitude is between two rows", optionC: "the temperature is between two blocks", optionD: "the aircraft mass differs from 3 400 lb",
    correctAnswer: "a",
    explanation: "Interpolate only for a value that lies between tabulated entries. If the altitude is a tabulated row AND the temperature is a tabulated block, read straight off. (Mass differing from the table's 3 400 lb is a separate correction, not a table interpolation.)",
    difficulty: "easy",
  },

  // ───────── Further cruise-table practice (reads + interpolation) ─────────
  {
    id: "FPI-27", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1) Pressure altitude 12 000 ft, ISA−10 °C. The KIAS and fuel flow (GPH) are:",
    optionA: "140 KIAS and 11.5 GPH", optionB: "143 KIAS and 11.7 GPH", optionC: "137 KIAS and 11.3 GPH", optionD: "140 KIAS and 11.7 GPH",
    correctAnswer: "a",
    explanation: "ISA−10 is midway between ISA−20 (143 KIAS / 11.7 GPH) and ISA 0 (137 / 11.3) at 12 000 ft → 140 KIAS, 11.5 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-28", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1, ISA block) Pressure altitude 3 000 ft at ISA. The fuel flow (GPH) and KTAS are:",
    optionA: "14.6 GPH and 167 KTAS", optionB: "14.3 GPH and 165 KTAS", optionC: "14.8 GPH and 170 KTAS", optionD: "14.6 GPH and 170 KTAS",
    correctAnswer: "a",
    explanation: "3 000 ft is midway between 2 000 ft (14.3 GPH / 165 KTAS) and 4 000 ft (14.8 / 170) → 14.55 ≈ 14.6 GPH, 167.5 ≈ 167 KTAS.",
    difficulty: "medium",
  },
  {
    id: "FPI-29", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.2 — 25 in Hg / 2 100 rpm) Pressure altitude 6 000 ft, ISA+20 °C. Read the manifold pressure and KIAS:",
    optionA: "24.3 in Hg and 136 KIAS", optionB: "25.0 in Hg and 139 KIAS", optionC: "24.3 in Hg and 128 KIAS", optionD: "22.5 in Hg and 136 KIAS",
    correctAnswer: "a",
    explanation: "Direct read at 6 000 ft / ISA+20 on Table 2.2.2: 24.3 in Hg, 136 KIAS.",
    difficulty: "easy",
  },
  {
    id: "FPI-30", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.3 — 23 in Hg / 2 300 rpm) Pressure altitude 12 000 ft, ISA−20 °C. Read the KIAS and KTAS:",
    optionA: "135 KIAS and 153 KTAS", optionB: "143 KIAS and 157 KTAS", optionC: "127 KIAS and 148 KTAS", optionD: "135 KIAS and 148 KTAS",
    correctAnswer: "a",
    explanation: "Direct read at 12 000 ft / ISA−20 on Table 2.2.3: 135 KIAS, 153 KTAS.",
    difficulty: "easy",
  },
  {
    id: "FPI-31", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.3.1 — economy, ISA block) Pressure altitude 5 000 ft at ISA. The KIAS and fuel flow (GPH) are:",
    optionA: "124.5 KIAS and 9.2 GPH", optionB: "124 KIAS and 9.1 GPH", optionC: "125 KIAS and 9.3 GPH", optionD: "124.5 KIAS and 9.3 GPH",
    correctAnswer: "a",
    explanation: "5 000 ft is midway between 4 000 ft (124 KIAS / 9.1 GPH) and 6 000 ft (125 / 9.3) → 124.5 KIAS, 9.2 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-32", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1, ISA+20 block) Pressure altitude 9 000 ft at ISA+20. The manifold pressure and fuel flow (GPH) are:",
    optionA: "21.5 in Hg and 12.3 GPH", optionB: "22.3 in Hg and 12.7 GPH", optionC: "20.6 in Hg and 11.8 GPH", optionD: "21.5 in Hg and 11.8 GPH",
    correctAnswer: "a",
    explanation: "9 000 ft is midway between 8 000 ft (22.3 in Hg / 12.7 GPH) and 10 000 ft (20.6 / 11.8) → 21.45 ≈ 21.5 in Hg, 12.25 ≈ 12.3 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-33", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.2, ISA−20 block) Pressure altitude 13 000 ft at ISA−20. The KIAS and fuel flow (GPH) are:",
    optionA: "118 KIAS and 9.3 GPH", optionB: "123 KIAS and 9.5 GPH", optionC: "113 KIAS and 9.1 GPH", optionD: "118 KIAS and 9.5 GPH",
    correctAnswer: "a",
    explanation: "13 000 ft is midway between 12 000 ft (123 KIAS / 9.5 GPH) and 14 000 ft (113 / 9.1) → 118 KIAS, 9.3 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-34", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.3, ISA+20 block) Pressure altitude 7 000 ft at ISA+20. The KIAS and fuel flow (GPH) are:",
    optionA: "141 KIAS and 11.5 GPH", optionB: "142 KIAS and 11.5 GPH", optionC: "140 KIAS and 11.4 GPH", optionD: "141 KIAS and 11.4 GPH",
    correctAnswer: "a",
    explanation: "7 000 ft is midway between 6 000 ft (142 KIAS / 11.5 GPH) and 8 000 ft (140 / 11.4) → 141 KIAS, 11.45 ≈ 11.5 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-35", sectionId: "A.4.9",
    question: "(CAP 697 Table 2.2.1) Pressure altitude 10 000 ft, ISA+10 °C. The KIAS and fuel flow (GPH) are:",
    optionA: "142.5 KIAS and 12.0 GPH", optionB: "145 KIAS and 12.2 GPH", optionC: "140 KIAS and 11.8 GPH", optionD: "142.5 KIAS and 12.2 GPH",
    correctAnswer: "a",
    explanation: "ISA+10 is midway between ISA 0 (145 KIAS / 12.2 GPH) and ISA+20 (140 / 11.8) at 10 000 ft → 142.5 KIAS, 12.0 GPH.",
    difficulty: "medium",
  },
  {
    id: "FPI-36", sectionId: "A.4.9",
    question: "The CAP 697 SEP1 cruise-power tables are tabulated at a cruise weight of 3 400 lb. For a lighter aircraft at the same altitude and power, the true airspeed read will be:",
    optionA: "slightly optimistic — a lighter aircraft is a little faster, so apply the manual's weight note", optionB: "exactly correct — weight has no effect", optionC: "far too high — halve the value", optionD: "irrelevant because the tables already include all weights",
    correctAnswer: "a",
    explanation: "The tabulated speeds assume 3 400 lb. A lighter aircraft flies a little faster for the same power, so the table value is slightly conservative — note the weight basis and treat it as a small correction, not a table interpolation.",
    difficulty: "easy",
  },
];

export const FPP_INTERP_COUNT = FPP_INTERP_QUESTIONS.length;
