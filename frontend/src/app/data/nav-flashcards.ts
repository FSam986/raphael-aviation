// CPL Navigation (A.9.x) flashcards. Authored in-house.

import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

import { NAV_FLASHCARDS_BOOST } from "@/app/data/nav-flashcards-boost";

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

  // ───── Formulas & numbers to memorise (added) ─────
  { id: "NFC-A91-04", sectionId: "A.9.1", front: "Departure (E–W distance) formula?", back: "Departure (NM) = ch.long (minutes) × cos(latitude). East–west distance shrinks towards the poles; = ch.long only at the equator.", difficulty: "medium" },
  { id: "NFC-A91-05", sectionId: "A.9.1", front: "Earth dimensions to know?", back: "Circumference ≈ 21 600 NM (360° × 60). Equatorial radius ≈ 3443 NM. Compression/flattening ≈ 1/297 (oblate spheroid).", difficulty: "medium" },
  { id: "NFC-A92-04", sectionId: "A.9.2", front: "Isogonals, agonic & where variation is greatest?", back: "Isogonal = line of equal variation; agonic line = zero variation. Variation is largest near the magnetic poles, smallest near the equator.", difficulty: "medium" },
  { id: "NFC-A93-02", sectionId: "A.9.3", front: "Conversions table (memorise)", back: "1 NM=1.852 km=6076 ft. 1 SM=1.609 km=5280 ft. 1 m=3.28 ft. 1 in=2.54 cm. 1 imp gal=4.55 L. 1 US gal=3.785 L. 1 L of AVGAS≈0.72 kg; Jet A-1≈0.80 kg.", difficulty: "medium" },
  { id: "NFC-A93-03", sectionId: "A.9.3", front: "Speed–time–distance triangle?", back: "D = GS × T; GS = D ÷ T; T = D ÷ GS. Use GROUNDSPEED for distance over the ground and convert minutes to decimal hours (e.g. 20 min = 0.333 h).", difficulty: "easy" },
  { id: "NFC-A93-04", sectionId: "A.9.3", front: "Fuel: endurance & required?", back: "Fuel required = fuel flow × time. Endurance = usable fuel ÷ fuel flow. Mass = volume (L) × SG.", difficulty: "easy" },
  { id: "NFC-A94-03", sectionId: "A.9.4", front: "Twilight & LMT basics?", back: "Civil twilight = sun 6° below horizon (defines night). Local Mean Time changes 1 min per 15′ of longitude. Sun/day length varies most at high latitudes.", difficulty: "medium" },
  { id: "NFC-A95-03", sectionId: "A.9.5", front: "Chart convergence & 'n' factor (Lambert)?", back: "Chart convergence = ch.long × sin(parallel of origin). The constant of the cone n = sin(parallel of origin). Earth convergence = ch.long × sin(mean lat).", difficulty: "hard" },
  { id: "NFC-A95-04", sectionId: "A.9.5", front: "Scale formula?", back: "Scale = chart length ÷ earth length. On a 1:500 000 chart, 1 cm = 5 km; 1 inch ≈ 6.86 NM. On a Mercator, departure = ch.long × cos lat still governs E–W earth distance.", difficulty: "medium" },
  { id: "NFC-A96-02", sectionId: "A.9.6", front: "Relative velocity — worked numbers", back: "Head-on 200 NM at 250+250 kt → 500 kt closing → 24 min. Overtake 30 NM at 480 vs 420 kt → 60 kt → 30 min. The gap changes only at the RELATIVE speed.", difficulty: "medium" },
  { id: "NFC-A97-03", sectionId: "A.9.7", front: "Maximum drift & the 1-in-60 for wind?", back: "Max drift (°) ≈ wind speed ÷ TAS × 60 (occurs with a direct crosswind). Drift ≈ (crosswind component ÷ TAS) × 60.", difficulty: "hard" },
  { id: "NFC-A97-04", sectionId: "A.9.7", front: "Head/crosswind components?", back: "Headwind = wind × cos(angle off nose); crosswind = wind × sin(angle). 30°→½ cross, 45°→0.7 each, 60°→nearly full crosswind.", difficulty: "medium" },
  { id: "NFC-A98-03", sectionId: "A.9.8", front: "Critical Point (equal-time point) formula?", back: "Distance to CP = (D × H) ÷ (O + H), where O = groundspeed OUT, H = groundspeed HOME (back). The CP moves towards the destination with a tailwind out.", difficulty: "hard" },
  { id: "NFC-A98-04", sectionId: "A.9.8", front: "Point of No Return (PNR) formula?", back: "Time to PNR = (E × H) ÷ (O + H), where E = safe endurance (h), O = GS out, H = GS home. PNR is a TIME/fuel limit; CP is a time-to-alternate concept.", difficulty: "hard" },
  { id: "NFC-A98-05", sectionId: "A.9.8", front: "Standard rate turn figures?", back: "Rate 1 = 3°/sec = 360° in 2 min. Bank for rate 1 ≈ (TAS÷10)+7. Turn radius (NM) ≈ TAS² ÷ (11 466 × tan bank); diameter grows with TAS².", difficulty: "hard" },
];

export function getNavFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return [...NAV_FLASHCARDS, ...NAV_FLASHCARDS_BOOST].filter((f) => f.sectionId === sectionId);
}
