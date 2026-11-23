// CPL FPP — A.4.3 Stages of Flight (the appendix aspect had no questions).
// Original questions written against fpp-notes-full.ts.
import type { AirLawQuestion } from "./airlaw-questions";

type Q = [string, string, string, string, string, AirLawQuestion["correctAnswer"], string, AirLawQuestion["difficulty"]];
const RAW: Q[] = [
  ["The take-off DISTANCE of a light aeroplane is measured from brake release to:", "lift-off", "the point where the gear is retracted", "a screen height of 50 ft", "1 500 ft above the runway", "c", "Take-off distance runs to the screen height — 50 ft for light aeroplanes (35 ft for Class A dry). Brake release to lift-off is the take-off run/ground roll.", "easy"],
  ["The landing distance is measured from:", "touchdown to a full stop", "the 50 ft screen over the threshold to a full stop", "the threshold to the turn-off", "1 000 ft on the approach to touchdown", "b", "Landing distance = airborne segment from the 50 ft screen plus the ground roll to a full stop.", "easy"],
  ["The correct order of the take-off speeds is:", "VR, V1, VLOF, V2", "V1, VLOF, VR, V2", "V1, VR, VLOF, V2", "V2, V1, VR, VLOF", "c", "Decision (V1), rotate (VR), lift-off (VLOF), take-off safety speed (V2) by the screen height.", "easy"],
  ["For a twin-engine Class A aeroplane the most limiting take-off climb segment is usually the:", "first segment (gear retracting)", "second segment (gear up, take-off flap, V2) — 2.4 %", "third segment (acceleration)", "final segment (clean) — 1.2 %", "b", "The second segment needs 2.4 % on one engine with take-off flap at V2 and usually sets the climb limit.", "medium"],
  ["Using CAP 698, the MEP1 all-engines take-off climb gradient at screen height must be at least:", "0.75 %", "2.5 %", "4 %", "measurably positive", "c", "All engines operating: 4 % at screen height. OEI: measurably positive at 400 ft and 0.75 % at 1 500 ft.", "medium"],
  ["With one engine inoperative, the MEP1 gradient required at 1 500 ft above the take-off surface is:", "measurably positive", "0.75 %", "2.4 %", "4 %", "b", "OEI: measurably positive at 400 ft, at least 0.75 % at 1 500 ft (CAP 698 MEP1).", "medium"],
  ["Maximum take-off power on the MEP1 may be used for a maximum of:", "1 minute", "5 minutes", "10 minutes", "until reaching 1 500 ft", "b", "Take-off power is limited to 5 minutes from the start of the take-off climb, then maximum continuous power.", "medium"],
  ["The balked landing requirement for the MEP1 is a gross gradient of at least:", "1.2 % gear up, approach flap", "2.5 % gear down, landing flap, at VREF", "4 % gear up, take-off flap", "0.75 % gear down", "b", "≥ 2.5 % with power available 8 s after moving the throttles to take-off, gear down, landing flap, at VREF.", "hard"],
  ["Compared with a light aeroplane, a heavier aeroplane gliding at its best-glide speed will have:", "a steeper glide angle", "the same glide angle at a higher speed", "a flatter glide angle", "the same glide speed", "b", "Glide angle depends on L/D only; a heavier aeroplane achieves it at a higher speed and higher rate of descent.", "medium"],
  ["VREF, the speed at the 50 ft screen on landing, must not be less than:", "1.1 VSO", "1.2 VS1", "1.3 VSO", "VMCA", "c", "VREF ≥ 1.3 VSO (1.23 VSR0 under current CS-25).", "medium"],
  ["Rate of descent on a 3° approach at a groundspeed of 120 kt is approximately:", "360 fpm", "600 fpm", "900 fpm", "1 200 fpm", "b", "Rule of thumb: groundspeed × 5 ≈ 600 fpm for a 3° (≈ 300 ft/nm) path.", "medium"],
  ["CAP 698 assumes a light twin will not be flying above the altitude at which its all-engines rate of climb is:", "0 fpm", "50 fpm", "100 fpm", "300 fpm", "d", "En-route assumption in CAP 698: not above the altitude where the all-engines ROC is 300 fpm.", "hard"],
];

export const FPP_STAGES_QUESTIONS: AirLawQuestion[] = RAW.map(([question, optionA, optionB, optionC, optionD, correctAnswer, explanation, difficulty], i) => ({
  id: `FPP-STG-${i + 1}`, sectionId: "A.4.3", question, optionA, optionB, optionC, optionD, correctAnswer, explanation, difficulty,
}));
