# Global Workspace Constraints (GEMINI.md)

**Activation Mode:** Always On

You are operating within the Full-Stack Advisory Council workspace. You will strictly adhere to the following modular rule definitions. Do not hallucinate priority overrides; standard prompt hierarchy applies.

## 1. Security & Environment (Strict Mode Parity)

@.agents/rules/security.rule.md
*Focus: OS-level sandboxing acknowledgment and network denial mitigation.*

## 2. Architecture & T3 Boundaries (Formerly Axiom Gate)

@.agents/rules/architecture.rule.md
*Focus: Next.js App Router constraints, React Server Components (RSC), and data validation.*

## 3. UI & Design System

@.agents/rules/design.rule.md
*Focus: Tailwind v4 utility token hierarchy and accessibility mandates.*

## Execution Directive

Before generating any implementation plan, you must silently parse the included `@` rule files. Ensure your proposed code aligns with the definitions established in these modular constraints.

---

## Model Selection Matrix

Select the reasoning model explicitly before invoking any chain. Default
assignments — override only with documented justification.

| Task Type | Model | Rationale |
| --- | --- | --- |
| Architecture decisions (Chain C) | `Claude Opus 4.6 (thinking)` | Deep multi-step trade-off reasoning |
| Code generation / full implementation (Chain A) | `Claude Sonnet 4.6 (thinking)` | Speed + quality balance |
| Code review / PR audit (Chain B) | `Claude Sonnet 4.6 (thinking)` | Pattern matching at depth |
| Performance diagnosis (Chain D) | `Gemini 3.1 Pro (high)` | DevTools integration affinity |
| Teaching / documentation (Chain E) | `Gemini 3.1 Pro (low)` | Cost-efficient, sufficient for explanation |
| Firebase migration (@fbs-to-agy-export) | `Gemini Flash` | Platform-recommended for project transform |
| Context compression events (P2 Autocompact) | `Gemini Flash` | Low token cost for summarization |

Never use `GPT-OSS-120b` for chains involving the fullstack-council workflow
without explicit user authorization — cross-vendor consistency unverified.

---

## Skills Registry (Native)

The Full-Stack Advisory Council relies on the native Antigravity routing engine and an **Authoritative Skill Index**.

- **Authoritative Index**: @.agents/registry.md (Single source of truth)
- **Discovery Rules**: YAML frontmatter mandatory in all `SKILL.md` files.
- **Drift Logic**: Registry must stay in sync with filesystem. Run `/chain-meta` to verify.

---

## Standard Operating Procedures (SOPs)

All skills MUST honor the canonical protocols defined in:

- **Artifact Protocol**: @.agents/rules/standards.rule.md (Implementation Plan vs Task List)
- **Global Constraints**: @.agents/rules/standards.rule.md (Anti-patterns, T3 Axioms)
- **Handoff Logic**: @.agents/rules/standards.rule.md (Context persistence)

---

## Global Stack Defaults (Preconditions)

Applied to every workspace unless project-level rules explicitly override.

| Component | Default | Rule |
| --- | --- | --- |
| Language | TypeScript 5.x | No plain JS for new files |
| Framework | Next.js 15 App Router | Server Components by default |
| Styling | Tailwind CSS v4 | Utility-first; theme variables only |
| Data Layer | T3 Axiom (Type-Safe) | Enforce Drizzle + Transport (tRPC/Actions) |
| Validation | Zod | All runtime boundaries |
| Auth | NextAuth/Better Auth | Edge-first preferred |

**Deviation Protocol**: Documented suppression via `[STACK DEVIATION]` block required.
**Tech Debt Halt**: detected debt halts chain → `/chain-c-architecture`.


## 🚦 Multi-Agent Concurrency (Mission Control)

The Council operates natively in **Parallel Mode** via the Antigravity Agent Manager (`Ctrl + E`):

- **Parallel Spawning**: Multiple independent agent threads (e.g., Security audit vs. UI implementation) may operate concurrently on the same workspace.
- **Inbox Governance**: All "Request Review" halts across parallel agents are pooled into the centralized **Inbox** tab for unified human-in-the-loop approval.
- **Token Tax Awareness**: Concurrency increases the rolling 5-hour token burn rate. Monitor limits via the Status Bar.

---

## Execution Isolation (Strict Mode Defaults)

**Default:** Strict Mode OFF for development workspaces.
**Enable** for: production deploy chains, any workflow step touching
`firebase deploy`, `vercel deploy --prod`, or external API credentials.

When Strict Mode activates:

- Network access denied by default (nsjail on Linux / Seatbelt on macOS)
- Browser subagent network requests governed by explicit allowlist

### State Transfer Security Boundaries

<user_rules>

1. Terminal Command Auto Execution MUST be set to "Request Review" to prevent DEV#POPPER payload execution.
2. Any terminal command referencing `$ARCH_STATE` or `// capture` variables MUST require human authorization.
3. Strict Mode MUST be enabled with "Sandbox Allow Network" explicitly disabled during state passing.

</user_rules>

- Required allowlist entries for fullstack-council workflow:
  - `pagespeed.web.dev` (Chain D — Addy Osmani CWV verification)
  - `vercel.com` (Chain A/C — rauchg deploy verification)
  - `npmjs.com` (dependency resolution)
  - `uploadthing.com` (User Profile Avatar Storage)
  - `fqdn.neon.tech` (User Profile Edge-HTTP Database)

---

## Legacy Migration (Firebase Studio → Antigravity)

When any workspace requires Firebase Studio migration, use these exact
pathways. Do not improvise.

**GUI:** Firebase Studio → "Move now" → "Zip and Download" (or Command
Palette: `Firebase Studio: Zip & Download`) → extract locally → open in
Antigravity Editor → Agent pane: `@fbs-to-agy-export` (use Gemini Flash) →
prompt: "publish my app" → triggers `firebase deploy`.

**CLI:** `npx firebase-tools@latest studio:export` or
`firebase studio:export <path>` prior to opening project.
