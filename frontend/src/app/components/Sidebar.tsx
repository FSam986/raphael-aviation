"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { COURSES, type CourseId } from "@/app/lib/course";
import { useCourse } from "@/app/hooks/useCourse";

export const NAV_ITEMS = [
  { href: "/dashboard", icon: "🏠", label: "Dashboard" },
  { href: "/coach", icon: "🚀", label: "Guaranteed Pass" },
  { href: "/study", icon: "📚", label: "Study" },
  { href: "/ai-tutor", icon: "🤖", label: "AI Instructor" },
  { href: "/exams", icon: "📝", label: "Mock Exams" },
  { href: "/exam-brief", icon: "🎯", label: "Exam-Day Brief" },
  { href: "/flashcards", icon: "🃏", label: "Flashcards" },
  { href: "/progress", icon: "📊", label: "Progress" },
  { href: "/achievements", icon: "🏆", label: "Achievements" },
  { href: "/settings", icon: "⚙️", label: "Settings" },
];

// `active` is the nav href to highlight. `children` renders between the nav and
// the user footer (used by the section page for its topic list).
export function Sidebar({
  active,
  userName,
  children,
  onSignOut,
}: {
  active: string;
  userName: string;
  children?: ReactNode;
  onSignOut?: () => void;
}) {
  const { course, setCourse } = useCourse();
  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col fixed h-full">
      <div className="p-6 border-b border-zinc-900">
        <div className="text-yellow-400 font-black text-lg tracking-wider">RAPHAEL</div>
        <div className="text-zinc-600 text-xs font-medium tracking-widest uppercase">Aviation Academy</div>
      </div>

      {/* Course switcher — grouped into Licences and Ratings */}
      <div className="px-4 pt-4 space-y-2">
        {(["licence", "rating"] as const).map((kind) => {
          const items = (Object.values(COURSES) as { id: CourseId; label: string; kind: string }[]).filter((c) => c.kind === kind);
          if (items.length === 0) return null;
          return (
            <div key={kind}>
              <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1.5 px-1">{kind === "licence" ? "Licences" : "Ratings"}</div>
              <div className="flex gap-1 bg-zinc-900 rounded-xl p-1">
                {items.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCourse(c.id)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      course === c.id ? "bg-yellow-400 text-black" : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-auto">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
              item.href === active
                ? "bg-yellow-400/10 text-yellow-400 font-medium"
                : "text-zinc-500 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      {children}
      <div className="p-4 border-t border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-sm font-bold">
            {userName[0]}
          </div>
          <div>
            <div className="text-white text-sm font-medium">{userName}</div>
            <div className="text-zinc-600 text-xs">{COURSES[course].label} Student</div>
          </div>
        </div>
        {onSignOut && (
          <button
            onClick={onSignOut}
            className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors mt-3"
          >
            Sign out
          </button>
        )}
      </div>
    </aside>
  );
}
