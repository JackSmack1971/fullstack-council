---
name: chain-resume
description: >
  Cold restart recovery for interrupted chains. Scans existing Artifacts to
  determine the last complete step and resumes the chain from the next step.
  Invoke: /resume or /resume [a|b|c|d|e]. Use when returning to a session
  after closing mid-chain. Works because Artifacts persist across sessions;
  chat history does not need to.
---

# Chain Resume — Cold Restart Recovery

## How It Works

Artifacts persist natively across sessions. Chat history does not. On cold
restart, this workflow reads the Artifact panel to reconstruct chain state,
then re-invokes the interrupted chain. Each chain step has an idempotency
guard — if its Artifact already exists and is Complete, the step is skipped
automatically. Resume is therefore just a normal chain invocation with
existing Artifacts acting as skip signals.

---

## Step 1 — Identify the Chain

If the user provided `/resume [a|b|c|d|e]`, use that chain letter directly.

If invoked as bare `/resume`: scan the Artifact panel for the most recent
chain-prefixed Artifact (naming convention: `[chain-letter][step]-[slug]`).
The chain letter of the most recent Artifact is the interrupted chain.
If no chain Artifacts exist at all: emit `[RESUME] No chain Artifacts found.
Start a new chain with /chain-a-feature, /chain-b-review, etc.` and halt.

---

## Step 2 — Artifact Completeness Scan

Check each expected Artifact for the identified chain in order.
An Artifact is **Complete** if it exists and its Status field = `Complete`.
An Artifact is **Incomplete** if it exists but Status = `Blocked` or `In Progress`.
An Artifact is **Missing** if it does not appear in the Artifact panel.

**Chain A manifest:**
- [ ] `a1-architecture` — Implementation Plan
- [ ] `a2-components` — Implementation Plan
- [ ] `a3-ui` — Task List
- [ ] `a4-quality` — Task List
- [ ] `a5-performance` — Task List

**Chain B manifest:**
- [ ] `b1-react-audit` — Implementation Plan
- [ ] `b2-ts-audit` — Task List
- [ ] `b3-quality-audit` — Task List
- [ ] `b4-ui-audit` — Task List

**Chain C manifest:**
- [ ] `c1-tradeoffs` — Implementation Plan
- [ ] `c2-architecture` — Implementation Plan
- [ ] `c3-verdict` — Task List

**Chain D manifest (variable — N = last pass number):**
- [ ] `d1-cwv-pass[N]` — Task List (check for highest N)
- [ ] `d2-inp-fix` — Implementation Plan (if INP branch ran)
- [ ] `d3-lcp-fix` — Implementation Plan (if LCP branch ran)

**Chain E manifest:**
- [ ] `e1-example` — Task List
- [ ] `e2-tests` — Task List
- [ ] `e3-styled` — Task List

---

## Step 3 — Determine Resume Point

```
Last Complete Artifact = highest sequential Artifact with Status: Complete
Resume Point = step immediately after Last Complete Artifact
```

Emit a resume summary before invoking:

```
[RESUME] Chain [X] interrupted after [last complete step].
Artifacts confirmed: [list]
Resuming at: [resume step] — [skill name]
Skipping: [list of complete steps] (idempotency guards active)
```

**Incomplete Artifact handling:** If the last Artifact exists but Status is
not Complete (mid-step interruption), re-execute that step from scratch.
The existing incomplete Artifact is overwritten by the new execution.
Emit: `[RESUME] [step] Artifact incomplete. Re-executing from step [X].`

---

## Step 4 — Invoke the Chain

Call the identified chain workflow normally:

```
Call /chain-a-feature   (for Chain A)
Call /chain-b-review    (for Chain B)
Call /chain-c-architecture  (for Chain C)
Call /chain-d-performance   (for Chain D)
Call /chain-e-teaching      (for Chain E)
```

The chain's idempotency guards handle the rest. Steps with complete
Artifacts are skipped. The first step without a complete Artifact executes.

---

## Edge Cases

**Mid-step interruption in Chain D loop:** Find the highest `d1-cwv-pass[N]`
Artifact. If it is Complete and all three CWV metrics are passing within it,
the chain was already finished. If metrics are still failing, resume D1 with
pass number N+1.

**Partial Artifact from a crashed write:** If an Artifact exists but its
Constraints Forward or Verify section is empty, treat it as Incomplete.
Re-execute that step.

**Wrong chain invoked:** If Artifacts from multiple chains exist (e.g., both
`a2-components` and `b1-react-audit`), `/resume` without a chain argument
is ambiguous — ask: `"Multiple chains detected: [A, B]. Which to resume?"`
