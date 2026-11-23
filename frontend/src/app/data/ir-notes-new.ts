// ============================================================================
// Instrument Rating — full study notes for IR sections with no CPL equivalent:
// C.2.5 ILS · I.8 Proximity & warning systems · I.11 Practical instrument
// flying (C.7.11–C.7.13) · C.5.1 Ground de-icing · C.5.7 CFIT · C.5.8
// Stabilised approach. Aligned to SACAA Appendix 2C to SA-CATS 61. Original
// wording. "§ " = sub-heading.
// ============================================================================

import type { AirLawSectionNote } from "./airlaw-notes";

export const IR_NOTES_NEW: AirLawSectionNote[] = [
  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "C.2.5",
    title: "Instrument Landing System (ILS)",
    intro:
      "The ILS is the standard precision approach aid: a localiser gives lateral guidance along the extended runway centreline, a glide path gives vertical guidance down a fixed slope, and markers or DME give range checks. This section covers its principles, presentation and interpretation, coverage and range, errors and accuracy, and the factors affecting range and accuracy — including the ILS categories and protection of the critical areas.",
    blocks: [
      {
        heading: "Principles — localiser, glide path, markers",
        figureTopics: ["ILS"],
        points: [
          "§ Localiser (LLZ)",
          "VHF 108.10–111.95 MHz on ODD tenths (108.10, 108.15, 108.30 …), 40 channels; horizontally polarised. The antenna array beyond the far end of the runway radiates two overlapping lobes along the centreline: the lobe on the LEFT of the approach (as seen by an approaching aircraft) is modulated at 90 Hz, the one on the RIGHT at 150 Hz.",
          "The receiver compares the DEPTH OF MODULATION (DDM — difference in depth of modulation) of the two tones: equal → on the centreline; 90 Hz predominant → aircraft left of centreline (fly right); 150 Hz predominant → right of centreline (fly left). Because it is a modulation comparison, not a phase/bearing measurement, the localiser defines a single course — its sensitivity is set so that full-scale deflection corresponds to a set width (about ±2.5° — typically 700 ft either side at the threshold).",
          "Ident: 3-letter Morse (often starting with I, e.g. IJB) at 1 020 Hz. Some localisers carry voice (ATIS).",
          "§ Glide path (GP / glideslope)",
          "UHF 329.15–335.0 MHz, paired automatically with the localiser frequency (tune the localiser, the GP is selected). The antenna is beside the runway about 300 m in from the threshold (abeam the touchdown zone), producing two lobes in the vertical plane: 90 Hz ABOVE the glide path, 150 Hz BELOW. Equal modulation = on the glide path.",
          "Glide path angle normally 3° (range 2.5–3.5°; steeper for obstacles, e.g. London City 5.5°). The ILS reference datum height (RDH/TCH — threshold crossing height) is about 50 ft (15 m).",
          "Because the GP is formed by reflection from the ground in front of the antenna, the terrain there must be flat and the area protected.",
          "§ Markers and DME",
          "Marker beacons: 75 MHz VHF fan beams pointing straight up, giving a fix at set points on the approach: OUTER MARKER (OM) ~4–7 nm from threshold — blue light, 400 Hz, dashes (– – –); MIDDLE MARKER (MM) ~3 500 ft (≈ 1 km) — amber light, 1 300 Hz, alternate dots and dashes (· – · –); INNER MARKER (IM, CAT II/III) — white light, 3 000 Hz, dots (· · · ·). Many ILSs now use a co-located DME (ILS/DME) instead of markers, or a locator NDB at the OM position.",
        ],
      },
      {
        heading: "Presentation and interpretation",
        points: [
          "The localiser drives the vertical bar of the CDI/HSI deviation scale (or the PFD localiser scale); the glide path drives the horizontal needle/glideslope pointer (diamond on a PFD). Each 'dot' on a conventional CDI = about 0.5° on the localiser (full scale ±2.5°) and about 0.15° on the glide path (full scale ±0.7°) — the ILS is about FOUR times more sensitive than a VOR.",
          "Localiser sensitivity is constant in ANGLE, so in distance the beam narrows as the aircraft approaches the runway — corrections must get smaller and smaller. One dot at 10 nm ≈ 500 ft off centreline; at the threshold ≈ 175 ft.",
          "Fly toward the needles: localiser needle left → steer left; glideslope needle below the centre → aircraft is ABOVE the glide path → increase the rate of descent. ('Needle shows where the beam is.')",
          "The OBS has NO effect on a conventional CDI when tuned to a localiser; on an HSI set the course arrow to the inbound localiser course for a correct picture. The TO/FROM indicator is not used.",
          "Back course: on the reciprocal side of the localiser the sensing is reversed on a CDI (but correct on an HSI with the FRONT course set). Back-course approaches have no glide path.",
          "Rate of descent to stay on a 3° glide path ≈ groundspeed × 5 fpm (e.g. GS 120 kt → 600 fpm). Height on the glide path ≈ 300 ft per nm from the threshold (318 ft/nm exact for 3°).",
          "Warning flags appear when a signal is lost or unreliable (or the receiver fails); some ILS ground monitors switch off the facility and send no ident if out of tolerance — always IDENTIFY the ILS before the approach.",
          "Autopilot/FD coupled approach: arm APP → LOC captures first, then G/S.",
        ],
      },
      {
        heading: "Coverage and range",
        figureTopics: ["ILS coverage"],
        points: [
          "Localiser coverage (ICAO): ±10° of the course to 25 nm; ±35° to 17 nm (from the antenna); vertically up to 7° above the horizontal (and from 1 000 ft above the threshold / 600 ft above the highest terrain within the coverage). Beyond ±35° there may be no usable signal or false indications.",
          "Glide path coverage: 8° either side of the localiser course to at least 10 nm; vertically from 0.45 × θ to 1.75 × θ above the horizontal (θ = GP angle — for 3°: from 1.35° to 5.25°).",
          "Only use the ILS within its coverage: intercept the localiser within the published sector and from below the glide path (normally capture the GS from below, at the published altitude).",
          "False glide paths: the GP antenna also produces false (side-lobe) glide paths at multiples of the angle — typically around 6° and 9° (and a reversed-sense lobe). Intercepting from below at the published altitude avoids them; cross-check height against DME/marker (e.g. ~ 1 400 ft at the OM).",
          "Interference: protected range/DOC; operations outside it (e.g. too high or far) may give unreliable indications.",
        ],
      },
      {
        heading: "Errors, accuracy and ILS categories",
        points: [
          "§ Facility performance categories (ground equipment accuracy/integrity)",
          "CAT I facility: guidance to a height of 200 ft (60 m) above the threshold. CAT II: guidance to 50 ft (15 m). CAT III: guidance with additional ground equipment accuracy to and along the runway surface.",
          "§ Operational categories (approach minima — also depend on aircraft equipment, crew qualification and aerodrome lighting)",
          "CAT I: DH not lower than 200 ft and visibility ≥ 800 m or RVR ≥ 550 m. CAT II: DH below 200 ft but not lower than 100 ft, RVR ≥ 300 m. CAT IIIA: DH lower than 100 ft or no DH, RVR ≥ 175 m. CAT IIIB: DH lower than 50 ft or no DH, RVR < 175 m but ≥ 50 m. CAT IIIC: no DH and no RVR limit (not operational).",
          "CAT II/III need a radio altimeter (DH set on the RA), special approval, auto-flight systems (autoland for CAT III), approved aerodrome lighting and procedures (low-visibility procedures).",
          "§ Errors",
          "Beam bends and scalloping: reflections from buildings, hangars, terrain and large aircraft distort the beam — small oscillations ('scalloping') or a steady bend.",
          "Multipath interference near the antennas — critical and sensitive areas.",
          "Glide path errors from snow/water changing the ground reflection in front of the GP antenna, and the false glide paths above.",
          "Equipment errors (ground monitor tolerances; airborne receiver).",
          "The glide path is not usable below the published minima — the beam becomes unreliable close to the ground (below the 'point of ILS reference' for CAT I).",
          "Accuracy (CAT I localiser at the threshold): course alignment within about ±10.5 m; GP angle within ±7.5 % of the nominal angle.",
        ],
      },
      {
        heading: "Factors affecting range and accuracy — critical and sensitive areas",
        points: [
          "ILS CRITICAL AREA: an area around the localiser and glide path antennas where vehicles and aircraft are EXCLUDED during all ILS operations, because their presence would cause unacceptable disturbance of the signal.",
          "ILS SENSITIVE AREA: a larger area, extending beyond the critical area, where the parking and movement of vehicles and aircraft is CONTROLLED during low-visibility (CAT II/III) operations — e.g. a large aircraft taxiing or holding near the localiser can deflect the beam for an aircraft on short final. ATC enforces CAT II/III holding points (further from the runway) during LVP.",
          "Other factors: terrain and buildings (beam bends), weather (heavy snow/standing water at the GP site), aircraft operating outside the coverage, overflying aircraft (momentary deflection), receiver/antenna faults, wrong frequency/ident (always identify), and interference outside the protected range.",
          "Cross-checks: published DME/altitude checks or OM crossing altitude, raw data monitoring of FD/autopilot, and the approach chart's glide-slope-out (LOC-only) minima if the GP fails.",
        ],
      },
    ],
    mustKnow: [
      "LOC 108.10–111.95 MHz odd tenths; 90 Hz left / 150 Hz right (approaching); DDM comparison; full scale ±2.5°.",
      "GP UHF 329–335 MHz, paired; 90 Hz above / 150 Hz below; normally 3°; TCH ~50 ft.",
      "Markers: OM blue 400 Hz dashes; MM amber 1 300 Hz dot-dash; IM white 3 000 Hz dots.",
      "ILS ~4× as sensitive as VOR; LOC dot ≈ 0.5°, GP dot ≈ 0.15°.",
      "ROD ≈ GS × 5; ~300 ft per nm on a 3° path.",
      "LOC coverage ±10° to 25 nm, ±35° to 17 nm; GP ±8° to 10 nm, 0.45θ–1.75θ.",
      "False glide paths at ~6°, 9° — intercept from below at the published altitude.",
      "CAT I DH ≥ 200 ft, RVR ≥ 550 m; CAT II DH 100–200 ft, RVR ≥ 300 m; CAT IIIA < 100 ft, RVR ≥ 175 m; CAT IIIB < 50 ft, RVR 50–175 m.",
      "Critical area: always protected; sensitive area: protected in LVP.",
    ],
    traps: [
      "Reverse sensing on a CDI when flying the back course.",
      "The OBS doesn't affect a localiser display on a basic CDI.",
      "Glideslope needle low means you are HIGH.",
      "Capturing a false glide path from above.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "I.8",
    title: "Proximity and Warning Systems",
    intro:
      "Controlled flight into terrain and mid-air collisions are the two hazards these systems are built to break. This section covers the Ground Proximity Warning System (GPWS) and its modes, the Terrain Awareness and Warning System (TAWS/Enhanced GPWS), the Traffic Alert and Collision Avoidance System (TCAS/ACAS) — principle, displays, traffic and resolution advisories, crew responsibilities and reduced surveillance — and the altitude alerting system.",
    blocks: [
      {
        heading: "Ground Proximity Warning System (GPWS) — design and principle",
        figureTopics: ["GPWS inputs & outputs", "GPWS control panel"],
        points: [
          "GPWS warns of an unsafe proximity to the ground using the RADIO ALTIMETER (height above terrain) and its rate of change, combined with barometric vertical speed, configuration (gear/flaps), ILS glideslope deviation and other inputs. It compares the aircraft's state with warning envelopes and gives aural and visual alerts.",
          "Inputs: radio altimeter, air data computer (barometric altitude and vertical speed), ILS receiver (glideslope deviation), gear and flap position, attitude (bank angle), and windshear detection (on later systems).",
          "Outputs: aural messages and red PULL UP / amber GPWS (or GND PROX) lights; inhibit switches for flap/gear (for non-normal landings) and glideslope cancel.",
          "Limitation: 'basic' GPWS looks only DOWN — it can't see a cliff ahead; warning time over steeply rising terrain may be only a few seconds.",
        ],
      },
      {
        heading: "GPWS indications and warnings — the modes",
        figureTopics: ["Mode 1 — excessive sink rate", "Mode 2 — excessive terrain closure", "Mode 3 — altitude loss after take-off", "Mode 4 — unsafe terrain clearance", "Mode 5 — below glideslope", "Mode 6 — excessive bank angle", "Mode 7 — windshear"],
        points: [
          "MODE 1 — Excessive descent rate (barometric) close to the ground: 'SINK RATE' (caution), then 'PULL UP' (warning).",
          "MODE 2 — Excessive terrain closure rate (radio altitude decreasing fast — e.g. flying toward rising ground): 'TERRAIN TERRAIN', then 'PULL UP'. (2A flaps not in landing configuration; 2B in landing configuration.)",
          "MODE 3 — Altitude loss after take-off or go-around (before reaching a safe height): 'DON'T SINK'.",
          "MODE 4 — Unsafe terrain clearance when not in the landing configuration: 4A gear up — 'TOO LOW GEAR'; 4B flaps not in landing position — 'TOO LOW FLAPS'; and at higher speeds 'TOO LOW TERRAIN'.",
          "MODE 5 — Excessive deviation BELOW the glideslope on an ILS approach: 'GLIDESLOPE' (soft then louder) — a caution; can be cancelled for a non-ILS approach.",
          "MODE 6 — Advisory call-outs: radio altitude call-outs ('ONE HUNDRED', 'FIFTY…TEN'), 'MINIMUMS', and excessive BANK ANGLE ('BANK ANGLE').",
          "MODE 7 — Reactive WINDSHEAR warning ('WINDSHEAR WINDSHEAR WINDSHEAR') when a severe performance-decreasing shear is detected (some aircraft also have predictive windshear from the weather radar).",
          "§ Response",
          "A 'PULL UP' or 'TERRAIN' warning in IMC or at night: respond IMMEDIATELY without hesitation — disconnect the autopilot, apply maximum thrust, pitch up to the stick shaker/PLI (about 20° initially), wings level, speed brakes retracted, do NOT change configuration until terrain clearance is assured; climb until the warning stops and safe altitude is regained. A caution ('SINK RATE', 'GLIDESLOPE') requires prompt correction of the flight path. Report the event.",
        ],
      },
      {
        heading: "Terrain Awareness and Warning System (TAWS) / Enhanced GPWS",
        figureTopics: ["EGPWS/TAWS terrain display & alerts", "EGPWS look-ahead warning envelope", "EGPWS terrain clearance floor"],
        points: [
          "TAWS (EGPWS) adds a FORWARD-LOOKING capability: the aircraft's GNSS/FMS position, track, speed and altitude are compared with an on-board worldwide TERRAIN and OBSTACLE DATABASE (and runway database).",
          "Look-ahead alerting: a caution envelope ('CAUTION TERRAIN', ~40–60 s ahead) and a warning envelope ('TERRAIN TERRAIN, PULL UP', ~20–30 s ahead) projected along the flight path — giving much earlier warning of rising terrain or obstacles than basic GPWS.",
          "Terrain Clearance Floor (TCF): alerts if the aircraft descends too low on approach relative to the nearest runway, even with gear and flaps down (closes the gap in basic GPWS mode 4) — 'TOO LOW TERRAIN'.",
          "Terrain display on the ND/MFD: colour-coded relative to aircraft altitude — dotted GREEN (terrain well below), YELLOW/AMBER (terrain near the aircraft's altitude — within about 500–2 000 ft), RED (terrain above or close to the aircraft's altitude), solid yellow/red when a caution/warning is active; magenta for unknown terrain (no data); peaks mode for high terrain.",
          "Classes (ICAO/FAA): Class A (transport, full GPWS modes + forward looking + display), Class B (smaller turbine aircraft, fewer modes).",
          "TAWS has dramatically reduced CFIT accidents. Its database must be current; GNSS position errors can degrade it.",
        ],
      },
      {
        heading: "TCAS/ACAS — principle of operation and displays",
        figureTopics: ["TCAS system architecture & displays", "TCAS directional antenna coverage", "TCAS traffic display explained", "TCAS traffic symbology (RA/TA/proximate)", "TCAS traffic on the navigation display"],
        points: [
          "TCAS (the equipment) / ACAS (the ICAO concept) works INDEPENDENTLY of ground ATC: the aircraft's TCAS INTERROGATES the transponders of nearby aircraft on 1 030 MHz and receives their replies on 1 090 MHz (like an airborne SSR). From reply timing it gets RANGE, from a directional antenna BEARING (approximate), and from Mode C/S ALTITUDE (and altitude rate). Mode S transponders also allow TCAS–TCAS co-ordination of manoeuvres.",
          "It tracks intruders and computes the time to closest point of approach (TAU = range ÷ closure rate) and the vertical miss distance; alerts are based mainly on TIME, not distance.",
          "TCAS I: traffic advisories only. TCAS II (version 7.1 — required for larger aircraft): traffic advisories AND resolution advisories in the VERTICAL plane only.",
          "Intruders: aircraft with Mode A only (no altitude) can generate TAs but not RAs; aircraft with no transponder are INVISIBLE to TCAS.",
          "§ Display symbols (on the ND or a combined TCAS/VSI)",
          "Own aircraft symbol in the centre with a 2 nm range ring. Other traffic (non-threat) — open WHITE/cyan diamond. Proximate traffic (within 6 nm and ±1 200 ft) — filled white/cyan diamond. TRAFFIC ADVISORY — filled AMBER/YELLOW circle. RESOLUTION ADVISORY — filled RED square. Each with a data tag: relative altitude in hundreds of feet (+ above, – below, e.g. '–07') and an arrow if climbing/descending at ≥ 500 fpm.",
        ],
      },
      {
        heading: "Traffic Advisory, Resolution Advisory and TCAS commands",
        figureTopics: ["TCAS protection volumes (TA/RA)", "TCAS TA/RA timing zones", "TCAS RA on the VSI"],
        points: [
          "§ Traffic Advisory (TA)",
          "Issued when an intruder could become a collision threat — typically about 20–48 seconds before the closest point of approach (depending on altitude). Aural: 'TRAFFIC, TRAFFIC'. Action: try to see the traffic (visual acquisition) — do NOT manoeuvre on a TA alone (except as required for normal flight); prepare for a possible RA.",
          "§ Resolution Advisory (RA)",
          "Issued when a collision threat exists — about 15–35 seconds before CPA. TCAS II commands a VERTICAL manoeuvre (or a restriction) to increase separation; between two TCAS aircraft the RAs are co-ordinated (one climbs, the other descends).",
          "Corrective RAs (require a change of vertical speed): 'CLIMB, CLIMB', 'DESCEND, DESCEND', 'LEVEL OFF, LEVEL OFF' (v7.1 replaces 'adjust vertical speed'), 'INCREASE CLIMB/DESCENT' (enhanced), 'CLIMB, CROSSING CLIMB', 'REVERSAL' commands ('CLIMB, CLIMB NOW' / 'DESCEND, DESCEND NOW').",
          "Preventive RAs: 'MONITOR VERTICAL SPEED' — keep the vertical speed out of the red arc on the VSI.",
          "'CLEAR OF CONFLICT' when the threat has passed — return promptly to the ATC clearance.",
          "The RA is displayed on the VSI (or PFD): a RED arc/band = vertical speeds to AVOID; a GREEN arc = the target (fly-to) range. Typical response: begin within 5 seconds, with about 0.25 g, to achieve ~1 500 fpm (2.5 s and 0.35 g for an increase or reversal).",
          "Inhibits: e.g. 'DESCEND' RAs are inhibited below about 1 100 ft AGL, 'INCREASE DESCENT' below 1 450 ft, all RAs below about 1 000 ft (TA only), and aural alerts below 500 ft — protecting against manoeuvres toward the ground. Some 'CLIMB' RAs inhibited when performance-limited.",
        ],
      },
      {
        heading: "Responsibility of the flight crew; reduced surveillance",
        points: [
          "§ Crew responsibilities",
          "FOLLOW THE RA promptly and accurately, even if it conflicts with an ATC instruction or with what you see (the 'other' traffic may not be the threat, and the other aircraft's TCAS is co-ordinating the opposite manoeuvre). Never manoeuvre in the OPPOSITE sense to an RA. Don't over-react (excessive deviation can cause a conflict with other traffic).",
          "Disconnect the autopilot (unless the aircraft has an AP/FD TCAS mode) and fly the RA manually; stall warning, windshear and GPWS warnings take PRECEDENCE over TCAS.",
          "Notify ATC as soon as possible: '[callsign], TCAS RA'. ATC then stops issuing instructions to that aircraft until the crew reports 'CLEAR OF CONFLICT, RETURNING TO [clearance]' (or 'TCAS RA completed'). Once the RA is followed, the controller is not responsible for separation from the conflicting aircraft for the duration of the RA.",
          "File a report (air safety report) after any RA.",
          "Don't use TA information alone for horizontal manoeuvres (bearing accuracy is poor).",
          "§ Principle of reduced surveillance",
          "In very dense traffic, to avoid saturating the 1 030/1 090 MHz frequencies and interfering with ATC SSR, TCAS reduces its interrogation rate and power ('interference limiting' / reduced surveillance) — it concentrates on nearby, relevant traffic and may not track distant aircraft; in the busiest areas its detection range is reduced (a design feature, not a fault).",
          "Modes: TA/RA (normal), TA ONLY (e.g. on engine failure, when performance cannot meet RAs, or during specific procedures — parallel approaches), STANDBY/XPDR (TCAS off, transponder on).",
        ],
      },
      {
        heading: "Altitude alert system",
        figureTopics: ["Altitude alerting", "Altitude alert module"],
        points: [
          "§ Function",
          "Warns the crew when approaching a selected altitude and when deviating from it after it has been captured — preventing altitude busts (a common cause of loss of separation). Uses the altitude selected on the MCP/altitude preselector and barometric altitude from the ADC.",
          "§ Altitude approach alert",
          "When the aircraft is about 900–1 000 ft from the selected altitude (climbing or descending toward it), a light illuminates and a momentary aural chime/tone sounds; the light goes out about 200–300 ft before reaching the altitude.",
          "§ Altitude deviation alert",
          "After capture, if the aircraft deviates by more than about ±200–300 ft from the selected altitude, the alert light (amber flashing) and aural warning activate until the aircraft returns within the limits or a new altitude is selected.",
          "Crew technique: call out 1 000 ft to go ('one thousand to level'); set the cleared altitude immediately after readback; cross-check both altimeters. It is required equipment for RVSM operations.",
        ],
      },
    ],
    mustKnow: [
      "GPWS uses radio altitude + baro VS + glideslope + configuration; modes 1 sink rate, 2 terrain closure, 3 altitude loss after take-off, 4 too low gear/flaps/terrain, 5 below glideslope, 6 call-outs/bank, 7 windshear.",
      "PULL UP: immediate max thrust, pitch to PLI/stick shaker, wings level, keep configuration.",
      "TAWS/EGPWS: database look-ahead + terrain clearance floor; terrain display green/yellow/red.",
      "TCAS interrogates 1 030, receives 1 090; uses time to CPA (tau); TCAS II: TA + vertical RA.",
      "TA 'TRAFFIC TRAFFIC' ~20–48 s; RA ~15–35 s; don't manoeuvre on a TA; FOLLOW the RA even against ATC; report 'TCAS RA'.",
      "Symbols: open diamond other, filled diamond proximate, amber circle TA, red square RA.",
      "Aircraft without a transponder are invisible to TCAS; Mode A only → TA, no RA.",
      "Stall, windshear and GPWS warnings take precedence over TCAS.",
      "Altitude alert ~1 000 ft before; deviation ±200–300 ft.",
    ],
    traps: [
      "Manoeuvring opposite to an RA because ATC said so.",
      "Turning to avoid traffic on a TA bearing.",
      "Basic GPWS cannot see terrain ahead — TAWS can.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "I.11",
    title: "Principles of Practical Instrument Flying",
    intro:
      "Instrument flying is the skill of controlling the aircraft by reference to instruments alone. It rests on the control-and-performance concept: set an attitude and power on the control instruments, then check the result on the performance instruments. This section covers control and performance instruments, the relationship between power, attitude and performance, scan techniques and their errors, the implications of instrument failure, full- and limited-panel manoeuvres on analogue instruments, and flying with an electronic flight display (Appendix 2C C.7.11–C.7.13).",
    blocks: [
      {
        heading: "Control instruments and performance instruments",
        points: [
          "§ Control instruments — show the immediate result of control inputs",
          "ATTITUDE indicator (pitch and bank — the master instrument) and POWER instruments (tachometer, manifold pressure, N1/EPR/torque).",
          "§ Performance instruments — show the resulting aircraft performance",
          "Altimeter, airspeed indicator, vertical speed indicator, heading indicator (HSI/DI), turn coordinator/turn-and-slip, and navigation instruments (CDI, DME). They lag slightly behind the control instruments.",
          "§ The control–performance method",
          "1. ESTABLISH an attitude and power setting on the control instruments that should give the desired performance. 2. TRIM to relieve control pressures. 3. CROSS-CHECK the performance instruments. 4. ADJUST attitude and/or power as needed — small, precise corrections — and re-trim.",
          "An alternative teaching (primary–supporting): for each manoeuvre, the PRIMARY instrument is the one giving the most pertinent information about the parameter being held (e.g. the altimeter is primary for pitch in level flight, the heading indicator primary for bank in straight flight, the ASI primary for power in level flight), and SUPPORTING instruments back it up.",
        ],
      },
      {
        heading: "Relationship between power/thrust, attitude and performance",
        points: [
          "Attitude + power = performance. For a given configuration and weight, a particular pitch attitude and power setting give a particular airspeed and vertical speed.",
          "In steady flight, PITCH controls the flight path (and airspeed) and POWER controls the energy — they are inter-related: raising the nose without adding power reduces airspeed; adding power without changing attitude produces a climb (and some speed increase).",
          "Typical pairs to learn for each aircraft: straight and level cruise; climb (attitude + climb power); descent at a set rate (e.g. 500 fpm at cruise speed: lower the nose ~ 2–3°, reduce power); approach (configuration + power for 90 kt and 500 fpm). Knowing these 'numbers' lets you set the right picture immediately and only fine-tune.",
          "Changing airspeed in level flight: adjust power, then progressively change pitch to hold altitude (and re-trim). Changing vertical speed at constant airspeed: change pitch AND power together.",
          "On the 'back of the drag curve' (slow flight, approach) power controls the rate of descent more directly; at cruise speed pitch is more effective for small altitude corrections.",
        ],
      },
      {
        heading: "Instrument cross-check (scan) techniques and common errors",
        points: [
          "§ Selected radial cross-check",
          "The eyes start at the ATTITUDE indicator, move out to one performance instrument, and come BACK to the attitude indicator before moving to the next — like spokes of a wheel. 80–90 % of the time is spent on the attitude indicator. The most widely taught method.",
          "§ Inverted-V cross-check",
          "Attitude indicator → turn coordinator → attitude indicator → VSI → attitude indicator: the eyes trace an inverted V between the AI and the two lower instruments — useful for checking bank and vertical speed.",
          "§ Rectangular cross-check",
          "Moving clockwise around the top row then the bottom row of the panel — gives equal attention to each instrument; slow to detect changes on the AI (used less, e.g. for cruise monitoring).",
          "§ Common cross-check errors",
          "FIXATION — staring at one instrument (e.g. the heading while altitude drifts). OMISSION — leaving an instrument out of the scan (e.g. the power or the trim, or not checking the ASI in a climb). EMPHASIS — relying too much on one instrument rather than combining information (e.g. chasing the VSI). Also: too slow a scan, failing to re-trim, over-controlling.",
          "§ Instrument interpretation",
          "Understand what each instrument tells you and its errors/lag (VSI lag, compass turning errors, the AI's small precession errors after turns). Cross-check pairs: AI pitch ↔ altimeter/VSI; AI bank ↔ turn coordinator/heading; power ↔ airspeed. Disagreement between instruments points to a failure.",
        ],
      },
      {
        heading: "Implications of failure of instruments",
        points: [
          "Recognition: an instrument disagreeing with the others, failure flags, the suction gauge low (vacuum AI/DI), the ammeter showing discharge (electric instruments), an unusual or frozen reading, or a slow drift of the AI in a 'turn' while the turn coordinator shows wings level.",
          "Vacuum failure (light aircraft): attitude indicator and heading indicator fail (gradually — dangerous); the turn coordinator (electric), ASI, altimeter, VSI and compass remain → LIMITED (PARTIAL) PANEL. Cover the failed instruments to avoid being misled.",
          "Pitot/static failures: see Air Data Instruments (ASI to zero or acting as an altimeter; static blockage → alternate static).",
          "Electrical failure: electric gyros (TC, some AIs), avionics, flaps, lights lost; load-shed and land.",
          "EFIS failures: switch display sources (reversion), use the standby instruments (standby attitude, ASI, altimeter, compass); know the standby power duration.",
          "Actions: maintain control first (partial panel), inform ATC ('limited panel'), ask for help (vectors, no-gyro approach), get to VMC if possible, and plan the nearest suitable aerodrome.",
        ],
      },
      {
        heading: "Full-panel manoeuvres (analogue instruments) and common errors",
        points: [
          "§ Straight and level",
          "Set the cruise attitude on the AI and cruise power; check altimeter (primary for pitch), heading indicator (primary for bank), ASI (primary for power); trim. Corrections: altitude errors < 100 ft — a half-bar-width pitch change; larger errors — about 1 bar width and a power adjustment. Common errors: chasing the VSI, failing to trim, heading wander from unnoticed small bank.",
          "§ Straight climbs and descents",
          "Climb: raise the nose to the climb attitude, then add climb power (or simultaneously), adjust to the climb speed, trim. Level off: start the level-off at about 10 % of the vertical speed before the target altitude (e.g. 50 ft before at 500 fpm), lower the nose to the level attitude, let speed build, then reduce power and trim. Descent: reduce power, lower the nose to hold speed (or a constant rate), trim; level off by adding power and raising the nose at the lead altitude.",
          "§ Turns",
          "Standard rate (rate 1) turn: 3°/s — bank ≈ TAS/10 + 7; check the turn coordinator at the rate-1 mark; hold altitude with slight back pressure (more pitch, small power increase at higher bank). TIMED turns: start the clock as the turn starts — 3° per second (e.g. 90° = 30 s); roll out when time expires (useful on partial panel). Turns to PREDETERMINED headings: roll out before the heading by about half the bank angle (e.g. 10° lead for 20° bank). COMPASS turns (partial panel): allow for turning errors — in South Africa (southern hemisphere) UNDERSHOOT SOUTH and OVERSHOOT NORTH by about the latitude (plus or minus half the bank), and read the compass only wings level.",
          "Steep turns (45°): roll in, add back pressure and power (load factor 1.41), watch the AI pitch and altimeter, roll out at half the bank angle before the heading, release back pressure and reduce power.",
          "Climbing and descending turns: combine the two techniques; bank usually limited (e.g. ≤ standard rate).",
          "Change of airspeed during turns: adjust power, maintain bank, adjust pitch to hold altitude; at lower speed the same rate needs less bank.",
          "§ Unusual attitudes and recovery",
          "Recognise: AI (if reliable) — extreme pitch/bank; otherwise the performance instruments — airspeed increasing rapidly + altitude decreasing = NOSE-LOW; airspeed decreasing + altitude increasing = NOSE-HIGH.",
          "NOSE-HIGH recovery: power ON (increase), nose DOWN (forward pressure) to reduce the angle of attack, bank toward the nearest horizon if needed to help the nose drop, then roll wings level and return to straight and level as airspeed recovers. (Aim: avoid a stall.)",
          "NOSE-LOW recovery: power OFF (reduce), roll WINGS LEVEL first (bank tightens a spiral and increases the load), then gently raise the nose to level flight (avoid over-stressing — don't pull before rolling), then power to cruise.",
          "Common errors: pulling back in a nose-low spiral before levelling the wings, not reducing power in a dive, mistaking the condition, over-controlling, failing to cross-check, disorientation.",
          "§ Instrument take-off",
          "Line up on the centreline, align/set the heading indicator to the runway heading, check the AI. Apply power; keep straight using the heading indicator (and outside cues until lost); at rotation speed set the take-off pitch attitude on the AI; maintain attitude and heading; positive climb on altimeter/VSI → gear up; climb at the published speed; transition fully to instruments without delay. Common errors: over-rotation, heading wander, failure to cross-check, somatogravic illusion (acceleration feels like a pitch-up).",
        ],
      },
      {
        heading: "Limited (partial) panel manoeuvres and common errors",
        points: [
          "Without the attitude and heading indicators, use: ALTIMETER, VSI and ASI for PITCH (the ASI shows pitch changes quickly — speed increasing = nose low); TURN COORDINATOR for BANK (wings level = no turn indication); MAGNETIC COMPASS for heading (allow for its errors); POWER as on full panel.",
          "Straight and level: hold the turn coordinator wings-level (zero rate), pitch via altimeter/ASI/VSI, small corrections, trim carefully (a well-trimmed aircraft largely flies itself).",
          "Climbs and descents: set power, then pitch to the target speed using the ASI; level off with the altimeter.",
          "Turns: rate-1 on the turn coordinator; use TIMED turns (3°/s) rather than the compass during the turn; or COMPASS turns allowing for turning errors (SA: undershoot south, overshoot north). Climbing and descending turns: rate-1 with appropriate power.",
          "Common errors: over-controlling on the turn coordinator, chasing the compass while it swings, neglecting trim, letting the speed run away in a descent.",
        ],
      },
      {
        heading: "Instrument flying with an electronic flight display (PFD)",
        points: [
          "The PFD presents attitude, airspeed (tape), altitude (tape), vertical speed and heading on one screen, with TREND VECTORS (airspeed trend ~6–10 s ahead, altitude trend) and often a flight path vector (FPV) and flight director.",
          "§ Scanning technique",
          "Selected radial cross-check still applies: centre on the ATTITUDE (the large artificial horizon) and radiate to the tapes and heading, but the compact layout allows a faster scan. Use the trend vectors to anticipate — e.g. lead the level-off when the altitude trend reaches the target.",
          "Common errors: FIXATION (on the trend vector, FD bars or the moving map), OMISSION (not checking the tapes' actual values, ignoring the engine display), EMPHASIS (over-reliance on the FD or automation), and the temptation to go 'heads-down' into the MFD.",
          "§ Basic manoeuvres",
          "Straight and level, straight climbs and descents, standard-rate turns (the turn-rate indicator/trend on the heading arc reaches the 3°/s mark), turns to predetermined headings (use the heading bug), timed turns and compass turns (on standby instruments), steep turns, and the instrument take-off — the same principles as with analogue instruments, flown with the attitude/power picture and confirmed by the tapes and trend vectors.",
          "Failures: PFD failure → reversionary mode (the MFD shows the PFD) or standby instruments (integrated electronic standby). AHRS failure → red X over attitude/heading → partial-panel technique with the standby. ADC failure → airspeed/altitude flags → use standby instruments.",
        ],
      },
    ],
    mustKnow: [
      "Control instruments: attitude + power. Performance: altimeter, ASI, VSI, heading, turn coordinator, nav.",
      "Establish → trim → cross-check → adjust. Attitude + power = performance.",
      "Scans: selected radial (hub on the AI), inverted-V, rectangular. Errors: fixation, omission, emphasis.",
      "Rate 1 = 3°/s; bank ≈ TAS/10 + 7; roll-out lead ≈ ½ bank; level-off lead ≈ 10 % of VS.",
      "Compass turns in SA: undershoot south, overshoot north.",
      "Nose-high: power up, nose down. Nose-low: power off, wings level FIRST, then raise the nose.",
      "Partial panel: pitch from altimeter/ASI/VSI, bank from turn coordinator, heading from compass/timed turns.",
    ],
    traps: [
      "Pulling back before levelling the wings in a nose-low spiral.",
      "Chasing the VSI (lag) instead of setting an attitude.",
      "Reading the compass during a turn.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "C.5.1",
    title: "Ground De-icing",
    intro:
      "Even a thin layer of frost, ice or snow on the wings can prevent an aeroplane from flying. The clean-aircraft concept forbids take-off with any contamination on critical surfaces. This section covers icing conditions on the ground, the ground de-icing and anti-icing process, the fluid types and their holdover times.",
    blocks: [
      {
        heading: "Icing conditions on the ground and the clean-aircraft concept",
        points: [
          "Ground icing occurs with frost (clear nights, surface temperature below 0 °C), freezing fog, freezing drizzle/rain, snow, sleet, and with 'cold-soaked' wings (after a long high-altitude flight the fuel and wing stay well below 0 °C, so frost/ice forms even when OAT is above freezing, especially under the wing near the fuel tanks — clear ice that is hard to see).",
          "Effects of contamination: even frost with the roughness of medium sandpaper can reduce lift by up to ~30 % and increase drag by ~40 %, raise the stall speed, reduce the stalling angle of attack (stall before the stall warning activates), cause roll-off at lift-off, increase mass, jam controls, and block sensors and engine intakes (ice ingestion).",
          "CLEAN-AIRCRAFT CONCEPT (CAR Part 91 / ICAO): no person may take off with frost, ice or snow adhering to the wings, control surfaces, propellers, engine inlets or other critical surfaces (except where the AFM allows thin frost on specific areas, e.g. under-wing frost limited by the manufacturer). The PIC is responsible for ensuring the aircraft is clean.",
        ],
      },
      {
        heading: "Ground de-icing and anti-icing — methods",
        points: [
          "DE-ICING: removing frost, ice or snow already present — with heated fluid (usually Type I, heated to ~60–80 °C, sprayed under pressure), mechanical means (brushes, squeegees for snow), hot air, or hangarage. Heat does most of the work.",
          "ANTI-ICING: applying fluid to a CLEAN surface to prevent further accumulation for a limited time (the holdover time) — usually thickened Type II, III or IV fluid applied cold or slightly heated.",
          "ONE-STEP procedure: de-icing and anti-icing in a single application of heated fluid (when conditions are light). TWO-STEP procedure: first de-ice (heated, diluted fluid), then within ~3 minutes apply anti-icing fluid (thickened) before the first step refreezes — gives longer protection.",
          "Precautions: no fluid into engine intakes, APU inlet, pitot/static ports, cockpit windows (vision), air-conditioning (fumes); engines/APU per procedure; spray symmetrically; check the control surfaces move freely; post-application check.",
          "Checks: the PRE-TAKE-OFF CHECK by the crew (within the holdover time, from the cabin/cockpit — visual inspection of representative surfaces); if in doubt or the holdover time is exceeded, a PRE-TAKE-OFF CONTAMINATION CHECK (outside, close inspection) or return for de-icing. Communication: the de-icing crew reports the fluid type, mix, time of start of the final step ('anti-icing code', e.g. 'TYPE II/75 at 0915, post-de-icing check complete').",
        ],
      },
      {
        heading: "De-icing and anti-icing fluids",
        points: [
          "Fluids are glycol-based (ethylene or propylene glycol) mixed with water; they lower the freezing point. SAE/ISO types:",
          "TYPE I: low viscosity, UNTHICKENED, minimum 80 % glycol concentrate; usually heated and diluted; used mainly for DE-ICING; SHORT holdover time; colour ORANGE.",
          "TYPE II: thickened (pseudoplastic — viscosity drops under shear), minimum 50 % glycol; stays on the wing at rest and shears off during the take-off roll (for aircraft with rotation speeds above about 100 kt); longer holdover; colour colourless/pale yellow.",
          "TYPE III: thickened, designed for slower aircraft (rotation speeds ~60 kt and above — commuters, turboprops) — shears off at lower speed; colour bright yellow.",
          "TYPE IV: like Type II but with LONGER holdover time; colour GREEN.",
          "Concentrations are given as fluid/water mix (e.g. 100/0, 75/25, 50/50). Lower concentration → shorter holdover. The fluid's freezing point must be at least 10 °C below OAT (Type I) / 7 °C (Types II–IV) — the 'buffer'.",
          "Fluid residue (dried thickened fluid) can rehydrate and freeze in control-surface gaps — inspect and clean periodically.",
        ],
      },
      {
        heading: "Holdover times",
        points: [
          "HOLDOVER TIME (HOT): the estimated time the anti-icing fluid will prevent the formation of frost or ice and the accumulation of snow on the protected surfaces. It STARTS at the beginning of the final (anti-icing) step and ends when the fluid is expected to fail (lose its ability to absorb precipitation — it becomes slushy and ice forms).",
          "HOT tables (published annually by authorities/manufacturers) give times for each fluid type and concentration, OAT band and type/intensity of precipitation (frost, freezing fog, snow, freezing drizzle, light freezing rain, rain on cold-soaked wing). For heavy snow, ice pellets, hail and moderate/heavy freezing rain there are generally NO holdover times.",
          "HOTs are only guidelines: they are reduced by heavy precipitation, high wind or jet blast, wet snow, aircraft skin colder than OAT, and fluid dilution. Times are typically: Type I — minutes; Type II — tens of minutes; Type IV — up to ~1–2 hours in frost but much less in snow.",
          "If the HOT is exceeded or fluid failure is seen (loss of gloss, ice/snow accumulating on the fluid, slushy appearance) → do not take off; repeat de-icing/anti-icing.",
          "Taxi with care (longer taxi times eat into the HOT); avoid taxiing behind aircraft (jet blast blows snow onto wings); consider engine anti-ice and ice-shedding run-ups per the AFM.",
        ],
      },
    ],
    mustKnow: [
      "Clean-aircraft concept: no take-off with frost, ice or snow on critical surfaces.",
      "Even frost can cut lift ~30 % and raise stall speed; stall may occur before stall warning.",
      "De-icing removes (heated Type I); anti-icing protects (Types II/III/IV). One-step vs two-step (second within ~3 min).",
      "Type I orange, unthickened, short HOT; II thickened (Vr > 100 kt); III yellow (slower aircraft); IV green, longest HOT.",
      "Holdover time starts at the beginning of the final step; no HOT for heavy snow/moderate-heavy freezing rain/hail.",
      "Pre-take-off check within HOT; if exceeded or fluid failure → re-treat.",
    ],
    traps: [
      "Holdover time starts at the START of the final application, not when it ends.",
      "Cold-soaked wings can ice up with OAT above 0 °C.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "C.5.7",
    title: "Controlled Flight into Terrain (CFIT)",
    intro:
      "CFIT is when an airworthy aircraft under the control of a qualified crew is flown unintentionally into terrain, obstacles or water, usually with no prior awareness of the danger. It has been one of the largest killers in aviation. This section covers the definition and contributing factors, and the means of avoidance.",
    blocks: [
      {
        heading: "Definition and contributing factors",
        points: [
          "Definition: an accident in which an AIRWORTHY aircraft, under the CONTROL of the flight crew, is flown unintentionally into terrain, obstacles or water, usually with no prior awareness by the crew of the impending collision.",
          "Typical circumstances: about two-thirds occur during approach and landing (especially non-precision approaches), in IMC or at night, in mountainous terrain, often near the destination, frequently with a 'step-down' approach, and with poor ATC/crew communication.",
          "Contributing factors: loss of SITUATIONAL AWARENESS (vertical and horizontal position), wrong altimeter setting or unit (hPa vs inHg, QFE vs QNH), misunderstood clearances, descending below minimum safe altitudes (MSA, MOCA, MDA) without visual references, non-stabilised approaches, black-hole illusion at night, fatigue, high workload, poor CRM, automation/mode errors (wrong FMS waypoint, wrong vertical mode), inadequate charts or databases, lack of terrain awareness equipment, pressure to land ('get-home-itis'), and continuing VFR into IMC.",
        ],
      },
      {
        heading: "Avoidance",
        points: [
          "§ Equipment",
          "TAWS/EGPWS (forward-looking terrain alerting) — fitted and SERVICEABLE, database current, never inhibited without reason; respond immediately to warnings. Radio altimeter, current charts and navigation databases, GNSS/RNAV with vertical guidance (APV/LPV) to replace dive-and-drive non-precision approaches.",
          "§ Procedures",
          "Brief every approach: minimum safe/sector altitudes, terrain on the chart, the approach profile, minima and missed approach. Know and respect MSA/MEA/MOCA/MORA and the minimum vectoring altitude; question any clearance that takes you below them ('confirm altitude').",
          "Fly STABILISED approaches; prefer precision or APV approaches and the Continuous Descent Final Approach (CDFA) technique on non-precision approaches (constant ~3° path instead of 'dive and drive').",
          "Cross-check altitude against distance (DME/GNSS table: ~300 ft per nm on a 3° path); cross-check altimeters and the correct setting (QNH, units); apply cold-temperature corrections to minimum altitudes.",
          "Go around if not stabilised, if visual references are lost below MDA/DH, or if in doubt.",
          "Monitor automation: verify FMS waypoints, vertical modes and constraints; call out deviations.",
          "§ Crew and organisation",
          "Good CRM: pilot monitoring calls out altitudes ('1 000 above', 'minimums'), challenges deviations; sterile cockpit below 10 000 ft; fatigue management; training (CFIT awareness, TAWS escape manoeuvre); operator policies supporting go-arounds without blame.",
          "VFR pilots: avoid flying into IMC, plan safe altitudes over terrain, keep clear of cloud on hilltops, turn back early.",
        ],
      },
    ],
    mustKnow: [
      "CFIT: airworthy aircraft under control flown unintentionally into terrain/water/obstacles, crew unaware.",
      "Most occur on approach (non-precision), IMC/night, mountainous terrain.",
      "Causes: loss of situational awareness, wrong altimeter setting, below MSA/MDA, unstabilised approach, automation errors.",
      "Avoid: TAWS (respond immediately), brief terrain/MSA, stabilised approaches/CDFA, altitude-distance cross-checks, go-around when in doubt, CRM call-outs.",
    ],
    traps: [
      "CFIT involves a serviceable aircraft — it's a situational-awareness accident, not a technical failure.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "C.5.8",
    title: "Stabilised Approach",
    intro:
      "Unstable approaches are a leading factor in approach-and-landing accidents (runway excursions, hard landings, CFIT). A stabilised approach is one flown on the correct path with the aircraft fully configured, at a steady speed and rate of descent, from a defined height to touchdown. This section covers the requirements and the advantages.",
    blocks: [
      {
        heading: "Requirements for a stabilised approach",
        points: [
          "Stabilisation heights (typical operator/industry criteria): by 1 000 ft above aerodrome elevation in IMC, and by 500 ft in VMC, the aircraft must be stabilised. If not — GO AROUND (mandatory).",
          "§ Criteria (all must be met)",
          "On the correct flight path (lateral and vertical) — within one dot of the localiser/glideslope, or on the published/visual path (PAPI).",
          "Only small changes in heading/pitch are needed to maintain the path.",
          "Airspeed not more than VREF + 20 kt indicated (and not less than VREF).",
          "Aircraft in the correct LANDING CONFIGURATION (gear down, landing flap set).",
          "Sink rate not greater than 1 000 fpm; if an approach requires more than 1 000 fpm, a special briefing is required.",
          "Power setting appropriate for the configuration and not below the minimum specified in the AFM (engines spooled up on jets).",
          "All briefings and checklists completed.",
          "Specific approaches: ILS within one dot; circling — wings level on final by 300 ft above aerodrome elevation; non-precision — CDFA on a constant path.",
          "Below the stabilisation height, continuing an unstable approach is not permitted — a go-around is always an acceptable outcome.",
        ],
      },
      {
        heading: "Advantages",
        points: [
          "Predictable, consistent approach — reduced workload in the final stages, allowing the crew to monitor rather than correct.",
          "Correct touchdown point and speed → landing within the planned distance; fewer runway excursions/overruns, long/fast landings, and hard landings or tail strikes.",
          "Better terrain and obstacle clearance (reduced CFIT risk) — no last-minute 'dive and drive'.",
          "Engines spooled up → immediate go-around thrust available; the aircraft is in a known energy state.",
          "Easier recognition of deviations (any change stands out) and a clear go-around decision point.",
          "Improved passenger comfort and lower fuel consumption/noise (continuous descent).",
        ],
      },
    ],
    mustKnow: [
      "Stabilised by 1 000 ft IMC / 500 ft VMC, else go around.",
      "Criteria: on path (≤ 1 dot), speed VREF to VREF + 20, landing configuration, sink ≤ 1 000 fpm, appropriate power, checklists complete.",
      "Circling: wings level on final by 300 ft.",
      "Advantages: lower workload, correct touchdown, fewer excursions/CFIT, go-around thrust ready.",
    ],
    traps: [
      "A go-around is always an acceptable outcome — 'pressing on' below the gate is not.",
    ],
  },
];
