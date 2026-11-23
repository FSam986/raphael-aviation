// CPL Human Performance — detailed solved examples (A.6.x). Original problems.
import type { WorkedExample } from "./worked-examples";

const X = (e: WorkedExample) => e;

export const HP_WORKED_EXAMPLES: WorkedExample[] = [
  X({
    id: "HPW-611", sectionId: "A.6.1", title: "Partial pressure of oxygen with altitude (Dalton's law)",
    problem: "Find the partial pressure of oxygen in the air at sea level, at 10 000 ft and at 18 000 ft, and comment on hypoxia.",
    given: ["O₂ = 21 % at all altitudes", "Pressure: SL 760 mmHg; 10 000 ft 523 mmHg; 18 000 ft 380 mmHg"],
    find: "PO₂ at each level.",
    concept: "Dalton's law: partial pressure = fraction × total pressure. Oxygen transfer into the blood depends on its partial pressure, not on the percentage.",
    steps: [
      "Sea level: 0.21 × 760 = 160 mmHg.",
      "10 000 ft: 0.21 × 523 = 110 mmHg (about 69 % of sea level).",
      "18 000 ft: 0.21 × 380 = 80 mmHg (half of sea level).",
      "In the alveoli subtract water vapour (47) and CO₂ (~40) effects → about 100, 60 and ~38 mmHg: saturation ~97 %, ~90 %, and well below 80 % — significant hypoxia above 10 000 ft.",
    ],
    answer: "160 · 110 · 80 mmHg",
    trap: "Saying the oxygen percentage falls with altitude — it doesn't; the pressure does.",
  }),
  X({
    id: "HPW-612", sectionId: "A.6.1", title: "Trapped gas expansion (Boyle's law)",
    problem: "100 ml of gas is trapped in the gut at sea level. The cabin depressurises at 34 000 ft (pressure ≈ ¼ of sea level). Separately, a pressurised cabin is held at 8 000 ft (≈ 0.74 of sea-level pressure).",
    given: ["P₁V₁ = P₂V₂ (constant temperature)"],
    find: "Gas volume in each case.",
    concept: "Volume is inversely proportional to pressure.",
    steps: [
      "34 000 ft: V₂ = 100 × 1 ÷ 0.25 = 400 ml (four times).",
      "8 000 ft cabin: V₂ = 100 ÷ 0.74 ≈ 135 ml (+35 %).",
      "That's why gas-producing food and fizzy drinks before flight cause discomfort, and why a pneumothorax is a bar to flying.",
    ],
    answer: "≈ 400 ml · ≈ 135 ml",
    trap: "Assuming volume changes linearly with altitude rather than with pressure.",
  }),
  X({
    id: "HPW-613", sectionId: "A.6.1", title: "Collision closure and 'see and avoid'",
    problem: "Two aircraft approach head-on at 150 kt and 210 kt. A pilot needs about 12.5 s to see, recognise, decide and manoeuvre.",
    given: ["Closing speed = 360 kt", "Reaction time ≈ 12.5 s"],
    find: "Distance covered during the reaction time; at what range the other aircraft must be seen.",
    concept: "Closing speed = sum of speeds; distance = speed × time.",
    steps: [
      "360 kt = 6 nm/min = 1 nm every 10 s.",
      "In 12.5 s they close 1.25 nm.",
      "So the other aircraft must be detected at least 1.25 nm away — and it shows no relative movement in the windscreen on a collision course, appearing small until the last seconds.",
    ],
    answer: "≈ 1.25 nm",
    trap: "Expecting a collision-course aircraft to move across the windscreen.",
  }),
  X({
    id: "HPW-621", sectionId: "A.6.2", title: "Blood alcohol and the SA limit",
    problem: "A pilot's blood alcohol is 0.08 g/100 ml at midnight when they stop drinking. They are rostered to report at 0700.",
    given: ["Elimination ≈ 0.015 g/100 ml per hour", "CAR 91.02.3: no alcohol < 8 h before duty; BAC ≤ 0.02 g/100 ml at the start of duty"],
    find: "Whether the pilot may report at 0700, and the earliest legal reporting time.",
    concept: "Both rules must be met: the 8-hour 'bottle to throttle' and the 0.02 limit. Elimination is roughly linear and can't be speeded up.",
    steps: [
      "8-hour rule: last drink at 0000 → earliest 0800. Reporting at 0700 already breaks this rule.",
      "Alcohol to eliminate to reach 0.02: 0.08 – 0.02 = 0.06 g/100 ml.",
      "Time = 0.06 ÷ 0.015 = 4 h → BAC below 0.02 by about 0400 — this rule alone would be met.",
      "Earliest legal report = the LATER of the two: 0800.",
      "Hangover effects (disorientation, poor performance) may persist longer — fitness is also the pilot's responsibility.",
    ],
    answer: "No — earliest legal report 0800 (8-hour rule governs)",
    trap: "Checking only the BAC limit and forgetting the 8-hour rule (or vice versa after heavy drinking).",
  }),
  X({
    id: "HPW-622", sectionId: "A.6.2", title: "BMI and jet-lag recovery",
    problem: "Part 1: a pilot weighs 96 kg and is 1.78 m tall. Part 2: a crew flies from Johannesburg (UTC+2) to Perth (UTC+8) and stays several days.",
    given: ["BMI = kg ÷ m²", "Adaptation ≈ 1 time zone per day; eastward harder"],
    find: "Part 1 BMI category. Part 2 approximate adaptation time and the direction effect.",
    concept: "BMI screens weight for height. Circadian rhythms shift about an hour per day; shortening the day (eastward) is harder.",
    steps: [
      "§ Part 1",
      "1.78² = 3.17 → BMI = 96 ÷ 3.17 = 30.3 → obese (> 30).",
      "§ Part 2",
      "Time change = 6 h EASTWARD → about 6 days to adapt fully (often longer eastward).",
      "Use morning daylight at the destination, eat and sleep on local time, avoid alcohol, plan demanding tasks away from the body-clock low (which at first falls around 0800–1200 Perth time).",
    ],
    answer: "BMI ≈ 30.3 (obese) · ≈ 6 days, eastward = harder",
    trap: "Assuming north–south flights cause jet lag — only time-zone changes do.",
  }),
];
