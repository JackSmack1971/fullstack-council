# T3 Stack Patterns — Deep Reference

> Load this file when the user asks for architecture reviews, monorepo setup, auth decisions, DB strategy, deployment, or state management beyond basic tRPC + React Query.

## Table of Contents
1. [T3 Stack — What's In, What's Out](#1-t3-stack--whats-in-whats-out)
2. [tRPC Patterns](#2-trpc-patterns)
3. [Auth Decisions](#3-auth-decisions)
4. [Database Strategy](#4-database-strategy)
5. [Monorepo / Turborepo](#5-monorepo--turborepo)
6. [Deployment Targets](#6-deployment-targets)
7. [State Management](#7-state-management)
8. [Next.js App Router — What Actually Works](#8-nextjs-app-router--what-actually-works)
9. [Anti-Pattern Reference](#9-anti-pattern-reference)

---

## 1. T3 Stack — What's In, What's Out

**Core (always):**
- Next.js (App Router for new projects)
- TypeScript (strict mode, `noUncheckedIndexedAccess: true`)
- Tailwind CSS
- tRPC (for internal API surface)
- Prisma (ORM + source of DB types)
- Zod (all runtime validation, schema-first)
- NextAuth / Auth.js (auth if needed)

**Not in T3 core but frequently used:**
- `@tanstack/react-query` (data fetching client side)
- Drizzle (alternative ORM — valid, especially for edge)
- Clerk (auth shortcut for speed — valid)
- `next-safe-action` (server actions with type safety)

**Out / avoid for most T3 apps:**
- GraphQL (unless you're Facebook scale — you're not)
- Redux (React Query / Zustand handles 95% of cases)
- Class-based anything
- Custom REST with manual type maintenance
- Barrel files (`/types/index.ts` exporting 40 things)

---

## 2. tRPC Patterns

### Router Organization
```
server/
  api/
    routers/
      user.ts       ← feature-scoped routers
      post.ts
      billing.ts
    root.ts         ← AppRouter assembled here
    trpc.ts         ← context, middleware, base procedures
```

### Procedure Types
```ts
// Public
export const publicProcedure = t.procedure;

// Authed — always protect with middleware, not inline checks
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

// With input validation — Zod always
export const createPost = protectedProcedure
  .input(z.object({ title: z.string().min(1).max(280) }))
  .mutation(async ({ ctx, input }) => { ... });
```

### Server Actions vs tRPC
| Use tRPC | Use Server Actions |
|---|---|
| Data the client needs to fetch | Form submissions |
| Shared logic (web + mobile) | Simple mutations from RSC |
| Subscriptions | One-off page mutations |
| Complex query logic | File uploads |

---

## 3. Auth Decisions

**NextAuth (Auth.js) — default T3 choice**
- Best for: self-hosted, full control, Prisma adapter
- Watch out: session strategy (JWT vs DB), adapter setup edge cases
- Config lives in `server/auth.ts`

**Clerk — speed choice**
- Best for: ship fast, don't want to manage sessions
- Trade-off: vendor lock-in, cost at scale
- Use `@clerk/nextjs` — works with App Router

**Custom JWT**
- Almost never the right call unless you have very specific requirements
- If you go here, use `jose` library, not `jsonwebtoken` (edge compatible)

---

## 4. Database Strategy

**Local dev:** Postgres via Docker always. Never SQLite for anything you'll deploy as Postgres.

```bash
# docker-compose.yml for local dev
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    ports: ["5432:5432"]
```

**Hosted options:**
| Provider | Best For | Watch Out |
|---|---|---|
| Neon | Serverless, branching, free tier | Cold starts on free tier |
| Planetscale | Vitess-based, no foreign keys | Vitess constraints |
| Supabase | Postgres + realtime + auth | Can get complex |
| Railway | Simple, Postgres, full control | Cost at scale |
| Fly.io Postgres | Control freaks | Ops overhead |

**Prisma vs Drizzle:**
- Prisma: better DX, Prisma Studio, more ecosystem
- Drizzle: faster, SQL-like syntax, better edge support, smaller bundle
- New project for edge runtime (Cloudflare Workers): Drizzle
- Standard Node.js / Vercel: either, Prisma default

---

## 5. Monorepo / Turborepo

```
apps/
  web/          ← Next.js app
  docs/         ← Docusaurus or similar
packages/
  ui/           ← shared components
  db/           ← Prisma schema + client
  validators/   ← shared Zod schemas
  config/       ← tsconfig, eslint bases
turbo.json
pnpm-workspace.yaml
```

**Key rules:**
- Shared Zod schemas live in `packages/validators` — import in both web app AND server
- DB package exports Prisma client as singleton: `export { db } from './client'`
- `packages/ui` should be publishable — no app-specific imports
- Use `pnpm` workspaces, not Yarn or npm workspaces (better DX, faster)
- `turbo build` caches aggressively — use `dependsOn` in `turbo.json` correctly

---

## 6. Deployment Targets

| Target | Best For | T3 Notes |
|---|---|---|
| Vercel | Default, easiest, Next.js native | `NEXTAUTH_URL` env var critical |
| Fly.io | Long-running processes, WebSockets, Docker | Good for tRPC subscriptions |
| Railway | Simple, Postgres + app together | Good all-in-one for small apps |
| Cloudflare Workers | Edge, global low latency | Drizzle + D1/Hyperdrive, NOT Prisma |
| Self-hosted (Docker) | Full control | Docker Compose + Nginx + PM2 or similar |

---

## 7. State Management

**The hierarchy (follow in order):**
1. Server state → React Query (TanStack Query) via tRPC
2. URL state → `nuqs` or `useSearchParams`
3. Form state → `react-hook-form` + Zod resolver
4. Global UI state (modals, toasts) → Zustand or Jotai
5. Complex client state → Zustand

**Never reach for Redux.** If you think you need Redux, you need to redesign your data flow.

---

## 8. Next.js App Router — What Actually Works

**Use RSC (React Server Components) for:**
- Initial data fetching (no waterfall)
- SEO-critical content
- Static or low-churn data

**Use Client Components (`'use client'`) for:**
- Interactivity (onClick, forms, state)
- Browser APIs
- Anything that needs to respond to user events

**Gotchas:**
- Context providers must be client components — wrap in `providers.tsx`
- `cookies()` and `headers()` are async in Next.js 15+
- Server Actions are typed via `next-safe-action` or raw — use Zod to validate input always
- Avoid `useEffect` for fetching — use `use()` with Suspense or server data

---

## 9. Anti-Pattern Reference

```ts
// ❌ Manual REST with no types
const res = await fetch('/api/user');
const user = await res.json(); // user is `any`

// ✅ tRPC — fully typed end-to-end
const user = await trpc.user.getById.query({ id });
// user is typed from Prisma schema → Zod → tRPC output

// ❌ useEffect data fetch
useEffect(() => {
  fetch('/api/data').then(r => r.json()).then(setData);
}, []);

// ✅ React Query via tRPC
const { data } = api.post.getAll.useQuery();

// ❌ Fat barrel file
// /types/index.ts exporting 50 interfaces

// ✅ Co-located types
// feature/post/post.types.ts — or just infer from Prisma + Zod

// ❌ Wrapper around wrapper
class ApiService extends BaseService {
  private httpClient: AxiosWrapper; // wrapped Axios
  async getUser(id: string) { ... } // 4 layers for a GET
}

// ✅ tRPC procedure
// Done. That's it.
```
