import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { extractImageText } from './imageParser.js';

const MAX_EXTRACTED_TEXT_CHARS = 6000;

function limitExtractedText(text) {
  const trimmed = text?.trim() || '';
  if (!trimmed || trimmed.length < 20) throw new Error('File appears to be empty or image-only. Please use a text-based PDF or TXT file.');
  return trimmed.slice(0, MAX_EXTRACTED_TEXT_CHARS);
}

/**
 * Extract plain text from a PDF or TXT buffer uploaded via multer.
 * @param {Express.Multer.File} file - multer file object (buffer in memory)
 * @returns {Promise<string>} extracted text
 */
export async function extractFileText(file) {
  if (file.mimetype === 'text/plain') {
    return limitExtractedText(file.buffer.toString('utf-8'));
  }

  if (file.mimetype === 'application/pdf') {
    const data = await pdfParse(file.buffer);
    return limitExtractedText(data.text);
  }

  if (['image/png', 'image/jpeg', 'image/webp'].includes(file.mimetype)) {
    return limitExtractedText(await extractImageText(file.buffer));
  }

  throw new Error(`Unsupported file type: ${file.mimetype}`);
}
