# Session Recovery (v3.6 Resilient)

description: Deterministic state recovery using Knowledge Items + Local Snapshot Fallback.

// capture
1. Write current $STATE to /tmp/session-snapshot.json (Bridge KI Latency).
2. Query Antigravity Knowledge Items for latest session intent.
3. If KI latency detected: Recover from /tmp/session-snapshot.json.
4. Call target chain at identified checkpoint.
5. Evaluate $KNOWLEDGE_STATE against the K.E.R.N.E.L. schema.
6. Auto-detect last active chain and explicitly resume execution using $KNOWLEDGE_STATE.
