"use client";

import { useCallback, useSyncExternalStore } from "react";
import { COURSES, getActiveCourse, setActiveCourse, type CourseId } from "@/app/lib/course";
import { ownedCourses, ownsCourse } from "@/app/lib/entitlement";

// Reactive access to the active course via an external store, so EVERY mounted
// component (subject lists, sidebar, dashboard…) re-renders the instant the
// course changes — no matter which component triggered the switch.
// `course-change` is our in-tab signal; `storage` keeps other tabs in sync.
function subscribe(callback: () => void) {
  window.addEventListener("course-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("course-change", callback);
    window.removeEventListener("storage", callback);
  };
}

export function useCourse() {
  const stored = useSyncExternalStore<CourseId>(
    subscribe,
    getActiveCourse, // client snapshot (reads localStorage; returns a primitive, so it's stable)
    () => "cpl",     // server snapshot for SSR/first paint
  );
  // Never surface an unowned course's syllabus — fall back to the first owned
  // course so indexes (study/exams/flashcards) only list entitled subjects.
  const course = ownsCourse(stored) ? stored : (ownedCourses()[0] ?? stored);

  // Only switch to a course the account owns; ignore attempts to switch to a
  // locked one (the sidebar also disables those buttons).
  const setCourse = useCallback((id: CourseId) => {
    if (!ownsCourse(id)) return;
    setActiveCourse(id);
    window.dispatchEvent(new Event("course-change"));
  }, []);

  return { course, setCourse, syllabus: COURSES[course].syllabus };
}
