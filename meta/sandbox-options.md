# Sandbox Options Research

Date: 2026-08-02
Scope: options for evolving `/en_US/sandbox/` (and `pt_BR` twin) from a scripted xterm.js mock
into something closer to real Arclength CLI behavior, given the site is a static Astro build
deployed to GitHub Pages with no server of its own.

# Research Log

- Read `en_US/sandbox/index.html` and the built `ArclengthSandbox.astro_astro_type_script_index_0_lang.D7Om-cp5.js`
  (343,036 bytes / ~343 KB) to confirm current state: xterm.js UI, scripted-only responses,
  advertised commands `help`, `version`, `alc --help`. Page copy explicitly disclaims real execution.
- `gh api repos/lgallindo/arclengthcontinuation` — confirmed the upstream fork has **0 releases and
  0 tags**: the project is genuinely pre-release/WIP, which matters for how much investment is
  justified right now.
- WebSearch: "WebContainers StackBlitz license terms 2026 embed third-party site restrictions" —
  found StackBlitz's commercial-plan terms: embedding the WebContainer API on a third-party site
  requires an active **commercial StackBlitz plan**, is capped at **500 sessions/month** under
  that plan, and **production use in a for-profit setting requires a separate WebContainer API
  License**. Also surfaced the cross-origin-isolation (COOP/COEP) requirement.
- WebFetch `https://developer.stackblitz.com/platform/webcontainers/browser-support` — confirmed
  WebContainers embedding is **Chromium-only** (no Firefox/Safari support for third-party embeds),
  and requires SharedArrayBuffer / cross-origin isolation headers on the host page.
- WebFetch `https://webcontainers.io/guides/introduction` — confirms WebContainers are **"Always
  free for Open Source"** projects, with a link out to `stackblitz.com/pricing#webcontainer-api`
  for the non-OSS/commercial terms (matches the ToS finding above). Personal-portfolio use would
  need to qualify as OSS use or otherwise clear licensing with StackBlitz directly.
- WebSearch: "wasmer-js WASI browser run CLI in-browser 2026" — Wasmer now ships `@wasmer/sdk`,
  which runs arbitrary WASI/WASIX packages (Python, Bash, ffmpeg, clang, etc.) client-side by
  fetching `.wasm` + a virtual filesystem from the Wasmer registry. Confirms the pattern is mature,
  but requires the target program to already be (or be compiled to) a WASI binary.
- WebSearch: "bun build --compile WebAssembly wasi target CLI browser 2026" — no evidence Bun
  has a first-class "compile my TS/Node CLI straight to a browser-runnable WASI binary" path.
  General 2026 WASM/WASI state: Wasm 3.0 ratified, WASI Preview 2 stable, but Node-API-heavy /
  native-module-dependent CLIs (which Arclength's bun/esbuild/Gradle build implies) are not
  trivially portable to WASI without significant porting work.
- WebSearch: "E2B pricing free tier sandbox code execution API 2026" — Hobby/free tier: one-time
  $100 credit, ~100 free hours/month equivalent, 1-hour max session length, 20 concurrent
  sandboxes, sub-second boot (p50 ~78ms). Pro tier $150/month for 24h sessions.
- WebSearch: "Daytona pricing free tier dev sandbox API" — $200 free compute credit + 5 GB free
  storage, then per-second billing; AGPL-3.0 self-host option exists too.
- WebSearch: "CodeSandbox SDK pricing 2026 sandboxes API" — Free plan gives unlimited
  sandboxes/devboxes (up to 4 vCPU/8GiB) but SDK usage bills VM credits at $0.01486/credit
  (~$0.0446/vCPU-hr + $0.0149/GiB-hr); Pro at $12/mo includes 100 SDK hours.
- WebSearch: "Judge0 API pricing free tier code execution" — free via RapidAPI Basic (rate
  limited, shared key ~50 req/day) or fully free self-hosted (open source); paid RapidAPI tiers
  or one-click host (Railway etc.) ~$5–20/month. Judge0 is scoped to single-shot
  compile-and-run of program text, not an interactive persistent shell/session.
- WebSearch: "Modal.com pricing free tier serverless functions 2026" — Starter/free plan: $30/mo
  credit, 100 containers, 10 concurrent GPUs (not needed here); CPU ~$0.024/vCPU-hr. Good fit for
  function-style execution, less natural for an interactive PTY/terminal session.
- WebSearch: "Fly.io Machines pricing free allowance 2026" — confirms Fly.io's permanent free
  tier is gone (removed 2024); new accounts get a 2-VM-hour/7-day trial only; cheapest always-on
  shared-cpu-1x machine is ~$1.94–5/month. No meaningful free tier remains for this use case.
- WebSearch: "Cloudflare Workers Containers free tier 2026 run untrusted code sandbox" +
  `cloudflare/sandbox-sdk` — Cloudflare's Containers/Sandbox SDK (GA as of the 2026-04-13
  changelog) requires the **Workers Paid plan**; no free tier for running actual containers.
- WebSearch: "Continue.dev CLI architecture requires API key LLM provider local model network" —
  confirmed the upstream project Arclength is forked from (Continue) is fundamentally a thin
  client that routes prompts to a configured LLM provider (OpenAI/Anthropic/Ollama/local
  OpenAI-compatible endpoint) via API key. This means even a "fully real" CLI execution
  environment still needs a model backend + credentials to do anything interesting — running the
  real binary alone does not remove the need for *some* server-side piece if the demo is meant to
  show actual AI-assisted behavior rather than just CLI plumbing (`--help`, `version`, arg parsing).
- WebSearch: "vhs charmbracelet record terminal session generate script asciinema snapshot testing
  CLI output" — Charm's `vhs` tool scripts terminal sessions from a declarative `.tape` file and
  can render golden `.txt`/`.ascii` transcripts (plus GIF/MP4), and there's a
  `charmbracelet/vhs-action` for regenerating these in CI. Good fit for turning real CLI runs into
  reviewable, versioned transcripts for a smarter static mock.

# Options

## 1. Fully client-side / static-compatible

### 1a. StackBlitz WebContainers
- **What it is**: A full Node.js runtime compiled to run inside the browser via WASM, executed in
  a service worker; supports npm install, real file system, real process spawning — i.e., it could
  plausibly run the actual `bun run build` / esbuild / CLI code paths, not a reimplementation.
- **Cost/complexity**: Free for genuinely open-source use per StackBlitz's docs; otherwise
  commercial embedding requires a paid StackBlitz plan capped at 500 sessions/month, and
  for-profit production use needs a separate WebContainer API License purchased from StackBlitz.
  A personal portfolio site is a gray area — likely fine to request under OSS terms given
  Arclength's copyleft framing, but this needs direct confirmation from StackBlitz, not assumption.
- **Static-compatible?**: Yes for hosting (it's client-side), but the *page itself* must be served
  cross-origin-isolated (COOP/COEP headers). GitHub Pages does not let you set custom response
  headers, so this would likely require either a Cloudflare Workers/Pages proxy in front of GH
  Pages just to inject headers, or moving off GH Pages — i.e., not purely static-compatible in
  practice despite being "client-side."
- **Constraints**: Chromium-only (no Firefox/Safari), heavier bundle/runtime download than xterm.js
  alone, doesn't remove the LLM-backend problem (Continue/Arclington still needs a model API key
  to do anything beyond CLI scaffolding).

### 1b. wasmer-js / `@wasmer/sdk` (WASI in-browser)
- **What it is**: Runs precompiled WASI/WASIX `.wasm` binaries client-side (Python, Bash, clang,
  etc. already exist in the Wasmer registry). To use it for Arclength you'd need to actually
  compile the CLI (or a deliberately reduced subset of it) to a WASI target.
- **Cost/complexity**: Free, no backend, no special headers required (lighter-weight than
  WebContainers). But complexity is high on the "get Arclington to compile to WASI" side: it's a
  bun/TypeScript/Node CLI, likely with native deps and I/O the project itself doesn't control,
  plus a Gradle-built IntelliJ plugin that's irrelevant to a terminal demo anyway. No evidence Bun
  currently has a turnkey "compile TS CLI to WASI" path; this would mean hand-porting a genuinely
  standalone subset (e.g., an argument parser + `--help`/`version` logic) to something WASI-buildable
  (Rust/Zig/AssemblyScript/QuickJS), which is really a rewrite, not a build-target flip.
- **Constraints**: Only as "real" as what you're willing to port; anything touching the actual
  AI-assist behavior still needs network egress to an LLM provider, which WASI's sandboxed model
  either can't do or needs explicit capability wiring — and you're back to needing a backend/key
  for the interesting part of the CLI.

### 1c. Static verdict
Both are technically real "run actual code in the browser" options, but neither is free of new
infrastructure surface (WebContainers needs isolation headers a GH Pages static host can't emit
without a proxy; WASI needs a nontrivial port) or of the deeper problem that "real" Arclington
behavior requires an LLM backend regardless of where the CLI process runs.

## 2. Server-assisted (adds some backend/serverless piece)

| Service | What it is | Free tier | Rough cost beyond free | Fit for this use case |
|---|---|---|---|---|
| **E2B** | Purpose-built AI-agent code sandbox, fast (~sub-second) boot, real Linux VM per session | One-time $100 credit (~100 hrs), 1h max session, 20 concurrent | Pro $150/mo for 24h sessions; ~$0.17/hr for 2vCPU/4GiB | Best-fit shape (ephemeral per-visitor sandbox), but free credit is a *one-time* $100, not recurring — will eventually run out even at low traffic |
| **Daytona** | Dev-environment sandbox platform, per-second billing, AGPL self-host option | $200 free compute + 5GB storage | Pay-as-you-go after; self-host free (own infra cost) | Similar shape to E2B; self-host option is attractive for a low-traffic personal site if willing to run a small always-on box |
| **CodeSandbox SDK** | VM-backed sandboxes, familiar from CodeSandbox's editor product | Free plan: unlimited sandboxes/devboxes up to 4vCPU/8GiB, but SDK execution bills credits | $12/mo Pro = 100 SDK hours; ~$0.045/vCPU-hr pay-as-you-go | Reasonable, but again ongoing metered cost, not a permanent free allowance for programmatic SDK use |
| **Judge0** | Single-shot "compile and run this code" API, not an interactive shell/session | Free via RapidAPI Basic (shared key, ~50 req/day) or free self-host (open source) | ~$5–20/mo if self-hosting on a $5 VPS/Railway, or paid RapidAPI tiers | Wrong shape: built for one-shot code execution (like a LeetCode judge), not a persistent PTY session a terminal emulator expects; self-hosting it is the realistic free path |
| **Modal** | General serverless compute (functions/containers), Python-first | $30/mo free credit, 100 containers | ~$0.024/vCPU-hr CPU-only | Workable as a thin exec-a-command backend, but oriented around function calls, not an interactive terminal; would need custom glue for PTY semantics |
| **Fly.io Machines** | Firecracker micro-VMs, would give closest "real always-on box" feel | **None as of 2026** — permanent free tier removed in 2024; only a 2-VM-hour/7-day trial for new accounts | ~$2–5/mo for one always-on shared-cpu-1x machine | Cheapest "just run a real VM" option in absolute dollars, but has zero free allowance now — it's a small recurring bill, not a free-tier fit |
| **Cloudflare Workers Containers / Sandbox SDK** | Cloudflare's new (GA April 2026) container/sandbox product, callable from Workers | **None** — requires Workers Paid plan | Workers Paid is $5/mo base + usage | Same "small recurring bill" bucket as Fly.io; nice DX (`cloudflare/sandbox-sdk`) if already paying for Workers for other reasons |

**General notes across all of these:**
- All require standing up *some* backend endpoint the static GH Pages site calls out to (a Worker,
  a small proxy, or direct SDK calls with a server-issued short-lived token) — none are a pure
  client-side addition. That backend also becomes the place secrets (LLM API keys, sandbox
  provider API keys) must live, since a static site cannot hold secrets safely.
- None of these free tiers are *permanently* free at zero effort for indefinite time — they're
  either one-time credits (E2B, Daytona) that expire with usage, or metered-with-a-free-allowance
  (CodeSandbox, Modal), or simply not free anymore (Fly.io, Cloudflare). For a low-traffic personal
  site this is almost certainly *fine* in practice (a handful of demo sessions a month won't burn
  $100–200 in credit for a long time), but "fine in practice" is different from "free tier that
  never needs revisiting."
- Even with a real sandboxed Linux VM running the real Arclength CLI, the CLI's actual
  value-add (AI-assisted editing) still needs an LLM provider key. That key would have to live in
  the same backend, which adds a second reason a backend is unavoidable for a genuinely "real"
  demo (not just "real binary, canned/no-key responses").

## 3. Smarter mock (stay static, improve the scripting)

- **What it is**: Keep the current architecture (xterm.js + a scripted response table, no real
  execution, no backend) but make the *content* of the mock richer and easier to keep honest:
  - Generate the canned transcripts from real CLI runs instead of hand-writing them, using a tool
    like Charm's `vhs` (declarative `.tape` scripts → recorded terminal output, including
    plain-text/ascii "golden file" output) run in CI against the actual `arclengthcontinuation`
    checkout whenever it changes.
  - Replace the current flat command-string matcher with a small state machine (prompt state,
    working directory, simple flag parsing) so `alc --help`, `alc <subcommand> --help`, invalid
    flags, etc. all produce plausible, internally consistent output instead of a handful of exact
    string matches.
  - Trim the current ~343KB bundle: much of that size is very likely xterm.js itself plus its
    addons; a scripted-only terminal doesn't need the full xterm feature set (no real PTY, no
    real resize/reflow-heavy content) and could probably be reduced with lazy-loading the addon
    modules only if used, or trimming unused xterm features.
- **Cost/complexity**: Effectively \$0 marginal infra cost — no new services, no secrets, no new
  attack surface. Complexity is "write a small script generator + a slightly less trivial command
  dispatcher," a few hours to a couple of days of work, entirely within the existing Astro/TS
  toolchain.
- **Static-compatible?**: Fully — this is the only option that requires zero new infrastructure.
- **Constraints**: It's still fundamentally fake — no amount of polish makes typed input actually
  reach a real Arclength process. The ceiling here is "very convincing recorded demo," not "live
  tool." Worth being explicit in the page copy about that ceiling (which the current page already
  does, and should keep doing).

# Recommendation

Given: static GH Pages, low-traffic personal portfolio, and — importantly — **Arclington has zero
releases/tags upstream today**, investing in real code execution (WebContainers, WASI porting, or
a paid sandbox backend) is disproportionate to what there currently is to actually demo. There is
no working release binary yet whose real behavior would even be worth exposing, and the CLI's
actual interesting behavior depends on an LLM provider key regardless of where it runs — so
"real execution" doesn't get you to "real demo" without also solving secrets/backend/cost for a
model provider, which is a separate, bigger commitment than the terminal-hosting question alone.

**Ranked by effort-to-value for this specific site, right now:**

1. **Smarter static mock (Option 3) — do this first.** Zero infra cost, zero new secrets, ships
   entirely inside the existing Astro build. Concretely: once Arclington reaches even an early
   working state, script `vhs` (or a simpler custom recorder) to capture real `--help`/`version`/
   basic-subcommand output as golden transcripts, check them into the repo, and regenerate them
   in CI whenever the upstream CLI's output changes — so the "scripted" demo stays truthfully in
   sync with the real CLI's actual text instead of hand-maintained guesses. Add a small state
   machine for prompt/arg handling so it feels less like a fixed lookup table. This directly
   improves credibility of the existing honest "scripted responses only" framing without changing
   its fundamental (static, no execution) nature.
2. **Revisit E2B or self-hosted Daytona once Arclington has an actual release.** If/when there's
   a real build worth letting visitors poke at, a short-lived per-visitor sandbox (E2B's ~100 free
   hours/month, or a self-hosted Daytona instance) paired with a minimal serverless proxy (Cloudflare
   Worker/Pages Function, or a small Fly.io box) is the natural next step — but only worth it once
   there's a released binary and a decision about how to handle (or explicitly not offer) real LLM
   calls, e.g., by capping the demo to non-AI CLI commands (`--help`, `version`, config/plumbing)
   and being explicit that AI features require the user's own API key.
3. **WebContainers — reasonable middle step, but only if the OSS/free-use terms are confirmed
   directly with StackBlitz and the GH Pages header limitation is solved (e.g., via a Cloudflare
   proxy in front of the site).** This gets you real code execution without paying for a sandbox
   VM provider, but it inherits Chromium-only support, added architectural complexity (a proxy
   layer just to set COOP/COEP headers), and still doesn't solve the LLM-key problem — so it should
   rank behind option 2 for effort-to-value despite being nominally "free."
4. **wasmer-js/WASI porting — lowest priority.** The porting effort to get a bun/Node CLI onto a
   WASI target is a rewrite-shaped project, and the payoff (running a hand-ported subset) is
   strictly less compelling than option 2's "run the actual unmodified CLI in a real sandboxed VM."
   Only reconsider if the CLI itself is deliberately re-architected with a WASI-first core.
5. **Fly.io / Cloudflare Containers / Modal / Judge0 as the backend piece** — all viable, but none
   has a compelling *free* story anymore (Fly.io's tier is gone; Cloudflare Containers need Workers
   Paid; Modal and Judge0 are shaped for function-call/one-shot execution rather than an interactive
   terminal session). If option 2 is pursued, E2B or self-hosted Daytona are the better-fitting
   choices specifically because they're built around ephemeral, interactive, per-session sandboxes.

**If the ask is "make it feel more real without much added complexity or cost, starting now"**:
do option 3 only. Wire up (or write a lightweight equivalent of) `vhs`-based transcript generation
against the real `arclengthcontinuation` CLI as soon as it has anything runnable, keep those
transcripts as the source of truth for the scripted responses, and leave the "Scripted responses
only" disclosure exactly as honest as it is today. Reassess server-assisted options once there's
an actual tagged release upstream.
