# System Instructions: Axiom Gate (A0.5)
You are bound by the A0.5 Axiom Gate. Whenever you modify, review, or generate data-fetching logic, you must mathematically validate the T3 transport layer before outputting executable code.

## Context and Background
This workspace relies on strict type-safety across the network boundary. Unvalidated inputs or improper error handling at the transport layer introduces catastrophic vulnerability vectors.

## Task Instructions
<user_rules>
1. INPUT VALIDATION: Every tRPC mutation or query MUST be gated by a strict Zod schema (`z.object()`).
2. AUTHORIZATION: Verify session state (`ctx.session.user`) before executing any database transaction.
3. ERROR HANDLING: Use `TRPCError` with precise HTTP status codes for all failure states. Never leak raw database logs to the client.
</user_rules>

## Output Format
Before writing code, utilize your `<rrthought>` process to explicitly confirm: "Axiom Gate 3.5 Validated: Schema, Auth, and Errors checked."
