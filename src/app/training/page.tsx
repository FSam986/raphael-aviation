"use client";

import { useState } from "react";

import { subjects } from "../data/subjects";
import { meteorology } from "../data/meteorology";

export default function TrainingPage() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  const [selectedChapter, setSelectedChapter] = useState(
    meteorology.chapters[0]
  );

  const [selectedLesson, setSelectedLesson] = useState(
    meteorology.chapters[0].lessons[0]
  );

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* SUBJECTS */}

      <aside className="w-72 border-r border-zinc-800 bg-zinc-950 flex flex-col">

        <div className="p-6 border-b border-zinc-800">

          <h1 className="text-2xl font-bold text-yellow-400">
            Study
          </h1>

          <p className="text-sm text-zinc-500 mt-2">
            SACAA CPL Training
          </p>

        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">

          {subjects.map((subject) => (

            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className={`w-full rounded-xl p-3 text-left transition ${
                selectedSubject.id === subject.id
                  ? "bg-yellow-500 text-black"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              {subject.name}
            </button>

          ))}

        </div>

      </aside>

      {/* CHAPTERS */}

      <aside className="w-80 border-r border-zinc-800 bg-zinc-950">

        <div className="p-6 border-b border-zinc-800">

          <h2 className="text-xl font-semibold text-yellow-400">
            {selectedSubject.name}
          </h2>

        </div>

        <div className="p-4 space-y-2">

          {meteorology.chapters.map((chapter) => (

            <button
              key={chapter.id}
              onClick={() => {
                setSelectedChapter(chapter);
                setSelectedLesson(chapter.lessons[0]);
              }}
              className={`w-full rounded-lg p-3 text-left transition ${
                selectedChapter.id === chapter.id
                  ? "bg-yellow-500 text-black"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              {chapter.title}
            </button>

          ))}

        </div>

      </aside>

      {/* LESSON */}

      <main className="flex-1 overflow-y-auto p-10">

        <h1 className="text-4xl font-bold text-yellow-400">
          {selectedLesson.title}
        </h1>

        <p className="mt-4 text-zinc-400">
          Lesson content for <strong>{selectedLesson.title}</strong> will appear here.
        </p>

        <div className="grid grid-cols-2 gap-5 mt-10">

          <div className="bg-zinc-900 rounded-xl p-6">
            🎥 Video
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            🤖 AI Instructor
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            🖼 Diagrams
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            🧠 Flashcards
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            📝 Practice Questions
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            ✅ Mark Complete
          </div>

        </div>

      </main>

    </div>
  );
}