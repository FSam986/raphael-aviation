"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { findSubject } from "@/app/lib/course";

const S = findSubject("human-performance")!;

export default function HumanPerformanceExamPage() {
  return (
    <MockExam
      subjectId="human-performance"
      code={S.code}
      title={S.title}
      questions={examBank("human-performance")}
      examSize={Math.min(S.examQuestions, bankSize("human-performance"))}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="humanperf-mastery"
    />
  );
}
