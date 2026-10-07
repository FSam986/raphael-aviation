import { Infographic } from "@/app/components/figures/Infographic";

// Original infographics for CPL Air Law (subject A.3), built from the SACAA
// CARs / ICAO Annex content in airlaw-notes.ts. Same visual language as the
// Meteorology infographics.

// --- mini diagrams ---
function DeclaredDistances() {
  return (
    <svg viewBox="0 0 320 130" className="w-full">
      {/* runway */}
      <rect x={40} y={44} width={180} height={16} fill="#334155" />
      {[60, 90, 120, 150, 180].map((x) => <rect key={x} x={x} y={50} width={16} height={4} fill="#e2e8f0" />)}
      {/* stopway + clearway */}
      <rect x={220} y={44} width={30} height={16} fill="#64748b" />
      <rect x={250} y={48} width={30} height={8} fill="#94a3b8" opacity="0.6" />
      <text x={235} y={38} fontSize="8" textAnchor="middle" fill="#64748b">stopway</text>
      <text x={265} y={70} fontSize="8" textAnchor="middle" fill="#64748b">clearway</text>
      {/* brackets */}
      {[
        ["TORA", 40, 220, 78, "#1d4ed8"],
        ["ASDA (+stopway)", 40, 250, 92, "#b45309"],
        ["TODA (+clearway)", 40, 280, 106, "#15803d"],
        ["LDA", 40, 220, 120, "#7e22ce"],
      ].map(([l, x1, x2, y, c]) => (
        <g key={l as string}>
          <line x1={x1 as number} y1={y as number} x2={x2 as number} y2={y as number} stroke={c as string} strokeWidth="1.5" />
          <line x1={x1 as number} y1={(y as number) - 3} x2={x1 as number} y2={(y as number) + 3} stroke={c as string} strokeWidth="1.5" />
          <line x1={x2 as number} y1={(y as number) - 3} x2={x2 as number} y2={(y as number) + 3} stroke={c as string} strokeWidth="1.5" />
          <text x={(x2 as number) + 4} y={(y as number) + 3} fontSize="8" fill={c as string}>{l}</text>
        </g>
      ))}
    </svg>
  );
}

function AirspaceLadder() {
  const rows: [string, string, string][] = [
    ["A", "IFR only · ATC separates all", "#1e3a8a"],
    ["B", "IFR + VFR · all separated", "#1d4ed8"],
    ["C", "IFR + VFR · clearance · IFR separated", "#2563eb"],
    ["D", "IFR + VFR · clearance · traffic info", "#3b82f6"],
    ["E", "IFR controlled · VFR free", "#60a5fa"],
    ["F", "Uncontrolled · advisory", "#94a3b8"],
    ["G", "Uncontrolled · info only", "#cbd5e1"],
  ];
  return (
    <svg viewBox="0 0 320 156" className="w-full">
      {rows.map((r, i) => (
        <g key={r[0]}>
          <rect x={30} y={6 + i * 21} width={24} height={18} fill={r[2]} />
          <text x={42} y={19 + i * 21} fontSize="11" fontWeight="800" textAnchor="middle" fill={i < 5 ? "#fff" : "#334155"}>{r[0]}</text>
          <text x={62} y={19 + i * 21} fontSize="9" fill="#334155">{r[1]}</text>
        </g>
      ))}
      <text x={16} y={70} fontSize="8" fill="#64748b" transform="rotate(-90 16 78)">controlled ← → uncontrolled</text>
    </svg>
  );
}

function RightOfWay() {
  return (
    <svg viewBox="0 0 320 90" className="w-full">
      <text x={10} y={14} fontSize="9" fontWeight="700" fill="#b91c1c">HEAD-ON → both turn RIGHT</text>
      <path d="M40 45 h60" stroke="#334155" strokeWidth="1.5" /><path d="M100 45 l-8 -4 v8 z" fill="#334155" />
      <path d="M280 45 h-60" stroke="#334155" strokeWidth="1.5" /><path d="M220 45 l8 -4 v8 z" fill="#334155" />
      <path d="M90 45 q10 8 18 14" stroke="#15803d" strokeWidth="1.5" fill="none" /><path d="M108 59 l-6 -1 3 5 z" fill="#15803d" />
      <path d="M230 45 q-10 8 -18 14" stroke="#15803d" strokeWidth="1.5" fill="none" /><path d="M212 59 l6 -1 -3 5 z" fill="#15803d" />
      <text x={10} y={82} fontSize="8.5" fill="#334155">Converging: aircraft on the OTHER&apos;s RIGHT has right of way · power gives way to gliders/balloons</text>
    </svg>
  );
}

export function DefinitionsAbbreviations() {
  return (
    <Infographic
      title="Definitions & Abbreviations (CAR Part 1)"
      tagline="The exact meanings the exam turns on"
      panels={[
        { heading: "CORE OPERATIONAL TERMS", tone: "blue", points: ["PIC — responsible for the operation and safety of the flight.", "Flight time (aeroplane) — first move under own power for take-off → coming to rest.", "Flight Level — constant-pressure surface referenced to 1013.25 hPa.", "Aerodrome — defined area for arrival, departure & surface movement."] },
        { heading: "ACCIDENT vs INCIDENT", tone: "red", points: ["Accident window: from boarding with intent to fly until all have disembarked.", "Accident = fatal/serious injury, aircraft damage/structural failure, or aircraft missing/inaccessible.", "Incident = affects or could affect safety (not an accident).", "Serious incident = an accident nearly occurred."] },
        { heading: "SERIOUS INJURY", tone: "amber", points: ["Hospitalisation, most fractures (NOT simple finger/toe/nose).", "Severe haemorrhage, nerve/muscle/tendon or internal-organ injury.", "2nd/3rd-degree burns; exposure to infectious substances/radiation."] },
        { heading: "AIRSPACE & MET TERMS", tone: "teal", points: ["IMC / VMC — instrument / visual met conditions vs minima.", "CTR — controlled airspace from the surface up.", "TMA — terminal control area near major aerodromes.", "FIR — region with flight information & alerting service."] },
      ]}
      keyPoints={["Accident window: boarding-with-intent → all disembarked.", "Simple finger/toe/nose fractures are NOT serious injury.", "Incident affects safety; serious incident ≈ nearly an accident.", "Flight time = first move for take-off → rest."]}
      summary="Air Law rewards precise definitions — one word changes the correct answer."
    />
  );
}

export function AccidentsIncidents() {
  return (
    <Infographic
      title="Aviation Accidents & Incidents (CAR Part 12)"
      tagline="Notify, protect the scene, learn — not blame"
      panels={[
        { heading: "NOTIFICATION", tone: "blue", points: ["Report accidents / serious incidents to the authority by the quickest means, without delay.", "Duty falls on the PIC first, then the owner/operator.", "A written report follows within the prescribed period.", "Include aircraft, crew, location, casualties, damage."] },
        { heading: "PROTECTING THE SCENE", tone: "red", points: ["Do NOT move wreckage — except to save life, relieve suffering, prevent destruction (fire), or by the investigator's authority.", "If you must move something, record its original position (sketch/photo).", "Access is controlled to preserve evidence."] },
        { heading: "PURPOSE OF INVESTIGATION", tone: "green", wide: true, points: ["The sole objective is the PREVENTION of future accidents — never to apportion blame or liability.", "This 'no-blame' principle encourages open reporting."] },
      ]}
      keyPoints={["Report by the quickest means, without delay.", "Duty: PIC first, then owner/operator.", "Move wreckage only for the four exceptions.", "Investigation = prevention, not blame."]}
      summary="Notify fast, preserve the scene, and remember the aim is learning — not liability."
    />
  );
}

export function Maintenance() {
  return (
    <Infographic
      title="General Maintenance Rules (CAR Part 43)"
      tagline="Who signs, what's recorded, and airworthiness"
      panels={[
        { heading: "WHO MAY MAINTAIN & RELEASE", tone: "blue", points: ["Work by a licensed AME or approved AMO within their approval.", "A Certificate of Release to Service (CRS) is required before return to service.", "The PIC must confirm the aircraft is airworthy & documents valid before flight."] },
        { heading: "RECORDS & LOGBOOKS", tone: "teal", points: ["Separate logbooks for airframe, each engine and each variable-pitch propeller.", "Making a false entry, or omitting a required one, is a serious offence.", "Retain records and produce them to the authority on request."] },
        { heading: "INSPECTIONS & PILOT TASKS", tone: "purple", points: ["Periodic/mandatory inspections + Airworthiness Directives; overdue = un-airworthy.", "A compass swing produces a new deviation card after equipment changes / at set intervals.", "Only specifically permitted simple tasks may be done by a pilot-owner (still recorded)."] },
      ]}
      keyPoints={["No return to service without a CRS.", "Airframe / engine / propeller each have their own logbook.", "PIC confirms airworthiness before flight.", "Compass swing → new deviation card."]}
      summary="An aircraft is legally airworthy only with valid maintenance records and a CRS."
    />
  );
}

export function PilotLicensing() {
  return (
    <Infographic
      title="Pilot Licensing (CAR Part 61)"
      tagline="CPL(A) requirements, privileges and validity"
      panels={[
        { heading: "CPL(A) REQUIREMENTS", tone: "blue", points: ["Minimum age 18; valid Class 1 medical; required English language proficiency.", "Pass all theory exams + the practical skills test.", "Meet the prescribed flying experience (total, PIC, cross-country, instrument) — confirm exact hours in the CARs."] },
        { heading: "PRIVILEGES", tone: "green", points: ["Exercise all PPL privileges.", "PIC/co-pilot in operations other than commercial air transport.", "PIC of single-pilot commercial air transport aeroplanes (subject to ratings).", "Be REMUNERATED for flying — the key difference from the PPL."] },
        { heading: "LICENCE · RATINGS · RECENCY", tone: "purple", points: ["The licence itself does not expire — the medical, ratings and required tests must stay valid.", "Ratings (type/class, night, instrument) have their own validity.", "Passenger recency needs the prescribed recent take-offs & landings.", "Log flight time as evidence of experience & recency."] },
      ]}
      keyPoints={["CPL(A): age 18, Class 1 medical, English, exams + skills test.", "CPL privilege PPL lacks: being paid to fly.", "The licence doesn't expire; medical/ratings/recency do.", "Passenger recency = prescribed recent take-offs & landings."]}
      summary="The licence is permanent; keeping it usable is about medical, ratings and recency."
    />
  );
}

export function MedicalCertification() {
  return (
    <Infographic
      title="Medical Certification (CAR Part 67)"
      tagline="Classes, validity and the pilot's own duty"
      panels={[
        { heading: "CLASSES & VALIDITY", tone: "blue", points: ["Class 1 — required for the CPL/ATPL; Class 2 — for the PPL.", "Class 1 typically valid ~12 months (shorter, e.g. 6 months, with age or single-pilot commercial passenger ops).", "Examined by a Designated Aviation Medical Examiner (DAME)."] },
        { heading: "DUTIES OF THE HOLDER", tone: "red", points: ["Do NOT fly if aware of any decrease in medical fitness.", "Consider illness, medication, injury or pregnancy that could affect fitness.", "The authority may suspend/cancel a medical (e.g. substance abuse, failing the standard)."] },
      ]}
      keyPoints={["CPL = Class 1; PPL = Class 2.", "Class 1 ~12 months (shorter with age / single-pilot commercial pax).", "Issued via a DAME.", "It is the pilot's own duty to ground themselves when unfit."]}
      summary="A valid Class 1 is required — and you must self-ground the moment fitness drops."
    />
  );
}

export function GeneralOperatingRules() {
  return (
    <Infographic
      title="General Operating & Flight Rules (CAR Part 91)"
      tagline="PIC authority, rules of the air, heights, minima"
      panels={[
        { heading: "PIC AUTHORITY & DOCUMENTS", tone: "blue", points: ["The PIC has final authority and is responsible for the aircraft and everyone on board.", "May deviate from any rule in an emergency (and must report it).", "Carry: CoR, CoA, radio licence, mass & balance, flight folio, crew licences/medicals, insurance."] },
        { heading: "RIGHT OF WAY", tone: "red", svg: <RightOfWay />, points: ["Converging: the aircraft on the OTHER&apos;s RIGHT has right of way.", "Power gives way to airships, gliders and balloons (least manoeuvrable wins).", "Head-on: both turn RIGHT. Overtaking: pass on the RIGHT, keep clear.", "Landing / lower aircraft has priority (must not cut in front)."] },
        { heading: "MINIMUM HEIGHTS", tone: "amber", points: ["≥ 500 ft from any person, vessel, vehicle or structure (except take-off/landing).", "Over a congested area: ≥ 1000 ft above the highest obstacle within the radius.", "Always high enough to glide clear if the engine fails."] },
        { heading: "CRUISING LEVELS (VFR)", tone: "teal", points: ["Semi-circular rule: track 000°–179°M → odd thousands + 500 ft.", "Track 180°–359°M → even thousands + 500 ft.", "Confirm exact application in the CARs."] },
        { heading: "VFR MINIMA · FUEL · RADIO FAIL", tone: "green", wide: true, points: ["VFR needs VMC — visibility & distance-from-cloud vary with airspace class/altitude.", "Fuel = flight to destination + prescribed reserve (+ alternate where required).", "Brief passengers on belts, exits, safety equipment before flight.", "Radio failure: squawk 7600, follow last clearance/published procedure; in VMC land at the nearest suitable aerodrome."] },
      ]}
      keyPoints={["PIC may deviate in an emergency (and reports it).", "Converging: give way to the aircraft on your left; head-on & overtaking → turn RIGHT.", "500 ft general; 1000 ft over congested areas.", "Semi-circular: 0–179°M odd+500, 180–359°M even+500.", "Radio failure squawk = 7600."]}
      summary="Part 91 is the heart of day-to-day flying law — and its numbers are prime exam material."
    />
  );
}

export function DangerousGoods() {
  return (
    <Infographic
      title="Dangerous Goods (CAR Part 92)"
      tagline="Carried only per the ICAO Technical Instructions"
      panels={[
        { heading: "CARRIAGE RULES", tone: "blue", points: ["DG may only be carried per the ICAO Technical Instructions (Doc 9284).", "Correctly classified, packed, marked, labelled and documented.", "Operator accepts, loads and segregates per the rules.", "Anyone handling/accepting DG must be trained and current."] },
        { heading: "PASSENGERS, CREW & INCIDENTS", tone: "amber", points: ["Only specified limited items allowed (e.g. some medicinal/toiletry items, certain batteries).", "Most hazardous items are forbidden in baggage/cabin.", "The PIC must be informed of DG on board; report DG incidents."] },
      ]}
      keyPoints={["Governing document = ICAO Technical Instructions (Doc 9284).", "Classify, pack, mark, label, document.", "Handlers must be trained.", "PIC must know of DG on board."]}
      summary="Dangerous goods fly only by the ICAO Technical Instructions — and the PIC must know they're aboard."
    />
  );
}

export function CorporateOperations() {
  return (
    <Infographic
      title="Corporate Operations (CAR Part 93)"
      tagline="Non-commercial, but above private standard"
      panels={[
        { heading: "WHAT CORPORATE OPS ARE", tone: "blue", wide: true, points: ["An organisation flying its OWN aircraft for its OWN business — no hire or reward for air transport.", "Requires a Corporate Aviation Certificate + approved operations manual.", "Sits between private (Part 91) and commercial air transport: stricter than private, but NOT commercial.", "Crew, maintenance and operational control held to the certificate's standards."] },
      ]}
      keyPoints={["Own aircraft, own business, NOT for hire/reward.", "Needs a Corporate Aviation Certificate + ops manual.", "Non-commercial but stricter than Part 91."]}
      summary="Corporate aviation is a company flying itself — certificated, but not for reward."
    />
  );
}

export function AirTransportLarge() {
  return (
    <Infographic
      title="Air Transport — Large Aeroplanes (CAR Part 121)"
      tagline="The airline end of the scale"
      panels={[
        { heading: "SCOPE & FRAMEWORK", tone: "blue", wide: true, points: ["Applies to commercial air transport by aeroplanes carrying MORE than 19 passengers.", "Smaller aeroplane air transport (19 or fewer) falls under Part 135.", "Requires an Air Operator Certificate (AOC) + approved operations manual.", "Generally multi-crew, with airline-level training, checking and dispatch."] },
      ]}
      keyPoints={["Part 121 = commercial air transport, >19 passengers.", "Part 135 = ≤19; Part 121 = >19.", "Needs an AOC + approved ops manual."]}
      summary="The 19-passenger line divides Part 135 (≤19) from Part 121 (>19)."
    />
  );
}

export function AirTransportSmall() {
  return (
    <Infographic
      title="Air Transport — Small Aeroplanes (CAR Part 135)"
      tagline="The Part a new CPL is most likely to fly under"
      panels={[
        { heading: "THE OPERATING FRAMEWORK", tone: "blue", points: ["Commercial air transport in small aeroplanes (broadly < 20 seats).", "Operator holds an Air Operator Certificate (AOC) + approved Operations Manual.", "Operator handles training, checking and rostering within duty & flight-time limits."] },
        { heading: "PILOT REQUIREMENTS & CONDITIONS", tone: "purple", points: ["PIC minimums & recency are higher than for private (Part 91) flying.", "IMC / night / IFR bring extra equipment, qualification and crew conditions.", "Single-pilot IFR often needs a serviceable autopilot — otherwise a co-pilot is required."] },
      ]}
      keyPoints={["Part 135 = commercial small aeroplanes; needs AOC + Ops Manual.", "Higher minimums than private flying.", "Single-pilot IFR ↔ working autopilot, else co-pilot."]}
      summary="Part 135 isn't just 'Part 91 for money' — it adds an AOC, an Ops Manual and higher minimums."
    />
  );
}

export function AerodromesHeliports() {
  return (
    <Infographic
      title="Aerodromes & Heliports (CAR Part 139)"
      tagline="Licensing and the operator's safety duties"
      panels={[
        { heading: "LICENSING & OPERATOR DUTIES", tone: "blue", wide: true, points: ["Aerodromes used for certain operations must be licensed/approved; the licence category matches the operations allowed.", "The operator maintains the movement area, markings, lighting and obstacle control.", "Provides rescue & fire-fighting services (RFFS) where required.", "Runs a safety management system and notifies changes/hazards (e.g. by NOTAM)."] },
      ]}
      keyPoints={["Aerodromes for defined ops must be licensed/approved by category.", "Operator maintains surfaces, markings, lighting, obstacles, RFFS.", "Changes/hazards notified by NOTAM — pilots must check them."]}
      summary="The aerodrome operator keeps the field safe — but the pilot must still check NOTAMs."
    />
  );
}

export function AirspaceATS() {
  return (
    <Infographic
      title="Airspace & Air Traffic Services (SA-CATS 172)"
      tagline="What service you get in each class of airspace"
      panels={[
        { heading: "AIRSPACE CLASSES & SERVICE", tone: "blue", svg: <AirspaceLadder />, points: ["Classes A–G: A–E are CONTROLLED, F–G are UNCONTROLLED.", "Class A: IFR only, ATC separates all. Class C: IFR + VFR, clearance, IFR separated from all.", "Class G: uncontrolled — flight information / alerting only, no clearance to enter."] },
        { heading: "THE SERVICES", tone: "teal", points: ["ATC service — separates traffic and issues clearances in controlled airspace.", "Flight Information Service — useful information for safe flight.", "Alerting Service — notifies SAR organisations about aircraft in need."] },
      ]}
      keyPoints={["A–E controlled, F–G uncontrolled.", "Class A = IFR only, ATC separates all; Class G = info only.", "Clearance needed in controlled airspace, not uncontrolled.", "FIS/alerting is a service, not separation."]}
      summary="The class of airspace sets your clearance, separation and radio needs — know the ladder."
    />
  );
}

export function Enforcement() {
  return (
    <Infographic
      title="Enforcement (CAR Part 185)"
      tagline="Powers, penalties and detention"
      panels={[
        { heading: "POWERS & PENALTIES", tone: "red", wide: true, points: ["Authorised officers/inspectors may inspect aircraft, documents and operations.", "You must produce licences and certificates on demand.", "Contraventions are offences — administrative penalties/fines, or prosecution for serious matters.", "An aircraft can be detained, and licences/certificates suspended or cancelled."] },
      ]}
      keyPoints={["Officers may inspect and demand your licence/documents.", "Contraventions carry penalties, including administrative fines.", "Aircraft can be detained; licences suspended/cancelled."]}
      summary="Carry your documents — and expect to produce them to an authorised officer on demand."
    />
  );
}

export function RSAAIP() {
  return (
    <Infographic
      title="RSA AIP — Enroute & Aerodrome Information"
      tagline="The official source you actually fly from"
      panels={[
        { heading: "AIRSPACE CLASSIFICATION & SERVICES", tone: "blue", points: ["Airspace classified A–G; each class sets IFR/VFR access, clearance, separation and equipment.", "Class A most restrictive (IFR only, clearance, ATC separation); Class G uncontrolled (info only).", "The AIP ENR section lists the exact limits and class of each piece of SA airspace."] },
        { heading: "PROCEDURES & AERODROME DATA", tone: "teal", points: ["QNH below the transition altitude; standard 1013.25 hPa (flight levels) above the transition level.", "AIP AD sections give runway details, lighting, frequencies and plates.", "Decode chart symbols (ARP, VOR/DME, ILS, obstacles, markings/lighting) using the AIP legend."] },
      ]}
      keyPoints={["Classes A–G define access, clearance, separation, equipment.", "Class A = IFR only; Class G = uncontrolled, info only.", "QNH below transition altitude; standard above transition level.", "The AIP is the authoritative operational source."]}
      summary="The AIP is where the real airspace limits, procedures and aerodrome data live — learn to find them."
    />
  );
}

export function JeppesenCharts() {
  return (
    <Infographic
      title="Jeppesen Enroute Charts"
      tagline="Airway structure and minimum altitudes"
      panels={[
        { heading: "AIRWAYS & FIXES", tone: "blue", points: ["Airways show identifier, tracks and distances, linking navaids (VOR, NDB, DME) and fixes.", "Reporting points: solid triangle = compulsory, open triangle = on-request.", "Waypoints/intersections are named five-letter fixes.", "Changeover points show where to switch navaids along an airway."] },
        { heading: "MINIMUM ALTITUDES", tone: "purple", points: ["MEA — guarantees navaid reception AND obstacle clearance on the airway.", "MOCA — obstacle clearance, but navaid reception only close to the navaid.", "MORA / Grid MORA — obstacle clearance off the airway within a defined area."] },
      ]}
      keyPoints={["MEA = signal + terrain; MOCA = terrain + close-in signal only.", "MORA/Grid MORA = off-route obstacle clearance.", "Solid triangle = compulsory reporting point; open = on request."]}
      summary="MEA gives you both signal and terrain; MOCA drops the guaranteed signal except near the navaid."
    />
  );
}

export function ICAOConvention() {
  return (
    <Infographic
      title="ICAO — Convention & Articles"
      tagline="The Chicago Convention and how it governs international flight"
      panels={[
        { heading: "THE CONVENTION", tone: "blue", points: ["Convention on International Civil Aviation — signed at Chicago, 1944.", "Established ICAO (International Civil Aviation Organization).", "Sets the framework and standards for safe, orderly international air navigation."] },
        { heading: "KEY ARTICLES", tone: "teal", points: ["Art 1 — every State has complete & exclusive sovereignty over the airspace above its territory.", "Art 5/6 — non-scheduled vs scheduled international air services.", "Art 12 — rules of the air. Art 29 — documents carried in aircraft.", "Art 33 — recognition of certificates & licences issued by other contracting States."] },
        { heading: "THE ANNEXES (SARPs)", tone: "purple", points: ["Standards And Recommended Practices are published as the ICAO Annexes.", "e.g. Annex 2 Rules of the Air, Annex 3 Meteorology, Annex 6 Operation of Aircraft, Annex 14 Aerodromes.", "Standard = binding norm; Recommended Practice = desirable. States notify differences."] },
        { heading: "SOVEREIGNTY & FREEDOMS", tone: "green", points: ["Airspace over a State (and its territorial waters) belongs to that State.", "The 'freedoms of the air' govern the rights to fly into/through other States."] },
      ]}
      keyPoints={["Chicago Convention 1944 created ICAO.", "Art 1 — complete & exclusive sovereignty over your airspace.", "Annexes = Standards And Recommended Practices; States file differences.", "Art 33 — mutual recognition of certificates/licences."]}
      summary="The Chicago Convention (1944) and its Annexes are the foundation of all international air law."
    />
  );
}

export function OperationalProcedures() {
  return (
    <Infographic
      title="Operational Procedures"
      tagline="Signals, wake turbulence and procedural airmanship"
      panels={[
        { heading: "ATC LIGHT-GUN SIGNALS", tone: "blue", points: ["Steady GREEN — cleared to land / take off (or cleared to taxi if on ground).", "Steady RED — give way / stop.", "Flashing GREEN — cleared to taxi (ground) / return to land (air).", "Flashing RED — taxi clear of the runway / aerodrome unsafe, do not land.", "Flashing WHITE — return to your starting point. Red pyrotechnic — do not land."] },
        { heading: "MARSHALLING SIGNALS", tone: "teal", points: ["Standard hand/bat signals direct taxi, turn, slow, stop and shutdown.", "The marshaller has authority for movement on the apron; the PIC remains responsible for safety.", "Arms up crossed = STOP; beckoning = come forward."] },
        { heading: "WAKE TURBULENCE", tone: "red", points: ["Trailing wingtip vortices — strongest behind HEAVY, CLEAN, SLOW aircraft.", "Take-off/landing separation minima behind heavier categories.", "Stay at or above a heavier aircraft's flight path; land beyond its touchdown point."] },
        { heading: "NOISE & PROCEDURES", tone: "amber", points: ["Noise-abatement departure/arrival procedures and preferred routes.", "Comply with published circuit, joining and departure procedures.", "Brief and plan for bird-strike risk and low-level hazards."] },
      ]}
      keyPoints={["Steady green = cleared land/take-off; steady red = stop/give way.", "Flashing red (air) = aerodrome unsafe, do not land.", "Wake vortices worst behind heavy/clean/slow; keep above the flight path.", "Follow noise-abatement & published circuit procedures."]}
      summary="Know the light-gun and marshalling signals cold, and respect wake turbulence separation."
    />
  );
}

export function Annex14() {
  return (
    <Infographic
      title="ICAO Annex 14 — Aerodromes"
      tagline="Declared distances and visual aids"
      panels={[
        { heading: "RUNWAY ELEMENTS & DECLARED DISTANCES", tone: "blue", svg: <DeclaredDistances />, points: ["Threshold = start of runway usable for landing. Clearway = obstacle-free area for initial climb. Stopway = area for an aborted take-off.", "TORA — take-off run available.", "TODA = TORA + clearway. ASDA = TORA + stopway. LDA = landing length available."] },
        { heading: "VISUAL AIDS — MARKINGS, LIGHTS, SIGNS", tone: "green", points: ["Runway markings WHITE; taxiway markings YELLOW.", "Threshold lights GREEN, edge WHITE, runway END RED; taxiway edge BLUE, centreline GREEN.", "PAPI: two white + two red = on slope; more red = too low ('more red, you're dead').", "Signs: red/white = mandatory instruction; yellow/black = information/location."] },
      ]}
      keyPoints={["TODA = TORA + clearway; ASDA = TORA + stopway.", "Runway markings WHITE, taxiway YELLOW.", "Threshold GREEN, edge WHITE, end RED; taxiway edge BLUE, centreline GREEN.", "PAPI more red = too low."]}
      summary="Learn the four declared distances and the light/marking colours cold — they're guaranteed marks."
    />
  );
}
