// IR Special Operational Procedures & Hazards (C.5.x) flashcards. Comprehensive
// per-section recall cards. Shape matches AirLawFlashcard.

import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

const c = (id: string, sectionId: string, front: string, back: string, difficulty: "easy" | "medium" | "hard" = "medium"): AirLawFlashcard => ({ id, sectionId, front, back, difficulty });

export const IR_SPECPROC_FLASHCARDS: AirLawFlashcard[] = [
  // C.5.1 Ground de-icing
  c("IRSPF-C51-1", "C.5.1", "De-icing vs anti-icing fluid?", "De-icing (Type I, heated, thin) removes existing contamination. Anti-icing (Type II/III/IV, thicker) prevents further build-up for a protected period.", "medium"),
  c("IRSPF-C51-2", "C.5.1", "What is holdover time (HOT)?", "The estimated time anti-ice fluid protects the surface from re-freezing; it starts at the beginning of the final fluid application and depends on fluid type, OAT and precipitation.", "medium"),
  c("IRSPF-C51-3", "C.5.1", "Clean-aircraft concept?", "Take-off is prohibited with frost/ice/snow adhering to critical surfaces — even thin roughness sharply reduces lift and increases stall speed.", "medium"),
  c("IRSPF-C51-4", "C.5.1", "Effect of upper-surface contamination?", "Disturbs airflow → less lift, more drag, higher stall speed and possible pitch/roll control issues at rotation.", "hard"),
  // C.5.2 Bird strike
  c("IRSPF-C52-1", "C.5.2", "When/where is bird-strike risk highest?", "Low level near aerodromes, dawn and dusk, and during migration seasons — mostly below 500 ft on take-off and approach.", "easy"),
  c("IRSPF-C52-2", "C.5.2", "Avoidance actions for reported bird activity?", "Delay/adjust departure, use lights, climb briskly through the risk band, avoid known concentrations; report activity to ATC.", "medium"),
  c("IRSPF-C52-3", "C.5.2", "If a strike/ingestion occurs?", "Expect possible engine damage/vibration — handle as an engine problem, consider a precautionary approach, and report the strike.", "medium"),
  // C.5.3 Fire & smoke
  c("IRSPF-C53-1", "C.5.3", "Fire triangle & how extinguishers work?", "Heat + fuel + oxygen. Agents remove one side: CO₂/Halon smother oxygen/interrupt the reaction; water cools.", "medium"),
  c("IRSPF-C53-2", "C.5.3", "Classes of fire and correct agents?", "Class A (solids) water; Class B (flammable liquids) foam/CO₂/Halon; Class C (electrical) CO₂/Halon (non-conductive) — never water on electrical.", "hard"),
  c("IRSPF-C53-3", "C.5.3", "Cabin/cockpit smoke priorities?", "Oxygen masks + smoke goggles, establish communication, isolate the source (electrical load-shed), ventilate, and land as soon as possible.", "medium"),
  c("IRSPF-C53-4", "C.5.3", "Overheated brakes after a rejected take-off?", "Risk of fire/tyre-plug melt — approach from the front/rear (not the sides), allow to cool, use the fire service; avoid taxiing on hot brakes.", "medium"),
  // C.5.4 Windshear & microburst
  c("IRSPF-C54-1", "C.5.4", "What is a microburst?", "A concentrated downdraught (often >60 kt, <4 km wide, <5 min) that spreads out at the surface — a strong headwind→downdraught→tailwind sequence on the approach.", "hard"),
  c("IRSPF-C54-2", "C.5.4", "Recognising windshear on approach?", "Rapid IAS change, unexpected sink/deviation from the glide path, large power/attitude changes needed to hold profile.", "medium"),
  c("IRSPF-C54-3", "C.5.4", "Windshear escape actions?", "Apply maximum available thrust, pitch to the escape attitude (follow FD/stick-shaker), keep gear/flap as set, and do not chase airspeed — go around.", "hard"),
  c("IRSPF-C54-4", "C.5.4", "Effect of a decreasing headwind (increasing tailwind)?", "Loss of IAS and lift → aircraft sinks below the profile; the classic microburst exit that causes undershoot.", "medium"),
  // C.5.5 Wake turbulence
  c("IRSPF-C55-1", "C.5.5", "What creates wake vortices and when are they strongest?", "Wingtip pressure difference makes counter-rotating vortices; strongest when the generator is HEAVY, CLEAN and SLOW.", "medium"),
  c("IRSPF-C55-2", "C.5.5", "Vortex behaviour?", "They sink ~500–1000 ft below the flight path and drift with the wind; a light crosswind can hold one over the runway.", "medium"),
  c("IRSPF-C55-3", "C.5.5", "Avoidance on approach and departure?", "Stay above/upwind of the heavier aircraft's path; land beyond its touchdown point and rotate before its rotation point.", "hard"),
  c("IRSPF-C55-4", "C.5.5", "Wake separation (behind a heavy)?", "Radar separation increases as your category gets lighter (e.g. light behind heavy ≈ 6 NM) — the greatest hazard is a light aircraft behind a heavy.", "medium"),
  // C.5.6 Contaminated runways
  c("IRSPF-C56-1", "C.5.6", "What is a contaminated runway?", "More than 25% of the assessed area covered by water/slush/snow/ice; it degrades braking (lower friction) and can add displacement/impingement drag.", "medium"),
  c("IRSPF-C56-2", "C.5.6", "Types of hydroplaning?", "Dynamic (water lifts the tyre), viscous (thin film on a smooth surface), and reverted-rubber (locked wheel + steam). Dynamic speed ≈ 9√(tyre psi) kt.", "hard"),
  c("IRSPF-C56-3", "C.5.6", "Performance effect of contamination?", "Longer take-off (impingement drag delays acceleration) and much longer landing/stop distances; consider reduced V-speeds and crosswind limits.", "medium"),
  c("IRSPF-C56-4", "C.5.6", "Reducing hydroplaning risk?", "Firm touchdown, avoid locked wheels, use grooved/textured runways where available, and respect the aquaplaning speed.", "medium"),
  // C.5.7 CFIT
  c("IRSPF-C57-1", "C.5.7", "What is CFIT?", "Controlled Flight Into Terrain — an airworthy aircraft under control is inadvertently flown into terrain/water/obstacles, usually with the crew unaware.", "easy"),
  c("IRSPF-C57-2", "C.5.7", "Main CFIT defences?", "Situational awareness, minimum safe altitudes (MSA/MEA/MOCA), respecting the approach profile, GPWS/TAWS, and never descending below minima without the required visual references.", "medium"),
  c("IRSPF-C57-3", "C.5.7", "GPWS/TAWS response?", "Treat a 'PULL UP' warning as real: maximum thrust, wings level, pitch up to the stick-shaker/escape attitude, and climb until clear.", "medium"),
  // C.5.8 Stabilised approach
  c("IRSPF-C58-1", "C.5.8", "Stabilised-approach requirements?", "By a gate (≈1000 ft IMC / 500 ft VMC): on profile, on speed (within limits), landing configuration, correct power, and briefed — otherwise go around.", "medium"),
  c("IRSPF-C58-2", "C.5.8", "Why fly a stabilised approach?", "It reduces CFIT/runway-excursion risk, gives consistent performance, and makes any deviation obvious early enough to correct or go around.", "medium"),
];

export function getIRSpecProcFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return IR_SPECPROC_FLASHCARDS.filter((f) => f.sectionId === sectionId);
}
