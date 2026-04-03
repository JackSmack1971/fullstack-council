# AI-Infused App Stack Reference

> Load when user asks about AI features, v0, Vercel AI SDK, LLM routing,
> RAG architecture, streaming AI UI, or AI-accelerated development.

## Table of Contents
1. [AI Architecture Principles](#1-ai-architecture-principles)
2. [Vercel AI SDK — Core Patterns](#2-vercel-ai-sdk--core-patterns)
3. [Streaming AI UI](#3-streaming-ai-ui)
4. [RAG Architecture](#4-rag-architecture)
5. [LLM Routing & Model Selection](#5-llm-routing--model-selection)
6. [v0 Integration Workflow](#6-v0-integration-workflow)
7. [AI Feature Checklist](#7-ai-feature-checklist)

---

## 1. AI Architecture Principles

> "AI accelerates implementation. Humans own the architecture."

- **AI generates boilerplate; engineers own the seams.** Use v0 + Copilot for
  UI scaffolding. Own the data layer, auth, and edge logic yourself.
- **Streaming is non-negotiable.** No user waits for a full LLM response.
  Use streaming RSC or streaming Route Handlers.
- **Ground AI in solid infra.** Every AI feature needs: rate limiting, error
  boundaries, cost monitoring, and a fallback path.
- **Edge runtime for AI streams.** Lower TTFB, global distribution, no cold start
  penalty at the inference boundary.

---

## 2. Vercel AI SDK — Core Patterns

### Install

```bash
pnpm add ai @ai-sdk/openai   # or @ai-sdk/anthropic, @ai-sdk/google
```

### Basic streaming Route Handler

```ts
// app/api/chat/route.ts
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai('gpt-4o'),
    messages,
    system: 'You are a helpful assistant.',
  })

  return result.toDataStreamResponse()
}
```

### Client — useChat hook

```tsx
// app/chat/page.tsx — Client Component
'use client'
import { useChat } from 'ai/react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
```

---

## 3. Streaming AI UI

### Server-sent streaming from Server Action

```tsx
// app/actions.ts
'use server'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createStreamableValue } from 'ai/rsc'

export async function generate(prompt: string) {
  const stream = createStreamableValue('')

  ;(async () => {
    const { textStream } = streamText({
      model: openai('gpt-4o-mini'),
      prompt,
    })
    for await (const delta of textStream) {
      stream.update(delta)
    }
    stream.done()
  })()

  return { output: stream.value }
}
```

**Rule:** Use `createStreamableValue` for Server Actions, `toDataStreamResponse`
for Route Handlers. Match the pattern to the surface.

---

## 4. RAG Architecture

```
User query
    │
    ▼
Embed query (text-embedding-3-small)
    │
    ▼
Vector search (Vercel KV + pgvector / Pinecone / Upstash)
    │
    ├── Top-k chunks retrieved
    │
    ▼
Augment prompt: system + retrieved context + user query
    │
    ▼
LLM (gpt-4o / claude-3-5-sonnet) — streaming edge response
    │
    ▼
Stream to client via useChat / RSC stream
```

### Minimal RAG Route Handler

```ts
import { streamText, embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import { vectorSearch } from '@/lib/vector'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { query } = await req.json()

  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: query,
  })

  const chunks = await vectorSearch(embedding, { topK: 5 })
  const context = chunks.map(c => c.content).join('\n\n')

  const result = await streamText({
    model: openai('gpt-4o'),
    system: `Answer using only this context:\n\n${context}`,
    prompt: query,
  })

  return result.toDataStreamResponse()
}
```

---

## 5. LLM Routing & Model Selection

| Use Case | Model | Rationale |
|---|---|---|
| Chat / general Q&A | gpt-4o-mini / claude-3-haiku | Fast, cheap, good enough |
| Complex reasoning | gpt-4o / claude-3-5-sonnet | Quality matters |
| Code generation | gpt-4o / claude-3-5-sonnet | Strong code bench |
| Embeddings | text-embedding-3-small | Cost-efficient, quality |
| Image understanding | gpt-4o | Native vision |
| Long context (>100k) | claude-3-5-sonnet | Best long context |

**Rule:** Default to the cheapest model that passes your quality eval.
Upgrade only when you have a measured quality gap.

### Multi-provider fallback

```ts
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'

const models = [openai('gpt-4o'), anthropic('claude-3-5-sonnet-20241022')]

// Use first model; fallback to second on error
async function withFallback(prompt: string) {
  for (const model of models) {
    try {
      return await generateText({ model, prompt })
    } catch {
      continue
    }
  }
  throw new Error('All models failed')
}
```

---

## 6. v0 Integration Workflow

v0 (v0.dev) generates Next.js + Tailwind + shadcn/ui components via prompt.

**Workflow:**
1. Describe the UI: "Build a metrics dashboard with 3 KPI cards and a line chart"
2. v0 generates the component tree
3. Copy component into `app/components/` — it's already shadcn/ui compatible
4. Replace mock data with real Server Component data fetching
5. Extract Client Component islands (`"use client"`) at the lowest node

**Rule:** Never use v0 output as-is for data layer, auth, or business logic.
Use it for UI scaffolding only. Own the integration.

---

## 7. AI Feature Checklist

```
Before shipping any AI feature:
- [ ] Streaming enabled — no blocking waits for full response
- [ ] Rate limiting on AI route (Vercel KV + sliding window)
- [ ] Error boundary wraps AI component — graceful fallback UI
- [ ] Cost monitoring via provider dashboard + alert at $X/day
- [ ] Input validation before sending to LLM (zod schema)
- [ ] No PII sent to LLM unless explicitly required + consented
- [ ] Model version pinned (not 'latest') for reproducibility
- [ ] Prompt stored in constants file — not inline string literals
- [ ] Response latency tracked in Vercel Analytics
- [ ] Fallback path if LLM is down (cached response or graceful message)
```
