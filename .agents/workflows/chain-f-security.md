# Chain F: Security Pipeline (Secure)

description: Deterministic 6-step Threat modeling and zero-trust hardening pipeline.

1. Verify Antigravity Strict Mode is active and network access is denied.
2. Call @Troy-Hunt-Security to execute Threat model and Secrets audit.
3. - Evaluate `THREAT_MODEL_STATE` and persist state to `task.md` Artifact.
4. Call @Guillermo-Rauch-Architecture to design Auth and Data boundary using $THREAT_MODEL_STATE.
5. - Evaluate `SECURITY_BOUNDARY_STATE` and persist state to `task.md` Artifact.
6. Call @Kent-C-Dodds-Quality to implement Security tests and Headers using $SECURITY_BOUNDARY_STATE.
