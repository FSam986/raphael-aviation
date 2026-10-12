// General Navigation (A.9) recreated illustrations — a curated subset from the
// (large, un-manifested) nav figure library, chosen to complement the existing
// SVG infographics. Shown INLINE in the study slide deck. Each figure's `topic`
// must match a figureTopics entry on a NoteBlock in nav-notes.ts. Files live in
// /public/figures/nav/ as nav_<page>_figure_<nn>.png.

export interface NavFigureMeta {
  section: string;
  topic: string;
  title: string;
  caption: string;
  file: string;
  id: string;
  folder: string;
}

const N = (section: string, topic: string, n: string, title: string): NavFigureMeta => ({
  section, topic, title, caption: topic, file: `nav_${n}.png`, id: `navfig-${n}`, folder: "nav",
});

export const NAV_FIGURES: NavFigureMeta[] = [
  N("A.9.1", "Earth & direction", "016_figure_02", "Latitude — angle from the equator"),
  N("A.9.5", "Chart projections", "290_figure_01", "Map projection — light-source principle"),
  N("A.9.5", "Chart projections", "357_figure_01", "Lambert conformal conic — standard parallels"),
  N("A.9.6", "Relative velocity", "132_figure_01", "Drift across a current (relative motion)"),
  N("A.9.7", "Nav computer", "085_figure_03", "CRP-5 navigation computer"),
  N("A.9.8", "1-in-60 rule", "198_figure_01", "The 1-in-60 triangle"),
  // A.9.1 — Earth & direction
  N("A.9.1", "Earth & direction", "010_figure_01", "Direction on the Earth"),
  N("A.9.1", "Earth & direction", "015_figure_01", "The graticule — parallels & meridians"),
  N("A.9.1", "Earth & direction", "017_figure_01", "Geocentric vs geodetic latitude"),
  N("A.9.1", "Earth & direction", "018_figure_02", "Longitude — east & west of Greenwich"),
  // A.9.1 — Great circle & rhumb line
  N("A.9.1", "Great circle & rhumb line", "013_figure_01", "Great circle — shortest distance"),
  N("A.9.1", "Great circle & rhumb line", "022_figure_01", "Great-circle vertex"),
  N("A.9.1", "Great circle & rhumb line", "030_figure_01", "Great circle vs rhumb line (polar)"),
  N("A.9.1", "Great circle & rhumb line", "034_figure_01", "GC bulges toward the nearer pole"),
  // A.9.1 — Convergency
  N("A.9.1", "Convergency", "246_figure_01", "Meridians converge toward the pole"),
  N("A.9.1", "Convergency", "248_figure_01", "Convergency at mid-latitude"),
  N("A.9.1", "Convergency", "249_figure_02", "Convergency & great-circle direction"),
  N("A.9.1", "Convergency", "257_figure_01", "Conversion angle"),
  // A.9.2 — North references
  N("A.9.2", "North references", "051_figure_01", "The Earth's magnetic field"),
  N("A.9.2", "North references", "052_figure_02", "Variation & the agonic line"),
  N("A.9.2", "North references", "053_figure_01", "Variation near the poles"),
  N("A.9.2", "North references", "066_figure_02", "True, magnetic & compass heading"),
  // A.9.2 — Radio bearings
  N("A.9.2", "Radio bearings", "487_figure_01", "True, magnetic & relative bearing"),
  // A.9.3 — Units & conversions
  N("A.9.3", "Units & conversions", "080_figure_01", "The circular slide-rule principle"),
  // A.9.4 — Time
  N("A.9.4", "Time", "390_figure_01", "Sidereal vs apparent solar day"),
  N("A.9.4", "Time", "391_figure_01", "The equation of time"),
  N("A.9.4", "Time", "401_figure_01", "LMT varies with longitude"),
  N("A.9.4", "Time", "405_figure_01", "Standard time zones"),
  N("A.9.4", "Time", "409_figure_01", "The International Date Line"),
  // A.9.4 — Seasons & sun
  N("A.9.4", "Seasons & sun", "386_figure_02", "Earth's orbit — perihelion & aphelion"),
  N("A.9.4", "Seasons & sun", "387_figure_01", "The Earth's axial tilt"),
  N("A.9.4", "Seasons & sun", "387_figure_02", "Solstices & equinoxes"),
  N("A.9.4", "Seasons & sun", "389_figure_01", "The sun's declination over the year"),
  N("A.9.4", "Seasons & sun", "427_figure_01", "Day, night & the terminator"),
  // A.9.5 — Chart projections (polar stereographic)
  N("A.9.5", "Chart projections", "290_figure_03", "Polar stereographic chart"),
  // A.9.5 — Mercator chart
  N("A.9.5", "Mercator chart", "291_figure_02", "Mercator — the cylindrical projection"),
  N("A.9.5", "Mercator chart", "300_figure_02", "Mercator latitude-scale expansion"),
  N("A.9.5", "Mercator chart", "304_figure_01", "Mercator area exaggeration at high latitude"),
  N("A.9.5", "Mercator chart", "306_figure_01", "Great circle vs rhumb line on Mercator"),
  N("A.9.5", "Mercator chart", "032_figure_01", "GC vs RL on a Mercator chart (route)"),
  // A.9.5 — Lambert chart
  N("A.9.5", "Lambert chart", "292_figure_02", "The conic projection"),
  N("A.9.5", "Lambert chart", "344_figure_01", "Lambert convergence factor"),
  N("A.9.5", "Lambert chart", "348_figure_01", "Lambert scale & the standard parallels"),
  N("A.9.5", "Lambert chart", "351_figure_02", "Great circle ≈ straight line on Lambert"),
  // A.9.6 — Relative velocity
  N("A.9.6", "Relative velocity", "132_figure_02", "Drift across a current — the solution"),
  N("A.9.6", "Relative velocity", "165_figure_01", "Two tracks from a point (relative motion)"),
  N("A.9.6", "Relative velocity", "181_figure_02", "Crosswind & headwind components"),
  // A.9.7 — Triangle of velocities
  N("A.9.7", "Triangle of velocities", "134_figure_02", "The triangle of velocities"),
  // A.9.8 — 1-in-60 rule
  N("A.9.8", "1-in-60 rule", "205_figure_03", "Track error (track made good vs planned)"),
  N("A.9.8", "1-in-60 rule", "207_figure_03", "Regaining track with the 1-in-60 rule"),
  N("A.9.8", "1-in-60 rule", "217_figure_01", "1-in-60 applied to descent gradient"),
  // A.9.8 — Fixing & nav
  N("A.9.8", "Fixing & nav", "489_figure_02", "Fix by position lines (the 'cocked hat')"),
];
void N;
