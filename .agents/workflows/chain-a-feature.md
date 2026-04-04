---
name: chain-a-feature
description: >
  Greenfield feature implementation chain. 5-step sequential cascade:
  architecture -> component design -> UI composition -> quality gate ->
  performance verification. Triggers via fullstack-council router on
  "build this", "implement", "new feature", or explicit Call /chain-a-feature.
---

# Chain A — Feature Implementation

Execute all 5 steps in strict order. Do not skip. Each step generates an
Artifact before the next step reads it (P3 Wizard enforced).

---

## A1 — Architecture Gate
**Skill:** `rauchg-tech-lead-architect`
**Idempotency:** If Artifact `a1-architecture` exists and Status = Complete → skip, read Artifact, advance to A2.

Produce full K.E.R.N.E.L. architecture decision:
- Stack choice with justification
- Server vs Client component routing strategy
- Edge vs Node runtime decision matrix
- Mermaid architecture diagram
- `[Verify]`: `vercel deploy --prod` check or equivalent

**Stop condition:** User confirms OR K.E.R.N.E.L. [L] (Call to Action) satisfied.

Generate **Implementation Plan Artifact: `a1-architecture`** before A2.

---

## A2 — Component + Data-Flow Design
**Skill:** `react-core-lead`
**Idempotency:** If Artifact `a2-components` exists and Status = Complete → skip, read Artifact, advance to A3.

Read Artifact `a1-architecture` — honor all Constraints Forward.

Produce:
- Mermaid component tree with Hooks strategy
- Suspense boundary placement
- Trade-offs table for state management
- `[Verify]`: local reasoning preservation statement

Generate **Implementation Plan Artifact: `a2-components`** before A3.

---

## A3 — UI Composition
**Skill:** `adam-wathan-design-system`
**Idempotency:** If Artifact `a3-ui` exists and Status = Complete → skip, read Artifact, advance to A4.

Read Artifact `a2-components` — honor all Constraints Forward.

Produce:
- Utility-first Tailwind markup for all UI surfaces
- 5-point Audit Heuristic: whitespace -> color -> type -> alignment -> visual weight
- Tailwind v4 specifics applied
- Component extraction only if pattern repeats >= 3 times
- `[Verify]`: no unjustified arbitrary values

Generate **Task List Artifact: `a3-ui`** before A4.

---

## A4 — Quality Gate
**Skill:** `kent-dodds-quality-lead`
**Idempotency:** If Artifact `a4-quality` exists and Status = Complete → skip, read Artifact, advance to A5.

Read Artifacts `a2-components` + `a3-ui` — honor all Constraints Forward.

Produce:
- Testing Trophy integration test plan (RTL + MSW)
- Tests for all critical paths from `a2-components`
- A11y audit of `a3-ui` output: aria-label, semantic HTML, form labels
- Flag any getByTestId usage or div onClick
- `[Verify]`: single Next Step for user to confirm coverage

Generate **Task List Artifact: `a4-quality`** before A5.

---

## A5 — Performance Verification
**Skill:** `optimizing-web-performance`
**Idempotency:** If Artifact `a5-performance` exists and Status = Complete → chain already complete, report results.

Read Artifacts `a1-architecture` through `a4-quality` — honor all Constraints Forward.

Produce (K.E.R.N.E.L. single-fix format):
- Worst CWV risk in the proposed implementation
- Current projected metric -> target -> delta
- Exact Lighthouse CLI command
- `[Verify]`: pass criteria (LCP <=2.5s, INP <=200ms, CLS <=0.1)

Generate **Task List Artifact: `a5-performance`**.

Chain complete when `a5-performance` Verify passes.
CWV failure post-deploy: `Call /chain-d-performance` (reads `a5-performance`).
