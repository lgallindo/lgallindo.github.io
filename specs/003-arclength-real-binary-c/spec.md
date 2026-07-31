# Feature Specification / ADR: Real Arclength Binary (Phase C)

**Feature Branch**: plan-only (`specs/003-arclength-real-binary-c`)

**Created**: 2026-07-31

**Status**: Plan only — no implementation in this train

**Input**: Path to a real restricted Arclength binary in or beside the Pages sandbox.

## Context

Phase B ships a **scripted** xterm UI on static GitHub Pages. Phase C asks how to run a **real** CLI under hard restrictions.

Pages constraints: static hosting, no long-lived Node process on `*.github.io`, limited compute, public internet exposure.

## Options

| ID | Approach | Pros | Cons |
| :--- | :--- | :--- | :--- |
| C1 | **WASM / WASI build** of a slimmed `alc` | Runs client-side; no server | CLI today is Node/Bun + native deps; large effort; incomplete surface |
| C2 | **Remote isolated runner** (Fly/Cloud Run/Firecracker) behind auth | Real binary; resource limits | Needs backend, auth, abuse budget; not pure Pages |
| C3 | **WebContainer / browser Node polyfill** | Familiar JS ecosystem | Heavy; license/ops; still not the shipped JVM/Gradle plugin stack |
| C4 | **Keep scripted + deep-link to local install** | Honest; already Phase B | Not “running” Arclength |

## Recommendation (v1)

**C2 for “real binary”, with C4 remaining the default public UX until the runner exists.**

Rationale: ArclengthContinuation is a multi-runtime monorepo (CLI + VS Code + IntelliJ). A faithful “restricted sandbox” needs a **server-side** allowlisted process with CPU/memory/time caps, no egress (or allowlisted egress), and disposable FS. WASM (C1) is a later research track for a **subset** of the CLI only.

## Threat model (sketch)

- Unauthenticated public RCE → require login or signed ephemeral tokens.
- Crypto mining / zip bombs → cgroup + wall clock + FS quota.
- Data exfiltration → deny network by default; no secrets in the image.
- Prompt injection into agent features → disable model providers in the sandbox image.

## Acceptance criteria (when implementing)

1. Spec `003` → plan → tasks before code.
2. Sandbox UI detects “demo” vs “live runner” and labels clearly.
3. Allowlist of argv; no shell metacharacters; no `sudo`.
4. Pages remains static; runner is a separate deployable with its own repo/service.
5. Local E2E against a mock runner; live E2E only in staging.

## Non-goals now

- Implementing the runner.
- Deploying Phase B sandbox to `master` (awaits explicit go-ahead).
- Overwriting ArcLength LFS banners from Pages work.
