import pdfParse from 'pdf-parse/lib/pdf-parse.js';

/**
 * Extract plain text from a PDF or TXT buffer uploaded via multer.
 * @param {Express.Multer.File} file - multer file object (buffer in memory)
 * @returns {Promise<string>} extracted text
 */
export async function extractFileText(file) {
  if (file.mimetype === 'text/plain') {
    return file.buffer.toString('utf-8');
  }

  if (file.mimetype === 'application/pdf') {
    const data = await pdfParse(file.buffer);
    const text = data.text?.trim();
    if (!text || text.length < 20) {
      throw new Error('PDF appears to be empty or image-only. Please use a text-based PDF.');
    }
    return text;
  }

  throw new Error(`Unsupported file type: ${file.mimetype}`);
}
