// Human Performance & Limitations — study notes, one per SACAA A.6 section.
// Distilled from CAE Oxford ATPL Book 8 and the SACAA A.6 syllabus.

export interface NoteBlock {
  heading: string;
  points: string[];
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
  "A.6.1": {
    sectionId: "A.6.1",
    title: "Basic Physiology",
    intro: "How the body supplies oxygen, senses the world and copes with altitude and acceleration — the physical limits a pilot must respect.",
    blocks: [
      { heading: "Atmosphere & respiration", points: [
        "Air ≈ 78% N₂, 21% O₂, 1% other — constant proportions up to ~70 000 ft.",
        "Oxygen is used to oxidise food for energy; carried on haemoglobin in the red blood cells.",
        "Gas exchange occurs across the alveoli/capillary membrane; the nose filters, warms and humidifies incoming air.",
        "Alveolar air is diluted by CO₂ and water vapour — only ~14% O₂ vs 21% outside.",
      ]},
      { heading: "Altitude & hypoxia", points: [
        "Hypoxia = insufficient O₂ to the tissues; insidious, euphoric, no reliable warning.",
        "Time of Useful Consciousness: ~30 min at 20 000 ft, ~1–2 min at 30 000 ft, ~15–20 s explosive at 40 000 ft — halved by exertion.",
        "Oxygen cover: air/O₂ mix to ~33 700 ft, 100% O₂ to ~40 000 ft, pressure breathing above.",
        "Cabin pressurised to a max cabin altitude of ~6000–8000 ft; decompression sickness = N₂ bubbles out of solution.",
        "Hyperventilation blows off CO₂ → dizziness, tingling; cure by slowing breathing / rebreathing.",
      ]},
      { heading: "Vision", points: [
        "Cornea does most focusing; lens accommodates; fovea (cones) = sharpest, central, colour vision.",
        "Rods = low-light, peripheral, monochrome; the blind spot is the optic-nerve exit.",
        "Empty-field myopia: eye relaxes to ~1–2 m without references — scan with small, frequent eye movements.",
        "Night vision: use off-centre viewing; takes ~30 min to adapt; destroyed quickly by bright light.",
      ]},
      { heading: "Hearing, balance & acceleration", points: [
        "Ossicles pass eardrum vibration to the cochlear fluid; conductive deafness = eardrum/ossicle fault.",
        "Vestibular apparatus (semicircular canals + otoliths) senses motion/attitude → spatial orientation.",
        "Somatogravic illusion: acceleration feels nose-up, deceleration nose-down — fly the instruments.",
        "Highest g-tolerance is fore-and-aft; sinus/ear barotrauma is worst on the descent.",
      ]},
    ],
    mustKnow: [
      "TUC figures (20 000 / 30 000 / 40 000 ft) and the oxygen-cover ceilings.",
      "Oxygen is carried on haemoglobin in red blood cells.",
      "Somatogravic illusion directions; vestibular vs visual orientation.",
      "Barotrauma (sinus/ear) is worst on descent.",
    ],
    traps: [
      "Hot/high reasoning aside — hypoxia gives NO reliable warning (euphoria masks it).",
      "Rods are for night/peripheral, NOT the fovea; the fovea is all cones.",
      "The eye does NOT relax to infinity with no references — it focuses close (empty-field myopia).",
    ],
  },
  "A.6.2": {
    sectionId: "A.6.2",
    title: "Health & Hygiene",
    intro: "Fitness to fly: sleep and circadian rhythm, stress and fatigue, and the health/lifestyle factors that ground a pilot.",
    blocks: [
      { heading: "Sleep & circadian rhythm", points: [
        "Free-running body clock ≈ 25 h; re-synchronises at ~1–1.5 h per day; eastward travel is harder.",
        "Slow-wave sleep (stages 3–4) restores the body; REM consolidates memory and is where dreaming occurs.",
        "Sleep cycles ~90 min; slow-wave dominates early, REM lengthens later; REM-rebound after deprivation.",
        "Body temperature (and performance) troughs ~0500; alcohol suppresses REM.",
      ]},
      { heading: "Stress & fatigue", points: [
        "Stress depends on PERCEIVED demand vs PERCEIVED ability; a normal, adaptive response (manage, don't eliminate).",
        "General Adaptation Syndrome: alarm → resistance → exhaustion.",
        "Arousal vs performance is an inverted-U — both extremes degrade performance.",
        "Fatigue (acute/chronic) degrades attention, memory and decision-making; only rest cures it.",
      ]},
      { heading: "Health, hygiene & intoxication", points: [
        "BMI > 25 overweight, > 30 obese; acute gastro-enteritis is the top cause of in-flight incapacitation.",
        "Carbon monoxide binds haemoglobin ~200× more than O₂ (cherry-red skin); smoking 20/day ≈ +5000–6000 ft.",
        "Only time clears blood alcohol; no flying 12 h after a dive (24 h if >30 ft).",
        "Blood donation: ≥24 h before next flight; bone-marrow donation: no flying 48 h.",
      ]},
    ],
    mustKnow: [
      "Circadian period ≈ 25 h; eastward jet lag is worse; temperature trough ~0500.",
      "Slow-wave restores body, REM consolidates memory.",
      "Stress = perceived demand vs perceived ability; inverted-U with arousal.",
      "Diving/flying 12 h or 24 h rule; blood 24 h, bone marrow 48 h.",
    ],
    traps: [
      "Coffee/food/exercise do NOT speed alcohol clearance — only time does.",
      "Stress is driven by PERCEPTION, not the actual demand/ability.",
      "Alcohol gives LESS REM (poorer sleep), not more.",
    ],
  },
  "A.6.3": {
    sectionId: "A.6.3",
    title: "Basic Aviation Psychology",
    intro: "Information processing, memory, error, decision-making and crew resource management — how the mind performs and fails in the cockpit.",
    blocks: [
      { heading: "Information processing & memory", points: [
        "Sensory stores: iconic (visual) ~0.5–1 s, echoic (auditory) ~2–8 s.",
        "Working memory holds 7 ± 2 items, lost in ~10–20 s without rehearsal; chunking expands it.",
        "Long-term memory: episodic (events), semantic (facts), procedural (skills/motor programmes).",
        "Attention is needed because processing capacity is limited; simple reaction time ≈ 0.2 s.",
      ]},
      { heading: "Behaviour, error & attitudes", points: [
        "Rasmussen: skill-based (automatic slips), rule-based (if–then), knowledge-based (novel).",
        "Fitts & Posner skill stages: cognitive → associative → autonomous.",
        "5 hazardous attitudes: anti-authority, impulsivity, invulnerability, macho, resignation.",
        "SHELL model (Software, Hardware, Environment, Liveware–Liveware) frames human-factors mismatches.",
        "Confirmation bias and false mental models (resistant to change) cause error chains.",
      ]},
      { heading: "Decision-making & CRM", points: [
        "Group decisions usually beat the average individual, but risk the 'risky shift'.",
        "Situational awareness = perceive + comprehend + project; maintained by updating the mental model.",
        "CRM: communication, leadership, workload management; synergy = team > sum of members.",
        "Ergonomics: design eye position + anthropometry; red=warning, amber=caution, green=normal.",
      ]},
    ],
    mustKnow: [
      "Memory stores and durations (iconic/echoic/working 7±2/10–20 s).",
      "The 5 hazardous attitudes; Rasmussen's three behaviour levels.",
      "Risky shift; confirmation bias; situational awareness definition.",
      "Cockpit colour conventions and the design eye position.",
    ],
    traps: [
      "Iconic = visual (~0.5–1 s); echoic = auditory (~2–8 s) — don't swap them.",
      "'Domination' is NOT one of the five hazardous attitudes.",
      "A false mental model is dangerous because it RESISTS change, not because it's rare.",
    ],
  },
  "A.6.4": {
    sectionId: "A.6.4",
    title: "First Aid & Survival",
    intro: "Immediate care after an accident and staying alive afterwards — the priorities, the common injuries and the survival order.",
    blocks: [
      { heading: "First aid priorities", points: [
        "DRABC: Danger, Response, Airway, Breathing, Circulation — make the scene safe first.",
        "Severe bleeding: direct pressure + elevation; treat for shock (lie down, raise legs, keep warm, reassure).",
        "Burns: cool with water, cover loosely, don't remove stuck clothing or burst blisters.",
        "Shock signs: pale, cold, clammy skin, rapid weak pulse, faintness.",
      ]},
      { heading: "Survival", points: [
        "Survival priorities: Protection (shelter/first aid) → Location (signal/ELT) → Water → Food.",
        "ELT transmits on 121.5 MHz (homing) and 406 MHz (satellite).",
        "Hypothermia: insulate and rewarm slowly; hyperthermia/heatstroke: shade, cool and hydrate.",
        "Stay with the wreckage (easier to find); conserve energy and body heat/water.",
      ]},
    ],
    mustKnow: [
      "DRABC order of first aid.",
      "Treatment for severe bleeding, burns and shock.",
      "Survival order: Protection, Location, Water, Food.",
      "ELT frequencies 121.5 / 406 MHz.",
    ],
    traps: [
      "Deal with Danger and Airway BEFORE bleeding — scene safety and ABC come first.",
      "Rewarm a hypothermic casualty SLOWLY; don't give alcohol.",
      "Leaving the wreckage usually makes you harder to find — stay put unless there's a clear reason.",
    ],
  },
};

export function getHumanPerformanceNote(sectionId: string): SectionNote | undefined {
  return NOTES[sectionId];
}
