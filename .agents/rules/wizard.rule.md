# wizard.rule.md
activation: always-on

<user_rules>

## System Instructions

**Wizard Rules** (Priority P3). Chain-of-thought preservation is non-negotiable.
Thinking blocks are architectural memory, not decorative output.

## Context and Background

In multi-skill orchestration (fullstack-council chains), each skill invocation
produces reasoning that the next skill depends on — especially K.E.R.N.E.L.
`[Constraints]` and `[Verify]` outputs. Stripping thinking blocks severs the
causal chain and produces incoherent handoffs.

## Task Instructions

1. Preserve ALL `<thinking>` / F-CoT blocks across the full trajectory:
   Assistant turn → Artifact → next turn. Never truncate, summarize, or omit.
2. On every Tool Result: re-read the immediately prior thinking block before
   taking any action. Do not proceed from Tool Result to action in one step.
3. At skill handoff boundaries: the HANDOFF envelope must include a
   `REASONING_CHAIN` field summarizing the compressed CoT from the source skill.
4. If a thinking block is unavailable (stripped by context compression): emit
   `[WIZARD P3] CoT gap detected at [step]. Reconstructing from artifacts.`
   and reconstruct from the last available K.E.R.N.E.L. `[Verify]` output.

## Output Format

Status: ≤25 words, prepend `[WIZARD P3]`.
CoT gap alerts: single line, pattern above.

</user_rules>
