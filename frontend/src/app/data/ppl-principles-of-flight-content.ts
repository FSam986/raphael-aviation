// PPL Principles of Flight study content — reuses the CPL aerodynamics material.
// The CPL subject keeps aerodynamics as a single section (A.1.8 "Subsonic
// Aerodynamics") in the Aircraft Technical notes; its blocks already cover lift,
// drag, the stall, high-lift devices, stability and load factor — the whole PPL
// PoF syllabus (11.1–11.13) at PPL depth. So every PPL PoF section reuses A.1.8.

import { getAircraftTechnicalNote } from "@/app/data/aircraft-technical-notes";

// Every PPL PoF section (11.x) is covered by CPL A.1.8 subsonic aerodynamics.
export function getPPLPofNoteBySection(pplSection: string) {
  if (!/^11\./.test(pplSection)) return undefined;
  return getAircraftTechnicalNote("A.1.8");
}

// Reuse the CPL subsonic-aerodynamics illustration on the aerodynamics-heavy
// PoF sections so the Illustrations tab is populated (A.1.8 figure).
export const PPL_POF_FIGURE_KEY: Record<string, string> = {
  "11.2": "A.1.8", "11.3": "A.1.8", "11.8": "A.1.8", "11.9": "A.1.8", "11.12": "A.1.8",
};
