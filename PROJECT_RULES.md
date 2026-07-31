# Project Rules - lgallindo.github.io

This repository is being migrated from HubPress to Astro. This document tracks rules, roles, file layouts, and active development specs for this workspace.

Agent governance for subagent and persona use, creation, editing, invocation, and maintenance lives in `SUBAGENT_PERSONA_RULES.md`. This file defines which agents are available to this project and how project-specific agent availability is documented.

---

## 1. Project Roles
* **Principal Architect / AI Engineer (Antigravity)**: Guides overall migration strategy, compliance, and tool executions.
* **Art Director Agent**: Focuses strictly on visual brand identity, aesthetic goals, color palettes, and typography definition.
* **UX Planner Agent**: Designs components, page wireframes, layouts, and interactions based on the `DESIGN_BIBLE.md` produced by the Art Director.
* **Astro Coder Agent**: Implements the Astro MVP from the UX architecture plan while preserving semantic HTML5, progressive enhancement, localization, and the walled-garden boundary.

---

## 2. Available Agents
Keep this roster current whenever an agent is created, renamed, retired, or made available/unavailable to this project.

For global agent-definition rules, interviews, bibliography requirements, and maintenance constraints, read `SUBAGENT_PERSONA_RULES.md` before creating or editing any agent.

* `art_director`: Global visual identity and design-aesthetic agent.
* `ux_planner`: Global UX component architecture and interaction-planning agent.
* `astro_coder`: Global Astro implementation agent for semantic, accessible, localized sites.
* `office_hours`: Global product-discovery and idea-reframing agent replacing the role normally served by gstack `/office-hours`.
* `plan_ceo_review`: Global CEO/founder strategic review agent replacing the role normally served by gstack `/plan-ceo-review`.
* `review`: Global pre-landing diff reviewer replacing the role normally served by gstack `/review`.
* `e2e_tester`: Global browser E2E specialist (Playwright); project Cursor agent `.cursor/agents/pages-e2e.md`.
* `pages_qa`: Global static-site / GitHub Pages release QA; project Cursor agent `.cursor/agents/pages-qa.md`.

* Project skill for both: `.cursor/skills/pages-e2e/`.
* Spec Kit: local templates under `.specify/`; feature specs under `specs/` (bootstrap from `~/code/foss/spec-kit`, no `init --force`).
---

## 3. Directory Structure & Navigation
* `/src/`: Source code for the Astro blog (to be initialized).
* `/public/`: Static assets, images, and fonts.
* `/.agents/`: Workspace customizations, skills, and local rules.
* `/docs/`: Project documentation, architectural decisions, and agent plans.

---

## 4. Localization Baseline
* The Astro MVP must support arbitrary localization from the start.
* Initial public locales: `en_US` and `pt_BR`.
* Initial secret/unlisted locale: Toki Pona.
* Locale architecture must keep internal planning artifacts, agent context, and secret-locale discovery mechanics out of ordinary public navigation.

---

## 5. Commit Guidelines
* Descriptors must follow long-form Conventional Commits (e.g., `feat(config): ...`, `docs(rules): ...`).
* Keep git branches clean. Do not use destructive operations on integrated branches without user authorization.

---

## 6. Documentation Index
* Project Rules: [PROJECT_RULES.md](file:///home/lgms/code/research/lgallindo.github.io/PROJECT_RULES.md)
* Agent Rules: [SUBAGENT_PERSONA_RULES.md](file:///home/lgms/code/research/lgallindo.github.io/SUBAGENT_PERSONA_RULES.md)
* Art Director Specification & Plan: [PLAN_ART_DIRECTOR_20260628T213546Z.md](file:///home/lgms/code/research/lgallindo.github.io/PLAN_ART_DIRECTOR_20260628T213546Z.md)
