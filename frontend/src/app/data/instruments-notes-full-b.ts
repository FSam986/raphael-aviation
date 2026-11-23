// ============================================================================
// SACAA CPL — FLIGHT INSTRUMENTS: FULL STUDY TEXT (A.7.5 – A.7.9)
// Aligned to Appendix 2.0A to SA-CATS 61, subject A.7. Original wording.
// ============================================================================

import type { AirLawSectionNote } from "./airlaw-notes";

export const INSTRUMENTS_NOTES_FULL_B: AirLawSectionNote[] = [
  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.7.5",
    title: "Air Temperature Indicators",
    intro:
      "Outside air temperature is needed for TAS, density altitude, performance and engine settings — but a moving aircraft's thermometer reads warm because the air is compressed and heated against the probe. This section covers the sensors, the ram (kinetic) temperature rise and the recovery factor, and the relationship between SAT, RAT and TAT.",
    blocks: [
      {
        heading: "Sensors",
        figureTopics: ["Bimetallic strip (Invar/brass)", "Bimetallic-helix thermometer", "Windscreen direct-reading OAT gauge", "TAT probe construction", "TAT probe installed", "Aspirated TAT probe"],
        points: [
          "§ Direct-reading (bimetallic) thermometer",
          "Light aircraft: a probe through the windscreen with a bimetallic helix — two metals with different expansion rates (e.g. Invar and brass) bonded together; as temperature changes the helix winds/unwinds and turns a pointer. Simple, no power needed; affected by sun heating and ram rise.",
          "§ Electrical resistance thermometer",
          "A platinum (or nickel) wire whose resistance rises with temperature, in a Wheatstone bridge or ratiometer circuit — accurate, can be remote-reading; needs electrical power. Used in TAT probes.",
          "§ Total air temperature (TAT) probe",
          "An aerodynamically shaped probe projecting into the airflow; air is brought nearly to rest around the sensing element, so it measures close to TAT (recovery factor near 1.0). Features: de-icing heater (with design to minimise heater error), and in many probes ASPIRATION — engine bleed air ejected through the probe draws airflow over the element on the ground and at low speed, so it reads correctly when stationary.",
          "Thermocouples (two dissimilar metals generating a voltage) are used for engine temperatures, not usually for OAT.",
        ],
      },
      {
        heading: "Ram rise and recovery factor",
        figureTopics: ["Ram rise — SAT, RAT & TAT vs speed", "Temp-rise correction on the flight computer"],
        points: [
          "When moving air is brought to rest against a probe, its kinetic energy becomes heat — compression and friction raise its temperature. This is the RAM (kinetic) RISE.",
          "Full ram rise (°C) ≈ (TAS in kt ÷ 100)². At 100 kt ≈ 1 °C; 300 kt ≈ 9 °C; 500 kt ≈ 25 °C. In Mach terms: TAT = SAT × (1 + 0.2 M²), temperatures in kelvin.",
          "A real probe doesn't bring all the air completely to rest — it captures only a fraction of the rise. That fraction is the RECOVERY FACTOR (K), typically 0.75–0.9 for simple probes and about 0.95–1.0 for TAT probes.",
          "Recovery factor = (measured temperature – SAT) ÷ (TAT – SAT).",
          "So: RAT = SAT + K × ram rise; TAT = SAT + ram rise.",
        ],
      },
      {
        heading: "SAT, RAT and TAT",
        figureTopics: ["Kelvin scale with SAT/TAT example"],
        points: [
          "SAT (static air temperature) = OAT: the temperature of the undisturbed air — needed for TAS, density altitude and performance.",
          "RAT (ram air temperature): what a real probe measures = SAT + a percentage of the ram rise (K < 1).",
          "TAT (total air temperature): SAT + 100 % of the ram rise — the temperature if the air were brought completely to rest adiabatically. A TAT probe (K ≈ 1) reads TAT.",
          "Order: SAT ≤ RAT ≤ TAT. At zero speed they are equal.",
          "Example: TAS 400 kt, SAT –30 °C. Ram rise = 4² = 16 °C. TAT = –14 °C. Probe with K = 0.8 reads RAT = –30 + 12.8 = –17.2 °C.",
          "Reverse (what the exam usually asks): TAT –10 °C at M 0.8. TAT(K) = 263.15; SAT(K) = 263.15 ÷ (1 + 0.2 × 0.64) = 263.15 ÷ 1.128 = 233.3 K = –39.9 °C.",
          "The air data computer computes SAT from TAT and Mach for display and for TAS. On the navigation computer the temperature-rise or Mach scales do the same.",
          "Using the indicated (RAT/TAT) temperature instead of SAT overestimates TAS and density altitude errors in performance.",
        ],
      },
    ],
    mustKnow: [
      "Sensors: bimetallic (direct reading), resistance (platinum, remote), TAT probe (aspirated, heated).",
      "Ram rise ≈ (TAS/100)² °C; TAT = SAT(1 + 0.2M²) in kelvin.",
      "Recovery factor K = fraction of ram rise sensed; RAT = SAT + K·rise; TAT = SAT + rise.",
      "SAT ≤ RAT ≤ TAT. Use SAT (OAT) for TAS and performance.",
    ],
    traps: [
      "Using °C in the Mach formula — must be kelvin.",
      "Thinking TAT is the lowest temperature — it's the highest.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.7.6",
    title: "Autopilot",
    intro:
      "An autopilot flies the aircraft automatically by moving the control surfaces to hold an attitude, heading, altitude or track. This section covers the principle (sensing, computing, servo actuation, feedback), the types (single-, two- and three-axis), and the modes — lateral (roll), longitudinal (pitch) and combined. (Note: the appendix wording swaps 'lateral (pitch)' and 'longitudinal (roll)'; in standard usage LATERAL modes act in roll and LONGITUDINAL modes in pitch.)",
    blocks: [
      {
        heading: "General principles of operation",
        figureTopics: ["Closed-loop control principle", "Autopilot servo loop → control surface", "Autopilot inner & outer loops"],
        points: [
          "An autopilot is a closed-loop (feedback) control system. Elements: SENSORS detect the aircraft's state (attitude gyro/AHRS, rate gyros, compass, ADC, nav receivers); a COMPUTER compares it with the desired state and produces an error signal; SERVOS (actuators) move the control surfaces; FEEDBACK (follow-up) reports the surface movement so the servo stops at the right deflection.",
          "Inner loop: stabilisation — holds the aircraft's attitude against disturbances (fast, small corrections from attitude and rate sensors).",
          "Outer loop: guidance — holds a path (heading, altitude, radial, glideslope) by commanding changes of attitude to the inner loop.",
          "Servos: electric (or electro-hydraulic) motors connected to the control cables/linkages through a clutch, or in larger aircraft driving the hydraulic actuators. Series actuators move the surface without moving the pilot's controls (yaw damper); parallel actuators move the controls too.",
          "Trim: an automatic trim system relieves sustained servo loads (to avoid a large out-of-trim force being suddenly released at disengagement); an out-of-trim warning alerts the crew.",
          "Engage interlocks: the autopilot won't engage unless conditions are met (gyros erect, no failures, trim within limits). Disengagement: by the pilot (a button on the control wheel, giving an aural/visual warning), by a failure, or by overpowering the servo (on some types). Always be ready to take over and fly manually.",
          "Authority limits: maximum bank (e.g. 25–30°), pitch and rates, so a failure can't put the aircraft into a dangerous attitude before the pilot intervenes.",
        ],
      },
      {
        heading: "Types — single, two and three axis",
        points: [
          "Single-axis: controls ROLL only (ailerons) — a 'wing leveller'; may add heading hold and NAV tracking. Common in light aircraft.",
          "Two-axis: ROLL and PITCH (ailerons and elevator) — adds altitude hold, vertical speed, glideslope. Most general-aviation and many transport autopilots.",
          "Three-axis: roll, pitch and YAW (adds rudder) — coordinated turns and yaw damping. (A yaw damper on its own is often a separate function, active even when the autopilot is off.)",
          "Autothrottle (autothrust) controls the engines (speed/thrust) — sometimes counted as a further axis.",
        ],
      },
      {
        heading: "Lateral (roll) modes",
        figureTopics: ["Autopilot/FD mode control panel (MCP)"],
        points: [
          "Wing levelling / roll attitude hold (basic mode): holds wings level or the bank at engagement.",
          "Heading select (HDG SEL): turns onto and holds the heading set with the heading bug, using a limited bank angle.",
          "Heading hold: holds the existing heading.",
          "VOR/LOC (NAV): intercepts and tracks a VOR radial or localiser course selected on the HSI, with automatic drift correction. Over the VOR (cone of confusion) the mode briefly holds heading ('over-station' sensing).",
          "LNAV: follows the FMS lateral flight plan.",
          "Back course: on some aircraft, flying the localiser back beam with reversed sensing.",
        ],
      },
      {
        heading: "Longitudinal (pitch) modes",
        points: [
          "Pitch attitude hold (basic mode): holds the pitch at engagement.",
          "Altitude hold (ALT HOLD): holds the pressure altitude at engagement (from the ADC).",
          "Altitude select / capture (ALT SEL/ALT ACQ): climbs or descends and levels off automatically at the selected altitude.",
          "Vertical speed (V/S): holds a selected rate of climb or descent.",
          "IAS/Mach hold (speed on elevator — FLCH/LVL CHG): adjusts pitch to hold a speed while the thrust is fixed (climb or descent).",
          "Glideslope (G/S): captures and tracks the ILS glideslope.",
          "VNAV: follows the FMS vertical profile.",
          "With pitch modes, the autothrottle (if fitted) controls speed; without it, the pilot must manage power — e.g. in ALT HOLD a power reduction leads to a speed decay toward the stall.",
        ],
      },
      {
        heading: "Combined modes (roll and pitch)",
        figureTopics: ["Flight mode annunciator (FMA) explained", "PFD autopilot/FMA annunciations", "Autoland approach sequence"],
        points: [
          "Approach (APP): arms both LOC (roll) and G/S (pitch) — captures the localiser first, then the glideslope, tracking both to the decision height (or to touchdown with autoland, which adds flare, align and roll-out with radio altimeter input).",
          "Go-around (GA/TOGA): wings level (or track hold) and a fixed pitch-up attitude/speed, with go-around thrust — the same as the FD go-around mode.",
          "Take-off (TO): pitch to a set attitude/speed and runway heading/track.",
          "LNAV + VNAV together fly the complete FMS route in three dimensions.",
          "§ Flight mode annunciator (FMA)",
          "At the top of the PFD (or a separate panel), shows the autothrottle, roll and pitch modes: ACTIVE modes in green, ARMED modes in white/cyan below, plus the AP/FD status. Always read the FMA after any mode change — the most common automation error is believing a mode is engaged when it isn't.",
          "§ Yaw damper",
          "Senses yaw rate (rate gyro) and applies small rudder inputs (series actuator) to damp DUTCH ROLL (a coupled yaw–roll oscillation, worst in swept-wing aircraft at high altitude). A washout filter stops it opposing intended steady turns.",
        ],
      },
    ],
    mustKnow: [
      "Closed loop: sensors → computer → servos → surfaces, with feedback. Inner loop stabilisation, outer loop guidance.",
      "Single axis = roll (wing leveller); two axis = roll + pitch; three axis = + yaw.",
      "Lateral (roll) modes: wings level, HDG, NAV/LOC, LNAV. Longitudinal (pitch) modes: pitch hold, ALT HOLD, ALT capture, V/S, speed, G/S, VNAV.",
      "Combined: APP (LOC + G/S), GA, TO, LNAV/VNAV.",
      "FMA: green active, white/cyan armed — check after every change.",
      "Yaw damper damps Dutch roll (series actuator, washout).",
      "Auto-trim prevents a large out-of-trim force at disconnect.",
    ],
    traps: [
      "Lateral = ROLL, longitudinal = PITCH (the appendix text swaps the brackets).",
      "In ALT HOLD without autothrottle the speed is not protected.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.7.7",
    title: "Magnetism",
    intro:
      "The magnetic compass works because the Earth behaves like a giant magnet — but the field's strength and direction vary over the globe and over time, and the aircraft has its own magnetism. This section covers terrestrial magnetism (horizontal and vertical components, directive force, dip, variation and their changes), aircraft magnetism (hard iron components P, Q and coefficients A, B, C, the compass swing and deviation), turning and acceleration errors, and the direct-reading magnetic compass, its tests and compensation.",
    blocks: [
      {
        heading: "Terrestrial magnetism — components, directive force and dip",
        figureTopics: ["Earth as a tilted bar magnet", "Magnetic dip — H, Z & T components", "Dip varies with magnetic latitude", "Bar magnet field"],
        points: [
          "The Earth's field resembles that of a bar magnet inclined about 11° to the spin axis, with its 'blue' (south-seeking) pole under the north magnetic pole region. Lines of force leave the southern hemisphere, run north, and re-enter in the northern hemisphere.",
          "At any point the total field (T) is inclined to the horizontal. It is resolved into a HORIZONTAL component H (which aligns the compass — the directive force) and a VERTICAL component Z.",
          "H = T cos(dip); Z = T sin(dip); tan(dip) = Z ÷ H.",
          "§ Dip (inclination)",
          "The angle between the total field and the horizontal. Zero at the magnetic equator (aclinic line), 90° at the magnetic poles. Isoclinals join places of equal dip. In the southern hemisphere the field points UP out of the Earth — the north-seeking end of a free magnet tilts UPWARD (the south end dips).",
          "§ Effect of latitude",
          "Moving from the magnetic equator toward a magnetic pole: dip increases, Z increases, H DECREASES (to zero at the pole). So the compass's directive force weakens toward the poles; when H falls below about 6 microtesla (roughly within 1 000–1 200 nm of the magnetic poles) the compass becomes unreliable/unusable.",
          "Isodynes: lines of equal H (directive force).",
          "§ Variation (declination)",
          "The angle between true and magnetic north — named east or west. Isogonals: lines of equal variation; agonic line: zero variation. (See also A.9.2.) South Africa: westerly variation ~18–26°.",
        ],
      },
      {
        heading: "Changes in the Earth's field",
        figureTopics: ["Variation (true vs magnetic meridian)"],
        points: [
          "Secular change: the slow, long-term movement of the magnetic poles — variation changes by a few minutes of arc per year (the annual change is printed on charts; charts are periodically reissued with updated isogonals; runway designators are renumbered when the change accumulates).",
          "Annual change: a small yearly cycle.",
          "Diurnal (daily) change: small daily variations from solar heating of the ionosphere — a few minutes of arc.",
          "Irregular (transient) changes: magnetic storms caused by solar activity (sunspots, solar flares) — can be large and sudden, also disturbing HF radio.",
        ],
      },
      {
        heading: "Aircraft magnetism — hard and soft iron, P and Q",
        figureTopics: ["Hard-iron magnetism components (plan)", "Vertical hard-iron component & compass bowl"],
        points: [
          "Hard iron: ferrous material that becomes PERMANENTLY magnetised (during manufacture — hammering, riveting — or by long periods parked on one heading, lightning). Its effect at the compass is constant in direction relative to the aircraft — it turns with the aircraft.",
          "Soft iron: material magnetised only temporarily by the Earth's field (and so changes with heading and latitude). Also electrical circuits (DC currents) create fields — hence 'switch on electrics as for flight' during a compass swing.",
          "The hard-iron field at the compass is resolved into three components: P — fore-and-aft (positive toward the nose); Q — athwartships (positive toward the starboard/right wing); R — vertical (positive downward).",
          "P causes deviation that varies with sin(heading) — maximum on east and west, zero on north and south. Q causes deviation that varies with cos(heading) — maximum on north and south, zero on east and west. R matters only when the aircraft banks or pitches (and for the turning error).",
        ],
      },
      {
        heading: "Compass swing, coefficients A, B and C, and deviation on any heading",
        figureTopics: ["Deviation — magnetic vs compass heading", "Deviation varies with heading (coefficients)"],
        points: [
          "Deviation is the angle between magnetic and compass north (+ east, – west). A compass swing measures it on several headings by comparing the compass with an accurate magnetic reference (a landing compass, a datum compass, or a surveyed compass base), then corrects it and records the residuals on a deviation card.",
          "§ When (SA Part 43)",
          "At intervals not exceeding 12 months (24 if another heading reference is fitted), after installation/replacement of the compass, after a lightning strike, engine change or major modification affecting magnetism, after carriage of magnetic cargo, and whenever the compass is suspected. Electrics and avionics ON as for flight; engines running if practicable.",
          "§ Coefficients",
          "Coefficient A — a constant deviation, the same on all headings, caused by MISALIGNMENT of the compass (lubber line not parallel to the fore-aft axis), or of the landing compass. A = average of the deviations on the cardinal (or eight) headings: A = (dN + dE + dS + dW) ÷ 4. Corrected by rotating the compass in its mounting (or adjusting the lubber line).",
          "Coefficient B — from P (fore-aft hard iron): B = (dE – dW) ÷ 2. Deviation due to B = B × sin(heading). Corrected with the fore-aft corrector magnets.",
          "Coefficient C — from Q (athwartships hard iron): C = (dN – dS) ÷ 2. Deviation due to C = C × cos(heading). Corrected with the athwartships corrector magnets.",
          "Total deviation on any heading θ ≈ A + B sin θ + C cos θ.",
          "Order of correction in a swing: correct coefficient C with the athwartships magnets on north/south and B with the fore-aft magnets on east/west, then rotate the compass to remove A; finally measure the residual deviation on 8 or 12 headings and complete the deviation card. Maximum residual 5° (main compass).",
          "§ Example",
          "Deviations measured: N –2°, E +4°, S +2°, W –2°. A = (–2 + 4 + 2 – 2) ÷ 4 = +0.5°. B = (4 – (–2)) ÷ 2 = +3°. C = (–2 – 2) ÷ 2 = –2°. Deviation on 045° ≈ 0.5 + 3 × 0.707 – 2 × 0.707 = +1.2°.",
          "§ Change of deviation with latitude and heading",
          "Deviation from hard iron is caused by P and Q acting against the directive force H. Since H weakens toward the magnetic poles, the SAME P and Q produce LARGER deviations at high magnetic latitudes: coefficient B and C ∝ 1/H. (Soft-iron effects change differently.) So a compass swung in South Africa may show larger deviations far toward a magnetic pole — a re-swing is required after a permanent change of base latitude.",
          "Deviation changes with heading as shown by the sin/cos terms — which is why the card gives values for each heading.",
        ],
      },
      {
        heading: "Turning and acceleration errors",
        points: [
          "Cause: the magnet system hangs pendulously (CG below the pivot) so it stays nearly horizontal despite dip. To balance the dip force, the magnet's centre of gravity ends up slightly on the EQUATOR side of the pivot (in South Africa, north of it). When the aircraft accelerates or turns, the force acts at that offset CG while the pivot moves with the aircraft, so the magnet tilts; the vertical component Z then acts on the tilted magnet and turns it — a false heading change. The errors are zero at the magnetic equator and grow with dip.",
          "§ Acceleration errors (on easterly and westerly headings)",
          "Northern hemisphere: accelerate → apparent turn toward NORTH; decelerate → toward SOUTH ('ANDS').",
          "Southern hemisphere: accelerate → apparent turn toward SOUTH; decelerate → toward NORTH ('ASDN' — accelerate south, decelerate north). Maximum on east and west headings; zero on north and south.",
          "§ Turning errors (most marked when turning through north or south)",
          "Northern hemisphere: turning through NORTH the compass lags (sluggish) — UNDERSHOOT (roll out early); turning through SOUTH it leads (lively) — OVERSHOOT ('UNOS').",
          "Southern hemisphere: the reverse — turning through SOUTH the compass is sluggish: UNDERSHOOT South; turning through NORTH it is lively: OVERSHOOT North ('USON' / undershoot south, overshoot north).",
          "Rule of thumb for the amount: roughly equal to the magnetic latitude (in degrees), plus or minus half the bank angle — or simply 'about the latitude'. Use timed turns (rate 1) and read the compass only when wings level and unaccelerated.",
          "§ Liquid swirl",
          "In a prolonged turn the damping liquid starts to rotate with the bowl and drags the card, increasing the turning error. Reduced by a small-diameter bowl and the damping filaments.",
        ],
      },
      {
        heading: "The direct-reading magnetic compass — components, tests and compensation",
        figureTopics: ["Direct-reading compass cutaway", "Forces on the pendulous magnet (R, W, Z)", "Pendulous suspension (side view)", "Magnet pivot & card movement"],
        points: [
          "§ Requirements",
          "HORIZONTALITY — the magnets must stay close to horizontal to sense H only (achieved by pendulous suspension with the CG well below the pivot). SENSITIVITY — the magnets must respond to the weak directive force (strong magnets, low friction pivot: iridium-tipped pivot in a sapphire jewel cup, liquid reducing the effective weight on the pivot). APERIODICITY — the card should settle on a new heading without oscillating ('dead beat'): achieved by damping liquid, damping filaments/wires, and keeping the magnet mass near the centre (low moment of inertia).",
          "§ Components (E2-type direct-reading compass)",
          "Bowl with a glass window and lubber line; magnet assembly (two or more parallel bar magnets of high coercivity alloy) attached to the card or float; pivot and jewel; damping liquid (a silicone fluid or a light kerosene-type liquid that doesn't freeze, is transparent and has stable viscosity); an expansion chamber (bellows/diaphragm) allowing for liquid expansion with temperature and height without bubbles; corrector magnets in a compensator (adjustable for B and C); lighting; deviation card holder.",
          "§ Serviceability tests (pre-flight and periodic)",
          "Bowl: no cracks, no leaks, no bubbles (bubbles indicate a leak — the card can stick), liquid not discoloured, card clearly legible and free to move. Card reading: compare with a known heading (runway heading or aligned with a known line) on the ground — gross errors indicate damage or magnetic disturbance. Deviation card present and current (swing date). Pivot friction check: deflect the card with a small magnet (or a ferrous object) about 10° and release — it should return smoothly to the original reading within a small tolerance (e.g. within 2°) and within the specified time.",
          "§ Adjustment and compensation",
          "Compensation is done during the compass swing with the corrector magnets: on north (or south) the athwartships correctors remove coefficient C; on east (or west) the fore-aft correctors remove coefficient B. Coefficient A is removed by rotating the compass/lubber line. The residual deviations are recorded on the deviation card; the maximum permitted for the main direct-reading compass is 5° (SA Part 43; standby compasses may have a larger allowance per the approved schedule).",
          "Keep magnetic objects (headsets, mobile phones, tablets, cameras, metal clipboards) away from the compass — they cause unpredictable deviation.",
        ],
      },
    ],
    mustKnow: [
      "H = T cos dip; Z = T sin dip. Toward the magnetic pole dip ↑, Z ↑, H ↓ (compass unreliable when H < ~6 µT).",
      "Isoclinal = equal dip; aclinic = zero dip; isodyne = equal H; isogonal = equal variation; agonic = zero variation.",
      "Changes: secular, annual, diurnal, irregular (magnetic storms).",
      "P (fore-aft) → coefficient B ∝ sin hdg; Q (athwartships) → coefficient C ∝ cos hdg; A = misalignment (constant).",
      "A = (N+E+S+W)/4; B = (E – W)/2; C = (N – S)/2; deviation ≈ A + B sin θ + C cos θ.",
      "B and C ∝ 1/H — deviation grows toward the magnetic poles.",
      "SH: accelerate → apparent turn SOUTH; turning through South UNDERSHOOT, through North OVERSHOOT.",
      "Compass requirements: horizontality, sensitivity, aperiodicity. Max residual deviation 5°.",
    ],
    traps: [
      "Using the northern-hemisphere rules (ANDS/UNOS) in South Africa — reverse them.",
      "Thinking hard-iron deviation is constant with latitude — it increases as H decreases.",
      "Coefficient A is a misalignment, not a magnetic effect, and is the same on every heading.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.7.8",
    title: "Stall Warning",
    intro:
      "Stall warning gives the pilot a clear, unmistakable warning before the wing stalls — certification requires it to start at a margin above the stall (for light aircraft at least 5 kt above the stall speed). This section covers the basic devices (pneumatic and electric), and the advanced stall warning and stall protection systems — angle-of-attack sensing, stick shakers and pushers, and envelope protection.",
    blocks: [
      {
        heading: "Basic stall warning — pneumatic",
        points: [
          "A small opening in the wing leading edge near the stagnation point, connected by a tube to a reed (like a harmonica reed) inside the cabin.",
          "As angle of attack increases toward the stall, the stagnation point moves down and the airflow over the opening becomes fast, producing SUCTION. Air is drawn through the reed, which sounds a horn/whistle.",
          "Advantages: no electrical power needed; simple. Disadvantages: can be blocked by insects, ice or a cover (pre-flight check by sucking on the opening); cannot be tested electrically.",
        ],
      },
      {
        heading: "Basic stall warning — electric",
        figureTopics: ["Stall warning system architecture"],
        points: [
          "A small hinged metal vane (flapper/'tab') on the leading edge, near the stagnation point. At normal angles of attack the airflow holds it down; approaching the stall the stagnation point moves below it, the airflow lifts it, and it closes a microswitch → warning horn and/or light.",
          "Requires electrical power (check the warning by lifting the vane on the pre-flight with the master switch on). The vane may be heated to prevent icing.",
          "Set to trigger about 5–10 kt above the stall in all configurations; a change in configuration (flap) changes the stall speed but not the critical angle of attack — so an AoA-based device works in all configurations.",
        ],
      },
      {
        heading: "Advanced stall warning systems — components and principle",
        figureTopics: ["Angle-of-attack vane sensor", "AoA indicator & indexer"],
        points: [
          "§ Angle-of-attack (AoA) sensors",
          "A vane (wind vane) or a conical probe with slots on the fuselage side aligns with the local airflow; a synchro/potentiometer transmits its angle. (Some systems use a lift transducer — a small vane on the wing measuring the stagnation point position.)",
          "§ Stall warning computer",
          "Takes AoA, flap/slat position (stall AoA changes with configuration), Mach, and rate of change of AoA (to give earlier warning when the angle is increasing quickly) and computes when the warning margin is reached.",
          "§ Outputs",
          "STICK SHAKER: an eccentric-weight motor on each control column shakes it — an unmistakable tactile and audible warning, set at a margin (≈ 7 % above the stall speed, typically) before the stall.",
          "Aural warning and visual warnings (lights, PFD speed tape low-speed red/amber bands, 'pitch limit indicator').",
          "AoA indicators/indexers on some aircraft show the margin to the stall directly.",
          "Self-test switch and failure warnings.",
        ],
      },
      {
        heading: "Stall protection — stick pushers and envelope protection",
        points: [
          "§ Stick pusher",
          "Fitted to aircraft with dangerous stall characteristics — especially T-tail and rear-engine designs, which can enter a deep (super) stall where the tailplane is blanked by the wing's wake and recovery is impossible. If the AoA continues to increase beyond the shaker point, a pneumatic/hydraulic actuator pushes the control column forward with a large force (e.g. 80 lb) to reduce AoA. Usually requires agreement of two independent AoA channels to prevent spurious operation; can be overridden/cut out by the crew.",
          "§ Envelope protection (fly-by-wire)",
          "In modern fly-by-wire aircraft the flight control computers limit the AoA: e.g. 'alpha protection' (sidestick commands AoA, not pitch, at high AoA), 'alpha floor' (automatic go-around thrust when AoA becomes excessive) and 'alpha max' (the maximum AoA the pilot can command even with full back stick). Protections are lost in degraded control laws.",
          "§ Protection provided",
          "Warning: an early, clear alert at a safe margin above the stall in all configurations and manoeuvres (including accelerated stalls in turns, since AoA — not speed — is sensed).",
          "Prevention: shaker → pilot action; pusher → automatic nose-down; envelope protection → the aircraft cannot be flown beyond the critical AoA.",
          "Limitations: blocked or iced sensors (failure flags), wrong configuration inputs, and the pilot ignoring or misinterpreting the warning — the correct response is always to REDUCE the angle of attack.",
        ],
      },
    ],
    mustKnow: [
      "Pneumatic: leading-edge hole + reed horn (suction as stagnation point moves down); no power needed.",
      "Electric: leading-edge flapper/vane → microswitch → horn/light; ≈ 5–10 kt above the stall.",
      "Advanced: AoA vanes/probes + computer (flap, Mach, AoA rate) → stick shaker (~7 % above stall), aural/visual.",
      "Stick pusher: T-tail/deep-stall aircraft; pushes the column forward; dual-channel agreement.",
      "Fly-by-wire envelope protection: alpha prot, alpha floor, alpha max.",
      "Recovery always = reduce AoA.",
    ],
    traps: [
      "Stall warning senses angle of attack — it works at any speed (accelerated stalls).",
      "A stick shaker warns; a stick pusher acts.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.7.9",
    title: "Powerplant and System Monitoring Instruments",
    intro:
      "Engine and system instruments tell the pilot whether the engines are producing power safely. This section covers pressure and temperature sensors and indicators, RPM indicators for piston and turbine engines, fuel quantity and fuel flow, torque meters, vibration monitors and chip detectors — their principle, presentation and operational use.",
    blocks: [
      {
        heading: "Pressure sensors and indicators",
        figureTopics: ["Bourdon-tube pressure gauge", "Manifold pressure gauge", "Engine pressure ratio (EPR)"],
        points: [
          "§ Bourdon tube (high pressures)",
          "A curved, flattened (oval-section) tube closed at one end. Pressure inside tends to straighten it; the free end's movement drives a pointer via a quadrant and pinion. Used for oil pressure, hydraulic pressure, high fuel pressures.",
          "§ Capsule / bellows (low pressures)",
          "Aneroid or differential capsules for low pressures: manifold pressure (MAP — absolute pressure in the inlet manifold, in in Hg; with the engine stopped it reads ambient pressure), fuel pressure, suction (vacuum) gauge, EPR transmitters.",
          "§ Remote transmitters",
          "Pressure transmitters (capsule or diaphragm driving a synchro, potentiometer or strain gauge) send electrical signals to cockpit indicators — keeping oil and fuel lines out of the cockpit.",
          "§ Engine pressure ratio (EPR)",
          "Turbofan thrust indicator: EPR = turbine (jet pipe) discharge total pressure ÷ compressor inlet total pressure. Used for setting thrust on many engines.",
          "§ Operational use",
          "Oil pressure is the first indication after start (must rise within a time limit — e.g. 30 s — or shut down). Low oil pressure with rising temperature → impending failure. MAP + RPM set piston power.",
        ],
      },
      {
        heading: "Temperature sensors and indicators",
        figureTopics: ["EGT thermocouple (chromel/alumel)"],
        points: [
          "§ Thermocouples (high temperatures)",
          "Two dissimilar metals joined at a hot junction generate a voltage proportional to the temperature difference between the hot and cold (reference) junctions — the thermoelectric effect. NEED NO EXTERNAL POWER.",
          "Chromel–alumel: exhaust gas temperature (EGT), turbine gas temperature (TGT/ITT) — up to ~1 100 °C. Several probes are wired in PARALLEL to give an average. Iron–constantan or copper–constantan: cylinder head temperature (CHT) — under a spark plug washer.",
          "Cold-junction compensation corrects for the cockpit/reference temperature.",
          "§ Resistance thermometers (low/medium temperatures)",
          "A wire (nickel/platinum) whose resistance rises with temperature, measured by a Wheatstone bridge or ratiometer. NEEDS POWER. Used for oil temperature, OAT, carburettor air temperature, fuel temperature. A power failure causes the needle to go to an extreme or off-scale.",
          "§ Bimetallic (direct-reading) for OAT and some CHT on light aircraft.",
          "§ Operational use",
          "EGT for leaning the mixture (peak EGT and lean/rich of peak); TGT limits on start (hot start) and in operation; CHT for cooling (cowl flaps); oil temperature within the green arc before high power.",
        ],
      },
      {
        heading: "RPM indicators — piston and turbine engines",
        figureTopics: ["Drag-cup tachometer", "Tacho-generator system", "Phonic-wheel speed probe", "Percent-RPM gauge", "N1 fan-speed magnetic sensor", "Synchroscope"],
        points: [
          "§ Mechanical (magnetic drag-cup) tachometer — light pistons",
          "A flexible drive from the engine rotates a permanent magnet inside an aluminium drag cup; eddy currents drag the cup round against a hairspring — deflection ∝ speed. Includes an hour meter (tacho hours) on many types.",
          "§ Tacho-generator",
          "An engine-driven three-phase AC generator whose FREQUENCY is proportional to engine speed drives a synchronous motor in the indicator, which turns a magnet/drag-cup system. Independent of aircraft electrics (self-generating) and needs no long mechanical cable.",
          "§ Turbine engines — phonic wheel / magnetic pick-up",
          "A toothed wheel on the shaft passes a magnetic probe; each tooth induces a pulse; pulse frequency ∝ RPM → electronic indicator. Displayed as % RPM (100 % = rated speed) for N1 (low-pressure spool/fan) and N2 (high-pressure spool), and N3 on three-spool engines.",
          "N1 is often the primary thrust-setting parameter on turbofans.",
          "§ Propeller synchronisation",
          "On twins, a synchroscope shows the difference between the engines' RPM (a rotating disc that turns toward the faster engine); synchronising removes the beat noise.",
          "§ Operational use",
          "RPM with MAP sets power on a constant-speed propeller; red lines mark limits; yellow arcs/red ranges mark RPM ranges to avoid (propeller vibration).",
        ],
      },
      {
        heading: "Fuel gauges and fuel flow indicators",
        figureTopics: ["Float-type fuel gauge", "Capacitance fuel quantity & flow", "Capacitance fuel probe construction", "Fuel flow transmitter"],
        points: [
          "§ Float-type (resistive)",
          "A float on an arm moves a wiper over a variable resistor; the current through a ratiometer gauge indicates fuel VOLUME. Simple but inaccurate in turns and accelerations (fuel moves) and with tank shape. Light aircraft gauges are only required to be accurate at EMPTY ('should read zero when the usable fuel is gone') — always dip or visually check the tanks.",
          "§ Capacitance system",
          "Probes consisting of concentric tubes act as capacitors; fuel (dielectric constant ≈ 2.1) and air (≈ 1) between the tubes change the capacitance in proportion to the fuel height. Several probes per tank average out attitude effects. Because the dielectric constant of fuel changes with its DENSITY in the same proportion, the system can be calibrated to read fuel MASS (kg/lb) — with a densitometer or compensator for accuracy. No moving parts.",
          "§ Fuel flow",
          "Volumetric flowmeters: a vane or turbine in the fuel line, whose movement/rotation is proportional to flow (l/h or USG/h). Mass flowmeters (turbine engines): an impeller imparts a known swirl and the torque/time delay to straighten it is measured → kg/h or lb/h, independent of fuel temperature/density.",
          "Fuel totaliser / fuel used: integrates fuel flow over time — shows fuel used and (with the initial quantity) fuel remaining; must be set correctly at refuelling.",
          "Piston engines may show fuel PRESSURE calibrated as 'flow' (a pressure-type flow gauge) — a blocked injector shows a HIGH 'flow' reading (pressure rises).",
        ],
      },
      {
        heading: "Torque meter",
        figureTopics: ["Torquemeter"],
        points: [
          "Turboprop and turboshaft (and some large piston) engines measure the TORQUE delivered to the propeller/rotor shaft — power = torque × RPM.",
          "Hydraulic torque meter: the reduction gearbox has helical gears whose ring gear tends to rotate (or move axially) in proportion to torque; this is resisted by oil pistons, and the oil pressure needed is proportional to torque → displayed as torque (%, ft-lb or psi).",
          "Electronic (phase-shift) torque meter: two toothed wheels on a torsion shaft; under load the shaft twists and the phase difference between the pick-up signals ∝ torque.",
          "Operational use: torque is the primary power-setting parameter for turboprops (with the propeller RPM set by the propeller lever); limits are red-lined; negative torque sensing can auto-feather.",
        ],
      },
      {
        heading: "Vibration monitors and chip detectors",
        figureTopics: ["Engine vibration monitor"],
        points: [
          "§ Vibration monitors",
          "Accelerometers (piezo-electric crystals or electromagnetic transducers) mounted on the engine casing produce a signal proportional to vibration. The signal is filtered (tuned to the N1 and N2 shaft frequencies) to show the vibration level for each rotor, in relative units (0–5) or inches/sec, on the secondary engine display. High vibration warns of imbalance, blade damage (bird strike, icing) or bearing failure — reduce thrust/shut down per procedure.",
          "§ Chip detectors",
          "Magnetic plugs in the oil system (sumps, gearbox, scavenge lines) collect ferrous metal particles shed by wearing bearings and gears. Electric chip detectors have two contacts; a build-up of chips bridges the gap and triggers a cockpit CHIP light / message. Inspected during maintenance (debris analysis); some are 'burn-off' types that zap small fuzz. A chip warning in flight indicates internal wear — monitor oil pressure/temperature and follow the checklist (often shut down/land as soon as practicable).",
        ],
      },
    ],
    mustKnow: [
      "Bourdon tube: high pressure (oil, hydraulic). Capsule/bellows: low pressure (MAP, fuel, suction).",
      "MAP is absolute pressure — reads ambient with the engine stopped.",
      "EPR = turbine discharge ÷ compressor inlet total pressure.",
      "Thermocouple (chromel-alumel EGT/TGT) needs no power; probes in parallel. Resistance thermometer (oil temp, OAT) needs power.",
      "Tacho: drag-cup (mechanical) or tacho-generator (3-phase AC, frequency ∝ RPM); turbines: phonic wheel → % N1/N2.",
      "Fuel: float (volume, inaccurate) vs capacitance (mass, no moving parts). Flow: volumetric vs mass flowmeter; totaliser.",
      "Torque meter (turboprop): oil pressure on helical-gear pistons, or phase shift.",
      "Vibration: accelerometers tuned to N1/N2. Chip detector: magnetic plug, CHIP light.",
    ],
    traps: [
      "Thinking thermocouples need electrical power — they generate their own voltage.",
      "Light-aircraft float gauges are only required to read accurately when empty.",
      "A blocked injector on a pressure-type 'fuel flow' gauge reads HIGH.",
    ],
  },
];
