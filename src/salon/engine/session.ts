import {
  PERSONAS,
  getPersona,
  randomGreeterId,
  type PersonaId,
} from "../data/personas";
import type { CrosstalkPickerState } from "./crosstalk";

export type ChatRole = "user" | "npc";

export type ChatLine = {
  id: string;
  role: ChatRole;
  speakerId: PersonaId | "you";
  displayName: string;
  text: string;
  kind: "primary" | "crosstalk" | "system";
  /** True when this line is a silent PASS beat (UI may show ellipsis only). */
  passBeat?: boolean;
};

export type SalonMode = "loading" | "ready" | "hooks_only";

export type SalonSession = {
  mode: SalonMode;
  greeterId: PersonaId;
  present: Set<PersonaId>;
  joinOrder: PersonaId[];
  spentLatches: Set<string>;
  transcript: ChatLine[];
  crosstalk: CrosstalkPickerState;
  litSpeaker: PersonaId | null;
  errorBanner: string | null;
  warningBanner: string | null;
};

let lineSeq = 0;

export function nextLineId(): string {
  lineSeq += 1;
  return `line-${lineSeq}`;
}

export function createSession(rng: () => number = Math.random): SalonSession {
  const greeterId = randomGreeterId(rng);
  return {
    mode: "loading",
    greeterId,
    present: new Set(),
    joinOrder: [],
    spentLatches: new Set(),
    transcript: [],
    crosstalk: { joinOrder: [], cursor: 0 },
    litSpeaker: null,
    errorBanner: null,
    warningBanner: null,
  };
}

export function enterPersona(
  session: SalonSession,
  id: PersonaId,
): { entered: boolean; entranceLine: ChatLine | null } {
  if (session.present.has(id)) {
    return { entered: false, entranceLine: null };
  }
  session.present.add(id);
  session.joinOrder.push(id);
  session.crosstalk.joinOrder = [...session.joinOrder];
  const card = getPersona(id);
  const entranceLine: ChatLine = {
    id: nextLineId(),
    role: "npc",
    speakerId: id,
    displayName: card.displayName,
    text: card.entranceTemplate,
    kind: "primary",
  };
  session.transcript.push(entranceLine);
  session.litSpeaker = id;
  return { entered: true, entranceLine };
}

/** Greeter enters without an entrance line; posts greeting template instead. */
export function postGreeting(session: SalonSession): ChatLine {
  const id = session.greeterId;
  if (!session.present.has(id)) {
    session.present.add(id);
    session.joinOrder.push(id);
    session.crosstalk.joinOrder = [...session.joinOrder];
  }
  const card = getPersona(id);
  const greet: ChatLine = {
    id: nextLineId(),
    role: "npc",
    speakerId: id,
    displayName: card.displayName,
    text: card.greetingTemplate,
    kind: "primary",
  };
  session.transcript.push(greet);
  session.litSpeaker = id;
  return greet;
}

export function appendUserLine(session: SalonSession, text: string): ChatLine {
  const line: ChatLine = {
    id: nextLineId(),
    role: "user",
    speakerId: "you",
    displayName: "You",
    text,
    kind: "primary",
  };
  session.transcript.push(line);
  return line;
}

export function appendNpcLine(
  session: SalonSession,
  id: PersonaId,
  text: string,
  kind: "primary" | "crosstalk" = "primary",
): ChatLine {
  const card = PERSONAS[id];
  const line: ChatLine = {
    id: nextLineId(),
    role: "npc",
    speakerId: id,
    displayName: card.displayName,
    text,
    kind,
  };
  session.transcript.push(line);
  session.litSpeaker = id;
  return line;
}

export function appendPassBeat(session: SalonSession, id: PersonaId): ChatLine {
  const card = PERSONAS[id];
  const line: ChatLine = {
    id: nextLineId(),
    role: "npc",
    speakerId: id,
    displayName: card.displayName,
    text: "…",
    kind: "crosstalk",
    passBeat: true,
  };
  session.transcript.push(line);
  return line;
}

/** Last N visible lines for WebLLM context (skip pure pass beats).
 * Default 4: pinned Llama-3.2-1B MLC build is cs1k (~1024 tokens). */
export function contextLines(session: SalonSession, n = 4): ChatLine[] {
  const visible = session.transcript.filter((l) => !l.passBeat);
  return visible.slice(-n);
}

export function formatChatForLlm(lines: ChatLine[]): {
  role: "user" | "assistant";
  content: string;
}[] {
  return lines.map((l) => {
    if (l.role === "user") {
      return { role: "user" as const, content: `[You]: ${l.text}` };
    }
    return {
      role: "assistant" as const,
      content: `[${l.displayName}]: ${l.text}`,
    };
  });
}
