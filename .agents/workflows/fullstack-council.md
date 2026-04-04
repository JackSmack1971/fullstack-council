---
name: fullstack-council
description: >
  Master router for the Full-Stack Advisory Council. Classifies intent and
  dispatches to the correct chain sub-workflow. Triggers on: architecture review,
  feature build, code review, PR audit, performance remediation, CWV fix,
  teaching request, stack decision, or any multi-persona advisory task.
---

# Full-Stack Advisory Council — Router

## Step 0 — Intent Classification (mandatory)

Classify the request into exactly one primary intent. State it aloud:
`"Intent: [intent]. Routing to: [chain]."`

| Intent | Route |
|--------|-------|
| Greenfield feature / full implementation | `Call /chain-a-feature` |
| Code review / PR audit | `Call /chain-b-review` |
| Architecture / stack decision | `Call /chain-c-architecture` |
| Performance / CWV remediation | `Call /chain-d-performance` |
| Teaching / onboarding / explanation | `Call /chain-e-teaching` |
| EM / team scaling / org advice only | Execute `pragmatic-engineer-em` skill directly |
| Tailwind / CSS / design system only | Execute `adam-wathan-design-system` skill directly |
| Testing / a11y only | Execute `kent-dodds-quality-lead` skill directly |
| React patterns / Hooks / Concurrent only | Execute `react-core-lead` skill directly |
| T3 / tRPC / TypeScript DX only | Execute `theo-browne-fullstack-advisor` skill directly |

## Global Constraints (apply to all chains)

1. Explicitly name every skill — never rely solely on semantic routing.
2. K.E.R.N.E.L. `[Verify]` is the inter-skill handoff condition — no `[Verify]` = step incomplete.
3. Single goal per skill invocation.
4. `pragmatic-engineer-em` is advisory-only — never route code tasks to it.
5. `optimizing-web-performance` is single-fix enforced — loop it, never batch.
6. Tech debt detected by `rauchg-tech-lead-architect` is a chain halt → re-route to `/chain-c-architecture`.
