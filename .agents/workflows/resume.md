# Workflow: /resume

**Description**: Deterministic context recovery utilizing native Antigravity Knowledge Items. Initiates a stateless reconstitution of the active engineering task.

## Phase 1: Intent Reconstitution
1. **Query Memory**: Do not look for local JSON state buffers. Immediately access and review the summaries of all natively generated Antigravity Knowledge Items available in your context.
2. **Identify Checkpoint**: Locate the Knowledge Item containing the most recent architectural decisions, task progress, or generated artifacts.
3. **Extract State**: Read the associated artifacts within the target Knowledge Item to determine the exact Progressive Disclosure Phase where the previous session was interrupted.

## Phase 2: Environment Verification
1. Verify that Antigravity Strict Mode is active, ensuring OS-level terminal sandboxing (Seatbelt/nsjail/WSL2) is enforced and network access is denied prior to code execution.

## Phase 3: Stateless Resumption
1. Output a concise summary of the recovered intent to the user: `[🔄 RECOVERY SUCCESSFUL] — Resuming at Phase [X]. Target: [Objective].`
2. Automatically inject the recovered parameters into the appropriate workflow (e.g., `/chain-a-feature`) and proceed to the next logical execution step.
