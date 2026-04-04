---
name: chain-b-review
description: >
  Code review and PR audit chain. 4-step cascade: React pattern audit ->
  TypeScript/DX critique -> test and a11y audit -> CSS/Tailwind audit.
  Triggers via fullstack-council router on "review my code", "PR review",
  "audit this", or explicit Call /chain-b-review.
---

# Chain B — Code Review / PR Audit

Submit code, PR diff, or file path before invoking. Each step audits
independently and writes an Artifact. files_changed > 3 auto-activates
the P1 Verifier (verification.rule.md).

---

## B1 — React Pattern Audit
**Skill:** `react-core-lead`

Produce:
- Numbered issue list with rationale
- Refactored snippet per violation
- Check: Hooks rules, unnecessary re-renders, missing Suspense,
  useEffect for data fetching, class components in greenfield
- `[Verify]`: local reasoning preservation confirmed per refactor

Generate **Implementation Plan Artifact: `b1-react-audit`** before B2.

---

## B2 — TypeScript + DX Critique
**Skill:** `theo-browne-fullstack-advisor`

Read Artifact `b1-react-audit` — honor all Constraints Forward.

Run Pattern Flags against all files:

| Pattern | Verdict |
|---------|---------|
| `any` type | Flag — type it or justify |
| Manual API types | Flag — drift risk |
| REST + no Zod | Flag — add Zod |
| 5+ layers on CRUD | Flag — justify each |
| useEffect for data | Flag — RSC or TanStack |
| Barrel index.ts | Flag — TS perf regression |
| Class components | Flag |

`[Verify]`: all flags resolved or explicitly documented.

Generate **Task List Artifact: `b2-ts-audit`** before B3.

---

## B3 — Test + A11y Audit
**Skill:** `kent-dodds-quality-lead`

Read Artifacts `b1-react-audit` + `b2-ts-audit` — honor all Constraints Forward.

Produce:
- RTL query priority audit (getByRole hierarchy enforced)
- Flag implementation detail tests and over-mocking
- A11y violations: missing aria-label, div onClick, unlabelled inputs
- Copy-pasteable fix per violation
- `[Verify]`: single Next Step + confirmation method

Generate **Task List Artifact: `b3-quality-audit`** before B4.

---

## B4 — CSS / Tailwind Audit
**Skill:** `adam-wathan-design-system`

Read Artifact `b1-react-audit` (UI code scope) — honor Constraints Forward.

Run 5-point Audit Heuristic:
1. Whitespace — spacing scale consistency
2. Color — palette constrained to 50/500/900
3. Typography — clear type hierarchy
4. Alignment — grid adherence
5. Visual weight — primary CTA first fixation

Flag: arbitrary values without justification, premature extraction, BEM
where utilities suffice.
`[Verify]`: Tailwind v4 compatibility confirmed.

Generate **Task List Artifact: `b4-ui-audit`**.

Chain complete. Consolidated findings from b1 through b4 emitted as
final output referencing all four Artifacts.
