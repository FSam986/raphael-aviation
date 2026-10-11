// Human Performance (A.6) recreated illustrations, extracted from the CPL HP
// figure library (one figure per page; blue "FIGURE X.Y" headers and captions
// cropped off). Shown INLINE in the study slide deck next to the relevant topic.
// Each figure's `topic` must match a NoteBlock heading in human-performance-notes.ts.
// Files live in /public/figures/human-performance/ as hp-NN.png (NN = source page).

export interface HPFigureMeta {
  section: string;
  topic: string;
  title: string;
  caption: string;
  file: string;
  id: string;
  folder: string;
}

const H = (section: string, topic: string, n: string, title: string): HPFigureMeta => ({
  section, topic, title, caption: topic, file: `hp-${n}.png`, id: `hpfig-${n}`, folder: "human-performance",
});

export const HP_FIGURES: HPFigureMeta[] = [
  // A.6.1 — Atmosphere & respiration (circulation, respiration)
  H("A.6.1", "Atmosphere & respiration", "05", "The heart"),
  H("A.6.1", "Atmosphere & respiration", "06", "Pulmonary & systemic circulation"),
  H("A.6.1", "Atmosphere & respiration", "07", "Blood pressure (systolic/diastolic)"),
  H("A.6.1", "Atmosphere & respiration", "08", "The sense of smell (olfactory system)"),
  H("A.6.1", "Atmosphere & respiration", "09", "The respiratory system (lungs & alveoli)"),
  // A.6.1 — Vision (eye + visual illusions)
  H("A.6.1", "Vision", "14", "Structure of the eye"),
  H("A.6.1", "Vision", "15", "Visual acuity falls away from the fovea"),
  H("A.6.1", "Vision", "16", "The empty-field / blind-spot scan"),
  H("A.6.1", "Vision", "17", "Long sight & short sight"),
  H("A.6.1", "Vision", "38", "Collision-course closure rate"),
  H("A.6.1", "Vision", "31", "False horizon (sloping cloudbank)"),
  H("A.6.1", "Vision", "32", "Approach angle & visual aiming point"),
  H("A.6.1", "Vision", "33", "Sloping-runway illusions"),
  H("A.6.1", "Vision", "36", "Aiming point vs touchdown point"),
  H("A.6.1", "Vision", "39", "Water-on-windscreen refraction illusion"),
  // A.6.1 — Hearing, balance & acceleration
  H("A.6.1", "Hearing, balance & acceleration", "10", "Structure of the ear"),
  H("A.6.1", "Hearing, balance & acceleration", "11", "The vestibular apparatus"),
  H("A.6.1", "Hearing, balance & acceleration", "12", "How the macula & semicircular canals work"),
  H("A.6.1", "Hearing, balance & acceleration", "13", "Semicircular-canal disorientation (the leans)"),
  H("A.6.1", "Hearing, balance & acceleration", "37", "Somatogravic illusion (acceleration & G)"),
  // A.6.2 — Sleep & circadian rhythm
  H("A.6.2", "Sleep & circadian rhythm", "40", "Circadian sleep pattern"),
  H("A.6.2", "Sleep & circadian rhythm", "41", "Body-temperature circadian rhythm"),
  H("A.6.2", "Sleep & circadian rhythm", "42", "Sleep stages & REM cycles"),
  H("A.6.2", "Sleep & circadian rhythm", "43", "Jet lag — westward vs eastward"),
  // A.6.2 — Stress & fatigue
  H("A.6.2", "Stress & fatigue", "19", "The stress model (demand vs ability)"),
  H("A.6.2", "Stress & fatigue", "20", "Arousal & performance (inverted-U)"),
  H("A.6.2", "Stress & fatigue", "21", "Sources of stress (stressors)"),
  // A.6.2 — Health, hygiene & intoxication
  H("A.6.2", "Health, hygiene & intoxication", "18", "The digestive system"),
  // A.6.3 — Information processing & memory
  H("A.6.3", "Information processing & memory", "24", "The information-processing model"),
  H("A.6.3", "Information processing & memory", "28", "Geometric optical illusions"),
  H("A.6.3", "Information processing & memory", "29", "Impossible figures"),
  H("A.6.3", "Information processing & memory", "25", "Expectation illusion ('BIRD IN THE THE HAND')"),
  H("A.6.3", "Information processing & memory", "49", "The basic-T instrument scan"),
  H("A.6.3", "Information processing & memory", "50", "Three-pointer altimeter — misreading"),
  H("A.6.3", "Information processing & memory", "51", "Glass-cockpit primary flight display"),
  H("A.6.3", "Information processing & memory", "52", "Pattern scanning — the odd gauge"),
  // A.6.3 — Behaviour, error & attitudes
  H("A.6.3", "Behaviour, error & attitudes", "01", "World airline accidents & fatalities"),
  H("A.6.3", "Behaviour, error & attitudes", "03", "Causes of accidents (human factors)"),
  H("A.6.3", "Behaviour, error & attitudes", "04", "The Swiss-cheese model"),
  H("A.6.3", "Behaviour, error & attitudes", "54", "Error-tolerant vs vulnerable systems"),
  H("A.6.3", "Behaviour, error & attitudes", "55", "Design-induced error (control-display)"),
  H("A.6.3", "Behaviour, error & attitudes", "26", "Maslow's hierarchy of needs"),
  H("A.6.3", "Behaviour, error & attitudes", "27", "Motivation & reward model"),
  H("A.6.3", "Behaviour, error & attitudes", "44", "Somatotypes (body types)"),
  H("A.6.3", "Behaviour, error & attitudes", "45", "Eysenck's personality dimensions"),
  // A.6.3 — Decision-making & CRM
  H("A.6.3", "Decision-making & CRM", "46", "Leadership style grid"),
  H("A.6.3", "Decision-making & CRM", "47", "Cockpit authority gradient"),
  H("A.6.3", "Decision-making & CRM", "48", "The SHELL model"),
];
