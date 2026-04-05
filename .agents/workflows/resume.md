# Session Recovery Pipeline

description: Deterministic state recovery using Antigravity Knowledge Items.

1. Verify Antigravity Strict Mode is active.
2. Query Antigravity Knowledge Items for the most recent interrupted task state.
3. // capture KNOWLEDGE_STATE
4. Evaluate $KNOWLEDGE_STATE against the K.E.R.N.E.L. schema.
5. Auto-detect last active chain and explicitly resume execution using $KNOWLEDGE_STATE.
