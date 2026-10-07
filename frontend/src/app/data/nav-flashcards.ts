// CPL Navigation (A.9.x) flashcards. Authored in-house.

import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

export const NAV_FLASHCARDS: AirLawFlashcard[] = [
  { id: "NFC-A91-01", sectionId: "A.9.1", front: "1 minute of latitude = ?", back: "1 NM (along a meridian). 1° = 60 NM. A longitude minute is only 1 NM at the equator (× cos lat elsewhere).", difficulty: "easy" },
  { id: "NFC-A91-02", sectionId: "A.9.1", front: "Great circle vs rhumb line?", back: "Great circle = shortest distance (plane through earth's centre), cuts meridians at changing angles. Rhumb line = constant direction, cuts every meridian at the same angle (longer).", difficulty: "medium" },
  { id: "NFC-A91-03", sectionId: "A.9.1", front: "Convergency & conversion angle?", back: "Convergency = ch.long × sin(mean lat). Conversion angle = ½ convergency. The great circle lies on the pole-ward side of the rhumb line.", difficulty: "hard" },
  { id: "NFC-A92-01", sectionId: "A.9.2", front: "True → Compass conversion?", back: "True →(variation)→ Magnetic →(deviation)→ Compass. Variation/Deviation West → Best (add); East → least (subtract).", difficulty: "medium" },
  { id: "NFC-A92-02", sectionId: "A.9.2", front: "QDM / QDR / QTE / QUJ?", back: "QDM = magnetic TO station; QDR = magnetic FROM (= QDM±180); QTE = true FROM; QUJ = true TO.", difficulty: "medium" },
  { id: "NFC-A92-03", sectionId: "A.9.2", front: "Which variation for a VOR radial vs ADF bearing?", back: "VOR radial: variation at the STATION. ADF bearing: variation at the AIRCRAFT.", difficulty: "hard" },
  { id: "NFC-A93-01", sectionId: "A.9.3", front: "1 NM = ? (km / ft / st mi)", back: "1.852 km = 6076 ft ≈ 1.15 statute miles = 1 minute of latitude. Knots = NM/hour.", difficulty: "easy" },
  { id: "NFC-A94-01", sectionId: "A.9.4", front: "Arc-to-time rule?", back: "360° = 24 h → 15° = 1 h, 1° = 4 min, 15′ = 1 min. East ahead of UTC, West behind.", difficulty: "medium" },
  { id: "NFC-A94-02", sectionId: "A.9.4", front: "Date line crossing?", back: "Crossing westbound add a day; eastbound subtract a day. (Axial tilt 23.5° gives seasons; equinox = equal day/night.)", difficulty: "medium" },
  { id: "NFC-A95-01", sectionId: "A.9.5", front: "Mercator — lines & scale?", back: "Rhumb line STRAIGHT, great circle CURVED (concave to equator). Scale correct only at the equator, expands × sec lat — measure at the mid-latitude.", difficulty: "medium" },
  { id: "NFC-A95-02", sectionId: "A.9.5", front: "Lambert Conformal — lines & scale?", back: "Great circle ~STRAIGHT, rhumb line curved. Scale near-constant (correct at the two standard parallels). Meridians converge — ideal for radio nav.", difficulty: "medium" },
  { id: "NFC-A96-01", sectionId: "A.9.6", front: "Relative speed — converging vs same track?", back: "Converging/opposite: relative speed = SUM of groundspeeds. Same track: DIFFERENCE. Time to close = distance ÷ relative speed.", difficulty: "medium" },
  { id: "NFC-A97-01", sectionId: "A.9.7", front: "Triangle of velocities?", back: "Air vector (heading + TAS) + Wind vector (from + speed) = Ground vector (track + groundspeed). Drift = heading − track.", difficulty: "medium" },
  { id: "NFC-A97-02", sectionId: "A.9.7", front: "Wind correction angle — which way?", back: "Applied INTO the wind so the aircraft makes good the required track; head/tailwind changes GS, crosswind causes drift.", difficulty: "medium" },
  { id: "NFC-A98-01", sectionId: "A.9.8", front: "1-in-60 rule?", back: "Track error = (off-track ÷ distance gone) × 60. Closing angle = (off-track ÷ distance to go) × 60. To regain track: alter by track error + closing angle.", difficulty: "hard" },
  { id: "NFC-A98-02", sectionId: "A.9.8", front: "How many position lines for a fix?", back: "Two crossing position lines give a fix (three is best). A VOR radial, a QTE/bearing or a DME arc are position lines.", difficulty: "easy" },
];

export function getNavFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return NAV_FLASHCARDS.filter((f) => f.sectionId === sectionId);
}
