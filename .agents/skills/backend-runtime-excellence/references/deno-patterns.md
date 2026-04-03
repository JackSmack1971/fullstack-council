# Deno-Native Patterns Reference

## Table of Contents
1. [Minimal Permission Server](#1-minimal-permission-server)
2. [URL Imports & Dependency Management](#2-url-imports--dependency-management)
3. [Secure File Operations](#3-secure-file-operations)
4. [Native TypeScript](#4-native-typescript)
5. [Standard Library Usage](#5-standard-library-usage)
6. [Environment Variables (Secure)](#6-environment-variables-secure)
7. [Testing Built-In](#7-testing-built-in)
8. [FFI vs Native Addons](#8-ffi-vs-native-addons)
9. [Node.js Compat Mode](#9-nodejs-compat-mode)
10. [Performance Baseline](#10-performance-baseline)

---

## 1. Minimal Permission Server

```typescript
// Run with: deno run --allow-net=0.0.0.0:8080 server.ts
// NOT: deno run --allow-all server.ts  ← never do this by default

Deno.serve({ port: 8080 }, (req: Request) => {
  return new Response("Hello from Deno", { status: 200 });
});
```

**Key:** `--allow-net=0.0.0.0:8080` scopes permission to one address. Node.js would have full network access without asking.

---

## 2. URL Imports & Dependency Management

```typescript
// Direct URL import — no npm install, no node_modules
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

// Or use import maps (deno.json)
// {
//   "imports": {
//     "std/http": "https://deno.land/std@0.224.0/http/"
//   }
// }
import { serve } from "std/http/server.ts";
```

**Key:** Pinned at version in the URL itself. Content-addressed. No package.json ceremony.

---

## 3. Secure File Operations

```typescript
// Run with: deno run --allow-read=/data file_reader.ts
// Scoped read permission — not full filesystem access

const data = await Deno.readTextFile("/data/config.json");
console.log(JSON.parse(data));
```

**Key:** If the script tries to read `/etc/passwd`, it throws a PermissionDenied error. Sandboxed by default.

---

## 4. Native TypeScript

```typescript
// No tsconfig.json. No tsc. No ts-node. Just run it.
// deno run main.ts

interface ServerConfig {
  port: number;
  host: string;
}

const config: ServerConfig = {
  port: parseInt(Deno.env.get("PORT") ?? "8080"),
  host: "0.0.0.0",
};
```

**Key:** TypeScript is a first-class Deno citizen. No transpile pipeline.

---

## 5. Standard Library Usage

```typescript
// deno.land/std is the curated, maintained standard library
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { delay } from "https://deno.land/std@0.224.0/async/delay.ts";
```

**Key:** Prefer std over third-party when possible. It's audited and web-standards-aligned.

---

## 6. Environment Variables (Secure)

```typescript
// Requires: deno run --allow-env=DATABASE_URL,PORT script.ts
// Scoped to specific variables — not all env vars

const dbUrl = Deno.env.get("DATABASE_URL");
if (!dbUrl) throw new Error("DATABASE_URL required");
```

---

## 7. Testing Built-In

```typescript
// No Jest, no Mocha — Deno.test is native
// Run: deno test

Deno.test("event loop handles concurrent requests", async () => {
  const responses = await Promise.all([
    fetch("http://localhost:8080"),
    fetch("http://localhost:8080"),
  ]);
  responses.forEach(r => assertEquals(r.status, 200));
});
```

---

## 8. FFI vs Native Addons

```typescript
// Instead of node-gyp C++ addons — use FFI (Foreign Function Interface)
// Requires: deno run --allow-ffi

const lib = Deno.dlopen("./libmylib.so", {
  compute: { parameters: ["i32"], result: "i32" },
});
console.log(lib.symbols.compute(42));
```

---

## 9. Node.js Compat Mode

```typescript
// When you MUST use a Node.js package:
// deno run --node-modules-dir npm:express server.ts
import express from "npm:express";

const app = express();
app.get("/", (_req, res) => res.send("compat mode"));
app.listen(3000);
```

**Key:** Use sparingly. Prefer native Deno APIs. Compat mode is an escape hatch, not a default.

---

## 10. Performance Baseline

When reasoning about performance, use these reference points:

- Deno's HTTP server: ~100k req/s on simple handlers (single core)
- Startup time: ~50ms cold (vs Node's ~100ms)
- Memory baseline: ~25MB (vs Node's ~35MB)
- V8 isolate overhead: negligible for most workloads
- Rust-backed I/O (Tokio): comparable to libuv for most patterns

**Quote to use:** "The performance characteristics are close enough that correctness and security should drive your runtime choice, not benchmarks."
