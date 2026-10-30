// SACAA CPL — NAVIGATION: INTERPOLATION
//
// Method-based interpolation questions (the given values are self-contained, so
// every answer is verifiable arithmetic — no copyrighted chart needed):
//   • Winds aloft — interpolating a forecast wind between two flight levels or
//     two reporting points  (A.9.7 — triangle of velocities / nav computer).
//   • Magnetic variation — interpolating between isogonals  (A.9.2 — direction).
// These also flow into PPL Navigation (which reuses this bank by section).
// Interpolation was absent from the Nav bank; this set fills that gap.

import type { AirLawQuestion } from "@/app/data/airlaw-questions";

export const NAV_INTERP_QUESTIONS: AirLawQuestion[] = [
  // ───────── Winds aloft — between flight levels (A.9.7) ─────────
  {
    id: "NAV-INT-01", sectionId: "A.9.7",
    question: "Forecast wind is 240°/20 kt at FL100 and 280°/40 kt at FL180. The interpolated wind at FL140 is:",
    optionA: "260°/30 kt", optionB: "240°/20 kt", optionC: "280°/40 kt", optionD: "250°/25 kt",
    correctAnswer: "a",
    explanation: "FL140 is midway between FL100 and FL180, so take the mean of both components: direction (240+280)/2 = 260°, speed (20+40)/2 = 30 kt. B/C use a single level without interpolating.",
    difficulty: "medium",
  },
  {
    id: "NAV-INT-02", sectionId: "A.9.7",
    question: "Forecast wind is 210°/10 kt at FL050 and 250°/30 kt at FL150. The interpolated wind at FL100 is:",
    optionA: "230°/20 kt", optionB: "210°/10 kt", optionC: "250°/30 kt", optionD: "230°/30 kt",
    correctAnswer: "a",
    explanation: "FL100 is midway between FL050 and FL150: direction (210+250)/2 = 230°, speed (10+30)/2 = 20 kt.",
    difficulty: "medium",
  },
  {
    id: "NAV-INT-03", sectionId: "A.9.7",
    question: "Forecast wind is 200°/20 kt at FL100 and 240°/40 kt at FL200. The interpolated wind at FL130 is:",
    optionA: "212°/26 kt", optionB: "220°/30 kt", optionC: "208°/24 kt", optionD: "200°/20 kt",
    correctAnswer: "a",
    explanation: "FL130 is 3/10 of the way from FL100 to FL200: direction 200 + 0.3×40 = 212°, speed 20 + 0.3×20 = 26 kt. B is the midpoint (FL150), not FL130.",
    difficulty: "hard",
  },
  {
    id: "NAV-INT-04", sectionId: "A.9.7",
    question: "Over the leg, the wind is 270°/30 kt at the start point and 300°/50 kt at the end point. Halfway along the leg the wind used for the DR calculation is:",
    optionA: "285°/40 kt", optionB: "270°/30 kt", optionC: "300°/50 kt", optionD: "290°/40 kt",
    correctAnswer: "a",
    explanation: "Halfway: direction (270+300)/2 = 285°, speed (30+50)/2 = 40 kt.",
    difficulty: "medium",
  },
  {
    id: "NAV-INT-05", sectionId: "A.9.7",
    question: "Forecast winds are tabulated at FL100 and FL180 only. To obtain the wind at FL140 you should:",
    optionA: "interpolate midway between the FL100 and FL180 winds", optionB: "use the FL100 wind (nearest below)", optionC: "use the FL180 wind (nearest above)", optionD: "add the two winds together",
    correctAnswer: "a",
    explanation: "FL140 lies between the two tabulated levels, so interpolate linearly — at the midpoint, the mean of the two directions and the two speeds.",
    difficulty: "easy",
  },

  // ───────── Magnetic variation — between isogonals (A.9.2) ─────────
  {
    id: "NAV-INT-06", sectionId: "A.9.2",
    question: "Variation is 10°W at position A and 16°W at position B. An aircraft one-third of the way from A to B should apply a variation of:",
    optionA: "12°W", optionB: "11°W", optionC: "13°W", optionD: "14°W",
    correctAnswer: "a",
    explanation: "Interpolate: 10 + (1/3)×(16−10) = 10 + 2 = 12°W.",
    difficulty: "medium",
  },
  {
    id: "NAV-INT-07", sectionId: "A.9.2",
    question: "Variation is 5°E at X and 1°W at Y. Midway between X and Y the variation is:",
    optionA: "2°E", optionB: "2°W", optionC: "3°E", optionD: "0° (none)",
    correctAnswer: "a",
    explanation: "Treat east as + and west as −: (+5 + (−1)) / 2 = +2 → 2°E. The sign change from E to W is why the midpoint is not simply '3'.",
    difficulty: "hard",
  },
  {
    id: "NAV-INT-08", sectionId: "A.9.2",
    question: "An aircraft lies three-quarters of the way from the 8°W isogonal toward the 12°W isogonal. The variation to apply is:",
    optionA: "11°W", optionB: "10°W", optionC: "9°W", optionD: "12°W",
    correctAnswer: "a",
    explanation: "8 + 0.75×(12−8) = 8 + 3 = 11°W.",
    difficulty: "medium",
  },
  {
    id: "NAV-INT-09", sectionId: "A.9.2",
    question: "Isogonals on the chart are drawn at 2° intervals (e.g. 10°W and 12°W). A position exactly midway between two adjacent isogonals has a variation that is:",
    optionA: "the mean of the two — e.g. 11°W", optionB: "equal to the nearer isogonal", optionC: "the sum of the two", optionD: "always the lower value",
    correctAnswer: "a",
    explanation: "Variation changes smoothly between isogonals, so a midway position takes the mean — between 10°W and 12°W that is 11°W.",
    difficulty: "easy",
  },
];

export const NAV_INTERP_COUNT = NAV_INTERP_QUESTIONS.length;
