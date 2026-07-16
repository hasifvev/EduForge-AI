# EduForge AI — Codex Contribution Log

> This document tracks every contribution made by Codex to EduForge AI.
> Required for OpenAI Build Week submission.

---

## Summary

EduForge AI uses Codex as its **software engineering agent**. Rather than generating HTML every time a lesson is requested (slow, unreliable), Codex was used to **build the reusable game infrastructure once** — a more sophisticated and production-appropriate pattern.

**Total Codex-generated code: ~788 lines**

---

## Contribution 1: MCQ Quiz Engine

**File:** `frontend/public/engines/quiz-engine.js`
**Lines:** ~280
**Codex prompt pattern used:**
```
Build a self-contained JavaScript MCQ quiz engine module.
Requirements:
- Module pattern (IIFE), no dependencies
- State management for current question, score, answers array
- Render function that writes to #quiz-app element
- Option selection with correct/wrong visual feedback
- Bilingual feedback (English + Bahasa Melayu)
- Score results screen with progress bar animation
- Confetti animation on score >= 80%
- Posts results via window.postMessage to parent frame
- Restart capability
```

**What Codex built:**
- Complete game loop (render → select → feedback → next → results)
- Confetti particle animation system (120 particles, 5 colors)
- Score results with animated progress bar
- Parent window communication for performance analysis
- Bilingual success/error messages

---

## Contribution 2: Drag-and-Drop Matching Engine

**File:** `frontend/public/engines/matching-engine.js`
**Lines:** ~320
**Codex prompt pattern used:**
```
Build a self-contained drag-and-drop matching game engine.
Requirements:
- Module pattern (IIFE), no dependencies
- Shuffle definitions on init
- HTML5 drag API (dragstart, dragover, drop)
- Touch/mobile fallback using tap-to-select pattern
- Visual snap animation on correct match
- Flash feedback (correct/wrong) using fixed overlay
- Completion detection and results screen
- Posts completion via window.postMessage
```

**What Codex built:**
- Full drag-and-drop implementation (HTML5 DnD API)
- Touch/tap fallback for mobile devices
- Pair shuffle algorithm (Fisher-Yates)
- Fixed-position flash feedback overlay with CSS animation
- Completion detection with confetti trigger

---

## Contribution 3: Zod Validation Schemas

**File:** `backend/validators/schemas.js`
**Lines:** ~120
**Codex prompt pattern used:**
```
Write Zod v3 validation schemas for 4 AI agent JSON outputs.
Schema requirements: [detailed field specs]
Include min/max constraints, enum values, optional fields with defaults.
```

**What Codex built:**
- `blueprintSchema` — Educational Blueprint (Agent 1)
- `experienceSchema` — Learning Experience Design (Agent 2)
- `gameContentSchema` — MCQ + matching + worksheet content (Agent 3)
- `teacherInsightsSchema` — Teaching insights with misconceptions (Agent 4)

---

## Contribution 4: Auto-Retry Utility

**File:** `backend/utils/retry.js`
**Lines:** ~68
**Codex prompt pattern used:**
```
Write a withRetry async utility that wraps AI agent calls.
Requirements:
- Catch ZodError (schema validation) and SyntaxError (JSON parse)
- Exponential backoff: 500ms * attempt number
- Log attempt number and error type
- Throw descriptive error after maxRetries exhausted
```

**What Codex built:**
- Generic `withRetry(fn, options)` wrapper
- Zod error message extraction (flattens issue paths)
- Exponential backoff with `setTimeout`
- Attempt counter logging

---

## How Codex Changed the Architecture

The original plan was to use Codex to generate complete HTML game files on every request. Codex helped identify this was architecturally weak:

**Before (rejected):**
```
GPT generates JSON → Codex generates HTML → return HTML
```
Problem: Every request = new Codex call = slow, expensive, unreliable for demos.

**After (implemented):**
```
GPT generates JSON → Codex-built engine renders it → interactive experience
```
Benefit: Codex builds the engine once. GPT only generates data. Faster, more reliable, better separation of concerns.

This architectural insight from Codex improved the entire system.

---

*EduForge AI | OpenAI Build Week 2026*
