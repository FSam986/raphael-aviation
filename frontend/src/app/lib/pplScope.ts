// PPL syllabus scope guard. PPL content partly reuses CPL notes/questions; this
// removes anything on a topic the PPL (aeroplane) syllabus does not list —
// checked against docs/PPL-Combined-Syllabus.pdf: no turbine/jet engines,
// multi-engine/asymmetric flight, V1/accelerate-stop, PET/PNR, Mach/high-speed,
// pressurisation systems, autopilot/FD/EFIS/FMS, Part 121/135 air transport,
// AC electrics, ILS/localiser/glide slope or RNAV. (VOR/ADF/DME/GPS, transponder,
// non-pressurised oxygen, TODA/stopway/clearway, constant-speed props ARE in it.)
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

export const PPL_OUT_OF_SCOPE = new RegExp(
  "\\b(" + [
    "turbines?", "turbojets?", "turbofans?", "turboprops?", "gas turbine", "jet (engines?|aircraft|transport|airliners?)", "jet-powered",
    "compressor stall", "bypass ratio", "multi-?engined?", "twin-?engined?", "asymmetric", "critical engine", "VMCA?",
    "V1", "balanced field", "accelerate-(stop|go)", "ASDA", "screen height", "point of no return", "equal time point", "PNR", "PET",
    "mach( number| tuck)?", "swept[- ]wings?", "transonic", "shock waves?", "(?<!non-)pressuri[sz](ed|ation) (cabin|aircraft|aeroplane|system)",
    "cabin pressur\\w*", "outflow valve", "autopilots?", "auto-?throttle", "flight directors?", "EFIS", "FMS",
    "Part 121", "Part 135", "air operator certificate", "ATPL", "alternating current", "AC generators?", "constant speed drive",
    "transformer rectifiers?", "RNAV", "RNP", "area navigation", "ILS", "locali[sz]ers?", "glide ?(slope|path)s?",
    "performance class", "class [AB] aeroplanes?", "CAP 69[78]", "MEP1", "SEP1", "MRJT",
  ].join("|") + ")\\b",
  "i",
);
const out = (s?: string) => !!s && PPL_OUT_OF_SCOPE.test(s);

export const pplQuestionInScope = (q: { question: string; optionA: string; optionB: string; optionC: string; optionD: string; explanation?: string }) =>
  ![q.question, q.optionA, q.optionB, q.optionC, q.optionD, q.explanation].some(out);

export const pplCardInScope = (c: { front: string; back: string }) => !out(c.front) && !out(c.back);

/** Drop out-of-scope points; drop blocks whose heading is out of scope or that end up empty. */
export function pplNoteInScope(n: AirLawSectionNote | undefined): AirLawSectionNote | undefined {
  if (!n) return n;
  const blocks = n.blocks
    .filter((b) => !out(b.heading))
    .map((b) => {
      // A "§ sub-heading" that is out of scope removes its whole sub-section.
      const pts: string[] = [];
      let skip = false;
      for (const p of b.points) {
        if (p.startsWith("§ ")) { skip = out(p); if (!skip) pts.push(p); continue; }
        if (!skip && !out(p)) pts.push(p);
      }
      while (pts.length && pts[pts.length - 1].startsWith("§ ")) pts.pop();
      return { ...b, points: pts };
    })
    .filter((b) => b.points.some((p) => !p.startsWith("§ ")));
  return { ...n, intro: n.intro, blocks, mustKnow: n.mustKnow.filter((s) => !out(s)), traps: n.traps.filter((s) => !out(s)) };
}
