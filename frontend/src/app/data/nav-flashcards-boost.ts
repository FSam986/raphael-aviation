// Navigation flashcard depth boost — formula and fact cards across the 8 nav
// aspects (A.9.1-A.9.8). Short front/back pairs for drilling.

import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

const F = (id: string, sectionId: string, front: string, back: string, difficulty: "easy" | "medium" | "hard" = "medium"): AirLawFlashcard =>
  ({ id, sectionId, front, back, difficulty });

export const NAV_FLASHCARDS_BOOST: AirLawFlashcard[] = [
  // ── A.9.1 The Earth ──
  F("NFB-A91-01", "A.9.1", "Earth's compression (flattening)?", "≈ 1/297 (about 0.3%). Equatorial radius ~6378 km, polar ~6357 km.", "medium"),
  F("NFB-A91-02", "A.9.1", "Departure formula?", "Departure (NM) = ch.long (min) × cos(lat).", "medium"),
  F("NFB-A91-03", "A.9.1", "Change of longitude from departure?", "ch.long (min) = departure (NM) ÷ cos(lat).", "medium"),
  F("NFB-A91-04", "A.9.1", "Convergency formula?", "Convergency = ch.long (°) × sin(mean lat).", "hard"),
  F("NFB-A91-05", "A.9.1", "Graticule?", "The network of meridians (longitude) and parallels (latitude) on a chart.", "easy"),
  F("NFB-A91-06", "A.9.1", "Small circle vs great circle?", "Great circle: plane passes through Earth's centre (max diameter). Small circle: any other circle on the surface (e.g. parallels of latitude except the equator).", "medium"),
  F("NFB-A91-07", "A.9.1", "1° change of latitude = ? distance", "60 NM (1 min lat = 1 NM along a meridian).", "easy"),
  F("NFB-A91-08", "A.9.1", "Where is a longitude minute = 1 NM?", "Only at the equator; elsewhere it is 1 × cos(lat) NM.", "medium"),
  F("NFB-A91-09", "A.9.1", "Rhumb line direction property?", "Crosses every meridian at the same angle (constant track); it is a curve (spiral) except meridians/equator.", "medium"),
  F("NFB-A91-10", "A.9.1", "Great circle & the pole?", "The great circle lies on the pole-ward (higher-latitude) side of the rhumb line between two points.", "hard"),
  F("NFB-A91-11", "A.9.1", "Conversion angle?", "½ × convergency = ½ × ch.long × sin(mean lat).", "hard"),
  F("NFB-A91-12", "A.9.1", "Latitude definition?", "Angular distance N or S of the equator (0-90°), measured at the Earth's centre.", "easy"),
  // ── A.9.2 Direction / magnetism ──
  F("NFB-A92-01", "A.9.2", "Variation vs deviation?", "Variation = true↔magnetic (Earth's field). Deviation = magnetic↔compass (aircraft's own magnetism).", "medium"),
  F("NFB-A92-02", "A.9.2", "Isogonal / agonic line?", "Isogonal = line of equal variation. Agonic = line of zero variation.", "medium"),
  F("NFB-A92-03", "A.9.2", "Max angle of dip and where?", "90°, at the magnetic poles. Zero at the magnetic equator.", "medium"),
  F("NFB-A92-04", "A.9.2", "QDM 090 → QDR?", "QDR = QDM ± 180 = 270°.", "easy"),
  F("NFB-A92-05", "A.9.2", "Which variation for a VOR radial?", "Variation at the VOR station (radials are magnetic at the station).", "hard"),
  F("NFB-A92-06", "A.9.2", "Which variation for an ADF bearing?", "Variation at the aircraft.", "hard"),
  F("NFB-A92-07", "A.9.2", "QTE / QUJ?", "QTE = true bearing FROM the station. QUJ = true track TO the station.", "medium"),
  F("NFB-A92-08", "A.9.2", "True → Magnetic rule?", "Variation West → add to true (magnetic is greater). Variation East → subtract. 'West best (add), East least'.", "medium"),
  // ── A.9.3 Distance / speed / units ──
  F("NFB-A93-01", "A.9.3", "1 NM in km, ft, sm?", "1.852 km, 6076 ft, ~1.15 statute miles.", "easy"),
  F("NFB-A93-02", "A.9.3", "km → NM?", "÷ 1.852.", "easy"),
  F("NFB-A93-03", "A.9.3", "Statute miles → NM?", "÷ 1.15078 (or × 0.868).", "medium"),
  F("NFB-A93-04", "A.9.3", "Speed/distance/time?", "Time (min) = distance ÷ GS × 60. Distance = GS × time. GS = distance ÷ time.", "easy"),
  F("NFB-A93-05", "A.9.3", "Knot?", "One nautical mile per hour.", "easy"),
  F("NFB-A93-06", "A.9.3", "Latitude change from distance N/S?", "Degrees = distance (NM) ÷ 60.", "easy"),
  F("NFB-A93-07", "A.9.3", "1 metre ≈ ? ft", "3.28 ft (1 ft = 0.3048 m).", "easy"),
  // ── A.9.4 Time ──
  F("NFB-A94-01", "A.9.4", "Arc to time: 1° = ?", "4 minutes of time (15° = 1 hour, 1' arc = 4 s).", "medium"),
  F("NFB-A94-02", "A.9.4", "East/West vs UTC?", "East is ahead of UTC (add); West is behind (subtract).", "medium"),
  F("NFB-A94-03", "A.9.4", "Sidereal vs solar day?", "Sidereal day (~23 h 56 m) is shorter than the apparent solar day (~24 h).", "hard"),
  F("NFB-A94-04", "A.9.4", "Equation of time (max)?", "Up to ~16 minutes difference between mean and apparent (real) time; extremes ~Nov and ~Feb.", "hard"),
  F("NFB-A94-05", "A.9.4", "Equinox vs solstice?", "Equinox: day = night (Sun over equator, ~21 Mar/23 Sep). Solstice: longest/shortest day (~21 Jun/21 Dec).", "medium"),
  F("NFB-A94-06", "A.9.4", "Twilight sun depression angles?", "Civil 0-6°, nautical 6-12°, astronomical 12-18° below the horizon.", "hard"),
  F("NFB-A94-07", "A.9.4", "Date line crossing?", "Westbound add a day; eastbound subtract a day.", "medium"),
  F("NFB-A94-08", "A.9.4", "LMT from UTC?", "LMT = UTC ± (longitude × 4 min), + for East, − for West.", "medium"),
  // ── A.9.5 Charts ──
  F("NFB-A95-01", "A.9.5", "Mercator projection type & graticule?", "Cylindrical; rectangular graticule (meridians & parallels are straight lines at right angles, parallel spacing increases toward the poles).", "medium"),
  F("NFB-A95-02", "A.9.5", "Rhumb line & great circle on a Mercator?", "Rhumb line = straight line. Great circle = curve concave to the nearer pole (convex to the equator).", "medium"),
  F("NFB-A95-03", "A.9.5", "Mercator scale variation?", "Correct at the equator; expands as the secant of the latitude (scale too large away from the equator).", "hard"),
  F("NFB-A95-04", "A.9.5", "Lambert conformal — constant of the cone n?", "n = sin(parallel of origin) ≈ sin(mean of the two standard parallels).", "hard"),
  F("NFB-A95-05", "A.9.5", "Great circle & rhumb line on a Lambert?", "Great circle ≈ straight line; rhumb line curves concave to the parallel of origin.", "hard"),
  F("NFB-A95-06", "A.9.5", "Lambert scale?", "Correct along the two standard parallels; essentially constant for practical nav over the chart.", "medium"),
  F("NFB-A95-07", "A.9.5", "Conformal (orthomorphic) chart?", "Angles/bearings are correctly represented and scale is the same in all directions at a point.", "medium"),
  F("NFB-A95-08", "A.9.5", "Chart convergence on a Lambert?", "ch.long × n (n = constant of the cone).", "hard"),
  F("NFB-A95-09", "A.9.5", "Scale as a representative fraction?", "1:n means 1 chart unit = n ground units (e.g. 1:1 000 000, 1 cm = 10 km).", "medium"),
  // ── A.9.6 Speed of opening/closing ──
  F("NFB-A96-01", "A.9.6", "Closing speed (head-on)?", "Sum of the two groundspeeds.", "easy"),
  F("NFB-A96-02", "A.9.6", "Closing/opening speed (same track)?", "Difference of the two groundspeeds.", "easy"),
  F("NFB-A96-03", "A.9.6", "Time to close a gap?", "Time = distance ÷ closing speed.", "easy"),
  // ── A.9.7 Nav computer / triangle of velocities ──
  F("NFB-A97-01", "A.9.7", "Local speed of sound?", "a = 38.95 × √(T in Kelvin) knots.", "hard"),
  F("NFB-A97-02", "A.9.7", "TAS from Mach?", "TAS = Mach × a = Mach × 38.95√T(K).", "hard"),
  F("NFB-A97-03", "A.9.7", "Headwind / crosswind components?", "Headwind = wind × cos(angle). Crosswind = wind × sin(angle) (angle between wind and track).", "medium"),
  F("NFB-A97-04", "A.9.7", "Triangle of velocities vectors?", "Heading + TAS (air vector) + W/V (wind) = Track + GS (ground vector).", "medium"),
  F("NFB-A97-05", "A.9.7", "Drift?", "Angle between heading and track. Starboard (right) drift: track is right of heading.", "medium"),
  F("NFB-A97-06", "A.9.7", "ISA temperature at altitude?", "15 − 1.98 × (alt ft/1000)°C, down to −56.5°C at the tropopause (36 090 ft).", "medium"),
  F("NFB-A97-07", "A.9.7", "Fuel required?", "Fuel = fuel flow × time.", "easy"),
  F("NFB-A97-08", "A.9.7", "Mach from TAS?", "Mach = TAS ÷ a = TAS ÷ 38.95√T(K).", "hard"),
  // ── A.9.8 Track corrections (1-in-60) ──
  F("NFB-A98-01", "A.9.8", "1-in-60 rule?", "1 NM off at 60 NM ≈ 1° error. Track error = 60 × (distance off ÷ distance gone).", "medium"),
  F("NFB-A98-02", "A.9.8", "Closing angle (to regain track by destination)?", "60 × (distance off ÷ distance to go).", "medium"),
  F("NFB-A98-03", "A.9.8", "Total heading alteration to make good the destination?", "Track error + closing angle.", "hard"),
  F("NFB-A98-04", "A.9.8", "Off 4 NM after 60 NM — track error?", "60 × 4/60 = 4°.", "medium"),
  F("NFB-A98-05", "A.9.8", "Why re-check drift after altering?", "A heading change alters the drift; recompute to keep making good the required track.", "medium"),
];
