// Smart syllabus search: ranks syllabus sections for a free-text query using
// everything the app knows about each section — titles, topics, study notes,
// flashcards and exam questions — with aviation abbreviation expansion, UK/US
// spelling, compound words ("wind shear" ↔ "windshear"), typo tolerance and
// as-you-type prefix matching. Returns the best section + topic to open and a
// snippet explaining why it matched.
import type { SyllabusSubject } from "@/app/data/sacaa-syllabus";
import { subjectContent } from "@/app/lib/subjectContent";
import { REG_MAP } from "@/app/data/sa-car-map";
import CAR_INDEX from "@/app/data/sa-car-index.json";

export interface SearchHit {
  subjectId: string; subjectTitle: string;
  sectionId: string; sectionTitle: string;
  itemId?: string; topic?: string;
  href: string; snippet: string; score: number;
}

const STOP = new Set("a an the of to in on at for and or is are be what how why when where which who does do did can i me my it its about with from by as that this these those vs versus explain define definition meaning find calculate work out decode interpret read reading use using about tell".split(" "));

// Abbreviation / synonym groups — any member expands to the others.
const SYN: string[][] = [
  ["qnh", "altimeter setting sea level"], ["qfe", "aerodrome level altimeter"], ["qne", "standard 1013"],
  ["dalr", "dry adiabatic lapse rate"], ["salr", "saturated adiabatic lapse rate"], ["elr", "environmental lapse rate"],
  ["isa", "international standard atmosphere"], ["cb", "cumulonimbus thunderstorm"], ["ts", "thunderstorm"],
  ["vor", "vhf omnidirectional range"], ["ils", "instrument landing system localiser glidepath"], ["glideslope", "glidepath"],
  ["loc", "localiser"], ["ndb", "non directional beacon"], ["adf", "automatic direction finder"], ["dme", "distance measuring equipment"],
  ["gps", "gnss satellite"], ["rnav", "area navigation"], ["ssr", "secondary surveillance radar transponder"], ["squawk", "transponder"],
  ["7700", "emergency transponder distress"], ["7600", "radio failure transponder"], ["7500", "unlawful interference hijack transponder"],
  ["tcas", "acas collision avoidance"], ["gpws", "taws ground proximity warning"], ["cfit", "controlled flight into terrain"],
  ["metar", "aerodrome weather report"], ["taf", "aerodrome forecast"], ["sigmet", "significant weather"], ["atis", "automatic terminal information"],
  ["cg", "centre gravity"], ["mac", "mean aerodynamic chord"], ["pet", "point equal time critical point"], ["psr", "point safe return pnr"],
  ["mtom", "maximum take off mass"], ["mzfm", "maximum zero fuel mass"], ["tora", "take off run available"], ["toda", "take off distance available"],
  ["asda", "accelerate stop distance available"], ["lda", "landing distance available"], ["rvr", "runway visual range"],
  ["vmc", "visual meteorological conditions"], ["imc", "instrument meteorological conditions"], ["vfr", "visual flight rules"], ["ifr", "instrument flight rules"],
  ["tuc", "time useful consciousness hypoxia"], ["mayday", "distress"], ["pan", "urgency"], ["wake", "vortex vortices"],
  ["carb", "carburettor"], ["mag", "magnetic"], ["ias", "indicated airspeed"], ["tas", "true airspeed"], ["cas", "calibrated airspeed"],
  ["ecam", "eicas warning"], ["efis", "electronic flight instrument"], ["fd", "flight director"], ["ap", "autopilot"],
  ["pof", "principles flight aerodynamics"], ["hp", "human performance"], ["crm", "crew resource management"],
  ["msa", "minimum sector altitude"], ["mda", "minimum descent altitude"], ["da", "decision altitude"], ["dh", "decision height"],
  ["mel", "minimum equipment list"], ["notam", "notice airmen"], ["aip", "aeronautical information publication"],
];
const US_UK: [string, string][] = [["center", "centre"], ["color", "colour"], ["meter", "metre"], ["liter", "litre"], ["localizer", "localiser"], ["carburetor", "carburettor"], ["maneuver", "manoeuvre"], ["aluminum", "aluminium"], ["gray", "grey"]];

const stem = (w: string) => w.length > 4 ? w.replace(/(ings|ing|ies|ied|es|ed|s)$/, (m) => (m === "ies" || m === "ied" ? "y" : "")) : w;
function words(t: string): string[] {
  return (t.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").match(/[a-z0-9]+/g) ?? []).filter((w) => !STOP.has(w));
}
const toks = (t: string) => words(t).map(stem);

const SYN_MAP = new Map<string, string[]>();
for (const g of SYN) { const all = [g[0], ...toks(g[1])]; for (const w of all) SYN_MAP.set(w, [...new Set([...(SYN_MAP.get(w) ?? []), ...all.filter((x) => x !== w)])]); }
for (const [us, uk] of US_UK) { SYN_MAP.set(stem(us), [...(SYN_MAP.get(stem(us)) ?? []), stem(uk)]); SYN_MAP.set(stem(uk), [...(SYN_MAP.get(stem(uk)) ?? []), stem(us)]); }

function lev(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]; let best = i;
    for (let j = 1; j <= b.length; j++) { cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); best = Math.min(best, cur[j]); }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

type Field = { text: string; w: number; kind: string };
interface Doc { subject: SyllabusSubject; sectionId: string; sectionTitle: string; items: { id: string; topic: string }[]; fields: Field[]; tf: Map<string, number> }

// Field weights: what a match in each place says about relevance.
const W = { section: 6, topic: 5, subject: 1.5, heading: 3, mustKnow: 2, point: 1.5, trap: 1.5, intro: 1, card: 1.2, question: 0.5 };

const indexCache = new Map<string, { docs: Doc[]; df: Map<string, number>; vocab: string[] }>();

function build(syllabus: SyllabusSubject[]) {
  const key = syllabus.map((s) => s.id).join("|");
  const hit = indexCache.get(key); if (hit) return hit;
  const docs: Doc[] = [];
  for (const subject of syllabus) {
    const ct = subjectContent(subject.id);
    for (const sec of subject.sections) {
      const fields: Field[] = [
        { text: sec.title, w: W.section, kind: "section" }, { text: subject.title, w: W.subject, kind: "subject" },
        ...sec.items.map((it) => ({ text: it.topic, w: W.topic, kind: "topic" })),
      ];
      const note = ct?.note(sec.id);
      if (note) {
        fields.push({ text: note.intro, w: W.intro, kind: "note" });
        for (const b of note.blocks ?? []) { fields.push({ text: b.heading, w: W.heading, kind: "note" }); for (const p of b.points ?? []) fields.push({ text: p, w: W.point, kind: "note" }); }
        for (const p of note.mustKnow) fields.push({ text: p, w: W.mustKnow, kind: "note" });
        for (const p of note.traps) fields.push({ text: p, w: W.trap, kind: "note" });
      }
      for (const r of REG_MAP[sec.id] ?? []) for (const [no, title, lead] of (CAR_INDEX as Record<string, string[][]>)[String(r.part)] ?? []) {
        fields.push({ text: `Regulation ${no} ${title}`, w: W.heading, kind: "law" }, { text: lead, w: W.point, kind: "law" });
      }
      for (const c of ct?.flashcards(sec.id) ?? []) fields.push({ text: `${c.front} — ${c.back}`, w: W.card, kind: "flashcard" });
      for (const q of (ct?.questions(sec.id) ?? []).slice(0, 400)) {
        const k = q.correctAnswer.toUpperCase() as "A" | "B" | "C" | "D";
        fields.push({ text: `${q.question} ${q[`option${k}`] ?? ""}`, w: W.question, kind: "question" });
      }
      // Term weight per section: best field weight, plus a small bonus for repetition.
      const tf = new Map<string, number>();
      for (const f of fields) for (const t of new Set(toks(f.text))) tf.set(t, Math.max(tf.get(t) ?? 0, f.w) + (tf.has(t) ? 0.05 : 0));
      docs.push({ subject, sectionId: sec.id, sectionTitle: sec.title, items: sec.items, fields, tf });
    }
  }
  const df = new Map<string, number>();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
  const out = { docs, df, vocab: [...df.keys()] };
  indexCache.set(key, out);
  return out;
}

/** Variants a query word can match, each with a confidence weight. */
function expand(w: string, last: boolean, vocab: string[], df: Map<string, number>): Map<string, number> {
  const out = new Map<string, number>([[w, 1]]);
  for (const s of SYN_MAP.get(w) ?? []) if (!out.has(s)) out.set(s, 0.85);
  if (!df.has(w) && w.length >= 4) {               // typo tolerance only for unknown words
    const max = w.length >= 8 ? 2 : 1;
    for (const v of vocab) if (Math.abs(v.length - w.length) <= max && v[0] === w[0] && lev(w, v, max) <= max) out.set(v, Math.max(out.get(v) ?? 0, 0.7));
  }
  if (last && w.length >= 3) for (const v of vocab) if (v.startsWith(w) && v !== w) out.set(v, Math.max(out.get(v) ?? 0, 0.75));
  return out;
}

export function searchSyllabus(syllabus: SyllabusSubject[], query: string, limit = 12): SearchHit[] {
  const raw = query.trim(); if (raw.length < 2) return [];
  const { docs, df, vocab } = build(syllabus);
  let q = toks(raw);
  // Compounds: "wind shear" also tries "windshear", "glide slope" → "glideslope".
  const extra: string[] = [];
  for (let i = 0; i + 1 < q.length; i++) { const j = q[i] + q[i + 1]; if (df.has(j) || SYN_MAP.has(j)) extra.push(j); }
  q = [...q, ...extra];
  if (!q.length) return [];
  const N = docs.length;
  const groups = q.map((w, i) => expand(w, i === q.length - 1 - extra.length && !/\s$/.test(query), vocab, df));
  const scored: { d: Doc; s: number }[] = [];
  for (const d of docs) {
    let s = 0, matched = 0;
    groups.forEach((g, gi) => {
      if (gi >= q.length - extra.length) { // compound bonus terms: optional extra credit
        for (const [v, c] of g) { const w = d.tf.get(v); if (w) s += w * c * Math.log(1 + N / (df.get(v) ?? 1)); }
        return;
      }
      let best = 0;
      for (const [v, c] of g) { const w = d.tf.get(v); if (w) best = Math.max(best, w * c * Math.log(1 + N / (df.get(v) ?? 1))); }
      if (best) { s += best; matched++; }
    });
    const need = q.length - extra.length;
    if (!matched) continue;
    s *= Math.pow(matched / need, 2);               // reward covering every word
    const lower = raw.toLowerCase();
    if (d.sectionTitle.toLowerCase().includes(lower)) s *= 1.6;
    else if (d.items.some((it) => it.topic.toLowerCase().includes(lower))) s *= 1.4;
    scored.push({ d, s });
  }
  scored.sort((a, b) => b.s - a.s);
  const top = scored[0]?.s ?? 0;
  const flat = new Set(groups.flatMap((g) => [...g.keys()]));
  return scored.filter((x) => x.s >= top * 0.12).slice(0, limit).map(({ d, s }) => {
    // Best topic inside the section, and the field that explains the match.
    let item = d.items[0], itemScore = -1;
    for (const it of d.items) { const sc = toks(it.topic).filter((t) => flat.has(t)).length; if (sc > itemScore) { itemScore = sc; item = it; } }
    let snippet = "", snipScore = 0;
    for (const f of d.fields) {
      if (f.kind === "section" || f.kind === "subject") continue;
      const sc = toks(f.text).filter((t) => flat.has(t)).length * (f.kind === "question" ? 0.6 : 1);
      if (sc > snipScore) { snipScore = sc; snippet = (f.kind === "question" ? "Exam question: " : f.kind === "flashcard" ? "Flashcard: " : f.kind === "law" ? "CAR: " : "") + f.text; }
    }
    return {
      subjectId: d.subject.id, subjectTitle: d.subject.title, sectionId: d.sectionId, sectionTitle: d.sectionTitle,
      itemId: item?.id, topic: item?.topic, score: Math.round(s * 10) / 10,
      href: `/study/${d.subject.id}/${d.sectionId}${item ? `?item=${item.id}` : ""}`,
      snippet: snippet.length > 160 ? snippet.slice(0, 157) + "…" : snippet,
    };
  });
}
