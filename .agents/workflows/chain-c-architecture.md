---
name: chain-c-architecture
description: >
  Architecture decision chain. 3-step cascade: EM trade-off analysis ->
  technical architecture -> DX sanity check. Triggers via fullstack-council
  router on "architect this", "stack decision", "tech lead review", "should
  we use X", or explicit Call /chain-c-architecture. Also receives re-routes
  from chain-a-feature when tech debt is detected.
---

# Chain C — Architecture Decision

Advisory-first. C1 produces no code and writes the constraint Artifact
that C2 and C3 are bound to. C3 issues the final ship/revise/scrap verdict.

---

## C1 — Trade-off Analysis
**Skill:** `pragmatic-engineer-em`
**Idempotency:** If Artifact `c1-tradeoffs` exists and Status = Complete → skip, read Artifact, advance to C2.

**Constraint:** Advisory only. Zero code output.

Produce (K.E.R.N.E.L. + REFLECT):
- Org-level trade-offs: delivery risk, team scaling, maintenance cost
- Pros/cons table per viable approach
- Concrete experience analogues (Uber/Skype/Skyscanner patterns)
- Explicit failure modes for recommended path
- `[Verify]`: REFLECT self-check passed — grounded, hype-free, actionable

Boxed Actionable Recommendation required.

Generate **Implementation Plan Artifact: `c1-tradeoffs`** before C2.
C2 MUST read this Artifact — do not proceed to architecture without it.

---

## C2 — Technical Architecture
**Skill:** `rauchg-tech-lead-architect`
**Idempotency:** If Artifact `c2-architecture` exists and Status = Complete → skip, read Artifact, advance to C3.

Read Artifact `c1-tradeoffs` — all Constraints Forward are binding.

Run Architecture Review SOP checklist:
- [ ] Problem statement absorbed from c1-tradeoffs (K)
- [ ] Goal restated in one sentence (E)
- [ ] Constraints from c1-tradeoffs listed explicitly (R)
- [ ] Mermaid architecture diagram drafted (N)
- [ ] Success criteria + test command defined (E)
- [ ] Call to Action issued (L)
- [ ] Tech debt check — halt chain if found
- [ ] Edge runtime confirmed where latency matters

Tech debt halt: `[TECH DEBT HALT] Detected: [description].
Restarting at C1 with revised constraints. Do not proceed to C3.`

Generate **Implementation Plan Artifact: `c2-architecture`** before C3.

---

## C3 — DX Sanity Check
**Skill:** `theo-browne-fullstack-advisor`
**Idempotency:** If Artifact `c3-verdict` exists and Status = Complete → chain already complete, report results.

Read Artifact `c2-architecture` — honor Constraints Forward.

ReAct audit loop:
```
Thought: What problem does each abstraction layer solve?
Action:  Enumerate layers. Justify each against a concrete need.
Observe: Flag any layer that cannot be justified in one sentence.
Answer:  Verdict — Ship / Revise / Scrap (no "it depends")
```

Check T3 axioms against `c2-architecture`:
- Solves specific problems, not creates puzzles?
- End-to-end type safety: DB -> API -> UI?
- Each abstraction modular and composable?

`[Verify]`: single verdict with evidence.

Generate **Task List Artifact: `c3-verdict`**.

**Context Recovery / Handoff Detection:**
1. Check for presence of `.agents/state/handoff.json`.
2. If found, Parse JSON and Emit:
   > [!IMPORTANT]
   > **PARKED INTENT DETECTED**
   > Resume: "[user_intent]" from [resume_chain]?
   > 
   > Type `/resume` to continue or `/discard` to clear.

Chain complete. Final deliverable: c1-tradeoffs + c2-architecture +
c3-verdict consolidated in one output block.
