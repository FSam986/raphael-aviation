import Link from "next/link";
import { Icon } from "@/app/components/Icon";

const FEATURES = [
  { icon: "book", title: "Structured study", desc: "Every SACAA syllabus aspect broken into focused, illustrated notes — traceable to the official appendix." },
  { icon: "image", title: "Real diagrams", desc: "Hundreds of aviation figures — charts, instruments, systems — drawn for the topic you're on, not stock clip-art." },
  { icon: "quiz", title: "SACAA-style exams", desc: "Timed mock papers that mirror the real thing. After each one, see exactly where to go back." },
  { icon: "flashcards", title: "Flashcards", desc: "Spaced revision that surfaces the cards you keep getting wrong, so weak spots close faster." },
  { icon: "chart", title: "Readiness tracking", desc: "Progress isn't 'lesson opened'. It's a per-subject readiness read from your actual answers." },
  { icon: "target", title: "Exam-day brief", desc: "A single plan for the day: the formulas, conversions, and traps worth a last look before you walk in." },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-chart-ground text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-6 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <img src="/logo-emblem.png" alt="" className="h-9 w-auto" />
          <span className="font-display text-gold text-lg tracking-[0.18em] uppercase">Raphael Aviation</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-zinc-400 hover:text-white transition-colors text-sm">Sign in</Link>
          <Link href="/login" className="bg-gold text-gold-ink font-semibold px-5 py-2 rounded-lg text-sm hover:brightness-110 transition">Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 chart-grid opacity-30" aria-hidden="true" />
        <div className="relative">
          <div className="mono inline-flex items-center gap-2 text-gold-deep text-[11px] tracking-[0.2em] uppercase mb-6">
            SACAA theory · PPL · CPL · Instrument Rating
          </div>
          <h1 className="font-display text-5xl sm:text-6xl tracking-tight leading-[1.05] max-w-4xl">
            Chart your course to a<br /><span className="text-gold">SACAA pass</span>.
          </h1>
          <p className="mt-6 text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Study the whole syllabus, drill real exam questions, and track your readiness subject by subject — so you know exactly when you&apos;re ready to sit the exam.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="bg-gold text-gold-ink font-bold px-8 py-4 rounded-xl text-base hover:brightness-110 transition">Start studying free</Link>
            <Link href="#features" className="text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 px-8 py-4 rounded-xl text-base transition-colors">See how it works</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 sm:px-10 py-24 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl text-center mb-4">Everything the syllabus asks. Nothing it doesn&apos;t.</h2>
          <p className="text-zinc-500 text-center mb-16 max-w-xl mx-auto">Built directly against the SACAA syllabus — every note, question, and flashcard maps to a real aspect.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-chart-ground border border-zinc-800 rounded-2xl p-6 hover:border-gold/40 transition-colors">
                <span className="text-gold inline-flex"><Icon name={f.icon} size={26} /></span>
                <h3 className="font-semibold text-lg mt-4 mb-2">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 py-24 text-center">
        <h2 className="font-display text-4xl mb-4">Ready to earn your licence?</h2>
        <p className="text-zinc-500 mb-8">Study smarter — not longer.</p>
        <Link href="/login" className="inline-block bg-gold text-gold-ink font-bold px-10 py-4 rounded-xl text-base hover:brightness-110 transition">Start for free</Link>
      </section>

      <footer className="border-t border-zinc-900 px-10 py-6 text-center text-zinc-700 text-xs">
        © 2025 Raphael Aviation · SACAA theoretical-knowledge study
      </footer>
    </main>
  );
}
