# Concurrent Rendering Reference

## Table of Contents
1. [Mental Model](#1-mental-model)
2. [startTransition](#2-starttransition)
3. [useDeferredValue](#3-usedeferredvalue)
4. [Suspense](#4-suspense)
5. [Pitfalls](#5-pitfalls)

---

## 1. Mental Model

Concurrent Mode means React can **interrupt, pause, and resume renders**. This is not a bug — it's the feature. Your render functions must be pure (idempotent) because React may call them multiple times before committing.

**Contract:** `render(state) → UI`. No side effects, no module-level mutation, no random values.

---

## 2. startTransition

Marks updates as **non-urgent**. React may defer them if more urgent updates (user input) arrive.

```tsx
import { startTransition, useState } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(e) {
    // Urgent: update input immediately
    setQuery(e.target.value);

    // Non-urgent: results can lag
    startTransition(() => {
      setResults(search(e.target.value));
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      <ResultsList results={results} />
    </>
  );
}
```

**When to use:** Expensive state updates that don't need to block typing/interaction.

---

## 3. useDeferredValue

Creates a **lagged copy** of a value. Useful when you receive a prop you can't wrap in `startTransition`.

```tsx
import { useDeferredValue } from 'react';

function ProductList({ query }) {
  const deferredQuery = useDeferredValue(query);
  // deferredQuery lags behind query; expensive filtering uses deferred version
  const filtered = useMemo(() => heavyFilter(deferredQuery), [deferredQuery]);
  return <List items={filtered} />;
}
```

**`startTransition` vs `useDeferredValue`:**
- `startTransition` — you control the state setter; wrap the update.
- `useDeferredValue` — you receive a prop/value you can't control; wrap the consumer.

---

## 4. Suspense

Declarative loading state at the **component tree level**.

```tsx
<Suspense fallback={<Spinner />}>
  <ProfileDetails userId={id} />
</Suspense>
```

Components inside `<Suspense>` can suspend by throwing a Promise (data libraries handle this). React catches the throw, renders the fallback, and retries when the Promise resolves.

**Nested Suspense for progressive reveal:**
```tsx
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<FeedSkeleton />}>
    <Feed />
  </Suspense>
  <Suspense fallback={<SidebarSkeleton />}>
    <Sidebar />
  </Suspense>
</Suspense>
```

---

## 5. Pitfalls

| Pitfall | Why it breaks | Fix |
|---|---|---|
| Side effects in render | React may invoke render multiple times | Move to `useEffect` or `useLayoutEffect` |
| `Math.random()` / `Date.now()` in render | Non-idempotent; breaks hydration | Derive in effect or pass as prop |
| Module-level mutable state | Shared across concurrent renders | Use refs or external immutable stores |
| Wrapping all updates in `startTransition` | Delays urgent updates | Only wrap non-urgent, expensive updates |
| Suspense without Error Boundary | Unhandled rejections surface as crashes | Pair every `<Suspense>` with `<ErrorBoundary>` |
