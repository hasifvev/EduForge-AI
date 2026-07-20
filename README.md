# EduForge AI

> An AI teaching workspace that turns a curriculum-aligned lesson brief into a classroom-ready lesson package.

Built for OpenAI Build Week 2026. Live app: [edu-forge-ai-weld.vercel.app](https://edu-forge-ai-weld.vercel.app)

EduForge helps teachers turn a subject, grade, topic, region, language, learner profile, and optional source material into interactive activities, printable practice, study resources, and teaching guidance.

## Highlights

- Seven source-registered education contexts: Malaysia, US/NGSS, England, Australia, Singapore, India/CBSE, and International / IB
- A versioned standards registry that distinguishes reviewed exact matches from framework-only and teacher-review coverage
- Grade-aware subjects and suggested lesson pathways from early years through pre-university
- Interactive Quiz, Matching, Memory Match, and Term Sprint activities
- Printable worksheet and teacher answer key
- Study Hub with flashcards, notes, mock exam, cloze passage, Learning Atlas, and differentiated study schedule
- Five product-level AI stages that plan, design, generate, support, and evaluate a lesson
- Source ingestion from PDF, TXT, PNG, JPG, WEBP, and approved public links
- Material Intelligence for uploaded or linked sources: grounded summary, topics, key terms, essential points, and explain-with-evidence goals
- English and Bahasa Melayu interface support, with generation in a teacher-selected language

## What a Lesson Package Includes

| Area | Resources |
|---|---|
| Interactive practice | Multiple-choice quiz, matching activity, Memory Match, Term Sprint |
| Printable practice | Worksheet and teacher answer key |
| Study Hub | Flashcards, study notes, mock exam, cloze passage, Learning Atlas, study schedule |
| Teacher support | Misconceptions, teaching tips, intervention strategy, extension activity |
| Quality | Bloom's-taxonomy evaluation, lesson quality score, generation analytics |

The Learning Atlas maps learning from the lesson core through strands, concepts, and practice skills. The study schedule contains differentiated notes for Beginner, On-Level, Gifted & Talented, and SEN Support learners.

## How Generation Works

EduForge uses five named product stages:

1. **Curriculum Intelligence** — identifies objectives, concepts, misconceptions, prerequisites, and curriculum alignment.
2. **Experience Designer** — selects and explains the most suitable activity sequence.
3. **Content Generator** — produces quiz questions, matching pairs, game data, and worksheet items.
4. **Teacher Assistant** — creates classroom guidance, differentiation, intervention, and extension suggestions.
5. **Lesson Evaluator** — checks coverage, engagement, difficulty balance, and Bloom's taxonomy.

A companion Study Materials generator creates the Study Hub resources in parallel with the lesson content. Worksheet rendering runs after content generation so printable materials are never built from incomplete data.

## Curriculum and Grade Support

| Region | Framework shown in app | Early-years entry |
|---|---|---|
| Malaysia | KSPK, KSSR Semakan 2017, KSSM | Prasekolah |
| United States | State standards / NGSS | Kindergarten |
| United Kingdom | National Curriculum for England | Reception |
| Australia | Australian Curriculum v9.0 | Foundation |
| Singapore | Singapore MOE Syllabus | Nursery / Kindergarten |
| India | NCF-SE 2023 / CBSE | Pre-primary |
| International / IB | IB PYP / MYP / DP | Early Years |

The catalog adjusts subjects and starter topics across early years, primary, lower secondary, upper secondary, and pre-university learning stages. It is a teacher-facing planning aid, not a substitute for a school, board, or state syllabus. Each region exposes an official curriculum source in the lesson form; see [curriculum sources](docs/curriculum-sources.md).

### Standards Coverage

Every supported region now has a source-registered country pack with an explicit jurisdiction boundary. A lesson is labelled **Reviewed curriculum match** only when its country, subject, year, and topic resolve to a reviewed outcome record; otherwise it is labelled **Curriculum review needed** and links to the official framework source.

Current reviewed seed records are Malaysia KSSM Form 1 Science `5.1.3`, NGSS Grade 5 Science `5-PS1-1`, and England KS3 Science particle-model matter. Australia, Singapore, India/CBSE, and IB packs are registered with their official sources and await reviewed subject/outcome records. This prevents the product from claiming universal official alignment before the data exists. See [global standards platform](docs/2026-07-20-global-standards-platform.md).

## Regional Assessment Formats

Generated assessments are **teacher-editable classroom practice**, not official examination papers. The generator uses appropriate local conventions while clearly avoiding claims of endorsement by an examination authority.

| Region | Practice format approach |
|---|---|
| Malaysia | KSSR/KSSM and PBD-aligned classroom assessment; does not label materials as UPSR or PT3 |
| United States | State standards practice; NGSS science uses phenomena, evidence, models, and reasoning |
| United Kingdom | KS2, KS3, GCSE, and A-level-style classroom practice with command words and mark guidance |
| Australia | Achievement-standard practice progressing through understanding, fluency, and reasoning |
| Singapore | MOE syllabus practice; PSLE-style wording is reserved for Primary 6 and GCE-style wording for exam preparation |
| India | NCERT/CBSE competency-based practice using objective, short-answer, and contextual application items |
| International / IB | PYP inquiry and reflection; MYP/DP criterion-referenced tasks with authentic contexts and success criteria |

Printable worksheets and answer keys include the relevant framework, assessment focus, practice format, and recommended item structure.

## Languages

The interface includes quick language choices and an **Any language** input. The configured AI provider is instructed to generate the lesson in the language selected by the teacher. Teachers should review accuracy, script coverage, cultural fit, and accessibility before classroom use.

## Source Material Ingestion

| Input | Limit | Handling |
|---|---:|---|
| Upload | 4 MB | PDF, TXT, PNG, JPG, WEBP |
| Public link | 2 MB remote response | PDF, TXT, image, or public web page |

Source text is capped before it reaches the model pipeline. Public links are checked for private-network targets and redirect destinations before fetching. Uploaded or linked content should always be reviewed for suitability and copyright compliance.

When source text is supplied, EduForge also returns a **Material Intelligence** briefing. It extracts a concise source-grounded summary, identifies topics and key terms, preserves short source evidence, and states what learners should be able to explain. If the readable source text is too short, the interface explicitly marks that limit instead of inventing detail.

## Demo Mode and Live Mode

`DEMO_MODE` defaults to `true`, so the application runs without an API key.

- **Demo mode** provides verified examples for Grade 5 Science: States of Matter, Form 1 Sains: Keadaan Jirim, and Year 10 History: Norman Conquest.
- Any lesson with supplied source material uses a source-preview response so teachers can review extracted context.
- Other exact lesson requests require live mode with a configured provider.
- **Live mode** runs the AI pipeline and creates a tailored lesson package.

## Run Locally

Install the frontend and backend dependencies:

```bash
cd frontend && npm install
cd ../backend && npm install
```

Start the backend in one terminal:

```bash
cd backend
node server.js
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`.

## AI Provider Configuration

Set `DEMO_MODE=false` only when a provider is configured. Keep keys server-side; never expose them in frontend variables.

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
| `ALLOW_VERCEL_PREVIEWS` | Enables Vercel preview-origin support when `true` |

For Vercel, configure the same server-side variables in the intended Production and Preview environments. The `api/index.js` serverless entry point wraps the Express application.

## API

See the full [API reference](docs/api.md). The main endpoints are:

| Endpoint | Purpose |
|---|---|
| `GET /api/health` | Reports mode, provider, model, product-stage count, and timestamp |
| `POST /api/extract` | Extracts text from an uploaded supported file (`multipart/form-data`, field name `file`) |
| `POST /api/extract-url` | Extracts text from an approved public URL |
| `POST /api/generate` | Creates the lesson package |
| `POST /api/analyze-performance` | Produces a class-level quiz performance report |
| `GET /api/curriculum/coverage` | Returns the versioned country-pack register and reviewed-record coverage summary |

Example generation request:

```json
{
  "subject": "Science",
  "year": "Grade 5",
  "topic": "States of Matter",
  "language": "English",
  "country": "United States",
  "curriculumStandard": "NGSS 5-PS1-1",
  "studentPersona": "On-Level",
  "objectives": "Students explain particle behaviour in solids, liquids, and gases."
}
```

## Security and Responsible Use

The backend applies security headers, CORS allow-listing, API and generation rate limits, request validation, upload-size limits, public-link safety checks, text caps, and prompt-safety controls. See [architecture](docs/architecture.md) and the [security remediation plan](docs/2026-07-17-security-remediation-plan.md) for implementation detail.

EduForge creates draft teaching resources. Teachers must verify curriculum alignment, factual accuracy, age suitability, cultural fit, accessibility, assessment suitability, source rights, and local policy requirements before classroom use.

## Project Layout

```text
api/
  index.js                 Vercel serverless entry point
backend/
  agents/                  Curriculum, design, content, teacher, evaluation, study-material stages
  curriculum/              Source-registered country packs, reviewed standards records, resolver, coverage validator
  demo/                    Cached scenarios and source-preview mode
  utils/                   Parsing, URL safety, prompt safety, worksheet rendering
  validators/              Request and response schemas
frontend/
  public/engines/          Browser game engines
  src/components/          Games, Study Hub, Learning Atlas, exams, notes, schedules
  src/utils/               Grade-aware curriculum catalog and mappings
docs/
  api.md                   API contract
  architecture.md          System architecture
  curriculum-sources.md    Official curriculum source register
LICENSE                     Apache License 2.0
NOTICE                      Project copyright notice
```

## Verification

Run the production frontend build:

```bash
npm run build
```

The curriculum catalog is validated against supported locale, region, grade, subject, topic, and material-search combinations. Production health is available at `/api/health`.

## License

Licensed under the [Apache License 2.0](LICENSE). See [NOTICE](NOTICE) for project attribution.
