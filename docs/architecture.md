# EduForge AI — System Architecture

> Full technical design of the 5-agent AI Teaching Operating System

---

## Overview

EduForge AI is a **multi-agent AI pipeline** where each agent has a single, well-defined responsibility. Agents run **sequentially** — each agent receives the output of all previous agents as context, building progressively richer understanding of the lesson.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         EDUFORGE AI PIPELINE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Teacher Input                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ subject · year · topic · country · curriculum · persona     │   │
│  │ language · objectives · uploaded file (optional)            │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │                                       │
│  ┌──────────────────────────▼──────────────────────────────────┐   │
│  │  🧠 AGENT 1 — Curriculum Intelligence                       │   │
│  │  Input:  teacher context                                     │   │
│  │  Output: Blueprint JSON                                      │   │
│  │          objectives · concepts · misconceptions · difficulty │   │
│  │          curriculum_alignment · confidenceLevel             │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │ Blueprint                             │
│  ┌──────────────────────────▼──────────────────────────────────┐   │
│  │  🎨 AGENT 2 — Experience Designer                           │   │
│  │  Input:  context + Blueprint                                 │   │
│  │  Output: Experience Design JSON                              │   │
│  │          primary_activity · rationale · confidence_score     │   │
│  │          difficulty_calibration · engagement_strategy        │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │ Blueprint + Design                    │
│  ┌──────────────────────────▼──────────────────────────────────┐   │
│  │  ✏️  AGENT 3 — Content Generator                            │   │
│  │  Input:  context + Blueprint + Design                        │   │
│  │  Output: Game Content JSON                                   │   │
│  │          quiz (10 MCQ) · matching (8 pairs) · worksheet      │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │ All above                             │
│  ┌──────────────────────────▼──────────────────────────────────┐   │
│  │  💡 AGENT 4 — Teacher Assistant                             │   │
│  │  Input:  context + Blueprint + Design                        │   │
│  │  Output: Teaching Insights JSON                              │   │
│  │          misconceptions · tips · examples · intervention     │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │ Everything                            │
│  ┌──────────────────────────▼──────────────────────────────────┐   │
│  │  ⭐ AGENT 5 — Lesson Evaluator (Self-Evaluation)            │   │
│  │  Input:  all outputs from Agents 1–4                         │   │
│  │  Output: Quality Score JSON                                  │   │
│  │          scores (4 dimensions) · grade · suggestion          │   │
│  │          blooms_levels_present · blooms_levels_missing        │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │                                       │
│  ┌──────────────────────────▼──────────────────────────────────┐   │
│  │  📦 RESPONSE ASSEMBLY                                        │   │
│  │  lesson · resources · teaching_insights                      │   │
│  │  lesson_evaluation · analytics                               │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │                                       │
│  Frontend Dashboard                                                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Analytics Bar → Resource Cards → AI Rationale               │   │
│  │ Lesson Quality Score → Teaching Insights Accordion          │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Agent Contracts

### Agent 1 — Curriculum Intelligence

**File:** `backend/agents/curriculumIntelligence.js`

**Responsibility:** Understand what this lesson should teach and how it fits the curriculum.

**Input Context:**
```json
{
  "subject": "Science",
  "year": "Grade 5",
  "topic": "States of Matter",
  "country": "United States",
  "curriculumStandard": "Common Core",
  "studentPersona": "On-Level",
  "language": "English",
  "objectives": "...",
  "extractedText": "..."
}
```

**Output Schema (Zod `blueprintSchema`):**
```json
{
  "objectives": ["string × 4–7"],
  "key_concepts": ["string × 1–10"],
  "misconceptions": ["string × 1–6"],
  "difficulty": "beginner | intermediate | advanced",
  "summary": "string",
  "prerequisite_knowledge": ["string"],
  "real_world_connections": ["string"],
  "curriculum_alignment": "string",
  "curriculum_source": "string",
  "confidenceLevel": "high | inferred | general",
  "persona_notes": "string"
}
```

**Confidence Levels:**
- `high` — country + curriculum explicitly matched in training data
- `inferred` — reasonable inference from context (e.g., "Year 8 UK" → KS3)
- `general` — unknown country, fell back to international pedagogical framework

---

### Agent 2 — Experience Designer

**File:** `backend/agents/experienceDesigner.js`

**Responsibility:** Decide the optimal learning strategy — which activity type goes first and why.

**Output Schema (Zod `experienceSchema`):**
```json
{
  "primary_activity": "quiz | matching",
  "secondary_activity": "quiz | matching",
  "why_primary_activity": "string",
  "why_quiz": "string",
  "why_matching": "string",
  "rationale": "string",
  "quiz_focus": "string",
  "matching_focus": "string",
  "difficulty_calibration": "string",
  "engagement_strategy": "string",
  "confidence_score": 0–100
}
```

**Decision Logic:**
- If topic is **vocabulary-heavy** → matching first (builds mental model before assessment)
- If topic is **application-heavy** → quiz first (tests understanding immediately)
- Persona `Beginner` → matching first (always), simpler distractors
- Persona `Gifted` → quiz first, harder distractors, evaluation-level questions

---

### Agent 3 — Content Generator

**File:** `backend/agents/contentGenerator.js`

**Responsibility:** Write every question, option, pair, and worksheet item.

**Output Schema (Zod `gameContentSchema`):**
```json
{
  "quiz": {
    "type": "mcq",
    "title": "string",
    "questions": [
      {
        "id": 1,
        "question": "string",
        "options": ["A.", "B.", "C.", "D."],
        "correct": "string",
        "explanation": "string"
      }
    ]
  },
  "matching": {
    "type": "drag_drop",
    "title": "string",
    "instruction": "string",
    "pairs": [{ "id": 1, "term": "string", "definition": "string" }]
  },
  "worksheet": {
    "title": "string",
    "instructions": "string",
    "items": [{ "id": 1, "question": "string", "answer": "string", "hint": "string" }]
  }
}
```

**Persona Calibration:**
| Persona | Questions | Distractor Style | Bloom's Level Target |
|---------|-----------|-----------------|---------------------|
| Beginner | 8 | Very different from correct | Remember / Understand |
| Mixed Ability | 10 | Moderate similarity | Understand / Apply |
| On-Level | 10 | Plausible alternatives | Apply / Analyse |
| Gifted & Talented | 12 | Subtle, near-correct | Analyse / Evaluate |
| SEN Support | 6 | Visually distinct, simple | Remember |

---

### Agent 4 — Teacher Assistant

**File:** `backend/agents/teacherAssistant.js`

**Responsibility:** Give the teacher everything they need to actually teach the lesson well.

**Output Schema (Zod `teacherInsightsSchema`):**
```json
{
  "misconceptions": [
    {
      "mistake": "string",
      "correction": "string",
      "example": "string"
    }
  ],
  "teaching_tips": ["string × 1–6"],
  "daily_examples": ["string × 1–5"],
  "intervention_strategy": "string",
  "extension_activity": "string",
  "estimated_class_difficulty": "easy | moderate | challenging",
  "time_estimate_minutes": 45,
  "differentiation_note": "string"
}
```

---

### Agent 5 — Lesson Evaluator

**File:** `backend/agents/lessonEvaluator.js`

**Responsibility:** Review the complete lesson package (Agents 1–4's work) and score its quality.

**This is the AI self-evaluation agent** — Agent 5 audits the work of Agents 1–4 using Bloom's Taxonomy as the framework.

**Bloom's Taxonomy Levels Checked:**
1. Remember — Can students recall key facts?
2. Understand — Do questions test comprehension?
3. Apply — Are there real-world application scenarios?
4. Analyse — Does content require comparison or breakdown?
5. Evaluate — Are students asked to judge or critique?
6. Create — Is there a synthesis or design task?

**Output Schema (Zod `evaluatorSchema`):**
```json
{
  "scores": {
    "learning_coverage": 0–100,
    "student_engagement": 0–100,
    "difficulty_balance": 0–100,
    "blooms_taxonomy": 0–100
  },
  "overall_score": 0–100,
  "grade": "A | B | C | D",
  "strengths": ["string × 1–5"],
  "weaknesses": ["string × 0–4"],
  "suggestion": "string",
  "blooms_levels_present": ["Remember", "Understand", ...],
  "blooms_levels_missing": ["Evaluate", "Create"]
}
```

**Grade Thresholds:**
| Grade | Score | Meaning |
|-------|-------|---------|
| A | 85–100 | Excellent — ready to use |
| B | 70–84 | Good — minor improvements possible |
| C | 55–69 | Adequate — review suggestion before use |
| D | 0–54 | Needs revision — follow AI suggestion |

---

## Data Flow

```
POST /api/generate
  │
  ├─ Validate input fields
  ├─ Upload file → extractFileText() (if file provided)
  │
  ├─ runCurriculumIntelligence(context)       → blueprint
  ├─ runExperienceDesigner({...context, blueprint}) → experienceDesign
  ├─ runContentGenerator({...context, blueprint, experienceDesign}) → gameContent
  │
  ├─ [PARALLEL]
  │   ├─ runTeacherAssistant({...context, blueprint, experienceDesign}) → teachingInsights
  │   └─ buildWorksheet({blueprint, gameContent, ...}) → worksheetHTML
  │
  ├─ runLessonEvaluator({subject, year, topic, language, studentPersona,
  │                       blueprint, gameContent, teachingInsights}) → lessonEvaluation
  │
  └─ Assemble response:
      {
        generation_id, model, created_at, status,
        subject, year, topic, country, language, studentPersona,
        lesson: { ...blueprint, experience_design },
        resources: { quiz, matching, worksheet, answer_key },
        teaching_insights,
        lesson_evaluation,
        analytics: { generation_time_ms, agent_calls, resources_created, ... }
      }
```

---

## Retry & Validation Architecture

Every agent call is wrapped in `withRetry()`:

```javascript
const result = await withRetry(
  () => callAgent(context),
  { maxRetries: 2, baseDelayMs: 500 }
);
```

**Retry triggers:**
- `ZodError` — output failed schema validation
- `SyntaxError` — model returned invalid JSON
- Network timeouts

**Backoff:** 500ms → 1000ms (linear)

After retry exhaustion, server returns HTTP 500 with the specific validation error message.

---

## Frontend Architecture

```
src/
├── App.jsx                    # Root — header + footer shell
├── context/
│   └── LanguageContext.jsx    # EN/BM language context (React Context API)
├── hooks/
│   └── useGeneration.js       # State machine: idle→generating→complete
├── i18n/
│   └── translations.js        # All UI strings in EN + BM
├── pages/
│   ├── Home.jsx               # Input form + country/persona selectors
│   └── Dashboard.jsx          # Results — Magic Moment staggered reveal
└── components/
    ├── GenerationProgress.jsx  # 5-step animated progress + color-shifting orb
    ├── AIRationale.jsx         # Agent 2's pedagogical reasoning
    ├── LessonQualityScore.jsx  # Agent 5's self-evaluation scores
    ├── TeachingInsights.jsx    # Accordion panel — Agent 4's insights
    ├── GamePreview.jsx         # Modal → iframe → game engine
    └── FileUploadZone.jsx      # Drag-drop + click upload
```

**State Machine (`useGeneration`):**
```
idle
  │ generate() called
  ▼
uploading (if file provided)
  │ upload complete
  ▼
generating
  │ step 0: Agent 1 running
  │ step 1: Agent 2 running  (after 3s)
  │ step 2: Agent 3 running  (after 7s)
  │ step 3: Agent 4 running  (after 11s)
  │ step 4: Agent 5 running  (after 15s)
  │ API responds
  ▼
complete
  │ result set
  ▼
Dashboard renders with Magic Moment stagger animation
```

---

## Game Engine Architecture

The interactive games run as **self-contained iframes** — no React, no dependencies. This means:
1. Games work **offline** (save as HTML, open in browser)
2. Games are **fast** — no framework startup cost
3. Games are **portable** — usable as standalone files in any LMS

**Communication protocol:**
```javascript
// Game engine → parent window
window.parent.postMessage({
  type: 'GAME_COMPLETE',
  results: {
    score: 85,
    total: 10,
    answers: [...],
    timeSeconds: 142
  }
}, '*');
```

---

## Demo Mode Architecture

```
DEMO_MODE=true (default)
  │
  ├─ /api/generate request arrives
  ├─ 2.5s artificial delay (animation plays)
  ├─ Check country/language hint:
  │     Malaysia / Bahasa Melayu → DEMO_RESPONSES.malaysia
  │     United Kingdom           → DEMO_RESPONSES.uk
  │     Everything else          → DEMO_RESPONSES.universal
  └─ Return pre-built response (no AI call)

DEMO_MODE=false
  └─ Full 5-agent pipeline runs via the OpenAI API
```

---

## Security Notes

- `.env` is in `.gitignore` — API keys never committed
- CORS restricted to `FRONTEND_URL` env variable
- File upload: max 4MB, only PDF + TXT allowed
- No user data stored server-side — stateless pipeline
- All AI output validated through Zod before returning to client

---

*EduForge AI | OpenAI Build Week 2026*
