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
