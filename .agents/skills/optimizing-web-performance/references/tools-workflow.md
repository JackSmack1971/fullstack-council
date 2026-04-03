# DevTools & Lighthouse Audit Workflow

## Table of Contents
1. [Lighthouse CLI Audit](#lighthouse)
2. [Chrome DevTools Performance Panel](#devtools-perf)
3. [DevTools Coverage Tab](#coverage)
4. [Web Vitals Field Data](#field-data)
5. [Lighthouse CI (Automated)](#lighthouse-ci)
6. [Puppeteer Scripted Audits](#puppeteer)

---

## 1. Lighthouse CLI Audit {#lighthouse}

### Full audit
```bash
lighthouse https://example.com \
  --output json \
  --output html \
  --output-path ./report \
  --preset=desktop        # or omit for mobile (default)
  --throttling-method=simulate
```

### Targeted audit (faster iteration)
```bash
# CWV only
lighthouse <url> --only-categories=performance

# Specific audits
lighthouse <url> --only-audits=largest-contentful-paint,total-blocking-time,cumulative-layout-shift,render-blocking-resources,uses-optimized-images,uses-text-compression
```

### Parse JSON output for CWV
```bash
cat report.json | jq '{
  LCP: .audits["largest-contentful-paint"].displayValue,
  TBT: .audits["total-blocking-time"].displayValue,
  CLS: .audits["cumulative-layout-shift"].displayValue,
  Score: .categories.performance.score
}'
```

---

## 2. Chrome DevTools Performance Panel {#devtools-perf}

### Setup for accurate traces
1. Open DevTools → **Performance** tab.
2. Click ⚙ → **CPU**: 4x slowdown (simulates mid-range Android).
3. **Network**: Fast 3G or Slow 4G.
4. Click **Record** → reload page → stop after first meaningful paint.

### Reading the trace
- **Long Tasks** (red corner on main thread): anything > 50 ms blocks INP.
- **Layout** blocks (purple): watch for repeated layout during scroll.
- **LCP candidate**: look for the green "LCP" marker on the timeline.

### Key panels
| Panel | Use For |
|-------|---------|
| Summary | Overall breakdown (Scripting/Rendering/Painting) |
| Bottom-Up | Find worst Self Time offenders |
| Call Tree | Trace root of expensive functions |
| Event Log | Filter by type (Paint, Layout, Script) |

### INP trace workflow
```
1. DevTools → Performance → ☑ Screenshots
2. Click "Record" → perform the interaction (click, type, etc.)
3. Stop → find the interaction event in the timeline
4. Expand → check main thread tasks within the interaction
5. Identify tasks > 50ms → trace to source in Call Tree
```

---

## 3. DevTools Coverage Tab {#coverage}

Identifies unused JS/CSS loaded on a page.

```
DevTools → ⋮ → More Tools → Coverage → 
  Reload → Interact with page → Stop
```

- Red = unused bytes on initial load.
- Target: < 20% unused JS on initial load for critical bundles.

**Export unused selectors:**
```
Coverage panel → Right-click → Export → coverage.json
```

---

## 4. Web Vitals Field Data {#field-data}

### Instrument your site
```js
import {onLCP, onINP, onCLS, onFCP, onTTFB} from 'web-vitals';

function sendToAnalytics({name, delta, value, id}) {
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify({name, delta, value, id}),
    keepalive: true  // survives page unload
  });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
```

### Check CrUX field data
```
PageSpeed Insights → https://pagespeed.web.dev/
  → Origin summary (p75 for real users)

CrUX API:
POST https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=API_KEY
{
  "origin": "https://example.com",
  "metrics": ["largest_contentful_paint", "interaction_to_next_paint", "cumulative_layout_shift"]
}
```

**Always prefer field data over lab scores.** Lab = ideal conditions. Field = real users on real networks and devices.

---

## 5. Lighthouse CI (Automated) {#lighthouse-ci}

### Install
```bash
npm install -g @lhci/cli
```

### Config: `.lighthouserc.json`
```json
{
  "ci": {
    "collect": {
      "url": ["https://your-staging-url.com"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "total-blocking-time": ["error", {"maxNumericValue": 200}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### Run in CI (GitHub Actions example)
```yaml
- name: Run Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun
  env:
    LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

---

## 6. Puppeteer Scripted Audits {#puppeteer}

Use for: automated regression testing, CWV measurement on authenticated pages, custom interaction traces.

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--enable-precise-memory-info']
  });
  const page = await browser.newPage();

  // Emulate mobile
  await page.emulate(puppeteer.devices['Pixel 5']);

  // Collect Web Vitals
  await page.evaluateOnNewDocument(() => {
    window.__webVitals = {};
    import('https://unpkg.com/web-vitals?module').then(({onLCP, onINP, onCLS}) => {
      onLCP(m => window.__webVitals.lcp = m.value);
      onINP(m => window.__webVitals.inp = m.value);
      onCLS(m => window.__webVitals.cls = m.value);
    });
  });

  await page.goto('https://example.com', {waitUntil: 'networkidle2'});

  const vitals = await page.evaluate(() => window.__webVitals);
  console.log('CWV:', vitals);

  await browser.close();
})();
```
