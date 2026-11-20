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
  R("A.10.1", "Radio waves & propagation", "1964", "Wave period & wavelength"),
  R("A.10.1", "Frequency bands", "12037", "Amplitude vs frequency modulation"),
  // A.10.2 — ADF/NDB & bearings
  R("A.10.2", "ADF / NDB", "13186", "Radio magnetic indicator (RMI)"),
  R("A.10.2", "ADF / NDB", "12044", "QDM, QDR & QTE (VDF)"),
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
  R("A.10.5", "Primary radar & SSR", "12041", "Radar beam illuminating the ground"),
  R("A.10.5", "Primary radar & SSR", "13234", "Antenna feed types"),
  // Added original figures (illustrations/gen_rn2.py)
  R("A.10.1", "Radio waves & propagation", "x01", "Frequency and wavelength"),
  R("A.10.1", "Frequency bands", "x02", "Radio frequency bands and their navigation aids"),
  R("A.10.1", "Radio waves & propagation", "x03", "Ground wave, sky wave and space wave"),
  R("A.10.1", "Radio waves & propagation", "x04", "VHF line-of-sight range"),
  R("A.10.2", "ADF / NDB", "x05", "ADF bearings — relative bearing to QDM"),
  R("A.10.2", "ADF / NDB", "x06", "ADF errors"),
  R("A.10.3", "VOR", "x07", "VOR TO / FROM indication"),
  R("A.10.3", "ILS", "x08", "ILS coverage"),
  R("A.10.3", "ILS", "x09", "Glide path — height and rate of descent"),
  R("A.10.4", "DME", "x10", "DME slant range"),
  R("A.10.5", "Primary radar & SSR", "x11", "Primary radar — range and PRF"),
  R("A.10.7", "SSR", "x12", "SSR — interrogation and reply"),
  R("A.10.8", "Weather radar", "x13", "Weather radar tilt"),
  R("A.10.9", "Radio altimeter", "x14", "Radio altimeter principle"),
  R("A.10.12", "GNSS / GPS", "x15", "GNSS position fix"),
  R("A.10.11", "RNAV", "x16", "RNAV waypoint from VOR/DME (rho-theta)"),
  R("A.10.11", "RNAV", "x17", "RNP — navigation accuracy"),
  R("A.10.10", "ELT", "x18", "ELT and Cospas-Sarsat"),
];
void R;
