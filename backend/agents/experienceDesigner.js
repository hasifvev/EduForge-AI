import { openai, GPT_MODEL } from '../openai.js';
import { withRetry } from '../utils/retry.js';
import { experienceSchema } from '../validators/schemas.js';

const SYSTEM_PROMPT = `You are EduForge AI — Learning Experience Designer Agent.
You are a senior educational game designer and instructional designer specialising in Malaysian primary and secondary learners.

Your role is to decide WHAT kind of interactive activities will best teach the given concepts.
You don't create the questions yet — you design the STRATEGY.

Rules:
1. Return ONLY valid JSON — no markdown, no extra text
2. Choose activities that match the cognitive level required
3. Consider Malaysian classroom context (large classes, limited technology)
4. Match game type to concept type:
   - Factual recall → MCQ Quiz
   - Relationships/categories → Drag-and-Drop Matching
   - Sequences/processes → Ordering Game
   - Definitions → Flashcards
5. Justify every design decision`;

const buildPrompt = ({ subject, year, topic, language, blueprint }) => `
Design the learning experience for this lesson.

Subject: ${subject} | Year: ${year} | Topic: ${topic} | Language: ${language}

Educational Blueprint:
${JSON.stringify(blueprint, null, 2)}

Return this EXACT JSON (no extra text):
{
  "primary_activity": "mcq",
  "secondary_activity": "drag_drop",
  "rationale": "Why these activities are best for this topic in ${language}",
  "quiz_focus": "What specific understanding the quiz should test",
  "matching_focus": "What relationships the matching game should reinforce",
  "difficulty_calibration": "How to calibrate difficulty for Year ${year} students",
  "engagement_strategy": "How to make this engaging for Malaysian students this age"
}`;

export async function runExperienceDesigner({ subject, year, topic, language, blueprint }) {
  return withRetry(
    async () => {
      const res = await openai.chat.completions.create({
        model: GPT_MODEL,
        temperature: 0.5,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt({ subject, year, topic, language, blueprint }) },
        ],
      });
      const raw = res.choices[0].message.content;
      return experienceSchema.parse(JSON.parse(raw));
    },
    { agentName: 'Experience Designer', maxRetries: 2 }
  );
}
