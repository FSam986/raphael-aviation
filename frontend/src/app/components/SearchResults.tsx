"use client";
// Ranked syllabus search results with a highlighted "why it matched" line.
import Link from "next/link";
import type { SearchHit } from "@/app/lib/search";

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return <>{text.split(re).map((p, i) => (i % 2 ? <mark key={i} className="bg-transparent text-gold font-semibold">{p}</mark> : p))}</>;
}

export function SearchResults({ hits, query, active = -1, onPick }: { hits: SearchHit[]; query: string; active?: number; onPick?: () => void }) {
  const terms = (query.toLowerCase().match(/[a-z0-9]{3,}/g) ?? []);
  if (!hits.length) return <div className="text-chart-ink-faint text-sm py-8 text-center">No matching topic. Try a simpler word, an abbreviation (e.g. QNH, DALR, PET) or a subject name.</div>;
  return (
    <ul className="flex flex-col gap-1.5" role="listbox">
      {hits.map((h, i) => (
        <li key={h.subjectId + h.sectionId} role="option" aria-selected={i === active}>
          <Link href={h.href} onClick={onPick} data-idx={i}
            className={`block rounded-xl border px-4 py-3 transition-colors ${i === active ? "border-gold/50 bg-gold/[0.07]" : "border-chart-line bg-chart-ground-2 hover:border-gold/35"}`}>
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="font-display font-bold text-[17px] text-chart-ink truncate"><Highlight text={h.sectionTitle} terms={terms} /></span>
              <span className="mono text-[11px] text-chart-ink-faint shrink-0">{h.sectionId}</span>
              <span className="ml-auto mono text-[10px] uppercase tracking-wider text-data shrink-0">{h.subjectTitle}</span>
            </div>
            {h.topic && <div className="text-[13px] text-chart-ink-dim mt-0.5 truncate">→ <Highlight text={h.topic} terms={terms} /></div>}
            {h.snippet && <div className="text-[12px] text-chart-ink-faint mt-1 line-clamp-2"><Highlight text={h.snippet} terms={terms} /></div>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
