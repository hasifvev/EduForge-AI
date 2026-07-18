# EduForge AI

> An AI teaching workspace that turns a curriculum-aligned lesson brief into an interactive lesson package.

Built for OpenAI Build Week 2026. Live app: [edu-forge-ai-weld.vercel.app](https://edu-forge-ai-weld.vercel.app)

## What It Does

EduForge creates a lesson package from a subject, grade/year, topic, country/region, language, learner profile, and optional source material. The package includes:

- Interactive multiple-choice quiz and matching activity
- Printable worksheet and answer key
- Study notes, flashcards, cloze passage, mock exam, and study schedule
- A four-level Learning Atlas: lesson core -> learning strand -> concept -> practice skill
- Teaching insights and a Bloom's-taxonomy self-evaluation

The generation flow has five named agent stages: Curriculum Intelligence, Experience Designer, Content Generator, Teacher Assistant, and Lesson Evaluator. Some stages make parallel model calls; the health endpoint reports the five product-level agent stages.

## Curriculum and Grade Support

The interface has grade-aware subject and topic paths for these currently supported regions:

| Region | Framework shown in app | Early-years entry |
|---|---|---|
| Malaysia | KSPK, KSSR Semakan 2017, KSSM | Prasekolah |
| United States | State standards / NGSS | Kindergarten |
| United Kingdom | National Curriculum for England | Reception |
| Australia | Australian Curriculum v9.0 | Foundation |
| Singapore | Singapore MOE Syllabus | Nursery / Kindergarten |
| India | NCF-SE 2023 / CBSE | Pre-primary |
| International / IB | IB PYP / MYP / DP | Early Years |

The catalog changes available subjects and starter lesson pathways by learning stage: early years, primary, lower secondary, and upper secondary. It is a teacher-facing planning guide, not a replacement for a school, board, or state syllabus. Each supported region exposes an official curriculum-guide link in the form. See [curriculum sources](docs/curriculum-sources.md).

## Languages

Quick chips provide common languages, and the **Any language** control accepts a custom language name. The underlying model is asked to generate in the language entered by the teacher; quality and script coverage depend on the configured provider and should be reviewed before class.

## Source Material Ingestion

| Input | Limit | Handling |
|---|---:|---|
| Upload | 4 MB | PDF, TXT, PNG, JPG, WEBP |
| Public link | 2 MB remote response | PDF, TXT, image, or public web page |

Text is capped before it enters the model pipeline. Public links are checked for private-network targets and redirect destinations before they are fetched. Teachers should still verify that a source is appropriate for their class.

## Run Locally

```bash
# Install frontend and backend dependencies
cd frontend && npm install
cd ../backend && npm install

# Terminal 1: backend
node server.js

# Terminal 2: frontend
cd ../frontend && npm run dev
```

Open `http://localhost:5173`.

## AI Provider Configuration

`DEMO_MODE` defaults to `true`. Set it to `false` only when a provider is configured.

### OpenAI

```dotenv
DEMO_MODE=false
AI_PROVIDER=openai
OPENAI_API_KEY=your_project_key
OPENAI_MODEL=gpt-4.1-mini
```

### Groq

```dotenv
DEMO_MODE=false
AI_PROVIDER=groq
GROQ_API_KEY=your_key
GROQ_MODEL=llama-3.3-70b-versatile
```

### OpenAI-compatible provider

```dotenv
DEMO_MODE=false
AI_PROVIDER=custom
AI_API_KEY=your_key
AI_BASE_URL=https://provider.example/v1
AI_MODEL=provider-model-id
AI_MAX_TOKENS=4096
```

Never commit keys or place them in frontend variables. In Vercel, configure the same variables for the intended Production and Preview environments.

## Environment Variables

| Variable | Purpose |
|---|---|
| `DEMO_MODE` | `true` uses cached demo responses; `false` enables the configured provider |
| `AI_PROVIDER` | `openai`, `groq`, or `custom` |
| `OPENAI_API_KEY`, `OPENAI_MODEL` | OpenAI provider configuration |
| `GROQ_API_KEY`, `GROQ_MODEL` | Groq provider configuration |
| `AI_API_KEY`, `AI_BASE_URL`, `AI_MODEL`, `AI_MAX_TOKENS` | Custom OpenAI-compatible provider configuration |
| `PORT` | Backend port; defaults to `3001` |
| `FRONTEND_URL` | Additional allowed frontend origin |
| `ALLOW_VERCEL_PREVIEWS` | Enables Vercel preview-origin support when set to `true` |

## API

See [API reference](docs/api.md) for the current endpoints and payloads.

- `GET /api/health`
- `POST /api/extract`
- `POST /api/extract-url`
- `POST /api/generate`
- `POST /api/analyze-performance`

## Project Layout

```text
backend/
  agents/                 Five generation stages
  demo/                   Cached scenarios and source-preview mode
  utils/                  Parsing, URL safety, prompt safety, worksheets
  validators/             Request and response schemas
frontend/
  src/components/         Learning Atlas, games, notes, schedules, exams
  src/utils/              Grade-aware curriculum catalog and mappings
docs/
  api.md                  Current API contract
  architecture.md         System architecture
  curriculum-sources.md   Official curriculum source register
  codex-log.md            Build history
```

## Verification

Run the frontend build:

```bash
npm run build
```

The curriculum catalog is validated against all supported locale, region, grade, subject, topic, and material-search combinations. Production health is available at `/api/health`.

## Responsible Use

EduForge generates draft teaching resources. Teachers must check curriculum alignment, factual accuracy, cultural fit, accessibility, and assessment suitability before classroom use.
