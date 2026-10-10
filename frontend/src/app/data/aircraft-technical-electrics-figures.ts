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

  // ── Ch2: Switches & sensors ──
  E("Switches & sensors", "02_01", "Two- and three-position switches"),
  E("Switches & sensors", "02_02", "Guarded & flowbar switch-lights"),
  E("Switches & sensors", "02_03", "Microswitch internals"),
  E("Switches & sensors", "02_04", "Proximity switch / sensor"),
  E("Switches & sensors", "02_05", "Magnetic (variable-reluctance) speed pickup"),
  E("Switches & sensors", "02_06", "Proximity sensors on the landing gear"),

  // ── Ch3: Circuit protection + Capacitors ──
  E("Circuit protection", "03_01", "Fuse construction"),
  E("Circuit protection", "03_02", "High-current fuse (current limiter)"),
  E("Circuit protection", "03_03", "Circuit breaker construction"),
  E("Capacitors", "03_04", "Capacitor construction"),
  E("Capacitors", "03_05", "Capacitor symbols"),
  E("Capacitors", "03_09", "Capacitors in series"),

  // ── Ch4: Batteries ──
  E("Batteries", "04_01", "Basic cell — electrodes & electrolyte"),
  E("Batteries", "04_02", "Dry (primary) cell"),
  E("Batteries", "04_03", "Cells in series vs parallel"),
  E("Batteries", "04_04", "Lead-acid cell construction"),
  E("Batteries", "04_05", "Lead-acid cell chemistry"),
  E("Batteries", "04_09", "Secondary batteries — lead-acid vs alkaline (summary)"),

  // ── Ch5: Magnetism & electromagnetism ──
  E("Magnetism & electromagnetism", "05_01", "Magnetic field patterns & poles"),
  E("Magnetism & electromagnetism", "05_02", "Flux concentration / magnetic screening"),
  E("Magnetism & electromagnetism", "05_03", "Domain theory — un/magnetised/saturated"),
  E("Magnetism & electromagnetism", "05_04", "Field around a current-carrying conductor"),
  E("Magnetism & electromagnetism", "05_05", "Into/out-of-paper current convention"),
  E("Magnetism & electromagnetism", "05_06", "Force between parallel conductors"),
  E("Magnetism & electromagnetism", "05_07", "Solenoid (coil) field"),
  E("Magnetism & electromagnetism", "05_08", "Solenoid vs relay"),
  E("Magnetism & electromagnetism", "05_09", "Motor principle — catapult field"),
];
