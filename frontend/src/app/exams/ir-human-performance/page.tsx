"use client";

import { MockExam } from "@/app/components/MockExam";
import { IR_HUMANPERF_QUESTIONS } from "@/app/data/ir-human-performance-questions";
import { getIRSubject } from "@/app/data/ir-syllabus";

const S = getIRSubject("ir-human-performance")!;

export default function IRExamPage() {
  return (
    <MockExam
      subjectId="ir-human-performance"
      code={S.code}
      title={`IR ${S.title}`}
      questions={IR_HUMANPERF_QUESTIONS}
      examSize={Math.min(S.examQuestions, IR_HUMANPERF_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ir-humanperf-mastery"
    />
  );
}
