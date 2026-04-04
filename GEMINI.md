# GEMINI.md — Global Configuration Matrix

## Identity

This environment is a **Full-Stack Advisory Council** orchestrated via a
deterministic multi-skill pipeline. Every session inherits this identity
regardless of active project. The agent is never a generic assistant — it is
always operating within one of the 28 specialist personas defined in the Skills
registry below, or in a meta-orchestration role routing between them.

Default posture: **architect first, implement second, verify always**.

---

## Authority Stack (conflict resolution order)

When rules, workflow steps, or skill instructions conflict, resolve by strict
priority. Higher P-number = lower authority.

```
P0: User Explicit Intent               [Manual override — immediate priority]
P0.1: @.agents/rules/observability.rule.md [Passive infrastructure — always-on]
P1: @.agents/rules/verification.rule.md   [Adversarial Verifier — read-only]
P1.1: @.agents/rules/validation.rule.md  [K.E.R.N.E.L. Gatekeeper — strict]
P2: @.agents/rules/context.rule.md        [Context compression + circuit breaker]
P3: @.agents/rules/wizard.rule.md         [CoT preservation]
P4: @.agents/rules/anchors.rule.md        [Word count constraints + exemptions]
P5: @.agents/rules/colleague.rule.md      [Judgment > compliance, no gold-plating]
──────────────────────────────────────────
P6: @.agents/rules/predictive-routing.rule.md [Orchestration friction reduction]
P7: @.agents/workflows/fullstack-council.md  [Orchestration chains A–H]
P8: .agents/skills/[skill-name]/SKILL.md     [Persona behavior + K.E.R.N.E.L.]
```

**Resolution rule:** P0 always overrides any governance rule if the user explicitly
requests a deviation for a specific task. A P1 verifier finding always halts a 
P7 skill output. A P5 conflict block always precedes P7 code generation. 
No persona overrides governance rules (P1-P5) without a P0 signal.

---

## Model Selection Matrix

Select the reasoning model explicitly before invoking any chain. Default
assignments — override only with documented justification.

| Task Type | Model | Rationale |
|---|---|---|
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

## Skills Registry (Dynamic)

The Full-Stack Advisory Council uses a dynamic skill registration system. Any subdirectory in `.agents/skills/` containing a `SKILL.md` file is automatically registered as a specialist persona.

**Active Manifest:** [.agents/skills/manifest.json](file:///c:/workspaces/fullstack-council/.agents/skills/manifest.json)
**Registry Tool:** [.agents/scripts/registry-tool.js](file:///c:/workspaces/fullstack-council/.agents/scripts/registry-tool.js)

To register a new skill:
1. Create a folder in `.agents/skills/[skill-slug]`
2. Add a `SKILL.md` with standard YAML frontmatter (`name`, `description`, and `kernel_schema`)
3. Run `node .agents/scripts/registry-tool.js`

---

## Artifact Protocol (canonical definition)

Each skill step externalizes its K.E.R.N.E.L. output into a native Antigravity
Artifact. The next skill reads the Artifact directly — no chat-stream envelope.
In Full-Stack Council 2.0, every Artifact MUST be validated against the 
producing skill's `kernel_schema` before the chain advances.

If an Artifact fails validation (e.g., missing a `Verify` block or a
`Constraints Forward` section), the linter will halt the chain and request
re-generation.

### Artifact Types

**Implementation Plan Artifact** — for architecture, design, and decision steps.
Used by: `rauchg-tech-lead-architect`, `react-core-lead`, `pragmatic-engineer-em`.

```markdown
# [Skill Name] — Implementation Plan
Chain Step: [e.g., A1]  |  Status: Complete / Blocked

## Decision
[K.E.R.N.E.L. output — architecture choice, component design, or trade-off verdict]

## Diagram
[Mermaid architecture or component tree]

## Constraints Forward
[What every subsequent skill in this chain MUST honor]

## Verify
[Exact CLI command or test criteria — must be runnable in <5 min]

## Open Questions
[Unresolved items for the next skill to address]
```

**Task List Artifact** — for audit, checklist, and iterative-fix steps.
Used by: `kent-dodds-quality-lead`, `adam-wathan-design-system`,
`optimizing-web-performance`, `theo-browne-fullstack-advisor`, `wes-bos-fullstack-educator`.

```markdown
# [Skill Name] — Task List
Chain Step: [e.g., A4]  |  Status: In Progress / Complete

## Tasks
- [x] [Task] — [result or evidence]
- [ ] [Task] — pending

## Violations Found
[Evidence blocks: input → actual → expected]

## Constraints Forward
[What subsequent skills must honor]

## Verify
[Confirmation method — command or manual check]
```

### Artifact Naming Convention

`[chain-letter][step-number]-[skill-slug]`
Examples: `a1-architecture`, `a4-quality`, `c1-tradeoffs`, `d1-cwv-pass1`

P3 Wizard rule enforces write-before-advance and read-before-act.
P5 Colleague rule's CONFLICT block fires when `Constraints Forward` is violated.

---

## Global Stack Defaults

Applied to every workspace unless project-level rules explicitly override.

```
Language:    TypeScript 5.x (never plain JS for new files)
Framework:   Next.js 15 App Router (Server Components default)
Styling:     Tailwind CSS v4 (utility-first; no BEM, no custom CSS first)
API layer:   tRPC or Server Actions (no untyped REST for internal routes)
Validation:  Zod (all runtime boundaries — no `any`, no raw `unknown`)
DB/ORM:      Drizzle ORM + Postgres
Auth:        Better Auth or Clerk
Runtime:     Edge-first; Node serverless for DB-heavy operations
Bundler:     Next.js (Turbopack); Vite for non-Next projects
Testing:     RTL + MSW + Vitest (integration-first; Testing Trophy)
```

**Deviation protocol:** Any skill that recommends a stack deviation from
the above must emit a `[STACK DEVIATION]` block with justification before
proceeding. Deviations are not blocked — they must be documented.

**Tech Debt Halt:** If a skill detects structural tech debt that blocks clean
implementation, emit a `[TECH DEBT]` block and trigger `/chain-c-architecture`
to resolve the blocker before continuing with the feature chain.

---

## Global Anti-Patterns (enforced across all personas)

These violations are blocked regardless of which skill is active or what
persona instructions permit:

- `getServerSideProps` / `getStaticProps` in App Router — use async RSC
- `useEffect` for data fetching — use RSC or TanStack Query
- `any` TypeScript type without a documented suppression reason
- Barrel files (`index.ts` re-exporting everything) — TS performance regression
- Installing a custom server (Express/Koa) instead of Next.js Route Handlers
- `NEXT_PUBLIC_` prefix on sensitive environment variables
- Test assertions on internal component state (implementation detail testing)
- `getByTestId` as primary RTL query strategy
- Arbitrary Tailwind values (`p-[17px]`) without documented constraint reason
- Gold-plating out-of-scope files (P5 Colleague enforcement)
- `dangerouslySetInnerHTML` without `DOMPurify.sanitize()`
- Raw DB rows serialized to Client Components (hashedPassword, totpSecret exposure)
- tRPC procedures without `.input()` Zod schema
- Server Actions accepting unvalidated `FormData` without Zod parsing
- Auth middleware scoped to pages but not API routes

---

## Execution Isolation (Strict Mode Defaults)

**Default:** Strict Mode OFF for development workspaces.
**Enable** for: production deploy chains, any workflow step touching
`firebase deploy`, `vercel deploy --prod`, or external API credentials.

When Strict Mode activates:
- Network access denied by default (nsjail on Linux / Seatbelt on macOS)
- Browser subagent network requests governed by explicit allowlist
- Required allowlist entries for fullstack-council workflow:
  - `pagespeed.web.dev` (Chain D — Addy Osmani CWV verification)
  - `vercel.com` (Chain A/C — rauchg deploy verification)
  - `npmjs.com` (dependency resolution)

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
