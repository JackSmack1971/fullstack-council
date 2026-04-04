---
name: chain-d-performance
description: >
  Performance remediation chain with loop mechanism and conditional branches.
  Diagnoses and fixes CWV failures iteratively. Branches to react-core-lead
  for INP and rauchg-tech-lead-architect for LCP. Triggers via fullstack-council
  router on "slow page", "CWV failure", "LCP", "INP", "CLS", "bundle size",
  or explicit Call /chain-d-performance. Also receives re-routes from
  chain-a-feature A5 (reads Artifact a5-performance as entry input).
---

# Chain D — Performance Remediation

Single-fix enforced throughout. Each D1 pass generates a versioned Artifact.
Loop until all three metrics pass.

CWV Pass Thresholds: LCP <=2.5s | INP <=200ms | CLS <=0.1

---

## D1 — CWV Diagnosis (Loop Entry)
**Skill:** `optimizing-web-performance`
**Idempotency:** Check for highest existing `d1-cwv-pass[N]`. If Status = Complete and all CWV pass → chain complete. Otherwise resume at pass N+1.

If re-routed from chain-a-feature: read Artifact `a5-performance` as input.
Otherwise, request before executing: PageSpeed Insights URL, Lighthouse JSON,
or specific metric value + page description.

Single-fix enforced. One metric. One fix. One verification command.

Produce (K.E.R.N.E.L.):
- Worst failing CWV metric
- Current value -> target -> delta
- Single exact fix: code or config change
- `[Verify]`: `lighthouse <url> --output json` or PageSpeed re-run

Generate **Task List Artifact: `d1-cwv-pass[N]`** (increment N each loop).

Post-verify routing:
```
All 3 pass?        -> Chain complete
INP still failing? -> Call /chain-d-performance#D2-inp (reads d1-cwv-passN)
LCP still failing? -> Call /chain-d-performance#D3-lcp (reads d1-cwv-passN)
CLS still failing? -> Loop D1 (layout shift root cause next)
```

---

## D2 — INP Branch (conditional — INP >200ms only)
**Skill:** `react-core-lead`
**Idempotency:** If Artifact `d2-inp-fix` exists and Status = Complete → skip, return to D1 loop.

Read most recent `d1-cwv-pass[N]` Artifact.

Diagnose re-render cascade causing interaction delay:
- React Profiler simulation: identify long-task component
- Apply useTransition for non-urgent updates
- Apply useDeferredValue for expensive derived state
- Check: synchronous event handler work >50ms, missing startTransition
- `[Verify]`: interaction trace in React DevTools Profiler — long task <200ms

Generate **Implementation Plan Artifact: `d2-inp-fix`**.
Return to D1 loop after fix applied.

---

## D3 — LCP Branch (conditional — LCP >2.5s only)
**Skill:** `rauchg-tech-lead-architect`
**Idempotency:** If Artifact `d3-lcp-fix` exists and Status = Complete → skip, return to D1 loop.

Read most recent `d1-cwv-pass[N]` Artifact.

Evaluate in priority order:
1. fetchpriority="high" on LCP image
2. Server Component streaming + Suspense boundary placement
3. ISR revalidation interval tuning
4. Edge cache: Cache-Control headers, stale-while-revalidate
5. Edge runtime for LCP route if on Node serverless

Produce K.E.R.N.E.L. with Mermaid cache-flow diagram.
`[Verify]`: `vercel deploy --prod` + Lighthouse re-run — LCP delta confirmed.

Generate **Implementation Plan Artifact: `d3-lcp-fix`**.
Return to D1 loop after fix applied.

---

## Chain Exit

All three CWV metrics pass in a single D1 Artifact verify step.
Final output: ordered fix list from all d1/d2/d3 Artifacts, before/after
metric deltas, and Lighthouse CLI command for regression monitoring.
