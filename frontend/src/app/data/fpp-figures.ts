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
  // Mass & Balance (A.4.12)
  F("A.4.12", "Mass & balance", "mb_2_2", "Balance arms — datum, CG & moment"),
  F("A.4.12", "Mass & balance", "mb_2_10", "CG envelope (weight vs CG)"),
  F("A.4.12", "Mass & balance", "mb_2_12", "Repositioning mass — CG shift"),
  F("A.4.12", "Mass & balance", "mb_2_15", "Adding or removing mass"),
  F("A.4.12", "Mass & balance", "mb_2_19", "Stabilizer trim vs CG (%MAC)"),
  // Performance — take-off & landing distances (A.4.5)
  F("A.4.5", "Take-off & landing distances", "pf_2_4", "Declared distances (TORA/ASDA/TODA)"),
  F("A.4.5", "Take-off & landing distances", "pf_2_11", "Forces during the take-off run"),
  F("A.4.5", "Take-off & landing distances", "pf_6_7", "Runway contamination & stopping distance"),
  // Performance — climb, descent & cruise (A.4.7)
  F("A.4.7", "Climb & descent", "pf_4_14", "Wind effect on descent angle & range"),
  F("A.4.7", "Cruise & range", "pf_5_5", "Thrust/drag curve — min & max speed"),
  F("A.4.7", "Cruise & range", "pf_5_10", "CAS, TAS & Mach with altitude"),
  // Performance — Class A (A.4.1)
  F("A.4.1", "Class A performance", "pf_14_1", "Ideal V1 (balanced field length)"),
];
void F;
