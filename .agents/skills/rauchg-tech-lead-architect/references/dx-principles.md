# DX Principles & Tech Debt Elimination

> Load when user asks about DX strategy, onboarding friction, tech debt,
> CI/CD pipeline design, developer tooling, or team velocity.

## Table of Contents
1. [DX Manifesto](#1-dx-manifesto)
2. [The Friction Audit](#2-the-friction-audit)
3. [CI/CD — Vercel-Native Pipeline](#3-cicd--vercel-native-pipeline)
4. [Tech Debt Classification](#4-tech-debt-classification)
5. [Onboarding Baseline](#5-onboarding-baseline)
6. [Tooling Defaults](#6-tooling-defaults)

---

## 1. DX Manifesto

> "The best infra is the one your team forgets exists."

- **Measure DX as time-to-first-deploy** for a new team member. Target: <30 minutes.
- **Zero-config defaults beat documentation.** If you need a wiki to explain your stack, the stack is wrong.
- **Every PR should auto-preview.** Feedback loops close in seconds, not hours.
- **Local == Production.** Parity eliminates "works on my machine" bugs permanently.
- **One command bootstraps everything.** `pnpm install && pnpm dev` — that's it.

---

## 2. The Friction Audit

Run this checklist against any existing project:

```
Friction Audit:
- [ ] New dev → running app locally in <15 minutes?
- [ ] Does local environment match production exactly? (same runtime, same env vars)
- [ ] Are secrets managed via .env.local + Vercel env, not checked into git?
- [ ] Is there a single bootstrap command in README?
- [ ] Does `git push` trigger a preview deployment automatically?
- [ ] Are type errors caught pre-commit? (TypeScript strict + lint-staged)
- [ ] Is the test suite fast enough to run on every PR? (<3 min target)
- [ ] Are dependency updates automated? (Renovate or Dependabot)
- [ ] Is there a clear migration path for DB schema changes?
- [ ] Can any engineer rollback production in <60 seconds?
```

Score: 9–10 checks = healthy. <7 = intervention required.

---

## 3. CI/CD — Vercel-Native Pipeline

### Recommended pipeline (zero-infra)

```
git push (feature branch)
    └── Vercel: preview deploy (auto, unique URL)
        └── Run: pnpm test + pnpm lint (GitHub Actions or Vercel checks)
            └── PR review → merge to main
                └── Vercel: production deploy (automatic)
                    └── Vercel Analytics: CWV regression alert
```

### GitHub Actions — lean test job

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm type-check
      - run: pnpm lint
      - run: pnpm test --passWithNoTests
```

**Rule:** Keep CI under 3 minutes. Split into separate jobs if it grows beyond that.

---

## 4. Tech Debt Classification

| Class | Definition | Response |
|---|---|---|
| **Structural debt** | Architecture that blocks scaling (custom server, monolith pages router in app router project) | Migrate now — block new features until resolved |
| **Dependency debt** | Outdated major versions, abandoned packages | Automate via Renovate; tackle in quarterly sprints |
| **Test debt** | Critical paths with no tests | Add tests before any refactor of that path |
| **Type debt** | `any` types, missing generics, `@ts-ignore` abuse | Lint rule: ban `any` in new code; reduce in existing code |
| **Config debt** | Duplicated env vars, inconsistent build configs | Centralize in monorepo `packages/config/` |

**Rule:** Never ship a feature that adds structural debt. All other debt is
acceptable if tracked and scheduled.

---

## 5. Onboarding Baseline

```bash
# Every project must have this working from a clean clone:
git clone <repo>
cd <repo>
cp .env.example .env.local   # fill in secrets from team vault
pnpm install
pnpm dev                      # → http://localhost:3000 ✓
```

**README must include:**
1. Prerequisites (Node version, package manager)
2. Environment variable table (name, description, where to get value)
3. Single bootstrap command
4. How to run tests
5. How to deploy (usually just: `git push` → Vercel auto-deploys)

Nothing else. Keep README under 100 lines. Link to detailed docs for everything else.

---

## 6. Tooling Defaults

| Category | Tool | Why |
|---|---|---|
| Package manager | pnpm | Fast, disk-efficient, monorepo-native |
| TypeScript | strict mode | Catch bugs at type-check, not runtime |
| Linting | ESLint + eslint-config-next | Next.js-aware rules baked in |
| Formatting | Prettier (no config) | Zero debate, auto-format on save |
| Pre-commit | lint-staged + husky | Block broken code at commit time |
| Testing | Vitest + React Testing Library | Fast, Vite-native, no config |
| E2E | Playwright | Multi-browser, Vercel CI integration |
| DB schema | Prisma or Drizzle ORM | Type-safe queries, migration history |
| Env vars | @t3-oss/env-nextjs | Runtime validation, no silent failures |
| Dep updates | Renovate | Auto-PR dependency updates |
