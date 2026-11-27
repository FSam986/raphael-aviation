// Exam Debrief — turn a SACAA result sheet into weak syllabus topics and use them
// to steer mock exams. Rule-based (no AI): fixed text patterns for the known
// report formats, then matching by syllabus code (exact) or shared keywords.
//
// Formats handled (from real sheets):
//  • SACAA "Coaching Report" — "Summary of Incorrectly Answered Questions":
//      "4  3587  Copy of CPNAV0125  Triangle of velocities"
//  • LPLUS "Knowledge Deficiency Report" — every topic with points:
//      "Speeds and heights [2.0 A, B - Air law]  2  1.00  2.00  50.00"
//  • Anything else that names syllabus codes (A.3.12, C.3.4 …) or topic words.

import type { SyllabusSubject } from "@/app/data/sacaa-syllabus";
import type { MasteryMap } from "@/app/lib/examSelect";

export type Confidence = "exact" | "keyword" | "unsure";
export interface ReportRow { label: string; code?: string; wrong: number; asked?: number; pct?: number }
export interface ParsedReport { format: "coaching" | "deficiency" | "generic"; subjectText?: string; licenceText?: string; scoreText?: string; rows: ReportRow[] }
export interface WeakSpot { label: string; target: string; title: string; weight: number; confidence: Confidence }
export interface Debrief { subjectId: string; createdAt: string; scoreText?: string; spots: WeakSpot[] }

const CODE = /\b([A-C])\.(\d{1,2})\.(\d{1,2})(?:\.([a-z0-9]{1,2}))?\b/;
const num = (s: string) => Number(s.replace(",", "."));

/** Parse OCR / PDF text of a result sheet. */
export function parseReport(text: string): ParsedReport {
  const lines = text.split(/\r?\n/).map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean);
  const subjectText = lines.map((l) => /Subject:?\s*(.+?)(?:\s+(?:Date|Licence|Location)\b|$)/i.exec(l)?.[1]).find(Boolean)?.trim();
  const scoreText = lines.map((l) => /(?:Result|Percentage score):?\s*(\d{1,3}\s*%.*)$/i.exec(l)?.[1]).find(Boolean)?.trim();
  const licenceText = lines.map((l) => /\bLicence:\s*(.+?)(?:\s+(?:Subject|Participant)\b|$)/i.exec(l)?.[1]).find(Boolean)?.trim();

  // Coaching report: rows after "Summary of Incorrectly Answered Questions".
  if (lines.some((l) => /incorrectly answered/i.test(l))) {
    const rows: ReportRow[] = [];
    for (const l of lines) {
      // "<no> <int no> [Copy of] <question id> [<SACAA topic no.>] <topic>"
      const m = /^\d{1,3}\s+\d{1,6}\s+(?:Copy of\s+)?(\S+)\s+(.+)$/i.exec(l);
      if (!m || /^(no\.?|int)/i.test(m[1])) continue;
      const label = m[2].replace(/^\d+(?:\.\d+){1,4}\s+/, "").trim(); // drop SACAA's own topic numbering
      if (label) rows.push({ label, code: CODE.exec(m[2])?.[0], wrong: 1 });
    }
    return { format: "coaching", subjectText, licenceText, scoreText, rows: mergeRows(rows) };
  }

  // Knowledge deficiency: "<topic> <n> <achieved> <max> <percent>" (topic may wrap onto 2 lines).
  const TAIL = /^(.*?)\s*(\d{1,3})\s+(\d+[.,]\d{1,2})\s+(\d+[.,]\d{1,2})\s+(\d+[.,]\d{1,2})$/;
  if (lines.some((l) => TAIL.test(l))) {
    const rows: ReportRow[] = [];
    let carry = "";
    for (const l of lines) {
      const m = TAIL.exec(l);
      if (!m) { if (/\[|^[A-C]\.\d|^[A-Z][a-z]/.test(l) && !/^(Topic|Candidate|Subject|Date|Location|Result|Total|Knowledge|Print)/i.test(l)) carry = carry ? `${carry} ${l}` : l; continue; }
      const label = `${carry} ${m[1]}`.trim().replace(/\s+/g, " ");
      carry = "";
      if (!label || /^total/i.test(label)) continue;
      const achieved = num(m[3]), max = num(m[4]);
      rows.push({ label, code: CODE.exec(label)?.[0], wrong: Math.max(0, Math.round((max - achieved) * 100) / 100), asked: Number(m[2]), pct: num(m[5]) });
    }
    return { format: "deficiency", subjectText, licenceText, scoreText, rows };
  }

  // Generic: any line carrying a syllabus code.
  const rows = lines.filter((l) => CODE.test(l)).map((l) => ({ label: l, code: CODE.exec(l)![0], wrong: 1 }));
  return { format: "generic", subjectText, licenceText, scoreText, rows: mergeRows(rows) };
}

/** One file may hold several reports (one per subject): split and parse each. */
export function parseReports(text: string): ParsedReport[] {
  const parts = text.split(/(?=COACHING REPORT|Knowledge Deficiency Report)/i).filter((p) => p.trim());
  const out = (parts.length > 1 ? parts : [text]).map(parseReport).filter((r) => r.rows.length || r.subjectText);
  return out.length ? out : [parseReport(text)];
}

/** Course named on the sheet's "Licence:" line (PPL, CPL, IR …), if any. */
export function guessCourse(licenceText: string | undefined): "cpl" | "ppl" | "ir" | "gr" | "nr" | undefined {
  const t = (licenceText ?? "").toLowerCase();
  if (/\bppl\b|private/.test(t)) return "ppl";
  if (/\bcpl\b|commercial/.test(t)) return "cpl";
  if (/instrument|\bir\b/.test(t)) return "ir";
  if (/night/.test(t)) return "nr";
  if (/radio/.test(t)) return "gr";
  return undefined;
}

function mergeRows(rows: ReportRow[]): ReportRow[] {
  const by = new Map<string, ReportRow>();
  for (const r of rows) { const k = r.label.toLowerCase(); const p = by.get(k); if (p) p.wrong += r.wrong; else by.set(k, { ...r }); }
  return [...by.values()];
}

// ── Matching ──────────────────────────────────────────────────────────────────
const STOP = new Set("the and for with from part air law ir operational procedures copy question questions images theory general".split(" "));
// LPLUS report category labels — not topics; their rows are placed by position and confirmed.
const GENERIC = new Set(["admini", "operat", "periph"]);
/** Word present in a set — a cut-off OCR word ("altit") also matches a longer one ("altitu…"). */
const has = (set: Set<string>, w: string) => set.has(w) || (w.length >= 4 && w.length < 6 && [...set].some((x) => x.startsWith(w)));
const toks = (s: string) => new Set((s.toLowerCase().replace(/\[[^\]]*\]/g, " ").match(/[a-z0-9]{3,}/g) ?? []).filter((w) => !STOP.has(w)).map((w) => w.slice(0, 6)));

/** Which subject (of the active course) a sheet's "Subject:" line names. */
export function guessSubject(subjectText: string | undefined, syllabus: SyllabusSubject[]): string | undefined {
  if (syllabus.length === 1) return syllabus[0].id; // GR / Night: one subject
  if (!subjectText) return undefined;
  // Plain words here (the topic filter drops "air"/"law", which name a subject).
  const words = (x: string) => new Set((x.toLowerCase().match(/[a-z]{3,}/g) ?? []).map((w) => w.slice(0, 6)));
  const t = words(subjectText);
  let best: string | undefined, score = 0;
  for (const s of syllabus) { let n = 0; for (const w of words(s.title)) if (t.has(w)) n++; if (n > score) { score = n; best = s.id; } }
  return best;
}

/** Map report rows to the subject's sections / sub-topics. Rows scored 100% are skipped. */
export function matchRows(rows: ReportRow[], subject: SyllabusSubject, corpus?: Record<string, string>): WeakSpot[] {
  // Section text (notes + questions) as token sets, with rarer tokens counting more.
  const secToks = corpus ? Object.fromEntries(Object.entries(corpus).map(([k, v]) => [k, toks(v)])) : null;
  const df = new Map<string, number>();
  if (secToks) for (const set of Object.values(secToks)) for (const w of set) df.set(w, (df.get(w) ?? 0) + 1);
  const nSec = secToks ? Object.keys(secToks).length : 1;
  const bySection = (t: Set<string>) => {
    if (!secToks) return null;
    const ranked = Object.entries(secToks).map(([id, set]) => {
      let sc = 0, hit = 0;
      for (const w of t) if (has(set, w)) { hit++; sc += Math.log(1 + nSec / (df.get(w) ?? 1)); }
      return { id, sc, hit };
    }).sort((a, b) => b.sc - a.sc);
    return ranked[0] && ranked[0].hit > 0 ? { best: ranked[0], margin: ranked[0].sc - (ranked[1]?.sc ?? 0) } : null;
  };
  const out: WeakSpot[] = [];
  let context: string | undefined; // last confidently matched section (for generic labels like "Administrative")
  const secTitle = (id: string) => subject.sections.find((s) => s.id === id)?.title ?? id;
  for (const r of rows) {
    let target: string | undefined, confidence: Confidence = "unsure";
    const code = r.code ?? CODE.exec(r.label)?.[0];
    if (code) {
      const sec = subject.sections.find((s) => code === s.id || code.startsWith(s.id + "."));
      const item = sec?.items.find((i) => code.startsWith(i.id));
      if (sec) { target = item?.id ?? sec.id; confidence = "exact"; }
    }
    if (!target) {
      const t = toks(r.label);
      let best: { id: string; sec: string } | undefined, score = 0, tie = false;
      for (const sec of subject.sections) for (const it of [{ id: sec.id, topic: sec.title }, ...sec.items]) {
        let n = 0; const tt = toks(it.topic); for (const w of t) if (has(tt, w)) n++;
        if (n > score) { score = n; best = { id: it.id, sec: sec.id }; tie = false; }
        else if (n === score && n > 0 && best && best.sec !== sec.id) tie = true; // equally good in another section
      }
      // Report category words ("Administrative", "Operational"…) say nothing about the topic.
      const generic = [...t].every((w) => GENERIC.has(w));
      const strongSyllabus = best && !generic && !tie && (score >= 2 || (score === 1 && t.size <= 3));
      const viaContent = generic ? null : bySection(t);
      if (strongSyllabus) { target = best!.id; confidence = "keyword"; }
      else if (viaContent && viaContent.best.hit >= Math.min(2, t.size) && viaContent.margin > 0.5) {
        // Not in the syllabus wording, but clearly taught in one section's notes/questions.
        const sec = subject.sections.find((x) => x.id === viaContent.best.id)!;
        target = best && best.sec === sec.id ? best.id : sec.id; confidence = "keyword";
      }
      else { target = viaContent?.best.id ?? (best && !generic ? best.id : context ?? subject.sections[0].id); confidence = "unsure"; }
    }
    if (confidence !== "unsure") context = subject.sections.find((s) => target === s.id || target!.startsWith(s.id + "."))?.id;
    if (r.wrong <= 0) continue;
    const title = subject.sections.flatMap((s) => [{ id: s.id, topic: s.title }, ...s.items]).find((x) => x.id === target)?.topic ?? secTitle(target);
    out.push({ label: r.label.replace(/\s*\[[^\]]*\]\s*/g, " ").trim(), target, title, weight: r.wrong, confidence });
  }
  return out;
}

// ── Storage ───────────────────────────────────────────────────────────────────
const KEY = (subjectId: string) => `debrief:v1:${subjectId}`;
export function saveDebrief(d: Debrief) { try { localStorage.setItem(KEY(d.subjectId), JSON.stringify(d)); } catch { /* ignore */ } }
export function loadDebrief(subjectId: string): Debrief | null {
  if (typeof window === "undefined") return null;
  try { const v = localStorage.getItem(KEY(subjectId)); return v ? (JSON.parse(v) as Debrief) : null; } catch { return null; }
}
export function clearDebrief(subjectId: string) { try { localStorage.removeItem(KEY(subjectId)); } catch { /* ignore */ } }

// ── Mock adaptation ───────────────────────────────────────────────────────────
type Q = { id: string; sectionId: string };
/** Does a question fall under a weak-spot target (section id or sub-topic id)? */
const hits = (target: string, q: Q, itemOf: (q: Q) => string | null) => q.sectionId === target || itemOf(q) === target;

/** A weak spot is "closed out" once its questions are mostly answered correctly (≥ 90% over ≥ 5 answers). */
export function spotStrength(spot: WeakSpot, bank: Q[], m: MasteryMap, itemOf: (q: Q) => string | null) {
  let c = 0, a = 0;
  for (const q of bank) if (hits(spot.target, q, itemOf)) { const s = m[q.id]; if (s) { c += s.correct; a += s.correct + s.wrong; } }
  return { answered: a, pct: a ? Math.round((c / a) * 100) : 0, closed: a >= 5 && c / a >= 0.9 };
}

/**
 * Questions to put in a paper because of the debrief: about half the paper,
 * shared between open weak spots in proportion to their weight, preferring
 * unseen / previously-wrong questions. The caller fills the rest normally.
 */
export function debriefPicks<T extends Q>(bank: T[], size: number, d: Debrief | null, m: MasteryMap, itemOf: (q: Q) => string | null): T[] {
  if (!d) return [];
  const open = d.spots.filter((s) => !spotStrength(s, bank, m, itemOf).closed);
  const total = open.reduce((n, s) => n + s.weight, 0);
  if (!total) return [];
  const budget = Math.round(size * 0.5);
  const chosen = new Set<string>();
  const out: T[] = [];
  const score = (q: T) => { const s = m[q.id]; return !s ? 2 : s.wrong > s.correct ? 3 : s.correct >= 2 && s.wrong === 0 ? 0 : 1; };
  for (const s of open) {
    const n = Math.max(1, Math.round((s.weight / total) * budget));
    const pool = bank.filter((q) => !chosen.has(q.id) && hits(s.target, q, itemOf)).sort((a, b) => score(b) - score(a) || Math.random() - 0.5);
    for (const q of pool.slice(0, n)) { chosen.add(q.id); out.push(q); }
  }
  return out.slice(0, budget);
}
