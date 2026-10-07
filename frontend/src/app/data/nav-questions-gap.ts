// Navigation — gap-fill questions for thin/uncovered sub-topics (aspect-tagged).

import type { AirLawQuestion } from "@/app/data/airlaw-questions";

const q = (
  id: string, sectionId: string, aspect: string, question: string,
  a: string, b: string, c: string, d: string,
  correct: "a" | "b" | "c" | "d", explanation: string,
  difficulty: "easy" | "medium" | "hard", tag: "recall" | "apply" | "calc" | "trap",
): AirLawQuestion => ({ id, sectionId, aspect, question, optionA: a, optionB: b, optionC: c, optionD: d, correctAnswer: correct, explanation, difficulty, tag });

export const NAV_GAP_QUESTIONS: AirLawQuestion[] = [
  // ───── A.9.4.b Equinox, solstice, Tropics ─────
  q("NAVG-301", "A.9.4", "A.9.4.b", "At the equinoxes the sun is overhead the:", "Tropic of Cancer", "equator", "Tropic of Capricorn", "poles", "b", "At the equinoxes (≈21 Mar, 23 Sep) the sun's declination is 0° — overhead the equator.", "easy", "recall"),
  q("NAVG-302", "A.9.4", "A.9.4.b", "At the June solstice the sun is overhead the:", "Tropic of Capricorn (23½°S)", "equator", "Tropic of Cancer (23½°N)", "Arctic Circle (66½°N)", "c", "≈21 June the sun reaches maximum northerly declination, overhead the Tropic of Cancer (23½°N).", "medium", "recall"),
  q("NAVG-303", "A.9.4", "A.9.4.b", "The latitude of the Tropic of Capricorn is approximately:", "23½°S", "23½°N", "66½°S", "45°S", "a", "The Tropic of Capricorn lies at ~23½°S — the sun's southern-most overhead point (Dec solstice).", "easy", "recall"),
  q("NAVG-304", "A.9.4", "A.9.4.b", "Day and night are of (approximately) equal length everywhere on earth at the:", "solstices", "equinoxes", "perihelion", "aphelion", "b", "At the equinoxes the day/night lengths are ~equal worldwide because the sun is over the equator.", "medium", "recall"),
  q("NAVG-305", "A.9.4", "A.9.4.b", "The maximum value of the sun's declination is about:", "0°", "23½°", "45°", "66½°", "b", "The sun's declination varies between 23½°N and 23½°S over the year (the Earth's axial tilt).", "medium", "recall"),
  q("NAVG-306", "A.9.4", "A.9.4.b", "At the December solstice, in the Southern Hemisphere it is:", "mid-winter with the shortest day", "mid-summer with the longest day", "the autumn equinox", "the spring equinox", "b", "December solstice = sun over the Tropic of Capricorn → Southern Hemisphere mid-summer (longest day).", "medium", "apply"),

  // ───── A.9.6.a Relative velocity ─────
  q("NAVG-311", "A.9.6", "A.9.6.a", "Two aircraft fly directly toward each other at 300 kt and 420 kt TAS. Their closing speed is:", "120 kt", "360 kt", "720 kt", "60 kt", "c", "Head-on, closing speed = sum of speeds = 300 + 420 = 720 kt.", "easy", "calc"),
  q("NAVG-312", "A.9.6", "A.9.6.a", "Aircraft A overtakes aircraft B on the same track at 480 kt and 400 kt respectively. The closing (overtaking) speed is:", "880 kt", "80 kt", "40 kt", "440 kt", "b", "Same direction: closing speed = difference = 480 − 400 = 80 kt.", "easy", "calc"),
  q("NAVG-313", "A.9.6", "A.9.6.a", "Two aircraft are 120 NM apart, approaching head-on with a closing speed of 600 kt. Time to pass is:", "6 min", "12 min", "20 min", "2 min", "b", "Time = distance / closing speed = 120 / 600 h = 0.2 h = 12 min.", "medium", "calc"),
  q("NAVG-314", "A.9.6", "A.9.6.a", "Overtaking at a closing speed of 40 kt, how long to close a 10 NM gap?", "10 min", "15 min", "25 min", "4 min", "b", "Time = 10 / 40 h = 0.25 h = 15 min.", "medium", "calc"),
  q("NAVG-315", "A.9.6", "A.9.6.a", "Closing speed is greatest when two aircraft are:", "on the same track, same direction", "head-on (reciprocal tracks)", "on tracks 90° apart", "both stationary", "b", "Head-on gives the maximum relative/closing speed (the sum of the two speeds).", "easy", "recall"),
  q("NAVG-316", "A.9.6", "A.9.6.a", "A controller needs a given time separation at a fix. For aircraft at the same speed, the required distance separation is obtained from:", "speed × time", "speed ÷ time", "time ÷ speed", "distance × time", "a", "Distance = speed × time; e.g. 420 kt and 3 min → 420 × 0.05 = 21 NM.", "medium", "apply"),
  q("NAVG-317", "A.9.6", "A.9.6.a", "Two aircraft 90 NM apart close head-on at 540 kt. After 5 minutes the remaining separation is:", "45 NM", "55 NM", "35 NM", "90 NM", "a", "In 5 min (1/12 h) they close 540/12 = 45 NM; 90 − 45 = 45 NM remaining.", "hard", "calc"),
  q("NAVG-318", "A.9.6", "A.9.6.a", "The rate of closure between two aircraft on crossing tracks is:", "always the sum of their speeds", "always the difference of their speeds", "the component of each velocity along the line joining them", "zero unless speeds are equal", "c", "On crossing tracks, closure = the sum of the velocity components resolved along the line between the aircraft.", "hard", "apply"),
];

export function getNavGapQuestionsBySection(sectionId: string): AirLawQuestion[] {
  return NAV_GAP_QUESTIONS.filter((x) => x.sectionId === sectionId);
}
