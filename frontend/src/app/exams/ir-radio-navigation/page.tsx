"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { getIRSubject } from "@/app/data/ir-syllabus";

const S = getIRSubject("ir-radio-navigation")!;

export default function IRExamPage() {
  return (
    <MockExam
      subjectId="ir-radio-navigation"
      code={S.code}
      title={`IR ${S.title}`}
      questions={examBank("ir-radio-navigation")}
      examSize={Math.min(S.examQuestions, bankSize("ir-radio-navigation"))}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ir-radionav-mastery"
    />
  );
}
