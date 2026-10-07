// ============================================================================
// SACAA PPL — AIR LAW STUDY NOTES
// Original study material for the PPL (Aeroplane) Air Law syllabus
// (Appendix 1.0). Paraphrased from the underlying SA Civil Aviation
// Regulations and ICAO Convention/Annexes (public legal material) in original
// wording — NOT copied from any textbook. Section ids match ppl-syllabus.ts.
// Reuses the Air Law note shape so the Learn tab renders it directly.
// ============================================================================

import type { AirLawSectionNote } from "./airlaw-notes";

export const PPL_AIRLAW_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "1",
    title: "ICAO — Convention & Articles",
    intro:
      "The Convention on International Civil Aviation (the Chicago Convention, 1944) is the treaty that founded ICAO and set the framework for international flying. PPL Air Law tests the key principles — sovereignty, the documents an aircraft must carry, and the recognition of licences and certificates.",
    blocks: [
      {
        heading: "1. The Convention & ICAO",
        points: [
          "The Chicago Convention (1944) established the International Civil Aviation Organisation (ICAO), a UN specialised agency that promotes safe, orderly international civil aviation.",
          "Every contracting state has complete and exclusive SOVEREIGNTY over the airspace above its territory (land and territorial waters).",
          "ICAO develops Standards And Recommended Practices (SARPs), published as Annexes to the Convention.",
        ],
      },
      {
        heading: "2. Key Articles the exam tests",
        points: [
          "Documents to be carried in the aircraft — Certificate of Registration, Certificate of Airworthiness, crew licences, journey log book, and the radio station licence (if radio is fitted).",
          "Nationality and registration marks must be displayed; each aircraft has one C of R and C of A.",
          "Recognition of certificates and licences — certificates/licences issued or validated by the state of registry are recognised by other contracting states.",
          "Rules of the air over the high seas are those established under the Convention; over a state's territory, that state's rules apply.",
        ],
      },
    ],
    mustKnow: [
      "The Chicago Convention (1944) created ICAO.",
      "Each state has complete and exclusive sovereignty over its airspace.",
      "ICAO SARPs are published as Annexes to the Convention.",
      "Documents carried: C of R, C of A, crew licences, journey log, radio licence.",
      "Licences/certificates of the state of registry are recognised internationally.",
    ],
    traps: [
      "Sovereignty is 'complete AND exclusive' — a set phrase examiners look for.",
      "The Convention is the 'Chicago' Convention of 1944 — not Warsaw (liability) or Tokyo/Montreal.",
    ],
  },
  {
    sectionId: "4",
    title: "ICAO Annex 14 — Aerodromes & Visual Aids",
    intro:
      "Annex 14 sets the standards for aerodromes and their visual aids — the markings, lights, signs and signals you read every flight. Learn the colours precisely, because that is exactly what the exam asks.",
    blocks: [
      {
        heading: "1. Markings, lights & signs",
        points: [
          "Runway markings are WHITE (designation, centreline, threshold, aiming point); taxiway markings are YELLOW.",
          "Runway lights: threshold GREEN, edge WHITE, runway end RED. Taxiway: edge BLUE, centreline GREEN.",
          "Signs — red/white are mandatory instruction signs (e.g. runway-holding position); yellow/black are information/location/direction signs.",
          "Obstacles are marked (e.g. red/white bands) and lit (red or high-intensity white) so they can be seen by day and night.",
        ],
      },
      {
        heading: "2. Signals & the signal area",
        points: [
          "The signal area (a marked square near the tower) displays ground signals about aerodrome conditions and restrictions.",
          "A white 'landing T' shows the direction of take-off and landing; a white dumb-bell restricts movement to paved areas; a red 'L' on the dumb-bell allows light aircraft on grass.",
          "A double white cross = glider operations; a red square with yellow diagonals = aerodrome unsafe, do not land.",
        ],
      },
    ],
    mustKnow: [
      "Runway markings WHITE; taxiway markings YELLOW.",
      "Threshold lights GREEN, edge WHITE, runway end RED; taxiway edge BLUE, centreline GREEN.",
      "Red/white signs = mandatory; yellow/black = information/location.",
      "Red square with yellow diagonals = aerodrome unsafe, do not land.",
      "Landing T shows the take-off/landing direction.",
    ],
    traps: [
      "Threshold lights are GREEN; runway-end lights are RED (same fixtures viewed from opposite ends).",
      "A red square with yellow diagonals means DO NOT LAND — not merely 'caution'.",
    ],
  },
  {
    sectionId: "5.1",
    title: "CAR Part 1 — Definitions & Abbreviations",
    intro:
      "Part 1 defines the terms used throughout the regulations. Exam questions hinge on exact wording — 'accident' vs 'incident', the definition of 'night', and airspace terms.",
    blocks: [
      {
        heading: "1. Core definitions",
        points: [
          "Accident: an occurrence, between boarding with intent to fly and disembarking, in which a person is fatally/seriously injured, the aircraft suffers damage/structural failure, or the aircraft is missing/inaccessible.",
          "Incident: an occurrence, other than an accident, that affects or could affect the safety of operation.",
          "Pilot-in-command (PIC): the pilot responsible for the operation and safety of the aircraft during flight time.",
          "Night: the hours between the end of evening civil twilight and the beginning of morning civil twilight (sun 6° below the horizon).",
        ],
      },
    ],
    mustKnow: [
      "Accident = fatal/serious injury, aircraft damage/structural failure, or aircraft missing (boarding→disembarking).",
      "Incident = affects or could affect safety but is not an accident.",
      "Night = end of evening civil twilight to start of morning civil twilight (sun 6° below horizon).",
      "PIC = responsible for the operation and safety of the flight.",
    ],
    traps: [
      "Simple fractures of fingers/toes/nose are NOT 'serious injury'.",
      "'Night' is defined by civil twilight, not simply sunset to sunrise.",
    ],
  },
  {
    sectionId: "5.2",
    title: "CAR Part 12 — Aviation Accidents & Incidents",
    intro:
      "Part 12 covers reporting and protecting the scene after an accident or incident. Know who reports, how fast, and the rule against disturbing wreckage.",
    blocks: [
      {
        heading: "1. Notification & the scene",
        points: [
          "Accidents (and reportable incidents) must be reported to the authority by the quickest available means, without delay; the duty falls on the PIC, or the owner/operator if the PIC is unable.",
          "Notification gives the aircraft identification, location, number of casualties and extent of damage as known; a written report follows.",
          "Wreckage must not be moved or interfered with except to save life, relieve suffering, prevent destruction (e.g. fire), or by authority of the investigator — record the original position if it must be moved.",
        ],
      },
    ],
    mustKnow: [
      "Report accidents by the quickest means, without delay.",
      "Duty to report: PIC first, then owner/operator.",
      "Do not disturb wreckage except to save life, relieve suffering, prevent destruction, or by the investigator.",
      "Purpose of investigation = prevention, not blame.",
    ],
    traps: [
      "The purpose of an investigation is prevention of future accidents — never to apportion blame.",
    ],
  },
  {
    sectionId: "5.3",
    title: "CAR Part 61 — Flight Crew Licensing (PPL)",
    intro:
      "Part 61 sets out the Private Pilot Licence you are working toward. Expect questions on the PPL requirements, its privileges (and the crucial NO-remuneration limit), validity, recency, and the ratings that go with it. Note where PPL figures differ from the CPL.",
    blocks: [
      {
        heading: "1. PPL(A) requirements",
        points: [
          "Minimum age 17 years to be issued a PPL (Aeroplane); a student pilot may fly solo from 16.",
          "Hold a valid Class 2 medical certificate and demonstrate the required English language proficiency.",
          "Pass the theoretical knowledge examinations and the practical skills test with a designated examiner, and meet the prescribed minimum flying experience.",
        ],
      },
      {
        heading: "2. Privileges, validity & recency",
        points: [
          "Privileges: act as PIC or co-pilot of an aeroplane for which the ratings are held, NOT for remuneration or hire and reward — a private pilot may not be paid to fly.",
          "The licence does not itself expire, but is exercised only while the medical, ratings and required checks are valid.",
          "Recency to carry passengers requires the prescribed recent take-offs and landings within the specified period.",
          "Additional ratings: night rating, class/type ratings — each with its own requirements and validity.",
        ],
      },
    ],
    mustKnow: [
      "PPL(A): min age 17 (solo from 16), Class 2 medical, English proficiency, exams + skills test + experience.",
      "PPL privilege limit: NO remuneration / hire and reward — cannot be paid to fly.",
      "The licence does not expire; the medical/ratings/recency must stay valid.",
      "Passenger recency: the prescribed recent take-offs and landings.",
    ],
    traps: [
      "A PPL may NOT fly for reward — that is the defining difference from the CPL.",
      "PPL age is 17 (Class 2 medical); CPL is 18 (Class 1). Don't mix them up.",
    ],
  },
  {
    sectionId: "5.4",
    title: "CAR Part 67 — Medical Certification",
    intro:
      "Part 67 sets the medical fitness standards. For the PPL the relevant certificate is Class 2. Know the classes, validity and the duty not to fly when unfit.",
    blocks: [
      {
        heading: "1. Classes, validity & duties",
        points: [
          "Class 1 is for the CPL/ATPL; Class 2 is for the PPL; other classes cover ATCs and related personnel.",
          "A medical is issued by a Designated Aviation Medical Examiner (DAME); validity depends on class and age (confirm the exact months against the current CARs).",
          "A holder must not exercise licence privileges when aware of any decrease in medical fitness; the authority may suspend or cancel a medical.",
        ],
      },
    ],
    mustKnow: [
      "PPL requires a Class 2 medical; CPL a Class 1.",
      "Issued via a Designated Aviation Medical Examiner (DAME).",
      "Do not fly if aware of any decrease in medical fitness.",
    ],
    traps: [
      "A Class 2 medical is for the PPL — the pilot must self-ground when unfit.",
    ],
  },
  {
    sectionId: "5.5",
    title: "CAR Part 91 — General Operating & Flight Rules",
    intro:
      "Part 91 is the core of day-to-day flying law: rules of the air, minimum heights, VFR weather minima, documents and fuel. The numbers here (heights, minima, right of way) are prime PPL exam material.",
    blocks: [
      {
        heading: "1. Rules of the air",
        points: [
          "Right of way: converging at similar height, the aircraft with the other on its LEFT gives way (aircraft on the other's right has priority); head-on — both turn RIGHT; overtaking — pass on the RIGHT and keep clear.",
          "Least manoeuvrable has priority: balloons > gliders > airships > powered aircraft; a landing aircraft has priority over one in flight or on the ground.",
          "Minimum heights: 500 ft from any person/vessel/vehicle/structure; over a congested area, 1000 ft above the highest obstacle within the prescribed radius, and able to glide clear.",
          "Semi-circular rule (VFR): magnetic track 0–179° → odd thousands + 500 ft; 180–359° → even thousands + 500 ft.",
        ],
      },
      {
        heading: "2. VMC minima, documents & fuel",
        points: [
          "VFR requires flight in VMC — the minimum visibility and distance from cloud vary with airspace and altitude; special VFR may be authorised in a control zone below normal VMC.",
          "Documents to be carried, an aircraft flight manual and checklists, flight folio, and fuel/oil record are required; the PIC confirms airworthiness before flight.",
          "Fuel: carry enough for the flight plus the prescribed reserve; brief passengers on seatbelts, exits and safety equipment before flight.",
        ],
      },
    ],
    mustKnow: [
      "Converging: aircraft on the other's RIGHT has right of way; head-on and overtaking → turn RIGHT.",
      "Min 500 ft from persons/structures; 1000 ft above obstacles over congested areas.",
      "Semi-circular VFR: 0–179°M odd+500, 180–359°M even+500.",
      "VFR needs VMC; special VFR may be authorised in a control zone.",
      "Carry fuel for the flight plus reserve; brief passengers before flight.",
    ],
    traps: [
      "Overtaking and head-on: turn RIGHT.",
      "Least manoeuvrable (balloon > glider > airship > powered) has priority.",
    ],
  },
  {
    sectionId: "5.6",
    title: "CAR Part 139 — Aerodromes & Heliports",
    intro:
      "Part 139 governs the licensing and safe operation of aerodromes. As a private pilot you mainly need to know that aerodromes are licensed/approved and that the operator is responsible for the surfaces, lighting and obstacle control you rely on.",
    blocks: [
      {
        heading: "1. Licensing & responsibilities",
        points: [
          "Aerodromes used for certain operations must be licensed or approved by the authority; the licence category matches the operations allowed.",
          "The aerodrome operator maintains the movement area, markings, lighting and obstacle control, and notifies changes/hazards (e.g. by NOTAM).",
        ],
      },
    ],
    mustKnow: [
      "Aerodromes for defined operations must be licensed/approved.",
      "The aerodrome operator maintains surfaces, markings, lighting and obstacle control.",
      "Changes/hazards are notified by NOTAM — pilots must check them.",
    ],
    traps: [
      "The operator (not the pilot) maintains the aerodrome, but the pilot must check NOTAMs for its status.",
    ],
  },
  {
    sectionId: "5.7",
    title: "Operational Procedures — SAR & Investigation",
    intro:
      "Two ICAO Annexes complete Air Law: Annex 12 (Search and Rescue) and Annex 13 (Accident Investigation). Know the SAR phases and ground-to-air signals, and the single purpose of an investigation.",
    blocks: [
      {
        heading: "1. Annex 12 — Search and Rescue",
        points: [
          "Three emergency phases, in increasing seriousness: UNCERTAINTY (INCERFA), ALERT (ALERFA), DISTRESS (DETRESFA).",
          "Ground-air visual signal codes let survivors communicate with searching aircraft — e.g. 'V' = require assistance, 'X' = require medical assistance, 'N' = no, 'Y' = yes.",
          "An aircraft receiving a distress signal must assist as far as it is able and record the position of the aircraft in distress.",
        ],
      },
      {
        heading: "2. Annex 13 — Accident Investigation",
        points: [
          "The SOLE objective of an accident/incident investigation is the prevention of future accidents and incidents — NOT to apportion blame or liability.",
          "The state of occurrence institutes the investigation; the states of registry, operator, design and manufacture may participate.",
        ],
      },
    ],
    mustKnow: [
      "SAR phases: Uncertainty (INCERFA) → Alert (ALERFA) → Distress (DETRESFA).",
      "Ground-air signals: V = require assistance, X = medical assistance, Y = yes, N = no.",
      "Purpose of an investigation = prevention, never blame.",
    ],
    traps: [
      "The phases escalate uncertainty → alert → distress; distress (DETRESFA) is the most serious.",
      "An investigation's purpose is prevention only.",
    ],
  },
];

export function getPPLAirLawNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  return PPL_AIRLAW_NOTES.find((n) => n.sectionId === sectionId);
}
