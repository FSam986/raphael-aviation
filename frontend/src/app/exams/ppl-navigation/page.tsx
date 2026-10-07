"use client";

import { MockExam } from "@/app/components/MockExam";
import { PPL_NAV_QUESTIONS } from "@/app/data/ppl-nav-content";
import { getPPLSubject } from "@/app/data/ppl-syllabus";

const S = getPPLSubject("ppl-navigation")!;

export default function PPLExamPage() {
  return (
    <MockExam
      subjectId="ppl-navigation"
      code={S.code}
      title={`PPL ${S.title}`}
      questions={PPL_NAV_QUESTIONS}
      examSize={Math.min(S.examQuestions, PPL_NAV_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ppl-nav-mastery"
    />
  );
}
