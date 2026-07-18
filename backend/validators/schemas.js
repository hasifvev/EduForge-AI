import { z } from 'zod';

// ─── Agent 1: Curriculum Intelligence ─────────────────────────────────────────
export const blueprintSchema = z.object({
  objectives: z.array(z.string()).min(1).max(7),
  key_concepts: z.array(z.string()).min(1).max(10),
  misconceptions: z.array(z.string()).min(1).max(6),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  summary: z.string(),
  prerequisite_knowledge: z.array(z.string()).optional().default([]),
  real_world_connections: z.array(z.string()).optional().default([]),
  curriculum_alignment: z.string().optional().default(''),
  curriculum_source: z.string().optional().default('General International Framework'),
  confidenceLevel: z.enum(['high', 'inferred', 'general']).optional().default('general'),
  persona_notes: z.string().optional().default(''),
  grade_band: z.enum(['primary', 'lower_secondary', 'upper_secondary', 'pre_university']).optional().default('lower_secondary'),
});

// ─── Agent 2: Experience Designer ─────────────────────────────────────────────
export const experienceSchema = z.object({
  primary_activity: z.enum(['quiz', 'matching']),
  secondary_activity: z.enum(['quiz', 'matching']),
  why_primary_activity: z.string(),
  why_quiz: z.string().optional().default(''),
  why_matching: z.string().optional().default(''),
  rationale: z.string(),
  quiz_focus: z.string(),
  matching_focus: z.string(),
  difficulty_calibration: z.string().optional().default(''),
  engagement_strategy: z.string().optional().default(''),
  confidence_score: z.number().min(0).max(100).optional().default(80),
});

// ─── Agent 3: Content Generator ───────────────────────────────────────────────
const questionSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.array(z.string()).length(4),
  correct: z.string(),
  explanation: z.string().optional().default(''),
});

const pairSchema = z.object({
  id: z.number(),
  term: z.string(),
  definition: z.string(),
});

const worksheetItemSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
  hint: z.string().optional().default(''),
});

export const gameContentSchema = z.object({
  quiz: z.object({
    type: z.literal('mcq'),
    title: z.string(),
    questions: z.array(questionSchema).min(5).max(15),
  }),
  matching: z.object({
    type: z.literal('drag_drop'),
    title: z.string(),
    instruction: z.string(),
    pairs: z.array(pairSchema).min(4).max(12),
  }),
  worksheet: z.object({
    title: z.string(),
    instructions: z.string(),
    items: z.array(worksheetItemSchema).min(4).max(15),
  }).optional(),
});

// ─── Agent 4: Teacher Assistant ───────────────────────────────────────────────
const misconceptionSchema = z.object({
  mistake: z.string(),
  correction: z.string(),
  example: z.string().optional().default(''),
});

export const teacherInsightsSchema = z.object({
  misconceptions: z.array(misconceptionSchema).min(1).max(5),
  teaching_tips: z.array(z.string()).min(1).max(6),
  daily_examples: z.array(z.string()).min(1).max(5),
  intervention_strategy: z.string(),
  extension_activity: z.string(),
  estimated_class_difficulty: z.enum(['easy', 'moderate', 'challenging']).optional().default('moderate'),
  time_estimate_minutes: z.number().optional().default(45),
  differentiation_note: z.string().optional().default(''),
});

// ─── Agent 5: Lesson Evaluator ────────────────────────────────────────────────
export const evaluatorSchema = z.object({
  scores: z.object({
    learning_coverage: z.number().min(0).max(100),
    student_engagement: z.number().min(0).max(100),
    difficulty_balance: z.number().min(0).max(100),
    blooms_taxonomy: z.number().min(0).max(100),
  }),
  overall_score: z.number().min(0).max(100),
  grade: z.enum(['A', 'B', 'C', 'D']).optional().default('B'),
  strengths: z.array(z.string()).min(1).max(5),
  weaknesses: z.array(z.string()).min(0).max(4),
  suggestion: z.string(),
  blooms_levels_present: z.array(z.string()).optional().default([]),
  blooms_levels_missing: z.array(z.string()).optional().default([]),
});

// ─── Study Materials Agent ────────────────────────────────────────────────────

// Flashcards
const flashcardSchema = z.object({
  id: z.number(),
  front: z.string(),
  back: z.string(),
  curriculum_code: z.string().optional().default(''),
  emoji: z.string().optional().default(''),
});

// Study Notes
const notesSectionSchema = z.object({
  heading: z.string(),
  content: z.string(),
  key_points: z.array(z.string()).min(1).max(6),
});

// Mock Exam Question (grade-adaptive — can be simple for primary)
const examQuestionSchema = z.object({
  id: z.number(),
  section: z.string(),
  question: z.string(),
  marks: z.number(),
  expected_answer: z.string(),
  rubric: z.string().optional().default(''),
  question_type: z.enum(['mcq', 'short_answer', 'structured', 'essay', 'fill_blank']).optional().default('short_answer'),
});

// Study Map node (topic learning pathway)
const studyMapNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().max(500).optional().default(''),
  learning_goal: z.string().max(300).optional().default(''),
  example: z.string().max(500).optional().default(''),
  check_question: z.string().max(300).optional().default(''),
  type: z.enum(['root', 'topic', 'subtopic', 'skill']),
  completed: z.boolean().optional().default(false),
  children: z.array(z.lazy(() => studyMapNodeSchema)).optional().default([]),
});

// Study Schedule day entry
const scheduleActivitySchema = z.object({
  time: z.string(),         // e.g. "Day 1", "Week 1 Mon"
  activity: z.string(),
  resource: z.string(),     // e.g. "Flashcards", "Quiz", "Worksheet"
  duration_minutes: z.number(),
  persona_note: z.string().optional().default(''),
});

export const studyMaterialsSchema = z.object({
  flashcards: z.object({
    title: z.string(),
    cards: z.array(flashcardSchema).min(6).max(20),
  }),
  study_notes: z.object({
    title: z.string(),
    subtitle: z.string().optional().default(''),
    grade_band_label: z.string().optional().default(''),
    sections: z.array(notesSectionSchema).min(2).max(6),
  }),
  mock_exam: z.object({
    title: z.string(),
    exam_board: z.string(),
    format_style: z.string(),        // e.g. "SPM Format", "GCSE Style", "Primary Practice Paper"
    duration_minutes: z.number(),
    total_marks: z.number(),
    grade_band: z.string(),
    questions: z.array(examQuestionSchema).min(4).max(20),
  }),
  cloze_passage: z.object({
    title: z.string(),
    passage: z.string(),             // blanks represented as ___(1)___
    blanks: z.array(z.object({
      id: z.number(),
      word: z.string(),
      hint: z.string().optional().default(''),
    })).min(3).max(12),
  }),
  study_map: z.object({
    title: z.string(),
    description: z.string(),
    root: studyMapNodeSchema,
  }),
  study_schedule: z.object({
    title: z.string(),
    persona: z.string(),
    total_weeks: z.number(),
    total_lessons: z.number(),
    overview: z.string(),
    schedule: z.array(scheduleActivitySchema).min(4).max(20),
    differentiation: z.object({
      beginner: z.string(),
      on_level: z.string(),
      gifted: z.string(),
      sen_support: z.string(),
    }).optional(),
  }),
});

// ─── Analytics (server-generated, not AI) ─────────────────────────────────────
export const analyticsSchema = z.object({
  generation_time_ms: z.number(),
  agent_calls: z.number(),
  resources_created: z.number(),
  estimated_time_saved_minutes: z.number(),
  model: z.string(),
  source_confidence: z.enum(['high', 'inferred', 'general']).optional().default('general'),
});
