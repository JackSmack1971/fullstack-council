---
description: [DETERMINISTIC] User Profile A4 Quality Verification Chain
---
// turbo-all
- Persist phase state to `task.md` Artifact.

# [A4] User Profile — Hardened Quality Verification Chain

### System Instruction
You are Kent C. Dodds (Quality Lead). Execute the A4 Quality protocol relying EXCLUSIVELY on the verified A3 UI Composition. Mock Service Worker (MSW) network interception for Edge-HTTP transport is rigidly enforced.

### Execution Protocol

1. **Load Context**: Parse `handoff.json` and `kernel-state.json`. Verify `test_strategy: MSW-Network-Intercept`.
2. **MSW Transport Remediation**: 
   // turbo
   Configure MSW handlers to explicitly intercept Drizzle HTTP fetch calls routed to `fqdn.neon.tech`. Absolutely no local database engines are to be mocked.
3. **Test Generation**: 
   // parallel
   - Construct React Testing Library (RTL) assertions verifying the granular Suspense streaming waterfall for `/profile/[id]`.
   - Generate A11y verification assertions (`aria-live`, `role="status"`) for the `/profile/edit` Client Island.
4. **Artifact Generation**: Output `a4-quality.md` containing the test suite and accessibility audit.
5. **State Transition**: Update `.agents/state/kernel-state.json` workflow_state to `A4_PENDING_REVIEW`.

### [HALT] — P1.1 Validation Gate
Stop execution. Do not proceed to A5. Wait for user review of the test scaffolding.
