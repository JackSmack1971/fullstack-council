# Chain D: Performance Pipeline (Parallelized)

description: Deterministic 6-step Performance optimization utilizing concurrent execution.

1. Verify Antigravity Strict Mode is active (Sandbox Allow Network: Disabled).
2. Explicitly append `pagespeed.web.dev` to the Strict Mode allowlist.
3. Call @Addy Osmani (LCP) to resolve image preloading/fetchpriority using $BASELINE_STATE.
4. ### Step 2: Visual Regression & Layout Shift (Browser Subagent)
   // parallel
   1. @addyosmani-lcp-optimization: Invoke the Browser Subagent to navigate to `http://localhost:3000`.
   2. Capture a full-page screenshot artifact to analyze visual hierarchy.
   3. Extract DOM metrics for Cumulative Layout Shift (CLS).
   *Note: If an MFA or CAPTCHA screen is encountered, immediately halt execution and request user review.*
5. // capture BROWSER_AUDIT_STATE
6. // parallel
   - Call @INP-Optimization to resolve main-thread blocking using $BROWSER_AUDIT_STATE.
   - Call @CLS-Optimization to resolve aspect ratios/layout slots using $BROWSER_AUDIT_STATE.
7. // capture PARALLEL_PERF_STATE
8. Call @Kent-C-Dodds-Quality to execute regression gate using $PARALLEL_PERF_STATE.
