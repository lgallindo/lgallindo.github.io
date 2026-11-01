import type { SalonHook } from "../data/hooks";
import { getPersona, type PersonaId } from "../data/personas";
import {
  CROSSTALK_MAX_CONSEC_PASSES,
  CROSSTALK_MAX_EMITS,
  CROSSTALK_MAX_EVALS,
  parseCrosstalkOutput,
  pickCrosstalkCandidate,
} from "./crosstalk";
import { hardHookLastSpeaker, matchHooks } from "./hooks";
import { findMentions, lastMentionId } from "./mention";
import {
  appendNpcLine,
  appendPassBeat,
  appendUserLine,
  contextLines,
  enterPersona,
  formatChatForLlm,
  type SalonSession,
} from "./session";
import type { ChatMessage, LlmEngine } from "../llm/webllm";

export type TurnUiHooks = {
  onUpdate: () => void;
  onWarning: (msg: string) => void;
};

async function generateAs(
  engine: LlmEngine,
  speaker: PersonaId,
  session: SalonSession,
  softInjects: string[],
  crosstalkInstruction: boolean,
): Promise<string> {
  const card = getPersona(speaker);
  let system = card.systemPrompt;
  if (softInjects.length) {
    system += "\n\n" + softInjects.join("\n");
  }
  if (crosstalkInstruction) {
    system +=
      "\n\nCrosstalk turn: reply with exactly PASS (if no answer is required) OR one short in-character line answering the last speaker. Not both. No quotes around PASS.";
  }
  const history = formatChatForLlm(contextLines(session, 4));
  const messages: ChatMessage[] = [
    { role: "system", content: system },
    ...history,
  ];
  return engine.chat(messages);
}

async function runCrosstalk(
  session: SalonSession,
  engine: LlmEngine,
  softInjects: string[],
  lastEmitted: PersonaId,
  preferredMention: PersonaId | null,
  ui: TurnUiHooks,
): Promise<void> {
  if (session.mode !== "ready" || session.present.size < 2) return;

  let emits = 0;
  let consecPasses = 0;
  let evals = 0;
  let last = lastEmitted;

  while (
    emits < CROSSTALK_MAX_EMITS &&
    consecPasses < CROSSTALK_MAX_CONSEC_PASSES &&
    evals < CROSSTALK_MAX_EVALS
  ) {
    evals += 1;
    const { candidate, nextState } = pickCrosstalkCandidate(
      session.crosstalk,
      session.present,
      last,
      preferredMention,
    );
    session.crosstalk = nextState;
    if (!candidate) break;

    try {
      const raw = await generateAs(
        engine,
        candidate,
        session,
        softInjects,
        true,
      );
      const parsed = parseCrosstalkOutput(raw);
      if (parsed.kind === "pass") {
        consecPasses += 1;
        appendPassBeat(session, candidate);
      } else {
        consecPasses = 0;
        emits += 1;
        appendNpcLine(session, candidate, parsed.line, "crosstalk");
        last = candidate;
      }
      ui.onUpdate();
    } catch {
      ui.onWarning("Crosstalk interrupted (model error).");
      break;
    }
  }
}

/**
 * Process one user message per design turn engine.
 * Gate/hooks-only: hard hooks + mention entrances only; no LLM/crosstalk.
 */
export async function handleUserMessage(
  session: SalonSession,
  userText: string,
  engine: LlmEngine | null,
  ui: TurnUiHooks,
): Promise<void> {
  const text = userText.trim();
  if (!text) return;

  session.errorBanner = null;
  session.warningBanner = null;
  appendUserLine(session, text);
  ui.onUpdate();

  const mentions = findMentions(text);
  const preferred = lastMentionId(mentions);

  // (1) enter-on-mention
  for (const hit of mentions) {
    if (!session.present.has(hit.id)) {
      enterPersona(session, hit.id);
    }
  }
  ui.onUpdate();

  const hookResult = matchHooks(text, session.spentLatches);
  let softInjects: string[] = [];
  let lastSpeaker: PersonaId = session.greeterId;
  let ordinaryOk = false;

  if (hookResult.kind === "hard") {
    const hook = hookResult.hook;
    if (hook.speakers && hook.lines && hook.speakers.length !== hook.lines.length) {
      ui.onWarning(`Hook ${hook.id} invalid (speakers/lines length); skipped.`);
    } else {
      playHardHook(session, hook);
      if (hook.latch) session.spentLatches.add(hook.latch);
      lastSpeaker = hardHookLastSpeaker(hook, session.greeterId);
      ordinaryOk = true; // hard path counts as success for crosstalk
      ui.onUpdate();
    }
  } else {
    if (hookResult.kind === "soft") {
      softInjects = hookResult.hooks
        .map((h) => h.prompt_inject)
        .filter((s): s is string => Boolean(s));
    }

    if (session.mode !== "ready" || !engine) {
      if (session.mode === "loading") {
        session.errorBanner =
          "Model still loading — hard hooks and mentions work; ordinary replies wait.";
      } else {
        session.errorBanner =
          "Hooks-only mode — ordinary LLM replies unavailable. Try a Bonanno phrase or name a persona.";
      }
      ui.onUpdate();
      return;
    }

    const addressee: PersonaId =
      preferred && session.present.has(preferred)
        ? preferred
        : session.present.has(session.greeterId)
          ? session.greeterId
          : ([...session.present][0] ?? session.greeterId);

    try {
      const reply = await generateAs(
        engine,
        addressee,
        session,
        softInjects,
        false,
      );
      if (!reply) {
        session.errorBanner = "Empty model reply — try again.";
        ui.onUpdate();
        return;
      }
      appendNpcLine(session, addressee, reply, "primary");
      lastSpeaker = addressee;
      ordinaryOk = true;
      ui.onUpdate();
    } catch (err) {
      session.errorBanner =
        err instanceof Error ? err.message : "Model error — try again.";
      ui.onUpdate();
      return;
    }
  }

  if (ordinaryOk && session.mode === "ready" && engine && session.present.size >= 2) {
    await runCrosstalk(
      session,
      engine,
      softInjects,
      lastSpeaker,
      preferred,
      ui,
    );
  }
}

function playHardHook(session: SalonSession, hook: SalonHook): void {
  const lines = hook.lines ?? [];
  const speakers = hook.speakers;
  for (let i = 0; i < lines.length; i++) {
    const speaker: PersonaId =
      speakers && speakers[i] ? speakers[i]! : session.greeterId;
    if (!session.present.has(speaker)) {
      enterPersona(session, speaker);
      // Remove entrance if we immediately play hook line from same speaker — keep both: entrance then hook is fine per design (speakers enter then lines play).
    }
    appendNpcLine(session, speaker, lines[i]!, "primary");
  }
}
