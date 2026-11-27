"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { findSubject } from "@/app/lib/course";

const S = findSubject("ppl-human-performance")!;

export default function PPLHumanPerformanceExamPage() {
  return (
    <MockExam
      subjectId="ppl-human-performance"
      code={S.code}
      title={S.title}
      questions={examBank("ppl-human-performance")}
      examSize={Math.min(S.examQuestions, bankSize("ppl-human-performance"))}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ppl-hpl-mastery"
    />
  );
}
