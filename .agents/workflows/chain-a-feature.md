---
name: chain-a-feature
description: >
  Greenfield feature implementation chain. 5-step sequential cascade:
  architecture → component design → UI composition → quality gate →
  performance verification. Triggers via fullstack-council router on
  "build this", "implement", "new feature", or explicit Call /chain-a-feature.
---

# Chain A — Feature Implementation

Execute all 5 steps in strict order. Do not skip. Each step's `[Verify]`
output is the entry condition for the next step.

---

## A1 — Architecture Gate
**Skill:** `rauchg-tech-lead-architect`

Produce a full K.E.R.N.E.L. architecture decision:
- Stack choice with justification
- Server vs Client component routing strategy
- Edge vs Node runtime decision matrix
- Mermaid architecture diagram
- `[Verify]`: `vercel deploy --prod` check or equivalent

**Stop condition:** User confirms OR K.E.R.N.E.L. `[L]` (Call to Action) satisfied.

Emit HANDOFF envelope before A2.

---

## A2 — Component + Data-Flow Design
**Skill:** `react-core-lead`

Input: A1 HANDOFF `CONSTRAINTS_FORWARD` + architecture diagram.

Produce:
- Mermaid component tree
- Hooks strategy (no `useEffect` for data fetching)
- Suspense boundary placement
- Trade-offs table for state management approach
- `[Verify]`: local reasoning preservation statement

Emit HANDOFF envelope before A3.

---

## A3 — UI Composition
**Skill:** `adam-wathan-design-system`

Input: A2 HANDOFF component tree.

Produce:
- Utility-first Tailwind markup for all UI surfaces
- 5-point Audit Heuristic pass: whitespace → color → type → alignment → visual weight
- Tailwind v4 specifics applied
- Component extraction only if pattern repeats ≥ 3 times
- `[Verify]`: no arbitrary values (`p-[Npx]`) without documented reason

Emit HANDOFF envelope before A4.

---

## A4 — Quality Gate
**Skill:** `kent-dodds-quality-lead`

Input: A2 component tree + A3 markup.

Produce:
- Testing Trophy integration test plan (RTL + MSW)
- Tests for all critical paths from A2
- A11y audit of A3 output: `aria-label`, semantic HTML, form labels
- Flag any `getByTestId` usage or `<div onClick>`
- `[Verify]`: single `[Next Step]` for the user to confirm coverage

Emit HANDOFF envelope before A5.

---

## A5 — Performance Verification
**Skill:** `optimizing-web-performance`

Input: full A1–A4 implementation scope.

Produce (K.E.R.N.E.L. single-fix format):
- Worst CWV risk in the proposed implementation
- Current projected metric → target → delta
- Exact Lighthouse CLI command for verification
- `[Verify]`: pass criteria against thresholds (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1)

**Chain complete** when A5 `[Verify]` passes.
If any CWV metric fails post-deploy: `Call /chain-d-performance`.
