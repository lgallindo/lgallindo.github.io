---
name: pages-e2e
description: >-
  Runs and extends Playwright E2E for lgallindo.github.io, including GitHub Pages
  CSS/_astro regressions, theme modes, locales, and sixel banners. Use when the
  user mentions E2E, Playwright, Pages CSS 404, theme tests, live smoke, or
  deploy verification for this site.
---

# pages-e2e

## When to use

Site changes to routes, CSS, theme switch, banners, locales, or Pages deploy; user asks for E2E / Playwright / live smoke.

## Setup (once per machine)

```bash
cd ~/code/research/lgallindo.github.io
bun install
bunx playwright install chromium
```

## Commands

```bash
bun run test:e2e          # build + preview on 127.0.0.1:4321
bun run test:e2e:live     # against https://lgallindo.github.io
bun run validate:public   # static dist private-surface scan (not a substitute for E2E)
```

Show **raw** Playwright / curl output before analyzing failures.

## Mandatory regression checklist

1. Linked `/_astro/*.css` → HTTP **200** and `content-type` matches css (P0 if not).
2. `public/.nojekyll` exists and appears in `dist/` after `bun run build`.
3. Theme: Plain sets `html[data-mode=utilitarian]` and enables `#plain-theme-css`; Phosphor restores.
4. Banners: `/media/arclength/github-readme.png` and `readme.png` return 200; `.sixel-deck` visible.
5. Locales: `/` gateway EN/PT; `/en_US/` and `/pt_BR/` load project H1.

## After CSS/layout changes

Extend `e2e/*.spec.ts` before claiming done. Prefer role-based locators. Never delete tests to pass.

## Deploy reminder

Pages publishes from `master` **root** (built `dist/`). Always include `.nojekyll` or `_astro` assets will 404 under Jekyll.

## Agents

- Persona: `.agents/agents/e2e_tester/`, `.agents/agents/pages_qa/`
- Cursor: `.cursor/agents/pages-e2e.md`, `.cursor/agents/pages-qa.md`
- Selectors: see `reference.md`
