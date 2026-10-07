// ============================================================================
// SACAA CPL — AIR LAW STUDY NOTES
// Original study material written for the SACAA CPL Air Law syllabus
// (Appendix 2.0A, subject A.3). Content is paraphrased from the underlying
// South African Civil Aviation Regulations (CARs) and ICAO Annexes — public
// legal/factual material — in original wording. NOT copied from any textbook.
// Exam-focused: the rule, the number examiners test, and the common traps.
// Mirrors the met-notes SectionNote shape so the Learn tab renders it directly.
// ============================================================================

export interface AirLawNoteBlock {
  heading: string;
  points: string[];
}

export interface AirLawSectionNote {
  sectionId: string; // e.g. "A.3.1"
  title: string;
  intro: string;
  blocks: AirLawNoteBlock[];
  mustKnow: string[];
  traps: string[];
}

export const AIRLAW_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "A.3.1",
    title: "Definitions & Abbreviations (CAR Part 1)",
    intro:
      "Part 1 of the Civil Aviation Regulations defines the terms used throughout all the other Parts. Air Law questions lean heavily on knowing these definitions precisely, because a single word (e.g. 'accident' vs 'incident', or the exact boundary of a 'control zone') changes the correct answer. Learn them as exact meanings, not rough ideas.",
    blocks: [
      {
        heading: "1. Core operational terms",
        points: [
          "Pilot-in-command (PIC): the pilot responsible for the operation and safety of the aircraft during flight time.",
          "Flight time (aeroplane): from the moment the aircraft first moves under its own power for take-off until it comes to rest at the end of the flight.",
          "Aircraft: any machine that can derive support in the atmosphere from the reactions of the air, other than reactions against the earth's surface.",
          "Aerodrome: a defined area on land or water intended for the arrival, departure and surface movement of aircraft.",
          "Flight level (FL): a surface of constant atmospheric pressure referenced to 1013.25 hPa, separated from other such surfaces by specific pressure intervals.",
        ],
      },
      {
        heading: "2. Accident vs incident (high-yield)",
        points: [
          "Accident: an occurrence associated with the operation of an aircraft, between the time persons board with the intention of flight and the time all have disembarked, in which a person is fatally or seriously injured, the aircraft sustains damage/structural failure, or the aircraft is missing or completely inaccessible.",
          "Serious injury: injury requiring hospitalisation, involving fractures (except simple fingers/toes/nose), severe haemorrhage/nerve/muscle/tendon damage, internal organ injury, second/third-degree burns, or confirmed exposure to infectious substances/harmful radiation.",
          "Incident: an occurrence, other than an accident, associated with the operation of an aircraft that affects or could affect safety.",
          "Serious incident: an incident involving circumstances indicating an accident nearly occurred.",
        ],
      },
      {
        heading: "3. Airspace & meteorological terms",
        points: [
          "IMC / VMC: Instrument / Visual Meteorological Conditions — met conditions expressed as visibility, distance from cloud and ceiling, below / at-or-above specified minima.",
          "Control zone (CTR): controlled airspace extending upwards from the surface to a specified upper limit.",
          "TMA (Terminal Control Area): controlled airspace normally established at the confluence of ATS routes near one or more major aerodromes.",
          "FIR (Flight Information Region): airspace of defined dimensions within which flight information and alerting services are provided.",
        ],
      },
    ],
    mustKnow: [
      "Accident window: from boarding with intent to fly until everyone has disembarked.",
      "Accident = fatal/serious injury, aircraft damage/structural failure, or aircraft missing/inaccessible.",
      "Incident = affects or could affect safety but is not an accident; serious incident = nearly an accident.",
      "PIC is responsible for the operation and safety of the flight.",
      "Flight time (aeroplane) = first move under own power for take-off → coming to rest.",
    ],
    traps: [
      "Simple finger/toe/nose fractures are NOT 'serious injury'.",
      "Damage limited to engine, cowlings, tips, tyres or small skin punctures usually does NOT make an occurrence an 'accident'.",
      "The accident time window starts at boarding-with-intent-to-fly, not at engine start or take-off.",
    ],
  },
  {
    sectionId: "A.3.2",
    title: "Aviation Accidents & Incidents (CAR Part 12)",
    intro:
      "Part 12 covers what you must do when an accident or incident happens: who to notify, how fast, and how to protect the scene. Examiners test the reporting chain and the rule that you may not disturb the wreckage. Know the obligations that fall on the pilot/owner.",
    blocks: [
      {
        heading: "1. Notification",
        points: [
          "Any accident or serious incident must be reported to the responsible authority (the accident and incident investigation function) by the quickest available means, without delay.",
          "The obligation falls on the pilot-in-command, or if they are unable, the owner/operator of the aircraft.",
          "A written report follows the initial notification within the period prescribed by the regulations.",
          "Notification includes identifying the aircraft, the crew, the location, the number of casualties, and the extent of damage as known.",
        ],
      },
      {
        heading: "2. Protecting the scene",
        points: [
          "The wreckage, and any contents or marks at the site, must not be moved or interfered with except to save life, relieve suffering, prevent destruction (e.g. fire), or by authority of the investigator.",
          "If something must be moved to remove survivors or prevent further damage, a record (sketch/photograph/note of original position) should be made where possible.",
          "Access to the site is controlled so that evidence is preserved for the investigation.",
        ],
      },
      {
        heading: "3. Purpose of investigation",
        points: [
          "The sole objective of an accident/incident investigation is the prevention of future accidents and incidents — NOT to apportion blame or liability.",
          "This 'no-blame' principle encourages open reporting so lessons can be learned.",
        ],
      },
    ],
    mustKnow: [
      "Report accidents/serious incidents to the authority by the quickest means, without delay.",
      "Duty to report falls on the PIC first, then the owner/operator.",
      "Do NOT move wreckage except to save life, relieve suffering, prevent destruction, or by the investigator's authority.",
      "Investigation purpose = prevention, not blame.",
    ],
    traps: [
      "The purpose of an investigation is prevention — never to assign blame/liability.",
      "You may move wreckage only for the specific exceptions (life, suffering, fire, authority) — record the original position if you do.",
    ],
  },
  {
    sectionId: "A.3.3",
    title: "General Maintenance Rules (CAR Part 43)",
    intro:
      "Part 43 governs how aircraft are maintained and how that maintenance is recorded and released. As a CPL you must know who may sign for work, what a Certificate of Release to Service means, the logbook system, and the few maintenance tasks a pilot-owner is allowed to do. It ties directly into whether an aircraft is legally airworthy before you fly it.",
    blocks: [
      {
        heading: "1. Who may maintain and release",
        points: [
          "Maintenance must be carried out by an appropriately licensed Aircraft Maintenance Engineer (AME) or an approved Aircraft Maintenance Organisation (AMO), within the scope of their approval.",
          "After maintenance, a Certificate of Release to Service (CRS) is issued certifying the work was done in accordance with the approved data — the aircraft may not be returned to service without it.",
          "The pilot-in-command is ultimately responsible for confirming the aircraft is airworthy and the required documents/certificates are valid before flight.",
        ],
      },
      {
        heading: "2. Records and logbooks",
        points: [
          "Separate logbooks are kept for the airframe, each engine and each variable-pitch propeller; maintenance, inspections and defects are recorded in them.",
          "Entries must be accurate; making a false entry, or omitting a required entry, is a serious offence.",
          "Logbook records must be retained for the periods prescribed and produced to the authority on request.",
        ],
      },
      {
        heading: "3. Inspections, compass swing, pilot tasks",
        points: [
          "Aircraft are subject to periodic/mandatory inspections and to Airworthiness Directives; overdue inspections make the aircraft un-airworthy.",
          "A compass swing (calibration of the magnetic compass and completion of a new deviation card) is required after specified events — e.g. installation/relocation of equipment affecting the compass, or at prescribed intervals.",
          "A limited list of simple maintenance tasks may be performed by a pilot who is the owner/operator, but only those specifically permitted, and the work must still be recorded.",
        ],
      },
    ],
    mustKnow: [
      "Maintenance is done by a licensed AME or approved AMO within their approval.",
      "A Certificate of Release to Service (CRS) is required before return to service.",
      "Airframe, engine and propeller each have their own logbook; false/omitted entries are an offence.",
      "The PIC must confirm airworthiness and valid documents before flight.",
      "A compass swing produces a new deviation card after equipment changes / at set intervals.",
    ],
    traps: [
      "No aircraft returns to service after maintenance without a CRS.",
      "Only the specifically permitted simple tasks may be done by a pilot-owner — everything else needs an AME/AMO.",
      "Falsifying or omitting a logbook entry is a serious offence, not a paperwork technicality.",
    ],
  },
  {
    sectionId: "A.3.4",
    title: "Pilot Licensing (CAR Part 61)",
    intro:
      "Part 61 sets out the licences, ratings, requirements and privileges for pilots — including the CPL you are working toward. Expect questions on the exact CPL(A) requirements, how privileges and validity work, and the difference between a licence (which does not itself expire) and the ratings, medical and tests that keep it usable.",
    blocks: [
      {
        heading: "1. CPL(A) requirements",
        points: [
          "Minimum age 18 years; hold a valid Class 1 medical certificate; demonstrate the required level of English language proficiency.",
          "Pass the prescribed theoretical knowledge examinations (all the CPL subjects) and the practical skills test with a designated flight examiner.",
          "Meet the minimum flying experience prescribed by the regulations (a set total flight time, with minimums for PIC time, cross-country and instrument time). Verify the exact hour figures against the current CARs / your ATO.",
        ],
      },
      {
        heading: "2. Privileges of the CPL(A)",
        points: [
          "Exercise all privileges of a Private Pilot Licence.",
          "Act as pilot-in-command or co-pilot of an aeroplane engaged in operations other than commercial air transport.",
          "Act as PIC in commercial air transport of single-pilot certified aeroplanes, and as co-pilot in commercial air transport, subject to the ratings held and operational rules.",
          "Be remunerated for flying — the key difference from the PPL.",
        ],
      },
      {
        heading: "3. Licence, ratings, validity and recency",
        points: [
          "The licence itself does not expire, but it can only be exercised while the medical certificate, the relevant ratings, and any required tests/checks are valid.",
          "Ratings (e.g. type/class, night, instrument) have their own validity periods and revalidation requirements.",
          "Recency: to carry passengers you must have completed the prescribed recent take-offs and landings within the specified period; instrument privileges have their own recency.",
          "Flight time must be logged in the prescribed manner as evidence of experience and recency.",
        ],
      },
    ],
    mustKnow: [
      "CPL(A): min age 18, Class 1 medical, English proficiency, exams + skills test, prescribed experience.",
      "CPL privilege that PPL lacks: being remunerated for flying.",
      "The licence does not expire; the medical, ratings and required tests are what must stay valid.",
      "Passenger-carrying recency requires the prescribed recent take-offs and landings.",
      "Exact CPL hour minimums must be confirmed against the current CARs.",
    ],
    traps: [
      "The licence itself does not 'expire' — it is the medical/ratings/recency that lapse.",
      "A Class 1 medical (not Class 2) is required for the CPL.",
      "Privileges are limited by the ratings held and by the operational Part (91/135 etc.), not just the licence.",
    ],
  },
  {
    sectionId: "A.3.6",
    title: "General Operating & Flight Rules (CAR Part 91)",
    intro:
      "Part 91 is the core of day-to-day flying law: the authority of the PIC, the documents and equipment you must carry, the rules of the air (right of way, minimum heights, cruising levels), VFR weather minima, fuel, and radio-failure procedures. It is the largest and most heavily examined Air Law area — the numbers here (heights, minima, reserves) are prime exam material, so confirm the exact figures against the current CARs.",
    blocks: [
      {
        heading: "1. Authority of the PIC & documents",
        points: [
          "The PIC has final authority over the disposition of the aircraft and is responsible for its operation and safety, and for the safety of everyone on board.",
          "The PIC may deviate from any rule in an emergency to the extent required in the interest of safety, and must report such deviation.",
          "Documents to be carried typically include: Certificate of Registration, Certificate of Airworthiness, radio station licence, mass and balance data, the flight folio, valid crew licences and medicals, and (where required) proof of insurance.",
        ],
      },
      {
        heading: "2. Rules of the air — right of way",
        points: [
          "An aircraft that has the right of way maintains heading and speed; the other gives way and does not pass over, under or ahead unless well clear.",
          "Converging at similar height: the aircraft on the OTHER's RIGHT has right of way. Power gives way to balloons, gliders and airships (least manoeuvrable has priority).",
          "Head-on (approaching): each alters heading to the RIGHT.",
          "Overtaking: the overtaking aircraft alters heading to the RIGHT and keeps clear; the overtaken aircraft has right of way.",
          "Landing aircraft have priority over aircraft in flight or on the ground; the lower of two aircraft on final approach has right of way (but must not cut in front).",
        ],
      },
      {
        heading: "3. Minimum heights & cruising levels",
        points: [
          "Except for take-off/landing, do not fly below 500 ft above the ground or water, or closer than 500 ft to any person, vessel, vehicle or structure.",
          "Over a congested area (city/town/settlement) or an open-air assembly of people, do not fly below 1000 ft above the highest obstacle within a specified radius, and always high enough to glide clear in the event of engine failure.",
          "Cruising-level (semi-circular) rule for VFR: on a magnetic track 0°–179°, fly odd thousands of feet + 500 ft; on 180°–359°, fly even thousands + 500 ft (confirm the exact application/altitudes in the CARs).",
        ],
      },
      {
        heading: "4. VFR minima, fuel & radio failure",
        points: [
          "VFR requires flight in VMC — minimum visibility and distance from cloud that vary with airspace class and altitude (e.g. clear of cloud with surface in sight at low level; greater separation at higher levels). Learn the table for each airspace.",
          "Fuel: carry enough for the flight to destination plus the prescribed reserve (and to an alternate where required) — never plan to land with less than the minimum reserve.",
          "Passenger briefing on seatbelts, emergency exits, and safety equipment is required before flight.",
          "Radio Communication Failure (RCF): squawk the RCF transponder code, continue in accordance with the last clearance / published procedure, and in VMC continue visually and land at the nearest suitable aerodrome.",
        ],
      },
    ],
    mustKnow: [
      "PIC has final authority and may deviate from rules in an emergency (and must report it).",
      "Converging: aircraft on the other's RIGHT has right of way; power gives way to gliders/balloons.",
      "Head-on: both turn RIGHT. Overtaking: pass on the RIGHT, keep clear.",
      "Minimum 500 ft from persons/vessels/structures; 1000 ft above obstacles over congested areas.",
      "Semi-circular VFR: 0–179°M odd+500, 180–359°M even+500.",
      "Carry fuel for the flight plus the prescribed reserve; brief passengers before flight.",
    ],
    traps: [
      "In an overtake and head-on, the correct action is to turn RIGHT.",
      "The LEAST manoeuvrable aircraft (balloon > glider > airship > powered) has priority.",
      "500 ft is the general minimum; over congested areas it is 1000 ft above the highest obstacle.",
      "The landing/lower aircraft has priority but must not cut in front of one further along the approach.",
    ],
  },
  {
    sectionId: "A.3.12",
    title: "Air Transport Operations — small aeroplanes (CAR Part 135)",
    intro:
      "Part 135 governs commercial air transport in smaller aeroplanes (broadly, fewer than 20 passenger seats / below a mass threshold). As a new CPL this is the Part you are most likely to operate under first. Know that these flights need an Air Operator Certificate (AOC), an approved operations manual, and higher pilot minimums than private flying.",
    blocks: [
      {
        heading: "1. The operating framework",
        points: [
          "Commercial air transport under Part 135 requires the operator to hold an Air Operator Certificate (AOC) and operate in accordance with an approved Operations Manual.",
          "The operator is responsible for crew training, checking, and rostering within duty and flight-time limits; the PIC operates within those company procedures as well as the CARs.",
        ],
      },
      {
        heading: "2. Pilot requirements & conditions",
        points: [
          "The PIC must meet the minimum experience and recency prescribed for the operation (higher than private flying), plus any type/instrument ratings required.",
          "For flight in IMC or at night, and for IFR operations, additional equipment, crew qualification and (where required) a second pilot / autopilot conditions apply.",
          "Some single-pilot IFR operations are permitted only with a serviceable autopilot or an approved equivalent; otherwise a co-pilot (SIC) is required — confirm the exact conditions in Part 135.",
        ],
      },
    ],
    mustKnow: [
      "Part 135 = commercial air transport in small aeroplanes; needs an AOC + approved Ops Manual.",
      "PIC minimums and recency are higher than for private (Part 91) flying.",
      "IMC/night/IFR bring extra equipment, qualification and crew conditions.",
      "Single-pilot IFR often requires a working autopilot; otherwise a co-pilot is needed.",
    ],
    traps: [
      "Part 135 flying is not just 'Part 91 for money' — it adds AOC, Ops Manual and higher minimums.",
      "The autopilot-vs-co-pilot condition for single-pilot IFR is a classic exam point.",
    ],
  },
  {
    sectionId: "A.3.16",
    title: "RSA AIP — Enroute & Aerodrome Information",
    intro:
      "The Aeronautical Information Publication (AIP) is the official source of the operational information you actually use to fly in South African airspace: airspace classification, ATC and altimeter-setting procedures, and aerodrome/chart details. Exam questions test that you can find and interpret this information rather than memorise it whole.",
    blocks: [
      {
        heading: "1. Airspace classification & services",
        points: [
          "Airspace is classified A–G; each class sets whether IFR/VFR are allowed, whether a clearance is required, what separation/traffic service ATC provides, and the radio and equipment requirements.",
          "Class A is the most restrictive (IFR only, clearance required, ATC separation); Class G is uncontrolled (flight information only, no clearance to enter).",
          "The AIP (ENR section) lists the exact vertical/lateral limits and class of each piece of South African airspace.",
        ],
      },
      {
        heading: "2. Procedures & aerodrome data",
        points: [
          "Altimeter-setting procedures: use QNH below the transition altitude, and the standard setting (1013.25 hPa / flight levels) above the transition level, per the AIP.",
          "The AIP AD/aerodrome sections give runway details, lighting, frequencies, procedures and the plates you interpret before flying to a field.",
          "Chart symbols (aerodrome reference point, VOR/DME, ILS, obstacle heights, runway markings/lighting abbreviations) are decoded using the AIP legend.",
        ],
      },
    ],
    mustKnow: [
      "Airspace classes A–G define IFR/VFR access, clearance, separation and equipment.",
      "Class A = IFR only, clearance required; Class G = uncontrolled, information only.",
      "QNH below transition altitude; standard 1013.25 hPa (flight levels) above transition level.",
      "The AIP is the authoritative source for airspace limits, procedures and aerodrome data.",
    ],
    traps: [
      "Class G is uncontrolled — you don't need a clearance to enter it.",
      "Transition altitude → use QNH below it; transition level → standard setting above it.",
    ],
  },
  {
    sectionId: "A.3.18",
    title: "ICAO Annex 14 — Aerodromes",
    intro:
      "Annex 14 sets the international standards for aerodrome physical characteristics, declared distances, and visual aids (markings, lights, signs). The exam favourites are the four declared distances and the meaning of runway markings and light colours — learn these precisely.",
    blocks: [
      {
        heading: "1. Runway elements & declared distances",
        points: [
          "Threshold: the beginning of the runway usable for landing. Clearway: a defined area beyond the runway, clear of obstacles, over which an aeroplane may make its initial climb. Stopway: a defined area beyond the runway able to support an aeroplane during an aborted take-off.",
          "TORA (Take-Off Run Available): the runway length available for the take-off run.",
          "TODA (Take-Off Distance Available): TORA + clearway.",
          "ASDA (Accelerate-Stop Distance Available): TORA + stopway.",
          "LDA (Landing Distance Available): the length available for the landing run.",
        ],
      },
      {
        heading: "2. Visual aids — markings, lights, signs",
        points: [
          "Runway markings are WHITE (designation numbers, centreline, threshold 'piano keys', aiming point, touchdown zone); taxiway markings are YELLOW.",
          "Runway lighting: threshold lights GREEN, runway edge lights WHITE, runway end lights RED; taxiway edge lights BLUE, centreline GREEN.",
          "PAPI/VASI give a visual glide-path (e.g. PAPI 'two white/two red' = on slope; more red = low, more white = high).",
          "Signs: red/white are mandatory instruction signs (e.g. holding position); yellow/black are location/direction/information signs.",
        ],
      },
    ],
    mustKnow: [
      "TODA = TORA + clearway; ASDA = TORA + stopway; LDA = landing length available.",
      "Runway markings WHITE, taxiway markings YELLOW.",
      "Threshold lights GREEN, edge WHITE, runway end RED; taxiway edge BLUE, centreline GREEN.",
      "PAPI: two red + two white = on glide-path; more red = too low.",
      "Red/white signs = mandatory instructions; yellow/black = information/location.",
    ],
    traps: [
      "Don't confuse clearway (→ TODA) with stopway (→ ASDA).",
      "Threshold lights are GREEN; runway END lights are RED (same fixtures can show green one way, red the other).",
      "'More red, you're dead' — extra red lights on PAPI mean you are too low.",
    ],
  },
  {
    sectionId: "A.3.5",
    title: "Medical Certification (CAR Part 67)",
    intro:
      "Part 67 sets the medical fitness standards for licence holders. For the CPL the relevant certificate is Class 1. Know the classes, roughly how long each is valid, who issues them, and the pilot's ongoing duty not to fly when medically unfit. Confirm the exact validity months against the current CARs — they change with age and operation.",
    blocks: [
      {
        heading: "1. Classes & validity",
        points: [
          "Class 1 medical is required for the CPL/ATPL; Class 2 for the PPL; other classes cover ATCs and related personnel.",
          "A Class 1 is typically valid for 12 months, reduced (e.g. to 6 months) for older pilots or certain single-pilot commercial passenger operations — check the current figure.",
          "Medical examinations are conducted by a Designated Aviation Medical Examiner (DAME) and the certificate is issued under the authority's rules.",
        ],
      },
      {
        heading: "2. Duties of the holder",
        points: [
          "A holder must not exercise the privileges of the licence if they are aware of any decrease in medical fitness that might make them unable to exercise those privileges safely.",
          "Known conditions, use of medication, injury, illness or pregnancy that could affect fitness must be considered, and the holder must not fly while impaired.",
          "The authority may suspend or cancel a medical certificate; substance abuse and failure to meet the standard are grounds for action.",
        ],
      },
    ],
    mustKnow: [
      "CPL requires a Class 1 medical; PPL a Class 2.",
      "Class 1 is broadly valid ~12 months (shorter with age / single-pilot commercial passenger ops).",
      "Issued via a Designated Aviation Medical Examiner (DAME).",
      "Do not fly if aware of any decrease in medical fitness.",
      "The authority can suspend/cancel a medical for failing the standard or substance abuse.",
    ],
    traps: [
      "It is the pilot's own duty to ground themselves when medically unfit — not just the doctor's.",
      "Validity is not fixed — it shortens with age and with single-pilot commercial passenger operations.",
    ],
  },
  {
    sectionId: "A.3.7",
    title: "Dangerous Goods (CAR Part 92)",
    intro:
      "Part 92 controls how dangerous goods (DG) may be carried by air. The overriding rule is that DG may only be carried in accordance with the ICAO Technical Instructions. Know what counts as DG, the training requirement, and the limited items passengers/crew may carry.",
    blocks: [
      {
        heading: "1. Carriage rules",
        points: [
          "Dangerous goods may only be transported in accordance with the ICAO Technical Instructions for the Safe Transport of Dangerous Goods by Air (Doc 9284).",
          "DG must be correctly classified, packed, marked, labelled and documented; the operator must accept and load them according to the rules and segregation requirements.",
          "Persons handling or accepting DG must be trained and current in DG procedures.",
        ],
      },
      {
        heading: "2. Passengers, crew & incidents",
        points: [
          "Only specified items are permitted with passengers or crew (e.g. limited personal medicinal/toiletry items, certain batteries) — most hazardous items are forbidden in baggage/cabin.",
          "Certain undeclared or hidden dangerous goods (e.g. in cargo) are a major hazard; the PIC should be informed of DG on board.",
          "DG accidents/incidents must be reported in accordance with the regulations.",
        ],
      },
    ],
    mustKnow: [
      "DG may only be carried per the ICAO Technical Instructions (Doc 9284).",
      "DG must be classified, packed, marked, labelled and documented correctly.",
      "Anyone handling/accepting DG must be trained.",
      "Only specified limited items are allowed with passengers; the PIC must know of DG on board.",
    ],
    traps: [
      "The governing document is the ICAO Technical Instructions — not just Part 92 alone.",
      "Most hazardous items are forbidden in passenger baggage; only a short permitted list applies.",
    ],
  },
  {
    sectionId: "A.3.8",
    title: "Corporate Operations (CAR Part 93)",
    intro:
      "Part 93 covers corporate aviation — an organisation flying its own aircraft for its own business, not for hire or reward. It sits between private (Part 91) and commercial air transport: non-commercial, but held to elevated standards through a Corporate Aviation Certificate.",
    blocks: [
      {
        heading: "1. What corporate operations are",
        points: [
          "Corporate aviation is the non-commercial operation of aircraft by an organisation in furtherance of its business, where no hire or reward for air transport is involved.",
          "It requires a Corporate Aviation Certificate and operation in accordance with an approved operations manual — more than private flying, but it is NOT commercial air transport.",
          "Crew qualifications, maintenance and operational control are held to standards appropriate to the certificate.",
        ],
      },
    ],
    mustKnow: [
      "Corporate ops = an organisation flying its own aircraft for its own business, NOT for hire/reward.",
      "Requires a Corporate Aviation Certificate + approved operations manual.",
      "Non-commercial, but stricter than private (Part 91) flying.",
    ],
    traps: [
      "Corporate operations are non-commercial — no hire or reward for transport — despite needing a certificate.",
    ],
  },
  {
    sectionId: "A.3.10",
    title: "Air Transport — large aeroplanes (CAR Part 121)",
    intro:
      "Part 121 governs commercial air transport in large aeroplanes (broadly, those carrying more than 19 passengers or above a mass threshold) — the airline end of the scale. You need to know where it sits relative to Part 135 and the framework it demands.",
    blocks: [
      {
        heading: "1. Scope & framework",
        points: [
          "Part 121 applies to commercial air transport by aeroplanes carrying MORE than 19 passengers (larger aircraft); smaller aeroplane air transport (19 or fewer) falls under Part 135.",
          "Operations require an Air Operator Certificate (AOC), an approved operations manual, and generally multi-crew operation with airline-level training, checking and dispatch standards.",
        ],
      },
    ],
    mustKnow: [
      "Part 121 = commercial air transport, aeroplanes carrying MORE than 19 passengers.",
      "Part 135 = 19 or fewer; Part 121 = more than 19.",
      "Requires an AOC, approved ops manual and airline-standard procedures.",
    ],
    traps: [
      "The 19-passenger line divides Part 135 (≤19) from Part 121 (>19).",
    ],
  },
  {
    sectionId: "A.3.13",
    title: "Aerodromes & Heliports (CAR Part 139)",
    intro:
      "Part 139 governs the licensing/approval and safe operation of aerodromes and heliports. As a pilot you mainly need to know that aerodromes are categorised and licensed, and that the operator carries defined safety responsibilities for the surfaces, obstacles, lighting and rescue/fire cover you rely on.",
    blocks: [
      {
        heading: "1. Licensing & operator duties",
        points: [
          "Aerodromes used for certain operations must be licensed or approved by the authority; the category of licence reflects the operations the aerodrome may support.",
          "The aerodrome operator is responsible for maintaining the movement area, marking and lighting, obstacle control, and (where required) rescue and fire-fighting services.",
          "The operator runs an aerodrome safety management system and reports changes/hazards affecting operations (e.g. via NOTAM).",
        ],
      },
    ],
    mustKnow: [
      "Aerodromes for defined operations must be licensed/approved; the licence category matches the operations allowed.",
      "The aerodrome operator maintains surfaces, markings, lighting, obstacle control and RFFS.",
      "Changes/hazards are notified (e.g. by NOTAM); a safety management system applies.",
    ],
    traps: [
      "It is the aerodrome operator, not the pilot, who is responsible for aerodrome surfaces and services — but the pilot must check NOTAMs for their status.",
    ],
  },
  {
    sectionId: "A.3.14",
    title: "Airspace & Air Traffic Services (SA-CATS 172)",
    intro:
      "This covers how airspace is classified and what air traffic service you get in each class. The classification (A–G) determines whether you need a clearance, whether IFR/VFR are allowed, what separation is provided, and the radio/equipment required. It is the framework behind everything you do operationally.",
    blocks: [
      {
        heading: "1. Airspace classes & service",
        points: [
          "Airspace is classified A–G. Classes A–E are CONTROLLED (a clearance is required to operate under IFR, and often VFR); classes F–G are UNCONTROLLED.",
          "Class A: IFR only, all flights separated by ATC. Class C: IFR and VFR allowed, all get a clearance, IFR separated from IFR and VFR. Class G: uncontrolled, flight information/alerting only, no clearance needed.",
          "The service provided in each class (control, traffic information, flight information, alerting) and the radio/transponder requirements are defined by the classification.",
        ],
      },
      {
        heading: "2. The services",
        points: [
          "Air Traffic Control (ATC) service — separates traffic and issues clearances in controlled airspace.",
          "Flight Information Service (FIS) — provides useful information for the safe conduct of flight.",
          "Alerting Service — notifies the appropriate organisations about aircraft needing search and rescue, and assists as required.",
        ],
      },
    ],
    mustKnow: [
      "Airspace A–G: A–E controlled, F–G uncontrolled.",
      "Class A = IFR only, ATC separates all; Class G = uncontrolled, information only.",
      "Class sets IFR/VFR access, clearance, separation and radio/transponder needs.",
      "Services: ATC (control), Flight Information Service, Alerting Service.",
    ],
    traps: [
      "A clearance is required in controlled airspace (A–E), not in uncontrolled (F–G).",
      "Flight information/alerting is a service, not a control — it does not separate you from other traffic.",
    ],
  },
  {
    sectionId: "A.3.15",
    title: "Enforcement (CAR Part 185)",
    intro:
      "Part 185 is how the regulations are enforced. You need a working idea of the powers of authorised officers/inspectors, that contraventions carry penalties (including administrative fines), and that an aircraft can be detained or a licence acted against for non-compliance.",
    blocks: [
      {
        heading: "1. Powers & penalties",
        points: [
          "Authorised officers/inspectors may inspect aircraft, documents and operations, and require the production of licences and certificates.",
          "Contraventions of the CARs are offences and may attract penalties, including administrative penalties/fines and, for serious matters, prosecution.",
          "An aircraft may be detained or prevented from flying, and licences/certificates suspended or cancelled, where safety or compliance requires it.",
        ],
      },
    ],
    mustKnow: [
      "Authorised officers may inspect aircraft/documents and demand production of licences.",
      "Contraventions carry penalties, including administrative fines.",
      "Aircraft can be detained and licences suspended/cancelled for non-compliance.",
    ],
    traps: [
      "You must produce your licence and documents to an authorised officer on demand.",
    ],
  },
  {
    sectionId: "A.3.17",
    title: "Jeppesen Enroute Charts",
    intro:
      "Enroute charts show the airway structure you navigate. Know the common symbols and the minimum-altitude terms — MEA, MOCA, MORA — plus reporting points and airway data, because chart-reading questions test these directly.",
    blocks: [
      {
        heading: "1. Airways & fixes",
        points: [
          "Airways are shown with their identifier, tracks and distances, connecting navaids (VOR, NDB, DME) and fixes.",
          "Reporting points are shown as solid triangles (compulsory) or open triangles (on-request); waypoints/intersections are named five-letter fixes.",
          "Changeover points show where to switch from one navaid to the next along an airway.",
        ],
      },
      {
        heading: "2. Minimum altitudes",
        points: [
          "MEA (Minimum Enroute Altitude): guarantees navaid reception AND obstacle clearance along the airway.",
          "MOCA (Minimum Obstacle Clearance Altitude): guarantees obstacle clearance, and navaid reception only within a limited distance of the navaid.",
          "MORA (Minimum Off-Route Altitude) / Grid MORA: obstacle clearance off the airway within a defined area.",
        ],
      },
    ],
    mustKnow: [
      "MEA = navaid reception AND obstacle clearance on the airway.",
      "MOCA = obstacle clearance, but navaid reception only close to the navaid.",
      "MORA/Grid MORA = obstacle clearance off-route within an area.",
      "Reporting points: solid triangle = compulsory, open = on-request.",
    ],
    traps: [
      "MEA guarantees signal + terrain; MOCA guarantees terrain but only close-in navaid coverage.",
      "Solid triangle = compulsory reporting point; open triangle = on request.",
    ],
  },
  // __AIRLAW_NOTES_INSERT__
];

export function getAirLawNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  return AIRLAW_NOTES.find((n) => n.sectionId === sectionId);
}
