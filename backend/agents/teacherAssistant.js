import { openai, GPT_MODEL, MODEL_MAX_TOKENS } from '../openai.js';
import { withRetry } from '../utils/retry.js';
import { teacherInsightsSchema } from '../validators/schemas.js';

const SYSTEM_PROMPT = `You are EduForge AI — Teacher Assistant Agent.
You are an experienced educator and instructional coach who supports classroom teachers worldwide.

Your role is to provide actionable teaching insights tailored to the teacher's country, curriculum, and student persona.

Rules:
1. Return ONLY valid JSON — no markdown, no extra text
2. Be specific and actionable — avoid generic advice
3. Use real-world examples relevant to the teacher's country and culture
4. If country examples are uncertain, use universal classroom scenarios
5. Adjust teaching tips to the student persona:
   - Beginner: more scaffolding, step-by-step, concrete before abstract
   - On-Level: balanced approach, mixed strategies
   - Mixed Ability: differentiation strategies, tiered tasks
   - Gifted: extension challenges, Socratic questioning
   - SEN Support: visual supports, chunked instructions, alternative assessments
6. All content in the specified language`;

const buildPrompt = ({ subject, year, topic, language, country, curriculumStandard, studentPersona, blueprint, experienceDesign }) => `
Provide teaching insights for this lesson.

Context:
- Subject: ${subject} | Grade: ${year} | Topic: ${topic}
- Country: ${country || 'International'} | Curriculum: ${curriculumStandard || 'General'}
- Language: ${language}
- Student Persona: ${studentPersona || 'On-Level'}

From Educational Blueprint:
${JSON.stringify({ misconceptions: blueprint.misconceptions, key_concepts: blueprint.key_concepts.slice(0, 4), real_world_connections: blueprint.real_world_connections }, null, 2)}

Return this EXACT JSON:
{
  "misconceptions": [
    {
      "mistake": "Common student mistake in ${language}",
      "correction": "How to correct it in ${language}",
      "example": "Classroom example relevant to ${country || 'the student context'}"
    }
  ],
  "teaching_tips": ["4 specific, actionable teaching tips for a ${studentPersona || 'On-Level'} class in ${language}"],
  "daily_examples": ["3 real-life examples relevant to ${country || 'the student context'} to open the lesson in ${language}"],
  "intervention_strategy": "What to do if students struggle — specific, actionable steps in ${language}",
  "extension_activity": "Challenge activity for fast finishers, appropriate for ${studentPersona || 'On-Level'} in ${language}",
  "estimated_class_difficulty": "easy|moderate|challenging",
  "time_estimate_minutes": 45,
  "differentiation_note": "How to differentiate for ${studentPersona || 'On-Level'} specifically"
}

Generate 3 misconceptions with corrections, 4 teaching tips, 3 real-life examples.
All tips must be specific to ${country || 'a general international classroom'} context.`;

export async function runTeacherAssistant({ subject, year, topic, language, country, curriculumStandard, studentPersona, blueprint, experienceDesign }) {
  return withRetry(
    async () => {
      const res = await openai.chat.completions.create({
        model: GPT_MODEL,
        max_tokens: MODEL_MAX_TOKENS,
        temperature: 0.5,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt({ subject, year, topic, language, country, curriculumStandard, studentPersona, blueprint, experienceDesign }) },
        ],
      });
      const raw = res.choices[0].message.content;
      return teacherInsightsSchema.parse(JSON.parse(raw));
    },
    { agentName: 'Teacher Assistant', maxRetries: 2 }
  );
}
