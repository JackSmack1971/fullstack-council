# Next.js Patterns Reference

> Load this file when user asks about specific Next.js App Router patterns,
> RSC, ISR, streaming, middleware, monorepo, or Turbopack.

## Table of Contents
1. [App Router File Conventions](#1-app-router-file-conventions)
2. [Server Components & Data Fetching](#2-server-components--data-fetching)
3. [Streaming & Suspense](#3-streaming--suspense)
4. [Incremental Static Regeneration (ISR)](#4-incremental-static-regeneration)
5. [Middleware & Edge Auth](#5-middleware--edge-auth)
6. [Route Handlers & API Design](#6-route-handlers--api-design)
7. [Monorepo Setup (Turborepo)](#7-monorepo-setup-turborepo)
8. [Performance Checklist](#8-performance-checklist)

---

## 1. App Router File Conventions

```
app/
├── layout.tsx          # Root shell — persists across navigations
├── page.tsx            # Route segment — Server Component by default
├── loading.tsx         # Suspense fallback — auto-wrapped
├── error.tsx           # Error boundary — "use client" required
├── not-found.tsx       # 404 segment
├── route.ts            # Route Handler (replaces API routes)
└── (group)/            # Route group — no URL segment
    └── dashboard/
        ├── layout.tsx  # Nested layout
        └── page.tsx
```

**Rule:** Every `page.tsx` and `layout.tsx` is a Server Component unless it contains
`"use client"`. Prefer Server Components 95% of the time.

---

## 2. Server Components & Data Fetching

### Correct pattern — async Server Component

```tsx
// app/dashboard/page.tsx
import { db } from '@/lib/db'

export default async function DashboardPage() {
  const metrics = await db.query.metrics.findMany()  // direct DB call — no API round-trip
  return <MetricGrid data={metrics} />
}
```

### Parallel data fetching (avoid waterfalls)

```tsx
export default async function Page() {
  const [user, posts] = await Promise.all([
    getUser(),
    getPosts(),
  ])
  return <Profile user={user} posts={posts} />
}
```

### Cache control

```tsx
// Revalidate every 60s
export const revalidate = 60

// Force dynamic (no cache)
export const dynamic = 'force-dynamic'

// Per-fetch granularity
const data = await fetch(url, { next: { revalidate: 30 } })
```

---

## 3. Streaming & Suspense

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { SlowWidget } from './slow-widget'
import { FastWidget } from './fast-widget'
import { Skeleton } from '@/components/ui/skeleton'

export default function Page() {
  return (
    <main>
      <FastWidget />                         {/* renders immediately */}
      <Suspense fallback={<Skeleton />}>
        <SlowWidget />                       {/* streams in when ready */}
      </Suspense>
    </main>
  )
}
```

**Rule:** Wrap every async Server Component that touches slow I/O in `<Suspense>`.
Never block the entire page on one slow query.

---

## 4. Incremental Static Regeneration

```tsx
// ISR with on-demand revalidation
export const revalidate = 3600  // background revalidation every hour

// On-demand via Route Handler
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  const { secret, path } = await req.json()
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  revalidatePath(path)
  return Response.json({ revalidated: true })
}
```

**Use ISR for:** marketing pages, product listings, blog posts — anything that changes
infrequently but must be fast globally.

---

## 5. Middleware & Edge Auth

```ts
// middleware.ts (runs on edge, every request)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('session')?.value

  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
}
```

**Rule:** Keep middleware <50ms. No ORM calls — use JWT or edge KV (Vercel KV).

---

## 6. Route Handlers & API Design

```ts
// app/api/posts/route.ts
import { z } from 'zod'

const schema = z.object({ title: z.string().min(1), body: z.string() })

export async function POST(req: Request) {
  const json = await req.json()
  const result = schema.safeParse(json)

  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 422 })
  }

  const post = await db.post.create({ data: result.data })
  return Response.json(post, { status: 201 })
}
```

**Anti-pattern:** Don't call your own Next.js API routes from Server Components.
Call the underlying function directly — skip the HTTP round-trip.

---

## 7. Monorepo Setup (Turborepo)

```
apps/
  web/          # Next.js app
  docs/         # Nextra / Mintlify
packages/
  ui/           # Shared React components
  db/           # Prisma schema + client
  config/       # ESLint, TypeScript, Tailwind configs
turbo.json      # Pipeline definition
```

```json
// turbo.json — pipeline
{
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "dev":   { "cache": false, "persistent": true },
    "lint":  { "outputs": [] },
    "test":  { "outputs": ["coverage/**"] }
  }
}
```

**Start here:** `npx create-turbo@latest`

---

## 8. Performance Checklist

```
- [ ] Images: next/image with priority on LCP image
- [ ] Fonts: next/font — zero CLS, self-hosted
- [ ] Bundle: Check with @next/bundle-analyzer — no accidental client bloat
- [ ] Core Web Vitals: vercel.com/analytics — INP < 200ms target
- [ ] Edge caching: Cache-Control headers on Route Handlers
- [ ] DB queries: No N+1 — use include/with in ORM
- [ ] Streaming: Suspense boundaries on every slow async component
- [ ] Middleware matcher: Narrow scope — don't run on _next/static
```
