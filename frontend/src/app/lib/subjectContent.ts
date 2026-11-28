import { useEffect, useState } from "react";
// Registry mapping a subject id to its study content getters (questions, notes,
// flashcards). Adding a new subject's content is one entry here — the study
// section page and any consumer stay unchanged.

import { gapQuestions } from "@/app/data/gap-questions";
import { pplQuestionInScope, pplNoteInScope, pplCardInScope } from "@/app/lib/pplScope";
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

// Each subject's content is its own chunk, fetched on first use (see loadSubjects).
const LOADERS: Record<string, () => Promise<SubjectGetters>> = {
  meteorology: () => Promise.all([import("@/app/data/met-questions"), import("@/app/data/met-notes"), import("@/app/data/met-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getQuestionsBySection, note: m1.getNoteBySection, flashcards: m2.getFlashcardsBySection })),
  "air-law": () => Promise.all([import("@/app/data/airlaw-questions"), import("@/app/data/airlaw-notes"), import("@/app/data/airlaw-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getAirLawQuestionsBySection, note: m1.getAirLawNoteBySection, flashcards: m2.getAirLawFlashcardsBySection })),
  "ppl-air-law": () => Promise.all([import("@/app/data/ppl-airlaw-questions"), import("@/app/data/ppl-airlaw-notes"), import("@/app/data/ppl-airlaw-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getPPLAirLawQuestionsBySection, note: m1.getPPLAirLawNoteBySection, flashcards: m2.getPPLAirLawFlashcardsBySection })),
  "flight-planning": () => Promise.all([import("@/app/data/fpp-questions"), import("@/app/data/fpp-notes"), import("@/app/data/fpp-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getFPPQuestionsBySection, note: m1.getFPPNoteBySection, flashcards: m2.getFPPFlashcardsBySection })),
  "aircraft-technical": () => Promise.all([import("@/app/data/aircraft-technical-questions"), import("@/app/data/aircraft-technical-notes"), import("@/app/data/aircraft-technical-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getAircraftTechnicalQuestionsBySection, note: m1.getAircraftTechnicalNote, flashcards: m2.getAircraftTechnicalFlashcardsBySection })),
  "human-performance": () => Promise.all([import("@/app/data/human-performance-questions"), import("@/app/data/human-performance-notes"), import("@/app/data/human-performance-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getHumanPerformanceQuestionsBySection, note: m1.getHumanPerformanceNote, flashcards: m2.getHumanPerformanceFlashcardsBySection })),
  "ppl-principles-of-flight": () => Promise.all([import("@/app/data/ppl-principles-of-flight-questions"), import("@/app/data/ppl-principles-of-flight-content"), import("@/app/data/ppl-principles-of-flight-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getPPLPofQuestionsBySection, note: m1.getPPLPofNoteBySection, flashcards: m2.getPPLPofFlashcardsBySection })),
  navigation: () => Promise.all([import("@/app/data/nav-questions"), import("@/app/data/nav-notes"), import("@/app/data/nav-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getNavQuestionsBySection, note: m1.getNavNoteBySection, flashcards: m2.getNavFlashcardsBySection })),
  "radio-navigation": () => Promise.all([import("@/app/data/radionav-questions"), import("@/app/data/radionav-notes"), import("@/app/data/radionav-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getRadioNavQuestionsBySection, note: m1.getRadioNavNoteBySection, flashcards: m2.getRadioNavFlashcardsBySection })),
  "ir-instruments": () => Promise.all([import("@/app/data/ir-instruments-questions"), import("@/app/data/ir-delegated-notes"), import("@/app/data/ir-instruments-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getIRInstrumentsQuestionsBySection, note: m1.getIRInstrumentsNoteBySection, flashcards: m2.getIRInstrumentsFlashcardsBySection })),
  "ir-special-procedures": () => Promise.all([import("@/app/data/ir-special-procedures-questions"), import("@/app/data/ir-special-procedures-notes"), import("@/app/data/ir-special-procedures-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getIRSpecProcQuestionsBySection, note: m1.getIRSpecProcNoteBySection, flashcards: m2.getIRSpecProcFlashcardsBySection })),
  "ir-human-performance": () => Promise.all([import("@/app/data/ir-human-performance-questions"), import("@/app/data/ir-delegated-notes"), import("@/app/data/ir-human-performance-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getIRHumanPerfQuestionsBySection, note: m1.getIRHumanPerfNoteBySection, flashcards: m2.getIRHumanPerfFlashcardsBySection })),
  "ir-radio-navigation": () => Promise.all([import("@/app/data/ir-radio-navigation-questions"), import("@/app/data/ir-delegated-notes"), import("@/app/data/ir-radio-navigation-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getIRRadioNavQuestionsBySection, note: m1.getIRRadioNavNoteBySection, flashcards: m2.getIRRadioNavFlashcardsBySection })),
  "general-radiotelephony": () => Promise.all([import("@/app/data/gr-questions"), import("@/app/data/gr-notes"), import("@/app/data/gr-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getGRQuestionsBySection, note: m1.getGRNoteBySection, flashcards: m2.getGRFlashcardsBySection })),
  "night-rating": () => Promise.all([import("@/app/data/nr-content")]).then(([m0]) => ({ questions: m0.getNRQuestionsBySection, note: m0.getNRNoteBySection, flashcards: m0.getNRFlashcardsBySection })),
  "flight-instruments": () => Promise.all([import("@/app/data/instruments-questions"), import("@/app/data/instruments-notes"), import("@/app/data/instruments-flashcards")]).then(([m0, m1, m2]) => ({ questions: m0.getInstrumentsQuestionsBySection, note: m1.getInstrumentsNoteBySection, flashcards: m2.getInstrumentsFlashcardsBySection })),
  "ppl-meteorology": () => Promise.all([import("@/app/data/ppl-met-content")]).then(([m0]) => ({ questions: m0.getPPLMetQuestionsBySection, note: m0.getPPLMetNoteBySection, flashcards: m0.getPPLMetFlashcardsBySection })),
  "ppl-navigation": () => Promise.all([import("@/app/data/ppl-nav-content")]).then(([m0]) => ({ questions: m0.getPPLNavQuestionsBySection, note: m0.getPPLNavNoteBySection, flashcards: m0.getPPLNavFlashcardsBySection })),
  "ppl-flight-planning": () => Promise.all([import("@/app/data/ppl-fpp-content")]).then(([m0]) => ({ questions: m0.getPPLFppQuestionsBySection, note: m0.getPPLFppNoteBySection, flashcards: m0.getPPLFppFlashcardsBySection })),
  "ppl-aircraft-technical": () => Promise.all([import("@/app/data/ppl-agk-content")]).then(([m0]) => ({ questions: m0.getPPLAgkQuestionsBySection, note: m0.getPPLAgkNoteBySection, flashcards: m0.getPPLAgkFlashcardsBySection })),
  "ppl-human-performance": () => Promise.all([import("@/app/data/ppl-human-performance-questions"), import("@/app/data/ppl-human-performance-content")]).then(([m0, m1]) => ({ questions: m0.getPPLHplQuestionsBySection, note: m1.getPPLHplNoteBySection, flashcards: m1.getPPLHplFlashcardsBySection })),
  "ir-meteorology": () => Promise.all([import("@/app/data/ir-met-content")]).then(([m0]) => ({ questions: m0.getIRMetQuestionsBySection, note: m0.getIRMetNoteBySection, flashcards: m0.getIRMetFlashcardsBySection })),
  "ir-air-law-awo": () => Promise.all([import("@/app/data/ir-awo-content")]).then(([m0]) => ({ questions: m0.getIRAwoQuestionsBySection, note: m0.getIRAwoNoteBySection, flashcards: m0.getIRAwoFlashcardsBySection })),
  "ir-flight-performance": () => Promise.all([import("@/app/data/ir-fpp-content")]).then(([m0]) => ({ questions: m0.getIRFppQuestionsBySection, note: m0.getIRFppNoteBySection, flashcards: m0.getIRFppFlashcardsBySection })),
};

import { deriveNoteFlashcards } from "@/app/data/note-flashcards";

// Append flashcards derived from the section's study note (its mustKnow / traps /
// key facts) to the authored flashcards, so flashcard coverage tracks the notes.
// Many banks were authored/imported with the key mostly on "a" (up to 97% in
// some subjects), so a student could game them. Options are re-ordered by a
// permutation seeded from the question id: stable across renders, sessions and
// devices (mastery + answer history stay valid), but spread evenly over a–d.
// Order-dependent questions ("all of the above", "both a and b", explanations
// that name a letter) are left untouched.
const LETTERS = ["a", "b", "c", "d"] as const;
const ORDER_BOUND = /\b(above|below|all of these|none of these|both|neither|either)\b|\b[a-d]\s*(and|&|or)\s*[a-d]\b|\([a-d]\)/i;
const LETTER_REF = /\b(option|answer|choice)\s*\(?[a-d]\)?(?![a-z])|\([a-d]\)/i;
const shuffleCache = new Map<string, unknown>();
function shuffleOptions<T extends { id: string; optionA: string; optionB: string; optionC: string; optionD: string; correctAnswer: string; explanation?: string }>(q: T): T {
  const hit = shuffleCache.get(q.id + "|" + q.optionA);
  if (hit) return hit as T;
  const opts = [q.optionA, q.optionB, q.optionC, q.optionD];
  let out: T = q;
  if (!opts.some((o) => ORDER_BOUND.test(o)) && !LETTER_REF.test(q.explanation ?? "")) {
    let h = 2166136261;
    for (let i = 0; i < q.id.length; i++) h = Math.imul(h ^ q.id.charCodeAt(i), 16777619) >>> 0;
    const perm = [0, 1, 2, 3];
    for (let i = 3; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; const j = h % (i + 1); [perm[i], perm[j]] = [perm[j], perm[i]]; }
    const correctIdx = LETTERS.indexOf(q.correctAnswer as (typeof LETTERS)[number]);
    out = { ...q, optionA: opts[perm[0]], optionB: opts[perm[1]], optionC: opts[perm[2]], optionD: opts[perm[3]], correctAnswer: LETTERS[perm.indexOf(correctIdx)] };
  }
  shuffleCache.set(q.id + "|" + q.optionA, out);
  return out;
}

const loaded = new Map<string, SubjectGetters>();
const pending = new Map<string, Promise<void>>();

/** True if the app has content for this subject (loaded or not). */
export const hasSubjectContent = (subjectId: string) => subjectId in LOADERS;

/** Fetch the given subjects' content chunks (cached; safe to call repeatedly). */
export function loadSubjects(ids: string[]): Promise<void> {
  return Promise.all(
    ids.filter((id) => LOADERS[id] && !loaded.has(id)).map((id) => {
      let p = pending.get(id);
      if (!p) {
        p = LOADERS[id]()
          .then((g) => { loaded.set(id, wrap(id, g)); })
          .catch((e) => {
            pending.delete(id); // allow a retry
            // A deploy replaced the chunk this tab expects: reload once onto the new build.
            if (typeof window !== "undefined") import("@/app/components/UpdateWatcher").then((m) => m.isChunkError(e) && m.recoverFromChunkError());
            throw e;
          });
        pending.set(id, p);
      }
      return p;
    })
  ).then(() => undefined);
}

/** React hook: true once every listed subject's content is loaded. */
export function useSubjects(ids: string[]): boolean {
  const key = ids.join(",");
  const [, rerender] = useState(0);
  const ready = ids.every((id) => !LOADERS[id] || loaded.has(id));
  useEffect(() => {
    let live = true;
    loadSubjects(key ? key.split(",") : []).then(() => { if (live) rerender((n) => n + 1); }, () => { /* handled in loadSubjects */ });
    return () => { live = false; };
  }, [key]);
  return ready;
}

/** Content getters for a subject — undefined until loadSubjects / useSubjects has loaded it. */
export function subjectContent(subjectId: string): SubjectGetters | undefined {
  return loaded.get(subjectId);
}

function wrap(subjectId: string, raw: SubjectGetters): SubjectGetters {
  // PPL subjects: strictly the PPL syllabus — strip CPL/IR-only material (lib/pplScope).
  const g: SubjectGetters = subjectId.startsWith("ppl-")
    ? { questions: (s) => raw.questions(s).filter(pplQuestionInScope), note: (s) => pplNoteInScope(raw.note(s)), flashcards: (s) => raw.flashcards(s).filter(pplCardInScope) }
    : raw;
  const scope = subjectId.startsWith("ppl-") ? pplQuestionInScope : () => true;
  return {
    questions: (sectionId: string) => [...g.questions(sectionId), ...gapQuestions(subjectId, sectionId).filter(scope)].map(shuffleOptions),
    note: g.note,
    // Authored + note-derived cards, de-duplicated within the deck (same front+back).
    flashcards: (sectionId: string) => {
      const seen = new Set<string>();
      return [...g.flashcards(sectionId), ...deriveNoteFlashcards(g.note(sectionId) as never)]
        .filter((f) => {
          const k = `${(f.front ?? "").trim().toLowerCase()}||${(f.back ?? "").trim().toLowerCase()}`;
          return seen.has(k) ? false : (seen.add(k), true);
        });
    },
  };
}
