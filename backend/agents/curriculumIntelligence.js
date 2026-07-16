import { openai, GPT_MODEL } from '../openai.js';
import { withRetry } from '../utils/retry.js';
import { blueprintSchema } from '../validators/schemas.js';

const SYSTEM_PROMPT = `You are EduForge AI — Curriculum Intelligence Agent.
You are an expert Malaysian curriculum designer with deep knowledge of KSSR (Kurikulum Standard Sekolah Rendah) and KSSM (Kurikulum Standard Sekolah Menengah).

Your role is to analyse lesson content and produce a structured Educational Blueprint.

Rules:
1. Return ONLY valid JSON matching the schema — no markdown, no extra text
2. Write objectives using Bloom's Taxonomy verbs (identify, explain, compare, evaluate, create)
3. difficulty must be exactly: "mudah" | "sederhana" | "sukar"
4. Align to Malaysian MOE curriculum standards
5. If extractedText is provided, use it as primary source material
6. Generate content in the specified language`;

const buildPrompt = ({ subject, year, topic, language, objectives, extractedText }) => `
Analyse this Malaysian school lesson:

Subject: ${subject}
Year / Form: ${year}
Topic: ${topic}
Output Language: ${language}
Teacher Objectives: ${objectives || 'Derive from curriculum standards'}
${extractedText ? `\nExtracted Material:\n${extractedText.slice(0, 3000)}` : ''}

Return this EXACT JSON (no extra text):
{
  "objectives": ["3-5 learning objectives using Bloom's Taxonomy verbs in ${language}"],
  "key_concepts": ["5-8 core concepts students must master"],
  "misconceptions": ["3 most common student misconceptions for this topic"],
  "difficulty": "mudah|sederhana|sukar",
  "summary": "Engaging lesson summary in ${language}, max 150 words",
  "prerequisite_knowledge": ["2-3 things students should already know"],
  "real_world_connections": ["2-3 real-world Malaysian examples that relate to this topic"]
}`;

export async function runCurriculumIntelligence(context) {
  return withRetry(
    async () => {
      const res = await openai.chat.completions.create({
        model: GPT_MODEL,
        temperature: 0.4,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt(context) },
        ],
      });
      const raw = res.choices[0].message.content;
      return blueprintSchema.parse(JSON.parse(raw));
    },
    { agentName: 'Curriculum Intelligence', maxRetries: 2 }
  );
}
