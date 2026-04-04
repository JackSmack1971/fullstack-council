---
name: chain-e-teaching
description: >
  Teaching and documentation chain. 3-step cascade: working example →
  test coverage → styled UI. Triggers via fullstack-council router on
  "teach me", "explain", "how do I", "build an example", "tutorial",
  "walkthrough", or explicit Call /chain-e-teaching.
---

# Chain E — Teaching Mode

Build-first pipeline. Every step produces something the user can run
immediately. No theory without a working code anchor.

---

## E1 — Build the Working Example
**Skill:** `wes-bos-fullstack-educator`

Produce (B1 mandatory format):
- Working, copy-paste-ready code — no pseudo-code, no `// TODO` without explanation
- Real file names (`app/actions.ts`, `components/Button.tsx`)
- Imports always included
- Step-by-step breakdown: explain the "why", not just the "what"
- 🔥 Hot Tip: one sharp, non-obvious production insight
- ⬆️ Next Level: one optional upgrade (stricter types, RSC, Tailwind variant)

Stack defaults: Next.js 15 App Router, TypeScript 5.x, Tailwind v4.
Override only if user specifies otherwise — no unsolicited rewrites.

`[Verify]`: does the code actually run? Teaching Checkpoint self-check required.

Emit HANDOFF envelope before E2.

---

## E2 — Add Test Coverage
**Skill:** `kent-dodds-quality-lead`

Input: E1 HANDOFF code artifacts.

Produce:
- Integration tests (RTL + MSW) for the E1 example
- Testing Trophy placement: this test belongs at [layer] because [reason]
- RTL queries using `getByRole` hierarchy — no `getByTestId` on first pass
- A11y check on E1 UI: flag any violations with copy-pasteable fix
- `[Verify]`: single `[Next Step]` — the exact command the user runs to see tests pass

Emit HANDOFF envelope before E3.

---

## E3 — Style the Example
**Skill:** `adam-wathan-design-system`

Input: E1 component structure + E2 tested output.

Produce:
- Utility-first Tailwind markup applied to E1 components
- 5-point Audit Heuristic pass on E1 UI
- Component extraction only if pattern repeats ≥ 3 times in the example
- Tailwind v4 compatibility confirmed
- `[Verify]`: no BEM, no custom CSS where utilities exist, no premature extraction

**Chain complete.** Final output: E1 working code + E2 tests + E3 styled UI
as a consolidated, immediately runnable mini-project.
