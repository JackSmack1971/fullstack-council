# MASTER KNOWLEDGE ARCHITECTURE: GOOGLE ANTIGRAVITY & INTEGRATED ECOSYSTEMS (v3.5)

## LEVEL 1: MASTER INDEX
1. **System & Execution Architecture** (Platform Overview, Multimodal Capabilities, Workspace Surfaces)
2. **Terminal Sandboxing & Runtime Isolation** (OS-Specific Protocols, Windows WSL2 Networking, Hardware VMs)
3. **Multi-Agent Orchestration & Subagents** (Agent Manager, Built-in Subagents, The Google Agent Dev Kit)
4. **Data Governance, Telemetry & Security** (Data Ingestion, Prompt Injection Vulnerabilities, Strict Mode)
5. **Metaprogramming: Rules, Deterministic Workflows & Skills** (Extensibility Schemas, Automation, Model Context Protocol)
6. **Code Parsing & Semantic Comprehension** (Tree-sitter AST, Supported Languages)
7. **Mathematical Resource Models** (Quotas, Tokens, Tier Configurations)
8. **Ecosystem Integrations & Migrations** (Firebase Studio Migration, Cloud Deployment)
9. **Implementation Case Study: Full-Stack Advisory Council v3.5** (Architecture, Personas, Slash Commands)
10. **Knowledge Graph & Entity Relationships**

---

## LEVEL 2: DETAILED STRUCTURED EXTRACTIONS

### 1. SYSTEM & EXECUTION ARCHITECTURE
Google Antigravity is a fundamentally agent-first development platform built as a fork of the VS Code codebase.

### 2. TERMINAL SANDBOXING & RUNTIME ISOLATION
Antigravity utilizes kernel-level terminal process isolation.

#### 2.1 OS-Specific Isolation Protocols
| Operating System | Sandboxing Mechanism | Status & Nuances |
| :--- | :--- | :--- |
| **Linux** | `nsjail` | Standard process isolation mechanism. |
| **macOS** | `Seatbelt` (`sandbox-exec`) | Legacy/deprecated Apple API (since ~2016); currently introduces forward-compatibility risk. |
| **Windows** | WSL2 (Linux VM) + Hyper-V | The agent executes inside the Linux VM, while the browser runs on the Windows host. |

### 3. MULTI-AGENT ORCHESTRATION & SUBAGENTS
Antigravity is a true multi-agent system, supporting the parallel execution of multiple autonomous reasoning instances across isolated workspaces.

### 4. DATA GOVERNANCE, TELEMETRY & SECURITY
#### 4.1 Exploitation Vectors (Prompt Injection)
| Vulnerability Vector | Technical Mechanism | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| **DEV#POPPER** | Obfuscated script targets high-value credentials. | base64 exfiltration to `/snv` endpoints. | **Secure State** rule (Request Review for $STATE). |

### 5. METAPROGRAMMING: RULES, DETERMINISTIC WORKFLOWS & SKILLS
#### 5.1 Rules (Passive Constraints)
Local rules are stored in `.agents/rules/`. Limit: 12,000 characters.

#### 5.2 Skills (Dynamic Knowledge Packages)
Directory-based packages (`SKILL.md`) utilizing **Deterministic Routing** via native workflows.

#### 5.3 Workflows (Deterministic Automation)
Sequential markdown files stored in `.agents/workflows/` invoked via `/slash` commands.
*   **Directives**: `// turbo`, `// turbo-all` (auto-run without local human interrupts), `// parallel` (concurrent execution), `// capture` (stores stdout as env variables).

### 9. IMPLEMENTATION CASE STUDY: FULL-STACK ADVISORY COUNCIL V3.5
A premier example of programmatic agent orchestration is the open-source `fullstack-council` v3.5.

#### 9.1 Deterministic Infrastructure
*   **Workflow-First Orchestration**: Eradicates probabilistic semantic routing. All handoffs are explicit sequences.
*   **A0.5 Axiom Gate**: Native pre-check for schema/transport integrity.
*   **Secure State Capture**: All sequential handoffs utilize `// capture` and $STATE variables under Request Review policy.
*   **Pulse Dashboard**: P0.1 telemetry system (`council-pulse.md`).
*   **Knowledge Persistence**: Replaces `handoff.json` with stateless Knowledge Item reconstruction logic.

#### 9.2 Specialized Personas (28 Personas)
*   Guillermo Rauch (Architecture), Dan Abramov (React), Adam Wathan (Tailwind v4), Kent C. Dodds (Testing), Addy Osmani (Parallel Perf), etc.

---

## LEVEL 3: RELATIONSHIP / KNOWLEDGE GRAPH LINKS
*   **Google Antigravity** $\rightarrow$ *executes terminal commands via* $\rightarrow$ **nsjail (Linux) / Seatbelt (macOS)**
*   **Full-Stack Advisory Council v3.5** $\rightarrow$ *enforces documentation fidelity via* $\rightarrow$ **Phase 11 Strategic Sync**
*   **Knowledge Recovery Logic** $\rightarrow$ *replaces* $\rightarrow$ **handoff.json**
*   **Secure State Rule** $\rightarrow$ *neutralizes* $\rightarrow$ **DEV#POPPER Credential Theft**
*   **// parallel Directive** $\rightarrow$ *optimizes* $\rightarrow$ **Core Web Vitals Remediation**

*Master Knowledge Architecture Sync Complete. (v3.5 Deterministic)*
