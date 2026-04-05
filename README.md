# 🏛️ Full-Stack Advisory Council v3.5 — Deterministic & Axiom-Enforced

- **Welcome!**  
- Imagine walking into a boardroom where the world's best web developers, architects, and engineers are waiting to help you build your app. That’s exactly what the Full-Stack Advisory Council is — a team of **specialized AI personas** that work together like a real engineering crew.
- 
- ## What Is This Project?
- **Project Name:** Full-Stack Advisory Council  
- **Purpose:** A deterministic, multi-agent AI orchestration pipeline designed to architect, implement, review, and optimize full-stack web applications.
- 
- Instead of asking one generic AI to “build something,” you talk to a structured council. The experts hand work off to each other in clear steps so the final result is fast, secure, clean, and production-ready.
- 

## 🌌 Powered by Google Antigravity
This council is deeply integrated with the **Google Antigravity** native metaprogramming ecosystem.

### Native Metaprogramming
Unlike generic wrappers, the Council leverages Antigravity's core routing engine:
- **Native Routing**: No central manifest. Routing is driven by strictly-typed YAML frontmatter in localized `SKILL.md` files.
- **Deterministic Activation**: Keyword-dense, third-person capability descriptions mathematically guarantee that the right expert is called at the right time.
- **Progressive Disclosure**: Detailed persona instructions are only loaded when the skill is active, optimizing token efficiency.

## 🪑 The Council – Atomic & Specialized Skills
The system uses **Atomic Splitting** to ensure each skill does one thing perfectly. Monolithic domains are broken into granular capabilities:

### Core Personnel
- **Guillermo Rauch (Architecture)** — Next.js/Vercel edge architecture and AI patterns.
- **Dan Abramov (React)** — RSC, Concurrent rendering, and modern Hooks.
- **Adam Wathan (Design Systems)** — Utility-first CSS and Tailwind v4 token hierarchy.
- **Kent C. Dodds (Quality)** — Integration testing and A11y verification.

### Atomic Optimization (Addy Osmani Series)
- **LCP-Optimization** — Image preloading, fetchpriority, and server response.
- **INP-Optimization** — Main-thread blocking and interaction latency.
- **CLS-Optimization** — Aspect ratios and reserved layout slots.

### Meta & Security
- **Troy Hunt (Security)** — Threat modeling and zero-trust hardening.
- **Kelsey Hightower (SRE)** — Infrastructure, systems architecture, and Kubernetes.
- **Harrison Chase (AI)** — LangChain orchestration and agentic workflows.

### Chain Commands (multi-persona pipelines)

| Command | What happens |
| --- | --- |
| `/chain-a-feature` | **Build**: Architecture → Component → UI → Quality → Performance (5 steps) |
| `/chain-b-review` | **Review**: React audit → TypeScript/DX → Tests/A11y → CSS audit (4 steps) |
| `/chain-c-architecture` | **Decide**: Trade-off analysis → Technical architecture → DX sanity check (3 steps) |
| `/chain-d-performance` | **Fix performance**: Baseline → Bundle reduction → LCP/INP/CLS branches → Regression gate (6 steps) |
| `/chain-e-teaching` | **Learn**: Working example → Tests → Styled UI, explained step-by-step (3 steps) |
| `/chain-f-security` | **Harden**: Threat model → Secrets audit → Auth → Data boundary → Security tests → Headers (6 steps) |
| `/chain-g-payments` | **Bill**: Strategy/Compliance → Technical Integration → Webhooks/Idempotency (3 steps) |
| `/ship` | **Ship**: Atomic Validation → Commit → Telemetry → Push (Origin Main) |

### Utility & Recovery Commands

| Command | Purpose |
| --- | --- |
| `/resume` | Auto-detect last active chain and resume at last incomplete step |
| `/resume [a-f]` | Explicitly resume a specific chain (A-F) |
| `/discard` | Delete `handoff.json` and clear parked context |
| `/observe` | Show session summary + **Pulse Dashboard** telemetry |
| `/doc-audit` | Digital Librarian: Scan project for documentation rot and semantic drift |
| `/trifecta` | Clover Verification Lead: Functional correctness (Trifecta) audit |
| `/chain-meta` | Self-Audit: framework health check for skills, router, and registry integrity |

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
| `/trifecta` | Clover Verification Lead — Functional correctness audit |
| `/t3-review` | Theo Browne — T3 stack DX critique |

* * *

## 🛠️ Default Technology Stack

| Layer | Default |
| --- | --- |
| Framework | Next.js 15 (App Router, Server Components) |
| Language | TypeScript 5.x (strict) |
| Styling | Tailwind CSS v4 |
| API | tRPC or Server Actions |
| Validation | Zod (all runtime boundaries) |
| Database | Drizzle ORM + PostgreSQL |
| Auth | Better Auth or Clerk |
| Runtime | Edge-first; Node serverless for DB-heavy routes |
| Testing | RTL + MSW + Vitest (integration-first) |

Any layer can be overridden — just specify in your command.

* * *

### 1. Skill Discovery & Authoritative Registry
Skill discovery is **stateless**. The Council uses an authoritative index (`registry.md`) to manage the persona fleet.
- **Single Source of Truth**: `.agents/registry.md`
- **Validation**: `node .agents/scripts/registry-tool.js --lint` ensures all skills are compliant and indexed.
- **Drift Detection**: The framework warns if `SKILL.md` files are modified without updating the registry date.

### 2. Artifact Protocol 3.5 (Axiom-Integrated)
Every handoff uses **strictly typed Markdown** validated against the K.E.R.N.E.L. schema:
- **T3 Axiom Gate (A0.5)**: Chain A is blocked until a type-safe transport layer and `drizzle_schema` are verified.
- **`kernel_schema` Enforcement**: Every skill defines a contract of required sections.
- **Regex Validation**: `validate-kernel.js` ensures zero technical debt in every Artifact.

### 3. Real-Time Observability (The Pulse Dashboard)
Observability uses a **Passive Interceptor Pattern** (`observability.rule.md`) to update the Pulse Dashboard (`council-pulse.md`) on every session close.

### 4. Context Recovery
Interrupted sessions can be resumed via `/resume`. Intent is parked in `.agents/state/handoff.json` when a chain is redirected (e.g., from A0.5 to Architecture).

### 5. Governance: The Authority Stack

Seven priority rules (P0–P5) oversee every turn:
- **P0**: User Intent (Manual override)
- **P0.1**: Observability (Pulse/Session Logging)
- **P1**: Verification (Adversarial)
- **P1.1**: **Validation Gate (Strict Kernel Enforcement)**
- **P2**: Context Compression
- **P3**: Artifact Protocol (Wizard)
- **P4**: Anchors (Constraints)
- **P5**: Colleague (Judgment)

* * *

## 📁 Workspace File Structure

    ~/.gemini/
      GEMINI.md                    ← Global config (cross-workspace)
    
    .agents/
      rules/
        observability.rule.md      ← P0.1: session logging
        verification.rule.md       ← P1: adversarial verifier
        context.rule.md            ← P2: context compression
        wizard.rule.md             ← P3: Artifact protocol
        anchors.rule.md            ← P4: word count constraints
        colleague.rule.md          ← P5: judgment > compliance
        predictive-routing.rule.md ← P6: predictive routing
    
      workflows/
        chains.json                ← Machine-readable chain registry
        fullstack-council.md       ← Master router (/fullstack-council)
        chain-a-feature.md         ← /chain-a-feature
        ...
        chain-hot-take.md          ← /hot-take
    
      scripts/
        registry-tool.js           ← Framework Health Check / Skill Registry
        validate-kernel.js         ← K.E.R.N.E.L. Schema Validator
    
      skills/
        [skill-name]/
          SKILL.md                 ← Persona behavior + kernel_schema
    
      session-log.md               ← Multi-turn orchestration log

* * *

## 🛡️ Security & Sandboxing

Google Antigravity uses OS-native kernel-level sandboxing — **not WSL2**:

* **macOS**: Seatbelt (`sandbox-exec`) kernel mechanism
* **Linux**: nsjail process isolation

When **Strict Mode** is enabled, network access is denied by default. The council's Strict Mode allowlist includes `pagespeed.web.dev` (performance chain), `vercel.com` (deploy verification), and `npmjs.com` (dependency resolution). The Browser subagent operates within the same allowlist.

* * *

## 🔁 Example Session

    You:    /chain-a-feature Add a dashboard with a data table and export to CSV
    
    [A1] rauchg-tech-lead-architect  → Architecture decision + Mermaid diagram
                                     → Artifact: `a1-architecture` ✓
    [A2] react-core-lead             → Component tree + Hooks strategy
                                     → Artifact: `a2-components` ✓
    [A3] adam-wathan-design-system   → Tailwind markup + design audit
                                     → Artifact: `a3-ui` ✓
    [A4] kent-dodds-quality-lead     → Integration tests + a11y audit
                                     → Artifact: `a4-quality` ✓
    [A5] optimizing-web-performance  → CWV projection + Lighthouse command
                                     → Artifact: `a5-performance` ✓
    
    You:    /observe
    
    [OBS P0] Session summary:
    Chains run:     chain-a-feature
    Steps complete: 5 / 5
    Artifacts:      a1-architecture·Complete, a2-components·Complete,
                    a3-ui·Complete, a4-quality·Complete, a5-performance·Complete
    Halts:          0
    Rule fires:     P1:0 P2:1 P3:0 P4:4 P5:0

* * *

## 🔁 Firebase Migration (Native Pathways)
The council includes a first-class workflow for migrating from legacy Firebase Studio environments.
- **GUI**: Click "Move now" in Firebase Studio -> "Zip and Download" -> Extract -> call `@fbs-to-agy-export`.
- **CLI**: Run `npx firebase-tools@latest studio:export <path>` before launching Antigravity.

* * *

## ⚠️ Known Limitations

* Requires **Google Antigravity** — does not run in VS Code or Cursor.
* `manifest.json` has been deprecated and removed to prevent "The Map is not the Territory" divergence.
* Rules are pure Markdown and must not contain YAML frontmatter.
