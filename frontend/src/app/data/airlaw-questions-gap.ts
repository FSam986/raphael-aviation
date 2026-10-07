// Air Law — gap-fill for thin CAR-Part sections (aspect-tagged). Scoped to
// applicability/scope per each syllabus aspect to stay accurate; verify any
// SA-specific threshold against the current CARs before exam publication.

import type { AirLawQuestion } from "@/app/data/airlaw-questions";

const q = (
  id: string, sectionId: string, aspect: string, question: string,
  a: string, b: string, c: string, d: string,
  correct: "a" | "b" | "c" | "d", explanation: string,
  difficulty: "easy" | "medium" | "hard", tag: "recall" | "apply" | "calc" | "trap",
): AirLawQuestion => ({ id, sectionId, aspect, question, optionA: a, optionB: b, optionC: c, optionD: d, correctAnswer: correct, explanation, difficulty, tag });

export const AIRLAW_GAP_QUESTIONS: AirLawQuestion[] = [
  // ───── A.3.8 Corporate Operations (CAR Part 93) ─────
  q("ALG-001", "A.3.8", "A.3.8.a", "CAR Part 93 governs:", "private recreational flying", "corporate (non-commercial company) aviation operations", "scheduled airline operations", "aerodrome licensing", "b", "Part 93 covers corporate aviation — a company operating aircraft for its own business, not for public hire/reward.", "medium", "recall"),
  q("ALG-002", "A.3.8", "A.3.8.a", "A corporate operation under CAR 93 is characterised by:", "carriage of fare-paying passengers", "transport of company personnel/assets, not for hire or reward to the public", "flight training for licences", "agricultural spraying", "b", "Corporate ops carry the operator's own people/goods and are not public air transport for reward.", "medium", "recall"),
  q("ALG-003", "A.3.8", "A.3.8.a", "To conduct corporate operations under CAR 93, an operator must hold a:", "nothing beyond a pilot licence", "corporate operating authority/certificate issued per Part 93", "Part 121 AOC", "Part 141 approval", "b", "Part 93 requires the operator to be certified/authorised specifically for corporate operations.", "medium", "recall"),
  q("ALG-004", "A.3.8", "A.3.8.a", "Compared with Part 91 private operations, corporate ops under Part 93:", "have fewer requirements", "impose additional organisational/operational requirements on the operator", "are exempt from maintenance rules", "need no operations manual", "b", "Part 93 adds operator-level organisational and operational requirements beyond basic Part 91 flying.", "medium", "apply"),
  q("ALG-005", "A.3.8", "A.3.8.a", "Corporate operations are best described as:", "commercial air transport for the public", "private operations at an organisational/company level", "state (military) operations", "flight-test operations", "b", "They are non-commercial (private) operations conducted at a company/organisational level.", "easy", "recall"),

  // ───── A.3.10 Air Transport — large aeroplanes (CAR Part 121) ─────
  q("ALG-011", "A.3.10", "A.3.10.a", "CAR Part 121 applies to air transport operations with:", "aeroplanes carrying fewer than 20 passengers", "large aeroplanes in commercial air transport", "helicopters only", "gliders and balloons", "b", "Part 121 governs commercial air transport with large aeroplanes.", "medium", "recall"),
  q("ALG-012", "A.3.10", "A.3.10.a", "To conduct Part 121 operations an operator must hold:", "a corporate certificate", "an Air Operator Certificate (AOC)", "only an ATPL", "a Part 141 approval", "b", "Commercial air transport requires an AOC specifying the operations authorised.", "medium", "recall"),
  q("ALG-013", "A.3.10", "A.3.10.a", "The AOC defines:", "only the aircraft registration", "the scope of operations, aircraft types and areas an operator is authorised for", "the pilot's personal limits", "the aerodrome licence", "b", "An AOC (with its Operations Specifications) sets the approved scope, types and areas of operation.", "medium", "recall"),
  q("ALG-014", "A.3.10", "A.3.10.a", "Part 121 is distinguished from Part 135 principally by:", "aircraft colour", "aeroplane size/category (large vs smaller, fewer-than-20-passenger)", "day vs night only", "domestic vs international only", "b", "Part 121 = large aeroplanes; Part 135 = smaller aeroplanes (<20 passengers).", "medium", "apply"),
  q("ALG-015", "A.3.10", "A.3.10.a", "Commercial air transport means operating for:", "the operator's own purposes only", "the carriage of passengers/cargo/mail for remuneration or hire", "flight training", "private recreation", "b", "Commercial air transport = carriage for remuneration or hire/reward.", "easy", "recall"),

  // ───── A.3.12 Air Transport — <20 pax (CAR Part 135) ─────
  q("ALG-021", "A.3.12", "A.3.12.a", "CAR Part 135 applies to commercial air transport with aeroplanes carrying:", "more than 100 passengers", "fewer than 20 passengers (smaller aeroplanes)", "cargo only", "no passengers", "b", "Part 135 covers commercial air transport in smaller aeroplanes seating fewer than 20 passengers.", "medium", "recall"),
  q("ALG-022", "A.3.12", "A.3.12.a", "Operations under Part 135 require the operator to hold:", "no certificate", "an Air Operator Certificate (AOC)", "only a corporate authority", "a Part 139 licence", "b", "Like all commercial air transport, Part 135 operations need an AOC.", "medium", "recall"),
  q("ALG-023", "A.3.12", "A.3.12.a", "Part 135 lays down minimum requirements for the:", "aerodrome fire service", "pilot-in-command experience and IMC/night/IFR operating conditions", "ATC licensing", "aircraft paint scheme", "b", "Part 135 specifies PIC minimum requirements and the conditions for IMC/night/IFR operations.", "medium", "recall"),
  q("ALG-024", "A.3.12", "A.3.12.a", "A single-pilot IFR commercial operation without a co-pilot is addressed under:", "Part 121", "Part 135 (with its stated conditions/equipment)", "Part 91 only", "Part 185", "b", "Part 135 sets the conditions under which IFR may be flown without a second-in-command.", "hard", "recall"),
  q("ALG-025", "A.3.12", "A.3.12.a", "The main difference in applicability between Part 135 and Part 121 is the:", "number of engines", "passenger seating capacity / aeroplane size", "colour of the AOC", "country of registration", "b", "Capacity/size is the dividing line: Part 135 (<20 pax, smaller) vs Part 121 (large).", "easy", "apply"),

  // ───── A.3.13 Aerodromes & Heliports (CAR Part 139) ─────
  q("ALG-031", "A.3.13", "A.3.13.a", "CAR Part 139 deals with:", "pilot licensing", "the licensing/approval and operation of aerodromes and heliports", "aircraft maintenance", "air traffic services charges", "b", "Part 139 governs the licensing/approval, operation and safety management of aerodromes and heliports.", "medium", "recall"),
  q("ALG-032", "A.3.13", "A.3.13.a", "An aerodrome available for public use generally requires:", "no approval", "a licence/approval issued under Part 139", "only a Part 91 authority", "an AOC", "b", "Public aerodromes must be licensed/approved under Part 139.", "medium", "recall"),
  q("ALG-033", "A.3.13", "A.3.13.a", "Under Part 139 the aerodrome operator is responsible for:", "issuing pilot ratings", "maintaining the aerodrome to the required standards and its safety management", "providing en-route ATC", "certifying aircraft", "b", "The licensed aerodrome operator must maintain required standards and run a safety management system.", "medium", "recall"),
  q("ALG-034", "A.3.13", "A.3.13.a", "An aerodrome safety management system (SMS) under Part 139 aims to:", "increase landing fees", "proactively identify and manage safety hazards at the aerodrome", "schedule airline flights", "licence air traffic controllers", "b", "An SMS proactively identifies and mitigates aerodrome safety hazards.", "medium", "apply"),
  q("ALG-035", "A.3.13", "A.3.13.a", "Part 139 standards cover items such as:", "crew flight-time limitations", "runway/taxiway markings, lighting, rescue & fire fighting and obstacle limitation", "aircraft weight and balance", "radio-licence fees", "b", "Physical characteristics, markings, lighting, RFFS and obstacle limitation surfaces fall under Part 139.", "medium", "recall"),

  // ───── A.3.15 Enforcement (CAR Part 185) ─────
  q("ALG-041", "A.3.15", "A.3.15.a", "CAR Part 185 deals with:", "aerodrome licensing", "contraventions, penalties and enforcement (including administrative fines)", "flight planning", "meteorological services", "b", "Part 185 covers enforcement — contraventions, penalties and administrative fines.", "medium", "recall"),
  q("ALG-042", "A.3.15", "A.3.15.a", "An administrative fine under Part 185 is:", "a criminal conviction", "a penalty imposed for a contravention without necessarily going to court", "a licence fee", "a refundable deposit", "b", "Administrative penalties allow contraventions to be dealt with without a full court process.", "medium", "recall"),
  q("ALG-043", "A.3.15", "A.3.15.a", "Authorised officers under Part 185 have powers to:", "issue type certificates", "inspect, investigate and enforce compliance with the CARs", "set airline fares", "control airspace", "b", "Authorised officers may inspect, investigate and enforce compliance with the regulations.", "medium", "recall"),
  q("ALG-044", "A.3.15", "A.3.15.a", "The purpose of enforcement provisions is to:", "raise revenue", "ensure compliance with aviation safety regulations", "licence aerodromes", "train pilots", "b", "Enforcement exists to secure compliance with the safety regulations.", "easy", "recall"),
  q("ALG-045", "A.3.15", "A.3.15.a", "A serious contravention of the CARs may lead to:", "no consequence", "penalties up to suspension/cancellation of a licence or certificate, fines or prosecution", "an automatic type rating", "a reduction in landing fees", "b", "Serious breaches can bring fines, prosecution or suspension/cancellation of licences/certificates.", "medium", "apply"),

  // ───── A.3.16 RSA AIP — Enroute ─────
  q("ALG-051", "A.3.16", "A.3.16.a", "The ENR (En-route) section of the AIP primarily contains:", "aerodrome ground charts only", "airspace classification, ATS routes, procedures and general en-route rules", "NOTAM archives", "aircraft maintenance data", "b", "AIP ENR holds airspace classification, ATS routes/procedures and en-route operating information.", "medium", "recall"),
  q("ALG-052", "A.3.16", "A.3.16.a", "Airspace classification in the AIP (ENR 1.4) tells a pilot:", "the aircraft's weight limits", "the services provided and requirements (clearance, equipment) for each class", "the fuel price", "the runway length", "b", "ENR 1.4 defines each airspace class and the associated services/requirements.", "medium", "recall"),
  q("ALG-053", "A.3.16", "A.3.16.a", "The transition altitude/level and altimeter-setting procedures are found in the:", "AIP ENR section", "aircraft flight manual", "pilot logbook", "Part 185", "a", "Altimeter-setting procedures and the transition altitude are published in the AIP ENR.", "medium", "recall"),
  q("ALG-054", "A.3.16", "A.3.16.b", "Aerodrome-specific details (runways, frequencies, charts) are published in the:", "ENR section", "AD (Aerodromes) section of the AIP", "GEN section", "Part 139 only", "b", "The AD section of the AIP contains aerodrome information and charts.", "medium", "recall"),
  q("ALG-055", "A.3.16", "A.3.16.b", "An instrument approach chart is interpreted to obtain:", "the aircraft empty mass", "tracks, altitudes, minima and the missed-approach procedure", "the crew duty time", "the aerodrome licence number", "b", "Approach charts give tracks, step-down altitudes, minima and the missed-approach procedure.", "medium", "apply"),
  q("ALG-056", "A.3.16", "A.3.16.a", "Radar service availability and procedures for a given airspace are found in the:", "AIP ENR section", "aircraft POH", "maintenance manual", "logbook", "a", "En-route radar services and procedures are published in the AIP ENR section.", "easy", "recall"),
];

export function getAirLawGapQuestionsBySection(sectionId: string): AirLawQuestion[] {
  return AIRLAW_GAP_QUESTIONS.filter((x) => x.sectionId === sectionId);
}
