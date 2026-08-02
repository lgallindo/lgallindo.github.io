# Research Log

All research performed live via `WebSearch` and `WebFetch` on 2026-08-02. Chronological order below.

1. **WebSearch** `"GStack" grilling skills`
   Result titles: DEV Community "most popular AI coding skills"; LobeHub "GStack – Top 15 AI Agent Skills"; GitHub discussion `gsd-build/get-shit-done#2426` ("grill-me skill seems to produce better questions than the discuss phase"); X/Twitter post by @sdhilip mentioning "gstack (@garrytan)"; X post "GStack beats Superpowers head to head" (@garrytan); DEV.to "A Claude Code Skills Stack: How to Combine Superpowers, gstack, and GSD"; GitHub repo `garrytan/gstack`; aihero.dev "The /grill-me Skill"; an unrelated Gumroad cooking listing.
   → First hit that GStack = Garry Tan's Claude Code skill pack, and that a separate "grill-me" skill exists and is discussed alongside it.

2. **WebSearch** `"GStack" interview framework`
   Result titles: GitHub issue `garrytan/gstack#706` (Hermes Agent 7-role review framework); MindStudio blog "What Is GStack?"; Product Hunt "AI YC interview with Gstack agents"; X post "GStack beats Superpowers"; Pulumi Blog "Superpowers, GSD, and GSTACK: Picking the Right Framework"; Medium (Ewan Mak) "What Each Claude Code Framework Actually Constrains"; YouTube "Gstack Full Tutorial"; Lightsprint "Office Hours with Gstack — the partner interview before you build".
   → Confirms GStack has a role-based (CEO/Eng Manager/Designer/QA/etc.) review system and an `/office-hours` "partner interview" concept, but nothing literally named "grilling" here.

3. **WebSearch** `"G-Stack" grilling methodology`
   Result titles: all BBQ/charcoal-grilling sites (grillitbetter.com, gstackscustomsmokers.com, grillinggoodeats.com, Wikipedia "Indirect grilling", a grill-rack patent) plus one relevant hit: "grill-me vs Superpowers: A Full Comparison of Two Agent-Skill Paths" (ryanuo.cc).
   → Confirms "G-Stack" alone, without AI/Claude context, mostly returns literal barbecue content — the AI-tooling meaning only surfaces when combined with "AI"/"Claude"/"skill" terms.

4. **WebSearch** `"GStack" AI skill`
   Result titles: explainx.ai skill page "learn — AI agent skill" (garrytan/gstack); LobeHub GStack collection; DeepWiki `garrytan/gstack/3-skills`; official site `gstacks.org`; Augment Code "Garry Tan open-sources gstack: what developers should know"; Medium (Luong Nguyen) "gstack is not a dev tool. it's Garry Tan's brain on AI".
   → Established GStack is an open-source Claude Code "skill pack" (23 specialist skills / slash commands) built by Garry Tan (President & CEO of Y Combinator), covering the full dev lifecycle (think/plan/build/review/test/ship/reflect).

5. **WebFetch** `https://github.com/garrytan/gstack`
   Prompt: describe GStack, list all skills, find any "grill-me"/"grilling" skill.
   → Full skill inventory extracted (see Findings). **No skill named "grill-me" or "grilling" appears.** Closest analog: `/office-hours` — "Product interrogation with forcing questions."

6. **WebFetch** `https://www.aihero.dev/skills-grill-me`
   Prompt: detail the grill-me skill's methodology, creator, usage.
   → Reveals grill-me was created by **Matt Pocock** (not Garry Tan/GStack), lives in his own open-source skills repo, asks one question at a time with a suggested answer, is adversarial/pushes back, and is recommended for pre-PRD validation. Notes Matt has since also promoted a `domain-model` skill.

7. **WebFetch** `https://deepwiki.com/garrytan/gstack/3-skills`
   Prompt: list GStack skills, look for grill-me.
   → Confirms (again, independently) that GStack's documented skills page (as indexed by DeepWiki) does **not** mention "grill-me"; lists `/browse`, `/review`, `/ship`, `/plan-ceo-review`, `/plan-eng-review`, `/retro`, `/qa`, `/investigate`, `/office-hours`, `/design-review`, `/cso`, `/guard`, `/freeze`.

8. **WebFetch** `https://gstacks.org/` (GStack's own marketing site)
   Prompt: describe GStack and look for grilling skill.
   → Lists nine core "cognitive roles" (plan-ceo-review, plan-eng-review, review, ship, browse, qa, qa-only, setup-browser-cookies, retro). Again, **no "grill-me"/"grilling" skill** in GStack's own materials.

9. **WebSearch** `Matt Pocock skills github grill-me SKILL.md`
   Result titles: `mattpocock/skills` repo files — `docs/productivity/grill-me.md`, `skills/productivity/README.md`, repo root `README.md`, `skills/productivity/grill-me/SKILL.md`, aihero.dev page (again), main repo page, `skills/productivity/grill-me/` dir, `skills/in-progress/batch-grill-me/SKILL.md`, `skills/engineering/grill-with-docs/SKILL.md`, SkillsMP listing.
   → Located the primary source: Matt Pocock's `mattpocock/skills` GitHub repository ("Skills for Real Engineers. Straight from my .agents directory."), which contains `grill-me`, `grill-with-docs`, `batch-grill-me`, and a shared `grilling` primitive.

10. **WebFetch** `https://ryanuo.cc/en/posts/grill-me-vs-superpowers`
    Prompt: origin/creator and exact methodology of grill-me.
    → Confirms Matt Pocock as sole creator; quotes the core prompt: "Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk each decision tree, resolving dependencies one by one." Documents the three variants (grill-me / grill-with-docs / grilling primitive) and their different output profiles (no artifacts vs. CONTEXT.md + ADRs vs. reusable primitive).

11. **WebFetch** `https://github.com/gsd-build/get-shit-done/discussions/2426`
    Prompt: summarize the discussion comparing grill-me to a "discuss" phase.
    → Independent community confirmation that grill-me is an external tool (from `mattpocock/skills`) using "interrogation-style Q&A" in "a tight adversarial loop asking one focused question at a time," contrasted with a more template-driven "discuss-phase" breadth-first approach.

12. **WebFetch** `https://raw.githubusercontent.com/mattpocock/skills/main/skills/productivity/grill-me/SKILL.md`
    Prompt: extract full SKILL.md content verbatim.
    → Retrieved frontmatter: name `grill-me`, description "A relentless interview to sharpen a plan or design," model-invocation disabled (must be explicitly invoked via `/grill-me`), body directs the agent to run a `/grilling` session (i.e., grill-me is a thin wrapper around the shared `grilling` primitive).

13. **WebFetch** `https://github.com/mattpocock/skills/blob/main/docs/productivity/grill-me.md`
    Prompt: extract full doc content, relationship to grill-with-docs/wayfinder/to-spec.
    → Confirms: stateless (writes nothing, no workspace artifacts); one question at a time; each question comes with the agent's own recommended answer; agent explores the codebase itself for facts rather than asking; use before building, when a plan feels roughly right but something is unresolved. Related skills: `grill-with-docs` (adds ADRs/glossary), `wayfinder` (upstream, for larger efforts), `to-spec` (converts settled understanding into a spec without re-interviewing).

14. **WebSearch** `mattpocock skills "grilling" primitive SKILL.md github engineering`
    Result titles: `docs/productivity/grilling.md`, `docs/productivity/grill-me.md`, `skills/engineering/README.md`, a release-notes mirror (newreleases.io v1.1.0), PR #532 "grilling: reword the primitive for general use," `skills/engineering/grill-with-docs/SKILL.md`, repo Releases page, `skills/productivity/grill-me/SKILL.md`, `skills/productivity/grilling/` dir, main repo page.
    → Found the shared `grilling` primitive that both `grill-me` and `grill-with-docs` (and also `improve-codebase-architecture` and `triage`) call into — described as "the single source of truth for the interview technique."

15. **WebFetch** `https://github.com/mattpocock/skills/blob/main/docs/productivity/grilling.md`
    Prompt: extract full documented methodology of the "grilling" primitive.
    → Full mechanics: "asks one question at a time and waits for your answer before the next — never a bulk list"; each question ships with the agent's own recommended answer; agent explores the codebase/tools first when it can settle a question itself, and only asks the user about actual *decisions*; treats the plan as a dependency-ordered decision tree so answers can reshape later questions; does not proceed/act until the user confirms "shared understanding" has been reached. Invoked directly via `/grilling` or through wrapper skills; routing guidance lives in a skill called `ask-matt`.

16. **WebFetch** `https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md`
    Prompt: extract SKILL.md verbatim.
    → Frontmatter: name `grilling`, description: "Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases." Body (near-verbatim quotes captured): "Interview me relentlessly about every aspect of this until we reach a shared understanding." / "Ask the questions one at a time, waiting for feedback on each question before continuing." / "Asking multiple questions at once is bewildering." / for factual matters, explore tools/environment instead of asking; "The *decisions*, though, are mine — put each one to me and wait for my answer." / "Do not act on it until I confirm we have reached a shared understanding."

# Findings

## What "GStack" is (high confidence)

**GStack** (`github.com/garrytan/gstack`, site `gstacks.org`) is an open-source **Claude Code skill/plugin pack** created by **Garry Tan**, President & CEO of Y Combinator. It bundles ~20+ slash-command "skills" that give Claude Code distinct role-based personas across the software lifecycle — e.g. `/plan-ceo-review` (founder/product review), `/plan-eng-review` (architecture), `/design-review`, `/review` (staff-engineer code review), `/qa` / `/browse` (headless-browser QA), `/ship` (release), `/retro` (retrospective), `/cso` (security threat modeling), plus safety guardrails (`/careful`, `/freeze`, `/guard`) and utilities. Its stated premise: "Planning is not review. Review is not shipping. Founder taste is not engineering rigor" — i.e., don't blend cognitive modes, give the agent explicit "gears." It has gotten significant attention on X/Twitter and dev blogs in 2026 as one of several competing "Claude Code orchestration frameworks" (alongside "Superpowers" and "GSD"/get-shit-done).

GStack's closest analog to an "interview"/"grilling" skill is **`/office-hours`** — described as "Product interrogation with forcing questions" / a "partner interview before you build," modeled on a YC-partner-style grilling of a startup idea (demand, status quo, wedge). This is a real, documented GStack skill, but it is **not called "grilling" or "grill-me" anywhere in GStack's own documentation** (checked via the GitHub repo directly, DeepWiki's indexed skills page, and GStack's own marketing site — all three independently confirm no such name exists in GStack).

## What "grilling skills" actually refers to (high confidence)

The literal **"grill-me" / "grilling"** skill construct is a **separate project by Matt Pocock** (`github.com/mattpocock/skills`, "Skills for Real Engineers. Straight from my .agents directory."), unrelated in origin to Garry Tan/GStack. It comprises:

- **`grilling`** — the core reusable primitive/methodology ("the single source of truth for the interview technique"). Frontmatter description: *"Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases."*
- **`grill-me`** — the stateless, user-invoked front door (`/grill-me`). Produces no artifacts; the understanding lives only in the conversation. Model cannot auto-invoke it; the user must explicitly call `/grill-me`.
- **`grill-with-docs`** — the stateful sibling; runs the same interview but writes durable outputs (`CONTEXT.md`, Architecture Decision Records).
- **`batch-grill-me`** — an in-progress variant.
- Also leaned on by `improve-codebase-architecture` and `triage` skills for decision pressure-testing.

**Core methodology, extracted near-verbatim from the SKILL.md / docs:**
1. Frame it as: *"Interview me relentlessly about every aspect of this [plan/decision/idea] until we reach a shared understanding."*
2. **One question at a time** — *"Ask the questions one at a time, waiting for feedback on each question before continuing. Asking multiple questions at once is bewildering."*
3. **Walk the decision tree in dependency order** — resolve dependent decisions before dependents; early answers may reshape later questions.
4. **Each question comes with the agent's own recommended answer** — the user reacts to/corrects a proposal rather than answering an open-ended prompt.
5. **Explore before asking** — if the codebase/available tools/docs can already answer a factual question, the agent should look it up itself rather than asking the user. Reserve direct questions for genuine *decisions* only.
6. **Do not act until confirmed** — *"Do not act on it until I confirm we have reached a shared understanding."* The interview is a gate before any building/implementation starts.
7. Two output modes: **conversation-only** (grill-me) vs. **written record** (grill-with-docs → CONTEXT.md + ADRs + glossary).

## Reconciling the name "GStack grilling skills" (moderate confidence on attribution, high confidence on applicable content)

There is real-world evidence the two projects get **conflated or mentioned side by side** in the Claude-Code-skills community:
- A GitHub discussion on the unrelated `gsd-build/get-shit-done` project explicitly compares "grill-me" (attributed correctly to `mattpocock/skills`) against their own "discuss phase."
- Dev.to/blog content ("A Claude Code Skills Stack: How to Combine Superpowers, gstack, and GSD") treats GStack, Superpowers, and GSD/grill-me-adjacent tooling as a **stack of complementary skill packs** that power users combine in one Claude Code setup.
- At least one X/Twitter post loosely credits "gstack (@garrytan)" with functionality ("Turns Claude Code into a virtual team that questions what you're building") that overlaps in spirit with grill-me/office-hours, likely contributing to public conflation of the two.

**Conclusion:** "GStack grilling skills" most plausibly refers to the popular Claude-Code "interview/interrogation before you build" technique that circulates in the same ecosystem as GStack — but the actual, concretely documented "grilling" methodology (one question at a time, agent proposes an answer, explore-before-asking, don't act until shared understanding) belongs to **Matt Pocock's `grilling`/`grill-me` skill**, not to GStack proper. GStack's own equivalent is the less granularly documented `/office-hours`. Whoever briefed you likely means "use the grill-me-style interview technique that's part of the GStack-adjacent Claude Code skills ecosystem" — the label may be a loose/informal shorthand or a minor misattribution rather than a literal skill name inside the GStack repo.

Confidence levels:
- GStack = Garry Tan's Claude Code skill pack: **high** (multiple independent primary/secondary sources agree).
- GStack itself has no skill literally named "grill-me"/"grilling": **high** (confirmed via 3 independent fetches of GStack's own repo/site/wiki).
- The "grilling" methodology's actual content and mechanics (one-question-at-a-time, recommended answers, explore-before-asking, confirm-before-acting): **high** (sourced directly from the SKILL.md/docs files in `mattpocock/skills`).
- That "GStack grilling skills" as a phrase is a conflation/shorthand rather than a literal distinct named artifact: **moderate** — plausible and consistent with community chatter, but no single source explicitly says "GStack's grilling skill is called X."

# Recommendations

For the grill-me-style interview you're about to run with the user on their personal-brand/portfolio site, adopt the documented `grilling` methodology directly, since it's the concrete, well-specified technique available (regardless of whether it's technically "GStack" or "Matt Pocock's skill" by strict attribution):

1. **One question at a time, always.** Never bundle multiple questions in one turn — the source material explicitly calls bulk questioning "bewildering." Wait for the user's answer before asking the next.
2. **Propose a recommended answer with every question.** Instead of open-ended prompts ("What's your target audience?"), frame it as a suggestion the user reacts to ("I'd guess your target audience is technical recruiters and prospective collaborators in ML/robotics — is that right, or is it broader?"). This matches the "you're reacting to a proposal, not staring at a blank prompt" pattern and will speed up the session.
3. **Explore before asking.** Before asking about anything discoverable from the existing site/repo (current content, structure, existing bio text, past projects listed, tech stack), read the repo/site yourself first. Reserve direct questions for genuine subjective *decisions* only (tone, audience priority, what to emphasize/omit, career narrative, visual direction) — not facts you can find yourself.
4. **Walk the decision tree in dependency order.** Resolve foundational choices first (e.g., "who is this site primarily for" and "what's the core narrative/positioning") before drilling into dependent details (e.g., specific project write-ups, visual design, section ordering) — since early answers reshape later questions.
5. **Document as you go, live.** Since you've been asked to keep the session "documented as I go," this is effectively the `grill-with-docs` variant rather than the stateless `grill-me` — plan to produce a running artifact (a CONTEXT.md-style doc and/or a lightweight ADR-like log of decisions: what was asked, what was decided, why) rather than leaving the outcome only in chat history.
6. **Gate on shared understanding, not on a fixed question count.** Don't stop at an arbitrary number of questions or move to drafting site content until you can state back a coherent, confirmed summary of positioning/goals/scope and the user agrees it's accurate — mirroring "do not act on it until I confirm we have reached a shared understanding."
7. Optional: consider naming your running documentation file/artifact something like `CONTEXT.md` or `interview-log.md` under `meta/grill-session/`, consistent with how `grill-with-docs` structures its output (context doc + decision log), since that convention is exactly the pattern being referenced.
