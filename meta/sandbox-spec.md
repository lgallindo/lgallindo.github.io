# Sandbox Spec — ArclengthContinuation `/sandbox/`

Synthesized from settled context (no re-interview needed — this follows Matt Pocock's
`/to-spec` pattern: distill what's already known into a structured spec rather than
asking more questions). Sources: `meta/sandbox-options.md`, `meta/grill-session/log.md`
(Q5, Q7, Q12), and direct inspection of the live bundle.

## Problem Statement

ArclengthContinuation has no release yet, so there's nothing for a visitor — especially
a non-technical one (Q1/Q5) — to actually install or run. The site needs an honest, safe
way to give a taste of the CLI without executing untrusted code or requiring visitors to
supply an LLM API key.

## Solution

A fully static, scripted mock terminal (`xterm.js`-based) recognizing a fixed, tiny
command set, rejecting everything else, explicitly labeled as "not the real CLI." As of
Q5/Q7, enhanced with a "60-second speedrun" that walks a new visitor through the entire
command set. Per `meta/sandbox-options.md`, this stays the right approach until Arclength
has a real release — real execution (WebContainers/WASI/hosted sandboxes) is
disproportionate effort right now and doesn't solve the LLM-provider-key problem anyway.

## User Stories

- As a non-technical family member, I want to click something and see it respond, without
  installing anything, so I get a feel for what this project does.
- As a technical peer or employer, I want the demo honestly labeled as a mock (not
  oversold as the real thing), so I trust the rest of the site's claims.
- As the site owner, I want the mock's scripted output to stay truthful to the real CLI's
  actual behavior once a release exists, rather than drifting into a hand-maintained
  fiction.

## Implementation Decisions

- **Current command map** (verified directly against the bundled script, not invented):
  `help`, `version`, `alc --help`, `clear`. Everything else returns
  `denied: unknown command '<input>' (try: help)`.
- A blocklist regex (`Ms` in the bundle) rejects shell metacharacters and dangerous binary
  names (`curl`, `wget`, `rm`, `sudo`, `bash`, `;`, `|`, `` ` ``, `$(`, `../`, etc.) —
  defense in depth even though nothing is actually executed.
- Speedrun content lives on `/sandbox/` and `/pt_BR/sandbox/` (Q5/Q7/Q12).
- **Future work, once Arclength reaches a working state upstream:** capture real CLI
  output via a transcript tool (e.g. `vhs`, or a simpler custom recorder), check the
  transcripts into the repo, and regenerate them in CI whenever upstream output changes —
  so the "scripted" demo stays truthfully synced instead of hand-maintained guesses
  (`meta/sandbox-options.md`, Option 3).

## Testing Decisions

- **Not implementable in this checkout.** `lgallindo.github.io` (this repo) is
  deploy-only build output — no `package.json`, no test runner, no source for the
  sandbox script exists here; only the minified bundle
  (`_astro/ArclengthSandbox.astro_astro_type_script_index_0_lang.D7Om-cp5.js`) is
  present. The actual Astro component/script source lives in a separate repo/branch
  (commit bodies reference `feat/astro-mvp-foundation`) not accessible in this session —
  see `PROJECT_RULES.md` / `meta/CONTEXT.md`.
- **Recommended, once that source is reachable:** unit-test the command-parsing/
  blocklist logic directly as a pure function (input → expected output or rejection —
  cheap, deterministic, no DOM/xterm needed), and add a CI smoke test that regenerated
  transcripts match real CLI output once the transcript-generation pipeline above exists.
- **Available now, without source access:** manual verification via the local static
  server and direct inspection of the built bundle's command map — this is how the
  Implementation Decisions section above was actually verified for this spec.

## Out of Scope (for now)

- Real code execution of any kind (WebContainers, WASI, hosted sandboxes) — deferred
  until Arclength has an actual release (`meta/sandbox-options.md`).
- LLM-backed AI features in the demo — would require the visitor's own API key; not
  addressed here.
- Automated CI transcript regeneration — worth planning once there's a real CLI to
  capture from, not before.

## Further Notes

- Full technical option landscape and cost/complexity comparison: `meta/sandbox-options.md`.
- Grilling decisions that shaped this: `meta/grill-session/log.md` (Q5, Q7, Q12).
