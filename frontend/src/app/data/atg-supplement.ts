// ============================================================================
// CPL Aircraft Technical — supplementary topic blocks for A.1.2–A.1.5.
// These sections are taught mainly through the image slides (FIGURE_NOTES);
// a gap check against Appendix 2.0A found aspects without enough text. These
// blocks are appended after the existing blocks. Original wording.
// ============================================================================

import type { AirLawNoteBlock } from "./airlaw-notes";

export const ATG_SUPPLEMENT: Record<string, AirLawNoteBlock[]> = {
  "A.1.2": [
    {
      heading: "Vacuum (suction) system — components, malfunctions and procedures",
      points: [
        "Light aircraft drive the attitude indicator and heading indicator (and sometimes the turn coordinator's backup) with air: the gyro rotors are spun by jets of air drawn through the instruments by suction.",
        "§ Components",
        "Engine-driven VACUUM PUMP (dry, rotary-vane pump with carbon vanes — or older wet oil-lubricated pumps; very old aircraft used an external venturi); central AIR FILTER (cleans the air entering the instruments — a blocked filter reduces suction); SUCTION/VACUUM REGULATOR (relief valve) that admits extra air to hold the suction constant (typically 4.5–5.5 in Hg) regardless of engine RPM; SUCTION GAUGE (in Hg) to monitor it; lines to the gyro instruments; on some aircraft a low-vacuum warning light, and a standby vacuum source (second pump, or a manifold-vacuum backup).",
        "Pressure (positive-pressure) systems use a pump to blow air through the instruments instead — the principle is the same.",
        "§ Recognition of malfunction",
        "LOW suction (gauge below the green arc / warning light): gyros spin down slowly — the attitude indicator and heading indicator become sluggish, drift, then topple or give FALSE indications (dangerous in IMC — the failure is gradual and subtle). Causes: pump failure (dry pumps can fail suddenly without warning), leaking/broken line, clogged filter, regulator fault. HIGH suction: regulator stuck — gyros overspeed, wear.",
        "Cross-check: the electric turn coordinator (or electric AI) and the magnetic compass are unaffected — a vacuum failure shows as a disagreement between them and the vacuum instruments.",
        "§ Procedures in the event of malfunction",
        "Check the suction gauge; cover or disregard the failed attitude and heading indicators (partial-panel flying): use the turn coordinator, ASI, altimeter, VSI and compass; if VMC, stay VMC; if IMC, inform ATC and request assistance (no-gyro vectors), plan to land at the nearest suitable aerodrome. Pre-flight: check suction in the green during the run-up (at the specified RPM) and the gyros erect and stable before take-off.",
      ],
    },
    {
      heading: "Landing gear — locking and accidental-retraction prevention",
      points: [
        "§ Locking",
        "Down-locks (mechanical over-centre side-stays or hook locks, often with springs) hold the gear down; up-locks hold it retracted. Indicated by three GREEN lights (down and locked), red/amber 'in transit' or 'unsafe', and no light when up and locked; mechanical indicators on some types.",
        "§ Prevention of accidental retraction on the ground",
        "Squat (weight-on-wheels) switches on the oleos open the retraction circuit when the aircraft's weight compresses the struts; a solenoid-operated lock (or a mechanical lock) prevents the gear selector being moved to UP on the ground (it can be overridden in an emergency). Ground locks (pins with red flags) are fitted to the gear on the ground and removed before flight. Gear selector guarded and wheel-shaped.",
        "§ Warnings",
        "Gear warning horn/light when the throttle is closed (or flaps extended beyond a setting) with the gear not down and locked.",
        "§ Emergency extension",
        "Free-fall (release the up-locks — gravity and airflow lower the gear), hand pump, compressed nitrogen bottle (blow-down), or a standby hydraulic system. Know the procedure and the speed limits; the gear may not retract again afterwards.",
      ],
    },
    {
      heading: "Systems — potential failures and ancillary systems",
      points: [
        "Hydraulic: loss of fluid (leak — reservoir quantity low), pump failure (low pressure light), overheating, contamination; standby/emergency systems (electric pump, RAT, accumulators for brakes) and the services lost with each system. Air in the system → spongy operation.",
        "Pneumatic: duct leaks/overheat (duct-leak warnings, isolation valves), loss of bleed pressure; affects air-conditioning, pressurisation, de-icing and engine start.",
        "Ancillary systems that use hydraulic or pneumatic power: wheel brakes and anti-skid, nose-wheel steering, flaps/slats, spoilers, cargo doors, windscreen wipers, thrust reversers, gust locks.",
        "Always use the abnormal checklist: identify the failed system, the services lost, the alternate means and the landing considerations (longer distance, no anti-skid, manual gear extension).",
      ],
    },
    {
      heading: "Pressurisation — rapid decompression and emergency procedures",
      points: [
        "§ Rapid / explosive decompression",
        "Causes: structural failure (window or door), outflow-valve failure open, loss of pressurisation air (bleed/pack failure — usually slow). Signs: loud bang/rush of air, fog, temperature drop, dust and debris, ear pain, cabin altitude warning (horn/light at about 10 000 ft cabin), passenger oxygen masks deploying (~14 000 ft cabin).",
        "§ Emergency procedure",
        "1. Crew OXYGEN MASKS ON, 100 %, and establish communication. 2. Check cabin altitude and rate; attempt to control (manual outflow valve) if slow. 3. If the cabin altitude cannot be controlled: EMERGENCY DESCENT — autothrottle/thrust idle, speedbrakes, descend at maximum appropriate speed (VMO/MMO unless structural damage — then slower), turn off the airway if required, squawk 7700, Mayday. 4. Level at 10 000 ft or the minimum safe altitude if higher. 5. Check passengers and crew, cabin crew to give first aid and oxygen. 6. Divert as required (fuel burn is much higher at low level).",
        "Safety valves: the positive pressure relief valve limits differential pressure (structure); the negative pressure (inward relief) valve prevents the outside pressure exceeding the cabin's (e.g. in a rapid descent); a dump valve depressurises on the ground (squat switch) so doors can be opened.",
      ],
    },
    {
      heading: "Ice protection — powerplant and windshield",
      points: [
        "§ Powerplant",
        "Turbine engine intakes: hot bleed air (anti-ice) through the intake lip and inlet guide vanes, or electrical heating; must be selected ON in icing conditions BEFORE ice forms (visible moisture and OAT/TAT below about +10 °C on the ground/take-off). Propellers: electrical heating elements on the blade roots (cycled) or fluid (alcohol) slinger rings. Piston engines: carburettor heat / alternate air (induction icing).",
        "§ Windshield",
        "Electrical heating: a transparent conductive film (gold or tin oxide) laminated in the windscreen, controlled by temperature sensors to avoid thermal shock and keep the screen flexible for bird-strike resistance (window heat is usually ON throughout flight). Alternatives: hot air blown on the screen, fluid (alcohol) sprays on light aircraft. Rain removal: wipers, rain repellent, air curtains.",
        "§ Ice detection and warning",
        "Visual (the pilot watching a reference probe, wipers, wing leading edges — lit at night by wing-inspection lights), ice detectors (vibrating probe whose frequency drops as ice accumulates; or obstruction/pressure-differential types) → ICE light.",
      ],
    },
    {
      heading: "Fuel system — drains, unusable fuel, pumps and fuel management",
      points: [
        "§ Drains: purpose",
        "Water and sediment collect at the lowest points (tank sumps, gascolator). Drain before the first flight of the day and after refuelling (after the fuel has settled) until clean fuel appears; check fuel colour/grade and smell. Water in fuel can cause engine failure; in cold weather it can freeze.",
        "§ Unusable fuel",
        "The fuel that cannot be safely used in flight (it remains in tanks and lines because of tank shape and pick-up position, especially in unusual attitudes). It is included in the basic empty mass and must not be counted in endurance calculations — use the AFM 'usable fuel' figure.",
        "§ Pumps — mechanical (engine-driven) and electric",
        "Engine-driven pump: main supply. Electric (auxiliary/boost) pump: used for start, take-off and landing (backup if the engine pump fails), at high altitude to prevent vapour lock, and for tank transfer/crossfeed. On low-wing aircraft (below the engine) pumps are essential; high-wing aircraft can feed by gravity.",
        "§ Fuel management",
        "Know the fuel system diagram; take off on the fullest/recommended tank; switch tanks at planned intervals (time or quantity) to keep lateral balance, and note switching times; never run a tank dry if avoidable (an air lock may stop the engine — when switching, use the boost pump); monitor fuel quantity, flow and pressure; check the selector is fully in a detent (not between tanks); crossfeed in twins per checklist (engine failure); plan reserves and land before reaching them.",
        "Fuel jettison (large aircraft): to reduce to the maximum landing mass — jettison stops automatically at a set minimum quantity.",
      ],
    },
  ],
  "A.1.3": [
    {
      heading: "Ohm's law and power — worked",
      points: [
        "Ohm's law: V = I × R (volts = amperes × ohms) for a resistance at constant temperature. Power P = V × I = I²R = V²/R (watts).",
        "Series resistances add: R = R₁ + R₂ + … (same current through each; voltages add). Parallel: 1/R = 1/R₁ + 1/R₂ + … (same voltage across each; currents add; total less than the smallest).",
        "Example: a 28 V bus supplies a 7 Ω heater → I = 28 ÷ 7 = 4 A; power = 28 × 4 = 112 W.",
        "Example: two 6 Ω lamps in parallel on 12 V → R = 3 Ω, I = 4 A (2 A each). In series → 12 Ω, 1 A, each lamp gets 6 V.",
        "Kirchhoff: the currents entering a junction equal those leaving; the sum of voltage drops round a loop equals the supply voltage.",
      ],
    },
    {
      heading: "Batteries — hazards and applications",
      points: [
        "Applications: engine starting (APU/engine), emergency power for essential services when generators fail (a fully charged battery for a specified time — e.g. 30 min), stabilising the DC bus voltage, ground power.",
        "§ Hazards",
        "Lead-acid: gives off hydrogen and oxygen when charging — explosive (ventilate the battery box, no sparks); sulphuric acid is corrosive (neutralise spills with sodium bicarbonate).",
        "Nickel-cadmium (NiCd): THERMAL RUNAWAY — at high charge rates and temperature the internal resistance falls, current increases, temperature rises further → overheating, fire, explosion. Monitored by battery temperature sensors and warnings (BATT TEMP / HOT); disconnect the battery from charging if overheating. Electrolyte (potassium hydroxide) is alkaline and corrosive (neutralise with boric acid). Never mix lead-acid and NiCd servicing equipment.",
        "Lithium-ion: high energy density, risk of thermal runaway and fire (contained in fire-resistant boxes, monitored). Passengers' lithium batteries (phones, laptops) are a cabin fire hazard — dangerous-goods rules; fight with water/non-flammable liquid to cool after Halon knock-down.",
        "A battery that is discharged (e.g. after a starting attempt) will not support essential services for the full time if the generators fail — monitor the ammeter after start (high charge rate initially is normal).",
      ],
    },
    {
      heading: "Monitoring devices and annunciators",
      points: [
        "Ammeter: measures current (in series). A CENTRE-ZERO ammeter in the battery line shows charge (+) or discharge (–) of the battery; a LOAD-METER (zero at one end) in the generator output shows the generator load (often as % of rated output).",
        "Voltmeter: measures voltage (in parallel) — bus voltage normal ~28 V on a 24 V system (14 V on 12 V); low voltage indicates generator failure.",
        "Frequency meter and kW/kVA meters on AC systems.",
        "Annunciators/warning lights: generator/alternator failure light (LOW VOLTS / GEN FAIL / ALT), battery discharge, bus-off, overvoltage trip, battery overheat. Master caution/warning systems group the alerts; press-to-test function. Colour code: red warning, amber caution, green/blue status.",
        "Circuit-breaker status (popped breaker) — reset once only after a cooling period, and only if the system is needed — never repeatedly.",
      ],
    },
    {
      heading: "Multi-phase AC — applications",
      points: [
        "Most transport aircraft generate 115/200 V, 400 Hz, three-phase AC: three windings 120° apart give a smoother, more efficient supply (constant power), lighter generators and cables for the same power, and allow simple, robust induction motors.",
        "Phase (line-to-neutral) voltage 115 V; line-to-line voltage = 115 × √3 ≈ 200 V (star/wye connection).",
        "400 Hz is used (rather than 50/60 Hz) because transformers and motors can be much smaller and lighter.",
        "Applications: three-phase motors (fuel pumps, hydraulic pumps, fans), heating (windscreen, galleys), transformer-rectifier units (TRUs) to supply the 28 V DC buses, instruments (synchros at 26 V 400 Hz via transformers), lighting.",
        "Frequency must be held constant (constant-speed drive / IDG or variable-frequency systems with converters) — instruments and motors depend on it; generators can be paralleled only when frequency and phase match.",
      ],
    },
  ],
  "A.1.4": [
    {
      heading: "Propellers — nomenclature, thrust, fixed and variable pitch, CSU, windmilling",
      points: [
        "§ Nomenclature",
        "Hub/boss (centre, attached to the crankshaft flange), blades (each a twisted aerofoil), blade root and tip, leading and trailing edges, blade face (flat, rear 'pressure' side facing the pilot) and blade back (cambered front side), blade stations (measured from the hub centre), spinner. Diameter = tip-circle diameter; tip clearance must be kept from the ground.",
        "BLADE ANGLE (pitch angle): the angle between the blade chord and the plane of rotation. GEOMETRIC PITCH: the distance the propeller would advance in one revolution if it moved like a screw in a solid (no slip). EFFECTIVE PITCH: the distance it actually advances. SLIP = geometric – effective pitch.",
        "Blade TWIST: blade angle decreases from root to tip because the tip travels much faster than the root; twisting gives each section roughly the same angle of attack along the blade.",
        "§ Conversion of engine power to thrust",
        "Each blade section is an aerofoil whose relative airflow combines the rotational velocity (2πrN) and the aircraft's forward velocity. The blade's angle of attack = blade angle – helix (advance) angle. The aerodynamic force on the blade resolves into THRUST (forward, along the axis) and propeller TORQUE (resisting rotation — balanced by engine torque). Thrust horsepower = thrust × TAS; propeller efficiency = THP ÷ BHP (≈ 80 % at best).",
        "§ Forces acting on a propeller blade",
        "Thrust bending force (bends the blades forward), centrifugal force (pulls blades outward — the largest force — and also creates centrifugal twisting moment tending to reduce the blade angle toward fine pitch), torque bending force (bends blades opposite to rotation), aerodynamic twisting moment (tends to increase blade angle — toward coarse), and vibration. Nicks and damage concentrate stress — dress them out per maintenance rules; a damaged blade can fail.",
        "§ Fixed-pitch propeller",
        "One blade angle, chosen as a compromise: a FINE-pitch ('climb') propeller gives good take-off and climb thrust but over-speeds at high cruise speed; a COARSE ('cruise') propeller gives efficient cruise but poor take-off/climb. Made of wood, metal (aluminium alloy forging) or composite.",
        "§ Variation of RPM with airspeed (fixed pitch)",
        "With the throttle fixed, RPM INCREASES as airspeed increases (the blades' angle of attack falls, so less torque is needed to turn them — the engine speeds up) and DECREASES when airspeed falls (e.g. in a climb). So RPM indicates power only together with airspeed, and a dive can overspeed the engine — reduce throttle. Static RPM (full throttle, stationary) is a check of engine power.",
        "§ Thrust efficiency with speed",
        "A fixed-pitch propeller is efficient only near one speed: at low speed (take-off) the blades' angle of attack is high (possibly stalled near the root) → inefficient; at high speed it is low → little thrust and overspeed. Efficiency peaks at the design speed.",
        "§ Variable-pitch propeller",
        "The blade angle can be changed in flight. Two-position (fine/coarse), controllable-pitch (pilot selects the angle), and CONSTANT-SPEED (the commonest) propellers. Fine pitch (small angle, high RPM) for take-off, climb and landing; coarse pitch (large angle, low RPM) for cruise.",
        "§ Constant-speed unit (CSU) operation",
        "The pilot selects an RPM with the propeller (pitch/RPM) lever; the CSU — an engine-driven governor with flyweights, a speeder spring and a pilot valve — automatically varies the blade angle to keep that RPM regardless of airspeed or throttle (within limits). If RPM rises above the set value (overspeed), the flyweights move out, the pilot valve directs oil to coarsen the pitch (more load) → RPM falls back; if RPM falls (underspeed), oil is released/directed to fine the pitch → RPM rises. Typical single-engine light aircraft: oil pressure moves the blades toward FINE (high RPM); counterweights/springs toward coarse — so oil-pressure loss → (usually) fine pitch/high RPM on singles. Twins: oil pressure to COARSE with nitrogen/springs toward FEATHER — loss of oil feathers the propeller.",
        "Power is then set with the THROTTLE (manifold pressure) and the propeller lever (RPM). Increase power: RPM up first, then MAP; decrease: MAP down first, then RPM.",
        "Advantages: optimum blade angle at all speeds → better take-off and climb performance and efficient cruise; overspeed protection. Feathering (blades edge-on to the airflow) on twins stops a failed engine windmilling and minimises drag.",
        "§ Effect of blade pitch changes",
        "Finer pitch → higher RPM, more thrust at low speed, more noise and fuel; coarser pitch → lower RPM, efficient at high speed, risk of excessive manifold pressure at low RPM (detonation). The propeller lever full forward (fine) is used for take-off, go-around and landing (so full power is available).",
        "§ Windmilling effect",
        "If the engine fails, the airflow turns the propeller (windmilling) — it then DRIVES the engine and produces a large DRAG (much more than a stopped propeller and far more than a feathered one), steepening the glide. On a constant-speed propeller the CSU drives the blades toward fine pitch to hold RPM (if oil pressure remains), increasing drag further — pull the propeller lever fully back (coarse) to reduce windmilling drag. A windmilling propeller can help a restart; on twins, feather the dead engine.",
        "§ Other propeller effects",
        "Torque reaction (rolls the aircraft opposite to the propeller rotation), spiralling slipstream (strikes the left side of the fin on a clockwise propeller → yaw left), asymmetric blade effect / P-factor (at high angle of attack the down-going blade produces more thrust → yaw left for clockwise propellers), and gyroscopic precession (when the propeller disc is pitched or yawed — e.g. raising the tail of a taildragger yaws it left). All cause a swing on take-off — corrected with rudder.",
      ],
    },
    {
      heading: "Definitions and cylinder numbering",
      points: [
        "Top dead centre (TDC) / bottom dead centre (BDC): the highest and lowest positions of the piston.",
        "Bore: cylinder internal diameter. Stroke: the distance the piston travels from TDC to BDC (= 2 × crank throw).",
        "Swept volume (displacement) = piston area × stroke (per cylinder); total engine capacity = swept volume × number of cylinders.",
        "Clearance volume: the volume above the piston at TDC (combustion chamber).",
        "Compression ratio = (swept volume + clearance volume) ÷ clearance volume — typically 7:1 to 9:1 for aviation piston engines; limited by detonation.",
        "Valve lead (opening before TDC/BDC), valve lag (closing after), and VALVE OVERLAP (both inlet and exhaust valves open together around TDC at the end of the exhaust stroke — uses the exhaust gas momentum to scavenge the cylinder and start the incoming charge). Ignition timing: spark occurs BEFORE TDC (e.g. 25°) so peak pressure is reached just after TDC.",
        "Volumetric efficiency: the ratio of the mass of charge actually drawn in to that which would fill the swept volume at ambient conditions — falls with altitude and at high RPM; supercharging raises it above 100 %.",
        "§ Cylinder numbering",
        "Varies by manufacturer. Horizontally opposed (Lycoming/Continental): cylinders numbered from front to rear — Lycoming: odd numbers on the RIGHT (1 front right), even on the left; Continental: number 1 at the REAR right (numbered from rear to front). Radial engines: numbered clockwise viewed from the rear, number 1 at the top. The firing order is arranged for smooth running and balanced crankshaft loads (e.g. 1-3-2-4 for a flat-four Lycoming). Always use the manufacturer's numbering for maintenance and CHT probe locations.",
      ],
    },
    {
      heading: "Cylinder construction — barrel, connecting rods, crankshaft and dynamic dampers",
      points: [
        "Cylinder BARREL: steel, with cooling fins and a hardened (nitrided or chrome-plated) bore for wear resistance; the aluminium-alloy CYLINDER HEAD (screwed and shrunk onto the barrel) contains the combustion chamber, valves, valve guides and seats, and spark-plug bosses (two plugs per cylinder).",
        "Pistons: aluminium alloy, with compression rings (seal gas pressure), and oil-control/scraper rings; the gudgeon (wrist) pin joins the piston to the connecting rod.",
        "CONNECTING RODS: H- or I-section steel forgings linking the piston (small end — bushed) to the crankshaft (big end — split plain bearing shells). Radial engines use a master rod with articulated rods.",
        "CRANKSHAFT: converts reciprocating motion into rotation; forged steel with main journals, crankpins and counterweights; drives the propeller (directly or through reduction gearing) and the accessories (camshaft at half crankshaft speed in a four-stroke engine, magnetos, pumps, alternator).",
        "DYNAMIC DAMPERS (pendulum counterweights): loosely pinned counterweights on the crankshaft that swing to counteract the TORSIONAL VIBRATION caused by the power impulses (tuned to a particular order of vibration). Damage (e.g. from a propeller strike or abrupt power changes/detonation) can 'detune' them, leading to crankshaft failure — avoid rapid throttle movements and observe RPM restrictions (yellow arcs).",
        "Crankcase: aluminium alloy, split vertically on opposed engines, carries the crankshaft bearings and mounts.",
      ],
    },
    {
      heading: "Detonation and pre-ignition — contributing factors, recognition, stopping and prevention",
      points: [
        "§ Detonation",
        "The remaining unburnt charge (end gas) ignites SPONTANEOUSLY and explodes instead of burning progressively, after normal spark ignition — causing a violent pressure spike. Characteristics: a 'knock' (usually inaudible in aircraft), sharp rise in CHT, loss of power, rough running; damages pistons (holes, eroded crowns), rings, valves and cylinder heads — can destroy an engine quickly.",
        "Contributing factors: fuel of too LOW an octane/grade, too LEAN a mixture at high power, high CHT/inadequate cooling, high manifold pressure with low RPM (excessive cylinder pressure), high intake temperature (carb heat at high power, hot day), over-advanced ignition timing, high compression ratio, carbon deposits.",
        "Recognition: rising CHT/EGT anomalies, rough running, loss of power, vibration.",
        "Stopping it: ENRICHEN the mixture, REDUCE power (throttle back first, then RPM), open cowl flaps, increase airspeed (cooling), reduce climb angle.",
        "Prevention: correct fuel grade (never lower), correct mixture (rich at high power), keep CHT in limits, increase RPM before manifold pressure / reduce MAP before RPM, avoid prolonged high power with low airspeed.",
        "§ Pre-ignition",
        "Ignition of the charge BEFORE the spark, by a hot spot (glowing carbon deposit, overheated spark plug electrode or valve edge). Causes rough running, backfiring, sudden CHT rise and power loss in one cylinder; can lead to detonation. Remedy: reduce power, enrich, cool; maintenance to remove deposits; correct heat-range plugs.",
        "Difference: detonation occurs AFTER normal ignition (end gas explodes); pre-ignition BEFORE the spark (hot spot).",
      ],
    },
    {
      heading: "Engine power — IHP, FHP, BHP",
      points: [
        "INDICATED HORSEPOWER (IHP): the total power developed by the burning gases in the cylinders (from the mean effective pressure on the pistons). IHP = (P × L × A × N × K) ÷ 33 000 (in imperial units: P mean effective pressure, L stroke, A piston area, N power strokes per minute, K number of cylinders).",
        "FRICTION HORSEPOWER (FHP): the power lost overcoming internal friction and driving the engine's own accessories (pumps, magnetos, valves) and pumping losses.",
        "BRAKE HORSEPOWER (BHP): the useful power delivered at the crankshaft/propeller shaft = IHP – FHP. Measured with a dynamometer ('brake').",
        "Mechanical efficiency = BHP ÷ IHP (≈ 85–90 %).",
        "Thrust horsepower (THP) = BHP × propeller efficiency (≈ 80 %).",
        "Factors affecting power: manifold pressure (mass of charge), RPM, mixture, air density (altitude, temperature, humidity), ignition timing, compression ratio.",
        "Brake specific fuel consumption (BSFC): fuel flow per BHP — lowest at economical (lean-of-peak or best-economy) mixture settings.",
      ],
    },
    {
      heading: "Lubrication and cooling — temperature regulation",
      points: [
        "Oil temperature regulation: an oil cooler (heat exchanger in the airflow) with a thermostatic (oil temperature) control valve — when the oil is cold the valve bypasses the cooler (faster warm-up); when hot it routes oil through the cooler. A pressure-relief bypass protects a congealed (cold) cooler. Some aircraft have oil-cooler shutters.",
        "Engine (cylinder) temperature regulation: cowl flaps (open on the ground and in the climb, closed in cruise/descent), baffles, mixture (richer = cooler), airspeed, power. Monitored by CHT (hottest cylinder) and oil temperature; too cold an engine (shock cooling in rapid descents at low power) causes cylinder cracking — reduce power gradually.",
      ],
    },
    {
      heading: "Ignition — induction vibrator, ignition harness and shielding",
      points: [
        "At cranking speeds a magneto rotates too slowly to give a strong, correctly timed spark. Two solutions:",
        "IMPULSE COUPLING: a spring-loaded coupling between engine and magneto; at low speed it holds back the magneto shaft, then releases it with a snap near TDC — producing a strong, RETARDED spark for starting; disengages automatically (centrifugal flyweights) once the engine runs. Characteristic clicking when the propeller is turned by hand.",
        "INDUCTION VIBRATOR (shower of sparks): a battery-powered vibrator supplies pulsating current to the magneto's primary/retard breaker points during starting, giving a series of retarded sparks — used on larger engines; only operates with the starter.",
        "§ Ignition harness",
        "High-tension leads carrying up to ~20 000 V from each magneto's distributor to the spark plugs (each cylinder has two plugs, one fed from each magneto — dual ignition for reliability and better combustion).",
        "§ Shielding",
        "The harness, magnetos and plugs are enclosed in metal braiding/conduit (SHIELDING) connected to earth — this prevents the high-frequency ignition pulses radiating radio interference (noise on radios and nav equipment, especially ADF). Damaged shielding → radio noise; a chafed lead may cause misfiring (rough running on one magneto in the mag check).",
        "Safety: a magneto is 'live' whenever the P-lead (earth wire) is not grounded — a broken P-lead means the engine can fire if the propeller is turned even with the switch OFF. Always treat a propeller as live.",
      ],
    },
    {
      heading: "Fuel — colour coding; priming system",
      points: [
        "§ Colour coding (dyes)",
        "AVGAS 100/130 — GREEN (largely superseded). AVGAS 100LL (low lead) — BLUE (most common). AVGAS 80/87 — RED (largely discontinued). Jet A / Jet A-1 (kerosene) — clear/straw (no dye). Mogas (automotive) — various, only if approved (STC).",
        "Fuel system markings: AVGAS fuel points/hoses marked with RED labels; Jet fuel with BLACK labels (and differently shaped nozzles). Mis-fuelling a piston engine with Jet A causes detonation and engine failure — always check fuel type, smell and colour, and watch the refuelling.",
        "Grade = anti-knock rating: the higher the grade the greater the resistance to detonation. Use the specified grade or a HIGHER one (if approved), never a lower one.",
        "§ Priming system",
        "Before starting a cold engine, a small amount of fuel is sprayed directly into the induction ports or cylinders by a hand-operated (or electric) primer pump to provide a combustible mixture at cranking speed (the carburettor provides little fuel at low airflow). Fuel-injected engines prime by running the electric pump with the mixture rich for a few seconds. Over-priming → flooded engine, wet plugs, risk of induction fire. Lock the primer after use (an unlocked primer can richen the mixture and cause rough running).",
        "§ Manual (hand) pumps / wobble pumps on some older aircraft for priming and emergency fuel supply.",
      ],
    },
    {
      heading: "Engine handling — limitations and vibration",
      points: [
        "§ Limitations (AFM, instrument markings)",
        "Maximum RPM and maximum manifold pressure (red lines); time-limited take-off power; RPM ranges to avoid (yellow arc — propeller/crankshaft vibration resonance); maximum CHT, oil temperature and minimum/maximum oil pressure; minimum oil temperature before high power; fuel grade; mixture leaning limits (e.g. not leaning above 75 % power); starter duty cycle limits (e.g. 30 s on, then cooling).",
        "Power changes: to increase power — increase RPM first (propeller lever) then MAP (throttle); to decrease — reduce MAP first, then RPM ('rev up, throttle up; throttle back, rev back'). Avoids high MAP at low RPM (detonation, overstress).",
        "§ Vibration",
        "Causes: rough running (fouled plug, failed magneto, induction/carburettor ice, incorrect mixture — too rich or too lean), a damaged/out-of-balance propeller, loose engine mounts, detuned dynamic dampers, a cylinder with a burnt valve (low compression). Diagnosis: carb heat (ice), mixture adjustment, magneto check (rough on one mag = plug/lead problem on that side), check instruments; land as soon as practicable if severe — propeller damage can lead to blade loss and engine separation.",
      ],
    },
  ],
  "A.1.5": [
    {
      heading: "Compressor stall and surge — recognition and avoidance",
      points: [
        "Stall: the airflow over a compressor blade row separates because the blade angle of attack becomes too high (too little axial velocity for the rotational speed). Surge: a stall across the whole compressor — the flow breaks down and may reverse momentarily.",
        "Causes: distorted or disturbed intake airflow (crosswind, high angle of attack/sideslip, turbulence, ingestion of ice/birds/hot exhaust gases), too rapid acceleration (too much fuel — combustion pressure rises faster than the compressor can cope), too rapid deceleration, compressor damage or contamination, operation outside the design RPM (bleed valves/VIGVs not scheduled correctly).",
        "§ Recognition",
        "Loud bangs or rumbling (surge), vibration, flames from the intake or exhaust, rising EGT/TGT, fluctuating or falling RPM and thrust/EPR, yaw (in multi-engine aircraft).",
        "§ Avoidance and action",
        "Smooth, gradual throttle movements; avoid flight at extreme attitudes with high power; observe crosswind limits for engine runs; correct operation of bleed valves and variable stator vanes (automatic). If a stall occurs: reduce thrust (throttle back) on the affected engine, monitor EGT, then advance slowly; shut down if the stall persists or the EGT limit is exceeded.",
      ],
    },
    {
      heading: "Fuel system — fuel injectors (burners) and failures",
      points: [
        "Fuel is sprayed into the combustion chamber by FUEL NOZZLES (burners/injectors) to atomise it into fine droplets (vaporising for good combustion). Types: simplex (single orifice — poor atomisation at low flows), duplex/dual-orifice (primary small orifice for low flow/start, secondary added at higher flow — good atomisation over the whole range), air-spray (fuel mixed with air for fine atomisation, lower smoke), vaporiser tubes.",
        "Fuel control unit (FCU/FADEC) meters fuel according to throttle position and engine parameters, limiting acceleration/deceleration rates and protecting from overspeed/over-temperature.",
        "§ Failures",
        "Blocked/partially blocked nozzles → distorted flame (hot streaks), local turbine damage, uneven temperature (EGT spread). Fuel control failures → overspeed, over-temperature, rollback (uncommanded loss of thrust) or flame-out. Fuel pump failure → flame-out (LP boost pump failure at high altitude may cause cavitation). Filter icing → filter bypass, power loss.",
        "Flame-out (extinguishing of combustion): from fuel starvation, severe compressor stall, ingestion of water/ice, or very low power at altitude; relight within the relight envelope (altitude/speed) per the checklist.",
      ],
    },
    {
      heading: "Turbine fuel — impurities, additives and safety aspects",
      points: [
        "§ Fuels",
        "Jet A-1 (kerosene, freezing point ≤ –47 °C — standard international), Jet A (USA, ≤ –40 °C), Jet B / JP-4 (wide-cut kerosene–gasoline blend — lower flash point, more volatile, greater fire risk, better cold starting).",
        "§ Impurities",
        "WATER — kerosene holds more dissolved water than avgas and releases it as droplets as it cools at altitude; water can freeze into ice crystals that block filters (fuel heater — fuel/oil heat exchanger — prevents this) and promotes microbial growth ('bugs' — fungi and bacteria living at the fuel/water interface, forming sludge that blocks filters, corrodes tanks and causes gauge errors). Drain water from tank sumps regularly. Solid contaminants (rust, sand, sealant) — filtered.",
        "§ Additives",
        "Fuel System Icing Inhibitor (FSII — e.g. diethylene glycol monomethyl ether): prevents ice crystal formation and also acts as a biocide. Biocides: kill microbial growth. Anti-static additive: increases conductivity so static charge dissipates during refuelling. Anti-oxidants and corrosion inhibitors. Only approved additives in approved concentrations.",
        "§ Safety aspects",
        "Static electricity during refuelling: BOND (earth) the aircraft and bowser before opening tanks; no refuelling during thunderstorms nearby; no smoking/naked flames/radios (HF); fire extinguisher available; passengers boarding during refuelling only with precautions (crew at exits, fire services/procedures as required). Fuel vapour is heavier than air and collects in low places. Never mis-fuel: Jet fuel in a piston engine (detonation) or avgas in a turbine (lead deposits; acceptable only in limited proportions if approved).",
      ],
    },
  ],
};
