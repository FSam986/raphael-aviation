import { pickPplNote } from "@/app/data/ppl-pick";
// PPL Navigation content — reuses the CPL Navigation (A.9.x) material, plus the
// CPL Instruments compass/magnetism topic (A.7.7) for "Aircraft Magnetism". The
// PPL syllabus (10.1–10.7) is a re-grouping of the CPL topics at PPL depth, so we
// MAP each PPL section to the CPL section(s) that cover it rather than duplicate.

import { NAV_QUESTIONS, getNavQuestionsBySection } from "@/app/data/nav-questions";
import { getNavNoteBySection } from "@/app/data/nav-notes";
import { getNavFlashcardsBySection } from "@/app/data/nav-flashcards";
import { ALL_INSTRUMENTS_QUESTIONS, getInstrumentsQuestionsBySection } from "@/app/data/instruments-questions";
import { getInstrumentsNoteBySection } from "@/app/data/instruments-notes";
import { getInstrumentsFlashcardsBySection } from "@/app/data/instruments-flashcards";
import { getRadioNavQuestionsBySection } from "@/app/data/radionav-questions";
import { getRadioNavNoteBySection } from "@/app/data/radionav-notes";
import { getRadioNavFlashcardsBySection } from "@/app/data/radionav-flashcards";
import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";
import { mergePplNotes, pplQuestionDepth, pplFlashcardDepth } from "@/app/data/ppl-depth";

const MAP: Record<string, string[]> = {
  "10.1": ["A.9.1"],           // Form of the Earth
  "10.2": ["A.9.4"],           // Time
  "10.3": ["A.9.5", "A.9.3"],  // Mapping (+ distance/scale)
  "10.4": ["A.9.2"],           // Direction — variation & deviation
  "10.5": ["A.7.7"],           // Aircraft Magnetism (compass)
  "10.6": ["A.9.7"],           // The Navigation Computer / triangle of velocities
  "10.7": ["A.9.8"],           // Practical Navigation (1-in-60). A.9.6 Relative Velocity is CPL-only — not in PPL syllabus.
  "10.8": ["A.10.1", "A.10.2", "A.10.3", "A.10.4", "A.10.12"], // Radio nav aids — ADF/NDB, VOR, DME, GNSS
};
const ins = (id: string) => id.startsWith("A.7");
const rad = (id: string) => id.startsWith("A.10");
const q = (id: string) => (rad(id) ? getRadioNavQuestionsBySection(id) : ins(id) ? getInstrumentsQuestionsBySection(id) : getNavQuestionsBySection(id));
const f = (id: string) => (rad(id) ? getRadioNavFlashcardsBySection(id) : ins(id) ? getInstrumentsFlashcardsBySection(id) : getNavFlashcardsBySection(id));
const nt = (id: string) => (rad(id) ? getRadioNavNoteBySection(id) : ins(id) ? getInstrumentsNoteBySection(id) : getNavNoteBySection(id));

// PPL depth filter: exclude the hardest CPL questions (beyond PPL syllabus depth).
export function getPPLNavQuestionsBySection(s: string): AirLawQuestion[] { return pplQuestionDepth((MAP[s] ?? []).flatMap(q)); }
export function getPPLNavFlashcardsBySection(s: string): AirLawFlashcard[] { return pplFlashcardDepth((MAP[s] ?? []).flatMap(f)); }
const PICK: Record<string, [string, string[]]> = {
  "10.1": ["Form of the Earth", ["A.9.1#Form of the Earth|Great circles|Meridians|Latitude|Co-ordinates|Convergency", "A.9.3"]],
  "10.2": ["Time", ["A.9.4#Local mean time|Zone time|Sunrise"]],
  "10.3": ["Mapping — General", ["A.9.5#Projection|Orthomorphic|Scale|Lambert", "A.9.3#Conversions"]],
  "10.4": ["Direction", ["A.9.2#True north|Magnetic north"]],
  "10.5": ["Aircraft Magnetism", ["A.9.2#Compass north", "A.7.7#Aircraft magnetism|Turning and acceleration|The direct-reading"]],
  "10.6": ["The Navigation Computer", ["A.9.7", "A.4.5#Pressure altitude"]],
  "10.7": ["Practical Navigation", ["A.9.8"]],
  "10.8": ["Radio Navigation", ["A.9.2#Radio bearings", "A.10.2", "A.10.3#Principles|Presentation|Coverage|Errors", "A.10.4", "A.10.12#System components|Principle of operation|Errors"]],
};
export function getPPLNavNoteBySection(s: string): AirLawSectionNote | undefined {
  const e = PICK[s];
  return e ? pickPplNote(s, e[0], e[1]) : undefined;
}
const SECS = [...new Set(Object.values(MAP).flat())];
export const PPL_NAV_QUESTIONS: AirLawQuestion[] = pplQuestionDepth([
  ...NAV_QUESTIONS.filter((x) => SECS.includes(x.sectionId)),
  ...ALL_INSTRUMENTS_QUESTIONS.filter((x) => SECS.includes(x.sectionId)),
  ...SECS.filter((s) => s.startsWith("A.10")).flatMap((s) => getRadioNavQuestionsBySection(s)),
], Number.MAX_SAFE_INTEGER);
export const PPL_NAV_FIGURE_KEY: Record<string, string> = {
  "10.1": "A.9.1", "10.3": "A.9.5", "10.4": "A.9.2", "10.5": "A.7.7", "10.6": "A.9.7", "10.7": "A.9.8",
};
