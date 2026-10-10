// Aircraft Technical & General — study notes.
// Distilled from CAE Oxford ATPL Book 2 "Airframes & Systems" and the SACAA
// A.1 syllabus. This VOLUME covers A.1.1 structures, A.1.2 airframe/systems,
// A.1.6 emergency equipment and A.1.7 hazards. A.1.3 electrics, A.1.4 piston,
// A.1.5 turbine and A.1.8 aerodynamics come from other AGK/PoF volumes and
// are not sourced here.

export interface NoteBlock {
  heading: string;
  points: string[];
  // Figure-topic groups (from aircraft-technical-figures.ts) to render inline
  // under this block in the study view, so illustrations sit next to the text.
  figureTopics?: string[];
}

export interface SectionNote {
  sectionId: string;
  title: string;
  intro: string;
  blocks: NoteBlock[];
  mustKnow: string[];
  traps: string[];
}

const NOTES: Record<string, SectionNote> = {
  "A.1.1": {
    sectionId: "A.1.1",
    title: "Aircraft Elements",
    intro: "The common mechanical elements used throughout aircraft systems: valves, bearings, pumps and filters — what each type does and where it is used. (Fuselage/wing structure — spars, ribs, stringers, monocoque, loads and fatigue — is covered under A.1.2 Airframe & Systems.)",
    blocks: [
      { heading: "Valves", figureTopics: ["Valves"], points: [
        "Non-return (check) valve (NRV): allows flow one way only; used to stop back-flow.",
        "Pressure-relief valve: opens at a set pressure to protect the system from over-pressure.",
        "Selector valve: directs fluid/air to the selected service (e.g. gear up/down).",
        "Restrictor valve: meters/limits the rate of flow to control an actuator's speed.",
        "Thermal-relief valve: relieves pressure built up by heat (thermal expansion) in an isolated/closed line.",
      ]},
      { heading: "Bearings", points: [
        "Plain (journal) bearing: a sleeve/bush carrying a rotating shaft; cheap, takes radial loads, needs lubrication.",
        "Split bearing: a plain bearing made in halves so it can be fitted around a crankshaft journal.",
        "Bush: a simple plain bearing pressed into a housing.",
        "Ball bearing: rolling balls between races — low friction, takes radial and some axial (thrust) load.",
        "Roller bearing: rollers instead of balls — carries heavier radial loads; tapered rollers also take thrust.",
      ]},
      { heading: "Pumps", figureTopics: ["Pumps"], points: [
        "Gear pump: meshing gears; a constant-volume (fixed-displacement) pump used for hydraulics, oil and fuel.",
        "Vane pump: sliding vanes in a rotor; can be fixed or variable displacement.",
        "Piston pump: pistons in a swash-plate; high-pressure, and in variable-displacement form holds constant system pressure on demand.",
        "Diaphragm pump: a flexing diaphragm; used as an engine-driven fuel pump on light aircraft.",
        "Centrifugal pump: an impeller throws fluid outward; non-positive-displacement, used as a low-pressure fuel booster pump (will not build high pressure or air-lock).",
      ]},
      { heading: "Filters", figureTopics: ["Filters"], points: [
        "Filters/strainers remove contamination from hydraulic fluid, oil and fuel; sited in pressure, return and case-drain lines.",
        "Micron rating = the size of particle the filter stops (smaller micron = finer filtration).",
        "A bypass (relief) valve lets fluid pass if the filter clogs, so the service is not lost — but unfiltered.",
        "Sediment traps / drains at the lowest point collect water and debris (checked on the pre-flight).",
      ]},
    ],
    mustKnow: [
      "NRV = one-way; relief valve = over-pressure protection; selector = routes flow; restrictor = meters rate; thermal relief = heat-trapped pressure.",
      "Ball bearing = radial + some thrust; roller = heavy radial (tapered = thrust too).",
      "Gear/piston pumps build high pressure; centrifugal booster pump is low-pressure and won't air-lock.",
      "Filter bypass valve keeps the service running (unfiltered) if the element clogs.",
    ],
    traps: [
      "A centrifugal (booster) pump cannot generate high pressure — it primes/boosts, it does not meter.",
      "A clogged filter does not stop the service if a bypass valve is fitted — but the fluid is then unfiltered.",
      "Structure (stringers, spars, ribs, monocoque, DLL/DUL, fatigue) is under A.1.2, not here.",
    ],
  },

  "A.1.2": {
    sectionId: "A.1.2",
    title: "Airframe & Systems",
    intro: "Airframe structure (fuselage and wing construction, loads, fatigue) plus the big aircraft systems: hydraulics, landing gear/wheels/tyres/brakes, flight controls, pneumatics/air-conditioning, pressurization, ice & rain protection and fuel.",
    blocks: [
      { heading: "Loads & strength", points: [
        "Design Limit Load (DLL) = the greatest load expected in service; the structure must not deform permanently below it.",
        "Design Ultimate Load (DUL) = DLL × 1.5 safety factor; the structure must not fail below it.",
        "Loads are tension, compression, shear, bending and torsion — usually a combination.",
        "Maximum Zero Fuel Mass (MZFM): above it, extra mass must go in the wings (fuel) to relieve wing-root bending.",
      ]},
      { heading: "Fuselage & wing structure", figureTopics: ["Fuselage, Wings & Stabilising Surfaces"], points: [
        "Stressed-skin (monocoque/semi-monocoque): the skin is a primary load path, stiffened by frames/formers and longerons/stringers.",
        "Stringers are the long, lengthwise stiffeners riveted along the fuselage/wing: they assist the skin to carry longitudinal (bending/compressive) loads and stop it buckling. Frames/formers give the cross-sectional shape; longerons are the heavier lengthwise members.",
        "Wing: spars carry bending; ribs give the aerofoil shape and support the skin/stringers; skin + spars form the torsion box resisting twist.",
        "Cantilever wing has no external bracing (supported at the root only).",
        "Station numbers / water lines / buttock lines locate structure and components.",
        "Materials: mostly aluminium-alloy sheet + rivets, with steel/titanium at high-strength points; composites increasingly used.",
      ]},
      { heading: "Fatigue, flutter & balance", points: [
        "Safe-life: component replaced before its predicted fatigue life — no failure permitted in that life.",
        "Fail-safe: redundant load paths + programmed inspection tolerate a single failure.",
        "Damage-tolerant: redundant strength spread over a large area so a crack is found before it becomes critical.",
        "Pressurisation applies hoop stress cyclically → fuselage fatigue life is counted in pressurisation cycles.",
        "Flutter = destructive aeroelastic coupling of bending and torsion; mass balancing (control-surface CG forward of the hinge) prevents it.",
      ]},
      { heading: "Hydraulics", figureTopics: ["Hydraulics", "Valves", "Pumps", "Filters"], points: [
        "Pascal: pressure in an enclosed fluid acts equally in all directions; P = F/A, F = P×A.",
        "Core components: reservoir (makes up leaks/displacement/thermal, feeds pump), pump, filters (pressure/return/case-drain), relief valve (sets max pressure), accumulator (stores energy, damps, emergency reserve).",
        "Reservoir is pressurised/bootstrapped/raised to give a positive pump inlet and prevent cavitation.",
        "Valves: NRV (one-way), selector, shuttle (two sources → one service), restrictor (meters rate), priority (essentials first), ACOV (off-loads pump when accumulator charged), hydraulic fuse (limits loss on rupture), thermal relief (isolated lines).",
        "Fluids: DEF STAN 91-48 mineral = RED, neoprene/nitrile seals; Skydrol phosphate-ester = fire-resistant but attacks skin/paint, needs BUTYL seals. Never mix.",
        "Accumulator: gas pre-charge; low pre-charge → pressure fluctuation (hammering).",
      ]},
      { heading: "Landing gear, wheels, tyres, brakes", figureTopics: ["Landing Gear", "Aircraft Wheels", "Aircraft Tyres", "Aircraft Brakes"], points: [
        "Oleo strut: GAS = springing, OIL = damping of compression and extension; a separator piston keeps gas and oil apart; the flutter valve damps the rebound.",
        "Retraction uses hydraulic jacks (or an electric motor/screwjack on light types) with uplocks/downlocks; sequence valves time the doors and legs; a restrictor in the up-line limits free-fall speed; emergency extension lets the gear free-fall (gravity + lock-assist springs).",
        "Gear indication: a RED light = gear unlocked/in-transit (or not down with a thrust lever at idle); GREEN = down-and-locked. The gear lever has a lever-lock to stop UP selection on the ground, with an override trigger to bypass it.",
        "Air/ground (weight-on-wheels) logic inhibits retraction on the ground; ground-lock pins removed before flight and stowed in view.",
        "Nose wheel centred before retraction; steering castors within preset limits; worn torque links → shimmy.",
        "Tyres: inflated with NITROGEN; ply rating = index of STRENGTH; creep monitored by paint marks, resisted by knurled flange/tapered bead seat; fusible plugs melt red 155 / green 177 / amber 199 °C.",
        "Over-inflation → crown wear; under-inflation → shoulder wear. Cold gauge reads ~4% low vs loaded rated; taxi heat raises pressure ~10%.",
        "Aquaplaning (dynamic) speed Vp = 9√P (P in psi, Vp in knots).",
        "Brakes: usually multi-disc (rotors keyed to wheel, stators to axle) powered from the main hydraulic system; an automatic adjuster takes up wear and retracts the pads; wear is checked by the wear-pin length with brakes applied; fade = overheating.",
        "Anti-skid (one modulating valve per wheel, fed by wheel-speed sensors) releases pressure on an incipient skid for maximum braking without locking; it provides touchdown, locked-wheel and normal protection, dropping out at low speed (~10 mph / 15 kt).",
        "Brake energy after a stop is judged in energy 'zones': above the danger level clear the runway, use minimum braking, don't set the park brake, and let brakes cool (tyres may deflate via the fusible plugs). High-temp/overheat warning lights and brake-temperature indication are provided.",
        "Wheel/brake fires: use DRY POWDER (not water/CO₂ on magnesium wheels); approach fore-and-aft, never from the side; allow a long cooling period (hours, unless forced-air cooled).",
      ]},
      { heading: "Flight controls", figureTopics: ["Flight Control Systems", "Flight Controls", "Powered Flying Controls"], points: [
        "Manual controls are reversible and move in the instinctive sense; cables tensioned (turnbuckle, measured by tensiometer) to remove backlash and give positive two-way action; temperature compensator holds tension.",
        "Powered/irreversible controls need an artificial feel unit (spring and/or Q-pot proportional to dynamic pressure); power-assisted controls remain reversible.",
        "Redundancy via split surfaces + multiple hydraulic systems; FBW adds flight-envelope protection and reduces weight.",
        "High-lift: TE flaps (plain ~50%, split ~60%, slotted ~65%, Fowler ~90% + area); LE slats/Kruger; spoilers/speed-brakes dump lift (ground spoilers armed by weight-on switch).",
        "TE flap types compared: plain hinges down (camber only); split lowers the lower surface (more drag than lift); slotted ducts fast air over the flap to delay the stall; Fowler slides aft then down to add area and camber (most lift). Slots between Fowler segments re-energise the airflow at large angles.",
        "Speed-brake lever detents (airliner): DOWN = all spoilers retracted; ARMED = on touchdown the lever drives UP and all flight + ground spoilers extend automatically; FLIGHT DETENT = flight spoilers to their max in-flight position; UP = all spoilers fully up for ground lift-dumping. A 'SPEED BRAKE DO NOT ARM' light shows an abnormal/test condition; 'SPEED BRAKE ARMED' confirms valid auto-deploy inputs.",
        "Trim tab principle: to hold the control surface at its trimmed angle, the surface hinge moment (surface force F1 × distance d1 from the hinge) must be balanced by the tab moment (tab force F2 × distance d2). The tab is small but has a long moment arm, so a little tab deflection trims a large surface — but it slightly reduces the effective surface area/effectiveness.",
        "Mass balance vs aerodynamic balance: aerodynamic balances (horn, set-back/inset hinge, internal balance seal) lighten the pilot's effort; a mass-balance weight ahead of the hinge moves the surface CG onto/ahead of the hinge to prevent flutter and does not affect stick force.",
        "Stabiliser trim switches: on the control wheel there are two trim switches, spring-loaded to neutral, and BOTH must be pressed together to drive the stabiliser trim (one switch arms, the other opens the trim-control-unit valves to release the brake and power the hydraulic motors) — a guard against a single-switch runaway.",
        "Control-position indicators: an electronic display (e.g. on ECAM/EICAS) shows the actual position of aileron, elevator and rudder surfaces, plus system data (hydraulic quantity, APU EGT/RPM, oxygen pressure, elevator feel, cabin-altitude control), so the crew can confirm surfaces have responded to inputs.",
      ]},
      { heading: "Pneumatics, air-con & pressurization", figureTopics: ["Pneumatic Systems", "Pressurisation Systems"], points: [
        "Bleed air feeds air-conditioning, pressurisation, anti-ice and air-turbine motors; cooling by air-cycle (bootstrap: turbine drives compressor) with heat exchanger + water separator.",
        "Air-con standards: ~1 lb fresh air/seat/min, cabin 18–24 °C, CO must not exceed 1:20 000.",
        "Pressurisation: constant mass inflow, variable outflow valve; max diff ~8–9 psi; cabin held to ~8000 ft max; cabin rate ~500 ft/min climb, ~300 ft/min descent.",
        "Control schedule: proportional (climb) → isobaric (cruise) → max-diff; safety (positive) valve, inward-relief (negative-diff) valve and dump valve — safety & inward relief must be DUPLICATED.",
        "Aural + visual warning when cabin altitude exceeds 10 000 ft.",
      ]},
      { heading: "Ice/rain protection & fuel", figureTopics: ["Ice & Rain Protection", "Fuel Systems"], points: [
        "Thermal (hot bleed air) and electrical anti-ice on leading edges/intakes; pneumatic de-icing boots; fluid (TKS) systems; windscreen heating.",
        "Anti-icing (prevents ice forming — continuous) vs de-icing (removes ice already formed — cyclic). Boots de-ice; hot-air/electrically-heated leading edges anti-ice.",
        "Ice detectors: pressure-type (holes in a probe blocked by ice — e.g. Smiths, Teddington aerofoil-mast type), rotary/Napier (ice jams a rotating knife-edge → microswitch), Rosemount vibrating probe (ice lowers the ~35 kHz frequency — modern standard), moisture+thermal (warns only when damp AND cold), beta-particle (ice absorbs beta particles). Many auto-arm the anti-ice.",
        "Propeller de-icing: ice distorts the blade aerofoil, causes imbalance/vibration and loss of efficiency, and shed chunks can damage the fuselage. Protection by anti-icing fluid (pumped to a slinger ring and flung out along the blades by centrifugal action, sometimes with rubber overshoes) or by electrical cyclic heating (power relay → brushes → slip rings → heating elements, sequenced by a cyclic timer). Inner third of the blade is always de-iced; the middle third is done only if the prop needs it.",
        "Fuel grades: AVGAS 100LL blue / 100 green (SG ~0.72); Jet A1 kerosene SG ~0.8, flash 38 °C, wax −47 °C; Jet B wide-cut SG ~0.77, more volatile.",
        "Additives: FSII (anti-icing + anti-fungal against Cladosporium resinae), HITEC (lubricity), static dissipater.",
        "Tanks integral/rigid/flexible with baffles; booster pumps = low-pressure centrifugal (AC); collector/feeder box keeps pumps submerged; cross-feed any tank→any engine.",
        "Contents: capacitance = MASS (SG- and attitude-compensated) vs float = VOLUME (manoeuvre error, no SG comp). Cloudy sample = water. Fuel heater stops ice blocking the LP filter.",
        "Refuelling: bond/ground the nozzle to the aircraft; fuelling zone extends ~6 m (20 ft); jettison protected by low-level switches; CS-25 requires enough fuel after jettison to climb to 10 000 ft + 45 min cruise.",
      ]},
    ],
    mustKnow: [
      "Stringers → stiffen the skin and help it carry longitudinal compressive/bending loads (stop it buckling); spar → bending; ribs → shape/skin support; torsion box (spar+skin) → twist.",
      "DUL = DLL × 1.5; fuselage fatigue life = number of pressurisation cycles; mass balance prevents flutter.",
      "P = F/A; Pascal — pressure equal in all directions.",
      "Mineral fluid RED/neoprene; Skydrol ester/BUTYL — never mix.",
      "Oleo: gas springs, oil damps. Tyres nitrogen; Vp = 9√P (psi→kt).",
      "Dry powder on wheel/brake fires; anti-skid take-off + landing.",
      "Irreversible powered controls need artificial feel; mass balance stops flutter.",
      "Pressurisation: constant inflow, variable outflow; max diff ~8–9 psi, cabin ~8000 ft; warning >10 000 ft.",
      "Capacitance gauge = mass (SG/attitude compensated); float = volume.",
    ],
    traps: [
      "When air is pressurised the % O₂ stays ~21% — only partial pressure changes.",
      "Capacitance fuel gauge fails to EMPTY (fail-safe); water fills it to FULL (high dielectric).",
      "Ply rating indexes strength, not the number of plies.",
      "Safety/inward-relief valves must be duplicated; dump valve is manual.",
    ],
  },

  "A.1.3": {
    sectionId: "A.1.3",
    title: "Electrics",
    intro: "Aircraft DC and AC electrical systems: generation, batteries, distribution, protection and bonding — enough to read the cockpit panel and troubleshoot a failure.",
    blocks: [
      { heading: "Basic DC principles", figureTopics: ["DC principles & circuits"], points: [
        "Ohm's law: V = I × R. Power: P = V·I = I²·R = V²/R.",
        "Series adds resistance and voltage; parallel adds current paths (resistance falls, capacity in batteries adds).",
        "Series resistors: R = R₁+R₂+R₃. Parallel resistors: 1/R = 1/R₁+1/R₂+1/R₃ (total is less than the smallest).",
        "Kirchhoff: current into a junction = current out (I₃ = I₁+I₂); the voltage drops around a loop add up to the supply EMF.",
        "A megohm = 1 000 000 Ω; insulation resistance is measured with a megohmmeter.",
        "Conventional current flows + to − (electron flow is − to +); an earth-return system uses the airframe as the negative return.",
      ]},
      { heading: "Switches & sensors", figureTopics: ["Switches & sensors"], points: [
        "Switches: two-position (ON/OFF) and three-position (e.g. IN/OFF/OUT); guarded switches need the guard lifted to prevent accidental selection.",
        "Switch-lights show state in the button (e.g. guarded momentary light, or a flowbar indicator showing a valve/contactor has actually moved).",
        "Microswitch: a plunger moves a contact between a common terminal and fixed terminals — used for limit sensing (flaps, gear, doors).",
        "Proximity sensors (inductive) sense a metal target without contact — no wearing parts; widely used for landing-gear up/down-lock and door sensing.",
        "Magnetic (variable-reluctance) pickup: a coil on a magnet senses passing gear teeth and generates a pulse — used for RPM/speed sensing.",
      ]},
      { heading: "Capacitors", figureTopics: ["Capacitors"], points: [
        "A capacitor is two metal plates separated by an insulator (the dielectric); it stores energy in the electric field between the plates.",
        "It BLOCKS DC (once charged, no current flows through the dielectric) but PASSES AC (it charges and discharges each cycle). Charge stops when the plate voltage equals the supply.",
        "Capacitance rises with larger plate area, smaller gap and a better dielectric. Types: fixed non-polarised, fixed polarised (must be the right way round), variable and preset.",
        "Capacitors in PARALLEL add: C = C₁ + C₂ (more plate area). Capacitors in SERIES combine like parallel resistors: 1/C = 1/C₁ + 1/C₂ (less than the smallest).",
        "Uses: smoothing/filtering, suppressing interference and arcing across contacts, and storing charge.",
      ]},
      { heading: "Batteries", figureTopics: ["Batteries"], points: [
        "Lead-acid and NiCad; capacity in ampere-hours (A·h) quoted at a stated discharge rate (e.g. 60 A·h at the 10-hour rate = 6 A for 10 h).",
        "Check battery voltage ON LOAD — off-load it can read full volts yet be flat.",
        "Series connection adds voltage, capacity unchanged; parallel adds capacity, voltage unchanged.",
        "NiCad rising temperature/charge current warns of THERMAL RUNAWAY — a fire risk; a thermal switch isolates it from the charger and lights a flight-deck warning. NiCad holds a steadier voltage on discharge, so it is preferred on large aircraft.",
        "Lead-acid: + plate lead peroxide, − plate spongy lead, electrolyte dilute sulphuric acid; per-cell ~2 V on load, 2.2 V off load. SG (checked with a hydrometer) falls as it discharges (≈1.270 charged → 1.170 flat). Top up with distilled water only.",
        "Alkaline (NiCad): + plate nickel oxide/hydroxide, − plate cadmium, electrolyte potassium hydroxide; SG ≈1.240–1.300 and barely changes with charge, so SG is NOT a state-of-charge guide for NiCad.",
        "Spillage neutraliser: sodium bicarbonate for lead-acid (acid), boric acid for alkaline (NiCad). A discharged lead-acid battery (low SG) can freeze in cold — keep it charged in winter.",
      ]},
      { heading: "Magnetism & electromagnetism", figureTopics: ["Magnetism & electromagnetism"], points: [
        "Like poles repel, unlike poles attract; magnetic field lines run N→S outside the magnet and never cross. Iron is easily magnetised; a soft-iron piece concentrates/screens flux.",
        "Domain theory: in an unmagnetised bar the tiny magnetic domains point randomly; magnetising lines them up; when all are aligned the magnet is SATURATED (no stronger).",
        "A current in a wire makes a circular magnetic field around it (right-hand rule). Current INTO the page = ⊗ (cross), OUT of the page = ⊙ (dot).",
        "A coil (solenoid) carrying current behaves like a bar magnet with N and S poles; wind it on a soft-iron core and it becomes a strong electromagnet.",
        "Solenoid (moving core) and relay (fixed core, moving armature) both let a small current switch a large one. Parallel wires attract if currents are the same way, repel if opposite.",
        "Motor principle: a current-carrying conductor in a magnetic field feels a force — its own field strengthens the main field on one side and weakens it on the other, pushing it toward the weak side (Fleming's left-hand rule).",
      ]},
      { heading: "Generation & regulation", figureTopics: ["Generation & regulation"], points: [
        "Electromagnetic induction: an EMF is induced only when there is RELATIVE MOTION between a conductor and a magnetic field (Faraday). Its direction depends on the direction of motion; Fleming's RIGHT-hand rule gives it for a generator (thuMb motion, First finger field, seCond finger current).",
        "Induced EMF is bigger with faster motion, a stronger field, or more turns on the coil. Max EMF when cutting flux at right angles; zero at the 'neutral plane' where the conductor moves parallel to the flux.",
        "A simple generator's loop (armature) in a field makes AC. A split-ring COMMUTATOR turns it into pulsating DC; many coils/segments smooth the DC almost ripple-free. Slip rings (not split) keep the output as AC (alternator).",
        "DC generator = rotating armature + stationary field + commutator & brushes. Alternator = rotating field + stationary armature + rectifier (no commutator) — lighter, less brush wear, better at high RPM.",
        "Field types: series-wound (output rises with load then saturates), shunt-wound (nearly constant voltage no-load→full-load), compound (combines both for a flat characteristic).",
        "Generators (DC) and alternators (AC); a voltage regulator holds voltage by varying field current regardless of RPM/load.",
        "Reverse-current cut-out opens to stop the battery feeding back into the generator when generator volts fall below battery volts; closes when generator volts exceed battery volts.",
        "Generator failure: red warning light on, ammeter reads zero/discharge. A generator failure is electrical only — engines run normally.",
        "Paralleled generators must share voltage equally, or a circulating current flows between them; load shedding drops non-essential loads.",
      ]},
      { heading: "Distribution, protection & bonding", figureTopics: ["Distribution & bus-bars", "Circuit protection"], points: [
        "Bus-bars distribute power; essential/non-essential/battery buses allow load shedding and isolation.",
        "Fuses/circuit breakers protect by current rating; replace a fuse once with the correct rating (never higher). A trip-free CB won't reset until the fault clears.",
        "Fuse construction: a thin element/resistance wire in a ceramic barrel (sand-filled to quench the arc) melts when current exceeds the rating. Heavy feeders use bolt-in current limiters.",
        "Circuit breaker: a push-pull button that trips on overload and shows a white marker band; press to reset once the fault is gone. 'Trip-free' means it cannot be held closed onto a fault.",
        "An inertia (crash) switch isolates power on heavy deceleration.",
        "Bonding gives a low-resistance path for earth-return and safe static/lightning dissipation; screening suppresses radio interference.",
        "Motors: back-EMF rises with speed (limiting current); shunt-generator output voltage droops as load is applied.",
      ]},
    ],
    mustKnow: [
      "V = IR; P = VI = I²R = V²/R.",
      "Battery A·h at a stated rate; check ON LOAD; series adds volts, parallel adds capacity.",
      "NiCad overheating = thermal runaway.",
      "Reverse-current cut-out stops battery back-feeding the generator.",
      "Replace a fuse once with the correct rating; bonding = earth return + static/lightning dissipation.",
    ],
    traps: [
      "A generator failure does NOT stop the engine — it is electrical only.",
      "Doubling circuit voltage doubles the current (constant R).",
      "Paralleled generators at different voltages drive a circulating current.",
    ],
  },

  "A.1.4": {
    sectionId: "A.1.4",
    title: "Powerplant — Piston Engine",
    intro: "The four-stroke piston engine: how it makes power, and the systems that keep it running — fuel/mixture, carburation and icing, ignition, lubrication, cooling, supercharging and the propeller.",
    blocks: [
      { heading: "Four-stroke cycle", figureTopics: ["Piston Engines - Introduction", "Piston Engines - General"], points: [
        "The four strokes in order: INDUCTION, COMPRESSION, POWER, EXHAUST (two crankshaft revolutions = 720° for one complete cycle).",
        "Combustion is theoretically at CONSTANT VOLUME (Otto cycle); peak pressure occurs just after TDC on the power stroke.",
        "Stroke = twice the crank throw. The camshaft runs at HALF crankshaft speed (one cam revolution per cycle).",
        "Valve lead/lag/overlap optimise cylinder filling and scavenging: inlet opens before TDC, exhaust closes after TDC — the overlap uses exhaust momentum to draw in more mixture (improves volumetric efficiency).",
        "Compression ratio = (swept volume + clearance volume) ÷ clearance volume. Higher CR → higher thermal efficiency (but more prone to detonation).",
      ]},
      { heading: "Construction & components", figureTopics: ["Piston Engines - General"], points: [
        "Reduction gear sits between crankshaft and propeller so the prop turns slower than the crank (keeps tip speed subsonic).",
        "Two valve springs per valve resist valve bounce (and give a safety margin if one breaks).",
        "Tappet (valve) clearance allows for thermal expansion of the valve gear as the engine warms up; too little → valve held open (burnt valve, weak cylinder), too much → noisy, late/short valve opening.",
        "A crankcase breather keeps crankcase pressure at atmospheric (prevents pressure build-up and oil leaks).",
        "Sodium-filled exhaust valve stems assist cooling of the highly-stressed exhaust valve.",
      ]},
      { heading: "Engine power & efficiency", figureTopics: ["Piston Engines - General"], points: [
        "IHP (indicated) = power developed in the cylinders; BHP (brake) = useful power at the output shaft; FHP (friction) = power lost to friction. IHP = BHP + FHP.",
        "An indicator diagram plots cylinder pressure against piston position over the cycle; its average height is the indicated mean effective pressure (IMEP), from which indicated power is found. The enclosed loop's area represents the work done each cycle.",
        "Mechanical efficiency = BHP ÷ IHP. Thermal efficiency improved by a higher compression ratio.",
        "Power output is proportional to the MASS of mixture (charge) burned — hence the benefits of cold, dense air and supercharging.",
        "Volumetric efficiency = actual charge inducted ÷ theoretical cylinder volume; improved by valve overlap, ram effect and supercharging.",
        "Specific Fuel Consumption (SFC) = fuel used per unit power per unit time; lower is better.",
      ]},
      { heading: "Fuel, mixture & carburation", figureTopics: ["Piston Engines - Fuel", "Piston Engines - Mixture", "Piston Engines - Carburettors", "Piston Engines - Fuel Injection"], points: [
        "Chemically correct (stoichiometric) air:fuel ratio ≈ 15:1 by mass. Rich < 15:1, weak/lean > 15:1.",
        "Maximum POWER at a slightly rich mixture (~12:1); maximum ECONOMY at a slightly weak mixture; peak EGT at the chemically-correct mixture.",
        "AVGAS grades: 100LL = blue, 100 = green (SG ≈ 0.72). Octane = anti-knock rating. Never use a lower grade than specified; a higher grade is acceptable.",
        "Float carburettor: a float + needle valve hold a constant fuel level; the venturi's low pressure draws fuel up the main jet; a pressure-balance duct keeps metering correct if the air filter clogs.",
        "Corrections fitted to the simple carburettor: an air bleed / diffuser emulsifies the fuel and stops the mixture going rich as airflow rises; a separate idle (slow-running) jet feeds fuel just downstream of the closed throttle; the idle cut-off (mixture control) stops the engine by cutting fuel.",
        "Mixture/power enrichment: a needle-and-orifice mixture control (or a back-suction economizer worked by manifold pressure) enriches at high power; an accelerator pump squirts extra fuel on rapid throttle opening to prevent a lean 'flat spot' / weak cut.",
        "Fuel injection meters fuel directly to each cylinder, avoiding carburettor icing and giving more even distribution.",
        "Applying carburettor heat gives warmer, less-dense air → the mixture becomes RICHER (and power drops slightly).",
      ]},
      { heading: "Carburettor & induction icing", figureTopics: ["Piston Engines - Icing"], points: [
        "Three types: fuel-evaporation (refrigeration) icing at the jet, throttle (butterfly) icing, and impact icing at the intake.",
        "Carb icing is most likely at low power/closed throttle, in high-humidity air at +0 to +20 °C (can occur well above freezing).",
        "First sign on a fixed-pitch prop is a drop in RPM (or MAP on a constant-speed prop); apply FULL carb heat — RPM drops first, then rises as ice clears.",
      ]},
      { heading: "Ignition", figureTopics: ["Piston Engines - Ignition"], points: [
        "Dual ignition (two magnetos, two plugs/cylinder) gives redundancy AND more complete, faster combustion (better efficiency).",
        "Magnetos are engine-driven and self-contained (no battery needed once running). The ignition switch GROUNDS the magneto to stop the engine — a broken P-lead leaves a 'live' mag that cannot be switched off.",
        "An impulse coupling (or booster) retards and intensifies the spark for starting; centrifugal force disengages it at running speed.",
      ]},
      { heading: "Lubrication", figureTopics: ["Piston Engines - Lubrication"], points: [
        "Oil does five jobs: lubricates, cools, cleans (carries away debris), seals (the piston rings against the bore) and cushions. A large part of a piston engine's internal cooling comes from the circulating oil.",
        "Wet sump: oil is carried in the sump under the engine (simple, light — most light aircraft). Dry sump: oil is held in a separate tank and returned by scavenge pumps (needed for aerobatics and large/inverted engines, since the sump can't be relied on to keep the pick-up covered).",
        "Dry-sump system flow: tank → suction filter → pressure pump → pressure filter → engine bearings/galleries; a scavenge pump (bigger than the pressure pump, as the return oil is frothy) draws the used oil back through a scavenge filter and the oil cooler to the tank.",
        "An oil pressure relief valve limits the maximum oil pressure; actual pressure depends on pump speed, oil temperature and the resistance of the components. A filter bypass keeps oil flowing (unfiltered) if the filter clogs.",
        "The oil cooler has an anti-surge / thermostatic by-pass valve: when the oil is cold and thick it by-passes the cooler matrix, and only passes through the cooler once warm — keeping oil temperature in limits. A de-aerator (hot well/hot pot) in the tank removes air from the returning frothy oil.",
        "For a given oil, viscosity falls as temperature rises. Grades: straight mineral oils carry an SAE number (e.g. SAE 40/50); ashless-dispersant oils (prefix 'W', e.g. W100) keep contaminants suspended; multigrade (e.g. 15W-50) works across a wide temperature range. A new or freshly-overhauled engine is run on straight mineral oil for bedding-in.",
        "Excessive blue exhaust smoke (warm engine) = oil burning past worn or stuck piston rings; rising oil temperature at constant power points to an oil-cooler problem.",
      ]},
      { heading: "Cooling", figureTopics: ["Piston Engines - Cooling"], points: [
        "Most light-aircraft engines are AIR-cooled: cooling fins on the cylinders increase surface area, the cowling ducts ram air over them, and inter-cylinder baffles direct the air down and around each cylinder so every one cools evenly. The firewall separates the engine bay from the cabin.",
        "Cowl flaps at the rear of the cowling are opened (more airflow) to control CYLINDER-HEAD TEMPERATURE (CHT) — open on the ground and in the climb, closed in the cruise/descent to avoid over-cooling. Shock cooling (rapid power/airflow change) can crack a hot cylinder.",
        "A rich mixture also cools the cylinders (the excess fuel absorbs heat) — one reason full rich is used at high power.",
        "Liquid (water/glycol) cooling, by contrast, pumps coolant through the block to a radiator with a header tank; it cools very evenly but is heavier and more complex, so it is rare on light aircraft.",
      ]},
      { heading: "Supercharging & turbocharging", figureTopics: ["Piston Engines - Performance and Power Augmentation"], points: [
        "A supercharger (engine-driven, via an impeller/diffuser) or turbocharger (exhaust-driven) raises induction manifold pressure to MAINTAIN POWER as altitude increases.",
        "Turbocharger = compressor + turbine on a common shaft driven by exhaust gas; boost is set by a WASTEGATE (lets exhaust bypass the turbine), closed progressively with altitude to hold boost. Control types: fixed orifice, differential-pressure, density, and absolute-pressure controllers (aneroid capsule + oil-operated servo).",
        "Boost pressure = induction pressure relative to sea-level standard (±psi on a boost gauge); an automatic boost controller holds the selected boost so the engine can't be over-boosted.",
        "Critical altitude / full-throttle height (FTH) = the highest altitude at which rated boost/MAP can still be maintained with the throttle fully open; above it, power falls like a normally-aspirated engine.",
        "Detonation = spontaneous, explosive burning of the end-gas (high MAP + low RPM + lean + hot). Pre-ignition = charge ignites before the spark (hot spot). Both cause knocking, high CHT and engine damage — cure: reduce power, enrich, open cowl flaps.",
      ]},
      { heading: "Propellers", figureTopics: ["Piston Engines - Propellers"], points: [
        "Blade twist keeps the angle of attack roughly constant along the span (the tip moves faster than the root).",
        "Fixed-pitch is efficient only at one speed; a constant-speed unit (CSU) varies blade angle to hold the selected RPM, giving best efficiency across the range.",
        "Fine pitch = low blade angle (take-off/climb, high RPM); coarse pitch = high angle (cruise, low RPM). Feathering (~90°) stops a dead engine windmilling and minimises drag.",
        "A pilot selects feather by pulling the propeller (RPM) lever fully back past a gate/dog-leg. Asymmetric blade effect (P-factor) increases with power and with prop-disc angle of attack.",
        "Blade-angle ranges: REVERSE (negative pitch, for braking) · GROUND FINE (flat, low-drag for taxi) · the FLIGHT (constant-speed) range between flight-fine and flight-coarse · FULL FEATHER (~90°). The CSU governs within the flight (alpha) range; the beta range (ground fine to reverse) is set directly by the lever.",
        "Pitch change: oil pressure against a feathering spring + counterweights (single-acting), or oil on both sides (double-acting). Loss of oil pressure drives the blade toward feather (spring/counterweights). Unfeathering in flight uses a pre-charged accumulator or an electric feathering pump.",
        "Multi-engine extras: a synchroniser (master/slave governors + magnetic pickup) matches RPM to remove the beat; a reduction gear (spur or epicyclic) lets the prop turn slower than the crank to keep tip speed subsonic; a torquemeter senses gear end-thrust to indicate power.",
      ]},
      { heading: "Engine handling", points: [
        "Avoid high MAP with low RPM (detonation risk): when increasing power, increase RPM (prop lever) first, then MAP (throttle); when reducing, reduce MAP first, then RPM.",
        "Lean per the manufacturer's schedule; over-leaning raises CHT/EGT and risks detonation.",
        "Shock cooling (rapid power reduction) can crack cylinders — reduce power gradually.",
      ]},
    ],
    mustKnow: [
      "Cycle: induction, compression, power, exhaust (720°); combustion at constant volume; cam at half crank speed.",
      "Stoichiometric ≈ 15:1; max power slightly rich, max economy slightly weak, peak EGT at chemically correct.",
      "Carb heat → richer mixture; carb ice likely at low power, high humidity, 0–20 °C.",
      "Ignition switch grounds the magneto; broken P-lead = live mag. Dual ignition = reliability + efficiency.",
      "Turbo/supercharger maintains power with altitude; detonation = high MAP + low RPM + lean + hot.",
      "Feather ~90° to stop windmilling; CSU holds RPM by varying blade angle.",
    ],
    traps: [
      "Max EGT is at the CHEMICALLY-CORRECT mixture, not full rich (full rich runs cooler).",
      "Carburettor icing can occur well ABOVE 0 °C (refrigeration effect), typically at low power.",
      "Cowl flaps control CHT, not oil temperature.",
      "Octane is an anti-knock index — a HIGHER grade is fine, a lower grade is not.",
    ],
  },

  "A.1.5": {
    sectionId: "A.1.5",
    title: "Powerplant — Gas Turbine",
    intro: "The gas-turbine (jet) engine: the continuous working cycle and each module — intake, compressor, combustion chamber, turbine, exhaust — plus thrust, reverse thrust, lubrication, ignition/starting, fuel and bleed-air systems.",
    blocks: [
      { heading: "Principle & types", figureTopics: ["Gas Turbines - Introduction"], points: [
        "Continuous cycle: SUCK (intake) – SQUEEZE (compressor) – BANG (combustion, ~constant pressure) – BLOW (turbine + exhaust). Thrust comes from Newton's 2nd/3rd laws (rate of change of momentum).",
        "Types: turbojet, turbofan (bypass — most airline thrust from the cold fan stream), turboprop and turboshaft.",
        "Bypass ratio = mass flow of bypass (cold) air ÷ mass flow through the core. High bypass = quieter, more efficient at subsonic speed.",
        "Spools: single/twin/triple-spool (N1 LP, N2 HP, N3). Each spool runs at its own optimum speed.",
      ]},
      { heading: "Air intake", figureTopics: ["Gas Turbines - Air Inlets"], points: [
        "A subsonic intake is DIVERGENT: it slows the air (ram recovery), raising static pressure and temperature while velocity falls; total (stagnation) temperature stays constant.",
        "The intake must deliver smooth, distortion-free air to the compressor to avoid surge.",
      ]},
      { heading: "Compressors", figureTopics: ["Gas Turbines - Compressors"], points: [
        "Axial-flow compressor: rotor stages add energy (velocity), stator stages (diffusers) convert velocity to pressure; pressure rises stage by stage.",
        "Centrifugal compressor: robust, high pressure-rise per stage, but larger frontal area — used on small/APU engines.",
        "Each rotor+stator = one stage; the air is diffused (slowed, pressure raised) through the stators.",
      ]},
      { heading: "Compressor stall & surge", points: [
        "Stall/surge = breakdown of airflow (blade angle of attack too high), often from rapid throttle movement, damage or icing — bangs, vibration, rising EGT, thrust loss.",
        "Prevented by: variable inlet guide vanes, variable stators, bleed (surge) valves that spill air at low RPM, and multi-spool design.",
      ]},
      { heading: "Combustion chamber", figureTopics: ["Gas Turbines - Combustion Chambers"], points: [
        "Only ~20–25% of the air (primary air) is used for combustion; the rest (secondary/tertiary air) cools the flame tube and dilutes the gas before the turbine.",
        "A toroidal vortex anchors and stabilises the flame; the flame tube is cooled by a film of secondary air.",
        "Types: multiple (can), tubo-annular (cannular), and annular (most modern — lightest, most efficient).",
        "Stability: the flame only stays alight between a weak limit and a rich limit of air/fuel ratio, and that stable band narrows as the air mass flow rises — too much airflow (high speed/high altitude) can blow the flame out.",
        "Lighting the mixture is harder than keeping it alight, so there is an 'ignition loop' inside the stable band; after a flame-out the engine can only be relit within a defined 'relight envelope' of altitude and airspeed (windmilling supplies the air, so you open the HP cock and select ignition).",
        "Fuel is burned at roughly constant pressure; combustion efficiency is very high (~99% at high power, ~95% at idle).",
      ]},
      { heading: "Turbine assembly", figureTopics: ["Gas Turbines - The Turbine Assembly"], points: [
        "The turbine extracts energy from the gas to drive the compressor and accessories. Highest gas temperature is at turbine entry (the most thermally-critical part).",
        "Nozzle guide vanes (NGVs) accelerate and direct gas onto the turbine blades; the gas expands and cools through the turbine.",
        "Blades are cooled internally by compressor air; 'fir-tree' roots allow for expansion. Active clearance control cools the casing to minimise tip clearance (efficiency).",
      ]},
      { heading: "Exhaust & thrust", figureTopics: ["Gas Turbines - The Exhaust System", "Gas Turbines - Thrust"], points: [
        "The propelling nozzle is sized to give the correct pressure/velocity balance; gas velocity is greatest at the nozzle exit.",
        "Thrust ≈ mass flow × (jet velocity − intake velocity). Thrust falls with altitude (lower density) and with higher forward speed; it rises in cold, dense air.",
        "EPR (engine pressure ratio) or N1 (fan speed) is the primary cockpit thrust indicator on a turbofan.",
        "Thrust is non-linear with RPM — the last ~10% of engine speed gives ~30% of the thrust, so the engine must be near max for most of its thrust.",
        "Flat-rating: below the corner temperature (~15 °C / ISA) the engine is held to a power/thrust limit; above it the engine is EGT-limited and available thrust falls as OAT rises (hot-day performance loss).",
        "Forward speed first reduces net thrust, but intake ram recovery (and bypass) partly offsets it; a turboprop puts most output into shaft horsepower with a small residual jet thrust and has a much lower SFC.",
        "A convergent nozzle may 'choke' (reach Mach 1 at the throat); extra pressure thrust then develops. A convergent-divergent (con-di) nozzle is needed to accelerate the jet beyond Mach 1 (supersonic aircraft).",
        "Ground danger areas: the intake can suck a person/FOD in from several metres ahead, and the exhaust jet is extremely hot and fast for a long distance behind — keep clear of both the suction zone and the blast zone with an engine running.",
        "Jet noise comes from the shear layer where the jet meets still air; lowering jet velocity (high bypass) is the main way to reduce it, aided by acoustic liners in the ducts.",
      ]},
      { heading: "Reverse thrust", figureTopics: ["Gas Turbines - Reverse Thrust"], points: [
        "On a high-bypass turbofan, most reverse thrust comes from deflecting the COLD fan (bypass) stream forward via blocker doors and cascades.",
        "Most effective at high speed just after touchdown; cancelled by ~60 kt to avoid re-ingesting debris/exhaust (FOD, compressor stall).",
        "In-flight deployment is prevented by weight-on-wheels / throttle interlocks.",
        "Types: clamshell doors and bucket/target reversers act on the hot stream; blocker-door + cascade reversers act on the cold bypass stream (the usual high-bypass type).",
        "AMBER reverse-thrust warning lights on the flight deck show when the reverser doors are unlocked / away from the stowed (forward-thrust) position; safety interlocks protect against malfunction or incorrect use.",
      ]},
      { heading: "Lubrication", figureTopics: ["Gas Turbines - Lubrication"], points: [
        "Self-contained recirculating system lubricates and cools the bearings and gearbox; synthetic oils are used.",
        "Gear-type pumps (meshing gears in a close-fitting housing) are the normal pressure and scavenge pumps; there are more/bigger scavenge pumps than pressure pumps because the returning oil is frothy and bulkier.",
        "A fuel-cooled oil cooler transfers heat from the oil to the fuel (cools the oil, warms the fuel to prevent fuel icing); a bypass keeps oil flowing if the matrix is blocked or the oil is cold.",
        "A de-aerator removes air from returning oil; a centrifugal breather separates oil from the bearing-chamber vent air so the engine doesn't throw oil overboard.",
        "Magnetic chip detectors catch metal debris, giving early warning of bearing wear without stripping the filters.",
      ]},
      { heading: "Accessory drives & gearbox", figureTopics: ["Gas Turbines - Gearboxes and Accessory Drives"], points: [
        "An accessory gearbox (driven off the HP spool via a radial/bevel drive) powers the HP & LP fuel pumps, oil pump pack, generators, hydraulic pumps, tacho and the centrifugal breather.",
        "It is mounted externally (usually underneath) for easy servicing; large engines may split it into low-speed and high-speed gearboxes so each accessory runs at its best speed.",
        "The starter cranks the HP spool through this gearbox; a hand-turn access allows the engine to be rotated for internal inspection.",
      ]},
      { heading: "Ignition & starting (APU)", figureTopics: ["Gas Turbines - Ignition Systems", "Gas Turbines - Auxiliary Power Units and Engine Starting"], points: [
        "High-energy igniters light the mixture only during start and when continuous ignition is selected (heavy rain, icing, take-off/landing).",
        "The igniter plug uses a hot central electrode separated from the shell by a semiconductor surface (not just an air gap); a leakage current ionises it, then the capacitor discharges a high-intensity flashover needing only ~2000 V.",
        "Start sequence: starter cranks HP spool → ignition on → fuel on (igniters BEFORE fuel to avoid a wet start) → light-up (EGT rises) → self-sustaining speed → starter cuts out.",
        "Start faults: HOT start = EGT exceeds limit; HUNG start = fails to accelerate to idle (e.g. weak start source / premature starter cut-out); WET start = no light-up (fuel but no ignition).",
        "The APU is a small gas turbine providing electrical power and bleed air on the ground (and sometimes in flight).",
      ]},
      { heading: "Fuel system", figureTopics: ["Gas Turbines - Fuel Systems"], points: [
        "LP pump (centrifugal) feeds the HP pump (positive displacement); a Fuel Control Unit (FCU/FADEC) schedules fuel for the demanded thrust while protecting against surge, over-temp and over-speed.",
        "Jet A1 (kerosene): SG ≈ 0.8, flash point ~38 °C, waxing ~−47 °C. A fuel heater prevents ice blocking the LP filter.",
        "A fuel-cooled oil cooler and HP-cock (shut-off) are part of the fuel circuit; the HP cock gives a clean engine shutdown.",
      ]},
      { heading: "Bleed air", figureTopics: ["Gas Turbines - Bleed Air"], points: [
        "Compressor bleed air feeds air-conditioning, pressurisation, anti-ice, engine starting and hydraulic reservoir pressurisation; tapped from a low stage at low power and a higher (HP) stage when more pressure is needed, via bleed-control valves and a fan-air pre-cooler.",
        "Compressor air also cools the turbine NGVs, blades and discs (internal + film cooling) — enabling a much higher turbine-entry temperature — and pressurises the interstage labyrinth/hydraulic seals.",
        "Taking bleed air makes the engine work harder to hold thrust → higher fuel flow and EGT.",
      ]},
    ],
    mustKnow: [
      "Cycle: suck–squeeze–bang–blow; combustion ~constant pressure; thrust = rate of change of momentum.",
      "Subsonic intake is divergent (velocity↓, pressure & temp↑, total temp constant).",
      "Only ~20–25% air burns; secondary/tertiary air cools the flame tube. Hottest point = turbine entry.",
      "Thrust set by EPR or N1; thrust falls with altitude and forward speed. Gas velocity highest at nozzle exit.",
      "High-bypass reverse = deflect the cold fan stream; cancel by ~60 kt.",
      "Start: igniters before fuel; hot start = over-temp, hung start = fails to reach idle.",
    ],
    traps: [
      "Divergent subsonic intake: TOTAL temperature stays constant (static temp & pressure rise).",
      "Most airliner thrust (and reverse thrust) comes from the COLD bypass stream, not the hot core.",
      "Bleed air off-take raises fuel flow and EGT to maintain thrust.",
      "Igniters operate only during start / continuous-ignition — not continuously in normal cruise.",
    ],
  },

  "A.1.6": {
    sectionId: "A.1.6",
    title: "Emergency Equipment",
    intro: "Oxygen systems, smoke detection and fire detection/protection — the equipment that keeps crew and passengers alive when things go wrong.",
    blocks: [
      { heading: "Oxygen — need & TUC", points: [
        "Hypoxia = too little O₂ to the tissues; insidious with no reliable warning. Up to ~10 000 ft no supplement needed.",
        "Time of Useful Consciousness: ~30 min (at rest) at 20 000 ft; ~1–2 min at 30 000 ft; ~15–20 s at 40 000 ft — halved by exertion/rapid decompression.",
        "100% O₂ keeps sea-level alveolar PO₂ to ~34 000 ft; pressure breathing above.",
      ]},
      { heading: "Oxygen systems", figureTopics: ["Oxygen Equipment"], points: [
        "Crew: diluter-demand or pressure-demand (a regulator per station). NORMAL = air/O₂ mix (more O₂ with altitude, 100% by ~32–34 000 ft); 100% selectable; EMERGENCY = 100% at positive pressure.",
        "Passengers: continuous-flow masks drop (half-hung) automatically at ~14 000 ft cabin altitude; pulling the mask starts the flow.",
        "HP gaseous cylinders charged ~1800 psi; overpressure vented by a bursting disc (external discharge indicator).",
        "Chemical generators: sodium chlorate + iron, fired electrically; once started cannot be stopped; surface ~232 °C; ~15 min (dev. 22 min); shelf life ~10 years.",
        "Cylinders: US/European green, British black with white neck. NO oil/grease; lube only with graphite; leak-test with acid-free soap + distilled water.",
        "Chemical generator flow profile: reaches full flow in about 10 seconds, then tapers — output is highest early (when the cabin is highest after a decompression) and falls as the descent brings the cabin down, always staying above the minimum O₂ the passengers need.",
        "Smoke hoods (Dräger type): don by pulling the hood over the head from behind, widening the neck seal with the backs of the hands, seating the mask over mouth and nose, pulling the quick-start toggle to start the oxygen, then checking the neck seal and tying the tapes around the waist. Give about 15 minutes of protection.",
      ]},
      { heading: "Smoke & fire detection", figureTopics: ["Smoke Detection"], points: [
        "Smoke detectors: optical/light-refraction (photoelectric cell), ionization, change-of-resistance; fitted where no constant surveillance (cargo/avionics/toilets).",
        "Fire/overheat detectors: melting-link, differential-expansion (IEOH), continuous fire-wire FFFD (resistance and/or capacitance), gas-filled (hydride core).",
        "Fire-wire runs as a double loop with AND logic (both loops) / OR logic (one loop inoperative); a fault is treated as a real fire.",
      ]},
      { heading: "Fire protection & drill", figureTopics: ["Fire Detection & Protection"], points: [
        "Triangle of fire = heat + fuel + oxygen; designated fire zones (engines, APU, wheel wells) with fireproof bulkheads.",
        "A detection system must NOT automatically fire the extinguishers.",
        "Fire drill: cancel aural warning → shut off fuel/bleed air/electrics/hydraulics to the engine → discharge the bottle(s).",
        "SQUIB illuminates armed; AGENT fires the cartridge; DISCH confirms discharge. CS-25 requires two discharges (bottles) per engine.",
        "Thermal (overheat) discharge overboard ejects an external green disc showing a red disc; smoke hoods give ~15 min (Cabox chemical / Dräger self-generating).",
        "External APU fire panel (in the nose/main gear bay for ground crew): APU FIRE light + APU SHUT OFF, plus AVAIL/cockpit-call/light-test — lets ground staff shut down the APU and fight an APU fire without entering the flight deck.",
        "Toilet (lavatory) waste bin has an automatic fire extinguisher: a small sealed bottle with a heat-sensitive (fusible) outlet aimed into the bin, so a fire in the waste bin is smothered automatically even with no one present.",
        "Portable extinguishers: BCF (halon) colour GREEN = general purpose (electrical + flammable liquid, non-conductive); WATER colour RED = solid combustibles only, never on electrical/liquid fires. Stored-pressure; ~15 s discharge; red 'FULL' disc drops off once fired.",
      ]},
    ],
    mustKnow: [
      "TUC: 20 000 ft ~30 min, 30 000 ft ~1–2 min, 40 000 ft ~15–20 s.",
      "Pax masks drop ~14 000 ft; crew EMERGENCY = 100% positive pressure.",
      "O₂ cylinders ~1800 psi; no oil/grease, graphite lube only; green (US/Euro), black/white-neck (British).",
      "Chemical generator: NaClO₃ + Fe, can't be stopped once started, 232 °C.",
      "Fire drill: cancel aural, shut off fuel/bleed/elec/hyd, discharge bottle; two discharges per engine (CS-25).",
    ],
    traps: [
      "A flow indicator shows flow only — not quantity or adequacy.",
      "Dry powder (not CO₂/water) for wheel/brake fires; a detection fault = treat as real fire.",
      "Susceptibility to hypoxia is raised by smoking (carbon monoxide).",
    ],
  },

  "A.1.7": {
    sectionId: "A.1.7",
    title: "Hazards",
    intro: "Operational and material hazards around the airframe: corrosion, fuel/oxygen fire risk, contamination, wake turbulence and aquaplaning.",
    blocks: [
      { heading: "Corrosion & materials", points: [
        "Moisture + dissimilar metals drive corrosion; protection by anodising (aluminium), chromate (magnesium/Electron), paint and sealants.",
        "Magnesium (Electron) wheels are light but corrode readily — need careful protective treatment.",
        "Spilt fluids (fuel, hydraulic, battery) attack rubber/paint — wipe off immediately.",
      ]},
      { heading: "Oxygen & fuel fire risk", points: [
        "Oxygen is non-flammable but heavier than air and vigorously SUPPORTS combustion; it collects in low areas (pits, bilges) — ventilate; no oil/grease.",
        "Wide-cut (JET B/Avtag) fuel is more volatile/flammable than kerosene; AVGAS/MOGAS are volatile — vapour-lock and carb-ice risk; bond to dissipate static before fuelling.",
        "Fuelling zone extends ~6 m (20 ft) from filling/vent points — no smoking, extinguishers accessible, GPU away from the zone.",
      ]},
      { heading: "Contamination & environment", points: [
        "Fuel: water (cloudy sample, settles — drain before flight) and microbial fungus (Cladosporium resinae) — FSII suppresses both.",
        "Ice/frost/snow on surfaces raises stalling speed and spoils lift — remove before flight.",
        "Tyres: foreign-object damage, cuts to the cords, bulges (casing failure) make a tyre unserviceable.",
      ]},
      { heading: "Wake turbulence & aquaplaning", points: [
        "Wake vortices from a heavy/wide-body decay in ~2–3 minutes; heavier-behind-lighter spacing protects the follower.",
        "Aquaplaning (dynamic) at Vp = 9√P (psi → kt); a wedge of water breaks tyre contact and friction falls toward zero.",
        "Reduce the risk: correct tyre pressure, grooved (ribbed) tread for water dispersal, and assess remaining tread depth.",
      ]},
    ],
    mustKnow: [
      "Oxygen supports combustion and pools low — no oil/grease, ventilate.",
      "Wake vortices take ~2–3 min to decay.",
      "Aquaplaning Vp = 9√P (psi → kt); friction → ~0.",
      "Cloudy fuel = water; FSII fights water-ice and fungus.",
    ],
    traps: [
      "Surface contamination raises stall speed — never a trivial amount of frost/snow.",
      "Embedded foreign bodies in a tyre are reported/probed, NOT pulled out on the line.",
      "Oxygen itself does not burn — it makes everything else burn fiercely.",
    ],
  },

  "A.1.8": {
    sectionId: "A.1.8",
    title: "Subsonic Aerodynamics",
    intro: "The principles of flight: airflow, lift and drag, the stall, high-lift devices, stability and control, and manoeuvre/load factor — the physics behind every handling limit.",
    blocks: [
      { heading: "Airflow & Bernoulli", points: [
        "Static pressure acts in all directions; dynamic pressure q = ½ρV²; total = static + dynamic (Bernoulli).",
        "Continuity: subsonic flow speeds up in a convergent duct (static falls) and slows in a divergent duct (static rises); density ~constant (incompressible).",
        "IAS/CAS/TAS: at altitude (lower ρ) TAS exceeds IAS; below ISA sea level TAS can be less than IAS.",
      ]},
      { heading: "Lift & drag", points: [
        "Lift = ½ρV²·S·CL, acting through the centre of pressure, ⟂ to the relative airflow; drag acts along it.",
        "Angle of attack = chord line to relative airflow; a symmetrical section gives zero CL (and zero Cm) at 0° AoA.",
        "Drag = parasite (∝ V²) + induced (∝ 1/V² at constant weight; CDi ∝ CL²). Total drag is least at VIMD, where parasite = induced and L/D is maximum.",
        "Induced drag/tip vortices: high-pressure air spills around the tip; reduce with high aspect ratio and winglets.",
      ]},
      { heading: "Stall & high-lift devices", points: [
        "A stall is exceeding the critical ANGLE OF ATTACK — not a fixed speed; separation starts at the upper surface near the TE.",
        "Stall speed Vs ∝ √(weight) and ∝ √(load factor n): in a level turn n = 1/cosθ, so Vs rises (45° → +19%, 60° → ×1.41).",
        "TE flaps raise CLmax but lower the stall AoA and add drag (nose-down pitch); LE slats/Krueger raise the critical AoA by energising the boundary layer.",
        "Swept wings tip-stall → CP moves forward → pitch-up; a blanked T-tail gives a deep/super stall. Stick shaker warns (~1.05 Vs); stick pusher lowers the nose at the critical AoA.",
      ]},
      { heading: "Stability, control & manoeuvre", points: [
        "Positive static longitudinal stability: an up-gust (more AoA) gives a restoring nose-down moment; aft CG reduces stability and the control deflection needed.",
        "Load factor n = lift/weight; in a 45° bank lift must rise 41% to hold altitude.",
        "VA (manoeuvre speed) varies with mass; above it, full control deflection can overstress the airframe.",
        "High-speed flight: transonic ≈ MCRIT to M1.3; constant-IAS climb increases Mach; the high/low-speed buffet margin ('coffin corner') narrows with altitude.",
        "Constant-speed propeller keeps the blade near its best angle across the speed range (fine/low pitch + high RPM for take-off).",
      ]},
    ],
    mustKnow: [
      "Lift = ½ρV²·S·CL; q = ½ρV²; L/D max at VIMD (parasite = induced).",
      "A stall = critical AoA exceeded, independent of weight/speed.",
      "Vs ∝ √n: 45° bank +19%, 60° bank ×1.41; 45° bank needs +41% lift.",
      "TE flaps raise CLmax but lower stall AoA; slats raise the critical AoA.",
      "Swept wing tip-stall → CP forward → pitch-up; T-tail → deep stall.",
      "Induced drag ∝ CL²; cut it with high aspect ratio / winglets.",
    ],
    traps: [
      "A wing can stall at ANY speed/attitude — only the AoA matters.",
      "IAS doubled → CL must be ×¼ to hold level flight (lift ∝ V²·CL).",
      "At constant IAS and weight, deploying flaps does NOT change induced drag (lift unchanged).",
    ],
  },
};

export function getAircraftTechnicalNote(sectionId: string): SectionNote | undefined {
  return NOTES[sectionId];
}
