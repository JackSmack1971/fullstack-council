# CWV Playbook

## Table of Contents
1. [LCP Fixes](#lcp)
2. [INP Fixes](#inp)
3. [CLS Fixes](#cls)
4. [JavaScript Bundle Reduction](#js)
5. [Image Optimization](#images)
6. [Production Case Studies](#cases)

---

## 1. LCP Fixes {#lcp}

**Most common causes (ranked by frequency):**
- Slow server TTFB
- Render-blocking resources
- LCP image not preloaded
- Large uncompressed image

### Fix A: Preload LCP image
```html
<link rel="preload" as="image" href="/hero.avif"
      fetchpriority="high" imagesrcset="...">
```
- Add `fetchpriority="high"` to the `<img>` tag itself.
- Never lazy-load the LCP element.

### Fix B: Eliminate render-blocking CSS/JS
```bash
# Identify blockers
lighthouse <url> --only-audits=render-blocking-resources
```
Move non-critical CSS to `<link media="print" onload="this.media='all'">`.
Defer all non-critical JS with `defer` or `type="module"`.

### Fix C: Use `next/image` (Next.js)
```jsx
import Image from 'next/image'
<Image src="/hero.jpg" priority width={1200} height={600} alt="..." />
```
Automatically handles: WebP/AVIF conversion, srcset, lazy-load (off for above-fold), size hints.

### Fix D: Reduce TTFB
- Enable HTTP/3 + Brotli compression at the CDN edge.
- Target TTFB ≤ 800 ms (Lighthouse audit: `server-response-time`).

**Verification:**
```bash
lighthouse <url> --only-audits=largest-contentful-paint,lcp-lazy-loaded,uses-optimized-images
```

---

## 2. INP Fixes {#inp}

INP replaced FID in March 2024. It measures the **worst interaction latency** across the page visit.

**Most common causes:**
- Long tasks on the main thread (>50 ms)
- Unthrottled event handlers
- Heavy third-party scripts firing on interaction

### Fix A: Break up long tasks with `scheduler.yield()`
```js
async function processLargeList(items) {
  for (const item of items) {
    process(item);
    if (/* every N items */) await scheduler.yield();
  }
}
```

### Fix B: Use `isInputPending` for deferral
```js
while (workQueue.length > 0) {
  if (navigator.scheduling?.isInputPending()) break; // yield to user
  doWork(workQueue.shift());
}
```

### Fix C: Debounce / throttle event handlers
```js
// Bad: fires on every keystroke
input.addEventListener('input', expensiveSearch);

// Good: debounced
input.addEventListener('input', debounce(expensiveSearch, 150));
```

### Fix D: Audit third-party INP impact
```
DevTools → Performance → Record interaction → 
  Check "Bottom-Up" tab → Sort by "Self Time" → 
  Identify third-party scripts > 50ms
```

**Verification:**
```bash
# Field data
web-vitals npm package + send to analytics
# Lab
lighthouse <url> --only-audits=total-blocking-time  # TBT proxies INP in lab
```

---

## 3. CLS Fixes {#cls}

**Most common causes:**
- Images/iframes without explicit dimensions
- Dynamically injected content above existing content
- Web fonts causing FOUT (Flash of Unstyled Text)

### Fix A: Always size images
```html
<!-- Bad -->
<img src="hero.jpg" alt="...">

<!-- Good -->
<img src="hero.jpg" width="800" height="400" alt="..."
     style="aspect-ratio: 800/400">
```

### Fix B: Reserve space for dynamic content
```css
.ad-slot { min-height: 250px; }
.skeleton { height: 200px; background: #eee; }
```

### Fix C: Font swap strategy
```css
@font-face {
  font-family: 'MyFont';
  font-display: optional; /* prevents FOUT-caused CLS */
}
```
Use `font-display: optional` when CLS matters more than FOUT visibility.

### Fix D: `transform` for animations (not `top/left/width/height`)
```css
/* Bad — triggers layout */
.animated { transition: top 0.3s; }

/* Good — compositor only */
.animated { transition: transform 0.3s; }
```

**Verification:**
```
DevTools → Performance → Enable "Layout Shift Regions" →
  Record page load → Green flashes = layout shifts
```

---

## 4. JavaScript Bundle Reduction {#js}

### Audit first
```bash
npx source-map-explorer dist/main.js
# or
npx webpack-bundle-analyzer stats.json
```

### Priority actions
1. **Remove unused deps**: `npx depcheck`
2. **Tree-shake**: Ensure `sideEffects: false` in package.json for your libs.
3. **Code-split by route**:
   ```js
   // React / Next.js
   const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
   ```
4. **Replace heavy libs**:
   - `moment.js` (72 KB) → `date-fns` or `Temporal API`
   - `lodash` (full) → `lodash-es` + tree-shake, or native methods
   - `axios` → native `fetch`

### Bundle size budgets
```json
// webpack.config.js
performance: {
  maxEntrypointSize: 170000,  // 170 KB gzipped
  maxAssetSize: 170000,
  hints: 'error'
}
```

---

## 5. Image Optimization {#images}

### Format priority: AVIF > WebP > JPEG/PNG

```html
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" width="800" height="400" alt="..." loading="lazy">
</picture>
```

### Compression targets
| Format | Quality Setting | Max File Size (hero) |
|--------|----------------|----------------------|
| AVIF | q=60-75 | ≤ 80 KB |
| WebP | q=80-85 | ≤ 120 KB |
| JPEG | q=75-85 | ≤ 150 KB |

### Tools
- **Squish** (Addy's tool): batch AVIF/WebP conversion
- **Sharp** (Node): server-side conversion pipeline
- **Cloudinary / Imgix**: on-the-fly optimization at edge

### Responsive images
```html
<img
  src="hero-800.jpg"
  srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  width="1200" height="600" alt="..."
>
```

---

## 6. Production Case Studies {#cases}

### Chloé (fashion e-commerce)
- **Problem:** LCP 6.2 s on mobile, driven by unoptimized hero image + render-blocking CSS.
- **Fix:** Preloaded AVIF hero with `fetchpriority="high"`, inlined critical CSS, deferred non-critical.
- **Result:** LCP → 2.1 s. Conversion rate +17%.

### General pattern: AI-generated code audit
- AI tools often generate `<script src="..." />` without `defer` or `async`.
- Run `lighthouse --only-audits=render-blocking-resources` on AI output before shipping.
- Add Lighthouse CI to the PR pipeline to catch regressions automatically.
