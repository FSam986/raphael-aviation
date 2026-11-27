// SACAA Night Rating — theoretical-knowledge syllabus. Source of truth:
// docs / ~/Downloads/NightRatingSyllabus.pdf, "1.1 Night rating: General"
// (sub-regulation 61.14.1(2)(a)). Sections NR1–NR4 mirror its parts (a)–(d);
// items mirror (i), (ii)… in order and wording. A single-subject rating in the
// Ratings division (alongside IR and GR).
// examQuestions / passPercent / examMinutes are NOT in the syllabus — placeholders
// until confirmed against SACAA exam info.

import type { SyllabusSubject } from "@/app/data/sacaa-syllabus";

const sec = (id: string, title: string, topics: string[]) => ({
  id,
  title,
  items: topics.map((t, i) => ({ id: `${id}.${String.fromCharCode(97 + i)}`, topic: t })),
});

export const NR_SYLLABUS: SyllabusSubject[] = [
  {
    id: "night-rating",
    code: "NR",
    title: "Night Rating",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      sec("NR1", "Air Law (Night)", [
        "The definition of night flying",
        "The privileges and limitations associated with the night rating",
        "The pilot-in-command's responsibilities",
        "The equipment to be carried on board for night flying",
        "Aircraft lighting including navigation lights",
        "VFR differences from day flying",
        "Aerodrome requirements for night flying",
      ]),
      sec("NR2", "Meteorology (Night)", [
        "The formation of fog",
        "Various types of fog",
        "Katabatic winds",
        "Mixing, veering and backing of winds at night",
        "Formation of ice and frost",
        "Nocturnal thunderstorms",
      ]),
      sec("NR3", "Human Performance (Night)", [
        "Factors affecting night vision; the preservation of night vision",
        "Visual illusions",
        "Hypoxia",
        "Vertigo",
        "Autokinesis",
      ]),
      sec("NR4", "Lighting Systems", [
        "External aircraft lighting",
        "Internal cockpit lighting",
        "Taxiway lighting",
        "Runway lighting",
        "Approach lighting systems",
        "Obstruction lighting",
        "Aerodrome identification beacons",
        "Where to find information on lighting systems",
        "Pilot-operated lighting",
      ]),
    ],
  },
];
