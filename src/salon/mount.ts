import { PINNED_MODEL_ID, PERSONAS, type PersonaId } from "./data/personas";
import { createSession, postGreeting, type SalonSession } from "./engine/session";
import { handleUserMessage } from "./engine/turn";
import { createMockLlmEngine, wantsMockLlm } from "./llm/mock";
import {
  createWebLlmEngineAuto,
  hasWebGpu,
  isCrossOriginIsolated,
  type LlmEngine,
} from "./llm/webllm";

type GatePhase = "coi" | "model" | "degrade" | "done";

/**
 * Mount salon as a chatroom: cast column + transcript (top) + composer (bottom).
 * Query `?mock=1` skips WebGPU and uses a deterministic stub LLM (E2E).
 */
export function mountSalon(root: HTMLElement): void {
  const session = createSession();
  let engine: LlmEngine | null = null;
  let busy = false;
  let gatePhase: GatePhase = "coi";
  let progressText = "Preparing secure browser memory…";
  let progressPct = 0;
  let greeted = false;
  const useMock = wantsMockLlm();

  root.innerHTML = "";
  root.classList.add("salon-root");

  /* ---- persistent shell (avoid wiping composer every render) ---- */
  const gate = el("div", "salon-gate", root);
  gate.setAttribute("role", "dialog");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "salon-gate-title");

  const gatePanel = el("div", "salon-gate__panel tui-panel", gate);
  const gateTitle = el("h1", "salon-gate__title", gatePanel);
  gateTitle.id = "salon-gate-title";
  gateTitle.textContent = "Salon / loading";
  const gateStatus = el("p", "salon-gate__status", gatePanel);
  const gateBar = el("div", "salon-gate__bar", gatePanel);
  gateBar.setAttribute("role", "progressbar");
  const gateFill = el("div", "salon-gate__bar-fill", gateBar);
  const gateMeta = el("p", "salon-gate__meta", gatePanel);
  gateMeta.textContent = useMock
    ? "Engine: mock (E2E / ?mock=1)"
    : `Model: ${PINNED_MODEL_ID}`;
  const gateWarn = el("p", "salon-gate__warn", gatePanel);
  gateWarn.hidden = true;
  const gateContinue = el("button", "salon-gate__btn", gatePanel) as HTMLButtonElement;
  gateContinue.type = "button";
  gateContinue.textContent = "Continue with hooks only";
  gateContinue.hidden = true;
  gateContinue.addEventListener("click", () => revealRoom(true));

  // Gate chat: log ABOVE side composer (chatroom order)
  const gateLog = el("div", "salon-gate__log salon-transcript", gatePanel);
  gateLog.setAttribute("aria-live", "polite");
  const gateForm = el("form", "salon-gate__side salon-composer", gatePanel) as HTMLFormElement;
  const gateLabel = el("label", "", gateForm);
  gateLabel.htmlFor = "salon-gate-input";
  gateLabel.textContent = "Hooks path while loading (hard hooks & name entrances):";
  const gateInput = el("textarea", "salon-input", gateForm) as HTMLTextAreaElement;
  gateInput.id = "salon-gate-input";
  gateInput.rows = 2;
  gateInput.placeholder = "e.g. alegria armada / mention Kropotkin…";
  const gateSend = el("button", "salon-gate__btn", gateForm) as HTMLButtonElement;
  gateSend.type = "submit";
  gateSend.textContent = "Send (hooks path)";
  gateForm.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const v = gateInput.value;
    gateInput.value = "";
    if (!greeted) {
      postGreeting(session);
      greeted = true;
    }
    await handleUserMessage(session, v, null, {
      onUpdate: paint,
      onWarning: (m) => {
        session.warningBanner = m;
        paint();
      },
    });
    paint();
  });

  const room = el("div", "salon-room", root);
  room.hidden = true;
  room.setAttribute("data-salon-room", "");

  const cast = el("aside", "salon-cast", room);
  cast.setAttribute("aria-label", "Present cast");
  el("h2", "salon-cast__title", cast).textContent = "Present";
  const castList = el("ul", "salon-cast__list", cast);

  const chat = el("div", "salon-chat", room);
  const banners = el("div", "salon-banners", chat);
  const transcript = el("div", "salon-transcript", chat);
  transcript.setAttribute("aria-live", "polite");
  transcript.setAttribute("data-salon-transcript", "");

  const form = el("form", "salon-composer", chat) as HTMLFormElement;
  form.setAttribute("data-salon-composer", "");
  const label = el("label", "visually-hidden", form);
  label.htmlFor = "salon-input";
  label.textContent = "Message";
  const input = el("textarea", "salon-input", form) as HTMLTextAreaElement;
  input.id = "salon-input";
  input.rows = 3;
  input.placeholder = "Speak to the salon…";
  const send = el("button", "salon-send", form) as HTMLButtonElement;
  send.type = "submit";
  send.textContent = "Send";

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (busy) return;
    const v = input.value;
    input.value = "";
    busy = true;
    session.warningBanner =
      session.mode === "ready" ? "Thinking… (WebLLM may take a while)" : null;
    paint();
    try {
      await handleUserMessage(session, v, engine, {
        onUpdate: paint,
        onWarning: (m) => {
          session.warningBanner = m;
        },
      });
      if (session.warningBanner?.startsWith("Thinking…")) {
        session.warningBanner = null;
      }
    } catch (err) {
      session.errorBanner =
        err instanceof Error ? err.message : "Unexpected salon error.";
    } finally {
      busy = false;
      if (session.warningBanner?.startsWith("Thinking…")) {
        session.warningBanner = null;
      }
      paint();
      input.focus();
    }
  });

  function revealRoom(hooksOnly: boolean): void {
    session.mode = hooksOnly ? "hooks_only" : "ready";
    gatePhase = "done";
    gate.hidden = true;
    room.hidden = false;
    if (!greeted) {
      postGreeting(session);
      greeted = true;
    }
    paint();
    input.focus();
  }

  function paint(): void {
    // Gate chrome
    if (gatePhase === "done") {
      gate.hidden = true;
    } else {
      gate.hidden = false;
      gateStatus.textContent = progressText;
      gateBar.setAttribute(
        "aria-valuenow",
        String(Math.round(progressPct * 100)),
      );
      gateFill.style.width = `${Math.round(progressPct * 100)}%`;
      const degrading = gatePhase === "degrade";
      gateWarn.hidden = !degrading;
      gateContinue.hidden = !degrading;
      if (degrading) {
        gateWarn.textContent =
          "WebGPU or cross-origin isolation unavailable. Continue with greeter + hard hooks only (no in-browser LLM).";
      }
      paintLines(gateLog, session);
    }

    if (room.hidden) return;

    // Cast
    castList.innerHTML = "";
    for (const id of session.joinOrder) {
      if (!session.present.has(id)) continue;
      const li = el("li", "salon-cast__item", castList);
      if (session.litSpeaker === id) li.classList.add("salon-cast__item--lit");
      li.textContent = PERSONAS[id as PersonaId].displayName;
    }

    // Banners
    banners.innerHTML = "";
    if (session.errorBanner) {
      const err = el("p", "salon-banner salon-banner--error", banners);
      err.setAttribute("role", "alert");
      err.textContent = session.errorBanner;
    }
    if (session.warningBanner) {
      const w = el("p", "salon-banner salon-banner--warn", banners);
      w.textContent = session.warningBanner;
    }
    if (session.mode === "hooks_only") {
      const note = el("p", "salon-banner salon-banner--info", banners);
      note.textContent =
        "Hooks-only mode — WebLLM off. Ordinary chat will not get an LLM reply.";
    }

    paintLines(transcript, session);
    transcript.scrollTop = transcript.scrollHeight;

    input.disabled = busy;
    send.disabled = busy;
    send.textContent = busy ? "…" : "Send";
    input.placeholder =
      session.mode === "ready"
        ? "Speak to the salon…"
        : "Hard hooks & mentions only (LLM off)…";
  }

  async function boot(): Promise<void> {
    paint();

    if (useMock) {
      gatePhase = "model";
      progressText = "Loading mock engine…";
      progressPct = 0.2;
      paint();
      engine = await createMockLlmEngine((r) => {
        progressPct = Math.max(0.2, Math.min(0.99, r.progress));
        progressText = r.text;
        paint();
      });
      progressPct = 1;
      progressText = "Ready (mock).";
      paint();
      revealRoom(false);
      return;
    }

    if (!isCrossOriginIsolated()) {
      progressText =
        "Waiting for cross-origin isolation (page may reload once)…";
      progressPct = 0.05;
      paint();
      const reloaded =
        typeof sessionStorage !== "undefined" &&
        Boolean(sessionStorage.getItem("coiReloadedBySelf"));
      let isolated = false;
      for (let i = 0; i < 25; i++) {
        await sleep(200);
        if (isCrossOriginIsolated()) {
          isolated = true;
          break;
        }
      }
      if (!isolated) {
        const swOk =
          typeof navigator !== "undefined" && "serviceWorker" in navigator;
        if (!reloaded && swOk && window.isSecureContext) {
          progressText =
            "Registering isolation worker — if this stalls, hard-reload the page.";
          paint();
          await sleep(2500);
          if (isCrossOriginIsolated()) isolated = true;
        }
        if (!isolated && !isCrossOriginIsolated()) {
          gatePhase = "degrade";
          progressText = "Isolation not available on this browser/context.";
          progressPct = 0;
          paint();
          return;
        }
      }
    }

    if (!hasWebGpu()) {
      gatePhase = "degrade";
      progressText = "WebGPU not detected.";
      progressPct = 0;
      paint();
      return;
    }

    gatePhase = "model";
    progressText = "Downloading / loading model…";
    progressPct = 0.1;
    paint();

    try {
      engine = await createWebLlmEngineAuto((report) => {
        progressPct = Math.max(0.1, Math.min(0.99, report.progress));
        progressText = report.text || "Loading model…";
        paint();
      });
      progressPct = 1;
      progressText = "Ready.";
      paint();
      revealRoom(false);
    } catch (err) {
      gatePhase = "degrade";
      progressText =
        err instanceof Error
          ? `Model load failed: ${err.message}`
          : "Model load failed.";
      progressPct = 0;
      paint();
    }
  }

  void boot();
}

function paintLines(host: HTMLElement, session: SalonSession): void {
  host.innerHTML = "";
  for (const line of session.transcript) {
    if (line.passBeat) {
      const beat = el("p", "salon-line salon-line--pass", host);
      beat.textContent = "·";
      beat.title = "pass";
      continue;
    }
    const p = el(
      "p",
      line.kind === "crosstalk"
        ? "salon-line salon-line--crosstalk"
        : "salon-line salon-line--primary",
      host,
    );
    const who = el("span", "salon-line__who", p);
    who.textContent = `[${line.displayName}]`;
    p.appendChild(document.createTextNode(" " + line.text));
  }
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  parent?: HTMLElement,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  parent?.appendChild(node);
  return node;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export type { SalonSession };
