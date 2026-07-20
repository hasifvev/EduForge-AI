import { openai, GPT_MODEL, MODEL_MAX_TOKENS } from '../openai.js';
import { withRetry } from '../utils/retry.js';
import { experienceSchema } from '../validators/schemas.js';

const SYSTEM_PROMPT = `You are IlmuEducator — Learning Experience Designer Agent.
You are an expert instructional designer who creates optimal learning experiences for any classroom worldwide.

Your role is to decide the BEST learning strategy for this lesson — and explain WHY.
This is the most important decision in the pipeline. Your reasoning is shown to teachers.

Rules:
1. Return ONLY valid JSON — no markdown, no extra text
2. Always justify your pedagogical choices — teachers see your reasoning
3. Consider student persona (Beginner/Mixed/Gifted/SEN/On-Level) in all decisions
4. Difficulty calibration must match the persona — Gifted gets harder questions, Beginner gets more scaffolding
5. Your confidence_score should reflect how well this strategy fits the topic (0-100)`;

const buildPrompt = ({ subject, year, topic, language, country, curriculumStandard, studentPersona, blueprint }) => `
Design the optimal learning experience for this lesson.

Context:
- Subject: ${subject} | Grade: ${year} | Topic: ${topic}
- Country: ${country || 'International'} | Curriculum: ${curriculumStandard || 'General'}
- Language: ${language}
- Student Persona: ${studentPersona || 'On-Level'}
- Curriculum alignment: ${blueprint.curriculum_alignment || 'General framework'}

Educational Blueprint:
${JSON.stringify({ objectives: blueprint.objectives, key_concepts: blueprint.key_concepts, misconceptions: blueprint.misconceptions, difficulty: blueprint.difficulty }, null, 2)}

Return this EXACT JSON:
{
  "primary_activity": "quiz|matching",
  "secondary_activity": "matching|quiz",
  "why_primary_activity": "Specific pedagogical reason why this activity type is best for this topic and persona. Mention the learning objective it serves.",
  "why_quiz": "Why a quiz is or isn't the right first activity for this specific topic",
  "why_matching": "Why matching is or isn't the right first activity for this specific topic",
  "rationale": "Full instructional design rationale — how this sequence of activities builds understanding step by step",
  "quiz_focus": "What the quiz specifically tests and why",
  "matching_focus": "What the matching activity specifically reinforces and why",
  "difficulty_calibration": "How difficulty is adjusted for the ${studentPersona || 'On-Level'} persona",
  "engagement_strategy": "Specific strategy to engage this class type with this topic",
  "confidence_score": 0
}

Set confidence_score (0-100): how well this learning strategy fits the topic. Be honest.`;

export async function runExperienceDesigner({ subject, year, topic, language, country, curriculumStandard, studentPersona, blueprint }) {
  return withRetry(
    async () => {
      const res = await openai.chat.completions.create({
        model: GPT_MODEL,
        max_tokens: MODEL_MAX_TOKENS,
        temperature: 0.5,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt({ subject, year, topic, language, country, curriculumStandard, studentPersona, blueprint }) },
        ],
      });
      const raw = res.choices[0].message.content;
      return experienceSchema.parse(JSON.parse(raw));
    },
    { agentName: 'Experience Designer', maxRetries: 2 }
  );
}
