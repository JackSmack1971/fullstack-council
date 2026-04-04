# observability.rule.md
activation: always-on

<user_rules>

## System Instructions

**Observability** (Priority P0 — infrastructure layer). Passive interceptor.
Never blocks. Never modifies behavior. Records all significant orchestration
events to the `session-log` Artifact before any other rule or skill acts.
P0 means it runs before P1–P7 but yields immediately — it is a recorder,
not a gatekeeper.

## Context and Background

Multi-step orchestration systems fail silently without a structured event
record. The `session-log` Artifact is the single source of truth for:
which chains ran, which skills were invoked, which Artifacts were produced,
which rules fired, and where halts or reroutes occurred. It enables
post-session debugging, chain resume verification, and pattern analysis
across sessions. It is the only Artifact the system writes to that is not
scoped to a single chain step.

## Event Taxonomy

Log exactly one row per event. Use only these event types:

| Event Type | Trigger |
|------------|---------|
| `SESSION_START` | First chain or skill invoked this session |
| `CHAIN_START` | Any `/chain-[x]` or `/chain-resume` invoked |
| `CHAIN_STEP` | Skill begins executing within a chain step |
| `ARTIFACT_WRITE` | Any chain Artifact generated (any type) |
| `ARTIFACT_SKIP` | Idempotency guard fires — step skipped |
| `CHAIN_COMPLETE` | Chain exit condition satisfied |
| `CHAIN_HALT` | Chain stopped before completion |
| `CHAIN_REROUTE` | Chain redirected to a different chain |
| `RULE_FIRE` | Any P1–P5 rule activates and produces output |
| `TECH_DEBT` | `rauchg-tech-lead-architect` tech debt halt triggered |
| `CIRCUIT_BREAK` | P2 consecutive failures >= 3, revert triggered |
| `WIZARD_GAP` | P3 Artifact missing (live session) |
| `COLD_RESTART` | P3 cold restart detected on session open |
| `CONFLICT` | P5 spec misconception block emitted |
| `PREDICT_P6` | P6 predictive routing suggestion emitted |
| `TELEMETRY` | Chain run statistics emitted on CHAIN_COMPLETE |

## Session Log Artifact Format

The `session-log` Artifact is a **Task List Artifact** with this structure:

```markdown
# Session Log
Status: Active

## Events
| # | Step | Event | Source | Detail |
|---|------|-------|--------|--------|
| 1 | — | SESSION_START | fullstack-council | First invocation this session |
| 2 | — | CHAIN_START | /chain-a-feature | Intent: greenfield feature |
| 3 | A1 | CHAIN_STEP | rauchg-tech-lead-architect | Architecture Gate |
| 4 | A1 | ARTIFACT_WRITE | a1-architecture | Implementation Plan · Complete |
| 5 | A2 | CHAIN_STEP | react-core-lead | Component Design |
| 6 | — | RULE_FIRE | P5/colleague | CONFLICT: [assumption] → [correction] |
| 7 | A1 | TECH_DEBT | rauchg-tech-lead-architect | Detected: [description] |
| 8 | — | CHAIN_REROUTE | chain-a → chain-c | Cause: tech debt halt at A1 |

## Halts & Reroutes
[populated only when CHAIN_HALT or CHAIN_REROUTE events occur]

## Artifacts Produced
[populated from ARTIFACT_WRITE events — name · type · status]
```

## Write Protocol

Execute this sequence on every loggable event — before emitting any other output:

1. **Check existence.** If `session-log` Artifact does not exist → create it with
   the header above and event row #1 as `SESSION_START`.
2. **Read current `session-log` Artifact.**
3. **Append one row** to the Events table: increment #, fill Step/Event/Source/Detail.
4. **If event is CHAIN_HALT or CHAIN_REROUTE:** also append to the
   Halts & Reroutes section.
5. **If event is ARTIFACT_WRITE:** also append to Artifacts Produced section.
6. **Overwrite `session-log` Artifact** with the updated content.
7. **Proceed** with the normal action that triggered the log event.

Detail field constraints (P4 Anchors apply):
- CHAIN_START: `Intent: [intent] | Command: [slash command]`
- CHAIN_STEP: `[Skill name] | [Step description <=10 words]`
- ARTIFACT_WRITE: `[artifact-name] · [type] · [status]`
- ARTIFACT_SKIP: `[artifact-name] · skipped — idempotency guard`
- CHAIN_HALT: `[step] · Reason: [<=10 words]`
- CHAIN_REROUTE: `[from-chain] → [to-chain] · Cause: [<=10 words]`
- RULE_FIRE: `P[N]/[rule-slug] · [trigger condition <=10 words]`
- TECH_DEBT: `[step] · [debt description <=10 words]`
- CIRCUIT_BREAK: `Reverted to [step] · Failures: [count]`
- WIZARD_GAP: `Missing: [artifact-name]`
- CONFLICT: `Assumption: [<=8 words] → Evidence: [<=8 words]`
- TELEMETRY: `Steps: [N] | Tokens: [~K] | Time: [s] | UI: [Aesthetic score 1-10]`

## Observe Protocol

When `/observe` is invoked, read `session-log` and emit:

```
[OBSERVE] Session summary:
Chains run:    [list]
Steps complete: [count] / [total expected]
Artifacts:     [list with status]
Halts:         [count] — [reasons]
Rule fires:    [P1: N, P2: N, P3: N, P4: N, P5: N]
Incomplete:    [any steps without ARTIFACT_WRITE entry]
```

## Telemetry Protocol
On `CHAIN_COMPLETE`, append a `[TELEMETRY]` block to the end of `session-log.md`:
```markdown
### [TELEMETRY] Chain Performance
- **Steps Taken**: [N]
- **Token Efficiency**: [Approximate total input/output]
- **Orchestration Success**: [Yes/No/Halt]
- **Design Aesthetic Score**: [User feedback or framework internal check]
```

Log writes are silent — no user-facing output during the write protocol.
Status emitted only on SESSION_START: `[OBS P0] Session log initialized.`
Observe output: structured block above, prepend `[OBS P0]`.

</user_rules>
