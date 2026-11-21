// PPL depth tier. PPL subjects that reuse CPL study material must NOT be
// identical to the CPL course — a PPL candidate sits a shallower paper. These
// helpers derive a genuine PPL-depth view from the (verified-accurate) CPL
// content: nothing is invented, the PPL note is a foundational SUBSET of the CPL
// note (intro + the foundational blocks + key facts + traps), and the PPL
// question/flashcard set is a reduced, non-hard subset. CPL keeps the full depth.
//
// Helpers are generic so Met's structurally-identical note/question/flashcard
// types reuse them without casts.

type Difficulty = "easy" | "medium" | "hard";
interface NoteLike {
  sectionId: string;
  title: string;
  intro: string;
  blocks: unknown[];
  mustKnow: string[];
  traps: string[];
}

// Keep the foundational half of a section's teaching blocks (min 2), dropping
// the deeper CPL-only detail that trails each section.
function trimBlocks<T>(blocks: T[]): T[] {
  if (blocks.length <= 2) return blocks;
  return blocks.slice(0, Math.max(2, Math.ceil(blocks.length / 2)));
}

/** A single CPL note rendered at PPL depth (foundational blocks only). */
export function pplNoteDepth<T extends NoteLike>(note: T): T {
  return { ...note, blocks: trimBlocks(note.blocks) };
}

/** Merge the CPL notes mapped to a PPL section into one PPL-depth note. */
export function mergePplNotes<T extends NoteLike>(sectionId: string, cplNotes: T[]): T | undefined {
  const notes = cplNotes.map(pplNoteDepth);
  if (notes.length === 0) return undefined;
  if (notes.length === 1) return { ...notes[0], sectionId };
  return {
    ...notes[0],
    sectionId,
    title: notes[0].title,
    intro: notes[0].intro,
    blocks: notes.flatMap((n) => n.blocks),
    mustKnow: notes.flatMap((n) => n.mustKnow),
    traps: notes.flatMap((n) => n.traps),
  };
}

// PPL question depth: drop the hardest questions, then keep a reduced subset so
// the PPL quiz is a lighter paper than CPL (easy-first, skip every 3rd), capped.
export function pplQuestionDepth<T extends { difficulty: Difficulty }>(qs: T[], cap = 40): T[] {
  const rank: Record<Difficulty, number> = { easy: 0, medium: 1, hard: 2 };
  const kept = qs.filter((q) => q.difficulty !== "hard");
  const ordered = [...kept].sort((a, b) => rank[a.difficulty] - rank[b.difficulty]);
  const thinned = ordered.filter((_, i) => i % 3 !== 2); // ~two-thirds
  return thinned.slice(0, cap);
}

/** PPL flashcard depth: a reduced subset (keeps ~two-thirds). */
export function pplFlashcardDepth<T>(cards: T[]): T[] {
  return cards.filter((_, i) => i % 3 !== 2);
}
