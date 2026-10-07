"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCourse } from "@/app/hooks/useCourse";
import { Sidebar } from "@/app/components/Sidebar";

const SUBJECT_META: Record<string, { icon: string; color: string; border: string }> = {
  "aircraft-technical":   { icon: "⚙️",  color: "from-orange-600/20 to-orange-900/10", border: "border-orange-500/20 hover:border-orange-400/50" },
  "air-law":              { icon: "⚖️",  color: "from-purple-600/20 to-purple-900/10", border: "border-purple-500/20 hover:border-purple-400/50" },
  "flight-planning":      { icon: "📋",  color: "from-cyan-600/20 to-cyan-900/10",     border: "border-cyan-500/20 hover:border-cyan-400/50" },
  "human-performance":    { icon: "🧠",  color: "from-pink-600/20 to-pink-900/10",     border: "border-pink-500/20 hover:border-pink-400/50" },
  "flight-instruments":   { icon: "🎛️", color: "from-slate-600/20 to-slate-900/10",   border: "border-slate-500/20 hover:border-slate-400/50" },
  "meteorology":          { icon: "☁️",  color: "from-blue-600/20 to-blue-900/10",     border: "border-blue-500/20 hover:border-blue-400/50" },
  "navigation":           { icon: "🧭",  color: "from-green-600/20 to-green-900/10",   border: "border-green-500/20 hover:border-green-400/50" },
  "radio-navigation":     { icon: "📡",  color: "from-indigo-600/20 to-indigo-900/10", border: "border-indigo-500/20 hover:border-indigo-400/50" },
  "mass-and-balance":     { icon: "⚖️",  color: "from-teal-600/20 to-teal-900/10",    border: "border-teal-500/20 hover:border-teal-400/50" },
  "principles-of-flight": { icon: "✈️",  color: "from-yellow-600/20 to-yellow-900/10", border: "border-yellow-500/20 hover:border-yellow-400/50" },
};

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Student");
  const [loading, setLoading] = useState(true);
  const { course, syllabus } = useCourse();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      const name = data.user.user_metadata?.full_name?.split(" ")[0] || "Student";
      setUserName(name);
      setLoading(false);
    });
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-600 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar active="/dashboard" userName={userName} onSignOut={handleSignOut} />

      {/* Main */}
      <main className="flex-1 ml-64 overflow-auto">
        <div className="px-10 pt-10 pb-6 border-b border-zinc-900">
          <p className="text-zinc-500 text-sm mb-1">Good morning,</p>
          <h1 className="text-3xl font-black text-white">Welcome back, {userName} ✈️</h1>
        </div>

        {/* Stats */}
        <div className="px-10 py-8 grid grid-cols-4 gap-4">
          {[
            { label: "Exam Readiness", value: "—", sub: "AI confidence score" },
            { label: "Predicted Pass %", value: "—", sub: "Complete topics to unlock" },
            { label: "Subjects Started", value: `0 / ${syllabus.length}`, sub: "Choose a subject below" },
            { label: "Study Streak", value: "0 days", sub: "Study daily to build a streak" },
          ].map((card) => (
            <div key={card.label} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5">
              <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">{card.label}</div>
              <div className="text-2xl font-black text-yellow-400">{card.value}</div>
              <div className="text-zinc-600 text-xs mt-1">{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Subject grid */}
        <div className="px-10 pb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">SACAA {course.toUpperCase()} Subjects</h2>
              <p className="text-zinc-600 text-xs mt-1">Official syllabus</p>
            </div>
            <span className="text-zinc-600 text-sm">{syllabus.length} subjects</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {syllabus.map((subject) => {
              const meta = SUBJECT_META[subject.id] ?? {
                icon: "📚",
                color: "from-zinc-600/20 to-zinc-900/10",
                border: "border-zinc-500/20 hover:border-zinc-400/50",
              };
              const totalItems = subject.sections.reduce((n, s) => n + s.items.length, 0);
              return (
                <Link
                  key={subject.id}
                  href={`/study/${subject.id}`}
                  className={`bg-gradient-to-br ${meta.color} border ${meta.border} rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02] group`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{meta.icon}</span>
                    <div className="text-right">
                      <span className="text-xs text-zinc-500 bg-zinc-900/60 px-2 py-1 rounded-lg block">
                        {subject.sections.length} sections
                      </span>
                      <span className="text-xs text-zinc-600 mt-1 block">{totalItems} exam topics</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-base mb-1 leading-tight">{subject.title}</h3>
                  <div className="text-yellow-400/60 text-xs font-mono mb-2">{subject.code} · {subject.examQuestions}Q · {subject.passPercent}% pass</div>

                  <div className="mt-4 pt-4 border-t border-zinc-800/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-600">Not started</span>
                      <span className="text-zinc-700 group-hover:text-yellow-400 transition-colors">Begin →</span>
                    </div>
                    <div className="mt-2 h-1 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-yellow-400 rounded-full" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
