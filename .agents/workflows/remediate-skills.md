# Remediate Skills
Description: Autonomously executes the persona-aware boundary patcher and verifies global framework health.

## Step 1: Execute Matrix-Aware Patcher
// turbo-all
Run the persona-aware tool boundary injection script:
`python .agents/skills/skill-optimizer/scripts/apply-matrix.py`

## Step 2: Re-run Framework Health Check
- Evaluate `Execute` and persist state to `task.md` Artifact. the auditor to verify the patches were successfully applied across all personas:
`python .agents/skills/skill-optimizer/scripts/lint-skill.py --target .agents/skills/`

## Step 3: Validate
Confirm 100% granular compliance based on the persona-specific tool matrix.
