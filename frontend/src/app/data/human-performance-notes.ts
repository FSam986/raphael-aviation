// Human Performance & Limitations — study notes, one per SACAA A.6 section.
// TEXTBOOK DEPTH: teaching prose authored in-house from standard aviation
// human-factors theory (scope per SA-CATS 61 Appendix 2.0A A.6). No textbook
// text or figures reproduced. figureTopics resolve to the A.6 inline SVGs.

export interface NoteBlock {
  heading: string;
  points: string[];
  figureTopics?: string[];
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
    intro:
      "A pilot's body is the first aircraft system, and it has hard physical limits that no amount of skill can override. This section is about how the body gets oxygen to its cells, how the senses build a picture of the outside world, and how altitude and acceleration attack both of those processes. The recurring theme is that the most dangerous threats — hypoxia, spatial disorientation, pressure effects — give little or no honest warning, so you survive them by knowing the numbers and respecting the limits in advance, not by feeling your way.",
    blocks: [
      { heading: "The atmosphere & respiration", figureTopics: ["Atmosphere & respiration"], points: [
        "The air is a remarkably constant mixture up to about 70 000 ft — roughly 78% nitrogen, 21% oxygen and 1% other gases — so the PROPORTION of oxygen does not change with height. What changes is the total pressure: as you climb, the partial pressure of oxygen falls, and it is that pressure, not the percentage, that drives oxygen across into the blood.",
        "Breathing supplies oxygen so the body can oxidise food (mainly glucose) to release energy, producing carbon dioxide and water as waste. Oxygen is carried through the bloodstream chemically bound to haemoglobin in the red blood cells; only a tiny fraction dissolves directly in the plasma, which is why anything that spoils haemoglobin (such as carbon monoxide) is so dangerous.",
        "Gas exchange happens in the lungs across the thin membrane between the alveoli (millions of tiny air sacs) and the surrounding capillaries: oxygen diffuses in, carbon dioxide diffuses out, always from higher to lower partial pressure. The nose and upper airway filter, warm and humidify the incoming air before it reaches the delicate alveoli.",
        "The air actually reaching the alveoli is already diluted by carbon dioxide and water vapour, so alveolar air is only about 14% oxygen rather than the 21% outside — a reminder that the body is working with a smaller margin than the raw atmospheric figure suggests, and that margin shrinks fast with altitude.",
      ]},
      { heading: "Altitude, hypoxia & pressure effects", points: [
        "Hypoxia is simply too little oxygen reaching the tissues. The insidious danger is its onset: it is painless, often euphoric, and degrades judgement and vision before the sufferer notices anything wrong — so a pilot can feel fine while making fatal errors. There is no reliable personal warning, which is exactly why oxygen discipline is procedural.",
        "Time of Useful Consciousness (TUC) is the usable time between losing an adequate oxygen supply and being unable to act sensibly. Typical seated figures: around 30 minutes at 20 000 ft, only 1–2 minutes at 30 000 ft, and 15–20 seconds ('explosive' type) at 40 000 ft. Exertion, cold, illness and smoking all shorten it, roughly halving it with activity.",
        "Supplemental oxygen schedule: an air/oxygen mix maintains a sea-level equivalent up to about 33 700 ft; 100% oxygen is needed up to about 40 000 ft; above that even pure oxygen is insufficient and pressure breathing or a pressurised cabin is required. Cabins are pressurised to keep the cabin altitude down to roughly 6000–8000 ft.",
        "Rapid or explosive decompression drops the cabin pressure suddenly — don the oxygen mask immediately, because TUC is set by the new (high) altitude. Decompression sickness occurs when reduced pressure lets nitrogen come out of solution as bubbles (the 'bends'), the same mechanism as in diving, which is why diving and flying must be separated in time.",
        "Hyperventilation (over-breathing, often from stress) blows off too much carbon dioxide, causing dizziness, tingling in the fingers and lips, and eventually fainting. Because its symptoms overlap with hypoxia, treat for hypoxia first if oxygen is available; the specific cure is to slow the breathing down (talking, or rebreathing) to restore the carbon dioxide level.",
      ]},
      { heading: "Vision", figureTopics: ["Vision"], points: [
        "The eye works like a camera: the cornea does most of the focusing, the lens fine-tunes it by changing shape (accommodation), and the image falls on the retina. The fovea, a small central pit packed with cones, gives the sharpest, colour, daylight vision — which is why you point your eyes straight at anything you want to study in detail.",
        "Cones (colour, detail, bright light) are concentrated at the fovea; rods (monochrome, low light, motion) dominate the periphery. The blind spot is where the optic nerve leaves the eye and has no receptors at all; normally the brain fills it in, but it can hide a converging aircraft in a steady gaze.",
        "Empty-field (or empty-visual-field) myopia: with nothing to focus on — haze, cloud, clear sky at altitude — the relaxed eye does NOT focus to infinity but settles at only 1–2 metres, so distant traffic is blurred and missed. Defeat it by deliberately scanning in small, frequent steps and refocusing on a wingtip or ground feature.",
        "Night vision depends on the rods, which are most sensitive just off-centre, so look slightly to one side of a faint object to see it. Full dark adaptation takes about 30 minutes and is destroyed in seconds by a bright light, so protect it and avoid staring at bright sources before and during night flight.",
      ]},
      { heading: "Hearing, balance & acceleration", figureTopics: ["Hearing, balance & acceleration"], points: [
        "Sound passes the eardrum to three small bones (ossicles) that pass the vibration to the fluid of the cochlea, where it becomes nerve signals. A fault in the eardrum or ossicles gives conductive deafness; damage to the inner ear or nerve (including noise-induced loss) gives sensorineural deafness, which is permanent — hence ear protection.",
        "Balance and the sense of motion come from the vestibular apparatus of the inner ear: the three semicircular canals detect angular (rotational) acceleration, and the otolith organs detect linear acceleration and the pull of gravity. These give good orientation on the ground but are easily fooled in flight.",
        "The somatogravic illusion is the classic trap: a strong forward acceleration (e.g. applying take-off power, especially at night or in cloud) is felt as a nose-up pitch, tempting the pilot to push down toward the ground; deceleration feels nose-down. The cure is always to believe and fly the instruments, not the seat of the pants.",
        "The body tolerates acceleration best in the fore-and-aft (eyeballs-in/out) axis and worst vertically (grey-out/black-out under +g, red-out under −g). Pressure changes in the sinuses and middle ear cause pain (barotrauma), worst on the DESCENT when pressure is rising and the Eustachian tube may not clear — avoid flying with a heavy cold.",
      ]},
    ],
    mustKnow: [
      "TUC: ~30 min @ 20 000 ft, 1–2 min @ 30 000 ft, 15–20 s @ 40 000 ft (halved by exertion).",
      "Oxygen cover: mix to ~33 700 ft, 100% O₂ to ~40 000 ft, pressure breathing above.",
      "Oxygen is carried chemically on haemoglobin; it is partial PRESSURE, not percentage, that matters.",
      "Somatogravic illusion: acceleration feels nose-up — fly the instruments. Barotrauma worst on descent.",
    ],
    traps: [
      "Hypoxia gives NO reliable warning — euphoria and normal feelings mask dangerous impairment.",
      "The fovea is ALL cones (day/detail); rods are peripheral/night — don't swap them.",
      "With no references the eye focuses CLOSE (~1–2 m), not to infinity (empty-field myopia).",
    ],
  },
  "A.6.2": {
    sectionId: "A.6.2",
    title: "Health & Hygiene",
    intro:
      "A licence and a current medical say you are fit to fly in general; this section is about the day-to-day decisions that decide whether you are fit to fly TODAY. Sleep and the body clock, stress and fatigue, illness, drugs, alcohol and simple hygiene all move a pilot's performance up and down far more than most realise, and the law leaves the daily judgement to the pilot. The aim is to recognise the states that quietly degrade performance and to apply the hard rules (alcohol, diving, donation) that exist because judgement itself is one of the first things to go.",
    blocks: [
      { heading: "Sleep & circadian rhythm", figureTopics: ["Sleep & circadian rhythm"], points: [
        "The body runs on an internal 'circadian' clock with a natural free-running period of about 25 hours, normally reset each day by daylight and routine. When time zones shift suddenly it can only re-synchronise at roughly 1–1.5 hours per day, so jet lag persists for days; EASTWARD travel (shortening the day) is harder to adapt to than westward.",
        "Sleep is not uniform. Slow-wave sleep (the deep stages 3–4) chiefly restores the BODY and is most abundant early in the night; REM sleep, when most dreaming occurs, consolidates MEMORY and learning and lengthens toward morning. After deprivation the body shows 'REM rebound', taking back the lost REM.",
        "Sleep runs in cycles of about 90 minutes. Being woken from deep slow-wave sleep leaves heavy grogginess (sleep inertia), which matters for standby and napping strategy. Body temperature and alertness follow the circadian curve and reach their LOWEST around 0400–0500 — the window of worst performance and most errors.",
        "Alcohol is a false friend for sleep: it may speed sleep onset but it SUPPRESSES REM and fragments the night, so sleep is less restorative. Stimulants, heavy meals and screens before bed similarly degrade sleep quality.",
      ]},
      { heading: "Stress & fatigue", figureTopics: ["Stress & fatigue"], points: [
        "Stress is the response to a demand, and crucially it depends on PERCEIVED demand measured against PERCEIVED ability, not on the objective situation — two pilots in the same cockpit can feel very different stress. A moderate level is normal and even useful; the goal is to manage it, not to eliminate it.",
        "Hans Selye's General Adaptation Syndrome describes the body's response in three stages: alarm (the initial fight-or-flight surge), resistance (coping while the demand continues) and exhaustion (resources depleted, performance and health fail). Chronic unrelieved stress drives toward that third stage.",
        "Arousal and performance follow an inverted-U (the Yerkes–Dodson relationship): too little arousal brings boredom and inattention, too much brings tunnelling, fixation and mistakes, and the best performance sits in the middle. High arousal also narrows attention onto a few cues ('attentional narrowing').",
        "Fatigue — acute (short-term, from a hard day or a bad night) or chronic (cumulative, built over weeks) — degrades attention, short-term memory, reaction time and judgement, and it does so insidiously. There is no substitute for sleep: coffee and willpower mask it briefly but only rest cures it.",
      ]},
      { heading: "Health, hygiene & intoxication", figureTopics: ["Health, hygiene & intoxication"], points: [
        "Simple fitness measures matter: Body Mass Index over 25 is overweight and over 30 is obese, both linked to cardiovascular risk. Acute gastro-enteritis (food poisoning, 'Delhi belly') is the classic cause of sudden in-flight incapacitation, which is why the 'same meal' rule separates what the two pilots eat.",
        "Carbon monoxide, typically from a cracked exhaust heater, binds to haemoglobin about 200–250 times more strongly than oxygen, so even a small amount starves the tissues; classic signs are headache, drowsiness and a cherry-red skin colour. Smoking similarly ties up haemoglobin — 20 a day shifts the body's effective altitude up by roughly 5000–7000 ft before you leave the ground.",
        "Only the passage of TIME removes alcohol from the blood — coffee, food, fresh air and exercise do nothing to speed it. Beyond the legal limit and 'bottle-to-throttle' time, residual alcohol and hangover degrade performance for many hours. After scuba diving, allow at least 12 hours before flying (24 hours if the dive required a decompression stop or was deep), because flying lowers the pressure and can trigger the bends.",
        "Donation rules exist for the same pressure/oxygen-carrying reasons: do not fly for at least 24 hours after giving blood, and 48 hours after a bone-marrow donation. When in doubt about any medication, illness or treatment, the conservative answer is to ground yourself and ask an aviation medical examiner.",
      ]},
    ],
    mustKnow: [
      "Circadian period ≈ 25 h; eastward jet lag is worse; alertness/temperature trough ~0400–0500.",
      "Slow-wave sleep restores the body; REM consolidates memory; alcohol suppresses REM.",
      "Stress = PERCEIVED demand vs PERCEIVED ability; arousal/performance is an inverted-U.",
      "No flying 12 h after diving (24 h if deep/deco); blood 24 h; bone marrow 48 h; only time clears alcohol.",
    ],
    traps: [
      "Coffee, food and exercise do NOT speed alcohol clearance — only time does.",
      "Stress is driven by PERCEPTION, not by the actual demand or ability.",
      "Alcohol gives LESS, not more, restorative (REM) sleep.",
    ],
  },
  "A.6.3": {
    sectionId: "A.6.3",
    title: "Basic Aviation Psychology",
    intro:
      "Flying is an information-processing task, and this section is about how the mind takes in, stores and acts on information — and the predictable ways it fails. Human error is not random bad luck; it follows patterns rooted in how perception, memory, attention and decision-making actually work, and in the attitudes and team dynamics around them. Understanding the mechanisms (limited working memory, biased perception, the error types, the hazardous attitudes) lets a crew design procedures, cross-checks and communication that catch mistakes before they become accidents — the whole point of Crew Resource Management.",
    blocks: [
      { heading: "Information processing & memory", figureTopics: ["Information processing & memory"], points: [
        "Information enters through very brief sensory stores before the brain attends to it: the iconic (visual) store holds an image for only about 0.5–1 second, and the echoic (auditory) store holds sound for about 2–8 seconds — which is why you can 'play back' the last few words of a clearance you weren't quite listening to.",
        "Attended information passes to working (short-term) memory, which holds only about 7 ± 2 items and loses them within 10–20 seconds unless they are rehearsed. 'Chunking' — grouping items into meaningful units (a callsign, a frequency) — effectively expands the capacity, and read-back/write-down defends against the rapid decay.",
        "Long-term memory is effectively unlimited and comes in kinds: episodic (personal events), semantic (facts and knowledge) and procedural (skills and motor programmes that become automatic). Well-learned procedures move into procedural memory and free up scarce working memory for the non-routine.",
        "Attention has to be shared because total processing capacity is limited; we time-share between tasks rather than truly doing two demanding things at once. Simple reaction time is about 0.2 seconds, but it lengthens with the number of choices, with fatigue and with stress, and attention can be captured or narrowed under high workload.",
      ]},
      { heading: "Behaviour, error & attitudes", figureTopics: ["Behaviour, error & attitudes"], points: [
        "Rasmussen's framework describes three levels of performance: skill-based (smooth, automatic actions, where errors are 'slips and lapses'), rule-based (applying learned if–then rules, where picking the wrong rule causes error) and knowledge-based (reasoning through a novel problem, slow and error-prone). The level in use shapes the kind of error you are likely to make.",
        "Fitts and Posner describe how a skill is acquired in three stages: cognitive (thinking every step through), associative (practising and smoothing it) and autonomous (automatic, needing little attention). Under stress or distraction, performance can regress to an earlier, more effortful stage.",
        "The five hazardous attitudes to recognise and counter are anti-authority ('don't tell me'), impulsivity ('do something quickly'), invulnerability ('it won't happen to me'), macho ('I can do it') and resignation ('what's the use'). Each has a standard antidote thought; note that 'domination' is NOT one of them.",
        "The SHELL model frames human factors as the fit between the central Liveware (the person) and the Software (procedures, documents), Hardware (controls, displays), Environment (noise, weather, time pressure) and other Liveware (crew, ATC). Accidents usually come from mismatches at these interfaces, not a single broken part. Confirmation bias (seeing what we expect) and rigid false mental models — dangerous precisely because they RESIST revision — drive many error chains.",
      ]},
      { heading: "Decision-making & CRM", figureTopics: ["Decision-making & CRM"], points: [
        "Group decisions usually outperform the average lone individual because more cues and options are considered — but groups carry their own risks, notably the 'risky shift' (a group accepting more risk than its members would alone) and conformity pressure that silences a dissenting but correct crew member.",
        "Situational awareness is the running mental model of what is happening: perceiving the relevant cues, comprehending what they mean, and projecting what will happen next. It is maintained by actively updating that model and is lost through fixation, distraction, high workload and fatigue — recovering it is the first task when things feel wrong.",
        "Crew Resource Management is the disciplined use of all available resources — people, procedures and equipment — through good communication, clear leadership and followership, workload management and decision-making. Done well it produces synergy, where the team performs better than the sum of its individuals; done badly, steep authority gradients and poor communication let errors go unchallenged.",
        "Ergonomics (human-factors design) aims to fit the cockpit to the human: the design eye position and anthropometric reach/vision, logical control layout, and standard coding so information is read correctly under stress — for example the warning-light convention of red for warning (immediate action), amber for caution, and green for normal/safe.",
      ]},
    ],
    mustKnow: [
      "Sensory stores: iconic (visual) ~0.5–1 s, echoic (auditory) ~2–8 s; working memory 7±2 items, ~10–20 s.",
      "Rasmussen's skill/rule/knowledge levels; Fitts & Posner cognitive→associative→autonomous.",
      "The five hazardous attitudes; SHELL interfaces; risky shift; definition of situational awareness.",
      "Colour coding: red = warning, amber = caution, green = normal/safe.",
    ],
    traps: [
      "Iconic = visual (~0.5–1 s); echoic = auditory (~2–8 s) — do not swap them.",
      "'Domination' is NOT one of the five hazardous attitudes.",
      "A false mental model is dangerous because it RESISTS change, not because it is rare.",
    ],
  },
  "A.6.4": {
    sectionId: "A.6.4",
    title: "First Aid & Survival",
    intro:
      "If the flight goes badly wrong, the final human-factors skill is keeping yourself and others alive until help arrives. First aid is about a fixed order of priorities that treats the things that kill fastest first, and survival is about a second order of priorities — protection, location, water, food — that keeps you alive long enough to be found. Both are deliberately simple and sequential because, injured and shocked after an accident, you will fall back on a rehearsed order, not improvise.",
    blocks: [
      { heading: "First-aid priorities", points: [
        "Work through DRABC in order: Danger (make the scene safe — fire, fuel, live wires — before approaching, or you become a second casualty), Response (is the casualty conscious?), Airway (open and clear it), Breathing (look, listen and feel; start rescue breaths/CPR if absent) and Circulation (control major bleeding, check for shock). The order reflects what kills quickest.",
        "Severe external bleeding is controlled by firm direct pressure on the wound and, where appropriate, elevation; maintain pressure and add dressings rather than removing a soaked one. Always anticipate and treat for shock alongside the obvious injury.",
        "Shock (inadequate circulation) shows as pale, cold, clammy skin, a rapid weak pulse, faintness and thirst. Lay the casualty down, raise the legs if injuries allow, keep them warm and reassured, and do not give anything to eat or drink.",
        "Burns: cool the burn with clean water for several minutes, then cover loosely with a clean non-fluffy dressing. Do NOT remove clothing stuck to a burn, burst blisters, or apply creams/ointments — cooling and covering, then evacuation, is the priority.",
      ]},
      { heading: "Survival", points: [
        "Once first aid is done, survival follows the order Protection → Location → Water → Food. Protection (shelter from heat, cold or wet, plus first aid) comes first because exposure kills within hours; Location (making yourself findable) comes next; Water sustains you for days; Food is the lowest priority because you can last weeks without it.",
        "Help the searchers find you: the ELT alerts on 406 MHz (satellite) and homes on 121.5 MHz, and you supplement it with visual signals — fire and smoke, mirrors/heliograph, ground-to-air symbols and bright materials. Stay WITH the wreckage: it is far larger and easier to spot than a person, and it provides shelter and materials.",
        "Manage the thermal threats. Hypothermia (dangerous cooling) is treated by insulating from the ground, sheltering from wind and wet, and rewarming SLOWLY; do not give alcohol, which worsens heat loss. Hyperthermia/heatstroke is treated by shade, rest, cooling and sipping water.",
        "Conserve resources from the start: ration energy, water and body heat, avoid sweating by day and shivering by night, and do the heavy work in the cool of the day. Morale and a plan matter — survivors who keep purpose and routine outlast those who give up.",
      ]},
    ],
    mustKnow: [
      "First-aid order DRABC: Danger, Response, Airway, Breathing, Circulation.",
      "Severe bleeding = direct pressure + elevation; treat for shock (lie down, raise legs, keep warm).",
      "Survival order: Protection → Location → Water → Food.",
      "ELT: 406 MHz satellite alert, 121.5 MHz homing; stay with the wreckage.",
    ],
    traps: [
      "Deal with Danger and the Airway BEFORE bleeding — scene safety and ABC come first.",
      "Rewarm a hypothermic casualty SLOWLY, and never give alcohol.",
      "Leaving the wreckage usually makes you HARDER to find — stay put unless there is a compelling reason.",
    ],
  },
};

export function getHumanPerformanceNote(sectionId: string): SectionNote | undefined {
  return NOTES[sectionId];
}
