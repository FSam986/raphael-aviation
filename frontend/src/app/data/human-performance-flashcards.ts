// Human Performance & Limitations — flashcards. Mapped to SACAA A.6.
// A.6.1 Physiology · A.6.2 Health & Hygiene · A.6.3 Aviation Psychology ·
// A.6.4 First Aid & Survival. Front = prompt, Back = the exam-critical answer.

export interface HPFlashcard {
  id: string;
  sectionId: string;
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
}

export const HUMAN_PERFORMANCE_FLASHCARDS: HPFlashcard[] = [
  // ───────── A.6.1 Basic Physiology ─────────
  { id: "HPFC-61-01", sectionId: "A.6.1", front: "Composition of the atmosphere (constant up to ~70 000 ft)?", back: "≈78% nitrogen, 21% oxygen, 1% other gases — proportions stay constant.", difficulty: "easy" },
  { id: "HPFC-61-02", sectionId: "A.6.1", front: "How is oxygen carried in the blood?", back: "Bound to haemoglobin inside the red blood cells (oxyhaemoglobin).", difficulty: "easy" },
  { id: "HPFC-61-03", sectionId: "A.6.1", front: "Where does gas exchange happen?", back: "Across the thin membrane between the alveoli and the surrounding capillaries.", difficulty: "medium" },
  { id: "HPFC-61-04", sectionId: "A.6.1", front: "Hypoxia vs hyperventilation?", back: "Hypoxia = too little O₂ to the tissues. Hyperventilation = over-breathing washing out CO₂ (dizziness, tingling).", difficulty: "medium" },
  { id: "HPFC-61-05", sectionId: "A.6.1", front: "Time of Useful Consciousness — key values?", back: "~30 min at 20 000 ft; ~1–2 min at 30 000 ft; ~15–20 s explosive at 40 000 ft. Halved by exertion/rapid decompression.", difficulty: "hard" },
  { id: "HPFC-61-06", sectionId: "A.6.1", front: "Oxygen supply ceilings?", back: "Air/O₂ mix sufficient to ~33 700 ft; 100% O₂ to ~40 000 ft; pressure-breathing of 100% O₂ above that.", difficulty: "hard" },
  { id: "HPFC-61-07", sectionId: "A.6.1", front: "Cabin pressurisation — normal max cabin altitude?", back: "About 6000–8000 ft.", difficulty: "medium" },
  { id: "HPFC-61-08", sectionId: "A.6.1", front: "Rods vs cones?", back: "Rods: low-light/night, monochrome, peripheral. Cones: bright light, colour, concentrated in the fovea (highest acuity).", difficulty: "medium" },
  { id: "HPFC-61-09", sectionId: "A.6.1", front: "The blind spot?", back: "Where the optic nerve leaves the retina — no receptors, so no vision there.", difficulty: "easy" },
  { id: "HPFC-61-10", sectionId: "A.6.1", front: "Empty-field (dark-focus) myopia?", back: "With no outside references the relaxed eye focuses at only ~1–2 m, not infinity — misses distant traffic.", difficulty: "hard" },
  { id: "HPFC-61-11", sectionId: "A.6.1", front: "Somatogravic illusion?", back: "Acceleration feels like pitch-UP; deceleration feels like pitch-DOWN (no visual reference). Trust the instruments.", difficulty: "hard" },
  { id: "HPFC-61-12", sectionId: "A.6.1", front: "Role of the vestibular apparatus?", back: "Senses motion and head position to maintain spatial orientation (semicircular canals + otoliths).", difficulty: "medium" },
  { id: "HPFC-61-13", sectionId: "A.6.1", front: "Conductive deafness?", back: "Hearing loss from faults in the eardrum or ossicles (vs presbycusis = age, NIHL = noise).", difficulty: "medium" },
  { id: "HPFC-61-14", sectionId: "A.6.1", front: "Sinus and ear barotrauma — when worst?", back: "On the DESCENT (pressure rises; a blocked sinus/eustachian tube cannot equalise).", difficulty: "medium" },
  { id: "HPFC-61-15", sectionId: "A.6.1", front: "g-tolerance by axis?", back: "Highest short-duration tolerance (~45 g) is in the fore-and-aft axis; least in the vertical (eyeballs up/down).", difficulty: "hard" },

  // ───────── A.6.2 Health & Hygiene ─────────
  { id: "HPFC-62-01", sectionId: "A.6.2", front: "Free-running circadian period?", back: "≈25 hours (without time cues / Zeitgebers). Re-synchronises at ~1–1.5 h per day.", difficulty: "medium" },
  { id: "HPFC-62-02", sectionId: "A.6.2", front: "Slow-wave vs REM sleep?", back: "Slow-wave (stages 3–4) restores the BODY; REM consolidates learning/memory and is where dreaming occurs.", difficulty: "medium" },
  { id: "HPFC-62-03", sectionId: "A.6.2", front: "Which way is harder for jet lag?", back: "Eastward travel (shortening the day) — the body clock adjusts more slowly than westward.", difficulty: "medium" },
  { id: "HPFC-62-04", sectionId: "A.6.2", front: "General Adaptation Syndrome stages?", back: "Alarm → Resistance → Exhaustion (Selye).", difficulty: "medium" },
  { id: "HPFC-62-05", sectionId: "A.6.2", front: "Carbon monoxide danger?", back: "Haemoglobin binds CO ~200× more than O₂ → severe hypoxia. Sign: cherry-red lips/skin. Smoking 20/day ≈ +5000–6000 ft.", difficulty: "medium" },
  { id: "HPFC-62-06", sectionId: "A.6.2", front: "Diving before flying?", back: "Wait 12 h after a dive; 24 h if a depth of 30 ft was exceeded (decompression-sickness risk).", difficulty: "medium" },
  { id: "HPFC-62-07", sectionId: "A.6.2", front: "Reducing blood alcohol?", back: "Only time removes it — not coffee, food or exercise.", difficulty: "medium" },
  { id: "HPFC-62-08", sectionId: "A.6.2", front: "BMI thresholds?", back: "Over 25 = overweight; over 30 = obese. BMI = mass(kg) ÷ height(m)².", difficulty: "easy" },
  { id: "HPFC-62-09", sectionId: "A.6.2", front: "Greatest source of in-flight incapacitation?", back: "Acute gastro-enteritis.", difficulty: "medium" },
  { id: "HPFC-62-10", sectionId: "A.6.2", front: "Stress depends on…?", back: "PERCEIVED demand vs PERCEIVED ability (not the actual values).", difficulty: "hard" },
  { id: "HPFC-62-11", sectionId: "A.6.2", front: "Lowest body temperature?", back: "Early hours, around 0500 body time (circadian trough — worst performance).", difficulty: "medium" },
  { id: "HPFC-62-12", sectionId: "A.6.2", front: "Permanently disqualifying conditions?", back: "Serious psychoses — schizophrenia / manic depression.", difficulty: "medium" },
  { id: "HPFC-62-13", sectionId: "A.6.2", front: "Donating blood / bone marrow before flying?", back: "Blood: at least 24 h before next flight. Bone marrow: no flying for 48 h.", difficulty: "medium" },

  // ───────── A.6.3 Basic Aviation Psychology ─────────
  { id: "HPFC-63-01", sectionId: "A.6.3", front: "Working memory capacity & decay?", back: "7 ± 2 items (chunking expands it); lost in ~10–20 s if not rehearsed.", difficulty: "medium" },
  { id: "HPFC-63-02", sectionId: "A.6.3", front: "Sensory store durations?", back: "Iconic (visual) ~0.5–1 s; echoic (auditory) ~2–8 s.", difficulty: "medium" },
  { id: "HPFC-63-03", sectionId: "A.6.3", front: "The 5 hazardous attitudes?", back: "Anti-authority, Impulsivity, Invulnerability, Macho, Resignation. (‘Domination’ is NOT one.)", difficulty: "medium" },
  { id: "HPFC-63-04", sectionId: "A.6.3", front: "Confirmation bias?", back: "Seeking/over-weighting evidence that supports your existing belief and ignoring contradictions.", difficulty: "medium" },
  { id: "HPFC-63-05", sectionId: "A.6.3", front: "Risky shift?", back: "A group decides on MORE risk than the average individual would alone.", difficulty: "medium" },
  { id: "HPFC-63-06", sectionId: "A.6.3", front: "Arousal vs performance?", back: "Inverted-U (Yerkes–Dodson): both too-low and too-high arousal degrade performance.", difficulty: "medium" },
  { id: "HPFC-63-07", sectionId: "A.6.3", front: "Fitts & Posner skill stages?", back: "Cognitive → Associative → Autonomous (automatic).", difficulty: "medium" },
  { id: "HPFC-63-08", sectionId: "A.6.3", front: "Rasmussen's behaviour levels?", back: "Skill-based (automatic slips), Rule-based (if–then from LTM), Knowledge-based (novel problem-solving).", difficulty: "hard" },
  { id: "HPFC-63-09", sectionId: "A.6.3", front: "Situational awareness?", back: "Continuously perceiving, comprehending and projecting the situation — maintained by actively updating the mental model.", difficulty: "medium" },
  { id: "HPFC-63-10", sectionId: "A.6.3", front: "Simple reaction time?", back: "About 0.2 s for a simple response; a saccade (eye jump + fixation) ≈ 0.33 s.", difficulty: "medium" },
  { id: "HPFC-63-11", sectionId: "A.6.3", front: "Cockpit colour conventions?", back: "Red = warning, amber/yellow = caution/advisory, green = normal.", difficulty: "easy" },
  { id: "HPFC-63-12", sectionId: "A.6.3", front: "Synergy?", back: "Group performance exceeding the sum of individuals — the goal of good CRM.", difficulty: "medium" },
  { id: "HPFC-63-13", sectionId: "A.6.3", front: "Authority gradient?", back: "People comply more with higher perceived status; too steep a gradient stops juniors speaking up.", difficulty: "medium" },
  { id: "HPFC-63-14", sectionId: "A.6.3", front: "Anthropometry?", back: "The measurement of the human body — used with the design eye position to lay out the cockpit (ergonomics).", difficulty: "easy" },

  // ───────── A.6.4 First Aid & Survival ─────────
  { id: "HPFC-64-01", sectionId: "A.6.4", front: "Priorities of first aid (DRABC)?", back: "Danger, Response, Airway, Breathing, Circulation — make the scene safe, then ABC.", difficulty: "medium" },
  { id: "HPFC-64-02", sectionId: "A.6.4", front: "Severe bleeding — action?", back: "Direct pressure and elevation; treat for shock (keep warm, lie down, reassure).", difficulty: "medium" },
  { id: "HPFC-64-03", sectionId: "A.6.4", front: "Burns — immediate treatment?", back: "Cool with water, do not remove stuck clothing, cover loosely; never burst blisters.", difficulty: "medium" },
  { id: "HPFC-64-04", sectionId: "A.6.4", front: "Shock — signs?", back: "Pale, cold, clammy skin; rapid weak pulse; faintness. Lay down, raise legs, keep warm.", difficulty: "medium" },
  { id: "HPFC-64-05", sectionId: "A.6.4", front: "Survival priorities?", back: "Protection (shelter/first aid), Location (signals/ELT), Water, Food — in that order.", difficulty: "medium" },
  { id: "HPFC-64-06", sectionId: "A.6.4", front: "Hypothermia vs hyperthermia?", back: "Hypothermia = dangerous cooling (shelter, insulate, warm slowly). Hyperthermia/heatstroke = overheating (shade, cool, hydrate).", difficulty: "medium" },
  { id: "HPFC-64-07", sectionId: "A.6.4", front: "ELT frequencies?", back: "121.5 MHz (homing) and 406 MHz (satellite — Cospas-Sarsat).", difficulty: "easy" },
];

export function getHumanPerformanceFlashcardsBySection(sectionId: string): HPFlashcard[] {
  return HUMAN_PERFORMANCE_FLASHCARDS.filter((x) => x.sectionId === sectionId);
}
