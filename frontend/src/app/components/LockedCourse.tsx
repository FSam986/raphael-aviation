"use client";

import Link from "next/link";
import { COURSES, type CourseId } from "@/app/lib/course";
import { Icon } from "@/app/components/Icon";

// Shown in place of subject content when the account doesn't own that course.
export function LockedCourse({ course }: { course?: CourseId }) {
  const label = course ? COURSES[course].name : "This course";
  return (
    <div className="min-h-screen bg-chart-ground flex items-center justify-center px-6">
      <div className="max-w-sm w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-7 text-center">
        <div className="mb-4 flex justify-center text-zinc-600"><Icon name="lock" size={34} /></div>
        <h1 className="text-white font-bold text-lg">{label} is locked</h1>
        <p className="text-zinc-500 text-sm mt-2">
          Your subscription doesn&apos;t include this course. Unlock it to access its study
          material, flashcards and mock exams.
        </p>
        <Link
          href="/settings"
          className="mt-5 inline-block w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl transition-colors"
        >
          Manage subscription
        </Link>
      </div>
    </div>
  );
}
