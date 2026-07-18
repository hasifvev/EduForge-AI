# EduForge AI API Reference

Base URL locally: `http://localhost:3001/api`.

## `GET /health`

Returns the service state.

```json
{
  "status": "ok",
  "mode": "LIVE",
  "model": "configured-model-id",
  "provider": "OpenAI | Groq | Custom OpenAI-compatible | none (demo)",
  "agents": 5,
  "timestamp": "2026-07-19T00:00:00.000Z"
}
```

`DEMO` serves cached scenarios. `LIVE` calls the configured provider.

## `POST /extract`

Extracts lesson text from an uploaded file. Use `multipart/form-data` with field name `file`.

| Accepted type | Maximum upload |
|---|---:|
| PDF (`application/pdf`) | 4 MB |
| TXT (`text/plain`) | 4 MB |
| PNG, JPG, WEBP | 4 MB |

Example response:

```json
{
  "status": "ok",
  "text": "Extracted lesson content...",
  "filename": "lesson-material.pdf"
}
```

Errors are returned as JSON with an `error` field. Images use OCR and require readable printed text.

## `POST /extract-url`

Fetches and extracts a public source URL.

```json
{ "url": "https://example.org/lesson-material.pdf" }
```

Supported resources are public HTML pages, text files, PDFs, and images. The remote response limit is 2 MB. Private, local-network, credentialed, or unsafe redirect URLs are rejected.

```json
{
  "status": "ok",
  "text": "Extracted lesson content...",
  "sourceUrl": "https://example.org/lesson-material.pdf"
}
```

## `POST /generate`

Runs the five-stage lesson-generation workflow. Send JSON.

```json
{
  "subject": "Science",
  "year": "Grade 5",
  "topic": "Matter and materials",
  "language": "English",
  "country": "United States",
  "curriculumStandard": "NGSS 5-PS1-1",
  "studentPersona": "On-Level",
  "objectives": "Students develop a particle model of matter.",
  "extractedText": "Optional text returned by /extract or /extract-url"
}
```

Required fields: `subject`, `year`, and `topic`. `language` defaults to `English`; `studentPersona` defaults to `On-Level`.

Successful live responses have `status: "complete"` and include:

- `lesson`: curriculum blueprint and experience design
- `resources`: quiz, matching game, worksheet HTML, answer-key HTML
- `study_materials`: flashcards, notes, mock exam, cloze passage, Learning Atlas, schedule
- `teaching_insights`
- `lesson_evaluation`
- `analytics`

The Learning Atlas data is a nested structure of `root`, `topic`, `subtopic`, and `skill` nodes. Nodes may include `description`, `learning_goal`, `example`, and `check_question`.

## `POST /analyze-performance`

Analyses quiz result data.

```json
{
  "results": {
    "score": 7,
    "total": 10,
    "answers": []
  },
  "topic": "Matter and materials",
  "language": "English"
}
```

The exact analysis varies by mode and configured provider.

## Errors and Limits

| Status | Meaning |
|---|---|
| `400` | Invalid request, unsupported file, invalid source URL, or source extraction failure |
| `429` | Rate limit reached |
| `500` | Provider, agent, parsing, or OCR failure |

The API rate limit is 60 requests/minute/IP in demo mode and 20 requests/minute/IP in live mode. The costlier /generate endpoint is additionally limited to 12 requests/5 minutes/IP in demo mode and 3 requests/5 minutes/IP in live mode.

### CORS configuration

- FRONTEND_URL can be set to the production frontend origin.
- ALLOW_VERCEL_PREVIEWS=true permits browser API calls from Vercel preview deployments. Keep it unset in production unless preview testing needs it.
