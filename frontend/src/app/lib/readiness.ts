// Readiness — turns the adaptive mastery the app already tracks into a per-topic
// and per-subject "% ready" score. This is the metric the Exam Planner's 90%
// gate runs on. Reads the same localStorage mastery maps the mock exams write.

import type { MasteryMap } from "@/app/lib/examSelect";

interface QRef {
  id: string;
  sectionId: string;
}

// subjectId → { mastery localStorage key, full question bank }
import { bankRefs } from "@/app/lib/contentIndex";

export const SUBJECT_BANKS: Record<string, { storeKey: string; questions: QRef[] }> = {
  meteorology: { storeKey: "met-mastery", get questions() { return bankRefs("meteorology"); } },
  "air-law": { storeKey: "law-mastery", get questions() { return bankRefs("air-law"); } },
  "ppl-air-law": { storeKey: "ppl-law-mastery", get questions() { return bankRefs("ppl-air-law"); } },
  "flight-planning": { storeKey: "fpp-mastery", get questions() { return bankRefs("flight-planning"); } },
  navigation: { storeKey: "nav-mastery", get questions() { return bankRefs("navigation"); } },
  "aircraft-technical": { storeKey: "atg-mastery", get questions() { return bankRefs("aircraft-technical"); } },
  "human-performance": { storeKey: "humanperf-mastery", get questions() { return bankRefs("human-performance"); } },
  "ppl-principles-of-flight": { storeKey: "ppl-pof-mastery", get questions() { return bankRefs("ppl-principles-of-flight"); } },
  "radio-navigation": { storeKey: "radionav-mastery", get questions() { return bankRefs("radio-navigation"); } },
  "ir-instruments": { storeKey: "ir-instruments-mastery", get questions() { return bankRefs("ir-instruments"); } },
  "ir-special-procedures": { storeKey: "ir-specproc-mastery", get questions() { return bankRefs("ir-special-procedures"); } },
  "ir-human-performance": { storeKey: "ir-humanperf-mastery", get questions() { return bankRefs("ir-human-performance"); } },
  "ir-radio-navigation": { storeKey: "ir-radionav-mastery", get questions() { return bankRefs("ir-radio-navigation"); } },
  "general-radiotelephony": { storeKey: "gr-mastery", get questions() { return bankRefs("general-radiotelephony"); } },
  "night-rating": { storeKey: "nr-mastery", get questions() { return bankRefs("night-rating"); } },
  "flight-instruments": { storeKey: "instruments-mastery", get questions() { return bankRefs("flight-instruments"); } },
  "ppl-meteorology": { storeKey: "ppl-met-mastery", get questions() { return bankRefs("ppl-meteorology"); } },
  "ppl-navigation": { storeKey: "ppl-nav-mastery", get questions() { return bankRefs("ppl-navigation"); } },
  "ppl-flight-planning": { storeKey: "ppl-fpp-mastery", get questions() { return bankRefs("ppl-flight-planning"); } },
  "ppl-aircraft-technical": { storeKey: "ppl-agk-mastery", get questions() { return bankRefs("ppl-aircraft-technical"); } },
  "ppl-human-performance": { storeKey: "ppl-hpl-mastery", get questions() { return bankRefs("ppl-human-performance"); } },
  "ir-meteorology": { storeKey: "ir-met-mastery", get questions() { return bankRefs("ir-meteorology"); } },
  "ir-air-law-awo": { storeKey: "ir-awo-mastery", get questions() { return bankRefs("ir-air-law-awo"); } },
  "ir-flight-performance": { storeKey: "ir-fpp-mastery", get questions() { return bankRefs("ir-flight-performance"); } },
};

export function loadMastery(storeKey: string): MasteryMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(storeKey) || "{}");
  } catch {
    return {};
  }
}

// Per-question readiness contribution:
//   mastered (≥2 correct, 0 wrong) = 1 · in-progress = 0.6 · struggling = 0.25 · unseen = 0
function score(id: string, m: MasteryMap): number {
  const s = m[id];
  if (!s || s.seen === 0) return 0;
  if (s.correct >= 2 && s.wrong === 0) return 1;
  if (s.wrong > s.correct) return 0.25;
  return 0.6;
}

export interface TopicReadiness {
  sectionId: string;
  pct: number; // 0–100
  seen: number;
  total: number;
}
export interface SubjectReadiness {
  subjectId: string;
  pct: number; // 0–100 overall
  seen: number;
  total: number;
  topics: TopicReadiness[];
}

export function subjectReadiness(subjectId: string): SubjectReadiness | null {
  const bank = SUBJECT_BANKS[subjectId];
  if (!bank) return null;
  const m = loadMastery(bank.storeKey);

  const bySection = new Map<string, QRef[]>();
  for (const q of bank.questions) {
    const arr = bySection.get(q.sectionId) ?? [];
    arr.push(q);
    bySection.set(q.sectionId, arr);
  }

  const topics: TopicReadiness[] = [];
  let sum = 0;
  let seen = 0;
  for (const [sectionId, qs] of bySection) {
    let sSum = 0;
    let sSeen = 0;
    for (const q of qs) {
      sSum += score(q.id, m);
      if (m[q.id]?.seen) sSeen++;
    }
    topics.push({ sectionId, pct: Math.round((sSum / qs.length) * 100), seen: sSeen, total: qs.length });
    sum += sSum;
    seen += sSeen;
  }
  return {
    subjectId,
    pct: Math.round((sum / bank.questions.length) * 100),
    seen,
    total: bank.questions.length,
    topics,
  };
}

export const READY_GATE = 90; // target % before sitting the real exam
