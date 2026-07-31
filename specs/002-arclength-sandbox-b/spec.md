# Feature Specification: Arclength Sandbox Phase B

**Feature Branch**: `feat/astro-mvp-foundation`

**Created**: 2026-07-31

**Status**: Active — local validate only (no Pages deploy)

**Input**: Minimal restricted web terminal with Arclength-shaped scripted responses.

## User Stories

### US1 - Open sandbox (P1)

Visitor opens `/en_US/sandbox/` (and PT equivalent) and sees a terminal panel.

### US2 - Allowlisted commands (P1)

Typing `help`, `version`, or `alc --help` prints scripted output. Unknown or unsafe input is rejected with a fixed deny message.

### US3 - No real binary (P1)

No network calls from the toy; no shell execution; no Node/WASM binary in v1.

## Requirements

- FR-001: Client-only xterm sandbox island.
- FR-002: Allowlist: `help`, `version`, `alc --help`, `clear`, empty.
- FR-003: Deny patterns: `;`, `|`, `\``, `$()`, `../`, `curl`, `wget`, `rm`, `sudo`.
- FR-004: Linked from project page; not deployed to `master` until explicit approval.
