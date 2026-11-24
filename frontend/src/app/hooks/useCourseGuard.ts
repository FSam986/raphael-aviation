"use client";

import { useEffect, useState } from "react";
import { courseOfSubject, getActiveCourse, setActiveCourse, type CourseId } from "@/app/lib/course";
import { accessFor, type Access } from "@/app/lib/entitlement";

// Route-level access gate for a subject page (study / exam / flashcards).
// `locked` is true when the signed-in account doesn't own the subject's course,
// which stops a PPL account from opening CPL content by direct URL. When access
// is granted, the active-course UI is synced to the subject actually open.
//
// Re-evaluates on "course-change" (fired when entitlements change or the auth
// guard records the signed-in email) so full-access/ownership that resolves
// after first paint unlocks the page without a reload.
export function useCourseGuard(subjectId: string): { locked: boolean; ready: boolean; course: CourseId | undefined; access: Access } {
  const course = courseOfSubject(subjectId);
  const [state, setState] = useState<{ locked: boolean; ready: boolean; access: Access }>({ locked: false, ready: false, access: "free" });

  useEffect(() => {
    function evaluate() {
      if (!course) {
        setState({ locked: true, ready: true, access: "free" });
        return;
      }
      // Unpaid courses open in Free mode (pages limit content by `access`).
      const access = accessFor(course);
      if (getActiveCourse() !== course) {
        setActiveCourse(course);
        window.dispatchEvent(new Event("course-change"));
      }
      setState({ locked: false, ready: true, access });
    }
    evaluate();
    window.addEventListener("course-change", evaluate);
    window.addEventListener("storage", evaluate);
    return () => {
      window.removeEventListener("course-change", evaluate);
      window.removeEventListener("storage", evaluate);
    };
  }, [course, subjectId]);

  return { ...state, course };
}
