// The SACAA Instrument Rating paper is ONE combined exam: 100 questions, 3 hours,
// drawn from all seven subjects in a fixed order (Meteorology first, then Radio
// Navigation, etc.). This plan defines that order and the per-subject count.
// Counts are editable — adjust to the exact SACAA breakdown when confirmed.
// Subjects whose banks aren't built yet contribute what they have (0 for now).

import type { ExamPlanEntry } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";

export const IR_EXAM_TOTAL = 100;
export const IR_EXAM_MINUTES = 180;
export const IR_EXAM_PASS = 75;

// SACAA Instrument Rating: one 100-question paper, in subject order.
export const IR_EXAM_PLAN: ExamPlanEntry[] = [
  { label: "Meteorology", storeKey: "ir-met-mastery", get questions() { return examBank("ir-meteorology"); }, count: 15, subjectId: "ir-meteorology" },
  { label: "Radio Navigation", storeKey: "ir-radionav-mastery", get questions() { return examBank("ir-radio-navigation"); }, count: 15, subjectId: "ir-radio-navigation" },
  { label: "Air Law & All-Weather Operations", storeKey: "ir-awo-mastery", get questions() { return examBank("ir-air-law-awo"); }, count: 15, subjectId: "ir-air-law-awo" },
  { label: "Flight Performance & Planning", storeKey: "ir-fpp-mastery", get questions() { return examBank("ir-flight-performance"); }, count: 15, subjectId: "ir-flight-performance" },
  { label: "Special Operational Procedures & Hazards", storeKey: "ir-specproc-mastery", get questions() { return examBank("ir-special-procedures"); }, count: 10, subjectId: "ir-special-procedures" },
  { label: "Instruments", storeKey: "ir-instruments-mastery", get questions() { return examBank("ir-instruments"); }, count: 20, subjectId: "ir-instruments" },
  { label: "Human Performance & Limitations", storeKey: "ir-humanperf-mastery", get questions() { return examBank("ir-human-performance"); }, count: 10, subjectId: "ir-human-performance" },
];
