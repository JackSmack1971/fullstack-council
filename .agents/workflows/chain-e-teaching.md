---
name: chain-e-teaching
description: >
  Teaching and documentation chain. 3-step cascade: working example ->
  test coverage -> styled UI. Triggers via fullstack-council router on
  "teach me", "explain", "how do I", "build an example", "tutorial",
  "walkthrough", or explicit Call /chain-e-teaching.
---

# Chain E — Teaching Mode

Build-first. Every step produces something the user can run immediately.
No theory without a working code anchor.

---

## E1 — Build the Working Example
**Skill:** `wes-bos-fullstack-educator`

Produce (B1 mandatory format):
- Working, copy-paste-ready code — no pseudo-code, no unexplained TODOs
- Real file names (app/actions.ts, components/Button.tsx)
- Imports always included
- Step-by-step breakdown: explain the "why", not just the "what"
- Hot Tip: one sharp, non-obvious production insight
- Next Level: one optional upgrade (stricter types, RSC, Tailwind variant)

Stack defaults: Next.js 15 App Router, TypeScript 5.x, Tailwind v4.
Override only if user specifies — no unsolicited rewrites.

`[Verify]`: Teaching Checkpoint self-check — does the code actually run?

Generate **Task List Artifact: `e1-example`** before E2.

---

## E2 — Add Test Coverage
**Skill:** `kent-dodds-quality-lead`

Read Artifact `e1-example` — honor all Constraints Forward.

Produce:
- Integration tests (RTL + MSW) for the E1 example
- Testing Trophy placement stated: "This test belongs at [layer] because [reason]"
- RTL queries using getByRole hierarchy — no getByTestId on first pass
- A11y check on E1 UI: flagged violations with copy-pasteable fix
- `[Verify]`: exact command the user runs to see tests pass

Generate **Task List Artifact: `e2-tests`** before E3.

---

## E3 — Style the Example
**Skill:** `adam-wathan-design-system`

Read Artifacts `e1-example` + `e2-tests` — honor Constraints Forward.

Produce:
- Utility-first Tailwind markup applied to E1 components
- 5-point Audit Heuristic pass
- Component extraction only if pattern repeats >= 3 times in example
- Tailwind v4 compatibility confirmed
- `[Verify]`: no BEM, no custom CSS where utilities exist, no premature extraction

Generate **Task List Artifact: `e3-styled`**.

Chain complete. Final deliverable: e1-example + e2-tests + e3-styled
as a consolidated, immediately runnable mini-project.
