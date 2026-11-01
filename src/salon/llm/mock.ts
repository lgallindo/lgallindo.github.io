import type { ChatMessage, LlmEngine, ProgressFn } from "./webllm";

/** Deterministic in-browser stub for Playwright / no-WebGPU demos. */
export async function createMockLlmEngine(
  onProgress?: ProgressFn,
): Promise<LlmEngine> {
  onProgress?.({ progress: 0.3, text: "Mock engine warming…" });
  await delay(50);
  onProgress?.({ progress: 1, text: "Mock engine ready." });

  return {
    ready: true,
    modelId: "mock-salon-llm",
    async chat(messages: ChatMessage[]): Promise<string> {
      const last = [...messages].reverse().find((m) => m.role !== "system");
      const userish = last?.content ?? "";
      const crosstalk = messages.some(
        (m) =>
          m.role === "system" &&
          m.content.includes("Crosstalk turn"),
      );
      if (crosstalk) {
        // Alternate pass / short line so E2E can see both behaviors.
        if (/PASS_PLEASE/i.test(userish)) return "PASS";
        return "A brief aside across the table.";
      }
      const nameMatch = userish.match(/\[([^\]]+)\]:\s*(.*)$/s);
      const body = nameMatch?.[2] ?? userish.replace(/^\[You\]:\s*/i, "");
      return `Heard you: ${body.slice(0, 120) || "…"}`;
    },
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export function wantsMockLlm(): boolean {
  if (typeof location === "undefined") return false;
  const q = new URLSearchParams(location.search);
  return q.get("mock") === "1" || q.get("mockLlm") === "1";
}
