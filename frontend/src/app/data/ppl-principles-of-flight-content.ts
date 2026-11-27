// PPL Principles of Flight study content — reuses the CPL aerodynamics material.
// The CPL subject keeps aerodynamics as a single section (A.1.8 "Subsonic
// Aerodynamics") in the Aircraft Technical notes; its blocks already cover lift,
// drag, the stall, high-lift devices, stability and load factor — the whole PPL
// PoF syllabus (11.1–11.13) at PPL depth. So every PPL PoF section reuses A.1.8.

import { pickPplNote } from "@/app/data/ppl-pick";

// Each PPL PoF section (11.x) shows exactly the CPL blocks for its PPL topics.
const POF: Record<string, [string, string[]]> = {
  "11.1": ["The Atmosphere", ["A.8.2", "A.1.8#Laws and definitions"]],
  "11.2": ["Lift", ["A.1.8#Laws and definitions|Airspeeds|Lift —|Aerofoil definitions|Pressure distribution|Shape of an aerofoil"]],
  "11.3": ["Drag", ["A.1.8#Drag —|Induced drag|The drag formula|Shape of an aerofoil"]],
  "11.4": ["Thrust", ["A.1.8#Thrust"]],
  "11.5": ["Flying Controls", ["A.1.8#Flying controls|Control balancing|Adverse aileron yaw"]],
  "11.6": ["Trimming Controls", ["A.1.8#Trimming control"]],
  "11.7": ["Flaps & Slats", ["A.1.8#Lift augmentation"]],
  "11.8": ["Flight Mechanics", ["A.1.8#Straight and level|Climbing|Descending|Turning|Ground effect"]],
  "11.9": ["The Stall", ["A.1.8#Stalling|The stall speed"]],
  "11.10": ["Avoidance of Spins", ["A.1.8#Wing-tip stalling|Spinning"]],
  "11.11": ["Stability", ["A.1.8#Stability"]],
  "11.12": ["Load Factor & Manoeuvres", ["A.4.2#The categories|The V-n diagram", "A.1.8#Turning"]],
  "11.13": ["Stress Loads on the Ground", ["A.1.2#Loads & strength|Landing gear"]],
};

export function getPPLPofNoteBySection(pplSection: string) {
  const e = POF[pplSection];
  return e ? pickPplNote(pplSection, e[0], e[1]) : undefined;
}

// Reuse the CPL subsonic-aerodynamics illustration on the aerodynamics-heavy
// PoF sections so the Illustrations tab is populated (A.1.8 figure).

export { PPL_POF_FIGURE_KEY } from "./figure-keys";
