"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { COURSES, type CourseId } from "@/app/lib/course";
import { useCourse } from "@/app/hooks/useCourse";

// Drawn line icons — one consistent 1.6 stroke, no emoji. `d` holds the path(s).
const ICONS: Record<string, ReactNode> = {
  dashboard: <><circle cx="12" cy="12" r="9" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><path d="M9 15l3-7 3 7-3-1.5z" /></>,
  coach: <><path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.4 7.2 17.9l.9-5.4L4.2 8.7l5.4-.8z" /></>,
  study: <><path d="M4 5.5A2 2 0 0 1 6 4h6v15H6a2 2 0 0 0-2 2z" /><path d="M20 5.5A2 2 0 0 0 18 4h-6v15h6a2 2 0 0 1 2 2z" /></>,
  exams: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 3h6v3H9z" /><path d="M8.5 11l1.5 1.5L13 9M8.5 16l1.5 1.5L13 14" /></>,
  brief: <><path d="M5 3v18" /><path d="M5 4h11l-1.5 3L16 10H5" /></>,
  flashcards: <><rect x="3" y="7" width="14" height="12" rx="2" /><path d="M7 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" /></>,
  progress: <><path d="M4 19V5M4 19h16" /><path d="M7 15l3-4 3 2 4-6" /></>,
  achievements: <><circle cx="12" cy="9" r="5" /><path d="M9 13l-1.5 7L12 18l4.5 2L15 13" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 2.6 14H2.5a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9 2.6h.1A1.6 1.6 0 0 0 11 1h2a1.6 1.6 0 0 0 1.9 1.6 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.6 1.6 0 0 0 21.4 9H21a1.6 1.6 0 0 0 0 4h.1a1.6 1.6 0 0 0-1.7 2z" /></>,
};

function NavIcon({ name }: { name: string }) {
  return (
    <svg className="h-[18px] w-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

export const NAV_ITEMS = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/coach", icon: "coach", label: "Pass Mode" },
  { href: "/study", icon: "study", label: "Study" },
  { href: "/exams", icon: "exams", label: "Mock Exams" },
  { href: "/exam-brief", icon: "brief", label: "Exam-Day Brief" },
  { href: "/flashcards", icon: "flashcards", label: "Flashcards" },
  { href: "/progress", icon: "progress", label: "Progress" },
  { href: "/achievements", icon: "achievements", label: "Achievements" },
  { href: "/settings", icon: "settings", label: "Settings" },
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
  const [open, setOpen] = useState(false);
  return (
    <>
    {/* Mobile top bar */}
    <div className="md:hidden fixed top-0 inset-x-0 z-50 h-14 flex items-center gap-3 px-4 bg-chart-ground-2 border-b border-chart-line">
      <button onClick={() => setOpen(true)} aria-label="Open navigation" className="text-chart-ink-dim hover:text-chart-ink p-1 -ml-1">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>
      <img src="/logo-emblem.png" alt="" className="h-7 w-auto" />
      <span className="font-display text-gold text-lg tracking-[0.18em]">RAPHAEL</span>
    </div>
    {/* Backdrop */}
    {open && <div className="md:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setOpen(false)} aria-hidden="true" />}

    <aside
      className={`w-64 bg-chart-ground-2 border-r border-chart-line flex flex-col fixed h-full z-50 transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      onClick={() => setOpen(false)}
    >
      <div className="p-5 border-b border-chart-line flex items-center gap-3">
        <img src="/logo-emblem.png" alt="Raphael Aviation" className="h-9 w-auto flex-shrink-0" />
        <div className="leading-tight">
          <div className="font-display text-gold text-xl tracking-[0.16em]">RAPHAEL</div>
          <div className="mono text-chart-ink-faint text-[10px] tracking-[0.34em] uppercase mt-0.5">Aviation</div>
        </div>
      </div>

      {/* Course switcher — grouped into Licences and Ratings */}
      <div className="px-4 pt-4 space-y-2">
        {(["licence", "rating"] as const).map((kind) => {
          const items = (Object.values(COURSES) as { id: CourseId; label: string; kind: string }[]).filter((c) => c.kind === kind);
          if (items.length === 0) return null;
          return (
            <div key={kind}>
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-chart-ink-faint mb-1.5 px-1">{kind === "licence" ? "Licences" : "Ratings"}</div>
              <div className="flex gap-1 bg-chart-ground rounded-lg p-1 border border-chart-line">
                {items.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCourse(c.id)}
                    className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      course === c.id ? "bg-gold text-gold-ink" : "text-chart-ink-faint hover:text-chart-ink"
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

      <nav className="flex-1 p-4 space-y-0.5 overflow-auto">
        {NAV_ITEMS.map((item) => {
          const on = item.href === active;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                on ? "text-gold bg-gold/[0.08]" : "text-chart-ink-dim hover:text-chart-ink hover:bg-chart-ground"
              }`}
            >
              {on && <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-gold" aria-hidden="true" />}
              <NavIcon name={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      {children}
      <div className="p-4 border-t border-chart-line">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-gold/40 bg-gold/15 flex items-center justify-center text-gold text-sm font-semibold font-display">
            {userName[0]}
          </div>
          <div>
            <div className="text-chart-ink text-sm font-medium">{userName}</div>
            <div className="mono text-chart-ink-faint text-[10px] tracking-wider uppercase">{COURSES[course].label} · Candidate</div>
          </div>
        </div>
        {onSignOut && (
          <button
            onClick={onSignOut}
            className="mono text-chart-ink-faint hover:text-chart-ink text-[11px] tracking-wider uppercase transition-colors mt-3"
          >
            Sign out
          </button>
        )}
      </div>
    </aside>
    </>
  );
}
