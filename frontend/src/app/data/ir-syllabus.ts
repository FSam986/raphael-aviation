// SACAA Instrument Rating (Aeroplane) — Appendix 2C to SA-CATS 61.
// Seven theoretical-knowledge subjects. Meteorology (C.1) mirrors the CPL Met
// syllabus and reuses that content; the other subjects are built as the
// textbooks arrive. examQuestions/passPercent are SA-CATS 61 placeholders.

import type { SyllabusSubject } from "@/app/data/sacaa-syllabus";

const sec = (id: string, title: string, topics: string[]) => ({
  id,
  title,
  items: topics.map((t, i) => ({ id: `${id}.${String.fromCharCode(97 + i)}`, topic: t })),
});

export const IR_SYLLABUS: SyllabusSubject[] = [
  {
    id: "ir-meteorology",
    code: "MET",
    title: "Meteorology",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      sec("C.1.1", "The Atmosphere", ["Properties, composition and structure", "ICAO ISA", "ISA deviation"]),
      sec("C.1.2", "Atmospheric Pressure", ["Definition, units", "QNH/QFE/QNE, pressure altitude", "Pressure systems, isobars, gradient"]),
      sec("C.1.3", "Temperature", ["Units & conversion", "Heat transfer, insolation, advection", "Diurnal variation"]),
      sec("C.1.4", "Humidity", ["Water & changes of state, latent heat", "Saturation, vapour pressure, dew point", "Absolute & relative humidity"]),
      sec("C.1.5", "Density", ["Definition & factors", "Density altitude & calculation"]),
      sec("C.1.6", "Altimetry", ["Pressure/temperature corrections", "Calculating true altitude"]),
      sec("C.1.7", "Wind", ["Veering/backing, PGF, Coriolis, geostrophic/gradient/surface", "Upper winds, jet streams, CAT"]),
      sec("C.1.8", "Clouds", ["Observations, ceiling & base", "Formation, classification, types", "Flying conditions"]),
      sec("C.1.9", "Precipitation", ["Types, intensity, continuity", "Flying conditions"]),
      sec("C.1.10", "Thunderstorms", ["Formation & classification", "Stages, hazards, avoidance"]),
      sec("C.1.11", "Ice Accretion", ["Airframe icing & types", "Piston/carburettor/turbine icing", "ICAO icing levels, protection"]),
      sec("C.1.12", "Turbulence", ["Types & causes", "Mountain waves"]),
      sec("C.1.13", "Visibility", ["Definition, RVR, slant visibility", "Fog types"]),
      sec("C.1.14", "Fronts", ["Mid-latitude cyclones", "Cold, warm & occluded fronts"]),
      sec("C.1.15", "Regional Climatology", ["ITCZ", "African climate"]),
      sec("C.1.16", "South African Weather", ["SA climate & patterns", "SA phenomena (Berg wind, coastal low, cut-off low, Cape Doctor, Guti)"]),
      sec("C.1.17", "Meteorological Information", ["Synoptic & SIGWX charts, upper winds", "METAR/TAF/SPECI/SIGMET/AIRMET", "ATIS"]),
    ],
  },
  {
    id: "ir-radio-navigation",
    code: "RNV",
    title: "Radio Navigation",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      sec("C.2.1", "VHF Direction Finder (VDF)", ["Principles", "Coverage & range"]),
      sec("C.2.2", "NDB / ADF", ["Principles, presentation", "Coverage, errors, accuracy"]),
      sec("C.2.3", "VOR & Doppler VOR", ["Principles, presentation", "Coverage, errors, accuracy"]),
      sec("C.2.4", "DME", ["Principles, VOR/DME, VORTAC", "Presentation, coverage, accuracy"]),
      sec("C.2.5", "ILS", ["Principles, presentation", "Coverage, errors, accuracy"]),
      sec("C.2.6", "Airborne Weather Radar", ["Principles, presentation", "Coverage, limitations, application"]),
      sec("C.2.7", "Secondary Radar & Transponder", ["Principles, modes & codes", "Presentation, errors"]),
      sec("C.2.8", "Global Navigation Satellite System", ["Principles", "Operation of NAVSTAR GPS"]),
    ],
  },
  {
    id: "ir-air-law-awo",
    code: "AWO",
    title: "Air Law & All-Weather Operations",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      sec("C.3.1", "SA CARs & Definitions", ["Part 1.01.1 definitions (IFR/AWO terms)", "CAT I/II/III operations, decision altitude/height"]),
      sec("C.3.2", "General Flight Procedures", ["PANS-OPS obstacle clearance criteria", "Instrument procedure design basics"]),
      sec("C.3.3", "Altimeter Setting Procedures", ["QNH/QFE/QNE use, transition altitude/level/layer", "Cold-temperature corrections"]),
      sec("C.3.4", "Departure Procedures", ["SIDs, omnidirectional departures", "PDG, obstacle clearance on departure"]),
      sec("C.3.5", "En-route", ["MEA/MOCA/MORA/Grid MORA", "Airspace structure, holding, chart symbols"]),
      sec("C.3.6", "Arrival & Approach Procedures", ["STARs, approach segments (IAF/IF/FAF/MAP)", "Precision & non-precision approaches, circling, missed approach"]),
      sec("C.3.7", "ICAO Annex 14 — Aerodromes", ["Runway markings", "Approach & runway lighting, VASIS/PAPI"]),
    ],
  },
  {
    id: "ir-flight-performance",
    code: "FPP",
    title: "Flight Performance & Planning",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      sec("C.4.1", "Basic Aerodynamic Theory", ["Wing characteristics, lift/weight/thrust", "Drag types, ground effect"]),
      sec("C.4.2", "Performance Terminology & Theory", ["Steady flight, thrust/power curves", "Climb/descent angle & gradient, ceilings"]),
      sec("C.4.3", "Range & Endurance Performance", ["Flying for range", "Flying for endurance"]),
      sec("C.4.4", "Airspeed Terminology & Symbols", ["IAS/CAS/TAS/GS", "The V-speeds"]),
      sec("C.4.5", "Meteorological Terminology", ["ISA, OAT/TAT/SAT, ISA deviation", "Pressure/density altitude, QNH/QFE/QNE"]),
      sec("C.4.6", "Factors Affecting Performance", ["Temperature, density, mass, CG", "Runway surface/slope, wind, flap"]),
      sec("C.4.7", "Aeroplane Performance Classification", ["Part 91.08 performance operating limitations", "Class A/B/C"]),
      sec("C.4.9", "Stages of Flight", ["Take-off, climb, level, descent", "Approach & landing"]),
      sec("C.4.10", "PET & PNR", ["PET / critical point", "PNR / PSR"]),
      sec("C.4.11", "Specific Performance", ["Fuel weight & SG", "Specific endurance, range, SFC"]),
      sec("C.4.12", "Fuel Planning", ["CAR 91.07.12 fuel requirements", "In-flight fuel management"]),
      sec("C.4.13", "Documentation & Preflight Information", ["Documents to carry, AFM, checklists, flight plan, folio", "NOTAM, MEL/MMEL, AIP/AIC"]),
      sec("C.4.14", "IFR Altitudes", ["MEA/MRA/MAA/MOCA/MORA/MTA/MCA", "RVSM, QFE/QNE/QNH"]),
      sec("C.4.15", "Aerodrome Terminology", ["TORA/TODA/ASDA/LDA, clearway/stopway", "ACN/PCN, balanced field, WAT limits"]),
      sec("C.4.17", "Mass & Balance", ["Mass limitations & structural stress", "CG limits, stability, %MAC"]),
    ],
  },
  {
    id: "ir-special-procedures",
    code: "SOP",
    title: "Special Operational Procedures & Hazards",
    examQuestions: 30,
    passPercent: 75,
    sections: [
      sec("C.5.1", "Ground De-icing", ["Icing conditions, de-/anti-icing fluids", "Holdover times"]),
      sec("C.5.2", "Bird Strike Risk & Avoidance", ["Risk & avoidance"]),
      sec("C.5.3", "Fire & Smoke", ["Engine/cabin/cockpit/cargo fire", "Extinguishing agents, overheated brakes, smoke"]),
      sec("C.5.4", "Windshear & Microburst", ["Effects & recognition", "Avoidance & escape actions"]),
      sec("C.5.5", "Wake Turbulence", ["Cause, effect of speed/mass/wind", "Actions & separation"]),
      sec("C.5.6", "Contaminated Runways", ["Definitions & contamination types", "Hydroplaning/aquaplaning, critical speed"]),
      sec("C.5.7", "CFIT", ["Definition", "Avoidance"]),
      sec("C.5.8", "Stabilised Approach", ["Requirements", "Advantages"]),
    ],
  },
  {
    id: "ir-instruments",
    code: "INS",
    title: "Instruments",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      sec("I.1", "Air Data Instruments", ["Pitot/static system & malfunctions", "Altimeter, ASI, VSI"]),
      sec("I.2", "Gyroscopic Instruments", ["Gyroscopic fundamentals", "DG, RIC, AI/AH, turn & slip, AHRS"]),
      sec("I.3", "Horizontal Situation Indicator (HSI)", ["Construction & principle", "Information displayed"]),
      sec("I.4", "Electronic Flight Instrument System (EFIS)", ["PFD & ND/MFD", "Design & operation"]),
      sec("I.5", "Flight Director System (FD)", ["Displays & interpretation", "Modes, autoflight guidance"]),
      sec("I.6", "Autopilot", ["Principles & types", "Pitch/roll/combined modes"]),
      sec("I.7", "Radio Altimeter", ["Principles, frequency band", "Presentation, errors"]),
      sec("I.8", "Proximity & Warning Systems", ["GPWS/TAWS", "TCAS/ACAS, altitude alert"]),
      sec("I.9", "Air Temperature Indicators", ["Sensors"]),
      sec("I.10", "Magnetism", ["Magnetic compass, turning & acceleration errors"]),
      sec("I.11", "Principles of Practical Instrument Flying", ["Control vs performance instruments", "Scan techniques, failure implications"]),
    ],
  },
  {
    id: "ir-human-performance",
    code: "HPL",
    title: "Human Performance & Limitations",
    examQuestions: 20,
    passPercent: 75,
    sections: [
      sec("H.1", "Man & the Sensory System", ["The senses"]),
      sec("H.2", "Nervous System", ["Central, peripheral & autonomic", "Sensitivity, sensory adaptation"]),
      sec("H.3", "Vision", ["Anatomy & the visual pathway", "Rod/cone cells, night vision, colour blindness, depth perception"]),
      sec("H.4", "Hearing", ["Anatomy of the ear, cochlea", "Equilibrium, vestibular apparatus, semi-circular canals"]),
      sec("H.5", "Integration of Sensory Input", ["Spatial disorientation & illusions"]),
    ],
  },
];

export function getIRSubject(id: string): SyllabusSubject | undefined {
  return IR_SYLLABUS.find((s) => s.id === id);
}
