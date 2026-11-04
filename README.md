# Raphael Aviation

An AI-powered study platform for SACAA Commercial Pilot Licence (CPL) candidates.

## Features

- **AI Tutor** — Ask anything about aviation; powered by OpenAI
- **Study** — Interactive CPL lessons covering meteorology and more
- **Exams** — SACAA-style practice exams with instant feedback
- **Flashcards** — Rapid-fire concept review
- **Progress** — Track your training over time

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com)
- [OpenAI SDK](https://github.com/openai/openai-node)
- TypeScript

## Getting Started

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```
OPENAI_API_KEY=your_key_here
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/app/
├── ai-tutor/      # Chat interface with AI instructor
├── dashboard/     # Overview and quick navigation
├── exams/         # Practice exam engine
├── flashcards/    # Flashcard study mode
├── progress/      # Training progress tracker
├── settings/      # App settings
├── training/      # Structured lesson content
├── data/          # Syllabus and subject data
└── api/chat/      # OpenAI API route handler
```

## Deployment

Deploy on [Vercel](https://vercel.com) — connect your GitHub repo and add `OPENAI_API_KEY` as an environment variable.
