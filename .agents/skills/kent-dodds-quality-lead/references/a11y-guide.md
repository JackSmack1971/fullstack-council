# Accessibility (A11y) Guide

> Load this file when conducting an accessibility audit, reviewing semantic HTML, selecting
> ARIA patterns, or advising on keyboard navigation, focus management, or color contrast.

## Table of Contents
1. [Semantic HTML First](#1-semantic-html-first)
2. [ARIA — Use Sparingly](#2-aria--use-sparingly)
3. [Keyboard Navigation Checklist](#3-keyboard-navigation-checklist)
4. [Focus Management Patterns](#4-focus-management-patterns)
5. [Form Accessibility](#5-form-accessibility)
6. [RTL A11y Queries](#6-rtl-a11y-queries)
7. [Common A11y Violations & Fixes](#7-common-a11y-violations--fixes)
8. [Static Analysis Setup](#8-static-analysis-setup)
9. [WCAG Quick Reference](#9-wcag-quick-reference)

---

## 1. Semantic HTML First

> Rule: If a native HTML element does the job, use it. ARIA is the fallback, not the default.

```html
<!-- ❌ div soup — no semantics, no keyboard support -->
<div class="btn" onclick="submit()">Submit</div>
<div class="nav">...</div>
<div class="heading">Welcome</div>

<!-- ✅ Semantic — free keyboard, focus, role, and screen reader support -->
<button type="submit">Submit</button>
<nav>...</nav>
<h1>Welcome</h1>
```

**Native elements and their implicit roles:**

| Element | Implicit Role |
|---|---|
| `<button>` | `button` |
| `<a href>` | `link` |
| `<h1>`–`<h6>` | `heading` (level 1–6) |
| `<nav>` | `navigation` |
| `<main>` | `main` |
| `<header>` (in body) | `banner` |
| `<footer>` (in body) | `contentinfo` |
| `<section>` (with label) | `region` |
| `<input type="checkbox">` | `checkbox` |
| `<select>` | `listbox` |
| `<table>` | `table` |
| `<ul>`, `<ol>` | `list` |
| `<li>` | `listitem` |

---

## 2. ARIA — Use Sparingly

> First rule of ARIA: Don't use ARIA if a native HTML element works.

```html
<!-- ❌ Redundant — <button> already has role="button" -->
<button role="button">Click me</button>

<!-- ✅ ARIA adds value when native semantics are insufficient -->
<div role="status" aria-live="polite">Saving...</div>
<div role="alert" aria-live="assertive">Error: Invalid input</div>

<!-- ✅ Labeling icon buttons (no visible text) -->
<button aria-label="Close dialog">✕</button>

<!-- ✅ Describing expanded/collapsed state -->
<button aria-expanded="false" aria-controls="menu-id">Menu</button>
<ul id="menu-id" hidden>...</ul>

<!-- ✅ Describing relationships -->
<input aria-describedby="hint-id" />
<span id="hint-id">Must be at least 8 characters</span>

<!-- ✅ Loading states -->
<div role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" aria-label="Loading 30%">
```

**Common `aria-live` values:**
- `polite` — announces when user is idle (status updates, toasts)
- `assertive` — interrupts immediately (errors, critical alerts) — use sparingly

---

## 3. Keyboard Navigation Checklist

- [ ] All interactive elements reachable via `Tab`
- [ ] Logical tab order matches visual order
- [ ] Focus is visible at all times (`outline` not removed without alternative)
- [ ] `Enter` activates buttons and links
- [ ] `Space` activates checkboxes and buttons
- [ ] `Escape` closes modals, dropdowns, and popovers
- [ ] Arrow keys navigate within composite widgets (tabs, menus, listboxes)
- [ ] No keyboard traps (unless intentional modal focus lock)
- [ ] Skip navigation link at top of page

```tsx
// ✅ Visible focus styles — never just remove them
button:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

---

## 4. Focus Management Patterns

```tsx
// ✅ Focus trap in modals
import { useRef, useEffect } from 'react'
import FocusTrap from 'focus-trap-react' // or implement manually

function Modal({ isOpen, onClose, children }) {
  return isOpen ? (
    <FocusTrap>
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title">Confirm Action</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </FocusTrap>
  ) : null
}

// ✅ Restore focus on close
function useModalFocus(isOpen) {
  const triggerRef = useRef(null)
  useEffect(() => {
    if (!isOpen && triggerRef.current) triggerRef.current.focus()
  }, [isOpen])
  return triggerRef
}

// ✅ Move focus to new content after route change
function RouteAnnouncer() {
  const { pathname } = useLocation()
  const ref = useRef(null)
  useEffect(() => { ref.current?.focus() }, [pathname])
  return <h1 tabIndex={-1} ref={ref}>{pageTitle}</h1>
}
```

---

## 5. Form Accessibility

```tsx
// ❌ Unlabeled input — screen readers read nothing useful
<input type="email" placeholder="Enter email" />

// ✅ Explicit label association
<label htmlFor="email">Email address</label>
<input id="email" type="email" autoComplete="email" />

// ✅ Error association
<label htmlFor="email">Email address</label>
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
{hasError && <span id="email-error" role="alert">Please enter a valid email</span>}

// ✅ Required fields
<input id="name" type="text" required aria-required="true" />

// ✅ Fieldset for grouped inputs (radio, checkbox groups)
<fieldset>
  <legend>Preferred contact method</legend>
  <label><input type="radio" name="contact" value="email" /> Email</label>
  <label><input type="radio" name="contact" value="phone" /> Phone</label>
</fieldset>
```

---

## 6. RTL A11y Queries

Using semantic RTL queries IS the a11y audit — they fail if your markup is wrong.

```tsx
// These queries test a11y implicitly:
screen.getByRole('button', { name: /submit/i })         // fails if no accessible name
screen.getByLabelText(/email/i)                          // fails if no label
screen.getByRole('dialog', { name: /confirm/i })         // fails if no aria-labelledby/label

// Testing a11y states
expect(screen.getByRole('button', { name: /menu/i })).toHaveAttribute('aria-expanded', 'false')

// After interaction
await user.click(screen.getByRole('button', { name: /menu/i }))
expect(screen.getByRole('button', { name: /menu/i })).toHaveAttribute('aria-expanded', 'true')
expect(screen.getByRole('menu')).toBeVisible()

// Alert announcements
await user.click(screen.getByRole('button', { name: /save/i }))
await screen.findByRole('alert') // waits for live region
expect(screen.getByRole('alert')).toHaveTextContent(/saved successfully/i)

// Focus management
await user.click(screen.getByRole('button', { name: /open modal/i }))
expect(screen.getByRole('dialog')).toHaveFocus()
```

---

## 7. Common A11y Violations & Fixes

| Violation | Fix |
|---|---|
| `<div onClick>` | Replace with `<button>` |
| Icon button with no label | Add `aria-label="Close"` |
| Input without `<label>` | Add `<label htmlFor>` or `aria-label` |
| `outline: none` on focus | Use `focus-visible` with visible alternative |
| `role="presentation"` on interactive element | Remove — never suppress native semantics |
| Missing `alt` on meaningful images | Add descriptive alt text |
| Decorative image with alt text | Use `alt=""` to hide from screen readers |
| Color alone conveys meaning | Add icon, text, or pattern alongside color |
| Modal without focus trap | Add `focus-trap-react` or equivalent |
| No skip navigation | Add `<a href="#main">Skip to content</a>` |
| `tabIndex > 0` | Use `tabIndex={0}` or `-1` only |
| `aria-hidden` on focusable element | Remove from DOM or `display: none` |

---

## 8. Static Analysis Setup

Catch a11y violations at dev time — free confidence:

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

```json
// .eslintrc
{
  "extends": ["plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"]
}
```

For Storybook: add `@storybook/addon-a11y` for visual a11y checks per story.

For Playwright E2E: use `axe-core` via `@axe-core/playwright`:
```ts
import { checkA11y } from 'axe-playwright'
await checkA11y(page, '#main', { detailedReport: true })
```

---

## 9. WCAG Quick Reference

**Level AA targets (minimum for production):**

| Criterion | Requirement |
|---|---|
| 1.1.1 Non-text Content | All images have alt text |
| 1.3.1 Info & Relationships | Structure conveyed via semantic markup |
| 1.4.3 Contrast (Minimum) | Text: 4.5:1 ratio; Large text: 3:1 |
| 1.4.4 Resize Text | 200% zoom without loss of content |
| 2.1.1 Keyboard | All functionality available via keyboard |
| 2.4.3 Focus Order | Logical, meaningful tab sequence |
| 2.4.7 Focus Visible | Keyboard focus indicator always visible |
| 3.3.1 Error Identification | Errors described in text, not just color |
| 3.3.2 Labels or Instructions | Inputs have labels or instructions |
| 4.1.2 Name, Role, Value | All UI components have accessible name + role |

> **Rule of thumb:** If it works perfectly for a keyboard user with a screen reader, it works for everyone.
