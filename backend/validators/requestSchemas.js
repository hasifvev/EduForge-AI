import { z } from 'zod';

const safeText = (max) => z.string().trim().min(1).max(max);
const optionalText = (max) => z.string().trim().max(max).optional().default('');

export const generateRequestSchema = z.object({
    subject: safeText(80),
    year: safeText(80),
    topic: safeText(160),
    language: optionalText(40).default('English'),
    objectives: optionalText(1200),
    extractedText: optionalText(6000),
    country: optionalText(80),
    curriculumStandard: optionalText(160),
    studentPersona: z.enum(['Beginner', 'Mixed Ability', 'On-Level', 'Gifted & Talented', 'SEN Support']).optional().default('On-Level'),
});

export const performanceRequestSchema = z.object({
    topic: safeText(160),
    language: optionalText(40).default('English'),
    results: z.array(z.object({}).passthrough()).min(1).max(100),
});

export function parseRequest(schema, body) {
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
        const message = parsed.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('; ');
        const err = new Error(message || 'Invalid request body');
        err.statusCode = 400;
        throw err;
    }
    return parsed.data;
}
