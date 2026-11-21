import Link from "next/link";
import type { ReactNode } from "react";

// Shared shell for Terms / Privacy: readable column, cockpit heading, back link.
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-chart-ground px-5 py-12">
      <article className="max-w-2xl mx-auto text-chart-ink-dim text-[15px] leading-relaxed space-y-5 [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:text-chart-ink [&_h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-chart-ink">
        <Link href="/" className="text-xs text-chart-ink-faint hover:text-chart-ink">← Raphael Aviation</Link>
        <div>
          <div className="mono text-[11px] tracking-[0.16em] uppercase text-data">Last updated {updated}</div>
          <h1 className="font-display font-bold text-4xl text-chart-ink leading-none mt-2">{title}</h1>
        </div>
        {children}
      </article>
    </main>
  );
}
