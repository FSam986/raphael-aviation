"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { getPPLSubject } from "@/app/data/ppl-syllabus";

const S = getPPLSubject("ppl-navigation")!;

export default function PPLExamPage() {
  return (
    <MockExam
      subjectId="ppl-navigation"
      code={S.code}
      title={`PPL ${S.title}`}
      questions={examBank("ppl-navigation")}
      examSize={Math.min(S.examQuestions, bankSize("ppl-navigation"))}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ppl-nav-mastery"
    />
  );
}
