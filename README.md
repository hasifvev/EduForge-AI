# EduForge AI

> **AI Teaching Companion** — Transform any lesson into personalised interactive learning experiences.
> Built for OpenAI Build Week 2026 🏆

---

## The Problem

Malaysian teachers spend **120 minutes per week** manually creating worksheets, quizzes, and classroom activities.

## The Solution

EduForge AI uses **GPT-5.6** to understand pedagogy and **Codex** to build interactive learning applications — cutting preparation time by **99.3%**.

```
Teacher uploads lesson or types topic
              ↓
GPT-5.6: Curriculum Intelligence (understands Malaysian MOE standards)
              ↓
GPT-5.6: Learning Experience Designer (picks best activity strategy)
              ↓
GPT-5.6: Content Generator (creates questions, pairs, exercises)
              ↓
GPT-5.6: Teacher Assistant (misconceptions, tips, interventions)
              ↓
Codex-built engines render interactive quiz + matching game
              ↓
Teacher gets classroom-ready materials in 45 seconds
```

---

## GPT-5.6 Usage

EduForge AI uses a **4-agent GPT-5.6 pipeline**:

| Agent | Role | Output |
|-------|------|--------|
| Curriculum Intelligence | Analyses Malaysian KSSR/KSSM curriculum | Educational Blueprint JSON |
| Learning Experience Designer | Decides optimal activity strategy | Experience Design JSON |
| Content Generator | Creates questions, options, matching pairs | Game Content JSON |
| Teacher Assistant | Teaching tips, misconceptions, Malaysian examples | Teaching Insights JSON |

Each agent uses `response_format: { type: 'json_object' }` for reliable structured output, with **Zod validation + automatic retry** (up to 2 attempts) on schema failures.

---

## Codex Contributions

Codex acts as the **software engineering agent** of EduForge AI. It built the reusable game infrastructure that powers every lesson generated:

| File | What Codex Built | Lines |
|------|-----------------|-------|
| `frontend/public/engines/quiz-engine.js` | Full MCQ game loop, scoring, confetti animation, results to parent window | ~280 |
| `frontend/public/engines/matching-engine.js` | Drag-and-drop matching with touch support, snap animation, completion detection | ~320 |
| `backend/validators/schemas.js` | Zod validation schemas for all 4 agent outputs | ~120 |
| `backend/utils/retry.js` | Auto-retry with exponential backoff for JSON validation failures | ~68 |

**Runtime model:** GPT-5.6 generates content JSON → Codex-built engines render interactive experience. This is faster and more reliable than generating HTML every request.

---

## Features

- 📄 **Dual Input** — Upload PDF/TXT lesson material OR type a topic
- 🧠 **4-Agent AI Pipeline** — GPT-5.6 reasons about pedagogy at each step
- 🎮 **Interactive Games** — Codex-built MCQ quiz + drag-and-drop matching game
- 💡 **AI Teaching Companion** — Misconceptions, tips, Malaysian real-life examples
- 📥 **Downloadable** — Standalone HTML files work offline, no internet needed
- 🇲🇾 **Bilingual** — Full English + Bahasa Melayu Malaysia UI and content

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Vanilla CSS |
| Backend | Node.js + Express |
| File Upload | multer + pdf-parse |
| AI | OpenAI SDK (GPT-5.6) |
| Validation | Zod |

---

## Setup

```bash
# 1. Clone and enter project
cd EduForge-AI

# 2. Setup backend
cd backend
npm install
cp ../.env.example ../.env
# Edit .env and add your OPENAI_API_KEY

# 3. Setup frontend
cd ../frontend
npm install

# 4. Run both (in separate terminals)
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev

# Open: http://localhost:5173
```

---

## Demo Scenario

**Input:** Science, Year 4, Forms of Energy (Bahasa Melayu)

**Output in ~45 seconds:**
- ✓ Learning objectives aligned to KSSR
- ✓ 10-question interactive MCQ quiz
- ✓ 8-pair drag-and-drop matching game
- ✓ Printable worksheet + answer key
- ✓ AI teaching insights with Malaysian examples

---

## Architecture

See [`docs/architecture.md`](docs/architecture.md) for full system diagram.
See [`docs/codex-log.md`](docs/codex-log.md) for detailed Codex contribution log.

---

*EduForge AI | OpenAI Build Week 2026 | GPT-5.6 + Codex*
