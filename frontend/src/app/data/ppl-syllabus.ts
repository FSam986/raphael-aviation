// ============================================================================
// SACAA PPL (AEROPLANE) SYLLABUS — Appendix 1.0 (combined PPL-A/PPL-H)
// Source of truth: docs/PPL-Combined-Syllabus.pdf. This file mirrors the
// aeroplane (PPL-A) column only — helicopter-only items (e.g. 12.0 Helicopter
// Aerodynamics, rotor items) are excluded, the same way the CPL data is scoped
// to aeroplane. Section numbers follow the appendix's own reference numbers.
//
// NOTE: examQuestions / passPercent / examMinutes are NOT in the appendix
// (it lists topics only). They come from SA-CATS 61's exam tables — the values
// below are placeholders to confirm against the current SACAA exam info.
// ============================================================================

import type { SyllabusSubject } from "./sacaa-syllabus";

export const PPL_SYLLABUS: SyllabusSubject[] = [
  // ─────────────────────────────────────────────────────────────
  // AIR LAW & OPERATIONAL PROCEDURES
  // ─────────────────────────────────────────────────────────────
  {
    id: "ppl-air-law",
    code: "LAW",
    title: "Air Law & Operational Procedures",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      {
        id: "1",
        title: "ICAO — Convention & Articles",
        items: [
          { id: "1.a", topic: "The Convention on International Civil Aviation; the ICAO organisation" },
          { id: "1.b", topic: "Sovereignty, territory, flight over territory of Contracting States, landing at customs airports" },
          { id: "1.c", topic: "Applicability of air regulations, rules of the air, entry/clearance, search of aircraft" },
          { id: "1.d", topic: "Documents to be carried, use of radio equipment, Certificate of Airworthiness, personnel licences" },
          { id: "1.e", topic: "Recognition/endorsement/validity of certificates & licences, journey log books, cargo & photographic restrictions" },
        ],
      },
      {
        id: "4",
        title: "Annex 14 — Aerodromes & Visual Aids",
        items: [
          { id: "4.a", topic: "Aerodrome data, definitions, conditions of the movement area and related facilities" },
          { id: "4.b", topic: "Visual aids for navigation — indicators/signalling devices, markings, lights, signs, markers, signal area" },
          { id: "4.c", topic: "Visual aids for denoting obstacles and restricted-use areas" },
          { id: "4.d", topic: "Emergency & other services (fire/rescue, apron management); ground light & surface marking colours" },
        ],
      },
      {
        id: "5.1",
        title: "CAR Part 1 — Definitions & Abbreviations",
        items: [{ id: "5.1.a", topic: "Definitions and abbreviations used throughout the regulations" }],
      },
      {
        id: "5.2",
        title: "CAR Part 12 — Aviation Accidents & Incidents",
        items: [
          { id: "5.2.a", topic: "Notification of accidents and incidents (incl. outside the Republic); particulars of notification" },
          { id: "5.2.b", topic: "Guarding of aircraft involved in an accident; interference with objects/marks at the scene" },
        ],
      },
      {
        id: "5.3",
        title: "CAR Part 61 — Flight Crew Licensing",
        items: [
          { id: "5.3.a", topic: "General requirements — pilot licences, ratings, maintenance of competency, medical fitness, language, logging of flight time" },
          { id: "5.3.b", topic: "Private Pilot Licence — requirements, application, experience/examinations, skill test, validity, privileges & conditions" },
          { id: "5.3.c", topic: "Class and type ratings — validity, revalidation, renewal" },
          { id: "5.3.d", topic: "Night rating" },
        ],
      },
      {
        id: "5.4",
        title: "CAR Part 67 — Medical Certification",
        items: [
          { id: "5.4.a", topic: "Classes of medical certificates" },
          { id: "5.4.b", topic: "Period of validity of medical certificates" },
        ],
      },
      {
        id: "5.5",
        title: "CAR Part 91 — General Operating & Flight Rules",
        items: [
          { id: "5.5.a", topic: "General provisions; flight crew — composition, emergency duties, responsibilities, recency, PIC duties" },
          { id: "5.5.b", topic: "Documentation & records — documents carried, flight manual, checklists, flight folio, fuel/oil record, CRS" },
          { id: "5.5.c", topic: "Instruments & equipment — operating lights, nav equipment, seat belts, first aid, oxygen, fire extinguishers" },
          { id: "5.5.d", topic: "Rules of the air — right of way, speed, lights, taxi, signals, mandatory radio, prohibited/restricted areas" },
          { id: "5.5.e", topic: "VMC minima, special VFR, minimum heights, semi-circular rule" },
          { id: "5.5.f", topic: "Flight operations — minimum altitudes, mass & balance, fuel supply, refuelling with passengers, briefing, oxygen, acrobatic flight" },
        ],
      },
      {
        id: "5.6",
        title: "CAR Part 139 — Aerodromes & Heliports",
        items: [{ id: "5.6.a", topic: "Licensing/approval and operation of aerodromes and heliports" }],
      },
      {
        id: "5.7",
        title: "Operational Procedures",
        items: [
          { id: "5.7.a", topic: "ICAO Annex 12 — Search and rescue" },
          { id: "5.7.b", topic: "ICAO Annex 13 — Aircraft accident investigation" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // AIRCRAFT GENERAL KNOWLEDGE
  // ─────────────────────────────────────────────────────────────
  {
    id: "ppl-aircraft-technical",
    code: "ATG",
    title: "Aircraft Technical & General",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      {
        id: "6.1",
        title: "Airframe",
        items: [{ id: "6.1.a", topic: "Aeroplane airframe structure — components, materials, loads and stresses" }],
      },
      {
        id: "6.2",
        title: "Powerplant",
        items: [
          { id: "6.2.a", topic: "Piston engines — general operating principles, the four-stroke cycle" },
          { id: "6.2.b", topic: "Fuel, ignition, cooling and lubrication systems" },
          { id: "6.2.c", topic: "Carburation, mixture control, and avoiding spark-plug fouling" },
          { id: "6.2.d", topic: "Engine operational criteria — handling, limitations, monitoring" },
        ],
      },
      {
        id: "6.3",
        title: "Propellers",
        items: [{ id: "6.3.a", topic: "Propeller principles, fixed and variable-pitch, operation and limitations" }],
      },
      {
        id: "6.4",
        title: "Systems",
        items: [{ id: "6.4.a", topic: "Fuel, electrical, vacuum and other aircraft systems — operation and failures" }],
      },
      {
        id: "6.5",
        title: "Instruments",
        items: [
          { id: "6.5.a", topic: "Pressure instruments — altimeter, airspeed indicator, vertical speed indicator" },
          { id: "6.5.b", topic: "Gyroscopic instruments and the magnetic compass — principles, errors, limitations" },
        ],
      },
      {
        id: "6.6",
        title: "Airworthiness & Emergency Procedures",
        items: [{ id: "6.6.a", topic: "Airworthiness requirements and aircraft emergency procedures" }],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // FLIGHT PERFORMANCE & PLANNING
  // ─────────────────────────────────────────────────────────────
  {
    id: "ppl-flight-planning",
    code: "FPP",
    title: "Flight Performance & Planning",
    examQuestions: 30,
    passPercent: 75,
    sections: [
      {
        id: "7.1",
        title: "Mass & Balance",
        items: [{ id: "7.1.a", topic: "Mass and balance — terminology, loading, centre of gravity limits and calculations" }],
      },
      {
        id: "7.2",
        title: "Abbreviations, Definitions & Symbols",
        items: [{ id: "7.2.a", topic: "Performance abbreviations, definitions and symbols" }],
      },
      {
        id: "7.3",
        title: "Runways",
        items: [{ id: "7.3.a", topic: "Runway characteristics affecting performance — surface, slope, contamination, declared distances" }],
      },
      {
        id: "7.4",
        title: "Aeroplane Performance Graphs",
        items: [{ id: "7.4.a", topic: "Use of performance graphs — take-off, landing, climb and cruise" }],
      },
      {
        id: "7.6",
        title: "Fuel Weight & Performance",
        items: [{ id: "7.6.a", topic: "Effect of fuel weight on performance and planning" }],
      },
      {
        id: "7.7",
        title: "Aircraft Performance",
        items: [{ id: "7.7.a", topic: "Factors affecting aircraft performance — density altitude, weight, wind, temperature" }],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // HUMAN PERFORMANCE & LIMITATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "ppl-human-performance",
    code: "HPL",
    title: "Human Performance & Limitations",
    examQuestions: 20,
    passPercent: 75,
    sections: [
      {
        id: "8.1",
        title: "Basic Physiology",
        items: [
          { id: "8.1.a", topic: "The atmosphere and respiration — hypoxia, hyperventilation, oxygen requirements" },
          { id: "8.1.b", topic: "Effects of pressure changes, vision, hearing, disorientation, fatigue, alcohol/drugs/medication" },
        ],
      },
      {
        id: "8.2",
        title: "Basic Psychology",
        items: [
          { id: "8.2.a", topic: "Human information processing, attention, perception and workload" },
          { id: "8.2.b", topic: "Verbal communication, judgement, decision-making and error" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // METEOROLOGY
  // ─────────────────────────────────────────────────────────────
  {
    id: "ppl-meteorology",
    code: "MET",
    title: "Meteorology",
    examQuestions: 30,
    passPercent: 75,
    sections: [
      { id: "9.1", title: "The Atmosphere", items: [{ id: "9.1.a", topic: "Composition and structure of the atmosphere" }] },
      { id: "9.2", title: "Pressure, Density & Temperature", items: [{ id: "9.2.a", topic: "Atmospheric pressure, density and temperature and their relationships" }] },
      { id: "9.3", title: "Humidity & Precipitation", items: [{ id: "9.3.a", topic: "Humidity, condensation, and the forms of precipitation" }] },
      { id: "9.4", title: "Pressure & Wind", items: [{ id: "9.4.a", topic: "Pressure systems, pressure gradient, and the formation of wind" }] },
      { id: "9.5", title: "Cloud Formation", items: [{ id: "9.5.a", topic: "Cloud formation processes, classification and types" }] },
      { id: "9.6", title: "Fog, Mist & Haze", items: [{ id: "9.6.a", topic: "Formation of fog, mist and haze and their effect on visibility" }] },
      { id: "9.7", title: "Air Masses", items: [{ id: "9.7.a", topic: "Air mass classification, source regions and characteristics" }] },
      { id: "9.8", title: "Frontology", items: [{ id: "9.8.a", topic: "Warm, cold and occluded fronts — structure, weather and passage" }] },
      { id: "9.9", title: "Ice Accretion", items: [{ id: "9.9.a", topic: "Airframe and engine icing — types, conditions and effects" }] },
      { id: "9.10", title: "Thunderstorms", items: [{ id: "9.10.a", topic: "Thunderstorm formation, stages, hazards and avoidance" }] },
      { id: "9.11", title: "Flight Over Mountainous Areas", items: [{ id: "9.11.a", topic: "Mountain waves, turbulence and hazards over high ground" }] },
      { id: "9.12", title: "Climatology", items: [{ id: "9.12.a", topic: "General climatology and South African weather patterns" }] },
      { id: "9.13", title: "Altimetry", items: [{ id: "9.13.a", topic: "Altimeter settings (QNH/QFE/QNE) and pressure-setting procedures" }] },
      { id: "9.14", title: "Weather Analysis & Forecasting", items: [{ id: "9.14.a", topic: "Synoptic and significant weather charts, station decode" }] },
      { id: "9.15", title: "Weather Information for Flight Planning", items: [{ id: "9.15.a", topic: "METAR, TAF, SIGMET and other briefing material for flight planning" }] },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "ppl-navigation",
    code: "NAV",
    title: "Navigation",
    examQuestions: 30,
    passPercent: 75,
    sections: [
      { id: "10.1", title: "Form of the Earth", items: [{ id: "10.1.a", topic: "Shape of the Earth, great/small circles, rhumb lines, latitude and longitude" }] },
      { id: "10.2", title: "Time", items: [{ id: "10.2.a", topic: "Time — UTC, local mean time, conversion, sunrise/sunset" }] },
      { id: "10.3", title: "Mapping — General", items: [{ id: "10.3.a", topic: "Map projections, scale, symbols and relief" }] },
      { id: "10.4", title: "Direction", items: [{ id: "10.4.a", topic: "True, magnetic and compass direction; variation and deviation" }] },
      { id: "10.5", title: "Aircraft Magnetism", items: [{ id: "10.5.a", topic: "Magnetic influences within the aircraft and their effect on the compass" }] },
      { id: "10.6", title: "The Navigation Computer", items: [{ id: "10.6.a", topic: "Use of the navigation computer — speed/distance/time, wind triangle, conversions" }] },
      { id: "10.7", title: "Practical Navigation", items: [{ id: "10.7.a", topic: "Flight planning, dead reckoning, position fixing and in-flight navigation" }] },
      { id: "10.8", title: "Radio Navigation", items: [{ id: "10.8.a", topic: "Radio navigation aids — VOR, NDB/ADF, DME, GNSS principles and use" }] },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PRINCIPLES OF FLIGHT
  // ─────────────────────────────────────────────────────────────
  {
    id: "ppl-principles-of-flight",
    code: "POF",
    title: "Principles of Flight",
    examQuestions: 30,
    passPercent: 75,
    sections: [
      { id: "11.1", title: "The Atmosphere", items: [{ id: "11.1.a", topic: "The atmosphere and its properties relevant to flight" }] },
      { id: "11.2", title: "Lift", items: [{ id: "11.2.a", topic: "Generation of lift — aerofoils, angle of attack, lift equation" }] },
      { id: "11.3", title: "Drag", items: [{ id: "11.3.a", topic: "Types of drag — induced and parasite; the drag curve" }] },
      { id: "11.4", title: "Thrust", items: [{ id: "11.4.a", topic: "Thrust and its relationship with drag in flight" }] },
      { id: "11.5", title: "Flying Controls", items: [{ id: "11.5.a", topic: "Primary flying controls and the three axes of movement" }] },
      { id: "11.6", title: "Trimming Controls", items: [{ id: "11.6.a", topic: "Trim tabs and trimming devices" }] },
      { id: "11.7", title: "Flaps & Slats", items: [{ id: "11.7.a", topic: "High-lift devices — flaps and slats, effects and use" }] },
      { id: "11.8", title: "Flight Mechanics", items: [{ id: "11.8.a", topic: "Forces in flight — straight & level, climb, descent and turns" }] },
      { id: "11.9", title: "The Stall", items: [{ id: "11.9.a", topic: "The stall — cause, recognition, factors affecting stall speed and recovery" }] },
      { id: "11.10", title: "Avoidance of Spins", items: [{ id: "11.10.a", topic: "Spin cause, avoidance and recovery" }] },
      { id: "11.11", title: "Stability", items: [{ id: "11.11.a", topic: "Longitudinal, lateral and directional stability" }] },
      { id: "11.12", title: "Load Factor & Manoeuvres", items: [{ id: "11.12.a", topic: "Load factor, manoeuvres and the flight envelope" }] },
      { id: "11.13", title: "Stress Loads on the Ground", items: [{ id: "11.13.a", topic: "Ground loads and structural stress considerations" }] },
    ],
  },
];

/** Look up a PPL subject by id (e.g. "ppl-meteorology"). */
export function getPPLSubject(id: string): SyllabusSubject | undefined {
  return PPL_SYLLABUS.find((s) => s.id === id);
}
