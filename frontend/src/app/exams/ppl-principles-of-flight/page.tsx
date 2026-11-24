"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { findSubject } from "@/app/lib/course";

const S = findSubject("ppl-principles-of-flight")!;

export default function PPLPofExamPage() {
  return (
    <MockExam
      subjectId="ppl-principles-of-flight"
      code={S.code}
      title={S.title}
      questions={examBank("ppl-principles-of-flight")}
      examSize={Math.min(S.examQuestions, bankSize("ppl-principles-of-flight"))}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ppl-pof-mastery"
    />
  );
}
