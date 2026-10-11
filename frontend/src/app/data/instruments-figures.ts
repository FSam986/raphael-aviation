// Flight Instruments (A.7) recreated illustrations (CPL Instrumentation figure
// library — already clean, no baked captions). Shown INLINE in the study slide
// deck next to the relevant topic. Each figure's `topic` must match a figureTopics
// entry on a NoteBlock in instruments-notes.ts. Files: /public/figures/instruments/
// as fig_CC_NN.png. Chapters outside the CPL A.7 syllabus (INS, IRS, Basic
// Computers, FANS) are not included.

export interface InsFigureMeta {
  section: string;
  topic: string;
  title: string;
  caption: string;
  file: string;
  id: string;
  folder: string;
}

const I = (section: string, topic: string, n: string, title: string): InsFigureMeta => ({
  section, topic, title, caption: topic, file: `fig_${n}.png`, id: `insfig-${n}`, folder: "instruments",
});

export const INSTRUMENTS_FIGURES: InsFigureMeta[] = [
  // Ch1 — Characteristics & general definitions (A.7.1)
  I("A.7.1", "Instrument displays & scales", "01_01", "Linear circular scale"),
  I("A.7.1", "Instrument displays & scales", "01_02", "Non-linear circular scale"),
  I("A.7.1", "Instrument displays & scales", "01_03", "Single-pointer airspeed with drum"),
  I("A.7.1", "Instrument displays & scales", "01_04", "Pointer + counter airspeed display"),
  I("A.7.1", "Instrument displays & scales", "01_05", "Revolution counter (RPM %)"),
  I("A.7.1", "Instrument displays & scales", "01_07", "The 'basic six' layout"),
  I("A.7.1", "Instrument displays & scales", "01_08", "The 'basic T' layout"),
  I("A.7.1", "Instrument displays & scales", "01_09", "Light-twin instrument panel (Seneca)"),
  I("A.7.1", "Instrument displays & scales", "01_10", "An analogue altimeter"),
  I("A.7.1", "Instrument displays & scales", "01_11", "Combined digital/analogue display"),
  I("A.7.1", "Instrument displays & scales", "01_12", "Traditional analogue flight deck"),
  I("A.7.1", "Instrument displays & scales", "01_13", "Modern glass flight deck (B787)"),
  I("A.7.1", "Instrument displays & scales", "01_14", "Electronic panel — light aircraft"),
  I("A.7.1", "Instrument displays & scales", "01_15", "Colour operating ranges on gauges"),

  // Ch2 — Pitot & static sources (A.7.1)
  I("A.7.1", "Pitot-static system", "02_01", "Pressure heads — pitot vs static"),
  I("A.7.1", "Pitot-static system", "02_02", "Combined pitot/static head (cutaway)"),
  I("A.7.1", "Pitot-static system", "02_04", "Flush static vent"),
  I("A.7.1", "Pitot-static system", "02_05", "Pitot/static probe installation"),
  I("A.7.1", "Pitot-static system", "02_06", "Static source selector valves (normal/alternate)"),
];
void I;
