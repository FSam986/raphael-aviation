// PPL Air Law — full study blocks for sections the CPL notes don't cover:
// 1 (ICAO Convention, the Organisation, the Articles) and 5.7 (Annex 12 SAR,
// Annex 13 accident investigation, AIP and NOTAMs). Original wording; article
// numbers are those of the Chicago Convention.
import type { AirLawNoteBlock } from "./airlaw-notes";

export const PPL_AIRLAW_EXTRA: Record<string, AirLawNoteBlock[]> = {
  "1": [
    {
      heading: "The Convention on International Civil Aviation (Chicago, 1944)",
      points: [
        "Signed at Chicago on 7 December 1944 by 52 states; came into force on 4 April 1947. It replaced the Paris Convention (1919) and set the principles for safe, orderly international civil aviation. 96 Articles in four parts: Air Navigation, the International Civil Aviation Organization, International Air Transport, and Final Provisions. South Africa is a Contracting State.",
        "The Convention applies to CIVIL aircraft only — not state aircraft (military, customs and police aircraft).",
        "Standards and Recommended Practices (SARPs) are adopted as ANNEXES to the Convention (19 Annexes — e.g. Annex 1 Personnel Licensing, 2 Rules of the Air, 6 Operation of Aircraft, 7 Nationality and Registration Marks, 8 Airworthiness, 11 Air Traffic Services, 12 Search and Rescue, 13 Accident Investigation, 14 Aerodromes, 18 Dangerous Goods). STANDARDS are necessary — states must comply or notify a DIFFERENCE (published in their AIP GEN 1.7); Recommended Practices are desirable.",
        "Related agreements: the International Air Services Transit Agreement ('two freedoms' — overflight and technical landing) and the International Air Transport Agreement ('five freedoms').",
      ],
    },
    {
      heading: "The International Civil Aviation Organization (ICAO)",
      points: [
        "Established by the Convention (Part II); a specialised agency of the United Nations; headquarters in MONTREAL, Canada. Aims: develop the principles and techniques of international air navigation and foster safe, orderly growth of international air transport.",
        "Structure: the ASSEMBLY (all Contracting States, one vote each; meets at least every 3 years — sovereign body, sets policy and budget); the COUNCIL (36 states elected by the Assembly — permanent executive body: adopts SARPs/Annexes, settles disputes); the AIR NAVIGATION COMMISSION (develops technical SARPs for the Council); the Air Transport Committee and other committees; the SECRETARIAT headed by the Secretary General. Regional offices (Eastern and Southern African office in Nairobi; Western and Central African office in Dakar).",
        "ICAO documents: Annexes (SARPs), PANS (Procedures for Air Navigation Services — e.g. PANS-ATM Doc 4444, PANS-OPS Doc 8168), Regional Supplementary Procedures (Doc 7030), manuals and circulars.",
      ],
    },
    {
      heading: "Articles — sovereignty, territory, flight over territory, customs airports",
      points: [
        "Art 1 SOVEREIGNTY: every state has complete and exclusive sovereignty over the airspace above its territory.",
        "Art 2 TERRITORY: the land areas and territorial waters adjacent to them under the sovereignty, suzerainty, protection or mandate of the state.",
        "Art 5 Right of NON-SCHEDULED flight: aircraft of other Contracting States not engaged in scheduled services may fly into, across or make non-traffic stops in a state's territory without prior permission (subject to the state's right to require landing, to prescribe routes over inaccessible areas, and for commercial non-scheduled flights to impose regulations). (Art 6: scheduled services need special permission.)",
        "Art 10 LANDING AT CUSTOMS AIRPORTS: aircraft entering a state must land at (and depart from) a designated customs airport for customs and other examination, unless permitted otherwise. Designated international airports are published.",
      ],
    },
    {
      heading: "Articles — applicability of air regulations, rules of the air, entry and clearance, search of aircraft",
      points: [
        "Art 11 APPLICABILITY OF AIR REGULATIONS: a state's laws on admission, departure and operation of aircraft apply to the aircraft of all Contracting States without distinction of nationality, and must be complied with on entering, departing and within the territory.",
        "Art 12 RULES OF THE AIR: each state keeps its own rules of the air as uniform as possible with the Convention's (Annex 2); OVER THE HIGH SEAS the rules are those established under the Convention (Annex 2 applies without exception). Each state undertakes to prosecute persons violating the rules.",
        "Art 13 ENTRY AND CLEARANCE REGULATIONS: a state's laws on admission or departure of passengers, crew and cargo (entry, clearance, immigration, passports, customs, quarantine) must be complied with by or on behalf of them.",
        "Art 16 SEARCH OF AIRCRAFT: the authorities of each state may, without unreasonable delay, search aircraft of other states on landing or departure and inspect the certificates and documents prescribed by the Convention.",
      ],
    },
    {
      heading: "Articles — facilitation, customs and immigration, customs duty",
      points: [
        "Art 22 FACILITATION OF FORMALITIES: each state adopts measures to expedite navigation of aircraft and prevent unnecessary delays, especially in immigration, quarantine, customs and clearance (developed in Annex 9 — Facilitation).",
        "Art 23 CUSTOMS AND IMMIGRATION PROCEDURES: each state undertakes to establish customs and immigration procedures in accordance with the practices established under the Convention.",
        "Art 24 CUSTOMS DUTY: aircraft on a flight to, from or across another state are admitted temporarily free of duty; fuel, oil, spare parts, regular equipment and stores on board on arrival and retained on board on departure are exempt from customs duty and similar charges.",
        "Art 25 Aircraft in distress: each state undertakes to provide assistance to aircraft in distress in its territory (and collaborates in searches).",
      ],
    },
    {
      heading: "Articles — documents, radio, C of A, licences and their recognition",
      points: [
        "Art 29 DOCUMENTS CARRIED IN AIRCRAFT on international flights: certificate of registration; certificate of airworthiness; appropriate licences for each crew member; journey log book; aircraft radio station licence (if radio equipped); list of passengers' names, places of embarkation and destination (if carrying passengers); cargo manifest and detailed declarations (if carrying cargo).",
        "Art 30 AIRCRAFT RADIO EQUIPMENT: aircraft may carry radio transmitting apparatus only if licensed by the state of registry; within another state's territory it is used in accordance with that state's regulations, and only by crew members holding a special licence (radio licence) issued by the state of registry.",
        "Art 31 CERTIFICATE OF AIRWORTHINESS: every aircraft in international navigation must have a C of A issued or rendered valid by the state of registry.",
        "Art 32 LICENCES OF PERSONNEL: the pilot and other operating crew must hold certificates of competency and licences issued or rendered valid by the state of registry. A state may refuse to recognise, for flights over its own territory, licences granted to its own nationals by another state.",
        "Art 33 RECOGNITION OF CERTIFICATES AND LICENCES: certificates of airworthiness and licences issued or validated by the state of registry are recognised as valid by other states, provided the requirements are at least equal to the ICAO minimum standards.",
        "Art 39 ENDORSEMENT of certificates and licences: an aircraft or part that fails to meet an international standard must have the failure endorsed on its C of A; a licence holder who doesn't fully meet the standard has the details endorsed on the licence.",
        "Art 40 VALIDITY OF ENDORSED certificates and licences: aircraft or personnel with endorsed certificates/licences may not participate in international navigation except with the permission of the state(s) whose territory is entered.",
      ],
    },
    {
      heading: "Articles — journey log books, cargo and photographic restrictions, international standards",
      points: [
        "Art 34 JOURNEY LOG BOOKS: every aircraft in international navigation keeps a journey log book with particulars of the aircraft, its crew and each journey.",
        "Art 35 CARGO RESTRICTIONS: no munitions of war or implements of war may be carried in or above another state's territory without its permission; each state may regulate or prohibit other articles for public order and safety (applied without discrimination).",
        "Art 36 PHOTOGRAPHIC APPARATUS: each state may prohibit or regulate the use of photographic apparatus in aircraft over its territory.",
        "Art 37 ADOPTION OF INTERNATIONAL STANDARDS AND PROCEDURES: each state collaborates to achieve the highest practicable uniformity in regulations, standards and procedures; ICAO adopts international standards (Annexes) on communications, aerodromes, rules of the air, licensing, airworthiness, registration, meteorology, log books, charts, customs, accident investigation, etc.",
        "Art 38 DEPARTURES from international standards: a state that cannot comply with a Standard must immediately notify ICAO of the differences.",
      ],
    },
  ],
  "5.7": [
    {
      heading: "ICAO Annex 12 — Search and rescue: definitions",
      points: [
        "Search and rescue region (SRR): an area of defined dimensions, associated with a rescue co-ordination centre, within which SAR services are provided. South Africa's SRR covers the Johannesburg and Cape Town FIRs and large ocean areas.",
        "Rescue co-ordination centre (RCC): a unit responsible for promoting efficient organisation of SAR services and co-ordinating SAR operations within an SRR (in SA the aeronautical RCC is at Johannesburg — part of SASAR). Rescue sub-centre (RSC): subordinate to an RCC for part of the region.",
        "Alerting service: the ATS service notifying appropriate organisations about aircraft in need of SAR aid and assisting them.",
        "Search and rescue unit (SRU): a unit of trained personnel with suitable equipment. Distress, alert and uncertainty phases — see below. Ditching: forced landing on water.",
      ],
    },
    {
      heading: "Alerting phases — INCERFA, ALERFA, DETRESFA",
      points: [
        "UNCERTAINTY phase (INCERFA) — doubt about the safety of an aircraft and its occupants: no communication received within 30 minutes after a communication should have been received (or after the first unsuccessful attempt to contact it), or the aircraft fails to arrive within 30 minutes of the last ETA notified or estimated by ATS — whichever is earlier.",
        "ALERT phase (ALERFA) — apprehension about the safety: after the uncertainty phase, attempts to contact the aircraft or enquiries have failed; or the aircraft cleared to land fails to land within 5 minutes of the estimated time of landing and communication hasn't been re-established; or information indicates its operating efficiency is impaired but a forced landing is not likely; or it is known or believed to be subject to unlawful interference.",
        "DISTRESS phase (DETRESFA) — reasonable certainty that the aircraft and occupants are threatened by grave and imminent danger or require immediate assistance: after the alert phase, further unsuccessful attempts and widespread enquiries point to distress; or the fuel on board is considered exhausted or insufficient to reach safety; or information indicates its operating efficiency is so impaired that a forced landing is likely; or information is received (or it is reasonably certain) that it is about to make or has made a forced landing.",
        "A flight plan (or flight notification/SAR time) is what triggers the alerting service — file one and close it on arrival, or an unnecessary search starts.",
      ],
    },
    {
      heading: "Procedures for the pilot-in-command (Annex 12 paras 5.8 and 5.9)",
      points: [
        "§ Observing an aircraft or vessel in distress (5.8)",
        "If a PIC observes that another aircraft or a surface craft is in distress, the PIC shall, unless unable or unreasonable: keep it in sight until no longer necessary or until compelled to leave; determine its position if not known; report to the RCC or ATS unit as much as possible — type and identification, condition, its position (lat/long or distance and bearing from a landmark or navaid), the time (UTC), number of persons observed, whether persons have abandoned it, the number afloat, and their apparent physical condition; and act as instructed by the RCC or ATS unit.",
        "If the first aircraft to reach the scene, it takes charge of on-scene activities until relieved by the SAR unit; if it cannot establish communication with the RCC, it should (unless obviously unnecessary) do what it can to help.",
        "§ Intercepting a distress transmission (5.9)",
        "A PIC who intercepts a distress call or message shall: record the position of the craft in distress if given; if possible take a bearing on the transmission; inform the appropriate RCC or ATS unit of the distress transmission, giving all available information; and at the PIC's discretion, while awaiting instructions, proceed to the position given.",
      ],
    },
    {
      heading: "Search and rescue signals (Annex 12 Appendix A)",
      points: [
        "§ Ground–air visual signals (made by survivors — symbols at least 2.5 m / 8 ft long, contrasting)",
        "V — Require assistance. X — Require medical assistance. N — No or negative. Y — Yes or affirmative. ↑ (arrow) — Proceeding in this direction.",
        "§ Air–ground: aircraft acknowledging ground signals",
        "Message understood: by day — ROCKING THE WINGS; by night — flashing on and off twice the landing lights (or navigation lights if no landing lights). Message NOT understood: lack of the above.",
        "§ Aircraft directing a surface craft to an aircraft or vessel in distress",
        "1. Circle the surface craft at least once. 2. Cross its projected course close ahead at low altitude, ROCKING THE WINGS (or opening/closing the throttle, or changing propeller pitch). 3. Head in the direction in which the surface craft is to be directed. Repeat as necessary.",
        "Assistance no longer required: cross the craft's wake close astern at low altitude rocking the wings (or opening/closing throttle).",
        "Surface craft replies: hoisting the code pennant 'close up' or flashing Morse 'T' = acknowledged; hoisting the international flag 'N' or flashing 'N' = unable to comply.",
        "Distress signals in general: Mayday (radiotelephony), SOS (Morse), red flares, orange smoke, the ELT, squawk 7700, square flag with a ball, a succession of white flashes, slowly raising and lowering outstretched arms.",
      ],
    },
    {
      heading: "ICAO Annex 13 — Aircraft accident investigation: definitions and national procedures",
      points: [
        "Objective: the SOLE objective of accident and incident investigation is the PREVENTION of accidents and incidents — not to apportion blame or liability.",
        "Accident: an occurrence associated with the operation of an aircraft (between boarding with intention of flight and disembarking) in which a person is fatally or seriously injured (in or upon the aircraft, by direct contact, or by jet blast), the aircraft sustains damage or structural failure that adversely affects its strength, performance or flight characteristics and would normally require major repair, or the aircraft is missing or completely inaccessible.",
        "Serious incident: an incident involving circumstances indicating that an accident nearly occurred (e.g. near collision, controlled flight into terrain only marginally avoided, runway incursion with collision risk, fire, decompression, fuel exhaustion).",
        "Incident: an occurrence, other than an accident, which affects or could affect the safety of operation.",
        "Serious injury (summary): hospitalisation for more than 48 h within 7 days, most fractures, severe lacerations, internal organ injury, second/third-degree burns over 5 % of the body, or exposure to infectious substances/radiation. Fatal injury: death within 30 days.",
        "States' roles: the state of OCCURRENCE institutes and conducts the investigation (may delegate); the states of registry, operator, design and manufacture may appoint accredited representatives. A final report is published; safety recommendations are issued; the flight recorders are protected.",
        "§ National procedures (South Africa)",
        "CAR Part 12 (see 5.2) implements Annex 13: notify the SACAA Accident and Incident Investigation Division (AIID) and the nearest ATS unit or police as soon as possible; guard the wreckage; don't disturb it except to rescue people or prevent danger; written report within the prescribed time.",
      ],
    },
    {
      heading: "The Aeronautical Information Package — AIP GEN, ENR (and AD)",
      points: [
        "The Integrated Aeronautical Information Package consists of: the AIP (with amendments and supplements — AIP AMDT, AIP SUP), NOTAMs and pre-flight information bulletins (PIB), Aeronautical Information Circulars (AIC), and checklists of valid NOTAMs. Amendments of operational significance follow the AIRAC (28-day) cycle.",
        "AIP Part 1 — GEN (General): regulatory and administrative information — national regulations and differences from ICAO SARPs (GEN 1.7), units of measurement, time system (UTC; SAST = UTC + 2), abbreviations and chart symbols, location indicators, radio navigation aids list, sunrise/sunset tables, services (AIS, charts, ATS, communications, MET, SAR), and charges.",
        "AIP Part 2 — ENR (En-route): general rules and procedures (VFR, IFR), ATS airspace classification and descriptions (FIRs, CTAs, TMAs, CTRs), ATS routes, radio navigation aids and systems, navigation warnings — PROHIBITED, RESTRICTED and DANGER areas (FA P, R, D), military exercise and training areas, other activities (gliding, parachuting), air traffic flow, bird migration and en-route charts.",
        "AIP Part 3 — AD (Aerodromes): aerodrome data and charts for each aerodrome.",
        "AIP Supplements: temporary changes of long duration (3 months or more) or with extensive text/graphics. AICs: explanatory or advisory information (technical, legislative, administrative) not suitable for the AIP or NOTAMs.",
      ],
    },
    {
      heading: "Interpretation of NOTAMs and aeronautical codes",
      points: [
        "A NOTAM (Notice to Airmen) is distributed by telecommunication and contains information on the establishment, condition or change of any aeronautical facility, service, procedure or hazard, the timely knowledge of which is essential to flight operations — temporary or short-notice information. NOTAMs must be checked before every flight (pre-flight information bulletin).",
        "§ NOTAM format",
        "Series and number (e.g. A1234/26) and type: NOTAMN (new), NOTAMR (replaces a previous NOTAM), NOTAMC (cancels).",
        "Q) line — qualifiers: FIR, NOTAM CODE (Q-code, e.g. QMRLC = runway closed), traffic (I/V), purpose, scope (A aerodrome, E en-route, W nav warning), lower/upper limits (flight levels), and co-ordinates/radius.",
        "A) location (ICAO indicator, e.g. FAOR); B) start of validity (UTC — YYMMDDHHMM); C) end of validity (or EST estimated, PERM permanent); D) schedule (if periodic); E) plain-language text using ICAO abbreviations; F) and G) lower and upper limits (for navigation warnings/airspace).",
        "§ Aeronautical codes and abbreviations",
        "ICAO location indicators (4 letters: F = southern Africa; FA = South Africa — FAOR O R Tambo, FACT Cape Town, FALE King Shaka, FAGC Grand Central). The Q-code (QNH, QFE, QDM, QDR, QTE, QUJ, QGH etc.). ICAO abbreviations (Doc 8400) — e.g. RWY, TWY, U/S, AVBL, CLSD, ACT, WIP, OBST, LGT. Times are always UTC.",
        "Example decode: 'A0412/26 NOTAMN Q) FAJA/QMXLC/IV/M/A/000/999/2608S02814E005 A) FAOR B) 2611230600 C) 2611231400 E) TWY B CLSD DUE WIP' → taxiway Bravo at O R Tambo closed for works in progress, 23 Nov 2026 0600–1400 UTC.",
      ],
    },
  ],
};
