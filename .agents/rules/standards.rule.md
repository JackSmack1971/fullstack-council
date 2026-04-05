# Fullstack Council — Standards & SOPs

This document contains the canonical rules and protocols that all skills MUST honor. Offloaded from `GEMINI.md` for token efficiency.

## 1. Artifact Protocol (canonical definition)

Every skill invocation MUST generate an Artifact using the following K.E.R.N.E.L. schemas.

### Implementation Plan Artifact
Used by: `rauchg-tech-lead-architect`, `react-core-lead`, `pragmatic-engineer-em`.

```markdown
# [Skill Name] — Implementation Plan
Chain Step: [e.g., A1]  |  Status: Complete / Blocked

## Decision
[K.E.R.N.E.L. output — architecture choice, component design, or trade-off verdict]

## Diagram
[Mermaid architecture or component tree]

## Constraints Forward
[What every subsequent skill in this chain MUST honor]

## Verify
[Exact CLI command or test criteria — must be runnable in <5 min]

## Open Questions
[Unresolved items for the next skill to address]
```

### Task List Artifact
Used by: `kent-dodds-quality-lead`, `adam-wathan-design-system`, `optimizing-web-performance`, `theo-browne-fullstack-advisor`, `wes-bos-fullstack-educator`.

```markdown
# [Skill Name] — Task List
Chain Step: [e.g., A4]  |  Status: In Progress / Complete

## Tasks
- [x] [Task] — [result or evidence]
- [ ] [Task] — pending

## Violations Found
[Evidence blocks: input → actual → expected]

## Constraints Forward
[What subsequent skills must honor]

## Verify
[Confirmation method — command or manual check]
```

---

## 2. Global Anti-Patterns

- `getServerSideProps` / `getStaticProps` in App Router — use async RSC.
- `useEffect` for data fetching — use RSC or TanStack Query.
- `any` TypeScript type without a documented suppression reason.
- Barrel files (`index.ts` re-exporting everything) — TS performance regression.
- Installing a custom server (Express/Koa) instead of Next.js Route Handlers.
- `NEXT_PUBLIC_` prefix on sensitive environment variables.
- Raw DB rows serialized to Client Components (hashedPassword, totpSecret exposure).
- tRPC procedures without `.input()` Zod schema.
- Server Actions accepting unvalidated `FormData` without Zod parsing.

---

## 3. Handoff Persistence Logic

When a chain redirects (e.g., A0.5 Redirection), serialize the session state to `.agents/state/handoff.json`:

```json
{
  "resume_chain": "...",
  "resume_intent": "...",
  "opted_stack": "...",
  "missing": ["..."],
  "chain_history": ["..."],
  "parked_at": "ISO-TIMESTAMP"
}
```

- **Handoff must be explicitly announced to the user.**
- **Handoff must be re-affirmed with `/resume` before execution restarts.**
- **Handoff TTL: 60 minutes.**
