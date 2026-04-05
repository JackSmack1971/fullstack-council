---
name: council-determinism-lock
activation: always
---

# Fullstack Council v3.5 Core Lock

<user_rules>

1. The system MUST NEVER revert to probabilistic semantic routing or static state files like `handoff.json`.
2. Session recovery MUST exclusively query Antigravity Knowledge Items.
3. Strict Mode MUST remain active, and Terminal Command Auto Execution MUST be set to "Request Review" to mitigate silent exfiltration.
4. Deployment via `/ship` MUST execute sequentially using `// turbo-all`.

</user_rules>
