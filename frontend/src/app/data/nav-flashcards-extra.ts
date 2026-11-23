// CPL General Navigation — extra recall cards so every A.9 section has ≥ 16.
// Written against nav-notes-full.ts.
import type { AirLawFlashcard } from "./airlaw-flashcards";

type D = AirLawFlashcard["difficulty"];
const n: Record<string, number> = {};
const C = (sectionId: string, front: string, back: string, difficulty: D = "medium"): AirLawFlashcard => {
  n[sectionId] = (n[sectionId] ?? 0) + 1;
  return { id: `NAVX-${sectionId.slice(2)}-${n[sectionId]}`, sectionId, front, back, difficulty };
};

export const NAV_FLASHCARDS_EXTRA: AirLawFlashcard[] = [
  // A.9.1
  C("A.9.1", "Great circle vertex?", "The point nearest the pole, where the great circle runs exactly 090/270°."),
  C("A.9.1", "Easterly GC track in the southern hemisphere — increases or decreases?", "Decreases (by the convergency). Northern hemisphere: increases.", "hard"),
  // A.9.2
  C("A.9.2", "Track 255°T, var 18°W, dev 2°E — compass?", "273°M → 271°C.", "hard"),
  C("A.9.2", "Compass 140°C, dev 3°W, var 22°W — true?", "137°M → 115°T.", "hard"),
  C("A.9.2", "QDM 045°, station variation 20°W — QDR, QTE, QUJ?", "QDR 225°; QTE 205°T; QUJ 025°T.", "hard"),
  C("A.9.2", "Which variation for a VDF/VOR bearing? For an ADF bearing?", "VDF/VOR: at the STATION. ADF: at the AIRCRAFT."),
  C("A.9.2", "Agonic line?", "Line joining places of zero variation.", "easy"),
  // A.9.3
  C("A.9.3", "250 km in nm?", "≈ 135 nm (× 0.54)."),
  C("A.9.3", "1 statute mile in feet and nm?", "5 280 ft; 0.869 nm.", "easy"),
  C("A.9.3", "Equator to pole in nm and km?", "5 400 nm; 10 000 km."),
  C("A.9.3", "1′ of longitude at 60° latitude?", "0.5 nm (cos 60)."),
  C("A.9.3", "Where do you measure distance on a Mercator chart?", "On the latitude scale at the mid-latitude of the line."),
  // A.9.4
  C("A.9.4", "Perihelion and aphelion dates?", "Perihelion ≈ 3 Jan (nearest the Sun); aphelion ≈ 4 Jul.", "easy"),
  C("A.9.4", "LMT at 031°E when UTC is 0800?", "31 × 4 = 124 min → 1004 LMT."),
  C("A.9.4", "UTC when LMT is 1530 at 018°W?", "1530 + 0112 = 1642 UTC."),
  C("A.9.4", "Crossing the date line westbound?", "Add a day. Eastbound: subtract a day."),
  C("A.9.4", "Why is the apparent solar day not constant?", "Elliptical orbit (speed varies) and the axial tilt."),
  // A.9.5
  C("A.9.5", "Mercator scale at 60° vs equator?", "Twice as large (scale ∝ sec lat)."),
  C("A.9.5", "Lambert chart convergency formula?", "ch.long × sin(parallel of origin) — constant."),
  C("A.9.5", "Lambert scale between the standard parallels?", "Smaller (contracted) than stated; larger outside them."),
  C("A.9.5", "On which chart are rhumb lines straight? GCs nearly straight?", "Rhumb lines straight: Mercator. GCs ≈ straight: Lambert."),
  // A.9.6
  C("A.9.6", "Closing speed head-on?", "Sum of the groundspeeds.", "easy"),
  C("A.9.6", "Closing speed in trail?", "Difference of the groundspeeds.", "easy"),
  C("A.9.6", "A and B 180 nm apart head-on at 240 and 200 kt — time to meet?", "180 ÷ 440 h ≈ 24.5 min."),
  C("A.9.6", "Time to reduce a 25 nm gap to 10 nm closing at 60 kt?", "15 ÷ 60 h = 15 min."),
  C("A.9.6", "Controlled time of arrival — required GS?", "Distance to go ÷ time available."),
  C("A.9.6", "120 nm to go, 35 min available — GS?", "≈ 206 kt."),
  C("A.9.6", "Collision-course indication?", "Constant relative bearing with decreasing range."),
  C("A.9.6", "When must groundspeeds (not TAS) be used?", "When the aircraft are on different tracks with wind."),
  C("A.9.6", "Lose 4 min over the last 60 nm at 180 kt — new GS?", "60 ÷ 0.4 h = 150 kt.", "hard"),
  C("A.9.6", "Time separation → distance?", "Distance = following aircraft's GS × time."),
  C("A.9.6", "Leader faster than follower in trail?", "The gap opens at the speed difference."),
  // A.9.7
  C("A.9.7", "Maximum drift rule of thumb?", "≈ 60 × wind speed ÷ TAS."),
  C("A.9.7", "Which way do you turn for the wind correction?", "Into wind — heading is upwind of track."),
  C("A.9.7", "Compressibility effect on the ASI?", "Over-reads above ~300 kt TAS → subtract the correction (EAS < RAS)."),
  C("A.9.7", "186 nm at GS 132 kt — EET?", "≈ 1 h 24.5 min."),
  // A.9.8
  C("A.9.8", "SA plotting chart projection and scale?", "Lambert conformal conic, 1 : 5 000 000 (1 cm ≈ 27 nm)."),
  C("A.9.8", "Single PL across track checks…? Along track…?", "Across: groundspeed. Along: track."),
  C("A.9.8", "Plotting an NDB bearing?", "MH + RB → magnetic to the NDB; aircraft variation → true; reciprocal, plot from the NDB."),
  C("A.9.8", "Wind found from a fix?", "Vector from the air position to the fix (for the time elapsed)."),
  C("A.9.8", "TOD for 8 000 ft at 500 fpm, GS 150?", "16 min → 40 nm before."),
  C("A.9.8", "Running fix?", "Transfer the first PL along the track made good by the distance flown; cross with the second PL."),
];
