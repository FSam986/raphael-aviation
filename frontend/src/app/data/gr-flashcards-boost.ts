// General Radiotelephony (GR1–GR9) flashcard reinforcement — mined from
// "The Pilot's Radio Handbook" (Lempp, Ed. 21) and the SA AIP/CARs. These carry
// the substance of each topic for rapid recall; merged into GR_FLASHCARDS.

import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

const f = (id: string, sectionId: string, front: string, back: string, difficulty: "easy" | "medium" | "hard"): AirLawFlashcard =>
  ({ id, sectionId, front, back, difficulty });

export const GR_FLASHCARDS_BOOST: AirLawFlashcard[] = [
  // ── GR1 Basic Radio Theory ──
  f("GFC-GR1-11", "GR1", "Speed & the wavelength formula", "All radio waves travel at 3 × 10⁸ m/s. λ(m) = 300 ÷ f(MHz) = 300000 ÷ f(kHz). Frequency and wavelength are inversely proportional.", "medium"),
  f("GFC-GR1-12", "GR1", "Frequency bands", "LF 30–300 kHz · MF 300 kHz–3 MHz · HF 3–30 MHz · VHF 30–300 MHz · UHF 300 MHz–3 GHz. 1 MHz = 1000 kHz = 10⁶ Hz.", "medium"),
  f("GFC-GR1-13", "GR1", "Aeronautical VHF COM band & modulation", "118.0–136.975 MHz, amplitude modulation (A3E). Line-of-sight (space wave); largely static-free.", "medium"),
  f("GFC-GR1-14", "GR1", "Why HF for oceanic?", "HF sky waves refract off the ionosphere → beyond-horizon range. Use ~half the day frequency at night (less ionisation).", "medium"),
  f("GFC-GR1-15", "GR1", "VHF range factors", "Line-of-sight only → range grows with the height of transmitter AND receiver, not really with power. Approx range(NM) ≈ 1.25(√hₜ + √hᵣ) in ft.", "hard"),
  f("GFC-GR1-16", "GR1", "Static vs frequency", "Static/atmospheric interference is worst at LOW frequency and falls as frequency rises — VHF is essentially static-free.", "medium"),
  f("GFC-GR1-17", "GR1", "Wave components & polarisation", "Electric and magnetic fields at right angles to each other and to travel. Polarisation = plane of the ELECTRIC field. VHF whip = vertical.", "medium"),
  f("GFC-GR1-18", "GR1", "Morse identification", "NDB/VOR/ILS ident in Morse — 2–3 letter group. Listen to confirm the correct, serviceable station is tuned.", "easy"),
  f("GFC-GR1-19", "GR1", "Worked λ examples", "120 MHz → 2.5 m · 100 MHz → 3 m · 300 kHz → 1000 m · 75 MHz → 4 m · 30 MHz → 10 m.", "hard"),
  f("GFC-GR1-20", "GR1", "Diffraction & propagation summary", "Long wavelengths (LF) diffract/bend around terrain & follow the surface (ground wave). Short wavelengths (VHF+) go line-of-sight.", "medium"),
  // ── GR2 Principles of Radio Operation ──
  f("GFC-GR2-11", "GR2", "Squelch", "Mutes background hiss until a signal breaks through. Too tight → miss weak calls; too loose → constant noise.", "easy"),
  f("GFC-GR2-12", "GR2", "Simplex operation", "One frequency, transmit OR receive (not both). Only one station transmits at a time — LISTEN before you transmit.", "medium"),
  f("GFC-GR2-13", "GR2", "Stuck microphone", "A jammed PTT keeps transmitting, blocking the whole frequency and stopping your reception — release/cycle it or switch that TX off.", "medium"),
  f("GFC-GR2-14", "GR2", "Readability scale 1–5", "1 unreadable · 2 readable now & then · 3 readable but with difficulty · 4 readable · 5 perfectly readable.", "medium"),
  f("GFC-GR2-15", "GR2", "Radio-check order", "(Station called) + (own call sign) + 'radio check' + (frequency). Reply gives readability 1–5.", "medium"),
  f("GFC-GR2-16", "GR2", "Transceiver & avionics master", "Transceiver = combined TX+RX. Switch avionics master OFF for engine start/stop to protect the radios.", "medium"),
  f("GFC-GR2-17", "GR2", "Key procedure words", "OVER = reply expected · OUT = no reply (never 'over and out') · SAY AGAIN = repeat · STANDBY = wait, I'll call · MONITOR = listen, don't call.", "medium"),
  f("GFC-GR2-18", "GR2", "More procedure words", "ROGER = received (NOT 'yes') · WILCO = will comply · AFFIRM/NEGATIVE = yes/no · CORRECTION = error, here's the fix · DISREGARD = ignore that.", "medium"),
  f("GFC-GR2-19", "GR2", "Good RTF technique", "Listen first, be brief & clear, use standard phraseology, read back clearances & safety items (level, heading, squawk, runway, QNH).", "easy"),
  f("GFC-GR2-20", "GR2", "Channel spacing", "25 kHz standard; 8.33 kHz where congested. AM's gentle capture lets a controller sometimes detect two overlapping calls.", "medium"),
  // ── GR3 Airspace ──
  f("GFC-GR3-11", "GR3", "SA FIRs & FICs", "FIRs surface→FL650 (sectors to FL460). Three FIRs (two Johannesburg + Cape Town); two FICs: Johannesburg & Cape Town.", "medium"),
  f("GFC-GR3-12", "GR3", "Classes used in SA", "7 ICAO classes A–G, but SA uses only A, C, D, F, G — NO Class B, NO Class E. Controlled = A–D; uncontrolled = F, G.", "medium"),
  f("GFC-GR3-13", "GR3", "Class A", "IFR ONLY (VFR not permitted). All traffic separated. Used e.g. RNAV routes, Cape Town CTA A (FL145–195).", "medium"),
  f("GFC-GR3-14", "GR3", "Class C (SA's main controlled airspace)", "IFR & VFR both controlled. IFR separated from all. VFR separated from IFR + given info on other VFR. All SA CTRs & TMAs are Class C.", "hard"),
  f("GFC-GR3-15", "GR3", "Class D / F / G", "D = IFR sep from IFR + info on VFR; VFR info only (only Grand Central ATZ). F = advisory (IFR advisory, VFR info). G = information/FIS, all above FL460.", "hard"),
  f("GFC-GR3-16", "GR3", "ATZ", "≥5 NM radius, ground to ~1000–1500 ft AGL. Class C/D/G. AFIS ⇒ Class G; TOWER ⇒ controlled (C/D). Dotted line on chart.", "medium"),
  f("GFC-GR3-17", "GR3", "CTR vs TMA vs CTA", "CTR = surface up (all SA CTRs Class C, dashed line). TMA/CTA = from ≥700 ft AGL up (Class C, solid line). CTA sits above TMAs.", "hard"),
  f("GFC-GR3-18", "GR3", "'Wedding-cake' TMA", "TMA A/B/C = one TMA with stepped (lower outward) bases to protect terrain & lower VFR near the centre.", "hard"),
  f("GFC-GR3-19", "GR3", "Airways letters", "A/B/G/R = regional network · H/J/V/W = connect cities · prefix U = Upper (spoken 'Upper'). Info Routes suffix F = Class G counterpart.", "hard"),
  f("GFC-GR3-20", "GR3", "RNAV routes", "L/M/N/P regional; Q/T/Y/Z not. Require RNP4 (within 4 NM of centreline 95% of the time). Class A → IFR only.", "hard"),
  f("GFC-GR3-21", "GR3", "Prohibited / Restricted / Danger", "FAP Prohibited = never enter. FAR Restricted = enter with (military) permission, Class G. FAD Danger = may enter but vigilant (GFAs/ranges), Class G.", "medium"),
  f("GFC-GR3-22", "GR3", "SRA & ATA", "SRA = uncontrolled (Class G) airspace below busy TMAs with special VFR rules/routes. Old ATA = now ATZ Class G.", "hard"),
  f("GFC-GR3-23", "GR3", "ATS objectives", "Prevent collisions · maintain orderly flow · give advice/info · notify SAR (alerting service). Civil ATS by ATNS; military by Air Force; AFIS by aerodrome owner.", "medium"),
  f("GFC-GR3-24", "GR3", "Chart line types", "TMA = solid shaded · CTR = dashed · ATZ = dotted. 'AFIS' on the chart = the ATZ is Class G.", "medium"),
  f("GFC-GR3-25", "GR3", "Speed limits", "Within CTR/ATZ: piston ≤160 kt, turbine ≤200 kt. Outside controlled airspace below FL100: 250 kt.", "hard"),
  // ── GR4 Rules of the Air (Part 91) ──
  f("GFC-GR4-11", "GR4", "Units of measurement", "Alt/height/elevation & cloud = ft · nav distance = NM · runway/vis/RVR = m · speed & wind = kt · vertical speed = fpm · pressure = hPa · temp = °C · weight = kg/t.", "hard"),
  f("GFC-GR4-12", "GR4", "Wind reference", "Surface wind (tower) = degrees MAGNETIC. All other winds (forecast/aloft) = degrees TRUE. Trap!", "medium"),
  f("GFC-GR4-13", "GR4", "QNH / QFE / QNE", "QNH → altitude AMSL (elevation on ground). QFE → height above aerodrome (zero on ground). QNE → standard 1013.2 hPa (flight levels).", "medium"),
  f("GFC-GR4-14", "GR4", "Transition altitude / level / layer", "Below transition altitude: QNH, report altitude. At/above transition level: 1013.2, report flight level. Transition layer between them.", "hard"),
  f("GFC-GR4-15", "GR4", "Semi-circular / VFR cruising rule", "By MAGNETIC TRACK: 000–179° → ODD thousands (+500 ft VFR); 180–359° → EVEN thousands (+500 ft VFR). IFR omits the +500 ft.", "hard"),
  f("GFC-GR4-16", "GR4", "Pressure-error rule", "'High to low, look out below' — flying to lower pressure without resetting, the altimeter OVER-reads → you're lower than indicated. QNH<1013 on standard set → lower than shown.", "hard"),
  f("GFC-GR4-17", "GR4", "Special VFR", "ATC clearance to operate in a CTR when weather is below VMC; remain clear of cloud, comply with ATC.", "medium"),
  // ── GR5 Phraseology & Procedures ──
  f("GFC-GR5-11", "GR5", "Phonetic alphabet A–M", "Alpha Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliet Kilo Lima Mike.", "medium"),
  f("GFC-GR5-12", "GR5", "Phonetic alphabet N–Z", "November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu.", "medium"),
  f("GFC-GR5-13", "GR5", "Numeral pronunciation", "0 zero · 3 tree · 4 fower · 5 fife · 7 seven · 8 ait · 9 niner · decimal = 'decimal'.", "medium"),
  f("GFC-GR5-14", "GR5", "Hundreds/thousands rule", "Whole hundreds/thousands use 'hundred'/'thousand' (FL200='two hundred', 2500 ft='two thousand five hundred'). Non-round & FL120/headings/squawks/QNH = individual digits.", "hard"),
  f("GFC-GR5-15", "GR5", "Tricky number cases", "FL120='wun too zero' · squawk 2000='too tousand' but 2500='too fife zero zero' · vis 850 m='ait fife zero' · clock 10/11/12 spoken TEN/ELEVEN/TWELVE.", "hard"),
  f("GFC-GR5-16", "GR5", "Time", "UTC (Zulu), 24-hour clock. SAST (Bravo) = UTC+2. Minutes-only when unambiguous. Longitude 15°/hr.", "medium"),
  f("GFC-GR5-17", "GR5", "Q-codes I", "QDM = mag heading TO (nil wind) · QDR = mag bearing FROM · QTE = true bearing FROM · QUJ = true track TO. QDR = reciprocal of QDM.", "hard"),
  f("GFC-GR5-18", "GR5", "Q-codes II", "QNH/QFE/QNE pressures · QFU = mag runway orientation · QGE = distance from station · QTF = position from bearings · QSY = change frequency · QBI = IFR compulsory.", "hard"),
  f("GFC-GR5-19", "GR5", "Ground station call signs", "DELIVERY (IFR clearance) · GROUND (taxiways) · APRON (bays) · TOWER (CTR/ATZ/runway) · APPROACH (TMA) · ARRIVAL/DIRECTOR (vectors to ILS) · AREA/CONTROL (CTA/FIR) · RADIO (AFIS, Class G) · INFORMATION (FIS uncontrolled).", "hard"),
  f("GFC-GR5-20", "GR5", "Call-sign abbreviation", "Full on first contact. SA usage: last 3 chars (ZS-BCV→BCV). ICAO: 1st nationality char + last 2 (ZS-BCV→ZCV). Operator+flight number: NEVER abbreviated. Only abbreviate after ATC does.", "hard"),
  f("GFC-GR5-21", "GR5", "Prefixes/suffixes", "Heavy · Super (A380) · Mercy (medical, absolute priority) · Halo (medical, accepts ≤10 min delay) · Student / Solo Student · Helicopter · Glider · RPAS (drone). Subsequent emergency calls suffix Mayday/Pan.", "hard"),
  f("GFC-GR5-22", "GR5", "Message priority order", "1 Distress (MAYDAY) · 2 Urgency (PAN PAN) · 3 Direction-finding · 4 Flight safety · 5 Meteorological · 6 Flight regularity.", "medium"),
  f("GFC-GR5-23", "GR5", "Ground signals (signals square)", "White/yellow cross = unsafe area · large X = landing prohibited · L-shapes = circuit direction · white dumbbell = runways/taxiways only · dumbbell+black bars = TO/land runways only, taxi anywhere · double white cross = gliders · black A = agricultural · black C on yellow = report here (fees).", "hard"),
  f("GFC-GR5-24", "GR5", "Light-gun signals (air / ground)", "Steady green: land / cleared take-off · Steady red: give way & circle / stop · Green flashes: return to land / cleared taxi · Red flashes: aerodrome unsafe / taxi clear · White flashes: land & go to apron / return to start · Red pyro (air): do not land yet.", "hard"),
  f("GFC-GR5-25", "GR5", "Acknowledging light signals", "In flight: day = rock wings, night = flash lights twice. On ground: day = move ailerons/rudder, night = flash lights twice.", "hard"),
  f("GFC-GR5-26", "GR5", "Aircraft lights sequence", "Beacon before start · nav before pushback · taxi lights when taxiing · strobes entering runway · landing light for take-off · all ON crossing a runway.", "hard"),
  f("GFC-GR5-27", "GR5", "'Take-off' & 'cleared'", "'Take-off' ONLY for a take-off clearance (else 'departure'). 'Cleared' reserved for take-off, landing & route/airways clearances.", "medium"),
  f("GFC-GR5-28", "GR5", "Position report", "(Call sign) position, time, level, next point + estimate. 'Estimating [point] at [time]'.", "medium"),
  // ── GR6 Wake Turbulence ──
  f("GFC-GR6-11", "GR6", "Origin & category basis", "Wingtip vortices from the upper/lower pressure difference. Category by MAX take-off mass: L / M / H / J(Super).", "medium"),
  f("GFC-GR6-12", "GR6", "Strongest vortices", "Heavy + Clean + Slow (high angle of attack). Strength ∝ weight, inversely ∝ speed & span. Only while producing lift.", "medium"),
  f("GFC-GR6-13", "GR6", "Behaviour", "Counter-rotating pair; sink 500–1000 ft below the path and drift downwind. A light crosswind can hold one over the runway.", "hard"),
  f("GFC-GR6-14", "GR6", "Avoidance — landing/departing", "Land: stay above the heavy's path, touch down BEYOND its touchdown point. Depart: rotate BEFORE its rotation point, climb above/upwind.", "hard"),
  f("GFC-GR6-15", "GR6", "Separation logic", "The lighter the follower behind a heavy/super, the GREATER the separation. Helicopter downwash in hover/taxi is also a hazard.", "medium"),
  // ── GR7 Flight Plans & SAR ──
  f("GFC-GR7-11", "GR7", "Key flight-plan items", "7 aircraft ID · 8 flight rules (I/V/Y/Z) · 9 number/type/wake · 10 equipment (S=VHF+VOR+ILS; C=Mode A+C) · 13 departure+time · 15 speed/level/route · 16 destination/EET/alternate · 18 other · 19 endurance/POB/emergency.", "hard"),
  f("GFC-GR7-12", "GR7", "Item 15 codes", "Speed: N=kt, K=km/h, M=Mach. Level: F=flight level, A=altitude (hundreds ft). e.g. N0140 F095.", "hard"),
  f("GFC-GR7-13", "GR7", "Item 19 letters", "E/ endurance (HH:MM) · P/ persons on board · R/ emergency radio (U/V/E) · S/ survival · J/ jackets · D/ dinghies · A/ colour · C/ PIC.", "hard"),
  f("GFC-GR7-14", "GR7", "SAR phases", "INCERFA (uncertainty) → ALERFA (alert) → DETRESFA (distress, SAR launched). Alerting service triggered by overdue/emergency.", "medium"),
  f("GFC-GR7-15", "GR7", "Close the flight plan!", "Close on arrival (radio/phone) or an overdue aircraft triggers the alerting service & needless SAR.", "medium"),
  f("GFC-GR7-16", "GR7", "Emergency frequencies & ELT", "VHF distress 121.5 MHz. ELT: 121.5/243 MHz analogue + 406 MHz digital (satellite-detected with position & identity).", "medium"),
  f("GFC-GR7-17", "GR7", "Golden rules in an emergency", "Aviate → Navigate → Communicate. Fly the aircraft first.", "easy"),
  // ── GR8 Emergency & Urgency ──
  f("GFC-GR8-11", "GR8", "Distress vs urgency", "Distress = grave & imminent danger → MAYDAY ×3, immediate help. Urgency = a safety concern, no immediate danger → PAN PAN ×3.", "medium"),
  f("GFC-GR8-12", "GR8", "Distress message content", "(Station) aircraft ID · nature of emergency · intentions · position/level · POB (heading/IAS as able). Frequency in use or 121.5.", "medium"),
  f("GFC-GR8-13", "GR8", "Squawk codes", "7500 hijack/unlawful interference · 7600 comms failure · 7700 general emergency · 7000 VFR conspicuity.", "medium"),
  f("GFC-GR8-14", "GR8", "Silence & cancellation", "Impose silence: 'STOP TRANSMITTING — MAYDAY'. End: 'DISTRESS TRAFFIC ENDED'. Relay another's distress: 'MAYDAY RELAY'.", "hard"),
  f("GFC-GR8-15", "GR8", "SECURITE", "Safety messages (navigation warnings / met warnings) are prefixed 'SECURITE'. Priority order: Distress > Urgency > … .", "medium"),
  // ── GR9 Radio Communications Failure ──
  f("GFC-GR9-11", "GR9", "First actions", "Fault-find: volume, squelch, frequency, audio-panel selection, headset/PTT. Many 'failures' are one of these. Then squawk 7600.", "medium"),
  f("GFC-GR9-12", "GR9", "VFR failure", "Continue in VMC with a good lookout, make blind calls, land at the nearest suitable aerodrome, watch for light-gun signals, report arrival. Squawk 7600.", "medium"),
  f("GFC-GR9-13", "GR9", "IFR failure in IMC", "Continue per the last clearance / flight plan and the published lost-comms procedure; commence approach near the flight-plan/last EAT.", "hard"),
  f("GFC-GR9-14", "GR9", "Transmit blind / stuck mic", "Receiver dead but TX works → prefix 'transmitting blind' and broadcast intentions. Stuck PTT blocks the frequency — release/cycle or switch that TX off.", "medium"),
  f("GFC-GR9-15", "GR9", "Light-gun signals recap", "In flight: steady green = land; red flashes = don't land. Ground: steady green = take-off; red = stop; green flashes = taxi. Watch for these when NORDO.", "hard"),
];
