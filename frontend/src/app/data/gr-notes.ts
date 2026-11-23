import { GR_FULL } from "@/app/data/gr-notes-full";
import { pickPplNote } from "@/app/data/ppl-pick";
// General Radiotelephony (GR1–GR9) study notes — TEXTBOOK DEPTH. Teaching prose
// authored in-house from standard aeronautical radiotelephony and the SACAA
// Appendix 1.5 A syllabus scope. No textbook text reproduced. Shape matches
// AirLawSectionNote.

import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

export const GR_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "GR1",
    title: "Basic Radio Theory",
    intro:
      "Clear communication in the air depends on understanding, at least roughly, how the radio wave carrying your voice actually behaves. A little physics explains why VHF is crystal-clear but limited to line-of-sight, why HF can reach across an ocean but fades at night, and why static ruins the low bands. Get the vocabulary of wave properties, the three modulation types and the way each frequency band propagates, and the range and reception questions answer themselves.",
    blocks: [
      {
        heading: "1. Waves & modulation",
        points: [
          "A radio wave is described by its wavelength (the distance covered in one complete cycle) and its frequency (the number of cycles per second, in hertz); the two are linked through the speed of light, so a HIGHER frequency means a SHORTER wavelength and allows a shorter, more practical antenna. This is why high-band equipment has small aerials while low-frequency stations need huge ones.",
          "A bare carrier carries no information, so intelligence is impressed on it by modulation: amplitude modulation (AM) varies the carrier's strength in step with the audio, frequency modulation (FM) varies its frequency, and pulse modulation switches it on and off. The band of frequencies the signal occupies is its bandwidth; a receiver with a narrower bandwidth lets in less noise but also less of a wide signal, so bandwidth is always a compromise between clarity and fidelity.",
          "An antenna's gain is its ability to concentrate radiated power in a useful direction rather than wasting it. Reception is best when the receiving aerial lies in the same plane as the wave's electric field — its polarisation — which is why aircraft and ground aerials are oriented to match the signals they are meant to work with.",
        ],
      },
      {
        heading: "2. Propagation & bands",
        points: [
          "There are three ways a wave reaches the receiver. The ground (surface) wave follows the Earth's curvature and works best at LOW frequencies, giving reliable medium-range coverage. The sky wave is refracted back to Earth by the ionosphere and supports very long ranges on LF/MF/HF, especially at night when the ionosphere is higher and less absorbing. The space (direct) wave travels straight from transmitter to receiver and is the only useful mode at VHF and above — hence 'line-of-sight'.",
          "Two effects follow from having more than one path. The skip distance is the distance from the transmitter out to where the first sky wave returns to Earth, leaving a 'dead space' of poor reception in between. Fading occurs when a sky wave and a ground wave (or two sky waves) arrive together and alternately reinforce and cancel, a common nuisance on LF/MF at night. Static — electromagnetic noise, largely from thunderstorms — is worst at low frequencies.",
          "The spectrum is divided into bands: VLF, LF, MF, HF, VHF, UHF, SHF and EHF in ascending order. The aeronautical voice work lives mainly in VHF (30–300 MHz as a band), chosen because freedom from static and interference improves markedly above about 30 MHz, giving the clear, reliable short-range communication that controlled flight depends on.",
        ],
      },
    ],
    mustKnow: [
      "Higher frequency → shorter wavelength → shorter antenna.",
      "Ground wave (follows curvature, low freq), sky wave (ionosphere, night, LF/MF/HF), space wave (line-of-sight, VHF+).",
      "Fading = sky and ground wave arriving together; skip distance is to the first sky-wave return.",
      "Static falls away above ~30 MHz, which is why VHF is used for voice.",
    ],
    traps: [
      "Confusing the modulation types — AM varies amplitude, FM varies frequency, pulse switches on/off.",
      "Expecting VHF to propagate by sky wave — VHF is line-of-sight only.",
      "Thinking a higher frequency needs a longer antenna (it is the opposite).",
    ],
  },
  {
    sectionId: "GR2",
    title: "Principles of Radio Operation (VHF & HF)",
    intro:
      "Aviation voice communication uses two very different bands, and knowing how each behaves tells you which to use and how far you can expect to talk. VHF is the everyday workhorse — clear, simple, but strictly line-of-sight — while HF is the long-range reserve for oceanic and remote flying, with its own quirks of day/night propagation and its SELCAL convenience. Both are regulated: the radio and its operator must be licensed.",
    blocks: [
      {
        heading: "1. VHF",
        points: [
          "The aeronautical VHF voice band runs from about 118.0 to 136.975 MHz. Because it propagates only by the direct (space) wave, range is limited to line-of-sight: it depends on the HEIGHTS of both the transmitting and receiving stations and on the transmitter power, not on the time of day. A high-flying aircraft can work a ground station far beyond the reach of a low one.",
          "The line-of-sight range is estimated by range(NM) ≈ 1.23 × (√height1 + √height2), with the heights in feet — so doubling your altitude usefully extends your communication range. Channel spacing is 25 kHz, reduced to 8.33 kHz in the congested upper airspace of some regions to create more usable frequencies.",
          "Operating a transmitting radio is a licensed activity: the aircraft radio installation requires a station licence, and the person operating it must hold the appropriate radio operator's licence or certificate issued by the state of registry. This is examinable because it underpins who may legally transmit.",
        ],
      },
      {
        heading: "2. HF",
        points: [
          "HF relies on sky-wave propagation to reach the very long (oceanic and remote) ranges that VHF cannot, by bouncing signals off the ionosphere. Because the ionosphere changes between day and night, so does the best frequency to use: a LOWER frequency generally works better at night, when the ionosphere is higher and less absorbing, and a higher frequency is needed by day. Choosing the wrong frequency for the time of day is a common cause of poor HF contact.",
          "Monitoring a noisy HF frequency for hours is tiring, so SELCAL (selective calling) lets the ground station send a coded tone that rings only the intended aircraft, allowing the crew to leave the loudspeaker turned down until they are actually called. It is standard for long oceanic and remote-area sectors.",
        ],
      },
    ],
    mustKnow: [
      "VHF is line-of-sight; range grows with height and power; spacing 25 kHz (8.33 kHz upper airspace).",
      "Range(NM) ≈ 1.23 × (√ht1 + √ht2), heights in feet.",
      "HF uses sky wave for long range; a LOWER frequency works better at night.",
      "Both the radio station and the operator must be licensed.",
    ],
    traps: [
      "Expecting VHF communication well beyond line-of-sight.",
      "Using a high HF frequency at night (use a lower one).",
      "Forgetting that the OPERATOR, not just the aircraft, must be licensed.",
    ],
  },
  {
    sectionId: "GR3",
    title: "Airspace & Air Traffic Services",
    intro:
      "Your radio obligations flow directly from the airspace you are in and the service you are receiving, so the airspace classes are not just a Nav topic — they define who you must talk to and what you can expect in return. Knowing the objectives of the air traffic services and the ICAO class system lets you predict the service, the separation and the reporting required on any given flight.",
    blocks: [
      {
        heading: "1. ATS units & the FIR",
        points: [
          "The air traffic services exist to prevent collisions (between aircraft, and between aircraft and obstructions on the manoeuvring area), to expedite and maintain an orderly traffic flow, and to provide advice and information for the safe conduct of flights. The distinct services are air traffic control, flight information, alerting, advisory and aerodrome flight information (AFIS).",
          "A Flight Information Region (FIR) is the basic division of airspace within which a flight information service and an alerting service are provided — so even outside controlled airspace there is a unit watching over you and able to start search-and-rescue if you go missing.",
          "Aerodrome control's specific job is to prevent collisions between aircraft flying in, and operating on, the circuit and manoeuvring area, and between those aircraft and vehicles or obstructions on the manoeuvring area — which is why its instructions on the ground and in the circuit are mandatory.",
        ],
      },
      {
        heading: "2. The ICAO classes A–G",
        points: [
          "Class A is the most restrictive: IFR flights only, all of which are positively separated from one another and given a full control service. There is no VFR in Class A.",
          "The middle classes mix IFR and VFR with differing separation. In Class C, for example, IFR is separated from both IFR and VFR, while VFR is separated from IFR and merely given traffic information about other VFR; Class D reduces this further. Knowing which class gives which separation tells you whether you are being kept apart or must look out for yourself.",
          "Class F provides an air traffic ADVISORY service (advice, not instructions), while Class G is uncontrolled airspace where only a flight information (traffic information) service is available and the pilot is wholly responsible for separation. Danger, restricted and prohibited areas and special rules areas are depicted on the chart and carry their own entry rules.",
        ],
      },
    ],
    mustKnow: [
      "A FIR provides a flight information service and an alerting service.",
      "Class A = IFR only, all separated; Class C = IFR + VFR with the stated separations; Class G = flight information service only.",
      "Aerodrome control protects the circuit and the manoeuvring area.",
    ],
    traps: [
      "Allowing VFR into Class A — it is IFR-only.",
      "Confusing the Class C and Class D separation rules.",
      "Assuming separation is provided in Class G (it is not).",
    ],
  },
  {
    sectionId: "GR4",
    title: "SA Civil Aviation Regulations (Part 91)",
    intro:
      "Part 91 of the South African Civil Aviation Regulations sets the general operating rules that govern when radio is compulsory, how you must comply with clearances and levels, and the visual and ground signals you have to recognise. These are the legal backbone behind the phraseology — the words follow the rules, so knowing the rules keeps your R/T both correct and legal.",
    blocks: [
      {
        heading: "1. Radio & clearances",
        points: [
          "Continuous two-way radio communication is mandatory in controlled and advisory airspace, and the pilot must comply with the rules of the air and with air traffic control clearances. A clearance is an authorisation to proceed under stated conditions, not a command to do something unsafe — if a clearance cannot be complied with, say so.",
          "The VHF emergency frequency is 121.5 MHz, guarded for distress and urgency. The correct altimeter setting must be used for the phase of flight: set QNH before descending below the transition level so that your altitude reads correctly against terrain and other traffic.",
          "Cruising levels in the semicircular system are allocated by MAGNETIC track, not true track — the track direction determines whether you take an odd or even level band. Using true track here is a classic error.",
        ],
      },
      {
        heading: "2. Signals",
        points: [
          "You must be able to recognise the visual signals used when radio is unavailable: the light-gun signals from the tower (steady and flashing green, red and white, each with a distinct meaning on the ground and in the air), the ground signal square markings, and the standard marshalling signals. A two-figure number displayed at the tower indicates the magnetic heading of the runway in use.",
          "Special VFR is a clearance that lets a VFR flight operate within a control zone in conditions below the normal VMC minima: you must remain outside the control zone until the clearance is issued, then comply with ATC instructions and remain clear of cloud and in sight of the surface. It is a concession granted by ATC, not a right.",
        ],
      },
    ],
    mustKnow: [
      "121.5 MHz is the VHF emergency frequency; set QNH before descending below the transition level.",
      "Semicircular cruising levels are allocated by MAGNETIC track.",
      "Special VFR: remain outside the CTR until the clearance is received, then stay clear of cloud.",
    ],
    traps: [
      "Entering a control zone before receiving the Special VFR clearance.",
      "Using true track instead of magnetic track for cruising levels.",
      "Treating a clearance as an order to do something you judge unsafe.",
    ],
  },
  {
    sectionId: "GR5",
    title: "Radiotelephony Phraseology & Procedures",
    intro:
      "This is the core of the subject and the core of safe flying: standard words, standard numbers, correct call signs, the mandatory read-backs, the message categories and the routine procedures for weather, transponder and position. Standard phraseology exists precisely to remove ambiguity when accents, noise and workload are all working against understanding, so precision and discipline here matter more than anywhere else in the licence.",
    blocks: [
      {
        heading: "1. Standard words & numbers",
        points: [
          "Letters are spoken with the phonetic alphabet (Alpha, Bravo, Charlie…) and numbers are passed digit by digit, with 'decimal' — never 'point' — in a frequency. Altitudes are spoken in thousands and hundreds (13 500 ft = 'one three thousand five hundred'), while flight levels are given digit by digit ('flight level one three five'), a distinction examiners test.",
          "Learn the standard procedure words and use them exactly: Affirm (yes), Negative (no, or permission not granted), Wilco (understood and will comply), Roger (I have received all of your last transmission — NOT 'yes'), Confirm (verify), Disregard (treat as not sent), Correction, Break and Break Break (to separate messages), Words Twice (difficult reception), and the difference between Monitor (listen on a frequency) and Contact (establish two-way communication).",
          "The word 'take-off' is reserved: it is used only when issuing or acknowledging a take-off clearance, and at all other times you say 'departure' to avoid a fatal misunderstanding on the runway. A take-off is abandoned with the unambiguous call 'Stop immediately', repeating the aircraft call sign.",
        ],
      },
      {
        heading: "2. Call signs, read-back & message priority",
        points: [
          "A registration call sign may be abbreviated — but only after the ground station does so first — to the first character plus the last two (e.g. ZS-BTA becomes 'Z-TA'); flight-number (airline) call signs are never abbreviated. A solo student prefixes the call with 'Student', and a heavy aircraft adds the suffix 'Heavy' on the initial call to the aerodrome and approach units.",
          "Certain items MUST be read back in full so ATC can confirm you heard them correctly: the SSR (squawk) code, the altimeter setting (QNH), take-off and landing clearances, level instructions, heading instructions and speed instructions. A missed or wrong read-back is how altitude and runway-incursion errors begin.",
          "Messages are handled in a strict order of priority: distress, urgency, direction-finding, flight safety, meteorological, and flight regularity — highest to lowest. This category order is why a MAYDAY instantly takes precedence over routine traffic.",
        ],
      },
      {
        heading: "3. Weather, transponder & Q-codes",
        points: [
          "Routine information is distributed by broadcast to cut frequency congestion: ATIS is a continuously recorded broadcast of aerodrome information updated whenever the data change (and at least every 30 minutes at busy aerodromes); VOLMET is an HF/VHF broadcast of METARs and forecasts for a group of aerodromes; and SIGMET warns of en-route hazardous weather.",
          "Transponder phraseology is standard: 'Squawk 1234' means select that code, 'Squawk standby' means select the standby (non-transmitting) position, and 'Squawk ident' means press the IDENT button to flag your return to the controller. Report your conditions as VMC or IMC when asked.",
          "Know the common Q-codes in R/T use — QDM (magnetic bearing to the station), QNH and QFE altimeter settings — and the use of the Traffic Information Broadcast by Aircraft (TIBA) on 124.8 MHz in designated areas. A radio test call is kept short (no more than about ten seconds) and uses the readability scale 1 (unreadable) to 5 (perfectly readable).",
        ],
      },
    ],
    mustKnow: [
      "'Take-off' is used only for a take-off clearance; 'Stop immediately' abandons one; 'decimal' not 'point'.",
      "Read back: SSR code, QNH, take-off/landing clearance, level, heading, speed.",
      "Message priority: distress > urgency > DF > flight safety > meteorological > flight regularity.",
      "Abbreviate a registration to the first letter + last two — only after ATC does so first.",
    ],
    traps: [
      "Saying 'point' instead of 'decimal' in a frequency.",
      "Using 'take-off' in a routine (non-clearance) call.",
      "Treating 'Roger' as 'yes' — it only means the message was received.",
      "Omitting a mandatory read-back item.",
    ],
  },
  {
    sectionId: "GR6",
    title: "Wake Turbulence",
    intro:
      "Wake turbulence is a small topic with outsized consequences: it drives the separation minima ATC applies and the 'Heavy' suffix you add to your call. Understanding where the vortices come from, when they are strongest, how they move and how to avoid them is both examinable and genuinely life-saving, because an encounter close to the ground can roll a light aircraft beyond its control authority.",
    blocks: [
      {
        heading: "1. Categories & phraseology",
        points: [
          "Aircraft are grouped by maximum certificated take-off mass (MCTOM) into wake categories: Light (below 7000 kg), Medium (7000 to 136 000 kg), Heavy (above 136 000 kg) and Super (e.g. the A380). The category of the aircraft ahead, relative to yours, sets the separation you need behind it.",
          "A Heavy aircraft adds the word 'Heavy' as a suffix to its call sign on the initial call to the aerodrome tower and to approach, so controllers and other crews know to apply and expect greater wake separation. It is a suffix, used on the initial contact — not placed before the call sign and not repeated on every transmission.",
          "Greater separation is always applied behind heavier aircraft, because it is the FOLLOWING aircraft, especially a lighter one, that is endangered by the wake of the aircraft ahead.",
        ],
      },
      {
        heading: "2. The vortices & avoidance",
        points: [
          "Wake turbulence is a pair of counter-rotating vortices trailing from the wingtips, produced whenever a wing generates lift. The vortices are strongest when the generating aircraft is HEAVY, CLEAN (flaps up) and SLOW — that is, at a high angle of attack — which happens just after lift-off and during the approach and landing roll, exactly where a following aircraft is low and vulnerable.",
          "After forming, the vortices sink below the generating aircraft's flight path (typically 500–1000 ft) and drift with the wind. A LIGHT crosswind can be the worst case, because it holds one vortex stationary over the runway while blowing the other clear, instead of carrying both away.",
          "Avoidance follows from the geometry. On departure behind a heavier aircraft, rotate before its rotation point and climb so as to stay ABOVE its flight path and upwind. On the approach, stay AT or ABOVE the heavier aircraft's glide path and land BEYOND its touchdown point. A pilot may accept responsibility and waive the ATC wake separation, but the minima exist because the hazard is a sudden uncommanded roll near the ground.",
        ],
      },
    ],
    mustKnow: [
      "Categories by MCTOM: Light < 7000 kg, Medium 7000–136 000 kg, Heavy > 136 000 kg, plus Super.",
      "'Heavy' is a SUFFIX on the initial call; more separation is applied behind heavier aircraft.",
      "Vortices are worst when the generator is heavy, clean and slow; they sink ~500–1000 ft and drift.",
      "Avoid by staying above the heavier aircraft's path and landing beyond its touchdown point.",
    ],
    traps: [
      "Putting 'Heavy' before the call sign, or repeating it on every transmission.",
      "Assuming a strong wind is worst — a LIGHT crosswind can hold a vortex over the runway.",
      "Landing short of, rather than beyond, the heavier aircraft's touchdown point.",
    ],
  },
  {
    sectionId: "GR7",
    title: "Flight Plans & Search and Rescue",
    intro:
      "A flight plan tells the system where you intend to go, and the search-and-rescue machinery uses it to notice when you fail to arrive. Knowing who files, how and when, and how the SAR phases escalate, means you can both meet your obligations and, if the worst happens, be found quickly. The ATS unit call-sign suffixes round out the picture of who you talk to at each stage of a flight.",
    blocks: [
      {
        heading: "1. Filing & call-sign suffixes",
        points: [
          "A flight plan is submitted to an air traffic services reporting office before departure (or transmitted to the appropriate unit once airborne), unless a repetitive flight plan (RPL) has been arranged for regular flights. The pilot-in-command is responsible for the flight plan and for closing it on arrival.",
          "Item 8 of the plan states the flight rules and type of flight; a solo student or other training flight is classified as general aviation, type 'G'. Accurate completion matters because SAR and ATC act on what the plan says.",
          "ATS units are identified by standard call-sign suffixes that tell you the service: Control (area control), Radar (en-route radar), Approach, Departure (radar departures), Tower (aerodrome control), Ground (surface movement), Delivery (clearance delivery), Apron (apron management) and Information (flight information service / AFIS).",
        ],
      },
      {
        heading: "2. Search and rescue",
        points: [
          "SAR escalates through three emergency phases: INCERFA (the uncertainty phase, when there is doubt about the safety of a flight), ALERFA (the alert phase, when apprehension exists) and DETRESFA (the distress phase, when there is reasonable certainty of grave and imminent danger). After landing, report your arrival promptly to terminate any alerting service and avoid a needless search.",
          "As a survivor, leave the ELT transmitting continuously once activated, and know the ground-to-air visual signal code so rescuers can read your needs (for example, a large 'X' means 'require medical assistance', 'V' means 'require assistance'). These signals and the ELT are what turn a located wreck into a successful rescue.",
        ],
      },
    ],
    mustKnow: [
      "The PIC is responsible for the flight plan; training/solo flights are type 'G'.",
      "SAR phases in order: INCERFA (uncertainty), ALERFA (alert), DETRESFA (distress).",
      "Suffixes: Tower, Ground, Approach, Departure, Radar, Control, Delivery, Apron, Information.",
    ],
    traps: [
      "Confusing the three SAR phases, or inventing a fourth ('EMERFA' is not a phase).",
      "Forgetting to close the flight plan / report arrival, triggering a false search.",
    ],
  },
  {
    sectionId: "GR8",
    title: "Emergency & Urgency Procedures",
    intro:
      "When things go wrong, the radio is your lifeline, and the procedures are deliberately rigid so that a stressed pilot and a busy controller both know exactly what to do. The key distinction is between distress (MAYDAY) and urgency (PAN PAN), and around it sit the rules for imposing radio silence, using VDF for bearings and position, protecting medical transports and acting as a survivor.",
    blocks: [
      {
        heading: "1. Distress & urgency",
        points: [
          "Distress means you are threatened by grave and imminent danger and require immediate assistance; the call is 'MAYDAY' spoken three times at the start of the message. Urgency means you have a condition concerning safety but are not in immediate danger; the call is 'PAN PAN' spoken three times. A sick or injured person on board is an urgency ('PAN PAN'), not a distress, unless the situation becomes grave.",
          "Radio silence to protect the emergency can be imposed by the aircraft in distress itself, or by the station controlling the distress traffic, using 'STOP TRANSMITTING — MAYDAY'. Normal working resumes only when the controlling station transmits 'distress traffic ended'. No ordinary station can impose this silence.",
          "A protected medical transport (under the 1949 Geneva Convention) is identified by the call 'PAN PAN MEDICAL', signalling that the flight is entitled to protection and should not be attacked or interfered with.",
        ],
      },
      {
        heading: "2. VDF, DF & survivor action",
        points: [
          "VHF Direction Finding (VDF) gives you a bearing derived from your ordinary voice transmissions — you simply transmit and the ground equipment measures the direction. Bearings are graded by accuracy: Class A is accurate to ±2°, Class B to ±5° and Class C to ±10°, and the controller tells you the class so you know how much to trust it.",
          "If you come down, the SAR guard frequencies, the ELT (121.5 MHz for homing and 406 MHz for the satellite alert) and the ground-to-air visual code are your means of being found. Remember the five golden rules of a radio emergency, including CONFESS — tell the ATS unit your predicament early and honestly, because help cannot come to a problem no one knows about.",
        ],
      },
    ],
    mustKnow: [
      "MAYDAY ×3 = distress (grave and imminent danger); PAN PAN ×3 = urgency; PAN PAN MEDICAL = protected medical transport.",
      "Silence is imposed only by the aircraft in distress or the controlling station ('STOP TRANSMITTING — MAYDAY'); lifted by 'distress traffic ended'.",
      "VDF bearing classes: A ±2°, B ±5°, C ±10°.",
    ],
    traps: [
      "Using MAYDAY for what is really an urgency (use PAN PAN).",
      "Thinking any station can impose distress silence — only the aircraft in distress or the controlling station can.",
      "Treating a passenger illness as distress rather than urgency.",
    ],
  },
  {
    sectionId: "GR9",
    title: "Radio Communications Failure (RCF)",
    intro:
      "A radio failure is a routine emergency with a set routine: first confirm it really is a failure and try to restore communication, then follow the published procedure for your flight rules and keep transmitting 'blind' so others can still hear your intentions. Squawking 7600 and flying a predictable, published profile is what lets ATC protect the airspace around you when it cannot talk to you.",
    blocks: [
      {
        heading: "1. Fault-finding & blind transmission",
        points: [
          "Before declaring a failure, run the quick checks: correct frequency selected, volume up, squelch set, headset and microphone plugs seated, the station is actually open and you are within range. Try the alternate radio and, if needed, 121.5 MHz — many 'failures' are a mis-set radio or a knocked plug.",
          "If you can transmit but not receive, transmit 'blind' (not expecting a reply) on the frequency in use, prefixed 'transmitting blind due to receiver failure', passing your position and intentions so ATC and other traffic can plan around you. Beware the opposite fault: a stuck transmit button transmits continuously and jams the frequency for everyone, so monitor your sidetone and release/replace the switch if you suspect it.",
        ],
      },
      {
        heading: "2. VFR & IFR procedures",
        points: [
          "A VFR flight in visual conditions continues in VMC, lands at the nearest suitable aerodrome, and reports its arrival to ATC by the quickest means. The transponder is set to 7600 to flag the communications failure to radar controllers.",
          "An IFR flight in instrument conditions continues according to the current flight plan to the destination navaid and commences the approach at or close to the flight-plan ETA (or the last acknowledged expected approach time), planning to land within about 30 minutes of that time. South African CAR 2011 follows ICAO closely, differing mainly in the detail of the holding and approach times, so study the SA figures for the exam.",
        ],
      },
    ],
    mustKnow: [
      "Squawk 7600 for a communications failure; transmit blind on the frequency in use.",
      "VFR in VMC: continue in VMC, land at the NEAREST SUITABLE aerodrome, report arrival.",
      "IFR in IMC: continue per the flight plan and commence the approach at the ETA / last acknowledged EAT.",
      "A stuck transmit button jams the whole frequency.",
    ],
    traps: [
      "Forgetting to squawk 7600.",
      "Pressing on to the planned destination in VMC when the rule is to land at the nearest suitable aerodrome.",
      "Overlooking a stuck microphone switch as the cause of a 'failure'.",
    ],
  },
];

export function getGRNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  const full = GR_FULL[sectionId];
  const old = GR_NOTES.find((n) => n.sectionId === sectionId);
  if (!full) return old;
  const cpl = full.pick ? pickPplNote(sectionId, full.title, full.pick) : undefined;
  return {
    sectionId,
    title: full.title,
    intro: full.intro,
    blocks: [...full.blocks, ...(cpl?.blocks ?? []), ...(full.blocks.length ? [] : old?.blocks ?? [])],
    mustKnow: [...full.mustKnow, ...(cpl?.mustKnow ?? [])],
    traps: [...full.traps, ...(cpl?.traps ?? [])],
  };
}
