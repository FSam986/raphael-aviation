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
import { HP_FIGURES } from "@/app/data/human-performance-figures";
import { INSTRUMENTS_FIGURES } from "@/app/data/instruments-figures";
import { FPP_FIGURES } from "@/app/data/fpp-figures";
import { NAV_FIGURES } from "@/app/data/nav-figures";
import { AIRLAW_FIGURES } from "@/app/data/airlaw-figures";
import { RADIONAV_FIGURES } from "@/app/data/radionav-figures";
import { NavLightsSectors, NightVisionDiagram, AerodromeNightLighting } from "@/app/components/figures/nightFigures";
import { PhoneticAlphabetPlate, ReadabilityScalePlate, TransponderPlate, SurvivorSignalsPlate, SignalsAreaPlate, QCodesPlate, VdfClassesPlate, ChartReadingPlate, LineOfSightPlate } from "@/app/components/figures/grPlates";
import { ApproachSegments, ApproachLightingPAPI, StraightDeparture } from "@/app/components/figures/awoFigures";
import { ColdTempAltimetry, MinimumAltitudes, HoldingEntry, TransitionLayer, Microburst, Hydroplaning, StabilisedApproach, TurningDeparture, DeclaredDistances, ApproachMinima, DeIcing, VSpeeds, STARArrival, CirclingApproach, DMEArc, MissedApproach, HoldingSpeeds, VerticalProfile, RNPContainment } from "@/app/components/figures/irProcFigures";
import { RunwayLighting, RunwayMarkings } from "@/app/components/figures/runwayFigures";
import { PitotStaticLogic, AltimeterSettings, ASIColourCode, GyroProperties, CompassErrors } from "@/app/components/figures/instrumentsFigures";
import { EarthGCRL, WindTriangle, OneInSixty, ChartProjections } from "@/app/components/figures/navFigures";
import { ADFQCodes, ILSGeometry, SSRModes, GPSFix, DMEPrinciple, WeatherRadarModes, RadioAltimeter, ELTCard, RNAVWaypoint, VORPrinciple } from "@/app/components/figures/radionavFigures";
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
  /** "folder/file" for raster figures; absent for inline-SVG figures. */
  src?: string;
}

// Which figure files actually exist on disk (generated: scripts/gen-figure-manifest.mjs).
import { PPL_MET_FIGURE_KEY, PPL_NAV_FIGURE_KEY, PPL_FPP_FIGURE_KEY, PPL_AGK_FIGURE_KEY, IR_MET_FIGURE_KEY, IR_AWO_FIGURE_KEY, IR_FPP_FIGURE_KEY, IR_RNV_FIGURE_KEY, IR_INS_FIGURE_KEY, IR_HPL_FIGURE_KEY, PPL_POF_FIGURE_KEY } from "@/app/data/figure-keys";
import FIGURE_MANIFEST from "@/app/data/figure-manifest.json";
const MANIFEST = FIGURE_MANIFEST as Record<string, 1>;

/** False for a raster figure whose file hasn't been produced yet, so callers can
 *  drop it and show text only (no empty white figure box). */
export function figurePresent(f: FigureDef): boolean {
  return !f.src || f.src in MANIFEST;
}

// Image-based illustration helper. Files live in /public/figures/<folder>/.
// folder defaults to "met" so existing Meteorology calls are unchanged; pass
// "fpp" or "airlaw" for those subjects' uploaded images.
export function imageFigure(id: string, title: string, caption: string, file: string, folder = "met"): FigureDef {
  return {
    id,
    title,
    caption,
    src: `${folder}/${file}`,
    render: () => (
      // WebP sibling (~55% smaller, generated by scripts/gen-webp.sh); original as fallback.
      <picture>
        <source srcSet={`/figures/${folder}/${file.replace(/\.(png|jpe?g)$/i, ".webp")}`} type="image/webp" />
        <img src={`/figures/${folder}/${file}`} alt={title} loading="lazy" decoding="async" className="w-full rounded-lg border border-zinc-800 bg-[#10171b]" />
      </picture>
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
  "C.3.2": [
    { id: "awo-hold", title: "Holding Pattern & Entry Sectors", caption: "Racetrack hold, right turns, and the direct / parallel / teardrop entry sectors.", render: () => <HoldingEntry /> },
    { id: "awo-holdspd", title: "Holding — Max Speeds & Timing", caption: "Max holding IAS by level and the 1 / 1½ min inbound-leg timing.", render: () => <HoldingSpeeds /> },
  ],
  "C.3.3": [
    { id: "awo-coldalt", title: "Cold-Temperature Altimetry", caption: "In air colder than ISA the altimeter over-reads — true height is lower than indicated.", render: () => <ColdTempAltimetry /> },
    { id: "awo-translayer", title: "Transition Altitude, Level & Layer", caption: "QNH below the TA, flight levels on 1013 above the TL, and which setting to use.", render: () => <TransitionLayer /> },
  ],
  "C.3.4": [
    { id: "awo-dep", title: "Straight Departure & Climb Gradient", caption: "±15° splay off the centre line and the minimum climb gradient.", render: () => <StraightDeparture /> },
    { id: "awo-turndep", title: "Turning Departure", caption: "A turn > 15°, not commenced before the obstacle-clearance height (≈ >500 ft AGL).", render: () => <TurningDeparture /> },
    { id: "awo-vprofile", title: "Crossing Restrictions (Vertical Profile)", caption: "At/above, at/below, mandatory and window altitude constraints on the profile.", render: () => <VerticalProfile /> },
  ],
  "C.3.5": [
    { id: "awo-minalt", title: "En-route Minimum Altitudes", caption: "MOCA, MEA, MORA/Grid MORA and the 25 NM MSA over a terrain profile.", render: () => <MinimumAltitudes /> },
    { id: "awo-rnp", title: "PBN / RNP Lateral Containment", caption: "The ±1×RNP (95%) corridor and ±2×RNP containment with on-board alerting.", render: () => <RNPContainment /> },
  ],
  "C.3.6": [
    { id: "awo-star", title: "STAR — Arrival Routing", caption: "En-route airway → STAR waypoints with speed/altitude windows → the IAF.", render: () => <STARArrival /> },
    { id: "awo-approach", title: "Instrument Approach Segments", caption: "Initial → intermediate → final → missed approach, and the 3° path.", render: () => <ApproachSegments /> },
    { id: "awo-minima", title: "Precision vs Non-Precision Minima", caption: "Continuous path to DA/DH vs levelling at MDA/MDH, and the MAPt.", render: () => <ApproachMinima /> },
    { id: "awo-circle", title: "Circling Approach Area", caption: "Manoeuvre within the circling area at/above circling OCH; prohibited sectors.", render: () => <CirclingApproach /> },
    { id: "awo-dmearc", title: "DME Arc & Radial Intercept", caption: "Lead the turn onto the arc, hold constant DME, intercept the final radial.", render: () => <DMEArc /> },
    { id: "awo-missed", title: "Missed Approach — Three Phases", caption: "Initial (go-around, config, climb), intermediate (climb established), final (to a fix/hold).", render: () => <MissedApproach /> },
  ],
  "C.3.7": [
    { id: "awo-lights", title: "Approach Lighting & PAPI", caption: "CAT I centre-line row, crossbar and PAPI on-slope indication.", render: () => <ApproachLightingPAPI /> },
    { id: "awo-rwylights", title: "Runway Lighting (Night)", caption: "Edge (white/amber), centreline (white/red), threshold green, TDZ, PAPI.", render: () => <RunwayLighting /> },
    { id: "awo-rwymarks", title: "Runway Markings", caption: "Designator, piano keys, aiming point, TDZ bars, displaced threshold.", render: () => <RunwayMarkings /> },
    { id: "awo-decldist", title: "Declared Distances", caption: "TORA, TODA (+clearway), ASDA (+stopway) and LDA.", render: () => <DeclaredDistances /> },
  ],
  // ── IR Special Operational Procedures & Hazards (C.5) — original schematics ──
  "C.5.1": [{ id: "sop-deice", title: "De-icing / Anti-icing & Holdover", caption: "Type I de-ice then Type II/III/IV anti-ice; the holdover clock and what shortens it.", render: () => <DeIcing /> }],
  "C.5.4": [{ id: "sop-microburst", title: "Microburst Windshear", caption: "Performance-increasing then -decreasing shear through a microburst on approach.", render: () => <Microburst /> }],
  "C.5.6": [{ id: "sop-hydroplane", title: "Dynamic Hydroplaning", caption: "The water wedge under the tyre and the Vp ≈ 9√(tyre psi) speed.", render: () => <Hydroplaning /> }],
  "C.5.8": [{ id: "sop-stable", title: "Stabilised-Approach Gate", caption: "The 1000 ft (IMC) / 500 ft (VMC) gate and the stable-or-go-around criteria.", render: () => <StabilisedApproach /> }],
  // ── CPL Flight Instruments (A.7) — condensed cheat-code infographics ──
  "A.7.1": [
    { id: "ins-pitot", title: "Pitot-Static & Blockages", caption: "Who reads what, and the over/under-read cheat table.", render: () => <PitotStaticLogic /> },
    { id: "ins-alt", title: "Altimeter Settings", caption: "QNH/QFE/QNE and the 'High-to-Low, look out below' rule.", render: () => <AltimeterSettings /> },
    { id: "ins-asi", title: "ASI Colour Code", caption: "White/green/yellow arcs, VNE/VYSE and the IAS→TAS chain.", render: () => <ASIColourCode /> },
    { id: "ins-vspeeds", title: "V-speeds (pictorial)", caption: "Vs0/Vs1/Vfe/Vno/Vne on the ASI arcs, plus Vx/Vy/Va/Vyse/V1-Vr-V2 off the dial.", render: () => <VSpeeds /> },
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
  "A.10.3": [
    { id: "rn-vor", title: "VOR — Phase Comparison & CDI", caption: "Reference 30 Hz FM vs variable 30 Hz AM, radial = phase difference, OBS/CDI with TO/FROM.", render: () => <VORPrinciple /> },
    { id: "rn-ils", title: "ILS Geometry & Sectors", caption: "Localiser 90/150 Hz sectors, glide path, markers (75 MHz), ROD.", render: () => <ILSGeometry /> },
  ],
  "A.10.4": [
    { id: "rn-dme", title: "DME — Distance Measuring Equipment", caption: "Secondary radar, 63 MHz offset, slant range and the range formula.", render: () => <DMEPrinciple /> },
    { id: "rn-dmearc", title: "DME Arc & Radial Intercept", caption: "Lead the turn onto the arc, hold constant DME, intercept the final radial.", render: () => <DMEArc /> },
  ],
  "A.10.5": [{ id: "rn-ssr", title: "SSR — Modes, Pulses & Squawks", caption: "A/B/C pulse spacing, 1030/1090 MHz, 7500/7600/7700.", render: () => <SSRModes /> }],
  "A.10.6": [{ id: "rn-wxradar", title: "Airborne Weather Radar", caption: "Pencil vs cosecant beam, colour intensity scale and contour.", render: () => <WeatherRadarModes /> }],
  "A.10.7": [{ id: "rn-ssr7", title: "SSR — Modes, Pulses & Squawks", caption: "A/B/C pulse spacing, 1030/1090 MHz, 7500/7600/7700, Mode S.", render: () => <SSRModes /> }],
  "A.10.8": [{ id: "rn-wxradar8", title: "Airborne Weather Radar", caption: "Pencil vs cosecant beam, colour intensity scale and contour.", render: () => <WeatherRadarModes /> }],
  "A.10.9": [{ id: "rn-radalt", title: "Radio Altimeter (FM-CW)", caption: "Frequency sweep, height from Δf, 4200–4400 MHz, 0–2500 ft.", render: () => <RadioAltimeter /> }],
  "A.10.10": [{ id: "rn-elt", title: "Emergency Locator Transmitter", caption: "121.5/243/406 MHz, downsweep tone and test rules.", render: () => <ELTCard /> }],
  "A.10.11": [
    { id: "rn-rnav", title: "Area Navigation (RNAV)", caption: "Rho-Theta waypoint, B/P-RNAV accuracy, NM-based CDI.", render: () => <RNAVWaypoint /> },
    { id: "rn-rnp", title: "PBN / RNP Lateral Containment", caption: "The ±1×RNP (95%) corridor, ±2×RNP containment and on-board alerting.", render: () => <RNPContainment /> },
  ],
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
  ],
  "A.4.6": [
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

// Additional original Meteorology figures (illustrations/gen_met2.py), appended per section.
const MET_EXTRA: [string, string, string][] = [
  ["A.8.1", "mx_layers", "Layers of the Atmosphere"],
  ["A.8.3", "mx_isobars", "Pressure Systems on a Synoptic Chart"],
  ["A.8.8", "mx_bb", "Geostrophic Wind and Buys Ballot’s Law (Southern Hemisphere)"],
  ["A.8.8", "mx_friction", "Surface Friction — Surface Wind Veers and Slows (SH)"],
  ["A.8.8", "mx_breeze", "Sea Breeze and Land Breeze"],
  ["A.8.8", "mx_katabatic", "Katabatic and Anabatic Winds"],
  ["A.8.9", "mx_lapse", "Lapse Rates and Stability"],
  ["A.8.10", "mx_lifting", "How Air Is Lifted to Form Cloud"],
  ["A.8.12", "mx_cbstages", "Thunderstorm Life Cycle"],
  ["A.8.13", "mx_icetypes", "Airframe Ice Types and Temperatures"],
  ["A.8.15", "mx_fogs", "Radiation Fog and Advection Fog"],
  ["A.8.17", "mx_coldfront", "Cold Front — Cross-Section"],
  ["A.8.17", "mx_warmfront", "Warm Front — Cross-Section"],
  ["A.8.18", "mx_trs", "Tropical Revolving Storm — Structure"],
  ["A.8.19", "mx_cells", "General Circulation — Cells and Pressure Belts"],
  ["A.8.20", "mx_shlow", "Frontal Depression in the Southern Hemisphere"],
  ["A.8.21", "mx_metar", "Decoding a METAR"],
  ["A.8.7", "mx_altim", "Altimeter Errors — High to Low, Look Out Below"],
];
for (const [sec, tag, title] of MET_EXTRA) FIGURES[sec] = [...(FIGURES[sec] ?? []), imageFigure(tag, title, title, `${tag}.png`, "met")];


// The 206 recreated Airframes & Systems illustrations (textbook-numbered) are
// shown INLINE in the study notes next to the relevant topic, not in the
// Illustrations gallery — so these helpers resolve image FigureDefs on demand.
// All ATG image figures (airframes + powerplant), each with its public subfolder.
const ATG_IMAGE_FIGURES: { section: string; topic: string; title: string; caption: string; file: string; id: string; folder: string }[] = [
  ...ATG_AIRFRAME_FIGURES.map((f) => ({ ...f, folder: "airframes" })),
  ...ATG_POWERPLANT_FIGURES,
  ...ATG_ELECTRICS_FIGURES,
  ...HP_FIGURES,
  ...INSTRUMENTS_FIGURES,
  ...FPP_FIGURES,
  ...NAV_FIGURES,
  ...AIRLAW_FIGURES,
  ...RADIONAV_FIGURES,
];

// Radio Nav figures are ORIGINAL inline SVGs (the old rn_*.png scans were mostly
// missing files and are copyrighted anyway). Resolve note figureTopics to the
// in-house components so each topic shows art in the study slides.
const RN_TOPIC_FIGS: Record<string, FigureDef[]> = {
  "Radio waves & propagation": [{ id: "rn-spectrum", title: "Radio Spectrum & Propagation", caption: "Band ranges, ground/sky/space-wave behaviour and line-of-sight.", render: () => <RadioSpectrum /> }],
  "Frequency bands": [{ id: "rn-bands", title: "Frequency Bands", caption: "VLF…EHF, wavelength and how each band travels.", render: () => <FrequencyBands /> }],
  "ADF / NDB": FIGURES["A.10.2"] ?? [],
  "VOR": [{ id: "rn-vor-t", title: "VOR — Phase & CDI", caption: "Reference vs variable phase, radial, OBS/CDI with TO/FROM.", render: () => <VORPrinciple /> }],
  "ILS": [{ id: "rn-ils-t", title: "ILS Geometry", caption: "Localiser 90/150 Hz sectors, glide path, markers.", render: () => <ILSGeometry /> }],
  "DME": FIGURES["A.10.4"] ?? [],
  "SSR": [{ id: "rn-ssr-t", title: "SSR Modes & Squawks", caption: "A/B/C/S, 1030/1090 MHz, emergency codes.", render: () => <SSRModes /> }],
  "Primary radar & SSR": [{ id: "rn-ssr-p", title: "Radar & SSR", caption: "Primary echo vs secondary interrogation.", render: () => <SSRModes /> }],
  "Weather radar": [{ id: "rn-wx-t", title: "Weather Radar", caption: "Pencil/cosecant beam, colour contour.", render: () => <WeatherRadarModes /> }],
  "Radio altimeter": FIGURES["A.10.9"] ?? [],
  "ELT": FIGURES["A.10.10"] ?? [],
  "RNAV": FIGURES["A.10.11"] ?? [],
  "GNSS / GPS": FIGURES["A.10.12"] ?? [],
};

// Night Rating — original night schematics (tagged from the NR notes by title).
FIGURES["NR1"] = [{ id: "nr-navlights", title: "Navigation & Anti-Collision Lights", caption: "Red left 110°, green right 110°, white tail 140°, and how to read another aircraft's lights.", render: () => <NavLightsSectors /> }];
FIGURES["NR3"] = [{ id: "nr-nightvision", title: "Night Vision — Rods, Cones & Dark Adaptation", caption: "Rod/cone distribution, the foveal night blind spot and the 30-minute dark-adaptation curve.", render: () => <NightVisionDiagram /> }];
FIGURES["NR4"] = [{ id: "nr-aerodrome", title: "Aerodrome Night Lighting", caption: "Runway edge/threshold/end, taxiway blue/green, stop bar, beacon and obstacle lights.", render: () => <AerodromeNightLighting /> }];

// General Radiotelephony — exam-topic plates (components/figures/grPlates.tsx).
const GR_PLATES: Record<string, FigureDef[]> = {
  GR2: [{ id: "gr-los", title: "VHF line-of-sight range", caption: "1.23 × (√h₁ + √h₂), power, terrain, ducting and scatter.", render: () => <LineOfSightPlate /> }],
  GR3: [{ id: "gr-chart", title: "Reading frequencies off a chart", caption: "Airspace and navaid boxes, limits, ATIS and restricted areas (fictional chart).", render: () => <ChartReadingPlate /> }],
  GR4: [{ id: "gr-signals", title: "Signals area & ground signals", caption: "The ten aerodrome ground signals and what they mean.", render: () => <SignalsAreaPlate /> }],
  GR5: [
    { id: "gr-phonetic", title: "Phonetic alphabet & numbers", caption: "ICAO spelling alphabet and number pronunciation.", render: () => <PhoneticAlphabetPlate /> },
    { id: "gr-readability", title: "Readability scale", caption: "Readability 1–5 and the radio check.", render: () => <ReadabilityScalePlate /> },
    { id: "gr-squawk", title: "Transponder (SSR)", caption: "7500 / 7600 / 7700 and transponder instructions.", render: () => <TransponderPlate /> },
    { id: "gr-qcodes", title: "Q-codes for bearings", caption: "QTE, QDR, QUJ and QDM on one compass, with altimeter Q-codes.", render: () => <QCodesPlate /> },
  ],
  GR7: [{ id: "gr-survivor", title: "Ground-to-air signals", caption: "Survivor signals V, X, N, Y and the arrow.", render: () => <SurvivorSignalsPlate /> }],
  GR8: [{ id: "gr-vdf", title: "VDF bearing classes", caption: "Class A ±2°, B ±5°, C ±10°, D worse than C.", render: () => <VdfClassesPlate /> }],
};
for (const [k, v] of Object.entries(GR_PLATES)) FIGURES[k] = [...(FIGURES[k] ?? []), ...v];

export function atgFiguresByTopic(topics: string[]): FigureDef[] {
  const raster = ATG_IMAGE_FIGURES
    // A tag may name a whole topic or one figure by its title.
    .filter((f) => topics.includes(f.topic) || topics.includes(f.title))
    .map((f) => imageFigure(f.id, f.title, f.caption, f.file, f.folder));
  // A tag may also name any section figure by its exact title (e.g. Night Rating reusing Met/AWO art).
  const inlineAll = [...Object.values(RN_TOPIC_FIGS).flat(), ...Object.values(FIGURES).flat()];
  const inline = [
    ...topics.flatMap((t) => RN_TOPIC_FIGS[t] ?? []),
    ...inlineAll.filter((f) => topics.includes(f.title)),
  ].filter((f, i, a) => a.findIndex((g) => g.id === f.id) === i);
  return [...inline, ...raster].filter(figurePresent);
}

export function atgFiguresForSection(sectionId: string): FigureDef[] {
  return ATG_IMAGE_FIGURES
    .filter((f) => f.section === sectionId)
    .map((f) => imageFigure(f.id, `${f.topic} — ${f.title}`, f.caption, f.file, f.folder))
    .filter(figurePresent);
}

/** The CPL section a PPL / IR section borrows its figures from (if any). */
export function mappedSection(sectionId: string): string | undefined {
  return PPL_MET_FIGURE_KEY[sectionId] ?? PPL_NAV_FIGURE_KEY[sectionId] ?? PPL_FPP_FIGURE_KEY[sectionId] ?? PPL_AGK_FIGURE_KEY[sectionId] ?? IR_MET_FIGURE_KEY[sectionId] ?? IR_AWO_FIGURE_KEY[sectionId] ?? IR_FPP_FIGURE_KEY[sectionId] ?? IR_RNV_FIGURE_KEY[sectionId] ?? IR_INS_FIGURE_KEY[sectionId] ?? IR_HPL_FIGURE_KEY[sectionId] ?? PPL_POF_FIGURE_KEY[sectionId];
}

export function figuresForSection(sectionId: string): FigureDef[] {
  if (FIGURES[sectionId]) return FIGURES[sectionId].filter(figurePresent);
  // PPL / IR subjects reuse the CPL figures via a mapping.
  const mapped = PPL_MET_FIGURE_KEY[sectionId] ?? PPL_NAV_FIGURE_KEY[sectionId] ?? PPL_FPP_FIGURE_KEY[sectionId] ?? PPL_AGK_FIGURE_KEY[sectionId] ?? IR_MET_FIGURE_KEY[sectionId] ?? IR_AWO_FIGURE_KEY[sectionId] ?? IR_FPP_FIGURE_KEY[sectionId] ?? IR_RNV_FIGURE_KEY[sectionId] ?? IR_INS_FIGURE_KEY[sectionId] ?? IR_HPL_FIGURE_KEY[sectionId] ?? PPL_POF_FIGURE_KEY[sectionId];
  return mapped ? (FIGURES[mapped] ?? []).filter(figurePresent) : [];
}
