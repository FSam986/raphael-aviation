import type { ReactNode } from "react";

// Original infographic shell (light theme, colour-coded panels) used to build
// figures for sections without an uploaded image. Same visual language as the
// uploaded infographics: navy header, coloured section chips, bullet facts,
// optional mini-diagram, key-points and summary strips.

type Tone = "blue" | "green" | "red" | "purple" | "amber" | "teal" | "slate";

const TONE: Record<Tone, { chip: string; border: string; text: string }> = {
  blue: { chip: "#1d4ed8", border: "#bfdbfe", text: "#1e3a8a" },
  green: { chip: "#15803d", border: "#bbf7d0", text: "#14532d" },
  red: { chip: "#b91c1c", border: "#fecaca", text: "#7f1d1d" },
  purple: { chip: "#7e22ce", border: "#e9d5ff", text: "#581c87" },
  amber: { chip: "#b45309", border: "#fde68a", text: "#78350f" },
  teal: { chip: "#0f766e", border: "#99f6e4", text: "#134e4a" },
  slate: { chip: "#334155", border: "#cbd5e1", text: "#1e293b" },
};

export interface InfoPanel {
  heading: string;
  tone?: Tone;
  points: string[];
  svg?: ReactNode; // optional mini-diagram
  image?: string; // optional image path served from /public (e.g. "/figures/fpp/x.png")
  wide?: boolean; // span both columns
}

function Panel({ p }: { p: InfoPanel }) {
  const t = TONE[p.tone ?? "blue"];
  return (
    <div className={`rounded-lg overflow-hidden border ${p.wide ? "sm:col-span-2" : ""}`} style={{ borderColor: t.border }}>
      <div className="px-3 py-1.5 text-white text-[12px] font-bold tracking-wide" style={{ background: t.chip }}>{p.heading}</div>
      <div className="p-3">
        {p.svg && <div className="mb-2">{p.svg}</div>}
        {p.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.heading} loading="lazy" className="w-full rounded-md border border-slate-200 mb-2" />
        )}
        <ul className="space-y-1">
          {p.points.map((pt, i) => (
            <li key={i} className="text-[12.5px] leading-snug text-slate-700 flex gap-1.5">
              <span style={{ color: t.chip }} className="mt-[2px]">▸</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Infographic({
  title,
  tagline,
  panels,
  keyPoints,
  summary,
}: {
  title: string;
  tagline?: string;
  panels: InfoPanel[];
  keyPoints?: string[];
  summary?: string;
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden text-slate-800">
      <div className="px-5 py-3" style={{ background: "#0b2a4a" }}>
        <h3 className="text-white font-black text-lg tracking-tight">{title}</h3>
        {tagline && <p className="text-blue-200 text-[12px] mt-0.5">{tagline}</p>}
      </div>
      <div className="p-4 grid sm:grid-cols-2 gap-3">
        {panels.map((p, i) => <Panel key={i} p={p} />)}
      </div>
      {keyPoints && keyPoints.length > 0 && (
        <div className="mx-4 mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <div className="text-amber-700 text-[11px] font-black uppercase tracking-wider mb-1">Key points</div>
          <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
            {keyPoints.map((k, i) => (
              <li key={i} className="text-[12.5px] text-slate-700 flex gap-1.5"><span className="text-amber-600">★</span><span>{k}</span></li>
            ))}
          </ul>
        </div>
      )}
      {summary && (
        <div className="mx-4 mb-4 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2 text-[12.5px] text-blue-900">
          💡 {summary}
        </div>
      )}
    </div>
  );
}
