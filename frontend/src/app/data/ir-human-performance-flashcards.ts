// IR Human Performance & Limitations (H.x) flashcards. Comprehensive per-section
// recall cards. Shape matches AirLawFlashcard.

import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

const c = (id: string, sectionId: string, front: string, back: string, difficulty: "easy" | "medium" | "hard" = "medium"): AirLawFlashcard => ({ id, sectionId, front, back, difficulty });

export const IR_HUMANPERF_FLASHCARDS: AirLawFlashcard[] = [
  // H.1 Man & the sensory system
  c("IRHPF-H1-1", "H.1", "The five senses used in flight and the key point?", "Sight, hearing, balance (vestibular), touch/pressure (seat-of-the-pants) and kinaesthesia. In IMC only the INSTRUMENTS are reliable — the body's cues mislead.", "easy"),
  c("IRHPF-H1-2", "H.1", "Why trust instruments over sensation in IMC?", "Without external visual references the vestibular and postural senses give false attitude/motion cues (illusions) — believe the instruments, not your body.", "medium"),
  c("IRHPF-H1-3", "H.1", "Sensory threshold and habituation?", "A stimulus must exceed a threshold to be sensed; constant stimuli fade (adaptation), so slow changes (a gentle bank) can go unnoticed.", "medium"),
  // H.2 Nervous system
  c("IRHPF-H2-1", "H.2", "Divisions of the nervous system?", "Central (brain + spinal cord) and peripheral; the peripheral includes the somatic (voluntary) and autonomic (involuntary) systems.", "medium"),
  c("IRHPF-H2-2", "H.2", "Sympathetic vs parasympathetic (autonomic)?", "Sympathetic = 'fight or flight' (raises heart rate, dilates pupils). Parasympathetic = 'rest and digest' (calms the body). Stress tips the balance sympathetic.", "medium"),
  c("IRHPF-H2-3", "H.2", "Sensory adaptation example in flight?", "Prolonged noise or a steady acceleration is 'tuned out' — dangerous because a gradually developing situation may not register.", "medium"),
  // H.3 Vision
  c("IRHPF-H3-1", "H.3", "Rods vs cones?", "Cones (fovea/centre) give sharp, colour, day vision. Rods (periphery) give low-light/night vision but no colour and are absent at the fovea — hence the night blind spot.", "hard"),
  c("IRHPF-H3-2", "H.3", "Night-vision techniques?", "Allow ~30 min for dark adaptation, avoid bright light, use off-centre (scanning) viewing so the image falls on the rods, and use red/low cockpit lighting.", "medium"),
  c("IRHPF-H3-3", "H.3", "The blind spot and empty-field myopia?", "The optic-disc blind spot has no receptors; with nothing to focus on the eye relaxes to ~1–2 m (empty-field myopia) — deliberately focus on distant objects when scanning.", "hard"),
  c("IRHPF-H3-4", "H.3", "Depth perception cues?", "Binocular (two-eye) cues work close in; at distance the pilot relies on monocular cues — relative size, motion parallax, overlap, texture — which visual illusions can distort.", "medium"),
  // H.4 Hearing
  c("IRHPF-H4-1", "H.4", "Parts of the ear and their roles?", "Outer (collects sound), middle (ossicles amplify, Eustachian tube equalises pressure), inner (cochlea = hearing, vestibular apparatus = balance).", "medium"),
  c("IRHPF-H4-2", "H.4", "Semi-circular canals sense what?", "Angular acceleration (rotation) in three planes; they cannot sense a sustained constant rate, so a prolonged turn feels like level flight — the leans.", "hard"),
  c("IRHPF-H4-3", "H.4", "Otolith organs sense what?", "Linear acceleration and gravity — a forward acceleration can feel like a nose-up pitch (the somatogravic illusion).", "hard"),
  c("IRHPF-H4-4", "H.4", "Barotrauma / ear block?", "Blocked Eustachian tube (e.g. a cold) prevents pressure equalisation on descent → pain and hearing loss; avoid flying with congestion.", "medium"),
  // H.5 Integration & illusions
  c("IRHPF-H5-1", "H.5", "What is spatial disorientation?", "A false perception of the aircraft's attitude, position or motion, caused by misleading vestibular/visual cues — most dangerous in IMC or at night.", "medium"),
  c("IRHPF-H5-2", "H.5", "The leans?", "After a slow roll goes unnoticed, rolling back to level feels like a bank the other way — the commonest vestibular illusion. Trust the AI.", "medium"),
  c("IRHPF-H5-3", "H.5", "Somatogravic illusion?", "A rapid acceleration (e.g. go-around/take-off in IMC) feels like a steep nose-up pitch → temptation to push over. Believe the attitude indicator.", "hard"),
  c("IRHPF-H5-4", "H.5", "Coriolis illusion?", "Moving the head during a turn stimulates another canal → a violent tumbling sensation; avoid sudden head movements in IMC turns.", "hard"),
  c("IRHPF-H5-5", "H.5", "Preventing disorientation?", "Maintain an instrument scan, avoid abrupt head movements, believe the instruments over sensation, and recover to level flight if disoriented.", "medium"),
];

export function getIRHumanPerfFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return IR_HUMANPERF_FLASHCARDS.filter((f) => f.sectionId === sectionId);
}
