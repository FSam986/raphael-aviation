// Air Law (A.3) recreated illustrations — a curated set of clean conceptual
// diagrams from the CAE Oxford ATPL Air Law figure library (page-extracted,
// mostly text/regulations, so heavily triaged). Shown INLINE in the study slide
// deck. Each figure's `topic` must match a figureTopics entry on a NoteBlock in
// airlaw-notes.ts. Files live in /public/figures/airlaw/ as al_<n>.png.

export interface AirLawFigureMeta {
  section: string;
  topic: string;
  title: string;
  caption: string;
  file: string;
  id: string;
  folder: string;
}

const A = (section: string, topic: string, n: string, title: string): AirLawFigureMeta => ({
  section, topic, title, caption: topic, file: `al_${n}.png`, id: `alfig-${n}`, folder: "airlaw",
});

export const AIRLAW_FIGURES: AirLawFigureMeta[] = [
  // A.3.6 — rules of the air: semi-circular cruising-levels rule
  A("A.3.6", "Cruising levels", "126_01", "Semi-circular cruising levels (up to FL290)"),
  A("A.3.6", "Cruising levels", "126_02", "Cruising levels above FL290 (RVSM)"),
  // A.3.16 — altimetry: transition altitude / level / layer
  A("A.3.16", "Altimetry & transition", "229_01", "Transition altitude — QNH to SPS"),
  A("A.3.16", "Altimetry & transition", "230_01", "Transition level — SPS to QNH"),
  A("A.3.16", "Altimetry & transition", "231_01", "Transition layer"),
  // A.3.18 — aerodromes: declared distances
  A("A.3.18", "Declared distances", "381_01", "Declared distances — TORA, TODA, ASDA, LDA"),
  // A.3.18 — aerodromes: visual aids (markings, lights, signs)
  A("A.3.18", "Visual aids", "407_01", "Runway-holding-point markings (pattern A)"),
  A("A.3.18", "Visual aids", "411_01", "Aerodrome signs — mandatory & information"),
  A("A.3.18", "Visual aids", "433_01", "PAPI — approach slope indications"),
  A("A.3.18", "Visual aids", "434_01", "VASI — approach slope indications"),
  // Added original figures (A.3)
  A("A.3.6", "Right of way", "x01", "Right of way — converging, head-on, overtaking"),
  A("A.3.6", "Right of way", "x02", "Right of way — order of precedence"),
  A("A.3.6", "Signals & radio failure", "x03", "ATC light signals — aircraft in flight"),
  A("A.3.6", "Signals & radio failure", "x04", "ATC light signals — aircraft on the ground"),
  A("A.3.6", "Signals & radio failure", "x05", "Transponder emergency codes"),
  A("A.3.6", "Minimum heights", "x06", "Minimum heights — congested areas and elsewhere"),
  A("A.3.16", "Altimetry & transition", "x07", "Altimeter settings — QFE, QNH and standard"),
  A("A.3.16", "Airspace", "x08", "Controlled airspace structure — CTR, TMA, airways"),
  A("A.3.16", "Airspace", "x09", "ICAO airspace classes and services"),
  A("A.3.1", "Accidents & incidents", "x10", "Accident, serious incident or incident?"),
  A("A.3.18", "Visual aids", "x11", "Runway markings"),
  A("A.3.18", "Visual aids", "x12", "Runway and taxiway lighting colours"),
  A("A.3.18", "Visual aids", "x13", "Ground signals in the signals area"),
  A("A.3.18", "Visual aids", "x14", "Marshalling signals (selected)"),
  A("A.3.18", "Visual aids", "x15", "Runway designation"),
  A("A.3.18", "Declared distances", "x16", "Runway strip, RESA, stopway and clearway"),
  A("A.3.17", "Enroute minimum altitudes", "x17", "MEA, MOCA and grid MORA"),
  A("A.3.7", "Dangerous goods", "x18", "Dangerous goods — the nine classes"),
];
void A;
