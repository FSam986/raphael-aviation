"use client";

import { MockExam } from "@/app/components/MockExam";
import { HUMAN_PERFORMANCE_QUESTIONS } from "@/app/data/human-performance-questions";
import { findSubject } from "@/app/lib/course";

const S = findSubject("human-performance")!;

export default function HumanPerformanceExamPage() {
  return (
    <MockExam
      subjectId="human-performance"
      code={S.code}
      title={S.title}
      questions={HUMAN_PERFORMANCE_QUESTIONS}
      examSize={Math.min(S.examQuestions, HUMAN_PERFORMANCE_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="humanperf-mastery"
    />
  );
}
