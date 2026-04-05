# /resume — Context Recovery Guide (v3.5)

## Overview

The Full-Stack Advisory Council v3.5 uses **Artifact-driven State Persistence**. Because chat history is volatile but the Artifact panel is persistent, session recovery is handled by scanning for existing work and resuming at the first incomplete or missing step.

## /resume — Recovery Modes

| Command          | Behavior                                              |
|------------------|-------------------------------------------------------|
| `/resume`        | Auto-detects last active chain from Artifact panel    |
| `/resume [a-f]`  | Targets specific chain explicitly                     |
| `/resume-last`   | Alias for bare `/resume` — preferred for clarity        |

## How It Works

1. **Scan**: The router scans the Artifact panel for chain-prefixed Artifacts (e.g., `a1-architecture`, `f2-auth`).
2. **Identify**: It identifies the most recent chain letter and the highest sequential step marked with `Status: Complete`.
3. **Resume**: It re-invokes the chain workflow. Idempotency guards in each step detect existing complete Artifacts and skip them automatically.
4. **Re-execute**: Any step with `Status: In Progress`, `Blocked`, or a missing Artifact is executed from scratch.

## Limitations & Edge Cases

- **Chat History**: Recovery cannot restore previous chat messages or reasoning strings. It relies entirely on the **Artifact Protocol** for context.
- **handoff.json**: Bare `/resume` (without arguments) can also load parked intent from `.agents/state/handoff.json` if a chain was redirected (e.g., during an A0.5 Tech Debt halt).
- **A0.5 Gate**: The T3 Axiom check is **NOT** a chain step and is not recovered via `/resume`. If you are parked at a Tech Debt halt, use `/resume` to reload the intent, but the A0.5 check must have been cleared first.

> [!IMPORTANT]
> **Idempotency Guard**: /resume will NEVER overwrite an Artifact marked as `Complete`. To force a re-execution of a completed step, you must manually delete that Artifact or change its status first.

**Not a chain. No A0.5 gate. No type-safety check. Pure state recovery.**
