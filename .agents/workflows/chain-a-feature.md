---
description: Progressive Disclosure Feature Build — 4-phase sequential constraint injection into the primary reasoning thread. Not a multi-agent pipeline. Each phase narrows the model's solution space before the next phase activates.
---

# Chain A — Feature Build Pipeline

> [!NOTE]
> **Architecture Reality:** This chain does NOT spawn separate sub-agents. It applies
> sequential skill constraints within a single reasoning thread. Each `//capture` directive
> passes structured state forward to narrow the next phase's solution space — mathematically
> steering the model without external MCP orchestrators.
>
> For **true parallel execution** (e.g., running a security audit while building a feature),
> open the Agent Manager (`Ctrl+E`) and spawn a second top-level agent via the `+` button.

## Phase 1 — Architecture & Axiom Gate

Activate skill: `rauchg-tech-lead-architect`

- Validate the T3 Axiom gate (A0.5): confirm Drizzle schema, tRPC/Server Action transport, and Zod boundaries are in scope.
- Produce a K.E.R.N.E.L. Implementation Plan artifact with a Mermaid component tree.
- Identify any tech debt that would block implementation. If found, halt → `/chain-c-architecture`.

// capture ARCH_STATE

## Phase 2 — Component Design & React Boundaries

Activate skill: `react-core-lead`

- Using `$ARCH_STATE`, design the RSC/Client component boundary.
- Specify Server vs. Client Components, data-fetching strategy (RSC async or TanStack), and state management scope.
- Enforce: no `useEffect` for data fetching, no raw DB rows to Client Components.

// capture COMPONENT_STATE

## Phase 3 — UI Composition & Design Tokens

Activate skill: `adam-wathan-design-system`

- Using `$COMPONENT_STATE`, apply Tailwind v4 utility tokens to all components.
- Extract repeated utility patterns into semantic component classes where usage repeats 3+ times.
- Verify typographic scale, spacing, and color token usage against the active design system.

// capture UI_STATE

## Phase 4 — Quality Gate & Performance Baseline

Activate skill: `optimizing-web-performance` then `strict-mode-enforcer`

- Run RTL + MSW integration tests against the implemented components.
- Verify A11y (ARIA roles, keyboard navigation, contrast ratios).
- Capture LCP/INP/CLS baseline. If any metric fails "Good" threshold, halt → `/chain-d-performance`.
- Emit final task list artifact: all phases complete or blocked items listed with evidence.
