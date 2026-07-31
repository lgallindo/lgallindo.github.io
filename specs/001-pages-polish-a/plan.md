# Implementation Plan: Pages Polish Phase A

**Spec**: `specs/001-pages-polish-a/spec.md`

## Technical approach

1. CSS: rewrite `.skip-link` hide/show; Modem tokens + modem-only chrome; utilitarian overrides for body/status-line/panels; drop or neutralize Simple.css grid on body.
2. Astro: remove `.site-header` title block from `TerminalShell.astro`.
3. Content: strip Run `intro` EN/PT in `site.ts`; write `.local/notes/run-local-build.md`.
4. Assets: `cp` run-2 crops → `public/media/arclength/{github-readme,readme}.png`.
5. E2E: adjust theme if needed; ensure skip-link does not block status-line clicks (optional assertion).
6. Ship: `test:e2e`, `validate:public`, commit, push feat, sync `dist` → pages-master, push master.
