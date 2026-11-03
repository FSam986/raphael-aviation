# Full Content Audit — All Categories (CPL / PPL / IR)

_Automated + manual audit of the question banks. Covers what is machine-detectable and what was manually spot-checked. Factual-answer correctness across all ~11,300 questions still requires a SACAA-qualified instructor review — see "Limits"._

## Scope
- **11,308 questions** scanned across all subject files (both object-literal and `q(...)` helper formats).
- CPL is the primary syllabus (A.x codes); PPL and IR reuse the CPL banks by section.

## ✅ Coverage (SACAA CPL syllabus)
- **88 sections, 0 empty, 0 thin (<10 Q)** — every syllabus section has questions. See `COVERAGE_REPORT.md`.
- Caveat: verified at **section** level (A.x.y), not **aspect** level (A.x.y.z).

## ✅ Data integrity
- **0 duplicate question IDs** across every file.
- **0 empty-option questions** (all four options populated).
- **Duplicate-option questions:** 1 real defect fixed (ALG-014 — optionA == optionC), 1 minor near-duplicate noted (radio-nav ADF "LOOP" case), 4 false positives (GR questions that deliberately test spelling/caps: MHz/MHZ, ICAO/IOCA).
- No broken image references; no stale-cache config; no debug code.

## ⚠️ Explanation quality (teaching text)
- **Navigation: FIXED.** 109 placeholder explanations ("uploaded question bank") rewritten with real teaching text; 1 wrong key corrected (NAVQ-108, conversion angle = ½ × Δlong × sin mean lat).
- **Air Law: 74 remain** (`airlaw-questions-new.ts`) with placeholder explanations. These are SA-specific Part 135/91 regulatory questions; per project rule they must be explained from the **SA air-law source**, not general/ICAO knowledge — flagged for source/instructor review, deliberately **not** auto-written.

## ⛔ Limits (needs human/source review before charging)
1. **Factual correctness of all answer keys.** Manual spot-checks (12 cross-subject + 109 nav) found the content broadly sound but surfaced 1 wrong key (NAVQ-108) and 1 duplicate-option defect — proof that errors exist at low frequency. Only a per-subject instructor review certifies the full ~11,300.
2. **Air-law explanations (74)** — need the SA regulatory source.
3. **Aspect-level coverage** — section coverage is complete; individual sub-topics not individually verified.
4. **Manual click-through QA** of every screen, quiz, flashcard deck, mock exam and payment flow (not doable from here — app is behind login).
5. **Copyright/licensing** sign-off on embedded figures and sourced question banks before commercial sale.
