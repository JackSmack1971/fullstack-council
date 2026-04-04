---
name: chain-f-security
description: >
  Security audit chain. 6-step cascade covering all high-risk surfaces in the
  default stack: secrets and env exposure, auth and session hardening, data
  boundary and serialization, tRPC/Server Action authorization, security test
  coverage, and a hardening gate with security headers. Triggers via
  fullstack-council on "security audit", "auth review", "env exposure",
  "secrets check", "OWASP", "hardening", "penetration test", "CSP", "CSRF",
  or explicit Call /chain-f-security. Run before any production deploy of
  features touching auth, database access, or API credentials.
---

# Chain F — Security Audit

6-step cascade. F0 + F1 always run. F2/F3/F4 run in sequence (all three
surfaces audited unconditionally). F5 is the exit gate.

P1 Verifier auto-activates on this chain — findings in auth.ts, middleware.ts,
schema.ts, or .env files trigger boundary/concurrency probes regardless of files_changed count.

---

## F0 — Threat Model
**Skill:** `pragmatic-engineer-em`
**Idempotency:** Artifact `f0-threat-model` Complete → skip + read, advance to F1.

**Constraint:** Advisory only. Zero code output. No implementation details.

Map every trust boundary in the active stack using STRIDE per boundary:
(Spoofing/Tampering/Repudiation/Info Disclosure/DoS/Elevation)

Trust boundaries to enumerate:
- Browser → Edge Middleware (auth gate — spoofing, elevation)
- Edge Middleware → Server Components (tampering, info disclosure)
- Server Components → Drizzle/Postgres (injection, info disclosure)
- Client Components → tRPC procedures (elevation, tampering)
- Client Components → Server Actions (CSRF, tampering, elevation)
- CI/CD pipeline → Vercel deploy (secrets, supply chain)

Produce:
- STRIDE table per boundary: threat actor, attack vector, control, risk rating (High/Med/Low)
- Priority order: rank boundaries by residual risk after current controls
- Step routing recommendation: which of F1–F4 addresses each High/Med finding
- `[Verify]`: every boundary named, no theoretical threat without a concrete attack vector

**Boxed Risk Summary required** before F1 proceeds.

Generate **Implementation Plan Artifact: `f0-threat-model`** before F1.

---

## F1 — Secrets & Dependency Audit
**Skill:** `theo-browne-fullstack-advisor`
**Idempotency:** Artifact `f1-secrets-audit` Complete → skip + read, advance to F2.

Read Artifact `f0-threat-model` — honor all Constraints Forward.

**Env var exposure:**
- Enumerate all `NEXT_PUBLIC_` prefixed vars — flag any that expose API keys,
  service URLs, or identifiers that reveal infrastructure topology
- Verify `@t3-oss/env-nextjs` is installed and all env vars validated with Zod
  at build time — unvalidated env = runtime crash in production, not build time
- Check `.gitignore` explicitly excludes: `.env`, `.env.local`, `.env.production`
- Check for hardcoded secrets in source: API keys, connection strings, tokens
  in `*.ts`, `*.tsx`, config files — run: `git log --all -S "sk-" --oneline`
- **Github Hardening**: Reference @.agents/skills/github/git-commit/SKILL.md for commit safety and secret scanning.

**Dependency audit:**
- `pnpm audit` or `npm audit --audit-level=high` — flag Critical and High CVEs
- Typosquatting: verify top 10 deps match expected npm registry names
- Lockfile: `pnpm install --frozen-lockfile` passes in CI
- No `postinstall` scripts in direct deps executing arbitrary code

**T3 env validation pattern (enforce if missing):**
```ts
// env.mjs — required
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(32),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    // NEVER expose: DATABASE_URL, AUTH_SECRET via NEXT_PUBLIC_
  },
  runtimeEnv: process.env,
});
```

`[Verify]`: `pnpm build` fails if any env var is missing or malformed.
Zero High/Critical CVEs unresolved. No `.env*` files in git history.

Generate **Task List Artifact: `f1-secrets-audit`** before F2.

---

## F2 — Auth & Session Hardening
**Skill:** `rauchg-tech-lead-architect`
**Idempotency:** Artifact `f2-auth-hardening` Complete → skip + read, advance to F3.

Read Artifacts `f0-threat-model` + `f1-secrets-audit` — honor all Constraints Forward.

**Edge middleware coverage:**
- Verify `middleware.ts` intercepts ALL protected routes — no reliance on
  per-page auth checks alone (can be bypassed by direct navigation in RSC)
- Matcher config must be explicit — `matcher: ['/((?!_next|api/public).*)']`
- Auth check must happen at edge before any Server Component data fetch executes

**Session security:**
- Expiry: 24h standard, 1h elevated privilege; rotate on privilege change
- HttpOnly + Secure + SameSite=Lax minimum — Strict for admin routes
- Better Auth: `secret` >= 32 chars from env; Clerk: `clerkMiddleware()` outermost
- Reference @.agents/skills/better-auth/better-auth-best-practices/SKILL.md and @.agents/skills/clerk/clerk-nextjs-patterns/SKILL.md for library-specific hardening.

**CSRF protection:**
- Server Actions: Next.js 14+ enforces origin checking natively — verify not disabled
- tRPC mutations: verify `createTRPCContext` validates `Origin` header against allowlist
- Custom API routes: double-submit cookie pattern or `csurf` middleware

**Rate limiting (auth routes only — Upstash Redis or Vercel KV):**
```ts
// Rate limit login attempts: 5 per minute per IP
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
});
```
Apply to: `/api/auth/signin`, `/api/auth/callback`, password reset.

**OAuth hardening:**
- `redirectTo` validated against explicit allowlist (no open redirects)
- State parameter verified before OAuth callback

`[Verify]`: unauthenticated GET to any protected route returns 401/redirect.
CSRF test: cross-origin POST to a Server Action returns 403.

Generate **Implementation Plan Artifact: `f2-auth-hardening`** before F3.

---

## F3 — Data Boundary Audit
**Skill:** `react-core-lead`
**Idempotency:** Artifact `f3-data-boundary` Complete → skip + read, advance to F4.

Read Artifacts `f0-threat-model` + `f2-auth-hardening` — honor all Constraints Forward.

**Server Component serialization (info disclosure):**
- Audit every `async` Server Component fetching from DB: are raw Drizzle model
  objects passed as props to Client Components? Flag: `{ ...user }` where user
  includes `hashedPassword`, `totpSecret`, `internalRole`, or any field not
  needed by the client
- Enforce explicit DTO projection: `select({ id: users.id, name: users.name })`
  rather than `select()` — never serialize entire DB rows to client

**tRPC authorization:**
- Every procedure has `.input(z.object({...}))` — no unvalidated procedures
- Check: admin procedures have explicit role check beyond `session` existence
- Reference @.agents/skills/claude-mpm-skills/trpc-type-safety/SKILL.md for type inference and validation patterns.

**Server Actions input validation:**
```ts
// Required pattern — enforce on every action
"use server"
export async function updateProfile(input: unknown) {
  const parsed = UpdateProfileSchema.safeParse(input);
  if (!parsed.success) throw new Error("Invalid input");
  // Never: export async function updateProfile(formData: FormData) { ... } without validation
}
```

**XSS surfaces:**
- Audit all `dangerouslySetInnerHTML` usage — flag any without `DOMPurify.sanitize()`
- Check `next/head` for unsanitized user content in `<title>` or `<meta>`
- Markdown: `rehype-sanitize` applied before `dangerouslySetInnerHTML`

**Drizzle injection:**
- Flag all `sql\`...\`` tagged template literals with string interpolation — must use
  parameterized placeholders: `sql\`WHERE id = ${userId}\`` (safe) vs
  `sql\`WHERE id = '${userId}'\`` (injection)
- Reference @.agents/skills/claude-mpm-skills/drizzle-orm/SKILL.md and @.agents/skills/everything-claude-code/postgres-patterns/SKILL.md for secure data access.

`[Verify]`: grep for `dangerouslySetInnerHTML` returns zero unsanitized instances.
Every tRPC procedure has `.input()` call. No raw DB row serialized to client.

Generate **Implementation Plan Artifact: `f3-data-boundary`** before F4.

---

## F4 — Security Test Coverage
**Skill:** `kent-dodds-quality-lead`
**Idempotency:** Artifact `f4-security-tests` Complete → skip + read, advance to F5.

Read Artifacts `f2-auth-hardening` + `f3-data-boundary` — honor all Constraints Forward.

Produce integration test suite covering the four mandatory security test categories:

**1. Unauthenticated access (auth bypass):**
```ts
test("protected route rejects unauthenticated request", async () => {
  const response = await fetch("/dashboard", { redirect: "manual" });
  expect(response.status).toBe(307); // redirect to /login
});
```

**2. IDOR (Insecure Direct Object Reference):**
```ts
test("user cannot access another user's resource", async () => {
  const { user: alice } = await createTestUser();
  const { user: bob } = await createTestUser();
  const aliceResource = await createResource({ ownerId: alice.id });
  // Bob attempts to access Alice's resource
  const caller = createCaller({ session: { user: bob } });
  await expect(caller.resource.get({ id: aliceResource.id }))
    .rejects.toThrow(/unauthorized/i);
});
```

**3. Input boundary / injection:**
```ts
const maliciousInputs = [
  "<script>alert(1)</script>",
  "'; DROP TABLE users; --",
  "../../../etc/passwd",
  "a".repeat(10001), // exceeds max length
];
test.each(maliciousInputs)("input %s is rejected or sanitized", async (input) => {
  // Must either throw validation error OR return sanitized output — never echo raw
});
```

**4. Auth-gated component rendering (RTL):**
```ts
test("sensitive data does not render for unauthenticated user", () => {
  render(<ProfilePage session={null} />);
  expect(screen.queryByText(/account number/i)).not.toBeInTheDocument();
  expect(screen.queryByTestId("sensitive-data")).not.toBeInTheDocument();
});
```

`[Verify]`: all four categories pass. Use `getByRole` (not `getByTestId`) for security-sensitive elements.

Generate **Task List Artifact: `f4-security-tests`** before F5.

---

## F5 — Hardening Gate
**Skill:** `rauchg-tech-lead-architect`
**Idempotency:** If Artifact `f5-hardening-gate` exists and Status = Complete → chain already complete, report results.

Read all F-chain Artifacts. F5 blocks until F1–F4 have zero unresolved High findings.

**Security headers (enforce in `next.config.js`):**
```js
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",  // tighten to nonce-based if possible
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.clerk.dev",
    ].join("; ")
  },
];
```

**OWASP Top 10 final checklist against this stack:**
- [ ] A01 Broken Access Control — F2 middleware coverage + F4 IDOR tests
- [ ] A02 Cryptographic Failures — F1 secrets audit, HTTPS enforced via HSTS
- [ ] A03 Injection — F3 Drizzle parameterization + F4 input boundary tests
- [ ] A04 Insecure Design — F0 threat model addressed
- [ ] A05 Security Misconfiguration — F5 headers + F1 env validation
- [ ] A06 Vulnerable Components — F1 npm audit, zero unresolved High CVEs
- [ ] A07 Auth Failures — F2 session hardening + F4 auth bypass tests
- [ ] A08 Data Integrity Failures — F1 lockfile integrity, F2 CSRF
- [ ] A09 Logging — no tokens/passwords logged
- [ ] A10 SSRF — user-supplied URLs validated against allowlist before fetch
- [ ] **Sentry Monitoring**: Reference @.agents/skills/sentry-for-ai/sentry-nextjs-sdk/SKILL.md for production error tracking and performance profiling.

`[Verify]`: `curl -I <prod-url>` returns all 7 headers. Lighthouse security >=95. OWASP checklist complete.

Generate **Task List Artifact: `f5-hardening-gate`**.

Chain complete. Final output: OWASP checklist pass/fail, ordered finding log from f0–f4, header verification command.
