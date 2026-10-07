import { Infographic } from "@/app/components/figures/Infographic";

// Human Performance & Limitations (A.6) infographics — structured visual cheat
// sheets, one per syllabus section, built from the exam-critical facts.

export function HPPhysiology() {
  return (
    <Infographic
      title="Basic Physiology"
      tagline="Oxygen, the senses, altitude and acceleration"
      panels={[
        { heading: "Respiration & oxygen", tone: "blue", points: [
          "Air ≈ 78% N₂ / 21% O₂ / 1% other — constant to ~70 000 ft",
          "O₂ carried on haemoglobin in the RED blood cells",
          "Gas exchange across the alveoli/capillary membrane",
          "Alveolar air only ~14% O₂ (diluted by CO₂ + water vapour)",
        ]},
        { heading: "Altitude & hypoxia", tone: "red", points: [
          "TUC: ~30 min @20 000 · ~1–2 min @30 000 · ~15–20 s explosive @40 000 ft",
          "Air/O₂ mix to 33 700 ft · 100% O₂ to 40 000 ft · pressure breathing above",
          "Cabin max ~6000–8000 ft · DCS = N₂ bubbles out of solution",
          "Hyperventilation = low CO₂ (dizzy, tingling)",
        ]},
        { heading: "Vision", tone: "teal", points: [
          "Cornea focuses most · fovea = cones, sharp colour · rods = night/peripheral",
          "Blind spot = optic-nerve exit",
          "Empty-field myopia: eye relaxes to ~1–2 m — scan small & frequent",
        ]},
        { heading: "Balance & g", tone: "purple", points: [
          "Vestibular apparatus → spatial orientation",
          "Somatogravic illusion: accel = nose-UP, decel = nose-DOWN",
          "Best g-tolerance fore-and-aft · barotrauma worst on DESCENT",
        ]},
      ]}
      keyPoints={[
        "Hypoxia has NO reliable warning (euphoria masks it)",
        "Fly the instruments when disorientated — not the seat of the pants",
      ]}
      summary="Learn the TUC numbers, the oxygen ceilings and the illusion directions cold."
    />
  );
}

export function HPHealth() {
  return (
    <Infographic
      title="Health & Hygiene"
      tagline="Sleep, stress, fatigue and fitness to fly"
      panels={[
        { heading: "Sleep & circadian", tone: "blue", points: [
          "Free-running clock ≈ 25 h · re-syncs ~1–1.5 h/day · EAST is harder",
          "Slow-wave (3–4) restores BODY · REM consolidates MEMORY",
          "Cycle ~90 min · temperature trough ~0500 · alcohol cuts REM",
        ]},
        { heading: "Stress & fatigue", tone: "amber", points: [
          "Stress = PERCEIVED demand vs PERCEIVED ability",
          "GAS: alarm → resistance → exhaustion",
          "Arousal vs performance = inverted-U (both extremes bad)",
          "Only rest cures fatigue",
        ]},
        { heading: "Fitness to fly", tone: "red", points: [
          "BMI >25 overweight · >30 obese",
          "Acute gastro-enteritis = top in-flight incapacitation",
          "Diving: no fly 12 h (24 h if >30 ft) · only time clears alcohol",
          "Blood donation 24 h · bone marrow 48 h before flying",
        ]},
        { heading: "Intoxication & CO", tone: "slate", points: [
          "CO binds haemoglobin ~200× O₂ → cherry-red skin",
          "Smoking 20/day ≈ +5000–6000 ft physiological altitude",
          "Schizophrenia / manic depression = permanent denial",
        ]},
      ]}
      keyPoints={[
        "Eastward jet lag is worse than westward",
        "Stress and arousal both follow the inverted-U",
      ]}
      summary="The numbers (circadian 25 h, diving 12/24 h, BMI 25/30) are the questions."
    />
  );
}

export function HPPsychology() {
  return (
    <Infographic
      title="Basic Aviation Psychology"
      tagline="Processing, memory, error and CRM"
      panels={[
        { heading: "Memory & processing", tone: "blue", points: [
          "Iconic (visual) ~0.5–1 s · echoic (auditory) ~2–8 s",
          "Working memory 7 ± 2 · lost in ~10–20 s unless rehearsed · chunking helps",
          "LTM: episodic (events) · semantic (facts) · procedural (skills)",
          "Simple reaction time ≈ 0.2 s · saccade ≈ 0.33 s",
        ]},
        { heading: "Error & attitudes", tone: "red", points: [
          "Rasmussen: skill (slips) · rule (if–then) · knowledge (novel)",
          "5 hazardous attitudes: anti-authority, impulsivity, invulnerability, macho, resignation",
          "Confirmation bias + false mental model (resists change) → error chains",
          "Fitts & Posner skill: cognitive → associative → autonomous",
        ]},
        { heading: "Decision & CRM", tone: "green", points: [
          "Group usually beats the average individual — but risk the 'risky shift'",
          "Situational awareness = perceive + comprehend + project",
          "Synergy = team > sum of members (good CRM)",
          "Authority gradient: too steep silences juniors",
        ]},
        { heading: "Ergonomics", tone: "teal", points: [
          "Design eye position + anthropometry lay out the cockpit",
          "Colours: RED warning · AMBER caution/advisory · GREEN normal",
          "Warnings: attention-getting without startling",
        ]},
      ]}
      keyPoints={[
        "Iconic = visual, echoic = auditory — don't swap",
        "'Domination' is NOT a hazardous attitude",
      ]}
      summary="Memory durations, the 5 attitudes and the biases are examined every sitting."
    />
  );
}

export function HPFirstAidSurvival() {
  return (
    <Infographic
      title="First Aid & Survival"
      tagline="Immediate care and staying alive"
      panels={[
        { heading: "First-aid priorities", tone: "red", points: [
          "DRABC: Danger · Response · Airway · Breathing · Circulation",
          "Severe bleeding: direct pressure + elevation, treat for shock",
          "Burns: cool with water, cover loosely, don't burst blisters",
          "Shock: pale, cold, clammy, weak rapid pulse — lie down, raise legs, keep warm",
        ]},
        { heading: "Survival order", tone: "green", points: [
          "Protection (shelter/first aid) → Location (signal) → Water → Food",
          "Stay with the wreckage — easier to find",
          "Conserve energy, body heat and water",
        ]},
        { heading: "Environment", tone: "blue", points: [
          "Hypothermia: insulate, rewarm SLOWLY, no alcohol",
          "Hyperthermia/heatstroke: shade, cool, hydrate",
          "ELT: 121.5 MHz (homing) + 406 MHz (satellite)",
        ]},
      ]}
      keyPoints={[
        "Scene safety and ABC come BEFORE treating bleeding",
        "Survival priority order: Protection, Location, Water, Food",
      ]}
      summary="DRABC, the survival order and the ELT frequencies are the reliable marks."
    />
  );
}
