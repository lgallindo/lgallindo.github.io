# Research Log

Chronological record of every search/fetch tool call made during this research task. Today's date: 2026-08-02.

1. **WebSearch** — query: `Matt Pocock Claude Code skills`
   Result titles: Opentools "mattpocock-skills"; Medium (Aditya Kumar Puri) "Matt Pocock's 5 Claude Code skills made me rewrite how I work with AI agents"; Nathan Fennel "Stop Letting AI Ruin Your Codebase: Matt Pocock's Claude Skills"; AgentConn "Matt Pocock Skills"; knightli.com "mattpocock/skills Guide"; Tosea.ai "How to Use Matt Pocock's Skills for Claude Code". Summary: confirms existence of a `.claude`/`.agents`-directory-derived Claude Code skills collection; mentions a "grill-me" skill and ~20+ skills; most of these citing sites are third-party SEO/blogspam summarizing the repo, not primary sources (inflated/contradictory star counts across sites, 20.4k–176k+).

2. **WebSearch** — query: `Matt Pocock "SKILL.md" agent`
   Result titles: explainx.ai "Matt Pocock's agent skills for real engineers: TDD"; Medium (Aditya Kumar Puri, dup); GitHub `mattpocock/skills/blob/main/docs/engineering/setup-matt-pocock-skills.md`; aihero.dev "The /setup-matt-pocock-skills Skill"; explainx.ai "Matt Pocock Skills v1.0: Progressive Disclosure Guide"; AgentConn; skillsovermcp.com; skillsmp.com. Summary: confirms the repo is literally `mattpocock/skills` on GitHub, uses SKILL.md format with YAML frontmatter, installable via `npx skills@latest add mattpocock/skills/<skill-name>`. Note: some of these sites (explainx.ai "v1.0", "progressive disclosure", "63% lower token costs") read as speculative/fabricated content-farm material not corroborated elsewhere — treated with skepticism, not relied upon.

3. **WebSearch** — query: `Matt Pocock Total TypeScript AI agent skills`
   Result titles: explainx.ai; GitHub `mattpocock`; X `@mattpocockuk`; aiskill.market "Matt Pocock TypeScript Skills"; AgentConn; dailyaiworld.com (x2) "Matt Pocock's Skills Hit 176K Stars"; blog.arkin-dev.com "Agent Skills for Real Engineers"; graphify.net. Summary: confirms Matt Pocock = Total TypeScript educator, ex-Vercel engineer; repo positioned as "structured engineering tools" for AI agents (planning, dev, tooling, knowledge mgmt). Star-count and download figures vary wildly across these secondary sources (21 skills / 40+ skills / 176k stars / 7.5M downloads) — flagged as unreliable/likely embellished SEO content, superseded by direct GitHub API check in step 6.

4. **WebSearch** — query: `mattpocockuk skills github`
   Result titles: GitHub `mattpocock`; explainx.ai; GitHub `pipedrive/mattpocock-skills` (a fork/mirror); GitHub `mattpocock/skills` ("Skills for Real Engineers. Straight from my .agents directory."); Tosea.ai; skillsmp.com. Summary: confirms canonical repo is `github.com/mattpocock/skills`, tagline "Skills for Real Engineers. Straight from my .agents directory."

5. **WebFetch** — url: `https://github.com/mattpocock/skills`, prompt asked for README overview, skill list, star count, grill-me/ask-matt mentions.
   Result: Confirmed repo purpose ("Skills for Real Engineers"), ~199.9k stars shown at fetch time, listed skills including `/grill-with-docs`, `/grill-me`, `/ask-matt`, `/triage`, `/improve-codebase-architecture`, `/implement`, `/wayfinder`, `/tdd`, `/diagnosing-bugs`, `/code-review`, `/prototype`. Installable via Claude Code plugin or `npx skills@latest add`.

6. **WebSearch** — query: `Matt Pocock grill-me skill Claude Code`
   Result titles: Medium (Marc Bara) "The AI Coding Repo That Went Viral Because It Adds Friction"; Medium (Aditya Kumar Puri, dup); alphamatch.ai "Grill Me Skill: The Deceptively Simple AI Prompt"; franktheprogrammer.com "The grill-me Skill for Claude Code"; Nathan Fennel (dup); claudedirectory.org "Best Grill Me Skill for Claude Code"; claudemarketplaces.com (x2); claudeskills.info. Summary: consistent description across independent secondary sources — `grill-me` makes Claude interview the user one question at a time before coding, sessions "often ~45 minutes," is described as evolution of "rubber ducking." Cross-checked against and matches primary source (steps 8–10 below).

7. **Bash (`gh api`)** — `gh api repos/mattpocock/skills --jq '{stars, forks, description, updated, created}'`
   Result: `{"created":"2026-02-03T11:15:53Z","description":"Skills for Real Engineers. Straight from my .agents directory.","forks":17240,"stars":199861,"updated":"2026-08-02T23:12:33Z"}` — authoritative, current numbers straight from the GitHub API (not a secondary-source estimate). Confirms this is an active, actively-maintained repo as of the research date.

8. **Bash (`gh api`)** — `gh api repos/mattpocock/skills/contents/skills/engineering` — listed the `engineering` skills folder contents: `ask-matt`, `code-review`, `codebase-design`, `diagnosing-bugs`, `domain-modeling`, `grill-with-docs`, `implement`, `improve-codebase-architecture`, `prototype`, `research`, `resolving-merge-conflicts`, `setup-matt-pocock-skills`, `tdd`, `to-spec`, `to-tickets`, `triage`, `wayfinder` (plus README.md).

9. **Bash (`gh api search/code`)** and **Bash (`gh api .../git/trees/main?recursive=1`)** — located every `grill`-related path in the repo tree. Found: `skills/productivity/grill-me/SKILL.md`, `skills/productivity/grilling/SKILL.md` (the underlying primitive), `skills/engineering/grill-with-docs/SKILL.md`, `skills/in-progress/batch-grill-me/SKILL.md`, plus matching `docs/` pages and a changeset file `.changeset/grilling-general-use.md`.

10. **Bash (`gh api`)** — fetched raw content (base64-decoded) of `skills/productivity/grill-me/SKILL.md`. Full content:
    ```
    ---
    name: grill-me
    description: A relentless interview to sharpen a plan or design.
    disable-model-invocation: true
    ---

    Run a `/grilling` session.
    ```

11. **Bash (`gh api`)** — fetched raw content of `docs/productivity/grill-me.md` (the human-facing docs page). Extracted: usage instructions (`npx skills add mattpocock/skills --skill=grill-me`), and detailed prose describing what the skill does — asks one question at a time, never dumps batches, reads the codebase for facts rather than asking, always proposes its own recommended answer, walks a "decision tree" of dependent decisions, is explicitly **stateless** (writes nothing, leaves no artifact besides the sharpened understanding in-conversation), and is user-invoked only (`disable-model-invocation: true` in frontmatter — the agent won't reach for it unprompted).

12. **Bash (`gh api`)** — fetched raw content of `skills/productivity/grilling/SKILL.md`, the underlying primitive both `grill-me` and `grill-with-docs` delegate to. Full content:
    ```
    ---
    name: grilling
    description: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.
    ---

    Interview me relentlessly about every aspect of this until we reach a shared understanding. Walk down each branch of the decision tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

    Ask the questions one at a time, waiting for feedback on each question before continuing. Asking multiple questions at once is bewildering.

    If a *fact* can be found by exploring the environment (filesystem, tools, etc.), look it up rather than asking me. The *decisions*, though, are mine — put each one to me and wait for my answer.

    Do not act on it until I confirm we have reached a shared understanding.
    ```

13. **Bash (`gh api`)** — fetched raw content of `skills/engineering/grill-with-docs/SKILL.md`. Full content:
    ```
    ---
    name: grill-with-docs
    description: A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go.
    disable-model-invocation: true
    ---

    Run a `/grilling` session, using the `/domain-modeling` skill.
    ```
    Summary: `grill-with-docs` is the same interrogation primitive, but stateful — combined with `/domain-modeling` it produces ADRs and a `CONTEXT.md` glossary as durable output.

14. **WebSearch** — query: `"mattpocockuk" OR "Matt Pocock" tweet "grill-me" highest ROI`
    Result titles/content (X/Twitter posts by @mattpocockuk, quoted directly in search snippets):
    - `x.com/mattpocockuk/status/2036076132924100760`: "My 'grill-me' skill went viral. mattpocock/skills is up to 9K stars... It's the most useful skill I've written, and I use it even outside of coding."
    - `x.com/mattpocockuk/status/2054808143041908936`: "/grill-me is my most popular skill ever. I get 5-10 messages a day about how it's changed people's workflows for the better. But… I've stopped using it for code. Here's the improved version" (linking to `grill-with-docs`).
    - `x.com/mattpocockuk/status/2077715572788224003`: on `/batch-grill-me` — "Before: 13 questions, 13 rounds. After: 13 questions, 3 rounds. Still only asks questions at the 'frontier'... schedules research as background agents to not block."
    - `x.com/mattpocockuk/status/2049554929862283341`: on `/grill-with-docs` — "powers up /grill-me by forcing you to define the random jargon your project uses."
    - `x.com/mattpocockuk/status/2072716979195326905`: on `/wayfinder` — "It's the next evolution of /grill-me" for planning work too large for one session.
    - `x.com/etnshow/status/2051973854101156090` (interview clip, third party): Pocock explaining that dictating messy answers works well because the AI "structures it like a Q&A" into a clean document, and that he sometimes runs two grilling sessions in parallel.
    Also surfaced: `aihero.dev/my-grill-me-skill-has-gone-viral` (his own blog writeup) and a LinkedIn repost. This corroborates and is fully consistent with the primary-source SKILL.md content pulled directly in steps 10–13.

15. **WebFetch** — url: `https://www.aihero.dev/my-grill-me-skill-has-gone-viral`, prompt asked for design principles / lessons behind the skill.
    Extracted key quotes: "Before AI came along, devs called this rubber ducking - talking through your idea until you figured out all the permutations." / "it's a universal tool you need in many different situations." Sessions "typically ~45 minutes." Design note: he added "provide your recommended answer" per question specifically so users could confirm with a one-word reply instead of writing detailed answers each time — an explicit, dated design iteration on the skill. Also notes he uses slightly different prompt variants for coding vs. non-coding use.

16. **Bash (`gh api`)** — fetched raw content of `skills/engineering/setup-matt-pocock-skills/SKILL.md`. Summary: a one-time, per-repo onboarding skill. Explores the repo (git remote, CLAUDE.md/AGENTS.md, CONTEXT.md, docs/adr, monorepo signals), then interactively confirms: (a) issue tracker (GitHub/GitLab/local markdown/other), (b) triage label vocabulary, (c) domain-doc layout (single CONTEXT.md vs. multi-context CONTEXT-MAP.md), then writes an `## Agent skills` section into whichever of CLAUDE.md/AGENTS.md already exists (never creates a duplicate of the other).

17. **Bash (`gh api`)** — fetched raw content of `skills/engineering/to-spec/SKILL.md`. Summary: distinct from grilling — explicitly "Do NOT interview the user — just synthesize what you already know" from the prior conversation into a spec/PRD (Problem Statement, Solution, User Stories, Implementation Decisions, Testing Decisions, Out of Scope, Further Notes), then publishes it to the configured issue tracker with a `ready-for-agent` label. This is the natural "downstream" skill after a grilling session.

18. **Bash (`gh api`)** — fetched root `README.md` of `mattpocock/skills` (via contents API, base64-decoded). Extracted framing and philosophy directly from Matt Pocock's own words: repo tagline "My agent skills that I use every day to do real engineering - not vibe coding." Explicit contrast with GSD/BMAD/Spec-Kit ("they take away your control and make bugs in the process hard to resolve"). Lists three named failure modes the skills fix: (1) "The Agent Didn't Do What I Want" → fixed by `/grill-me` and `/grill-with-docs`, explicitly called "my most popular skills," recommended to "Use them *every* time you want to make a change"; (2) "The Agent Is Way Too Verbose" → fixed by a shared-language `CONTEXT.md` glossary built via `/grill-with-docs` + `/domain-modeling`, called "possibly the single coolest technique in this repo"; (3) "The Code Doesn't Work" → fixed via tight feedback loops (`/tdd`, `/diagnosing-bugs`, etc., text truncated at this point in the fetch).

19. **Bash** — `mkdir -p` and `ls -la` on the target `meta/grill-session/` directory in this repo to confirm output path/structure before writing (housekeeping, not a search).

# Findings

**Conclusion (high confidence): "Matt Pocock's skills" refers to the GitHub repository `mattpocock/skills`** ("Skills for Real Engineers"), a public, actively-maintained collection of Claude Code Agent Skills (SKILL.md-format files) that Matt Pocock — the Total TypeScript / TypeScript educator, ex-Vercel engineer — publishes straight from his own `.agents` directory. This is confirmed directly via the GitHub API (repo metadata, file trees, and raw SKILL.md/README content — steps 7–13, 16–18 above), not just via secondary blog coverage, and is corroborated by Matt Pocock's own tweets and blog post (steps 14–15).

Key facts, all sourced from the primary repo/README/blog (not the SEO-blogspam secondary sites):
- Repo: `github.com/mattpocock/skills`, description "Skills for Real Engineers. Straight from my .agents directory.", **199,861 stars / 17,240 forks** as of this research (2026-08-02, via live `gh api` call — treat any other star/fork/download figures quoted by third-party blog posts, e.g. "176K", "135K", "20.4k", "7.5M downloads", as unverified and likely embellished SEO content).
- Organized into folders: `engineering`, `productivity`, `personal`, `misc`, `in-progress`, `deprecated`.
- Distributed two ways: as a managed Claude Code plugin (`claude plugins install mattpocock-skills`, auto-updating, read-only) or via `npx skills@latest add mattpocock/skills` (copies editable files you own and can hack on). A first-run setup skill, `/setup-matt-pocock-skills`, configures per-repo conventions (issue tracker, triage labels, doc layout) before the others are used.

**The single most directly relevant item to our task is the `grill-me` / `grilling` skill family** — this is almost certainly what "consider Matt Pocock's skills" was pointing at, given we are about to run a "grill-me" style interview:

- `/grill-me` (`skills/productivity/grill-me/SKILL.md`) is explicitly described by Pocock as his **most popular skill** ("I get 5-10 messages a day about how it's changed people's workflows for the better") and by the README as one of the two fixes for the #1 failure mode he sees in AI coding agents: **misalignment** — the agent builds something that technically works but isn't what the user actually wanted.
- Mechanically, `grill-me` just invokes a shared underlying primitive, `/grilling` (`skills/productivity/grilling/SKILL.md`). Its full instruction text (7 lines) is reproduced verbatim in the Research Log, item 12. In short, its rules are:
  1. Interview relentlessly, walking a **decision tree** — resolve parent/dependency decisions before the choices hanging off them.
  2. **One question at a time.** Wait for the answer before continuing. ("Asking multiple questions at once is bewildering.")
  3. For every question, **the interviewer proposes its own recommended answer** — so the human is reacting/confirming rather than staring at a blank prompt. (This was a later, deliberate refinement — see the blog post, step 15 — added specifically to let users approve with a one-word "yes" instead of writing an essay each time.)
  4. **Facts are looked up, not asked** — if something can be discovered by reading the codebase/environment, the agent should go find it rather than interrogating the user about it. Only genuine *decisions* (things only the human can decide) get asked.
  5. **Do not act until shared understanding is confirmed.** The interview is a gate before any building/writing happens.
  6. `grill-me` itself is **stateless** — it writes nothing to disk; the only "artifact" is the sharpened shared understanding inside the conversation.
- There is a stateful sibling, `/grill-with-docs` (`skills/engineering/grill-with-docs/SKILL.md`), which runs the identical `/grilling` interview but layers in `/domain-modeling` to additionally produce durable outputs: Architecture Decision Records (ADRs) and a `CONTEXT.md` glossary of project-specific "ubiquitous language" (a Domain-Driven Design term Pocock cites directly, Eric Evans). Pocock calls this "possibly the single coolest technique in this repo" — it keeps the agent from being verbose/misusing jargon in later sessions.
- Downstream skill `/to-spec` (`skills/engineering/to-spec/SKILL.md`) is the natural next step after a grilling session: it explicitly does **not** re-interview — it just synthesizes the already-settled conversation into a structured spec/PRD (Problem Statement, Solution, User Stories, Implementation Decisions, Testing Decisions, Out of Scope) and files it to the project's issue tracker.
- There's also `/wayfinder` (mentioned by Pocock as "the next evolution of /grill-me") for planning work too large to fit in a single grilling session — it builds a "map" of many parallel grilling/prototyping/research sessions that grows and shrinks as understanding develops. And an in-progress `/batch-grill-me` variant that groups independent questions into fewer, denser rounds instead of one-question-per-round, while still respecting the decision-dependency ordering.

**Confidence levels:**
- That "Matt Pocock's skills" = the `mattpocock/skills` GitHub repo of Claude Code Agent Skills: **very high** (verified directly via GitHub API, not just secondary blogs).
- That the specific relevant skill for our task is `grill-me`/`grilling` (given we're about to run a "grill-me" interview ourselves): **very high** — the name match plus the README's own framing ("use them every time you want to make a change," "most popular skills") makes this the obvious intended reference.
- Exact current star/fork/download counts from third-party blog posts: **low** — several secondary sites (explainx.ai, dailyaiworld.com, aiskill.market, etc.) show clear signs of being AI-generated SEO filler with inflated, mutually inconsistent numbers. Only the number pulled live via `gh api` (199,861 stars, 17,240 forks, as of 2026-08-02) should be trusted.
- Whether there is additional non-repo material (a dedicated conference talk, a Total TypeScript course module specifically named "skills") beyond the GitHub repo, its docs site (aihero.dev), and his X/Twitter commentary: **not found / likely does not exist as a separate thing** — all roads (course-adjacent educator branding, blog, tweets, repo) point back to this one repo and its companion docs/blog posts at aihero.dev. No separate "skills" course or conference talk was surfaced by any search angle tried.

# Recommendations

**1. Structure the grill-me interview itself using Pocock's exact operating rules**, since this appears to be precisely what "consider Matt Pocock's skills" was asking for:
- Ask **one question at a time**, and wait for the answer before asking the next. Do not batch questions.
- For every question, **propose a recommended answer/default** so the user can just confirm ("yes, that's right") rather than having to compose a full answer from scratch. This was Pocock's single highest-leverage refinement to the skill.
- Walk the questions as a **decision tree**: resolve a parent/foundational decision (e.g., "who is this site for — recruiters, clients, or a general audience?") before drilling into decisions that depend on it (e.g., specific portfolio-section content), rather than jumping around topics.
- Before asking something answerable by exploring the environment, **go look it up** — e.g., read the existing site's repo, current copy, past commits, `meta/` notes — rather than asking the user to restate facts already available in the codebase. Only put genuine *decisions* (things only the user can decide, like tone, priorities, what to emphasize) to them.
- Treat the interview as a **gate**: don't start writing/restructuring the site until the user confirms a shared understanding has been reached.
- Consider explicitly noting to the user, up front, that this format is inspired by/mirrors Pocock's `grill-me` skill — it sets expectations that it will feel thorough/relentless by design, not accidentally exhausting.

**2. For documenting the session as I go**, mirror the stateful variant, `/grill-with-docs`: as decisions get settled during the interview, consider maintaining a running glossary/decision log (this repo already has `meta/grill-session/` as a natural home) — analogous to his `CONTEXT.md` + ADR pattern — so that terminology and settled decisions ("recruiters vs. clients," "personal brand tone," etc.) don't have to be re-derived or re-explained in later sessions/follow-up work.

**3. For structuring follow-up work as Claude Code Skills**, the repo gives a template worth copying directly:
- A SKILL.md needs only a YAML frontmatter block (`name`, `description`, optionally `disable-model-invocation: true` to make it strictly user-invoked, i.e. a slash command rather than something Claude reaches for on its own) plus a short body of plain-English instructions — Pocock's own `grill-me` and `grill-with-docs` skills are each ~5-7 lines total, delegating to a shared underlying primitive skill rather than repeating logic.
- If any output of this grill-me interview should become a reusable, repeatable workflow (e.g., "spec out a new portfolio section," "publish a new case study"), model it on his `/to-spec` pattern: a separate, explicitly non-interviewing "synthesis" skill that takes the already-gathered shared understanding and turns it into a concrete artifact (a spec, a page draft, an issue) — keeping the "interview" and "produce the deliverable" concerns in two separate skills, as Pocock does, rather than one skill trying to do both.
- If the site-development work turns out to be bigger than one sitting can hold (a full personal-brand relaunch spanning many sessions), his `/wayfinder` pattern — a living map of decisions that grows/shrinks as sub-questions get resolved via smaller grilling/prototyping sessions — is a reasonable template for organizing that as a longer-running project structure rather than a single interview.

