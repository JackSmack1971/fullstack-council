# /resume — Context Recovery Guide (v3.5)

## Overview

The Full-Stack Advisory Council v3.5 uses **Intent-driven State Reconstruction**. Because chat history is volatile but the Artifact panel and Knowledge Items are persistent, session recovery is handled by querying the Antigravity Knowledge Item ecosystem to reconstruct the most recent task state.

## /resume — Recovery Logic

The recovery process is now deterministic and stateless reaching beyond the local filesystem.

| Phase         | Behavior                                                              | Target Source        |
|---------------|-----------------------------------------------------------------------|----------------------|
| **1. Verify** | Ensures Antigravity Strict Mode is active and environment is secure. | Global Rule Baseline |
| **2. Query**  | Scans Antigravity Knowledge Items for recent task context and intent. | Knowledge Repository |
| **3. Update** | Persists context directly into the project's native Artifact state metrics. | Artifact Memory       |
| **4. Validate** | Evaluates the persisted state against the K.E.R.N.E.L. schema.        | A0.5 Axiom Gate      |
| **5. Resume** | Re-invokes the last active workflow at the identified checkpoint.     | Native Workflows     |

## How It Works

1. **Knowledge Extraction**: The agent queries the native Antigravity Knowledge Items (KI). These items represent the distilled source of truth for the project's evolution and specific task progress.
2. **Intent Reconstitution**: By analyzing recent KIs, the orchestrator identifies the last chain (e.g., `/chain-a-feature`) and the last successfully generated Artifact (e.g., `a2-components`).
3. **Stateless Resumption**: No reliance on `handoff.json`. The system assumes a "clean slate" micro-virtual machine and pulls state only from authorized knowledge boundaries.

## Limitations & Edge Cases

- **KI Latency**: In rare cases where a Knowledge Item has not yet been indexed, recovery may fallback to the most recent Artifact status.
- **handoff.json**: This file is **DEPRECATED**. If found, the system will ignore it and proceed with Knowledge-based recovery to ensure security and determinism.
- **A0.5 Gate**: The T3 Axiom check remains a mandatory validation hurdle before any feature builds resume.

> [!IMPORTANT]
> **Zero-State Resilience**: /resume is designed to work even if the entire local `.agents/state/` directory is purged. As long as the Antigravity Knowledge Items exist, the council can reconstruct its mission.

**Stateless. Secure. Deterministic Knowledge Recovery.**
