// IR Air Law & All-Weather Operations (C.3) — the Air Law parts reuse the CPL
// Air Law material (definitions, airspace/AIP/charts, Annex 14). The pure
// flight-procedure sections (general procedures, altimeter setting, departure,
// arrival/approach) come from the uploaded Flight Procedures textbook and stay
// unmapped here until built.

import { AIRLAW_ALL_QUESTIONS, getAirLawQuestionsBySection, type AirLawQuestion } from "@/app/data/airlaw-questions";
import { getAirLawFlashcardsBySection, type AirLawFlashcard } from "@/app/data/airlaw-flashcards";
import { getAirLawNoteBySection, type AirLawSectionNote } from "@/app/data/airlaw-notes";
import { IR_AWO_MINED_QUESTIONS, getIRAwoMinedQuestionsBySection } from "@/app/data/ir-awo-questions";
import { getAWONoteBySection } from "@/app/data/awo-notes";

// IR section → CPL Air Law section(s) that cover it.
const MAP: Record<string, string[]> = {
  // C.3.1 carries the general SA CARs & rules of the air so that the IR Air Law
  // bank mirrors the full CPL Air Law bank (the IR combined exam reuses it).
  "C.3.1": ["A.3.1", "A.3.2", "A.3.3", "A.3.4", "A.3.5", "A.3.6", "A.3.7", "A.3.8", "A.3.10", "A.3.12", "A.3.13"],
  "C.3.5": ["A.3.14", "A.3.15", "A.3.16", "A.3.17"], // En-route: airspace, AIP, Jeppesen
  "C.3.7": ["A.3.18"], // ICAO Annex 14 — aerodromes
  // C.3.2 general procedures, C.3.3 altimeter setting, C.3.4 departure,
  // C.3.6 arrival/approach → from the Flight Procedures textbook (pending).
  // Every CPL Air Law section now maps to an IR code, so the IR Air Law bank
  // mirrors the full CPL Air Law bank.
};

export function getIRAwoQuestionsBySection(s: string): AirLawQuestion[] {
  // CPL Air Law reuse (via MAP) plus the dedicated AWOPS/AIR LAW IR bank whose
  // questions are already tagged with their own C.3.x section id.
  return [...(MAP[s] ?? []).flatMap((c) => getAirLawQuestionsBySection(c)), ...getIRAwoMinedQuestionsBySection(s)];
}
const AWO_AUTHORED_FC: Record<string, AirLawFlashcard[]> = {
  "C.3.2": [
    { id: "IRAWOFC-32-1", sectionId: "C.3.2", front: "PANS-OPS obstacle clearance — primary vs secondary area?", back: "The protected area has a full-width primary area (full MOC applied) and tapering secondary areas either side where the obstacle clearance reduces linearly to zero at the outer edge.", difficulty: "hard" },
    { id: "IRAWOFC-32-2", sectionId: "C.3.2", front: "Minimum obstacle clearance (MOC) en-route / approach?", back: "En-route MOC 1000 ft (2000 ft over high/mountainous terrain). Initial approach 1000 ft; intermediate 500 ft; final (non-precision) 250 ft (typical). ICAO Doc 8168 (PANS-OPS).", difficulty: "hard" },
  ],
  "C.3.3": [
    { id: "IRAWOFC-33-1", sectionId: "C.3.3", front: "QNH / QFE / QNE?", back: "QNH = altitude AMSL; QFE = height above the aerodrome (0 on the runway); QNE = 1013.25 hPa standard setting for flight levels. 1 hPa ≈ 30 ft.", difficulty: "medium" },
    { id: "IRAWOFC-33-2", sectionId: "C.3.3", front: "Transition altitude / level / layer?", back: "Below the transition altitude fly altitudes on QNH; above the transition level fly flight levels on 1013. Set 1013 climbing through the TA; set QNH descending through the TL. The layer lies between them.", difficulty: "medium" },
    { id: "IRAWOFC-33-3", sectionId: "C.3.3", front: "Cold-temperature altimetry error?", back: "In air colder than ISA the true altitude is LOWER than indicated ('hot to cold, look out below'). Apply the cold-temperature correction (add height) to minima/crossing altitudes, especially over high terrain in winter.", difficulty: "hard" },
  ],
  "C.3.4": [
    { id: "IRAWOFC-34-1", sectionId: "C.3.4", front: "SID straight vs turning departure?", back: "Straight: initial track within 15° of the extended centreline. Turning: a turn >15°; a turn is not specified until ≥120 m (394 ft) obstacle clearance is assured, normally above 500 ft AGL.", difficulty: "medium" },
    { id: "IRAWOFC-34-2", sectionId: "C.3.4", front: "Procedure Design Gradient (PDG)?", back: "The minimum climb gradient a SID guarantees obstacle clearance on — standard 3.3% (200 ft/NM). A steeper published PDG must be met or the SID cannot be used at that mass.", difficulty: "hard" },
  ],
  "C.3.6": [
    { id: "IRAWOFC-36-1", sectionId: "C.3.6", front: "Approach segments (IAF/IF/FAF/MAPt)?", back: "Arrival → Initial (IAF) → Intermediate (IF) → Final (FAF) → Missed Approach Point (MAPt). STAR links the en-route structure to the IAF.", difficulty: "medium" },
    { id: "IRAWOFC-36-2", sectionId: "C.3.6", front: "DA/DH vs MDA/MDH?", back: "Precision/APV approach uses a Decision Altitude/Height (you may go below while going around). Non-precision uses a Minimum Descent Altitude/Height (must not descend below it without the required visual reference).", difficulty: "hard" },
  ],
};

export function getIRAwoFlashcardsBySection(s: string): AirLawFlashcard[] {
  if (AWO_AUTHORED_FC[s]) return AWO_AUTHORED_FC[s];
  return (MAP[s] ?? []).flatMap((c) => getAirLawFlashcardsBySection(c));
}
export function getIRAwoNoteBySection(s: string): AirLawSectionNote | undefined {
  // Dedicated flight-procedure notes (C.3.2/3.4/3.5/3.6/3.7) take priority; other
  // sections fall back to the reused CPL Air Law notes via MAP.
  const awo = getAWONoteBySection(s);
  if (awo) return awo;
  const notes = (MAP[s] ?? []).map(getAirLawNoteBySection).filter((n): n is AirLawSectionNote => !!n);
  if (notes.length === 0) return undefined;
  if (notes.length === 1) return notes[0];
  return { sectionId: s, title: notes[0].title, intro: notes[0].intro, blocks: notes.flatMap((n) => n.blocks), mustKnow: notes.flatMap((n) => n.mustKnow), traps: notes.flatMap((n) => n.traps) };
}

export const IR_AWO_FIGURE_KEY: Record<string, string> = {
  "C.3.1": "A.3.1", "C.3.5": "A.3.16", "C.3.7": "A.3.18",
};

const IR_AWO_SECTIONS = [...new Set(Object.values(MAP).flat())];
export const IR_AWO_QUESTIONS: AirLawQuestion[] = [
  ...AIRLAW_ALL_QUESTIONS.filter((q) => IR_AWO_SECTIONS.includes(q.sectionId)),
  ...IR_AWO_MINED_QUESTIONS,
];
export const IR_AWO_QUESTION_COUNT = IR_AWO_QUESTIONS.length;
