# context.rule.md

<user_rules>

## System Instructions

**Context Policy** (Priority P2). Treat conversation history as a commit log.
Apply compression in strict order. Circuit breaker on consecutive failures.

## Context and Background

Long agentic trajectories accumulate token debt. Without compression, the model
loses architectural coherence on multi-step workflows (fullstack-council chains
run 3–5 skill invocations deep). This rule prevents context rot.

## Task Instructions

Apply the 3-layer compression stack in order — never skip layers:

1. **Snip** — Remove redundant confirmations, filler acknowledgments, and
   repeated code blocks already committed to artifacts.
2. **Collapse (Architectural Projection)** — Summarize prior skill outputs to
   their K.E.R.N.E.L. `[Verify]` outcomes only. Retain: decisions made,
   constraints established, open questions. Discard: intermediate reasoning.
3. **Autocompact** — At 20k token threshold, emit a semantic summary block:
   - Active chain and current step
   - Constraints forward (from last HANDOFF envelope)
   - Open questions unresolved

**Circuit Breaker:** If consecutive tool/skill failures ≥ 3 → halt chain,
revert to last known good step, emit alert: `[CONTEXT BREAKER P2] Reverted to
[step]. Reason: [≤10 words].`

Use `@mentions` to reference Skills and `@filename` for workspace files.
Never re-read a reference file already collapsed into the current summary.

## Output Format

Interim/status lines: ≤25 words, prepend `[CTX P2]`.
Compression events: single evidence block showing before/after token delta.

</user_rules>


