# Arclength Sandbox Fidelity Plan

Planning-only document. Nothing outside this file was edited to produce it. It is meant to
be read alongside `meta/sandbox-options.md` (prior cost/tech research) and `meta/sandbox-spec.md`
(current Phase B behavior), and the specs it draws its acceptance criteria from:
`specs/002-arclength-sandbox-b/spec.md` and `specs/003-arclength-real-binary-c/spec.md` on
`origin/feat/astro-mvp-foundation` of this repo.

Sources consulted: local clone `~/code/foss/arclengthcontinuation` (real CLI source, read-only);
`~/code/research/vps` (Ansible provisioning repo, read-only — `arclength-cli.yml`,
`docs/infrastructure/SPEC_20260724T151500Z_ARCLENGTH_CLI.md`,
`docs/agents/REPORT_20260730T102451Z_ARCLENGTH_CROSS_REPO_LEDGER.md`, tail of `SESSION_HANDOFF.md`).
No connection of any kind was made to the live VPS; `vars_secret.yml` was not opened.

---

# Real CLI surface

## The binary is `cn`, not `alc` — today

The single most important fidelity fact: the actual installed entrypoint, as defined in
`extensions/cli/package.json` (`"bin": { "cn": "dist/cn.js" }`) and `extensions/cli/src/index.ts`
(`program.name("cn")`), is **`cn`**, invoked as a Commander.js program. There is no `alc` binary
anywhere in the source tree today.

This isn't necessarily a mistake on the sandbox's part, though — the VPS repo's own cross-repo
ledger (`docs/agents/REPORT_20260730T102451Z_ARCLENGTH_CROSS_REPO_LEDGER.md`, item `V-PEND-004`)
records an **open, not-yet-executed** pending item: *"Align operator naming with the local `alc`
rebrand... Update the VPS command/symlink/docs policy only after the rebranded source is approved
and published."* So `alc` appears to be a planned future rebrand of `cn`, tracked elsewhere, not
yet merged into the fork's source. Until that rebrand actually ships upstream, the sandbox showing
`alc --help` is presenting a name that does not exist in the real CLI yet. This should be called
out explicitly in the sandbox's own copy (see below) rather than silently left as-is or silently
renamed to `cn` without comment — the site owner may already know a rename is coming and want to
stay ahead of it, or may want to switch to `cn` now and revisit when/if `alc` actually ships.

## Actual command surface (from `extensions/cli/src/index.ts`, Commander definitions)

Top-level `cn` (Commander `program`), version string sourced live from `package.json`
(`extensions/cli/src/version.ts` → currently `0.0.0-dev`, i.e. no semver has been cut):

- **`cn [prompt]`** (default/root action) — starts an interactive chat/agent session, or with
  `-p`/`--print` runs headless and prints once. Common options shared across commands
  (`extensions/cli/src/shared-options.ts`): `--config <path>`, `--org <slug>`, `--readonly`
  (plan-mode/read-only tools), `--auto` (all tools allowed), `--verbose`, `--beta-status-tool`,
  `--rule <rule>` (repeatable), `--mcp <slug>` (repeatable, adds an MCP server from the hub),
  `--model <slug>` (repeatable), `--prompt <prompt>` (repeatable), `--allow/--ask/--exclude <tool>`
  (repeatable — the CLI's own tool-permission system), `--agent <slug>`. Root-only additions:
  `--format <format>` (json, headless only), `--silent`, `--resume`, `--fork <sessionId>`,
  `--beta-subagent-tool`.
- **`cn ls`** — list recent chat sessions, `--json` output.
- **`cn setup`** — interactive wizard to configure the LLM provider (writes `~/.continue/config.yaml`).
- **`cn serve [prompt]`** (hidden from `--help`) — starts an HTTP server exposing `/state` and
  `/message` endpoints, `--timeout`, `--port` (default 8000), `--id <storageId>` (uploads session
  snapshots to Arclength-managed storage), `--beta-upload-artifact-tool`.
- **`cn checks [action] [pr-url]`** — shows CI check statuses for a PR; calls a remote API
  (`get`/`post` in `util/apiClient.ts`) and inspects the local git remote to infer owner/repo.
- **`cn review`** — "AI-powered reviews," `--base <ref>`, `--format`, `--fix` (writes fixes back
  to the working tree), `--patch`, `--fail-fast`, `--review-agents <agents...>`, `--verbose`.
  Internally forks worker subprocesses and creates a git worktree
  (`commands/review/worktree.ts`) — this is a **mutating, multi-process, LLM-calling** command,
  not a read-only one.
- **`-v`/`--version`** and unknown-command handling (prints an error + `program.outputHelp()`,
  exits 1) are both wired at the Commander level, so real `cn --help` / `cn --version` /
  `cn nonsense` output is fully deterministic and capturable.

Inside an interactive session, slash commands are a separate surface
(`extensions/cli/src/commands/commands.ts`, `SYSTEM_SLASH_COMMANDS`): `/help`, `/clear`,
`/update`, `/info`, `/model`, `/config`, `/mcp`, `/init`, `/compact`, `/resume`, `/fork`, `/title`,
`/rename`, `/exit`, `/jobs`, `/sessions`, `/skills`, `/import-skill`, `/export`, `/import` — these
only exist once a session is already running (they are not shell argv, they're TUI-internal), so
they are a different fidelity target than the argv-level commands above.

The CLI also embeds a genuine agentic **shell-execution tool**
(`extensions/cli/src/tools/runTerminalCommand.ts`, backed by
`@arclength-continuation/terminal-security`'s `evaluateTerminalCommandSecurity`) that the model
can invoke during a chat/agent session to run arbitrary terminal commands (subject to the
`--allow`/`--ask`/`--exclude`/`--readonly`/`--auto` tool-policy flags). This is the single most
important thing to keep in mind for the direct-call proposal below: **most of what makes `cn`
interesting is exactly the part that must never be exposed to the public**.

## What "AI-assisted development" concretely requires

Per `.env.example` (`CONTINUE_API_KEY`), `cn setup`, and the `~/.continue/config.yaml` schema the
VPS playbook itself writes (`models: [{ provider: openai, model, apiBase, apiKey, roles: [chat,
edit, apply] }]`), every AI-driven code path (`cn` default chat, `cn review`, the terminal-tool
agent loop) needs a **configured model provider** — either a real hosted API key (OpenAI,
Anthropic, etc. — Continue/Arclength is provider-agnostic via an OpenAI-compatible adapter layer,
per `meta/sandbox-options.md`'s prior research) or a local/self-hosted OpenAI-compatible endpoint.
The VPS setup wires the latter: a local `llama-server` at `http://127.0.0.1:38080/v1`. Without a
model configured, `cn`'s AI features simply have nothing to call — `--help`, `--version`, `ls`,
and error/unknown-command paths are the only things that produce meaningful output with **zero**
model configuration.

## Current known-working vs. broken/WIP state

- **No tags, no releases.** (Confirmed previously via `gh api repos/lgallindo/arclengthcontinuation`
  in `meta/sandbox-options.md`.) Version is a placeholder `0.0.0-dev`.
- **GitHub Actions are deliberately disabled** in this fork: `README.md` states workflows were
  moved to `.github/workflows.disabled/workflows/` "until the repository automation policy is
  reviewed," and the working tree confirms this (`.github/workflows.disabled/workflows` exists;
  no active `.github/workflows/`). So there is **no CI signal at all** backing the README's "restore
  a reliable build baseline" claim — that claim is asserted, not automatically verified.
- **This local checkout has no build artifacts.** `extensions/cli/dist/` does not exist and
  `extensions/cli/node_modules/` does not exist in `~/code/foss/arclengthcontinuation` as read for
  this task — i.e., the "verified" build in the README was evidently run on a different machine/
  session (the README's own Gradle command references `/home/lugatj/code/foss/continue/.gradle-home`,
  a different path/host than this checkout), and cannot be independently re-verified from this
  checkout without actually running `npm install && npm run build`, which was out of scope here.
- **The VPS deployment is external, independent evidence that a build does succeed somewhere**,
  though: per `~/code/research/vps`'s own ledger
  (`docs/agents/REPORT_20260730T102451Z_ARCLENGTH_CROSS_REPO_LEDGER.md`, `V-EVID-004`), the VPS's
  `arclength-cli.yml` playbook built the CLI from the pinned Gitea-mirror ref and
  `/usr/local/bin/cn --version` reported `0.0.0-dev` successfully, with a matching build-stamp file
  for provenance. `arclength-cli.yml` (current copy in that repo) now pins a newer ref
  (`e11a55c36178224799db4efb8923df0c4cf1db0f`, matching this local checkout's current
  `git log` HEAD area) than the ledger's evidence snapshot (`04f0db4dd8...`), so the "last verified
  build" and "current pinned ref" are not guaranteed to be the same commit at any given moment —
  another reason not to assume "the README says baseline restored" implies "the exact commit this
  demo would reference definitely builds clean" without re-checking at demo-build time.
- **`binary/` is a separate, older subsystem, not evidence of a fresh CLI build.** It packages
  `core` into a standalone executable via `esbuild` + `pkg` for IDE-embedded use (VS Code/IntelliJ's
  "Core Binary," per `binary/README.md`), unrelated to the `extensions/cli` Commander program.
  Its recent mtimes (package.json + all six `pkgJson/<platform>/package.json` touched within the
  last day, other files touched ~12 hours before that) look like routine per-platform metadata
  edits, not a full rebuild — there's no build output (`bin/`, `out/`) present in this checkout to
  suggest an actual binary was produced recently.
- **Net assessment**: the CLI's plumbing (`--help`, `--version`, argument parsing, unknown-command
  handling, `ls`) is simple, deterministic Commander.js code with no external dependencies — very
  safe to treat as "known-working" for mock-fidelity purposes. Anything that touches the model
  provider (default chat, `review`, the terminal tool, `serve`) is WIP/unreleased/unverifiable from
  a static site's perspective and should not be assumed stable.

---

# Improving the sandbox mock's fidelity

Recommendation ordering follows `meta/sandbox-options.md`'s existing conclusion (smarter static
mock first) — this section only refines *which* commands and *how*, since real source is now
available to ground it in verbatim CLI output instead of hand-written guesses.

## Add to the scripted allowlist (safe, deterministic, zero side effects)

1. **`cn --help` (and keep `alc --help` as an aliased/rebrand-aware entry, see below).** The root
   `program` description and full option list in `extensions/cli/src/index.ts` is fully static
   text — capture it verbatim once real `npm install && npm run build` succeeds on a maintained
   machine (not blocked on a release; only needs a clean local build), e.g. via a small transcript
   script (`node dist/cn.js --help > golden/cn-help.txt`) or the `vhs`-based approach already
   recommended in `meta/sandbox-options.md`.
2. **`cn --version` / `cn -v`** — trivially reads `package.json`, no network, no model. Real
   output today would be `0.0.0-dev`; call this out in the sandbox's own copy as "current
   pre-release version string, will change" rather than presenting it as a stable version number.
3. **`cn ls` (empty-state only)** — with no `~/.continue` session history, this should print a
   deterministic "no sessions found" message. Verify by running it in a clean-home sandbox during
   transcript capture. Do **not** try to fake a populated session list — that's fabricating state
   that doesn't exist for any real anonymous user, which cuts against the "honest mock" principle
   spec 002 explicitly sets (FR-002/FR-003, and the site's own "scripted responses only, not the
   real CLI" disclosure per `meta/sandbox-spec.md`).
4. **Unknown-subcommand / bad-flag error paths** — `program.on("command:*", ...)` and Commander's
   own flag-validation errors are deterministic text worth capturing verbatim (e.g. `cn frobnicate`
   → `Error: Unknown command 'frobnicate'` + full help dump). This directly improves the existing
   "denied: unknown command" flow by making it match what a real unrecognized `cn` subcommand
   looks like, rather than the sandbox's own separate deny-message wording.
5. **`cn setup --help`, `cn ls --help`, `cn review --help`, `cn checks --help`, `cn serve --help`**
   (Commander auto-generates a `--help` for every subcommand) — all static text, all safe, and
   collectively give a visitor a much fuller sense of the CLI's real shape than the current
   flat `alc --help` single-page summary.

## Naming discrepancy — decide and document explicitly

Given `V-PEND-004` shows a real, tracked, *unshipped* `cn` → `alc` rebrand plan: either (a) switch
the mock to `cn` now, with a one-line footnote like *"the CLI may be renamed to `alc` in a future
release — this demo tracks its current name"*, or (b) keep `alc` as a forward-looking alias but
make the mock explicit that it's simulating an announced-but-not-yet-shipped name, and keep a
`cn` alias recognized too. Do not present `alc` as if it's the CLI's real, current name without a
caveat — that's the one place today's mock could actively mislead a visitor who goes looking for
`alc` in the real repo and finds nothing.

## Keep out of the scripted allowlist (need real state/config/API keys to mean anything)

- **Default chat / any prompt-taking invocation (`cn "..."`, `cn -p "..."`)** — meaningless without
  a configured model provider; scripting a fake AI response would misrepresent the product as
  working today when it structurally cannot without secrets no static site should hold.
- **`cn review`** — mutates a git worktree, forks worker processes, needs a real diff and a real
  model. Not representable as a static transcript without fabricating an entire fake repo diff and
  fake AI review comments, which is fabrication, not fidelity.
- **`cn checks <pr-url>`** — calls a live remote API and depends on a real git remote/PR existing.
- **`cn serve`** — starts a long-lived HTTP server; conceptually the wrong shape for a scripted,
  one-shot terminal reply anyway, and it's marked `hidden` in the real CLI's own `--help`, so a
  faithful mock arguably shouldn't advertise it either.
- **`cn setup` (interactive flow beyond showing its `--help`)** — an interactive wizard that writes
  local config; the *shape* of its prompts could be documented in the mock's help text, but running
  it end-to-end isn't a one-shot command/response pair the current scripted terminal model supports.

## Mechanics recommendation (reaffirming/extending `meta/sandbox-options.md` Option 3)

- Generate golden transcripts from a **real local build** of `extensions/cli` (this is unblocked
  today — a clean build doesn't require a tagged release, just `npm install && npm run build`
  succeeding, which is exactly what the VPS's own `arclength-cli.yml` already automates and
  verifies as a template to imitate locally/in CI).
- Store transcripts as checked-in fixtures (plain text), regenerate in CI whenever
  `extensions/cli` source changes, and diff-review regenerated output before it lands — this
  keeps the mock's "scripted responses only" framing honest and up to date rather than a
  hand-maintained fiction, exactly as `meta/sandbox-spec.md`'s "Future work" section already
  anticipates.
- Extend the scripted matcher from flat string equality to a small dispatcher keyed on
  `argv[0]` + flags (mirroring Commander's own subcommand/flag shape), so `cn <subcommand>
  --help` for each of the five real subcommands above can share one code path instead of five
  hand-copied special cases.

---

# Direct-call proposal (Phase C groundwork, NOT implementation)

This section is explicitly **not** an implementation plan. Spec `003-arclength-real-binary-c` is
still "Plan only — no implementation in this train," and nothing here changes that. This is
groundwork to make a *future*, formally-advanced version of spec 003 easier to write and easier to
get right, given what's now known about the real CLI and the real VPS.

## Grounding in spec 003's own threat model + acceptance criteria

Spec 003 already anticipates this exact ask and recommends **C2 — a remote isolated runner behind
auth** as the eventual real-execution path, explicitly *not* the Pages site itself (Pages "remains
static; runner is a separate deployable with its own repo/service"). Its threat model already
names the risks that matter most here: unauthenticated public RCE, crypto mining/zip bombs,
data exfiltration, and prompt injection into agent features (mitigation: "disable model providers
in the sandbox image"). Its acceptance criteria require, among other things: an allowlist of argv
with no shell metacharacters and no `sudo`; the sandbox UI clearly labeling demo-vs-live; and a
separate deployable runner, not the static site.

## What already exists that a real runner could stand on

`~/code/research/vps`'s `arclength-cli.yml` already builds `cn` from a pinned source ref against a
local Gitea mirror and wires it to a local, non-model-provider-agnostic llama-server
(`http://127.0.0.1:38080/v1`, currently Qwen2.5-Coder 7B per the ledger). That is real
infrastructure doing real, unattended CLI builds today — but it was built for a **self-hosting
research loop** (`cn` editing/rebuilding/reinstalling itself), governed by that repo's own
`AGENTS.md`/`PROJECT_RULES.md`, not for public-facing demo traffic. Nothing about it was designed
with "answer requests from anonymous website visitors" as a goal, and its own spec
(`docs/infrastructure/SPEC_20260724T151500Z_ARCLENGTH_CLI.md`) explicitly scopes "model quality"
and "llama-server deployment" as out of scope for that document — i.e., even the VPS's own docs
don't yet treat this as a hardened public-facing service.

## Proposed safe/unsafe split (for a future runner, if/when one is built)

**Could plausibly be exposed as real, direct, rate-limited, non-mutating calls** — all argv-only,
no model provider involved, no filesystem/network side effects beyond reading the CLI's own
static `package.json`/help strings:

- `cn --help` (and per-subcommand `--help`: `cn ls --help`, `cn setup --help`, `cn review --help`,
  `cn checks --help`, `cn serve --help`)
- `cn --version` / `cn -v`
- Deliberately-invalid/unknown-command invocations, to show the real error path

These are the same set already recommended for the *scripted* mock above. If a real runner exists,
the incremental step of routing exactly these argv strings to it (still behind the runner's own
allowlist enforcement, resource caps, and no-egress network policy) is low-risk specifically
*because* they cannot invoke a model, write files, or reach the network regardless of what the
runner's isolation does or doesn't catch — they're safe by construction in the CLI's own code
(pure `Commander` help/version output), not merely safe because a policy says so. That said, "low
risk" is not "zero setup cost" — it still requires the full C2 runner (isolated execution, argv
allowlist enforcement, rate limiting, resource/time caps, egress denial, ephemeral/disposable
filesystem, auth or signed ephemeral tokens per spec 003's own acceptance criteria) to exist first;
none of that exists yet.

**Must never be exposed as direct calls**, for a live/real-binary path, regardless of how much
runner isolation exists:

- Anything that reaches the default chat/agent path, `cn review`, or any flag that enables tool use
  (`--auto`, `--allow <tool>`) — these can invoke the model **and** the CLI's own
  `runTerminalCommand` agentic shell-execution tool. That combination is precisely the
  "unauthenticated public RCE" and "prompt injection into agent features" risks spec 003's threat
  model names directly; spec 003's own mitigation is "disable model providers in the sandbox
  image" — full stop, not "allow them cautiously."
  - Even with a model provider technically reachable to the runner (as the VPS's llama-server is),
    exposing that path to public sandbox traffic is a different, much bigger decision than
    exposing help/version text, and should be treated as fully out of scope until spec 003 says
    otherwise in an approved implementation spec.
- `cn checks` — hits a remote API and requires a real git remote/PR context that has nothing to do
  with a demo visitor's session.
- `cn serve` — starts a persistent HTTP listener; wrong shape for a request/response demo and
  already hidden in the CLI's own `--help`.
- `cn setup` — writes local config; not idempotent/safe to run repeatedly per-visitor without
  per-session filesystem isolation that doesn't exist yet.
- Anything targeting the VPS's actual `/opt/arclength` checkout, Gitea mirror, or llama-server
  directly — per spec 003, a real runner must be "a separate deployable with its own repo/service,"
  not a hole punched through to the existing self-hosting-research VPS. Piggybacking public demo
  traffic onto infrastructure built for a different, already-sensitive purpose (self-editing loop
  research on a machine that also hosts private Gitea repos) multiplies blast radius for no
  benefit — a dedicated, disposable runner is cheap by comparison and was already spec 003's
  recommendation before any of the VPS-specific context below existed.

## Why extra caution is warranted right now, specifically

`~/code/research/vps/SESSION_HANDOFF.md` documents a real compromise on this VPS, discovered
2026-08-02 and remediated 2026-08-03, shortly before this research: an externally self-registered
Gitea account abused Gitea's `diffpatch` API to plant a malicious git hook, which ran a
cryptominer for an extended, undetected period (3+ days, ~194 exploit-attempt repos, 1761 matching
log lines — "a long-running automated mass-scan, not a targeted attack"). The compromise escalated
to **admin-level access** on the Gitea application (60 attacker accounts found, 2 with `is_admin=1`
written directly via the RCE-enabled DB access), with real private repositories in the blast-radius
window, and the attacker's RCE context had read access to the Gitea admin/MCP API token and the
full `gitea.db` (password hashes). Remediation as recorded is real and reasonably thorough (miner
processes killed, self-registration disabled, all 60 attacker accounts purged, tokens rotated,
monitoring hardened with new load/CPU alerting) — but the handoff itself flags that a **Phase 2
exposure audit (P-14 through P-18) of what the escalated access actually touched has not started
yet, "by design (one item at a time)."** Several other pending items remain open too (Telegram
alert delivery not yet live pending operator setup; `SECRET_KEY`/`INTERNAL_TOKEN` rotation in
`app.ini` deferred as low-urgency; a separate credential-fragment incident from 2026-07-30/31
referenced but not itself detailed here).

None of this means the specific `cn`/llama-server setup was touched — the documented compromise
path was the Gitea container specifically, and the `arclength-cli.yml` playbook builds from a
*local* Gitea mirror on the same host, which is adjacent infrastructure, not proven-uninvolved
infrastructure. That distinction matters and should not be blurred in either direction: don't
claim the CLI/llama path was compromised (no evidence of that), and don't claim it's definitely
clean either (the Phase 2 audit that would establish that hasn't run). The honest position is: this
host had a real, admin-level application compromise very recently, its full blast radius is not
yet fully audited, and its remediation checklist has open items. That is not a host to route public
website traffic through yet, for *any* command, even a supposedly harmless one — a compromised-then-
remediated host's isolation guarantees are exactly the kind of thing spec 003's threat model assumes
should already be solid before exposing anything, and right now that assumption doesn't hold here.

## What actually wiring any of this up would require (explicitly not being done here)

1. **Operator sign-off**, made with full awareness of the VPS's recent compromise and its still-open
   Phase 2 audit / remediation items above — not a default "spec 003 said C2 eventually" assumption.
2. **The VPS's own governance process** — its `AGENTS.md`/`PROJECT_RULES.md` govern what runs on
   that host and how; a public-facing demo runner is a new category of workload for infrastructure
   currently scoped around self-hosting research, and should go through whatever review process
   those documents require for a new service, not be added ad hoc to `arclength-cli.yml`.
3. **Spec 003 formally advanced from ADR to an implementation spec** — including a concrete plan
   step, task breakdown, and its own acceptance tests (per spec 003's Acceptance criteria #1:
   "Spec `003` → plan → tasks before code") — before any runner, isolated or not, is built.

This document does none of the above. It only narrows *which* commands would be worth considering
safe, and *why the current VPS specifically is not ready to host that consideration yet*.

---

# Open questions for the site owner

1. **Naming**: switch the sandbox from `alc` to `cn` now (matching the real, current binary name),
   keep `alc` with an explicit "planned rebrand, not yet shipped" caveat, or support both as
   aliases? This is a copy/labeling decision only the site owner can make, since it depends on how
   confident they are the `alc` rebrand (tracked as open in the VPS ledger, `V-PEND-004`) will
   actually ship, and on what messaging they want for the transition period.
2. **Scope of "direct calls"**: does "let the sandbox make SOME real/direct calls" mean *only*
   `--help`/`--version`-class output (this document's recommendation), or is there an appetite for
   something closer to real interactive chat behind the visitor supplying their own API key (a
   materially bigger, different feature with its own separate threat model around key handling)?
3. **Comfort with the recently-compromised VPS specifically**: given the not-fully-audited blast
   radius and open Phase 2 items, is the site owner comfortable with *any* real command — even a
   read-only, argv-only one — touching that host at all in the near term, or would they prefer a
   freshly-provisioned, purpose-built, disposable runner instead (as spec 003 already recommends
   architecturally, independent of the compromise)? This is fundamentally a risk-tolerance decision,
   not a technical one.
4. **Timeline / trigger condition**: should real-binary work wait for an actual tagged
   `arclengthcontinuation` release (as `meta/sandbox-options.md` originally recommended), or is
   demonstrating pre-release/WIP behavior acceptable for this site's purposes? Relatedly: should
   the `cn`/`alc` naming question above be resolved before or independently of this decision?
5. **Ownership of the "smarter mock" pipeline**: is generating golden transcripts from a real local
   `extensions/cli` build (this document's Phase 2 recommendation) something to do now — since it
   requires no VPS involvement and no release — or should it wait for the naming decision to avoid
   capturing transcripts under a name that might change shortly after?
