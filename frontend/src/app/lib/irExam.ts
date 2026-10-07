// The SACAA Instrument Rating paper is ONE combined exam: 100 questions, 3 hours,
// drawn from all seven subjects in a fixed order (Meteorology first, then Radio
// Navigation, etc.). This plan defines that order and the per-subject count.
// Counts are editable — adjust to the exact SACAA breakdown when confirmed.
// Subjects whose banks aren't built yet contribute what they have (0 for now).

import type { ExamPlanEntry } from "@/app/components/MockExam";
import { IR_MET_QUESTIONS } from "@/app/data/ir-met-content";
import { IR_AWO_QUESTIONS } from "@/app/data/ir-awo-content";
import { IR_FPP_QUESTIONS } from "@/app/data/ir-fpp-content";
import { IR_RADIONAV_QUESTIONS } from "@/app/data/ir-radio-navigation-questions";
import { IR_SPECPROC_QUESTIONS } from "@/app/data/ir-special-procedures-questions";
import { IR_INSTRUMENTS_QUESTIONS } from "@/app/data/ir-instruments-questions";
import { IR_HUMANPERF_QUESTIONS } from "@/app/data/ir-human-performance-questions";

export const IR_EXAM_TOTAL = 100;
export const IR_EXAM_MINUTES = 180;
export const IR_EXAM_PASS = 75;

// SACAA Instrument Rating: one 100-question paper, in subject order.
export const IR_EXAM_PLAN: ExamPlanEntry[] = [
  { label: "Meteorology", storeKey: "ir-met-mastery", questions: IR_MET_QUESTIONS, count: 15 },
  { label: "Radio Navigation", storeKey: "ir-rnv-mastery", questions: IR_RADIONAV_QUESTIONS, count: 15 },
  { label: "Air Law & All-Weather Operations", storeKey: "ir-awo-mastery", questions: IR_AWO_QUESTIONS, count: 15 },
  { label: "Flight Performance & Planning", storeKey: "ir-fpp-mastery", questions: IR_FPP_QUESTIONS, count: 15 },
  { label: "Special Operational Procedures & Hazards", storeKey: "ir-sop-mastery", questions: IR_SPECPROC_QUESTIONS, count: 10 },
  { label: "Instruments", storeKey: "ir-ins-mastery", questions: IR_INSTRUMENTS_QUESTIONS, count: 20 },
  { label: "Human Performance & Limitations", storeKey: "ir-hpl-mastery", questions: IR_HUMANPERF_QUESTIONS, count: 10 },
];
