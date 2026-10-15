# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

<!-- End goal is distribution to the Play Store and App Store via a wrapper (e.g. Capacitor). Design desktop and mobile as equal first-class targets. -->

## Stack

Next.js (App Router) + TypeScript, Tailwind CSS, Supabase (auth + progress). Existing codebase.

## Users

Student pilots in South Africa preparing for SACAA theoretical-knowledge exams, across licence levels: PPL → CPL → Instrument Rating. Primary situation: self-study under exam-date pressure, often daily, on phone and laptop. Job to be done: learn each subject's syllabus, drill questions, revise with flashcards, sit mock exams, and know when they are ready to pass.

## Product Purpose

A SACAA exam-prep study platform. It turns the official syllabus (Appendix 2.0A to SA-CATS 61) into structured study notes, illustrated figures, question banks, flashcards, and mock exams, plus readiness tracking and an exam-day plan — so a student can prepare for and pass the SACAA theory exams without piecing together scattered material.

## Positioning

Built directly against the authoritative SACAA syllabus: every question, note, and flashcard maps to a real syllabus aspect (A.x.y), and the app mirrors the appendix's subject order and codes. Spans the full licence ladder (PPL/CPL/IR) with shared content where the syllabi overlap. A "Guaranteed Pass" coaching plan and readiness dials aim the whole experience at the single outcome of passing.

## Operating Context

Subjects follow SACAA codes (e.g. A.1 Aircraft Technical, A.3 Air Law, A.8 Meteorology, A.9 General Navigation, A.10 Radio Navigation). Each subject breaks into sections and syllabus aspects. Core surfaces: Dashboard, Study (notes + illustrations per section), Quiz, Flashcards, Mock Exams, Exam-Day Brief, Progress, the Guaranteed-Pass coach, and Settings. Study content is richly illustrated with figure libraries. Used both as daily micro-study on mobile and longer sessions on desktop.

## Capabilities and Constraints

Auth and per-user progress via Supabase (progress currently device-local in places; cross-device sync planned). Local TypeScript question/flashcard banks, optionally seeded to the database. Subject content is syllabus-traceable and must stay so. Payment/subscription gateway is not yet built ("premium" currently unlocks in-app); a "Guaranteed Pass" premium tier is planned. Exam counts/pass marks/durations are confirmed against SA-CATS exam-format tables, not the syllabus appendix.

## Brand Commitments

- Name: **Raphael Aviation** (binding).
- Logo: binding, at `public/logo.png` — a gold wings-and-compass-star emblem above a serif "RAPHAEL" wordmark with tracked "AVIATION", rendered in metallic gold on black.
- The black-and-gold identity and the serif wordmark are the recognizable equity to carry forward. (The current flat-yellow UI is an incidental approximation, not a commitment.)
- Voice: aimed at passing — serious, exam-focused, encouraging.

## Open Decisions

- Exact subscription tiers/pricing for the Guaranteed-Pass premium plan (not yet decided).
- Cross-device progress sync (planned, not built).
