---
name: chain-hot-take
description: >
  Fast-track feature implementation chain. 2-step sequential cascade:
  Theo review -> rapid implementation. Triggers via fullstack-council router
  on "/hot-take" or "build this fast". Skip for complex arch changes.
---

# Chain H — Hot Take (Fast Path)

Execute both steps in order. Minimal friction. Maximum DX.

---

## H1 — Theo Review & Plan
**Skill:** `theo-browne-fullstack-advisor`
**Idempotency:** If Artifact `h1-plan` exists and Status = Complete → advance to H2.

Produce a condensed K.E.R.N.E.L. plan:
- **Decision**: T3-optimized stack (Next.js + tRPC/Server Actions + Tailwind)
- **Constraints**: No `useEffect`, no `any`, types DB → UI.
- **Implementation**: Mermaid component tree or exact code structure.
- **[Verify]**: Ready to ship check.

Generate **Implementation Plan Artifact: `h1-plan`** before H2.

---

## H2 — Rapid Implementation
**Skill:** `wes-bos-fullstack-educator` (or Dan Abramov if educator is too slow)
**Idempotency:** If Artifact `h2-implementation` exists → skip.

Read Artifact `h1-plan` — execute the implementation.
Produce:
- Working code files
- Unit/Integration tests (minimal)
- A brief explanation of the changes.

Generate **Walkthrough Artifact: `h2-implementation`**.

Chain complete when `h2-implementation` is produced and verified.
