"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { findSubject } from "@/app/lib/course";

const S = findSubject("navigation")!;

export default function NavigationExamPage() {
  return (
    <MockExam
      subjectId="navigation"
      code={S.code}
      title={S.title}
      questions={examBank("navigation")}
      examSize={Math.min(S.examQuestions, bankSize("navigation"))}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="nav-mastery"
    />
  );
}
