# Research Log

Chronological record of every tool call made during this research session (2026-08-02). All searches performed via the `WebSearch` tool (live web search) and `WebFetch` tool (page fetch + extraction); no findings below rely on model training memory alone.

1. **WebSearch** — `AI productivity coach app 2026 onboarding questions personal organization`
   Returned mostly enterprise-employee-onboarding SEO content (Enboarder, Cloverleaf, Apps365, PeopleManagingPeople, Kairntech, Arahi, Phenom, Disco), but surfaced **Rocky.ai** as "the most credible standalone consumer AI coach" using GROW/OKR-style daily check-ins, plus mentions of BetterUp/CoachHub (enterprise-only, out of scope for a personal/consumer tool).

2. **WebSearch** — `Reclaim.ai onboarding questions habits scheduling assistant`
   Returned Reclaim.ai marketing/help pages and third-party reviews (max-productive.ai, vaautomationlab.com, rimo.app). Extracted the onboarding flow: proactive vs. reactive scheduling mode, focus-time target (low/med/high), protected time categories (lunch, breaks, commute), calendar + task-tool integration.

3. **WebSearch** — `Sunsama onboarding intake questions daily planning`
   Returned Sunsama's own help docs (help.sunsama.com) and reviews (dhruvirzala.com, gbrlife.com, dev.to). Extracted the "daily planning ritual" intake sequence: shutdown-time question, backlog review of yesterday's incomplete tasks, task list build, deferral of non-essentials, timeboxing/ordering.

4. **WebSearch** — `Motion app AI scheduling onboarding survey questions priorities`
   Returned Motion's site (usemotion.com) and reviews (cybernews.com, unite.ai, rimo.app, max-productive.ai). Extracted: 3 quick "why do you want to try Motion" questions, a short personalization questionnaire, and the priority-tagging model (High/Med/Low + hard deadline) used to drive AI scheduling.

5. **WebSearch** — `personal branding AI tool 2026 discovery questionnaire brand strategy`
   Returned Forbes (William Arruda columns), ebaqdesign, copyfol.io, sociali.ai, latechpost.com, instantpress.co, selfbrand.app. Identified BrandingGPT and "AI Brand Strategist" as named custom-GPT tools, plus the framing that "brand discovery" (knowing what you offer/who it's for/what makes you different) is the essential first phase.

6. **WebSearch** — `Taplio LinkedIn AI personal brand onboarding questions content pillars`
   Returned Taplio's own site/blog, Kleo (competitor/alternatives listicle), Intercom help center, and reviews. Extracted Taplio's onboarding "knowledge base" intake (questions about expertise/experience/perspective, plus transcript/blog upload) and its 3-pillar content model (Authority Builders / Engagement Drivers / Trust Signals) with a "list 3-5 themes you want to be known for" exercise.

7. **WebSearch** — `Teal HQ resume builder AI onboarding questions career profile`
   Returned tealhq.com, jobcopilot.com, tooliverse.ai, help.tealhq.com, ophyai.com. Extracted: LinkedIn-import onboarding shortcut, AI-generated professional summaries tailored to a specific job description, AI autofill for open-ended application questions.

8. **WebSearch** — `Kickresume AI resume writer intake questions interview`
   Returned kickresume.com pages (AI interview question generator, online AI career coach, best-AI-resume-builders roundup) and careeraddict.com review. Extracted: 10 generated interview Q&As + 10 questions-to-ask-the-interviewer feature; Career Coach's 2-input flow (upload resume + enter target job title/seniority).

9. **WebSearch** — `Rezi AI resume builder onboarding questions work experience bullet points`
   Returned rezi.ai docs/blog and resumegenius.com, enhancv.com, siteefy.com reviews. Extracted the "Generate Bullet" vs. "Generate Bullet with Key Numbers" mechanism, "Rewrite Bullet" tool, and job-description-based tailoring (title + company + JD paste).

10. **WebSearch** — `Enhancv resume AI questionnaire career story onboarding`
    Returned enhancv.com pages and aitoolsexplorer.com, tooliverse.ai. Extracted Enhancv's storytelling-oriented sections (achievements, strengths, passions, "life philosophy") and its AI interview-prep feature generating STAR stories + a "personal pitch."

11. **WebSearch** — `Rocky.ai AI coach GROW model daily check-in questions goal setting`
    Returned rocky.ai product pages (personal-development, growth-mindset, digital-coach, daily-reflections, habit-tracker, app-release-with-personality-test). Confirmed Rocky.ai uses daily reflection prompts, a Big Five (OCEAN) personality assessment on onboarding, and goal→action→habit breakdown coaching, but no verbatim question text was available on these marketing pages.

12. **WebSearch** — `"personal brand" custom GPT questions "what makes you different" positioning statement exercise`
    Returned Forbes (Jodie Cook, Sarah Hernholm columns), latinpresarios.com, academy.techpresso.co, learnprompt.org, godofprompt.ai. Surfaced two Forbes articles with concrete, quotable prompt sequences (fetched in full below).

13. **WebFetch** — `https://www.forbes.com/sites/jodiecook/2026/02/13/5-chatgpt-prompts-to-build-a-personal-brand-that-does-the-selling-for-you/`
    Extracted the 5 verbatim prompts: brand positioning (intersection of expertise × ideal customer's problem), content-schedule generator, long-form content strategy, "spotlight audit" (does your brand highlight your work or you), and "attraction targets" (talent/partners/clients/investors/media).

14. **WebFetch** — `https://www.forbes.com/sites/sarahhernholm/2026/03/01/how-to-use-chatgpt-to-clarify-your-personal-brand/`
    Extracted 3 sections of verbatim follow-up prompts: Pattern-identification ("what recurring themes do you notice?"), Language-refinement (3 tones: analytical/mission-driven/practical), Alignment-check (what to prioritize / what dilutes focus).

15. **WebFetch** — `https://taplio.com/blog/how-to-build-a-personal-brand-on-linkedin`
    Extracted the "Niche of One" positioning framework, the headline formula `[Role] Helping [Audience] Achieve [Result]`, the 5-3-2 content-mix rule, and a 90-day staged rollout plan.

16. **WebFetch** — `https://www.kickresume.com/en/online-ai-career-coach/`
    Confirmed the Career Coach's minimal 2-field intake (resume upload + target job title/seniority) rather than an extended Q&A interview.

17. **WebSearch** — `Careerflow.ai OR Huntr OR "Final Round AI" resume builder onboarding questions career goals`
    Returned careerflow.ai, help.careerflow.ai, unite.ai, tryresgen.com, finalroundai.com. Extracted: Careerflow's <2-minute onboarding questionnaire feeding weekly/monthly goal tracking; Final Round AI's near-zero onboarding (upload docs + pick target industry/role, then customize tone/response length).

18. **WebSearch** — `Akiflow OR Fabulous app OR Clockwise onboarding questionnaire goals productivity 2026`
    Returned akiflow.com, softwareadvice.com, capterra.com, thebusinessdive.com, clickup.com. Extracted Akiflow's OKR-based goal tracking and 1:1 human onboarding call (paid tiers); Clockwise noted only as "calendar intelligence," no discovery-question detail found.

19. **WebFetch** — `https://help.careerflow.ai/en/articles/10723830-getting-started-with-careerflow-ai`
    Negative result — the article describes features (Resume Builder, Job Tracker, Networking, LinkedIn Optimization, Job Portal) but does not enumerate the onboarding questionnaire content.

20. **WebFetch** — `https://www.rocky.ai/personal-development`
    Negative result for verbatim questions — page describes coaching philosophy (behavioral science, accountability loops, persistent memory) but doesn't expose sample dialogue/question text in fetchable form.

21. **WebSearch** — `"AI Brand Strategist" GPT OR "BrandingGPT" custom GPT questions personal brand discovery`
    Returned gptstore.ai, ebaqdesign.com, bizhack.com, bogdancarlescu.com, corebook.io, desinance.com. Extracted "Personal Brand Identity Deep Dive GPT" (GPT Store) and BrandingGPT descriptions, plus two generic discovery questions ("What are the core values and messages you want your brand to embody?", "How do you want to be perceived by your audience?").

22. **WebSearch** — `Notion AI life OS personal website "about me" template onboarding questions goals values`
    Returned notion.com marketplace templates, gridfiti.com, bettercreating.com, maray.ai. Confirmed "Life OS" style Notion templates (tasks/goals/habits/journal/personal CRM) exist as a productivity/self-organization category but function as structured templates rather than conversational interview agents.

23. **WebSearch** — `resume writer AI "tell me about yourself" STAR method interview extraction questions software engineer`
    Returned huntr.co, rezi.ai, aiapply.co, getmarlee.com, zety.com, thetailorcv.com, nodeflair.com, revarta.com. Identified Huntr's Interview Question Generator and Revarta's "AI Story Builder" (extracts STAR candidates from an uploaded resume) as tools that mine accomplishment stories.

24. **WebFetch** — `https://selfbrand.app/blog/how-to-build-a-personal-brand-with-ai-in-2026`
    Extracted the 80/20 framework (which content tasks AI should own vs. which require your lived-experience judgment) and its core discovery question: "What is the exact problem your ideal client will pay you to solve?"

25. **WebFetch** — `https://www.rezi.ai/posts/star-method`
    Extracted the 4-part STAR breakdown (Situation/Task/Action/Result, each with its own guiding question) and the list of 10 canonical behavioral-scenario categories used to prompt story extraction.

26. **WebSearch** — `Fabulous app OR Coach.me AI habit coaching onboarding personality questions goals 2026`
    Returned thefabulous.co, choosingtherapy.com, coach.me, aicareercoach.org, saner.ai. Extracted Fabulous's routine-based guided onboarding (morning/afternoon/evening) and Coach.me's "CoachMatch" pairing based on goals/personality/preferred coaching style; "Habit Coach AI" offers a choice of AI coaching personality with daily check-ins via call/text.

**Total: 26 tool calls (19 WebSearch, 7 WebFetch).**

---

# Findings

## (a) Productivity / Personal-Organization Coaching

### 1. Reclaim.ai
- **What it does / who for**: AI calendar assistant for knowledge workers and executive assistants; auto-schedules focus time, tasks, habits, and breaks around existing meetings.
- **Discovery/onboarding technique**: Rather than free-text questions, it front-loads a small number of **forced-choice calibration questions** that each map directly to a scheduling parameter: (1) proactive vs. reactive scheduling mode, (2) a focus-time target on a low/medium/high scale, (3) which "protected time" categories to defend (lunch, breaks, commute), (4) which calendars/task tools to connect. This is a "constrain the search space with 3-4 high-leverage toggles" pattern rather than open interview.
- **Source**: https://reclaim.ai/ ; https://reclaim.ai/blog/habits-vs-tasks ; https://vaautomationlab.com/reclaim-ai-for-virtual-assistants/

### 2. Sunsama
- **What it does / who for**: Daily/weekly planning ritual tool for founders, freelancers, and makers who want intentional (not just automated) day planning.
- **Discovery/onboarding technique**: A **guided daily ritual with a fixed step order**: (1) ask a single setup question — "what time do you want a daily planning reminder?" — once, at signup; (2) each session opens by resurfacing yesterday's unfinished items for a yes/no disposition ("done, still relevant, or drop it?"); (3) build today's list; (4) explicit deferral step ("what can wait?"); (5) explicit ordering/timeboxing step; (6) close by setting a hard shutdown time. This is a **repeatable, same-structure-every-time interview** — useful as a model for a recurring check-in, less directly for a one-time deep intake.
- **Source**: https://help.sunsama.com/docs/daily-planning ; https://help.sunsama.com/docs/daily-planning-the-basics ; https://blog.sunsama.com/p/the-official-daily-planning-guide

### 3. Motion (usemotion.com)
- **What it does / who for**: AI task/calendar "superapp" that auto-prioritizes and schedules work; targets busy professionals and small teams.
- **Discovery/onboarding technique**: Opens with **3 quick "why are you here" motivation questions** before any feature is shown, followed by a short explainer video, then a **personalization questionnaire**. Ongoing prioritization is driven by a compact tagging scheme users apply per task: Priority (High/Med/Low) + hard deadline + dependencies — i.e., it converts a big fuzzy question ("what matters?") into a small structured tag set applied per item rather than one big upfront interview.
- **Source**: https://www.usemotion.com/ ; https://cybernews.com/ai-tools/motion-ai-review/

### 4. Rocky.ai
- **What it does / who for**: Consumer AI coaching chatbot for personal development, leadership/soft-skills, and habit-building; closest "AI life coach" analog in this research.
- **Discovery/onboarding technique**: Onboarding includes a **Big Five (OCEAN) personality assessment** up front, then daily short reflection/check-in sessions structured around goal → smaller actions → supporting habits, with **follow-up questions that explicitly reference the user's own prior commitments** (accountability-loop style: "last time you said X — how did that go?"). Marketing pages didn't expose verbatim question text, but the structural pattern (assess identity/traits once, then re-ask against your own stated commitments repeatedly) is a strong technique to borrow.
- **Source**: https://www.rocky.ai/personal-development ; https://www.rocky.ai/post/rocky-ai-app-release-with-personality-test-big5-ocean ; https://www.rocky.ai/habit-tracker

### 5. Akiflow
- **What it does / who for**: Unified task+calendar workflow tool; positions itself around OKR-style goal tracking layered on top of daily task execution.
- **Discovery/onboarding technique**: Combines a **self-serve guided walkthrough** ("quietly shows users what to do next" rather than asking questions) with **objectives/key-results (OKR) framing** to link daily tasks back to a small number of top-level goals, plus an optional human 1:1 onboarding call on paid tiers — i.e., AI/software handles the mechanical setup, a human handles the harder "what are your real goals" conversation.
- **Source**: https://akiflow.com/blog/top-workflow-management-tools-productivity ; https://thebusinessdive.com/akiflow-review

### 6. Fabulous / Coach.me / Habit Coach AI (habit-coaching cluster)
- **What they do / who for**: Consumer habit-formation and accountability apps grounded in behavioral science (Fabulous: Duke-affiliated); Coach.me additionally offers human-coach matching; Habit Coach AI offers a selectable AI "coach personality" with daily check-ins via call/text.
- **Discovery/onboarding technique**: Fabulous uses **guided routine-building onboarding** (morning/afternoon/evening routines presented as a template you customize, minimizing blank-page burden). Coach.me's "CoachMatch" explicitly asks about **goals, personality, and preferred coaching style** before pairing you with a coach — a useful 3-axis intake model (what/who-you-are/how-you-want-to-be-coached).
- **Source**: https://www.thefabulous.co/ ; https://coach.me/ ; https://www.saner.ai/blogs/best-ai-life-coach

## (b) Personal Marketing / Personal Branding

### 1. Taplio
- **What it does / who for**: AI LinkedIn content and growth tool for professionals/founders building a personal brand on LinkedIn.
- **Discovery/onboarding technique**: Onboarding builds a **"knowledge base"** by asking directly about expertise, experience, and point of view, and lets users bulk-feed source material (call transcripts, blog posts, podcast transcripts, notes) rather than typing everything fresh. It then structures content strategy around **naming 3-5 themes you want to be known for** (content pillars) sorted into a fixed taxonomy: Authority Builders (case studies/how-tos), Engagement Drivers (polls/hot takes/personal narratives), Trust Signals (social proof/process transparency). Separately, its blog teaches a **"Niche of One"** positioning technique — answer "what is the one problem you solve better than anyone else?" — and a headline formula `[Role] Helping [Audience] Achieve [Result]`, plus a 5-3-2 content-mix rule (5 value / 3 authority / 2 human posts per 10).
- **Source**: https://taplio.com/ ; https://taplio.com/blog/how-to-build-a-personal-brand-on-linkedin ; https://intercom.help/TaplioAndTweetHunter/en/articles/8808232-what-is-taplio-and-how-can-it-help-me-grow-my-personal-brand

### 2. "5 ChatGPT Prompts" personal-branding framework (Forbes / Jodie Cook)
- **What it is / who for**: A named, reusable prompt sequence (not a packaged product, but widely cited as the de facto personal-branding "GPT interview") aimed at founders/professionals.
- **Discovery technique** (verbatim prompts extracted):
  1. Positioning: *"Based on what you know about my business and expertise, help me define my personal brand positioning. Identify the intersection of my intellectual property and my ideal customer's biggest problems…"*
  2. Content cadence: *"…create a realistic content schedule for building my personal brand. Include daily, weekly, and monthly activities I can sustain long-term…"*
  3. Format strategy: *"…suggest 3 content formats I should focus on…"*
  4. Self-audit: *"Assess whether my personal brand currently spotlights my work or spotlights me…"*
  5. Audience/goal: *"…identify the top 3 things my personal brand should attract: talent, partners, clients, investors, or media opportunities…"*
  Notably, each prompt explicitly instructs the AI to **keep asking clarifying follow-ups** rather than answering in one shot — an important "don't front-load everything" technique.
- **Source**: https://www.forbes.com/sites/jodiecook/2026/02/13/5-chatgpt-prompts-to-build-a-personal-brand-that-does-the-selling-for-you/

### 3. Personal-brand clarification prompt chain (Forbes / Sarah Hernholm)
- **What it is / who for**: A 3-stage prompt sequence for people who already have raw material (bio, past posts, work history) but haven't distilled it.
- **Discovery technique** (verbatim, 3 stages):
  - *Pattern-finding*: "Based on these experiences, what recurring themes do you notice?" / "What types of problems do I consistently seem drawn to solving?" / "If you had to summarize the common thread across these activities, what would it be?" / "What strengths appear repeatedly in this description?"
  - *Language refinement*: "Turn this description into three concise personal brand statements with different tones: analytical, mission-driven, and practical." / "Make this more specific without exaggerating." / "Rewrite this so it focuses on impact rather than titles."
  - *Alignment check*: "Based on this personal brand statement, what types of projects should I prioritize?" / "What kinds of commitments may dilute this focus?" / "How could I demonstrate this theme publicly in a small, practical way?"
  This is a genuinely strong **3-pass structure** (extract raw patterns → compress into candidate statements → stress-test against real decisions) worth borrowing almost directly.
- **Source**: https://www.forbes.com/sites/sarahhernholm/2026/03/01/how-to-use-chatgpt-to-clarify-your-personal-brand/

### 4. BrandingGPT / "Personal Brand Identity Deep Dive GPT" / "AI Brand Strategist" (GPT Store custom GPTs)
- **What they do / who for**: Off-the-shelf custom GPTs (ChatGPT GPT Store) for solo founders/influencers wanting brand-strategy help without hiring a consultant.
- **Discovery technique**: Lighter/more generic than Taplio or the Forbes chains — surfaced core questions are broad: "What are the core values and messages you want your brand to embody?" and "How do you want to be perceived by your audience?" These function more as prompts-for-a-prompt (the GPT is expected to ask its own follow-ups after ingesting uploaded material like decks/market analysis) than a fixed script.
- **Source**: https://gptstore.ai/gpts/K_P3dUyn_4-personal-brand-identity-deep-dive-gpt ; https://www.ebaqdesign.com/blog/branding-gpt

### 5. SelfBrand AI
- **What it does / who for**: AI tool/content targeted at professionals building a personal brand with less manual effort, explicitly framed around an "AI does 80%, you do 20%" division of labor.
- **Discovery technique**: Uses an **80/20 diagnostic framework** rather than a question list — for each content task, ask "does this need my lived experience and opinion, or is it mechanical?" The single foundational discovery question it centers on is: *"What is the exact problem your ideal client will pay you to solve?"* — notably a monetization-anchored variant of the "what problem do you solve" question that recurs across nearly every branding source found.
- **Source**: https://selfbrand.app/blog/how-to-build-a-personal-brand-with-ai-in-2026

## (c) Resume / CV Writing Assistance

### 1. Teal (tealhq.com)
- **What it does / who for**: Free-tier-heavy career platform (resume builder + job tracker + application autofill) for active job seekers.
- **Discovery/onboarding technique**: Minimizes manual intake by **importing structured data first** (LinkedIn profile → resume draft in seconds) rather than interviewing the user from scratch. Its AI summary-writer works by **cross-referencing two documents** (your experience + the target job description) to draft an opening statement — i.e., it treats the job posting itself as a second "interviewer" supplying the questions ("what does this employer need to hear?").
- **Source**: https://www.tealhq.com/tools/resume-builder ; https://jobcopilot.com/teal-review/

### 2. Kickresume
- **What it does / who for**: AI-driven resume/cover-letter builder plus an "AI Career Coach" and interview-question generator.
- **Discovery/onboarding technique**: Deliberately **minimal intake** — the Career Coach asks for exactly two things (upload your resume; type your target job title + seniority) and then does gap analysis itself rather than interviewing further. Its separate interview-prep tool inverts the model: instead of asking the user questions, it **generates the questions a real interviewer would ask**, tailored to the resume + role, plus "smart questions you should ask them" — useful precedent for a "which questions would a recruiter/visitor ask about you" self-generation step in a personal-site interview.
- **Source**: https://www.kickresume.com/en/online-ai-career-coach/ ; https://www.kickresume.com/en/ai-job-interview-questions-generator/

### 3. Rezi
- **What it does / who for**: ATS-optimization-first resume builder ("correctness over flexibility"), trusted by a large user base per its marketing.
- **Discovery/onboarding technique**: Rather than asking open questions, offers **two generation modes per bullet**: "Generate Bullet" (plain accomplishment) vs. **"Generate Bullet with Key Numbers"** (forces a quantified-metric version) — an explicit prompt to think in numbers. Tailoring is triggered by a **3-field structured input** (job title, company name, pasted job description) rather than free conversation. Rezi's separate STAR-method guide breaks story extraction into 4 fixed guiding questions: *"What was the challenge or problem?" (Situation) → "What was your role or goal?" (Task) → "What steps did you take to fix it?" (Action) → "How did it turn out, and what did you learn?" (Result)*, applied across 10 canonical scenario categories (conflict resolution, setbacks, goal achievement, competing priorities, pressure, data-driven decisions, persuasion, difficult communication, teamwork, initiative/leadership).
- **Source**: https://www.rezi.ai/rezi-docs/ai-bullet-points ; https://www.rezi.ai/posts/star-method

### 4. Enhancv
- **What it does / who for**: Storytelling-oriented resume/CV builder aimed at candidates who want personality and narrative alongside credentials, not just ATS optimization.
- **Discovery/onboarding technique**: Guided builder with **explicit personality-revealing sections** beyond standard resume fields — "strengths," "passions," and even a **"life philosophy"** field — nudging users past pure job history into identity/values territory. Its AI interview-prep feature also **generates a "personal pitch"** (a spoken elevator-pitch draft) derived from the user's own resume content, not written from scratch by the user.
- **Source**: https://enhancv.com/ ; https://enhancv.com/blog/create-resume-with-ai/

### 5. Careerflow.ai
- **What it does / who for**: All-in-one job-search platform (resume builder, job tracker, LinkedIn optimization, networking CRM).
- **Discovery/onboarding technique**: A **sub-2-minute onboarding questionnaire** at first login whose answers feed personalized feature suggestions, paired with ongoing **weekly/monthly recurring goal-tracking** (so the "discovery" isn't just a one-time interview but re-asked as check-ins). Exact question text wasn't published in fetchable docs, but the "keep it under 2 minutes, then follow up with recurring goal check-ins" pattern is notable.
- **Source**: https://help.careerflow.ai/en/articles/10723830-getting-started-with-careerflow-ai ; https://www.careerflow.ai/organizations/workforce-development

### 6. Final Round AI
- **What it does / who for**: AI interview-assistant/prep platform (10M+ users claimed) for active candidates.
- **Discovery/onboarding technique**: Explicitly markets **"no long onboarding"** — just upload documents and select target industry/role — then lets users tune **tone, response length, and model preference** as ongoing dials rather than upfront interview questions. Useful as a counter-example: some users want speed over depth, so an opt-out/"quick mode" path may be worth offering alongside the deep grill-me interview.
- **Source**: https://www.finalroundai.com/ ; https://www.unite.ai/final-round-ai-review/

### 7. Huntr / Revarta (STAR-story extraction tools)
- **What they do / who for**: Huntr's Interview Question Generator produces likely interview questions (including "tell me about yourself" and behavioral questions) from a resume + job posting; Revarta's "AI Story Builder" ingests an uploaded resume and **extracts candidate STAR stories** from it automatically (i.e., mines existing text for accomplishment narratives rather than asking the user to author them from a blank page).
- **Source**: https://huntr.co/product/interview-question-generator ; https://www.revarta.com/product/interview-story-builder

---

# Recommendations for the grill-me session

Patterns that recur across all three categories and are directly transferable to a one-question-at-a-time personal-website discovery interview:

1. **Import before you interview.** Teal (LinkedIn import), Kickresume (resume upload), Final Round AI (document upload), and Revarta (mine existing resume text for STAR stories) all front-load by ingesting whatever the user already has, then ask only what's *missing*, rather than starting from a blank page. Before asking the user to describe a project from scratch, check if it's mentioned in the repo/README/commit history and ask a targeted follow-up instead of a generic open question.

2. **Convert big fuzzy questions into small forced choices.** Reclaim and Motion don't ask "how do you want to work?" — they ask 3-4 discrete toggles (proactive/reactive, low/med/high, tag priority) that map directly to a system parameter. For ambiguous areas of the site (e.g. tone, how much personal life to show), offer a short menu of concrete options rather than an open-ended "what's your style?"

3. **One question at a time, with the AI asking its own follow-ups — don't front-load a mega-prompt.** The Forbes/Jodie Cook prompt chain explicitly instructs the model to keep the conversation open and ask clarifying follow-ups rather than answering everything from one input. This directly validates the "grill me one question at a time" structure already planned — each answer should be allowed to spawn a natural follow-up rather than moving through a fixed script mechanically.

4. **Three-pass distillation structure (extract → compress → stress-test).** The Sarah Hernholm / Forbes chain is the strongest reusable macro-structure found: (a) surface raw recurring patterns from lived material ("what themes keep showing up?"), (b) compress into a few candidate framings in different registers (analytical / mission-driven / practical — directly reusable as "how would you describe this project to a recruiter vs. a fellow engineer vs. a non-technical friend?"), (c) stress-test the resulting statement against real decisions ("what should you prioritize / what would dilute this focus?"). Consider running the whole "positioning" portion of the interview through this 3-pass shape.

5. **Anchor everything to "what problem do you solve for whom."** This single question recurs verbatim or near-verbatim across Taplio ("what is the one problem you solve better than anyone else?"), SelfBrand AI ("what is the exact problem your ideal client will pay you to solve?"), and BrandingGPT ("how do you want to be perceived by your audience?"). It should likely be an early, load-bearing question in the interview — probably framed as "who is this website for, and what do you want them to walk away thinking/doing?"

6. **Use a fixed content-pillar taxonomy to sort answers, not just collect them.** Taplio's Authority Builders / Engagement Drivers / Trust Signals split, and the "5-3-2" content-mix rule, suggest that after gathering raw project/experience answers, it's worth explicitly asking which of 2-3 buckets each item belongs in (e.g., "flagship/authority project" vs "shows range/breadth" vs "shows personality/process") so the resulting site has intentional variety rather than a flat list.

7. **Force quantification explicitly, and give an escape hatch.** Rezi's separate "Generate Bullet" vs. "Generate Bullet with Key Numbers" modes, and its STAR 10-scenario checklist, show the value of a *second pass* that asks "any numbers/metrics you can attach to that?" after the first free-form answer, rather than requiring it upfront (which stalls people who don't have a number handy).

8. **Use the STAR skeleton for pulling project stories.** Situation → Task/Role → Action → Result → (Rezi adds) "what did you learn?" is a clean 4-5 question micro-sequence to run per project, distinct from the higher-level positioning questions. Rezi's list of 10 behavioral-scenario prompts (conflict, setback, competing priorities, pressure, data-driven decision, persuasion, difficult communication, teamwork, initiative) is also a good checklist to make sure the interview surfaces soft-skill/process stories, not just technical bullet points.

9. **Recurring vs. one-time intake.** Sunsama's identical daily-ritual structure and Careerflow's "short questionnaire + recurring goal check-ins" both suggest that not everything needs to be asked once — some questions (e.g., "what are you working on now that isn't on the site yet?") could reasonably be re-asked in future sessions rather than crammed into the first pass. Worth flagging to the user that the interview can be resumed/re-run rather than needing to be exhaustive in one sitting.

10. **Offer a "fast mode" escape valve.** Final Round AI's explicit "no long onboarding" positioning is a reminder that some users (or some sections of the site) don't need the full grill — it may be worth checking in periodically ("want to go deeper on this, or move on?") rather than assuming maximum depth is always wanted.

11. **Personality/identity fields beyond the resume-shaped ones.** Enhancv's "strengths / passions / life philosophy" fields and Rocky.ai's upfront Big Five-style self-assessment both point at asking a few identity-level questions early (not just "what have you built" but "what do you care about / how do you want to come across"), since that framing shapes how all the later project answers get written up.
