// ============================================================================
// Instrument Rating — Air Law & AWO flight procedures: full study text
// C.3.2 General flight procedures · C.3.3 Altimeter setting · C.3.4 Departures
// · C.3.5 En-route & holding · C.3.6 Arrival & approach.
// Based on ICAO Doc 8168 (PANS-OPS) Vol I as listed in Appendix 2C, and
// SA-CATS 91 (TS 91.06.16, 91.07.x). Original wording. Always use the
// current SA AIP and approved charts for actual operations.
// ============================================================================

import type { AirLawNoteBlock } from "./airlaw-notes";

export const AWO_FULL: Record<string, { intro: string; blocks: AirLawNoteBlock[]; mustKnow: string[]; traps: string[] }> = {
  // ──────────────────────────────────────────────────────────────────────────
  "C.3.2": {
    intro:
      "Instrument procedures are designed to PANS-OPS (ICAO Doc 8168) criteria: each segment protects the aircraft by a minimum obstacle clearance within defined areas, provided the pilot flies the procedure as published at the right speeds. This section covers the PANS-OPS definitions the syllabus lists, the general principles, aircraft categories, and the SA-CATS 91 items: radio-communication failure, minimum flight altitudes, aerodrome operating minima and IFR planning minima.",
    blocks: [
      {
        heading: "PANS-OPS definitions — heights, altitudes and minima",
        points: [
          "Elevation: vertical distance of a point on the Earth's surface above MSL. Aerodrome elevation: the elevation of the highest point of the landing area.",
          "Height: vertical distance of a level, point or object above a specified datum (e.g. above the aerodrome/threshold — QFE). Altitude: vertical distance above MSL (QNH). Flight level: a surface of constant atmospheric pressure related to 1013.2 hPa, separated by specific pressure intervals.",
          "Decision altitude/height (DA/DH): the specified altitude or height in a 3D (precision or APV) approach at which a MISSED APPROACH must be initiated if the required visual reference to continue the approach has not been established. DA referenced to MSL, DH to the threshold elevation.",
          "Minimum descent altitude/height (MDA/MDH): the specified altitude/height in a 2D (non-precision) or circling approach below which descent must NOT be made without the required visual reference. MDH referenced to aerodrome elevation (or threshold if more than 2 m below it); for circling, to aerodrome elevation.",
          "Obstacle clearance altitude/height (OCA/OCH): the lowest altitude/height above the relevant threshold or aerodrome elevation used in establishing compliance with obstacle clearance criteria. The operator's DA/MDA is never lower than the OCA, and is raised by operational factors (aircraft equipment, lighting, crew) to give the aerodrome operating minima.",
          "Minimum en-route altitude (MEA): the altitude for an en-route segment that provides adequate reception of navaids and ATS communications, complies with the airspace structure and provides the required obstacle clearance. Minimum obstacle clearance altitude (MOCA): the minimum altitude for a defined segment that provides the required obstacle clearance (navaid reception not guaranteed).",
          "Minimum sector altitude (MSA): the lowest altitude which may be used providing a minimum clearance of 300 m (1 000 ft) above all objects within a sector of a circle of 46 km (25 nm) radius centred on a significant point, the ARP or the HRP. (The SA AIP also uses 'minimum safe altitude' with its own definition — check which is meant.)",
          "Terminal arrival altitude (TAA): the lowest altitude that provides 300 m (1 000 ft) clearance within an arc of 25 nm radius centred on the IAF (or IF) of an RNAV approach, combined with the lines joining the arc ends to the IF.",
          "Reference datum height (RDH): the height of the extended glide path or nominal vertical path at the runway threshold. Vertical path angle (VPA): the angle of the published final approach descent in baro-VNAV procedures.",
        ],
      },
      {
        heading: "PANS-OPS definitions — procedures, segments and fixes",
        points: [
          "Instrument approach procedure (IAP): a series of predetermined manoeuvres by reference to flight instruments with specified protection from obstacles from the IAF, or from the beginning of a defined arrival route, to a point from which a landing can be completed, and thereafter, if a landing is not completed, to a position at which holding or en-route obstacle clearance criteria apply. Types: non-precision (NPA — 2D), approach with vertical guidance (APV — 3D, e.g. LPV, LNAV/VNAV), precision (PA — 3D, ILS/MLS/GLS).",
          "Initial approach fix (IAF): fix marking the beginning of the initial segment. Intermediate fix (IF): beginning of the intermediate segment. Final approach fix/point (FAF/FAP): beginning of the final segment. Missed approach point (MAPt): the point in a NPA at or before which the missed approach must be initiated to ensure obstacle clearance. Missed approach holding fix (MAHF). Descent fix: a fix permitting descent to a lower altitude on the final approach (step-down fix).",
          "Initial approach segment: between the IAF and the IF (or FAF); intermediate approach segment: between the IF and the FAF/FAP (or between a reversal/dead-reckoning track and the FAF); final approach segment (FAS): where alignment and descent for landing are accomplished.",
          "Reversal procedure: used to reverse direction on the initial segment — a PROCEDURE TURN (45°/180° or 80°/260°), a BASE TURN (teardrop), or a RACETRACK. Procedure turn: a manoeuvre with a turn away from the designated track followed by a turn in the opposite direction to intercept the reciprocal. Base turn: a turn executed at the end of an outbound track to intercept the inbound track (not a reciprocal). Racetrack procedure: a holding-pattern-shaped procedure to reduce altitude or when a reversal is impractical.",
          "Holding procedure: a predetermined manoeuvre which keeps an aircraft within a specified airspace while awaiting further clearance. Holding fix: geographical location serving as a reference.",
          "Circling approach: an extension of an instrument approach providing visual manoeuvring around the aerodrome before landing. Visual manoeuvring (circling) area: the area in which obstacle clearance is provided for aircraft carrying out a circling approach.",
          "Continuous descent final approach (CDFA): a technique for NPAs in which the final segment is flown in a continuous descent, without level-off, from at or above the FAF altitude to about 15 m (50 ft) above the threshold (or the point where the flare starts).",
          "SID (standard instrument departure) and STAR (standard instrument arrival): designated IFR departure/arrival routes linking the aerodrome or runway to the en-route structure.",
          "RNAV; RNP (a statement of navigation performance accuracy); LPV (localiser performance with vertical guidance — SBAS approach); GLS (GBAS landing system); ACAS; DME distance (the line-of-sight slant distance); waypoint (fly-by or fly-over); hot spot (a location on the aerodrome movement area with a history or risk of collision/runway incursion where heightened attention is needed); transition altitude/level/layer (see C.3.3).",
        ],
      },
      {
        heading: "General principles; aircraft categories; obstacle clearance",
        points: [
          "§ General principles (PANS-OPS Part I Sect 2)",
          "Procedures provide protection only if flown accurately as published — speeds, bank angles (25° or rate 3°/s for most turns; 15° for departures in some criteria) and altitudes. Protection areas consist of a PRIMARY area (full MOC) and SECONDARY areas either side (MOC reducing linearly to zero at the outer edge).",
          "Minimum obstacle clearance (MOC) examples: initial approach 300 m (984 ft); intermediate 150 m (492 ft); final (NPA with FAF) 75 m (246 ft) (90 m without FAF); missed approach — 30 m initial, 50 m intermediate/final; holding 300 m (984 ft); en-route 300 m (600 m in mountainous areas in some states).",
          "§ Aircraft categories (by Vat = 1.3 VSO at max landing mass, or 1.23 VSR0)",
          "Cat A < 91 kt; B 91–120 kt; C 121–140 kt; D 141–165 kt; E 166–210 kt. Category determines the speeds used in design, the circling area, and therefore the minima. Use a higher category if you fly faster (e.g. circling at a higher speed) — never a lower one.",
          "Typical maximum speeds: initial approach A 150 kt (110–150), B 180, C/D 250; final approach A 70–100, B 85–130, C 115–160, D 130–185; circling A 100, B 135, C 180, D 205, E 240; missed approach (final) A 110, B 150, C 240, D 265.",
        ],
      },
      {
        heading: "SA-CATS 91 — equipment and checklists",
        points: [
          "TS 91.03.3 Aircraft checklists: normal, abnormal and emergency checklists (approved/acceptable, accessible to the crew) — use them for every phase.",
          "TS 91.04.28 ACAS: requirements for carriage of ACAS II (TCAS II v7.1) by larger turbine aeroplanes and use in accordance with the procedures (follow RAs, report).",
          "TS 91.05.1 Communication equipment and TS 91.05.2 Navigation equipment for IFR: two independent VHF communication systems and the navigation equipment required for the route and approaches (e.g. VOR, ADF, DME, ILS, GNSS as applicable), with redundancy so that loss of one unit does not prevent navigation per the flight plan.",
          "TS 91.05.3 Use of GNSS: GNSS approved equipment and installation, RAIM/FDE prediction, current database, conditions for use as a primary or supplementary means, and the requirement to have conventional equipment where GNSS is not approved as sole means.",
        ],
      },
      {
        heading: "Radio communication failure (RCF) procedures — general and IFR (TS 91.06.16)",
        points: [
          "§ General",
          "Try other frequencies (previous frequency, the next unit, 121.5 MHz), other aircraft (relay), check the equipment (headset, volume, squelch, circuit breakers). SQUAWK 7600. Transmit blind ('transmitting blind') position reports and intentions twice on the frequency in use — the receiver may work. Watch for visual signals (light signals) at the aerodrome. With a transmitter failure only, follow instructions acknowledged by IDENT/turns as requested.",
          "§ VMC",
          "If in VMC: continue to fly in VMC, land at the nearest suitable aerodrome, and report arrival to ATC by the most expeditious means.",
          "§ IMC / IFR (ICAO standard procedure — follow the SA procedure as published in SA-CATS 91.06.16 and the AIP)",
          "In airspace where radar is NOT used: maintain the last assigned speed and level (or minimum flight altitude if higher) for 20 minutes following the aircraft's failure to report over a compulsory reporting point, then adjust level and speed in accordance with the filed flight plan.",
          "In airspace where radar IS used: maintain the last assigned speed and level (or MFA if higher) for 7 minutes after the last assigned level/MFA was reached, or the time the transponder was set to 7600, or the aircraft failed to report at a compulsory point — whichever is later — then adjust to the flight plan.",
          "When being radar-vectored or directed by RNAV without a specified limit: rejoin the current flight plan route no later than the next significant point (respecting minimum flight altitude).",
          "Proceed according to the current flight plan route to the appropriate designated navaid or fix serving the destination and, when required, hold there until commencement of descent.",
          "Commence descent from that navaid/fix at, or as close as possible to, the expected approach time (EAT) last received and acknowledged; or if none, at or as close as possible to the ETA resulting from the current flight plan.",
          "Complete a normal instrument approach procedure as specified for the designated navaid/fix, and land if possible within 30 minutes after the ETA or the last acknowledged EAT, whichever is later.",
        ],
      },
      {
        heading: "Minimum flight altitudes, aerodrome operating minima and IFR planning (TS 91.07.2/.5/.7/.8/.12)",
        points: [
          "§ Minimum flight altitudes (TS 91.07.2)",
          "IFR flights must not be flown below the published minimum altitudes (MEA/MSA/MOCA/minimum vectoring altitude) except during approach/departure or when authorised; where none is published, at least 1 000 ft above the highest obstacle within 5 nm (8 km) of the estimated position — 2 000 ft over high terrain or mountainous areas (check SA-CATS for the exact SA figures).",
          "§ Aerodrome operating minima (TS 91.07.5)",
          "Each operator/pilot establishes minima for take-off (RVR/visibility, ceiling where needed) and landing (DA/DH or MDA/MDH plus RVR/visibility) not lower than those published by the state and the OCA/OCH, taking account of the aircraft type, equipment, crew qualification, runway characteristics and lighting, obstacles, and the means of determining and reporting weather. An approach must not be continued below the minima (or past the outer marker/1 000 ft above aerodrome in some rules) if the reported RVR/visibility is below the minimum (the 'approach ban').",
          "§ Pre-flight selection of aerodromes (TS 91.07.7) and IFR planning minima (TS 91.07.8)",
          "For IFR flights a destination alternate is required unless the weather at the destination (for a period around the ETA) is forecast to be good enough (e.g. ceiling and visibility well above minima and a standard instrument approach available). Planning minima for alternates are higher than the landing minima (e.g. for a precision approach: DA/H + 200 ft and RVR + 800 m; for a non-precision: MDA/H + 400 ft and visibility + 1 500 m — use the SA-CATS figures). The forecast must be at or above the planning minima for the period from 1 hour before to 1 hour after the ETA (check SA-CATS).",
          "§ Fuel supply (TS 91.07.12)",
          "IFR, no destination alternate required: fuel to the destination + 45 minutes at normal cruise consumption. IFR, alternate required: to the destination, then to the alternate, + 45 minutes. (VFR by day + 30 min; VFR by night + 45 min.) Plus allowances for taxi, contingency, holding and expected delays.",
        ],
      },
    ],
    mustKnow: [
      "DA/DH: 3D approaches — missed approach if no visual reference. MDA/MDH: 2D/circling — don't descend below without visual reference.",
      "OCA/OCH: obstacle-clearance basis; operating minima are never lower.",
      "MSA: 1 000 ft clearance within 25 nm. TAA: 25 nm arcs around the IAF/IF for RNAV approaches.",
      "MOC: initial 300 m (984 ft); intermediate 150 m; final NPA 75 m (90 m without FAF); missed approach 30/50 m; holding 300 m.",
      "Categories by Vat: A < 91, B 91–120, C 121–140, D 141–165, E 166–210 kt.",
      "RCF: 7600; blind transmissions; non-radar 20 min / radar 7 min then flight plan; descend at EAT/ETA; land within 30 min.",
      "Alternates need higher planning minima; IFR fuel + 45 min reserve.",
    ],
    traps: [
      "Using a lower aircraft category than the speed actually flown.",
      "Descending below MDA on a NPA without visual reference while 'looking'.",
      "MSA is an emergency/arrival safe altitude — not an approach clearance.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  "C.3.3": {
    intro:
      "Altimeter setting procedures guarantee vertical separation from terrain (on QNH) and from other aircraft (on the standard setting). This section covers transition altitude, transition level and transition layer, when to change settings in the climb and descent, how levels are expressed, QFE use, the SA AIP procedures, and cold-temperature corrections.",
    blocks: [
      {
        heading: "Transition altitude, transition level and transition layer",
        points: [
          "TRANSITION ALTITUDE (TA): the altitude at or below which the vertical position of an aircraft is controlled by reference to ALTITUDES (QNH). Fixed and published for each aerodrome/area (SA AIP ENR 1.7 and AD).",
          "TRANSITION LEVEL (TL): the lowest flight level available for use ABOVE the transition altitude. Normally determined by ATC for the prevailing QNH and passed in the ATIS or by ATC; it varies with QNH so that the layer is at least a minimum depth.",
          "TRANSITION LAYER: the airspace between the transition altitude and the transition level. Aircraft do not normally level off (cruise) in it.",
          "Low QNH → the TL is raised (the flight levels sit lower relative to altitude). High QNH → TL lowered.",
          "Example: TA 8 000 ft, QNH 1003 hPa → FL80 is at about 8 000 – 10 × 30 = 7 700 ft altitude (below the TA), so FL80 cannot be used; FL90 (~8 700 ft) is the lowest level above TA with an adequate layer → TL = FL90 (actual TL set per the AIP table).",
        ],
      },
      {
        heading: "Changing settings — climb, descent, and expressing vertical position",
        points: [
          "CLIMBING: change from QNH to the standard setting (1013.2 hPa) when passing the TRANSITION ALTITUDE; thereafter report flight levels.",
          "DESCENDING: change from 1013.2 to QNH when passing the TRANSITION LEVEL (once cleared to an altitude); thereafter report altitudes.",
          "Within the transition layer: report in FLIGHT LEVELS when climbing, in ALTITUDES when descending.",
          "When cleared to an altitude below the TL while above it, set QNH when descent starts if cleared to descend to an altitude (ATC practice — follow the clearance phrasing 'descend to altitude 6 000 ft, QNH 1018').",
          "Vertical position: at or below TA — altitude (QNH); at or above TL — flight level; approach and landing — altitude (QNH), or height (QFE) where QFE is used.",
          "QNH in SA is passed in whole hPa (rounded DOWN); QFE when requested or used by the operator (e.g. some military/aerodrome procedures). Check altimeters on the ground: QNH → elevation within tolerance.",
          "Both altimeters (and the standby) set and cross-checked at each change; the altitude-alert system set to the cleared level.",
        ],
      },
      {
        heading: "SA AIP altimeter setting procedures",
        points: [
          "South Africa uses QNH below the transition altitude within TMAs/CTRs and below the TA/en route as published; standard setting above. TAs vary by area — published in AIP ENR 1.7 (altimeter setting procedures) and on charts; TLs are given by ATC/ATIS from the AIP table.",
          "Outside controlled airspace below the TA use the QNH of the nearest aerodrome or the regional/area QNH as published.",
          "Before take-off set the aerodrome QNH; on arrival ATC/ATIS gives the QNH and TL.",
          "Because many SA aerodromes are high (Johannesburg ~5 500 ft), QFE and QNH differ by about 180 hPa there — setting the wrong one gives an error of thousands of feet. Always confirm the setting and check that the altimeter reads aerodrome ELEVATION on the ground with QNH set.",
          "Report 'level' or 'altitude' using the correct phraseology ('flight level one two zero', 'altitude eight thousand feet').",
        ],
      },
      {
        heading: "Cold-temperature corrections",
        points: [
          "Altimeters are calibrated to ISA. In air COLDER than ISA, the true altitude is LOWER than indicated, so obstacle clearance is reduced — 'high to low (cold), look out below'.",
          "Correction ≈ 4 % of the height above the altimeter-setting source per 10 °C below ISA (i.e. 4 ft per 1 000 ft per °C). PANS-OPS provides correction tables (by aerodrome temperature and height above the aerodrome).",
          "Apply corrections when the aerodrome temperature is low (e.g. 0 °C or below, or as specified) to: the MSA, initial/intermediate approach altitudes, FAF crossing altitude, step-down fixes, DA/MDA and the missed-approach altitudes — not to ATC-assigned altitudes (tell ATC you are applying corrections) or to altitudes in radar vectoring unless coordinated.",
          "Example: DA 400 ft above the aerodrome, aerodrome temperature –20 °C: ISA at a low aerodrome ≈ +15 → deviation –35 → correction ≈ 4 % × 3.5 × 400 = 56 ft → set DA about 60 ft higher (tables give similar).",
          "Hot air: true altitude higher than indicated — no correction normally required (but baro-VNAV approaches have high and low temperature limits because the vertical path changes).",
          "Pressure (high to low) errors are prevented by using the current QNH.",
        ],
      },
    ],
    mustKnow: [
      "TA: at/below — altitudes on QNH. TL: lowest FL above TA. Transition layer between them.",
      "Climbing: set 1013 at the TA. Descending: set QNH at the TL. In the layer: FL climbing, altitude descending.",
      "Low QNH raises the TL.",
      "Cold: true altitude lower — correct MSA, approach altitudes, DA/MDA ≈ 4 % per 10 °C below ISA.",
    ],
    traps: [
      "Setting QNH early when cleared to a flight level, or 1013 early when cleared to an altitude.",
      "Applying cold corrections to ATC-assigned altitudes without telling ATC.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  "C.3.4": {
    intro:
      "Departure procedures (PANS-OPS Part I Section 3) protect an aircraft from the end of the runway until it reaches the en-route structure or a safe altitude. This section covers the general criteria (PDG, obstacle identification surface, turns), straight and turning departures, SIDs, omnidirectional departures, RNAV/RNP departures, and what is published.",
    blocks: [
      {
        heading: "General criteria — DER, OIS and procedure design gradient",
        points: [
          "The departure starts at the DEPARTURE END OF THE RUNWAY (DER) — the end of the TODA (runway or clearway). The aircraft is assumed to cross the DER at least 5 m (16 ft) above it.",
          "OBSTACLE IDENTIFICATION SURFACE (OIS): a 2.5 % gradient surface starting at 5 m above the DER. Obstacles penetrating it require a steeper climb gradient.",
          "MINIMUM OBSTACLE CLEARANCE in the departure: 0.8 % of the distance flown from the DER (zero at the DER), up to the en-route MOC.",
          "PROCEDURE DESIGN GRADIENT (PDG): the published climb gradient for the procedure. Standard PDG = 3.3 % (2.5 % OIS + 0.8 % MOC). If obstacles penetrate the OIS, a higher PDG is published, with the altitude/height up to which it applies (after which 3.3 % applies again).",
          "Converting gradient to rate of climb: ROC (fpm) ≈ gradient % × groundspeed (kt) × 1.013 — e.g. 3.3 % at 150 kt GS ≈ 500 fpm; 5 % at 150 kt ≈ 760 fpm. Charts give a table of ROC for groundspeeds.",
          "The pilot must ensure the aircraft can achieve the published gradient (with an engine failure for multi-engine Class A — contingency procedures are the operator's responsibility); if not, request another departure or reduce mass.",
          "Turns: no turn below 120 m (394 ft) above DER elevation unless specified (and the turn protection areas assume a bank of 15° for departures, with specified speeds). Departures may specify a turn at an altitude/height, at a fix, or at a distance.",
          "Close-in obstacles (low, near the DER — gradient would only apply to ~200 ft) are published as a note rather than a high PDG; avoid them visually or with a slightly steeper initial climb.",
        ],
      },
      {
        heading: "Straight and turning departures; standard instrument departures (SIDs)",
        points: [
          "STRAIGHT departure: initial track within 15° of the runway alignment. Track guidance may be provided within 20 km (10.8 nm) by a facility.",
          "TURNING departure: a turn of more than 15° — protection areas widen for the turn; turn at an altitude/height, a fix or a distance.",
          "SID: a designated IFR departure route linking the aerodrome/runway with a specified significant point (normally on an ATS route) where the en-route phase begins. Designed for ATC flow, noise abatement and obstacle clearance. Named by the end-point and a number and letter (e.g. 'ELOVI 1A').",
          "SID content: tracks, turns, altitude/speed restrictions ('at or above', 'at or below', 'at'), PDG with the altitude to which it applies, transition altitude, initial cleared level, communication instructions, lost-communication procedure.",
          "Flying the SID: comply with all published altitude and speed constraints unless ATC cancels them ('climb unrestricted' or 'climb via SID'); report the SID in the readback; set the navaids/FMS before departure; brief the engine-failure procedure.",
        ],
      },
      {
        heading: "Omnidirectional departures",
        points: [
          "Where no SID is published (or for departures not on a SID), an OMNIDIRECTIONAL DEPARTURE may be designed: the aircraft climbs on the runway heading to 120 m (394 ft) above DER elevation (or higher if specified) before turning in any direction to proceed, while climbing at the published gradient (3.3 % unless stated) to the minimum altitude for en-route flight.",
          "Sectors may be specified: e.g. 'Sector A — turns left permitted after reaching 1 000 ft; Sector B — climb to 3 500 ft before turning; Sector C — not permitted/climb gradient 5 % required'. Restrictions are published in the AIP/chart (e.g. 'climb on runway heading to 5 200 ft before turning right').",
          "Omnidirectional departures give obstacle clearance only; ATC may still issue a specific heading/route.",
        ],
      },
      {
        heading: "RNAV and RNP departures; published information",
        points: [
          "RNAV departures (basic GNSS, SBAS, DME/DME, RNP — PANS-OPS Part II Sect 2) use waypoints (fly-by and fly-over) and path terminators coded in the database; they require the appropriate navigation specification approval (e.g. RNAV 1 / RNP 1), current database, RAIM availability, and the RNAV system in the correct mode/scale (±1 nm terminal).",
          "Don't modify database departures manually (only via approved procedures); check the loaded SID matches the chart (waypoint sequence, altitude/speed constraints).",
          "§ Published information for departures (PANS-OPS Ch 4)",
          "Departure charts/AIP give: the departure track/route and turning points; PDG if more than 3.3 % with the altitude to which it applies; the significant obstacles (and close-in obstacles); altitude/speed restrictions; navaids and frequencies; the minimum sector altitudes; transition altitude; and any omnidirectional sector restrictions. Gradients are also given as a table of rates of climb for groundspeeds.",
        ],
      },
    ],
    mustKnow: [
      "DER crossing ≥ 5 m (16 ft); OIS 2.5 %; MOC 0.8 % of distance; standard PDG 3.3 %.",
      "ROC ≈ gradient % × GS × 1.013 (3.3 % at 150 kt ≈ 500 fpm).",
      "No turn below 120 m (394 ft) above DER unless specified.",
      "Straight departure: within 15° of runway alignment.",
      "Omnidirectional: climb on runway heading to 394 ft (or as specified) then any direction at the PDG.",
      "SIDs: comply with altitude/speed constraints; PDG published with the altitude where it ends.",
    ],
    traps: [
      "Assuming 3.3 % applies when a higher PDG is published.",
      "Turning early (below 394 ft or before the published point).",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  "C.3.5": {
    intro:
      "En route, IFR aircraft fly airways and RNAV routes at levels that guarantee obstacle clearance and navaid reception, and hold when instructed. This section covers the minimum-altitude family on en-route charts (MEA, MOCA, MORA/Grid MORA, MSA), route and chart information (Jeppesen high/low altitude charts), holding procedures (entries, timing, speeds, wind correction), and RNAV/RNP en-route operations.",
    blocks: [
      {
        heading: "Minimum en-route altitudes",
        points: [
          "MEA (minimum en-route altitude): ensures obstacle clearance AND navaid reception AND ATS communications on the segment, and complies with the airspace structure.",
          "MOCA (minimum obstacle clearance altitude): obstacle clearance only for the segment (ICAO: 300 m / 1 000 ft above the highest obstacle within the route protection area — 2 000 ft in mountainous areas in some states); navaid reception NOT guaranteed (Jeppesen typically shows MOCA with a 'T' suffix or separately).",
          "MORA (minimum off-route altitude — Jeppesen): Route MORA gives clearance within 10 nm either side of the airway centreline and route ends; GRID MORA gives clearance within each latitude/longitude grid square (shown in large figures in each square): 1 000 ft above the highest terrain/obstacle where it is 5 000 ft or less, 2 000 ft where above 5 000 ft. No navigation or communication coverage implied — for emergency/off-route use.",
          "MSA / minimum safe altitude around an aerodrome: 1 000 ft clearance within 25 nm (see C.3.2).",
          "Minimum vectoring altitude: used by radar controllers (may be lower than MEA).",
          "Minimum reception altitude (MRA) and minimum crossing altitude (MCA) may be published for specific fixes.",
          "Engine failure en route: plan drift-down / escape routes so the aircraft can stay above MOCA/Grid MORA.",
        ],
      },
      {
        heading: "Jeppesen high/low altitude en-route charts and route information",
        points: [
          "Low-altitude en-route charts cover airways below the high-altitude structure; high-altitude charts cover upper airways. Both show: airways with identifiers (e.g. A405, UA405, UG… RNAV routes 'Q'/'T'/'Z' as designated), magnetic courses (outbound from each navaid), segment distances and total distances between compulsory points, MEAs (and MOCAs), changeover points (where to change navaid tuning — a 'Z' symbol with distances), compulsory (filled triangle) and on-request (open triangle) reporting points, navaid boxes (name, identifier, frequency, Morse, DME, coordinates), airspace boundaries (FIR/UIR, TMA, CTA, special use airspace — P, R, D areas), Grid MORAs, airport symbols, communication frequencies, time zones and isogonal information.",
          "Direction of flight and semicircular levels: in SA IFR cruising levels follow the semicircular rule based on magnetic track (e.g. 000–179° odd thousands, 180–359° even thousands, with RVSM levels above FL290 as published) — check AIP ENR 1.7.",
          "Changeover point: unless published, halfway between the navaids on a segment; published COPs reflect better reception.",
          "Always use the current chart cycle and check NOTAMs for navaid outages and temporary restricted areas.",
        ],
      },
      {
        heading: "Holding procedures — the pattern, speeds and timing",
        points: [
          "§ Standard pattern",
          "RIGHT-hand turns (non-standard left turns are published). The aircraft flies inbound to the holding fix on the inbound track, turns 180° to the outbound leg, flies outbound for the specified time/distance, then turns 180° back onto the inbound track.",
          "Bank: 25° or rate 3°/s (rate 1), whichever needs the LESSER bank.",
          "Outbound leg timing: 1 MINUTE at or below 14 000 ft; 1 ½ MINUTES above 14 000 ft (or a DME distance when published). Start timing over or abeam the fix, whichever is later (if abeam can't be determined, when the outbound turn is complete).",
          "§ Maximum holding speeds (ICAO PANS-OPS, IAS)",
          "Up to and including 14 000 ft: 230 kt (Cat A/B: 170 kt). Above 14 000 ft up to and including 20 000 ft: 240 kt. Above 20 000 ft up to 34 000 ft: 265 kt. Above 34 000 ft: M0.83. In turbulence: up to 280 kt / M0.8 (with ATC approval). (Check the SA AIP/charts for any national values.)",
          "§ Wind correction",
          "Apply THREE times the drift correction on the OUTBOUND leg (to compensate for the effect on the turns), and adjust the outbound timing so the INBOUND leg is the specified time (1 min / 1.5 min) — e.g. with a headwind inbound, shorten the outbound time.",
          "Report entering the hold and leaving it; expect further clearance (EFC/EAT) times.",
        ],
      },
      {
        heading: "Holding entries",
        points: [
          "The entry is chosen by the aircraft's heading relative to the holding (inbound) track, using three sectors drawn through the holding fix, with a 70° line from the fix on the holding side, and a ±5° flexibility at the sector boundaries.",
          "SECTOR 1 — PARALLEL ENTRY (the 110° sector on the non-holding side, behind the inbound track): at the fix, turn onto the OUTBOUND heading (parallel to the inbound track, on the non-holding side) for the appropriate time; then turn toward the holding side through more than 180° to intercept the inbound track (or fly direct to the fix); then hold.",
          "SECTOR 2 — OFFSET (TEARDROP) ENTRY (the 70° sector on the holding side): at the fix, turn onto a heading 30° offset from the reciprocal of the inbound track, toward the holding side; fly for the appropriate time (1 min/1.5 min); then turn in the direction of the hold to intercept the inbound track.",
          "SECTOR 3 — DIRECT ENTRY (the remaining 180° sector): at the fix, turn in the direction of the hold and follow the pattern.",
          "Memory aid for a right-hand hold: draw the inbound track to the fix; the 70° line goes from the fix at 70° to the inbound course on the holding side. Arriving from within 110° behind on the non-holding side → parallel; from the 70° wedge on the holding side → teardrop; anything else → direct.",
          "Method: draw the holding fix with the inbound track; on the HOLDING side draw a line through the fix at 70° to the inbound track. Plot the aircraft's heading (as a line through the fix, arriving at it) — the sector it falls in gives the entry: the 110° sector opposite the holding side behind the inbound track → parallel; the 70° sector on the holding side → offset/teardrop; the remaining 180° → direct. Practise on the computer or a holding-entry diagram; aircraft arriving roughly along the inbound track always use a direct entry.",
          "RNAV holding: the FMS computes the entry and pattern (and may use distance legs); verify it is as published.",
        ],
      },
      {
        heading: "RNAV and RNP en-route",
        points: [
          "RNAV/RNP routes (PANS-OPS Part II Sect 7) require the navigation specification published for the route — e.g. RNAV 5 (±5 nm, 95 %) or RNAV 1/RNP 1 or RNP 2 — operator approval, approved equipment, current database, and for GNSS RAIM availability. The route is flown with the CDI at en-route scaling (±5 nm or as specified).",
          "Flight plan item 10 'R' (PBN approved) and item 18 'PBN/' codes indicate capability.",
          "Contingency: if navigation performance is lost (RAIM loss, unable RNP), inform ATC ('unable RNAV due equipment') and use conventional navigation as cleared.",
        ],
      },
    ],
    mustKnow: [
      "MEA = obstacle clearance + navaid reception + comms; MOCA = obstacle clearance only.",
      "Grid MORA: 1 000 ft above terrain ≤ 5 000 ft; 2 000 ft above higher terrain; Route MORA ±10 nm.",
      "Holding: right turns; 1 min ≤ 14 000 ft, 1.5 min above; bank 25° or rate 1 (lesser); timing from abeam the fix.",
      "Holding speeds: ≤ 14 000 ft 230 kt (A/B 170); ≤ 20 000 ft 240; ≤ 34 000 ft 265; above M0.83.",
      "Entries: parallel (110° sector), teardrop/offset (70°, 30° offset), direct (180°); ±5° flexibility.",
      "Outbound wind correction: 3 × drift; adjust outbound time for a 1-minute inbound leg.",
    ],
    traps: [
      "MOCA doesn't guarantee navaid reception.",
      "Starting the outbound timing over the fix when abeam is later.",
      "Teardrop offset is 30°, not 45°.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  "C.3.6": {
    intro:
      "The approach brings the aircraft from the en-route structure to a point from which it can land, with obstacle clearance at every stage (PANS-OPS Part I Section 4 and Part II). This section covers the arrival and STARs, the initial, intermediate, final and missed approach segments with their obstacle clearances, reversal and racetrack procedures, precision, APV and non-precision approaches (including RNAV/GNSS, LPV and baro-VNAV), CDFA, minima, the visual (circling) manoeuvring area, and the missed approach.",
    blocks: [
      {
        heading: "Arrival segment and STARs; terminal arrival altitude",
        points: [
          "The arrival segment links the en-route structure to the IAF. STARs (standard instrument arrivals) define routes with altitude/speed constraints, simplifying clearances and flow ('descend via the STAR').",
          "Protection: en-route criteria with MOC 300 m (984 ft) until the IAF; MSA/TAA give emergency safe altitudes within 25 nm.",
          "TAA (RNAV approaches with a 'T' or 'Y' bar arrangement): three areas — straight-in, left base and right base — each with a minimum altitude within 25 nm of the IAF (step-down arcs may be published). An aircraft within a TAA area may descend to the TAA altitude when cleared for the approach and then fly to the IAF.",
          "Arriving aircraft: obtain ATIS (runway, QNH, TL, weather), brief the approach, set navaids/FMS, check minima and missed approach, and the fuel for holding/diversion.",
        ],
      },
      {
        heading: "Initial and intermediate segments; reversal and racetrack procedures",
        points: [
          "§ Initial approach segment (IAF → IF)",
          "Manoeuvres to align the aircraft with the intermediate/final track; MOC 300 m (984 ft) in the primary area. May be a DME arc, a straight track, a dead-reckoning segment, or a reversal/racetrack procedure. Track changes at the IF normally not more than 120° (90° for precision approaches).",
          "§ Reversal procedures",
          "45°/180° procedure turn: outbound track, turn 45° away (for 1 min Cat A/B or 1 min 15 s Cat C/D/E from the start of the turn), then a 180° turn to intercept the inbound track. 80°/260° procedure turn: 80° turn, then 260° turn the other way back to the inbound track. Base turn: outbound on a specified track for a specified time/distance, then turn onto the inbound track (teardrop). Racetrack: like a holding pattern (outbound 1–3 minutes) to lose height; entries as for holding with a teardrop limited to 30°.",
          "Fly reversal procedures only as published (direction of turns, outbound times by category, maximum speeds) — the protected area is limited.",
          "§ Intermediate segment (IF → FAF/FAP)",
          "Blends the initial into the final approach: speed and configuration are adjusted; MOC 150 m (492 ft) in the primary area; should be straight, normally at least 5 nm long (optimum), and as flat as possible (gradient ≤ 5 %, or level before the FAF for a precision approach intercept of the glide path from below).",
        ],
      },
      {
        heading: "Final approach segment — precision, APV and non-precision",
        figureTopics: ["ILS"],
        points: [
          "§ Non-precision approach (NPA — 2D, lateral guidance only)",
          "VOR, NDB, LOC, VOR/DME, RNAV (GNSS) LNAV. Final segment starts at the FAF; MOC 75 m (246 ft) with a FAF (90 m without). Optimum descent gradient 5.2 % (3°, ~318 ft/nm); maximum normally 6.5 %. Step-down fixes may permit descent to lower altitudes. Ends at the MAPt (a fix, a facility, or a timed distance from the FAF). Minima: MDA/MDH, OCA/OCH.",
          "Alignment: straight-in if the final track is within 30° of the runway centreline (Cat A/B) or 15° (Cat C/D/E) and the descent gradient is acceptable; otherwise circling minima only.",
          "§ Continuous Descent Final Approach (CDFA)",
          "Fly the NPA final segment in a continuous descent on a constant ~3° path (using the published vertical profile/DME-altitude table or the FMS VPA) from the FAF, without levelling off at the MDA — avoiding the 'dive and drive' technique, which is a leading factor in CFIT. With CDFA the MDA is treated like a DA: if the required visual reference isn't obtained by the MDA (DDA — derived decision altitude, sometimes MDA + an increment), go around immediately without levelling off. Operators may require CDFA; minima may be higher (RVR) for non-CDFA NPAs.",
          "§ Approach with vertical guidance (APV — 3D, not meeting precision standards)",
          "LPV (SBAS — WAAS/EGNOS; DA can be as low as 200–250 ft), LNAV/VNAV (APV baro-VNAV: lateral GNSS + barometric vertical path — temperature limits apply because the path is affected by non-standard temperature; requires correct QNH — remote QNH not permitted). Minima: DA/DH.",
          "§ Precision approach (PA — 3D)",
          "ILS (CAT I/II/III), MLS, GLS (GBAS) and PAR. The final approach starts at the FAP (where the intermediate altitude intercepts the glide path); obstacle clearance is assessed using the obstacle assessment surfaces (OAS) and the collision risk model. Minima: DA/DH. Glide path normally 3°; ILS reference datum height 15 m (50 ft).",
          "GNSS approaches: RNP APCH (LNAV, LNAV/VNAV, LPV) — check RAIM prediction, database, the approach mode annunciation (CDI scaling ±0.3 nm on final), and the minima line for the capability.",
        ],
      },
      {
        heading: "Minima, visual references and the missed approach",
        points: [
          "Required visual reference to continue below DA/MDA (one or more, sufficient to assess position and rate of change): elements of the approach light system, the threshold or its markings/lights/identification lights, the visual glide slope indicator (PAPI/VASI), the touchdown zone or its markings/lights, runway edge lights, or other visual references accepted by the authority.",
          "If the visual reference is lost below DA/MDA (or the approach becomes unstable) — go around.",
          "§ Missed approach segment",
          "Begins at the MAPt (NPA) or DA (precision/APV) and ends at an altitude/height sufficient for a new approach, holding, or return to en-route flight. Three phases: INITIAL (from MAPt to the start of climb — no turns), INTERMEDIATE (climb at the nominal gradient — MOC 30 m), FINAL (to the point where a new approach, holding or en-route flight starts — MOC 50 m; turns permitted).",
          "Nominal missed approach climb gradient 2.5 % (higher gradients 3, 4 or 5 % may be published with correspondingly lower OCA/H). Initiate the missed approach no later than the MAPt; a missed approach started early must still overfly the MAPt (or follow the published track) before turning — protection assumes the track from the MAPt.",
          "Missed approach procedure must be briefed and flown as published (unless ATC instructs otherwise); if a missed approach is begun during a circling approach, make an initial climbing turn toward the landing runway and then fly the published missed approach for the instrument procedure flown.",
        ],
      },
      {
        heading: "Visual (circling) manoeuvring area",
        points: [
          "Circling is used when a straight-in landing is not possible (alignment/gradient, or landing on a different runway). The circling area is drawn by arcs around each runway threshold, with radii depending on aircraft category (speed); within it a MOC is applied above the highest obstacle.",
          "MOC in the circling area: Cat A 90 m (295 ft); B 90 m (295 ft); C 120 m (394 ft); D 120 m (394 ft); E 150 m (492 ft). Lowest OCH for circling: A 394 ft; B 492 ft; C 591 ft; D 689 ft; E 787 ft (above aerodrome elevation). Circling minimum visibility increases with category.",
          "Maximum IAS when circling: A 100 kt; B 135 kt; C 180 kt; D 205 kt; E 240 kt.",
          "Procedure: descend to the circling MDA, maintain visual contact with the runway environment, do not descend below MDA until the landing threshold is identified, the landing can be made, and the descent path will keep clear of obstacles; keep within the circling area; sectors may be prohibited (published). Wings level on final by about 300 ft above aerodrome elevation (stabilised).",
          "Visual manoeuvring using a prescribed track (VPT) may be published in mountainous areas.",
        ],
      },
    ],
    mustKnow: [
      "Segments: arrival → initial (MOC 300 m) → intermediate (150 m) → final (NPA 75 m with FAF) → missed approach (30/50 m, 2.5 %).",
      "Reversal: 45°/180° (1 min A/B, 1 min 15 s C/D/E), 80°/260°, base turn; racetrack.",
      "NPA: MDA/MDH, MAPt; optimum 5.2 % (3°), max 6.5 %; straight-in within 30° (A/B) / 15° (C/D/E).",
      "CDFA: constant ~3° path, MDA used like a DA — go around without levelling off.",
      "APV (LPV, LNAV/VNAV) and PA (ILS, GLS) use DA/DH. Baro-VNAV has temperature limits; no remote QNH.",
      "Missed approach from the MAPt/DA; nominal gradient 2.5 %.",
      "Circling MOC: A/B 295 ft, C/D 394 ft, E 492 ft; speeds A 100, B 135, C 180, D 205, E 240 kt.",
    ],
    traps: [
      "Turning before the MAPt on an early missed approach.",
      "Descending below the circling MDA before the threshold is identified and the landing assured.",
      "Using the straight-in minima for a circling approach.",
    ],
  },
};
