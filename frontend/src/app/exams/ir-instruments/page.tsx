"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { getIRSubject } from "@/app/data/ir-syllabus";

const S = getIRSubject("ir-instruments")!;

export default function IRExamPage() {
  return (
    <MockExam
      subjectId="ir-instruments"
      code={S.code}
      title={`IR ${S.title}`}
      questions={examBank("ir-instruments")}
      examSize={Math.min(S.examQuestions, bankSize("ir-instruments"))}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ir-instruments-mastery"
    />
  );
}
