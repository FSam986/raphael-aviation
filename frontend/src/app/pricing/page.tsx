"use client";

import { Suspense, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { COURSES, type CourseId } from "@/app/lib/course";
import { PRICES, ALL_ACCESS, planId, rand, type Months, type Tier } from "@/app/lib/plans";
import { accessFor, type Access } from "@/app/lib/entitlement";

const ORDER: CourseId[] = ["cpl", "ppl", "ir", "nr", "gr"];
const SUBJECTS = (c: CourseId) => COURSES[c].syllabus.length;
const termLabel = (m: Months) => (m === 1 ? "Monthly" : `${m} months`);

export default function PricingPage() {
  return <Suspense><Pricing /></Suspense>;
}

function Pricing() {
  const router = useRouter();
  const q = useSearchParams();
  const initial = (ORDER.includes(q.get("course") as CourseId) ? q.get("course") : "cpl") as CourseId;
  const [course, setCourse] = useState<CourseId>(initial);
  const terms = Object.keys(PRICES[course].course).map(Number) as Months[];
  const [months, setMonths] = useState<Months>(1);
  const m = terms.includes(months) ? months : terms[terms.length - 1];
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const current = useSyncExternalStore<Access>(
    (cb) => { window.addEventListener("course-change", cb); return () => window.removeEventListener("course-change", cb); },
    () => accessFor(course),
    () => "free",
  );

  async function buy(id: string) {
    setError(""); setBusy(id);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push(`/login?next=${encodeURIComponent(`/pricing?course=${course}`)}`); return; }
    try {
      const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify({ planId: id }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Checkout failed.");
      // Hand over to PayFast with a signed form post.
      const f = document.createElement("form");
      f.method = "POST"; f.action = j.action;
      for (const [k, v] of j.fields as [string, string][]) { const i = document.createElement("input"); i.type = "hidden"; i.name = k; i.value = v; f.appendChild(i); }
      document.body.appendChild(f); f.submit();
    } catch (e) {
      setError((e as Error).message); setBusy(null);
    }
  }

  const price = (tier: Tier) => {
    const total = PRICES[course][tier][m]!, monthly = PRICES[course][tier][1]!;
    const per = Math.round(total / m);
    return { total, line: m === 1 ? "Cancel anytime — no auto-renew" : `${rand(per)}/month · save ${Math.round((1 - per / monthly) * 100)}%` };
  };
  const pc = price("course"), pp = price("premium");
  const label = COURSES[course].label;

  return (
    <main className="min-h-screen bg-chart-ground px-4 sm:px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <Link href="/dashboard" className="text-xs text-chart-ink-faint hover:text-chart-ink">← Back to the app</Link>
        <div className="mono text-[11px] tracking-[0.18em] uppercase text-gold mt-6">Plans</div>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-chart-ink leading-[1.05] mt-2">Everything you need to pass.<br />Priced like a question bank.</h1>
        <p className="text-chart-ink-dim mt-3 max-w-2xl">Every course includes the full study text, all questions, flashcards, worked examples and SACAA-style mock exams. Pay for 1 month, or save up to 40% with a longer plan. Add <strong className="text-chart-ink">Pass Mode</strong> and the app plans every study day to your exam.</p>
        {q.get("cancelled") && <p className="mt-4 text-sm text-chart-ink-dim">Payment cancelled — nothing was charged.</p>}

        <div className="flex flex-wrap gap-1.5 mt-7" role="group" aria-label="Course">
          {ORDER.map((c) => (
            <button key={c} onClick={() => setCourse(c)} aria-pressed={c === course} className={`px-3.5 py-2 rounded-full text-sm font-semibold border ${c === course ? "bg-gold text-gold-ink border-gold" : "bg-chart-ground-2 text-chart-ink-dim border-chart-line"}`}>{COURSES[c].label}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2" role="group" aria-label="Plan length">
          {terms.map((t) => (
            <button key={t} onClick={() => setMonths(t)} aria-pressed={t === m} className={`px-3.5 py-2 rounded-full text-sm font-semibold border ${t === m ? "bg-chart-ink text-chart-ground border-chart-ink" : "bg-chart-ground-2 text-chart-ink-dim border-chart-line"}`}>{termLabel(t)}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-3.5 mt-6">
          <Tile name="Free" sub="Explore the app" price="R0" line="No card needed" current={current === "free"}
            items={[`First topic of every ${label} subject, in full`, "A 10-question sample mock per subject", "Readiness tracking & search", "Pass Mode preview"]} no={["Full subjects & mock exams"]}
            cta={<Link href="/dashboard" className="block text-center font-bold py-3 rounded-xl border border-chart-line-2 text-chart-ink">Keep exploring</Link>} />
          <Tile name={`${label} Course`} sub={`${COURSES[course].name} · ${SUBJECTS(course)} subject${SUBJECTS(course) > 1 ? "s" : ""}`} price={rand(pc.total)} unit={m === 1 ? "/month" : `/${m} months`} line={pc.line} current={current === "course"}
            items={["Every topic: notes, examples, figures", "All questions & flashcards", "Unlimited SACAA-style mock exams", "Exam-day brief & readiness"]} no={["Pass Mode"]}
            cta={<Buy onClick={() => buy(planId(course, "course", m))} busy={busy === planId(course, "course", m)}>{current === "free" ? `Get ${label}` : "Add time"}</Buy>} />
          <Tile hot name={`${label} Premium`} sub="Course + Pass Mode" price={rand(pp.total)} unit={m === 1 ? "/month" : `/${m} months`} line={pp.line} current={current === "premium"}
            items={[`Everything in ${label} Course`, "Pass Mode: a day-by-day plan to your exam date", "Flight-route progress, streaks & badges", "Adaptive drills until each topic is 90% strong"]}
            cta={<Buy hot onClick={() => buy(planId(course, "premium", m))} busy={busy === planId(course, "premium", m)}>{current === "premium" ? "Add time" : `Get ${label} Premium`}</Buy>} />
        </div>
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-chart-line bg-gradient-to-r from-gold/15 to-transparent px-5 py-4">
          <div className="text-chart-ink"><strong>All-Access Premium</strong> <span className="text-chart-ink-dim text-sm">· every course (CPL, PPL, IR, Night, GR) + Pass Mode</span></div>
          <div className="flex flex-wrap gap-2">
            <Buy onClick={() => buy(planId("all", "premium", 1))} busy={busy === "all-premium-1"}>{rand(ALL_ACCESS[1]!)} / month</Buy>
            <Buy hot onClick={() => buy(planId("all", "premium", 12))} busy={busy === "all-premium-12"}>{rand(ALL_ACCESS[12]!)} / 12 months</Buy>
          </div>
        </div>

        <p className="mt-8 text-xs text-chart-ink-faint max-w-3xl">Prices in South African rand, VAT included. Plans are once-off payments for the period shown and don&apos;t renew automatically; buying again adds time. Payments are processed securely by PayFast. By buying you agree to the <Link href="/terms" className="underline">Terms of Use</Link>.</p>
      </div>
    </main>
  );
}

function Tile({ name, sub, price, unit, line, items, no = [], cta, hot, current }: { name: string; sub: string; price: string; unit?: string; line: string; items: string[]; no?: string[]; cta: React.ReactNode; hot?: boolean; current?: boolean }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border bg-chart-ground-2 p-6 ${hot ? "border-gold ring-1 ring-gold" : "border-chart-line"}`}>
      {hot && <span className="absolute -top-2.5 left-6 rounded-full bg-gold px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-gold-ink">Most popular</span>}
      <div className="flex items-center justify-between"><div className="text-chart-ink font-extrabold text-lg">{name}</div>{current && <span className="text-[11px] text-success">Your plan</span>}</div>
      <div className="text-chart-ink-faint text-sm">{sub}</div>
      <div className="mt-4 text-4xl font-extrabold text-chart-ink tracking-tight">{price}{unit && <span className="text-sm font-medium text-chart-ink-dim"> {unit}</span>}</div>
      <div className="text-chart-ink-dim text-sm">{line}</div>
      <ul className="mt-4 mb-5 space-y-2 text-sm">
        {items.map((t) => <li key={t} className="flex gap-2 text-chart-ink"><span className="text-success font-bold">✓</span>{t}</li>)}
        {no.map((t) => <li key={t} className="flex gap-2 text-chart-ink-faint"><span>–</span>{t}</li>)}
      </ul>
      <div className="mt-auto">{cta}</div>
    </div>
  );
}

function Buy({ children, onClick, busy, hot }: { children: React.ReactNode; onClick: () => void; busy?: boolean; hot?: boolean }) {
  return (
    <button onClick={onClick} disabled={busy} className={`w-full px-4 py-3 rounded-xl font-bold disabled:opacity-60 ${hot ? "bg-gold text-gold-ink" : "border border-chart-line-2 text-chart-ink"}`}>
      {busy ? "Opening PayFast…" : children}
    </button>
  );
}
