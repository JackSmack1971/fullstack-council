# Testing Patterns Reference

> Load this file when the user needs RTL code examples, async test patterns, MSW setup,
> integration test structure, or help diagnosing specific test anti-patterns.

## Table of Contents
1. [RTL Query Examples by Role](#1-rtl-query-examples-by-role)
2. [Integration Test Structure](#2-integration-test-structure)
3. [Async Testing Patterns](#3-async-testing-patterns)
4. [MSW Setup (API Mocking)](#4-msw-setup-api-mocking)
5. [Common Anti-Patterns & Fixes](#5-common-anti-patterns--fixes)
6. [Component API Design Checklist](#6-component-api-design-checklist)
7. [When to Write Each Test Type](#7-when-to-write-each-test-type)

---

## 1. RTL Query Examples by Role

```tsx
// ✅ Preferred: getByRole mirrors what screen readers announce
const submitBtn = screen.getByRole('button', { name: /submit/i })
const heading   = screen.getByRole('heading', { name: /welcome/i })
const emailInput = screen.getByRole('textbox', { name: /email/i })
const checkbox  = screen.getByRole('checkbox', { name: /agree to terms/i })
const dialog    = screen.getByRole('dialog', { name: /confirm delete/i })
const navLink   = screen.getByRole('link', { name: /dashboard/i })

// ✅ Form fields: getByLabelText
const password = screen.getByLabelText(/password/i)

// ✅ Last resort: getByTestId (only if zero semantic option exists)
const chart = screen.getByTestId('revenue-chart') // acceptable for canvas/SVG
```

**Common roles:** `button`, `link`, `heading`, `textbox`, `checkbox`, `radio`, `combobox`, `listbox`, `option`, `dialog`, `alert`, `navigation`, `main`, `banner`, `contentinfo`, `img`, `list`, `listitem`, `tab`, `tabpanel`, `table`, `row`, `cell`.

---

## 2. Integration Test Structure

```tsx
// tests/checkout.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckoutPage } from '../CheckoutPage'
import { server } from '../mocks/server' // MSW server
import { http, HttpResponse } from 'msw'

test('user can complete checkout with valid card', async () => {
  const user = userEvent.setup()

  render(<CheckoutPage />)

  // Fill form — use semantic queries
  await user.type(screen.getByLabelText(/card number/i), '4242424242424242')
  await user.type(screen.getByLabelText(/expiry/i), '12/26')
  await user.type(screen.getByLabelText(/cvc/i), '123')

  await user.click(screen.getByRole('button', { name: /pay now/i }))

  // Assert observable outcome — not internal state
  await screen.findByText(/payment successful/i)
  expect(screen.getByRole('heading', { name: /thank you/i })).toBeInTheDocument()
})
```

> **Rule:** Each test covers a full user interaction path, not a single function call.

---

## 3. Async Testing Patterns

```tsx
// ✅ findBy* = getBy* + waitFor (preferred for async)
const result = await screen.findByText(/loaded/i)

// ✅ waitFor for assertions that need to settle
await waitFor(() => {
  expect(screen.getByRole('status')).toHaveTextContent('Saved')
})

// ✅ waitForElementToBeRemoved for loading states
await waitForElementToBeRemoved(() => screen.getByRole('progressbar'))

// ❌ Avoid: manual setTimeout or arbitrary delays
await new Promise(r => setTimeout(r, 500)) // fragile, never do this
```

---

## 4. MSW Setup (API Mocking)

```ts
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ id: 1, name: 'Kent' })
  }),
  http.post('/api/checkout', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ success: true, orderId: 'abc123' })
  }),
]

// src/mocks/server.ts (Node / test environment)
import { setupServer } from 'msw/node'
import { handlers } from './handlers'
export const server = setupServer(...handlers)

// src/setupTests.ts
import { server } from './mocks/server'
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

> Use MSW instead of `jest.mock()` for network calls. It tests the actual fetch behavior.

**Override per test:**
```ts
server.use(
  http.post('/api/checkout', () => HttpResponse.json({ error: 'Card declined' }, { status: 400 }))
)
```

---

## 5. Common Anti-Patterns & Fixes

### ❌ Testing implementation details
```tsx
// BAD: tests internal state — breaks on refactor
expect(wrapper.instance().state.isOpen).toBe(true)

// GOOD: test observable behavior
expect(screen.getByRole('dialog')).toBeInTheDocument()
```

### ❌ Testing the wrong user
```tsx
// BAD: tests that a prop was passed (developer-implementation detail)
expect(MyComponent).toHaveBeenCalledWith({ onClick: expect.any(Function) })

// GOOD: test that clicking produces the right effect for the end-user
await user.click(screen.getByRole('button', { name: /delete/i }))
expect(screen.getByRole('alert')).toHaveTextContent(/item deleted/i)
```

### ❌ Over-mocking
```tsx
// BAD: mocking everything — you're testing nothing real
jest.mock('../api/users')
jest.mock('../hooks/useAuth')
jest.mock('../components/Modal')

// GOOD: mock network via MSW, render real components
// Only mock things outside your control (third-party SDKs, browser APIs)
```

### ❌ Snapshot abuse
```tsx
// BAD: giant snapshots that fail on any change
expect(container).toMatchSnapshot() // 200 lines of HTML

// GOOD: specific, meaningful assertions
expect(screen.getByRole('heading')).toHaveTextContent('Dashboard')
expect(screen.getAllByRole('listitem')).toHaveLength(5)
```

---

## 6. Component API Design Checklist

Kent's criteria for a great component API:

- [ ] **Simple defaults** — works great out of the box with zero props
- [ ] **Flexible extension** — accepts `className`, `style`, and spreads `...props`
- [ ] **Controlled/uncontrolled** — supports both patterns where applicable
- [ ] **Composable** — uses compound component pattern when state needs sharing
- [ ] **Accessible** — semantic element, correct role, keyboard navigable
- [ ] **No prop drilling** — use context or composition instead
- [ ] **Minimal footprint** — fewest props that achieve the goal

```tsx
// ❌ Rigid — forces implementation on consumers
<Table data={data} columns={columns} renderRow={fn} pagination={true} />

// ✅ Composable — flexible without explosion of props
<Table>
  <TableHead>
    <TableRow><TableCell>Name</TableCell></TableRow>
  </TableHead>
  <TableBody>
    {data.map(row => <TableRow key={row.id}><TableCell>{row.name}</TableCell></TableRow>)}
  </TableBody>
</Table>
```

---

## 7. When to Write Each Test Type

| Scenario | Test Type | Reason |
|---|---|---|
| Pure utility function | Unit | No UI, pure logic |
| Custom hook | Unit (renderHook) | Isolated behavior |
| Component + children + API | Integration | Full user flow |
| Form submission | Integration | Multi-step user behavior |
| Auth flow, checkout, onboarding | E2E | Critical path, full stack |
| Type safety | Static (TS) | Catches category of bugs free |
| Import cycles, lint rules | Static (ESLint) | Zero runtime cost |

> **Decision rule:** Can a user notice if this breaks? If yes → integration or E2E. If it's pure logic → unit. If you're not sure → integration.
