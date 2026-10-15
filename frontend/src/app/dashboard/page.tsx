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
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      const name = data.user.user_metadata?.full_name?.split(" ")[0] || "Student";
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

        <div className="relative px-10 pt-10 pb-20 max-w-4xl rise">
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

          <ol className="relative mt-6 ml-[7px] border-l border-dashed border-chart-line-2">
            {legs.map((leg, i) => {
              const totalItems = leg.subject.sections.reduce((n, s) => n + s.items.length, 0);
              return (
                <li key={leg.subject.id} className="relative pl-8 pb-3">
                  {/* Waypoint dot */}
                  <span
                    className={`absolute -left-[7px] top-4 h-3.5 w-3.5 rounded-full border-2 ${leg.done ? "bg-gold border-gold" : leg.pct > 0 ? "bg-chart-ground border-gold" : "bg-chart-ground border-chart-line-2"}`}
                    aria-hidden="true"
                  />
                  <Link
                    href={`/study/${leg.subject.id}`}
                    className="group block rounded-xl border border-chart-line bg-chart-ground-2/60 px-5 py-4 transition-colors hover:border-gold/40 hover:bg-chart-ground-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="mono text-[11px] text-chart-ink-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="text-chart-ink font-semibold text-[15px] flex-1 leading-tight">{leg.subject.title}</h3>
                      <span className={`mono text-[10px] uppercase tracking-[0.14em] ${leg.done ? "text-gold" : leg.pct > 0 ? "text-chart-ink-dim" : "text-chart-ink-faint"}`}>
                        {leg.label}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 pl-[34px]">
                      <span className="mono text-[11px] text-gold-deep tracking-wider">{leg.subject.code}</span>
                      <span className="mono text-[11px] text-chart-ink-faint">{leg.subject.sections.length} sec · {totalItems} topics</span>
                      <div className="flex-1 h-[3px] rounded-full bg-chart-line overflow-hidden">
                        <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${leg.pct}%` }} />
                      </div>
                      <span className="mono text-[11px] text-chart-ink-dim tabular-nums w-9 text-right">{leg.pct}%</span>
                    </div>
                  </Link>
                </li>
              );
            })}
            {/* Destination */}
            <li className="relative pl-8 pt-1">
              <DestGlyph />
              <div className="text-chart-ink-faint mono text-[11px] uppercase tracking-[0.18em] py-2">Destination · SACAA exam</div>
            </li>
          </ol>
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
    <span className="absolute -left-[11px] top-1 flex h-5 w-5 items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 21V4l13 4.5L5 13" /><path d="M5 21h5" />
      </svg>
    </span>
  );
}
