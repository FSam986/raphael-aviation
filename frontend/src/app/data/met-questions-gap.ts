// Meteorology — gap-fill for sub-topics the tagging audit flagged as uncovered
// within their section (aspect-tagged so they route correctly).

import type { AirLawQuestion } from "@/app/data/airlaw-questions";

const q = (
  id: string, sectionId: string, aspect: string, question: string,
  a: string, b: string, c: string, d: string,
  correct: "a" | "b" | "c" | "d", explanation: string,
  difficulty: "easy" | "medium" | "hard", tag: "recall" | "apply" | "calc" | "trap",
): AirLawQuestion => ({ id, sectionId, aspect, question, optionA: a, optionB: b, optionC: c, optionD: d, correctAnswer: correct, explanation, difficulty, tag });

export const MET_GAP_QUESTIONS: AirLawQuestion[] = [
  // ───── A.8.6.a Gas laws ─────
  q("METG-001", "A.8.6", "A.8.6.a", "Boyle's law states that, at constant temperature, the volume of a gas is:", "directly proportional to pressure", "inversely proportional to pressure", "independent of pressure", "proportional to the square of pressure", "b", "Boyle's law: at constant temperature, V ∝ 1/P (pressure up → volume down).", "medium", "recall"),
  q("METG-002", "A.8.6", "A.8.6.a", "Charles's law states that, at constant pressure, the volume of a gas is:", "inversely proportional to absolute temperature", "directly proportional to absolute temperature", "independent of temperature", "proportional to pressure", "b", "Charles's law: at constant pressure, V ∝ T (absolute). Heat a gas and it expands.", "medium", "recall"),
  q("METG-003", "A.8.6", "A.8.6.a", "The ideal gas equation relating pressure, density and temperature is:", "P = ρRT", "P = ρ/RT", "P = R/(ρT)", "P = ρT/R", "a", "For air, P = ρRT — pressure equals density × gas constant × absolute temperature.", "hard", "recall"),
  q("METG-004", "A.8.6", "A.8.6.a", "At constant pressure, if the absolute temperature of a parcel of air increases, its density will:", "increase", "decrease", "stay the same", "double", "b", "P = ρRT at constant P: higher T → lower ρ. Warm air is less dense.", "medium", "apply"),
  q("METG-005", "A.8.6", "A.8.6.a", "At constant temperature, if pressure on a gas is halved, its volume will:", "halve", "double", "stay the same", "quarter", "b", "Boyle's law: V ∝ 1/P, so halving pressure doubles the volume.", "medium", "calc"),
  q("METG-006", "A.8.6", "A.8.6.a", "Which combination produces the LOWEST air density?", "low temperature, high pressure", "high temperature, low pressure", "low temperature, low pressure", "high temperature, high pressure", "b", "From P = ρRT, density is lowest when temperature is high and pressure is low (hot and high).", "medium", "apply"),

  // ───── A.8.15.b Runway Visual Range (RVR) ─────
  q("METG-011", "A.8.15", "A.8.15.b", "Runway Visual Range (RVR) is:", "the met visibility reported by an observer", "the range over which a pilot on the centreline can see the runway markings/lights", "the slant visual range on the approach", "the cloud base over the runway", "b", "RVR is the horizontal distance a pilot can see down the runway (markings/centreline/edge lights).", "medium", "recall"),
  q("METG-012", "A.8.15", "A.8.15.b", "RVR is normally assessed by:", "a human observer estimating distance", "transmissometers or forward-scatter sensors near the runway", "the aerodrome barometer", "satellite imagery", "b", "RVR is measured instrumentally (transmissometer / forward-scatter meters) sited along the runway.", "medium", "recall"),
  q("METG-013", "A.8.15", "A.8.15.b", "RVR is generally reported instead of met visibility when visibility is:", "above 10 km", "below about 1 500 m", "unlimited", "exactly 5 000 m", "b", "RVR is provided for low-visibility operations, typically when visibility/RVR falls below ~1 500 m.", "medium", "recall"),
  q("METG-014", "A.8.15", "A.8.15.b", "In a METAR, the group R24/0600 means:", "runway 24 has a 600 m cloud base", "RVR on runway 24 is 600 metres", "runway 24 closes in 6 minutes", "QFE on runway 24 is 600 hPa", "b", "R<rwy>/<value> reports the RVR: runway 24, RVR 600 m.", "medium", "apply"),
  q("METG-015", "A.8.15", "A.8.15.b", "Compared with met (horizontal) visibility, RVR is:", "always the same", "runway-specific and influenced by runway lighting intensity", "always greater than 10 km", "measured only in daylight", "b", "RVR is specific to a runway and is affected by the runway-light setting as well as the air's transparency.", "hard", "recall"),

  // ───── A.8.3.g Synoptic charts ─────
  q("METG-021", "A.8.3", "A.8.3.g", "On a surface synoptic chart, isobars join points of equal:", "temperature", "mean sea-level pressure", "humidity", "wind speed", "b", "Isobars connect points of equal MSL pressure.", "easy", "recall"),
  q("METG-022", "A.8.3", "A.8.3.g", "Closely-spaced isobars on a synoptic chart indicate:", "light winds", "strong winds (a steep pressure gradient)", "fog", "high temperature", "b", "Tightly-packed isobars = steep pressure gradient = strong wind.", "medium", "apply"),
  q("METG-023", "A.8.3", "A.8.3.g", "An elongated area of low pressure extending from a depression is a:", "ridge", "trough", "col", "anticyclone", "b", "A trough is an extension of low pressure; a ridge is an extension of high pressure.", "medium", "recall"),
  q("METG-024", "A.8.3", "A.8.3.g", "A 'col' on a synoptic chart is:", "a region of strong wind", "a neutral area between two highs and two lows", "the centre of a depression", "a line of equal pressure", "b", "A col is the slack-pressure region between two highs and two lows (light, variable winds).", "medium", "recall"),
  q("METG-025", "A.8.3", "A.8.3.g", "In the Southern Hemisphere, wind around a low-pressure centre (depression) blows:", "clockwise and inward", "anticlockwise and outward", "clockwise and inward (SH cyclonic)", "anticlockwise and inward", "c", "SH cyclonic flow is clockwise, blowing slightly inward toward the low (Buys Ballot's law).", "hard", "apply"),

  // ───── A.8.17.a Mid-latitude cyclones (frontal depressions) ─────
  q("METG-031", "A.8.17", "A.8.17.a", "A mid-latitude (frontal) depression forms:", "over the equator from convection", "on the polar front where warm and cold air masses meet", "in the centre of an anticyclone", "only over deserts", "b", "Mid-latitude cyclones develop as waves on the polar front between polar and tropical air.", "medium", "recall"),
  q("METG-032", "A.8.17", "A.8.17.a", "The region of warm air between the warm front and the cold front of a depression is the:", "col", "warm sector", "ridge", "occlusion", "b", "The warm sector is the wedge of warm air between the two fronts.", "medium", "recall"),
  q("METG-033", "A.8.17", "A.8.17.a", "A frontal depression typically reaches the end of its life when it becomes:", "a thunderstorm", "occluded (the cold front catches the warm front)", "an anticyclone", "a sea breeze", "b", "As the faster cold front overtakes the warm front the warm sector is lifted — the depression occludes and decays.", "medium", "recall"),
  q("METG-034", "A.8.17", "A.8.17.a", "In the Southern Hemisphere, mid-latitude depressions generally track:", "from west to east", "from east to west", "from north to south only", "they remain stationary", "a", "Steered by the mid-latitude westerlies, SH frontal depressions move generally west to east.", "medium", "recall"),
  q("METG-035", "A.8.17", "A.8.17.a", "The correct life-cycle order of a frontal depression is:", "occlusion → wave → mature", "wave (frontal) → mature → occlusion → dissipation", "mature → wave → ridge", "col → trough → ridge", "b", "It begins as a frontal wave, deepens to maturity, then occludes and fills/dissipates.", "hard", "recall"),
  q("METG-036", "A.8.17", "A.8.17.a", "As a depression passes a station, the pressure typically:", "rises steadily throughout", "falls as it approaches and rises after the cold front passes", "stays constant", "rises then falls", "b", "Pressure falls ahead of/within the warm sector and rises behind the cold front.", "medium", "apply"),
];

export function getMetGapQuestionsBySection(sectionId: string): AirLawQuestion[] {
  return MET_GAP_QUESTIONS.filter((x) => x.sectionId === sectionId);
}
