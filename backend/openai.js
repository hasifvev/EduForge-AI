import OpenAI from 'openai';

const DEMO_MODE = process.env.DEMO_MODE !== 'false';
export const AI_PROVIDER = process.env.AI_PROVIDER === 'groq' ? 'groq' : 'openai';

const apiKey = AI_PROVIDER === 'groq' ? process.env.GROQ_API_KEY : process.env.OPENAI_API_KEY;
if (!DEMO_MODE && !apiKey) {
  throw new Error(`${AI_PROVIDER === 'groq' ? 'GROQ_API_KEY' : 'OPENAI_API_KEY'} is not set. Add it to your environment or set DEMO_MODE=true.`);
}

export const openai = new OpenAI({
  apiKey: apiKey || 'demo-mode',
  ...(AI_PROVIDER === 'groq' ? { baseURL: 'https://api.groq.com/openai/v1' } : {}),
});

export const GPT_MODEL = AI_PROVIDER === 'groq'
  ? (process.env.GROQ_MODEL || 'llama-3.3-70b-versatile')
  : (process.env.OPENAI_MODEL || 'gpt-4.1-mini');
export const CODEX_MODEL = GPT_MODEL;