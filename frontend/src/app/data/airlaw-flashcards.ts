// ============================================================================
// SACAA CPL — AIR LAW FLASHCARDS
// Original recall cards for the built Air Law sections (Appendix 2.0A, A.3),
// paraphrased from the underlying SA CARs / ICAO Annexes in original wording.
// Same shape as met-flashcards so the flashcard UI reuses it.
// ============================================================================

export interface AirLawFlashcard {
  id: string;
  sectionId: string; // e.g. "A.3.1"
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
}

export const AIRLAW_FLASHCARDS: AirLawFlashcard[] = [
  // A.3.1 DEFINITIONS
  { id: "LFC-A31-01", sectionId: "A.3.1", front: "Who is the pilot-in-command?", back: "The pilot responsible for the operation and safety of the aircraft during flight time.", difficulty: "easy" },
  { id: "LFC-A31-02", sectionId: "A.3.1", front: "Accident vs incident?", back: "Accident = fatal/serious injury, aircraft damage/structural failure, or aircraft missing/inaccessible (boarding-with-intent to disembark). Incident = affects or could affect safety but isn't an accident.", difficulty: "medium" },
  { id: "LFC-A31-03", sectionId: "A.3.1", front: "Aeroplane 'flight time' spans?", back: "From first movement under own power for take-off until the aircraft comes to rest at the end of the flight.", difficulty: "medium" },
  { id: "LFC-A31-04", sectionId: "A.3.1", front: "Which injuries are NOT 'serious'?", back: "Simple fractures of fingers, toes or the nose.", difficulty: "medium" },
  { id: "LFC-A31-05", sectionId: "A.3.1", front: "Flight level reference datum?", back: "1013.25 hPa (the standard pressure setting).", difficulty: "easy" },
  { id: "LFC-A31-06", sectionId: "A.3.1", front: "Control zone (CTR)?", back: "Controlled airspace extending upward from the surface to a specified upper limit.", difficulty: "medium" },
  // A.3.2 ACCIDENTS & INCIDENTS
  { id: "LFC-A32-01", sectionId: "A.3.2", front: "Who reports an accident, and how fast?", back: "The PIC (or owner/operator if unable), by the quickest means, without delay.", difficulty: "medium" },
  { id: "LFC-A32-02", sectionId: "A.3.2", front: "When may wreckage be moved?", back: "Only to save life, relieve suffering, prevent destruction (e.g. fire), or by the investigator's authority — record its original position.", difficulty: "medium" },
  { id: "LFC-A32-03", sectionId: "A.3.2", front: "Sole purpose of an investigation?", back: "Prevention of future accidents/incidents — NOT to apportion blame or liability.", difficulty: "easy" },
  { id: "LFC-A32-04", sectionId: "A.3.2", front: "What follows the initial notification?", back: "A written report within the prescribed period.", difficulty: "easy" },
  // A.3.3 MAINTENANCE (Part 43)
  { id: "LFC-A33-01", sectionId: "A.3.3", front: "Who may maintain an aircraft?", back: "A licensed AME or approved AMO, within their approval.", difficulty: "easy" },
  { id: "LFC-A33-02", sectionId: "A.3.3", front: "What allows return to service after maintenance?", back: "A Certificate of Release to Service (CRS).", difficulty: "medium" },
  { id: "LFC-A33-03", sectionId: "A.3.3", front: "Which logbooks are kept?", back: "Airframe, each engine, and each variable-pitch propeller.", difficulty: "medium" },
  { id: "LFC-A33-04", sectionId: "A.3.3", front: "When is a compass swing required?", back: "After installing/relocating equipment affecting the compass, or at prescribed intervals — produces a new deviation card.", difficulty: "medium" },
  { id: "LFC-A33-05", sectionId: "A.3.3", front: "Who confirms airworthiness before flight?", back: "The pilot-in-command.", difficulty: "easy" },
  // A.3.4 LICENSING (Part 61)
  { id: "LFC-A34-01", sectionId: "A.3.4", front: "CPL(A) core requirements?", back: "Min age 18, Class 1 medical, English proficiency, pass the knowledge exams + skills test, and meet the prescribed experience.", difficulty: "medium" },
  { id: "LFC-A34-02", sectionId: "A.3.4", front: "Key CPL privilege the PPL lacks?", back: "Being remunerated (paid) for flying.", difficulty: "easy" },
  { id: "LFC-A34-03", sectionId: "A.3.4", front: "Does a pilot licence expire?", back: "The licence itself does not; it can only be exercised while the medical, ratings and required tests are valid.", difficulty: "medium" },
  { id: "LFC-A34-04", sectionId: "A.3.4", front: "Medical class for a CPL?", back: "Class 1.", difficulty: "easy" },
  { id: "LFC-A34-05", sectionId: "A.3.4", front: "Passenger-carrying recency?", back: "The prescribed recent take-offs and landings within the specified period.", difficulty: "medium" },
  // A.3.6 PART 91
  { id: "LFC-A36-01", sectionId: "A.3.6", front: "Converging at similar height — who gives way?", back: "The one with the other on its left gives way; the aircraft on the other's RIGHT has right of way.", difficulty: "medium" },
  { id: "LFC-A36-02", sectionId: "A.3.6", front: "Head-on and overtaking action?", back: "Both cases: alter heading to the RIGHT (keep well clear when overtaking).", difficulty: "medium" },
  { id: "LFC-A36-03", sectionId: "A.3.6", front: "Right-of-way priority order?", back: "Least manoeuvrable first: balloons > gliders > airships > powered aircraft.", difficulty: "medium" },
  { id: "LFC-A36-04", sectionId: "A.3.6", front: "Minimum heights?", back: "500 ft from any person/vessel/structure; 1000 ft above the highest obstacle over congested areas (and able to glide clear).", difficulty: "medium" },
  { id: "LFC-A36-05", sectionId: "A.3.6", front: "Semi-circular VFR cruising levels?", back: "Track 0–179°M: odd thousands + 500 ft. Track 180–359°M: even thousands + 500 ft.", difficulty: "hard" },
  { id: "LFC-A36-06", sectionId: "A.3.6", front: "Radio failure in VMC (VFR)?", back: "Squawk the RCF code, stay visual, land at the nearest suitable aerodrome.", difficulty: "medium" },
  { id: "LFC-A36-07", sectionId: "A.3.6", front: "Emergency authority of the PIC?", back: "May deviate from any rule to the extent required for safety, and must report the deviation.", difficulty: "medium" },
  // A.3.12 PART 135
  { id: "LFC-A312-01", sectionId: "A.3.12", front: "What does Part 135 commercial ops require?", back: "An Air Operator Certificate (AOC) and an approved Operations Manual.", difficulty: "medium" },
  { id: "LFC-A312-02", sectionId: "A.3.12", front: "Single-pilot IFR under Part 135 needs?", back: "A serviceable autopilot (or approved equivalent); otherwise a co-pilot (SIC).", difficulty: "hard" },
  { id: "LFC-A312-03", sectionId: "A.3.12", front: "Part 135 vs Part 91 PIC minimums?", back: "Part 135 requires higher experience/recency than private flying.", difficulty: "medium" },
  // A.3.16 AIP / AIRSPACE
  { id: "LFC-A316-01", sectionId: "A.3.16", front: "Airspace classes and Class G?", back: "Classes A–G set access/clearance/separation. Class G is uncontrolled — information only, no clearance needed.", difficulty: "medium" },
  { id: "LFC-A316-02", sectionId: "A.3.16", front: "Class A airspace?", back: "IFR only, clearance required, ATC separation provided (most restrictive).", difficulty: "medium" },
  { id: "LFC-A316-03", sectionId: "A.3.16", front: "Altimeter setting by level?", back: "QNH below the transition altitude; standard 1013.25 hPa (flight levels) above the transition level.", difficulty: "medium" },
  { id: "LFC-A316-04", sectionId: "A.3.16", front: "Authoritative source of airspace/aerodrome info?", back: "The Aeronautical Information Publication (AIP).", difficulty: "easy" },
  // A.3.18 ANNEX 14
  { id: "LFC-A318-01", sectionId: "A.3.18", front: "Declared distances?", back: "TORA (take-off run); TODA = TORA + clearway; ASDA = TORA + stopway; LDA = landing length available.", difficulty: "medium" },
  { id: "LFC-A318-02", sectionId: "A.3.18", front: "Runway light colours?", back: "Threshold GREEN, edge WHITE, runway end RED; taxiway edge BLUE, centreline GREEN.", difficulty: "medium" },
  { id: "LFC-A318-03", sectionId: "A.3.18", front: "Runway vs taxiway marking colour?", back: "Runway markings WHITE; taxiway markings YELLOW.", difficulty: "easy" },
  { id: "LFC-A318-04", sectionId: "A.3.18", front: "PAPI two white + two red?", back: "On the correct glide-path. More red = too low ('more red, you're dead'); more white = too high.", difficulty: "easy" },
  { id: "LFC-A318-05", sectionId: "A.3.18", front: "Aerodrome sign colours?", back: "Red/white = mandatory instruction (e.g. holding position); yellow/black = location/direction/information.", difficulty: "medium" },
  { id: "LFC-A318-06", sectionId: "A.3.18", front: "Clearway vs stopway?", back: "Clearway → adds to TODA (initial climb area); stopway → adds to ASDA (supports an aborted take-off).", difficulty: "hard" },
  // A.3.5 MEDICAL
  { id: "LFC-A35-01", sectionId: "A.3.5", front: "Medical class for CPL vs PPL?", back: "CPL = Class 1; PPL = Class 2.", difficulty: "easy" },
  { id: "LFC-A35-02", sectionId: "A.3.5", front: "Duty when medically unfit?", back: "Do not exercise licence privileges if aware of any decrease in medical fitness — self-ground.", difficulty: "medium" },
  { id: "LFC-A35-03", sectionId: "A.3.5", front: "Who conducts the medical?", back: "A Designated Aviation Medical Examiner (DAME).", difficulty: "easy" },
  { id: "LFC-A35-04", sectionId: "A.3.5", front: "Class 1 validity?", back: "Broadly ~12 months, shortened with age and for single-pilot commercial passenger ops.", difficulty: "medium" },
  // A.3.7 DANGEROUS GOODS
  { id: "LFC-A37-01", sectionId: "A.3.7", front: "How may dangerous goods be carried?", back: "Only per the ICAO Technical Instructions (Doc 9284) — correctly classified, packed, marked, labelled, documented.", difficulty: "medium" },
  { id: "LFC-A37-02", sectionId: "A.3.7", front: "DG handling requirement?", back: "Anyone accepting/handling DG must be trained; the PIC must be told of DG on board.", difficulty: "medium" },
  { id: "LFC-A37-03", sectionId: "A.3.7", front: "Passengers and DG?", back: "Only specified limited items are permitted; most hazardous items are forbidden.", difficulty: "medium" },
  // A.3.8 CORPORATE
  { id: "LFC-A38-01", sectionId: "A.3.8", front: "What are corporate operations (Part 93)?", back: "Non-commercial flying by an organisation for its own business — no hire/reward — needing a Corporate Aviation Certificate + ops manual.", difficulty: "medium" },
  // A.3.10 PART 121
  { id: "LFC-A310-01", sectionId: "A.3.10", front: "Part 121 vs Part 135 boundary?", back: "Part 121 = commercial air transport carrying MORE than 19 passengers; Part 135 = 19 or fewer.", difficulty: "medium" },
  // A.3.13 AERODROMES
  { id: "LFC-A313-01", sectionId: "A.3.13", front: "Who is responsible for aerodrome surfaces/lighting/obstacles?", back: "The aerodrome operator (licensed under Part 139); changes are notified by NOTAM.", difficulty: "medium" },
  // A.3.14 AIRSPACE/ATS
  { id: "LFC-A314-01", sectionId: "A.3.14", front: "Controlled vs uncontrolled classes?", back: "A–E controlled (clearance required); F–G uncontrolled.", difficulty: "medium" },
  { id: "LFC-A314-02", sectionId: "A.3.14", front: "The three ATS services?", back: "ATC (separation/clearances), Flight Information Service (info only), Alerting Service (SAR notification).", difficulty: "medium" },
  { id: "LFC-A314-03", sectionId: "A.3.14", front: "Class A airspace?", back: "IFR only; ATC separates all flights.", difficulty: "medium" },
  // A.3.15 ENFORCEMENT
  { id: "LFC-A315-01", sectionId: "A.3.15", front: "Powers under Part 185?", back: "Authorised officers may inspect and demand licences/documents; contraventions carry fines; aircraft can be detained and licences suspended/cancelled.", difficulty: "medium" },
  // A.3.17 JEPPESEN
  { id: "LFC-A317-01", sectionId: "A.3.17", front: "MEA vs MOCA?", back: "MEA = navaid reception AND obstacle clearance on the airway; MOCA = obstacle clearance, navaid reception only near the navaid.", difficulty: "hard" },
  { id: "LFC-A317-02", sectionId: "A.3.17", front: "Reporting-point triangles?", back: "Solid triangle = compulsory reporting point; open triangle = on request.", difficulty: "medium" },
  { id: "LFC-A317-03", sectionId: "A.3.17", front: "Grid MORA?", back: "Minimum off-route altitude giving obstacle clearance off the airway within a defined grid area.", difficulty: "hard" },
];

export function getAirLawFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return AIRLAW_FLASHCARDS.filter((c) => c.sectionId === sectionId);
}

export function getAirLawFlashcardDeck(sectionId?: string): AirLawFlashcard[] {
  const pool = sectionId ? getAirLawFlashcardsBySection(sectionId) : [...AIRLAW_FLASHCARDS];
  return pool.sort(() => Math.random() - 0.5);
}

export const AIRLAW_FLASHCARD_COUNT = AIRLAW_FLASHCARDS.length;
