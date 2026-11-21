"use client";

import { signOutWithSync, startProgressSync } from "@/app/lib/progressSync";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCourse } from "@/app/hooks/useCourse";
import { Sidebar } from "@/app/components/Sidebar";
import { getProgress, getResume, type ProgressSummary } from "@/app/lib/progress";
import { findSubject } from "@/app/lib/course";
import { Atis, Attitude, Gauge, RouteMap } from "@/app/components/Cockpit";

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
      void startProgressSync(session.user.id);
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
    await signOutWithSync();
    router.push("/login");
  }

  if (loading) {
    return (
      <LoadingScreen />
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

  const short = (t: string) => t.replace(/\(.*?\)/g, "").replace(/ and | & /g, " ").trim().split(/\s+/).slice(0, 2).join(" ");
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const next = legs.find((l) => l.pct < 100);
  const weakest = [...legs].filter((l) => l.pct > 0).sort((x, y) => x.pct - y.pct)[0];

  return (
    <div className="min-h-screen bg-chart-ground flex">
      <Sidebar active="/dashboard" userName={userName} onSignOut={handleSignOut} />

      <main className="flex-1 md:ml-64 pt-14 md:pt-0 relative overflow-auto">
        <div className="relative px-5 sm:px-10 pt-8 pb-20 max-w-6xl rise space-y-6">
          <Atis items={[`${course} route`, `readiness ${overall}%`, `streak ${prog?.streak ?? 0} days`, `${(prog?.attempted ?? 0).toLocaleString()} questions flown`, prog?.attempted ? `accuracy ${prog.accuracy}%` : null, weakest && `weakest: ${short(weakest.subject.title)} ${weakest.pct}%`]} />

          {/* Flight deck hero */}
          <section className="rounded-2xl border border-chart-line bg-chart-ground-2 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
            <Attitude pct={overall} />
            <div className="flex-1 min-w-0 space-y-4">
              <div className="mono text-[11px] tracking-[0.16em] uppercase text-data">Overall readiness · {underway} of {legs.length} legs underway</div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-chart-ink leading-none">{greet}, {userName}</h1>
              <p className="text-chart-ink-dim text-[15px] leading-relaxed max-w-xl">
                {overall === 0 ? "Your route is filed. Open your first subject to get airborne."
                  : next ? `Next waypoint: ${next.subject.title} at ${next.pct}%. Keep the route moving.` : "Every waypoint cleared. You're ready to request the SACAA exam."}
              </p>
              <div className="flex flex-wrap gap-3">
                {resume ? (() => {
                  const sub = findSubject(resume.subjectId);
                  const sec = sub?.sections.find((x) => x.id === resume.sectionId);
                  return <Link href={resume.href} className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-ink font-semibold text-sm px-4 py-2.5 hover:brightness-110 transition">Resume: {sec?.title ?? sub?.title ?? "last topic"} →</Link>;
                })() : next && <Link href={`/study/${next.subject.id}`} className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-ink font-semibold text-sm px-4 py-2.5 hover:brightness-110 transition">Start {next.subject.title} →</Link>}
                <Link href="/exams" className="inline-flex items-center rounded-xl border border-chart-line text-chart-ink text-sm px-4 py-2.5 hover:border-gold/45 transition-colors">Start mock exam</Link>
              </div>
            </div>
          </section>

          {/* Route to the licence */}
          <section className="space-y-3">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="mono text-[11px] tracking-[0.16em] uppercase text-data">Flight plan · SACAA {course.toUpperCase()}</div>
                <h2 className="font-display font-bold text-3xl text-chart-ink leading-none mt-1">{legs.filter((l) => l.done).length} of {legs.length} waypoints cleared</h2>
              </div>
              <div className="flex gap-4 mono text-[11px] text-chart-ink-dim">
                <span><i className="inline-block w-2.5 h-2.5 rounded-full bg-success mr-1.5" />Cleared</span>
                <span><i className="inline-block w-2.5 h-2.5 rounded-full bg-gold mr-1.5" />En route</span>
                <span><i className="inline-block w-2.5 h-2.5 rounded-full bg-chart-line-2 mr-1.5" />Ahead</span>
              </div>
            </div>
            <RouteMap legs={legs.map((l) => ({ id: l.subject.id, label: short(l.subject.title), pct: l.pct }))} />
          </section>

          {/* Subject gauges */}
          <section className="space-y-3">
            <div className="mono text-[11px] tracking-[0.16em] uppercase text-data">Subject instruments</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {legs.map((l) => (
                <Gauge key={l.subject.id} pct={l.pct} label={l.subject.title} sub={`${l.subject.code} · ${l.label}`} href={`/study/${l.subject.id}`} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

