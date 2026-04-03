# React Testing Reference

## Table of Contents
1. [Testing Philosophy](#1-testing-philosophy)
2. [React Testing Library Patterns](#2-react-testing-library-patterns)
3. [Hook Testing](#3-hook-testing)
4. [Async & Server Component Testing](#4-async--server-component-testing)
5. [Common Mistakes](#5-common-mistakes)

---

## 1. Testing Philosophy

> "Test what users see, not implementation details." — React Testing Library ethos (aligned with Dan's view)

- **Query by role/label/text**, not by CSS class or internal state.
- If you're `getByTestId`-ing everything, you're testing implementation.
- Tests should give confidence that the app works, not that it's wired a certain way.

---

## 2. React Testing Library Patterns

```tsx
import { render, screen, userEvent } from '@testing-library/react';

test('counter increments on click', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  expect(screen.getByRole('button', { name: /0/i })).toBeInTheDocument();
  await user.click(screen.getByRole('button'));
  expect(screen.getByRole('button', { name: /1/i })).toBeInTheDocument();
});
```

**Query priority:**
1. `getByRole` (most semantic)
2. `getByLabelText` (form inputs)
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (last resort)

---

## 3. Hook Testing

Use `renderHook` from `@testing-library/react`:

```tsx
import { renderHook, act } from '@testing-library/react';

test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

---

## 4. Async & Server Component Testing

**Async user events (always use `await`):**
```tsx
await user.click(button);
await screen.findByText('Success'); // waitFor equivalent
```

**Server Components (Next.js App Router):**
- Unit test with direct function calls (they're async functions):
```tsx
import { UsersPage } from './page';
test('renders user list', async () => {
  vi.mock('../db', () => ({ users: { findMany: async () => [{ id: 1, name: 'Alice' }] } }));
  const jsx = await UsersPage();
  const { getByText } = render(jsx);
  expect(getByText('Alice')).toBeInTheDocument();
});
```
- E2E tests (Playwright) for full RSC + hydration flows.

---

## 5. Common Mistakes

| Mistake | Fix |
|---|---|
| Testing component state directly | Test the UI output that reflects the state |
| `getByTestId` everywhere | Use semantic queries (role, label, text) |
| Not awaiting async events | Always `await user.click(...)` with `userEvent` |
| Mocking child components excessively | Integration tests > unit tests for UI |
| Testing implementation of `useEffect` | Test the DOM side-effect, not the effect itself |
