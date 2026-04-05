# Chain D: Performance Pipeline (Parallelized)

description: Deterministic 6-step Performance optimization utilizing concurrent execution.

1. Verify Antigravity Strict Mode is active (Sandbox Allow Network: Disabled).
2. Explicitly append `pagespeed.web.dev` to the Strict Mode allowlist.
3. Call @Kent-C-Dodds-Quality to establish baseline metrics.
4. // capture BASELINE_STATE
5. // parallel
   - Call @LCP-Optimization to resolve image preloading/fetchpriority using $BASELINE_STATE.
   - Call @INP-Optimization to resolve main-thread blocking using $BASELINE_STATE.
   - Call @CLS-Optimization to resolve aspect ratios/layout slots using $BASELINE_STATE.
6. // capture PARALLEL_PERF_STATE
7. Call @Kent-C-Dodds-Quality to execute regression gate using $PARALLEL_PERF_STATE.
