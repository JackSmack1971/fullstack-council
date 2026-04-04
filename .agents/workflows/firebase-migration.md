---
description: [Firebase Migration Workflow — Studio to Antigravity]
---

# Firebase Migration Workflow (Native Pathways)

Follow these steps to migrate a project from Firebase Studio to the Google Antigravity ecosystem.

## Pathway A: GUI Migration (Recommended)

1. **In Firebase Studio**: Click the **"Move now"** button.
2. **Export**: Select **"Zip and Download"** (or use the Command Palette: `Firebase Studio: Zip & Download`).
3. **Local Setup**: Extract the folder locally on your workstation.
4. **Launch**: Open the project folder in **Google Antigravity Editor**.
5. **Convert**: In the Agent Pane, call **`@fbs-to-agy-export`** (use Gemini Flash model for high throughput).
6. **Deploy**: Prompt the agent to **"publish my app"**. This triggers the `firebase deploy` sequence.

---

## Pathway B: CLI Migration (Developer Path)

1. **Before Launch**: Open your terminal.
2. **Execute**: Run `npx firebase-tools@latest studio:export` or `firebase studio:export <path>`.
3. **Open**: Launch the project folder in Google Antigravity.
4. **Audit**: Call `/doc-rot-audit` to ensure the migration is synced with the new environment.

---

## Technical Guardrails

- **Runtime**: Ensure Node.js 18+ for the Firebase CLI.
- **Strict Mode**: If the migration requires fetching external assets, ensure the target URLs are in the **Allowlist** (`GEMINI.md`).
- **Auth**: Re-verify `NEXT_PUBLIC_` variables if using Firebase Auth.
