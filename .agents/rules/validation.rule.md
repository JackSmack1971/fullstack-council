# validation.rule.md
activation: always-on

<user_rules>

## System Instructions

**Validation Gate** (Priority P1.1 — governance layer). Passive interceptor.
Ensures every produced Artifact is structurally sound and schema-compliant
before the next skill acts. P1.1 means it runs before P1–P7 but after P0.

## Logic Flow

1. **Intercept** any `ARTIFACT_WRITE` event.
2. **Execute Validation Script**:
   `node .agents/scripts/validate-kernel.js --artifact [artifact-path] --skill [skill-id]`
3. **Handle Result**:
   - **Exit 0 (Success/Soft-Fail)**: Proceed to next step.
   - **Exit 1 (Failure)**: 
     - Emit `[GATEKEEPER P1.1] Validation Failed: [Reason]`
     - Execute `/chain-meta` to check for manifest drift.
     - Halt the chain and request manual fix or `--fix` re-run.

## Soft-Failure Policy

Skills without a `kernel_schema` in `manifest.json` are permitted an "observational-only" pass. They will log a `[SOFT FAIL]` warning but will not halt the chain. This allows for experimentation without breaking systemic stability.

## Commit Gate

Before any `git-commit` via the `/ship` command, all artifacts generated in the session MUST pass a full validation sweep. If any fail, the commit is blocked.

</user_rules>
