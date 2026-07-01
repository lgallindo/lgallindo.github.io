# Subagent And Persona Rules

This file is the canonical rulebook for subagent and persona usage, invocation, creation, and maintenance. It applies to reusable global agents and project-selected personas. Re-read this file every time any agent is invoked, created, edited, audited, or retired.

`PROJECT_RULES.md` is the project-specific companion document. It must list which agents are available to this repository, while this file defines the global rules those agents must follow.

## 1. Scope
- **AGR-001 (Canonical Source)**: Agent governance lives in this file. `AGENTS.md` must point readers here, and project-specific agent availability must be listed in `PROJECT_RULES.md`.
- **AGR-001A (Cross-Reference Requirement)**: `PROJECT_RULES.md` must explicitly reference this file, and this file must explicitly reference `PROJECT_RULES.md`, so global agent governance and project-local availability stay linked.
- **AGR-002 (Global Scope)**: Agent definitions are global, reusable professional personas. An `agent.json` MUST NOT encode project-specific, repository-specific, feature-specific, bug-specific, task-specific, file-specific, rule-file-specific, or codebase-specific goals, paths, filenames, rules, or implementation instructions.
- **AGR-003 (Role Plus Strategy)**: An agent is not a script. An agent is a role plus strategy that can be executed by a human or an LLM. Tool calls, scripts, templates, and slash commands are optional execution aids; they do not define the agent's identity.
- **AGR-004 (Project Roster)**: `PROJECT_RULES.md` MUST keep a current list of agents available to the project, including name, role, and intended use.

## 2. Required Agent Definition Content
- **AGR-010 (Durable Goals)**: Each `agent.json` MUST state durable professional goals independent of any repository, product, branch, file, task, bug, or implementation.
- **AGR-011 (Input Contract)**: Each `agent.json` MUST define expected input categories, accepted input formats, provenance requirements, and how received inputs must be documented before analysis or action.
- **AGR-012 (Output Contract)**: Each `agent.json` MUST define expected output categories, output formats, documentation requirements, reporting requirements, and residual-risk reporting.
- **AGR-013 (Interaction Contract)**: Each `agent.json` MUST describe how the agent may interact with users, other agents, plans, calls to action, tools, and logs.
- **AGR-014 (Interview Protocol)**: At any point, an agent MAY stop and plan an interview with the user or with other agents to better achieve its goals. Interview plans MAY be longform, but interview execution MUST proceed one question at a time. The originator MAY revise an interview plan at any time. If inputs or tools are dubious, ambiguous, or missing, or if outputs are confusing, internally inconsistent, or underspecified, an interview MUST be forcibly initiated whether or not one was previously planned.
- **AGR-015 (Adversarial Audit Contract)**: Each `agent.json` MUST require aggressive adversarial analysis of inputs, interactions, plans, calls to action, and outputs, including explicit reporting and logging of findings.
- **AGR-016 (Strategy Catalog)**: Each `agent.json` MUST list strategies, techniques, references, tools, and action classes the agent may adopt, while keeping them portable across projects.
- **AGR-017 (Behavioral Constraints)**: Each `agent.json` MUST state durable behavioral constraints, including separation of public deliverables from private process artifacts, avoidance of unsupported assumptions, and respect for caller-provided governance.
- **AGR-018 (Self-Audit)**: Each `agent.json` MUST require the agent to audit its own output, log audit findings, and report unresolved risks before final handoff.
- **AGR-019 (Mandatory Bibliography)**: Each `agent.json` MUST include a timestamped mandatory bibliography with explicit source hyperlinks, auditable source identifiers, and a reverse bibliography mapping agent instructions back to sources. Bibliography entries MUST prefer authoritative external sources and global references over project-local files.

## 3. Invocation And Use
- **AGR-030 (Delegation Preference)**: Use specialized agents when an available agent matches the domain and the requested work benefits from independent role judgment.
- **AGR-031 (Invocation Record)**: Each invocation MUST document caller, agent name, input IDs, scope, expected output, timestamp, tools/actions allowed, and where results will be logged.
- **AGR-032 (No Script Substitution)**: A slash command or tool can support an agent, but it does not replace the agent's reasoning, interview, audit, or handoff obligations.
- **AGR-033 (One-Question Interviews)**: Any user or inter-agent interview MUST ask exactly one question at a time. Multi-question interview plans are allowed only as internal plans and must be executed sequentially.
- **AGR-034 (Dubious Input Stop Rule)**: If required inputs are absent, contradictory, dubious, or too ambiguous to proceed responsibly, the agent MUST stop and ask the next most important clarifying question.
- **AGR-035 (Logging)**: Agent activity MUST be logged in the caller-designated operational log with participant names, agent ids/nicknames when available, task scope, output summary, audit findings, and handle closure status.

## 4. Maintenance And Creation
- **AGR-040 (Pre-Edit Read)**: Before creating or editing any agent, re-read this file and the existing target `agent.json` if present.
- **AGR-041 (Globality Audit)**: Before saving any `agent.json`, audit it for forbidden project-specific goals, files, rules, repository names, feature names, bug names, and task-specific instructions.
- **AGR-042 (Bibliography Audit)**: Verify every bibliography hyperlink, source identifier, and reverse-bibliography anchor is explicit enough for an independent auditor to inspect.
- **AGR-043 (Project Roster Update)**: Any agent creation, rename, retirement, or availability change MUST update the available-agent list in `PROJECT_RULES.md`.
- **AGR-044 (Self-Audit Report)**: Each agent edit MUST end with a self-audit summary covering global scope, input/output contracts, interactions, interviews, adversarial audit, strategies, constraints, bibliography, and reverse bibliography.

## 5. gstack Reference
- **AGR-050 (Required Reference)**: Agent establishment and maintenance MUST consult `gstack` as a global methodology reference. The auditable upstream is `git@github.com:garrytan/gstack.git`.
- **AGR-051 (Analyzed Commit)**: This workspace analyzed gstack at commit `11de390be1be6849eb9a15f91ff4922dd16c589a` (`2026-06-25T09:42:45-07:00`, `v1.58.5.0 feat: first-run activation scaffold + gstack router front door (#2078)`).
- **AGR-052 (Local Clone Policy)**: `gstack` MUST NOT be tracked in Git here. Timestamped local clones under `docs/global_references/gstack_*/` are ignored. If no local clone is available when this reference is needed, create one with:

```bash
mkdir -p "docs/global_references"
git clone "git@github.com:garrytan/gstack.git" "docs/global_references/gstack_$(date -u +"%Y%m%dT%H%M%SZ")"
```

Then record the commit hash before citing it.

- **AGR-053 (Interview Calibration)**: gstack is especially important for interviews. When an interview procedure is unclear, uninspired, unproductive, or veers into strange pathways, compare it against gstack's role, dispatch, planning, forcing-question, review, and self-audit standards, then adjust before continuing one question at a time.
- **AGR-054 (Global Anchors)**: Relevant global anchors include `README.md`, `docs/skills.md`, `office-hours/SKILL.md`, `plan-ceo-review/SKILL.md`, `plan-ceo-review/sections/review-sections.md`, `openclaw/agents-gstack-section.md`, `openclaw/gstack-lite-CLAUDE.md`, `docs/OPENCLAW.md`, `spec/SKILL.md`, and `review/SKILL.md`.

## 6. Slash-Command Replacements
- **AGR-060 (Office Hours Replacement)**: A global `office_hours` agent may replace gstack's `/office-hours` skill when a role-based agent is preferred over a slash-command skill. It MUST preserve the core method: one-question-at-a-time interrogation, pain-before-solution reframing, premise challenge, implementation alternatives, explicit design-doc output, downstream handoff, and adversarial self-review.
- **AGR-061 (Plan CEO Review Replacement)**: A global `plan_ceo_review` agent may replace gstack's `/plan-ceo-review` skill when a role-based agent is preferred over a slash-command skill. It MUST preserve the core method: rethink the problem, find the 10-star product hiding inside the request, choose among Expansion, Selective Expansion, Hold Scope, and Reduction modes, challenge premises, review scope strategically, ask one question per material decision, and produce a decision-oriented CEO review report for downstream planning.
