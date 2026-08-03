# Grill Session Log

Live transcript of the discovery interview described in `plan.md`. One entry per round:
question asked (with my recommended answer), then your actual answer, then any decision
this settles. Appended as we go, per the `grill-with-docs` documentation style.

---

## Q1 — Positioning & audience (2026-08-02)

**Question:** Who is this site primarily for, and what should they walk away thinking or
doing?

**Recommended answer offered:** Primarily fellow engineers/FOSS collaborators, with
recruiters/hiring managers secondary; retro aesthetic signals "builds real things," not
"safely qualified candidate."

**Actual answer:** Three real audiences, not one: anarchist friends, prospective employers
("no revolution in the foreseeable future" — a pragmatic acknowledgment, not aspirational
framing), and wife + kids.
- Anarchist friends + employers: **no compromises** — pure, unfiltered technical
  skill-showcase.
- **Hard constraint:** no explicit mention of anarchism, and no explicit mention of
  employment/job-seeking — not even subtext — anywhere in the site's written copy. Subtext
  is allowed only *within code* (project choices, licensing, commit style, etc.), never in
  prose/marketing copy.
- Wife + kids: need straightforward, plain-language install/usage instructions.

**Settled decision:** Site tone stays strictly neutral/apolitical and non-"job-seeking" in
all written copy — no personal-branding language, no resume framing, no political
statements, ever. Audience-differentiation happens through *content depth/structure*
(technical rigor for peers/employers, plain-language usability path for family), not
through explicit per-audience messaging. This narrows how the personal-marketing/resume
research (`research/productivity-marketing-resume-agents.md`) gets used going forward:
its structural techniques (STAR extraction, content-pillar sorting) still apply; its
tone/framing techniques (branding language, "here's my value proposition" copy) explicitly
do not.

## Q2 — Content architecture: one track or two? (2026-08-02)

**Question:** Should each project page carry both the plain-language family track and the
technical peer/employer track on the same page (progressive disclosure — simple blurb up
top, existing Clone/Build/Run below unchanged), or should the family-friendly path be a
separate, less prominent page/link?

**Recommended answer offered:** One page, ordered simple → technical. Less to maintain
than two tracks; fits the existing structure with just a plain-language intro paragraph
added before Prerequisites.

**Actual answer:** Confirmed as recommended.

**Settled decision:** Every project page (starting with ArclengthContinuation) gets a
short, jargon-free "what this is / how to just run it" section immediately after the
title/banner, followed by the existing technical Prerequisites → Clone → Build → Run
content, unchanged. Single page, single track, ordered by increasing technical depth. No
separate family-facing page.

## Q3 — About page fate (2026-08-03)

**Question:** Given the no-narrative/no-bio constraint, what happens to the disabled
`/about/` page — repurpose as a neutral colophon (tech stack, license, how the site is
built — about the site, not the person), or drop it entirely?

**Recommended answer offered:** Repurpose as a short colophon. Gives the URL a legitimate
purpose without violating the no-narrative constraint.

**Actual answer:** Confirmed the colophon approach — "do it" — but explicitly **deferred**:
wait until the site has three projects before implementing.

**Settled decision:** `/about/` (en_US + pt_BR) becomes a minimal colophon page (stack,
license, build/deploy tooling — nothing biographical). **Trigger: do not implement until a
third project is on the site** (currently 1: ArclengthContinuation; next: l'homme révolté;
a third is not yet named). Tracked in `plan.md`'s Deferred Items list so it isn't lost.

## Q4 — Nav/IA for a growing project count (2026-08-03)

**Question:** Should `/projects/` become an index (short summary + link per project, each
project getting its own URL like `/projects/arclength/`), or should projects keep living
inline, stacked on both `/projects/` and the home page as today?

**Recommended answer offered:** Index — duplicating multiple full write-ups on both the
home page and one long `/projects/` page won't scale past project #2.

**Actual answer:** Confirmed — each project gets its own URL. Additionally requested a
plan covering **UX, DX, and Agent Xperience (AX)** improvements tied to this
restructuring — delegated to a subagent rather than answered inline (see
`meta/multi-project-ia-plan.md` once it lands).

**Settled decision:** Each project gets its own URL (e.g. `/en_US/projects/arclength/`).
`/projects/` becomes an index page. Home page stops duplicating full project content.
Exact slug scheme, template, and cross-cutting UX/DX/AX conventions are being drafted by a
subagent, not decided ad hoc mid-interview.

**Follow-up (delegated plan landed):** `meta/multi-project-ia-plan.md` (311 lines) —
recommends `<locale>/projects/<slug>/`, a `meta/projects/<slug>.json` sidecar as single
source of truth for facts duplicated between card and detail page, and a new tracked
`PROJECT_RULES.md`/`meta/CONTEXT.md` for agent conventions (found the existing
`AGENTS.md`/`CLAUDE.md` at repo root are untracked, controller-local, explicitly
read-only overlays — not the place for site-specific rules). Raised 6 open questions,
one of which (non-technical WIP preview via `/sandbox/`) Q5 below already answers.

## Q5 — Family-facing content for a zero-release project (2026-08-03)

**Question:** ArclengthContinuation has no release yet — what should the family-facing
"how to just run it" section say right now?

**Recommended answer offered:** Point to `/sandbox/` as a safe, honestly-labeled preview
("simulated, real tool not released yet") rather than leaving the section blank.

**Actual answer:** Confirmed — the sandbox. Additionally requested a "speedrun" for it.

**Settled decision + implemented (uncommitted, local preview only):** Inspected the
sandbox's actual bundled command map to keep this honest rather than invented — the real
command set is exactly `help` / `version` / `alc --help` / `clear`, everything else is
rejected by a blocklist regex. Added:
- A "60-second speedrun" (the 4 real commands, in order) directly on `/sandbox/` and
  `/pt_BR/sandbox/`, replacing the old one-line hint.
- A short "New here?" panel on the project pages (`en_US`/`pt_BR` `index.html` and
  `projects/index.html`, right after the `<h1>`, before the technical content) pointing to
  the sandbox, honestly framed as "no release yet."
Not yet committed — sitting alongside the other local-preview-only changes (IMP-002,
IMP-003, IMP-008) until told to ship them.

## Q6 — Home page vs. `/projects/` index relationship (2026-08-03)

**Question:** Should home show its own project list, or be literally the same content as
`/projects/` until something non-project is worth surfacing differently?

**Recommended answer offered:** Same list, shared source — no reason to hand-maintain two
lists for one (soon two) projects.

**Actual answer:** Rejected the recommendation — home gets its **own** list, distinct from
`/projects/`. As of now that own list should include the **most minimal possible spoiler**
for l'homme révolté, even though it isn't onboarded yet.

**Settled decision:** Home page ≠ `/projects/` index. Home's own list currently =
[ArclengthContinuation (full treatment), l'homme révolté (minimal spoiler, not yet a real
page)]. General pattern to carry forward: home surfaces a curated/teaser view, `/projects/`
is the complete index — they're allowed to diverge, not just a shared partial as the IA
plan defaulted to. **Not yet implemented** (the actual index/per-project-URL restructuring
from Q4 hasn't been built yet — still pending remaining open questions).

## Q7 — Spoiler depth for l'homme révolté (2026-08-03)

**Question:** How minimal is "most minimal" for the home teaser — (a) name + bare status
tag, zero description, or (b) name + one abstract domain/category line, no specifics?

**Recommended answer offered:** (a) — name + status tag only.

**Actual answer:** (b) — name plus one abstract line.

**Settled decision:** Home teaser = project name + a single abstract line (genre/domain
only, no feature specifics). Exact wording pending exploration (see next entry) —
explored `~/code/foss/lhomme-revolte/README.md` directly rather than asking the user to
describe it from scratch: it's a raycasted FPS game engine in C99, built for extreme
portability (X11/SDL/ncurses/web/Pokitto microcontrollers), zero dependencies, ~200KB
footprint. Its own README has an explicit "Philosophy" section (named after Camus'
*L'Homme Révolté*, framed as rebelling against corporate/bloated software, DRM,
telemetry) — noted but **not used** in the proposed teaser line, since Q1's constraint
(no political subtext in the site's own copy, even implicit) applies to what *this site*
writes, regardless of what the linked project's own README says about itself. Already
deployed publicly and independently at `lgallindo.github.io/lhomme-revolte/` (its own
repo's GitHub Pages project-page, not part of this repo).

## Q8 — Exact teaser wording (2026-08-03)

**Question:** Proposed: "L'Homme Révolté — a raycasted FPS engine built to run on almost
anything." Use as-is, or trim further (e.g. drop "raycasted"/"FPS" too)?

**Recommended answer offered:** Use as-is.

**Actual answer:** As-is, confirmed.

**Settled decision:** Home teaser text is locked: **"L'Homme Révolté — a raycasted FPS
engine built to run on almost anything."** Not yet implemented — waiting on the Q4/Q6
restructuring (per-project URLs + home's own list) to actually be built.

## Q9 — Existing inbound links to `/projects/`? (2026-08-03)

**Question:** Any known links/bookmarks pointing directly at `/projects/` expecting
today's Arclength write-up, that a URL-meaning-change would break?

**Recommended answer offered:** Probably none — the site's only existed in this form
since 2026-07-30.

**Actual answer:** "We are stealth until further orders" — nothing has been shared/
publicized at all yet.

**Settled decision:** No inbound-link concern. The `/projects/` URL's meaning can change
freely (index instead of the Arclength write-up) — no redirect or "jump straight to
Arclength" affordance needed. Broader context noted: the site is not being publicized
right now, so there's no external time pressure on shipping the restructuring.

## Q10 — Where do AX conventions live, and exclude/ignore hygiene (2026-08-03)

**Question:** Create `PROJECT_RULES.md`/`meta/CONTEXT.md` here now, or wait for the real
Astro source repo?

**Recommended answer offered:** Here, now — no access to the source repo this session,
and this is where all the decisions have actually been made.

**Actual answer:** Confirmed the recommendation, with a hard correction: `PROJECT_RULES.md`
(and `CLAUDE.md`, `.local/`, `.claude/`, `AGENTS.md`, `SESSION_HANDOFF.md`) must be
**excluded, not ignored** — i.e. listed in `.git/info/exclude` (local, untracked), never
in a committed `.gitignore`.

**Settled decision + implemented:** Found this convention already partially in place —
`AGENTS.md`/`CLAUDE.md` were already excluded this way, with `AGENTS.md` itself stating
the same rule (`LOCAL-001`) and explicitly anticipating a `PROJECT_RULES.md`
(`OP-006`/`007`/`021`). Added the missing entries (`PROJECT_RULES.md`,
`SESSION_HANDOFF.md`, `.local/`, `.claude/`) to `.git/info/exclude`. Created
`PROJECT_RULES.md` (repo root, excluded, not tracked — operational rules for agents
working in this checkout) and `meta/CONTEXT.md` (tracked, public glossary +
condensed-decisions companion to this log, per the `grill-with-docs` pattern). Verified
via `git status`/`git check-ignore` that none of the excluded files appear as untracked.

**Noted, not yet resolved:** `AGENTS.md` references a *separate* workspace-level
`CLAUDE.md` (next to the repo clones under `~/code`) defining a cross-session TLA
registry for the whole workspace — distinct from the TLA registry this assistant
maintains in its own memory system. Not reconciled; flagged for the user.

## Session end — hardware maintenance (2026-08-03)

Stopped for a planned hardware maintenance shutdown, not a natural pause in the
interview. Full pending-state summary in `plan.md`'s "Session end" section. Short
version: Phases 1 and 3 settled; Phases 2 and 4 never opened; the entire IA
restructuring (Q4/Q6/Q7/Q8/Q11) is settled but unbuilt; three open decisions remain
(status vocabulary, `alc`/`cn` naming, direct-call runner sign-off); a batch of
theming-reviewed content changes sits local-only, ready to ship on request. Cross-
workspace handoff also logged to `~/code/research/bureaucracy/SESSION_HANDOFF.md`.

## Q11 — Card ordering (2026-08-03)

**Question:** Once l'homme révolté's teaser joins Arclength, how should the home/index
list order them — manually pinned, or by a mechanical rule (e.g. real-first-then-teasers,
or reverse-chronological)?

**Recommended answer offered:** Real/released projects first, teasers last, in add order —
honest ordering over arbitrary.

**Actual answer:** Rejected the recommendation — reverse-chronological, "for most fun."

**Settled decision:** Ordering rule = strict reverse-chronological by when each item was
added to the site, regardless of WIP/teaser-vs-full status. Whatever was added most
recently shows first. (Concretely: once l'homme révolté's teaser is added, it will sit
*above* ArclengthContinuation, since it'll be the newer addition.)

## Q12 — Tone & visual direction (2026-08-03)

**Question:** Should the existing playful glitch/CRT voice carry through consistently into
all new content, or get dialed back for "no compromises" technical content?

**Recommended answer offered:** Consistent everywhere — it's a deliberate identity, not
sloppiness; splitting registers risks reading as two glued-together sites.

**Actual answer:** Confirmed consistency, plus a standing process addition: **have
specialized theming agents review each change** going forward.

**Settled decision:** Visual/voice consistency stays uniform across the whole site, no
"serious vs. playful" split. **New standing process rule:** from now on, changes touching
site content/markup/styling get a dedicated theming-consistency review pass (delegated to
subagent(s)) before being treated as done — not just designed by whoever writes the
change. Recorded in `PROJECT_RULES.md` and the assistant's memory system so it isn't
forgotten in future sessions. First application: reviewing the currently-pending,
uncommitted batch (IMP-002/003/008, Q5's speedrun + "New here?" panels) retroactively.

**Voice-consistency review result (2026-08-03):** about/blog disable, toki-pona mention,
and the sandbox speedrun all passed as on-voice with no hard-constraint violations. The
"New here?"/"Chegou agora?" panel was flagged as generic onboarding cliché, off-brand
relative to the site's dry/deadpan-terminal register — **fixed**: heading changed to
"No build yet"/"Sem build ainda", body rewritten to use a `clone &amp;&amp; build &amp;&amp; run`
shell-chaining motif consistent with the site's terminal aesthetic.

**Visual/markup-consistency review result (2026-08-03):** about/blog and toki-pona
changes passed clean (no markup impact). Split sixel-deck figures passed (grid had no
`grid-template-columns` so frames were already single-column; per-figure `aria-label`s
are an a11y improvement). Two real issues found and **fixed**:
- The "New here?"/"No build yet" panel reused `.tui-panel`, creating the site's first
  `.tui-panel`-inside-`.tui-panel` nesting — caused a width mismatch
  (`--measure-prose` vs. `--measure-wide` via `.tui-panel:has(.sixel-deck)`) and, in
  `data-mode="modem"`, doubled border/glow/`panel-wipe` animation. Fixed: dropped the
  `.tui-panel` class, using a plain `<section>` — the same pattern already used for
  Clone/Build/Run.
- The sandbox speedrun's `<ol>` used browser-default indentation instead of the site's
  `.command-list`/`.prereq-list`/`.record-list` convention (`padding-inline-start:
  1.25rem`). Fixed: added `class="command-list"`.

Noted, not acted on: Run now reads before Clone/Build in document order (from the
earlier IMP-008 banner/Run reorder, a separate prior instruction) — flagged by the
reviewer as a content-flow oddity, not a markup defect; left as-is since that ordering
was deliberately requested.

**Batch now clean per both reviewers — ready to ship whenever told to commit+push.**
