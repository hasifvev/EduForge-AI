import { openai, GPT_MODEL } from '../openai.js';
import { withRetry } from '../utils/retry.js';
import { gameContentSchema } from '../validators/schemas.js';

const SYSTEM_PROMPT = `You are EduForge AI — Content Generator Agent.
You are a master question writer for Malaysian school assessments with expertise in KSSR/KSSM standards.

Your role is to create the actual questions, options, answers, and game content based on the educational blueprint and experience design.

Rules:
1. Return ONLY valid JSON — no markdown, no extra text
2. MCQ options MUST be formatted as "A. text", "B. text", "C. text", "D. text"
3. correct field MUST exactly match one of the options strings
4. Distractors must be plausible (common misconceptions) — not obviously wrong
5. Matching pairs must have EXACTLY 8 pairs
6. Generate exactly 10 MCQ questions
7. Generate exactly 8 worksheet fill-in-the-blank items
8. All content in the specified language
9. Use Malaysian cultural context in examples`;

const buildPrompt = ({ subject, year, topic, language, blueprint, experienceDesign }) => `
Create the game content for this Malaysian school lesson.

Subject: ${subject} | Year: ${year} | Topic: ${topic} | Language: ${language}

Educational Blueprint:
${JSON.stringify(blueprint, null, 2)}

Experience Design Strategy:
${JSON.stringify(experienceDesign, null, 2)}

Return this EXACT JSON (no extra text):
{
  "quiz": {
    "type": "mcq",
    "title": "Quiz title in ${language}",
    "questions": [
      {
        "id": 1,
        "question": "Question text in ${language}",
        "options": ["A. option1", "B. option2", "C. option3", "D. option4"],
        "correct": "A. option1",
        "explanation": "Explanation in ${language}"
      }
    ]
  },
  "matching": {
    "type": "drag_drop",
    "title": "Matching title in ${language}",
    "instruction": "Instruction in ${language}",
    "pairs": [
      { "id": 1, "term": "Term in ${language}", "definition": "Definition in ${language}" }
    ]
  },
  "worksheet": {
    "title": "Worksheet title in ${language}",
    "instructions": "Instructions in ${language}",
    "items": [
      { "id": 1, "question": "Fill-in-the-blank in ${language}", "answer": "correct answer", "hint": "optional hint" }
    ]
  }
}

IMPORTANT: Generate exactly 10 quiz questions, exactly 8 matching pairs, exactly 8 worksheet items.`;

export async function runContentGenerator({ subject, year, topic, language, blueprint, experienceDesign }) {
  return withRetry(
    async () => {
      const res = await openai.chat.completions.create({
        model: GPT_MODEL,
        temperature: 0.6,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt({ subject, year, topic, language, blueprint, experienceDesign }) },
        ],
      });
      const raw = res.choices[0].message.content;
      return gameContentSchema.parse(JSON.parse(raw));
    },
    { agentName: 'Content Generator', maxRetries: 2 }
  );
}
