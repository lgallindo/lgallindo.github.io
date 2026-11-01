import { PINNED_MODEL_ID } from "../data/personas";

export type ProgressFn = (report: {
  progress: number;
  text: string;
}) => void;

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type LlmEngine = {
  ready: boolean;
  modelId: string;
  chat: (messages: ChatMessage[]) => Promise<string>;
  unload?: () => Promise<void>;
};

/** Pinned MLC build is cs1k — keep requests tiny or generation stalls. */
export const WEBLLM_CHAT_TIMEOUT_MS = 90_000;

type CompletionsCreate = (opts: {
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}) => Promise<{
  choices: { message?: { content?: string | null } }[];
}>;

type EngineLike = {
  chat: { completions: { create: CompletionsCreate } };
  unload?: () => Promise<void>;
};

/**
 * Prefer a dedicated worker so the UI can show “thinking…” while generating.
 * Falls back to main-thread CreateMLCEngine if the worker fails to start.
 */
export async function createWebLlmEngineAuto(
  onProgress?: ProgressFn,
): Promise<LlmEngine> {
  try {
    return await createWebLlmEngineWorker(onProgress);
  } catch (err) {
    console.warn("[salon] WebWorker engine failed; using main thread", err);
    onProgress?.({
      progress: 0.05,
      text: "Worker unavailable — loading model on main thread…",
    });
    return createWebLlmEngineMainThread(onProgress);
  }
}

async function createWebLlmEngineWorker(
  onProgress?: ProgressFn,
): Promise<LlmEngine> {
  const { CreateWebWorkerMLCEngine } = await import("@mlc-ai/web-llm");
  const worker = new Worker(new URL("./webllm.worker.ts", import.meta.url), {
    type: "module",
  });
  const engine = (await CreateWebWorkerMLCEngine(worker, PINNED_MODEL_ID, {
    initProgressCallback: (report: { progress: number; text: string }) => {
      onProgress?.(report);
    },
  })) as EngineLike;

  return wrapEngine(engine, () => {
    worker.terminate();
  });
}

async function createWebLlmEngineMainThread(
  onProgress?: ProgressFn,
): Promise<LlmEngine> {
  const { CreateMLCEngine } = await import("@mlc-ai/web-llm");
  const engine = (await CreateMLCEngine(PINNED_MODEL_ID, {
    initProgressCallback: (report: { progress: number; text: string }) => {
      onProgress?.(report);
    },
  })) as EngineLike;
  return wrapEngine(engine);
}

function wrapEngine(
  engine: EngineLike,
  onUnload?: () => void,
): LlmEngine {
  const create = engine.chat.completions.create.bind(
    engine.chat.completions,
  ) as CompletionsCreate;

  return {
    ready: true,
    modelId: PINNED_MODEL_ID,
    async chat(messages: ChatMessage[]): Promise<string> {
      const trimmed = trimForCs1k(messages);
      const reply = await withTimeout(
        create({
          messages: trimmed,
          temperature: 0.7,
          max_tokens: 96,
          stream: false,
        }),
        WEBLLM_CHAT_TIMEOUT_MS,
        "Model timed out (cs1k / WebGPU). Try a shorter message or reload.",
      );
      const raw = reply.choices[0]?.message?.content;
      const text = typeof raw === "string" ? raw.trim() : "";
      if (!text) {
        throw new Error("Model returned an empty reply.");
      }
      return text;
    },
    async unload() {
      try {
        await engine.unload?.();
      } finally {
        onUnload?.();
      }
    },
  };
}

export function hasWebGpu(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

export function isCrossOriginIsolated(): boolean {
  return typeof crossOriginIsolated !== "undefined" && crossOriginIsolated;
}

/** Fit prompt + history into ~1k-token MLC build with chat-template overhead. */
function trimForCs1k(messages: ChatMessage[]): ChatMessage[] {
  const system = messages.find((m) => m.role === "system");
  const rest = messages.filter((m) => m.role !== "system");
  const clipped = rest.slice(-4).map((m) => ({
    ...m,
    content: m.content.slice(0, 280),
  }));
  const out: ChatMessage[] = [];
  if (system) {
    out.push({ role: "system", content: system.content.slice(0, 420) });
  }
  out.push(...clipped);
  if (out.length && out[out.length - 1]!.role === "assistant") {
    out.push({ role: "user", content: "[You]: (continue)" });
  }
  return out;
}

function withTimeout<T>(
  p: Promise<T>,
  ms: number,
  message: string,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(message)), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      },
    );
  });
}
