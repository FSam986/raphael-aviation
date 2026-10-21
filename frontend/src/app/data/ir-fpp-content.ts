// IR Flight Performance & Planning (C.4) reuses the CPL FPP material — the
// syllabus overlaps almost entirely. Maps each IR section to the CPL FPP
// section(s) that cover it.

import { FPP_ALL_QUESTIONS, getFPPQuestionsBySection } from "@/app/data/fpp-questions";
import { getFPPFlashcardsBySection } from "@/app/data/fpp-flashcards";
import { getFPPNoteBySection } from "@/app/data/fpp-notes";
import { getAircraftTechnicalNote } from "@/app/data/aircraft-technical-notes";
import { getFPPPlottingBySection, type PlottingQuestion } from "@/app/data/fpp-plotting";
import { IR_FPP_MINED_QUESTIONS, getIRFppMinedQuestionsBySection } from "@/app/data/ir-fpp-questions";
import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

const MAP: Record<string, string[]> = {
  "C.4.2": ["A.4.7"], // performance terminology & theory
  "C.4.3": ["A.4.7", "A.4.10"], // range & endurance
  "C.4.4": ["A.4.4"], // airspeed terminology
  "C.4.5": ["A.4.5"], // met terminology
  "C.4.6": ["A.4.8", "A.4.9"], // factors affecting performance + SEP1 performance data
  "C.4.7": ["A.4.1", "A.4.2"], // performance classification + certification/load factors
  "C.4.9": ["A.4.4"], // stages of flight
  "C.4.10": ["A.4.13"], // PET & PNR
  "C.4.11": ["A.4.13", "A.4.7", "A.4.11"], // specific performance (incl. MEP1 field performance)
  "C.4.12": ["A.4.13"], // fuel planning
  "C.4.14": ["A.4.5"], // IFR altitudes
  "C.4.15": ["A.4.5"], // aerodrome terminology
  "C.4.17": ["A.4.12"], // mass & balance
  // C.4.1 basic aerodynamics, C.4.13 documentation → no direct CPL FPP source.
  // Every CPL FPP section (A.4.1–A.4.13) now maps to an IR code, so the IR
  // Flight Performance bank mirrors the full CPL FPP bank.
};

export function getIRFppQuestionsBySection(s: string): AirLawQuestion[] {
  // CPL FPP reuse (via MAP) plus the dedicated POF IR bank whose questions are
  // already tagged with their own C.4.x section id (notably C.4.1 aerodynamics,
  // which has no CPL FPP source).
  return [...(MAP[s] ?? []).flatMap((c) => getFPPQuestionsBySection(c)), ...getIRFppMinedQuestionsBySection(s)];
}
export function getIRFppFlashcardsBySection(s: string): AirLawFlashcard[] {
  return (MAP[s] ?? []).flatMap((c) => getFPPFlashcardsBySection(c));
}
// Sections with no CPL FPP note source: C.4.1 aerodynamics reuses the CPL
// Aircraft-Technical subsonic-aerodynamics note; C.4.13 documentation is authored.
const AUTHORED: Record<string, AirLawSectionNote> = {
  "C.4.13": {
    sectionId: "C.4.13",
    title: "Documentation & Preflight Information",
    intro:
      "Before an IFR flight the pilot must gather and check the legal documents, the aircraft's status, and the current aeronautical information. Missing or out-of-date information (a NOTAM, an MEL item) is an airworthiness/legal issue, not a formality.",
    blocks: [
      {
        heading: "1. Documents to carry & the AFM",
        points: [
          "Carried in the aircraft: Certificate of Registration, Certificate of Airworthiness, radio station licence, mass & balance data, the Aircraft Flight Manual (AFM/POH), certificate of release to service, proof of insurance, crew licences & medicals, the flight folio, and the operational flight plan.",
          "The AFM/POH contains the certified limitations, performance data and checklists; the flight is planned and flown within its limits. The flight folio records each flight and the maintenance/defect status.",
          "A flight plan (ICAO format) is filed for IFR flights; the operational flight plan carries the fuel, route, levels, alternates and timings.",
        ],
      },
      {
        heading: "2. NOTAM, MEL/MMEL and the AIP",
        points: [
          "NOTAM: time-critical notices (runway/navaid unserviceability, airspace activity, hazards) — checked for departure, destination, alternates and en-route. The AIP (GEN/ENR/AD) holds the permanent information; AICs give advisory/explanatory notices.",
          "MEL (Minimum Equipment List, operator-specific, approved from the manufacturer's MMEL) states which items may be unserviceable and under what conditions a flight may still depart — an unlisted inoperative item means the aircraft is not airworthy.",
          "Pre-flight: confirm the aircraft is released to service, the required equipment for IFR/the intended operation is serviceable or MEL-permitted, and the aeronautical information (charts, NOTAMs, weather) is current.",
        ],
      },
    ],
    mustKnow: [
      "Carry: C of R, C of A, radio licence, mass & balance, AFM/POH, CRS, insurance, licences/medicals, flight folio, flight plan.",
      "NOTAMs checked for departure, destination, alternates and en-route; AIP = permanent info (GEN/ENR/AD).",
      "MEL (from the MMEL) permits specified unserviceabilities; an unlisted inop item = not airworthy.",
      "Fly within the AFM limitations and performance data.",
    ],
    traps: [
      "An inoperative item NOT covered by the MEL makes the aircraft unairworthy — you may not depart on it.",
      "The AIP is permanent information; time-critical changes come by NOTAM — check both.",
    ],
  },
};

export function getIRFppNoteBySection(s: string): AirLawSectionNote | undefined {
  if (s === "C.4.1") return getAircraftTechnicalNote("A.1.8"); // basic aerodynamics
  if (AUTHORED[s]) return AUTHORED[s];
  const notes = (MAP[s] ?? []).map(getFPPNoteBySection).filter((n): n is AirLawSectionNote => !!n);
  if (notes.length === 0) return undefined;
  if (notes.length === 1) return notes[0];
  return { sectionId: s, title: notes[0].title, intro: notes[0].intro, blocks: notes.flatMap((n) => n.blocks), mustKnow: notes.flatMap((n) => n.mustKnow), traps: notes.flatMap((n) => n.traps) };
}
export function getIRFppPlottingBySection(s: string): PlottingQuestion[] {
  return (MAP[s] ?? []).flatMap((c) => getFPPPlottingBySection(c));
}

export const IR_FPP_FIGURE_KEY: Record<string, string> = {
  "C.4.2": "A.4.7", "C.4.3": "A.4.7", "C.4.4": "A.4.4", "C.4.5": "A.4.5", "C.4.6": "A.4.8",
  "C.4.7": "A.4.1", "C.4.9": "A.4.4", "C.4.10": "A.4.13", "C.4.11": "A.4.13", "C.4.12": "A.4.13",
  "C.4.14": "A.4.5", "C.4.15": "A.4.5", "C.4.17": "A.4.12",
};

const IR_FPP_SECTIONS = [...new Set(Object.values(MAP).flat())];
export const IR_FPP_QUESTIONS: AirLawQuestion[] = [
  ...FPP_ALL_QUESTIONS.filter((q) => IR_FPP_SECTIONS.includes(q.sectionId)),
  ...IR_FPP_MINED_QUESTIONS,
];
export const IR_FPP_QUESTION_COUNT = IR_FPP_QUESTIONS.length;
