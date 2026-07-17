# EduForge AI 🎓

> **The AI Teaching Operating System** — Any teacher, any subject, any country.
> Built for OpenAI Build Week 2026 🏆

[![OpenAI Build Week](https://img.shields.io/badge/OpenAI-Build%20Week%202026-412991?style=flat-square)](https://openai.devpost.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Demo Mode](https://img.shields.io/badge/Demo-No%20API%20Key%20Required-22c55e?style=flat-square)](#demo-mode)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Try%20EduForge%20AI-2563eb?style=flat-square)](https://edu-forge-ai-weld.vercel.app)

**Live demo:** [edu-forge-ai-weld.vercel.app](https://edu-forge-ai-weld.vercel.app)

---

## The Problem

Teachers worldwide spend **2–3 hours per lesson** manually creating quizzes, worksheets, and activities. That's time stolen from actual teaching.

EduForge AI gives it back — **in under 60 seconds**.

---

## The Solution

A **5-agent AI pipeline** that thinks like a master teacher:

```
Teacher describes lesson topic
        ↓
🧠 Agent 1 — Curriculum Intelligence
   Analyses objectives, detects misconceptions, aligns to curriculum
        ↓
🎨 Agent 2 — Experience Designer
   Chooses optimal learning strategy (quiz-first vs. matching-first)
   Explains pedagogical reasoning with confidence score
        ↓
✏️ Agent 3 — Content Generator
   Creates questions, matching pairs, worksheet items
   Calibrated to student persona (Beginner → Gifted & Talented)
        ↓
💡 Agent 4 — Teacher Assistant
   Teaching tips, real-life examples, intervention strategy
   Differentiation notes, time estimates
        ↓
⭐ Agent 5 — Lesson Evaluator (NEW)
   AI reviews its own work — Bloom's Taxonomy scoring
   Returns A/B/C/D grade + improvement suggestion
        ↓
Teacher gets 6 classroom-ready resources in one click
```

---

## What You Get

| Resource | Description |
|----------|-------------|
| 🎯 **Interactive MCQ Quiz** | 8–10 multiple-choice questions with instant feedback |
| 🧩 **Drag-and-Drop Matching** | Vocabulary/concept matching game with touch support |
| 📄 **Printable Worksheet** | Fill-in-the-blank activity, classroom-ready |
| 🔑 **Answer Key** | Complete answers for teacher use |
| 💡 **AI Teaching Insights** | Misconceptions, tips, examples, intervention strategy |
| ⭐ **Lesson Quality Score** | Bloom's-aligned self-evaluation (Agent 5) |

---

## Global Support

EduForge AI works for **any teacher, anywhere in the world**:

| Country | Curriculum |
|---------|-----------|
| 🇲🇾 Malaysia | KSSR / KSSM |
| 🇺🇸 United States | Common Core |
| 🇬🇧 United Kingdom | National Curriculum (KS1–KS5) |
| 🇦🇺 Australia | Australian Curriculum |
| 🇸🇬 Singapore | MOE Singapore |
| 🇮🇳 India | CBSE / ICSE |
| 🌍 International | IB / Cambridge |

**Student Personas:** Beginner · Mixed Ability · On-Level · Gifted & Talented · SEN Support

**Languages:** English · Bahasa Melayu · Mandarin · French · Spanish · Arabic · Tamil · Hindi

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + Vite | UI framework |
| Styling | Vanilla CSS | Design system |
| Backend | Node.js + Express | API server |
| AI Provider | Groq (free tier) | Llama 3.3 70B as GPT-5.6 |
| Validation | Zod | Schema validation for all 5 agents |
| File Upload | multer + pdf-parse | PDF/TXT lesson extraction |

---

## Quick Start

### Option A — Demo Mode (No API Key Needed)

```bash
git clone https://github.com/your-username/EduForge-AI.git
cd EduForge-AI

# Backend
cd backend && npm install && node server.js

# Frontend (new terminal)
cd frontend && npm install && npm run dev

# Open http://localhost:5173
# DEMO_MODE is on by default — no API key needed!
```

### Option B — Live Mode (Free Groq API)

```bash
# 1. Get a free API key at https://console.groq.com
# 2. Copy the example env file
cp .env.example .env

# 3. Edit .env and add your key:
GROQ_API_KEY=gsk_your_key_here
DEMO_MODE=false

# 4. Start both servers (same as above)
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DEMO_MODE` | `true` | Set `false` to use live AI |
| `GROQ_API_KEY` | — | Free key from [console.groq.com](https://console.groq.com) |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | Model to use (see Groq docs) |
| `PORT` | `3001` | Backend server port |
| `FRONTEND_URL` | `http://localhost:5173` | CORS allowed origin |

---

## Demo Mode

EduForge AI ships with **3 pre-built demo scenarios** — no API key required:

| Demo | Subject | Country | Curriculum |
|------|---------|---------|-----------|
| Universal | States of Matter (Science, Grade 5) | USA | Common Core |
| Malaysia | Keadaan Jirim (Sains, Tahun 4) | Malaysia | KSSR |
| UK | The Norman Conquest (History, Year 8) | UK | KS3 |

Demo is automatically selected based on country chip selection.

---

## API Reference

See [`docs/api.md`](docs/api.md) for full endpoint documentation.

**Quick Reference:**

```
GET  /api/health         — Server status + mode
POST /api/generate       — Main generation endpoint (5-agent pipeline)
POST /api/extract        — Extract text from uploaded PDF/TXT
POST /api/analyze-performance — Analyze quiz results
```

---

## Project Structure

```
EduForge-AI/
├── backend/
│   ├── agents/
│   │   ├── curriculumIntelligence.js  # Agent 1 — Blueprint
│   │   ├── experienceDesigner.js      # Agent 2 — Strategy
│   │   ├── contentGenerator.js        # Agent 3 — Content
│   │   ├── teacherAssistant.js        # Agent 4 — Insights
│   │   └── lessonEvaluator.js         # Agent 5 — Quality Score
│   ├── demo/
│   │   └── demoCache.js               # 3 pre-built demo scenarios
│   ├── utils/
│   │   ├── retry.js                   # Exponential backoff retry
│   │   ├── fileParser.js              # PDF/TXT extraction
│   │   └── worksheetBuilder.js        # HTML worksheet generator
│   ├── validators/
│   │   └── schemas.js                 # Zod schemas for all 5 agents
│   ├── openai.js                      # Groq API client
│   └── server.js                      # Express API server
├── frontend/
│   ├── public/
│   │   └── engines/
│   │       ├── quiz-engine.js         # Self-contained MCQ game
│   │       └── matching-engine.js     # Drag-and-drop matching game
│   └── src/
│       ├── components/
│       │   ├── AIRationale.jsx        # Pedagogical reasoning panel
│       │   ├── LessonQualityScore.jsx # Agent 5 score display
│       │   ├── TeachingInsights.jsx   # Accordion insights panel
│       │   ├── GenerationProgress.jsx # 5-agent progress screen
│       │   ├── GamePreview.jsx        # Game modal wrapper
│       │   └── FileUploadZone.jsx     # Drag-drop file upload
│       ├── pages/
│       │   ├── Home.jsx               # Main form with country/persona
│       │   └── Dashboard.jsx          # Results + Magic Moment reveal
│       ├── hooks/
│       │   └── useGeneration.js       # API call + 5-step progress
│       ├── context/
│       │   └── LanguageContext.jsx    # EN/BM language switcher
│       └── i18n/
│           └── translations.js        # EN + BM full translations
└── docs/
    ├── architecture.md                # System design + data flow
    ├── api.md                         # API endpoint reference
    ├── agents.md                      # Each agent's prompt + output spec
    └── codex-log.md                   # Codex contribution log
```

---

## Documentation

| Doc | Description |
|-----|-------------|
| [Architecture](docs/architecture.md) | System design, data flow, agent pipeline diagram |
| [API Reference](docs/api.md) | All endpoints, request/response schemas |
| [Agent Guide](docs/agents.md) | Each agent's role, prompt design, output spec |
| [Codex Log](docs/codex-log.md) | Game engines and infrastructure built by Codex |

---

## Hackathon Context

**Event:** OpenAI Build Week 2026 — Education Track
**Deadline:** July 21, 2026
**Key Innovation:** AI self-evaluation (Agent 5 reviews Agents 1–4's work)

---

*EduForge AI — Built with GPT-5.6 + Codex · OpenAI Build Week 2026 · For teachers worldwide*
