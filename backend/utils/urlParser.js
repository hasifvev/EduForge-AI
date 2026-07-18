import dns from 'node:dns/promises';
import net from 'node:net';
import { extractFileText } from './fileParser.js';
import { extractImageText } from './imageParser.js';

const MAX_REMOTE_BYTES = 2 * 1024 * 1024;
const MAX_EXTRACTED_TEXT_CHARS = 6000;

function isPrivateAddress(address) {
  if (net.isIP(address) === 4) {
    return /^(127\.|10\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(address);
  }
  return address === '::1' || address.startsWith('fc') || address.startsWith('fd') || address.startsWith('fe80');
}

async function validateRemoteUrl(value) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Use a public http or https URL.');
  }
  if (url.hostname === 'localhost' || net.isIP(url.hostname) && isPrivateAddress(url.hostname)) {
    throw new Error('Private network URLs are not allowed.');
  }
  const addresses = await dns.lookup(url.hostname, { all: true });
  if (addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new Error('Private network URLs are not allowed.');
  }
  return url;
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function extractUrlText(value) {
  let url = await validateRemoteUrl(value);
  let response;
  for (let redirects = 0; redirects <= 3; redirects++) {
    response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(10000) });
    if (![301, 302, 303, 307, 308].includes(response.status)) break;
    const next = response.headers.get('location');
    if (!next) throw new Error('The material link has an invalid redirect.');
    url = await validateRemoteUrl(new URL(next, url).toString());
  }
  if (!response?.ok) throw new Error(`Could not read the material link (HTTP ${response?.status || 'error'}).`);

  const contentType = response.headers.get('content-type') || '';
  const contentLength = Number(response.headers.get('content-length') || 0);
  if (contentLength > MAX_REMOTE_BYTES) throw new Error('The linked material is above the 2 MB link limit.');

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length > MAX_REMOTE_BYTES) throw new Error('The linked material is above the 2 MB link limit.');
  if (contentType.includes('pdf') || url.pathname.toLowerCase().endsWith('.pdf')) {
    return extractFileText({ mimetype: 'application/pdf', buffer });
  }
  if (contentType.startsWith('image/')) {
    return extractImageText(buffer);
  }
  if (!contentType.includes('text/') && !contentType.includes('html')) {
    throw new Error('The link must point to a PDF, TXT, image, or public web page.');
  }
  const text = htmlToText(buffer.toString('utf8'));
  if (text.length < 20) throw new Error('The linked page does not contain readable lesson text.');
  return text.slice(0, MAX_EXTRACTED_TEXT_CHARS);
}
