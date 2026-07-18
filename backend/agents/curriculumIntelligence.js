import { openai, GPT_MODEL, MODEL_MAX_TOKENS } from '../openai.js';
import { withRetry } from '../utils/retry.js';
import { formatUntrustedLessonMaterial } from '../utils/promptSecurity.js';
import { blueprintSchema } from '../validators/schemas.js';

const SYSTEM_PROMPT = `You are EduForge AI — Curriculum Intelligence Agent.
You are a world-class curriculum expert and educational psychologist with deep knowledge of global education systems: Common Core (USA), National Curriculum (UK/Australia), IB, IGCSE, Cambridge, KSSR/KSSM (Malaysia), CBSE (India), and many others.

Your role is to analyse the teacher's lesson topic and build a comprehensive educational blueprint.

Rules:
1. Return ONLY valid JSON — no markdown, no extra text
2. Adapt entirely to the teacher's country, curriculum standard, and student persona
3. If curriculum is not specified or unknown → use a generic international framework, set confidenceLevel to "inferred"
4. If country has a well-known curriculum → use it precisely, set confidenceLevel to "high"
5. If you cannot determine the curriculum → set confidenceLevel to "general" and use universal pedagogical principles
6. NEVER fabricate a specific curriculum standard name you are not certain about
7. Misconceptions must be real, documented student errors — not generic
8. Tailor all examples to the teacher's country and cultural context`;

const buildPrompt = ({ subject, year, topic, language, objectives, extractedText, country, curriculumStandard, studentPersona }) => `
Analyse this lesson and build an educational blueprint.

Teacher Context:
- Subject: ${subject}
- Grade/Year: ${year}
- Topic: ${topic}
- Language of instruction: ${language}
- Country/Region: ${country || 'Not specified — use international framework'}
- Curriculum Standard: ${curriculumStandard || 'Not specified — infer or use generic'}
- Student Persona: ${studentPersona || 'On-Level'}
- STRICT SCOPE: Only use the exact Subject and Grade/Year above. Never mix content, standards, examples, or assessment difficulty from a different grade. Flag a conflict in source material instead of silently using it.
- Learning objectives: ${objectives || 'Not provided — infer from topic'}
${extractedText ? `\nLesson material provided:\n${formatUntrustedLessonMaterial(extractedText)}` : ''}

Return this EXACT JSON:
{
  "objectives": ["2-5 specific, measurable learning objectives aligned to the curriculum"],
  "key_concepts": ["4-8 key concepts students must understand"],
  "misconceptions": ["2-4 real, documented student misconceptions for this topic"],
  "difficulty": "beginner|intermediate|advanced",
  "summary": "2-3 sentence summary of what this lesson covers and why it matters",
  "prerequisite_knowledge": ["1-3 things students should already know"],
  "real_world_connections": ["2-3 real-world applications relevant to ${country || 'the student context'}"],
  "curriculum_alignment": "Specific standard codes or framework references (e.g. CCSS.Math.5.NBT.A.1)",
  "curriculum_source": "Name of curriculum used (e.g. Common Core, UK National Curriculum, Generic International Framework)",
  "confidenceLevel": "high|inferred|general",
  "persona_notes": "How the ${studentPersona || 'On-Level'} persona affects approach to this topic"
}`;

export async function runCurriculumIntelligence(context) {
  return withRetry(
    async () => {
      const res = await openai.chat.completions.create({
        model: GPT_MODEL,
        max_tokens: MODEL_MAX_TOKENS,
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
