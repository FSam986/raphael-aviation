// IR study-note delegation. The IR Radio Navigation, Instruments and Human
// Performance syllabi re-group the same material as the CPL subjects, so rather
// than duplicate content we MAP each IR section to the CPL section(s) that cover
// it and reuse the (deep) CPL study notes. Questions/flashcards for these IR
// subjects already have their own banks; only the notes were missing.

import { getRadioNavNoteBySection } from "@/app/data/radionav-notes";
import { getInstrumentsNoteBySection } from "@/app/data/instruments-notes";
import { getHumanPerformanceNote } from "@/app/data/human-performance-notes";
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

type NoteGetter = (id: string) => AirLawSectionNote | undefined;

// Merge the mapped CPL notes into a single note for the IR section.
function mergeNotes(ids: string[], get: NoteGetter): AirLawSectionNote | undefined {
  const notes = ids.map(get).filter((n): n is AirLawSectionNote => !!n);
  if (!notes.length) return undefined;
  return {
    sectionId: notes[0].sectionId,
    title: notes[0].title,
    intro: notes[0].intro,
    blocks: notes.flatMap((n) => n.blocks),
    mustKnow: notes.flatMap((n) => n.mustKnow),
    traps: notes.flatMap((n) => n.traps),
  };
}

// ---- IR Radio Navigation (C.2.x) → CPL Radio Navigation (A.10.x) ----
const RNV_MAP: Record<string, string[]> = {
  "C.2.1": ["A.10.1"],            // VDF / basic radio
  "C.2.2": ["A.10.2"],            // NDB / ADF
  "C.2.3": ["A.10.3"],            // VOR
  "C.2.4": ["A.10.4"],            // DME
  "C.2.5": ["A.10.3"],            // ILS (with VOR geometry in CPL A.10.3)
  "C.2.6": ["A.10.8"],            // Airborne Weather Radar
  "C.2.7": ["A.10.7"],            // Secondary Radar / Transponder
  "C.2.8": ["A.10.12"],           // GNSS / GPS
};
export function getIRRadioNavNoteBySection(s: string): AirLawSectionNote | undefined {
  return mergeNotes(RNV_MAP[s] ?? [], getRadioNavNoteBySection);
}

// ---- IR Instruments (I.x) → CPL Flight Instruments (A.7.x) ----
const INS_MAP: Record<string, string[]> = {
  "I.1": ["A.7.1"],               // Air Data Instruments
  "I.2": ["A.7.2"],               // Gyroscopic Instruments
  "I.3": ["A.7.2"],               // HSI (heading / gyro)
  "I.4": ["A.7.3"],               // EFIS
  "I.5": ["A.7.6"],               // Flight Director (with autopilot)
  "I.6": ["A.7.6"],               // Autopilot
  "I.9": ["A.7.5"],               // Air Temperature Indicators
  "I.10": ["A.7.7"],              // Magnetism / compass
};
export function getIRInstrumentsNoteBySection(s: string): AirLawSectionNote | undefined {
  return mergeNotes(INS_MAP[s] ?? [], getInstrumentsNoteBySection);
}

// ---- IR Human Performance (H.x) → CPL Human Performance (A.6.x) ----
const HPL_MAP: Record<string, string[]> = {
  "H.1": ["A.6.1"],               // Man & the sensory system
  "H.2": ["A.6.1"],               // Nervous system
  "H.3": ["A.6.1"],               // Vision
  "H.4": ["A.6.1"],               // Hearing
  "H.5": ["A.6.3"],               // Integration / disorientation (psychology)
};
export function getIRHumanPerfNoteBySection(s: string): AirLawSectionNote | undefined {
  return mergeNotes(HPL_MAP[s] ?? [], getHumanPerformanceNote);
}
