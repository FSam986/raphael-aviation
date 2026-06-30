// Official SACAA CPL Syllabus — Appendix 2.0A (SA-CATS 61)
// Every topic in this file maps directly to a syllabus aspect the student CAN be examined on.

export interface SyllabusItem {
  id: string;
  topic: string;
}

export interface SyllabusSection {
  id: string;           // e.g. "A.8.1"
  title: string;        // e.g. "THE ATMOSPHERE"
  items: SyllabusItem[];
}

export interface SyllabusSubject {
  id: string;
  code: string;         // e.g. "ATG", "MET"
  title: string;
  examQuestions: number; // typical SACAA exam length
  passPercent: number;   // SACAA pass mark
  sections: SyllabusSection[];
}

export const SACAA_SYLLABUS: SyllabusSubject[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. AIRCRAFT TECHNICAL & GENERAL (AEROPLANE)
  // ─────────────────────────────────────────────────────────────
  {
    id: "aircraft-technical",
    code: "ATG",
    title: "Aircraft Technical & General",
    examQuestions: 50,
    passPercent: 75,
    sections: [
      {
        id: "A.1.1",
        title: "Aircraft Elements",
        items: [
          { id: "A.1.1.a", topic: "Valves — check, pressure release, selector, restrictors, thermal relief" },
          { id: "A.1.1.b", topic: "Bearings — plain, split, bushes, ball, roller" },
          { id: "A.1.1.c", topic: "Pumps — gear, diaphragm, vane, piston, centrifugal types and drives" },
          { id: "A.1.1.d", topic: "Filters — strainers and sediment traps" },
        ],
      },
      {
        id: "A.1.2",
        title: "Airframe & Systems",
        items: [
          { id: "A.1.2.a1", topic: "Fuselage — types of construction, structural components, stress" },
          { id: "A.1.2.b", topic: "Cockpit and cabin windows — construction, structural limitations" },
          { id: "A.1.2.c", topic: "Wings and stabilising surfaces — construction, materials, stress, V-tail" },
          { id: "A.1.2.d", topic: "Landing gear — types, construction, locking, anti-retraction, steering, brakes, anti-skid" },
          { id: "A.1.2.e", topic: "Hydraulics — hydromechanics, fluids, main/standby/emergency systems" },
          { id: "A.1.2.f1", topic: "Pneumatic systems — power sources, components, failures" },
          { id: "A.1.2.f2", topic: "Air conditioning — heating, cooling, construction, warning devices" },
          { id: "A.1.2.f3", topic: "Pressurisation — cabin altitude, differential pressure, decompression, emergency procedures" },
          { id: "A.1.2.f4", topic: "De-ice systems — pneumatic leading edge, components, operation" },
          { id: "A.1.2.f5", topic: "Anti-ice systems — aerofoil, powerplant, windshield, ice warning" },
          { id: "A.1.2.g", topic: "Non-pneumatic de-ice/anti-ice — air intake, propeller, pitot, windshield" },
          { id: "A.1.2.h", topic: "Fuel system — tanks, gravity/pressure feed, crossfeed, monitoring, jettison" },
        ],
      },
      {
        id: "A.1.3",
        title: "Electrics",
        items: [
          { id: "A.1.3.a1", topic: "DC — circuits, voltage, current, resistance, Ohm's law, power" },
          { id: "A.1.3.a2", topic: "Batteries — theory, types, capacity, hazards" },
          { id: "A.1.3.a3", topic: "Magnetism — permanent, electromagnetism, relays, solenoids, induction" },
          { id: "A.1.3.a4", topic: "Generators — principle, monitoring, starter-generator" },
          { id: "A.1.3.a5", topic: "Current distribution — buses, ammeter, voltmeter, inverter" },
          { id: "A.1.3.b", topic: "AC — single/multi-phase, frequency, phase shift, alternators, transformers" },
        ],
      },
      {
        id: "A.1.4",
        title: "Powerplant — Piston Engine",
        items: [
          { id: "A.1.4.a", topic: "4-stroke engine — principle, components, cylinder numbering, definitions" },
          { id: "A.1.4.b", topic: "Cylinder construction — bore, stroke, valves, pistons, crankshaft, supercharging" },
          { id: "A.1.4.c", topic: "Detonation and pre-ignition — factors, effects, recognition, prevention" },
          { id: "A.1.4.d", topic: "Engine power — IHP, FHP, BHP" },
          { id: "A.1.4.e", topic: "Lubrication — wet/dry sump, oil pumps, cooling, grades" },
          { id: "A.1.4.f", topic: "Air cooling — fins, baffles, CHT" },
          { id: "A.1.4.g", topic: "Ignition — magnetos, impulse coupling, spark plugs, serviceability checks" },
          { id: "A.1.4.h", topic: "Fuel supply — types, grades, octane, carburettor, fuel injection, mixture, icing" },
          { id: "A.1.4.i", topic: "Engine handling — limitations, MAP/RPM/mixture, faults, rough running, power loss" },
        ],
      },
      {
        id: "A.1.5",
        title: "Powerplant — Turbine Engine",
        items: [
          { id: "A.1.5.a", topic: "Principle of operation and types — centrifugal, axial flow" },
          { id: "A.1.5.b", topic: "Engine construction — air inlet, compressor, combustion chamber, turbine, jet pipe" },
          { id: "A.1.5.c", topic: "Compressor stall and surge — cause, recognition, avoidance" },
          { id: "A.1.5.d", topic: "Pressure, temperature and airflow in turbine" },
          { id: "A.1.5.e", topic: "Reverse thrust — function, types, use, failure" },
          { id: "A.1.5.f", topic: "Turbine systems — ignition, starter, malfunctions, fuel, lubrication" },
        ],
      },
      {
        id: "A.1.6",
        title: "Emergency Equipment",
        items: [
          { id: "A.1.6.a", topic: "Smoke detection — location, indicators, function test" },
          { id: "A.1.6.b", topic: "Fire detection and fighting — location, warning, test" },
          { id: "A.1.6.c", topic: "Oxygen systems — types, operation, use, safety" },
        ],
      },
      {
        id: "A.1.7",
        title: "Special Operational Procedures & Hazards",
        items: [
          { id: "A.1.7.a", topic: "Bird strike — risk and avoidance" },
          { id: "A.1.7.b", topic: "Fire/Smoke — carburettor, engine, cabin, extinguishing agents, brake fires" },
          { id: "A.1.7.c", topic: "Windshear and microburst — effects, recognition, avoidance" },
          { id: "A.1.7.d", topic: "Wake turbulence — cause, influence of speed/mass/wind, avoidance" },
          { id: "A.1.7.e", topic: "Contaminated runways — definitions, types, aquaplaning, critical speed formula" },
        ],
      },
      {
        id: "A.1.8",
        title: "Subsonic Aerodynamics",
        items: [
          { id: "A.1.8.a", topic: "Laws and definitions — Newton's laws, mass, pressure, momentum, energy" },
          { id: "A.1.8.b", topic: "Airspeeds — IAS, CAS, EAS, TAS, Mach number" },
          { id: "A.1.8.c", topic: "Lift — Bernoulli, aerofoil definitions, lift formula, lift/drag ratio, aerofoil shape" },
          { id: "A.1.8.d", topic: "Drag — profile drag, induced drag, drag formula, total drag curve" },
          { id: "A.1.8.e", topic: "Thrust — thrust curve, THP" },
          { id: "A.1.8.f", topic: "Ground effect — definition, effect during take-off and landing" },
          { id: "A.1.8.g", topic: "Flying controls — elevator, ailerons, rudder, tabs, trimming, adverse yaw" },
          { id: "A.1.8.h", topic: "Lift augmentation — trailing/leading edge flaps, slats, slots" },
          { id: "A.1.8.i", topic: "Stalling — boundary layer, AOA influence, symptoms, recovery, stall speed factors" },
          { id: "A.1.8.j", topic: "Spinning — incipient spin, full developed spin, recovery" },
          { id: "A.1.8.k", topic: "Forces in flight — S&L, climbing, descending, turning, stability" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 2. AIR LAW
  // ─────────────────────────────────────────────────────────────
  {
    id: "air-law",
    code: "LAW",
    title: "Air Law",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      {
        id: "A.3.1",
        title: "Definitions & Abbreviations (CAR Part 1.01.1)",
        items: [
          { id: "A.3.1.1", topic: "Key definitions — Accident, ATC, Aerodrome, Aircraft, Flight level, PIC, VMC, IMC" },
          { id: "A.3.1.2", topic: "Airspace definitions — Control zone, TMA, FIR, Advisory airspace" },
          { id: "A.3.1.3", topic: "Operational definitions — Flight plan, Flight duty period, Cross country flight" },
        ],
      },
      {
        id: "A.3.2",
        title: "Aviation Accidents & Incidents (CAR Part 12)",
        items: [
          { id: "A.3.2.a", topic: "Notification of accidents and incidents (CAR 12.02.1–12.02.5)" },
          { id: "A.3.2.b", topic: "Scene of accident — guarding, access, evidence, removal (CAR 12.04.1–12.04.5)" },
        ],
      },
      {
        id: "A.3.3",
        title: "General Maintenance Rules (CAR Part 43)",
        items: [
          { id: "A.3.3.a", topic: "Logbooks, entries, falsification (CAR 43.01.1–43.01.5)" },
          { id: "A.3.3.b", topic: "Persons to carry out maintenance, release to service, compass requirements" },
        ],
      },
      {
        id: "A.3.4",
        title: "Pilot Licensing (CAR Part 61)",
        items: [
          { id: "A.3.4.a", topic: "Pilot licences and ratings (CAR 61.01.1–61.01.3)" },
          { id: "A.3.4.b", topic: "Medical requirements, language, flight time logging (CAR 61.01.6–61.01.8)" },
          { id: "A.3.4.c", topic: "CPL(A) requirements, examination, skills test, privileges, validity (CAR 61.05.1–61.05.8)" },
          { id: "A.3.4.d", topic: "Type and class ratings (CAR 61.09.1–61.09.8)" },
        ],
      },
      {
        id: "A.3.5",
        title: "Medical Certification (CAR Part 67)",
        items: [
          { id: "A.3.5.a", topic: "Classes of medical certificates, period of validity (CAR 67.00.2–67.00.6)" },
          { id: "A.3.5.b", topic: "Duties of holder, substance abuse, suspension/cancellation (CAR 67.00.9–67.00.14)" },
        ],
      },
      {
        id: "A.3.6",
        title: "General Operating & Flight Rules (CAR Part 91)",
        items: [
          { id: "A.3.6.a", topic: "Authority of PIC, crew responsibilities, recency (CAR 91.01–91.02)" },
          { id: "A.3.6.b", topic: "Documents to be carried, flight plans, fuel record (CAR 91.03)" },
          { id: "A.3.6.c", topic: "Instruments and equipment for VFR — lights, oxygen, ELT, ACAS, TAWS (CAR 91.04)" },
          { id: "A.3.6.d", topic: "Right of way, minimum heights, semi-circular rule, VFR minima (CAR 91.06)" },
          { id: "A.3.6.e", topic: "Radio communication — mandatory radio, RCF procedures (CAR 91.06.16–91.06.17)" },
          { id: "A.3.6.f", topic: "VFR operating minima, fuel supply, passenger briefing (CAR 91.07)" },
        ],
      },
      {
        id: "A.3.7",
        title: "Dangerous Goods (CAR Part 92)",
        items: [
          { id: "A.3.7.a", topic: "Applicability, training, loading restrictions, cabin carriage (CAR 92)" },
        ],
      },
      {
        id: "A.3.12",
        title: "Air Transport Operations — less than 20 pax (CAR Part 135)",
        items: [
          { id: "A.3.12.a", topic: "PIC minimum requirements, IMC/night operations, IFR without SIC (CAR 135)" },
        ],
      },
      {
        id: "A.3.15",
        title: "Airspace & ATS (SA-CATS 172)",
        items: [
          { id: "A.3.15.a", topic: "Classification of airspace and level of service provision" },
        ],
      },
      {
        id: "A.3.16",
        title: "RSA AIP — Enroute",
        items: [
          { id: "A.3.16.a", topic: "Airspace classification (ENR 1.4.1), ATC procedures, radar, altimeter setting" },
          { id: "A.3.16.b", topic: "Aerodrome information and chart interpretation" },
        ],
      },
      {
        id: "A.3.18",
        title: "ICAO Annex 14 — Aerodromes",
        items: [
          { id: "A.3.18.a", topic: "Definitions — runway, clearway, stopway, taxiway, threshold, markings" },
          { id: "A.3.18.b", topic: "Declared distances — TORA, TODA, ASDA, LDA" },
          { id: "A.3.18.c", topic: "Visual aids — runway markings, lights, signs (Chapter 5)" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 3. FLIGHT PERFORMANCE & PLANNING (AEROPLANE)
  // ─────────────────────────────────────────────────────────────
  {
    id: "flight-planning",
    code: "FPP",
    title: "Flight Planning & Performance",
    examQuestions: 50,
    passPercent: 75,
    sections: [
      {
        id: "A.4.1",
        title: "Aeroplane Performance Classification",
        items: [
          { id: "A.4.1.a", topic: "Performance classification — CAR Part 91.08, Class A/C limitations" },
          { id: "A.4.1.b", topic: "CAR Part 135 take-off mass, net take-off flight path, dispatch limitations" },
        ],
      },
      {
        id: "A.4.2",
        title: "Certification",
        items: [
          { id: "A.4.2.a", topic: "Type certificate, airworthiness design standards (CAR Part 21)" },
          { id: "A.4.2.b", topic: "SA-CATS 21 — Normal, utility, acrobatic, commuter, transport category" },
        ],
      },
      {
        id: "A.4.4",
        title: "Stages of Flight & Airspeed Terminology",
        items: [
          { id: "A.4.4.a", topic: "Stages — take-off, climb, level flight, descent, approach, landing" },
          { id: "A.4.4.b", topic: "IAS, CAS, TAS — and VA, VNO, VNE, VX, VY, VS, VSO, VFE, VLO, VLE, VMO" },
          { id: "A.4.4.c", topic: "VMCG, VMCA, V1, VR, V2, VREF, VLOF" },
        ],
      },
      {
        id: "A.4.5",
        title: "Meteorological & Aerodrome Terminology",
        items: [
          { id: "A.4.5.a", topic: "ISA — standard values, OAT, TAT, SAT, ISA deviation" },
          { id: "A.4.5.b", topic: "Pressure altitude, density altitude, QNH, QFE, QNE" },
          { id: "A.4.5.c", topic: "TORA, TODA, TORR, TODR, LDA, LDR, clearway, stopway, runway slope, PCN/ACN" },
        ],
      },
      {
        id: "A.4.7",
        title: "Performance Terminology",
        items: [
          { id: "A.4.7.a", topic: "Steady flight, forces in climb/descent, power required vs available" },
          { id: "A.4.7.b", topic: "Climb angle, gradient, flight path angle, service and absolute ceiling" },
          { id: "A.4.7.c", topic: "Range, endurance, SFC, specific range" },
        ],
      },
      {
        id: "A.4.8",
        title: "Factors Affecting Performance",
        items: [
          { id: "A.4.8.a", topic: "Temperature, air density, aeroplane mass, configuration, CG, runway surface/slope" },
          { id: "A.4.8.b", topic: "Flap settings, power settings, wind, altitude effects on range and endurance" },
        ],
      },
      {
        id: "A.4.9",
        title: "SEP Performance Data (CAP 697/698)",
        items: [
          { id: "A.4.9.a", topic: "Variables on SEP performance — wind, temperature, altitude effects" },
          { id: "A.4.9.b", topic: "Take-off — wind components, take-off distance, maximum mass, take-off speed" },
          { id: "A.4.9.c", topic: "Climb — max rate of climb speed, time/distance/fuel to climb" },
          { id: "A.4.9.d", topic: "Cruise — power settings, TAS, fuel consumption, range, endurance" },
          { id: "A.4.9.e", topic: "Landing — wind components, landing distance and ground roll" },
        ],
      },
      {
        id: "A.4.10",
        title: "MEP Performance Data (CAP 697/698)",
        items: [
          { id: "A.4.10.a", topic: "Critical engine, effect of engine inoperative on drag, controllability" },
          { id: "A.4.10.b", topic: "Take-off — flap effect, thrust, pressure altitude, wind, obstacle clearance" },
          { id: "A.4.10.c", topic: "Climb, cruise, descent with engine inoperative" },
          { id: "A.4.10.d", topic: "Landing distance in various runway conditions" },
        ],
      },
      {
        id: "A.4.11",
        title: "MEP Performance Calculations",
        items: [
          { id: "A.4.11.a", topic: "Take-off field length, accelerate-go/stop, ground roll, obstacle clearance" },
          { id: "A.4.11.b", topic: "Rate of climb, single engine ceiling, climb gradient" },
          { id: "A.4.11.c", topic: "Cruise TAS, fuel flow, range/endurance, OEI cruise" },
          { id: "A.4.11.d", topic: "Landing field length, balked landing climb, short field data" },
        ],
      },
      {
        id: "A.4.12",
        title: "Mass & Balance",
        items: [
          { id: "A.4.12.a", topic: "Terminology — CG, datum, arm, moment, MAC, LEMAC, MZFM, MTOM, MLM, EOM" },
          { id: "A.4.12.b", topic: "CG limits, structural stress vs mass, stability vs CG position" },
          { id: "A.4.12.c", topic: "Calculations — CG for SEP and MEP, % MAC, weight shift, weight loss" },
          { id: "A.4.12.d", topic: "Fuel terms — taxi fuel, trip fuel, reserve fuel, extra fuel, payload" },
        ],
      },
      {
        id: "A.4.13",
        title: "Flight Planning General",
        items: [
          { id: "A.4.13.a", topic: "PET (point of equal time), CP (critical point)" },
          { id: "A.4.13.b", topic: "PNR/PSR (point of no/safe return)" },
          { id: "A.4.13.c", topic: "Fuel — specific weight, gravity, consumption, ANM/GNM per fuel ratio" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. HUMAN PERFORMANCE & LIMITATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "human-performance",
    code: "HPL",
    title: "Human Performance & Limitations",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      {
        id: "A.6.1",
        title: "Basic Physiology",
        items: [
          { id: "A.6.1.a", topic: "The atmosphere — composition, gas laws, oxygen requirements" },
          { id: "A.6.1.b", topic: "Circulatory system — blood, heart, blood pressure, pulse, ailments" },
          { id: "A.6.1.c", topic: "Lungs — anatomy, gas transfer, hypoxia, time of useful consciousness, hyperventilation" },
          { id: "A.6.1.d", topic: "High altitude — ozone, radiation, humidity, pressurisation, oxygen masks" },
          { id: "A.6.1.e", topic: "Vision — eye physiology, foveal/peripheral, night vision, optical illusions" },
          { id: "A.6.1.f", topic: "Hearing — physiology, noise and hearing loss" },
          { id: "A.6.1.g", topic: "Equilibrium — vestibular system, spatial disorientation, motion sickness" },
          { id: "A.6.1.h", topic: "Sensory integration — spatial disorientation types, illusions, prevention" },
          { id: "A.6.1.i", topic: "Acceleration — effects on cardiovascular, vision, limbs" },
        ],
      },
      {
        id: "A.6.2",
        title: "Health & Hygiene",
        items: [
          { id: "A.6.2.a", topic: "Personal hygiene — colds, influenza, gastro-intestinal, dehydration" },
          { id: "A.6.2.b", topic: "Problem areas — hearing loss, vision, hypertension, obesity, nutrition, diabetes" },
          { id: "A.6.2.c", topic: "Intoxication — tobacco, alcohol, drugs, self-medication" },
          { id: "A.6.2.d", topic: "Incapacitation — causes, symptoms, cardio-vascular, epilepsy, CO poisoning" },
          { id: "A.6.2.e", topic: "Stress — categories, stages, causes, anxiety, management, defence mechanisms" },
          { id: "A.6.2.f", topic: "Fatigue — definition, types, causes, symptoms, prevention" },
          { id: "A.6.2.g", topic: "Body rhythm and sleep — circadian rhythms, disturbances, treatment" },
        ],
      },
      {
        id: "A.6.3",
        title: "Basic Aviation Psychology",
        items: [
          { id: "A.6.3.a", topic: "Nervous system — sensory threshold, adaptation, reflexes, information processing" },
          { id: "A.6.3.b", topic: "Memory — sensory, working, long-term, chunking, mnemonics, action slips" },
          { id: "A.6.3.c", topic: "Human behaviour — personality, attitudes, hazardous attitudes, situational awareness" },
          { id: "A.6.3.d", topic: "Human error — SHELL model, error types, error chains, prevention" },
          { id: "A.6.3.e", topic: "Decision making — process, group vs individual, pilot judgement, influences" },
          { id: "A.6.3.f", topic: "Cockpit management — CRM, automation, complacency, ergonomics, checklists, CRM" },
          { id: "A.6.3.g", topic: "Leadership — styles, democratic vs autocratic, cockpit gradient" },
          { id: "A.6.3.h", topic: "Communication — verbal, non-verbal, conflict management" },
        ],
      },
      {
        id: "A.6.4",
        title: "First Aid & Survival",
        items: [
          { id: "A.6.4.a", topic: "First aid — fainting, nose bleeds, food poisoning, dehydration, bleeding, fractures, burns, shock" },
          { id: "A.6.4.b", topic: "Survival — body temperature, equipment, at sea, cold climate, hot/arid, jungle" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 5. INSTRUMENTS
  // ─────────────────────────────────────────────────────────────
  {
    id: "flight-instruments",
    code: "INS",
    title: "Flight Instruments",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      {
        id: "A.7.1",
        title: "Air Data Instruments",
        items: [
          { id: "A.7.1.a", topic: "Pitot & static system — construction, malfunction, heating, alternate static" },
          { id: "A.7.1.b", topic: "Altimeter — construction, types, errors, QNH/QFE/QNE, altitude alert" },
          { id: "A.7.1.c", topic: "Airspeed Indicator — construction, colour sectors, errors, blockages" },
          { id: "A.7.1.d", topic: "Vertical Speed Indicator — construction, aneroid vs IVSI, errors" },
        ],
      },
      {
        id: "A.7.2",
        title: "Gyroscopic Instruments",
        items: [
          { id: "A.7.2.a", topic: "Gyroscopic fundamentals — stability, precession, apparent/real wander, mountings, drives" },
          { id: "A.7.2.b", topic: "Directional Gyro — construction, operation, limitations, drift calculation" },
          { id: "A.7.2.c", topic: "Remote indicating compass — construction, components, modes" },
          { id: "A.7.2.d", topic: "Artificial Horizon — construction, turn/acceleration errors" },
          { id: "A.7.2.e", topic: "Turn & slip indicator — construction, errors, turn coordinator, rate of turn" },
          { id: "A.7.2.f", topic: "HSI / EFIS — PFD, ND, MCP, FMS, display types and colours" },
        ],
      },
      {
        id: "A.7.3",
        title: "Electronic Flight Instrument System (EFIS)",
        items: [
          { id: "A.7.3.a", topic: "Flight director — principle, input sources, ADI, HSI operation" },
        ],
      },
      {
        id: "A.7.5",
        title: "Air Temperature Indicators",
        items: [
          { id: "A.7.5.a", topic: "Sensors, ram rise, recovery factor, SAT, RAT, TAT" },
        ],
      },
      {
        id: "A.7.6",
        title: "Autopilot",
        items: [
          { id: "A.7.6.a", topic: "General principles, types (single/two/three axis), lateral and longitudinal modes" },
        ],
      },
      {
        id: "A.7.7",
        title: "Magnetism",
        items: [
          { id: "A.7.7.a", topic: "Terrestrial magnetism — vertical/horizontal components, dip, variation, secular change" },
          { id: "A.7.7.b", topic: "Aircraft magnetism — hard iron, compass swing, coefficients A/B/C, deviation" },
          { id: "A.7.7.c", topic: "Magnetic compass — components, serviceability tests, turning/acceleration errors" },
        ],
      },
      {
        id: "A.7.8",
        title: "Stall Warning",
        items: [
          { id: "A.7.8.a", topic: "Basic stall warning devices — pneumatic, electric" },
          { id: "A.7.8.b", topic: "Advanced stall warning and stall protection systems" },
        ],
      },
      {
        id: "A.7.9",
        title: "Powerplant & System Monitoring Instruments",
        items: [
          { id: "A.7.9.a", topic: "Pressure/temperature sensors and indicators, RPM indicators, fuel gauges" },
          { id: "A.7.9.b", topic: "Torque meter, vibration monitors, chip detection" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 6. METEOROLOGY
  // ─────────────────────────────────────────────────────────────
  {
    id: "meteorology",
    code: "MET",
    title: "Meteorology",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      {
        id: "A.8.1",
        title: "The Atmosphere",
        items: [
          { id: "A.8.1.a", topic: "Properties, composition and structure of the atmosphere" },
          { id: "A.8.1.b", topic: "ICAO International Standard Atmosphere (ISA) — values, ISA deviation" },
        ],
      },
      {
        id: "A.8.2",
        title: "Climatology and Meteorology",
        items: [
          { id: "A.8.2.a", topic: "Difference between climatology and meteorology, definitions" },
        ],
      },
      {
        id: "A.8.3",
        title: "Atmospheric Pressure",
        items: [
          { id: "A.8.3.a", topic: "Definition, measurement units (Pa, hPa, mb, inHg, mmHg), conversion" },
          { id: "A.8.3.b", topic: "Mercury and aneroid barometers, pressure altitude" },
          { id: "A.8.3.c", topic: "QNH, QFE, QFF, QNE/1013.25 hPa" },
          { id: "A.8.3.d", topic: "Pressure variation with height, diurnal variation, isobars, pressure gradient" },
          { id: "A.8.3.e", topic: "Low pressure systems — thermal lows, troughs, cut-off lows, cyclonic weather" },
          { id: "A.8.3.f", topic: "High pressure systems — thermal highs, ridges, anticyclonic weather, cols" },
          { id: "A.8.3.g", topic: "Synoptic charts" },
        ],
      },
      {
        id: "A.8.4",
        title: "Temperature",
        items: [
          { id: "A.8.4.a", topic: "Measurement — Celsius, Fahrenheit, Kelvin, conversion" },
          { id: "A.8.4.b", topic: "Heating — insolation, radiation, conduction, convection, advection" },
          { id: "A.8.4.c", topic: "Diurnal variation, specific heat, land/sea heating, greenhouse effect" },
        ],
      },
      {
        id: "A.8.5",
        title: "Humidity",
        items: [
          { id: "A.8.5.a", topic: "Atmospheric water — latent heat, evaporation, condensation, sublimation" },
          { id: "A.8.5.b", topic: "Saturation, vapour pressure, dew point, wet/dry bulb, psychrometer" },
          { id: "A.8.5.c", topic: "Absolute and relative humidity" },
        ],
      },
      {
        id: "A.8.6",
        title: "Density",
        items: [
          { id: "A.8.6.a", topic: "Gas laws — Boyle's law, Charles's law, ideal gas equation" },
          { id: "A.8.6.b", topic: "Factors affecting density — temperature, pressure, altitude, latitude, humidity" },
          { id: "A.8.6.c", topic: "Density altitude — definition, calculation, effect on performance, hot/high/humid dangers" },
        ],
      },
      {
        id: "A.8.7",
        title: "Altimetry",
        items: [
          { id: "A.8.7.a", topic: "Variation of pressure levels with changing temperature and pressure" },
          { id: "A.8.7.b", topic: "Pressure and temperature corrections, calculating true altitude" },
        ],
      },
      {
        id: "A.8.8",
        title: "Wind",
        items: [
          { id: "A.8.8.a", topic: "Definitions — veering, backing, gust, squall, gust factor" },
          { id: "A.8.8.b", topic: "Measurement — wind direction/speed, wind vane, anemometer" },
          { id: "A.8.8.c", topic: "Formation — pressure gradient, Coriolis effect, geostrophic wind, Buys Ballot's law" },
          { id: "A.8.8.d", topic: "Gradient wind, surface wind, diurnal variation" },
          { id: "A.8.8.e", topic: "Global circulation — trade winds, westerlies, polar easterlies, ITCZ" },
          { id: "A.8.8.f", topic: "Local winds — land/sea breeze, katabatic, anabatic, Föhn, Berg wind, Sirocco, Haboob" },
        ],
      },
      {
        id: "A.8.9",
        title: "Lapse Rates, Adiabatic Processes & Stability",
        items: [
          { id: "A.8.9.a", topic: "Adiabatic processes — DALR, SALR, ELR" },
          { id: "A.8.9.b", topic: "Stability — absolute stability/instability, conditional instability, neutral stability" },
          { id: "A.8.9.c", topic: "Inversions and isothermal layers" },
        ],
      },
      {
        id: "A.8.10",
        title: "Clouds",
        items: [
          { id: "A.8.10.a", topic: "Cloud observations — amount, ceiling, base, measurement methods" },
          { id: "A.8.10.b", topic: "Cloud formation — convective, orographic, frontal, convergent, turbulent" },
          { id: "A.8.10.c", topic: "Cloud classification and types" },
        ],
      },
      {
        id: "A.8.11",
        title: "Precipitation",
        items: [
          { id: "A.8.11.a", topic: "Condensation nuclei, Bergeron theory, collision and coalescence theory" },
          { id: "A.8.11.b", topic: "Types, intensity and continuity of precipitation" },
        ],
      },
      {
        id: "A.8.12",
        title: "Thunderstorms",
        items: [
          { id: "A.8.12.a", topic: "Formation — conditions for development" },
          { id: "A.8.12.b", topic: "Classification — convective, orographic, frontal, nocturnal, squall lines" },
          { id: "A.8.12.c", topic: "Three stages of development, gust front" },
          { id: "A.8.12.d", topic: "Hazards — windshear, microbursts, hail, icing, lightning, tornadoes" },
          { id: "A.8.12.e", topic: "Avoidance and penetration procedures" },
        ],
      },
      {
        id: "A.8.13",
        title: "Ice Accretion",
        items: [
          { id: "A.8.13.a", topic: "Airframe icing — conditions, kinetic heating formula" },
          { id: "A.8.13.b", topic: "Types — clear/glaze ice, rime ice, mixed ice, freezing rain, hoar frost" },
          { id: "A.8.13.c", topic: "Engine icing — piston (impact, fuel, carburettor) and gas turbine" },
          { id: "A.8.13.d", topic: "Severity levels, ice protection — anti-icing and de-icing" },
        ],
      },
      {
        id: "A.8.14",
        title: "Windshear & Turbulence",
        items: [
          { id: "A.8.14.a", topic: "Windshear — definition, causes, low-level windshear, effect on aircraft" },
          { id: "A.8.14.b", topic: "Turbulence — types, causes, mountain waves, visual detection" },
          { id: "A.8.14.c", topic: "Wake turbulence — cause, dangers, weight categories, avoidance" },
        ],
      },
      {
        id: "A.8.15",
        title: "Visibility",
        items: [
          { id: "A.8.15.a", topic: "Visibility — definition, types of restriction (mist, fog, haze, dust), slant visibility" },
          { id: "A.8.15.b", topic: "Runway visual range (RVR)" },
          { id: "A.8.15.c", topic: "Fog types — radiation, advection, frontal, orographic, steam fog" },
        ],
      },
      {
        id: "A.8.16",
        title: "Air Masses",
        items: [
          { id: "A.8.16.a", topic: "Definition, classification, modification, air masses affecting South Africa" },
        ],
      },
      {
        id: "A.8.17",
        title: "Fronts",
        items: [
          { id: "A.8.17.a", topic: "Mid-latitude cyclones" },
          { id: "A.8.17.b", topic: "Cold fronts — formation, characteristics, weather, passage changes, flying conditions" },
          { id: "A.8.17.c", topic: "Warm fronts — formation, characteristics, weather, flying conditions" },
        ],
      },
      {
        id: "A.8.18",
        title: "Hurricanes (Tropical Cyclones)",
        items: [
          { id: "A.8.18.a", topic: "Development, characteristics, associated weather, common regions" },
        ],
      },
      {
        id: "A.8.19",
        title: "Climatology & World Weather",
        items: [
          { id: "A.8.19.a", topic: "World climatic zones, ITCZ, African climate" },
        ],
      },
      {
        id: "A.8.20",
        title: "South African Weather",
        items: [
          { id: "A.8.20.a", topic: "SA climatic regions, summer/winter patterns" },
          { id: "A.8.20.b", topic: "SA phenomena — frontal systems, tropical cyclones, coastal lows, Berg wind, Guti, Cape Doctor, cut-off lows" },
        ],
      },
      {
        id: "A.8.21",
        title: "Meteorological Information",
        items: [
          { id: "A.8.21.a", topic: "SAWS aviation website — layout and information" },
          { id: "A.8.21.b", topic: "Synoptic charts, SIGWX charts, upper wind charts" },
          { id: "A.8.21.c", topic: "METAR interpretation — all elements" },
          { id: "A.8.21.d", topic: "TAF interpretation — all elements" },
          { id: "A.8.21.e", topic: "SPECI, SIGMET, AIRMET, Special Air Report, ATIS" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 7. NAVIGATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "navigation",
    code: "NAV",
    title: "Navigation",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      {
        id: "A.9.1",
        title: "The Earth",
        items: [
          { id: "A.9.1.a", topic: "Form of earth — polar axis, rotation, great circles, rhumb lines" },
          { id: "A.9.1.b", topic: "Meridians of longitude, prime meridian, difference of longitude, convergency" },
          { id: "A.9.1.c", topic: "Latitude, equator, difference of latitude, co-ordinates" },
        ],
      },
      {
        id: "A.9.2",
        title: "Direction",
        items: [
          { id: "A.9.2.a", topic: "True north, magnetic north, compass north" },
          { id: "A.9.2.b", topic: "Variation, isogonals, compass deviation, radio bearings (QTE, QDR, QDM, QUJ)" },
        ],
      },
      {
        id: "A.9.3",
        title: "Distance",
        items: [
          { id: "A.9.3.a", topic: "Units — NM, statute miles, km, feet, conversions" },
          { id: "A.9.3.b", topic: "Relationship between NM and minutes of latitude" },
        ],
      },
      {
        id: "A.9.4",
        title: "The Solar System & Time",
        items: [
          { id: "A.9.4.a", topic: "Sun movements — apparent solar day, mean solar day, sidereal day" },
          { id: "A.9.4.b", topic: "Equinox, solstice, Tropics of Cancer and Capricorn" },
          { id: "A.9.4.c", topic: "LMT, zone time, UTC, arc-to-time conversions, international date line" },
          { id: "A.9.4.d", topic: "Sunrise, sunset, civil twilight determination" },
        ],
      },
      {
        id: "A.9.5",
        title: "Charts",
        items: [
          { id: "A.9.5.a", topic: "Projection theory — azimuthal, cylindrical, conical, orthomorphic, scale" },
          { id: "A.9.5.b", topic: "Mercator chart — properties, great circles, rhumb lines, scale variation, plotting" },
          { id: "A.9.5.c", topic: "Lambert's Conformal Conic — properties, radio bearings, scale, track/distance" },
        ],
      },
      {
        id: "A.9.6",
        title: "Relative Velocity",
        items: [
          { id: "A.9.6.a", topic: "Speed of opening/closing, aircraft separation, controlled time of arrival" },
        ],
      },
      {
        id: "A.9.7",
        title: "Dead Reckoning Navigation",
        items: [
          { id: "A.9.7.a", topic: "Navigation computer — speed/distance/time, EET, ETA, fuel, RAS/TAS" },
          { id: "A.9.7.b", topic: "Triangle of velocities — heading, track, TAS, groundspeed, wind, drift" },
        ],
      },
      {
        id: "A.9.8",
        title: "Navigation Plotting",
        items: [
          { id: "A.9.8.a", topic: "SA plotting chart 1:5 000 000 — use and interpretation" },
          { id: "A.9.8.b", topic: "Navigation during climb/descent — constant RAS, climb wind, groundspeed" },
          { id: "A.9.8.c", topic: "In-cruise navigation — position lines, QTE, radial/DME, NDB/VOR combinations" },
          { id: "A.9.8.d", topic: "Track corrections — 1 in 60 rule" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 8. RADIO AIDS & COMMUNICATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "radio-navigation",
    code: "RAD",
    title: "Radio Navigation & Communications",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      {
        id: "A.10.1",
        title: "Basic Radio Theory",
        items: [
          { id: "A.10.1.a", topic: "Electromagnetic waves — frequency, wavelength, sidebands, modulation types" },
          { id: "A.10.1.b", topic: "Antennas — characteristics, polarisation, polar diagram, types" },
          { id: "A.10.1.c", topic: "Wave propagation — ground waves, direct waves, sky waves, ionosphere, fading" },
        ],
      },
      {
        id: "A.10.2",
        title: "ADF (Automatic Direction Finder)",
        items: [
          { id: "A.10.2.a", topic: "Loop theory, rotating/fixed loop antennas, RBI and RMI" },
          { id: "A.10.2.b", topic: "Principles, coverage, range, errors, factors affecting accuracy" },
        ],
      },
      {
        id: "A.10.3",
        title: "VOR (VHF Omni-Directional Range)",
        items: [
          { id: "A.10.3.a", topic: "Principles, CDI and RMI, Doppler VOR" },
          { id: "A.10.3.b", topic: "Coverage, range, errors and accuracy, factors affecting" },
        ],
      },
      {
        id: "A.10.4",
        title: "DME (Distance Measuring Equipment)",
        items: [
          { id: "A.10.4.a", topic: "Principles, presentation and interpretation, coverage, range, accuracy" },
        ],
      },
      {
        id: "A.10.5",
        title: "Basic Radar Principles",
        items: [
          { id: "A.10.5.a", topic: "Pulse techniques, ground radar, SSR — modes and codes, mode S" },
        ],
      },
      {
        id: "A.10.6",
        title: "Airborne Weather Radar",
        items: [
          { id: "A.10.6.a", topic: "Principles, frequency band, presentation, errors and accuracy" },
        ],
      },
      {
        id: "A.10.9",
        title: "Radio Altimeter",
        items: [
          { id: "A.10.9.a", topic: "Principles, coverage, range, accuracy" },
        ],
      },
      {
        id: "A.10.10",
        title: "ELT (Emergency Locator Transmitter)",
        items: [
          { id: "A.10.10.a", topic: "Principles, frequencies, testing procedures" },
        ],
      },
      {
        id: "A.10.11",
        title: "Area Navigation (RNAV)",
        items: [
          { id: "A.10.11.a", topic: "VOR/DME RNAV — principle, advantages, accuracy, reliability, flight deck equipment" },
        ],
      },
      {
        id: "A.10.12",
        title: "GNSS / GPS",
        items: [
          { id: "A.10.12.a", topic: "System components, principle of operation, advantages/disadvantages" },
          { id: "A.10.12.b", topic: "Performance requirements, reliability/integrity, authorisation, errors, human factors" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 9. MASS & BALANCE (separate subject in some exam sittings)
  // ─────────────────────────────────────────────────────────────
  {
    id: "mass-and-balance",
    code: "M&B",
    title: "Mass & Balance",
    examQuestions: 30,
    passPercent: 75,
    sections: [
      {
        id: "MB.1",
        title: "Terminology & Definitions",
        items: [
          { id: "MB.1.a", topic: "CG, datum, arm, moment, conditions of equilibrium" },
          { id: "MB.1.b", topic: "MAC, LEMAC, MZFM, MTOM, MLM, EOM, maximum ramp mass" },
          { id: "MB.1.c", topic: "Fuel terms — taxi, take-off, trip, reserve (contingency, alternate, final reserve, extra)" },
          { id: "MB.1.d", topic: "Cargo pallets, maximum floor load, payload" },
        ],
      },
      {
        id: "MB.2",
        title: "Mass Limitations",
        items: [
          { id: "MB.2.a", topic: "Relationship between mass and structural stress" },
          { id: "MB.2.b", topic: "CG limits — forward and aft, effect on stability and controllability" },
          { id: "MB.2.c", topic: "CG position and aircraft performance" },
        ],
      },
      {
        id: "MB.3",
        title: "CG Calculations",
        items: [
          { id: "MB.3.a", topic: "Principle of CG calculation, calculating CG for SEP (CAP 696)" },
          { id: "MB.3.b", topic: "Calculating CG for MEP (CAP 696), % MAC" },
          { id: "MB.3.c", topic: "Loading not exceeding CG limits, max load at station" },
          { id: "MB.3.d", topic: "Movement of CG in flight — weight shift, weight loss (fuel burn)" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 10. PRINCIPLES OF FLIGHT (subset of ATG aerodynamics + POF subject)
  // ─────────────────────────────────────────────────────────────
  {
    id: "principles-of-flight",
    code: "POF",
    title: "Principles of Flight",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      {
        id: "POF.1",
        title: "Laws & Definitions",
        items: [
          { id: "POF.1.a", topic: "Newton's Laws of Motion, mass, weight, inertia, velocity" },
          { id: "POF.1.b", topic: "Static and dynamic pressure, momentum, acceleration, equilibrium" },
          { id: "POF.1.c", topic: "Airspeeds — IAS, CAS, EAS, TAS, Mach number" },
        ],
      },
      {
        id: "POF.2",
        title: "Lift",
        items: [
          { id: "POF.2.a", topic: "Equation of continuity, Bernoulli's theorem, venturi effect" },
          { id: "POF.2.b", topic: "Aerofoil definitions — camber, chord, AOA, CP, pressure distribution" },
          { id: "POF.2.c", topic: "Lift formula, lift curve, L/D ratio, aerofoil shape, aspect ratio" },
        ],
      },
      {
        id: "POF.3",
        title: "Drag",
        items: [
          { id: "POF.3.a", topic: "Profile drag — form drag, skin friction, methods of reducing" },
          { id: "POF.3.b", topic: "Induced drag — vortices, variation with speed/AOA, winglets" },
          { id: "POF.3.c", topic: "Total drag curve, factors affecting, thrust/THP" },
        ],
      },
      {
        id: "POF.4",
        title: "Flying Controls",
        items: [
          { id: "POF.4.a", topic: "Elevator, ailerons, rudder — primary and secondary effects" },
          { id: "POF.4.b", topic: "Control balancing — aerodynamic balance, tabs, mass balancing" },
          { id: "POF.4.c", topic: "Trimming systems — fixed tabs, balance, anti-balance, servo, spring tabs" },
          { id: "POF.4.d", topic: "Adverse aileron yaw — differential and frise ailerons" },
        ],
      },
      {
        id: "POF.5",
        title: "High Lift Devices",
        items: [
          { id: "POF.5.a", topic: "Trailing edge flaps — types, stalling angle, stalling speed, use in T/O and landing" },
          { id: "POF.5.b", topic: "Leading edge flaps, slats and slots" },
        ],
      },
      {
        id: "POF.6",
        title: "Stalling",
        items: [
          { id: "POF.6.a", topic: "Boundary layer — laminar/turbulent flow, transition/separation points" },
          { id: "POF.6.b", topic: "Stall symptoms — power off/on, with/without flaps, warning indications" },
          { id: "POF.6.c", topic: "Stall recovery, stall speed and influencing factors (CG, power, wing loading)" },
          { id: "POF.6.d", topic: "Wing tip stalling, washout, boundary layer fences, vortex generators" },
        ],
      },
      {
        id: "POF.7",
        title: "Spinning",
        items: [
          { id: "POF.7.a", topic: "Incipient spin — autorotation, development, recognition, recovery" },
          { id: "POF.7.b", topic: "Fully developed spin — forces, development, recognition, recovery" },
        ],
      },
      {
        id: "POF.8",
        title: "Forces in Flight",
        items: [
          { id: "POF.8.a", topic: "Straight and level — power available vs required, range and endurance" },
          { id: "POF.8.b", topic: "Climbing — steady climb, max rate, best angle, factors affecting" },
          { id: "POF.8.c", topic: "Descending — glide for range and endurance, effect of power" },
          { id: "POF.8.d", topic: "Turning — centripetal/centrifugal, load factor, rate/radius, steep turns" },
        ],
      },
      {
        id: "POF.9",
        title: "Stability",
        items: [
          { id: "POF.9.a", topic: "Axes and planes of rotation, static stability, dynamic stability" },
        ],
      },
    ],
  },
];

// Helper: get a subject by ID
export function getSubject(id: string): SyllabusSubject | undefined {
  return SACAA_SYLLABUS.find((s) => s.id === id);
}

// Helper: get all syllabus items for a subject (flat list)
export function getAllItems(subjectId: string): SyllabusItem[] {
  const subject = getSubject(subjectId);
  if (!subject) return [];
  return subject.sections.flatMap((sec) => sec.items);
}

// Helper: total number of syllabus items across all subjects
export const TOTAL_SYLLABUS_ITEMS = SACAA_SYLLABUS.reduce(
  (acc, s) => acc + s.sections.reduce((a, sec) => a + sec.items.length, 0),
  0
);
