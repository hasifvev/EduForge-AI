import { z } from 'zod';

// ─── Agent 1: Curriculum Intelligence ─────────────────────────────────────────
export const blueprintSchema = z.object({
  objectives: z.array(z.string()).min(2).max(6),
  key_concepts: z.array(z.string()).min(3).max(10),
  misconceptions: z.array(z.string()).min(1).max(5),
  difficulty: z.enum(['mudah', 'sederhana', 'sukar']),
  summary: z.string().min(20).max(600),
  prerequisite_knowledge: z.array(z.string()).optional().default([]),
  real_world_connections: z.array(z.string()).optional().default([]),
});

// ─── Agent 2: Experience Designer ─────────────────────────────────────────────
export const experienceSchema = z.object({
  primary_activity: z.string(),
  secondary_activity: z.string(),
  rationale: z.string(),
  quiz_focus: z.string(),
  matching_focus: z.string(),
  difficulty_calibration: z.string(),
  engagement_strategy: z.string().optional().default(''),
});

// ─── Agent 3: Content Generator ───────────────────────────────────────────────
const mcqQuestionSchema = z.object({
  id: z.number(),
  question: z.string().min(5),
  options: z.array(z.string()).length(4),
  correct: z.string(),
  explanation: z.string(),
});

const matchingPairSchema = z.object({
  id: z.number(),
  term: z.string().min(1),
  definition: z.string().min(1),
});

const worksheetItemSchema = z.object({
  id: z.number(),
  question: z.string().min(5),
  answer: z.string().min(1),
  hint: z.string().optional().default(''),
});

export const gameContentSchema = z.object({
  quiz: z.object({
    type: z.literal('mcq'),
    title: z.string(),
    questions: z.array(mcqQuestionSchema).min(5).max(15),
  }),
  matching: z.object({
    type: z.literal('drag_drop'),
    title: z.string(),
    instruction: z.string(),
    pairs: z.array(matchingPairSchema).min(4).max(12),
  }),
  worksheet: z.object({
    title: z.string(),
    instructions: z.string(),
    items: z.array(worksheetItemSchema).min(4).max(15),
  }),
});

// ─── Agent 4: Teacher Assistant ───────────────────────────────────────────────
const misconceptionSchema = z.object({
  mistake: z.string(),
  correction: z.string(),
  example: z.string().optional().default(''),
});

export const teacherInsightsSchema = z.object({
  misconceptions: z.array(misconceptionSchema).min(1).max(5),
  teaching_tips: z.array(z.string()).min(2).max(6),
  daily_examples: z.array(z.string()).min(1).max(5),
  intervention_strategy: z.string(),
  extension_activity: z.string().optional().default(''),
  estimated_class_difficulty: z.enum(['mudah', 'sederhana', 'sukar']),
  time_estimate_minutes: z.number().min(20).max(180).optional().default(45),
});
