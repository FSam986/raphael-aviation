// Radio Navigation (A.10) recreated illustrations — a curated subset of the real
// figures extracted from the radio-nav library (the raw folder held ~30k embedded
// glyphs; only ~49 were true figures). Shown INLINE in the study slide deck. Each
// figure's `topic` must match a figureTopics entry on a NoteBlock in
// radionav-notes.ts. Files: /public/figures/radionav/ as rn_<n>.png.

export interface RnFigureMeta {
  section: string;
  topic: string;
  title: string;
  caption: string;
  file: string;
  id: string;
  folder: string;
}

const R = (section: string, topic: string, n: string, title: string): RnFigureMeta => ({
  section, topic, title, caption: topic, file: `rn_${n}.png`, id: `rnfig-${n}`, folder: "radionav",
});

export const RADIONAV_FIGURES: RnFigureMeta[] = [
  // A.10.1 — radio waves & modulation
  R("A.10.1", "Radio waves", "1964", "Wave period & wavelength"),
  R("A.10.1", "Modulation", "12037", "Amplitude vs frequency modulation"),
  // A.10.2 — ADF/NDB & bearings
  R("A.10.2", "ADF / NDB", "13186", "Radio magnetic indicator (RMI)"),
  R("A.10.2", "Radio bearings (Q-codes)", "12044", "QDM, QDR & QTE (VDF)"),
  // A.10.3 — VOR
  R("A.10.3", "VOR", "1965", "Phase comparison — reference & variable"),
  R("A.10.3", "VOR", "13192", "Cone of confusion over the VOR"),
  R("A.10.3", "VOR", "13193", "VOR CDI / OBS display"),
  R("A.10.3", "VOR", "13197", "Tracking a VOR radial"),
  R("A.10.3", "VOR", "13201", "VOR course deviation"),
  // A.10.3 — ILS
  R("A.10.3", "ILS", "12038", "ILS localizer (90/150 Hz lobes)"),
  R("A.10.3", "ILS", "13216", "Marker-beacon patterns"),
  R("A.10.3", "ILS", "13217", "ILS approach profile"),
  // A.10.6 — radar
  R("A.10.6", "Radar", "12041", "Radar beam illuminating the ground"),
  R("A.10.6", "Radar", "13234", "Antenna feed types"),
];
void R;
