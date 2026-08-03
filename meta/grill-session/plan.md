# Grill Session Plan — lgallindo.github.io → full personal site

Started: 2026-08-02

## Why this file exists

Before growing the site past its current single-project stub (ArclengthContinuation), the
user asked for a "grill-me" discovery interview to settle positioning, scope, and content
architecture — one question at a time, documented as it goes, so decisions don't need to
be re-derived in later sessions (this site is expected to onboard more projects next,
starting with `~/code/foss/lhomme-revolte`).

## Methodology (adopted from research)

Both pre-work instructions — "consider Matt Pocock's skills" and "consider GStack grilling
skills" — converged on the same real artifact: Matt Pocock's `grilling` skill
(`mattpocock/skills`, `skills/productivity/grilling/SKILL.md`). GStack (Garry Tan's skill
pack) does not itself contain a skill named "grilling" — see
`research/gstack-grilling-skills.md` for the full reconciliation. Full source material:
`research/matt-pocock-skills.md`, `research/gstack-grilling-skills.md`,
`research/productivity-marketing-resume-agents.md`.

Rules followed for the remainder of this session (and any future grilling session on this
site):

1. **One question at a time.** Wait for the answer before asking the next. Never batch.
2. **Every question comes with a recommended answer/default.** You react/confirm rather
   than answer from a blank prompt — this was Pocock's single highest-leverage refinement
   to the skill.
3. **Decision-tree order.** Resolve foundational/parent decisions (positioning, audience)
   before drilling into dependent detail (specific project write-ups, visual polish).
4. **Explore before asking.** Anything answerable by reading the repo, git history, or
   existing copy gets looked up, not asked. Only genuine subjective *decisions* get put to
   you.
5. **Gate on shared understanding, not a question count.** No site restructuring starts
   until a settled summary is confirmed back to you as accurate.
6. **Documented as we go** (the `grill-with-docs` variant, since you asked for
   documentation): this plan + `log.md` are the running record — no separate write-up step
   needed from you afterward.
7. Sessions can pause/resume across turns; not everything needs settling in one sitting.

## Rough phase map (subject to revision as answers reshape later branches)

1. **Positioning & audience** — who is this site for, what should they walk away
   thinking/doing (recurring anchor question across nearly every source researched:
   "what problem do you solve, for whom").
2. **Narrative & scope** — career story arc; personal vs. professional mix; what's
   explicitly out of scope for now.
3. **Content architecture** — nav/IA, and a repeatable pattern for onboarding future
   projects (`lhomme-revolte` next) without re-deciding structure each time.
4. **Per-project deep dives** — STAR-style extraction (Situation/Task/Action/Result +
   what you learned) starting with ArclengthContinuation since it's already live.
5. **Tone & visual direction** — how much of the current retro/glitch/phosphor personality
   carries through once there's more "serious" personal-brand content alongside it.
6. **Logistics** — anything staying explicitly out of scope (resume PDF? contact form?
   analytics? favicon — already deferred per PIT-005).

## Settled decisions so far

- **Audience (Q1):** three real audiences — anarchist friends, prospective employers, wife
  + kids. Anarchist friends and employers get the *same* uncompromising technical
  content; wife/kids get a plain-language usability path.
- **Hard tone constraint (Q1):** no explicit mention of anarchism or employment/job-seeking
  anywhere in written copy — not even subtext. Subtext allowed only within code itself
  (licensing, project choices, commit style). No personal-branding/resume-style copy.
  Audience needs are met through content depth/structure, not through differentiated
  messaging.
- **Page structure (Q2):** every project page is single-track, progressive disclosure —
  plain-language "what/how to run" blurb first, then the existing technical
  Prerequisites/Clone/Build/Run content unchanged. No separate family-facing page.
- **About page (Q3):** becomes a short colophon (stack/license/tooling, no bio) — but
  deferred, see Deferred Items below.
- **Nav/IA (Q4):** each project gets its own URL; `/projects/` becomes an index; home page
  stops duplicating full project content. Detailed UX/DX/AX plan delegated to a subagent —
  landed at `meta/multi-project-ia-plan.md` (311 lines, not yet implemented).
- **Zero-release WIP content (Q5):** family-facing blurb points to `/sandbox/`, honestly
  labeled; sandbox got a real 4-command "speedrun." Implemented locally, uncommitted.

- **Home vs. index (Q6):** home gets its own curated/teaser list, deliberately different
  from `/projects/` (the complete index). Home currently = Arclength (full) + l'homme
  révolté (minimal spoiler, not yet onboarded). Not yet implemented.
- **Spoiler depth (Q7):** name + one abstract domain/category line, no feature specifics,
  and critically no mention of the source project's own political/philosophical framing
  (Q1's no-politics-in-copy rule governs what *this site* writes, independent of what a
  linked project's own README says about itself).
- **Teaser wording locked (Q8):** "L'Homme Révolté — a raycasted FPS engine built to run
  on almost anything."
- **No inbound-link concern (Q9):** site is unpublicized/"stealth" — `/projects/`'s
  meaning can change freely, no redirect needed.
- **AX conventions + exclude hygiene (Q10):** `PROJECT_RULES.md` created at repo root
  (operational rules for agents) and `meta/CONTEXT.md` created (tracked glossary +
  condensed decisions) — built here now rather than waiting on the Astro source repo.
  `PROJECT_RULES.md`, `SESSION_HANDOFF.md`, `.local/`, `.claude/` added to
  `.git/info/exclude` alongside the pre-existing `AGENTS.md`/`CLAUDE.md` entries — hard
  rule: excluded, never a committed `.gitignore`. Noted, unresolved: a separate
  workspace-level TLA registry referenced by `AGENTS.md` (outside this repo) that hasn't
  been reconciled with the assistant's own memory-based registry.

## Open questions carried from the IA plan (not yet asked)

1. ~~Home page vs. `/projects/` index~~ — resolved by Q6 (deliberately different, not shared).
2. ~~Card ordering~~ — resolved by Q11 (strict reverse-chronological, "for most fun").
3. ~~Existing inbound links~~ — resolved by Q9 (none; site is unpublicized).
4. ~~Where should `PROJECT_RULES.md`/`meta/CONTEXT.md` live~~ — resolved by Q10 (here, now).
5. ~~Non-technical WIP preview~~ — resolved by Q5 (sandbox + speedrun).
6. Status vocabulary beyond `WIP` — bundle with the Q3 "third project" trigger. **Last
   open item from the IA plan.**

## Standing process rules (added mid-session, apply going forward)

- **Theming-consistency review (Q12, 2026-08-03):** any change touching site
  content/markup/styling gets a dedicated theming-consistency review pass (delegated to
  subagent(s)) before being considered done. See `PROJECT_RULES.md`.

## Deferred items (settled decision, timing not yet)

- **`/about/` → colophon** (Q3, 2026-08-03): implement once the site has **three**
  projects (currently 1, l'homme révolté confirmed next as #2). Not yet triggered.

## Session end (2026-08-03) — hardware maintenance shutdown

Stopping here for planned hardware maintenance, not a natural stopping point in the
interview. Full state for whoever resumes:

**Committed + pushed to `master`:** `robots.txt`/`sitemap.xml`, canonical tags, this
dossier through Q12 + both theming-review outcomes, `meta/CONTEXT.md`,
`meta/sandbox-options.md`, `meta/multi-project-ia-plan.md`,
`meta/arclength-sandbox-fidelity-plan.md`. `PROJECT_RULES.md` exists at repo root but is
deliberately git-excluded (Q10) — not visible from a fresh clone.

**Local-only, uncommitted (reviewed clean, ready to ship on request):** about/blog
noindex-disable, toki-pona Arclength mention, sixel-deck split + Run reorder, sandbox
speedrun, "No build yet" family panel.

**Settled but not implemented:** the whole Q4/Q6/Q7/Q8/Q11 IA restructuring — per-project
URLs, `/projects/` as an index, home's own curated list with the l'homme révolté teaser,
reverse-chronological ordering. This is the single biggest piece of unimplemented, fully-
settled work.

**Open decisions, unresolved:**
- Status vocabulary beyond `WIP` (bundle with the Q3 three-project trigger) — last item
  from the original IA-plan open-questions list.
- **New:** the sandbox says `alc --help` but the real CLI binary is `cn`
  (`meta/arclength-sandbox-fidelity-plan.md`) — decide keep-as-is (there's an unshipped
  `V-PEND-004` rebrand item) or fix the sandbox copy now.
- **New:** whether to pursue a dedicated direct-call runner so the sandbox can make some
  real calls to the CLI — recommendation is *not* via the VPS (recent Gitea compromise,
  open remediation items), build a fresh runner instead, pending explicit sign-off.
- **New:** `meta/sandbox-spec.md` (written this session before discovering the real
  `specs/002`/`specs/003` on `origin/feat/astro-mvp-foundation` already existed) is
  redundant — keep as a pointer, or delete it.

**Grilling itself:** Phase 1 (positioning) and Phase 3 (content architecture) are fully
settled. Phase 2 (narrative & scope) and Phase 4 (per-project deep dives) were never
opened. Resume with Phase 2, or wherever the operator wants to pick back up — no specific
next question was queued.

Cross-workspace handoff entry also logged to
`~/code/research/bureaucracy/SESSION_HANDOFF.md` (2026-08-03T11:00:55-0300, event type
`documentation`) per that repo's own convention, for continuity with other agents working
in this workspace.
