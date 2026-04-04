---
name: fullstack-council
description: >
  Master router for the Full-Stack Advisory Council. Primary interface is
  explicit slash commands. Natural language classification is a fallback only.
  Invoke directly: /chain-a-feature, /chain-b-review, /chain-c-architecture,
  /chain-d-performance, /chain-e-teaching, /chain-f-security.
---

# Full-Stack Advisory Council — Router

## Primary Interface — Explicit Invocation (use this)

Call the chain directly. No classification step. No ambiguity.

| Command | Chain | When |
|---------|-------|------|
| `/resume` or `/resume [a-f]` | `Call /chain-resume` | Returning after a mid-chain session close |
| `/observe` | Read `session-log` Artifact + emit summary | Inspect what ran, what fired, what halted |
| `/chain-a-feature` | `Call /chain-a-feature` | Building a new feature |
| `/chain-b-review` | `Call /chain-b-review` | Reviewing code or a PR |
| `/chain-c-architecture` | `Call /chain-c-architecture` | Making a stack or architecture decision |
| `/chain-d-performance` | `Call /chain-d-performance` | Fixing CWV or performance regressions |
| `/chain-e-teaching` | `Call /chain-e-teaching` | Learning, tutorials, or walkthroughs |
| `/chain-f-security` | `Call /chain-f-security` | Security audit, auth review, pre-deploy hardening |

Single-skill direct invocations (no chain overhead):

| Command | Skill |
|---------|-------|
| `/em-advice` | Execute `pragmatic-engineer-em` directly |
| `/tailwind` | Execute `adam-wathan-design-system` directly |
| `/testing` | Execute `kent-dodds-quality-lead` directly |
| `/react` | Execute `react-core-lead` directly |
| `/t3-review` | Execute `theo-browne-fullstack-advisor` directly |

---

## Fallback — Natural Language Classification

**Only reached if no explicit command was given.**

If the user's message contains no slash command, attempt classification once.
Emit: `"No command detected. Classifying intent — use /chain-[x] to skip this."`
Map to the closest explicit command above and invoke it.
If classification confidence is low, ask: `"Did you mean /chain-[x]?"` — do not
route silently on an ambiguous match.

---

## Global Constraints (apply to all chains)

1. Explicitly name every skill — never rely solely on semantic routing.
2. K.E.R.N.E.L. `[Verify]` is the inter-skill handoff condition — no `[Verify]` = step incomplete.
3. Single goal per skill invocation.
4. `pragmatic-engineer-em` is advisory-only — never route code tasks to it.
5. `optimizing-web-performance` is single-fix enforced — loop it, never batch.
6. Tech debt detected by `rauchg-tech-lead-architect` halts chain → `Call /chain-c-architecture`.
