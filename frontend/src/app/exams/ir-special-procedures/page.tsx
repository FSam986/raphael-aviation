"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { getIRSubject } from "@/app/data/ir-syllabus";

const S = getIRSubject("ir-special-procedures")!;

export default function IRExamPage() {
  return (
    <MockExam
      subjectId="ir-special-procedures"
      code={S.code}
      title={`IR ${S.title}`}
      questions={examBank("ir-special-procedures")}
      examSize={Math.min(S.examQuestions, bankSize("ir-special-procedures"))}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ir-specproc-mastery"
    />
  );
}
