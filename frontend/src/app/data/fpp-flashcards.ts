// ============================================================================
// SACAA CPL — FLIGHT PLANNING & PERFORMANCE FLASHCARDS
// Original recall cards for the CPL Flight Planning & Performance syllabus (A.4),
// from standard performance theory in original wording. Section ids match
// sacaa-syllabus.ts.
// ============================================================================

import type { AirLawFlashcard } from "./airlaw-flashcards";

export const FPP_FLASHCARDS: AirLawFlashcard[] = [
  // A.4.1
  { id: "FPPFC-41-01", sectionId: "A.4.1", front: "Performance classes A/B/C?", back: "A = multi-engine turbine transport; B = light props (≤9 pax/≤5700 kg); C = large piston.", difficulty: "medium" },
  { id: "FPPFC-41-02", sectionId: "A.4.1", front: "Gross vs net flight path?", back: "Net = gross minus a safety margin; obstacles are cleared on the NET path.", difficulty: "medium" },
  { id: "FPPFC-41-03", sectionId: "A.4.1", front: "What limits take-off mass?", back: "The most restrictive of field-length, climb (WAT), obstacle and en-route limits.", difficulty: "medium" },
  // A.4.2
  { id: "FPPFC-42-01", sectionId: "A.4.2", front: "Limit load factors by category?", back: "Normal +3.8/−1.52; Utility +4.4/−1.76; Acrobatic +6.0/−3.0.", difficulty: "medium" },
  { id: "FPPFC-42-02", sectionId: "A.4.2", front: "Airworthiness categories?", back: "Normal, Utility, Acrobatic, Commuter, Transport.", difficulty: "easy" },
  // A.4.4
  { id: "FPPFC-44-01", sectionId: "A.4.4", front: "Airspeed correction chain?", back: "IAS → CAS → EAS → TAS; TAS increases with altitude for a fixed IAS.", difficulty: "medium" },
  { id: "FPPFC-44-02", sectionId: "A.4.4", front: "VX vs VY?", back: "VX = best angle (height per distance, obstacles); VY = best rate (height per time).", difficulty: "easy" },
  { id: "FPPFC-44-03", sectionId: "A.4.4", front: "VA (manoeuvring speed)?", back: "Max speed for full/abrupt control inputs — above it you can overstress the airframe.", difficulty: "medium" },
  { id: "FPPFC-44-04", sectionId: "A.4.4", front: "V1, VR, V2?", back: "V1 = take-off decision speed; VR = rotate; V2 = take-off safety speed.", difficulty: "medium" },
  // A.4.5
  { id: "FPPFC-45-01", sectionId: "A.4.5", front: "Declared distances?", back: "TODA = TORA + clearway; ASDA = TORA + stopway; LDA = landing length available.", difficulty: "medium" },
  { id: "FPPFC-45-02", sectionId: "A.4.5", front: "Density altitude rule of thumb?", back: "≈ pressure altitude + 120 ft × (OAT − ISA temp in °C). High/hot/humid = high DA.", difficulty: "hard" },
  { id: "FPPFC-45-03", sectionId: "A.4.5", front: "Balanced field length?", back: "Where accelerate-go distance = accelerate-stop distance (optimum V1).", difficulty: "hard" },
  { id: "FPPFC-45-04", sectionId: "A.4.5", front: "ACN vs PCN?", back: "The aircraft's ACN must not exceed the pavement's PCN.", difficulty: "medium" },
  // A.4.7
  { id: "FPPFC-47-01", sectionId: "A.4.7", front: "Rate vs angle of climb?", back: "Rate ← excess POWER; angle ← excess THRUST.", difficulty: "medium" },
  { id: "FPPFC-47-02", sectionId: "A.4.7", front: "Best glide speed?", back: "Speed for max L/D. Distance is unaffected by weight (heavier = same distance, higher speed).", difficulty: "hard" },
  { id: "FPPFC-47-03", sectionId: "A.4.7", front: "Absolute vs service ceiling?", back: "Absolute: RoC = 0. Service: RoC ≈ 100 ft/min.", difficulty: "medium" },
  { id: "FPPFC-47-04", sectionId: "A.4.7", front: "Endurance vs range speed?", back: "Endurance at min power required; range near max L/D (piston).", difficulty: "hard" },
  // A.4.8
  { id: "FPPFC-48-01", sectionId: "A.4.8", front: "Effect of hot/high/humid?", back: "High density altitude → less lift/thrust/climb, longer take-off & landing.", difficulty: "easy" },
  { id: "FPPFC-48-02", sectionId: "A.4.8", front: "Effect of headwind on take-off?", back: "Shortens the ground run and steepens the climb path over the ground.", difficulty: "easy" },
  { id: "FPPFC-48-03", sectionId: "A.4.8", front: "Effect of runway downslope?", back: "Helps take-off (acceleration) but lengthens the landing run.", difficulty: "medium" },
  // A.4.9
  { id: "FPPFC-49-01", sectionId: "A.4.9", front: "Inputs to SEP take-off/landing charts?", back: "Pressure altitude, temperature, mass, wind (and slope). Read pressure altitude, not indicated.", difficulty: "medium" },
  { id: "FPPFC-49-02", sectionId: "A.4.9", front: "Tailwind on landing chart?", back: "Increases landing distance required — heavily penalised.", difficulty: "medium" },
  // A.4.10
  { id: "FPPFC-410-01", sectionId: "A.4.10", front: "Critical engine on a conventional twin?", back: "The LEFT engine (asymmetric blade effect / P-factor).", difficulty: "hard" },
  { id: "FPPFC-410-02", sectionId: "A.4.10", front: "What is VMCA?", back: "Min speed to keep directional control with the critical engine out and full power on the live engine.", difficulty: "hard" },
  { id: "FPPFC-410-03", sectionId: "A.4.10", front: "Feather vs windmill?", back: "Feather a failed prop to cut drag/yaw; a windmilling prop adds drag and yaw.", difficulty: "medium" },
  { id: "FPPFC-410-04", sectionId: "A.4.10", front: "One engine out on a twin — climb loss?", back: "Far more than 50%, due to extra drag and asymmetry.", difficulty: "medium" },

  // ── A.4.11 Specific performance & MEP field performance ──
  { id: "FPPFC-411-01", sectionId: "A.4.11", front: "Specific range vs specific endurance?", back: "Specific range = NM per unit fuel (best at max speed for min drag/power). Specific endurance = time per unit fuel (best at min fuel flow / minimum power speed).", difficulty: "medium" },
  { id: "FPPFC-411-02", sectionId: "A.4.11", front: "SFC — what is it?", back: "Specific Fuel Consumption: fuel burned per unit of power/thrust per hour. Lower SFC = more efficient.", difficulty: "medium" },
  { id: "FPPFC-411-03", sectionId: "A.4.11", front: "Effect of weight on specific range?", back: "Heavier aircraft needs more lift → more drag → higher fuel flow → LESS specific range. Range improves as fuel burns off.", difficulty: "medium" },
  { id: "FPPFC-411-04", sectionId: "A.4.11", front: "Wind effect on range vs endurance?", back: "Wind changes RANGE (headwind reduces ground NM per unit fuel) but NOT endurance (time aloft is unaffected by wind).", difficulty: "medium" },

  // ── A.4.12 Mass & Balance ──
  { id: "FPPFC-412-01", sectionId: "A.4.12", front: "Moment = ?", back: "Moment = mass × arm. Total moment ÷ total mass = CG position. Keep CG within the fore/aft limits.", difficulty: "easy" },
  { id: "FPPFC-412-02", sectionId: "A.4.12", front: "Forward vs aft CG effects?", back: "Forward CG: more stable, higher stall speed, more drag/fuel, harder to flare. Aft CG: less stable, lower stall speed, less drag but reduced stability.", difficulty: "medium" },
  { id: "FPPFC-412-03", sectionId: "A.4.12", front: "%MAC — what is it?", back: "CG position expressed as a percentage of the Mean Aerodynamic Chord aft of its leading edge. Limits are quoted in %MAC.", difficulty: "medium" },
  { id: "FPPFC-412-04", sectionId: "A.4.12", front: "Overweight take-off consequences?", back: "Longer take-off run, reduced climb gradient, higher stall/V-speeds, reduced ceiling and range, and structural over-stress.", difficulty: "medium" },

  // ── A.4.13 Fuel planning, PET/PNR & documentation ──
  { id: "FPPFC-413-01", sectionId: "A.4.13", front: "PET (Critical Point) — what & shifts?", back: "Point of Equal Time: from here it takes the same time to go on or turn back. A headwind out (tailwind back) moves the PET DOWNWIND (further along).", difficulty: "hard" },
  { id: "FPPFC-413-02", sectionId: "A.4.13", front: "PNR (Point of No Return)?", back: "The furthest point you can fly and still return to base with the fuel available (allowing reserves). Determined by endurance, not just distance.", difficulty: "hard" },
  { id: "FPPFC-413-03", sectionId: "A.4.13", front: "Fuel order (CAR 91.07.12)?", back: "Taxi + trip + contingency + alternate + final reserve (+ additional/extra). Never plan below final reserve.", difficulty: "medium" },
  { id: "FPPFC-413-04", sectionId: "A.4.13", front: "Documents to carry?", back: "C of A, C of R, radio licence, mass & balance, AFM/POH, insurance, licences/medicals, flight plan/folio, NOTAM/MEL/AIP as applicable.", difficulty: "medium" },
];

export function getFPPFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return FPP_FLASHCARDS.filter((c) => c.sectionId === sectionId);
}

export const FPP_FLASHCARD_COUNT = FPP_FLASHCARDS.length;
