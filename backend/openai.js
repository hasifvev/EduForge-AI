import OpenAI from 'openai';

// ─── Groq Setup ───────────────────────────────────────────────────────────────
// Groq is OpenAI-compatible — free, fast, 128k context window.
// Get your FREE key at: https://console.groq.com
// Add to .env: GROQ_API_KEY=gsk_...
// ─────────────────────────────────────────────────────────────────────────────

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const DEMO_MODE = process.env.DEMO_MODE !== 'false'; // default: always demo

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

// llama-3.3-70b-versatile — fast, free, 128k context — perfect for EduForge
export const GPT_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
export const CODEX_MODEL = GPT_MODEL;

