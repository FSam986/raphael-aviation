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
];
void N;
