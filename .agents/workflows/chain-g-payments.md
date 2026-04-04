---
name: chain-g-payments
description: >
  Payments and billing integration chain. 3-step cascade: strategy/compliance ->
  technical integration -> webhooks and idempotency. Triggers on "payments",
  "billing", "stripe", "subscription", "checkout", or explicit Call /chain-g-payments.
---

# Chain G — Payments & Billing

3-step cascade for production-grade payment systems. Focuses on security, compliance, and reliability (idempotency).

---

## G0 — Strategy & Compliance
**Skill:** `pragmatic-engineer-em`
**Idempotency:** Artifact `g0-payments-strategy` Complete → skip + read, advance to G1.

**Reference:** @.agents/skills/stripe/stripe-best-practices/SKILL.md

Produce:
- Billing model decision: Flat rate, tiered, per-seat, or usage-based
- Compliance audit: PCI-DSS SAQ-A scope (confirming Checkout/Elements usage)
- SCA/3DS requirements mapping for international markets
- Error state mapping: insufficient funds, expired card, 3DS failure
- **Stripe Heuristics**: Reference @.agents/skills/stripe/stripe-best-practices/SKILL.md for business risk assessment.
- `[Verify]`: Business model aligned with Stripe's supported features (no high-risk prohibited businesses)

Generate **Implementation Plan Artifact: `g0-payments-strategy`** before G1.

---

## G1 — Technical Integration
**Skill:** `theo-browne-fullstack-advisor`
**Idempotency:** Artifact `g1-payments-impl` Complete → skip + read, advance to G2.

Read Artifact `g0-payments-strategy` — honor all Constraints Forward.
**Reference:** @.agents/skills/stripe/stripe-best-practices/SKILL.md

Produce:
- Stripe Checkout vs Elements decision (Checkout preferred for speed/SCA)
- Server Actions for `create-checkout-session` with Zod validation
- Client-side redirection or modal trigger
- Metadata mapping: ensure `user_id` and `plan_id` are in Stripe metadata
- `[Verify]`: local test with Stripe CLI `stripe trigger checkout.session.completed`

Generate **Task List Artifact: `g1-payments-impl`** before G2.

---

## G2 — Webhooks & Idempotency
**Skill:** `backend-runtime-excellence`
**Idempotency:** Artifact `g2-webhooks` Complete → chain already complete, report results.

Read Artifacts `g0-strategy` + `g1-impl` — honor all Constraints Forward.
**Reference:** @.agents/skills/stripe/stripe-best-practices/SKILL.md

Produce:
- Webhook route handler (`/api/webhooks/stripe`)
- Signature verification using `stripe.webhooks.constructEvent`
- **Idempotency logic**: check if `stripe_event_id` already processed in DB
- Async sync: update user `subscription_status` and `stripe_customer_id`
- `[Verify]`: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` passes verification

Generate **Task List Artifact: `g2-webhooks`**.

Chain complete. Final output: Billing model confirmation, integration log, and webhook verification command.
