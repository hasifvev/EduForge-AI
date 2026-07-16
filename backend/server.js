import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { extractFileText } from './utils/fileParser.js';
import { runCurriculumIntelligence } from './agents/curriculumIntelligence.js';
import { runExperienceDesigner } from './agents/experienceDesigner.js';
import { runContentGenerator } from './agents/contentGenerator.js';
import { runTeacherAssistant } from './agents/teacherAssistant.js';
import { buildWorksheet } from './utils/worksheetBuilder.js';
import { DEMO_RESPONSE } from './demo/demoCache.js';

const app = express();
const PORT = process.env.PORT || 3001;
const DEMO_MODE = process.env.DEMO_MODE !== 'false'; // default: always demo
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// ─── Health ──────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    mode: DEMO_MODE ? 'DEMO' : 'LIVE',
    model: DEMO_MODE ? 'demo-cache' : GROQ_MODEL,
    provider: DEMO_MODE ? 'none' : 'Groq (free)',
    timestamp: new Date().toISOString(),
  });
});

// ─── File Extraction ──────────────────────────────────────────────────────────
app.post('/api/extract', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
  const allowed = ['application/pdf', 'text/plain'];
  if (!allowed.includes(req.file.mimetype)) {
    return res.status(400).json({ error: 'Only PDF and TXT files are supported.' });
  }
  try {
    const text = await extractFileText(req.file);
    res.json({ status: 'ok', text, filename: req.file.originalname });
  } catch (err) {
    res.status(500).json({ error: 'Failed to extract text: ' + err.message });
  }
});

// ─── Main Generation ──────────────────────────────────────────────────────────
app.post('/api/generate', async (req, res) => {
  const { subject, year, topic, language = 'Bahasa Melayu', objectives = '', extractedText = '' } = req.body;

  if (!subject || !year || !topic) {
    return res.status(400).json({ error: 'subject, year, and topic are required.' });
  }

  // ── DEMO MODE — instant response, no API call ──────────────────────────────
  if (DEMO_MODE) {
    console.log(`\n🎭 [DEMO MODE] Returning cached response for: ${subject} ${year} — ${topic}`);
    // Simulate a brief delay so the progress animation plays
    await new Promise(r => setTimeout(r, 2000));
    return res.json({
      ...DEMO_RESPONSE,
      generation_id: `edf_demo_${Date.now()}`,
      created_at: new Date().toISOString(),
    });
  }

  // ── LIVE MODE — real Groq API calls ───────────────────────────────────────
  const generationId = `edf_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = new Date().toISOString();

  try {
    const context = { subject, year, topic, language, objectives, extractedText };

    console.log(`\n🎓 [${generationId}] Groq generating: ${subject} ${year} — ${topic} (${language})`);
    console.log(`   Model: ${GROQ_MODEL}`);

    // Agent 1 — Curriculum Intelligence
    console.log('  [1/4] Curriculum Intelligence...');
    const blueprint = await runCurriculumIntelligence(context);

    // Agent 2 — Learning Experience Designer
    console.log('  [2/4] Experience Designer...');
    const experienceDesign = await runExperienceDesigner({ ...context, blueprint });

    // Agent 3 — Content Generator
    console.log('  [3/4] Content Generator...');
    const gameContent = await runContentGenerator({ ...context, blueprint, experienceDesign });

    // Agent 4 — Teacher Assistant + Worksheet (parallel)
    console.log('  [4/4] Teacher Assistant + Worksheet...');
    const [teachingInsights, { worksheetHTML, answerKeyHTML }] = await Promise.all([
      runTeacherAssistant({ ...context, blueprint, experienceDesign }),
      Promise.resolve(buildWorksheet({ blueprint, gameContent, subject, year, topic, language })),
    ]);

    console.log(`  ✅ [${generationId}] Complete!\n`);

    res.json({
      generation_id: generationId,
      model: GROQ_MODEL,
      created_at: createdAt,
      status: 'complete',
      lesson: { ...blueprint, experience_design: experienceDesign },
      resources: {
        quiz: { data: gameContent.quiz, engineConfig: buildQuizEngineConfig(gameContent.quiz) },
        matching: { data: gameContent.matching, engineConfig: buildMatchingEngineConfig(gameContent.matching) },
        worksheet: { html: worksheetHTML },
        answer_key: { html: answerKeyHTML },
      },
      teaching_insights: teachingInsights,
    });
  } catch (err) {
    console.error(`  ❌ [${generationId}] Error:`, err.message);
    res.status(500).json({ error: err.message || 'Generation failed. Please try again.' });
  }
});

// ─── Performance Analysis ─────────────────────────────────────────────────────
app.post('/api/analyze-performance', async (req, res) => {
  const { results, topic, language = 'Bahasa Melayu' } = req.body;
  if (!results || !topic) return res.status(400).json({ error: 'results and topic are required.' });

  if (DEMO_MODE) {
    return res.json({
      status: 'ok',
      analysis: {
        overall_score: 72,
        weak_questions: [
          { question_id: 3, error_rate: 0.6, insight: 'Ramai murid keliru antara tenaga haba dan tenaga cahaya.' },
          { question_id: 7, error_rate: 0.45, insight: 'Konsep pertukaran tenaga perlu diperkukuhkan.' },
        ],
        class_recommendation: 'Ulang semak pertukaran tenaga dengan demonstrasi langsung.',
        follow_up_activity: 'Aktiviti "Rantaian Tenaga" — murid lukis 3 pertukaran tenaga dalam kehidupan harian.',
      },
    });
  }

  try {
    const { openai, GPT_MODEL } = await import('./openai.js');
    const prompt = `A class just completed a quiz on "${topic}". Results:\n${JSON.stringify(results, null, 2)}\n\nProvide teacher performance report in ${language} as JSON:\n{"overall_score": number, "weak_questions": [{"question_id": number, "error_rate": number, "insight": "string"}], "class_recommendation": "string", "follow_up_activity": "string"}`;
    const response = await openai.chat.completions.create({
      model: GPT_MODEL, temperature: 0.4, response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }],
    });
    res.json({ status: 'ok', analysis: JSON.parse(response.choices[0].message.content) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildQuizEngineConfig(quiz) {
  return { title: quiz?.title || 'Quiz', questions: quiz?.questions || [], type: 'mcq' };
}
function buildMatchingEngineConfig(matching) {
  return { title: matching?.title || 'Matching', instruction: matching?.instruction || '', pairs: matching?.pairs || [], type: 'drag_drop' };
}

app.listen(PORT, () => {
  const mode = DEMO_MODE ? '🎭 DEMO MODE (no API key needed)' : `🤖 LIVE — Groq/${GROQ_MODEL}`;
  console.log(`\n🚀 EduForge AI — http://localhost:${PORT}`);
  console.log(`   ${mode}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});
