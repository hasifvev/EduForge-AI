import { openai, GPT_MODEL } from '../openai.js';
import { withRetry } from '../utils/retry.js';
import { teacherInsightsSchema } from '../validators/schemas.js';

const SYSTEM_PROMPT = `You are EduForge AI — Teacher Assistant Agent.
You are an experienced Malaysian school mentor and instructional coach who supports classroom teachers.

Your role is to provide actionable teaching insights that help teachers deliver this lesson effectively.

Rules:
1. Return ONLY valid JSON — no markdown, no extra text
2. Be specific and actionable — avoid generic advice
3. Use real Malaysian daily-life examples
4. Reference actual student challenges in Malaysian classrooms
5. Teaching tips should be immediately applicable
6. All content in the specified language`;

const buildPrompt = ({ subject, year, topic, language, blueprint, experienceDesign }) => `
Provide teaching insights for this Malaysian school lesson.

Subject: ${subject} | Year: ${year} | Topic: ${topic} | Language: ${language}

Educational Blueprint:
${JSON.stringify({ misconceptions: blueprint.misconceptions, key_concepts: blueprint.key_concepts, real_world_connections: blueprint.real_world_connections }, null, 2)}

Experience Design:
${JSON.stringify({ rationale: experienceDesign.rationale, difficulty_calibration: experienceDesign.difficulty_calibration }, null, 2)}

Return this EXACT JSON (no extra text):
{
  "misconceptions": [
    {
      "mistake": "Common student mistake in ${language}",
      "correction": "How to correct it in ${language}",
      "example": "Classroom example using Malaysian context"
    }
  ],
  "teaching_tips": ["Array of 4 specific, actionable teaching tips in ${language}"],
  "daily_examples": ["Array of 3 Malaysian daily-life examples to open the lesson in ${language}"],
  "intervention_strategy": "What to do if most students struggle — specific action in ${language}",
  "extension_activity": "Challenge activity for fast finishers in ${language}",
  "estimated_class_difficulty": "mudah|sederhana|sukar",
  "time_estimate_minutes": 45
}

Generate 3 misconceptions with corrections, 4 teaching tips, 3 Malaysian daily-life examples.`;

export async function runTeacherAssistant({ subject, year, topic, language, blueprint, experienceDesign }) {
  return withRetry(
    async () => {
      const res = await openai.chat.completions.create({
        model: GPT_MODEL,
        temperature: 0.5,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt({ subject, year, topic, language, blueprint, experienceDesign }) },
        ],
      });
      const raw = res.choices[0].message.content;
      return teacherInsightsSchema.parse(JSON.parse(raw));
    },
    { agentName: 'Teacher Assistant', maxRetries: 2 }
  );
}
