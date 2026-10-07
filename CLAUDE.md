# Raphael Aviation — Project Rules

## Authoritative syllabus (the main rule)

`docs/CPL-Appendix-2.0A.pdf` — SACAA **Appendix 2.0A to SA-CATS 61** (Syllabus of
Theoretical Knowledge for the CPL, consolidated 2015-05-28) — is the **single
source of truth** for what this project teaches and examines.

Everything built for a subject must trace back to this document:

- `frontend/src/app/data/sacaa-syllabus.ts` must mirror the appendix: subject
  order/codes, aspect numbers (`A.x.y`), and topic wording. If they ever
  disagree, the PDF wins — fix the `.ts`, not the PDF.
- Every question (`met-questions.ts`), study note (`met-notes.ts`), and flashcard
  (`met-flashcards.ts`) must map to a real aspect in the appendix. Do **not**
  invent topics that aren't in it, and don't skip aspects it lists.
- When adding a new subject, transcribe its aspects from the appendix first, then
  build questions/notes/flashcards against those aspects.

## What the appendix does NOT define

It lists **topics only** (with an "X" marking aeroplane applicability). It does
**not** give exam question counts, pass marks, or exam duration — those come from
SA-CATS 61's exam-format tables, a separate source. So:

- `examQuestions`, `passPercent`, `examMinutes` in `sacaa-syllabus.ts` are NOT
  sourced from this PDF and must be confirmed against SA-CATS 61 / SACAA exam
  info. `examMinutes: 120` (Meteorology) is currently an unverified placeholder.

## Build/verify

- `cd frontend && ./node_modules/.bin/tsc --noEmit` — typecheck.
- `cd frontend && npm run build` — full build.
- Do NOT start a shell dev server; the Preview panel manages it (port stays free).
