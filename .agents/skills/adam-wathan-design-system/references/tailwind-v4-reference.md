# Tailwind CSS v4 — API & Feature Reference

> Load this file when answering Tailwind v4-specific questions:
> config syntax, new utilities, Rust engine, logical properties,
> new color palettes, or migration from v3.

## Table of Contents
1. [v4 Architecture — What Changed](#1-v4-architecture--what-changed)
2. [CSS-First Configuration](#2-css-first-configuration)
3. [New Color Palettes](#3-new-color-palettes)
4. [Logical Properties](#4-logical-properties)
5. [New & Changed Utilities](#5-new--changed-utilities)
6. [Migration from v3](#6-migration-from-v3)
7. [Tooling & Integrations](#7-tooling--integrations)

---

## 1. v4 Architecture — What Changed

| Aspect | v3 | v4 |
|--------|----|----|
| Config file | `tailwind.config.js` | CSS-first (`@theme {}` block) |
| Engine | Node.js JIT | Rust (Oxide engine) |
| PostCSS plugin | Required | Optional (native CSS import) |
| Arbitrary variants | Limited | Full arbitrary variant support |
| Performance | Fast | ~10x faster full builds |

The Rust engine processes CSS directly — no separate config file required for
most projects. JavaScript config is still supported for complex plugin scenarios.

---

## 2. CSS-First Configuration

### Setup (v4)
```css
/* app.css */
@import "tailwindcss";

@theme {
  --color-brand-500: oklch(60% 0.2 250);
  --font-sans: "Inter", sans-serif;
  --spacing-18: 4.5rem;
  --breakpoint-3xl: 120rem;
}
```

### Key points
- `@theme {}` replaces `theme.extend` for custom tokens.
- CSS variables are first-class — Tailwind generates utilities from `--*` vars
  in `@theme` automatically.
- No `content` array needed — v4 auto-detects template files.
- `@layer utilities {}` and `@layer components {}` still work.
- `@apply` still works but is less necessary with v4's arbitrary-value improvements.

### Adding custom utilities
```css
@utility tab-4 {
  tab-size: 4;
}
```

---

## 3. New Color Palettes

v4 ships new perceptually-uniform palettes (oklch-based):

| Palette | Character |
|---------|-----------|
| `mauve` | Warm purple-gray — pairs with violet/purple hues |
| `olive` | Earthy yellow-green gray — pairs with lime/yellow |
| `mist` | Cool blue-gray — pairs with sky/cyan |
| `taupe` | Warm sandy gray — pairs with amber/orange |

These are designed to replace pure grays (`slate`, `zinc`, `neutral`) when
you want your grays to feel harmonically connected to your accent color.

```html
<!-- Before (v3 — gray feels disconnected from violet accent) -->
<div class="bg-zinc-900 text-violet-400">

<!-- After (v4 — mauve gray harmonizes with violet) -->
<div class="bg-mauve-900 text-violet-400">
```

Existing palettes (`slate`, `gray`, `zinc`, `neutral`, `stone`) remain.

---

## 4. Logical Properties

v4 adds logical property utilities for RTL/LTR support:

| Physical | Logical | Meaning |
|----------|---------|---------|
| `pl-*` | `ps-*` | padding-inline-start |
| `pr-*` | `pe-*` | padding-inline-end |
| `ml-*` | `ms-*` | margin-inline-start |
| `mr-*` | `me-*` | margin-inline-end |
| `left-*` | `start-*` | inset-inline-start |
| `right-*` | `end-*` | inset-inline-end |

**When to use:** Any component that must support RTL languages (Arabic, Hebrew).
Use physical properties for purely decorative spacing; logical for layout.

```html
<!-- RTL-safe nav item -->
<a class="flex items-center gap-2 ps-4 pe-2 py-2">
  <Icon />
  <span>Dashboard</span>
</a>
```

---

## 5. New & Changed Utilities

### Field sizing
```html
<textarea class="field-sizing-content">  <!-- auto-grows with content -->
```

### Starting style (animation)
```html
<div class="starting:opacity-0 transition-opacity duration-300">
  <!-- fade in on mount -->
</div>
```
Uses CSS `@starting-style` — no JS required for enter animations.

### `not-*` variant
```html
<p class="not-first:mt-4">  <!-- margin on all but first -->
```

### Color mix utilities
```html
<div class="bg-blue-500/30">  <!-- 30% opacity via color-mix() -->
```
v4 uses `color-mix()` under the hood — more accurate than rgba tricks.

### `inert` variant
```html
<div class="inert:opacity-50 inert:pointer-events-none" inert>
```

---

## 6. Migration from v3

### Automatic migration
```bash
npx @tailwindcss/upgrade
```
Handles: config conversion, renamed utilities, deprecated class removal.

### Manual changes to know
| v3 | v4 |
|----|-----|
| `bg-opacity-*` | `bg-blue-500/50` (slash syntax) |
| `text-opacity-*` | `text-blue-500/75` |
| `flex-shrink-0` | `shrink-0` |
| `overflow-ellipsis` | `text-ellipsis` |
| `decoration-clone` | `box-decoration-clone` |
| `tailwind.config.js` | `@theme {}` in CSS (optional migration) |

### Config interop
You can still use `tailwind.config.js` alongside CSS config for plugin-heavy
setups. v4 reads both; CSS config takes precedence for theme tokens.

---

## 7. Tooling & Integrations

| Tool | Status in v4 |
|------|-------------|
| Vite | First-class (`@tailwindcss/vite`) |
| PostCSS | Supported (`@tailwindcss/postcss`) |
| Webpack | Now available (`@tailwindcss/webpack`) — new in v4 |
| CLI | `@tailwindcss/cli` (standalone, no Node required for basic use) |
| Prettier plugin | `prettier-plugin-tailwindcss` — sorts classes automatically |
| ESLint | `eslint-plugin-tailwindcss` — warns on invalid/unknown classes |

### Intellisense
VS Code extension: **Tailwind CSS IntelliSense** — autocomplete, hover docs,
linting. Required for productive v4 development.

### ui.sh (Tailwind Labs component kit)
The new component library from Tailwind Labs. Built on:
- **Headless UI** (unstyled accessible primitives)
- **Catalyst** (opinionated Tailwind component system)

Replaces older Tailwind UI for new projects. Not fully open-source;
available via ui.sh.
