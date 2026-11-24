"use client";

import Link from "next/link";
import { COURSES, type CourseId } from "@/app/lib/course";
import { Icon } from "@/app/components/Icon";

// Shown in Free mode where content needs a paid plan.
export function UpgradePanel({ course, what = "This topic", compact = false }: { course?: CourseId; what?: string; compact?: boolean }) {
  const label = course ? COURSES[course].label : "this course";
  const href = `/pricing${course ? `?course=${course}` : ""}`;
  if (compact)
    return (
      // Plain badge (it sits inside clickable rows); the locked page links to plans.
      <span className="inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/30">
        <Icon name="lock" size={11} /> {label} plan
      </span>
    );
  return (
    <div className="max-w-md mx-auto my-16 bg-chart-ground-2 border border-chart-line rounded-2xl p-7 text-center">
      <div className="mb-4 flex justify-center text-gold"><Icon name="lock" size={30} /></div>
      <h2 className="text-chart-ink font-bold text-lg">{what} is part of the {label} plan</h2>
      <p className="text-chart-ink-dim text-sm mt-2">
        You&apos;re exploring for free: the first topic of every subject is open, with a sample mock exam. Unlock every topic,
        all questions, flashcards and full SACAA-style mock exams from R249 a month.
      </p>
      <Link href={href} className="mt-5 inline-block w-full px-6 py-3 bg-gold hover:brightness-110 text-gold-ink font-bold rounded-xl">See plans</Link>
    </div>
  );
}
