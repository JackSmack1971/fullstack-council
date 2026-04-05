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
| --- | --- | --- |
| `/resume` | `Call /resume` | Load `handoff.json` and resume parked intent |
| `/resume-last` | `Call /chain-resume` | Auto-detect last active chain and resume at last incomplete step |
| `/resume [a-f]` | `Call /chain-resume` | Explicitly resume a specific chain (A-F) |
| `/discard` | `Call /discard` | Delete `handoff.json` and clear state |
| `/observe` | Read `session-log` Artifact + emit summary | Inspect what ran, what fired, what halted |
| `/chain-a-feature` | **Build**: Product → **T3 Axioms** → Architecture → AI/Data → React → Tailwind → Tests → Perf (8 steps) | Building a new feature |
| `/chain-a1-user-profile` | **Build**: User Profile Hardened A1 Architecture (Strict Mode + Turbo) | User Profile specific implementation |
| `/chain-a2-components` | **Build**: User Profile Hardened A2 Component Design (Dan Abramov + FQDN) | User Profile specific implementation |
| `/chain-a3-ui` | **Build**: User Profile Hardened A3 UI Composition (Adam Wathan + v4) | User Profile specific implementation |
| `/chain-a4-quality` | **Build**: User Profile Hardened A4 Quality Verification (Kent C. Dodds + MSW) | User Profile specific implementation |
| `/chain-a5-performance` | **Build**: User Profile Hardened A5 Performance Optimization (Lead + CWV) | User Profile specific implementation |
| `/ship` | **Release**: Atomic Build → Commit → **Telemetry** → **Push (Origin Main)** | Feature release and dashboard update |
| `/chain-b-review` | `Call /chain-b-review` | Reviewing code or a PR |
| `/chain-c-architecture` | `Call /chain-c-architecture` | Making a stack or architecture decision |
| `/chain-d-performance` | `Call /chain-d-performance` | Fixing CWV or performance regressions |
| `/chain-e-teaching` | `Call /chain-e-teaching` | Learning, tutorials, or walkthroughs |
| `/chain-f-security` | `Call /chain-f-security` | Security audit, auth review, pre-deploy hardening |
| `/chain-g-payments` | `Call /chain-g-payments` | Payments, billing, Stripe, subscriptions |
| `/chain-hot-take` | `Call /chain-hot-take` | Fast-track implementation for standard T3 patterns |
| `/hot-take` | `Call /chain-hot-take` | Fast-track implementation for standard T3 patterns |
| `/doc-audit` | `Execute doc-rot-audit` | Digital Librarian: Audit code/doc semantic drift |
| `/doc-rot` | `Execute doc-rot-audit` | Digital Librarian: Audit code/doc semantic drift |
| `/clover-check` | `Execute clover-trifecta-check` | Clover Verification Lead: Functional correctness (Trifecta) audit |
| `/trifecta` | `Execute clover-trifecta-check` | Clover Verification Lead: Functional correctness (Trifecta) audit |
| `/chain-meta` | `node .agents/scripts/registry-tool.js --lint --verify-governance` | Self-Audit: lint all SKILL.md frontmatter + verify governance rules |
| `/ship` | `node .agents/scripts/validate-kernel.js --artifact <artifact.md> --skill-path <skill-dir>` | Atomic Ship: Validate the active chain artifact, then commit |
| `/firebase-migration` | `Call /firebase-migration` | Firebase Studio migration — native GUI or CLI pathways |

Single-skill direct invocations (no chain overhead):

| Command | Skill | When |
| --- | --- | --- |
| `/em-advice` | Execute `pragmatic-engineer-em` directly | Advisory on team/org/trade-offs |
| `/tailwind` | Execute `adam-wathan-design-system` directly | UI/UX, Tailwind v4, Design tokens |
| `/testing` | Execute `kent-dodds-quality-lead` directly | Unit/Integration testing, A11y |
| `/react` | Execute `react-core-lead` directly | React patterns, Hooks, RSC |
| `/t3-review` | Execute `theo-browne-fullstack-advisor` directly | T3 stack DX/Architecture critique |
| `/auth` | Execute `better-auth` or `clerk` logic via `rauchg-tech-lead-architect` | Auth-stack decision/impl |
| `/payments` | Execute `stripe` skill via `chain-g-payments` | Stripe/Billing integration |
| `/monitoring` | Execute `sentry-for-ai` directly | Error tracking and observability |
| `/github` | Execute `github` skill directly | Git commits, PRs, Workflow automation |
| `/sre` | Execute `kelsey-hightower-sre` directly | Infrastructure, CI/CD, Kubernetes |
| `/data` | Execute `martin-kleppmann-data-systems` directly | Distributed systems, Consistency, Schema design |
| `/security` | Execute `troy-hunt-security` directly | Threat modeling, Zero-trust hardening |
| `/product` | Execute `lenny-rachitsky-product` directly | Growth strategy, Persona discovery, Roadmaps |
| `/ux` | Execute `sarah-drasner-interaction` directly | Interaction polish, Animation, SVG engineering |
| `/ai` | Execute `harrison-chase-ai-orchestration` directly | RAG, LangChain, Agentic workflows |

---

## Mandatory Command Enforcement

**No Natural Language Fallback.**

If the user's message contains no slash command, DO NOT attempt classification.
EMIT the following hard stop and wait for input:

> [!CAUTION]
> **No explicit command detected.**
> To ensure deterministic execution and prevent silent failures, you MUST use a slash command (e.g., `/chain-a-feature`).
> 
> If you were in the middle of a redirected flow, use `/resume` to continue.

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
5. **Performance Loop**: `optimizing-web-performance` is single-fix enforced; use atomic skills `addyosmani-lcp-optimization`, `addyosmani-inp-optimization`, `addyosmani-cls-optimization` for CWV branches.
6. **Tech Debt Halt**: `rauchg-tech-lead-architect` detected debt halts the chain → `/chain-c-architecture`.
