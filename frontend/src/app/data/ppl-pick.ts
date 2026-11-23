// PPL study notes built from hand-picked CPL topic blocks.
// A PPL section lists exactly which CPL blocks cover its PPL-syllabus topics
// ("A.1.8#Stalling" = blocks of CPL A.1.8 whose heading starts with "Stalling").
// Replaces the old "first half of each mapped CPL note" cut-off, which picked
// the wrong topics once the CPL notes were written in full.

import type { AirLawSectionNote, AirLawNoteBlock } from "./airlaw-notes";
import { getAircraftTechnicalNote } from "./aircraft-technical-notes";
import { getFPPNoteBySection } from "./fpp-notes";
import { getHumanPerformanceNote } from "./human-performance-notes";
import { getInstrumentsNoteBySection } from "./instruments-notes";
import { getNoteBySection as getMetNote } from "./met-notes";
import { getNavNoteBySection } from "./nav-notes";
import { getRadioNavNoteBySection } from "./radionav-notes";
import { getAirLawNoteBySection } from "./airlaw-notes";

type Note = AirLawSectionNote;

export function cplNote(id: string): Note | undefined {
  const s = id.split(".")[1];
  const n =
    s === "1" ? getAircraftTechnicalNote(id) :
    s === "3" ? getAirLawNoteBySection(id) :
    s === "4" ? getFPPNoteBySection(id) :
    s === "6" ? getHumanPerformanceNote(id) :
    s === "7" ? getInstrumentsNoteBySection(id) :
    s === "8" ? getMetNote(id) :
    s === "9" ? getNavNoteBySection(id) :
    s === "10" ? getRadioNavNoteBySection(id) : undefined;
  return n as Note | undefined;
}

const words = (t: string) => t.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 4);

/** Build a PPL note from block specs: "A.1.8" (all blocks) or "A.1.8#Prefix|Other prefix". */
export function pickPplNote(sectionId: string, title: string, specs: string[]): Note | undefined {
  const blocks: AirLawNoteBlock[] = [];
  const sources: Note[] = [];
  for (const spec of specs) {
    const [id, pref] = spec.split("#");
    const n = cplNote(id);
    if (!n) continue;
    sources.push(n);
    const prefixes = pref ? pref.split("|") : null;
    for (const b of n.blocks as AirLawNoteBlock[]) {
      if (!prefixes || prefixes.some((p) => b.heading.startsWith(p))) blocks.push(b);
    }
  }
  if (!blocks.length) return undefined;
  // Keep only the key facts / traps that relate to the picked blocks.
  const text = new Set(words(blocks.map((b) => b.heading + " " + b.points.join(" ")).join(" ")));
  const relevant = (s: string) => { const w = words(s); return w.length > 0 && w.filter((x) => text.has(x)).length / w.length >= 0.6; };
  const intro = sources.length === 1 && !specs[0].includes("#") ? sources[0].intro
    : `${title} — the PPL syllabus topics for this section, taught from the full study text.`;
  return {
    sectionId,
    title,
    intro,
    blocks,
    mustKnow: sources.flatMap((n) => n.mustKnow).filter(relevant),
    traps: sources.flatMap((n) => n.traps).filter(relevant),
  };
}
