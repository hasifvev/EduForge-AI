import { createWorker } from 'tesseract.js';

const MAX_EXTRACTED_TEXT_CHARS = 6000;

export async function extractImageText(buffer) {
  const worker = await createWorker('eng');
  try {
    const { data } = await worker.recognize(buffer);
    const text = (data.text || '').replace(/\s+/g, ' ').trim();
    if (text.length < 20) {
      throw new Error('No readable text was found in this image. Use a clear, well-lit image of printed text.');
    }
    return text.slice(0, MAX_EXTRACTED_TEXT_CHARS);
  } finally {
    await worker.terminate();
  }
}
