---
name: chain-d-performance
description: >
  Performance remediation chain with loop mechanism and conditional branches.
  Diagnoses and fixes CWV failures iteratively. Branches to react-core-lead
  for INP and rauchg-tech-lead-architect for LCP. Triggers via fullstack-council
  router on "slow page", "bad Lighthouse score", "CWV failure", "LCP", "INP",
  "CLS", "bundle size", or explicit Call /chain-d-performance. Also receives
  automatic re-routes from chain-a-feature A5 when CWV thresholds fail.
---

# Chain D — Performance Remediation

Single-fix enforced throughout. Never batch multiple CWV fixes in one pass.
Loop D1 until all three metrics pass, then close the chain.

**CWV Pass Thresholds:**
| Metric | Target |
|--------|--------|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |

---

## D1 — CWV Diagnosis (Loop Entry Point)
**Skill:** `optimizing-web-performance`

**Single-fix enforced.** One metric. One fix. One verification step.

Input required before D1 executes — request one of:
- PageSpeed Insights URL, OR
- Lighthouse JSON output, OR
- Specific metric value + page description

Produce (K.E.R.N.E.L. format):
- Worst failing CWV metric identified
- Current value → target → expected delta
- Single fix: exact code/config change, no alternatives unless asked
- `[Verify]`: `lighthouse <url> --output json` or PageSpeed Insights re-run

**After each D1 fix is applied and verified:**
```
All 3 metrics passing? → Chain complete.
LCP still failing?     → Call /chain-d-performance#D3-lcp
INP still failing?     → Call /chain-d-performance#D2-inp
CLS still failing?     → Loop D1 (layout shift root cause next)
```

---

## D2 — INP Branch (conditional — INP > 200ms only)
**Skill:** `react-core-lead`

Input: D1 diagnosis confirming INP as failing metric.

Diagnose re-render cascade causing interaction delay:
- React Profiler simulation: identify component causing long task
- Apply Concurrent features: `useTransition` for non-urgent updates,
  `useDeferredValue` for expensive derived state
- Check: event handler synchronous work > 50ms, missing `startTransition`
  on state updates triggered by user input
- `[Verify]`: interaction trace in React DevTools Profiler — long task
  reduced below 200ms

Return to D1 loop after fix applied.

---

## D3 — LCP Branch (conditional — LCP > 2.5s only)
**Skill:** `rauchg-tech-lead-architect`

Input: D1 diagnosis confirming LCP as failing metric.

Evaluate in priority order:
1. `fetchpriority="high"` on LCP image — check before ISR
2. Server Component streaming + Suspense boundary placement
3. ISR revalidation interval for dynamic but cacheable data
4. Edge cache strategy: CDN TTL, `Cache-Control` headers, stale-while-revalidate
5. Edge runtime for the LCP route if currently on Node serverless

Produce K.E.R.N.E.L. architecture output with Mermaid cache-flow diagram.
`[Verify]`: `vercel deploy --prod` + Lighthouse re-run — LCP delta confirmed.

Return to D1 loop after fix applied.

---

## Chain Exit

Chain D closes when D1 confirms all three CWV metrics pass simultaneously.
Final output: ordered list of fixes applied, before/after metric deltas,
and final Lighthouse CLI command for regression monitoring.
