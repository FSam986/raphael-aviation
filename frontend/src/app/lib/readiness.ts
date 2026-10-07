// Readiness — turns the adaptive mastery the app already tracks into a per-topic
// and per-subject "% ready" score. This is the metric the Exam Planner's 90%
// gate runs on. Reads the same localStorage mastery maps the mock exams write.

import type { MasteryMap } from "@/app/lib/examSelect";
import { MET_QUESTIONS } from "@/app/data/met-questions";
import { AIRLAW_ALL_QUESTIONS } from "@/app/data/airlaw-questions";
import { PPL_AIRLAW_QUESTIONS } from "@/app/data/ppl-airlaw-questions";
import { FPP_ALL_QUESTIONS } from "@/app/data/fpp-questions";
import { NAV_QUESTIONS } from "@/app/data/nav-questions";
import { ATG_QUESTIONS } from "@/app/data/aircraft-technical-questions";
import { HUMAN_PERFORMANCE_QUESTIONS } from "@/app/data/human-performance-questions";
import { PPL_POF_QUESTIONS } from "@/app/data/ppl-principles-of-flight-questions";
import { RADIONAV_QUESTIONS } from "@/app/data/radionav-questions";
import { IR_INSTRUMENTS_QUESTIONS } from "@/app/data/ir-instruments-questions";
import { IR_SPECPROC_QUESTIONS } from "@/app/data/ir-special-procedures-questions";
import { IR_RADIONAV_QUESTIONS } from "@/app/data/ir-radio-navigation-questions";
import { GR_QUESTIONS } from "@/app/data/gr-questions";
import { ALL_INSTRUMENTS_QUESTIONS } from "@/app/data/instruments-questions";
import { IR_HUMANPERF_QUESTIONS } from "@/app/data/ir-human-performance-questions";
import { PPL_MET_QUESTIONS } from "@/app/data/ppl-met-content";
import { PPL_NAV_QUESTIONS } from "@/app/data/ppl-nav-content";
import { PPL_FPP_QUESTIONS } from "@/app/data/ppl-fpp-content";
import { PPL_AGK_QUESTIONS } from "@/app/data/ppl-agk-content";
import { PPL_HPL_QUESTIONS } from "@/app/data/ppl-human-performance-questions";
import { IR_MET_QUESTIONS } from "@/app/data/ir-met-content";
import { IR_AWO_QUESTIONS } from "@/app/data/ir-awo-content";
import { IR_FPP_QUESTIONS } from "@/app/data/ir-fpp-content";

interface QRef {
  id: string;
  sectionId: string;
}

// subjectId → { mastery localStorage key, full question bank }
export const SUBJECT_BANKS: Record<string, { storeKey: string; questions: QRef[] }> = {
  meteorology: { storeKey: "met-mastery", questions: MET_QUESTIONS },
  "air-law": { storeKey: "law-mastery", questions: AIRLAW_ALL_QUESTIONS },
  "ppl-air-law": { storeKey: "ppl-law-mastery", questions: PPL_AIRLAW_QUESTIONS },
  "flight-planning": { storeKey: "fpp-mastery", questions: FPP_ALL_QUESTIONS },
  navigation: { storeKey: "nav-mastery", questions: NAV_QUESTIONS },
  "aircraft-technical": { storeKey: "atg-mastery", questions: ATG_QUESTIONS },
  "human-performance": { storeKey: "humanperf-mastery", questions: HUMAN_PERFORMANCE_QUESTIONS },
  "ppl-principles-of-flight": { storeKey: "ppl-pof-mastery", questions: PPL_POF_QUESTIONS },
  "radio-navigation": { storeKey: "radionav-mastery", questions: RADIONAV_QUESTIONS },
  "ir-instruments": { storeKey: "ir-instruments-mastery", questions: IR_INSTRUMENTS_QUESTIONS },
  "ir-special-procedures": { storeKey: "ir-specproc-mastery", questions: IR_SPECPROC_QUESTIONS },
  "ir-human-performance": { storeKey: "ir-humanperf-mastery", questions: IR_HUMANPERF_QUESTIONS },
  "ir-radio-navigation": { storeKey: "ir-radionav-mastery", questions: IR_RADIONAV_QUESTIONS },
  "general-radiotelephony": { storeKey: "gr-mastery", questions: GR_QUESTIONS },
  "flight-instruments": { storeKey: "instruments-mastery", questions: ALL_INSTRUMENTS_QUESTIONS },
  "ppl-meteorology": { storeKey: "ppl-met-mastery", questions: PPL_MET_QUESTIONS },
  "ppl-navigation": { storeKey: "ppl-nav-mastery", questions: PPL_NAV_QUESTIONS },
  "ppl-flight-planning": { storeKey: "ppl-fpp-mastery", questions: PPL_FPP_QUESTIONS },
  "ppl-aircraft-technical": { storeKey: "ppl-agk-mastery", questions: PPL_AGK_QUESTIONS },
  "ppl-human-performance": { storeKey: "ppl-hpl-mastery", questions: PPL_HPL_QUESTIONS },
  "ir-meteorology": { storeKey: "ir-met-mastery", questions: IR_MET_QUESTIONS },
  "ir-air-law-awo": { storeKey: "ir-awo-mastery", questions: IR_AWO_QUESTIONS },
  "ir-flight-performance": { storeKey: "ir-fpp-mastery", questions: IR_FPP_QUESTIONS },
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
