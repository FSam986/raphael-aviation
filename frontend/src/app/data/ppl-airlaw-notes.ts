// ============================================================================
// SACAA PPL — AIR LAW STUDY NOTES
// Original study material for the PPL (Aeroplane) Air Law syllabus
// (Appendix 1.0). Values are stated explicitly from the current South African
// Civil Aviation Regulations (CARs) and ICAO Convention/Annexes (public legal
// material), paraphrased in original wording — NOT copied from any textbook.
// Section ids match ppl-syllabus.ts. figureTopics pull the shared Air Law
// illustrations (see airlaw-figures.ts) into the Learn tab.
// ============================================================================

import type { AirLawSectionNote } from "./airlaw-notes";

export const PPL_AIRLAW_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "1",
    title: "ICAO — Convention & Articles",
    intro:
      "The Convention on International Civil Aviation (the Chicago Convention, 1944) is the treaty that founded ICAO and set the framework for international flying. PPL Air Law tests the key principles — sovereignty, the documents an aircraft must carry, the Annexes, and the recognition of licences and certificates.",
    blocks: [
      {
        heading: "1. The Convention & ICAO",
        points: [
          "The Chicago Convention (1944) established the International Civil Aviation Organisation (ICAO), a UN specialised agency based in Montreal that promotes safe, orderly international civil aviation.",
          "Article 1: every contracting state has COMPLETE and EXCLUSIVE sovereignty over the airspace above its territory (land areas and adjacent territorial waters).",
          "The Convention applies only to CIVIL aircraft, not to state aircraft (military, customs and police), which need special authorisation to fly over or into another state.",
          "ICAO develops Standards And Recommended Practices (SARPs), published as the 19 Annexes to the Convention. A Standard is binding (states file differences if they cannot comply); a Recommended Practice is advisory.",
        ],
      },
      {
        heading: "2. The Annexes you should recognise",
        points: [
          "Annex 1 Personnel Licensing · Annex 2 Rules of the Air · Annex 3 Meteorology · Annex 6 Operation of Aircraft · Annex 7 Nationality & Registration Marks · Annex 8 Airworthiness.",
          "Annex 11 Air Traffic Services · Annex 12 Search and Rescue · Annex 13 Accident Investigation · Annex 14 Aerodromes · Annex 17 Security · Annex 19 Safety Management.",
          "Annex 2 (Rules of the Air) is the only Annex whose Standards apply without exception over the high seas — there is no state to make its own rules there.",
        ],
      },
      {
        heading: "3. Documents, marks & recognition (Articles)",
        points: [
          "Documents carried in the aircraft: Certificate of Registration, Certificate of Airworthiness, crew licences, the journey log book, and the radio station licence if radio is fitted (and, on international flights, passenger/cargo manifests).",
          "Nationality and registration marks must be displayed; each aircraft has one Certificate of Registration and one Certificate of Airworthiness and is registered in one state only.",
          "Certificates and licences issued or validated by the state of registry are recognised as valid by other contracting states.",
          "Over a state's territory its rules of the air apply; over the high seas the rules established under the Convention (Annex 2) apply.",
        ],
      },
    ],
    mustKnow: [
      "The Chicago Convention (1944) created ICAO (based in Montreal).",
      "Article 1: each state has complete AND exclusive sovereignty over its airspace.",
      "SARPs are published as the 19 Annexes; a Standard is binding, a Recommended Practice is advisory.",
      "Documents carried: C of R, C of A, crew licences, journey log, radio licence.",
      "Annex 2 (Rules of the Air) applies without exception over the high seas.",
      "Licences/certificates of the state of registry are recognised internationally.",
    ],
    traps: [
      "Sovereignty is 'complete AND exclusive' — the exact phrase examiners look for.",
      "The Convention is the 'Chicago' Convention of 1944 — not Warsaw (liability) or Tokyo/Montreal.",
      "The Convention does NOT apply to state aircraft (military/customs/police).",
    ],
  },
  {
    sectionId: "4",
    title: "Annex 14 — Aerodromes & Visual Aids",
    intro:
      "Annex 14 sets the standards for aerodromes and their visual aids — the markings, lights, signs, signals and slope indicators you read every flight. Learn the colours and shapes precisely, because that is exactly what the exam asks.",
    blocks: [
      {
        heading: "1. Markings, lights & signs",
        figureTopics: ["Visual aids", "Declared distances"],
        points: [
          "Runway markings are WHITE (designation numbers, centreline, threshold 'piano keys', aiming point, touchdown zone); taxiway markings and holding positions are YELLOW.",
          "Runway lights: threshold GREEN, runway edge WHITE, runway end RED. Taxiway: edge BLUE, centreline GREEN. Approach lights are white.",
          "Signs — RED with white inscriptions are MANDATORY instruction signs (e.g. runway-holding position, 'No Entry'); YELLOW with black are information/location/direction signs.",
          "Declared distances published for a runway: TORA (take-off run), TODA = TORA + clearway, ASDA = TORA + stopway, LDA (landing distance available).",
        ],
      },
      {
        heading: "2. Approach slope indicators (PAPI / VASI)",
        figureTopics: ["Visual aids"],
        points: [
          "PAPI and VASI give a visual glidepath by day and night using white/red light units beside the runway.",
          "PAPI on slope: two white and two red. Too high → more white (up to all white); too low → more red (up to all red). Memory: 'red over white, you're alright; all red, you're dead'.",
          "VASI (older, two-bar): on slope the near bar is white and the far bar red; both white = too high; both red = too low.",
        ],
      },
      {
        heading: "3. Signals, the signal area & light-gun signals",
        points: [
          "The signal area (a marked square near the tower) displays ground signals about aerodrome conditions: a white 'landing T' shows the take-off/landing direction; a white dumb-bell restricts movement to paved areas (a red 'L' on it allows light aircraft on grass).",
          "A double white cross = glider operations in progress; a red square with yellow diagonals = aerodrome UNSAFE, do not land; a white/yellow 'X' on the runway = runway unserviceable.",
          "Light-gun signals from the tower (no radio): STEADY GREEN = cleared to land / take off; STEADY RED = give way / stop; FLASHING GREEN = cleared to taxi / return to land; FLASHING RED = taxi clear of landing area / aerodrome unsafe; FLASHING WHITE = return to starting point; RED pyrotechnic = do not land for the time being.",
        ],
      },
    ],
    mustKnow: [
      "Runway markings WHITE; taxiway/holding markings YELLOW.",
      "Threshold lights GREEN, edge WHITE, runway end RED; taxiway edge BLUE, centreline GREEN.",
      "Red/white signs = mandatory; yellow/black = information/location.",
      "PAPI/VASI on slope: two white + two red (PAPI) / near white far red (VASI).",
      "Red square with yellow diagonals = aerodrome unsafe, do not land.",
      "Light gun: steady green = cleared land/take-off; steady red = give way/stop.",
      "Declared distances: TORA, TODA (+clearway), ASDA (+stopway), LDA.",
    ],
    traps: [
      "Threshold lights are GREEN; runway-end lights are RED (same fixtures viewed from opposite ends).",
      "A red square with yellow diagonals means DO NOT LAND — not merely 'caution'.",
      "A FLASHING red light gun to an aircraft in flight = aerodrome unsafe, do not land.",
    ],
  },
  {
    sectionId: "5.1",
    title: "CAR Part 1 — Definitions & Abbreviations",
    intro:
      "Part 1 defines the terms used throughout the regulations. Exam questions hinge on exact wording — 'accident' vs 'incident', the definition of 'night', serious injury, and airspace terms.",
    blocks: [
      {
        heading: "1. Occurrence & injury definitions",
        points: [
          "Accident: an occurrence, between the time any person boards with the intention of flight and the time all have disembarked, in which a person is fatally or seriously injured, the aircraft sustains damage or structural failure, or the aircraft is missing or completely inaccessible.",
          "Serious injury includes: hospitalisation for more than 48 hours (beginning within 7 days of the injury); any fracture except simple fractures of fingers, toes or nose; severe haemorrhage or nerve/muscle/tendon damage; internal-organ injury; second/third-degree burns or burns over more than 5% of the body; exposure to infectious substances or harmful radiation.",
          "A fatal injury is one resulting in death within 30 days of the accident.",
          "Incident: an occurrence, other than an accident, associated with the operation of an aircraft that affects or could affect the safety of operation.",
        ],
      },
      {
        heading: "2. Operational & airspace terms",
        points: [
          "Pilot-in-command (PIC): the pilot responsible for the operation and safety of the aircraft during flight time.",
          "Night: the hours between the end of evening civil twilight and the beginning of morning civil twilight (civil twilight ends when the centre of the sun is 6° below the horizon).",
          "Flight time (aeroplane): from the moment the aircraft first moves under its own power for the purpose of taking off until it comes to rest at the end of the flight ('block to block').",
          "Control zone (CTR): controlled airspace extending from the surface upwards to a specified upper limit. Control area (CTA)/TMA: controlled airspace from a specified lower limit upwards. FIR: an airspace of defined dimensions within which flight information and alerting services are provided.",
        ],
      },
    ],
    mustKnow: [
      "Accident = fatal/serious injury, aircraft damage/structural failure, or aircraft missing (boarding→disembarking).",
      "Serious injury = >48 h hospitalisation, any fracture except fingers/toes/nose, severe burns (>5% body), etc.",
      "Fatal injury = death within 30 days of the accident.",
      "Incident = affects or could affect safety but is not an accident.",
      "Night = end of evening to start of morning civil twilight (sun 6° below horizon).",
      "Flight time (aeroplane) = block to block (first moves under own power → comes to rest).",
    ],
    traps: [
      "Simple fractures of fingers, toes or nose are NOT 'serious injury'.",
      "'Night' is defined by civil twilight, not simply sunset to sunrise.",
      "A fatality counts only if death occurs within 30 days of the accident.",
    ],
  },
  {
    sectionId: "5.2",
    title: "CAR Part 12 — Aviation Accidents & Incidents",
    intro:
      "Part 12 covers reporting and protecting the scene after an accident or incident. Know who reports, how fast, what particulars, and the rule against disturbing wreckage.",
    blocks: [
      {
        heading: "1. Notification",
        points: [
          "An accident or serious incident must be reported to the authority (the AIID) by the quickest available means, without delay. The duty falls first on the PIC; if the PIC is unable, on the owner or operator.",
          "The initial notification gives: the aircraft type, nationality and registration marks; the name of the owner/operator and the PIC; the date and time; the last point of departure and intended destination; the position; the number of crew/passengers and the number killed or seriously injured; and the extent of damage, as far as known.",
          "A written report follows the initial notification within the prescribed period.",
        ],
      },
      {
        heading: "2. Protecting the scene & purpose",
        points: [
          "Wreckage, contents and marks must NOT be moved or interfered with except to save life or relieve suffering, to prevent destruction (e.g. by fire), or by the authority of the investigator-in-charge — if something must be moved, record its original position (sketch/photograph).",
          "No person may remove, conceal or tamper with the wreckage or its records.",
          "The SOLE purpose of the investigation is the PREVENTION of future accidents and incidents — never to apportion blame or liability.",
        ],
      },
    ],
    mustKnow: [
      "Report accidents/serious incidents to the authority (AIID) by the quickest means, without delay.",
      "Duty to report: PIC first, then owner/operator.",
      "Do not disturb wreckage except to save life, relieve suffering, prevent destruction, or by the investigator.",
      "Purpose of an investigation = prevention, not blame.",
    ],
    traps: [
      "The purpose of an investigation is prevention of future accidents — never to apportion blame.",
      "You may disturb wreckage only for the three reasons (save life, relieve suffering, prevent destruction) or on the investigator's authority.",
    ],
  },
  {
    sectionId: "5.3",
    title: "CAR Part 61 — Flight Crew Licensing (PPL)",
    intro:
      "Part 61 sets out the Private Pilot Licence you are working toward. Expect questions on the PPL experience requirements (know the hours), its privileges (and the crucial NO-remuneration limit), validity, recency, and the ratings that go with it. Note where PPL figures differ from the CPL.",
    blocks: [
      {
        heading: "1. PPL(A) age, medical & experience",
        points: [
          "Minimum age: 17 years to be ISSUED a PPL (Aeroplane); a student pilot may fly SOLO from 16.",
          "Hold a valid Class 2 medical certificate and demonstrate English language proficiency at ICAO Operational Level 4 or higher.",
          "Minimum experience: 45 hours total flight time (of which up to 5 hours may be in an approved flight simulation training device).",
          "Of the 45 hours: at least 25 hours dual instruction, and at least 15 hours as pilot-in-command (solo) — including at least 5 hours solo cross-country, with one cross-country flight of at least 150 NM (270 km) making full-stop landings at two aerodromes different from the departure aerodrome.",
          "Pass the theoretical knowledge examinations and the practical skills test with a designated flight examiner.",
        ],
      },
      {
        heading: "2. Privileges, validity & recency",
        points: [
          "Privileges: act as PIC or co-pilot of an aeroplane for which the appropriate ratings are held, but NOT for remuneration or reward (hire and reward) — a private pilot may not be paid to fly.",
          "The PPL itself does not expire; it is exercised only while the medical, ratings and recency are valid. Theoretical-knowledge credits for the skills test are valid for a limited period, and the skills test must be passed within the prescribed time after the exams.",
          "Passenger recency: to carry passengers you must have carried out, within the preceding 90 days, at least 3 take-offs and 3 landings as the sole manipulator in the same class/type (for a tailwheel aeroplane, to a full stop). To carry passengers at NIGHT you must have done 3 of those take-offs and landings by night in the preceding 90 days.",
        ],
      },
      {
        heading: "3. Ratings",
        points: [
          "A class or type rating authorises you to fly that class/type; it is revalidated by a proficiency check and by meeting the recency requirements, and can be renewed if it lapses.",
          "A night rating is required to fly at night; it requires prescribed additional dual instrument and night training (including night circuits and a night cross-country).",
          "Instrument, instructor and other ratings each have their own experience, test and validity requirements.",
        ],
      },
    ],
    mustKnow: [
      "PPL(A): min age 17 (solo from 16), valid Class 2 medical, English Level 4.",
      "Experience: 45 h total (max 5 h FSTD); ≥25 h dual; ≥15 h PIC incl ≥5 h solo cross-country.",
      "The qualifying cross-country: ≥150 NM (270 km) with full-stop landings at 2 aerodromes other than departure.",
      "PPL privilege limit: NO remuneration / hire and reward — cannot be paid to fly.",
      "Passenger recency: 3 take-offs + 3 landings in the last 90 days (3 by night to carry passengers at night).",
    ],
    traps: [
      "A PPL may NOT fly for reward — that is the defining difference from the CPL.",
      "PPL age is 17 (Class 2 medical); CPL is 18 (Class 1). Don't mix them up.",
      "Passenger recency is 90 days — and night recency is separate from day recency.",
    ],
  },
  {
    sectionId: "5.4",
    title: "CAR Part 67 — Medical Certification",
    intro:
      "Part 67 sets the medical fitness standards. For the PPL the relevant certificate is Class 2. Know the classes, the exact validity periods by age, and the duty not to fly when unfit.",
    blocks: [
      {
        heading: "1. Classes & who needs them",
        points: [
          "Class 1: required for the CPL and ATPL. Class 2: required for the PPL. Class 3: air traffic controllers. Class 4: cabin crew / certain other personnel.",
          "A medical certificate is issued by a Designated Aviation Medical Examiner (DAME) after an examination; the first issue and renewals follow the Part 67 standards.",
        ],
      },
      {
        heading: "2. Validity periods",
        points: [
          "Class 2 (PPL): valid 60 months if under 40 years of age; 24 months from 40 to under 50; and 12 months from 50 years and older.",
          "Class 1 (CPL/ATPL): valid 12 months, reduced to 6 months for single-pilot commercial air-transport operations carrying passengers, and for holders aged 60 and over.",
          "If a skills/revalidation check or the medical is completed within the prescribed window before expiry, the new validity usually runs from the previous expiry date (so you don't lose the overlap).",
        ],
      },
      {
        heading: "3. Duties of the holder",
        points: [
          "A holder must NOT exercise licence privileges when aware of any decrease in medical fitness that would make them unable to perform their duties safely — the pilot self-grounds.",
          "The authority must be informed if the holder is unable to perform flight-crew functions because of illness or injury expected to last more than 21 days (and of pregnancy); the medical may be suspended until fitness is re-established.",
          "A person whose medical has been suspended or withdrawn may appeal to the Director within the prescribed period.",
        ],
      },
    ],
    mustKnow: [
      "PPL requires a Class 2 medical; CPL/ATPL a Class 1; ATC a Class 3.",
      "Class 2 validity: 60 months (<40), 24 months (40–<50), 12 months (50+).",
      "Class 1 validity: 12 months, 6 months for single-pilot commercial passenger ops and age 60+.",
      "Issued by a Designated Aviation Medical Examiner (DAME).",
      "Self-ground if aware of any decrease in medical fitness; report illness/injury expected to last >21 days.",
    ],
    traps: [
      "A Class 2 medical is for the PPL — the pilot must self-ground when unfit.",
      "Class 2 validity changes at 40 and at 50 — not a single fixed period.",
      "Report to the authority when illness/injury is expected to exceed 21 days.",
    ],
  },
  {
    sectionId: "5.5",
    title: "CAR Part 91 — General Operating & Flight Rules",
    intro:
      "Part 91 is the core of day-to-day flying law: rules of the air, minimum heights, VFR weather minima, cruising levels, documents, equipment and fuel. The numbers here are prime PPL exam material — learn them exactly.",
    blocks: [
      {
        heading: "1. Rules of the air & cruising levels",
        figureTopics: ["Cruising levels"],
        points: [
          "Right of way: when converging at a similar height, the aircraft that has the other on its RIGHT must give way (the aircraft on the right has priority); head-on — both turn RIGHT; overtaking — alter heading to the RIGHT and keep clear until past.",
          "Order of priority (least manoeuvrable first): balloons, then gliders, then airships, then powered aeroplanes/helicopters. An aircraft in distress, and an aircraft landing or on final approach, have priority.",
          "Minimum heights: except for take-off and landing, do not fly below 500 ft from any person, vessel, vehicle or structure. Over a congested area of a city/town or an open-air assembly of people: at least 1000 ft above the highest fixed obstacle within 600 m of the aircraft, and high enough to glide clear in the event of engine failure.",
          "Semi-circular (cruising-levels) rule by magnetic track: 000°–179° take ODD thousands of feet; 180°–359° take EVEN thousands. VFR flights fly 500 ft above the corresponding IFR level.",
        ],
      },
      {
        heading: "2. VMC minima & special VFR",
        figureTopics: ["Altimetry & transition"],
        points: [
          "At and above FL100: flight visibility 8 km, and 1500 m horizontally and 1000 ft vertically clear of cloud.",
          "Below FL100 but above 3000 ft AMSL (or 1000 ft above terrain, whichever is higher): flight visibility 5 km, and 1500 m horizontally and 1000 ft vertically clear of cloud.",
          "At or below 3000 ft AMSL (or 1000 ft above terrain, whichever is higher): flight visibility 5 km, clear of cloud and in sight of the surface.",
          "Special VFR may be authorised by ATC in a control zone when conditions are below normal VMC: flight visibility at least 1500 m, clear of cloud and in sight of the surface, on an ATC clearance.",
          "Altimetry: set QNH below the transition altitude (altimeter reads altitude above sea level) and the standard setting 1013.25 hPa above the transition level (flying flight levels).",
        ],
      },
      {
        heading: "3. Documents, equipment, lights & fuel",
        points: [
          "Documents to be carried: Certificate of Registration, Certificate of Airworthiness, the aircraft flight manual, the certificate of release to service, the mass-and-balance data, the radio station licence, crew licences, the flight folio/journey log, and proof of insurance.",
          "Navigation lights must be displayed from sunset to sunrise (and when otherwise required): RED on the left wingtip, GREEN on the right, WHITE at the tail, plus an anti-collision light.",
          "Fuel: carry enough to fly to the destination plus a final reserve — for a piston aeroplane, fuel for 30 minutes at normal cruising (turbine: 30 minutes holding at 1500 ft). Night and IFR flights add fuel to a suitable alternate plus contingency.",
          "Refuelling with passengers on board, boarding or disembarking is restricted/supervised; the PIC briefs passengers on seat belts, exits and emergency equipment before flight.",
        ],
      },
    ],
    mustKnow: [
      "Converging: the aircraft on the other's RIGHT has right of way; head-on and overtaking → turn RIGHT.",
      "Priority order: balloon > glider > airship > powered aeroplane; distress and landing aircraft have priority.",
      "Min 500 ft from persons/structures; 1000 ft above the highest obstacle within 600 m over congested areas.",
      "VMC: ≥FL100 8 km + 1500 m/1000 ft; <FL100 5 km + 1500 m/1000 ft; ≤3000 ft 5 km clear of cloud in sight of surface.",
      "Special VFR (CTR): ≥1500 m visibility, clear of cloud, in sight of surface, on ATC clearance.",
      "Semi-circular (magnetic track): 000–179° odd thousands, 180–359° even thousands; VFR +500 ft.",
      "Fuel: destination + 30 min final reserve (piston); nav lights sunset–sunrise, red left / green right / white tail.",
    ],
    traps: [
      "Overtaking and head-on: turn RIGHT.",
      "Least manoeuvrable (balloon > glider > airship > powered) has priority.",
      "Congested-area minimum is 1000 ft above the highest obstacle within 600 m — know both numbers.",
      "Final reserve is 30 minutes (piston) — don't confuse with other states' 45-minute figures.",
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
          "Aerodromes used for certain operations must be licensed or approved by the authority; the licence category matches the operations allowed (e.g. by aircraft size and type of traffic).",
          "The aerodrome operator maintains the movement area, markings, lighting and obstacle control, runs a safety management system, and notifies changes or hazards (e.g. by NOTAM).",
          "Before flying to a field the pilot checks its licence/status, published data and current NOTAMs.",
        ],
      },
    ],
    mustKnow: [
      "Aerodromes for defined operations must be licensed/approved; the category matches the operations.",
      "The aerodrome operator maintains surfaces, markings, lighting and obstacle control (and runs an SMS).",
      "Changes/hazards are notified by NOTAM — pilots must check them before flight.",
    ],
    traps: [
      "The operator (not the pilot) maintains the aerodrome, but the pilot must check NOTAMs for its status.",
    ],
  },
  {
    sectionId: "5.7",
    title: "Operational Procedures — SAR & Investigation",
    intro:
      "Two ICAO Annexes complete Air Law: Annex 12 (Search and Rescue) and Annex 13 (Accident Investigation). Know the emergency phases, the ground-to-air signals, and the single purpose of an investigation.",
    blocks: [
      {
        heading: "1. Annex 12 — Search and Rescue",
        points: [
          "Three emergency phases, in increasing seriousness: UNCERTAINTY (INCERFA) → ALERT (ALERFA) → DISTRESS (DETRESFA). Uncertainty exists when there is doubt about safety; alert when apprehension exists; distress when there is reasonable certainty of grave and imminent danger.",
          "An aircraft that intercepts a distress call must, so far as it is able, acknowledge it, record the position of the craft in distress, take a bearing, and proceed to assist and inform the rescue coordination centre.",
          "Ground-to-air body/visual signals from survivors: V = require assistance; X = require medical assistance; N = No; Y = Yes; an arrow (↑) = proceeding in this direction.",
        ],
      },
      {
        heading: "2. Annex 13 — Accident Investigation",
        points: [
          "The SOLE objective of an accident/incident investigation is the PREVENTION of future accidents and incidents — NOT to apportion blame or liability.",
          "The state of occurrence institutes the investigation; the states of registry, operator, design and manufacture may appoint accredited representatives to participate.",
          "The final report is made public in the interest of safety; it is not intended for use in legal proceedings to assign fault.",
        ],
      },
    ],
    mustKnow: [
      "SAR phases: Uncertainty (INCERFA) → Alert (ALERFA) → Distress (DETRESFA).",
      "Ground-to-air signals: V = require assistance, X = require medical assistance, Y = Yes, N = No.",
      "A pilot intercepting a distress call assists as able and records the position.",
      "Purpose of an investigation = prevention, never blame.",
    ],
    traps: [
      "The phases escalate uncertainty → alert → distress; distress (DETRESFA) is the most serious.",
      "V = require assistance, X = require MEDICAL assistance — don't swap them.",
      "An investigation's purpose is prevention only.",
    ],
  },
];

export function getPPLAirLawNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  return PPL_AIRLAW_NOTES.find((n) => n.sectionId === sectionId);
}
