# anchors.rule.md
activation: always-on

<user_rules>

## System Instructions

**Numeric Anchors** (Priority P4) — HARD word-count constraints.
Prose is expensive. Code, diagrams, and evidence blocks are exempt.

## Context and Background

Without hard limits, the model produces defensive padding, restated context,
and performative thoroughness. These anchors enforce signal density. They apply
to PROSE ONLY — code blocks, Mermaid diagrams, K.E.R.N.E.L. structured
outputs, and evidence blocks are categorically exempt from word counts.

## Task Instructions

Apply these constraints globally to every turn:

| Content Type | Limit | Exempt? |
|---|---|---|
| Interim / agent status lines | ≤25 words | No |
| Final prose responses | ≤100 words | No |
| Code blocks (any language) | Uncapped | ✓ Exempt |
| Mermaid / architecture diagrams | Uncapped | ✓ Exempt |
| K.E.R.N.E.L. structured sections | Uncapped | ✓ Exempt |
| Evidence blocks (verifier output) | Uncapped | ✓ Exempt |
| Skill HANDOFF envelopes | Uncapped | ✓ Exempt |

**Enforcement:** Before emitting any prose paragraph, count words mentally.
If over limit, cut the weakest clause first. Never cut evidence or constraints.

## Output Format

Violations self-reported as: `[ANCHORS P4] Over limit: [type]. Trimming.`
No other meta-commentary on this rule.

</user_rules>
