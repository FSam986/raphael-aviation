import type { ReactNode } from "react";
import {
  ClimatologyMet,
  AtmosphericPressure,
  Wind,
  IceAccretion,
  AirMasses,
  TropicalCyclones,
  WorldClimatology,
  SouthAfricanWeather,
  MeteorologicalInformation,
} from "@/app/components/figures/metInfographics";
import {
  DefinitionsAbbreviations,
  AccidentsIncidents,
  Maintenance,
  PilotLicensing,
  MedicalCertification,
  GeneralOperatingRules,
  DangerousGoods,
  CorporateOperations,
  AirTransportLarge,
  AirTransportSmall,
  AerodromesHeliports,
  AirspaceATS,
  Enforcement,
  RSAAIP,
  JeppesenCharts,
  Annex14,
  ICAOConvention,
  OperationalProcedures,
} from "@/app/components/figures/airlawInfographics";
import {
  AtgElements, AtgAirframeSystems, AtgElectrics, AtgPiston, AtgTurbine,
  AtgEmergencyEquip, AtgHazards, AtgSubsonicAero,
} from "@/app/components/figures/atgInfographics";
import {
  HPPhysiology, HPHealth, HPPsychology, HPFirstAidSurvival,
} from "@/app/components/figures/humanPerfInfographics";
import { ATG_AIRFRAME_FIGURES } from "@/app/data/aircraft-technical-figures";
import { ATG_POWERPLANT_FIGURES } from "@/app/data/aircraft-technical-powerplant-figures";
import { ATG_ELECTRICS_FIGURES } from "@/app/data/aircraft-technical-electrics-figures";
import { PPL_MET_FIGURE_KEY } from "@/app/data/ppl-met-content";
import { PPL_NAV_FIGURE_KEY } from "@/app/data/ppl-nav-content";
import { PPL_FPP_FIGURE_KEY } from "@/app/data/ppl-fpp-content";
import { PPL_AGK_FIGURE_KEY } from "@/app/data/ppl-agk-content";
import { IR_MET_FIGURE_KEY } from "@/app/data/ir-met-content";
import { IR_AWO_FIGURE_KEY } from "@/app/data/ir-awo-content";
import { IR_FPP_FIGURE_KEY } from "@/app/data/ir-fpp-content";
import { ApproachSegments, ApproachLightingPAPI, StraightDeparture } from "@/app/components/figures/awoFigures";
import { RunwayLighting, RunwayMarkings } from "@/app/components/figures/runwayFigures";
import { PitotStaticLogic, AltimeterSettings, ASIColourCode, GyroProperties, CompassErrors } from "@/app/components/figures/instrumentsFigures";
import { EarthGCRL, WindTriangle, OneInSixty, ChartProjections } from "@/app/components/figures/navFigures";
import { ADFQCodes, ILSGeometry, SSRModes, GPSFix, DMEPrinciple, WeatherRadarModes, RadioAltimeter, ELTCard, RNAVWaypoint } from "@/app/components/figures/radionavFigures";
import { FrequencyBands, RadioFormulas, VSpeedTable, DragCurve, VnDiagram } from "@/app/components/figures/referenceFigures";
import { VSIFigure, TurnRateFigure, TemperatureFigure, EngineInstruments, NorthVariation, DistanceConversions, TimeConversions, FlightPlanSAR, EmergencyPhraseology, MetKeyNumbers, EFISFlightDirector, AutopilotModes, StallWarning, RelativeVelocity, RadioSpectrum, RadioOperation, AirspaceClasses, Part91Card } from "@/app/components/figures/gapFigures";
import { MessagePriority, RCFFlow, PhraseologyCard } from "@/app/components/figures/grFigures";
import { AirspaceCrossSection, LightGunSignals, WakeTurbulencePictorial } from "@/app/components/figures/grPictorial";
import { ISAColumn, StabilityLapseRates, CloudLadder, ThunderstormCycle, FrontsDiagram, FogTypes } from "@/app/components/figures/metFigures2";
import {
  PerformanceClassification,
  Certification,
  StagesAirspeed,
  MetAerodromeTerminology,
  PerformanceTerminology,
  FactorsAffectingPerformance,
  SEPPerformanceData,
  MEPPerformanceData,
  MEPCalculations,
  MassBalance,
  FlightPlanningGeneral,
} from "@/app/components/figures/fppInfographics";
import {
  AccelerateStopGo,
  PETConstruction,
  PNRConstruction,
} from "@/app/components/figures/fppTextbookFigures";

// Registry of illustrations keyed by syllabus sectionId. The study page shows an
// "Illustrations" tab that renders whatever is registered here. Current figures
// are the user's infographic images in /public/figures/met/. Sections without an
// uploaded image get an original SVG infographic built in the same style (TODO).

export interface FigureDef {
  id: string;
  title: string;
  caption: string;
  render: () => ReactNode;
}

// Image-based illustration helper. Files live in /public/figures/<folder>/.
// folder defaults to "met" so existing Meteorology calls are unchanged; pass
// "fpp" or "airlaw" for those subjects' uploaded images.
export function imageFigure(id: string, title: string, caption: string, file: string, folder = "met"): FigureDef {
  return {
    id,
    title,
    caption,
    render: () => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`/figures/${folder}/${file}`} alt={title} loading="lazy" className="w-full rounded-lg border border-zinc-800 bg-white" />
    ),
  };
}

const FIGURES: Record<string, FigureDef[]> = {
  // ── CPL Aircraft Technical & General (A.1) ──
  "A.1.1": [{ id: "atg-elements", title: "Elements & Terminology", caption: "Mass, force, stress and the materials the airframe is made of.", render: () => <AtgElements /> }],
  "A.1.2": [{ id: "atg-airframe", title: "Airframe & Systems", caption: "Structure, hydraulics, pressurisation and ice protection.", render: () => <AtgAirframeSystems /> }],
  "A.1.3": [{ id: "atg-electrics", title: "Electrical Systems", caption: "Generation, distribution and the failure drill.", render: () => <AtgElectrics /> }],
  "A.1.4": [{ id: "atg-piston", title: "Piston Engines", caption: "The four-stroke cycle, mixture, detonation and carb ice.", render: () => <AtgPiston /> }],
  "A.1.5": [{ id: "atg-turbine", title: "Gas Turbine Engines", caption: "The continuous cycle and the start-fault questions.", render: () => <AtgTurbine /> }],
  "A.1.6": [{ id: "atg-emerg", title: "Emergency Equipment", caption: "Fire agents, oxygen thresholds and survival gear.", render: () => <AtgEmergencyEquip /> }],
  "A.1.7": [{ id: "atg-hazards", title: "Operational Hazards", caption: "Fuel contamination, static/bonding and the environment.", render: () => <AtgHazards /> }],
  "A.1.8": [{ id: "atg-aero", title: "Subsonic Aerodynamics", caption: "Lift, the two drags, stall-speed drivers and load factor.", render: () => <AtgSubsonicAero /> }],
  // ── CPL Human Performance (A.6) ──
  "A.6.1": [{ id: "hp-physiology", title: "Basic Physiology", caption: "Oxygen, the senses, altitude (TUC) and acceleration.", render: () => <HPPhysiology /> }],
  "A.6.2": [{ id: "hp-health", title: "Health & Hygiene", caption: "Sleep, circadian rhythm, stress, fatigue and fitness to fly.", render: () => <HPHealth /> }],
  "A.6.3": [{ id: "hp-psychology", title: "Basic Aviation Psychology", caption: "Memory, human error, decision-making and CRM.", render: () => <HPPsychology /> }],
  "A.6.4": [{ id: "hp-firstaid", title: "First Aid & Survival", caption: "DRABC priorities and the survival order.", render: () => <HPFirstAidSurvival /> }],
  // ── CPL Air Law (A.3) ──
  "A.3.1": [{ id: "al-definitions", title: "Definitions & Abbreviations", caption: "The exact CAR Part 1 meanings the exam turns on.", render: () => <DefinitionsAbbreviations /> }],
  "A.3.2": [{ id: "al-accidents", title: "Accidents & Incidents (Part 12)", caption: "Notification, protecting the scene, and the no-blame principle.", render: () => <AccidentsIncidents /> }],
  "A.3.3": [{ id: "al-maintenance", title: "Maintenance (Part 43)", caption: "Who releases work, logbooks and airworthiness.", render: () => <Maintenance /> }],
  "A.3.4": [{ id: "al-licensing", title: "Pilot Licensing (Part 61)", caption: "CPL(A) requirements, privileges and validity.", render: () => <PilotLicensing /> }],
  "A.3.5": [{ id: "al-medical", title: "Medical Certification (Part 67)", caption: "Classes, validity and the pilot's own duty.", render: () => <MedicalCertification /> }],
  "A.3.6": [{ id: "al-part91", title: "General Operating & Flight Rules (Part 91)", caption: "PIC authority, rules of the air, heights and minima.", render: () => <GeneralOperatingRules /> }],
  "A.3.7": [{ id: "al-dg", title: "Dangerous Goods (Part 92)", caption: "Carried only per the ICAO Technical Instructions.", render: () => <DangerousGoods /> }],
  "A.3.8": [{ id: "al-corporate", title: "Corporate Operations (Part 93)", caption: "Non-commercial, but above private standard.", render: () => <CorporateOperations /> }],
  "A.3.10": [{ id: "al-part121", title: "Air Transport — Large (Part 121)", caption: "Commercial air transport, >19 passengers.", render: () => <AirTransportLarge /> }],
  "A.3.12": [{ id: "al-part135", title: "Air Transport — Small (Part 135)", caption: "Commercial small aeroplanes — AOC, Ops Manual, higher minimums.", render: () => <AirTransportSmall /> }],
  "A.3.13": [{ id: "al-part139", title: "Aerodromes & Heliports (Part 139)", caption: "Licensing and the operator's safety duties.", render: () => <AerodromesHeliports /> }],
  "A.3.14": [{ id: "al-airspace", title: "Airspace & ATS (SA-CATS 172)", caption: "Classes A–G and the services in each.", render: () => <AirspaceATS /> }],
  "A.3.15": [{ id: "al-enforcement", title: "Enforcement (Part 185)", caption: "Powers, penalties and detention.", render: () => <Enforcement /> }],
  "A.3.16": [{ id: "al-aip", title: "RSA AIP", caption: "Airspace, procedures and aerodrome data.", render: () => <RSAAIP /> }],
  "A.3.17": [{ id: "al-jepp", title: "Jeppesen Enroute Charts", caption: "Airway structure and minimum altitudes (MEA/MOCA/MORA).", render: () => <JeppesenCharts /> }],
  "A.3.18": [{ id: "al-annex14", title: "ICAO Annex 14 — Aerodromes", caption: "Declared distances and visual aids.", render: () => <Annex14 /> }],
  // ── IR All-Weather-Operations flight procedures (C.3) — original schematics ──
  "C.3.4": [{ id: "awo-dep", title: "Straight Departure & Climb Gradient", caption: "±15° splay off the centre line and the minimum climb gradient.", render: () => <StraightDeparture /> }],
  "C.3.6": [{ id: "awo-approach", title: "Instrument Approach Segments", caption: "Initial → intermediate → final → missed approach, and the 3° path.", render: () => <ApproachSegments /> }],
  "C.3.7": [
    { id: "awo-lights", title: "Approach Lighting & PAPI", caption: "CAT I centre-line row, crossbar and PAPI on-slope indication.", render: () => <ApproachLightingPAPI /> },
    { id: "awo-rwylights", title: "Runway Lighting (Night)", caption: "Edge (white/amber), centreline (white/red), threshold green, TDZ, PAPI.", render: () => <RunwayLighting /> },
    { id: "awo-rwymarks", title: "Runway Markings", caption: "Designator, piano keys, aiming point, TDZ bars, displaced threshold.", render: () => <RunwayMarkings /> },
  ],
  // ── CPL Flight Instruments (A.7) — condensed cheat-code infographics ──
  "A.7.1": [
    { id: "ins-pitot", title: "Pitot-Static & Blockages", caption: "Who reads what, and the over/under-read cheat table.", render: () => <PitotStaticLogic /> },
    { id: "ins-alt", title: "Altimeter Settings", caption: "QNH/QFE/QNE and the 'High-to-Low, look out below' rule.", render: () => <AltimeterSettings /> },
    { id: "ins-asi", title: "ASI Colour Code", caption: "White/green/yellow arcs, VNE/VYSE and the IAS→TAS chain.", render: () => <ASIColourCode /> },
    { id: "ins-vspeeds", title: "V-speeds Reference", caption: "Every V-speed, its ASI marking and a typical value.", render: () => <VSpeedTable /> },
    { id: "ins-vsi", title: "Vertical Speed Indicator", caption: "Capsule + metered leak, inherent lag, IVSI, blockage behaviour.", render: () => <VSIFigure /> },
  ],
  "A.7.2": [
    { id: "ins-gyro", title: "Gyro Properties & Wander", caption: "Rigidity, precession (90° / inverse RPM) and drift vs topple.", render: () => <GyroProperties /> },
    { id: "ins-turn", title: "Turn Coordinator & Rate of Turn", caption: "Rate 1 = 3°/s, bank ≈ TAS/10+7, and the balance ball.", render: () => <TurnRateFigure /> },
  ],
  "A.7.3": [{ id: "ins-efis", title: "EFIS & Flight Director", caption: "PFD/ND layout, magenta FD command bars and EFIS colours.", render: () => <EFISFlightDirector /> }],
  "A.7.5": [{ id: "ins-temp", title: "Air Temperature (SAT/RAT/TAT)", caption: "Ram rise, recovery factor and TAT = SAT + ram rise.", render: () => <TemperatureFigure /> }],
  "A.7.6": [{ id: "ins-ap", title: "Autopilot — Axes & Modes", caption: "Roll/pitch/yaw, lateral vs vertical modes, servos, yaw damper.", render: () => <AutopilotModes /> }],
  "A.7.8": [{ id: "ins-stall", title: "Stall Warning", caption: "AoA vane/reed, warns ~5–10 kt above stall, shaker vs pusher.", render: () => <StallWarning /> }],
  "A.7.7": [{ id: "ins-compass", title: "Compass Errors", caption: "ANDS / UNOS, deviation coefficients and variation rules.", render: () => <CompassErrors /> }],
  "A.7.9": [{ id: "ins-engine", title: "Engine & System Instruments", caption: "RPM/MAP/EGT/oil/fuel/torque/chip — what each senses.", render: () => <EngineInstruments /> }],
  // ── CPL Navigation (A.9) — illustrated cheat-code infographics ──
  "A.9.1": [{ id: "nav-earth", title: "Earth: Great Circle vs Rhumb Line", caption: "Convergency, conversion angle and the NM–latitude link.", render: () => <EarthGCRL /> }],
  "A.9.2": [{ id: "nav-north", title: "North References — T / M / C", caption: "Variation & deviation, Variation West→Magnetic Best, isogonals.", render: () => <NorthVariation /> }],
  "A.9.3": [{ id: "nav-dist", title: "Distance Units & Conversions", caption: "NM/SM/km/ft, 1′ lat = 1 NM, departure = ch.long × cos lat.", render: () => <DistanceConversions /> }],
  "A.9.4": [{ id: "nav-time", title: "Time & Arc-to-Time", caption: "15°=1 h, 1°=4 min, LMT/UTC, twilight, equinox/solstice.", render: () => <TimeConversions /> }],
  "A.9.5": [{ id: "nav-charts", title: "Mercator vs Lambert", caption: "How great circles, rhumb lines and scale behave on each.", render: () => <ChartProjections /> }],
  "A.9.6": [{ id: "nav-relvel", title: "Relative Velocity", caption: "Closing/opening speed head-on vs same track, time to meet.", render: () => <RelativeVelocity /> }],
  "A.9.7": [{ id: "nav-triangle", title: "Triangle of Velocities", caption: "Air + wind = ground vector; drift and wind correction.", render: () => <WindTriangle /> }],
  "A.9.8": [{ id: "nav-1in60", title: "The 1-in-60 Rule", caption: "Track error, closing angle and regaining track.", render: () => <OneInSixty /> }],

  "A.10.1": [
    { id: "rn-freq", title: "Radio-aid Frequency Bands", caption: "Every aid's band and exact frequency — the values that appear as options.", render: () => <FrequencyBands /> },
    { id: "rn-formulas", title: "Radio-nav Formulas", caption: "λ, line-of-sight range, DME/radar range, ROD, 1-in-60.", render: () => <RadioFormulas /> },
  ],
  "A.10.2": [{ id: "rn-adf", title: "ADF / NDB — Bearings & Q-codes", caption: "QDM/QDR/QTE/QUJ, the QDM = HDG + RB rule, loop vs sense aerial.", render: () => <ADFQCodes /> }],
  "A.10.3": [{ id: "rn-ils", title: "ILS Geometry & Sectors", caption: "Localiser 90/150 Hz sectors, glide path, markers (75 MHz), ROD.", render: () => <ILSGeometry /> }],
  "A.10.4": [{ id: "rn-dme", title: "DME — Distance Measuring Equipment", caption: "Secondary radar, 63 MHz offset, slant range and the range formula.", render: () => <DMEPrinciple /> }],
  "A.10.5": [{ id: "rn-ssr", title: "SSR — Modes, Pulses & Squawks", caption: "A/B/C pulse spacing, 1030/1090 MHz, 7500/7600/7700.", render: () => <SSRModes /> }],
  "A.10.6": [{ id: "rn-wxradar", title: "Airborne Weather Radar", caption: "Pencil vs cosecant beam, colour intensity scale and contour.", render: () => <WeatherRadarModes /> }],
  "A.10.9": [{ id: "rn-radalt", title: "Radio Altimeter (FM-CW)", caption: "Frequency sweep, height from Δf, 4200–4400 MHz, 0–2500 ft.", render: () => <RadioAltimeter /> }],
  "A.10.10": [{ id: "rn-elt", title: "Emergency Locator Transmitter", caption: "121.5/243/406 MHz, downsweep tone and test rules.", render: () => <ELTCard /> }],
  "A.10.11": [{ id: "rn-rnav", title: "Area Navigation (RNAV)", caption: "Rho-Theta waypoint, B/P-RNAV accuracy, NM-based CDI.", render: () => <RNAVWaypoint /> }],
  "A.10.12": [{ id: "rn-gps", title: "GNSS / GPS — Ranging & Segments", caption: "Constellation, 4-satellite 3D fix, errors, RAIM, GDOP.", render: () => <GPSFix /> }],
  // ── General Radiotelephony (GR) — illustrated cheat-code infographics ──
  "GR5": [
    { id: "gr-lightgun", title: "Light-Gun Signals", caption: "What each colour/flash means to an aircraft in flight and on the ground.", render: () => <LightGunSignals /> },
    { id: "gr-priority", title: "Message Priority", caption: "Distress → urgency → DF → safety → met → regularity.", render: () => <MessagePriority /> },
    { id: "gr-phrase", title: "Standard Words Card", caption: "Affirm/Wilco/Roger/Squawk and the read-back list.", render: () => <PhraseologyCard /> },
  ],
  "GR1": [{ id: "gr-spectrum", title: "Radio Spectrum — Bands & Uses", caption: "VLF→EHF with frequency ranges and which aids use each.", render: () => <RadioSpectrum /> }],
  "GR2": [{ id: "gr-radioop", title: "Principles of Radio Operation", caption: "Squelch, simplex/duplex, AM voice, technique, stuck mic.", render: () => <RadioOperation /> }],
  "GR3": [
    { id: "gr-airspace-xs", title: "SA Airspace Cross-Section", caption: "The 'wedding-cake' — CTR, TMA, CTA, ATZ, classes and P/R/D areas by altitude.", render: () => <AirspaceCrossSection /> },
    { id: "gr-airspace", title: "Airspace Classes & VMC", caption: "Classes A–G, clearance/separation and VMC minima.", render: () => <AirspaceClasses /> },
  ],
  "GR4": [{ id: "gr-part91", title: "SA CAR Part 91 — Key Rules", caption: "VFR cruising levels, altimeter setting, min heights, right of way.", render: () => <Part91Card /> }],
  "GR6": [{ id: "gr-wake", title: "Wake Turbulence", caption: "Tip vortices, sink & drift, avoidance on take-off/landing, and the L/M/H/J categories.", render: () => <WakeTurbulencePictorial /> }],
  "GR7": [{ id: "gr-sar", title: "Flight Plans & SAR Phases", caption: "Filing/closing and INCERFA → ALERFA → DETRESFA.", render: () => <FlightPlanSAR /> }],
  "GR8": [{ id: "gr-emerg", title: "Emergency & Urgency Calls", caption: "MAYDAY vs PAN PAN, the distress format and 7700.", render: () => <EmergencyPhraseology /> }],
  "GR9": [{ id: "gr-rcf", title: "Radio Failure Flow", caption: "Fault-find → squawk 7600 → VFR/IFR failure actions.", render: () => <RCFFlow /> }],
  // ── PPL Air Law (ids 1, 4, 5.1–5.7) ──
  "1": [{ id: "ppl-al-icao", title: "ICAO — Convention & Articles", caption: "The Chicago Convention, sovereignty, articles and Annexes.", render: () => <ICAOConvention /> }],
  "4": [
    { id: "ppl-al-annex14", title: "Annex 14 — Aerodromes & Visual Aids", caption: "Declared distances and visual aids.", render: () => <Annex14 /> },
    { id: "ppl-al-rwymarks", title: "Runway Markings", caption: "Designator, piano keys, aiming point, touchdown zone, displaced threshold.", render: () => <RunwayMarkings /> },
    { id: "ppl-al-rwylights", title: "Runway Lighting", caption: "Edge, centreline, threshold, PAPI and approach lights at night.", render: () => <RunwayLighting /> },
  ],
  "5.1": [{ id: "ppl-al-def", title: "Part 1 — Definitions", caption: "Accident vs incident, serious injury, core terms.", render: () => <DefinitionsAbbreviations /> }],
  "5.2": [{ id: "ppl-al-accidents", title: "Part 12 — Accidents & Incidents", caption: "Notification, protecting the scene, no-blame.", render: () => <AccidentsIncidents /> }],
  "5.3": [{ id: "ppl-al-licensing", title: "Part 61 — Flight Crew Licensing", caption: "Licences, ratings, privileges and validity.", render: () => <PilotLicensing /> }],
  "5.4": [{ id: "ppl-al-medical", title: "Part 67 — Medical", caption: "Classes, validity and the pilot's own duty.", render: () => <MedicalCertification /> }],
  "5.5": [{ id: "ppl-al-part91", title: "Part 91 — General Operating & Flight Rules", caption: "PIC authority, rules of the air, heights and minima.", render: () => <GeneralOperatingRules /> }],
  "5.6": [{ id: "ppl-al-part139", title: "Part 139 — Aerodromes & Heliports", caption: "Licensing and the operator's safety duties.", render: () => <AerodromesHeliports /> }],
  "5.7": [{ id: "ppl-al-opsproc", title: "Operational Procedures", caption: "Light-gun & marshalling signals, wake turbulence, noise.", render: () => <OperationalProcedures /> }],
  // ── Flight Planning & Performance (A.4) ──
  "A.4.1": [{ id: "fpp-class", title: "Performance Classification", caption: "Classes A/B/C, gross vs net, mass limits.", render: () => <PerformanceClassification /> }],
  "A.4.2": [
    { id: "fpp-cert", title: "Certification & Load Factors", caption: "Category limit load factors and margins.", render: () => <Certification /> },
    { id: "fpp-vn", title: "V-n Flight Envelope", caption: "Stall curve, VA/VNO/VNE and the +3.8/−1.52g limit load factors.", render: () => <VnDiagram /> },
  ],
  "A.4.4": [{ id: "fpp-airspeed", title: "Stages of Flight & Airspeed", caption: "The V-speeds and the IAS→TAS chain.", render: () => <StagesAirspeed /> }],
  "A.4.5": [
    { id: "fpp-terms", title: "Met & Aerodrome Terminology", caption: "ISA, altitudes and declared distances.", render: () => <MetAerodromeTerminology /> },
    { id: "fpp-accel-stop-go", title: "Accelerate-Stop & Accelerate-Go", caption: "Textbook Figs 3-10/3-11 — the V₁ decision, reject vs continue to 35 ft.", render: () => <AccelerateStopGo /> },
  ],
  "A.4.7": [
    { id: "fpp-perf-terms", title: "Performance Terminology", caption: "Climb, cruise, range/endurance, ground distance.", render: () => <PerformanceTerminology /> },
    { id: "fpp-drag", title: "Drag vs Speed (Vmd = L/Dmax)", caption: "Induced + parasite = total drag; min drag = best glide/endurance.", render: () => <DragCurve /> },
  ],
  "A.4.8": [{ id: "fpp-factors", title: "Factors Affecting Performance", caption: "Density, mass, wind, slope and surface.", render: () => <FactorsAffectingPerformance /> }],
  "A.4.9": [{ id: "fpp-sep", title: "SEP Performance Data (CAP 698)", caption: "Reading the single-engine graphs.", render: () => <SEPPerformanceData /> }],
  "A.4.10": [{ id: "fpp-mep", title: "MEP Performance Data (CAP 697)", caption: "Reading the multi-engine graphs.", render: () => <MEPPerformanceData /> }],
  "A.4.11": [{ id: "fpp-mep-calc", title: "MEP Performance Calculations", caption: "Single-engine climb and drift-down.", render: () => <MEPCalculations /> }],
  "A.4.12": [{ id: "fpp-mb", title: "Mass & Balance", caption: "Moments, CG, %MAC and CG movement.", render: () => <MassBalance /> }],
  "A.4.13": [
    { id: "fpp-planning", title: "Flight Planning General", caption: "PET, PSR and the fuel plan.", render: () => <FlightPlanningGeneral /> },
    { id: "fpp-pet", title: "Point of Equal Time (PET)", caption: "Textbook Figs 8-3/8-4 — where time on equals time back.", render: () => <PETConstruction /> },
    { id: "fpp-pnr", title: "Point of No Return (PNR)", caption: "Ch9 construction — the endurance-limited turn-back point.", render: () => <PNRConstruction /> },
  ],
  // ── Meteorology (A.8) ──
  "A.8.1": [{ id: "climatology-met", title: "Climatology & Meteorology", caption: "Definitions, scales of study and the elements of weather.", render: () => <ClimatologyMet /> }],
  "A.8.3": [{ id: "atmospheric-pressure", title: "Atmospheric Pressure", caption: "Units, altimeter settings, gradient and pressure systems.", render: () => <AtmosphericPressure /> }],
  "A.8.8": [{ id: "wind", title: "Wind", caption: "Pressure gradient, Coriolis, friction, local winds and jet streams.", render: () => <Wind /> }],
  "A.8.13": [{ id: "ice-accretion", title: "Ice Accretion", caption: "Airframe and engine icing — types, conditions and effects.", render: () => <IceAccretion /> }],
  "A.8.16": [{ id: "air-masses", title: "Air Masses", caption: "Source regions, classification and modification.", render: () => <AirMasses /> }],
  "A.8.18": [{ id: "tropical-cyclones", title: "Tropical Cyclones", caption: "Structure, formation, hazards and season.", render: () => <TropicalCyclones /> }],
  "A.8.19": [{ id: "world-climatology", title: "Global Circulation & World Weather", caption: "Pressure belts, trade winds, ITCZ and monsoons.", render: () => <WorldClimatology /> }],
  "A.8.20": [{ id: "sa-weather", title: "South African Weather", caption: "Seasonal set-up and the key local phenomena.", render: () => <SouthAfricanWeather /> }],
  "A.8.21": [{ id: "met-information", title: "Meteorological Information", caption: "METAR / TAF decoding, change groups, SIGMET and charts.", render: () => <MeteorologicalInformation /> }],
  "A.8.2": [{ id: "met-isa", title: "ICAO Standard Atmosphere", caption: "15°C/1013/1.225, lapse 1.98°C/1000ft, tropopause −56.5°C.", render: () => <ISAColumn /> }, { id: "met-numbers", title: "Met Numbers to Memorise", caption: "ISA, lapse rates, pressure lapse, dew-point rule, Buys Ballot.", render: () => <MetKeyNumbers /> }, imageFigure("atmosphere", "The Atmosphere — composition, structure & layers", "Dry-air composition, the vertical structure to the tropopause, latitude zones and heat-transfer processes.", "atmosphere.jpg")],
  "A.8.4": [imageFigure("temperature", "Temperature", "Scales & conversions, instruments, radiation, insolation, diurnal variation, inversions and lapse rate.", "temperature.jpg")],
  "A.8.5": [imageFigure("humidity", "Humidity & dew point", "Relative/absolute/specific humidity, instruments and how cooling to the dew point brings saturation.", "humidity.jpg")],
  "A.8.6": [imageFigure("air-density", "Air density", "How pressure, temperature, humidity and height each change air density — with the summary bar.", "air-density.jpg")],
  "A.8.7": [
    imageFigure("pressure-altitude", "Pressure altitude", "What pressure altitude is, the 1 hPa = 30 ft relationship, and a full worked example.", "pressure-altitude.jpg"),
    imageFigure("altimetry", "Altimetry & altimeter settings", "QNE / QFE / QNH / QFF explained, the ARP, and reducing to MSL using ISA.", "altimetry.jpg"),
  ],
  "A.8.9": [{ id: "met-stability", title: "Lapse Rates & Stability", caption: "DALR/SALR/ELR and the stable/unstable rule.", render: () => <StabilityLapseRates /> }, imageFigure("stability", "Stability, lapse rate & adiabatic process", "DALR / SALR / ELR, the stability comparison graph and the full summary table.", "stability.jpg")],
  "A.8.10": [{ id: "met-cloud", title: "Cloud Types by Height", caption: "High/medium/low and vertical CU/CB; base spread rule.", render: () => <CloudLadder /> }, imageFigure("clouds-precip", "Clouds & precipitation", "The ten genera by height band, special clouds, and how a cloud forms (orographic, convergence, convection).", "clouds-precip.jpg")],
  "A.8.11": [imageFigure("clouds-precip-2", "Clouds & precipitation", "Cloud classification and formation — precipitation processes are covered on the same chart.", "clouds-precip.jpg")],
  "A.8.12": [
    { id: "met-ts", title: "Thunderstorm Life Cycle", caption: "Cumulus → mature → dissipating and the hazards.", render: () => <ThunderstormCycle /> },
    imageFigure("thunderstorms", "Thunderstorms", "Types (convective / frontal / convergent / orographic / nocturnal) and the three life-cycle stages.", "thunderstorms.jpg"),
    imageFigure("thunderstorm-hazards", "Thunderstorm hazards", "Turbulence & draughts, hail/SCWD, ice accretion, lightning and static.", "thunderstorm-hazards.jpg"),
  ],
  "A.8.14": [
    imageFigure("turbulence", "Turbulence", "Mechanical, low-level, wake and clear-air turbulence, plus windshear.", "turbulence.jpg"),
    imageFigure("mountain-waves-windshear", "Mountain waves & windshear", "Mountain/standing waves and the headwind/tailwind windshear effect on the approach.", "mountain-waves-windshear.jpg"),
    imageFigure("microburst-surface-turbulence", "Microburst & surface turbulence", "The microburst downdraught (>60 kt, <4 km, <5 min) and mechanical surface turbulence.", "microburst-surface-turbulence.jpg"),
  ],
  "A.8.15": [
    { id: "met-fog", title: "Fog Types", caption: "Radiation, advection, steaming/frontal, upslope.", render: () => <FogTypes /> },
    imageFigure("visibility-fogs", "Visibility & fog formation", "Haze/mist/fog definitions, RVR, and the formation of radiation, advection, upslope, valley and steam fog.", "visibility-fogs.jpg"),
    imageFigure("fog-frontal-tropical", "Frontal & tropical-air fog", "Frontal fog ahead of a warm front, and tropical-air fog.", "fog-frontal-tropical.jpg"),
  ],
  "A.8.17": [
    { id: "met-fronts", title: "Fronts", caption: "Warm, cold and occluded — slope, cloud and weather.", render: () => <FrontsDiagram /> },
    imageFigure("fronts", "Fronts", "Warm and cold front structure with cloud sequence and slope, plus the frontal-depression pressure belts.", "fronts.jpg"),
    imageFigure("front-passage", "Weather as a front passes", "Before/after temperature, dew point, visibility, pressure and wind for warm and cold fronts.", "front-passage.jpg"),
    imageFigure("occluded-front", "Occluded & stationary fronts", "Warm vs cold occlusion, embedded Cb, and the stationary (quasi-stationary) front.", "occluded-front.jpg"),
  ],
};

// The 206 recreated Airframes & Systems illustrations (textbook-numbered) are
// shown INLINE in the study notes next to the relevant topic, not in the
// Illustrations gallery — so these helpers resolve image FigureDefs on demand.
// All ATG image figures (airframes + powerplant), each with its public subfolder.
const ATG_IMAGE_FIGURES: { section: string; topic: string; title: string; caption: string; file: string; id: string; folder: string }[] = [
  ...ATG_AIRFRAME_FIGURES.map((f) => ({ ...f, folder: "airframes" })),
  ...ATG_POWERPLANT_FIGURES,
  ...ATG_ELECTRICS_FIGURES,
];

export function atgFiguresByTopic(topics: string[]): FigureDef[] {
  return ATG_IMAGE_FIGURES
    .filter((f) => topics.includes(f.topic))
    .map((f) => imageFigure(f.id, f.title, f.caption, f.file, f.folder));
}

export function atgFiguresForSection(sectionId: string): FigureDef[] {
  return ATG_IMAGE_FIGURES
    .filter((f) => f.section === sectionId)
    .map((f) => imageFigure(f.id, `${f.topic} — ${f.title}`, f.caption, f.file, f.folder));
}

export function figuresForSection(sectionId: string): FigureDef[] {
  if (FIGURES[sectionId]) return FIGURES[sectionId];
  // PPL / IR subjects reuse the CPL figures via a mapping.
  const mapped = PPL_MET_FIGURE_KEY[sectionId] ?? PPL_NAV_FIGURE_KEY[sectionId] ?? PPL_FPP_FIGURE_KEY[sectionId] ?? PPL_AGK_FIGURE_KEY[sectionId] ?? IR_MET_FIGURE_KEY[sectionId] ?? IR_AWO_FIGURE_KEY[sectionId] ?? IR_FPP_FIGURE_KEY[sectionId];
  return mapped ? FIGURES[mapped] ?? [] : [];
}
