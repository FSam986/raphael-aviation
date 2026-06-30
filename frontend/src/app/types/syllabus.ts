export interface Lesson {
  id: string;
  title: string;
  slug?: string;
  duration?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  completed?: boolean;
  locked?: boolean;
  description?: string;
  video?: string;
  notes?: string;
  diagrams?: string[];
  flashcards?: string;
  quiz?: string;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  title: string;
  chapters: Chapter[];
}
