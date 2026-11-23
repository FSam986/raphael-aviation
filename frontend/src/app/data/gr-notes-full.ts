// ============================================================================
// General Radiotelephony (GR) — full study notes, GR1–GR9.
// Aligned to SACAA Appendix 1.5 A to SA-CATS. Original wording, drawn from
// ICAO Doc 9432/Annex 10 phraseology, the SA AIP/AICs (D005/2018 etc.) and
// the Pilot's Radio Handbook (SA). "§ " = sub-heading. Each section may also
// pull matching CPL topic blocks (GR_PICK).
// ============================================================================

import type { AirLawNoteBlock } from "./airlaw-notes";

type GrNote = { title: string; intro: string; blocks: AirLawNoteBlock[]; mustKnow: string[]; traps: string[]; pick?: string[] };

export const GR_FULL: Record<string, GrNote> = {
  GR1: {
    title: "Basic Radio Theory",
    intro: "Radio is the pilot's link with ATC. This section explains what a radio wave is, how speech is carried on it (modulation), the frequency bands, antennas and polarisation, and how waves travel — the physics behind why VHF is line-of-sight and HF reaches round the world.",
    blocks: [],
    pick: ["A.10.1"],
    mustKnow: [
      "Radio waves travel at 300 000 km/s; λ (m) = 300 ÷ f (MHz).",
      "Aviation voice radio uses AMPLITUDE modulation (AM) — so a stronger station doesn't capture the receiver as in FM.",
      "VHF COM antennas are vertically polarised; VOR horizontally; GNSS circular.",
    ],
    traps: ["Aviation VHF voice is AM, not FM."],
  },

  GR2: {
    title: "Principles of Radio Operation",
    intro: "Pilots use VHF for nearly all ATC communication and HF for long-range (oceanic and remote) communication. This section covers how each set is operated, their frequency bands and channel spacing, and what limits their range and reception.",
    blocks: [
      {
        heading: "VHF radios — operation and frequency band",
        points: [
          "VHF aeronautical COM band: 118.000–136.975 MHz (AM voice). Channel spacing 25 kHz in South Africa (8.33 kHz spacing is used in parts of Europe — the radio must be set to the correct spacing; '6 digit' frequencies).",
          "Controls: ON/OFF and volume, SQUELCH (cuts background noise when no signal — if set too high, weak stations are cut out; test by turning the squelch off: a loud hiss means the receiver works), frequency selectors with ACTIVE and STANDBY windows and a flip-flop (transfer) button, COM/NAV selection on combined sets, and the AUDIO PANEL (selects which radio the microphone transmits on and which receivers are heard; also intercom and marker beacon audio).",
          "PRESS-TO-TALK (PTT) switch: press, wait a moment, speak, release. Listen before transmitting so as not to 'step on' another station; a stuck PTT blocks the frequency for everyone (the 'stuck mike').",
          "Microphone technique: microphone close to (touching) the lips, speak at a normal level and even rate, not more than about 100 words per minute, pause slightly before and after numbers, avoid hesitation sounds ('er').",
          "Common VHF frequencies: 121.5 MHz international distress (and ELT); 123.45 MHz air-to-air; aerodrome, approach, area/information frequencies published in the AIP; TIBA frequencies (124.8 MHz and others in SA as published); ATIS on its own frequency.",
          "VHF NAV band 108.0–117.95 MHz (VOR/ILS) — receive only.",
        ],
      },
      {
        heading: "VHF — factors affecting range and reception",
        points: [
          "VHF travels essentially in straight lines (space/direct waves) — LINE OF SIGHT. Range depends mainly on the HEIGHT of the aircraft and the ground station: range (nm) ≈ 1.23 × (√h_aircraft ft + √h_station ft) — e.g. aircraft at 5 000 ft, station at ground level: 1.23 × 70.7 ≈ 87 nm; at 1 000 ft ≈ 39 nm; at FL100 ≈ 123 nm.",
          "Shadowing: high ground, mountains and buildings between the aircraft and the station block the signal (low flying in hilly areas — use relays or TIBA). Aircraft structure can also shadow antennas in some attitudes.",
          "Transmitter power and receiver sensitivity, antenna condition and position, and interference (other stations on the same frequency beyond their designated range — 'co-channel interference'; electrical noise from the aircraft; ducting in temperature inversions can carry signals unusually far).",
          "VHF is largely free of atmospheric static and of night effects — clear, reliable communication within range.",
          "Two aircraft transmitting simultaneously produce a squeal ('blocking') — neither is heard.",
        ],
      },
      {
        heading: "HF radios — operation, frequency band and range",
        points: [
          "HF band 3–30 MHz (aeronautical bands within it, e.g. 2.8–22 MHz), used for long-range communications (oceanic, remote Africa) where VHF can't reach. Voice is SINGLE SIDEBAND (SSB, upper sideband — J3E) to save power and bandwidth.",
          "HF reaches great distances by SKY WAVES refracted by the ionosphere. The usable frequency depends on time of day, season, sunspot activity and distance: higher frequencies by day and for long distances, lower frequencies at night ('half the frequency at night'). HF families of frequencies are allocated to each Major World Air Route Area and published (primary and secondary frequencies).",
          "Factors affecting range and reception: ionospheric conditions (diurnal, seasonal, solar storms — HF blackouts), skip distance and dead space (no reception between the end of the ground wave and the first sky wave), fading (multipath), static (thunderstorms — HF is noisy), interference, transmitter power and antenna (long trailing or fixed wires; antenna tuning units).",
          "Operation: select the frequency, allow the antenna coupler to tune (a tone), use clear, slow speech; SELCAL (selective calling) lets the ground station call the aircraft with a chime so the crew need not monitor the noisy HF continuously. 'Over' and 'Out' are used on HF.",
          "HF emergency frequencies: 2 182 kHz (maritime) and 8 364 kHz (survival craft) are commonly used.",
          "SATCOM and CPDLC (data link) increasingly replace HF voice on long-range routes.",
        ],
      },
    ],
    pick: ["A.10.1#Wave propagation|The ionosphere"],
    mustKnow: [
      "VHF COM 118.000–136.975 MHz, AM, 25 kHz spacing in SA. 121.5 distress; 123.45 air-to-air.",
      "VHF range ≈ 1.23(√h₁ + √h₂) — line of sight; blocked by terrain.",
      "HF 3–30 MHz, SSB, sky waves; lower frequency at night; noisy; SELCAL.",
      "Squelch too high cuts weak signals; stuck mike blocks the frequency.",
    ],
    traps: ["Increasing transmitter power doesn't extend VHF range beyond line of sight — climb instead."],
  },

  GR3: {
    title: "Airspace",
    intro: "Knowing which airspace you're in tells you who to talk to, what service you get and what clearance you need. This section covers the air traffic services, the ICAO airspace classes, the South African airspace structure (FIRs, control zones, aerodrome traffic zones and areas, terminal and control areas, ATS routes, special rules areas, restricted areas) and how to recognise them on charts.",
    blocks: [
      {
        heading: "Air traffic services — objectives and types",
        points: [
          "Objectives (ICAO Annex 11): prevent collisions between aircraft; prevent collisions on the manoeuvring area between aircraft and obstructions; expedite and maintain an orderly flow of air traffic; provide advice and information useful for the safe and efficient conduct of flights; notify appropriate organisations of aircraft in need of search and rescue aid and assist them.",
          "AIR TRAFFIC CONTROL SERVICE: aerodrome control (TOWER — traffic on the manoeuvring area and in the vicinity/circuit; GROUND — surface movement; CLEARANCE DELIVERY), approach control (APPROACH/DIRECTOR — arriving and departing controlled flights) and area control (AREA/CENTRE — controlled flights en route). Provides separation and clearances.",
          "FLIGHT INFORMATION SERVICE (FIS): advice and information (weather, NOTAMs, traffic information, aerodrome conditions) — no separation. In SA given by 'INFORMATION' units (e.g. JOHANNESBURG INFORMATION, CAPE TOWN INFORMATION) and by AFIS at some aerodromes (aerodrome flight information service — 'xxx INFORMATION' or 'RADIO' at the aerodrome).",
          "ADVISORY SERVICE: advice on separation from other IFR traffic in advisory airspace (Class F) — the pilot decides whether to follow it.",
          "ALERTING SERVICE: notifying the SAR organisation of aircraft in need and assisting (provided to all aircraft receiving ATS, aircraft on a flight plan, and aircraft known to be subject to unlawful interference).",
          "Call-sign suffixes of ground stations: CONTROL (area control), APPROACH, ARRIVAL/DEPARTURE, DIRECTOR (radar), TOWER, GROUND, DELIVERY, INFORMATION (FIS), APRON, RADIO (AFIS/aeronautical station), RADAR.",
        ],
      },
      {
        heading: "ICAO airspace classes A–G",
        points: [
          "Class A: IFR only; all flights separated; ATC clearance and continuous two-way radio required.",
          "Class B: IFR and VFR; all flights separated from each other; clearance and radio required.",
          "Class C: IFR and VFR; IFR separated from IFR and VFR; VFR separated from IFR and receives traffic information on other VFR; clearance and radio required.",
          "Class D: IFR and VFR; IFR separated from IFR and receives traffic information on VFR; VFR receives traffic information on all other flights; clearance and radio required. (Most SA CTRs.)",
          "Class E: IFR and VFR; IFR separated from IFR; VFR doesn't need a clearance (radio not required for VFR in ICAO — check SA rules); traffic information as far as practical.",
          "Class F: advisory airspace — IFR receive air traffic advisory service; all receive FIS on request.",
          "Class G: uncontrolled — flight information service on request; no separation; no clearance.",
          "A–E are CONTROLLED airspace; F and G uncontrolled. VMC minima and speed limits (250 kt below FL100 in classes C–G for VFR, and D–G for IFR, except as specified) apply per class (see Air Law).",
        ],
      },
      {
        heading: "South African airspace structure",
        points: [
          "FLIGHT INFORMATION REGIONS (FIR): the whole airspace divided into regions in which FIS and alerting service are provided — Johannesburg FIR (FAJA) and Cape Town FIR (FACA) over land, plus the Johannesburg Oceanic FIR (FAJO). The upper level may form a UIR.",
          "§ Controlled airspace around aerodromes",
          "CONTROL ZONE (CTR): controlled airspace from the SURFACE up to a specified upper limit around a controlled aerodrome (e.g. Cape Town CTR) — protects IFR arrivals/departures; ATC clearance required to enter.",
          "AERODROME TRAFFIC ZONE (ATZ): airspace around an aerodrome to protect aerodrome traffic (in SA typically a defined radius and height around aerodromes without a CTR, e.g. 3 nm radius up to 2 000 ft above aerodrome — check the AIP); radio calls required at manned aerodromes.",
          "AERODROME TRAFFIC AREA (ATA): an SA designation for airspace around busy unmanned aerodromes/flying areas within which pilots must broadcast on the published frequency (see AIP).",
          "§ Controlled airspace above",
          "TERMINAL CONTROL AREA (TMA): controlled airspace normally at the confluence of ATS routes in the vicinity of one or more major aerodromes, from a base ABOVE the surface (often in steps) to an upper limit — e.g. Johannesburg TMA, Cape Town TMA. VFR flights below the TMA base may fly without clearance (in uncontrolled airspace below).",
          "CONTROL AREA (CTA): controlled airspace extending upwards from a specified limit above the earth — covers airway structures/upper airspace.",
          "ATS ROUTES: airways (controlled corridors, usually 10 nm wide, with base and upper limits), advisory routes, and RNAV routes; designated with letters and numbers (e.g. A405, UG853).",
          "§ Special areas",
          "SPECIAL RULES AREAS (SRA): areas where specific procedures apply (e.g. around Johannesburg for VFR traffic below the TMA, with prescribed frequencies/altitudes for TIBA).",
          "PROHIBITED (FAP), RESTRICTED (FAR) and DANGER (FAD) areas: prohibited — flight not permitted; restricted — flight restricted by conditions (permission needed); danger — activities dangerous to flight may exist at specified times (fly with caution / avoid when active). Published in AIP ENR 5.1 and NOTAMs. Also military training areas, flying training areas, gliding and parachuting sites.",
        ],
      },
      {
        heading: "Recognising airspace on aeronautical charts",
        points: [
          "On the 1:250 000 / 1:500 000 VFR charts and the SA VFR Terminal Area Charts: CTR boundaries in solid/dashed lines with the name, class and vertical limits (e.g. 'CTR D SFC–FL055'); TMAs shown with the base and top of each step (e.g. 'TMA C 6 500 ft–FL195' — base in feet AMSL or FL); ATZ/ATA circles with frequencies; airways as shaded corridors with identifiers, MEA and limits; restricted (R), prohibited (P) and danger (D) areas hatched with their identifier (FAR 52, FAD 33…) and vertical limits; FIR boundaries; frequency boxes for ATS units.",
          "Vertical limits: 'SFC' surface; 'GND'; altitudes in feet AMSL; flight levels; 'UNL' unlimited. Read the base and top for every layer above your route — a VFR route under a TMA must stay below its base (allowing altimeter error).",
          "Always check the chart edition and AIP/NOTAM changes; use the AIP ENR 2 tables for exact lateral/vertical limits.",
        ],
      },
    ],
    pick: ["A.3.14"],
    mustKnow: [
      "ATS: ATC (tower, approach, area), FIS, advisory, alerting.",
      "Classes A–E controlled; F advisory; G uncontrolled. Clearance and radio required in A–D.",
      "CTR from the surface; TMA/CTA from a base above the surface; ATZ around aerodromes.",
      "SA FIRs: Johannesburg (FAJA), Cape Town (FACA), Johannesburg Oceanic.",
      "P/R/D areas: prohibited / restricted / danger (FAP, FAR, FAD).",
    ],
    traps: ["A TMA starts ABOVE the surface — a CTR starts AT the surface."],
  },

  GR4: {
    title: "SA Civil Aviation Regulations (Part 91)",
    intro: "Part 91 sets when radio communication is mandatory, the obligation to follow clearances and the rules of the air, and the visual signals a pilot must recognise. This section covers mandatory radio in controlled and advisory airspace, clearances, and ground/light signals and markings.",
    blocks: [
      {
        heading: "Mandatory radio communication; compliance with clearances",
        regs: ["91.06.16"],
        points: [
          "In CONTROLLED airspace: an aircraft must maintain continuous air-ground voice communication watch on the appropriate frequency of the ATC unit and establish two-way communication as necessary (and obtain a clearance before entering).",
          "In ADVISORY airspace (and where mandatory radio is prescribed, e.g. ATZ of manned aerodromes, ATAs, SRAs, and when on IFR): maintain a listening watch and make the required reports/broadcasts on the published frequency.",
          "The regulation text (mandatory radio communications in controlled airspace and the radio-communication-failure procedures) is shown below.",
          "Compliance with ATC clearances: a pilot must comply with the clearance and instructions received and acknowledged. If a clearance isn't acceptable (unable to comply — e.g. would require entering cloud on a VFR flight), say 'UNABLE' and request an alternative. A clearance doesn't absolve the pilot from complying with the rules of the air (terrain clearance, VMC minima). Deviation only in an emergency — then inform ATC as soon as possible.",
          "Read back safety-critical parts of clearances: runway, altitudes/levels, headings, speeds, SSR codes, frequencies, QNH, taxi and runway-crossing/hold-short instructions, route clearances, conditional clearances.",
        ],
      },
      {
        heading: "Signals — light signals from ATC",
        points: [
          "Used when radio contact isn't possible (radio failure, NORDO aircraft). From the tower with a signal lamp:",
          "STEADY GREEN — in flight: cleared to land; on the ground: cleared for take-off.",
          "STEADY RED — in flight: give way to other aircraft and continue circling; on the ground: stop.",
          "SERIES OF GREEN FLASHES — in flight: return for landing (landing clearance and taxi clearance to follow in due course); on the ground: cleared to taxi.",
          "SERIES OF RED FLASHES — in flight: aerodrome unsafe, do not land; on the ground: taxi clear of the landing area in use.",
          "SERIES OF WHITE FLASHES — in flight: land at this aerodrome and proceed to the apron (clearances to follow); on the ground: return to the starting point on the aerodrome.",
          "RED PYROTECHNIC (flare) — in flight: notwithstanding any previous instructions, do not land for the time being.",
          "Acknowledging by the aircraft: in flight by day — rocking the wings (not on base/final); at night — flashing landing lights or navigation lights twice. On the ground — moving the ailerons or rudder by day, flashing landing/navigation lights at night.",
          "Visual warning signal to an aircraft entering a restricted/prohibited area: a series of projectiles at 10-second intervals bursting into red and green lights or stars — 'you are flying in or about to enter a restricted, prohibited or danger area; take remedial action'.",
        ],
      },
      {
        heading: "Signals — ground signals and markings",
        points: [
          "Displayed in the signal area (signals square) of an aerodrome:",
          "Red square panel with ONE yellow diagonal — the state of the manoeuvring area is poor; take special care when landing.",
          "Red square with a yellow cross (both diagonals) — landing prohibited; prohibition likely to be prolonged.",
          "White dumb-bell — aircraft must land, take off and taxi on runways and taxiways only. White dumb-bell with black bars across each disc — land and take off on runways only, other manoeuvres need not be confined to runways/taxiways.",
          "White double crosses — glider flying in progress.",
          "Landing T (white or orange) — direction for landing and take-off (into the long arm of the T toward the cross-bar). Two-digit numbers on a black board — direction of take-off (magnetic, in tens of degrees).",
          "Red and yellow chequered flag or board — aircraft must report to the ATS unit / 'C' (black on yellow) — location of the ATS reporting office.",
          "Right-hand traffic: a right-hand arrow (red or orange) — turns to be made to the right before landing and after take-off; or a green flag.",
          "White crosses on runways/taxiways — areas unfit for the movement of aircraft (closed).",
          "Marshalling signals (from a marshaller to the pilot) and airport signs (mandatory instruction signs red with white text — runway holding positions; information signs yellow/black) — see AIP/Annex 14.",
        ],
      },
    ],
    pick: ["A.3.6#Radio communication|Rules of the air"],
    mustKnow: [
      "Mandatory radio watch in controlled airspace (clearance needed) and where prescribed (ATZ, ATA, SRA, advisory airspace).",
      "Comply with acknowledged clearances; say UNABLE if not acceptable; clearance doesn't override the rules of the air.",
      "Light signals: steady green = land / take off; steady red = give way, circle / stop; green flashes = return to land / taxi; red flashes = don't land / clear the landing area; white flashes = land and go to apron / return to start.",
      "Red square with yellow cross = landing prohibited; dumb-bell = use runways and taxiways only.",
    ],
    traps: ["Green flashes in flight mean 'return for landing', not 'cleared to land'."],
  },

  GR5: {
    title: "Radiotelephony Phraseology & Procedures",
    intro: "Standard phraseology keeps radio short and unambiguous. This section covers UTC and transmission of numbers, the phonetic alphabet and Morse code, standard words, call signs and their abbreviation, the radio check and readability scale, establishing contact and listening out, acknowledgement, readback, corrections and repetitions, message categories and priority, relaying, TIBA and IFBP broadcasts, ATIS and pilot reports, and transponder, TCAS and Q-code phraseology.",
    blocks: [
      {
        heading: "Time, numbers, the phonetic alphabet and Morse code",
        points: [
          "§ Time",
          "All aviation times are UTC ('Zulu'). SAST = UTC + 2. Times are given in minutes (and hours if needed): 0920 → 'two zero' or 'zero niner two zero'. A time check is given to the nearest minute (or half-minute): 'time zero niner two zero'.",
          "§ Numbers",
          "Pronunciation: 0 ZE-RO, 1 WUN, 2 TOO, 3 TREE, 4 FOW-er, 5 FIFE, 6 SIX, 7 SEV-en, 8 AIT, 9 NIN-er, decimal DAY-SEE-MAL, hundred HUN-dred, thousand TOU-SAND.",
          "Numbers are normally transmitted digit by digit: 'flight level one two zero', 'heading one eight zero', 'squawk four five two one', 'wind two seven zero degrees one five knots'. Whole hundreds and thousands of altitude/height/visibility/cloud use the words HUNDRED and THOUSAND ('two thousand five hundred'). Frequencies: 'one one eight decimal seven' (six digits only when 8.33 kHz).",
          "QNH/QFE below 1000 hPa: 'QNH niner niner eight'.",
          "§ Phonetic alphabet (ICAO)",
          "Alfa, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.",
          "§ Morse code",
          "Used for navaid identifications (e.g. VOR ident) and the distress/urgency signals: SOS (· · · – – – · · ·) distress; XXX (– · · – ×3) urgency. Pilots must be able to identify beacons by their Morse ident (letters printed with dots and dashes on charts).",
        ],
      },
      {
        heading: "Standard words and phrases",
        points: [
          "ACKNOWLEDGE — let me know you have received and understood. AFFIRM — yes. APPROVED — permission granted. BREAK — separation between portions of a message. BREAK BREAK — separation between messages to different aircraft in a busy environment. CANCEL — annul the previous clearance. CHECK — examine a system/procedure. CLEARED — authorised to proceed under the conditions specified. CONFIRM — have I correctly received…? / did you correctly receive…? CONTACT — establish radio contact with… CORRECT — true/accurate. CORRECTION — an error has been made; the correct version is… DISREGARD — ignore. HOW DO YOU READ — what is the readability? I SAY AGAIN — I repeat for clarity. MAINTAIN — continue in accordance with… MONITOR — listen out on (frequency). NEGATIVE — no / not correct / permission not granted. OVER, OUT (HF only). READ BACK — repeat all or the specified part. RECLEARED — a change to your last clearance. REPORT — pass the following. REQUEST — I should like to know / to have. ROGER — I have received all your last transmission (NEVER as an answer to a question requiring yes/no, and not when a readback is required). SAY AGAIN — repeat. SPEAK SLOWER. STANDBY — wait and I will call you (no onward clearance implied). UNABLE — I cannot comply. WILCO — I understand and will comply. WORDS TWICE — difficult communications: send every word twice.",
          "Avoid non-standard terms and 'pleasantries'; English must be used with ATC (unless otherwise agreed); keep messages concise.",
        ],
      },
      {
        heading: "Call signs; establishing contact; radio check and readability",
        points: [
          "§ Ground station call signs",
          "Location name + suffix: 'Cape Town Tower', 'Johannesburg Approach', 'Johannesburg Information'. Once contact is established the suffix may be omitted if no confusion.",
          "§ Aircraft call signs",
          "(a) The registration (e.g. ZS-BCV — 'Zulu Sierra Bravo Charlie Victor'); (b) operator telephony designator + flight number (e.g. 'Springbok 123'); (c) designator + registration. Abbreviation of registration call signs (type a): ICAO — first character of the nationality and at least the last two characters (Z-CV); in SA commonly the last three characters ('BCV'). Use the FULL call sign on first contact; abbreviate only after the ground station has done so. Type (b) call signs are not abbreviated.",
          "Prefixes/suffixes (SA AIC D005/2018): HEAVY / SUPER (wake category, on first contact with tower/approach/ground/delivery), HALO (medical flight needing priority, can accept up to 10 min delay), MERCY (medical emergency — absolute priority), STUDENT (ab initio dual), SOLO STUDENT, HELICOPTER, GLIDER, MOTOR GLIDER, BALLOON, AIRSHIP, RPAS; suffix MAYDAY / PAN when calling a subsequent station after declaring.",
          "§ Establishing contact",
          "Listen first; then: station called + own call sign (+ position and request). Initial call to an ATSU: 'Cape Town Tower, Zulu Sierra Bravo Charlie Delta, Zeekoevlei at one thousand five hundred feet, for landing'. If the controller replies 'station calling Cape Town Tower, say again your call sign', respond with the full call sign.",
          "Listening out: when leaving a frequency report e.g. 'changing to (frequency)'; when monitoring, 'monitoring (frequency)'.",
          "§ Radio check and readability scale",
          "Test call: 'Cape Town Ground, ZS-ABC, radio check one two one decimal niner'. Reply: 'ZS-ABC, Cape Town Ground, reading you five'. Readability: 1 unreadable; 2 readable now and then; 3 readable with difficulty; 4 readable; 5 perfectly readable. Test transmissions must not exceed 10 seconds and must not interfere.",
        ],
      },
      {
        heading: "Acknowledgement, readback, corrections and repetitions",
        points: [
          "Acknowledgement: by using the aircraft call sign at the end (or beginning) of the readback, 'roger', or 'wilco' as appropriate.",
          "READBACK (mandatory for safety-related items): ATC route clearances; clearances and instructions to enter, land on, take off from, hold short of, cross, taxi and backtrack on any runway; runway in use, altimeter settings (QNH/QFE), SSR codes, level instructions, heading and speed instructions, transition levels, frequencies (transfer), and conditional clearances. Other clearances (e.g. taxi instructions) are read back or acknowledged as required. End the readback with the call sign.",
          "Controllers listen to the readback ('hearback') and correct errors: 'NEGATIVE, I say again …'.",
          "CORRECTIONS: if an error is made in a transmission: 'CORRECTION' then the last correct group or phrase and the correct version. If the best way is to repeat the whole message: 'CORRECTION, I say again' and the whole message.",
          "REPETITIONS: 'SAY AGAIN' (all), 'SAY AGAIN ALL BEFORE/AFTER (word)', 'SAY AGAIN (item)'. If a station is uncertain a message was received correctly it asks for repetition.",
          "Conditional clearances: 'Behind the landing Boeing 737, line up and wait behind' — the condition is given first, and readback must include it; the pilot must identify the aircraft concerned.",
          "Blocked/simultaneous transmissions: if you hear a squeal, the controller didn't get either message.",
        ],
      },
      {
        heading: "Categories and order of priority of messages; relaying",
        points: [
          "Order of priority (highest first): 1. DISTRESS (MAYDAY); 2. URGENCY (PAN PAN), including medical transport ('MEDICAL'); 3. Communications relating to DIRECTION FINDING (DF); 4. FLIGHT SAFETY messages (ATC clearances, instructions, position reports, movement and control messages, weather of immediate concern to an aircraft about to depart/in flight, messages from an operator of immediate concern); 5. METEOROLOGICAL messages (other weather information); 6. FLIGHT REGULARITY messages (operator–aircraft messages about schedules, servicing, passenger requirements).",
          "§ Relay",
          "When a ground station cannot reach an aircraft (range, terrain), another aircraft may relay. A pilot asked to relay: 'Johannesburg Information, ZS-ABC, relay from ZS-XYZ: …', passing the message exactly. Relay starts with 'relay from' / 'relay to'. Relayed messages are read back to confirm.",
        ],
      },
      {
        heading: "TIBA and IATA IFBP (AFI region)",
        points: [
          "§ TIBA — Traffic Information Broadcasts by Aircraft (SA)",
          "When not in contact with an ATSU — by design (uncontrolled airspace below 1 500 ft AGL, special rules areas, flying training areas, the circuit of uncontrolled aerodromes) or by circumstance (information frequency not manned, out of VHF range) — pilots broadcast position and intentions on the published TIBA frequency so other pilots can avoid collision.",
          "Content, in this order: the general AREA ('Traffic in the Bethlehem area'), aircraft TYPE, CALL SIGN, ROUTE (meaningful points), present POSITION, ALTITUDE/FL, next point and ESTIMATE, and the CALL SIGN again. E.g.: 'Traffic in the Tswalu area, Piper Arrow ZS-EOA airborne Tswalu at 1045, passing 6 000 feet for FL95 en route to Kimberley, estimate the Kimberley TMA at 1120, ZS-EOA.'",
          "Don't acknowledge broadcasts unless there is a potential conflict (then coordinate with the other aircraft). Avoid 'any traffic please advise'. Listen out on the TIBA frequency, and on manned frequencies keep broadcasts short so as not to block ATC.",
          "Broadcast at regular intervals, when entering the area, and before changing level or crossing busy points.",
          "§ IATA In-Flight Broadcast Procedure (IFBP) — AFI region",
          "In parts of Africa where ATS communications are unreliable, aircraft broadcast on the IFBP frequency (126.9 MHz) in English: 'All stations, this is (call sign), FL (level), (direction) bound on (route) from (point) to (point), position (point) at (time), estimating (next point) at (time), (call sign), FL (level), (direction)'. Broadcast 10 minutes before entering the area, at reporting points, before changing level (and when leaving/arriving), and listen out continuously on 126.9 (and 121.5). Keep landing/anti-collision lights on as appropriate; level changes made with care.",
        ],
      },
      {
        heading: "Weather information (ATIS) and reports (PIREPs/AIREPs)",
        points: [
          "§ ATIS (Automatic Terminal Information Service)",
          "A recorded broadcast of routine aerodrome information, updated and given a letter code (Alpha, Bravo…). Contents: aerodrome name, information code, time of observation, type of approach expected, runway in use, braking action/runway condition, transition level, other essential operational information (e.g. NOTAMs, birds), surface wind, visibility/RVR, present weather, cloud, temperature, dew point, QNH, significant weather, trend; and an instruction to acknowledge receipt on first contact.",
          "Listen before first contact and report 'with information Bravo'. If the code has changed, ATC passes the changes.",
          "§ Pilot reports (PIREPs / AIREPs)",
          "Pilots report significant weather encountered (severe turbulence, severe icing, mountain waves, thunderstorms, volcanic ash, windshear on approach, unforecast weather) as SPECIAL AIR-REPORTS to ATC — position, time, level, phenomenon and intensity. Routine AIREPs contain position, time, level, next position and estimate, and meteorological information (temperature, wind) as required.",
          "Position report format: call sign, POSITION, TIME, LEVEL, NEXT POSITION and ESTIMATE (and any additional information).",
        ],
      },
      {
        heading: "Transponder procedures, TCAS/ACAS phraseology and Q-codes",
        points: [
          "§ Transponder (SSR)",
          "Select the code assigned ('squawk four five two one'), Mode C/ALT on ('squawk Charlie'), IDENT only when asked ('squawk ident'), STBY while changing codes (or avoid passing through emergency codes). Read back the code. ATC phrases: 'squawk (code)', 'confirm squawk', 'recycle (code)', 'squawk ident', 'squawk standby', 'squawk altitude' / 'stop squawk altitude — wrong indication', 'check altimeter setting and confirm level' (Mode C discrepancy > 300 ft).",
          "Special codes: 7500 unlawful interference; 7600 radio failure; 7700 emergency; 2000 entering an SSR area without an assigned code (and the SA VFR conspicuity code as published in the AIP).",
          "Pilots should operate the transponder with altitude reporting at all times when fitted (unless instructed otherwise), including VFR.",
          "§ TCAS/ACAS phraseology",
          "After deviating for an RA: '(call sign), TCAS RA'. ATC replies 'ROGER'. When clear of conflict: '(call sign), CLEAR OF CONFLICT, RETURNING TO (assigned clearance)' / 'CLEAR OF CONFLICT, (assigned clearance) RESUMED'. If an ATC instruction conflicts with an RA: '(call sign), UNABLE, TCAS RA'. ATC does not issue instructions to the aircraft until the pilot reports clear of conflict.",
          "§ Q-codes (used in RT)",
          "QNH (altimeter subscale to read altitude/elevation), QFE (to read height above aerodrome), QNE (standard setting reading), QDM (magnetic heading to steer to the station in zero wind), QDR (magnetic bearing from the station), QTE (true bearing from the station), QUJ (true track to the station), QGH (controlled descent through cloud using VDF), QTF (position by DF bearings).",
        ],
      },
    ],
    mustKnow: [
      "UTC; numbers digit by digit (TREE, FOW-er, FIFE, NIN-er); hundreds/thousands for altitude.",
      "ROGER = received; WILCO = will comply; AFFIRM = yes; NEGATIVE = no; STANDBY = wait.",
      "Full call sign on first contact; abbreviate only after ATC does.",
      "Readability 1–5. Radio check ≤ 10 s.",
      "Readback: runway, altimeter settings, SSR codes, levels, headings, speeds, frequencies, clearances, conditional clearances.",
      "Priority: distress, urgency, DF, flight safety, meteorological, flight regularity.",
      "TIBA: area, type, call sign, route, position, level, next point/estimate, call sign. IFBP 126.9 MHz.",
      "TCAS: report 'TCAS RA'; 'clear of conflict, returning to …'.",
    ],
    traps: [
      "Using ROGER where a readback or yes/no answer is required.",
      "Abbreviating your call sign before the controller does.",
    ],
  },

  GR6: {
    title: "Wake Turbulence",
    intro: "Every aircraft trails wingtip vortices; behind a heavier aircraft they can roll a lighter one beyond its control authority. This section covers the wake turbulence categories, the separation ATC applies and the phraseology, and how pilots apply avoidance in practice.",
    blocks: [
      {
        heading: "Wake turbulence categories",
        points: [
          "ICAO categories by maximum certificated take-off mass (MTOM): LIGHT (L) — 7 000 kg or less; MEDIUM (M) — more than 7 000 kg but less than 136 000 kg; HEAVY (H) — 136 000 kg or more; SUPER (J) — the Airbus A380 (specified in Doc 8643).",
          "Shown in item 9 of the flight plan (after the aircraft type, e.g. B738/M, A388/J). Heavy and Super aircraft add 'HEAVY'/'SUPER' to their call sign on first contact with tower/approach/ground.",
          "Some states use the RECAT (re-categorisation) system with more categories (A–F) and reduced separations — use the SA AIP.",
        ],
      },
      {
        heading: "Separation minima and phraseology",
        points: [
          "§ Distance-based (radar) — following aircraft directly behind at the same level or less than 1 000 ft below (approach and departure):",
          "SUPER behind… HEAVY 6 nm, MEDIUM 7 nm, LIGHT 8 nm. HEAVY behind HEAVY 4 nm; MEDIUM behind HEAVY 5 nm; LIGHT behind HEAVY 6 nm; LIGHT behind MEDIUM 5 nm.",
          "§ Time-based (non-radar) — arrivals",
          "MEDIUM behind HEAVY 2 min; LIGHT behind HEAVY or MEDIUM 3 min (behind SUPER: medium 3 min, light 4 min).",
          "§ Departures",
          "LIGHT or MEDIUM taking off behind a HEAVY (and LIGHT behind MEDIUM) — 2 minutes (same runway, or parallel runways less than 760 m apart, or crossing runways if the flight paths cross); 3 minutes when departing from an INTERMEDIATE part of the same runway, or from the opposite direction behind a heavy (or after a heavy's low/missed approach in the opposite direction). Behind SUPER: 3 min (4 min from intermediate).",
          "VFR pilots who accept a visual approach or visual separation, or who request to waive the time (where permitted for light aircraft), take responsibility for wake avoidance.",
          "§ Phraseology",
          "ATC: 'CAUTION WAKE TURBULENCE' (with the traffic information) — e.g. 'ZS-ABC, number two, follow the Boeing 737 on final, caution wake turbulence'. 'Hold position, wake turbulence separation, (time) minutes'. Pilots request: 'request (number) minutes wake turbulence separation' or report the delay they want.",
        ],
      },
      {
        heading: "Application — avoidance by the pilot",
        points: [
          "Vortices are strongest behind HEAVY, CLEAN, SLOW aircraft; they sink 300–500 fpm to about 500–900 ft below the flight path and drift with the wind; a light crosswind (3–5 kt) can keep the upwind vortex on the runway; calm conditions let them linger 2–3 minutes.",
          "Landing behind a larger aircraft: stay at or above its flight path; land beyond its touchdown point. Taking off behind it: lift off before its rotation point and climb above its path (or wait the full time); behind a landing aircraft, take off beyond its touchdown point.",
          "En route: avoid flying below and behind larger aircraft; if crossing behind, cross above or wait.",
          "Helicopters: avoid the downwash/vortices of hovering and slow-moving helicopters (strong rotor wash).",
          "If unsure, ask ATC for more spacing ('request extended spacing for wake turbulence').",
        ],
      },
    ],
    pick: ["A.1.7#Wake turbulence"],
    mustKnow: [
      "L ≤ 7 000 kg; M 7 000–136 000 kg; H ≥ 136 000 kg; J = A380 (Super).",
      "Radar: L behind M 5 nm, L behind H 6 nm, M behind H 5 nm, H behind H 4 nm; behind J 6/7/8 nm.",
      "Departure behind heavy: 2 min (3 min from an intermediate point/opposite direction).",
      "'Caution wake turbulence'; HEAVY/SUPER call-sign suffix on first contact.",
    ],
    traps: ["Accepting visual separation transfers wake-avoidance responsibility to the pilot."],
  },

  GR7: {
    title: "Filing of Flight Plans & Search and Rescue (SAR)",
    intro: "A flight plan tells ATC your intentions and triggers search and rescue if you don't arrive. This section covers when a flight plan is required, how and when to submit and activate it, how to complete the ICAO form, and how SAR is applied in South Africa — the SAR remark options, the alerting phases and what to do after a forced landing.",
    blocks: [
      {
        heading: "Applicability and filing requirements",
        points: [
          "A flight plan (FPL) is required (CAR 91.03.4 — see the regulation text in Air Law) for: any flight in CONTROLLED airspace (other than crossing an airway/controlled airspace at right angles as permitted, or local flights as exempted); all IFR flights; flights crossing INTERNATIONAL borders; flights to/from or within designated areas or where required by the AIP (e.g. some special rules areas, night VFR); and any flight for which SAR alerting is desired (it may be filed voluntarily for other flights).",
          "A flight NOTIFICATION / booking-out may be acceptable for some local flights (check AIP).",
          "The flight plan is a prior notification only — SAR applies only once the FPL is ACTIVATED (on take-off at a manned aerodrome, or by calling the ATSU/by telephone).",
        ],
      },
      {
        heading: "Procedures for submission and activation",
        points: [
          "Submit the FPL to the ATS reporting office (ARO)/briefing office or through the national flight-plan system (online/phone) — at least 60 minutes before the estimated off-block time for IFR/controlled flights (earlier for international flights — check the AIP), or as required.",
          "In flight: a flight plan may be filed in the air with an ATSU ('request to file an airborne flight plan') — not for crossing borders/international flights.",
          "Activation: at manned aerodromes the FPL is activated automatically when the aircraft takes off (the tower passes the departure time). At unmanned aerodromes the pilot activates it by calling the appropriate ATSU after take-off (or by telephone before take-off if radio contact is impossible after take-off) with the actual time of departure.",
          "Changes: notify ATS of changes (delays — if the flight is delayed by more than 30 minutes (controlled) / 60 minutes (uncontrolled) of the EOBT, amend or cancel; route, level, destination changes).",
          "Closing: a flight plan is automatically closed on arrival at a MANNED aerodrome. At an UNMANNED aerodrome the pilot MUST close it (by radio before landing if in contact, or by telephone immediately after landing) — otherwise SAR action will start.",
        ],
      },
      {
        heading: "Completion of the ICAO flight plan form",
        points: [
          "Item 7 AIRCRAFT IDENTIFICATION (max 7 characters, no hyphens — e.g. ZSABC or SAA123).",
          "Item 8 FLIGHT RULES: I (IFR), V (VFR), Y (IFR first, then VFR), Z (VFR first, then IFR); TYPE OF FLIGHT: S scheduled, N non-scheduled, G general aviation, M military, X other.",
          "Item 9 NUMBER (formation) / TYPE OF AIRCRAFT (ICAO designator, e.g. C172, PA28; ZZZZ if none, with details in item 18) / WAKE TURBULENCE CATEGORY (L, M, H, J).",
          "Item 10 EQUIPMENT AND CAPABILITIES: COM/NAV/approach equipment (N none, S standard — VHF RTF, VOR, ILS; plus letters e.g. D DME, F ADF, G GNSS, O VOR, L ILS, R PBN approved, Y 8.33 kHz) / SURVEILLANCE (N none, A Mode A, C Mode A+C, S Mode S variants, ADS-B codes B1/B2/U1/V1/E…).",
          "Item 13 DEPARTURE AERODROME (4-letter ICAO indicator, or ZZZZ with the name in item 18 DEP/) and TIME (EOBT in UTC).",
          "Item 15 CRUISING SPEED (N + 4 digits knots, e.g. N0120; M Mach; K km/h), LEVEL (A + 3 digits altitude in hundreds of feet, e.g. A055; F flight level F085; VFR), ROUTE (ATS routes and significant points, DCT for direct, speed/level changes).",
          "Item 16 DESTINATION AERODROME and TOTAL EET (hours and minutes), ALTERNATE aerodrome(s).",
          "Item 18 OTHER INFORMATION — e.g. PBN/, NAV/, DOF/ (date of flight), REG/, EET/, DEP/, DEST/, OPR/, PER/ (performance category), RMK/ (remarks — including the SA SAR remark), STS/ (special handling — e.g. HOSP, MEDEVAC, SAR). 0 (zero) if nothing.",
          "Item 19 SUPPLEMENTARY INFORMATION (not transmitted, retained for SAR): ENDURANCE (E/ hours and minutes), PERSONS ON BOARD (P/), emergency radio (R/ — UHF, VHF, ELT), survival equipment (S/ — polar, desert, maritime, jungle), JACKETS (J/ — light, fluorescent, UHF, VHF), DINGHIES (number, capacity, cover, colour), aircraft colour and markings (A/), remarks (N/), PILOT-IN-COMMAND (C/), and filed by.",
        ],
      },
      {
        heading: "Search and Rescue — how SAR is applied in South Africa",
        points: [
          "SAR in SA is provided by SASAR (South African Search and Rescue Organisation); the Aeronautical Rescue Coordination Centre (ARCC) in Johannesburg coordinates searches when alerted by an ATSU or other alerting post.",
          "§ SAR is automatic for",
          "Flights departing a MANNED aerodrome that fail to report within 5 minutes after they were expected to; flights in CONTROLLED airspace that are 5 minutes overdue at reporting points; and flights to a manned aerodrome that fail to arrive.",
          "§ SAR remarks in item 18 (RMK/) for other flights",
          "RMK/SARNML — destination MANNED: SAR if 5 min overdue at reporting points in controlled airspace, or the aircraft doesn't arrive.",
          "RMK/SARNMLENROUTE — destination manned, part of the flight in uncontrolled airspace: SAR if 5 min overdue at reporting points in ALL airspace (pilot must make position reports throughout), or doesn't arrive.",
          "RMK/SARFAxxhhmm — destination UNMANNED: SAR at the specified UTC time (hhmm) if not cancelled with the nominated ATSU (FAxx), plus overdue at controlled-airspace reporting points. E.g. RMK/SARFACT1230.",
          "RMK/SARFAxxhhmmENROUTE — unmanned destination, with en-route reporting in all airspace plus the specified time.",
          "RMK/SARFAxxETAyHR — unmanned destination: SAR y hours after the ETA (from the actual take-off time + EET) if not cancelled.",
          "RMK/SARNIL — unmanned destination: SAR only if overdue at reporting points in controlled airspace.",
          "SAR is cancelled by closing the flight plan. Remember to phone if landing at an unmanned field or diverting.",
        ],
      },
      {
        heading: "SAR phases (SA) and actions after a forced landing",
        points: [
          "UNCERTAINTY (INCERFA): no radio contact within 5 minutes after the ETA at a reporting point/scheduled report and preliminary checks fail within 15 minutes; aircraft known to be operating irregularly, off track/level, with navigational difficulty or technical problems not preventing completion; a flight with a specified alerting time not contacted; a landing other than forced but position in doubt; or information that an aircraft is missing.",
          "ALERT (ALERFA): INCERFA action unsuccessful; information indicates difficulties but a forced landing not likely; the aircraft has made a PAN call; or not operating normally/lost with its safety in jeopardy.",
          "DISTRESS (DETRESFA): ALERFA action unsuccessful; forced landing likely, or has occurred (or ditched/crashed); the fuel stated in the flight plan is exhausted; a MAYDAY call has been made; a downed aircraft has been sighted or located by ELT; an aircraft cleared to land fails to land within 5 minutes of the estimated landing time without contact; or an aircraft fails to report within 5 minutes after take-off.",
          "§ After a forced landing",
          "If on a SAR flight plan or in a sparsely populated area, STAY WITH THE AIRCRAFT (easier to find). Activate the ELT; transmit on the COM radio (121.5 MHz) and/or ELT at a quarter past and a quarter to each hour (0715, 0745…) to save battery, but leave the ELT ON continuously when search aircraft are seen or heard. Place shiny parts conspicuously; use flares/smoke only when search aircraft are seen or heard; conserve energy, water and food.",
          "Signal strips: for flights more than 20 nm from base a set of four white signal strips (each at least 60 cm × 2.5 m) must be carried to lay out the ground-to-air signals: V — require assistance; X — require medical assistance; N — no/negative; Y — yes/affirmative; ↑ — proceeding in this direction.",
        ],
      },
    ],
    mustKnow: [
      "FPL required: controlled airspace, IFR, international, as required by AIP; SAR only when the FPL is activated.",
      "Activation: automatic at manned aerodromes; call/phone the ATSU at unmanned ones. Close at unmanned destinations or SAR starts.",
      "Items: 7 ident, 8 rules/type, 9 type/wake, 10 equipment, 13 dep/EOBT, 15 speed/level/route, 16 dest/EET/alternate, 18 other info (RMK/SAR…), 19 endurance/POB/survival.",
      "SAR automatic: 5 min overdue in controlled airspace or after departure from a manned aerodrome; non-arrival at a manned aerodrome.",
      "RMK/SARNML, SARNMLENROUTE, SARFAxxhhmm, SARFAxxETAyHR, SARNIL.",
      "Phases INCERFA/ALERFA/DETRESFA; MAYDAY = distress phase, PAN = alert phase.",
      "After a forced landing: stay with the aircraft; ELT/121.5 at :15 and :45.",
    ],
    traps: [
      "Filing a flight plan without activating it gives no SAR cover.",
      "Forgetting to close a flight plan at an unmanned aerodrome.",
    ],
  },

  GR8: {
    title: "Emergency & Urgency Phraseology & Procedures",
    intro: "When something goes wrong, the radio is how you get help. This section covers interception (radio phrases and visual signals), the five golden rules, VHF direction finding, distress and urgency signals, SAR guard frequencies, MAYDAY and PAN calls (and fuel emergencies), and the ELT with survivor action.",
    blocks: [
      {
        heading: "Identification and interception of aircraft",
        points: [
          "An aircraft that strays (e.g. into foreign or prohibited airspace) may be intercepted. On being intercepted: follow the interceptor's instructions, try to contact it/the intercept control unit on 121.5 MHz (or 243 MHz), squawk 7700 unless otherwise instructed, and notify ATS.",
          "§ RT phrases",
          "Interceptor: CALL SIGN (what is your call sign?), FOLLOW, DESCEND (for landing), YOU LAND (at this aerodrome), PROCEED (you may proceed).",
          "Intercepted aircraft: CALL SIGN (my call sign is…), WILCO, CAN NOT (unable to comply), REPEAT, AM LOST, MAYDAY, HIJACK, LAND (request to land at…), DESCEND (I require descent).",
          "§ Visual signals (ICAO Annex 2)",
          "Series 1 — interceptor ROCKS ITS WINGS in front and to the left of the intercepted aircraft (flashing lights at night), then a slow level turn onto the desired heading = 'You have been intercepted, follow me'. Response: rock wings (flash lights at night) and follow.",
          "Series 2 — interceptor makes an abrupt BREAKAWAY: a climbing turn of 90° or more without crossing the intercepted aircraft's flight path = 'You may proceed'. Response: rock wings.",
          "Series 3 — interceptor circles the aerodrome, LOWERS ITS GEAR and overflies the runway in the landing direction = 'Land at this aerodrome'. Response: lower gear, follow and land if safe.",
          "Series 4 — intercepted aircraft raises its gear and flashes landing lights while passing over the runway at 1 000–2 000 ft and continues circling = 'The aerodrome you designated is inadequate'. Interceptor responds with Series 1 (follow to an alternate) or Series 2 (released).",
          "Series 5 — intercepted aircraft switches all lights on and off regularly = 'Cannot comply'. Response: Series 2.",
          "Series 6 — intercepted aircraft flashes all lights irregularly = 'In distress'. Response: Series 2.",
        ],
      },
      {
        heading: "The five golden rules; declaring an emergency",
        points: [
          "CONFESS your predicament to ATC early. COMMUNICATE — give all pertinent information in the first message (fuel/endurance, POB, intentions). CLIMB (if safe and VMC) for better radio range, radar coverage, DF and map reading. COMPLY with instructions — but say UNABLE if you can't (e.g. a climb would take a VFR pilot into cloud). CONSERVE fuel and resources — slow down to endurance speed, lean the mixture.",
          "And always: AVIATE, NAVIGATE, COMMUNICATE — in that order.",
          "Don't hesitate to declare an emergency — the paperwork after a safe landing is trivial compared with an accident. 'When in doubt, there is no doubt.'",
          "Lost: tell ATC ('lost' or 'uncertain of position'), give last known position, heading, altitude, endurance; ATC may use radar, DF or other aircraft to help.",
        ],
      },
      {
        heading: "VHF direction finding (VDF)",
        points: [
          "A VDF station measures the bearing of the aircraft's transmission and passes it as a Q-code: QDM (magnetic heading to steer to the station, zero wind), QDR (magnetic bearing from the station), QTE (true bearing from the station), QUJ (true track to the station). Class of bearing: A ±2°, B ±5°, C ±10°, D worse than C.",
          "Phraseology: pilot — '(Station) Homer, ZS-ABC, request QDM, ZS-ABC' (transmitting long enough — a few seconds — for the bearing to be taken). Station — 'ZS-ABC, QDM two seven five, class Bravo'. Pilot reads back.",
          "DF homing: repeated QDMs to fly to the station; a QGH (controlled descent through cloud) is a VDF letdown procedure.",
          "VDF is useful for lost aircraft and in emergencies (DF messages have the 3rd priority, after distress and urgency).",
        ],
      },
      {
        heading: "Distress and urgency signals; SAR guard frequencies",
        points: [
          "DISTRESS (grave and imminent danger, immediate assistance required): MAYDAY spoken (×3); SOS in Morse; rockets or shells throwing RED lights fired one at a time at short intervals; a red parachute flare; squawk 7700.",
          "URGENCY (a condition concerning safety, not requiring immediate assistance): PAN PAN (×3); XXX in Morse; repeatedly switching the landing lights or navigation lights on and off (distinct from normal flashing).",
          "SAR / guard frequencies: 121.5 MHz (international VHF aeronautical emergency — monitored by ATC, airliners, military and rescue organisations; also ELT homing), 243 MHz (military UHF), 406 MHz (satellite ELT), and HF 2 182 kHz and 8 364 kHz. Pilots on long flights over remote areas should monitor 121.5 MHz where possible.",
        ],
      },
      {
        heading: "MAYDAY and PAN calls; fuel emergencies",
        points: [
          "§ MAYDAY (distress) — e.g. engine fire, engine failure in a single-engine aircraft",
          "Transmit on the frequency in use (or 121.5 MHz): MAYDAY MAYDAY MAYDAY, the station addressed, aircraft identification, the NATURE of the distress, the pilot's INTENTION, present POSITION, ALTITUDE and HEADING, and any other useful information (POB, endurance). Example: 'Mayday mayday mayday, Cape Town Information, ZS-JGP, engine fire, intend landing on a field north of the N2 approximately 5 nm west of Caledon, overhead that field at FL75, heading west.'",
          "Distress traffic has ABSOLUTE PRIORITY; all other stations keep silent unless they can help. ATC may impose silence: 'All stations, stop transmitting, MAYDAY'. If you hear an unacknowledged MAYDAY: acknowledge it, then relay to the nearest ATSU ('MAYDAY RELAY'). Use the suffix 'MAYDAY' on the call sign when transferred to a new frequency.",
          "Cancelling: 'CANCEL MAYDAY' with the reason. ATC ends it with 'DISTRESS TRAFFIC ENDED'.",
          "§ PAN PAN (urgency) — e.g. engine failure in a twin, a sick passenger",
          "Same format with PAN PAN ×3. Urgency messages have priority over all except distress. Example: 'Pan pan, pan pan, pan pan, Lanseria Tower, ZS-FUN, passenger with a suspected heart attack, just south of Hartbeespoort Dam, 7 000 feet heading south, intend returning to Lanseria for landing, request the shortest approach and an ambulance on the apron.'",
          "§ Fuel",
          "'MINIMUM FUEL' — when any change to the existing clearance (any further delay) would result in landing with less than the planned final reserve fuel (not an emergency, but a warning). 'MAYDAY MAYDAY MAYDAY FUEL' — when following the existing clearance would result in landing with less than final reserve fuel.",
        ],
      },
      {
        heading: "Emergency Locator Transmitter (ELT) and survivor action",
        points: [
          "An ELT activates automatically on impact (g-switch) or manually; it transmits a swept tone on 121.5 MHz (and 243 MHz) for homing, and on 406 MHz a digital coded message (aircraft identity, registration country, often GPS position) relayed by Cospas-Sarsat satellites. Satellites no longer process 121.5/243 MHz signals. Register 406 MHz ELTs/PLBs.",
          "After an accident: switch the ELT ON manually (the g-switch may not have activated), check the antenna is connected; use the aircraft radio on 121.5 MHz if serviceable (transmit at :15 and :45); stay with the aircraft; use signal strips, mirrors, flares (only when search aircraft are seen/heard).",
          "Test only in the first 5 minutes of the hour, briefly; check 121.5 MHz after landing to make sure the ELT hasn't activated.",
          "Satellite tracking devices (commercial) that report position every few minutes greatly help searches.",
        ],
      },
    ],
    pick: ["A.10.10#Testing"],
    mustKnow: [
      "Interception: follow; 121.5 MHz; squawk 7700; Series 1 follow me, 2 proceed, 3 land here.",
      "Five golden rules: confess, communicate, climb, comply, conserve; aviate–navigate–communicate.",
      "MAYDAY: nature, intention, position, altitude, heading — absolute priority. PAN PAN: urgency. Cancel with 'cancel MAYDAY'.",
      "MINIMUM FUEL vs MAYDAY FUEL.",
      "Distress signals: MAYDAY, SOS, red flares; urgency: PAN PAN, XXX, flashing lights.",
      "Frequencies: 121.5, 243, 406 MHz; HF 2 182, 8 364 kHz.",
    ],
    traps: [
      "Interceptor breakaway climbing turn (Series 2) means 'you may proceed'.",
      "Satellites don't detect 121.5 MHz ELTs — register a 406 MHz beacon.",
    ],
  },

  GR9: {
    title: "Radio Communications Failure (RCF)",
    intro: "Most 'radio failures' turn out to be a switch or a volume knob. This section covers the basic fault-finding actions, the RCF procedures for VFR flights in VMC (in uncontrolled and controlled airspace), transmitting blind, and a summary of the IFR procedures.",
    blocks: [
      {
        heading: "Basic fault-finding actions (AIC D005/2018)",
        points: [
          "First assume the fault is your own and check: correct frequency selected; aircraft within VHF range (height!); aircraft MASTER switch ON; avionics/radio master ON; radio set ON (and on COM, not NAV, on combined sets); SQUELCH set correctly; VOLUME turned up (a common mistake); AUDIO PANEL switches set to the correct radio (another common mistake); headset/microphone plugged in properly; PTT not stuck (press it a few times and listen for the transmit click); battery not flat / alternator charging (ammeter); relevant circuit breakers in; the radio shows 'TX' when transmitting.",
          "If a second call is still unanswered: tap the microphone; try another radio set or a hand-held; another headset or a hand microphone; check the connections; try another frequency (the previous frequency, TIBA, 121.5 MHz) or a relay through another aircraft.",
          "Diagnosis: total silence on a normally busy frequency → probably the RECEIVER (volume, audio panel). You can hear others but they don't answer → TRANSMITTER (microphone, PTT).",
          "If the problem can't be fixed and you are in range: assume radio communication failure — SQUAWK 7600.",
          "Transmitter failure only: ATC may ask you to make a specific manoeuvre (orbit left, switch landing lights on, squawk ident) to confirm you can hear them, then give instructions — follow them.",
        ],
      },
      {
        heading: "Transmitting blind",
        points: [
          "If the radio is completely silent you cannot tell whether it is a receiver or a total failure — so assume the TRANSMITTER may still work and TRANSMIT BLIND: prefix messages with 'TRANSMITTING BLIND' and send each message TWICE. E.g. 'Rand, ZS-JGP transmitting blind, final runway 36, ZS-JGP transmitting blind, final runway 36.'",
          "Include position, altitude and intentions, especially at key points (joining, circuit positions, landing).",
          "Transmitting blind (to a specific station, two-way contact not possible) is different from BROADCASTING (information not addressed to a specific station — e.g. TIBA messages).",
          "If the receiver works but the transmitter doesn't, ATC may use 'If you read me, squawk ident / turn left heading…' to confirm.",
        ],
      },
      {
        heading: "RCF procedures — VFR in VMC",
        points: [
          "§ In uncontrolled airspace",
          "Remain in uncontrolled airspace. Continue to an UNCONTROLLED aerodrome, squawk 7600, switch the landing lights on. Join and land using the normal unmanned-aerodrome procedures, making the usual radio calls prefixed 'transmitting blind', with a careful lookout. If you were in contact with an ATSU or had filed a flight plan, TELEPHONE the nearest ATSU after landing.",
          "§ In controlled airspace",
          "Squawk 7600 and LEAVE controlled airspace by the shortest route (transmitting blind). Land at an uncontrolled aerodrome observing the joining rules, transmitting blind and keeping a careful lookout; telephone the ATSU as soon as possible after landing.",
          "If proceeding to an uncontrolled aerodrome is not possible (e.g. at night), continue to a CONTROLLED aerodrome: landing light ON, join OVERHEAD at 1 000 ft above circuit altitude, observe other traffic and the signals from the tower (light signals), then join the circuit (preferably left downwind, or as specified in the AIP), space yourself so as not to endanger others, transmit blind position and intentions, and telephone ATC after landing.",
          "If radio fails while in VMC on an IFR plan (not on a SID/STAR and not cleared for an approach at FACT/FALE/FAOR): continue in VMC and land at the nearest suitable aerodrome, using the VFR procedures.",
        ],
      },
      {
        heading: "RCF — IFR summary (for awareness)",
        points: [
          "On a SID or STAR: follow the communication-failure procedure published with the SID/STAR (also when approaching an aerodrome where STARs are used — select the most likely STAR).",
          "Cleared for an instrument approach at FACT, FALE or FAOR: continue the approach and land (AIP ENR 1.5).",
          "In IMC otherwise: proceed according to the current flight plan; maintain the last cleared level (or minimum safe altitude if higher) and speed for 20 minutes (non-radar — after failing to report at a compulsory point) or 7 minutes (radar environment — from the latest of reaching the level, setting 7600, or failing to report), then the flight plan level; proceed to the navaid serving the destination and hold until the last received EAT (or the ETA if none); then descend and complete the instrument approach; land within 30 minutes after commencing the descent.",
          "Example: ETA 1310, EAT received 1318 → hold at the beacon until 1318, start the approach, land before 1348.",
          "Try other means (mobile/satellite phone) when safe.",
        ],
      },
    ],
    mustKnow: [
      "Check: frequency, range, master/avionics, volume, squelch, audio panel, headset, PTT, CBs.",
      "Silent frequency → receiver; heard but no reply → transmitter.",
      "Squawk 7600; transmit blind, each message twice.",
      "VFR RCF: uncontrolled → stay out of controlled airspace, land at an uncontrolled aerodrome; controlled → leave by the shortest route; at a controlled aerodrome join overhead 1 000 ft above circuit, watch for light signals; phone ATC after landing.",
      "IFR: 20 min (non-radar) / 7 min (radar), then flight plan; hold to EAT/ETA; land within 30 min.",
    ],
    traps: ["Forgetting to telephone ATC after landing following an RCF."],
  },
};
