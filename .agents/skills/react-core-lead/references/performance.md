# React Performance Reference

## Table of Contents
1. [Profiling First](#1-profiling-first)
2. [Re-render Causes](#2-re-render-causes)
3. [memo / useMemo / useCallback](#3-memo--usememo--usecallback)
4. [Code Splitting](#4-code-splitting)
5. [Virtualization](#5-virtualization)

---

## 1. Profiling First

Never optimize without measurement. Use:
- **React DevTools Profiler** — flame graph, render duration, "why did this render?"
- **`<Profiler>` API** — programmatic measurement in production
- **Chrome Performance tab** — layout, paint, scripting breakdown

**Dan's rule:** If you can't see the problem in the profiler, you don't have a performance problem yet.

---

## 2. Re-render Causes

A component re-renders when:
1. Its own state changes (`useState`, `useReducer`)
2. Its parent re-renders (new props reference, even if values are equal)
3. A Context it consumes changes value

**Diagnosis:** React DevTools → Profiler → "Highlight updates when components render"

---

## 3. memo / useMemo / useCallback

These are **escape hatches**, not defaults. Reach for them only after profiling shows a bottleneck.

```tsx
// React.memo — skip re-render if props are referentially equal
const ExpensiveList = memo(function ExpensiveList({ items }) {
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
});

// useCallback — stable function reference (typically for memo'd children)
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// useMemo — cache expensive computation
const sortedItems = useMemo(() => {
  return [...items].sort(compareFn);
}, [items]);
```

**When NOT to use:**
- `useMemo` for cheap computations (array.map on <100 items)
- `useCallback` on functions passed to DOM elements (they don't check reference equality)
- `memo` when the component rarely re-renders anyway

---

## 4. Code Splitting

```tsx
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart />
    </Suspense>
  );
}
```

Split at **route level first** (biggest wins), then at component level for rarely-seen UI.

---

## 5. Virtualization

For lists > ~200 items that cause scroll jank:

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(vItem => (
          <div key={vItem.key} style={{ position: 'absolute', top: vItem.start }}>
            {items[vItem.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Libraries:** `@tanstack/react-virtual` (recommended), `react-window` (lighter, less flexible).
