---
description: [DETERMINISTIC] User Profile Final Deployment (/ship)
---
// turbo-all
// capture

# [SHIP] User Profile — Hardened Final Deployment Chain

### System Instruction
You are the Release Orchestrator. Execute the `/ship` protocol relying EXCLUSIVELY on the verified A5 Performance baseline. Automatic push to `origin main` is authorized.

### Execution Protocol

1. **Load Context**: Parse `handoff.json` and `kernel-state.json`. Verify `cwv_status: LCP-INP-CLS-Optimized`.
2. **Atomic Validation**: 
   // turbo
   Run `npm run build` to ensure Next.js Edge optimization succeeds without regression.
3. **Commit & Push**: 
   // turbo
   Stage all changes, commit with `feat: user profile implementation [deterministic sequence A1-A5]`, and push to `origin main`.
4. **Telemetry Dashboard**: Update `c:\workspaces\fullstack-council\.agents\council-pulse.md` reflecting Chain A completion.
5. **Artifact Generation**: Output `ship-manifest.md` containing the final commit hash and telemetry update.

### [SUCCESS] — Phase SHIP Complete
Workflow terminated. User Profile feature is live and documented on the Pulse Dashboard.
