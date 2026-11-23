// Solved worked examples for every numerical/plotting topic. Each shows the
// problem, a step-by-step method and the final answer. Keyed by CPL aspect id;
// PPL/IR study sections resolve through the same figure-key maps used elsewhere,
// so a PPL/IR topic sees the matching worked example too.

import { PPL_MET_FIGURE_KEY } from "@/app/data/ppl-met-content";
import { PPL_NAV_FIGURE_KEY } from "@/app/data/ppl-nav-content";
import { PPL_FPP_FIGURE_KEY } from "@/app/data/ppl-fpp-content";
import { PPL_AGK_FIGURE_KEY } from "@/app/data/ppl-agk-content";
import { IR_MET_FIGURE_KEY } from "@/app/data/ir-met-content";
import { IR_FPP_FIGURE_KEY } from "@/app/data/ir-fpp-content";
import { IR_AWO_FIGURE_KEY } from "@/app/data/ir-awo-content";

export interface WorkedExample {
  id: string;
  sectionId: string;
  title: string;
  problem: string;
  steps: string[];   // ordered solution steps; "§ " starts a stage heading
  answer: string;
  given?: string[];  // the data, listed
  find?: string;     // what is asked
  concept?: string;  // the principle / formula and why it works
  check?: string;    // sense check of the answer
  trap?: string;     // the usual mistake
}

const E = (id: string, sectionId: string, title: string, problem: string, steps: string[], answer: string): WorkedExample => ({ id, sectionId, title, problem, steps, answer });

import { FPP_WORKED_EXAMPLES } from "@/app/data/fpp-worked-examples";
import { NAV_WORKED_EXAMPLES } from "@/app/data/nav-worked-examples";
import { RADIONAV_WORKED_EXAMPLES } from "@/app/data/radionav-worked-examples";

export const WORKED_EXAMPLES: WorkedExample[] = [
  ...FPP_WORKED_EXAMPLES,
  ...NAV_WORKED_EXAMPLES,
  ...RADIONAV_WORKED_EXAMPLES,
  // ── Flight Instruments (A.7.x) ──
  E("WEX-A71", "A.7.1", "Altimeter pressure error", "The subscale is set to 1013 hPa and reads 3000 ft. The actual QNH is 1003 hPa. What is your true altitude? (1 hPa ≈ 30 ft.)",
    ["Difference = 1013 − 1003 = 10 hPa; the set value is HIGHER than the actual pressure.", "Error = 10 hPa × 30 ft = 300 ft.", "Flying from higher to lower pressure with a fixed setting, the altimeter OVER-reads.", "True altitude = 3000 − 300 = 2700 ft ('High to Low, look out below')."], "True altitude = 2700 ft"),
  E("WEX-A72", "A.7.2", "Bank angle for a rate-1 turn", "You are cruising at TAS 150 kt. What bank angle gives a rate-1 turn?",
    ["Rule of thumb: bank for rate 1 ≈ (TAS ÷ 10) + 7.", "= (150 ÷ 10) + 7 = 15 + 7 = 22°.", "(Rate 1 = 3°/sec = 360° in 2 minutes.)"], "≈ 22° of bank"),
  E("WEX-A75", "A.7.5", "Ram rise / Total Air Temperature", "TAS 300 kt, static air temperature (SAT) −40°C. Estimate the TAT.",
    ["Ram rise ≈ (TAS ÷ 100)² °C = (300 ÷ 100)² = 3² = 9°C.", "TAT = SAT + ram rise = −40 + 9 = −31°C.", "(The probe reads warmer than the true air because of adiabatic compression.)"], "TAT ≈ −31°C"),

  // ── Meteorology (A.8.x) ──
  E("WEX-A82", "A.8.2", "ISA temperature at altitude", "Using the ISA, what is the temperature at 20 000 ft?",
    ["ISA MSL = +15°C; lapse rate = 2°C per 1000 ft up to the tropopause.", "Drop = 2 × 20 = 40°C.", "Temperature = 15 − 40 = −25°C."], "−25°C"),
  E("WEX-A87", "A.8.7", "Pressure altitude from QNH", "An aerodrome has elevation 1000 ft and QNH 1030 hPa. What pressure altitude will the altimeter show when you set 1013? (1 hPa ≈ 30 ft.)",
    ["Pressure altitude = elevation + (1013 − QNH) × 30.", "= 1000 + (1013 − 1030) × 30.", "= 1000 + (−17 × 30) = 1000 − 510 = 490 ft."], "Pressure altitude ≈ 490 ft"),
  E("WEX-A810", "A.8.10", "Convective cloud base", "Surface temperature 20°C, surface dew point 10°C. Estimate the base of convective (cumulus) cloud.",
    ["Temperature/dew-point spread = 20 − 10 = 10°C.", "Cloud base (ft AGL) = spread ÷ 2.5 × 1000.", "= 10 ÷ 2.5 × 1000 = 4000 ft AGL."], "≈ 4000 ft AGL"),

  // ── General Radiotelephony (GR) ──
  E("WEX-GR1", "GR1", "VHF line-of-sight range", "An aircraft at 3600 ft talks to a tower antenna at 100 ft. What is the maximum VHF range?",
    ["Formula: range(NM) ≈ 1.25 (√h₁ + √h₂), feet.", "√3600 = 60, √100 = 10.", "Range = 1.25 × (60 + 10) = 1.25 × 70 = 87.5 NM."], "≈ 87.5 NM"),

  // ── ISA deviation (Met + Flight Planning) ──
  E("WEX-ISADEV-82", "A.8.2", "ISA deviation", "At FL180 the outside air temperature is −10°C. What is the ISA deviation?",
    ["ISA temperature at a level = 15 − (2 × altitude in thousands of ft), to the tropopause.", "ISA temp at 18 000 ft = 15 − (2 × 18) = 15 − 36 = −21°C.", "ISA deviation = actual OAT − ISA temp = −10 − (−21) = +11°C.", "Report it as ISA +11 (the air is warmer than standard)."], "ISA +11°C"),
  // ── Direction: True / Magnetic / Compass ──
  E("WEX-TMC", "A.9.2", "True → Magnetic → Compass", "True track 090°, variation 10°W, deviation 2°E. Find the compass heading to steer.",
    ["Variation West → Magnetic Best (add West variation): Magnetic = 090 + 10 = 100°.", "Deviation East → Compass Least (subtract East deviation): Compass = 100 − 2 = 098°.", "(Memory: 'Variation West, Magnetic best; Deviation East, Compass least.')"], "Compass 098°"),

  // ── Wind components ──
  E("WEX-XWIND", "A.9.7", "Head & crosswind components", "Landing on runway 09 (heading 090°). The wind is 120°/20 kt. Find the headwind and crosswind components.",
    ["Angle between wind and runway = 120 − 090 = 30°.", "Headwind = wind × cos(angle) = 20 × cos 30° = 20 × 0.87 = 17.3 kt.", "Crosswind = wind × sin(angle) = 20 × sin 30° = 20 × 0.5 = 10 kt.", "(Rule-of-thumb clock: 30° ≈ ½ crosswind, 45° ≈ 0.7, 60°+ ≈ full.)"], "Headwind 17 kt · Crosswind 10 kt"),

  // ── Mass & balance: %MAC ──
  E("WEX-MAC", "A.4.12", "CG as a percentage of MAC", "The MAC is 2.0 m and its leading edge (LEMAC) is 3.0 m aft of the datum. The CG is at 3.5 m. Find the CG in %MAC.",
    ["Distance of CG aft of LEMAC = 3.5 − 3.0 = 0.5 m.", "%MAC = (CG aft of LEMAC ÷ MAC) × 100 = (0.5 ÷ 2.0) × 100 = 25%.", "Check 25% lies within the %MAC limits."], "CG = 25% MAC"),

  // ── Fuel: mass ↔ volume (specific gravity) ──
  E("WEX-FUELSG", "A.4.13", "Fuel mass ↔ litres (specific gravity)", "You need 300 kg of fuel with a specific gravity of 0.72. How many litres must you uplift?",
    ["Relationship: mass (kg) = volume (L) × SG.", "So volume = mass ÷ SG = 300 ÷ 0.72.", "= 417 litres.", "(Higher SG = denser fuel = more kg per litre. Colder fuel is denser.)"], "≈ 417 litres"),

  // ── Climb gradient ──
  E("WEX-GRAD", "A.4.7", "Climb gradient from ROC & groundspeed", "You are climbing at 500 ft/min with a groundspeed of 100 kt. What is the climb gradient?",
    ["Distance covered per minute = 100 kt = 100 ÷ 60 = 1.67 NM/min.", "Height gained per NM = ROC ÷ distance/min = 500 ÷ 1.67 = 300 ft/NM.", "As a percentage: 300 ft ÷ 6076 ft × 100 ≈ 4.9%.", "(Obstacle clearance is assessed on the gross/net gradient.)"], "≈ 300 ft/NM (≈ 4.9%)"),

  // ── Top of descent ──
  E("WEX-TOD", "A.4.7", "Top of descent distance", "You must descend 12 000 ft on a 3° path (≈ 300 ft per NM). How far out do you start down?",
    ["A 3° path loses ≈ 300 ft per NM.", "Distance = height to lose ÷ 300 = 12 000 ÷ 300 = 40 NM.", "(Rule of thumb: distance ≈ height (ft) ÷ 300, or flight-level ÷ 3.)"], "≈ 40 NM before the point"),
];

const KEY_MAPS = [PPL_MET_FIGURE_KEY, PPL_NAV_FIGURE_KEY, PPL_FPP_FIGURE_KEY, PPL_AGK_FIGURE_KEY, IR_MET_FIGURE_KEY, IR_FPP_FIGURE_KEY, IR_AWO_FIGURE_KEY];

export function getWorkedExamplesBySection(sectionId: string): WorkedExample[] {
  const direct = WORKED_EXAMPLES.filter((e) => e.sectionId === sectionId);
  if (direct.length) return direct;
  for (const map of KEY_MAPS) {
    const mapped = map[sectionId];
    if (mapped) {
      const via = WORKED_EXAMPLES.filter((e) => e.sectionId === mapped);
      if (via.length) return via;
    }
  }
  return [];
}
