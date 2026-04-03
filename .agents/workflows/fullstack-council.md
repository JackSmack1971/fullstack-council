---
name: fullstack-council
description: >
  Master orchestration workflow for the Full-Stack Advisory Council — routes
  deterministically across 8 developer persona skills: rauchg-tech-lead-architect,
  react-core-lead, adam-wathan-design-system, kent-dodds-quality-lead,
  optimizing-web-performance, theo-browne-fullstack-advisor, pragmatic-engineer-em,
  and wes-bos-fullstack-educator. Activate with /fullstack-council. Use when the
  user needs multi-persona advisory, architecture review, feature implementation
  orchestration, PR/code review, performance remediation, team/EM guidance, or
  full-stack teaching workflows.
---

# Full-Stack Advisory Council — Master Workflow

## Purpose

This workflow provides **deterministic, multi-persona orchestration** across 8
specialist skills. The agent must NOT rely solely on keyword-triggered semantic
routing. Every step below explicitly names the required skill by its `name`
metadata parameter. Execute each step in sequence unless the routing table
redirects to a sub-chain.

---

## Step 0 — Intent Classification (mandatory first step)

Before invoking any skill, classify the user's request into exactly one primary
intent using this table:

| Intent | Routing Target |
|--------|---------------|
| Greenfield feature / full implementation | → Chain A (Feature) |
| Code review / PR audit | → Chain B (Review) |
| Architecture / stack decision | → Chain C (Architecture) |
| Performance / CWV remediation | → Chain D (Performance) |
| Teaching / onboarding / explanation | → Chain E (Teaching) |
| Engineering management / team/org advice | → Single: `pragmatic-engineer-em` |
| Tailwind / CSS / design system only | → Single: `adam-wathan-design-system` |
| Testing / a11y only | → Single: `kent-dodds-quality-lead` |
| React patterns / Hooks / Concurrent | → Single: `react-core-lead` |
| T3 stack / tRPC / TypeScript DX critique | → Single: `theo-browne-fullstack-advisor` |

State the classification out loud: "**Intent: [intent]. Routing to: [chain/skill].**"

---

## Chain A — Feature Implementation (Greenfield)

Execute all 5 steps in order. Do not skip steps.

### A1 — Architecture Gate
Execute the `rauchg-tech-lead-architect` skill.
Task: Produce a K.E.R.N.E.L. architecture decision including stack choice,
component routing strategy (Server vs Client), edge vs Node runtime decisions,
and a Mermaid architecture diagram. Output must include a `[Verify]` step.
**Stop criterion:** User confirms architecture OR agent satisfies K.E.R.N.E.L. [L].

### A2 — Component + Data-Flow Design
Execute the `react-core-lead` skill.
Task: Design the component tree, data-flow, and Hooks strategy based on the A1
architecture output. Produce a Mermaid component diagram and trade-offs table.
Verify local reasoning is preserved.

### A3 — UI Composition
Execute the `adam-wathan-design-system` skill.
Task: Apply TMK ontology to the A2 component output. Produce utility-first
Tailwind markup for all UI surfaces. Run the 5-point Audit Heuristic
(whitespace → color → type → alignment → visual weight). Include Tailwind v4
specifics where applicable.

### A4 — Quality Gate
Execute the `kent-dodds-quality-lead` skill.
Task: Produce K.E.R.N.E.L. test coverage plan using the Testing Trophy. Write
integration tests (RTL + MSW) for all critical paths from A2. Run A11y audit
against A3 output. Flag any `getByTestId` usage or missing `aria-label`.

### A5 — Performance Verification
Execute the `optimizing-web-performance` skill.
Task: Apply K.E.R.N.E.L. single-fix format to verify the A1–A4 output against
CWV thresholds (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1). Identify the single
worst CWV risk in the proposed implementation. Provide exact Lighthouse CLI
verification command.

---

## Chain B — Code Review / PR Audit

### B1 — React Pattern Audit
Execute the `react-core-lead` skill.
Task: Review submitted code for Hooks violations, unnecessary re-renders,
missing Suspense boundaries, and anti-patterns. Apply K.E.R.N.E.L. structure.
Output: numbered issues + refactored snippet per issue.

### B2 — TypeScript + DX Critique
Execute the `theo-browne-fullstack-advisor` skill.
Task: Run Pattern Flags table against B1 output. Flag: `any` types, missing
Zod validation, barrel files, REST without schema, `useEffect` data fetching,
5+ abstraction layers on CRUD operations. Emit verdict per pattern.

### B3 — Test + A11y Audit
Execute the `kent-dodds-quality-lead` skill.
Task: K.E.R.N.E.L. audit of test coverage from B1 code. Check RTL query
priority order. Flag implementation detail tests. Run a11y audit — check
`aria-label`, semantic HTML, `<div onClick>`, form label associations.

### B4 — CSS/Tailwind Audit
Execute the `adam-wathan-design-system` skill.
Task: Apply 5-point Audit Heuristic to B1 UI code. Check: spacing scale
consistency, color palette constraint (50/500/900), type hierarchy, grid
alignment, visual weight. Flag `p-[17px]`-style arbitrary values without
justification.

---

## Chain C — Architecture Decision

### C1 — Trade-off Analysis
Execute the `pragmatic-engineer-em` skill.
Task: Apply K.E.R.N.E.L. + REFLECT framework to surface org-level trade-offs,
delivery risks, and team scaling implications. Must reference concrete
experience patterns. Output: pros/cons table + Actionable Recommendation box.
**Constraint:** Advisory only — no code output.

### C2 — Technical Architecture
Execute the `rauchg-tech-lead-architect` skill.
Task: Produce full K.E.R.N.E.L. architecture output informed by C1 constraints.
Run Architecture Review SOP checklist (all 8 steps). Default to Next.js +
Vercel unless C1 constraints explicitly prohibit.

### C3 — DX Sanity Check
Execute the `theo-browne-fullstack-advisor` skill.
Task: Review C2 architecture for over-engineering. Ask: "What problem does
each abstraction layer solve?" Flag any T3 axiom violations. Apply ReAct loop
if agentic tooling is available. Deliver final verdict: Ship / Revise / Scrap.

---

## Chain D — Performance Remediation

### D1 — CWV Diagnosis (Loop Entry)
Execute the `optimizing-web-performance` skill.
Task: Identify single worst CWV metric. Apply K.E.R.N.E.L. single-fix format.
Output must include: current metric value → target → delta. Provide exact
Lighthouse CLI or DevTools command. Loop: re-execute D1 for next metric until
all three pass (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1).

### D2 — INP Branch (conditional — only if INP is failing)
Execute the `react-core-lead` skill.
Task: Diagnose re-render cascade causing interaction delay. Apply Concurrent
features — `useTransition`, `useDeferredValue`. Produce React Profiler
simulation trace.

### D3 — LCP Branch (conditional — only if LCP is failing)
Execute the `rauchg-tech-lead-architect` skill.
Task: Evaluate ISR, streaming SSR, and edge cache strategy for LCP improvement.
Apply K.E.R.N.E.L. architecture output. Verify with `vercel deploy --prod`
+ Lighthouse re-run.

---

## Chain E — Teaching Mode

### E1 — Build the Working Example
Execute the `wes-bos-fullstack-educator` skill.
Task: Produce working, copy-paste-ready code in Wes Bos B1 format. Must
include: imports, real file names, step-by-step breakdown, Hot Tip,
Next Level upgrade. TypeScript + Tailwind v4 defaults.

### E2 — Add Test Coverage
Execute the `kent-dodds-quality-lead` skill.
Task: Write integration tests (RTL + MSW) for the E1 example. Apply Testing
Trophy. One `[Next Step]` at end. Provide `[Verify]` statement.

### E3 — Style the Example
Execute the `adam-wathan-design-system` skill.
Task: Apply TMK audit to E1 UI. Produce Tailwind utility-first markup.
Extract to component only if pattern repeats ≥ 3 times. Verify Tailwind v4
compatibility.

---

## Inter-Skill Handoff Protocol

When passing output between skills, use this envelope structure:

```
HANDOFF: [Source Skill Name] → [Target Skill Name]
CONTEXT: [1-sentence summary of what was produced]
ARTIFACTS: [list of outputs — code snippets, diagrams, decisions]
CONSTRAINTS FORWARD: [any constraints the source skill established that the
                      target must honor]
OPEN QUESTIONS: [unresolved items the target should address]
```

The receiving skill must acknowledge the handoff before proceeding.

---

## Global Constraints (apply to all chains)

1. **Always explicitly name the skill** — never rely solely on semantic routing.
2. **K.E.R.N.E.L. is the contract** — every skill output must include [Verify].
3. **Single goal per skill invocation** — do not ask one skill to do Chain A + B.
4. **`pragmatic-engineer-em` is advisory-only** — never route code tasks to it.
5. **`optimizing-web-performance` is single-fix enforced** — loop it, don't batch.
6. **Under Strict Mode:** all network-dependent verification steps (Lighthouse,
   PageSpeed Insights) require explicit allowlist configuration.
7. **Tech debt is a blocking issue** — if `rauchg-tech-lead-architect` detects
   tech debt introduction, halt the chain and re-route to Chain C.
