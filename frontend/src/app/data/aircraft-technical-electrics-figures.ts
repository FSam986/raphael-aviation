// Electrics & Electronics (A.1.3) recreated illustrations, textbook-numbered.
// Shown INLINE in the study slide deck next to the relevant topic. Each figure's
// `topic` must match a NoteBlock heading in aircraft-technical-notes.ts (A.1.3).
// Files live in /public/figures/electrics/ as chNN_MM.png. Culled (text-filled,
// baked-caption, attributed, duplicate or half-cut) figures are removed here and
// their content captured as text in the note blocks.

export interface AtgElecFigureMeta {
  section: string;
  topic: string;
  title: string;
  caption: string;
  file: string;
  id: string;
  folder: string;
}

const E = (topic: string, n: string, title: string): AtgElecFigureMeta => ({
  section: "A.1.3", topic, title, caption: topic, file: `ch${n}.png`, id: `elecfig-ch${n}`, folder: "electrics",
});

export const ATG_ELECTRICS_FIGURES: AtgElecFigureMeta[] = [
  // ── Ch1: DC principles & circuits ──
  E("DC principles & circuits", "01_01", "Structure of an atom"),
  E("DC principles & circuits", "01_02", "Electron flow vs conventional current"),
  E("DC principles & circuits", "01_03", "Voltage drives current (water analogy)"),
  E("DC principles & circuits", "01_04", "Resistor symbols — fixed & variable"),
  E("DC principles & circuits", "01_05", "Series circuit"),
  E("DC principles & circuits", "01_06", "Parallel circuit"),
  E("DC principles & circuits", "01_07", "Series-parallel circuit"),
  E("DC principles & circuits", "01_08", "Kirchhoff's current law"),
  E("DC principles & circuits", "01_09", "Kirchhoff's voltage law"),
];
