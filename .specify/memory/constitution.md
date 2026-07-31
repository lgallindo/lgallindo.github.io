# lgallindo.github.io Constitution

## Core Principles

### I. Static-First Pages
GitHub Pages publishes static `dist/` from `master` root. Features must work without a custom backend unless Phase C explicitly introduces one.

### II. Spec Before Code
User-visible changes land as numbered specs under `specs/` (Spec Kit templates) before implementation claims done.

### III. E2E as Runtime Gate
`bun run test:e2e` is mandatory after chrome/CSS/theme/locale changes. `validate:public` remains the static private-surface gate. CSS `/_astro` HTTP 200 is P0.

### IV. Accessibility of Chrome
Skip links must never intercept pointer events on the status line when unfocused. Theme controls must remain operable in all modes.

### V. Theme Distinctness
Phosphor (amber/green CRT), Modem (Blue BBS / ANSI), and Plain (light utilitarian) must be visually unmistakable at a glance.

## Constraints

- No `specify init --force` without explicit user authorization.
- Sausage-making notes belong under `.local/` (gitignored), never public copy.
- Deploy of sandbox (Phase B) requires explicit go-ahead after local validation.

## Governance

Constitution aligns with `PROJECT_RULES.md` and workspace `AGENTS.md`. Amendments require a dated note in `SESSION_HANDOFF.md`.

**Version**: 1.0.0 | **Ratified**: 2026-07-31 | **Last Amended**: 2026-07-31
