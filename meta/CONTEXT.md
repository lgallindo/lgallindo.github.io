# Context — lgallindo.github.io

Living glossary and condensed settled-decision reference for the personal-site
development effort. This is the `grill-with-docs`-style companion to
`grill-session/log.md` (full chronological Q&A + rationale) and `grill-session/plan.md`
(methodology + phase map + status) — read those for detail; this file is the short,
current-state summary.

## Glossary

- **Grilling session** — the structured one-question-at-a-time discovery interview
  described in `grill-session/plan.md`; methodology adopted from Matt Pocock's
  `grilling` skill (see `grill-session/research/matt-pocock-skills.md`).
- **Speedrun** — the 4-command guided sequence (`help` / `version` / `alc --help` /
  `clear`) on `/sandbox/`, matching the sandbox's real, tiny scripted command set exactly
  (verified directly against the bundled script, not invented).
- **Colophon** — the planned neutral `/about/` page: site/stack/license/tooling info
  only, never biographical. Deferred until a third project exists.
- **Stealth** — the site's current publicity status: nothing has been shared or
  announced externally yet, so URL/IA changes carry no inbound-link risk.
- **Teaser / spoiler** — a minimal, name-plus-one-abstract-line preview of an unreleased
  project shown on the home page, distinct from a full project card.

## Settled decisions (condensed — see `log.md` for the full Q&A and rationale)

1. **Audience & tone:** three audiences (anarchist friends, employers, family). No
   explicit anarchism/employment mention anywhere in copy, ever, not even subtext
   (subtext allowed only within code). No personal-branding/resume language.
2. **Page structure:** every project page is single-track, progressive disclosure —
   plain-language blurb, then full technical depth, same page.
3. **`/about/`:** becomes a colophon, deferred until 3 projects exist on the site.
4. **Nav/IA:** each project gets its own URL; `/projects/` becomes an index; home page
   keeps its own curated list, separate from the index.
5. **Zero-release WIP content:** family-facing blurb points to `/sandbox/`, honestly
   labeled as a scripted preview, with a real "speedrun" of its actual command set.
6. **Home vs. index:** deliberately different — home currently = ArclengthContinuation
   (full) + l'homme révolté teaser (minimal spoiler, project not yet onboarded).
7. **Teaser wording (locked):** "L'Homme Révolté — a raycasted FPS engine built to run on
   almost anything." Genre + portability hook only — no features, tech stack, licensing,
   or the source project's own political/philosophical framing (that stays out of this
   site's copy per rule 1, regardless of what the linked project's own README says about
   itself).
8. **Inbound links:** none — site is unpublicized/stealth, so URL meaning can change
   freely.

## Where things live

- `grill-session/plan.md` — methodology, phase map, settled decisions, deferred items.
- `grill-session/log.md` — full chronological Q&A transcript.
- `grill-session/research/*.md` — pre-work research dossier.
- `multi-project-ia-plan.md` — UX/DX/AX plan for the multi-project restructuring.
- `sandbox-options.md` — sandbox execution-option research.
- `PROJECT_RULES.md` (repo root) — operational rules for agents working in this
  checkout. **Not in this listing's git history** — it's a controller-local overlay,
  excluded via `.git/info/exclude`, not tracked. If you're reading this file from a
  fresh clone, that file won't be there; ask the site owner for it if you need it.
