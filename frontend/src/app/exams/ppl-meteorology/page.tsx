"use client";

import { MockExam } from "@/app/components/MockExam";
import { PPL_MET_QUESTIONS } from "@/app/data/ppl-met-content";
import { getPPLSubject } from "@/app/data/ppl-syllabus";

const MET = getPPLSubject("ppl-meteorology")!;

export default function PPLMeteorologyExamPage() {
  return (
    <MockExam
      subjectId="ppl-meteorology"
      code={MET.code}
      title={`PPL ${MET.title}`}
      questions={PPL_MET_QUESTIONS}
      examSize={Math.min(MET.examQuestions, PPL_MET_QUESTIONS.length)}
      examMinutes={MET.examMinutes ?? 120}
      passPercent={MET.passPercent}
      storeKey="ppl-met-mastery"
    />
  );
}
