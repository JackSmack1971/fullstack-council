# State Management Reference

## Table of Contents
1. [Decision Framework](#1-decision-framework)
2. [useState + Props](#2-usestate--props)
3. [Context + useReducer](#3-context--usereducer)
4. [Redux Toolkit](#4-redux-toolkit)
5. [Zustand](#5-zustand)
6. [Common Colocation Mistakes](#6-common-colocation-mistakes)

---

## 1. Decision Framework

```
Is the state used by only one component?
└── Yes → useState (keep it local)

Is it used by siblings or cousins?
└── Yes → Lift to nearest common ancestor

Is lifting creating prop drilling (3+ levels)?
└── Yes → Context API (stable, infrequently changing values)
         → External store (frequently changing values)

Is it complex, cross-cutting, or needs time-travel debugging?
└── Yes → Redux Toolkit

Is it global but simple? Do you hate boilerplate?
└── Yes → Zustand

Is the data server-origin and never mutated client-side?
└── Yes → RSC / Server Component props (no client state needed)
```

---

## 2. useState + Props

Best for local, ephemeral state. Colocate as close to use as possible.

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Functional updater form** (`c => c + 1`): always use when new state depends on old state.

---

## 3. Context + useReducer

Good pattern for moderate shared state that changes infrequently.

```tsx
type Action = { type: 'increment' } | { type: 'reset' };
type State = { count: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'reset': return { count: 0 };
  }
}

const CounterContext = createContext<{ state: State; dispatch: Dispatch<Action> } | null>(null);

export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  // Memoize value to prevent unnecessary re-renders
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>;
}
```

**Warning:** Every context consumer re-renders when the value object changes reference. Split contexts by update frequency.

---

## 4. Redux Toolkit

```tsx
// store/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; }, // Immer under the hood
    decrement: state => { state.value -= 1; },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;

// Component
const count = useAppSelector(state => state.counter.value);
const dispatch = useAppDispatch();
```

**Use RTK Query** for server state (replaces manual thunks + loading flags).

---

## 5. Zustand

```tsx
import { create } from 'zustand';

const useCounterStore = create<{ count: number; increment: () => void }>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));

// Component — subscribes only to `count`
function Counter() {
  const count = useCounterStore(state => state.count);
  const increment = useCounterStore(state => state.increment);
  return <button onClick={increment}>{count}</button>;
}
```

**Surgical subscriptions** (`state => state.count`) prevent unnecessary re-renders.

---

## 6. Common Colocation Mistakes

| Mistake | Fix |
|---|---|
| Hoisting state to App root preemptively | Keep local; lift only when forced to |
| Single global Context for everything | Split by domain + update frequency |
| `useEffect` to sync two pieces of state | Derive one from the other during render |
| Storing server data in `useState` | Use RSC props, React Query, or RTK Query |
| Context value as inline object literal | Memoize with `useMemo` to stabilize reference |
