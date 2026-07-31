# Feature Specification: Pages Polish Phase A

**Feature Branch**: `feat/astro-mvp-foundation`

**Created**: 2026-07-31

**Status**: Active

**Input**: Fix skip-link overlay, remove hostname header, redesign Modem (Blue BBS), fix Plain responsiveness, promote run-2 banners, remove sausage Run intros; commit + push + deploy ASAP.

## User Scenarios & Testing

### User Story 1 - Usable primary nav (Priority: P1)

Keyboard and mouse users can reach Home/Projects/theme controls without a skip link blocking them.

**Acceptance Scenarios**:

1. **Given** `/en_US/` loaded, **When** skip link is not focused, **Then** it does not receive pointer events over `.status-line`.
2. **Given** skip link receives keyboard focus, **When** activated, **Then** focus moves to `#main`.

### User Story 2 - Clean chrome (Priority: P1)

Page chrome does not show a redundant `lgallindo.github.io` header title.

**Acceptance Scenarios**:

1. **Given** any public locale page, **When** rendered, **Then** no `.site-header__title` with the hostname appears.

### User Story 3 - Distinct Modem theme (Priority: P1)

Selecting Modem is visually distinct from Phosphor (Blue BBS vs amber CRT).

**Acceptance Scenarios**:

1. **Given** theme radios, **When** Modem is selected, **Then** `html[data-mode=modem]` and navy/cyan token set apply.
2. **Given** Phosphor selected, **Then** amber/green CRT tokens restore.

### User Story 4 - Plain usable on narrow viewports (Priority: P1)

Plain mode does not break layout or leave overflow artifacts.

**Acceptance Scenarios**:

1. **Given** utilitarian mode at ~375px width, **When** page loads, **Then** status-line and main content remain usable without horizontal page scroll from chrome.

### User Story 5 - Updated banners (Priority: P2)

Sixel deck shows run-2 cropped banners.

**Acceptance Scenarios**:

1. **Given** `/en_US/`, **When** banner images load, **Then** they return HTTP 200 at `/media/arclength/*.png`.

### User Story 6 - No sausage public copy (Priority: P2)

Run section does not tell users about local-vs-published install politics.

**Acceptance Scenarios**:

1. **Given** project Run section EN/PT, **When** rendered, **Then** “Prefer local build output” / PT equivalent text is absent.

## Requirements

- FR-001: Skip link off-viewport until `:focus-visible`; `pointer-events: none` when idle.
- FR-002: Remove site-header hostname block from `TerminalShell.astro`.
- FR-003: Modem Blue BBS token redesign in `global.css`.
- FR-004: Harden Plain/utilitarian overrides; reduce Simple.css layout fights.
- FR-005: Copy run-2 crops into `public/media/arclength/`.
- FR-006: Move Run intro notes to `.local/notes/`; strip from `site.ts`.
