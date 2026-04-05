# 🏛️ Full-Stack Advisory Council v3.6 — Zero-Trust & Progressive Disclosure

**Welcome!** The Full-Stack Advisory Council is a **sequential constraint-injection framework** built natively on Google Antigravity. Rather than asking one generic AI to "build something," you invoke structured skill phases that mathematically narrow the reasoning model's solution space — delivering architecture decisions, component design, UI systems, and quality gates in deterministic sequence.

## What Is This Project?

- **Project Name:** Full-Stack Advisory Council
- **Purpose:** A deterministic workflow orchestration framework that applies progressive skill constraints within a single Antigravity reasoning thread to architect, implement, review, and optimize full-stack web applications.

> [!IMPORTANT]
> **Architecture Reality:** The Council does *not* spawn multiple AI agents or custom sub-agents. Skills are system-prompt constraints applied sequentially in one reasoning thread. For true parallel execution, use the **Agent Manager** (`Ctrl+E` / `Cmd+E`) to spawn independent top-level agents — one per concurrent task.

## 🌌 Powered by Google Antigravity

This council is deeply integrated with the **Google Antigravity** native metaprogramming ecosystem.

### Deterministic Orchestration

Unlike generic wrappers or probabilistic semantic routers, the Council leverages Antigravity's native workflow engine:

- **Explicit Routing**: No manifest or probabilistic keyword matching. Routing is driven by deterministic `.agents/workflows/*.md` files resolved via slash commands.
- **Secure State Capture**: Sequential phases use the **`// capture`** directive to pass structured state variables forward, narrowing each phase's solution space without external orchestrators.
- **OS-Level Isolation**: Zero-trust execution via **Antigravity Strict Mode** (Seatbelt on macOS, nsjail on Linux, WSL2 on Windows), enforced by the `strict-mode-enforcer` skill.

## 🪑 The Council — Sequential Expertise & Native Parallelism

### Architecture Reality Check: The Sub-Agent Boundary

The Full-Stack Advisory Council framework relies on **Progressive Disclosure Phases** to mathematically steer a single reasoning model. To understand why, you must understand the underlying Antigravity orchestration boundaries:

1. **Native Antigravity Sub-agents (Auto-delegated)**: You cannot disable native sub-agents. The main reasoning agent operates as a high-level planner and transparently delegates tasks to specialized internal models (e.g., the Browser Subagent for DOM traversal or the Terminal Subagent).
2. **The UI Limitation**: Google Antigravity's consumer UI does not currently allow developers to manually author, register, or spawn custom programmatic sub-agents.
3. **The Council's Workaround**: To bypass the UI limitation, this framework simulates sub-agents by sequentially injecting `SKILL.md` constraints into the primary reasoning thread.
4. **Google Agent Dev Kit (Enterprise Path)**: To build a true hierarchical swarm where an Orchestrator spawns isolated, customized sub-agents that run parallel tasks, you must abandon the IDE's UI layer and utilize the underlying Google Agent Dev Kit APIs.

> [!NOTE]
> **Token Optimization:** Antigravity evaluates planning inside verbose reasoning passes. Chaining too many persona switches in a single prompt incurs a hidden token tax against your 5-hour rolling sprint capacity. `/chain-a-feature` has been consolidated to **4 phases** (down from 8) and uses `// turbo` directives to bypass unnecessary human-in-the-loop bottlenecks during sequential context shifts.
>
> [!TIP]
> **True Parallel Execution:** Open **Agent Manager** (`Ctrl+E` / `Cmd+E`) → click `+` to spawn a new top-level agent → assign it to this workspace. Each top-level agent is an independent reasoning thread. This is the *only* native path to concurrent execution — not `@persona` tags within a single chain.

### Skill Roster (Persona-Scoped Constraints)

- **`rauchg-tech-lead-architect`** — Next.js/Vercel edge architecture and AI patterns.
- **`react-core-lead`** — RSC, Concurrent rendering, and modern Hooks.
- **`adam-wathan-design-system`** — Utility-first CSS and Tailwind v4 token hierarchy.
- **`optimizing-web-performance`** — CWV remediation and Lighthouse analysis.

### Atomic Optimization (Addy Osmani Series)

- **Focused Performance** — Chain D applies LCP, INP, and CLS skills sequentially with single-fix enforcement per skill.

### Meta & Security

- **Troy Hunt (Security)** — Threat modeling and zero-trust hardening.
- **Kelsey Hightower (SRE)** — Infrastructure, systems architecture, and Kubernetes.
- **Harrison Chase (AI)** — LangChain orchestration and agentic workflows.

### Chain Commands (Deterministic Pipelines)

| Command | What happens |
| --- | --- |
| `/chain-a-feature` | **Build**: Architecture + Axiom Gate → Component Design → UI Composition → Quality + Perf Baseline (**4 Progressive Disclosure Phases**) |
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

Interrupted sessions are resumed via `/resume`. Intent is reconstructed from **Antigravity Knowledge Items** (persistent across sessions) and the `.agents/state/kernel-state.json` handoff file written by the active chain.

* * *

## 🛡️ Zero-Trust Sandboxing (v3.6)

The Council utilizes Antigravity's native terminal isolation for process security:

- **Primary Substrate**: Google Antigravity Native Strict Mode (Seatbelt on macOS, nsjail on Linux, WSL2 on Windows).
- **Execution Policy**: Network access is denied by default in the terminal sandbox.
- **Network Exceptions**: There is no automated "whitelist." If a workflow requires downloading dependencies (e.g., `npm install`), the agent will halt and trigger a "Request Review." The developer must manually click **"Bypass Sandbox"** for that single command to permit temporary network traversal.

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

## 📡 Telemetry & Data Governance Reality Check

**CRITICAL WARNING FOR ENTERPRISE USERS:** This framework enforces local OS sandboxing (Strict Mode) to prevent *execution* vulnerabilities, but **it cannot prevent cloud telemetry ingestion.**

- **The "Enable Telemetry" Toggle:** Disabling `Settings > Account > Enable Telemetry` only stops diagnostic crash reporting. **It does not opt you out of model training data collection.**
- **Consumer Tiers (Free / AI Pro / AI Ultra):** By default, your prompts, codebase context, and generated artifacts are logged and may be reviewed by human evaluators to train future Gemini models.
- **True Zero-Retention:** To achieve actual, legally binding data privacy (Zero-Data Retention), you must bypass the consumer tier by connecting Antigravity through an authenticated **Google Workspace** or **Google Cloud Platform (Vertex AI)** enterprise account.

Do not paste production API keys or proprietary algorithmic logic into the IDE unless operating under a Workspace/GCP SLA. For managing keys, rely exclusively on `mcp_config.json` environmental injection.
