"use client";

import { MockExam } from "@/app/components/MockExam";
import { NAV_QUESTIONS } from "@/app/data/nav-questions";
import { findSubject } from "@/app/lib/course";

const S = findSubject("navigation")!;

export default function NavigationExamPage() {
  return (
    <MockExam
      subjectId="navigation"
      code={S.code}
      title={S.title}
      questions={NAV_QUESTIONS}
      examSize={Math.min(S.examQuestions, NAV_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="nav-mastery"
    />
  );
}
