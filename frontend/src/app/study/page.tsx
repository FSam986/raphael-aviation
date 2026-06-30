"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SACAA_SYLLABUS } from "@/app/data/sacaa-syllabus";

const SUBJECT_META: Record<string, { icon: string; color: string }> = {
  "aircraft-technical":   { icon: "⚙️",  color: "text-orange-400" },
  "air-law":              { icon: "⚖️",  color: "text-purple-400" },
  "flight-planning":      { icon: "📋",  color: "text-cyan-400"   },
  "human-performance":    { icon: "🧠",  color: "text-pink-400"   },
  "flight-instruments":   { icon: "🎛️", color: "text-slate-400"  },
  "meteorology":          { icon: "☁️",  color: "text-blue-400"   },
  "navigation":           { icon: "🧭",  color: "text-green-400"  },
  "radio-navigation":     { icon: "📡",  color: "text-indigo-400" },
  "mass-and-balance":     { icon: "⚖️",  color: "text-teal-400"   },
  "principles-of-flight": { icon: "✈️",  color: "text-yellow-400" },
};

const NAV_ITEMS = [
  { href: "/dashboard",    icon: "🏠", label: "Dashboard" },
  { href: "/study",        icon: "📚", label: "Study" },
  { href: "/ai-tutor",     icon: "🤖", label: "AI Instructor" },
  { href: "/exams",        icon: "📝", label: "Mock Exams" },
  { href: "/flashcards",   icon: "🃏", label: "Flashcards" },
  { href: "/progress",     icon: "📊", label: "Progress" },
  { href: "/achievements", icon: "🏆", label: "Achievements" },
  { href: "/settings",     icon: "⚙️", label: "Settings" },
];

export default function StudyPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Student");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      const name = data.user.user_metadata?.full_name?.split(" ")[0] || "Student";
      setUserName(name);
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-zinc-600 text-sm">Loading...</div></div>;
  }

  return (
    <div className="min-h-screen bg-black flex">
      <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col fixed h-full">
        <div className="p-6 border-b border-zinc-900">
          <div className="text-yellow-400 font-black text-lg tracking-wider">RAPHAEL</div>
          <div className="text-zinc-600 text-xs font-medium tracking-widest uppercase">Aviation Academy</div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-auto">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${item.href === "/study" ? "bg-yellow-400/10 text-yellow-400 font-medium" : "text-zinc-500 hover:text-white hover:bg-zinc-900"}`}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-sm font-bold">{userName[0]}</div>
            <div><div className="text-white text-sm font-medium">{userName}</div><div className="text-zinc-600 text-xs">CPL Student</div></div>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-64 overflow-auto">
        <div className="px-10 pt-10 pb-6 border-b border-zinc-900">
          <h1 className="text-3xl font-black text-white">Study</h1>
          <p className="text-zinc-500 text-sm mt-1">SACAA CPL syllabus — pick a subject to begin</p>
        </div>

        <div className="px-10 py-8">
          <div className="grid grid-cols-1 gap-3">
            {SACAA_SYLLABUS.map((subject) => {
              const meta = SUBJECT_META[subject.id] ?? { icon: "📚", color: "text-zinc-400" };
              const totalItems = subject.sections.reduce((n, s) => n + s.items.length, 0);
              return (
                <Link
                  key={subject.id}
                  href={`/study/${subject.id}`}
                  className="bg-zinc-950 border border-zinc-900 hover:border-zinc-700 rounded-2xl p-5 flex items-center gap-5 transition-all group hover:bg-zinc-900/50"
                >
                  <span className="text-3xl">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-white">{subject.title}</h3>
                      <span className={`text-xs font-mono ${meta.color}`}>{subject.code}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-zinc-600">
                      <span>{subject.sections.length} sections</span>
                      <span>{totalItems} exam topics</span>
                      <span>{subject.examQuestions} questions</span>
                      <span>{subject.passPercent}% pass mark</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-zinc-700 mb-2">0% mastered</div>
                    <div className="w-32 h-1 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-yellow-400 rounded-full" />
                    </div>
                  </div>
                  <span className="text-zinc-700 group-hover:text-yellow-400 transition-colors ml-4">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
