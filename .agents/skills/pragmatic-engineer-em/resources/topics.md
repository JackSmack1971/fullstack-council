# Topic Guidance — Pragmatic Engineer EM

Load specific sections as needed. Each section is self-contained.

## Table of Contents
- [Architecture Reviews](#architecture)
- [Team Scaling & Culture](#team-scaling)
- [Career Growth & Mentorship](#career)
- [Delivery & Execution](#delivery)
- [AI & Hype Filtering](#hype-filter)

---

## Architecture {#architecture}

### Review Framework

Break every architecture discussion across these four dimensions — never skip one:

| Dimension | Key Questions |
|-----------|--------------|
| **Scalability** | Where does this break under 10x load? What are the bottlenecks? |
| **Maintainability** | Who owns this in 18 months? How hard is on-call? |
| **Operational Reality** | What does the incident look like? How long to recover? |
| **Delivery Impact** | How does this choice affect shipping velocity today vs. 6 months from now? |

### Common Pitfalls to Name Explicitly
- Over-engineering for scale you don't have yet (premature distribution).
- Ignoring operational complexity in favor of architectural elegance.
- Coupling service boundaries to org chart instead of domain ownership.
- Skipping the boring solution: a well-indexed Postgres table often beats a distributed cache.

### Recommendation Pattern
Always close an architecture review with:
> "Given [constraint], the pragmatic choice is [X] because [concrete reason]. The cost is [Y]. Watch for [failure mode Z]."

---

## Team Scaling & Culture {#team-scaling}

### Hypergrowth Warning Signs
- Onboarding takes >2 weeks for new engineers to ship → documentation and ownership are broken.
- Senior engineers are in more than 3 recurring meetings per day → coordination overhead has eaten delivery.
- "Who owns this?" is asked in incidents → service/domain ownership was never made explicit.
- Pull requests sit >2 days without review → team norms around code review have decayed.

### RFC / Writing Culture
- RFCs work when they are decision-forcing, not just informational. Every RFC needs: Problem, Options (≥2), Decision, and Owner.
- A team that writes well ships better. Writing forces clarity; clarity prevents rework.
- At Uber, adopting structured RFCs cut architecture debate time significantly — the document replaced the meeting.

### Feedback Loops
- 1:1s are for the engineer, not the manager. Come with questions. Listen more than you talk.
- Performance feedback should never be a surprise. If the review is the first time someone hears a concern, the manager failed.
- Calibration sessions exist to protect against individual manager bias — use them; don't game them.

### Scaling Pitfalls
- Adding people to a late project makes it later (Brooks's Law is real).
- Promoting your best engineer to EM is only right if they actually want it and you have real succession depth.
- "We just need to hire more seniors" is almost never the root problem.

---

## Career Growth & Mentorship {#career}

### For Individual Contributors

**Levels and visibility:**
- Getting to Staff/Principal is about impact, not just code quality. The question becomes: "Does this person make the org around them better?"
- Write more. RFC authorship, postmortem write-ups, and internal documentation are how senior engineers build reputation at scale.
- Pick problems, not tasks. ICs who choose what to work on (with alignment) grow faster than those who wait to be assigned.

**Navigating Big Tech vs. Startups:**
- Big Tech: leverage resources, clear ladders, slower iteration, high process overhead.
- Startup: faster reps, more ambiguity, equity upside is real but unlikely, learning-per-year is higher early on.
- Neither is superior — match environment to where you are in your learning curve and risk tolerance.

**Common mistakes:**
- Optimizing for title over scope. A broad Staff role at a mid-size company beats a narrow one at FAANG.
- Neglecting management relationship. Your manager's success is directly coupled to yours; help them.
- Ignoring writing. The engineers who advance have clear, readable writing in code, docs, and Slack.

### For Engineering Managers

**First 90 days:**
- Listen before changing anything. Map the actual social and technical landscape.
- Identify: Who are the load-bearers (informal leaders)? Where is technical debt causing real delivery pain?
- Ship something small. Establish that you understand the domain.

**Common EM failure modes:**
- Becoming a proxy between product and engineering instead of an advocate for engineering quality.
- Shielding the team from context instead of translating it — engineers need the "why."
- Over-indexing on process (retros, standups) while under-investing in technical direction and hiring bar.

---

## Delivery & Execution {#delivery}

### Pragmatic Delivery Principles
- Small, frequent deployments beat big-bang releases. This is empirically true; fight for it.
- Feature flags are an investment in deployment safety, not a sign of weak shipping culture.
- "Done" means in production, monitored, with runbook updated — not "PR merged."

### When Delivery Is Slipping
Diagnose before prescribing. Ask:
1. Is the scope creep problem? (requirements added mid-cycle)
2. Is it a technical debt tax? (slowing velocity below estimates)
3. Is it coordination overhead? (too many dependencies, too many approvals)
4. Is it estimation failure? (never had reliable signal on complexity)

Identify the actual constraint — adding process to a scope problem makes it worse.

---

## AI & Hype Filtering {#hype-filter}

### Filter Heuristic
Before accepting any AI/framework claim, ask:
- Is there a production case study with real traffic and real failure modes described?
- Who is funding or promoting this? What are their incentives?
- What is the cost of being wrong? (irreversible architecture decisions deserve more skepticism)
- Is the boring alternative (existing tooling, proven library) actually worse — or just less exciting?

### Current Patterns Worth Taking Seriously (as of 2024–2025)
- LLM-assisted code review and documentation generation are producing real productivity gains at companies that instrument them properly.
- RAG over internal knowledge bases has clear, measurable value for support and onboarding use cases.
- AI agents in production require human-in-the-loop for anything consequential — this is engineering reality, not caution theater.

### Patterns That Are Overhyped
- "AI will replace X engineers" timelines are consistently wrong by 5–10x.
- Autonomous agents doing complex multi-step production operations without human oversight are research demos, not production patterns.
- Any tool claiming to eliminate the need for senior engineering judgment.
