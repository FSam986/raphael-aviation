// CPL Human Performance — extra recall cards (A.6.1–A.6.4), written against
// hp-notes-full.ts / -b.ts. Sections are broad, so well above the 16 minimum.
import type { HPFlashcard } from "./human-performance-flashcards";

type D = HPFlashcard["difficulty"];
const n: Record<string, number> = {};
const C = (sectionId: string, front: string, back: string, difficulty: D = "medium"): HPFlashcard => {
  n[sectionId] = (n[sectionId] ?? 0) + 1;
  return { id: `HPX-${sectionId.slice(2)}-${n[sectionId]}`, sectionId, front, back, difficulty };
};

export const HP_FLASHCARDS_EXTRA: HPFlashcard[] = [
  // A.6.1
  C("A.6.1", "Boyle's law in flight?", "Trapped gas expands on the climb — doubles at 18 000 ft."),
  C("A.6.1", "Dalton's law in flight?", "O₂ partial pressure = 21 % × total pressure → falls with altitude."),
  C("A.6.1", "Henry's law in flight?", "Dissolved nitrogen comes out of solution as pressure falls → DCS."),
  C("A.6.1", "What drives breathing?", "CO₂ level in the blood (not O₂)."),
  C("A.6.1", "Four types of hypoxia?", "Hypoxic (altitude), anaemic (CO, anaemia), stagnant (circulation/G), histotoxic (alcohol/poison)."),
  C("A.6.1", "Altitude where night vision starts to degrade?", "≈ 5 000 ft."),
  C("A.6.1", "100 % O₂ sea-level equivalent ceiling?", "≈ 33 700 ft; at 40 000 ft ≈ 10 000 ft air.", "hard"),
  C("A.6.1", "TUC at 25 000 ft and 35 000 ft?", "3–5 min; 30–60 s."),
  C("A.6.1", "Four forms of DCS?", "Bends (joints), chokes (lungs), creeps (skin), staggers (neurological)."),
  C("A.6.1", "Flying after scuba diving?", "12 h (no-decompression dive); 24 h (decompression stops)."),
  C("A.6.1", "Ears block when?", "On DESCENT — Eustachian tube acts as a flap valve."),
  C("A.6.1", "Hyperventilation treatment?", "Slow the breathing; above 10 000 ft or in doubt — treat as hypoxia (100 % O₂)."),
  C("A.6.1", "Rod dark adaptation time?", "≈ 30 min (cones ≈ 7 min)."),
  C("A.6.1", "Upsloping runway illusion?", "Feel high → fly a LOW approach."),
  C("A.6.1", "Somatogravic illusion?", "Forward acceleration feels like pitch-up → pilot pushes nose down."),
  C("A.6.1", "Coriolis illusion?", "Head movement during a prolonged turn — tumbling sensation."),
  C("A.6.1", "+G grey-out / black-out / G-LOC?", "≈ 3–4 G / 4–5 G / 5–6 G."),
  C("A.6.1", "Noise damage threshold?", "≈ 85–90 dB for 8 h; NIHL starts ~4 kHz."),
  C("A.6.1", "Sunglasses for pilots?", "Neutral grey, 10–15 % transmission, not polarised."),
  // A.6.2
  C("A.6.2", "SA alcohol rule (CAR 91.02.3)?", "No alcohol < 8 h before duty; BAC ≤ 0.02 g/100 ml.", "easy"),
  C("A.6.2", "Alcohol elimination rate?", "≈ 1 unit per hour (≈ 0.015 g/100 ml/h) — can't be speeded up."),
  C("A.6.2", "Commonest cause of in-flight incapacitation?", "Gastro-intestinal upset."),
  C("A.6.2", "CO affinity for haemoglobin?", "200–250 × that of oxygen."),
  C("A.6.2", "CO in the cockpit — action?", "Heater off, fresh air on, oxygen, land."),
  C("A.6.2", "GAS stages?", "Alarm → resistance → exhaustion."),
  C("A.6.2", "Acute vs chronic stress?", "Acute: short, intense; chronic: long-term, accumulating."),
  C("A.6.2", "Window of circadian low?", "0200–0600."),
  C("A.6.2", "Which direction of jet lag is worse?", "Eastward."),
  C("A.6.2", "Natural circadian period?", "≈ 25 h; reset by zeitgebers (daylight)."),
  C("A.6.2", "Sleep cycle length?", "≈ 90 min; deep sleep early, REM later."),
  C("A.6.2", "Effect of alcohol on sleep?", "Suppresses REM, fragments later sleep."),
  C("A.6.2", "BMI formula and obese threshold?", "kg ÷ m²; > 30."),
  C("A.6.2", "Defence mechanism 'denial'?", "Refusing to accept a problem exists."),
  C("A.6.2", "IMSAFE?", "Illness, Medication, Stress, Alcohol, Fatigue, Eating/Emotion."),
  C("A.6.2", "Two-communication rule?", "No appropriate response to 2 communications → suspect incapacitation."),
  // A.6.3
  C("A.6.3", "Working memory capacity and duration?", "7 ± 2 items; 10–20 s."),
  C("A.6.3", "Chunking?", "Grouping items into meaningful units to aid memory."),
  C("A.6.3", "Three long-term memory types?", "Episodic, semantic, procedural."),
  C("A.6.3", "Habituation?", "Learned reduction in response to repeated stimuli."),
  C("A.6.3", "Confirmation bias?", "Seeking information that confirms existing beliefs."),
  C("A.6.3", "Five hazardous attitudes?", "Anti-authority, impulsivity, invulnerability, macho, resignation."),
  C("A.6.3", "Antidote to invulnerability?", "'It could happen to me.'"),
  C("A.6.3", "Rasmussen's three behaviour levels?", "Skill-, rule-, knowledge-based."),
  C("A.6.3", "Situational awareness levels (Endsley)?", "Perception, comprehension, projection."),
  C("A.6.3", "SHELL components?", "Software, Hardware, Environment, Liveware (centre) + Liveware."),
  C("A.6.3", "Reason's model?", "Active failures + latent conditions — Swiss cheese."),
  C("A.6.3", "Risky shift?", "Groups may accept more risk than individuals."),
  C("A.6.3", "Perceptual vs cognitive judgement?", "Sensing (distances, speeds) vs reasoning (options, risk)."),
  C("A.6.3", "Ideal cockpit gradient?", "Moderate — captain in command, FO able to challenge."),
  C("A.6.3", "Conflict resolution principle?", "What is right, not who is right."),
  // A.6.4
  C("A.6.4", "First-aid priorities?", "Danger, Response, Airway, Breathing, Circulation."),
  C("A.6.4", "CPR ratio and rate?", "30:2; 100–120 compressions/min, 5–6 cm deep."),
  C("A.6.4", "Fainting treatment?", "Lay flat, raise the legs."),
  C("A.6.4", "Nose bleed treatment?", "Lean forward, pinch the soft part ~10 min."),
  C("A.6.4", "Bleeding control?", "Direct pressure + elevation; tourniquet last resort."),
  C("A.6.4", "Burns treatment?", "Cool water 10–20 min, cover loosely, no creams."),
  C("A.6.4", "Shock signs?", "Pale, cold, clammy, rapid weak pulse, rapid breathing."),
  C("A.6.4", "Shock treatment?", "Treat cause, lay down, legs up, keep warm, nothing by mouth."),
  C("A.6.4", "Fracture treatment?", "Immobilise as found; splint joints above and below."),
  C("A.6.4", "Survival priorities?", "Protection, location, water, food."),
  C("A.6.4", "Rule of 3s?", "3 min air, 3 h shelter, 3 days water, 3 weeks food."),
  C("A.6.4", "When to inflate a life jacket?", "Only after leaving the aircraft."),
  C("A.6.4", "HELP position?", "Knees up, arms crossed — reduces heat loss in water."),
  C("A.6.4", "Desert water rule?", "Ration sweat, not water — rest in shade by day."),
  C("A.6.4", "Ground signal V / X?", "V: assistance; X: medical assistance."),
  C("A.6.4", "Hypothermia core temperature?", "Below 35 °C."),
  C("A.6.4", "Sea water or urine?", "Never drink either."),
  C("A.6.4", "Stay with the aircraft?", "Yes — easier to find, shelter, materials."),
];
