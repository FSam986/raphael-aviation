"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { findSubject } from "@/app/lib/course";
import { subjectContent } from "@/app/lib/subjectContent";
import { getFPPPlottingBySection } from "@/app/data/fpp-plotting";
import { PlottingCard } from "@/app/components/PlottingCard";
import { figuresForSection, atgFiguresByTopic } from "@/app/lib/figures";
import { FIGURE_NOTES } from "@/app/data/aircraft-technical-figure-notes";
import { countByAspect, filterByAspect } from "@/app/lib/aspects";
import { supabase } from "@/lib/supabase";
import { getWorkedExamplesBySection } from "@/app/data/worked-examples";

type Tab = "learn" | "ai-tutor" | "quiz" | "flashcards" | "illustrations" | "examples";

export default function SectionPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const subjectId = params.subject as string;
  const sectionId = params.section as string;
  const focusItemId = searchParams.get("item");

  const { userName, loading } = useAuthGuard();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<Tab>(
    tabParam === "quiz" || tabParam === "flashcards" || tabParam === "ai-tutor" || tabParam === "illustrations" || tabParam === "examples" ? tabParam : "learn"
  );
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiMessages, setAiMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  // Quiz state (uses the Meteorology question bank, filtered by this section)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, "a" | "b" | "c" | "d">>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPage, setQuizPage] = useState(0);
  // Flashcard state
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  // Syllabus overlay
  const [showSyllabus, setShowSyllabus] = useState(false);

  const content = subjectContent(subjectId);
  const sectionQuestions = useMemo(
    () => content?.questions(sectionId) ?? [],
    [content, sectionId]
  );
  // Per-sub-topic (syllabus aspect) question counts, and an optional drill filter.
  const [drillAspect, setDrillAspect] = useState<string | null>(null);
  const aspectCounts = useMemo(() => countByAspect(sectionQuestions), [sectionQuestions]);
  const quizQuestions = useMemo(
    () => (drillAspect ? filterByAspect(sectionQuestions, drillAspect) : sectionQuestions),
    [sectionQuestions, drillAspect]
  );
  const QUIZ_PER_PAGE = 10;
  const quizPageCount = Math.max(1, Math.ceil(quizQuestions.length / QUIZ_PER_PAGE));
  const quizPageQuestions = quizQuestions.slice(quizPage * QUIZ_PER_PAGE, quizPage * QUIZ_PER_PAGE + QUIZ_PER_PAGE);

  // Reset the quiz when the section changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuizPage(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setDrillAspect(null);
  }, [sectionId]);
  const sectionFlashcards = useMemo(
    () => content?.flashcards(sectionId) ?? [],
    [content, sectionId]
  );
  const sectionNote = useMemo(() => content?.note(sectionId), [content, sectionId]);
  // Learn tab shows ONE topic (note block) at a time. `pickedTopic` is the user's
  // chip override; it resets whenever the sub-topic in the sidebar changes.
  const [pickedTopic, setPickedTopic] = useState<string | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setPickedTopic(null); }, [focusItemId]);
  // Slide index within the active topic's study deck.
  const [slideIdx, setSlideIdx] = useState(0);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setSlideIdx(0); }, [focusItemId, pickedTopic]);
  const sectionPlotting = useMemo(() => getFPPPlottingBySection(sectionId), [sectionId]);
  const sectionFigures = useMemo(() => figuresForSection(sectionId), [sectionId]);
  const sectionExamples = useMemo(() => getWorkedExamplesBySection(sectionId), [sectionId]);

  const subject = findSubject(subjectId);
  const section = subject?.sections.find((s) => s.id === sectionId);

  async function handleAskAI(e: React.FormEvent) {
    e.preventDefault();
    if (!aiQuestion.trim() || aiLoading) return;
    const question = aiQuestion.trim();
    setAiQuestion("");
    setAiMessages((m) => [...m, { role: "user", text: question }]);
    setAiLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}) },
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

  // Segregate the Learn notes by topic: each note block is a topic. Pick the
  // block that best matches the selected sub-topic; the user can switch topic
  // with the chips. Only the active topic's text + its images are shown.
  const noteBlocks = sectionNote?.blocks ?? [];
  const matchedTopic = (() => {
    if (!noteBlocks.length) return null;
    const words = (currentItem?.topic ?? "").toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 4);
    const hit = noteBlocks.find((b) => {
      const h = b.heading.toLowerCase();
      return words.some((w) => h.includes(w)) ||
        h.split(/[^a-z]+/).filter((w) => w.length > 4).some((w) => (currentItem?.topic ?? "").toLowerCase().includes(w));
    });
    return (hit ?? noteBlocks[0]).heading;
  })();
  const activeTopic = pickedTopic ?? matchedTopic;

  // Build a slide deck for the active topic: pair each illustration with a
  // plain-language point so text and image sit together on one slide.
  const activeBlock = noteBlocks.find((x) => x.heading === activeTopic);
  const activeFigs = activeBlock && (activeBlock as { figureTopics?: string[] }).figureTopics
    ? atgFiguresByTopic((activeBlock as { figureTopics?: string[] }).figureTopics!)
    : [];
  type Slide = { heading: string; text: string[]; fig: ReturnType<typeof atgFiguresByTopic>[number] | null };
  const slides: Slide[] = (() => {
    if (!activeBlock) return [];
    const pts = activeBlock.points;
    // Always lead with the topic's full text so the study is complete even when
    // a topic has no images (or its images were removed). Image slides follow.
    if (activeFigs.length === 0) return [{ heading: activeBlock.heading, text: pts, fig: null }];
    const out: Slide[] = [{ heading: activeBlock.heading, text: pts, fig: null }];
    activeFigs.forEach((f) => out.push({ heading: activeBlock.heading, text: [], fig: f }));
    return out;
  })();
  const curSlide = slides.length ? slides[Math.min(slideIdx, slides.length - 1)] : null;
  const nextItem = section.items[currentItemIndex + 1] ?? null;
  const prevItem = currentItemIndex > 0 ? section.items[currentItemIndex - 1] : null;

  // Section-to-section navigation within the subject.
  const sectionIndex = subject.sections.findIndex((s) => s.id === sectionId);
  const prevSection = sectionIndex > 0 ? subject.sections[sectionIndex - 1] : null;
  const nextSection = sectionIndex >= 0 && sectionIndex < subject.sections.length - 1 ? subject.sections[sectionIndex + 1] : null;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "learn",     label: "Learn",      icon: "📖" },
    ...(sectionExamples.length > 0 ? [{ id: "examples" as Tab, label: "Examples", icon: "📐" }] : []),
    ...(sectionFigures.length > 0 ? [{ id: "illustrations" as Tab, label: "Illustrations", icon: "🖼️" }] : []),
    { id: "ai-tutor",  label: "Ask AI",     icon: "🤖" },
    { id: "quiz",      label: "Quiz",       icon: "📝" },
    { id: "flashcards",label: "Flashcards", icon: "🃏" },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar active="/study" userName={userName}>
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
              <span className="truncate flex-1">{item.topic}</span>
              <span className={`ml-auto flex-shrink-0 text-[10px] tabular-nums ${aspectCounts[item.id] ? "text-zinc-500" : "text-red-500/70"}`}>{aspectCounts[item.id] ?? 0}</span>
            </Link>
          ))}
        </div>
      </Sidebar>

      <main className="flex-1 ml-64 overflow-auto flex flex-col">
        {/* Breadcrumb + header */}
        <div className="px-10 pt-8 pb-4 border-b border-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-zinc-600 text-xs">
              <Link href="/study" className="hover:text-zinc-400">Study</Link>
              <span>/</span>
              <Link href={`/study/${subjectId}`} className="hover:text-zinc-400">{subject.title}</Link>
              <span>/</span>
              <span className="text-zinc-400">{section.title}</span>
            </div>
            <Link href={`/study/${subjectId}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs transition-colors">
              ← Back to {subject.title}
            </Link>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-yellow-400 font-mono text-sm mb-1">{currentItem.id}</div>
              <h1 className="text-2xl font-black text-white leading-tight">{currentItem.topic}</h1>
              <div className="text-zinc-600 text-sm mt-1">{section.title} · {subject.title}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowSyllabus(true)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-sm rounded-xl transition-colors"
                title="View the full syllabus for this subject"
              >
                📋 Check Syllabus
              </button>
              <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors">
                Mark Mastered ✓
              </button>
            </div>
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
            <div className="max-w-5xl">
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">📖</span>
                  <h2 className="font-bold text-white text-lg">Study Notes</h2>
                  <span className="text-xs text-zinc-600 ml-auto">Exam-focused</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-4">
                    <div className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2">Syllabus Topic</div>
                    <p className="text-white font-medium">{currentItem.topic}</p>
                    <p className="text-zinc-500 text-sm mt-1">Section {section.id} — {section.title}</p>
                  </div>

                  {sectionNote ? (
                    <div className="space-y-6">
                      <p className="text-zinc-300 text-sm leading-relaxed">{sectionNote.intro}</p>

                      {/* Topic selector — one topic at a time, no full dump */}
                      <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-4">
                        {noteBlocks.map((b) => (
                          <button
                            key={b.heading}
                            onClick={() => setPickedTopic(b.heading)}
                            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${activeTopic === b.heading ? "bg-yellow-400 text-black font-semibold" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
                          >
                            {b.heading}
                          </button>
                        ))}
                        {sectionNote.mustKnow.length > 0 && (
                          <button onClick={() => setPickedTopic("__mustknow")} className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${activeTopic === "__mustknow" ? "bg-green-400 text-black font-semibold" : "bg-zinc-900 text-green-400/80 hover:text-green-300"}`}>✓ Must know</button>
                        )}
                        {sectionNote.traps.length > 0 && (
                          <button onClick={() => setPickedTopic("__traps")} className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${activeTopic === "__traps" ? "bg-red-400 text-black font-semibold" : "bg-zinc-900 text-red-400/80 hover:text-red-300"}`}>⚠ Traps</button>
                        )}
                      </div>

                      {/* Active topic only */}
                      {activeTopic === "__mustknow" ? (
                        <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                          <div className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2">✓ Must know for the exam</div>
                          <ul className="space-y-1.5">
                            {sectionNote.mustKnow.map((p, i) => (
                              <li key={i} className="text-zinc-300 text-sm leading-relaxed flex gap-2"><span className="text-green-400/70 mt-0.5">•</span><span>{p}</span></li>
                            ))}
                          </ul>
                        </div>
                      ) : activeTopic === "__traps" ? (
                        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                          <div className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2">⚠ Common exam traps</div>
                          <ul className="space-y-1.5">
                            {sectionNote.traps.map((p, i) => (
                              <li key={i} className="text-zinc-300 text-sm leading-relaxed flex gap-2"><span className="text-red-400/70 mt-0.5">•</span><span>{p}</span></li>
                            ))}
                          </ul>
                        </div>
                      ) : !curSlide ? null : activeFigs.length === 0 ? (
                        // Text-only topic (no illustrations): show the points.
                        <div>
                          <h3 className="text-white font-bold text-base mb-3">{curSlide.heading}</h3>
                          <ul className="space-y-2">
                            {curSlide.text.map((p, i) => (
                              <li key={i} className="text-zinc-300 text-sm leading-relaxed flex gap-2"><span className="text-yellow-400/60 mt-0.5">•</span><span>{p}</span></li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        // Slide deck: one illustration + its text per slide.
                        <div>
                          <h3 className="text-white font-bold text-base mb-4">{curSlide.heading}</h3>
                          <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl overflow-hidden">
                            {curSlide.fig && (
                              <div className="bg-white flex items-center justify-center p-4">
                                <div className="max-h-[52vh] overflow-hidden flex items-center justify-center [&_img]:max-h-[52vh] [&_img]:w-auto [&_img]:object-contain">
                                  {curSlide.fig.render()}
                                </div>
                              </div>
                            )}
                            <div className="p-5">
                              {curSlide.fig && <div className="text-yellow-400/80 text-xs font-mono mb-3">{curSlide.fig.title}</div>}
                              {curSlide.fig && FIGURE_NOTES[curSlide.fig.id] ? (
                                <div className="space-y-3">
                                  {FIGURE_NOTES[curSlide.fig.id].map((para, i) => (
                                    <p key={i} className="text-zinc-200 text-sm leading-relaxed">{para}</p>
                                  ))}
                                </div>
                              ) : (
                                <ul className="space-y-2">
                                  {curSlide.text.map((p, i) => (
                                    <li key={i} className="text-zinc-200 text-sm leading-relaxed flex gap-2"><span className="text-yellow-400/60 mt-0.5">•</span><span>{p}</span></li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                          {/* Slide navigation */}
                          <div className="flex items-center justify-between mt-4">
                            <button
                              onClick={() => setSlideIdx((n) => Math.max(0, n - 1))}
                              disabled={slideIdx === 0}
                              className="px-4 py-2 rounded-xl text-sm bg-zinc-900 text-zinc-300 enabled:hover:bg-zinc-800 disabled:opacity-30 transition-colors"
                            >← Prev</button>
                            <div className="flex items-center gap-1.5">
                              {slides.map((_, i) => (
                                <button key={i} onClick={() => setSlideIdx(i)} aria-label={`Slide ${i + 1}`}
                                  className={`h-1.5 rounded-full transition-all ${i === Math.min(slideIdx, slides.length - 1) ? "w-5 bg-yellow-400" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"}`} />
                              ))}
                            </div>
                            <button
                              onClick={() => setSlideIdx((n) => Math.min(slides.length - 1, n + 1))}
                              disabled={slideIdx >= slides.length - 1}
                              className="px-4 py-2 rounded-xl text-sm bg-yellow-400 text-black font-semibold enabled:hover:bg-yellow-300 disabled:opacity-30 transition-colors"
                            >Next →</button>
                          </div>
                          <div className="text-center text-zinc-600 text-xs mt-2">Slide {Math.min(slideIdx, slides.length - 1) + 1} of {slides.length}</div>
                        </div>
                      )}

                      <div className="flex gap-3 pt-1">
                        <button onClick={() => setActiveTab("quiz")} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors">
                          Test yourself →
                        </button>
                        <button onClick={() => setActiveTab("ai-tutor")} className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm rounded-xl transition-colors">
                          Ask AI about this topic
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-zinc-600 text-sm leading-relaxed border border-zinc-900 rounded-xl p-6 text-center">
                      <div className="text-3xl mb-3">📚</div>
                      <p className="text-zinc-500">Detailed study notes for this topic are being added.</p>
                      <button
                        onClick={() => setActiveTab("ai-tutor")}
                        className="mt-4 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm rounded-xl transition-colors"
                      >
                        Ask AI about this topic →
                      </button>
                    </div>
                  )}
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

          {activeTab === "illustrations" && (
            <div className="max-w-3xl space-y-8">
              {sectionFigures.length === 0 ? (
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-4">🖼️</div>
                  <h3 className="text-white font-bold text-lg mb-2">Illustrations</h3>
                  <p className="text-zinc-500 text-sm">Diagrams for this topic are coming soon.</p>
                </div>
              ) : (
                sectionFigures.map((f) => (
                  <figure key={f.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5">
                    <figcaption className="mb-3">
                      <h3 className="text-white font-bold text-sm">{f.title}</h3>
                      <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{f.caption}</p>
                    </figcaption>
                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4">{f.render()}</div>
                  </figure>
                ))
              )}
            </div>
          )}

          {activeTab === "examples" && (
            <div className="max-w-3xl space-y-6">
              <div className="text-zinc-500 text-sm">Worked numerical examples — study the method, then try the quiz.</div>
              {sectionExamples.map((ex, n) => (
                <div key={ex.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">📐</span>
                    <h3 className="text-white font-bold">{ex.title}</h3>
                    <span className="text-xs text-zinc-600 ml-auto">Example {n + 1}</span>
                  </div>
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                    <div className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-1">Problem</div>
                    <p className="text-zinc-200 text-sm leading-relaxed">{ex.problem}</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Step-by-step method</div>
                    <ol className="space-y-2">
                      {ex.steps.map((s, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="w-5 h-5 rounded-full bg-yellow-400/15 text-yellow-400 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                          <span className="text-zinc-300 leading-relaxed">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="mt-4 bg-green-500/5 border border-green-500/25 rounded-xl p-4 flex items-center gap-3">
                    <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Answer</span>
                    <span className="text-green-200 font-semibold text-sm">{ex.answer}</span>
                  </div>
                </div>
              ))}
              <button onClick={() => setActiveTab("quiz")} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl">Practise these in the quiz →</button>
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
              {sectionPlotting.length > 0 && (
                <div className="mb-6 space-y-4">
                  <div>
                    <h3 className="text-white font-bold">Graph plotting — {section.title}</h3>
                    <p className="text-zinc-600 text-xs mt-0.5">
                      {sectionPlotting.length} worked exercises · plot on your own CAP 697/698 manual
                    </p>
                  </div>
                  {sectionPlotting.map((p, i) => (
                    <PlottingCard key={p.id} q={p} index={i} />
                  ))}
                </div>
              )}
              {sectionQuestions.length === 0 ? (
                sectionPlotting.length === 0 && (
                  <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 text-center">
                    <div className="text-4xl mb-4">📝</div>
                    <h3 className="text-white font-bold text-lg mb-2">Practice Quiz</h3>
                    <p className="text-zinc-500 text-sm">A question bank for this subject is coming soon.</p>
                  </div>
                )
              ) : (
                <>
                  {/* Sub-topic drill — filter the quiz to one syllabus aspect */}
                  {section.items.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <button
                        onClick={() => { setDrillAspect(null); setQuizPage(0); setQuizAnswers({}); setQuizSubmitted(false); }}
                        className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${drillAspect === null ? "bg-yellow-400 text-black border-yellow-400 font-semibold" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"}`}
                      >
                        All · {sectionQuestions.length}
                      </button>
                      {section.items.map((item, i) => (
                        <button
                          key={item.id}
                          onClick={() => { setDrillAspect(item.id); setQuizPage(0); setQuizAnswers({}); setQuizSubmitted(false); }}
                          disabled={!aspectCounts[item.id]}
                          title={item.topic}
                          className={`px-3 py-1.5 rounded-lg text-xs border transition-colors disabled:opacity-40 ${drillAspect === item.id ? "bg-yellow-400 text-black border-yellow-400 font-semibold" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"}`}
                        >
                          {i + 1} · {aspectCounts[item.id] ?? 0}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-bold">Section Quiz — {section.title}{drillAspect ? ` · sub-topic ${drillAspect}` : ""}</h3>
                      <p className="text-zinc-600 text-xs mt-0.5">
                        {quizQuestions.length} questions{drillAspect ? " in this sub-topic" : " in the bank"} · Page {quizPage + 1} of {quizPageCount}
                      </p>
                    </div>
                    {quizSubmitted && (
                      <div className="text-sm text-yellow-400 font-bold">
                        {sectionQuestions.filter((q) => quizAnswers[q.id] === q.correctAnswer).length}/
                        {Object.keys(quizAnswers).length || sectionQuestions.length} correct
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {quizPageQuestions.map((q, idx) => {
                      const i = quizPage * QUIZ_PER_PAGE + idx;
                      return (
                      <div key={q.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5">
                        <div className="text-sm text-white font-medium mb-3">{i + 1}. {q.question}</div>
                        <div className="space-y-2">
                          {(["a", "b", "c", "d"] as const).map((opt) => {
                            const text = q[`option${opt.toUpperCase()}` as "optionA"];
                            const chosen = quizAnswers[q.id] === opt;
                            const isCorrect = q.correctAnswer === opt;
                            let cls = "bg-zinc-900/40 border-zinc-800 text-zinc-300";
                            if (quizSubmitted) {
                              if (isCorrect) cls = "bg-green-500/10 border-green-500/40 text-green-300";
                              else if (chosen) cls = "bg-red-500/10 border-red-500/40 text-red-300";
                            } else if (chosen) cls = "bg-yellow-400/10 border-yellow-400 text-white";
                            return (
                              <button
                                key={opt}
                                disabled={quizSubmitted}
                                onClick={() => setQuizAnswers((a) => ({ ...a, [q.id]: opt }))}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-sm border transition-colors ${cls}`}
                              >
                                <span className="font-bold uppercase">{opt}.</span>
                                {text}
                              </button>
                            );
                          })}
                        </div>
                        {quizSubmitted && (
                          <p className="text-xs text-zinc-500 mt-3 leading-relaxed">{q.explanation}</p>
                        )}
                      </div>
                      );
                    })}
                  </div>

                  {/* Pagination — the full bank, 10 per page */}
                  {quizPageCount > 1 && (
                    <div className="mt-5 flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => { setQuizPage((p) => Math.max(0, p - 1)); window.scrollTo({ top: 0 }); }}
                        disabled={quizPage === 0}
                        className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs disabled:opacity-30"
                      >
                        ← Prev
                      </button>
                      {Array.from({ length: quizPageCount }).map((_, p) => (
                        <button
                          key={p}
                          onClick={() => { setQuizPage(p); window.scrollTo({ top: 0 }); }}
                          className={`w-8 h-8 rounded-lg text-xs font-mono ${p === quizPage ? "bg-yellow-400 text-black font-bold" : "bg-zinc-900 text-zinc-500 hover:text-white"}`}
                        >
                          {p + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => { setQuizPage((p) => Math.min(quizPageCount - 1, p + 1)); window.scrollTo({ top: 0 }); }}
                        disabled={quizPage === quizPageCount - 1}
                        className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs disabled:opacity-30"
                      >
                        Next →
                      </button>
                    </div>
                  )}

                  <div className="mt-5">
                    {!quizSubmitted ? (
                      <button
                        onClick={() => setQuizSubmitted(true)}
                        className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors"
                      >
                        Submit answers ✓
                      </button>
                    ) : (
                      <button
                        onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); setQuizPage(0); }}
                        className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-sm rounded-xl transition-colors"
                      >
                        Try again ↻
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === "flashcards" && (
            <div className="max-w-2xl">
              {sectionFlashcards.length === 0 ? (
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-4">🃏</div>
                  <h3 className="text-white font-bold text-lg mb-2">Flashcards</h3>
                  <p className="text-zinc-500 text-sm">Flashcards for this subject are coming soon.</p>
                </div>
              ) : (
                (() => {
                  const card = sectionFlashcards[fcIndex % sectionFlashcards.length];
                  return (
                    <>
                      <div className="flex items-center justify-between text-xs text-zinc-600 mb-3">
                        <span>Card {(fcIndex % sectionFlashcards.length) + 1} / {sectionFlashcards.length}</span>
                        <span className="font-mono text-yellow-400/60">{section.id}</span>
                      </div>
                      <button
                        onClick={() => setFcFlipped((f) => !f)}
                        className="w-full min-h-[240px] bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-colors"
                      >
                        <div className="text-xs uppercase tracking-widest text-zinc-600 mb-4">
                          {fcFlipped ? "Answer" : "Question"}
                        </div>
                        <div className={`${fcFlipped ? "text-zinc-200 text-base" : "text-white text-lg font-bold"} leading-relaxed`}>
                          {fcFlipped ? card.back : card.front}
                        </div>
                        <div className="text-xs text-zinc-700 mt-6">Click to {fcFlipped ? "hide" : "reveal"}</div>
                      </button>
                      <div className="flex items-center justify-between gap-3 mt-5">
                        <button
                          onClick={() => { setFcFlipped(false); setFcIndex((i) => (i - 1 + sectionFlashcards.length) % sectionFlashcards.length); }}
                          className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm rounded-xl transition-colors"
                        >
                          ← Prev
                        </button>
                        <button
                          onClick={() => { setFcFlipped(false); setFcIndex((i) => (i + 1) % sectionFlashcards.length); }}
                          className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors"
                        >
                          Next →
                        </button>
                      </div>
                    </>
                  );
                })()
              )}
            </div>
          )}
        </div>

        {/* Persistent section-to-section navigation */}
        <div className="px-10 py-4 border-t border-zinc-900 flex items-center justify-between gap-3 sticky bottom-0 bg-black/80 backdrop-blur">
          {prevSection ? (
            <Link href={`/study/${subjectId}/${prevSection.id}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-sm transition-colors max-w-[45%]">
              ← <span className="truncate"><span className="text-zinc-500">Prev:</span> {prevSection.title}</span>
            </Link>
          ) : <div />}
          <button onClick={() => setShowSyllabus(true)} className="hidden sm:block px-3 py-2 text-xs text-zinc-500 hover:text-yellow-400 transition-colors">📋 Syllabus</button>
          {nextSection ? (
            <Link href={`/study/${subjectId}/${nextSection.id}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm transition-colors max-w-[45%]">
              <span className="truncate"><span className="opacity-70">Next:</span> {nextSection.title}</span> →
            </Link>
          ) : (
            <Link href={`/study/${subjectId}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm transition-colors">
              Subject complete →
            </Link>
          )}
        </div>
      </main>

      {/* Check-Syllabus overlay */}
      {showSyllabus && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm p-6 overflow-auto" onClick={() => setShowSyllabus(false)}>
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl my-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 sticky top-0 bg-zinc-950 rounded-t-2xl">
              <div>
                <div className="text-yellow-400 text-xs font-mono">{subject.code ?? subjectId}</div>
                <h2 className="text-white font-black text-lg">{subject.title} — Syllabus</h2>
                <p className="text-zinc-600 text-xs mt-0.5">{subject.sections.length} sections · SACAA Appendix aspects</p>
              </div>
              <button onClick={() => setShowSyllabus(false)} className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-lg leading-none">×</button>
            </div>
            <div className="p-4 space-y-2">
              {subject.sections.map((s) => (
                <Link
                  key={s.id}
                  href={`/study/${subjectId}/${s.id}`}
                  onClick={() => setShowSyllabus(false)}
                  className={`block rounded-xl border p-4 transition-colors ${s.id === sectionId ? "border-yellow-400/40 bg-yellow-400/5" : "border-zinc-900 hover:border-zinc-700 bg-zinc-900/30"}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-yellow-400/80">{s.id}</span>
                    <span className="text-white font-bold text-sm">{s.title}</span>
                    {s.id === sectionId && <span className="ml-auto text-[10px] text-yellow-400 uppercase tracking-wider">you are here</span>}
                  </div>
                  {s.items?.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {s.items.map((it) => (
                        <li key={it.id} className="text-zinc-500 text-xs flex gap-2"><span className="text-zinc-700">•</span><span>{it.topic}</span></li>
                      ))}
                    </ul>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
