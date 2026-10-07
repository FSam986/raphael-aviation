// Registry mapping a subject id to its study content getters (questions, notes,
// flashcards). Adding a new subject's content is one entry here — the study
// section page and any consumer stay unchanged.

import { getQuestionsBySection } from "@/app/data/met-questions";
import { getFlashcardsBySection } from "@/app/data/met-flashcards";
import { getNoteBySection } from "@/app/data/met-notes";
import { getAirLawQuestionsBySection } from "@/app/data/airlaw-questions";
import { getAirLawNoteBySection } from "@/app/data/airlaw-notes";
import { getAirLawFlashcardsBySection } from "@/app/data/airlaw-flashcards";
import { getPPLAirLawQuestionsBySection } from "@/app/data/ppl-airlaw-questions";
import { getPPLAirLawNoteBySection } from "@/app/data/ppl-airlaw-notes";
import { getPPLAirLawFlashcardsBySection } from "@/app/data/ppl-airlaw-flashcards";
import { getFPPQuestionsBySection } from "@/app/data/fpp-questions";
import { getNavQuestionsBySection } from "@/app/data/nav-questions";
import { getAircraftTechnicalQuestionsBySection } from "@/app/data/aircraft-technical-questions";
import { getAircraftTechnicalNote } from "@/app/data/aircraft-technical-notes";
import { getAircraftTechnicalFlashcardsBySection } from "@/app/data/aircraft-technical-flashcards";
import { getHumanPerformanceQuestionsBySection } from "@/app/data/human-performance-questions";
import { getHumanPerformanceNote } from "@/app/data/human-performance-notes";
import { getHumanPerformanceFlashcardsBySection } from "@/app/data/human-performance-flashcards";
import { getPPLPofQuestionsBySection } from "@/app/data/ppl-principles-of-flight-questions";
import { getPPLHplQuestionsBySection } from "@/app/data/ppl-human-performance-questions";
import { getNavNoteBySection } from "@/app/data/nav-notes";
import { getNavFlashcardsBySection } from "@/app/data/nav-flashcards";
import { getRadioNavQuestionsBySection } from "@/app/data/radionav-questions";
import { getRadioNavNoteBySection } from "@/app/data/radionav-notes";
import { getRadioNavFlashcardsBySection } from "@/app/data/radionav-flashcards";
import { getIRInstrumentsQuestionsBySection } from "@/app/data/ir-instruments-questions";
import { getIRInstrumentsFlashcardsBySection } from "@/app/data/ir-instruments-flashcards";
import { getIRSpecProcQuestionsBySection } from "@/app/data/ir-special-procedures-questions";
import { getIRSpecProcFlashcardsBySection } from "@/app/data/ir-special-procedures-flashcards";
import { getIRHumanPerfQuestionsBySection } from "@/app/data/ir-human-performance-questions";
import { getIRHumanPerfFlashcardsBySection } from "@/app/data/ir-human-performance-flashcards";
import { getIRRadioNavQuestionsBySection } from "@/app/data/ir-radio-navigation-questions";
import { getIRRadioNavFlashcardsBySection } from "@/app/data/ir-radio-navigation-flashcards";
import { getGRQuestionsBySection } from "@/app/data/gr-questions";
import { getGRNoteBySection } from "@/app/data/gr-notes";
import { getGRFlashcardsBySection } from "@/app/data/gr-flashcards";
import { getInstrumentsQuestionsBySection } from "@/app/data/instruments-questions";
import { getInstrumentsNoteBySection } from "@/app/data/instruments-notes";
import { getInstrumentsFlashcardsBySection } from "@/app/data/instruments-flashcards";
import { getFPPNoteBySection } from "@/app/data/fpp-notes";
import { getFPPFlashcardsBySection } from "@/app/data/fpp-flashcards";
import { getPPLMetQuestionsBySection, getPPLMetNoteBySection, getPPLMetFlashcardsBySection } from "@/app/data/ppl-met-content";
import { getPPLNavQuestionsBySection, getPPLNavNoteBySection, getPPLNavFlashcardsBySection } from "@/app/data/ppl-nav-content";
import { getPPLFppQuestionsBySection, getPPLFppNoteBySection, getPPLFppFlashcardsBySection } from "@/app/data/ppl-fpp-content";
import { getPPLAgkQuestionsBySection, getPPLAgkNoteBySection, getPPLAgkFlashcardsBySection } from "@/app/data/ppl-agk-content";
import { getIRMetQuestionsBySection, getIRMetNoteBySection, getIRMetFlashcardsBySection } from "@/app/data/ir-met-content";
import { getIRAwoQuestionsBySection, getIRAwoNoteBySection, getIRAwoFlashcardsBySection } from "@/app/data/ir-awo-content";
import { getIRFppQuestionsBySection, getIRFppNoteBySection, getIRFppFlashcardsBySection } from "@/app/data/ir-fpp-content";
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";
import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

// Met and Air Law types are structurally identical, so the shared Air Law
// shapes describe every subject's content.
interface SubjectGetters {
  questions: (sectionId: string) => AirLawQuestion[];
  note: (sectionId: string) => AirLawSectionNote | undefined;
  flashcards: (sectionId: string) => AirLawFlashcard[];
}

const REGISTRY: Record<string, SubjectGetters> = {
  meteorology: {
    questions: getQuestionsBySection,
    note: getNoteBySection,
    flashcards: getFlashcardsBySection,
  },
  "air-law": {
    questions: getAirLawQuestionsBySection,
    note: getAirLawNoteBySection,
    flashcards: getAirLawFlashcardsBySection,
  },
  "ppl-air-law": {
    questions: getPPLAirLawQuestionsBySection,
    note: getPPLAirLawNoteBySection,
    flashcards: getPPLAirLawFlashcardsBySection,
  },
  "flight-planning": {
    questions: getFPPQuestionsBySection,
    note: getFPPNoteBySection,
    flashcards: getFPPFlashcardsBySection,
  },
  "aircraft-technical": {
    questions: getAircraftTechnicalQuestionsBySection,
    note: getAircraftTechnicalNote,
    flashcards: getAircraftTechnicalFlashcardsBySection,
  },
  "human-performance": {
    questions: getHumanPerformanceQuestionsBySection,
    note: getHumanPerformanceNote,
    flashcards: getHumanPerformanceFlashcardsBySection,
  },
  "ppl-principles-of-flight": {
    questions: getPPLPofQuestionsBySection,
    note: () => undefined,
    flashcards: () => [],
  },
  navigation: {
    questions: getNavQuestionsBySection,
    note: getNavNoteBySection,
    flashcards: getNavFlashcardsBySection,
  },
  "radio-navigation": {
    questions: getRadioNavQuestionsBySection,
    note: getRadioNavNoteBySection,
    flashcards: getRadioNavFlashcardsBySection,
  },
  "ir-instruments": {
    questions: getIRInstrumentsQuestionsBySection,
    note: () => undefined,
    flashcards: getIRInstrumentsFlashcardsBySection,
  },
  "ir-special-procedures": {
    questions: getIRSpecProcQuestionsBySection,
    note: () => undefined,
    flashcards: getIRSpecProcFlashcardsBySection,
  },
  "ir-human-performance": {
    questions: getIRHumanPerfQuestionsBySection,
    note: () => undefined,
    flashcards: getIRHumanPerfFlashcardsBySection,
  },
  "ir-radio-navigation": {
    questions: getIRRadioNavQuestionsBySection,
    note: () => undefined,
    flashcards: getIRRadioNavFlashcardsBySection,
  },
  "general-radiotelephony": {
    questions: getGRQuestionsBySection,
    note: getGRNoteBySection,
    flashcards: getGRFlashcardsBySection,
  },
  "flight-instruments": {
    questions: getInstrumentsQuestionsBySection,
    note: getInstrumentsNoteBySection,
    flashcards: getInstrumentsFlashcardsBySection,
  },
  "ppl-meteorology": {
    questions: getPPLMetQuestionsBySection,
    note: getPPLMetNoteBySection,
    flashcards: getPPLMetFlashcardsBySection,
  },
  "ppl-navigation": {
    questions: getPPLNavQuestionsBySection,
    note: getPPLNavNoteBySection,
    flashcards: getPPLNavFlashcardsBySection,
  },
  "ppl-flight-planning": {
    questions: getPPLFppQuestionsBySection,
    note: getPPLFppNoteBySection,
    flashcards: getPPLFppFlashcardsBySection,
  },
  "ppl-aircraft-technical": {
    questions: getPPLAgkQuestionsBySection,
    note: getPPLAgkNoteBySection,
    flashcards: getPPLAgkFlashcardsBySection,
  },
  "ppl-human-performance": {
    questions: getPPLHplQuestionsBySection,
    note: () => undefined,
    flashcards: () => [],
  },
  "ir-meteorology": {
    questions: getIRMetQuestionsBySection,
    note: getIRMetNoteBySection,
    flashcards: getIRMetFlashcardsBySection,
  },
  "ir-air-law-awo": {
    questions: getIRAwoQuestionsBySection,
    note: getIRAwoNoteBySection,
    flashcards: getIRAwoFlashcardsBySection,
  },
  "ir-flight-performance": {
    questions: getIRFppQuestionsBySection,
    note: getIRFppNoteBySection,
    flashcards: getIRFppFlashcardsBySection,
  },
};

export function subjectContent(subjectId: string): SubjectGetters | undefined {
  return REGISTRY[subjectId];
}
