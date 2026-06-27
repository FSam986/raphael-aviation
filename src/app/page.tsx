import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}

      <aside className="w-72 bg-black border-r border-yellow-600/30 p-8">

        <div className="flex flex-col items-center">

          <img
            src="/logo.png"
            alt="Raphael Aviation"
            className="w-44 h-auto mb-5"
          />

          <p className="text-zinc-500 text-sm text-center">
            AI Instructor for SACAA CPL
          </p>

        </div>

        <nav className="mt-10 space-y-4">

          <Link
  href="/dashboard"
  className="w-full text-left bg-yellow-500 text-black p-3 rounded-xl block"
>
  Dashboard
</Link>

          <Link
  href="/ai-tutor"
  className="w-full text-left bg-zinc-900 border border-zinc-700 hover:border-yellow-500 p-3 rounded-xl block"
>
  AI Tutor
</Link>

          <Link
  href="/training"
  className="w-full text-left bg-zinc-900 border border-zinc-700 hover:border-yellow-500 p-3 rounded-xl block"
>
  Study
</Link>

          <Link
  href="/exams"
  className="w-full text-left bg-zinc-900 border border-zinc-700 hover:border-yellow-500 p-3 rounded-xl block"
>
  Exams
</Link>

          <Link
  href="/flashcards"
  className="w-full text-left bg-zinc-900 border border-zinc-700 hover:border-yellow-500 p-3 rounded-xl block"
>
  Flashcards
</Link>

          <Link
  href="/progress"
  className="w-full text-left bg-zinc-900 border border-zinc-700 hover:border-yellow-500 p-3 rounded-xl block"
>
  Progress
</Link>

          <Link
  href="/settings"
  className="w-full text-left bg-zinc-900 border border-zinc-700 hover:border-yellow-500 p-3 rounded-xl block"
>
  Settings
</Link>

        </nav>

      </aside>

      {/* Main Content */}

      <section className="flex-1 bg-black p-12">

        <h1 className="text-5xl font-bold text-yellow-300 tracking-wider">
          RAPHAEL AVIATION
        </h1>

        <p className="text-zinc-500 mt-4 text-xl">
          The Future of Aviation Training
        </p>

        <div className="grid grid-cols-2 gap-8 mt-12">

          <div className="bg-zinc-950 border border-yellow-600/20 rounded-3xl p-8 hover:border-yellow-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]">

            <h2 className="text-2xl font-bold">
              🤖 AI Tutor
            </h2>

            <p className="mt-3 text-zinc-400">
              Ask anything about aviation.
            </p>

          </div>

          <div className="bg-zinc-950 border border-yellow-600/20 rounded-3xl p-8 hover:border-yellow-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]">

            <h2 className="text-2xl font-bold">
              📚 Study
            </h2>

            <p className="mt-3 text-zinc-400">
              Interactive CPL lessons.
            </p>

          </div>

          <div className="bg-zinc-950 border border-yellow-600/20 rounded-3xl p-8 hover:border-yellow-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]">

            <h2 className="text-2xl font-bold">
              📝 Exams
            </h2>

            <p className="mt-3 text-zinc-400">
              SACAA practice exams.
            </p>

          </div>

          <div className="bg-zinc-950 border border-yellow-600/20 rounded-3xl p-8 hover:border-yellow-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]">

            <h2 className="text-2xl font-bold">
              📈 Progress
            </h2>

            <p className="mt-3 text-zinc-400">
              Track your training.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}