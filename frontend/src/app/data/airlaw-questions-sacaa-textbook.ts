// Air Law gap-fill grounded in the SA CPL air-law textbook — Avex Air Training,
// "Air Law for Aeroplanes" (updated 05 May 2022), read directly from the scanned
// pages: Chapter 16 Aeronautical Information Publication (AIP) and Chapter 17
// En Route Charts (Jeppesen). Facts/figures are the textbook's; distractors are
// plausible chart-reading confusions. Fills A.3.16 and A.3.17.

import type { AirLawQuestion } from "@/app/data/airlaw-questions";

const Q = (id: string, sectionId: string, question: string, a: string, b: string, c: string, d: string, correct: "a" | "b" | "c" | "d", explanation: string, difficulty: "easy" | "medium" | "hard" = "medium"): AirLawQuestion =>
  ({ id, sectionId, question, optionA: a, optionB: b, optionC: c, optionD: d, correctAnswer: correct, explanation, difficulty });

export const AIRLAW_SACAA_TEXTBOOK_QUESTIONS: AirLawQuestion[] = [
  // ── A.3.16 Aeronautical Information Publication (Ch 16) ──
  Q("ALS-01", "A.3.16", "On an aerodrome chart, the abbreviation CWY denotes:", "Clearway", "Causeway", "Controlled way", "Crosswind runway", "a", "CWY = Clearway (an area beyond the runway free of obstacles, usable for the initial climb).", "medium"),
  Q("ALS-02", "A.3.16", "On an aerodrome chart, the abbreviation SWY denotes:", "Stopway", "Sideway", "Service way", "Slow way", "a", "SWY = Stopway (an area beyond the TORA able to support an aeroplane during a rejected take-off).", "medium"),
  Q("ALS-03", "A.3.16", "On an aerodrome chart, TDZ denotes the:", "Touchdown Zone", "Tower Danger Zone", "Taxiway Divergence Zone", "Threshold Displacement Zone", "a", "TDZ = Touchdown Zone; THR = Threshold.", "easy"),
  Q("ALS-04", "A.3.16", "A chevron marking painted on the runway surface before a threshold indicates that the area:", "is paved but not suitable for normal use by an aircraft", "is the touchdown zone", "is a helicopter landing pad", "has the best braking action", "a", "A chevron marks a paved pre-threshold area (exceeding 60 m) that is unsuitable for normal use.", "hard"),
  Q("ALS-05", "A.3.16", "On an AIP aerodrome chart, PAPI is shown together with its:", "associated glide-path angle (e.g. 3°)", "runway bearing strength", "ATIS frequency", "threshold elevation only", "a", "PAPI (Precision Approach Path Indicator) is annotated with its glide-path angle and side of the runway.", "medium"),
  Q("ALS-06", "A.3.16", "On a published aerodrome chart, 'PCN 49/F/B/Y/U' expresses the runway's:", "pavement bearing strength", "slope and surface", "declared take-off distance", "lighting category", "a", "PCN (Pavement Classification Number) with its codes expresses the pavement's bearing strength.", "hard"),
  Q("ALS-07", "A.3.16", "On an AIP chart a VOR/DME symbol preceded by the letter 'D' indicates:", "a Doppler VOR (DVOR) facility", "a decommissioned VOR", "a VOR giving DME only", "a dual-frequency VOR", "a", "A 'D' before the VOR/DME symbol denotes a Doppler VOR facility.", "medium"),
  Q("ALS-08", "A.3.16", "The declared distances TORA, TODA, ASDA and LDA on an aerodrome chart are provided to support:", "take-off and landing performance planning", "fuel planning only", "customs clearance", "radio frequency selection", "a", "Declared distances feed the aeroplane's take-off and landing performance calculations.", "medium"),
  // ── A.3.17 En Route Charts / Jeppesen (Ch 17) ──
  Q("ALS-09", "A.3.17", "Most IFR en route charts are drawn using which projection?", "Lambert Conformal Conic", "Normal Mercator", "Transverse Mercator", "Polar Stereographic", "a", "En route charts generally use the Lambert Conformal Conic projection.", "medium"),
  Q("ALS-10", "A.3.17", "Which information is NOT provided on an IFR en route chart?", "topographical (relief) information", "airspace and route structure", "radio navigation beacons", "en route safety altitudes", "a", "The en route chart gives airspace/routes/beacons/safety altitudes but no topographical information.", "medium"),
  Q("ALS-11", "A.3.17", "In the SACAA (CAA) examination, which commercially produced en route charts are used?", "Jeppesen only", "Navtech (Aerad) only", "both Jeppesen and Navtech", "ICAO charts only", "a", "The textbook states that only Jeppesen en route charts are currently used in the CAA examination.", "medium"),
  Q("ALS-12", "A.3.17", "On an en route chart, an airway identifier such as 'W95' (no U prefix) denotes a:", "Lower Airway", "Upper Airway", "Information Route", "Advisory Route", "a", "A plain identifier (W95) is a Lower Airway; an Upper Airway carries a 'U' prefix (e.g. UW95).", "hard"),
  Q("ALS-13", "A.3.17", "A route whose identifier ends in the letter 'F' (e.g. G657F) is a(n):", "Information Route in uncontrolled airspace (Flight Information Service only)", "Upper Airway with ATC service", "Advisory Route", "controlled Lower Airway", "a", "An 'F' suffix marks an Information Route in uncontrolled airspace, served only by FIS.", "hard"),
  Q("ALS-14", "A.3.17", "A route whose identifier ends in the letter 'D' (e.g. G657D) is a(n):", "Advisory Route", "Information Route", "Upper Airway", "Lower Airway", "a", "A 'D' suffix marks an Advisory Route (uncontrolled airspace, advisory service only, not ATC).", "hard"),
  Q("ALS-15", "A.3.17", "On a Jeppesen en route chart, airway identifiers are shown as:", "white text in a black box", "black text in a white box", "red text underlined", "yellow text in a circle", "a", "Airway identifiers appear as white text inside a black box on the chart.", "medium"),
  Q("ALS-16", "A.3.17", "Full details of the limits of Lower Airways in South Africa are found in which AIP section?", "ENR 3.1", "GEN 1.1", "AD 2", "ENR 6", "a", "Lower Airway limits are in AIP ENR 3.1; Upper Airways in ENR 3.2.", "hard"),
];
