import type { PersonaId } from "../data/personas";

export type CrosstalkStop =
  | "max_emits"
  | "consecutive_passes"
  | "max_evals"
  | "transport_failure";

export type CrosstalkParse =
  | { kind: "pass" }
  | { kind: "emit"; line: string };

/**
 * Parse model output for crosstalk: PASS token or single-line emit.
 * PASSING / PASSWORD are not passes (first token must equal PASS after strip).
 */
export function parseCrosstalkOutput(raw: string): CrosstalkParse {
  const trimmed = raw.trim();
  if (!trimmed) return { kind: "pass" };

  const firstToken = trimmed.split(/\s+/, 1)[0] ?? "";
  const tokenCore = firstToken.replace(/[.,;:!?]+$/, "");
  if (tokenCore.toLowerCase() === "pass") return { kind: "pass" };

  if (!trimmed.includes("\n") && trimmed.length > 0) {
    return { kind: "emit", line: trimmed };
  }
  return { kind: "pass" };
}

export type CrosstalkPickerState = {
  /** Join-order roster of present ids. */
  joinOrder: PersonaId[];
  /** Round-robin cursor into joinOrder. */
  cursor: number;
};

/**
 * Pick next crosstalk candidate ≠ lastEmitted.
 * Prefer last L→R user-mention if present and eligible; else round-robin.
 */
export function pickCrosstalkCandidate(
  state: CrosstalkPickerState,
  present: ReadonlySet<PersonaId>,
  lastEmitted: PersonaId | null,
  preferredMention: PersonaId | null,
): { candidate: PersonaId | null; nextState: CrosstalkPickerState } {
  const eligible = state.joinOrder.filter(
    (id) => present.has(id) && id !== lastEmitted,
  );
  if (eligible.length === 0) {
    return { candidate: null, nextState: state };
  }

  if (
    preferredMention &&
    present.has(preferredMention) &&
    preferredMention !== lastEmitted
  ) {
    return { candidate: preferredMention, nextState: state };
  }

  const n = state.joinOrder.length;
  if (n === 0) return { candidate: null, nextState: state };

  let cursor = state.cursor % n;
  for (let i = 0; i < n; i++) {
    const id = state.joinOrder[cursor]!;
    cursor = (cursor + 1) % n;
    if (present.has(id) && id !== lastEmitted) {
      return {
        candidate: id,
        nextState: { joinOrder: state.joinOrder, cursor },
      };
    }
  }
  return { candidate: null, nextState: { ...state, cursor } };
}

export const CROSSTALK_MAX_EMITS = 3;
export const CROSSTALK_MAX_CONSEC_PASSES = 3;
export const CROSSTALK_MAX_EVALS = 6;
