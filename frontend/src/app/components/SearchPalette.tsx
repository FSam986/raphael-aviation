"use client";
// Global search: a sidebar button (and Ctrl/⌘+K anywhere) opens a search window
// over the active course's whole syllabus. Arrow keys move, Enter opens.
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useCourse } from "@/app/hooks/useCourse";
import { searchSyllabus } from "@/app/lib/search";
import { SearchResults } from "@/app/components/SearchResults";

export function SearchPalette() {
  const router = useRouter();
  const { syllabus } = useCourse();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => (open ? searchSyllabus(syllabus, q, 10) : []), [open, q, syllabus]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((v) => !v); }
      if (e.key === "Escape") { setOpen(false); setQ(""); setActive(0); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { if (open) setTimeout(() => input.current?.focus(), 0); }, [open]);
  const close = () => { setOpen(false); setQ(""); setActive(0); };

  const go = (i: number) => { const h = hits[i]; if (h) { close(); router.push(h.href); } };

  return (
    <>
      <button onClick={(e) => { e.stopPropagation(); setOpen(true); }}
        className="mx-4 mt-4 flex items-center gap-2.5 px-3 py-2 rounded-lg border border-chart-line bg-chart-ground text-sm text-chart-ink-faint hover:text-chart-ink hover:border-chart-line-2 transition-colors">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        Search topics
        <kbd className="ml-auto mono text-[10px] border border-chart-line rounded px-1.5 py-0.5">⌘K</kbd>
      </button>
      {open && createPortal(
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-10" onClick={close}>
          <div className="w-full max-w-2xl bg-chart-ground border border-chart-line-2 rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Search the syllabus">
            <div className="flex items-center gap-3 px-4 border-b border-chart-line">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold shrink-0" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setActive(0); }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, hits.length - 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
                  if (e.key === "Enter") { e.preventDefault(); go(active); }
                }}
                placeholder="Search any topic, term or question — e.g. density altitude, QNH, wind shear…"
                aria-label="Search the syllabus"
                className="flex-1 bg-transparent py-4 text-[15px] text-chart-ink placeholder:text-chart-ink-faint outline-none" />
              <kbd className="mono text-[10px] text-chart-ink-faint border border-chart-line rounded px-1.5 py-0.5">Esc</kbd>
            </div>
            <div className="max-h-[65vh] overflow-auto p-3">
              {q.trim().length < 2
                ? <div className="text-chart-ink-faint text-sm py-6 text-center">Type at least 2 letters. Searches every subject&apos;s syllabus, notes, flashcards and exam questions.</div>
                : <SearchResults hits={hits} query={q} active={active} onPick={close} />}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
