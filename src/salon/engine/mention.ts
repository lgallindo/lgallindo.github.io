import { PERSONAS, type PersonaId } from "../data/personas";
import { includesPhrase, nfkcLower } from "./normalize";

export type MentionHit = {
  id: PersonaId;
  /** Index of first match in NFKC-lowered user text (for L→R ordering). */
  index: number;
};

function tokensFor(id: PersonaId): string[] {
  const card = PERSONAS[id];
  const raw = [card.id, card.displayName, ...card.aliases];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of raw) {
    const k = nfkcLower(t).trim();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(t);
  }
  // Longer tokens first so "dandara reis" wins the earliest index over "dandara" when both match at same start.
  out.sort((a, b) => nfkcLower(b).length - nfkcLower(a).length);
  return out;
}

/** All roster matches in user text with leftmost occurrence index. */
export function findMentions(userText: string): MentionHit[] {
  const hay = nfkcLower(userText);
  const hits: MentionHit[] = [];
  for (const id of Object.keys(PERSONAS) as PersonaId[]) {
    let best = -1;
    for (const token of tokensFor(id)) {
      const needle = nfkcLower(token);
      const idx = hay.indexOf(needle);
      if (idx >= 0 && (best < 0 || idx < best)) best = idx;
    }
    if (best >= 0) hits.push({ id, index: best });
  }
  hits.sort((a, b) => a.index - b.index || a.id.localeCompare(b.id));
  return hits;
}

/** Last L→R match among hits (addressee rule). */
export function lastMentionId(hits: MentionHit[]): PersonaId | null {
  if (hits.length === 0) return null;
  return hits[hits.length - 1]!.id;
}

export function matchesAnyPhrase(userText: string, phrases: string[]): boolean {
  return phrases.some((p) => includesPhrase(userText, p));
}
