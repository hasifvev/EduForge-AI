import OpenAI from 'openai';

// ─── Groq Setup ───────────────────────────────────────────────────────────────
// Groq is OpenAI-compatible — we use the same openai SDK, just point it at Groq.
// Get your FREE API key at: https://console.groq.com
// ─────────────────────────────────────────────────────────────────────────────

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const DEMO_MODE = process.env.DEMO_MODE === 'true';

if (!DEMO_MODE && !GROQ_API_KEY) {
  throw new Error(
    '❌  GROQ_API_KEY is not set.\n' +
    '    1. Go to https://console.groq.com and sign up (free)\n' +
    '    2. Create an API key\n' +
    '    3. Add it to your .env file: GROQ_API_KEY=gsk_...\n' +
    '    OR set DEMO_MODE=true to run without any API key.'
  );
}

export const openai = new OpenAI({
  apiKey: GROQ_API_KEY || 'demo-mode',
  baseURL: 'https://api.groq.com/openai/v1',
});

// llama-3.3-70b-versatile — best free model on Groq
// Fast, supports JSON mode, 128k context window
export const GPT_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
export const CODEX_MODEL = GPT_MODEL; // Same model for all agents on Groq
