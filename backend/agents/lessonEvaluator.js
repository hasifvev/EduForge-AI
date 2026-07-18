import { openai, GPT_MODEL, MODEL_MAX_TOKENS } from '../openai.js';
import { withRetry } from '../utils/retry.js';
import { evaluatorSchema } from '../validators/schemas.js';

/**
 * EduForge AI — Lesson Evaluator Agent (Agent 5)
 * GPT-5.6 evaluating its own output.
 * Reviews the entire generated lesson and scores it on 4 educational dimensions.
 * This is the "AI judges AI" feature — unique to EduForge AI.
 */

const SYSTEM_PROMPT = `You are EduForge AI — Lesson Evaluator Agent.
You are a senior educational assessment expert and curriculum auditor.

Your role is to critically evaluate the generated lesson content and provide an honest quality assessment.
You are reviewing the work of other AI agents — be rigorous, not generous.

Scoring dimensions:
1. LEARNING COVERAGE (0-100): Do the activities cover all stated learning objectives? Are key concepts tested?
2. STUDENT ENGAGEMENT (0-100): How likely are students to stay engaged? Are activities varied and motivating?
3. DIFFICULTY BALANCE (0-100): Is difficulty appropriate for the student persona? Good progression from easy to hard?
4. BLOOM'S TAXONOMY (0-100): Does the content span multiple cognitive levels (Recall, Understanding, Application, Analysis)?

Rules:
1. Return ONLY valid JSON — no markdown, no extra text
2. Be HONEST — a score of 65 is fine if that's accurate. Don't inflate scores.
3. Strengths must be specific to THIS lesson, not generic praise
4. Weaknesses must be actionable — what specifically is missing?
5. One concrete suggestion for improvement
6. Overall score = weighted average of the 4 dimensions`;

const buildPrompt = ({ subject, year, topic, language, studentPersona, blueprint, gameContent, teachingInsights }) => `
Evaluate the quality of this generated lesson.

Lesson Details:
- Subject: ${subject} | Grade: ${year} | Topic: ${topic}
- Language: ${language} | Student Persona: ${studentPersona || 'On-Level'}

Learning Objectives:
${blueprint.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

Key Concepts to Cover:
${blueprint.key_concepts.join(', ')}

Generated Quiz (${gameContent.quiz.questions.length} questions):
${gameContent.quiz.questions.slice(0, 5).map(q => `- ${q.question}`).join('\n')}
${gameContent.quiz.questions.length > 5 ? `... and ${gameContent.quiz.questions.length - 5} more` : ''}

Generated Matching (${gameContent.matching.pairs.length} pairs):
${gameContent.matching.pairs.slice(0, 4).map(p => `- ${p.term} → ${p.definition}`).join('\n')}

Worksheet Items: ${gameContent.worksheet.items.length} fill-in-the-blank questions

Misconceptions Addressed:
${teachingInsights.misconceptions.map(m => `- ${m.mistake}`).join('\n')}

Return this EXACT JSON:
{
  "scores": {
    "learning_coverage": 0,
    "student_engagement": 0,
    "difficulty_balance": 0,
    "blooms_taxonomy": 0
  },
  "overall_score": 0,
  "grade": "A|B|C|D",
  "strengths": ["Specific strength 1", "Specific strength 2"],
  "weaknesses": ["Specific weakness 1"],
  "suggestion": "One concrete, actionable improvement for this specific lesson",
  "blooms_levels_present": ["Remember", "Understand", "Apply", "Analyse", "Evaluate", "Create"],
  "blooms_levels_missing": ["Evaluate", "Create"]
}

Be rigorous. Return 1-5 strengths and at most 4 weaknesses. Scores below 70 are fine if the content has genuine gaps. Judges expect honesty.`;

function normalizeLessonEvaluation(evaluation) {
  return {
    ...evaluation,
    strengths: Array.isArray(evaluation?.strengths) ? evaluation.strengths.slice(0, 5) : evaluation?.strengths,
    weaknesses: Array.isArray(evaluation?.weaknesses) ? evaluation.weaknesses.slice(0, 4) : evaluation?.weaknesses,
  };
}
export async function runLessonEvaluator({ subject, year, topic, language, studentPersona, blueprint, gameContent, teachingInsights }) {
  return withRetry(
    async () => {
      const res = await openai.chat.completions.create({
        model: GPT_MODEL,
        max_tokens: MODEL_MAX_TOKENS,
        temperature: 0.3,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt({ subject, year, topic, language, studentPersona, blueprint, gameContent, teachingInsights }) },
        ],
      });
      const raw = res.choices[0].message.content;
      return evaluatorSchema.parse(normalizeLessonEvaluation(JSON.parse(raw)));
    },
    { agentName: 'Lesson Evaluator', maxRetries: 2 }
  );
}
