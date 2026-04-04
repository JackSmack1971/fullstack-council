---
name: chain-c-architecture
description: >
  Architecture decision chain. 3-step cascade: EM trade-off analysis →
  technical architecture → DX sanity check. Triggers via fullstack-council
  router on "architect this", "stack decision", "tech lead review", "should
  we use X", or explicit Call /chain-c-architecture. Also receives re-routes
  from chain-a-feature when tech debt is detected by rauchg-tech-lead-architect.
---

# Chain C — Architecture Decision

Advisory-first pipeline. C1 is non-negotiable — no architecture without
trade-off analysis. C1 produces no code. C2 produces the architecture.
C3 issues the ship/revise/scrap verdict.

---

## C1 — Trade-off Analysis
**Skill:** `pragmatic-engineer-em`

**Constraint:** Advisory only. Zero code output. No implementation details.

Produce (K.E.R.N.E.L. + REFLECT framework):
- Org-level trade-offs: delivery risk, team scaling implications, maintenance cost
- Pros/cons table for each viable approach
- Reference concrete experience patterns (Uber/Skype/Skyscanner analogues)
- Explicit failure modes for the recommended path
- `[Verify]`: REFLECT self-check — grounded in delivery experience, hype-free,
  actionable by a working EM tomorrow

**Boxed Actionable Recommendation required before C2 proceeds.**

Emit HANDOFF envelope with `CONSTRAINTS_FORWARD` — C2 must honor all constraints
established here (budget, team capability, delivery timeline, org risk tolerance).

---

## C2 — Technical Architecture
**Skill:** `rauchg-tech-lead-architect`

Input: C1 HANDOFF `CONSTRAINTS_FORWARD` (mandatory — do not architect without it).

Run Architecture Review SOP checklist (all 8 steps):
- [ ] Read problem statement (K — Context)
- [ ] Restate goal in one sentence (E — Task)
- [ ] List constraints from C1 forward (R — Constraints)
- [ ] Draft architecture diagram — Mermaid (N — Format)
- [ ] Define success criteria + test command (E — Verify)
- [ ] Issue call to action (L — Call to Action)
- [ ] Check for tech debt introduction — **halt chain if found**
- [ ] Confirm edge runtime used where latency matters

Default stack: Next.js + Vercel unless C1 constraints prohibit.
`[Verify]`: `vercel deploy --prod` or equivalent CLI command provided.

**Tech debt halt protocol:** If step 7 fails, emit:
`[TECH DEBT HALT] Detected: [description]. Chain C re-starts at C1 with
revised constraints. Do not proceed to C3.`

Emit HANDOFF envelope before C3.

---

## C3 — DX Sanity Check
**Skill:** `theo-browne-fullstack-advisor`

Input: C2 HANDOFF architecture artifacts.

Produce ReAct loop audit:
```
Thought: "What problem does each abstraction layer solve?"
Action:  Enumerate layers. Justify each against a concrete user/dev need.
Observe: Flag any layer that cannot be justified in one sentence.
Answer:  Verdict — Ship / Revise / Scrap
```

Check T3 axioms:
- Does it solve specific problems or create puzzles?
- Is type safety end-to-end (DB → API → UI)?
- Is each abstraction modular and composable?

`[Verify]`: Single verdict with evidence. No ambiguous "it depends" conclusions.

**Chain complete.** Final output: C1 trade-off table + C2 architecture diagram +
C3 verdict, consolidated into one deliverable block.
