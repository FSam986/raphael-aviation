"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCourse } from "@/app/hooks/useCourse";
import { Sidebar } from "@/app/components/Sidebar";
import { getProgress, getResume, type ProgressSummary } from "@/app/lib/progress";
import { findSubject } from "@/app/lib/course";

// Each subject becomes a waypoint on the route. Status is read from study
// coverage: no sections opened = planned, all opened = cleared, else en route.
function legStatus(studied: number, total: number): { label: string; pct: number; done: boolean } {
  const pct = total ? Math.round((studied / total) * 100) : 0;
  return { label: pct === 0 ? "Planned" : pct >= 100 ? "Cleared" : "En route", pct, done: pct >= 100 };
}

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Student");
  const [loading, setLoading] = useState(true);
  const { course, syllabus } = useCourse();
  const [prog, setProg] = useState<ProgressSummary | null>(null);
  const [resume, setResume] = useState<ReturnType<typeof getResume>>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/login"); return; }
      const name = session.user.user_metadata?.full_name?.split(" ")[0] || "Student";
      setUserName(name);
      setLoading(false);
    });
  }, [router]);

  useEffect(() => {
    const read = () => { setProg(getProgress()); setResume(getResume()); };
    read();
    window.addEventListener("progress-change", read);
    return () => window.removeEventListener("progress-change", read);
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-chart-ground flex items-center justify-center">
        <div className="text-chart-ink-faint text-sm mono tracking-widest">PLOTTING ROUTE…</div>
      </div>
    );
  }

  // Route-wide readiness = mean of per-subject study coverage.
  const legs = syllabus.map((subject) => {
    const total = subject.sections.length || 1;
    const studied = prog?.bySubject[subject.id]?.topics ?? 0;
    return { subject, ...legStatus(Math.min(studied, total), total) };
  });
  const overall = legs.length ? Math.round(legs.reduce((n, l) => n + l.pct, 0) / legs.length) : 0;
  const underway = legs.filter((l) => l.pct > 0).length;

  return (
    <div className="min-h-screen bg-chart-ground flex">
      <Sidebar active="/dashboard" userName={userName} onSignOut={handleSignOut} />

      <main className="flex-1 md:ml-64 pt-14 md:pt-0 relative overflow-auto">
        {/* Faint chart grid + compass rose backdrop */}
        <div className="pointer-events-none absolute inset-0 chart-grid opacity-40" aria-hidden="true" />
        <CompassRose />

        <div className="relative px-5 sm:px-10 pt-10 pb-20 max-w-4xl rise">
          {/* Leg label + greeting */}
          <div className="mono text-[11px] tracking-[0.2em] text-chart-ink-faint mb-2 uppercase">
            {course.toUpperCase()} route · {underway} of {legs.length} legs underway · est. readiness {overall}%
          </div>
          <h1 className="font-display text-4xl text-chart-ink leading-tight">Good morning, {userName}</h1>

          {/* Instrument readout line — a flight-log strip, not stat tiles */}
          <div className="mt-5 border-y border-chart-line py-3 flex flex-wrap items-center gap-x-7 gap-y-2 mono text-[12px] tracking-[0.08em]">
            <Metric k="QUESTIONS" v={prog ? prog.attempted.toLocaleString() : "0"} note={prog && prog.attempted ? `${prog.accuracy}% correct` : undefined} />
            <Sep /><Metric k="TOPICS" v={prog ? String(prog.topicsStudied) : "0"} />
            <Sep /><Metric k="UNDERWAY" v={`${underway}/${legs.length}`} />
            <Sep /><Metric k="STREAK" v={`${prog?.streak ?? 0}`} note={`day${(prog?.streak ?? 0) === 1 ? "" : "s"}`} />
          </div>

          {/* Resume — the next leg */}
          {resume && (() => {
            const sub = findSubject(resume.subjectId);
            const sec = sub?.sections.find((s) => s.id === resume.sectionId);
            return (
              <Link href={resume.href} className="mt-6 group flex items-center gap-4 rounded-xl border border-gold/35 bg-gold/[0.07] px-5 py-4 hover:bg-gold/[0.12] transition-colors">
                <ResumeGlyph />
                <div className="flex-1 min-w-0">
                  <div className="text-chart-ink font-semibold truncate">{sub?.title ?? resume.subjectId}{sec ? ` — ${sec.title}` : ""}</div>
                  <div className="mono text-[11px] text-chart-ink-faint tracking-wider mt-0.5">Pick up where your route left off</div>
                </div>
                <span className="text-gold text-sm whitespace-nowrap group-hover:translate-x-1 transition-transform">Resume →</span>
              </Link>
            );
          })()}

          {/* The route */}
          <div className="mt-12 flex items-baseline justify-between">
            <h2 className="font-display text-xl text-chart-ink">Flight plan — SACAA {course.toUpperCase()}</h2>
            <span className="mono text-[11px] text-chart-ink-faint tracking-wider">{legs.length} WAYPOINTS</span>
          </div>

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {legs.map((leg, i) => {
              const totalItems = leg.subject.sections.reduce((n, s) => n + s.items.length, 0);
              return (
                <Link
                  key={leg.subject.id}
                  href={`/study/${leg.subject.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-chart-line bg-chart-ground-2/60 p-4 sm:p-5 transition-colors hover:border-gold/45 hover:bg-chart-ground-2"
                >
                  {/* status accent bar along the top */}
                  <span
                    className={`absolute inset-x-0 top-0 h-[3px] ${leg.done ? "bg-gold" : leg.pct > 0 ? "bg-gold/50" : "bg-chart-line-2"}`}
                    aria-hidden="true"
                  />
                  {/* large faint index — the thumbnail motif */}
                  <span className="pointer-events-none absolute -right-1 -bottom-3 font-display text-7xl leading-none text-chart-line/40 select-none" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative flex items-center justify-between">
                    <span className="mono text-[11px] tracking-wider text-gold-deep">{leg.subject.code}</span>
                    <span className={`mono text-[9px] uppercase tracking-[0.14em] ${leg.done ? "text-gold" : leg.pct > 0 ? "text-chart-ink-dim" : "text-chart-ink-faint"}`}>
                      {leg.label}
                    </span>
                  </div>

                  <h3 className="relative mt-3 text-chart-ink font-semibold text-[15px] leading-snug min-h-[2.6em]">{leg.subject.title}</h3>

                  <div className="relative mt-auto pt-3">
                    <div className="mono text-[10px] text-chart-ink-faint mb-2">{leg.subject.sections.length} sec · {totalItems} topics</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-[3px] rounded-full bg-chart-line overflow-hidden">
                        <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${leg.pct}%` }} />
                      </div>
                      <span className="mono text-[10px] text-chart-ink-dim tabular-nums w-8 text-right">{leg.pct}%</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-2 text-chart-ink-faint mono text-[11px] uppercase tracking-[0.18em]">
            <DestGlyph /> <span className="pl-1">Destination · SACAA exam</span>
          </div>
        </div>
      </main>
    </div>
  );
}

function Metric({ k, v, note }: { k: string; v: string; note?: string }) {
  return (
    <span className="text-chart-ink-faint">
      {k} <b className="text-gold font-medium tabular-nums">{v}</b>
      {note ? <span className="text-chart-ink-faint/70"> {note}</span> : null}
    </span>
  );
}
function Sep() {
  return <span className="text-chart-line-2" aria-hidden="true">·</span>;
}

function CompassRose() {
  return (
    <svg className="pointer-events-none absolute right-6 top-4 h-64 w-64 opacity-[0.22]" viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <circle cx="100" cy="100" r="92" stroke="var(--chart-line-2)" />
      <circle cx="100" cy="100" r="62" stroke="var(--chart-line-2)" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15 * Math.PI) / 180;
        const r1 = i % 2 === 0 ? 78 : 86;
        return <line key={i} x1={100 + 78 * Math.sin(a)} y1={100 - 78 * Math.cos(a)} x2={100 + r1 * Math.sin(a)} y2={100 - r1 * Math.cos(a)} stroke="var(--chart-line-2)" />;
      })}
      <path d="M100 18 L112 100 L100 128 L88 100 Z" fill="var(--gold)" opacity="0.5" />
      <path d="M100 182 L112 100 L100 72 L88 100 Z" fill="var(--chart-line-2)" />
      <text x="100" y="12" fill="var(--gold-deep)" fontSize="11" textAnchor="middle" fontFamily="var(--font-overpass-mono)">N</text>
    </svg>
  );
}

function ResumeGlyph() {
  return (
    <svg className="h-6 w-6 flex-shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 2.6-6.3" /><path d="M3 4v4h4" />
    </svg>
  );
}

function DestGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 21V4l13 4.5L5 13" /><path d="M5 21h5" />
    </svg>
  );
}
