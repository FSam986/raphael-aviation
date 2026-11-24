"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { getIRSubject } from "@/app/data/ir-syllabus";

const S = getIRSubject("ir-human-performance")!;

export default function IRExamPage() {
  return (
    <MockExam
      subjectId="ir-human-performance"
      code={S.code}
      title={`IR ${S.title}`}
      questions={examBank("ir-human-performance")}
      examSize={Math.min(S.examQuestions, bankSize("ir-human-performance"))}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ir-humanperf-mastery"
    />
  );
}
