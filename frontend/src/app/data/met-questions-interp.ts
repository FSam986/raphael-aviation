// SACAA CPL — METEOROLOGY: INTERPOLATION
//
// Method-based interpolation (self-contained given values → verifiable arithmetic;
// no copyrighted chart needed):
//   • Upper winds — interpolating a spot wind between tabulated flight levels or
//     between two grid points  (A.8.8 — pressure & wind).
//   • Temperature aloft — interpolating between levels  (A.8.3 — temperature).
//   • Method / forecast-chart use  (A.8.21 — analysis & forecasting).
// These also flow into PPL Meteorology and IR Meteorology (which reuse this bank
// by section). Interpolation was nearly absent from the Met bank; this fills it.

import type { MetQuestion } from "@/app/data/met-questions";

export const MET_INTERP_QUESTIONS: MetQuestion[] = [
  // ───────── Upper winds — between flight levels / grid points (A.8.8) ─────────
  {
    id: "MET-INT-01", sectionId: "A.8.8",
    question: "A spot-wind chart gives 200°/20 kt at FL100 and 240°/40 kt at FL200. The interpolated wind at FL150 is:",
    optionA: "220°/30 kt", optionB: "200°/20 kt", optionC: "240°/40 kt", optionD: "220°/40 kt",
    correctAnswer: "a",
    explanation: "FL150 is midway between FL100 and FL200: direction (200+240)/2 = 220°, speed (20+40)/2 = 30 kt.",
    difficulty: "medium",
  },
  {
    id: "MET-INT-02", sectionId: "A.8.8",
    question: "Upper winds are 150°/10 kt at FL050 and 190°/30 kt at FL100. The interpolated wind at FL075 is:",
    optionA: "170°/20 kt", optionB: "150°/10 kt", optionC: "190°/30 kt", optionD: "170°/30 kt",
    correctAnswer: "a",
    explanation: "FL075 is midway between FL050 and FL100: direction (150+190)/2 = 170°, speed (10+30)/2 = 20 kt.",
    difficulty: "medium",
  },
  {
    id: "MET-INT-03", sectionId: "A.8.8",
    question: "Wind is 350°/20 kt at FL100 and 030°/40 kt at FL200. The interpolated wind at FL150 is:",
    optionA: "010°/30 kt", optionB: "190°/30 kt", optionC: "020°/30 kt", optionD: "000°/30 kt",
    correctAnswer: "a",
    explanation: "Interpolate the SHORT way across north: 350° to 030° is +40°, so the midpoint is 350 + 20 = 010°; speed (20+40)/2 = 30 kt. Averaging the numbers directly (350+30)/2 = 190° goes the wrong way round the compass — the classic trap.",
    difficulty: "hard",
  },
  {
    id: "MET-INT-04", sectionId: "A.8.8",
    question: "At one grid point the wind is 270°/40 kt and at the adjacent grid point 310°/60 kt. Midway between them the wind is:",
    optionA: "290°/50 kt", optionB: "270°/40 kt", optionC: "310°/60 kt", optionD: "280°/50 kt",
    correctAnswer: "a",
    explanation: "Midway: direction (270+310)/2 = 290°, speed (40+60)/2 = 50 kt.",
    difficulty: "medium",
  },

  // ───────── Temperature aloft — between levels (A.8.3) ─────────
  {
    id: "MET-INT-05", sectionId: "A.8.3",
    question: "Forecast temperature is −5 °C at FL100 and −25 °C at FL180. The interpolated temperature at FL140 is:",
    optionA: "−15 °C", optionB: "−10 °C", optionC: "−20 °C", optionD: "−30 °C",
    correctAnswer: "a",
    explanation: "FL140 is midway between FL100 and FL180: (−5 + −25)/2 = −15 °C.",
    difficulty: "medium",
  },
  {
    id: "MET-INT-06", sectionId: "A.8.3",
    question: "The temperature is +15 °C at mean sea level and −9 °C at 4 000 ft. The interpolated temperature at 2 500 ft is:",
    optionA: "0 °C", optionB: "+3 °C", optionC: "−3 °C", optionD: "+6 °C",
    correctAnswer: "a",
    explanation: "2 500 ft is 0.625 of the way from 0 to 4 000 ft: 15 + 0.625×(−9 − 15) = 15 − 15 = 0 °C (a lapse of 6 °C per 1 000 ft).",
    difficulty: "hard",
  },
  {
    id: "MET-INT-07", sectionId: "A.8.3",
    question: "Forecast upper-air temperature is −32 °C at FL240 and −44 °C at FL300. The interpolated temperature at FL270 is:",
    optionA: "−38 °C", optionB: "−36 °C", optionC: "−40 °C", optionD: "−42 °C",
    correctAnswer: "a",
    explanation: "FL270 is midway between FL240 and FL300: (−32 + −44)/2 = −38 °C.",
    difficulty: "medium",
  },

  // ───────── Method / forecast-chart use (A.8.21) ─────────
  {
    id: "MET-INT-08", sectionId: "A.8.21",
    question: "A spot-wind/temperature chart tabulates values at fixed flight levels only. For a cruise level between two of them, you should:",
    optionA: "interpolate between the levels immediately above and below", optionB: "always use the next-higher tabulated level", optionC: "always use the next-lower tabulated level", optionD: "use the surface value",
    correctAnswer: "a",
    explanation: "Charted winds/temperatures vary smoothly with height, so for an intermediate level interpolate linearly between the bracketing tabulated levels.",
    difficulty: "easy",
  },
  {
    id: "MET-INT-09", sectionId: "A.8.21",
    question: "When interpolating a wind DIRECTION that passes through north (e.g. 350° and 030°), you must:",
    optionA: "interpolate the short way around the compass (350→360→030)", optionB: "average the two numbers directly (350+30)/2", optionC: "always use the larger number", optionD: "ignore direction and interpolate speed only",
    correctAnswer: "a",
    explanation: "Direction is circular: 350° to 030° is only 40° the short way, giving a midpoint of 010°. Averaging the raw numbers gives 190° — the reciprocal region — which is wrong.",
    difficulty: "medium",
  },
];

export const MET_INTERP_COUNT = MET_INTERP_QUESTIONS.length;
