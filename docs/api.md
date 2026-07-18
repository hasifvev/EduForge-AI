# EduForge AI — API Reference

> All API endpoints for the EduForge AI backend (`http://localhost:3001`)

---

## Base URL

```
http://localhost:3001/api
```

---

## Authentication

No authentication required. In production, add an API key via environment variable and middleware.

---

## Endpoints

### `GET /api/health`

Check server status, mode, and capabilities.

**Response `200`:**
```json
{
  "status": "ok",
  "service": "EduForge AI — The AI Teaching Operating System",
  "mode": "DEMO",
  "agents": 5,
  "model": "demo-cache",
  "provider": "none (demo)",
  "timestamp": "2026-07-16T16:21:06.000Z"
}
```

**Mode values:**
- `DEMO` — running on pre-built cached responses, no API key needed
- `LIVE` — making real OpenAI API calls using `OPENAI_MODEL`

---

### `POST /api/generate`

**Main endpoint.** Runs the full 5-agent pipeline and returns a complete lesson package.

**Request:**
```
Content-Type: multipart/form-data  (if uploading a file)
Content-Type: application/json     (if no file)
```

**Body Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `subject` | string | ✅ | Subject name (e.g. `"Science"`, `"Mathematics"`) |
| `year` | string | ✅ | Grade/year level (e.g. `"Grade 5"`, `"Year 8"`, `"Tahun 4"`) |
| `topic` | string | ✅ | Lesson topic (e.g. `"States of Matter"`) |
| `language` | string | ✅ | Output language (`"English"`, `"Bahasa Melayu"`, etc.) |
| `country` | string | ❌ | Teacher's country (e.g. `"United States"`, `"Malaysia"`) |
| `curriculumStandard` | string | ❌ | Curriculum name (e.g. `"Common Core"`, `"KSSR"`) |
| `studentPersona` | string | ❌ | `"Beginner"` \| `"Mixed Ability"` \| `"On-Level"` \| `"Gifted & Talented"` \| `"SEN Support"` |
| `objectives` | string | ❌ | Teacher-specified learning objectives |
| `file` | File | ❌ | PDF or TXT file containing lesson material |

**Example Request (JSON):**
```json
{
  "subject": "Science",
  "year": "Grade 5",
  "topic": "States of Matter",
  "language": "English",
  "country": "United States",
  "curriculumStandard": "Common Core",
  "studentPersona": "On-Level"
}
```

**Response `200`:**
```json
{
  "generation_id": "gen_1721147466123",
  "model": "GPT-5.6",
  "created_at": "2026-07-16T16:31:06.123Z",
  "status": "success",

  "subject": "Science",
  "year": "Grade 5",
  "topic": "States of Matter",
  "country": "United States",
  "language": "English",
  "studentPersona": "On-Level",

  "lesson": {
    "objectives": ["string", ...],
    "key_concepts": ["string", ...],
    "misconceptions": [
      { "mistake": "string", "correction": "string", "example": "string" }
    ],
    "difficulty": "intermediate",
    "summary": "string",
    "prerequisite_knowledge": ["string"],
    "real_world_connections": ["string"],
    "curriculum_alignment": "NGSS 5-PS1-1",
    "curriculum_source": "Common Core / NGSS",
    "confidenceLevel": "high",
    "persona_notes": "string",
    "experience_design": {
      "primary_activity": "quiz",
      "secondary_activity": "matching",
      "why_primary_activity": "string",
      "rationale": "string",
      "difficulty_calibration": "string",
      "engagement_strategy": "string",
      "confidence_score": 88
    }
  },

  "resources": {
    "quiz": {
      "type": "mcq",
      "title": "States of Matter Quiz",
      "questions": [
        {
          "id": 1,
          "question": "What happens to water molecules when water freezes?",
          "options": ["A. They speed up", "B. They slow down and form a rigid structure", "C. They evaporate", "D. They become a gas"],
          "correct": "B. They slow down and form a rigid structure",
          "explanation": "string"
        }
      ]
    },
    "matching": {
      "type": "drag_drop",
      "title": "Match the Terms",
      "instruction": "Drag each term to its correct definition",
      "pairs": [
        { "id": 1, "term": "Solid", "definition": "Has definite shape and volume" }
      ]
    },
    "worksheet": {
      "title": "string",
      "instructions": "string",
      "items": [
        { "id": 1, "question": "string", "answer": "string", "hint": "string" }
      ]
    },
    "answer_key": {
      "quiz_answers": [{ "id": 1, "correct": "string", "explanation": "string" }],
      "worksheet_answers": [{ "id": 1, "answer": "string" }]
    }
  },

  "teaching_insights": {
    "misconceptions": [
      { "mistake": "string", "correction": "string", "example": "string" }
    ],
    "teaching_tips": ["string"],
    "daily_examples": ["string"],
    "intervention_strategy": "string",
    "extension_activity": "string",
    "estimated_class_difficulty": "moderate",
    "time_estimate_minutes": 45,
    "differentiation_note": "string"
  },

  "lesson_evaluation": {
    "scores": {
      "learning_coverage": 90,
      "student_engagement": 85,
      "difficulty_balance": 88,
      "blooms_taxonomy": 82
    },
    "overall_score": 89,
    "grade": "A",
    "strengths": ["string"],
    "weaknesses": [],
    "suggestion": "string",
    "blooms_levels_present": ["Remember", "Understand", "Apply", "Analyse"],
    "blooms_levels_missing": ["Evaluate", "Create"]
  },

  "analytics": {
    "generation_time_ms": 2543,
    "agent_calls": 5,
    "resources_created": 4,
    "questions_generated": 10,
    "matching_pairs_generated": 8,
    "estimated_prep_time_saved_minutes": 90
  }
}
```

**Error Response `400`:**
```json
{
  "error": "Missing required fields: subject, year, topic, language"
}
```

**Error Response `500`:**
```json
{
  "error": "Agent 1 failed after 2 retries: ...",
  "agent": "curriculumIntelligence"
}
```

---

### `POST /api/extract`

Extract text from an uploaded PDF or TXT file.

**Request:**
```
Content-Type: multipart/form-data
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | ✅ | PDF or TXT, max 10MB |

**Response `200`:**
```json
{
  "text": "Extracted lesson content...",
  "pages": 3,
  "characters": 4521,
  "filename": "lesson-plan.pdf"
}
```

**Error `400`:**
```json
{
  "error": "Only PDF and TXT files are supported"
}
```

---

### `POST /api/analyze-performance`

Analyze quiz performance data sent from the game engine.

**Request Body:**
```json
{
  "results": {
    "score": 7,
    "total": 10,
    "answers": [
      {
        "questionId": 1,
        "selected": "B",
        "correct": "B",
        "timeSeconds": 12
      }
    ],
    "totalTimeSeconds": 142
  },
  "subject": "Science",
  "topic": "States of Matter"
}
```

**Response `200`:**
```json
{
  "percentage": 70,
  "grade": "B",
  "feedback": "Good understanding! Review questions 3 and 7.",
  "weak_areas": ["evaporation process", "gas properties"],
  "recommendations": ["string"]
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Missing or invalid request fields |
| 413 | File too large (> 10MB) |
| 415 | Unsupported file type (not PDF/TXT) |
| 500 | AI pipeline error (agent failure or validation failure) |

---

## Rate Limits

Demo mode is rate-limited to 60 requests per minute per IP. Live mode is rate-limited to 20 requests per minute per IP.

---

## CORS

The backend allows requests from `FRONTEND_URL` (default: `http://localhost:5173`).
To allow other origins, set `FRONTEND_URL=https://your-domain.com` in `.env`.

---

*EduForge AI | OpenAI Build Week 2026*
