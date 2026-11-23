// ============================================================================
// SACAA CPL — AIRCRAFT TECHNICAL & GENERAL: FULL STUDY TEXT
// A.1.1 Aircraft Elements · A.1.6 Emergency Equipment · A.1.7 Special
// Operational Procedures & Hazards · A.1.8 Subsonic Aerodynamics.
// Aligned to Appendix 2.0A to SA-CATS 61, subject A.1. Original wording.
// (A.1.2–A.1.5 are taught through the image-driven study slides with
// FIGURE_NOTES, plus aircraft-technical-notes.ts.)
// ============================================================================

import type { AirLawSectionNote } from "./airlaw-notes";

export const ATG_NOTES_FULL: AirLawSectionNote[] = [
  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.1.1",
    title: "Aircraft Elements",
    intro:
      "Hydraulic, fuel, oil, pneumatic and de-icing systems are built from the same basic elements: valves that direct and limit flow and pressure, bearings that support moving parts, pumps that create flow, and filters that keep the fluid clean. Understanding each element makes every system diagram readable.",
    blocks: [
      {
        heading: "Valves — check, pressure relief, selector, restrictor, thermal relief",
        figureTopics: ["Valves"],
        points: [
          "§ Check (non-return) valve",
          "Allows flow in ONE direction only; a ball, poppet or flap is held on its seat by a light spring and lifted by flow in the permitted direction; reverse flow pushes it shut. The arrow on the body shows the free-flow direction. Uses: pump outlets (stop back-flow into a stopped pump), accumulator lines, fuel crossfeed, priming systems.",
          "§ Pressure relief valve",
          "A spring-loaded valve that stays CLOSED until system pressure exceeds a set value, then opens to return excess fluid to the reservoir (or vent it), protecting the system from over-pressure — e.g. if the pressure regulator fails or a pump keeps delivering against a closed system. It is a SAFETY device; the normal pressure is controlled by the pressure regulator / pump.",
          "Related: pressure-reducing valves (give a lower pressure to part of a system, e.g. brakes) and pressure-maintaining/priority valves (keep pressure for essential services first).",
          "§ Selector valve",
          "Directs fluid from the pressure line to one side of an actuator and connects the other side to return — e.g. landing-gear UP/DOWN, flap selectors. Types: rotary, poppet, spool (piston) valves; open-centre and closed-centre designs. Operated by the pilot's lever, by a solenoid (electrically) or by a servo.",
          "§ Restrictor",
          "A fixed orifice that limits the RATE of flow — slows the movement of an actuator (e.g. flap or gear extension so it isn't violent). A ONE-WAY restrictor allows free flow one way and restricted flow the other (e.g. gear retracts quickly but extends slowly against gravity).",
          "§ Thermal relief valve",
          "A small relief valve set ABOVE normal system pressure, fitted in a section of line that can be isolated (trapped fluid between closed valves). When the trapped fluid heats and expands, it opens to relieve the pressure and prevents bursting lines or seals.",
          "Other valves met in systems: shut-off/fire valves (fuel, hydraulic — closed in an engine fire), shuttle valves (switch an actuator from the normal to the emergency supply automatically), sequence valves (make actions happen in order — gear doors open before the gear moves), fuse valves (shut a line if flow becomes excessive — a burst downstream).",
        ],
      },
      {
        heading: "Bearings — plain, split, bushes, ball and roller",
        points: [
          "Bearings support a rotating or sliding shaft and reduce friction and wear.",
          "§ Plain bearings",
          "A smooth surface (shell) of a softer bearing metal in which the shaft turns, separated by an oil film (hydrodynamic lubrication). Large load-carrying area, quiet, cheap — but need continuous pressure lubrication and have higher starting friction. Used for crankshaft main and big-end bearings in piston engines.",
          "§ Split bearings",
          "Plain bearings made in two halves (shells) so they can be fitted around a crankshaft journal; lined with white metal or copper-lead alloy over a steel backing; held by caps and bolts.",
          "§ Bushes",
          "Simple one-piece plain bearings — a sleeve (often bronze or nylon/PTFE) pressed into a housing for low-speed or oscillating movement: control-surface hinges, pulleys, gear pivot points, small-end (gudgeon pin) bearings.",
          "§ Ball bearings",
          "Rolling-element bearings: hardened steel balls between inner and outer races with a cage. Point contact → LOW friction (including starting), can take radial and some axial (thrust) loads; used for generators, pumps, gearboxes, control pulleys, gas-turbine shafts (thrust bearings locate the shaft axially).",
          "§ Roller bearings",
          "Cylindrical (or tapered) rollers between races — line contact gives a HIGHER radial load capacity than ball bearings; allow some axial movement of the shaft (thermal expansion) — used on gas-turbine shafts alongside a ball thrust bearing; tapered rollers take combined radial and thrust loads (wheel bearings).",
          "Failure signs: noise, vibration, overheating, metal particles in the oil (chip detectors), increased oil consumption.",
        ],
      },
      {
        heading: "Pumps — gear, diaphragm, vane, piston, centrifugal; pump drives",
        figureTopics: ["Pumps"],
        points: [
          "Pumps are either POSITIVE-DISPLACEMENT (deliver a fixed volume per revolution regardless of pressure — need a relief valve) or NON-positive-displacement (centrifugal — output falls as back-pressure rises, can't be damaged by a blocked outlet).",
          "§ Gear pump",
          "Two meshing spur gears in a close-fitting housing; fluid is carried round the OUTSIDE of the gears from inlet to outlet (not between them — the meshing teeth seal the centre). Constant displacement; simple and robust; used for engine oil pressure and scavenge pumps and some hydraulic systems. A 'gerotor' is an internal-gear variant.",
          "§ Diaphragm pump",
          "A flexible diaphragm moved up and down (mechanically from a cam, or electrically) with inlet and outlet check valves; low pressure and flow; used as engine-driven fuel pumps on some older light aircraft and as priming pumps. Can be designed so that when the carburettor float valve closes, the diaphragm stalls against its spring — giving a constant delivery pressure.",
          "§ Vane pump",
          "A slotted rotor, eccentric in a cylindrical housing, with sliding vanes held against the wall; the spaces between vanes grow (suck) and shrink (deliver) as it turns. Uses: engine-driven FUEL pumps on many piston engines (with a relief and bypass valve), air (vacuum) pumps for gyro instruments (dry vane pumps with carbon vanes — can fail suddenly), some hydraulic pumps.",
          "§ Piston pump",
          "Pistons in a rotating cylinder block (axial) driven by a swash plate or wobble plate; very high pressures (3 000–5 000 psi). VARIABLE-displacement versions change the swash-plate angle to vary the stroke → output adjusts to demand, so pressure is held constant without dumping fluid (constant-pressure, variable-volume) — the standard engine-driven hydraulic pump on transport aircraft. Fixed-displacement versions need an automatic cut-out/unloading valve.",
          "§ Centrifugal pump",
          "An impeller spins and flings fluid outward into a volute casing, converting velocity into pressure. High flow at low pressure; non-positive displacement — flow can pass through it when stopped, and a closed outlet merely stops flow. Used as electric BOOST pumps in fuel tanks (submerged, preventing vapour lock and supplying the engine pump with positive pressure) and for coolant.",
          "§ Pump drives",
          "Engine-driven (from the accessory gearbox — most common); electric motor-driven (AC or DC — boost pumps, standby hydraulic pumps); air-driven (bleed air turbine — ADP); ram-air turbine (RAT — emergency hydraulic/electric power); power transfer units (PTU — hydraulic motor driving a pump to transfer power between systems without exchanging fluid); hand pumps (emergency). Drives usually include a shear (weak) section so a seized pump doesn't damage the gearbox.",
        ],
      },
      {
        heading: "Filters — strainers and sediment traps",
        figureTopics: ["Filters"],
        points: [
          "Contamination (dirt, metal particles, water, ice) wears pumps, jams valves and blocks jets — filters are fitted throughout fuel, oil, hydraulic and air systems.",
          "§ Strainers",
          "Coarse wire-mesh screens that catch large particles — e.g. finger strainers at tank outlets, carburettor inlet screens, oil suction strainers in the sump.",
          "§ Filters",
          "Finer elements (paper, felt, sintered metal, glass fibre) rated in microns (μm) — micronic filters. Hydraulic filters remove particles down to a few microns. Filters may be on the pressure line and the return line.",
          "Bypass (relief) valve: opens if the filter becomes blocked, so flow continues (unfiltered) rather than starving the system; often with a differential-pressure 'pop-out' indicator or cockpit warning that the element is clogged. Fuel filters on turbine engines are heated (fuel-oil heat exchanger) to stop ice crystals blocking them; a filter-bypass light warns of icing/blockage.",
          "§ Sediment traps and water drains",
          "Water is heavier than fuel and settles at the lowest points — sumps and the gascolator (fuel strainer/sediment bowl at the lowest point of the light-aircraft fuel system). Drain them before the first flight of the day and after refuelling until the sample is clear and free of water and sediment (water appears as a separate bubble at the bottom of the sample cup). Wait after refuelling for water to settle.",
          "Filter elements are inspected/changed at maintenance intervals; metal particles found in oil filters are a warning of internal wear.",
        ],
      },
    ],
    mustKnow: [
      "Check valve: one-way flow. Relief valve: opens above set pressure (safety). Thermal relief: protects trapped fluid from expansion.",
      "Selector valve directs fluid to an actuator; restrictor slows flow rate (one-way restrictor slows one direction).",
      "Plain/split bearings: oil film, high load (crankshaft). Ball: low friction, radial + thrust. Roller: higher radial load.",
      "Positive displacement (gear, vane, piston) needs relief protection; centrifugal is non-positive (boost pumps).",
      "Gear pump carries fluid round the outside of the gears. Variable-displacement piston pump = constant pressure.",
      "Filters with bypass valves and clogging indicators; drain sumps/gascolator for water.",
    ],
    traps: [
      "A relief valve doesn't regulate normal pressure — it protects against excess.",
      "In a gear pump, fluid does not pass between the meshing teeth.",
      "A blocked filter's bypass lets UNFILTERED fluid through.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.1.6",
    title: "Emergency Equipment",
    intro:
      "Fire and loss of breathable air are the two emergencies that most need dedicated equipment. This section covers smoke detection (where the detectors are, how they indicate and how they're tested), fire detection and fire fighting (detectors, warnings, extinguishers and tests), and oxygen systems (types, how they work, use and safety).",
    blocks: [
      {
        heading: "Smoke detection — location, indicators, function test",
        figureTopics: ["Smoke Detection"],
        points: [
          "§ Location",
          "Smoke detectors are fitted where a fire might not be seen quickly: cargo/baggage compartments (Class B, C and E compartments), lavatories (with automatic extinguishers in the waste bins), avionics/electronic equipment bays, and crew rest areas.",
          "§ Types",
          "Photoelectric (optical, light-scattering): air is drawn through a chamber with a light source and a photocell set off-axis; smoke particles scatter light onto the photocell → alarm. Ionisation: a small radioactive source ionises air between electrodes; smoke particles reduce the current → alarm. Visual smoke detectors (older): air drawn past a window/indicator. Carbon monoxide detectors are used in light-aircraft cabins (heater leaks).",
          "Air is sampled continuously, often by fans drawing compartment air through the detector.",
          "§ Indicators",
          "Cockpit warning: master warning/caution lights, a SMOKE light for the compartment concerned (e.g. CARGO SMOKE FWD), aural warning; EICAS/ECAM message. Lavatory detectors sound locally and alert the cabin crew.",
          "§ Function test",
          "A test switch on the flight deck tests the detector circuits (and on photoelectric types the light source/photocell) and the warning lights/aurals; done during pre-flight checks per the AFM. Some systems test continuously and give a fault indication.",
        ],
      },
      {
        heading: "Fire detection — location, warning mode, function test",
        figureTopics: ["Fire Detection & Protection"],
        points: [
          "§ Location",
          "Engine nacelles (designated fire zones), APU compartment, wheel wells (overheat), bleed-air ducts (overheat/leak), cargo compartments, lavatories.",
          "§ Types of detector",
          "THERMAL SWITCHES (spot detectors): bimetallic switches that close at a set temperature — several wired in parallel; a single hot spot triggers the warning.",
          "THERMOCOUPLE systems: respond to a RATE of temperature rise (a fire heats some junctions faster than the reference junction) — fast, ignores slow overall heating.",
          "CONTINUOUS-LOOP (line) detectors: a thin tube or cable routed around the zone. Resistance/capacitance type (Fenwal, Kidde): a central wire in a eutectic salt or ceramic whose resistance falls (or capacitance rises) with temperature → alarm when any part overheats; can give an average-temperature overheat warning or a fire warning. Pressure type (Systron-Donner): a gas-filled tube with a hydrogen-charged core; heating raises the pressure and closes a pressure switch — responds to overall (average) heat and to local hot spots; integrity switch detects a loss of pressure (fault).",
          "Dual-loop systems (A and B loops) with AND logic avoid false warnings; a failed loop can be deselected.",
          "§ Warning mode",
          "Fire: red master WARNING light, the FIRE handle/switch for the affected engine illuminates, continuous fire bell/aural; EICAS/ECAM message. Overheat: amber caution. Detection systems also indicate faults (loop failure).",
          "§ Function test",
          "Flight-deck test switch checks loop continuity and the warning circuits — the fire handles light and the bell rings. Done on the first flight of the day / per checklist.",
        ],
      },
      {
        heading: "Fire fighting — engine and APU extinguishing, portable extinguishers",
        points: [
          "§ Fixed systems (engines, APU, cargo)",
          "High-rate discharge (HRD) bottles containing an extinguishing agent pressurised with nitrogen. Pulling/rotating the FIRE handle closes the fuel, hydraulic and bleed shut-off valves, trips the generator and arms the squibs; firing (rotating the handle or pressing DISCHARGE) fires an explosive squib (cartridge) that ruptures a frangible disc and discharges the bottle into the engine nacelle. Usually two bottles per engine (or two shots), the second used if the warning persists after ~30 s.",
          "Indications: bottle low-pressure/discharged lights; a red thermal discharge disc on the fuselage shows a bottle has discharged due to overheat; a yellow disc shows normal discharge.",
          "Cargo compartments: fixed bottles flood the compartment (a high-rate shot then a metered low-rate supply to maintain concentration for the diversion time).",
          "Lavatory waste bins: automatic heat-activated extinguishers (fusible nozzles).",
          "§ Agents",
          "Halon 1211 (BCF) for portable, Halon 1301 (BTM) for fixed systems — very effective on most fires, non-conductive, leave no residue; being phased out (environmental) but still common. Water (Class A — paper, fabric — cabin), CO₂ (electrical and flammable liquids; can cause frostbite/asphyxiation in small spaces), dry powder (flammable liquids and metals — messy, corrosive, poor visibility in cabins). See A.1.7 for fire classes.",
          "§ Portable extinguishers",
          "Located in the cockpit and cabin (numbers set by regulation/aircraft size); check them pre-flight: secured, pin and seal intact, pressure gauge in the green, inspection date valid. Use: pull the pin, aim at the BASE of the fire, squeeze, sweep. Protective breathing equipment (PBE/smoke hood) is carried for crew fighting a cabin fire.",
        ],
      },
      {
        heading: "Oxygen systems — types and principles of operation",
        figureTopics: ["Oxygen Equipment"],
        points: [
          "§ Need",
          "Supplemental oxygen is needed at cabin altitudes above about 10 000 ft (regulatory requirements in CAR Part 91/121/135 depend on altitude and time), for decompression, and for smoke/fumes (crew). TUC at 35 000 ft is under a minute — crew masks must be quick-donning.",
          "§ Gaseous oxygen systems",
          "Aviators' breathing oxygen (very dry, at least 99.5 % pure) stored in high-pressure cylinders (≈ 1 800–2 000 psi; green or black with a white collar depending on the standard). A pressure-reducing valve lowers it to a low line pressure; regulators deliver it to masks. Over-pressure discharge: a frangible disc vents to the outside, showing a green overboard discharge disc (missing disc = cylinder discharged).",
          "Crew systems use DILUTER-DEMAND or PRESSURE-DEMAND regulators (NORMAL / 100 % / EMERGENCY — see Human Performance A.6.1), quick-donning masks with inflatable harness, and smoke goggles; a flow indicator (blinker/'doll's eye') shows oxygen is flowing.",
          "Light aircraft: portable cylinders with continuous-flow regulators and simple masks or cannulas (cannulas generally limited to about 18 000 ft).",
          "§ Chemical oxygen generators (passenger)",
          "Sodium chlorate candles: pulling the mask fires a mechanical/electrical igniter; the chemical reaction releases oxygen for about 12–22 minutes at a constant flow. Masks drop automatically when the cabin altitude exceeds about 14 000 ft (or are released manually). The generator gets VERY hot (≈ 250 °C) and cannot be switched off once started — fire risk; it smells of burning. Advantages: light, no high-pressure storage, long shelf life.",
          "§ Portable/therapeutic and first-aid oxygen",
          "Portable bottles with masks for cabin crew mobility, first aid (continuous flow, high/low settings) and for passengers needing medical oxygen.",
          "§ Molecular sieve (OBOGS)",
          "On-board oxygen generating systems separate oxygen from bleed air (military and some business aircraft).",
        ],
      },
      {
        heading: "Oxygen — use and safety measures",
        points: [
          "§ Pre-flight checks",
          "Quantity/pressure sufficient for the planned flight and the regulatory reserve; masks present, connected, clean and serviceable; flow test (blinker); regulator on 100 % and EMERGENCY functions; smoke goggles; passenger oxygen system status; portable bottles charged; overboard discharge disc intact.",
          "§ Use",
          "Don the mask FIRST (before helping others), select 100 % for smoke/fumes or suspected hypoxia; establish crew communication via mask microphones; emergency descent after decompression. Beards and spectacles reduce the seal.",
          "§ Safety",
          "Oxygen strongly supports combustion: NO SMOKING, no naked flames or sparks near oxygen equipment; keep oil, grease, hand creams and lipstick away from fittings and masks — they can ignite spontaneously in high-pressure oxygen; open cylinder valves SLOWLY (adiabatic compression heating can cause fire); use only aviators' breathing oxygen (medical or industrial oxygen may contain moisture that freezes in the regulator); secure cylinders; only qualified personnel replenish; ventilate the cabin if oxygen has leaked; chemical generators are dangerous goods — carriage restricted.",
        ],
      },
    ],
    mustKnow: [
      "Smoke detectors: cargo, lavatories, avionics bays; photoelectric or ionisation; test from the flight deck.",
      "Fire detectors: thermal switches (spot), thermocouples (rate of rise), continuous loops (resistance/capacitance or pressure); dual loops.",
      "FIRE handle: shuts fuel, hydraulics, bleed, generator, arms squibs → discharge bottle; second shot if the warning persists.",
      "Red disc = thermal discharge; yellow disc = normal discharge; green disc = oxygen overboard discharge intact.",
      "Gaseous oxygen ~1 800 psi, aviators' breathing grade; chemical generators ~12–22 min, can't be stopped, very hot.",
      "Oxygen safety: no oil/grease, no smoking, open valves slowly.",
    ],
    traps: [
      "A chemical oxygen generator cannot be switched off once started.",
      "Medical/industrial oxygen isn't a substitute for aviators' breathing oxygen (moisture freezes).",
      "Thermocouple fire detectors respond to RATE of rise, not just temperature.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.1.7",
    title: "Special Operational Procedures and Hazards",
    intro:
      "Some hazards cut across every aircraft type: bird strikes, fire and smoke, windshear and microbursts, wake turbulence and contaminated runways. This section covers how each arises, how to recognise it, and what to do — including the SA Part 1 definitions of runway conditions and the hydroplaning speed formula.",
    blocks: [
      {
        heading: "Bird strike — risk and avoidance",
        points: [
          "§ Risk",
          "Most bird strikes occur below 3 000 ft AGL, in the take-off, initial climb, approach and landing phases, and near aerodromes; risk is higher at dawn and dusk, during migration seasons, near water, landfills and farmland. Larger birds and flocks cause the most damage: engine ingestion (fan blade damage, power loss, multiple-engine failure), windscreen penetration (pilot injury), damage to radomes, leading edges, landing gear and pitot probes.",
          "Kinetic energy = ½mv² — speed matters most: doubling speed quadruples impact energy. Windscreens and structure are certificated for specific bird masses and speeds (e.g. a 4 lb / 1.8 kg bird at VC for transport category).",
          "§ Avoidance",
          "Heed NOTAMs/ATIS bird warnings and AIP bird-hazard information; minimise time at low level (climb at the normal rate, avoid prolonged low flying); keep speed low below 10 000 ft where permitted (less energy); use landing lights (may help birds see the aircraft); avoid flying over bird concentrations, waterways and refuse sites; report bird activity to ATC; aerodrome bird-control measures.",
          "§ Actions after a strike",
          "Fly the aircraft; on take-off below V1 consider rejecting per SOPs, after V1 continue; check engine instruments; if visibility impaired by a damaged windscreen, use the other pilot's view/autopilot; land and have the aircraft inspected; file a bird-strike report.",
        ],
      },
      {
        heading: "Fire classes and extinguishing agents",
        points: [
          "Fires are classified by what is burning — the extinguisher must suit the class:",
          "Class A — ordinary combustibles (paper, wood, fabric, upholstery): WATER (cools) or Halon; dry powder possible.",
          "Class B — flammable liquids (fuel, oil, hydraulic fluid, paint): Halon, CO₂, dry powder, foam — NOT a water jet (spreads the burning liquid).",
          "Class C — flammable gases (and in the US system, energised electrical equipment): Halon, CO₂, dry powder; isolate the supply.",
          "Class D — burning metals (magnesium wheels, titanium): special dry powder; never water (violent reaction).",
          "Electrical fires (Class E in some systems, Class C in the US): non-conductive agents — Halon, CO₂, dry powder; switch off the power first.",
          "In the cabin: Halon (BCF) is the general-purpose agent; water is preferred for deep-seated Class A fires (seats, paper) after the Halon knock-down; CO₂ in small spaces can harm occupants; dry powder obscures vision and contaminates electronics.",
        ],
      },
      {
        heading: "Carburettor fire and engine fire",
        points: [
          "§ Carburettor (induction) fire",
          "Usually on START, from over-priming: excess fuel in the induction system is ignited by a backfire through the carburettor. Action (typical light-aircraft procedure): CONTINUE CRANKING the engine — this sucks the flames and fuel into the cylinders and may start the engine; if it starts, run it briefly at higher RPM then shut down and inspect. If it doesn't start: mixture idle cut-off, fuel off, throttle fully open, continue cranking; master and magnetos off; evacuate and use an extinguisher. Always follow the AFM checklist.",
          "§ Engine fire on start (turbine)",
          "A 'wet' start/torching or tailpipe fire from excess fuel in the combustion chamber: fuel off, continue motoring the engine with the starter (ignition off) to blow out the fire — do not use the engine fire extinguisher for a tailpipe fire (it isn't in the nacelle) unless the nacelle fire warning comes on.",
          "§ Engine fire in flight",
          "Piston (single): mixture idle cut-off, fuel selector OFF, throttle closed, magnetos off, cabin heat and air OFF (keep smoke/fumes out), master OFF if electrical; increase speed to try to blow out the fire (sideslip away from the cabin); forced landing; do not restart. Multi-engine/turbine: identify the engine, throttle closed, fuel control/condition lever cut-off, FIRE handle pull, discharge bottle, second bottle after ~30 s if needed; land as soon as possible.",
        ],
      },
      {
        heading: "Fire in the cabin, cockpit or freight compartment; smoke in the cockpit and cabin",
        points: [
          "§ Cabin or cockpit fire",
          "Act immediately — an in-flight fire can become uncontrollable within minutes (accident data: often 15–20 min from detection to loss of control). Crew don oxygen masks (100 %/emergency) and smoke goggles; identify the source; isolate electrical power to the affected equipment; fight the fire with the appropriate extinguisher (cabin crew with PBE); keep cockpit door closed where possible; DIVERT and land as soon as possible — don't delay to diagnose.",
          "§ Freight (cargo) compartment fire",
          "Smoke warning → arm/discharge the cargo fire extinguishing system (high-rate then low-rate metering), turn off cargo ventilation/heating (starve the fire of oxygen), divert to land within the system's protection time.",
          "§ Smoke in the cockpit and cabin — effects and actions",
          "Effects: impaired vision (can't read instruments or see outside), toxic gases (CO, hydrogen cyanide from burning plastics) causing incapacitation, irritation, panic. Actions (smoke/fume removal checklist): crew oxygen masks 100 % and smoke goggles first; establish communication; identify and isolate the source (electrical, air-conditioning — a pack, bleed air, galley); smoke removal — use the procedure (e.g. maximise ventilation, open the outflow valve / depressurise in some types, open a direct-vision window at low speed and altitude in small aircraft); land as soon as possible. In light aircraft: master switch off if electrical, cabin heat off, open fresh-air vents, land.",
        ],
      },
      {
        heading: "Over-heated brakes after an aborted take-off or landing",
        points: [
          "A rejected take-off at high speed and mass (or a heavy-braking landing) converts enormous kinetic energy into heat in the brakes; temperatures continue to RISE for 20–30 minutes after stopping (peak at the wheel/tyre several minutes later).",
          "Dangers: tyre over-pressure and explosion (fusible plugs in the wheels melt at a set temperature to deflate the tyre safely), brake fire (hydraulic fluid or grease ignited), wheel/brake failure on the next take-off.",
          "Actions: after a high-energy stop, don't set the parking brake (it welds the hot discs together and concentrates heat) — chock the wheels instead; clear the runway if possible but avoid further heavy braking; call fire services; approach wheels only from the FRONT or REAR (fore and aft), NEVER from the side (wheel/tyre may burst outward); don't use water or CO₂ on hot wheels (thermal shock can shatter them) — fire services use dry powder; let brakes cool per the brake-cooling chart before the next flight (may be over an hour).",
          "Brake temperature indications (on transport aircraft) and the AFM brake energy charts determine the cooling time and whether fusible plugs may melt.",
        ],
      },
      {
        heading: "Windshear and microburst — effects and recognition",
        points: [
          "§ Definitions",
          "Windshear is a change of wind speed and/or direction over a short distance, horizontally or vertically (including up- and downdraughts). Low-level windshear (below ~2 000 ft) is most dangerous because there's little height to recover.",
          "Causes: thunderstorms and especially MICROBURSTS, frontal surfaces, low-level jets and temperature inversions (nocturnal), sea breezes, mountain waves and rotors, strong surface winds around buildings/terrain.",
          "§ Microburst",
          "An intense, localised downdraught from a convective cloud (Cb or even a high-based Cu with virga — a 'dry' microburst), spreading out horizontally on reaching the ground. Typically less than 4 km (2.2 nm) across, lasting 5–15 minutes (peak intensity 2–4 min), with downdraughts up to 6 000 fpm and horizontal outflows of 45 kt or more — a wind change of 90 kt across it is possible.",
          "§ Effects on an aircraft on approach or departure",
          "Entering the outflow: a HEADWIND increase → IAS rises, aircraft balloons ABOVE the glide path (the pilot is tempted to reduce power — the worst response). Then the DOWNDRAUGHT pushes the aircraft down; then the TAILWIND outflow → IAS drops sharply, the aircraft sinks below the glide path — possibly into terrain.",
          "Rule: headwind increase / tailwind decrease → performance-INCREASING shear (temporary). Headwind decrease / tailwind increase / downdraught → performance-DECREASING shear (dangerous).",
          "§ Recognition",
          "Visual: Cb, heavy rain, virga, roll clouds, dust rings on the ground, lightning. Reports: PIREPs, ATIS/ATC warnings, LLWAS/Doppler radar alerts. Aircraft: unusual IAS fluctuations (±15 kt), vertical speed changes (±500 fpm), glideslope deviations (±1 dot), pitch changes (±5°), unusual throttle positions needed, predictive windshear (weather radar) or reactive windshear warning ('WINDSHEAR, WINDSHEAR').",
        ],
      },
      {
        heading: "Windshear — avoidance and actions during an encounter",
        points: [
          "§ Avoidance",
          "Avoid: delay take-off or approach when thunderstorms are within about 10–15 nm of the aerodrome or moving toward it, or windshear/microburst is reported; hold or divert. Use the longest runway, maximum take-off thrust (no derate) and the recommended flap; consider increased approach speed (up to the AFM limit) and an earlier stabilised approach; brief the recovery manoeuvre.",
          "§ Recovery (escape manoeuvre) — typical",
          "As soon as windshear is recognised below about 1 000 ft: apply MAXIMUM (TOGA) thrust; disconnect the autopilot/autothrottle as per SOP (or follow FD windshear guidance); pitch UP to the go-around attitude (about 15°) and then as required to stop the descent, up to the stick-shaker (respecting the stall warning — trade speed for height); keep the configuration (don't retract gear or flap until clear); don't try to regain lost airspeed until clear of the shear; monitor vertical speed and radio altitude.",
          "During take-off: if encountered before V1 with enough runway, reject; after V1, rotate normally (not later than 2 000 ft before the runway end) and follow the escape guidance.",
          "Report the encounter to ATC immediately ('windshear escape') with details for following aircraft.",
        ],
      },
      {
        heading: "Wake turbulence — cause and influences",
        points: [
          "§ Cause",
          "A wing producing lift has higher pressure below than above; air flows around the wingtips from below to above, forming two counter-rotating trailing VORTICES (rolling up from below the wing, outward round the tip and inward over the top — viewed from behind, the LEFT wing's vortex rotates clockwise and the RIGHT wing's anticlockwise). Their strength depends on the circulation needed to produce lift.",
          "§ Influence of speed, mass and configuration",
          "Vortices are STRONGEST when the generating aircraft is HEAVY, CLEAN (flaps up — though modern data show configuration effects are secondary) and SLOW — i.e. at high angle of attack: take-off, initial climb, approach and landing. Wingspan and wing loading also matter. Helicopters produce strong downwash vortices too (stronger in forward flight than in the hover).",
          "§ Behaviour and influence of wind",
          "Vortices begin when the nosewheel lifts off (rotation) and end when the nosewheel touches down. They DESCEND at about 300–500 fpm to level off about 500–900 ft below the generating aircraft's flight path, spread apart, and decay over about 1–3 minutes (longer in calm, stable air).",
          "Near the ground (within about one wingspan) they move OUTWARD from the runway at about 5 kt. A light CROSSWIND of 3–5 kt can hold the UPWIND vortex over the runway centreline while blowing the downwind one away — the most dangerous condition. A light quartering TAILWIND can carry vortices forward into the touchdown zone.",
          "Calm conditions let vortices linger; strong winds and turbulence break them up faster.",
        ],
      },
      {
        heading: "Wake turbulence — actions during approach, landing, take-off and crossing behind",
        points: [
          "Hazard: induced roll that may exceed the following aircraft's roll control authority (especially small-span aircraft behind heavy ones), loss of height, structural loads. ATC applies wake-turbulence separation by weight category (e.g. Light, Medium, Heavy, Super) — typically 2–3 minutes or 4–8 nm for a lighter aircraft behind a heavier one; VFR pilots are responsible for their own avoidance when they accept a visual approach/separation.",
          "§ Landing behind a larger aircraft",
          "Same runway: stay AT or ABOVE the larger aircraft's approach path and land BEYOND its touchdown point.",
          "Crossing runway: cross ABOVE the larger aircraft's flight path at the intersection; avoid flying below it.",
          "Parallel runway closer than about 760 m (2 500 ft): beware vortex drift; stay at or above its path.",
          "§ Take-off behind a larger aircraft",
          "Behind a departing aircraft: lift off BEFORE its rotation point and climb ABOVE its flight path (or turn away upwind), or wait the recommended time (typically 2 minutes; 3 minutes from an intermediate point / opposite direction).",
          "Behind a LANDING aircraft: take off beyond its touchdown point.",
          "§ En route / crossing behind",
          "Avoid flying below and behind a larger aircraft's flight path; cross above it or wait. If wake turbulence is encountered: reduce power if necessary, recover with ailerons/rudder, don't over-control, regain the flight path; if close to the ground, go around.",
          "Helicopters: avoid hover-taxiing helicopters' downwash and their wake in forward flight.",
        ],
      },
      {
        heading: "Contaminated runways — SA Part 1 definitions and types of contamination",
        points: [
          "§ SA CAR Part 1.01.1 definitions",
          "Damp runway — \"means a runway of which the surface is not dry and on which the moisture does not give the runway a shiny appearance\".",
          "Wet runway — \"means a runway of which less than 25 percent of the surface is covered with water, slush or loose snow or when there is sufficient moisture on the runway surface to cause it to appear reflective, but without significant areas of standing water.\"",
          "Contaminated runway — \"means a runway of which more than 25 percent of the runway surface area within the required length and width being used is covered with – (a) surface water more than three millimetres deep; (b) slush or loose snow, equivalent to more than three millimetres of water; (c) snow which has been compressed into a solid mass which resists further compression and will hold together or break into lumps if picked up; or (d) ice, including wet ice\".",
          "Dry runway — a runway that is clear of contaminants and visible moisture within the required length and width (not damp, wet or contaminated).",
          "§ Types of contamination",
          "Standing water (> 3 mm), slush (water-saturated snow), wet snow, dry snow, compacted snow, ice and wet ice, frost; also rubber deposits, oil/fuel, sand and dust that reduce friction.",
          "Effects: take-off — DISPLACEMENT and IMPINGEMENT drag of fluid contaminants lengthen the take-off run; spray can be ingested into engines and damage flaps; reduced braking → longer accelerate-stop distance. Landing — much longer stopping distances (braking action poor), directional control problems in crosswinds. Reported as runway condition codes / braking action (good, medium, poor) and depth/percentage of contamination (SNOWTAM/RCR).",
        ],
      },
      {
        heading: "Hydroplaning (aquaplaning) — types, critical speed, reducing the effects",
        points: [
          "Hydroplaning occurs when a tyre rides on a film of water and loses contact with the runway — braking and steering effectiveness fall to almost nothing.",
          "§ Types",
          "DYNAMIC hydroplaning: on standing water deeper than the tyre tread can disperse (≈ 3 mm or more), above a critical speed the water pressure under the tyre equals the tyre pressure and lifts it. Total or partial.",
          "VISCOUS hydroplaning: on a very thin film of water on a smooth or contaminated surface (rubber deposits, paint markings), at lower speeds — can persist down to slow speeds.",
          "REVERTED-RUBBER (steam) hydroplaning: a locked wheel skidding on a wet surface generates heat that turns the water to steam and melts (reverts) the rubber — the tyre rides on steam; caused by locked wheels; leaves white/clean marks on the runway and a burnt patch on the tyre. Anti-skid prevents it.",
          "§ Critical speed formula",
          "Minimum dynamic hydroplaning speed (kt) ≈ 9 × √(tyre pressure in psi) for a ROTATING tyre (take-off, or landing with spin-up). For a NON-ROTATING tyre at touchdown the speed is lower: ≈ 7.7 × √(psi) (some texts 7.0–7.7).",
          "Example: tyre pressure 36 psi → 9 × 6 = 54 kt rotating (≈ 46 kt non-rotating). Tyre pressure 144 psi → 108 kt.",
          "Once hydroplaning starts it can continue to a lower speed than that at which it began.",
          "§ Reducing the effects",
          "Runway: grooving and porous friction surfaces, good drainage (cross-slope), rubber removal. Aircraft/operation: correct tyre pressures and good tread depth; land FIRMLY (positive touchdown breaks through the water film) at the correct speed, not long or fast; lower the nosewheel promptly; use reverse thrust/spoilers early; anti-skid; brake smoothly and progressively (not locked wheels); land into wind (crosswind limits are reduced on wet/contaminated runways); calculate the increased landing distance (wet/contaminated factors) and divert if inadequate.",
        ],
      },
    ],
    mustKnow: [
      "Bird strikes mostly < 3 000 ft, dawn/dusk; energy ∝ speed² — slow down at low level where allowed.",
      "Fire classes: A solids (water), B liquids (no water jet), C gases/electrical, D metals; Halon general purpose.",
      "Carburettor fire on start: keep cranking. Hot brakes: no parking brake, approach fore/aft, fusible plugs.",
      "Microburst: < 4 km, 5–15 min; headwind increase → balloon above path, then downdraught and tailwind → sink. Escape: max thrust, pitch ~15° up to stick shaker, keep configuration.",
      "Wake vortices strongest: heavy, clean, slow; descend 300–500 fpm to ~500–900 ft below; light crosswind holds upwind vortex on the runway.",
      "Land behind: above its path, beyond its touchdown. Take off behind: before its rotation point, climb above.",
      "SA definitions: wet < 25 % covered / reflective; contaminated > 25 % with > 3 mm water/slush, compacted snow or ice; damp not shiny.",
      "Hydroplaning: dynamic, viscous, reverted rubber. Vp ≈ 9√psi (rotating), ≈ 7.7√psi (non-rotating).",
    ],
    traps: [
      "Reducing power when the aircraft balloons in a microburst's headwind — the sink follows.",
      "Approaching hot wheels from the side.",
      "A light crosswind is MORE dangerous for vortex persistence on the runway than a strong wind.",
      "Hydroplaning may continue below the speed at which it started.",
    ],
  },
];
