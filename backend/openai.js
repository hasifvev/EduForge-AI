import OpenAI from 'openai';

// ─── Groq Setup ───────────────────────────────────────────────────────────────
// Groq is OpenAI-compatible — free, fast, 128k context window.
// Get your FREE key at: https://console.groq.com
// Add to .env: GROQ_API_KEY=gsk_...
// ─────────────────────────────────────────────────────────────────────────────

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DEMO_MODE = process.env.DEMO_MODE !== 'false'; // default: always demo

if (!DEMO_MODE && !OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set. Add it to your environment or set DEMO_MODE=true.');
}

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY || 'demo-mode',
});

// llama-3.3-70b-versatile — fast, free, 128k context — perfect for EduForge
export const GPT_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
export const CODEX_MODEL = GPT_MODEL;

