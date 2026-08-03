# Multi-Project IA Plan

Delegated deliverable for grill-session Q4 (see `meta/grill-session/plan.md` and
`meta/grill-session/log.md` for how we got here — this file does not re-litigate Q1–Q4,
it builds on them). Written 2026-08-03.

## Settled starting point (recap only, not up for debate here)

- Every project gets its own URL: `/en_US/projects/<slug>/`, `/pt_BR/projects/<slug>/`.
- `/projects/` becomes an index (short summary + link per project), not full write-ups.
- Home page stops duplicating full project content.
- Every project page is single-track, progressive disclosure: plain-language "what/how to
  run" blurb, then the existing technical Prerequisites → Clone → Build → Run content.
- No explicit mention of anarchism or employment anywhere in prose, ever. No personal-brand/
  resume language. Subtext only inside code (licensing, project choices), never in copy.
- Next project incoming: `l'homme révolté` (source at `~/code/foss/lhomme-revolte`).

## Repo reality this plan designs around

This checkout is **built HTML/CSS/JS only** — no Astro source is present. Concretely, today:

- `en_US/index.html`, `en_US/projects/index.html` are byte-identical full write-ups of
  ArclengthContinuation (confirmed by reading both). `pt_BR/*` mirrors this structurally,
  differing only in translated text (confirmed via `diff` — same markup, same classes, same
  script, only `textContent` and `lang`/`hreflang` attributes change).
- `en_US/projects/index.html` currently opens with the literal placeholder line
  `<h1>Projects</h1><p>One project for now.</p>` before repeating the full write-up.
- Theme system: `<html data-mode="phosphor">`, three values — `phosphor` (default), `modem`,
  `utilitarian` (displayed label "Plain"). A ~35-line inline `<script>` block, **copy-pasted
  verbatim into every page's `<head>`/nav**, toggles `data-mode`, flips a disabled
  `<link id="plain-theme-css" href="/vendor/simple.min.css">` stylesheet on/off, and persists
  the choice to `localStorage["theme-mode"]` (with a legacy-key fallback
  `"interaction-mode"`). This is pure client-side state, not per-URL.
- Locale switching: each page hand-codes a link to the *same route* in the other locale
  (e.g. `en_US/projects/index.html` links to `/pt_BR/projects/`). There is no automatic
  locale-detection redirect on the bare-domain `index.html` — it's a static duplicate of the
  `en_US` homepage serving as the `x-default` hreflang target.
- Disabled stubs (`about/`, `blog/`) already establish the repo's pattern for "not ready
  yet": `<meta name="robots" content="noindex, nofollow">`, excluded from both `nav` and
  `robots.txt`/`sitemap.xml`, with an explicit HTML comment
  (`<!-- Placeholder route: no content yet. Excluded from nav, robots.txt, and sitemap.xml
  until real content lands. -->`). **Reuse this exact pattern for any WIP/unlinked project
  page** rather than inventing a new draft mechanism.
- `meta/sandbox-options.md` confirms ArclengthContinuation has **zero releases/tags**
  upstream (`gh api repos/lgallindo/arclengthcontinuation`) — it is genuinely pre-release,
  which is why its "how to just run it" section today is actually a full source-build
  procedure, not a simple download-and-run.
- A controller-local `AGENTS.md` (symlinked from `CLAUDE.md`) exists at repo root but is
  **untracked** — `.git/info/exclude` explicitly lists `/AGENTS.md` and `/CLAUDE.md` as
  local overlays, not repo policy. It is a generic, machine-wide bureaucracy template (not
  specific to this site) and its own rule OP-008 says to keep it read-only and put
  project-specific agent documentation in a separate `PROJECT_RULES.md` instead, which does
  not currently exist here. This matters directly for the AX section below.

## Core structural recommendation

```
<locale>/
  index.html                     ← thin landing: same project-card list as /projects/,
                                    no independent full write-up content
  projects/
    index.html                   ← real index: 1–2 line intro + one card per project
    <slug>/
      index.html                 ← full detail page (banner, blurb, technical sections)
  sandbox/index.html             ← unchanged, but now linkable from WIP project cards
  about/index.html                (colophon — still deferred per Q3, unaffected by this plan)
  blog/index.html                 (still disabled, unaffected)
media/<slug>/*.png                ← per-project media, same convention as media/arclength/
meta/projects/<slug>.json         ← NEW: per-project metadata, single source of truth
                                     for facts repeated in both the index card and the
                                     detail page's status line (see AX §1)
```

Slugs: lowercase, ASCII, hyphen-separated, **identical string in both locale trees** —
`arclength` for the current project (or keep the existing directory-less inline content's
implicit name; pick one and stick to it), `lhomme-revolte` for the next one (dropping the
apostrophe/accent, matching the already-established local clone directory name
`~/code/foss/lhomme-revolte`). Same slug in both locales means the locale-switcher link on a
detail page is a pure string substitution (`/en_US/` → `/pt_BR/`), exactly how the existing
per-page nav links already work.

---

## 1. UX (site visitors)

**Project summary card — what it must convey without narrative:**
Every fact on a card should be a fact *about the software*, never a claim about the author
or the audience. Concretely, per card:
- Project name (heading), linked to `/<locale>/projects/<slug>/`.
- One factual sentence already in the site's existing voice — e.g. the current copy "A
  copyleft-oriented fork of Continue for AI-assisted development across the CLI, VS Code,
  and JetBrains" is exactly the right register: what it *is*, not why it matters or who
  it's for. Reuse this pattern; avoid anything that reads as a value proposition.
- A status chip using the vocabulary already live on the page today: `WIP` (reuse the exact
  `<strong>WIP</strong>` convention verbatim, don't invent new wording yet — see Open
  Questions §6 for whether to expand this vocabulary later).
- Upstream repo link (already present as `<p class="project-meta">`).
- Optional: a license badge. This is one of the few places "subtext through code" (per Q1)
  can surface visually without becoming prose — a license string is metadata, not narrative.

**Navigation/breadcrumbs:** Top nav stays exactly as-is (Home / Projects / Sandbox, 3
items) — a detail page does not need its own nav entry. Add a small back-link at the top of
every detail page, `← Projects` → `/<locale>/projects/`, styled consistent with the site's
existing terminal-prompt idiom (it could literally read `$ cd ..` to match the `$ img2sixel`
prompts already used in the banners). This is now necessary because detail pages sit one
level deeper than before and are no longer reachable directly from home.

**Locale switching × index+detail:** Because the switcher hardcodes a same-route sibling
link, every detail page **must ship both locale versions atomically** — this is already the
de facto practice (today's single project is fully bilingual). If a project is ever
published single-locale temporarily, the template's locale-switcher link must fall back to
that locale's `/projects/` index rather than a 404 — but this should be an exception path in
the template, not routine practice.

**Theme system × index+detail:** No special handling needed functionally — theme state is
`localStorage`-based and same-origin, so it persists seamlessly between `/projects/` and
`/projects/<slug>/`. The one thing worth verifying once the index page exists: card markup
should degrade sensibly under the "Plain" theme (`vendor/simple.min.css`, a classless
framework) — use plain `<article>`/heading/paragraph/link structure for cards so classless
styling still reads as a list of items, not a wall of unstyled text. Test the new
`/projects/` index specifically in Plain mode; the current single-project page never
exercised a list layout.

**Inbound links to today's `/projects/` URL:** Nothing needs a redirect. `/projects/` keeps
resolving — it just now serves an index instead of the full write-up. There is no prior
independently-linkable URL for "the Arclength write-up" being removed (it only ever existed
inline on `/projects/` and `/`, not at its own address), so this is additive, not a breaking
change, *unless* the owner knows of external bookmarks/shares specifically expecting
`/projects/` to be the Arclength content (see Open Questions §3). As a low-cost hedge, make
the new index's single card the first/most prominent thing on the page for now, so a visitor
with the old mental model is still one click away from what they expected.

**Zero-release ("WIP") project cards:** For a project with no release yet (ArclengthContinuation
today), the card should say `WIP` plainly (existing convention) and additionally link to
`/sandbox/` with a factual label (e.g. "scripted preview" — matching the sandbox's own
existing honest disclosure, "Scripted responses only — the real Arclength CLI is not running
here"). This gives the family audience a real "click and see something" path without
pretending the project is runnable yet. On the detail page itself, the plain-language blurb
(Q2) for a zero-release project should set expectations rather than oversell ease — e.g. "no
packaged release yet; building from source needs a full dev toolchain (below); a scripted
preview is available in the sandbox" — rather than writing a "how to just run it" that
implies non-technical ease which the Prerequisites/Gradle/JDK steps immediately contradict.
Once a project has an actual release artifact, the blurb can genuinely say "download X, run
Y" and the sandbox link becomes optional supplementary content instead of the only safe path.

---

## 2. DX (site owner onboarding future projects)

**Repeatable checklist for adding a project (e.g. `lhomme-revolte` next):**

1. Pick the slug now, once: lowercase, ASCII, hyphens (`lhomme-revolte`). Use it verbatim as
   the directory name in both locale trees, the media subfolder, and the metadata file.
2. Create `en_US/projects/<slug>/index.html` and `pt_BR/projects/<slug>/index.html` in the
   same change — never let one locale lag the other structurally.
3. Mandatory sections, in order (mirrors the current ArclengthContinuation page, which is
   the reference implementation):
   - Title + at least one banner/figure (existing `sixel-deck` treatment). If no art exists
     yet, leave an explicit placeholder comment, don't silently omit it.
   - Plain-language "what this is / how to just run it" blurb (Q2) — mandatory, right after
     the banner/title.
   - Status line: status chip + canonical upstream repo link (`<p class="project-meta">`) —
     this is the one fact that must match `meta/projects/<slug>.json` (see AX §1).
   - One factual paragraph description — mandatory, no narrative framing.
   - Technical section(s): keep the heading vocabulary `Prerequisites` / `Clone` / `Build` /
     `Run` (or the closest equivalent, e.g. `Install`/`Usage` for a non-source-build project)
     consistent across projects so a returning visitor recognizes the pattern.
   - Optional: sandbox/live-preview link, additional screenshots.
4. Add `meta/projects/<slug>.json` (see AX §1) and a card entry to both locale
   `projects/index.html` files, plus (if this project should also appear on the home page,
   per whatever the owner decides in Open Questions §1) the home page card list.
5. Update `robots.txt`/`sitemap.xml` only once the project is meant to be publicly linked —
   until then, treat it like `about/`/`blog/` (noindex, excluded from nav/sitemap).

**Bilingual sync:** en/pt detail pages are structurally identical HTML today — same markup,
same classes, only translated text differs (verified via diff). Treat any structural change
(new card class, new section, template tweak) as **one change applied to both locale files
in the same commit**, never a text-only edit in one file. This built-HTML repo can't enforce
that separation mechanically, which is exactly the argument for the handoff note below.

**Handoff note for whoever maintains the real Astro source** (paste this verbatim into that
repo's README/CONTRIBUTING/onboarding doc, or link back to this file at a pinned commit):

> This static-HTML checkout (`lgallindo.github.io`, GitHub Pages branch) is a *build output*
> mirror, not the source of truth for structure. A discovery interview
> (`meta/grill-session/plan.md` + `log.md` in that checkout) settled the site's audience,
> tone constraints, and information architecture before this plan was written; read
> `meta/multi-project-ia-plan.md` there for the full reasoning. Load-bearing decisions to
> carry into the Astro source:
> - Slugs are the join key across locales, media, and metadata — same string in
>   `en_US/projects/<slug>/`, `pt_BR/projects/<slug>/`, `media/<slug>/`, and a per-project
>   metadata record. In Astro terms: a content collection keyed by slug, with locale
>   variants as collection entries or a `t()`-style string table feeding one shared
>   `.astro` layout — **not** two independently hand-authored HTML trees. That duplication
>   is a built-output artifact of this static checkout, not a design goal.
> - Per-project frontmatter fields needed: `slug`, `name`, `status` (`wip`/`stable`/
>   `archived`/`hidden`), `repoUrl`, `license`, `hasReleases`, optional `sandboxUrl`,
>   `order`. See AX §1 in the plan file for the full schema and rationale.
> - Hard content constraint carried through from the discovery interview: no explicit
>   mention of anarchism or employment/job-seeking anywhere in prose, not even subtext; no
>   personal-branding/resume language. This must survive as a literal constraint on any
>   copy templates or CMS fields the Astro source adds later, not just as one-off text in
>   the current pages.
> - The three-theme system (`phosphor`/`modem`/`utilitarian`→"Plain") and locale-switcher
>   behavior (same-route sibling link) are functionally important and currently
>   implemented as a hand-duplicated inline script per page — a strong candidate for a
>   shared Astro component/partial rather than continuing to copy-paste it.

---

## 3. AX (AI coding agents doing future maintenance)

**1. Per-project metadata schema.** Add `meta/projects/<slug>.json` per project — the single
source of truth for facts currently duplicated by hand between a project's index card and
its detail page's status line:

```json
{
  "slug": "arclength",
  "name": "ArclengthContinuation",
  "status": "wip",
  "repoUrl": "https://github.com/lgallindo/arclengthcontinuation",
  "license": null,
  "hasReleases": false,
  "sandboxUrl": "/en_US/sandbox/",
  "order": 1
}
```

This built-HTML repo has no build step to *consume* this file automatically, but it gives
any agent (or the owner) a single place to check "is this project's card in sync with its
detail page" without diffing two HTML files by eye. For the Astro source, this schema maps
directly onto content-collection frontmatter — hand it over as-is (see DX handoff note).

**2. Should there be an `AGENTS.md`/`CONTEXT.md`?** There already *is* an `AGENTS.md` at
repo root (symlinked from `CLAUDE.md`), but it is a **controller-local, untracked overlay**
— `.git/info/exclude` explicitly excludes `/AGENTS.md` and `/CLAUDE.md` from the repo, and
the file's own rule (OP-008) says to keep it read-only and put project-specific agent
documentation in a separate `PROJECT_RULES.md` instead, which does not exist here yet. So:
**do not add site-specific IA conventions to `AGENTS.md`** — it isn't tracked, isn't
specific to this repo, and explicitly says not to.

Two small, compliant, non-conflicting additions instead:
- `PROJECT_RULES.md` (tracked, repo root) — the file `AGENTS.md`'s own bootstrap rules
  (OP-006/OP-007/PLAN-006) already expect to exist and read first. Keep it short: a pointer
  to `meta/` for planning docs and to `meta/CONTEXT.md` for the substantive glossary/ADR
  content below. This satisfies the existing controller template without fighting it.
- `meta/CONTEXT.md` — a glossary + ADR-style log, the pattern documented in
  `meta/grill-session/research/matt-pocock-skills.md` (Matt Pocock's `grill-with-docs` +
  `domain-modeling`, "possibly the single coolest technique" per that research). This *is* a
  good fit here: it's tracked (unlike `AGENTS.md`), repo-specific, and durable across
  machines. Suggested contents:
  - **Glossary**: locale gate, slug, colophon, sandbox, WIP chip, the three theme names and
    their internal vs. displayed labels (`phosphor`→Phosphor, `modem`→Modem,
    `utilitarian`→Plain).
  - **ADR-style log**: one entry per structural decision, e.g. "2026-08-03 — projects get
    own URLs, `/projects/` becomes an index — decided in grill-session Q4, see
    `meta/multi-project-ia-plan.md`." This is exactly the same append-only style already
    used successfully in `meta/grill-session/log.md`; `meta/CONTEXT.md` just generalizes it
    beyond the single grilling session.

**3. Predictable file-naming pattern (recap as an explicit rule):**
`<locale>/projects/<slug>/index.html` (1:1 mirrored across `en_US`/`pt_BR`),
`media/<slug>/*.png`, `meta/projects/<slug>.json`. An agent grepping for a project's slug
across these three predictable locations should find everything relevant to it with no
other context needed.

**4. WIP vs. ready-to-unhide — a mechanical rule, not a judgment call:**
A project is eligible to appear on `/projects/` and the home page once, *and only once*:
- `meta/projects/<slug>.json` has `"status"` other than `"hidden"`, **and**
- both locale detail pages exist and pass the mandatory-section checklist (DX §"Mandatory
  sections"), **and**
- the page does *not* carry `<meta name="robots" content="noindex, nofollow">`.

Before all three are true, a project's detail page may exist in-repo (e.g. drafted ahead of
time) but must use the exact disabled-stub pattern already established by `about/`/`blog/`:
`noindex, nofollow`, excluded from nav, excluded from `robots.txt`/`sitemap.xml`, with the
same explanatory HTML comment style already in `about/index.html`. This means an agent never
has to *infer* readiness from prose tone or banner presence — it's a checkable file-state
condition, reusing a pattern the repo already has rather than inventing a new one.

---

## Open questions for the next grilling round

These are genuine decisions only the site owner can make — not decided here:

1. **Home page vs. `/projects/` index content.** Should the home page show its own card
   list (same or different ordering from `/projects/`), or should it literally be the same
   content as `/projects/` until there's non-project content (e.g. a blog post) worth
   surfacing differently on home? This plan defaults to "same list, shared partial" but it's
   an editorial call.
2. **Card ordering on the index.** Manual/pinned order chosen by the owner, or a mechanical
   rule (reverse-chronological by first-published date, WIP-last, etc.)?
3. **Existing inbound links to `/projects/`.** Does the owner know of any external
   links/bookmarks (shared with anarchist friends, etc.) that expect `/projects/` to be the
   ArclengthContinuation write-up specifically? This plan assumes no such links exist and
   treats the URL's meaning-change as non-breaking; if links do exist, a more prominent
   "jump straight to Arclength" affordance (or even a temporary redirect) may be warranted.
4. **Where `PROJECT_RULES.md`/`meta/CONTEXT.md` should actually live.** Set them up now in
   this built-output repo, or wait until the real Astro source repo is the active
   development target and set them up there instead, to avoid maintaining the same
   convention in two places?
5. **Non-technical preview for WIP projects.** Is linking a WIP project's card/blurb to
   `/sandbox/` (or an equivalent scripted preview) the right family-facing answer, or would
   the owner rather show nothing runnable at all until there's a real release?
6. **Status vocabulary.** Is `WIP` (already in use) the complete status vocabulary going
   forward, or should it expand (e.g. `WIP` / `Beta` / `Stable` / `Archived`) once there are
   3+ projects at genuinely different maturity levels — likely worth deciding alongside the
   `/about/` colophon trigger (Q3), since both activate around the same "third project"
   milestone?
