"use client";

import { MockExam } from "@/app/components/MockExam";
import { PPL_AIRLAW_QUESTIONS } from "@/app/data/ppl-airlaw-questions";
import { getPPLSubject } from "@/app/data/ppl-syllabus";

const LAW = getPPLSubject("ppl-air-law")!;

export default function PPLAirLawExamPage() {
  return (
    <MockExam
      subjectId="ppl-air-law"
      code={LAW.code}
      title={`PPL ${LAW.title}`}
      questions={PPL_AIRLAW_QUESTIONS}
      examSize={Math.min(LAW.examQuestions, PPL_AIRLAW_QUESTIONS.length)}
      examMinutes={LAW.examMinutes ?? 120}
      passPercent={LAW.passPercent}
      storeKey="ppl-law-mastery"
    />
  );
}
