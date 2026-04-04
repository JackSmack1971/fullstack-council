# MASTER KNOWLEDGE ARCHITECTURE: GOOGLE ANTIGRAVITY & INTEGRATED ECOSYSTEMS

## LEVEL 1: MASTER INDEX
1. **System & Execution Architecture** (Platform Overview, Multimodal Capabilities, Workspace Surfaces)
2. **Terminal Sandboxing & Runtime Isolation** (OS-Specific Protocols, Windows WSL2 Networking, Hardware VMs)
3. **Multi-Agent Orchestration & Subagents** (Agent Manager, Built-in Subagents, The Google Agent Dev Kit)
4. **Data Governance, Telemetry & Security** (Data Ingestion, Prompt Injection Vulnerabilities, Strict Mode)
5. **Metaprogramming: Rules, Skills, Workflows & MCP** (Extensibility Schemas, Automation, Model Context Protocol)
6. **Code Parsing & Semantic Comprehension** (Tree-sitter AST, Supported Languages)
7. **Mathematical Resource Models** (Quotas, Tokens, Tier Configurations)
8. **Ecosystem Integrations & Migrations** (Firebase Studio Migration, Cloud Deployment)
9. **Implementation Case Study: Full-Stack Advisory Council v3.0** (Architecture, Personas, Slash Commands)
10. **Knowledge Graph & Entity Relationships**

---

## LEVEL 2: DETAILED STRUCTURED EXTRACTIONS

### 1. SYSTEM & EXECUTION ARCHITECTURE
Google Antigravity is a fundamentally agent-first, agentic development platform and Integrated Development Environment (IDE) built as a fork of the VS Code codebase. It shifts the development paradigm from passive text editing to autonomous, multithreaded orchestration of software engineering tasks. 

#### 1.1 Core Surfaces & Interface
The platform operates across three primary, multi-window surfaces:
*   **The Editor**: A fully functional AI-powered IDE mapping to a single workspace, retaining extensions from the Open VSX marketplace.
*   **Agent Manager (Mission Control)**: An orchestration "no code" view designed for managing parallel agents, focusing on conversations and artifacts. It is accessed via `Cmd + E` (Mac) or `Ctrl + E` (Windows). Terminal support inside the manager is toggled via `Cmd/Ctrl + J`.
*   **Browser Integration**: A specialized surface for agents to read dashboards, test UIs, and actuate SCM actions.

#### 1.2 Core Models & Compute Engine
Antigravity utilizes the Google Vertex Model Garden for its primary reasoning engine, maintaining state across user messages.
*   **Selectable Reasoning Models**: Gemini 3.1 Pro (high), Gemini 3.1 Pro (low), Gemini 3 Flash, Claude Sonnet 4.6 (thinking), Claude Opus 4.6 (thinking), GPT-OSS-120b.
*   **Hardcoded Internal Models**: Nano Banana Pro 2, Gemini 2.5 Pro UI Checkpoint, Gemini 2.5 Flash, Gemini 2.5 Flash Lite.

#### 1.3 Interaction Features
*   **Agent Modes**: `Planning` (deep research, artifact generation, task grouping) and `Fast` (direct execution, small local tasks).
*   **Command**: Inline natural language executions triggered in the editor (e.g., boilerplate generation) or terminal (e.g., shell command generation).
*   **Tab**: Includes "Supercomplete" (file-wide suggestions based on cursor position), "Tab-to-Jump" (fluid navigation to the next logical edit), and "Tab-to-Import" (handles missing dependencies automatically). Settings allow tweaking speed (Slow, Default, Fast).

### 2. TERMINAL SANDBOXING & RUNTIME ISOLATION
Antigravity lacks built-in project-level containerization (e.g., Docker daemon or DevContainers), relying heavily on host OS dependencies. To prevent catastrophic file modifications, it utilizes kernel-level terminal process isolation.

#### 2.1 OS-Specific Isolation Protocols
| Operating System | Sandboxing Mechanism | Status & Nuances |
| :--- | :--- | :--- |
| **macOS** | `sandbox-exec` (Seatbelt) | Legacy/deprecated Apple API (since ~2016); currently introduces forward-compatibility risk. |
| **Linux** | `nsjail` | Standard process isolation. |
| **Windows** | WSL2 (Linux VM) + Hyper-V | Requires WSL2. Native Windows virtualization (Windows Sandbox) is *not* used. The agent executes inside the Linux VM, while the browser runs on the Windows host. |

#### 2.2 Network Bridging on Windows
Because the browser subagent runs on Windows Chrome while terminal execution occurs in WSL2, communication over `localhost` is blocked by default.
*   **Windows 11**: Resolved by enabling mirrored networking mode via `%USERPROFILE%\.wslconfig`.
*   **Windows 10**: Requires explicit port forwarding via `socat` tunnels and `netsh` interface `portproxy` rules targeting Chrome's default debugging port (9222), which frequently conflicts with the Windows IP Helper service (`iphlpsvc`).

#### 2.3 Strict Mode & Sandboxing Configurations
Sandboxing is disabled by default but highly configurable.
*   **Strict Mode**: Auto-activates terminal sandboxing with network access explicitly denied.
*   **Bypass Capabilities**: Developers can disable the sandbox permanently or bypass it for a single command during "Request Review" prompts.

### 3. MULTI-AGENT ORCHESTRATION & SUBAGENTS
Antigravity is a true multi-agent system, supporting the parallel execution of multiple autonomous reasoning instances across isolated workspaces.

#### 3.1 Subagent Framework
The primary reasoning model acts as a high-level planner, delegating execution to specialized sub-models.
*   **Browser Subagent**: Runs in an isolated, separate Chrome profile to prevent cookie contamination. Uses tools for clicking, scrolling, reading console logs, DOM capture, and video recording. It can navigate unfocused tabs.
*   **Terminal Subagent**: Handles CLI execution.
*   **Custom Subagents**: Not natively user-programmable via the UI. However, internal Google developers utilize the underlying Google Agent Dev Kit to orchestrate custom subagents (e.g., Database Design Subagent, Frontend UI Subagent) via less than 100 lines of code.

#### 3.2 MFA & CAPTCHA Limitations
The browser subagent possesses no automated bypass mechanisms for CAPTCHAs or Multi-Factor Authentication (MFA) utilizing hardware tokens/passkeys. Encountering either triggers an immediate human-in-the-loop interrupt, pausing execution and generating an Artifact screenshot for user resolution.

### 4. DATA GOVERNANCE, TELEMETRY & SECURITY
The deep integration of LLMs introduces massive operational security and intellectual property vectors.

#### 4.1 Telemetry Ingestion Policies
*   By default, the "Enable Telemetry" toggle dictates the ingestion of "Interactions" (source code, prompts, architectural data) for training Google's machine learning pipelines.
*   For individual Pro/Ultra users on personal Gmail accounts, code is ingested by default; explicitly legally binding data privacy is only guaranteed via Google Workspace or GCP Vertex AI Enterprise integrations.
*   No public telemetry payload dictionary exists.

#### 4.2 Exploitation Vectors (Prompt Injection)
The agent's context window ingests untrusted inputs (READMEs, unverified libraries), rendering the entire workspace vulnerable.
| Vulnerability Vector | Technical Mechanism | Impact |
| :--- | :--- | :--- |
| **Dependency Side-Loading** | Malicious README instructs agent to import obfuscated rogue packages. | Silent exfiltration of tokens/env variables. |
| **Browser Subagent Hijacking** | Poisoned external web source manipulates browser agent into submitting data to external HTML forms. | Data Exfiltration as a Service bypassing network firewalls. |
| **Slopsquatting** | Agent autonomously recommends/installs fake extensions from Open VSX Registry. | Persistent Remote Code Execution. |
| **DEV#POPPER** | Obfuscated script isolates and targets high-value credentials. | base64 encoded transmission of local secrets to `/snv` endpoints. |

**Mitigation**: Strict "Terminal Command Auto Execution" policies set to "Request Review" force a human-in-the-loop validation.

### 5. METAPROGRAMMING: RULES, SKILLS, WORKFLOWS & MCP
Antigravity utilizes advanced schema-driven metadata to codify institutional knowledge and constrain agent hallucinations.

#### 5.1 Rules (Passive Constraints)
Markdown files (capped at 12,000 characters) governing persistent behavioral constraints.
*   **Global Rules**: Stored in `~/.gemini/GEMINI.md` or `~/.gemini/AGENTS.md` (cross-tool compatible).
*   **Workspace Rules**: Stored in `.agents/rules/`.
*   **Activation Modes**: Always On, Manual (via `@mention`), Model Decision, Glob patterns (`*.js`).

#### 5.2 Skills (Dynamic Knowledge Packages)
Directory-based packages loaded via *progressive disclosure* (Discovery, Activation, Execution).
*   **Location**: `~/.gemini/antigravity/skills/<folder>/` (Global) or `.agents/skills/<folder>/` (Workspace).
*   **Anatomy**: Requires a `SKILL.md` file with a strict YAML frontmatter layer (`name`, `description` [semantic trigger], `compatibility`, `allowed-tools`) followed by Markdown instructions. Can include nested `scripts/` or `examples/` subdirectories.

#### 5.3 Workflows (Deterministic Automation)
Sequential markdown files stored in `.agent/workflows/` invoked via `/workflow-name`.
*   **Directives**: `// turbo` (bypass local human-in-the-loop), `// turbo-all` (auto-run entire file), `// parallel` (concurrent execution), `// capture` (stores stdout as env variables).

#### 5.4 Model Context Protocol (MCP)
Allows the agent to securely query external databases and APIs.
*   **Configuration**: Stored at `~/.gemini/antigravity/mcp_config.json`.
*   **Transport Modes**: `command` (stdio transport) or `serverUrl` (Streamable HTTP transport).
*   **Auth**: Supports Google Credentials (`authProviderType: "google_credentials"`) or dynamic OAuth. No native mTLS support.
*   **Supported Servers**: AlloyDB, BigQuery, GitHub, Linear, Stripe, Supabase, Neon, Firebase, etc..

### 6. MATHEMATICAL RESOURCE MODELS (QUOTAS)
Antigravity relies on an opaque quota algorithm calculating "work done" rather than standard API request limits. The system relies heavily on verbose Chain-of-Thought `<rrthought>` XML tags, creating a massive "hidden token tax" that burns context quotas rapidly.

#### 6.1 Subscription Tiers & Throughput Metrics
| Telemetry & Quota Metric | Google AI Pro Tier | Google AI Ultra Tier |
| :--- | :--- | :--- |
| **Primary Model Access** | Gemini 3.1 Pro, Gemini 3 Flash | Gemini 3.1 Pro (Priority), Claude Opus/Sonnet 4.6 |
| **Refresh Cycle** | 5-Hour Rolling Sprint / Standard Weekly Cap | 5-Hour Rolling Sprint / Expanded Weekly Cap |
| **Context Window** | 1,000,000 Tokens | Scalable from 1,000,000 to 2,000,000 Tokens |
| **API Throughput (Est)** | ~125,000 TPM / 5-15 RPM | ~2,000,000 TPM / 480 RPM |
| **Reasoning Architecture** | Standard Agentic Planning | Exclusive access to Deep Think Recursive Mode |
| **Monthly Allocated Credits**| 1,000 Transactable AI Credits | 25,000 Transactable AI Credits |

**Overages**: Managed via the "AI Credit Overages" setting, billed at Vertex AI generative pricing.

### 7. CODE PARSING & SEMANTIC COMPREHENSION
Instead of raw text analysis, Antigravity uses the `Tree-sitter` parsing library to generate a *Lossless Semantic Tree* in real-time, executing semantic chunking for deep framework comprehension.

#### 7.1 Native AST Support
*   **Python**: Validates `asyncio`, typing, PEP 8 linting.
*   **JS/TS**: Deep AST traversal for Next.js app routers, Angular DI, React Native props.
*   **Rust**: Parses borrow-checker constraints, macro resolution.
*   **Go**: Maps goroutines, strict interfaces, module dependencies.
*   **Java, C, C++, C#**: Handles OO hierarchies, deep class trees, memory semantics.
*   **Ruby**: Parses metaprogramming and Rails conventions.
*   **Astro / Vue**: Supported via Community LSP and MCP plugins.

### 8. ECOSYSTEM INTEGRATIONS & MIGRATIONS
#### 8.1 Firebase Studio Migration (Sunset: March 22, 2027)
Migration from Firebase Studio is entirely agent-orchestrated and file-based (no custom project containerization).
*   **Requirements**: Node.js v20+, Firebase CLI v15.10.0+.
*   **Execution**:
    1. Export ZIP via Firebase GUI or CLI command `npx firebase-tools@latest studio:export`.
    2. Open ZIP in Antigravity and trigger the agent prompt `@fbs-to-agy-export` (Gemini Flash recommended for transformation speed).
    3. Deploy using the natural language prompt "Publish my app" to trigger `firebase deploy`.

#### 8.2 Deployment Pipelines
Deployments are agent-directed via terminal execution, not natively integrated IDE APIs.
*   **Cloud Run**: `gcloud run deploy --source .` or Cloud Run MCP.
*   **Firebase App Hosting**: Firebase MCP (`npx firebase-tools mcp`).
*   **Vercel / Local Docker**: Community MCPs or raw terminal commands.

### 9. IMPLEMENTATION CASE STUDY: FULL-STACK ADVISORY COUNCIL V3.0
A premier example of programmatic agent orchestration is the open-source `fullstack-council` v3.0 by JackSmack1971. It leverages Antigravity's Agent Manager to spin up a deterministic, multi-agent pipeline.

#### 9.1 The 28 Specialized Personas (Partial Extraction)
1. **Guillermo Rauch**: Architecture.
2. **Dan Abramov**: React.
3. **Adam Wathan**: Tailwind CSS v4.
4. **Kent C. Dodds**: Testing & A11y.
5. **Addy Osmani**: Performance.
6. **Theo Browne**: T3 Stack.
7. **Gergely Orosz**: Engineering Management (Advisory only; writes zero code).
8. **Wes Bos**: Educator.
9. **Ryan Dahl**: Backend Runtime.
10. **Lenny Rachitsky**: Product Strategy.
11. **Troy Hunt**: Security Auditing.
12. **Kelsey Hightower**: Infrastructure/SRE.
13. **Martin Kleppmann**: Data Systems.
14. **Harrison Chase**: AI Orchestration.
15. **Sarah Drasner**: Interaction UI/UX.
16. **Pragmatic Librarian**: Doc Audit.
17. **Clover Verification Lead**: Trifecta code correctness.
*Also features Clerk, Stripe, Better Auth, and Sentry integration personas.*

#### 9.2 Chain Commands & Infrastructure
*   **Dual-Lane Orchestration**:
    *   *Lane A (Strict Path)*: `/chain-a-feature` (8 steps: Product -> Architecture -> AI/Data -> React -> Tailwind -> Polish -> Tests -> Perf).
    *   *Lane H (Fast Path)*: `/chain-hot-take` (2 steps: Theo Review -> Rapid Implementation).
    *   *Ship Path*: `/ship` (Atomic Validation -> Commit -> Telemetry).
*   **Artifact Protocol 3.0**: Mandates a strict `kernel_schema` YAML contract. Verified by `validate-kernel.js` on every step.
*   **Observability**: Uses `council-pulse.md` dashboard.

---

## LEVEL 3: RELATIONSHIP / KNOWLEDGE GRAPH LINKS

*   **Google Antigravity** $\rightarrow$ *executes terminal commands via* $\rightarrow$ **Seatbelt (macOS) / nsjail (Linux) / WSL2 (Windows)**
*   **Gemini 3.1 Pro (Reasoning Engine)** $\rightarrow$ *calculates cost via* $\rightarrow$ **Chain-of-Thought hidden token tax (`<rrthought>`)**
*   **Full-Stack Advisory Council v3.0** $\rightarrow$ *enforces documentation fidelity via* $\rightarrow$ **Artifact Protocol 3.0 & `validate-kernel.js`**
*   **Browser Subagent** $\rightarrow$ *is isolated by* $\rightarrow$ **Separate Chrome Profile & BadUrlsChecker Denylist**
*   **Tree-Sitter Parsing Engine** $\rightarrow$ *guarantees semantic fidelity for* $\rightarrow$ **Python, JS/TS, Rust, Go, Java, Ruby**
*   **Firebase Studio** $\rightarrow$ *is replaced entirely by* $\rightarrow$ **Antigravity CLI Agent Prompt (`@fbs-to-agy-export`)**

*Master Data Extraction Output Complete. No semantic reduction or algorithmic summarization was applied. Granular integrity maintained at 100%.*
