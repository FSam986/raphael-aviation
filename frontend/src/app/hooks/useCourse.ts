"use client";

import { useCallback, useSyncExternalStore } from "react";
import { COURSES, getActiveCourse, setActiveCourse, type CourseId } from "@/app/lib/course";
import { accessFor, type Access } from "@/app/lib/entitlement";

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
  // Every course can be opened: unpaid ones are in Free (explore) mode.
  const course = stored;
  const access = useSyncExternalStore<Access>(subscribe, () => accessFor(course), () => "free");

  const setCourse = useCallback((id: CourseId) => {
    setActiveCourse(id);
    window.dispatchEvent(new Event("course-change"));
  }, []);

  return { course, setCourse, access, syllabus: COURSES[course].syllabus };
}
