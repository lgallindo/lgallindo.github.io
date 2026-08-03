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
