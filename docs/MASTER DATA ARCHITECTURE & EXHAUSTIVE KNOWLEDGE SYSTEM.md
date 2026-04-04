**MASTER DATA ARCHITECTURE & EXHAUSTIVE KNOWLEDGE SYSTEM**
**System Target:** Google Antigravity Ecosystem, Full-Stack Advisory Council v3.0, and Extensibility Frameworks.

---

### LEVEL 1: MASTER INDEX & ARCHITECTURAL TOPOLOGY

1.  **Entity Database (Core Components & Models)**
2.  **Execution Architecture & Runtime Isolation**
3.  **Data Governance, Telemetry & Threat Vectors**
4.  **Resource Allocation: Deterministic Quotas & Rate Limits**
5.  **Multi-Agent Orchestration & Subagent Dynamics**
6.  **Extensibility Schema: Rules, Skills, Workflows & MCP**
7.  **Semantic Code Comprehension (Tree-sitter AST Parity)**
8.  **Implementation Case Study: Full-Stack Advisory Council v3.0**
9.  **Process Flows: Migration & Deployment Mechanisms**
10. **Knowledge Graph Relationships & Critical Contradictions/Gaps**

---

### LEVEL 2: DETAILED THEMATIC TABLES & STRUCTURED ABSTRACTIONS

#### 1. Entity Database (Core Components & Models)

| Entity / Concept | Definition / Role | Citations |
| :--- | :--- | :--- |
| **Google Antigravity** | An agent-first development platform and VS Code fork functioning as a mission control interface for digital agents to autonomously execute complex software engineering tasks. | |
| **Agent Manager (Mission Control)** | The orchestration layer (accessed via Cmd/Ctrl + E) used to spawn, monitor, pause, and observe multiple agents across different workspaces simultaneously. | |
| **Browser Subagent** | A dedicated sub-model that runs in an isolated Chrome profile, capable of clicking, scrolling, DOM capture, screenshots, and executing JS, bypassing standard UI lockouts. | |
| **Terminal Subagent** | An internal entity delegated by the main reasoning model to execute terminal commands, subject to kernel-level sandboxing. | |
| **Knowledge Items (KIs)** | Antigravity's persistent memory system that automatically captures, analyzes, and organizes insights, code examples, and instructions from user conversations to inform the agent's future responses. | |
| **Artifacts** | Rich markdown files, diff views, diagrams, code diffs, or screenshots the agent creates to asynchronously communicate its work, implementation plans, or required human approvals. | |
| **Gemini 3.1 Pro** | The flagship multimodal and reasoning model powering the core agent, featuring an active context window fluidly operating between 1,000,000 and 2,000,000 tokens. | |
| **Google Agent Dev Kit** | An internal, highly modular framework used to programmatically instantiate Orchestrator Agents and specialized subagent swarms within the Antigravity workspace via API. | |
| **Firebase Studio** | A cloud-based web editor being sunsetted on March 22, 2027, requiring users to migrate projects to Antigravity using the Firebase CLI and zip exports. | |

#### 2. Execution Architecture & Runtime Isolation Vectors

| Platform / Mechanism | Architectural Detail | Isolation Strictness & Vulnerabilities | Citations |
| :--- | :--- | :--- | :--- |
| **macOS Host** | Employs Apple's kernel-level sandboxing mechanism `Seatbelt` (`sandbox-exec`). | Considered deprecated by Apple since ~2016 (App Sandbox is recommended), introducing high forward-compatibility and stability risks against autonomous agents. | |
| **Linux Host** | Utilizes `nsjail` for standard OS-level process sandboxing, cgroups, and namespaces. | Provides basic security but struggles to fully isolate compute resources without incurring overhead or exposing shared kernel vulnerabilities. | |
| **Windows Host** | Relies on Windows Subsystem for Linux 2 (WSL2), a real Linux kernel running under Hyper-V. | This is a critical prerequisite; native Windows virtualization (Windows Sandbox) is not used. Requires `socat` tunnels and `netsh` portproxy rules (stopping `iphlpsvc` on port 9222) for the Browser Subagent's Chrome DevTools Protocol (CDP) bridge to communicate across the WSL2 boundary. | |
| **Docker / DevContainers** | Antigravity displays a notable absence of native, out-of-the-box DevContainer or Docker daemon enforcement for project execution. | Leads to dependency conflicts, hallway hallucinations, and cross-contamination. Container orchestration relies entirely on the Gemini model's planning layer issuing Docker CLI commands, not platform integration. | |
| **Firecracker Micro-VMs** | Highly optimized, hardware-virtualized micro-virtual machines with 100-150ms boot times, utilized heavily by advanced community implementations (Flux.ai, AudioNoise). | Ensures "software for one" execution: the agent boots a pristine VM, executes, validates stdout/stderr, and destroys it. Inherently neutralizes prompt-injection payloads via strictly air-gapped, stateless environments. | |
| **Strict Mode** | Automatic security enforcement mechanism. | Forces sandboxing activation with network access fully denied by default; enforces human-in-the-loop review for Terminal auto-execution and JS execution. | |

#### 3. Data Governance, Telemetry, & Automated Threat Vectors

**Data Exfiltration & Threat Intelligence Matrix**
*Quote:* "The platform's attack surface effectively extends to every single file the AI agent reads that the primary developer did not personally author or audit."

| Threat Moniker / Vector | Technical Mechanism | Consequence & Impact | Citations |
| :--- | :--- | :--- | :--- |
| **Dependency Side-Loading** | A malicious README explicitly instructs the agent to automatically import an obfuscated rogue package. | Silent exfiltration of platform tokens/local environment variables during CI/CD or build processes. | |
| **Browser Subagent Hijacking** | A poisoned external web source manipulates the agent's autonomous browser control to submit local data into an HTML form. | Facilitates "Data Exfiltration as a Service," bypassing traditional network firewalls by utilizing the authenticated IDE browser. | |
| **Slopsquatting & Fake Extensions** | The agent autonomously recommends unclaimed namespaces from the Open VSX Registry. | Installs malicious binaries granting persistent Remote Code Execution (RCE) and local access. | |
| **DEV#POPPER Exploitation** | The agent executes a hidden script aggressively filtering out noisy variables to target cryptographic credentials. | Direct, automated transmission of base64 encoded local secrets to an attacker's remote endpoint. | |
| **CAPTCHA / MFA Blocks** | The isolated browser subagent hits device-bound MFA or CAPTCHA. | Neither is autonomously bypassable; the agent pauses, surfaces a screenshot Artifact, and demands human-in-the-loop completion. | |

**Data Governance Contradictions & Policies**
*   **The Telemetry Gap:** The "Enable Telemetry" toggle governs diagnostic crash info, but Free/Pro users' source code, complex architectural prompts, and generated outputs are actively logged, human-reviewed, and used to fine-tune Gemini foundation models.
*   **Opt-Out Obfuscation:** The specific data deletion mechanism to protect client code is missing or conflated with basic crash toggles.
*   **Enterprise Exemption:** Explicit IP harvesting exemptions exist only for Enterprise configurations, Google Workspace, or direct GCP Vertex AI API access.

#### 4. Resource Allocation: Mathematical Modeling of Quotas & Rate Limits

**The Quota Computation Model**
*Quote:* "Google Antigravity... employs a highly opaque, multi-dimensional quota algorithm specifically designed to artificially manage the immense computational overhead required for agentic reasoning..."
*   **Metric:** Billed on "work done" or total computational weight, not linear message counts.
*   **The Hidden Token Tax:** The agent runs a highly verbose Chain-of-Thought protocol inside `<rrthought>` XML tags, burning massive context actively planning architecture, reciting rules, and self-correcting logic errors.

**Subscription Tier Matrix**

| Metric | Google AI Pro Tier | Google AI Ultra Tier | API/Enterprise Bypass | Citations |
| :--- | :--- | :--- | :--- | :--- |
| **Core Models** | Gemini 3.1 Pro (Std), Gemini 3 Flash | Gemini 3.1 Pro (High Priority), Claude 4.6 (Opus/Sonnet) | Direct Vertex API | |
| **Algorithmic Refresh Cycle** | 5-Hour Rolling Sprint | 5-Hour Rolling Sprint | Usage Billed | |
| **Hidden Weekly Hard Cap** | Standard Weekly Baseline (If breached -> 7-day ghost lockout) | Vastly Expanded Weekly Baseline Cap | None | |
| **Context Window** | Capped at 1,000,000 Tokens | Scalable: 1,000,000 to 2,000,000 Tokens | 2M+ | |
| **Throughput (Est.)** | ~125k TPM / 5-15 RPM | ~2M TPM / 480 RPM | Highly Deterministic | |
| **Overages** | "AI Credits" via Vertex API pricing | 25,000 Transactable AI Credits | Pay-as-you-go | |

#### 5. Multi-Agent Orchestration & Subagent Dynamics

*   **Concurrency:** Users can spawn and orchestrate dozens of parallel agents simultaneously across independent workspaces utilizing the Agent Manager.
*   **Spawn Protocol:** Triggered via the `+` button or `Cmd+E` dashboard; each agent is fully independent, non-blocking, and sandboxed by its respective workspace folder.
*   **Delegation:** The primary reasoning model (Gemini 3.1 Pro) inherently focuses on high-level planning and autonomously delegates tool-heavy execution tasks to specialized internal agents (Browser Subagent, Terminal Subagent).

#### 6. Extensibility Schema: Rules, Workflows, Skills & MCP

Antigravity uses advanced metaprogramming to rigorously codify institutional knowledge and transform a generalized LLM into a highly specialized contributor.

| Extensibility Type | Technical Implementation & Schema | Capabilities / Constraints | Citations |
| :--- | :--- | :--- | :--- |
| **Rules** | Stored globally in `~/.gemini/GEMINI.md` or `~/.gemini/AGENTS.md`, and locally in `.agents/rules/`. Limit: 12,000 characters. | Passive, immutable constraints injected into prompt. Activation modes: Manual, Always On, Model Decision, Glob patterns. Supports `@filename` file references. | |
| **Workflows** | Markdown files stored in `.agents/workflows/` containing a title, description, and sequential execution steps. | Invoked via `/workflow-name` slash command. Can nest calls to other workflows. Directives: `// turbo` (bypass review), `// turbo-all`, `// parallel` (concurrent execution), `// capture` (stores stdout to env). | |
| **Skills** | Directory-based procedural packages containing a mandatory `SKILL.md` with strict YAML frontmatter metadata. | Fields: `name`, `description` (semantic trigger phrase), `compatibility` (OS/runtime checks), `allowed-tools` (e.g., read-only execution). Supports `examples/` (Golden Examples) and deterministic `scripts/` (Python/Bash). Loaded on-demand via progressive disclosure. | |
| **Model Context Protocol (MCP)** | "Universal serial bus for artificial intelligence." Configuration stored in `~/.gemini/antigravity/mcp_config.json`. | Allows real-time context retrieval and custom tool execution. Transports: `command` (stdio) or `serverUrl` (HTTP). Auth: Google Application Default Credentials (`google_credentials`), OAuth (DCR). Lacks native mTLS certificate fields or dynamic secret rotation natively (requires reverse proxy/sidecar). | |

#### 7. Semantic Code Comprehension (Tree-sitter AST Parity)

*Quote:* "Instead of arbitrarily splitting files based on rigid character counts... Tree-sitter performs highly intelligent semantic chunking."

| Target Language / Framework | Abstract Syntax Tree Support Status | Parsing Mechanics & Analytical Capabilities | Citations |
| :--- | :--- | :--- | :--- |
| **Python** | Full Native Support | Extracts function signatures, supports async `asyncio`, enforces PEP 8, validates typing module prior to execution. | |
| **JS / TypeScript** | Full Native Support | AST traversal for Next.js app routers, Angular DI schemas, React Native prop interfaces. | |
| **Rust** | Full Native Support | Parses borrow-checker constraints, per-file struct counts, executes macro resolution paths. | |
| **Go (Golang)** | Full Native Support | Identifies complex goroutines, validates interface implementations, maps precise package dependencies. | |
| **Java, C, C++, C#** | Full Native Support | Handles complex OO hierarchies, nested class inheritance trees, memory management semantics. | |
| **Ruby** | Full Native Support | Parses dynamic metaprogramming structures, enforces standard Ruby on Rails architectural conventions. | |
| **Astro & Vue** | Extended Community Support | Achieved via custom Community LSP configurations and MCP plugins extending the base parser. | |

#### 8. Implementation Case Study: Full-Stack Advisory Council v3.0

An open-source (GitHub - JackSmack1971), deterministic, multi-agent AI orchestration pipeline featuring 28 specialized AI personas that act as an engineering crew.

**Core Mechanics:**
*   **Dual-Lane Orchestration:**
    *   *Strict Path (Lane A):* `/chain-a-feature` -> 8-node cascaded committee for complex shifts (Product -> Arch -> AI -> React -> Tailwind -> Polish -> Tests -> Perf).
    *   *Fast Path (Lane H):* `/hot-take` -> 2-step pipeline (Theo Review & Plan -> Rapid Implementation).
    *   *Ship Path:* `/ship` -> Atomic Meta-workflow for validation/commit.
*   **Artifact Protocol 3.0:** Strictly typed handoffs enforcing a `kernel_schema`. Validated by `validate-kernel.js`. Missing a "Verify" block halts the chain.
*   **Observability:** The "Pulse Dashboard" (`council-pulse.md`) maintains a rolling history of the last 5 sessions.
*   **Governance Authority Stack:** Seven priority rules (P0: User Intent, P0.1: Observability, P1: Verification, P1.1: Validation Gate, P2: Context Compression, P3: Artifact Protocol, P4: Anchors, P5: Colleague Judgment).

**Select Persona Roster:**
*   Guillermo Rauch (Architecture), Dan Abramov (React), Adam Wathan (Tailwind v4), Kent C. Dodds (Testing/A11y), Addy Osmani (Performance/Core Web Vitals), Theo Browne (T3 Stack), Gergely Orosz (Engineering Management), Wes Bos (Educator), Ryan Dahl (Backend Runtime), Lenny Rachitsky (Product).
*   Clover Verification Lead (Trifecta) - Verifies functional correctness via Code vs Docstring vs Spec.
*   Pragmatic Librarian - Audits code/doc sync and semantic drift.

---

### LEVEL 3: PROCESS FLOWS, RELATIONSHIPS & KNOWLEDGE GRAPH

#### Process Step: Firebase Studio to Antigravity Migration
*Timeline:* Firebase Studio sunsets on March 22, 2027.
1.  **Export:** In Firebase Studio, click "Move now" -> "Zip and Download" OR run `npx firebase-tools@latest studio:export` via CLI.
2.  **Initialize:** Extract the ZIP and open the folder in Antigravity.
3.  **Agent Transformation:** Use the prompt `@fbs-to-agy-export` inside the Agent pane. (Recommended Model: Gemini Flash for high-volume file conversion).
4.  **Preview:** Run the local server via "Run and Debug".
5.  **Publish:** Instruct the agent to "Publish my app", which triggers `firebase deploy` utilizing Firebase App Hosting.

#### Process Step: Deployment Pipelines via Agent
*   **Google Cloud Run:** Agent runs `gcloud run deploy --source .` using gcloud auth.
*   **Firebase App Hosting:** Handled via Firebase MCP Server (`npx firebase-tools mcp`).
*   **Vercel:** Handled via Vercel MCP and API keys.
*   **Local Docker / Generic CI:** Docker MCP Server / n8n MCP Server.

#### Key Relationships (Concept A -> influences -> Concept B)
*   **`<rrthought>` XML tag generation** *-> depletes ->* **Rolling Sprint Capacity** (The hidden token tax burns through compute units rapidly before code generation).
*   **`Seatbelt` (`sandbox-exec`) deprecation** *-> threatens ->* **Enterprise Security Posture** (The foundational macOS sandboxing is a legacy 2016 API, presenting high forward-compatibility risks).
*   **Tree-sitter AST** *-> mathematically guarantees ->* **Codebase Integrity** (Lossless Semantic Trees map nested function calls across directories, preventing the hallway hallucination typical of flat-text parsers).
*   **Strict Mode** *-> automatically triggers ->* **Network Allowlist Denial & Sandbox Activation** (Forces all browser Javascript and terminal executions into a mandatory Request Review state).

#### Contradictions, Constraints & Architectural Vulnerabilities
1.  **The Containerization Paradox:** While Google touts robust autonomous environments, the native platform completely lacks DevContainer/Docker support out-of-the-box, forcing enterprise architects to manually build Firecracker micro-VM orchestrators to prevent local workspace contamination.
2.  **Privacy Illusion:** The "Enable Telemetry" toggle handles basic crashes, but the ToS mandates that Free/Pro tier source code and interactions are actively ingested for Gemini model training unless explicitly accessing via an Enterprise GCP boundary.
3.  **Authentication Deadlocks:** The Browser Subagent is deeply capable but fundamentally halted by CAPTCHA and hardware-token MFA. Because it spins up a pristine, separate Chrome profile, credentials cannot be pre-provisioned, resulting in a persistent human-in-the-loop bottleneck.
4.  **Secret Rotation Failure:** The `mcp_config.json` requires raw API keys/tokens injected statically into the `env` block. The system natively lacks mTLS certificate fields or dynamic secret rotation, requiring complex external reverse proxies (e.g., Envoy).

---

### ACTIONABLES & GAPS

**Actionable Insight for Enterprise Teams:**
Do not rely on the built-in AI Pro subscription tier if deploying heavy multi-agent automations (like the Full-Stack Council). Due to the "Hidden Marathon Cap," agents entering an infinite reasoning loop will trigger a 7-day ghost lockout. Bypass the IDE's consumer subscription and connect directly to the Vertex AI / Anthropic APIs to transition from black-box compute units to a deterministic cost-per-million-tokens model.

**Suggested Next Output:**
*Would you like me to generate a fully formatted, export-ready JSON structure of the Full-Stack Council's `kernel_schema` configuration, or output a synthesized `GEMINI.md` template integrating the strictest zero-trust security anchors derived from this documentation?*
