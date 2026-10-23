// Derive flashcards from a study note's exam-day key points. Every note section
// already distils the rule, the number examiners test, and the common traps into
// mustKnow / traps / block points — this turns each of those into a flashcard,
// so flashcard coverage scales with the (comprehensive) study notes.

import type { AirLawFlashcard } from "./airlaw-flashcards";

// Structural shape shared by every note file (airlaw-notes, met-notes, etc.).
interface NoteLike {
  sectionId: string;
  title: string;
  blocks: { heading: string; points: string[] }[];
  mustKnow: string[];
  traps: string[];
}

// Split a fact into a front (prompt) + back (answer) on its natural delimiter.
function toCard(sectionId: string, id: string, text: string, title: string, difficulty: AirLawFlashcard["difficulty"], trap = false): AirLawFlashcard {
  const t = text.trim();
  if (trap) return { id, sectionId, front: `Common trap — ${title}`, back: t, difficulty };

  // "X = Y = Z"  → front "X = ?"  back "Y = Z"
  const eq = t.indexOf(" = ");
  if (eq > 0 && eq < 60) {
    return { id, sectionId, front: t.slice(0, eq) + " = ?", back: t.slice(eq + 3), difficulty };
  }
  // "Label: detail"  → front "Label?"  back "detail"  (label short, no sentence end)
  const col = t.indexOf(": ");
  if (col >= 5 && col <= 72 && !/[.?!]/.test(t.slice(0, col))) {
    const label = t.slice(0, col).replace(/\?+$/, "");
    return { id, sectionId, front: label + "?", back: t.slice(col + 2), difficulty };
  }
  // "Lead — detail"  (em/en dash)  → front "Lead?"  back "detail"
  const dash = t.search(/\s[—–]\s/);
  if (dash >= 5 && dash <= 72) {
    return { id, sectionId, front: t.slice(0, dash).trim() + "?", back: t.slice(dash + 3).trim(), difficulty };
  }
  // fallback: subject-context prompt
  return { id, sectionId, front: `${title} — key fact`, back: t, difficulty };
}

export function deriveNoteFlashcards(note: NoteLike | undefined): AirLawFlashcard[] {
  if (!note) return [];
  const out: AirLawFlashcard[] = [];
  const sid = note.sectionId.replace(/[^A-Za-z0-9]/g, "");
  note.mustKnow.forEach((m, i) => out.push(toCard(note.sectionId, `DRVmk-${sid}-${i}`, m, note.title, "medium")));
  note.traps.forEach((tp, i) => out.push(toCard(note.sectionId, `DRVtr-${sid}-${i}`, tp, note.title, "hard", true)));
  note.blocks.forEach((b, bi) =>
    b.points.forEach((p, pi) => {
      // skip very short/structural points
      if (p.trim().length < 18) return;
      out.push(toCard(note.sectionId, `DRVbp-${sid}-${bi}-${pi}`, p, note.title, "medium"));
    })
  );
  return out;
}
