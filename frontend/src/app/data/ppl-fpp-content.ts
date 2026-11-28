import { pickPplNote } from "@/app/data/ppl-pick";
import { PPL_FPP_AVEX_QUESTIONS, getPPLFppAvexBySection } from "@/app/data/ppl-fpp-avex";
import { RA1_QUESTIONS } from "@/app/data/ppl-fpp-ra1";
// PPL Flight Performance & Planning content. Study notes are hand-picked CPL
// blocks at PPL depth (PICK) plus PPL-only blocks (EXTRA). Questions come only
// from the PPL textbook + RA-1 charts; flashcards are derived from these notes.
// Nothing from the CPL question bank or flashcard deck is used here.

import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import type { AirLawSectionNote, AirLawNoteBlock } from "@/app/data/airlaw-notes";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

// PPL depth filter: exclude the hardest CPL questions (e.g. CAP-graph/performance
// calculations beyond the PPL syllabus).
// PPL questions come ONLY from the PPL textbook's chapters (AVEX PPL Vol 6) and the
// RA-1 charts that replace its Chapter 3 graphs — never the CPL bank, which is
// the CPL course's paid content and goes beyond the PPL syllabus.
export function getPPLFppQuestionsBySection(s: string): AirLawQuestion[] { return [...getPPLFppAvexBySection(s), ...RA1_QUESTIONS.filter((q) => q.sectionId === s)]; }
// Authored cards: none — subjectContent() derives the deck from the PPL notes.
export const getPPLFppFlashcardsBySection = (): AirLawFlashcard[] => [];
const PICK: Record<string, [string, string[]]> = {
  "7.1": ["Mass & Balance", ["A.4.12#Centre of gravity|CG limits|The masses|Floor loading|Mass limitations|Calculating the CG|Movement of CG"]],
  "7.2": ["Abbreviations, Definitions & Symbols", ["A.4.4#IAS|Structural|Climb and endurance|Stall speeds", "A.4.5"]],
  "7.3": ["Runways", ["A.4.6#Runway length|Declared|Required|Displaced|Runway slope", "A.4.8#Runway surface"]],
  "7.4": ["Aeroplane Performance Graphs", ["A.4.9", "A.4.8#Temperature|Aeroplane mass|Aeroplane configuration", "A.4.7#Forces in the descent"]],
  "7.6": ["Fuel Weight & Performance", ["A.4.13#Fuel weight|Fuel consumption|ANM", "A.4.12#Load and fuel terms"]],
  "7.7": ["Aircraft Performance", ["A.1.7#Wake turbulence|Windshear|Contaminated|Hydroplaning", "A.8.13#Airframe icing|Types", "A.4.8#Runway surface"]],
};
// Topics in the PPL FPP textbook index that the picked CPL blocks don't cover.
const EXTRA: Record<string, AirLawNoteBlock[]> = {
  "7.2": [{ heading: "Calibrated airspeed (CAS)", points: [
    "IAS is what the airspeed indicator shows. Correct it for instrument error and position (pressure) error and you get CAS — also called rectified airspeed (RAS).",
    "Position error is largest at low speed / high angle of attack and with flap extended, because the airflow meets the static vent at an angle. The POH airspeed calibration table gives the IAS → CAS correction.",
    "CAS corrected for density (altitude and temperature) gives TAS. At sea level in ISA, CAS ≈ TAS; as density falls with height, TAS becomes greater than CAS (a rough rule: about 2% per 1000 ft).",
    "Order to remember: IAS → (instrument + position error) → CAS → (density error) → TAS.",
  ] }],
  "7.4": [{ heading: "Airspeed calibration and performance tables", points: [
    "§ Airspeed calibration table",
    "The POH tabulates IAS against CAS for each flap setting. Enter with the IAS (or CAS) and read across; interpolate between rows. Differences are biggest at low speeds and with flap down — exactly where stall and approach speeds are flown.",
    "§ Performance tables",
    "Some data is given as tables instead of graphs (take-off and landing distance, climb, cruise power settings). Find the rows for pressure altitude and temperature and interpolate between them; never extrapolate beyond the table.",
    "Then apply the corrections in the table notes: headwind reduces and tailwind increases distance by stated percentages, grass/wet surfaces and slope add distance. Apply them in the order given, and round conservatively.",
    "Tables usually assume a paved, level, dry runway, the stated technique and a new aircraft flown by a test pilot — add your own safety margin.",
  ] }],
  "7.6": [{ heading: "Calculating fuel required", points: [
    "Trip fuel = flight time × fuel flow (use the navigation computer: fuel flow over 60, read fuel opposite the time).",
    "Fuel required = taxi fuel + trip fuel + the reserve required by the regulations (CAR Part 91 / your operator) + any extra for holding, diversion or weather.",
    "Fuel quantities in the POH may be in USG, litres, lb or kg: convert with volume × SG = mass (kg per litre), 1 USG = 3.785 L, 1 kg = 2.205 lb.",
    "Endurance = usable fuel ÷ fuel flow; range = endurance × groundspeed. Fuel performance in NM per USG = speed ÷ fuel flow (TAS → air miles, GS → ground miles).",
  ] }],
  "7.1": [{ heading: "Normal and utility category", points: [
    "Many light aeroplanes are certified in more than one category. NORMAL category: no aerobatics, bank up to 60°, limit load factor about +3.8 g / −1.52 g.",
    "UTILITY category: limited aerobatics (e.g. spins, steep turns, lazy eights where the POH permits), limit load factor about +4.4 g / −1.76 g.",
    "To fly in the utility category the aeroplane must be within a LOWER maximum weight and a SMALLER (more forward-limited) CG envelope — check both envelopes on the loading graph.",
    "§ Reduction factor",
    "Moments can be very large numbers, so loading forms often divide them by 100 or 1000 (a 'reduction factor'). Use the same factor throughout and multiply back if you need the actual CG in inches.",
  ] }],
};

export function getPPLFppNoteBySection(s: string): AirLawSectionNote | undefined {
  const e = PICK[s];
  const n = e ? pickPplNote(s, e[0], e[1]) : undefined;
  return n && EXTRA[s] ? { ...n, blocks: [...EXTRA[s], ...n.blocks] } : n;
}
export const PPL_FPP_QUESTIONS: AirLawQuestion[] = [...PPL_FPP_AVEX_QUESTIONS, ...RA1_QUESTIONS];

export { PPL_FPP_FIGURE_KEY } from "./figure-keys";
