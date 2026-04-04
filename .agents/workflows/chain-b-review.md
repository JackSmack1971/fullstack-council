---
name: chain-b-review
description: >
  Code review and PR audit chain. 4-step cascade: React pattern audit →
  TypeScript/DX critique → test and a11y audit → CSS/Tailwind audit.
  Triggers via fullstack-council router on "review my code", "PR review",
  "audit this", or explicit Call /chain-b-review.
---

# Chain B — Code Review / PR Audit

Submit the code, PR diff, or file path before invoking. Each step audits
independently — findings do not block the next step unless a P1 Verifier
halt is triggered (files_changed > 3 auto-activates `verification.rule.md`).

---

## B1 — React Pattern Audit
**Skill:** `react-core-lead`

Produce:
- Numbered issue list with rationale per issue
- Refactored snippet for each violation
- Explicit check: Hooks rules, unnecessary re-renders, missing Suspense,
  class components in greenfield code, `useEffect` for data fetching
- `[Verify]`: local reasoning preservation confirmed for each refactor

Emit HANDOFF envelope before B2.

---

## B2 — TypeScript + DX Critique
**Skill:** `theo-browne-fullstack-advisor`

Input: B1 HANDOFF artifacts + original code.

Run Pattern Flags table against all files:

| Pattern | Verdict |
|---------|---------|
| `any` type | Flag — type it or justify |
| Manual API types (no tRPC/codegen) | Flag — drift risk |
| REST + no Zod validation | Flag — add Zod |
| 5+ abstraction layers on CRUD | Flag — justify each layer |
| `useEffect` for data fetching | Flag — RSC or TanStack Query |
| Barrel `index.ts` re-exports | Flag — TS perf regression |
| Class components | Flag |

Emit per-pattern verdict. `[Verify]`: all flags resolved or documented.

Emit HANDOFF envelope before B3.

---

## B3 — Test + A11y Audit
**Skill:** `kent-dodds-quality-lead`

Input: B1 + B2 HANDOFF artifacts.

Produce:
- RTL query priority audit (enforce `getByRole` first hierarchy)
- Flag implementation detail tests and over-mocking
- A11y violations: missing `aria-label`, `<div onClick>`, unlabelled inputs
- Copy-pasteable fixes for each violation
- `[Verify]`: single `[Next Step]` + confirmation method

Emit HANDOFF envelope before B4.

---

## B4 — CSS / Tailwind Audit
**Skill:** `adam-wathan-design-system`

Input: UI code from B1 scope.

Run 5-point Audit Heuristic:
1. Whitespace — spacing scale consistency
2. Color — palette constrained to 50/500/900 per hue
3. Typography — clear hierarchy in type scale
4. Alignment — grid adherence
5. Visual weight — primary CTA receives first eye fixation

Flag: arbitrary values without justification, premature component extraction,
BEM or custom CSS where utilities suffice.
`[Verify]`: Tailwind v4 compatibility confirmed.

**Chain complete.** Consolidated findings summary across B1–B4 emitted as
final output block.
