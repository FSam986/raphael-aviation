// ============================================================================
// SACAA CPL — RADIO AIDS: FULL STUDY TEXT (A.10.7 – A.10.12)
// Aligned to Appendix 2.0A to SA-CATS 61, subject A.10. Original wording.
// ============================================================================

import type { AirLawSectionNote } from "./airlaw-notes";

export const RADIONAV_NOTES_FULL_B: AirLawSectionNote[] = [
  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.10.7",
    title: "Secondary Surveillance Radar (SSR)",
    intro:
      "SSR lets ATC see each aircraft's identity and pressure altitude by interrogating its transponder. This section covers the principle (interrogation on 1 030 MHz, reply on 1 090 MHz), presentation on the controller's display, the modes (A, C and S) and codes — including the special codes every pilot must know — and the problems of garbling and FRUIT.",
    blocks: [
      {
        heading: "Principles — interrogation and reply",
        figureTopics: ["SSR — interrogation and reply", "SSR"],
        points: [
          "The ground interrogator (antenna usually mounted on top of the primary radar antenna, rotating with it) transmits on 1 030 MHz. The aircraft transponder replies on 1 090 MHz. Different frequencies mean the reply can't be confused with ground clutter or weather.",
          "Because each direction is a one-way path, the power needed is far less than primary radar, and the range is set by line of sight (~200–250 nm).",
          "Range is measured from the reply time (minus the transponder's fixed delay of about 3 µs); bearing from the antenna's direction.",
          "§ The interrogation pulses",
          "The interrogation is a pair of pulses P1 and P3; their SPACING tells the transponder which mode is asked: Mode A — 8 µs; Mode C — 21 µs. (Military Mode 1 3 µs, Mode 2 5 µs; Mode B 17 µs, Mode D 25 µs are not used.)",
          "Side-lobe suppression: a control pulse P2, 2 µs after P1, is radiated omnidirectionally. In the main beam P1 is stronger than P2 → the transponder replies. In a side lobe P2 is stronger → it suppresses the reply. This stops aircraft being displayed at the wrong bearing (ring-around close to the radar).",
          "§ The reply",
          "Framing pulses F1 and F2, 20.3 µs apart, with up to 12 information pulses between them (four groups A, B, C, D of three pulses each — each group an octal digit 0–7). 4 octal digits → 8⁴ = 4 096 codes (0000–7777).",
          "SPI (special position identification) pulse: transmitted 4.35 µs after F2 for about 15–20 seconds when the pilot presses IDENT — makes the return highlight on the controller's screen.",
        ],
      },
      {
        heading: "Modes and codes",
        points: [
          "§ Mode A — identity",
          "Replies with the 4-digit code the pilot has set (assigned by ATC). Allows the controller to identify the aircraft and (with code–callsign correlation) display its callsign.",
          "§ Mode C — altitude",
          "Replies with the aircraft's PRESSURE altitude, encoded in 100 ft increments, always referenced to 1013.25 hPa from an encoding altimeter or air-data computer — whatever the pilot has set on the altimeter subscale. The ground system converts to altitude on the local QNH for display below the transition level. Tolerance: if the displayed level differs from the pilot-reported or assigned level by more than ±300 ft, the Mode C information is treated as unverified.",
          "Transponder switch: OFF, STBY (warm, no replies), ON (Mode A only), ALT (Modes A and C — normal), TEST, and IDENT button.",
          "§ Special codes",
          "7500 — unlawful interference (hijack). 7600 — radio (communications) failure. 7700 — emergency. ('75 taken alive, 76 radio fix, 77 going to heaven'.) 2000 — when entering an SSR area from airspace where no code was assigned (ICAO). VFR codes are as published in the AIP / assigned by ATC.",
          "When changing codes, avoid passing through 7500/7600/7700 (e.g. go to STBY first in older units, or select digits in an order that doesn't pass the emergency codes).",
          "§ Mode S — selective",
          "Each aircraft has a unique permanent 24-bit address (≈ 16.7 million addresses), assigned by the state of registry. The ground station interrogates aircraft INDIVIDUALLY (selective/'roll-call'), after first acquiring them with an 'all-call'. It carries Mode A and C information plus data link.",
          "Elementary surveillance (ELS): aircraft address, flight identity (callsign), altitude in 25 ft increments (where available), transponder capability. Enhanced surveillance (EHS): plus downlinked aircraft parameters — selected altitude, heading, IAS/Mach, ground and track speed, roll angle, vertical rate.",
          "Benefits: no garbling (aircraft replied to one at a time), fewer FRUIT, more accurate altitude, the basis for TCAS II and ADS-B (extended squitter on 1 090 MHz).",
          "Mode S transponders still reply to Mode A/C interrogations.",
        ],
      },
      {
        heading: "Presentation, interpretation and limitations",
        points: [
          "On the controller's display the SSR return is shown as a symbol with a data block: callsign (or Mode A code), Mode C level (e.g. '085' = 8 500 ft/FL085) with a climb/descent arrow, and often groundspeed. Combined with primary radar it gives a complete picture; SSR-only targets appear even when the primary echo is weak.",
          "Advantages over primary radar: identity, altitude, much greater range for a given power, no weather or ground clutter, works for small aircraft with poor radar reflectivity.",
          "Disadvantages: needs a working transponder (non-equipped or failed aircraft are invisible), no weather information.",
          "§ Garbling",
          "When two aircraft are close in range and bearing (within about 1.7 nm in slant range on the same bearing), their replies overlap and the decoder can't separate the pulse trains — wrong codes/levels displayed. Mode S eliminates this.",
          "§ FRUIT",
          "False Replies Unsynchronised In Time: replies triggered by OTHER ground stations' interrogations that are received by this station. Removed by 'defruiting' (comparing successive sweeps — FRUIT appears at random ranges).",
          "§ Other",
          "Reflections from buildings can produce false targets; overhead (above the antenna) there is a cone of silence; transponder antenna shielding in steep turns can cause dropouts.",
        ],
      },
    ],
    mustKnow: [
      "Interrogation 1 030 MHz; reply 1 090 MHz.",
      "Mode A identity (4 096 codes, octal 0000–7777); Mode C pressure altitude (1013.25) in 100 ft steps.",
      "P1–P3: Mode A 8 µs, Mode C 21 µs; P2 = side-lobe suppression.",
      "7500 hijack, 7600 radio failure, 7700 emergency; 2000 entering an SSR area without an assigned code.",
      "IDENT → SPI pulse ~15–20 s.",
      "Mode S: 24-bit address, selective interrogation, data link, ELS/EHS; no garbling; basis for TCAS/ADS-B.",
      "Garbling = overlapping replies; FRUIT = replies to other interrogators.",
    ],
    traps: [
      "Thinking Mode C sends altitude on the pilot's QNH — it is always 1013.25.",
      "Swapping the frequencies — ground TRANSMITS 1 030, aircraft replies 1 090.",
      "Selecting STBY in flight removes BOTH identity and altitude.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.10.8",
    title: "Airborne Weather Radar",
    intro:
      "Airborne weather radar (AWR) detects precipitation ahead so the crew can avoid thunderstorms, and can map the ground. This section covers the principle and frequency choice, the beams and tilt control, the display and its colours, how to interpret returns (and what radar does NOT show), coverage and range, and the operating precautions.",
    blocks: [
      {
        heading: "Principles — frequency, beams and tilt",
        figureTopics: ["Weather radar tilt", "Weather radar"],
        points: [
          "Primary pulse radar in the SHF band: usually X-band, 9.375 GHz (λ ≈ 3.2 cm); some use C-band (≈ 5.4 GHz, λ ≈ 5.5 cm).",
          "Why ~3 cm: the wavelength is short enough to be reflected well by water DROPLETS of rain size, and to give a narrow beam from a small nose-mounted antenna — but long enough not to be reflected by cloud droplets (radar sees PRECIPITATION, not cloud). C-band suffers less attenuation (better penetration through heavy rain to see what's behind) but needs a larger antenna for the same beam width.",
          "§ Beams",
          "Weather mode: a narrow conical PENCIL beam (≈ 3–5° wide) from a parabolic dish or flat slotted array — concentrates energy to see distant storms with good definition.",
          "Mapping mode: a FAN-shaped (cosecant-squared) beam, broad in the vertical, to illuminate a wide band of ground evenly from near to far — coastlines, lakes and cities show up for navigation.",
          "§ Tilt",
          "The antenna is stabilised against pitch and roll by attitude reference inputs, and can be TILTED up or down (≈ ±15°). Tilt controls which part of the storm is scanned. Too low → ground returns dominate; too high → the beam passes over the storm's reflective core.",
          "Rule: the beam spreads with distance — at 60 nm a 4° beam is about 4 nm (≈ 24 000 ft) deep. Height of the beam centre above the aircraft ≈ range (nm) × tilt (°) × 100 ft (1-in-60).",
          "The most reflective part of a Cb is typically at mid levels (the 'wet' zone just below the freezing level); dry ice crystals and snow at the top reflect poorly.",
        ],
      },
      {
        heading: "Presentation and interpretation",
        points: [
          "The display shows a sector (≈ ±60–90° ahead) with range arcs. Returns are colour-coded by reflectivity (rainfall rate): BLACK — none; GREEN — light; YELLOW — moderate; RED — heavy; MAGENTA — very heavy/extreme (on modern units; older units show red as the highest and 'contour' or isoecho a black hole in the middle of a red area).",
          "Contouring / isoecho (monochrome sets): the most intense areas are shown as black holes within bright surrounds — a steep gradient (colours close together) indicates turbulence.",
          "Dangerous shapes: hooks, fingers, scalloped edges, U-shapes and rapidly changing shapes — associated with severe turbulence, hail and tornadoes. Steep reflectivity gradients (green to red over a short distance) also indicate severe turbulence.",
          "Turbulence (Doppler) mode on some radars shows magenta where the spread of droplet velocities indicates turbulence — only in precipitation, and usually within ~40 nm.",
          "§ What radar does NOT show",
          "Clear-air turbulence, dry (non-precipitating) turbulence, wind shear without precipitation, cloud without precipitation, dry hail and dry snow (weak echoes) — so a 'clear' display does not guarantee smooth air.",
          "Wet hail and large raindrops are the strongest reflectors; wet snow and melting ice at the freezing level (the 'bright band') also reflect strongly.",
          "§ Shadow and attenuation",
          "Heavy rain absorbs the energy (more so at X-band than C-band), so a storm can hide another storm behind it, and the far side of a cell looks weaker than it is — a 'radar shadow'. A black area behind a strong cell with no ground returns (in mapping/low tilt) indicates attenuation, not clear air.",
        ],
      },
      {
        heading: "Coverage, range and operating precautions",
        points: [
          "Range: selectable scales typically 10–320 nm. Useful weather detection for thunderstorms is commonly 100–200 nm, limited by power, beam spreading and attenuation.",
          "Range of detection decreases with heavy intervening rain (attenuation) and for weak reflectors.",
          "§ Avoidance guidance (typical operator/ICAO guidance)",
          "Avoid severe-looking echoes by at least 20 nm (more at high levels, and on the downwind side, where hail and turbulence extend under the anvil); avoid flying between cells less than about 40 nm apart; don't fly under the anvil; plan deviations early (by 40–80 nm); use the tilt to examine the whole storm.",
          "§ Ground safety",
          "The radar emits strong microwave energy. Do not operate on the ground near people (a safety radius, typically several metres — per AFM), near fuelling operations or in hangars; use STANDBY/TEST on the ground; some units inhibit transmission with weight on wheels.",
          "§ Ground mapping",
          "With mapping mode and down-tilt, water appears dark (it reflects energy away — 'specular'), land shows moderate returns, cities/mountains strong returns — so coastlines and lakes give navigation fixes.",
        ],
      },
    ],
    mustKnow: [
      "X-band 9.375 GHz (λ ≈ 3.2 cm); C-band ≈ 5.4 GHz penetrates rain better.",
      "Detects precipitation, not cloud. Weather mode pencil beam; mapping mode fan (cosec²) beam.",
      "Tilt: beam height ≈ range × tilt × 100 ft; most reflective zone near/below the freezing level.",
      "Colours: green light → yellow → red → magenta. Steep gradients, hooks, fingers, scalloped edges = severe.",
      "Doesn't show CAT, dry hail/snow, dry turbulence. Attenuation can hide cells behind cells.",
      "Avoid strong echoes by ≥ 20 nm; don't operate near people or refuelling on the ground.",
    ],
    traps: [
      "A clear radar screen doesn't mean no turbulence.",
      "Dry hail is a POOR reflector; wet hail is strong.",
      "Water shows dark in mapping mode.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.10.9",
    title: "Radio Altimeter",
    intro:
      "The radio (radar) altimeter measures the aircraft's height above the surface directly below, by timing a signal reflected from the ground. It is the basis of decision heights on precision approaches, autoland flare and GPWS. This section covers the principle (frequency-modulated continuous wave), the frequency band, presentation and interpretation, and errors and accuracy.",
    blocks: [
      {
        heading: "Principle and frequency band",
        figureTopics: ["Radio Altimeter (FM-CW)", "Radio altimeter FM-CW principle", "Radio altimeter principle"],
        points: [
          "Frequency band: SHF, 4.2–4.4 GHz (λ ≈ 7 cm).",
          "Principle: frequency-modulated continuous wave (FMCW). The transmitter sends a continuous wave whose frequency is swept up and down (e.g. 4.25–4.35 GHz) at a fixed rate. By the time the reflected wave returns from the ground, the transmitter frequency has changed. The DIFFERENCE between the transmitted and received frequencies is proportional to the time taken, and therefore to height.",
          "Height = (frequency difference ÷ sweep rate) × c ÷ 2.",
          "Separate transmit and receive antennas on the underside of the fuselage, each with a wide beam (≈ 40–60°) so the ground is seen even when the aircraft is pitched or banked.",
          "Pulsed radio altimeters exist but FMCW is standard in civil aircraft because it measures very small heights accurately (no minimum-range limit of a pulse system).",
          "Operating range: 0 to 2 500 ft (some to 5 000 ft) above the surface.",
        ],
      },
      {
        heading: "Presentation and interpretation",
        figureTopics: ["Radio altimeter dial", "Radio altitude on the PFD", "Radio-altitude arc on EFIS", "Radio altitude on the EADI (autoland)"],
        points: [
          "Displayed on a dedicated dial or digitally on the PFD (often appearing below 2 500 ft), with a decision height (DH) bug: an aural/visual alert ('MINIMUMS') is given when the aircraft descends through the selected DH.",
          "It shows height above the TERRAIN directly below (AGL), not above the runway threshold or sea level — over undulating ground, trees or buildings on the approach the reading changes with the terrain. This is why CAT II/III approaches need a level, prepared area ahead of the threshold (and why DH for CAT II/III is set on the radio altimeter).",
          "Uses: DH for CAT II/III ILS; GPWS (modes 1–4 terrain closure, sink rate, etc.); autopilot flare and autoland; TCAS inhibits; windshear systems.",
          "A warning flag appears if the signal is lost or unreliable (e.g. above the maximum range or excessive bank).",
        ],
      },
      {
        heading: "Errors and accuracy",
        figureTopics: ["Radio altimeter residual height"],
        points: [
          "Accuracy: about ±1–2 ft or ±2–3 % of indicated height, whichever is greater — best at low height (e.g. ±1.5 ft at very low heights; ±5 % above 500 ft).",
          "§ Errors",
          "Residual height / aircraft installation delay (AID): the antennas are above the wheels, and cable lengths add delay. The system is calibrated so that it reads ZERO at touchdown (main wheels on the ground) — the 'residual height' is compensated.",
          "Attitude: large pitch or bank angles (beyond the antenna beam) can cause loss of lock or reading the slant distance to the nearest ground.",
          "Terrain: the reading follows the nearest reflecting surface below — trees, buildings, vehicles; over water it is accurate (good reflector, but very smooth water can sometimes reflect away at high attitudes).",
          "Multipath and interference (including possible 5G/C-band interference near 3.7–4.2 GHz — an operational issue in some states).",
          "Mutual interference between multiple altimeters on one aircraft is avoided by different sweep rates/frequencies.",
        ],
      },
    ],
    mustKnow: [
      "Radio altimeter: SHF 4.2–4.4 GHz, FMCW; height ∝ frequency difference between transmitted and received.",
      "Range 0–2 500 ft; reads height above terrain directly below; zero at touchdown (AID/residual height compensated).",
      "Used for DH (CAT II/III), GPWS, autoland.",
      "Accuracy ≈ ±1–2 ft or ±2–3 % (best low down).",
      "Errors: attitude, terrain/obstacles, installation delay (compensated), interference.",
    ],
    traps: [
      "Thinking it reads height above the runway or MSL — it's above the terrain directly beneath.",
      "Thinking it's a pulse system in civil aircraft — it's FMCW.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.10.10",
    title: "Emergency Locator Transmitter (ELT)",
    intro:
      "An ELT transmits a distress signal after an accident so search and rescue can find the aircraft. This section covers the principle (automatic and manual activation, homing and satellite detection through Cospas-Sarsat), the types of ELT, the frequencies 121.5, 243 and 406 MHz, and the testing procedures.",
    blocks: [
      {
        heading: "Principles and types",
        figureTopics: ["ELT and Cospas-Sarsat", "ELT"],
        points: [
          "An ELT is a self-contained battery-powered transmitter, activated automatically by an impact (a g-switch, typically about 5 g along the flight axis) or manually by a switch (cockpit remote or on the unit — ON / ARM / OFF; normal flight position ARM).",
          "§ Types (ICAO)",
          "Automatic fixed (ELT(AF)) — permanently attached to the aircraft. Automatic portable (ELT(AP)) — attached, but readily removable for use after a crash. Automatic deployable (ELT(AD)) — ejected from the aircraft on impact or water immersion (floats). Survival (ELT(S)) — removable and carried to survivors, manually activated (may be buoyant).",
          "§ Requirement",
          "SA CARs require aeroplanes on most operations to carry ELT(s) in accordance with Part 91/121/135 — modern installations must be 406 MHz. The registration of a 406 MHz beacon's unique code (with the national SAR authority — in SA via SASAR) allows rescuers to identify the aircraft and owner.",
        ],
      },
      {
        heading: "Frequencies and satellite detection",
        points: [
          "121.5 MHz — VHF civil distress (and homing) frequency; analogue swept tone (downward sweep 1 600–300 Hz, 2–4 times a second).",
          "243 MHz — UHF military distress frequency (second harmonic of 121.5).",
          "406 MHz (406.025–406.1 MHz) — the digital satellite frequency: short 5 W bursts every ~50 s carrying a unique coded identity (country code, aircraft registration/24-bit address or serial number), and often an encoded GNSS position.",
          "§ Cospas-Sarsat",
          "International satellite search-and-rescue system. Since 1 February 2009, satellites process ONLY 406 MHz signals — 121.5 MHz beacons are detected only by aircraft overhead (listening on 121.5) and by ground homing.",
          "LEOSAR (low-earth-orbit) satellites locate a 406 MHz beacon by DOPPLER shift — accuracy about 2–5 km (two possible positions resolved by successive passes). GEOSAR (geostationary) satellites give near-instant alerts but no location unless the beacon transmits its GNSS position. MEOSAR (on GPS/Galileo/GLONASS satellites) give rapid alerts and location by time/frequency difference of arrival.",
          "With an encoded GNSS position, accuracy is about 100 m.",
          "Search aircraft and ground teams use the 121.5 MHz homing signal for the final location (most 406 ELTs also transmit a low-power 121.5 homing signal).",
          "Pilots en route should monitor 121.5 MHz when possible, and report any ELT signal heard to ATC (position, time first and last heard, strength).",
        ],
      },
      {
        heading: "Testing procedures and false alerts",
        points: [
          "Testing an ELT radiates a real distress signal, so tests are restricted: ICAO/AIP practice is to test only during the FIRST FIVE MINUTES of any hour, for no longer than about 5 seconds (no more than three audio sweeps), after informing the ATS unit/tower if required, and to confirm on 121.5 MHz that the signal stopped.",
          "406 MHz beacons have a self-test mode which transmits a special test message ignored by the satellites — use this rather than a live activation.",
          "Maintenance: battery replacement by its expiry date (or after 1 hour cumulative use / as specified by the manufacturer), and periodic inspection as per the maintenance programme.",
          "After a hard landing, or at the end of each flight, listen on 121.5 MHz to check the ELT has not activated. If inadvertently activated, switch it OFF/reset and report to ATC/SAR immediately to prevent an unnecessary search.",
          "After an accident: if possible, switch the ELT ON manually (don't rely on the g-switch), keep the antenna connected and vertical, and stay with the aircraft.",
        ],
      },
    ],
    mustKnow: [
      "Frequencies: 121.5 MHz (civil, homing), 243 MHz (military), 406 MHz (digital, satellite, coded ID).",
      "Cospas-Sarsat processes only 406 MHz since 2009; LEOSAR Doppler ≈ 2–5 km; with GNSS ≈ 100 m.",
      "Types: AF, AP, AD (deployable), S (survival). Normal switch position ARM; g-switch ≈ 5 g.",
      "Test only in the first 5 minutes of the hour, max ~5 s / 3 sweeps; check 121.5 after flight.",
      "Register 406 MHz beacons with the SAR authority.",
    ],
    traps: [
      "Thinking satellites still detect 121.5 MHz beacons.",
      "Testing at any time — only the first 5 minutes of the hour.",
      "Leaving the switch ON in flight (should be ARM).",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.10.11",
    title: "Area Navigation (RNAV) — VOR/DME",
    intro:
      "Area navigation lets an aircraft fly any desired track between waypoints within the coverage of ground aids, instead of only along radials to and from stations. The appendix focuses on VOR/DME RNAV: how a phantom waypoint is defined by a radial and distance (rho-theta), how the computer works out track and distance to it, the advantages and disadvantages, accuracy, reliability and coverage, and the flight-deck equipment.",
    blocks: [
      {
        heading: "Principle of operation — rho-theta and phantom waypoints",
        figureTopics: ["Area Navigation (RNAV)", "RNAV waypoint from VOR/DME (rho-theta)"],
        points: [
          "A VOR gives the aircraft's bearing from the station (theta) and a DME its distance (rho) — together the aircraft's position relative to the station.",
          "A WAYPOINT is defined (and entered by the pilot or held in the database) as a radial and distance from a VOR/DME — e.g. 'JSV 270/35' — even though no station is there: a 'phantom station'.",
          "The RNAV computer (course-line computer) solves the triangle between the station, the aircraft and the waypoint (by the cosine rule/vector resolution) to give the aircraft's bearing and distance FROM THE WAYPOINT. It then displays guidance as if the VOR/DME had been moved to the waypoint.",
          "The pilot selects a course to the waypoint; the CDI shows deviation from that course; the DME display shows distance to the waypoint; groundspeed and time to the waypoint are computed.",
          "Successive waypoints form a route. The station used for each waypoint must be within range (and preferably the nearest suitable station).",
        ],
      },
      {
        heading: "Presentation — linear deviation, not angular",
        points: [
          "In RNAV mode the CDI shows LINEAR (cross-track) deviation in nautical miles, not angular deviation: full-scale is typically ±5 nm en route, ±1 nm in the terminal area and ±0.3 nm on an approach (selectable or automatic).",
          "So one dot means the same distance off track whether you are near or far from the waypoint — unlike a VOR, where the CDI sensitivity increases as you approach the station.",
          "TO/FROM refers to the waypoint. Some systems also provide 'parallel offset' (fly a track a set distance to one side) and vertical navigation.",
        ],
      },
      {
        heading: "Advantages and disadvantages",
        points: [
          "§ Advantages",
          "Direct routes between any two points within coverage → shorter distances, time and fuel savings.",
          "Waypoints can be placed where needed (e.g. at the start of an approach, avoiding restricted areas, parallel routes to increase airway capacity).",
          "Constant linear CDI sensitivity; groundspeed and time to waypoint readily available.",
          "Uses existing VOR/DME ground infrastructure.",
          "§ Disadvantages",
          "Accuracy depends on the distance from the reference station and the geometry — errors in the VOR bearing grow with distance (1° at 60 nm ≈ 1 nm).",
          "Requires both VOR and DME signals within DOC; if either fails or goes out of range the RNAV guidance is lost (dead-reckoning only, if available).",
          "Waypoint entry errors (wrong radial, distance or station) — a major human-factors risk; manual systems are workload-intensive.",
          "Limited by line of sight — poor coverage at low level and in mountainous terrain, and over oceans.",
          "Older single-station rho-theta systems can't meet tighter RNP specifications; DME/DME or GNSS is required for RNAV 1 and approach operations.",
        ],
      },
      {
        heading: "Accuracy, reliability, coverage — and RNP",
        figureTopics: ["PBN / RNP Lateral Containment", "RNP — navigation accuracy"],
        points: [
          "Accuracy: the error is the combination of the VOR error (±5° system → large lateral error at range), the DME error (±0.25 nm + 1.25 %), the computer error, and flight technical error. Typical VOR/DME RNAV accuracy is about ±2–5 nm depending on distance from the station — sufficient for en-route RNAV 5 (B-RNAV), which requires ±5 nm for 95 % of flight time.",
          "Best accuracy: stay close to the reference station, and use stations whose radial and DME lines cross the track at a good angle; automatic DME/DME updating (two or more DMEs) gives much better accuracy than VOR/DME.",
          "Reliability: depends on the ground stations' serviceability (NOTAMs), the airborne equipment and correct data entry. There is no integrity monitoring like GNSS RAIM; the pilot must cross-check (e.g. raw VOR/DME, other aids).",
          "Coverage: within the DOC of the VOR and DME used, and line of sight.",
          "§ Navigation specifications",
          "RNAV X — lateral accuracy ±X nm for 95 % of flight time (e.g. RNAV 5, RNAV 1). RNP X — the same accuracy PLUS on-board performance monitoring and alerting. Operators need approval for the specification flown, and the AIP lists which sensors (VOR/DME, DME/DME, GNSS) are acceptable for each.",
        ],
      },
      {
        heading: "Flight-deck equipment",
        points: [
          "Control/display unit (CDU) — keypad and screen to enter, check and select waypoints and routes (or a navigation database in an FMS).",
          "RNAV computer (course-line computer) — processes VOR and DME inputs, computes position relative to the waypoint.",
          "VOR and DME receivers (often automatically tuned).",
          "Display: CDI/HSI showing linear deviation and TO/FROM relative to the waypoint; distance, groundspeed and time to the waypoint; annunciators (RNAV/APPR mode, waypoint alert, warning flags).",
          "In modern aircraft these functions are in the flight management system (FMS), which blends DME/DME, VOR/DME, GNSS and inertial inputs.",
        ],
      },
    ],
    mustKnow: [
      "VOR/DME RNAV: waypoint = radial + distance from a VOR/DME (rho-theta, phantom station).",
      "Computer solves station–aircraft–waypoint triangle; CDI shows LINEAR deviation (nm).",
      "Advantages: direct routes, flexible waypoints, constant CDI sensitivity. Disadvantages: accuracy falls with distance from station, needs coverage of both aids, data-entry errors, line of sight.",
      "RNAV 5 = ±5 nm 95 %; RNP = RNAV + on-board monitoring and alerting.",
      "Equipment: CDU, RNAV computer, VOR and DME receivers, HSI/CDI.",
    ],
    traps: [
      "Thinking the RNAV CDI becomes more sensitive near the waypoint — it is linear.",
      "Thinking RNAV is independent of ground aids — VOR/DME RNAV needs both in range.",
      "Confusing RNAV with RNP — RNP adds performance monitoring and alerting.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.10.12",
    title: "Satellite Assisted Navigation: GNSS / NAVSTAR GPS",
    intro:
      "GNSS gives a three-dimensional position, velocity and accurate time anywhere on Earth by timing signals from satellites. This section covers GPS's three segments and how a receiver computes a position (pseudo-ranging), advantages and disadvantages, navigation performance requirements (accuracy, integrity, continuity, availability), integrity monitoring (RAIM) and augmentation, the authorisation and documentation needed to use it, the errors and limitations, and the human factors of using GNSS.",
    blocks: [
      {
        heading: "System components — space, control and user segments",
        figureTopics: ["GNSS / GPS"],
        points: [
          "§ Space segment",
          "A nominal constellation of 24 satellites (usually ~30–31 operational) in 6 orbital planes inclined at 55° to the equator, at about 20 200 km (10 900 nm) altitude, each orbiting twice a sidereal day (period ≈ 11 h 58 min). At least 4–5 satellites (usually 6–12) are visible from anywhere at any time above a 5° mask angle.",
          "Each satellite carries atomic clocks and transmits on L1 = 1 575.42 MHz (civil C/A code, and encrypted P(Y) code) and L2 = 1 227.6 MHz (P(Y); and L2C civil on newer satellites); L5 = 1 176.45 MHz (safety-of-life civil) on the newest.",
          "The signal carries the navigation message: satellite clock corrections, the satellite's precise orbit (ephemeris), the almanac (approximate orbits of all satellites), health status and an ionospheric model.",
          "§ Control segment",
          "Master control station (Schriever AFB, Colorado Springs) with monitor stations worldwide and ground antennas. They track the satellites, compute orbit and clock corrections, and upload them — and can mark a faulty satellite 'unhealthy'.",
          "§ User segment",
          "Receivers: antenna, receiver and processor. Aviation receivers are certified to TSO standards (e.g. TSO-C129 for older units with RAIM; TSO-C145/146 for SBAS-capable units).",
          "GPS uses the WGS-84 datum (ICAO standard) and GPS time (no leap seconds). Other GNSS: GLONASS (Russia), Galileo (EU), BeiDou (China).",
        ],
      },
      {
        heading: "Principle of operation — pseudo-ranging",
        figureTopics: ["GNSS position fix"],
        points: [
          "The receiver measures the time a signal took to travel from each satellite (by matching the received pseudo-random code with its own copy) and multiplies by c to get the range. Each range puts the receiver on a sphere centred on that satellite.",
          "Because the receiver's clock is a cheap quartz clock (not atomic), every measured range contains the same clock error — hence 'PSEUDO-ranges'. The clock error is a fourth unknown.",
          "Four unknowns (latitude, longitude, altitude, receiver clock error) → at least FOUR satellites are needed for a 3-D position. Three satellites give a 2-D position if the altitude is known (e.g. from the altimeter — 'baro-aiding').",
          "Velocity (groundspeed and track) comes from the Doppler shift of the signals; time is accurate to nanoseconds.",
          "§ Geometry — DOP",
          "Accuracy depends on satellite geometry: well-spread satellites give a small dilution of precision (DOP) and good accuracy; satellites clustered in one part of the sky give a large DOP. Vertical accuracy is worse than horizontal (all satellites are above the receiver).",
        ],
      },
      {
        heading: "Advantages and disadvantages",
        points: [
          "§ Advantages",
          "Worldwide, all-weather, 24-hour coverage including oceans and low levels where ground aids don't reach. High accuracy (typically better than 10–15 m horizontally for civil GPS). Accurate groundspeed, track and time. No ground stations needed in the area of operation. Supports RNAV/RNP routes and approaches (RNP APCH, LPV with SBAS).",
          "§ Disadvantages",
          "Low signal power — easily jammed (intentionally or by interference) and susceptible to spoofing. Dependence on a system controlled by one state (for GPS). Satellite or constellation outages; insufficient satellites for integrity (RAIM holes). Antenna masking by the airframe in turns and by terrain. Vertical accuracy poorer than horizontal. Database dependence: wrong or out-of-date data → wrong guidance. Human factors: complacency and data-entry errors.",
        ],
      },
      {
        heading: "Navigation system performance requirements; reliability and integrity",
        points: [
          "Four required navigation performance parameters:",
          "ACCURACY — the difference between the computed and the true position (95 % of the time).",
          "INTEGRITY — the ability of the system to provide timely warnings when it should not be used (the most important for safety): measured by the alert limit, time-to-alert and integrity risk.",
          "CONTINUITY — the ability to perform its function without unscheduled interruption during the intended operation.",
          "AVAILABILITY — the percentage of time the system is usable for the intended operation.",
          "§ RAIM",
          "Receiver Autonomous Integrity Monitoring: the receiver uses REDUNDANT satellites to check the consistency of the ranges. With at least 5 satellites (or 4 + baro-aiding) it can DETECT a faulty satellite (fault detection, FD) and warn; with at least 6 (or 5 + baro) it can also EXCLUDE it and carry on (fault detection and exclusion, FDE).",
          "RAIM prediction: before a flight using GNSS (especially for approaches or as a primary means), the availability of RAIM along the route/at the ETA must be checked (prediction software or NOTAMs).",
          "Alert limits depend on the phase of flight: e.g. en-route 2 nm, terminal 1 nm, non-precision approach 0.3 nm.",
          "§ Augmentation",
          "ABAS — aircraft-based (RAIM, plus inertial or baro inputs). SBAS — satellite-based (WAAS USA, EGNOS Europe, etc.): ground reference stations compute corrections and integrity data, broadcast via geostationary satellites — enables LPV approaches with vertical guidance. GBAS — ground-based (local corrections via VHF data broadcast for precision approaches, GLS). (SA does not currently have an operational SBAS.)",
        ],
      },
      {
        heading: "Authorisation and documentation",
        points: [
          "GNSS may be used for IFR navigation only with equipment certified for that purpose (TSO-approved and properly installed), in accordance with the AFM/AFM supplement, and with operational approval where the state requires it. Hand-held and VFR-only units are for situational awareness only.",
          "The SA AIP (GEN and ENR sections) and SA-CATS specify where and how GNSS may be used — e.g. as supplementary or primary means, the RNAV/RNP routes and approaches requiring it, and RAIM prediction requirements. Operators require approval for RNAV/RNP operations (operations manual procedures, training, MEL).",
          "The navigation database must be CURRENT (AIRAC 28-day cycle) and from an approved source; waypoints of approach procedures must not be altered manually.",
          "Documents carried: AFM supplement for the GNSS installation, current database, and (where required) evidence of operational approval; flight plan item 10/18 entries (G for GNSS, PBN codes) must match the equipment and approval.",
          "When GNSS is not approved as the sole means, the aircraft must carry and use the conventional equipment for the route/approach, and monitor raw data.",
        ],
      },
      {
        heading: "Errors and limitations",
        points: [
          "Ionospheric delay — the LARGEST natural error: signals slow down passing through the ionosphere (varies with time of day, season and solar activity). Partly corrected by the broadcast model; dual-frequency receivers (L1/L5) remove most of it; SBAS corrects it.",
          "Tropospheric delay — from water vapour and density in the lower atmosphere, worst at low elevation angles (hence the 5° mask angle).",
          "Satellite clock and ephemeris (orbit) errors — small, corrected by the control segment's uploads.",
          "Multipath — signals reflected off the airframe, terrain or buildings arrive late (mainly a ground/low-level problem).",
          "Receiver noise and resolution.",
          "Geometry (DOP) amplifies all the range errors.",
          "Selective availability (deliberate degradation of civil accuracy) was switched OFF in May 2000.",
          "Limitations: jamming and interference (low signal strength ~10⁻¹⁶ W), spoofing, solar storms, antenna masking in steep bank, satellite outages (NOTAMs), datum mismatch (charts not in WGS-84), and database errors.",
        ],
      },
      {
        heading: "Human factors and GNSS",
        points: [
          "Complacency/over-reliance: GNSS is so accurate and reliable that pilots stop cross-checking and lose situational awareness; when it fails or is wrong, errors go unnoticed.",
          "Data-entry errors: wrong waypoint (similar names/idents), wrong co-ordinates, selecting the wrong procedure or runway — the commonest cause of GNSS navigation errors. Always cross-check the route against the flight plan/chart (track and distance of each leg).",
          "Mode confusion and automation surprises: not knowing which mode the receiver/FMS is in (e.g. approach mode not armed, OBS/hold mode, sequencing suspended).",
          "Head-down time: programming in flight increases workload and reduces lookout — plan and load before departure; keep programming to a minimum in busy phases.",
          "Display interpretation: different manufacturers' interfaces; training and familiarity with the specific unit are essential.",
          "Good practice: brief the GNSS route/approach, check RAIM and NOTAMs, monitor raw data from conventional aids, keep a mental picture (and a paper/back-up plan) for loss of GNSS.",
        ],
      },
    ],
    mustKnow: [
      "GPS: 24 (nominal) satellites, 6 planes at 55°, ~20 200 km, period ~12 h; L1 1 575.42 MHz; WGS-84.",
      "Segments: space, control (master station Colorado Springs), user.",
      "Pseudo-ranging: 4 satellites for 3-D (clock error is the 4th unknown); 3 + baro for 2-D.",
      "RAIM: 5 satellites (or 4 + baro) to detect; 6 (or 5 + baro) to exclude. Predict RAIM before flight.",
      "Performance: accuracy, integrity, continuity, availability.",
      "Largest error: ionospheric delay. Others: troposphere, clock, ephemeris, multipath, receiver, DOP. SA off since 2000.",
      "Augmentation: ABAS (RAIM), SBAS (WAAS/EGNOS), GBAS.",
      "IFR use needs certified equipment, current database (AIRAC), approval per AIP; HF: complacency, data entry, mode confusion.",
    ],
    traps: [
      "Thinking 3 satellites give a 3-D fix — 4 are needed (clock error).",
      "Confusing integrity (timely warnings) with accuracy.",
      "Assuming a hand-held GPS may be used for IFR navigation.",
      "Selective availability is no longer the main error — the ionosphere is.",
    ],
  },
];
