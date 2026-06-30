"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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

type Tab = "learn" | "ai-tutor" | "quiz" | "flashcards";

export default function SectionPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const subjectId = params.subject as string;
  const sectionId = params.section as string;
  const focusItemId = searchParams.get("item");

  const [userName, setUserName] = useState("Student");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("learn");
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiMessages, setAiMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  const subject = getSubject(subjectId);
  const section = subject?.sections.find((s) => s.id === sectionId);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      const name = data.user.user_metadata?.full_name?.split(" ")[0] || "Student";
      setUserName(name);
      setLoading(false);
    });
  }, [router]);

  async function handleAskAI(e: React.FormEvent) {
    e.preventDefault();
    if (!aiQuestion.trim() || aiLoading) return;
    const question = aiQuestion.trim();
    setAiQuestion("");
    setAiMessages((m) => [...m, { role: "user", text: question }]);
    setAiLoading(true);

    try {
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          subject: subject?.title,
          section: section?.title,
          sectionId,
          history: aiMessages.slice(-6),
        }),
      });
      const data = await res.json();
      setAiMessages((m) => [...m, { role: "ai", text: data.answer }]);
    } catch {
      setAiMessages((m) => [...m, { role: "ai", text: "Sorry, I couldn't connect. Check your OpenAI key and try again." }]);
    }
    setAiLoading(false);
  }

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-zinc-600 text-sm">Loading...</div></div>;

  if (!subject || !section) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="text-white text-xl font-bold">Section not found</div>
        <Link href={`/study/${subjectId}`} className="text-yellow-400 text-sm hover:underline">← Back to subject</Link>
      </div>
    );
  }

  const currentItemIndex = section.items.findIndex((i) => i.id === focusItemId);
  const currentItem = currentItemIndex >= 0 ? section.items[currentItemIndex] : section.items[0];
  const nextItem = section.items[currentItemIndex + 1] ?? null;
  const prevItem = currentItemIndex > 0 ? section.items[currentItemIndex - 1] : null;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "learn",     label: "Learn",      icon: "📖" },
    { id: "ai-tutor",  label: "Ask AI",     icon: "🤖" },
    { id: "quiz",      label: "Quiz",       icon: "📝" },
    { id: "flashcards",label: "Flashcards", icon: "🃏" },
  ];

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

        {/* Section topic list in sidebar */}
        <div className="border-t border-zinc-900 overflow-auto flex-shrink-0 max-h-64">
          <div className="px-4 pt-3 pb-1 text-xs text-zinc-600 uppercase tracking-wider">{section.id}</div>
          {section.items.map((item, i) => (
            <Link
              key={item.id}
              href={`/study/${subjectId}/${sectionId}?item=${item.id}`}
              className={`flex items-center gap-2 px-4 py-2 text-xs transition-colors ${item.id === currentItem.id ? "text-yellow-400 bg-yellow-400/5" : "text-zinc-600 hover:text-zinc-300"}`}
            >
              <span className="w-4 h-4 rounded-full border border-current flex-shrink-0 flex items-center justify-center text-[10px]">{i + 1}</span>
              <span className="truncate">{item.topic}</span>
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-sm font-bold">{userName[0]}</div>
            <div><div className="text-white text-sm font-medium">{userName}</div><div className="text-zinc-600 text-xs">CPL Student</div></div>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-64 overflow-auto flex flex-col">
        {/* Breadcrumb + header */}
        <div className="px-10 pt-8 pb-4 border-b border-zinc-900">
          <div className="flex items-center gap-2 text-zinc-600 text-xs mb-4">
            <Link href="/study" className="hover:text-zinc-400">Study</Link>
            <span>/</span>
            <Link href={`/study/${subjectId}`} className="hover:text-zinc-400">{subject.title}</Link>
            <span>/</span>
            <span className="text-zinc-400">{section.title}</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="text-yellow-400 font-mono text-sm mb-1">{currentItem.id}</div>
              <h1 className="text-2xl font-black text-white leading-tight">{currentItem.topic}</h1>
              <div className="text-zinc-600 text-sm mt-1">{section.title} · {subject.title}</div>
            </div>
            <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors">
              Mark Mastered ✓
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${activeTab === tab.id ? "bg-yellow-400/10 text-yellow-400 font-medium" : "text-zinc-600 hover:text-white"}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 px-10 py-8">
          {activeTab === "learn" && (
            <div className="max-w-3xl">
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">📖</span>
                  <h2 className="font-bold text-white text-lg">Study Notes</h2>
                  <span className="text-xs text-zinc-600 ml-auto">Content will load when textbooks are added</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-4">
                    <div className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2">Syllabus Topic</div>
                    <p className="text-white font-medium">{currentItem.topic}</p>
                    <p className="text-zinc-500 text-sm mt-1">Section {section.id} — {section.title}</p>
                  </div>

                  <div className="text-zinc-600 text-sm leading-relaxed border border-zinc-900 rounded-xl p-6 text-center">
                    <div className="text-3xl mb-3">📚</div>
                    <p className="text-zinc-500">Detailed study notes for this topic will appear here once textbook content is loaded.</p>
                    <p className="text-zinc-700 text-xs mt-2">For now, use the AI Instructor to ask questions about this topic.</p>
                    <button
                      onClick={() => setActiveTab("ai-tutor")}
                      className="mt-4 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm rounded-xl transition-colors"
                    >
                      Ask AI about this topic →
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                {prevItem ? (
                  <Link
                    href={`/study/${subjectId}/${sectionId}?item=${prevItem.id}`}
                    className="flex items-center gap-2 text-sm text-zinc-600 hover:text-white transition-colors"
                  >
                    ← <span>{prevItem.topic}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextItem ? (
                  <Link
                    href={`/study/${subjectId}/${sectionId}?item=${nextItem.id}`}
                    className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <span>{nextItem.topic}</span> →
                  </Link>
                ) : (
                  <Link
                    href={`/study/${subjectId}`}
                    className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Section complete — back to subject →
                  </Link>
                )}
              </div>
            </div>
          )}

          {activeTab === "ai-tutor" && (
            <div className="max-w-3xl flex flex-col h-full" style={{ minHeight: "calc(100vh - 280px)" }}>
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col flex-1 overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-900 flex items-center gap-3">
                  <span className="text-xl">🤖</span>
                  <div>
                    <div className="font-bold text-white text-sm">AI Instructor</div>
                    <div className="text-zinc-600 text-xs">Specialist in SACAA CPL — {section.title}</div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto p-6 space-y-4 min-h-0">
                  {aiMessages.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-3xl mb-3">🤖</div>
                      <p className="text-zinc-500 text-sm">Ask me anything about <strong className="text-white">{currentItem.topic}</strong></p>
                      <div className="mt-4 grid grid-cols-1 gap-2 max-w-sm mx-auto">
                        {[
                          `Explain ${currentItem.topic} simply`,
                          "What exam questions come from this topic?",
                          "Give me a memory trick",
                          "What are the common mistakes students make?",
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => { setAiQuestion(suggestion); }}
                            className="text-left text-xs text-zinc-600 hover:text-yellow-400 bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-lg transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {aiMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === "user" ? "bg-yellow-400 text-black font-medium" : "bg-zinc-900 text-zinc-200"}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {aiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-zinc-900 rounded-2xl px-4 py-3 text-sm text-zinc-600">
                        Thinking...
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleAskAI} className="p-4 border-t border-zinc-900 flex gap-3">
                  <input
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder={`Ask about ${currentItem.topic}...`}
                    className="flex-1 bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-700"
                  />
                  <button
                    type="submit"
                    disabled={!aiQuestion.trim() || aiLoading}
                    className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors disabled:opacity-40"
                  >
                    Ask
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="max-w-3xl">
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-white font-bold text-lg mb-2">Practice Quiz</h3>
                <p className="text-zinc-500 text-sm mb-6">SACAA-style questions on {currentItem.topic}</p>
                <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors">
                  Generate Questions with AI →
                </button>
                <p className="text-zinc-700 text-xs mt-4">Quiz generation coming soon — questions will be created using AI based on the SACAA syllabus</p>
              </div>
            </div>
          )}

          {activeTab === "flashcards" && (
            <div className="max-w-3xl">
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">🃏</div>
                <h3 className="text-white font-bold text-lg mb-2">Flashcards</h3>
                <p className="text-zinc-500 text-sm mb-6">Spaced repetition for {currentItem.topic}</p>
                <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors">
                  Generate Flashcards with AI →
                </button>
                <p className="text-zinc-700 text-xs mt-4">Flashcard generation coming soon — cards will be created using AI based on the SACAA syllabus</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
