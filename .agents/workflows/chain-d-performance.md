---
name: chain-d-performance
description: >
  Performance remediation chain. 6-step cascade: baseline audit -> bundle
  reduction -> metric-specific conditional branches (LCP, INP, CLS) ->
  regression gate. Triggers via fullstack-council on "slow page", "CWV
  failure", "LCP", "INP", "CLS", "bundle size", Lighthouse score, or
  explicit Call /chain-d-performance. Also receives re-routes from
  chain-a-feature A5 (reads Artifact a5-performance as entry input).
---

# Chain D — Performance Remediation

6-step cascade. D0 and D1 always run. D2/D3/D4 are conditional on which
metrics fail. D5 always runs as the exit gate. Single-fix enforced within
each conditional step — fix one root cause, re-measure, then advance.

CWV Thresholds: LCP <=2.5s | INP <=200ms | CLS <=0.1

---

## D0 — Baseline Audit
**Skill:** `optimizing-web-performance`
**Idempotency:** If Artifact `d0-baseline` exists and Status = Complete → skip, read Artifact, advance to D1.

If re-routed from chain-a-feature: read Artifact `a5-performance` as input.
Otherwise request one of: PageSpeed Insights URL, Lighthouse JSON output,
or CrUX field data report.

Produce — no fixes in this step, diagnostic only:
- All three CWV metric values: LCP / INP / CLS current readings
- Source: lab (Lighthouse) vs field (CrUX) — note discrepancy if present
- Priority order: rank failing metrics by user-impact severity
- Root cause hypothesis per failing metric (one sentence each)
- JS bundle size total + top 3 heaviest modules (from Coverage tab)
- `[Verify]`: metric values cross-checked against both lab and field data

Generate **Task List Artifact: `d0-baseline`** before D1.

---

## D1 — Bundle Reduction
**Skill:** `theo-browne-fullstack-advisor`
**Idempotency:** If Artifact `d1-bundle` exists and Status = Complete → skip, read Artifact, advance to D2/D3/D4.

Read Artifact `d0-baseline` — honor all Constraints Forward.

JS bundle bloat is the upstream cause of both LCP (download weight) and INP
(main thread saturation). Audit and eliminate before metric-specific branches.

Produce:
- Run webpack-bundle-analyzer or source-map-explorer against production build
- Flag: barrel files (`index.ts` re-exports) — eliminate, TS perf + bundle regression
- Flag: dependencies imported whole when tree-shaken subset suffices (e.g., lodash)
- Flag: routes missing `dynamic(() => import(...), { ssr: false })` for non-critical UI
- Flag: any `any` type suppressions masking dead-code paths that survive tree-shaking
- Code-split strategy: route-level splits first, component-level only for >50KB components
- `[Verify]`: total JS bundle delta — before/after sizes from source-map-explorer output

Generate **Task List Artifact: `d1-bundle`** before conditional branches.

Post-D1 routing — check d0-baseline metric values:
```
LCP >2.5s?  -> Execute D2 (then re-measure)
INP >200ms? -> Execute D3 (then re-measure)
CLS >0.1?   -> Execute D4 (then re-measure)
All pass?   -> Skip D2/D3/D4, proceed directly to D5
```
Multiple metrics failing: execute branches in LCP → INP → CLS order.
Re-measure after each branch before starting the next.

---

## D2 — LCP Remediation (conditional — LCP >2.5s only)
**Skill:** `rauchg-tech-lead-architect`
**Idempotency:** If Artifact `d2-lcp-fix` exists and Status = Complete → skip, re-measure, route to next failing metric or D5.

Read Artifacts `d0-baseline` + `d1-bundle` — honor all Constraints Forward.

Evaluate and apply in priority order — stop at first fix that moves LCP into range:

1. `fetchpriority="high"` on LCP image element — zero-cost, highest ROI
2. Eliminate render-blocking resources above the fold (defer non-critical scripts)
3. Server Component streaming + Suspense boundary placement for slow data paths
4. ISR revalidation interval — reduce dynamic SSR for cacheable routes
5. Edge cache headers: `Cache-Control: s-maxage=N, stale-while-revalidate`
6. Move LCP route to edge runtime if currently on Node serverless (cold start cost)
7. Image pipeline: AVIF > WebP > JPEG, correct `sizes` attribute, no oversized `srcset`

Produce K.E.R.N.E.L. with Mermaid cache-flow diagram showing the fix path.
`[Verify]`: `vercel deploy --prod` + `lighthouse <url> --only-categories=performance`
LCP target: <=2.5s confirmed in output.

Generate **Implementation Plan Artifact: `d2-lcp-fix`**.
Re-measure after deploy. If LCP passes: advance to D3 check or D5.
If LCP still fails: loop — apply next item in priority list above.

---

## D3 — INP Remediation (conditional — INP >200ms only)
**Skill:** `react-core-lead`
**Idempotency:** If Artifact `d3-inp-fix` exists and Status = Complete → skip, re-measure, route to next failing metric or D5.

Read Artifacts `d0-baseline` + `d1-bundle` — honor all Constraints Forward.

INP measures the full event duration: input delay + processing time + presentation delay.
Diagnose each segment before prescribing a fix.

Produce:
- Open React DevTools Profiler: record 3 representative interactions
- Identify: which component's render is the long task (>50ms)
- Input delay root cause: is the main thread busy at interaction time? (D1 bundle fix may already reduce this)
- Processing time root cause: synchronous state update triggering expensive re-render tree?
- Apply `startTransition` / `useTransition` for non-urgent state updates (search, filter, sort)
- Apply `useDeferredValue` for expensive derived computations
- Apply `React.memo` / `useMemo` only after Profiler confirms unnecessary re-render — not preemptively
- Check: event handlers doing synchronous >50ms work → move to Web Worker or split with `scheduler.postTask`
- `[Verify]`: DevTools Profiler trace — longest interaction task reduced to <200ms

Generate **Implementation Plan Artifact: `d3-inp-fix`**.
Re-measure after fix applied. If INP passes: advance to D4 check or D5.

---

## D4 — CLS Remediation (conditional — CLS >0.1 only)
**Skill:** `adam-wathan-design-system`
**Idempotency:** If Artifact `d4-cls-fix` exists and Status = Complete → skip, re-measure, advance to D5.

Read Artifacts `d0-baseline` + `d1-bundle` — honor all Constraints Forward.

CLS is a layout stability metric — root causes are CSS and HTML structure,
not JavaScript performance. Apply TMK ontology to the layout audit.

Produce — diagnose in order, apply single fix per pass:
- Images without explicit `width` + `height` attributes — browser cannot reserve space
- Fonts causing FOUT/FOIT: apply `font-display: optional` or `font-display: swap` + preload
- Dynamic content injected above existing content (ads, banners, cookie notices)
- Skeleton UI missing or incorrectly sized — measure actual content, match skeleton dimensions
- CSS `transform` / `opacity` animations preferred over `top`/`left`/`margin` (compositor-only)
- `aspect-ratio` utility in Tailwind v4 for responsive embeds: `aspect-video`, `aspect-square`
- `min-h-[N]` reservations for async-loaded content containers

5-point Audit Heuristic on shifting elements: whitespace reservation → alignment anchors
→ type scale consistency (reflow from font changes) → grid stability → visual weight lock.

`[Verify]`: Chrome DevTools Layout Shift Regions (enable in Rendering panel) — no red
flash on page load or interaction. CLS <=0.1 in Lighthouse output.

Generate **Task List Artifact: `d4-cls-fix`**.
Re-measure after fix applied. If CLS passes: advance to D5.

---

## D5 — Regression Gate
**Skill:** `optimizing-web-performance`
**Idempotency:** If Artifact `d5-regression-gate` exists and Status = Complete → chain already complete, report final results.

Read all completed D-chain Artifacts — confirm all three metrics now passing.

**Entry condition:** D5 does not execute until D0-baseline re-measurement confirms
LCP <=2.5s AND INP <=200ms AND CLS <=0.1 simultaneously.
If any metric is still failing: route back to the appropriate branch (D2/D3/D4).

Produce:
- Final Lighthouse run: `lighthouse <url> --output json --output html --view`
- CrUX field data check: confirm lab improvements reflected in field data trend
- Performance budget definition (add to `next.config.js` or CI config):
  ```js
  // next.config.js
  experimental: {
    bundlePagesExternals: true,
  }
  ```
- Lighthouse CI config for regression prevention:
  ```yaml
  # lighthouserc.yml
  ci:
    assert:
      assertions:
        largest-contentful-paint: [error, {maxNumericValue: 2500}]
        interaction-to-next-paint: [error, {maxNumericValue: 200}]
        cumulative-layout-shift: [error, {maxNumericValue: 0.1}]
  ```
- `[Verify]`: `lhci autorun` passes all three assertions in CI

Generate **Task List Artifact: `d5-regression-gate`**.

Chain complete. Final output: ordered fix log from d0 through d5 Artifacts,
before/after metric deltas per fix, and `lhci autorun` as the ongoing
regression guard command.
