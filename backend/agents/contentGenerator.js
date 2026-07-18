import { openai, GPT_MODEL, MODEL_MAX_TOKENS } from '../openai.js';
import { withRetry } from '../utils/retry.js';
import { gameContentSchema } from '../validators/schemas.js';

const SYSTEM_PROMPT = `You are EduForge AI — Content Generator Agent.
You are a master assessment writer with expertise in creating high-quality educational content for any curriculum worldwide.

Your role is to create the actual questions, options, answers, and game content for any teacher, any grade, any country.

Rules:
1. Return ONLY valid JSON — no markdown, no extra text
2. MCQ options MUST be formatted as "A. text", "B. text", "C. text", "D. text"
3. correct field MUST exactly match one of the options strings
4. Distractors must be plausible (common misconceptions) — not obviously wrong
5. Adjust difficulty based on student persona:
   - Beginner: straightforward recall, simple language, 3 obvious wrong answers
   - On-Level: mix of recall and application, plausible distractors
   - Mixed Ability: tiered difficulty across questions
   - Gifted: higher-order thinking, evaluation and synthesis questions
   - SEN Support: simple language, visual cues in question text, clear formatting
6. Use real-life examples from the teacher's country/region
7. Worksheet items must progress from recall to application and use the named curriculum framework only as a practice alignment, never as an official examination.
8. Follow the exact resource counts requested in the user prompt`;

const buildPrompt = ({ subject, year, topic, language, country, studentPersona, blueprint, experienceDesign }) => {
  const compactLive = process.env.DEMO_MODE === 'false';
  // Keep live lessons substantial enough for a complete classroom activity.
  // These counts remain within one structured response, so they do not add API calls.
  const questionCount = compactLive ? 10 : 12;
  const pairCount = compactLive ? 8 : 10;
  const worksheetCount = compactLive ? 8 : 10;
  return `
Create educational game content for this lesson.

Context:
- Subject: ${subject} | Grade: ${year} | Topic: ${topic}
- Language: ${language} | Country: ${country || 'International'}
- Student Persona: ${studentPersona || 'On-Level'}
- Curriculum: ${blueprint.curriculum_source || 'General framework'}

Educational Blueprint:
${JSON.stringify({ objectives: blueprint.objectives.slice(0, 3), key_concepts: blueprint.key_concepts, difficulty: blueprint.difficulty }, null, 2)}

Experience Design:
${JSON.stringify({ primary_activity: experienceDesign.primary_activity, quiz_focus: experienceDesign.quiz_focus, matching_focus: experienceDesign.matching_focus, difficulty_calibration: experienceDesign.difficulty_calibration }, null, 2)}

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
        "explanation": "Clear explanation in ${language} — why this is correct and common mistakes to avoid"
      }
    ]
  },
  "matching": {
    "type": "drag_drop",
    "title": "Matching title in ${language}",
    "instruction": "Drag each term to its correct definition in ${language}",
    "pairs": [
      { "id": 1, "term": "Term in ${language}", "definition": "Definition in ${language}" }
    ]
  },
  "worksheet": {
    "title": "Worksheet title in ${language}",
    "instructions": "Mixed-format, curriculum-aligned practice instructions in ${language}",
    "items": [
      { "id": 1, "question": "Grade-appropriate practice question in ${language}", "answer": "model answer", "hint": "optional hint" }
    ]
  }
}

CRITICAL: Generate exactly ${questionCount} quiz questions, exactly ${pairCount} matching pairs, exactly ${worksheetCount} worksheet items.
Adjust all difficulty to match ${studentPersona || 'On-Level'} persona.
Use real-world examples from ${country || 'the student context'}.`;
};

export async function runContentGenerator({ subject, year, topic, language, country, studentPersona, blueprint, experienceDesign }) {
  return withRetry(
    async () => {
      const res = await openai.chat.completions.create({
        model: GPT_MODEL,
        max_tokens: MODEL_MAX_TOKENS,
        temperature: 0.6,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt({ subject, year, topic, language, country, studentPersona, blueprint, experienceDesign }) },
        ],
      });
      const raw = res.choices[0].message.content;
      return gameContentSchema.parse(JSON.parse(raw));
    },
    { agentName: 'Content Generator', maxRetries: 2 }
  );
}
