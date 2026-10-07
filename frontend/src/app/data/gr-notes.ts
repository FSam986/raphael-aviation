// General Radiotelephony (GR1–GR9) study notes. Authored in-house from the
// SACAA Appendix 1.5 A syllabus scope. Shape matches AirLawSectionNote.

import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

export const GR_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "GR1",
    title: "Basic Radio Theory",
    intro:
      "A little radio physics underpins every range and reception question. Learn the wave-property vocabulary, the modulation types and how each frequency band propagates.",
    blocks: [
      {
        heading: "1. Waves & modulation",
        points: [
          "Wavelength = distance travelled in one cycle; frequency = cycles per second (Hz). Higher frequency = shorter wavelength = shorter antenna.",
          "Modulation carries information on a carrier: AM (amplitude), FM (frequency), pulse. Bandwidth is the frequency spread; a narrower receiver bandwidth admits less noise.",
          "Antenna gain = ability to focus radiated power; the aerial aligns with the electric (polarisation) plane of the wave.",
        ],
      },
      {
        heading: "2. Propagation & bands",
        points: [
          "Ground/surface waves follow the earth's curvature (best at low frequency). Sky waves are refracted back by the ionosphere (LF/MF/HF, mainly at night). Space/direct waves are line-of-sight (VHF and up).",
          "Skip distance = transmitter to the first returning sky wave; fading = sky and ground waves arriving together (LF/MF at night). Static = electromagnetic disturbance.",
          "Bands: VLF/LF/MF/HF/VHF/UHF/SHF/EHF. VHF = 30–300 MHz; freedom from static begins around 30 MHz.",
        ],
      },
    ],
    mustKnow: [
      "Higher frequency → shorter wavelength → shorter antenna.",
      "Ground wave (curvature), sky wave (ionosphere, night), space wave (line-of-sight/VHF).",
      "Fading = simultaneous sky + surface wave; skip distance to the first sky-wave return.",
    ],
    traps: [
      "Confusing AM/FM/pulse modulation.",
      "Assuming VHF sky-wave propagation — VHF is line-of-sight.",
    ],
  },
  {
    sectionId: "GR2",
    title: "Principles of Radio Operation (VHF & HF)",
    intro:
      "How the two aeronautical voice bands behave — and what limits their range — decides which one you use and how far you can talk.",
    blocks: [
      {
        heading: "1. VHF",
        points: [
          "VHF voice band ≈ 118.0–136.975 MHz (aeronautical mobile). Line-of-sight only: range depends on the HEIGHTS of transmitter and receiver and the transmitter power.",
          "Line-of-sight range ≈ 1.23 × (√ht1 + √ht2) in NM/ft. Channel spacing 25 kHz (8.33 kHz in upper airspace).",
          "Any transmitting radio needs a station licence; the operator must also be licensed (by the state of registry).",
        ],
      },
      {
        heading: "2. HF",
        points: [
          "HF uses sky waves for very long (oceanic) range; reception varies with day/night as the ionosphere changes — a LOWER frequency generally works better at night.",
          "SELCAL lets crews leave a noisy HF frequency and be alerted only when called — used in oceanic/remote airspace.",
        ],
      },
    ],
    mustKnow: [
      "VHF is line-of-sight; range grows with height and power; spacing 25 kHz (8.33 upper).",
      "HF sky-wave for long range; lower frequency at night.",
      "Both the radio station and the operator must be licensed.",
    ],
    traps: [
      "Expecting VHF beyond line-of-sight.",
      "Using a high HF frequency at night.",
    ],
  },
  {
    sectionId: "GR3",
    title: "Airspace & Air Traffic Services",
    intro:
      "Know the ATS objectives, the ICAO airspace classes and which service you get in each — it decides your radio obligations.",
    blocks: [
      {
        heading: "1. ATS units & FIR",
        points: [
          "Services: air traffic control, flight information, alerting, advisory, and AFIS. A Flight Information Region (FIR) provides a flight information service and an alerting service.",
          "Aerodrome control prevents collisions between aircraft, and aircraft and vehicles/obstructions, on the manoeuvring area and in the circuit.",
        ],
      },
      {
        heading: "2. Classes A–G",
        points: [
          "Class A: IFR only, all separated. Class C: IFR + VFR; IFR separated from IFR & VFR, VFR separated from IFR and given traffic info on other VFR.",
          "Class G: uncontrolled — flight information (traffic information) service only. Class F: advisory service.",
          "Danger, restricted and prohibited areas, and Special Rules Areas, are marked on the chart.",
        ],
      },
    ],
    mustKnow: [
      "FIR = flight information + alerting service.",
      "Class A = IFR only; Class C = IFR+VFR with the stated separations; Class G = FIS only.",
      "Aerodrome control protects the manoeuvring area and the circuit.",
    ],
    traps: [
      "Letting VFR into Class A.",
      "Confusing the Class C/D separation rules.",
    ],
  },
  {
    sectionId: "GR4",
    title: "SA Civil Aviation Regulations (Part 91)",
    intro:
      "The Part 91 radio-communication rules: when radio is mandatory, compliance with clearances, and the visual/ground signals you must recognise.",
    blocks: [
      {
        heading: "1. Radio & clearances",
        points: [
          "Mandatory two-way radio in controlled and advisory airspace; comply with the rules of the air and ATC clearances.",
          "The emergency VHF frequency is 121.5 MHz. Set QNH before descending below the transition level; the semi-circular cruising-level rule is based on MAGNETIC track.",
        ],
      },
      {
        heading: "2. Signals",
        points: [
          "Know the light-gun signals, ground signal square, and marshalling/visual signals; a two-figure sign on the tower gives the magnetic runway heading in use.",
          "Special VFR is a clearance within a control zone — remain VFR outside the CTR until it is issued, comply with ATC and stay clear of cloud.",
        ],
      },
    ],
    mustKnow: [
      "121.5 MHz = VHF emergency; QNH set before descending below the transition level.",
      "Semi-circular rule is by magnetic track.",
      "SVFR: remain VFR outside the CTR until cleared.",
    ],
    traps: [
      "Entering a CTR before receiving the SVFR clearance.",
      "Using true (not magnetic) track for cruising levels.",
    ],
  },
  {
    sectionId: "GR5",
    title: "Radiotelephony Phraseology & Procedures",
    intro:
      "The heart of the exam: standard words, numbers, call signs, read-backs, message categories, and the ATIS/VOLMET/transponder procedures. Precision here is everything.",
    blocks: [
      {
        heading: "1. Standard words & numbers",
        points: [
          "Phonetic alphabet for letters; numbers digit-by-digit ('decimal' not 'point'). Altitudes in thousands/hundreds (13 500 = 'one three thousand five hundred'); flight levels digit-by-digit.",
          "Affirm (yes), Negative (no/permission not granted), Wilco (will comply), Roger (received all), Confirm (verify), Disregard (as not sent), Correction, Break/Break Break, Words Twice, Monitor vs Contact.",
          "'Take-off' is used only to acknowledge a take-off clearance; otherwise say 'departure'. Abandon a take-off with 'Stop immediately'.",
        ],
      },
      {
        heading: "2. Call signs, read-back & messages",
        points: [
          "Abbreviate a registration to the first letter + last two (YRBTA → Y-TA); flight-number call signs are not abbreviated. Solo students prefix 'Student'; heavy aircraft add 'Heavy' on the initial call.",
          "Mandatory read-backs: SSR code, QNH, take-off/landing clearance, level, heading, speed instructions.",
          "Message priority (high→low): distress, urgency, DF, flight safety, meteorological, flight regularity. Categories drive the order ATC answers.",
        ],
      },
      {
        heading: "3. Weather, transponder & Q-codes",
        points: [
          "ATIS = recorded aerodrome info (updated on change / ≥30 min at major aerodromes). VOLMET = HF/VHF broadcast of METARs. SIGMET = en-route hazardous weather.",
          "'Squawk 1234' set the code; 'Squawk standby' select STBY; 'Squawk ident' press IDENT. QDM = magnetic to; QNH/QFE settings; report flight conditions as VMC/IMC.",
          "TIBA broadcast on 124.8 (general flying areas); a test call ≤10 seconds.",
        ],
      },
    ],
    mustKnow: [
      "'Take-off' only acknowledges a take-off clearance; 'Stop immediately' abandons one.",
      "Read back: SSR code, QNH, take-off/landing clearance, level, heading, speed.",
      "Priority: distress > urgency > DF > flight safety > met > flight regularity.",
      "Abbreviate registration to first letter + last two.",
    ],
    traps: [
      "Saying 'point' instead of 'decimal' in a frequency.",
      "Using 'take-off' in a routine call.",
      "Forgetting a mandatory read-back item.",
    ],
  },
  {
    sectionId: "GR6",
    title: "Wake Turbulence",
    intro:
      "Wake categories drive separation and the 'Heavy' suffix — a small but examinable topic.",
    blocks: [
      {
        heading: "1. Categories & phraseology",
        points: [
          "By MCTOM: Light < 7000 kg; Medium 7000–136 000 kg; Heavy > 136 000 kg; Super (J) e.g. A380.",
          "A heavy aircraft adds 'Heavy' as a suffix on the initial call to the aerodrome tower and approach.",
          "Greater separation is applied behind heavier aircraft (the follower is more affected).",
        ],
      },
    ],
    mustKnow: [
      "Heavy = MCTOM > 136 000 kg; 'Heavy' is a suffix on the initial call.",
      "More separation behind heavier aircraft.",
    ],
    traps: [
      "Putting 'Heavy' before the call sign or on every call.",
    ],
  },
  {
    sectionId: "GR7",
    title: "Flight Plans & Search and Rescue",
    intro:
      "Who files, how, and what SAR expects — plus the ATS-unit call-sign suffixes.",
    blocks: [
      {
        heading: "1. Filing & suffixes",
        points: [
          "A flight plan is submitted to an ATS reporting office before departure (or transmitted in flight), unless repetitive flight plans (RPLs) are arranged; the pilot-in-command is responsible.",
          "Item 8 flight rules/type of flight: a solo student or training flight is general aviation 'G'.",
          "Call-sign suffixes: Control (area), Radar (en-route radar), Approach, Departure (radar departures), Tower (aerodrome), Ground (surface movement), Delivery (clearance), Apron, Information (FIS).",
        ],
      },
      {
        heading: "2. SAR",
        points: [
          "SAR phases: INCERFA (uncertainty), ALERFA (alert), DETRESFA (distress). After landing, report the time to terminate the alerting service.",
          "Survivor action: leave the ELT transmitting continuously; know the ground-to-air visual code (e.g. 'X' = require medical assistance).",
        ],
      },
    ],
    mustKnow: [
      "PIC is responsible for the flight plan; training flights are type 'G'.",
      "SAR phases: INCERFA, ALERFA, DETRESFA.",
      "Suffixes: Tower/Ground/Approach/Departure/Radar/Control/Delivery/Apron/Information.",
    ],
    traps: [
      "Confusing the three SAR phases (EMERFA is not one).",
      "Filing a plan just to cross an airway at right angles (not required).",
    ],
  },
  {
    sectionId: "GR8",
    title: "Emergency & Urgency Procedures",
    intro:
      "Distress vs urgency, the calls, imposing silence, VDF, protected medical transports and the survivor procedures.",
    blocks: [
      {
        heading: "1. Distress & urgency",
        points: [
          "Distress (grave and imminent danger, immediate assistance) = MAYDAY ×3. Urgency (safety concern, no immediate danger) = PAN PAN ×3. A sick person on board is urgency.",
          "Silence may be imposed by the aircraft in distress or the station controlling the distress traffic ('STOP TRANSMITTING — MAYDAY'); lifted with 'distress traffic ended'.",
          "Protected medical transport = 'PAN PAN MEDICAL' (1949 Geneva Convention).",
        ],
      },
      {
        heading: "2. VDF, DF & survivor action",
        points: [
          "VDF gives bearings from the aircraft's ordinary VHF transmissions; bearing classes: A ±2°, B ±5°, C ±10°.",
          "SAR guard frequencies, the ELT (121.5/406 MHz) and the ground-to-air visual code support rescue; the 5 golden rules include CONFESS (tell ATS your predicament early).",
        ],
      },
    ],
    mustKnow: [
      "MAYDAY = distress (×3); PAN PAN = urgency (×3); PAN PAN MEDICAL = protected medical.",
      "Silence imposed by the aircraft in distress or the controlling station.",
      "VDF bearing classes A ±2°, B ±5°, C ±10°.",
    ],
    traps: [
      "Using MAYDAY for an urgency (should be PAN PAN).",
      "Thinking any station can impose distress silence.",
    ],
  },
  {
    sectionId: "GR9",
    title: "Radio Communications Failure (RCF)",
    intro:
      "First fault-find, then follow the VFR/IFR failure procedure and transmit blind.",
    blocks: [
      {
        heading: "1. Fault-finding & blind transmission",
        points: [
          "Check: correct frequency, volume, headset/mic plugs, the station is open and you are within range; try the alternate radio and 121.5.",
          "Transmit blind (no reply expected) on the frequency in use, prefixed 'transmitting blind due to receiver failure' when the receiver has failed; a stuck transmit button jams the frequency for everyone.",
        ],
      },
      {
        heading: "2. VFR & IFR procedures",
        points: [
          "VFR in VMC: continue in VMC, land at the nearest suitable aerodrome and report arrival. Squawk 7600.",
          "IFR in IMC: continue per the current flight plan to the destination navaid and commence the approach at/near the flight-plan ETA (or last acknowledged EAT); land within ~30 minutes of that time. (SA CAR 2011 differs from ICAO mainly in the hold-times.)",
        ],
      },
    ],
    mustKnow: [
      "Squawk 7600; transmit blind on the frequency in use.",
      "VFR/VMC: land at the nearest suitable aerodrome. IFR/IMC: continue per flight plan, approach at ETA/EAT.",
      "A stuck transmit button blocks the whole frequency.",
    ],
    traps: [
      "Not squawking 7600.",
      "Diverting in VMC when the rule is to land at the nearest suitable aerodrome.",
    ],
  },
];

export function getGRNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  return GR_NOTES.find((n) => n.sectionId === sectionId);
}
