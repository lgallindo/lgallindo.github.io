import { ALL_HOOKS, type SalonHook } from "../data/hooks";
import type { PersonaId } from "../data/personas";
import { matchesAnyPhrase } from "./mention";

export type HookMatchResult =
  | { kind: "hard"; hook: SalonHook }
  | { kind: "soft"; hooks: SalonHook[] }
  | { kind: "none" };

/**
 * Hard wins: highest priority among matching hard hooks whose latch is free.
 * Softs collected only when no hard wins (winning hard discards softs).
 */
export function matchHooks(
  userText: string,
  spentLatches: ReadonlySet<string>,
  hooks: SalonHook[] = ALL_HOOKS,
): HookMatchResult {
  const hardCandidates = hooks
    .filter((h) => h.mode === "hard")
    .filter((h) => matchesAnyPhrase(userText, h.match.any_of))
    .filter((h) => !(h.latch && spentLatches.has(h.latch)))
    .filter((h) => {
      if (!h.lines || h.lines.length === 0) return false;
      if (h.speakers && h.speakers.length > 0 && h.speakers.length !== h.lines.length) {
        return false;
      }
      return true;
    })
    .sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));

  if (hardCandidates.length > 0) {
    return { kind: "hard", hook: hardCandidates[0]! };
  }

  const softs = hooks
    .filter((h) => h.mode === "soft")
    .filter((h) => matchesAnyPhrase(userText, h.match.any_of))
    .filter((h) => Boolean(h.prompt_inject))
    .sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));

  if (softs.length > 0) return { kind: "soft", hooks: softs };
  return { kind: "none" };
}

export function hardHookLastSpeaker(
  hook: SalonHook,
  fallback: PersonaId,
): PersonaId {
  const speakers = hook.speakers;
  if (!speakers || speakers.length === 0) return fallback;
  return speakers[speakers.length - 1]!;
}
