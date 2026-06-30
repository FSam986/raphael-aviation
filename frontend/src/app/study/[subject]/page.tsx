"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getSubject } from "@/app/data/sacaa-syllabus";

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

export default function SubjectPage() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subject as string;
  const [userName, setUserName] = useState("Student");
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const subject = getSubject(subjectId);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      const name = data.user.user_metadata?.full_name?.split(" ")[0] || "Student";
      setUserName(name);
      setLoading(false);
    });
  }, [router]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-zinc-600 text-sm">Loading...</div></div>;

  if (!subject) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center flex-col gap-4">
        <div className="text-white text-xl font-bold">Subject not found</div>
        <Link href="/study" className="text-yellow-400 text-sm hover:underline">← Back to Study</Link>
      </div>
    );
  }

  const totalItems = subject.sections.reduce((n, s) => n + s.items.length, 0);

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
        {/* Header */}
        <div className="px-10 pt-10 pb-6 border-b border-zinc-900">
          <div className="flex items-center gap-2 text-zinc-600 text-sm mb-4">
            <Link href="/study" className="hover:text-zinc-400 transition-colors">Study</Link>
            <span>/</span>
            <span className="text-zinc-400">{subject.title}</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-black text-white">{subject.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
                <span className="text-yellow-400 font-mono font-bold">{subject.code}</span>
                <span>{subject.sections.length} sections</span>
                <span>{totalItems} exam topics</span>
                <span>Exam: {subject.examQuestions} questions</span>
                <span>Pass: {subject.passPercent}%</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm rounded-xl transition-colors border border-zinc-800">
                🃏 Flashcards
              </button>
              <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors">
                📝 Mock Exam
              </button>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-zinc-600 mb-2">
              <span>AI Readiness Score</span>
              <span>0% — Not started</span>
            </div>
            <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-yellow-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="px-10 py-8 space-y-3 pb-16">
          {subject.sections.map((section, idx) => {
            const isOpen = expandedSection === section.id;
            return (
              <div key={section.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedSection(isOpen ? null : section.id)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-500 text-xs font-mono shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white">{section.title}</div>
                    <div className="text-xs text-zinc-600 mt-0.5">
                      <span className="font-mono text-yellow-400/60">{section.id}</span>
                      <span className="ml-2">{section.items.length} exam topics</span>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-zinc-600 mb-1">0 / {section.items.length} mastered</div>
                      <div className="w-24 h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full w-0 bg-yellow-400 rounded-full" />
                      </div>
                    </div>
                    <span className={`text-zinc-600 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}>›</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-zinc-900">
                    {section.items.map((item) => (
                      <Link
                        key={item.id}
                        href={`/study/${subjectId}/${section.id}?item=${item.id}`}
                        className="flex items-center gap-4 px-5 py-3.5 hover:bg-zinc-900/40 transition-colors border-b border-zinc-900/50 last:border-0 group"
                      >
                        <div className="w-5 h-5 rounded-full border border-zinc-800 group-hover:border-yellow-400/50 transition-colors shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-zinc-400 text-xs font-mono mr-2 text-zinc-600">{item.id}</span>
                          <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{item.topic}</span>
                        </div>
                        <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded-md">Study</span>
                          <span className="text-xs text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded-md">Quiz</span>
                        </div>
                      </Link>
                    ))}
                    <div className="px-5 py-3 flex gap-3">
                      <button className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
                        🃏 Flashcards for this section →
                      </button>
                      <button className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors ml-4">
                        📝 Section quiz →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
