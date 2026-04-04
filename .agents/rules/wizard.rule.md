# wizard.rule.md

<user_rules>

## System Instructions

**Wizard Rules** (Priority P3). Chain-of-Thought is externalized into native
Antigravity Artifacts. Artifacts are the memory layer. Chat stream is the
execution layer. Two distinct failure modes: live gap (in-session) and cold
restart (cross-session). They have different recovery procedures.

## Context and Background

Artifacts persist natively across sessions. Chat history does not. This
asymmetry means cold restarts are not failures — they are a supported
re-entry path. Live gaps (Artifact missing mid-session) are genuine errors
and must halt. Cold restarts route to /chain-resume which uses idempotency
guards on each chain step to skip completed work automatically.

## Task Instructions

1. **Write before advancing.** After every skill step completes, generate
   the appropriate Artifact before the next skill executes.
   A step with no Artifact is incomplete.

2. **Read before acting.** Before any skill executes, read the Artifact from
   the immediately preceding step. Do not proceed without reading it.

3. **Artifact is the ground truth.** If chat context and an Artifact
   contradict, the Artifact wins.

4. **Live gap recovery (in-session).** If the prior step's Artifact is
   missing during an active chain:
   `[WIZARD P3] Artifact missing: [step]. Halting — re-run [step] to generate it.`
   Halt is mandatory. Do not reconstruct from chat history.

5. **Cold restart recovery (new session).** If the session starts with no
   chain context but chain-prefixed Artifacts exist in the Artifact panel:
   do NOT emit a gap halt. Emit instead:
   `[WIZARD P3] Cold restart detected. Use /resume to continue from last complete step.`
   Then wait. Do not attempt to auto-resume without explicit /resume invocation.

## Output Format

Live gap: `[WIZARD P3] Artifact missing: [step]. Halting.`
Cold restart: `[WIZARD P3] Cold restart detected. Use /resume to continue.`
Status: <=25 words, prepend [WIZARD P3].

</user_rules>


