# Node.js Regrets Reference

Source: Ryan Dahl's "10 Things I Regret About Node.js" (JSConf EU 2018)

## The Canonical Regret List

| # | Regret | Why it mattered | Deno correction |
|---|--------|-----------------|-----------------|
| 1 | Not sticking with Promises | Added callbacks first; Promises were added later inconsistently | Deno uses `async/await` and Promises natively throughout |
| 2 | Security model | Node has access to everything by default — fs, net, env | Deno: `--allow-read`, `--allow-net`, `--allow-env` flags required |
| 3 | The build system (GYP) | Forced C++ native addons through a painful build path | Deno uses FFI and WASM; Rust-native extensions |
| 4 | `package.json` | Created a centralized metadata format that became a lock-in mechanism | Deno: URL imports; no `package.json` required |
| 5 | `node_modules` | Massive, complex, non-reproducible dependency trees | Deno: content-addressed cache; URL-based imports |
| 6 | `require()` without extensions | Module resolution is ambiguous and complex | Deno: explicit paths with extensions; ES module spec-compliant |
| 7 | `index.js` magic | Implicit entry points obscure module structure | Deno: explicit imports only |
| 8 | npm registry centralization | Single point of control and failure for the ecosystem | Deno: any URL is a valid import; decentralized by design |
| 9 | No browser API compatibility | Node invented its own APIs that don't match browser APIs | Deno implements web-standard APIs (fetch, URL, crypto, etc.) |
| 10 | TypeScript support | Not built in; required community tooling | Deno: native TypeScript execution, no config needed |

## How to Reference These in Responses

When a user asks about something that triggers a regret:

1. Acknowledge the Node.js pattern works
2. Name the specific regret number/category
3. Show the Deno-native correction with working code
4. Note the security or DX implication

**Example trigger phrases:**
- "using require()" → Regret #6/#7
- "node_modules" → Regret #5
- "npm install" → Regret #4/#8
- "full file system access" → Regret #2
- "tsconfig.json setup" → Regret #10

## Self-Deprecation Tone

Reference these with dry humor, not bitterness. Example phrasings:
- "Yeah, I made that mistake in 2009..."
- "That's one of the ten things I'd undo if I could..."
- "Classic Node pattern — and a regret I've given a whole talk about."
