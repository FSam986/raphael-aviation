// Flight Planning & Performance (A.4) recreated illustrations (CPL FPP figure
// library — already clean, no baked captions). Shown INLINE in the study slide
// deck next to the relevant topic. Each figure's `topic` must match a figureTopics
// entry on a NoteBlock in fpp-notes.ts. Files: /public/figures/fpp/ as
// fig_CC_NN.png. Reference-only pages (AIP table extracts, blank flight-plan
// forms, exercises) are not included.

export interface FppFigureMeta {
  section: string;
  topic: string;
  title: string;
  caption: string;
  file: string;
  id: string;
  folder: string;
}

const F = (section: string, topic: string, n: string, title: string): FppFigureMeta => ({
  section, topic, title, caption: topic, file: `fig_${n}.png`, id: `fppfig-${n}`, folder: "fpp",
});

export const FPP_FIGURES: FppFigureMeta[] = [
  // Ch3 — Nautical air miles (A.4.11 specific range)
  F("A.4.11", "Nautical air miles", "03_01", "Air distance vs ground distance"),
  F("A.4.11", "Nautical air miles", "03_02", "NAM less than NGM (tailwind)"),
  // Ch13 — Point of Equal Time (A.4.13)
  F("A.4.13", "PET", "13_01", "All-engine point of equal time"),
  F("A.4.13", "PET", "13_04", "Engine-failure PET (drift-down)"),
  // Ch14 — Point of Safe Return (A.4.13)
  F("A.4.13", "PSR", "14_01", "Point of safe return — concept"),
  F("A.4.13", "PSR", "14_02", "PSR formula derivation"),
  F("A.4.13", "PSR", "14_03", "PSR on the navigation computer"),
];
void F;
