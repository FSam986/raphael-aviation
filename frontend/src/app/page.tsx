import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Raphael Aviation" className="h-10 w-auto" />
          <span className="text-yellow-400 font-bold text-lg tracking-widest uppercase">
            Raphael Aviation
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-zinc-400 hover:text-white transition-colors text-sm"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-xl text-sm hover:bg-yellow-300 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-medium px-4 py-2 rounded-full mb-8 tracking-wider uppercase">
          ✈ Built for SACAA CPL Students
        </div>

        <h1 className="text-6xl font-black tracking-tight leading-tight max-w-4xl">
          Your Personal{" "}
          <span className="text-yellow-400">CPL Flight Instructor</span>
          <br />
          — powered by AI
        </h1>

        <p className="mt-6 text-zinc-400 text-xl max-w-2xl leading-relaxed">
          Don&apos;t just study. Get exam-ready. Raphael adapts to your weak points,
          tracks your mastery, and tells you exactly when you&apos;re ready to pass
          SACAA.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/login"
            className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-2xl text-base hover:bg-yellow-300 transition-all hover:scale-105"
          >
            Start Studying Free
          </Link>
          <Link
            href="#features"
            className="text-zinc-400 hover:text-white border border-zinc-800 px-8 py-4 rounded-2xl text-base transition-colors"
          >
            See how it works
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-16 text-center">
          <div>
            <div className="text-4xl font-black text-yellow-400">12</div>
            <div className="text-zinc-500 text-sm mt-1">SACAA Subjects</div>
          </div>
          <div>
            <div className="text-4xl font-black text-yellow-400">95%</div>
            <div className="text-zinc-500 text-sm mt-1">Target Pass Rate</div>
          </div>
          <div>
            <div className="text-4xl font-black text-yellow-400">AI</div>
            <div className="text-zinc-500 text-sm mt-1">Powered Instructor</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-10 py-24 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4">
            Not a chatbot. A flight instructor.
          </h2>
          <p className="text-zinc-500 text-center mb-16 max-w-xl mx-auto">
            Raphael knows the full SACAA syllabus, your study history, and your
            weak spots — and teaches accordingly.
          </p>

          <div className="grid grid-cols-3 gap-6">
            {[
              {
                icon: "📚",
                title: "Structured Lessons",
                desc: "Every SACAA topic broken into focused lessons with animations, memory tricks, and cockpit examples.",
              },
              {
                icon: "🧠",
                title: "AI Weakness Detection",
                desc: "The AI tracks every answer. When you keep missing a concept, it schedules a revision automatically.",
              },
              {
                icon: "📝",
                title: "Real SACAA Exams",
                desc: "Timed mock exams that mirror the real thing. After each one, see exactly where you need to improve.",
              },
              {
                icon: "🃏",
                title: "Smart Flashcards",
                desc: "AI-generated cards that appear more often when you keep getting them wrong.",
              },
              {
                icon: "📊",
                title: "Mastery Tracking",
                desc: "Progress isn't 'lesson completed'. It's AI confidence that you would pass today.",
              },
              {
                icon: "🏆",
                title: "Exam Readiness Score",
                desc: "A single number: your predicted SACAA pass probability. 90%+ and you're ready.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-black border border-zinc-800 rounded-2xl p-6 hover:border-yellow-400/40 transition-colors"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-10 py-24 text-center">
        <h2 className="text-4xl font-black mb-4">
          Ready to earn your CPL?
        </h2>
        <p className="text-zinc-500 mb-8">
          Join Raphael and study smarter — not longer.
        </p>
        <Link
          href="/login"
          className="inline-block bg-yellow-400 text-black font-bold px-10 py-4 rounded-2xl text-base hover:bg-yellow-300 transition-all hover:scale-105"
        >
          Start for Free
        </Link>
      </section>

      <footer className="border-t border-zinc-900 px-10 py-6 text-center text-zinc-700 text-xs">
        © 2025 Raphael Aviation · Built for SACAA CPL Students
      </footer>
    </main>
  );
}
