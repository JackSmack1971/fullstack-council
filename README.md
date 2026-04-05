# 🏛️ Full-Stack Advisory Council v3.6 — Zero-Trust & MCP-Enforced

- **Welcome!**
- Imagine walking into a boardroom where the world's best web developers, architects, and engineers are waiting to help you build your app. That’s exactly what the Full-Stack Advisory Council is — a team of **specialized AI personas** that work together like a real engineering crew.

## What Is This Project?

- **Project Name:** Full-Stack Advisory Council
- **Purpose:** A deterministic, multi-agent AI orchestration pipeline designed to architect, implement, review, and optimize full-stack web applications.

Instead of asking one generic AI to “build something,” you talk to a structured council. The experts hand work off to each other in clear steps so the final result is fast, secure, clean, and production-ready.

## 🌌 Powered by Google Antigravity

This council is deeply integrated with the **Google Antigravity** native metaprogramming ecosystem.

### Deterministic Orchestration

Unlike generic wrappers or probabilistic semantic routers, the Council leverages Antigravity's native workflow engine:

- **Explicit Routing**: No central manifest or probabilistic keyword matching. Routing is driven by deterministic `.agents/workflows/*.md` files using **@mentions**.
- **Secure State Capture**: All sequential handoffs utilize the **// capture** directive, maintaining stateless environment isolation.
- **Hardware-Level Isolation**: Zero-trust execution via **Firecracker Micro-VMs** (Hardware Virtualization), shielding the host from rogue agent execution.

## 🪑 The Council – Atomic & Specialized Skills

The system uses **Atomic Splitting** to ensure each skill does one thing perfectly. Monolithic domains are broken into granular capabilities:

### Core Personnel

- **Guillermo Rauch (Architecture)** — Next.js/Vercel edge architecture and AI patterns.
- **Dan Abramov (React)** — RSC, Concurrent rendering, and modern Hooks.
- **Adam Wathan (Design Systems)** — Utility-first CSS and Tailwind v4 token hierarchy.
- **Kent C. Dodds (Quality)** — Integration testing and A11y verification.

### Atomic Optimization (Addy Osmani Series)

- **Parallel Performance** — Chain D utilizes the **// parallel** directive to execute LCP, INP, and CLS optimizations concurrently.

### Meta & Security

- **Troy Hunt (Security)** — Threat modeling and zero-trust hardening.
- **Kelsey Hightower (SRE)** — Infrastructure, systems architecture, and Kubernetes.
- **Harrison Chase (AI)** — LangChain orchestration and agentic workflows.

### Chain Commands (Deterministic Pipelines)

| Command | What happens |
| --- | --- |
| `/chain-a-feature` | **Build**: Product → T3 Axioms → Architecture → AI/Data → React → UI → Quality → Perf (8-step Pilot) |
| `/chain-b-review` | **Review**: React audit → Tech audit → DX Check → Tests (4 steps) |
| `/chain-c-architecture` | **Decide**: Trade-off analysis → Technical architecture → DX sanity check (3 steps) |
| `/chain-d-performance` | **Fix performance**: Baseline → **[Parallel]** LCP/INP/CLS branches → Regression gate (6 steps) |
| `/chain-e-teaching` | **Learn**: Working example → Tests → Styled UI, explained step-by-step (3 steps) |
| `/chain-f-security` | **Harden**: Threat model → Secrets audit → Auth → Data boundary → Security tests → Headers (6 steps) |
| `/chain-g-payments` | **Bill**: Strategy/Compliance → Technical Integration → Webhooks/Idempotency (3 steps) |
| `/ship` | **Ship**: Deterministic Atomic Validation → Commit → Telemetry → Push (**// turbo-all**) |

### Utility & Recovery Commands

| Command | Purpose |
| --- | --- |
| `/resume` | Deterministic recovery using native Antigravity Knowledge Items. |
| `/observe` | Show session summary + **Pulse Dashboard** telemetry. |
| `/doc-audit` | Digital Librarian: Scan project for documentation rot and semantic drift. |
| `/trifecta` | Clover Verification Lead: Functional correctness (Trifecta) audit. |
| `/chain-meta` | Self-Audit: framework health check for skills and registry integrity. |

### Single-Skill Shortcuts (no chain overhead)

| Command | Persona |
| --- | --- |
| `/em-advice` | Gergely Orosz — EM/org/trade-off advice |
| `/tailwind` | Adam Wathan — Tailwind/CSS/design system |
| `/testing` | Kent C. Dodds — Tests and a11y |
| `/react` | Dan Abramov — React patterns and Hooks |
| `/sre` | Kelsey Hightower — Kubernetes/Infrastructure/SRE |
| `/data` | Martin Kleppmann — Data systems/Consistency |
| `/security` | Troy Hunt — Security audit/Hardening |
| `/product` | Lenny Rachitsky — Product strategy/Growth |
| `/ux` | Sarah Drasner — Interaction/Animation |
| `/ai` | Harrison Chase — AI orchestration/RAG |
| `/t3-review` | Theo Browne — T3 DX critique |

* * *

## 🛠️ Default Technology Stack

| Layer | Default |
| --- | --- |
| Framework | Next.js 15 (App Router, Server Components) |
| Language | TypeScript 5.x (strict) |
| Styling | Tailwind CSS v4 |
| Data Layer | Drizzle ORM + PostgreSQL |
| Validation | Zod (all runtime boundaries) |
| Auth | Better Auth or Clerk |

## 🚀 Native Protocols

### 1. Deterministic Orchestration (Workflow-First)

Skill discovery is **stateless**. The Council uses explicit workflows in `.agents/workflows/` to manage the handoff sequence. Probabilistic semantic routing and legacy manifests are deprecated.

### 2. Axiom Gate 3.5 (A0.5)

The **[A0.5 Axiom Gate](file:///.agents/rules/axiom-gate-a05.rule.md)** is a native, axiom-enforced rule that validates T3 transport layers and schema integrity within the model's reasoning loop.

### 3. State Security (DEV#POPPER Protection)

Observability and state passing are protected by the **[Secure State](file:///.agents/rules/secure-state.md)** rule. All terminal commands referencing captured state variables ($STATE) require human authorization via the "Request Review" policy.

### 4. Context Recovery (Resilient)

Interrupted sessions are resumed via `/resume`. Intent is reconstructed dynamically from **Antigravity Knowledge Items** and bridged by a local **`/tmp/session-snapshot.json`** buffer to mitigate indexing latency.

* * *

## 🛡️ Zero-Trust Sandboxing (v3.6)

The Council utilizes **Firecracker Micro-VMs** for hardware-level process isolation:

- **Primary Substrate**: Firecracker (KVM on Linux, WSL2/Hyper-V on Windows).
- **Fallback**: Google Antigravity Native Strict Mode (Seatbelt/nsjail kernel-level sandboxing).
- **Execution Policy**: Network access is denied by default unless explicitly whitelisted via MCP metadata.

* * *

## 🔁 /resume — Context Recovery Guide (v3.5)

### Overview

The Full-Stack Advisory Council v3.5 uses **Intent-driven State Reconstruction**. Because chat history is volatile but the Artifact panel and Knowledge Items are persistent, session recovery is handled by querying the Antigravity Knowledge Item ecosystem to reconstruct the most recent task state.

### /resume — Recovery Logic

The recovery process is now deterministic and stateless reaching beyond the local filesystem.

| Phase         | Behavior                                                              | Target Source        |
|---------------|-----------------------------------------------------------------------|----------------------|
| **1. Verify** | Ensures Antigravity Strict Mode is active and environment is secure. | Global Rule Baseline |
| **2. Query**  | Scans Antigravity Knowledge Items for recent task context and intent. | Knowledge Repository |
| **3. Capture** | Injects context into `$KNOWLEDGE_STATE` via the `// capture` directive. | VM Task Memory       |
| **4. Validate** | Evaluates the captured state against the K.E.R.N.E.L. schema.        | A0.5 Axiom Gate      |
| **5. Resume** | Re-invokes the last active workflow at the identified checkpoint.     | Native Workflows     |

### How It Works

1. **Knowledge Extraction**: The agent queries the native Antigravity Knowledge Items (KI). These items represent the distilled source of truth for the project's evolution and specific task progress.
2. **Intent Reconstitution**: By analyzing recent KIs, the orchestrator identifies the last chain (e.g., `/chain-a-feature`) and the last successfully generated Artifact (e.g., `a2-components`).
3. **Stateless Resumption**: No reliance on `handoff.json`. The system assumes a "clean slate" micro-virtual machine and pulls state only from authorized knowledge boundaries.

### Limitations & Edge Cases

- **KI Latency**: In rare cases where a Knowledge Item has not yet been indexed, recovery may fallback to the most recent Artifact status.
- **handoff.json**: This file is **DEPRECATED**. If found, the system will ignore it and proceed with Knowledge-based recovery to ensure security and determinism.
- **A0.5 Gate**: The T3 Axiom check remains a mandatory validation hurdle before any feature builds resume.

> [!IMPORTANT]
> **Zero-State Resilience**: /resume is designed to work even if the entire local `.agents/state/` directory is purged. As long as the Antigravity Knowledge Items exist, the council can reconstruct its mission.

**Stateless. Secure. Deterministic Knowledge Recovery.**

* * *

## 🔁 Firebase Migration (Native Pathways)

The council includes a first-class workflow for migrating from legacy Firebase Studio environments.

- **GUI**: Click "Move now" in Firebase Studio -> "Zip and Download" -> Extract -> call `@fbs-to-agy-export`.
- **CLI**: Run `npx firebase-tools@latest studio:export <path>` before launching Antigravity.

* * *

## ⚠️ Known Limitations & Governance

- Requires **Google Antigravity**.
- **YAML Frontmatter**: Mandatory only for **Skills** (`SKILL.md`) to define `allowed-tools` boundaries. Global Rules (`*.rule.md`) remain pure Markdown.
- **MCP Registry**: Managed at the global path `~/.gemini/antigravity/mcp_config.json`.
