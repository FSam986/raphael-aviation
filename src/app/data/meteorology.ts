import { Subject } from "../types/syllabus";

export const meteorology: Subject = {
  id: "met",
  title: "Meteorology",

  chapters: [
    {
      id: "met-atm",
      title: "Atmosphere",

      lessons: [
       {
    id: "met-atm-1",
    title: "Composition of the Atmosphere",
    slug: "composition-of-the-atmosphere",
    duration: "20 min",
    difficulty: "Beginner",
    completed: false,
    locked: false,
},
        {
          id: "met-atm-2",
          title: "Layers of the Atmosphere",
        },
        {
          id: "met-atm-3",
          title: "International Standard Atmosphere (ISA)",
        },
        {
          id: "met-atm-4",
          title: "Temperature Lapse Rate",
        },
        {
          id: "met-atm-5",
          title: "Air Density",
        },
        {
          id: "met-atm-6",
          title: "Pressure",
        },
      ],
    },

    {
      id: "met-wind",
      title: "Wind",

      lessons: [
        {
          id: "met-wind-1",
          title: "Pressure Gradient Force",
        },
        {
          id: "met-wind-2",
          title: "Geostrophic Wind",
        },
        {
          id: "met-wind-3",
          title: "Gradient Wind",
        },
        {
          id: "met-wind-4",
          title: "Surface Wind",
        },
      ],
    },
  ],
};