import { useState, useCallback } from 'react';

// In production (Vercel), frontend + backend share the same domain — use relative URLs.
// In local dev, proxy in vite.config.js handles /api → localhost:3001.
const API = import.meta.env.VITE_API_URL || '';

export function useGeneration() {
  const [status, setStatus] = useState('idle'); // idle | uploading | generating | complete | error
  const [step, setStep] = useState(0); // 0-4 for 5 agents
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const uploadFile = useCallback(async (file) => {
    setStatus('uploading');
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${API}/api/extract`, { method: 'POST', body: form });
    if (!res.ok) throw new Error('File extraction failed');
    const data = await res.json();
    return data.text;
  }, []);

  const generate = useCallback(async ({
    subject, year, topic, language, objectives, file,
    country, curriculumStandard, studentPersona,
  }) => {
    setStatus('generating');
    setStep(0);
    setError(null);
    setResult(null);

    try {
      let extractedText = '';
      if (file) {
        setStatus('uploading');
        extractedText = await uploadFile(file);
        setStatus('generating');
      }

      // Simulate 5-agent progress (each agent ~3-5s, evaluator faster)
      const stepTimers = [
        setTimeout(() => setStep(1), 3000),   // Agent 2 starts
        setTimeout(() => setStep(2), 7000),   // Agent 3 starts
        setTimeout(() => setStep(3), 11000),  // Agent 4 starts
        setTimeout(() => setStep(4), 15000),  // Agent 5 (Evaluator) starts
      ];

      const res = await fetch(`${API}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject, year, topic, language, objectives, extractedText,
          country: country || '',
          curriculumStandard: curriculumStandard || '',
          studentPersona: studentPersona || 'On-Level',
        }),
      });

      stepTimers.forEach(clearTimeout);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Generation failed');
      }

      const data = await res.json();
      setStep(5); // all done
      setResult(data);
      setStatus('complete');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }, [uploadFile]);

  const reset = useCallback(() => {
    setStatus('idle');
    setStep(0);
    setResult(null);
    setError(null);
  }, []);

  return { status, step, result, error, generate, reset };
}
