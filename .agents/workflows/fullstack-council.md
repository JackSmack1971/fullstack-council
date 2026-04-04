---
name: fullstack-council
description: >
  Master router for the Full-Stack Advisory Council. Primary interface is
  explicit slash commands. Natural language classification is a fallback only.
  Invoke directly: /chain-a-feature, /chain-b-review, /chain-c-architecture,
  /chain-d-performance, /chain-e-teaching, /chain-f-security, /chain-g-payments,
  /chain-meta.
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
| `/chain-g-payments` | `Call /chain-g-payments` | Payments, billing, Stripe, subscriptions |
| `/chain-hot-take` or `/hot-take` | `Call /chain-hot-take` | Fast-track implementation for standard T3 patterns |
| `/doc-audit` or `/doc-rot` | `Execute doc-rot-audit` | Digital Librarian: Audit code/doc semantic drift |
| `/clover-check` or `/trifecta` | `Execute clover-trifecta-check` | Clover Verification Lead: Functional correctness (Trifecta) audit |
| `/chain-meta` | `node .agents/scripts/registry-tool.js --all` | Self-Audit: check for orphaned skills or broken router links |
| `/ship` | `node .agents/scripts/validate-kernel.js --all` | Atomic Ship: Validate all session artifacts + commit |

Single-skill direct invocations (no chain overhead):

| Command | Skill | When |
|---------|-------|------|
| `/em-advice` | Execute `pragmatic-engineer-em` directly | Advisory on team/org/trade-offs |
| `/tailwind` | Execute `adam-wathan-design-system` directly | UI/UX, Tailwind v4, Design tokens |
| `/testing` | Execute `kent-dodds-quality-lead` directly | Unit/Integration testing, A11y |
| `/react` | Execute `react-core-lead` directly | React patterns, Hooks, RSC |
| `/t3-review` | Execute `theo-browne-fullstack-advisor` directly | T3 stack DX/Architecture critique |
| `/auth` | Execute `better-auth` or `clerk` logic via `rauchg-tech-lead-architect` | Auth-stack decision/impl |
| `/payments` | Execute `stripe` skill via `chain-g-payments` | Stripe/Billing integration |
| `/monitoring` | Execute `sentry-for-ai` directly | Error tracking and observability |
| `/github` | Execute `github` skill directly | Git commits, PRs, Workflow automation |
| `/hot-take` | Execute `theo-browne-fullstack-advisor` (Chain H entry) | Rapid feature prototyping |
| `/doc-audit` | Execute `doc-rot-audit` directly | Digital Librarian: Doc-Code sync |
| `/clover-check` | Execute `clover-trifecta-check` directly | Functional correctness audit |
| `/trifecta` | Execute `clover-trifecta-check` directly | Functional correctness audit |
| `/sre` | Execute `kelsey-hightower-sre` directly | Infrastructure, CI/CD, Kubernetes |
| `/data` | Execute `martin-kleppmann-data-systems` directly | Distributed systems, Consistency, Schema design |
| `/security` | Execute `troy-hunt-security` directly | Threat modeling, Zero-trust hardening |
| `/product` | Execute `lenny-rachitsky-product` directly | Growth strategy, Persona discovery, Roadmaps |
| `/ux` | Execute `sarah-drasner-interaction` directly | Interaction polish, Animation, SVG engineering |
| `/ai` | Execute `harrison-chase-ai-orchestration` directly | RAG, LangChain, Agentic workflows |

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

1. **Explicit Skill Names**: Never rely on semantic routing; always name the executing skill.
2. **K.E.R.N.E.L. Schema Validation**: Every Artifact MUST follow the structured format:
   - `# [Skill Name]` — Headline
   - `## Decision` — The core logic/output
   - `## Constraints Forward` — What following skills MUST obey
   - `## [Verify]` — The exit condition (CLI or test)
3. **Single Goal**: Each skill invocation focus on a single, atomic task.
4. **Advisory Logic**: `pragmatic-engineer-em` is advisory-only; it never writes code.
5. **Performance Loop**: `optimizing-web-performance` is single-fix enforced.
6. **Tech Debt Halt**: `rauchg-tech-lead-architect` detected debt halts the chain → `/chain-c-architecture`.
