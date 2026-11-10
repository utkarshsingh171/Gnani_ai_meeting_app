/**
 * Background Service Worker (Manifest V3)
 *
 * Gnani (speech-to-text) and Gemini (report) requests are made here rather than from the
 * content script. A content script's fetch() is subject to the host page's CORS / CSP rules
 * (YouTube, Zoom and Meet all restrict connect-src), while the service worker is only
 * governed by this extension's host_permissions.
 */

const GNANI_ENDPOINT = 'https://api.vachana.ai/stt/v3';
// Gnani requires a single language code (e.g. hi-IN, en-IN). Change it here and in content/dock.js.
// Prisma v3.0 accepts 1-4 comma-separated language hints, so Hindi + English works in one request.
// The transcript follows the language actually spoken. Keep these in sync with content/dock.js.
const GNANI_MODEL = 'prisma-v3.0';
const GNANI_LANGUAGE_CODE = 'hi-IN,en-IN';
const GNANI_FORMAT = 'codemix'; // keeps English words in Latin script inside Hindi sentences
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Gnani Zoom AI Meeting Dock installed successfully.');
});

function base64ToBlob(b64, type = 'audio/wav') {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type });
}

function silentWavBase64(seconds = 1, rate = 16000) {
  const dataSize = seconds * rate * 2;
  const buf = new Uint8Array(44 + dataSize);
  const view = new DataView(buf.buffer);
  const str = (o, s) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };
  str(0, 'RIFF'); view.setUint32(4, 36 + dataSize, true); str(8, 'WAVE'); str(12, 'fmt ');
  view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true);
  view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  str(36, 'data'); view.setUint32(40, dataSize, true);
  let bin = '';
  for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
  return btoa(bin);
}

async function gnaniTranscribe({ apiKey, audioBase64, fileName }) {
  if (!apiKey) return { ok: false, status: 0, error: 'Gnani STT key is missing.' };

  const form = new FormData();
  form.append('audio_file', base64ToBlob(audioBase64), fileName || 'meeting-chunk.wav');
  form.append('model', GNANI_MODEL);
  form.append('language_code', GNANI_LANGUAGE_CODE);
  form.append('format', GNANI_FORMAT);

  let res;
  try {
    res = await fetch(GNANI_ENDPOINT, { method: 'POST', headers: { 'X-API-Key-ID': apiKey }, body: form });
  } catch (err) {
    return { ok: false, status: 0, error: `Network error reaching Gnani: ${err.message}` };
  }

  const text = await res.text();
  if (!res.ok) return { ok: false, status: res.status, error: `Gnani API ${res.status}: ${text.slice(0, 300)}` };

  let data = text;
  try { data = JSON.parse(text); } catch (_) {}
  const transcript = typeof data === 'string'
    ? data
    : (data.transcript || data.text || (data.data && data.data.transcript) || '');
  return { ok: true, transcript };
}

async function geminiGenerate({ apiKey, payload, models }) {
  if (!apiKey) return { ok: false, status: 0, error: 'Google Gemini API key is missing.' };
  let lastError = 'Failed to reach Google Gemini.';

  for (const model of models || ['gemini-3.1-flash-lite', 'gemini-flash-latest']) {
    try {
      const res = await fetch(`${GEMINI_BASE}/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = (err && err.error && err.error.message) || res.statusText;
        lastError = `Gemini (${model}) ${res.status}: ${msg}`;
        if ([404, 429, 503].includes(res.status)) continue;   // try the next model
        return { ok: false, status: res.status, error: lastError };
      }
      const data = await res.json();
      const parts = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts;
      const text = (parts || []).map(p => p.text || '').join('');
      if (!text) { lastError = `Gemini (${model}) returned an empty response.`; continue; }
      return { ok: true, text };
    } catch (err) {
      lastError = `Network error reaching Gemini: ${err.message}`;
    }
  }
  return { ok: false, status: 0, error: lastError };
}

async function validateKey({ service, apiKey }) {
  if (!apiKey) return { ok: false, message: 'Paste a key first.' };

  if (service === 'gemini') {
    try {
      const res = await fetch(`${GEMINI_BASE}?pageSize=1`, { headers: { 'x-goog-api-key': apiKey } });
      if (res.ok) return { ok: true, message: 'Google accepted this key.' };
      const err = await res.json().catch(() => ({}));
      return { ok: false, message: (err && err.error && err.error.message) || `Google returned HTTP ${res.status}.` };
    } catch (err) {
      return { ok: false, message: `Could not reach Google: ${err.message}` };
    }
  }

  if (service === 'gnani') {
    // Gnani has no key-check endpoint, so send one second of silence and look at the status code.
    const r = await gnaniTranscribe({ apiKey, audioBase64: silentWavBase64(), fileName: 'key-check.wav' });
    if (r.ok) return { ok: true, message: 'Gnani accepted this key.' };
    if (r.status === 401 || r.status === 403) return { ok: false, message: r.error };
    if (r.status >= 400 && r.status < 500) return { ok: true, message: `Gnani did not reject the key (the silent test clip returned HTTP ${r.status}).` };
    return { ok: false, message: r.error };
  }

  return { ok: false, message: 'Unknown service.' };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const handlers = {
    GNANI_TRANSCRIBE: gnaniTranscribe,
    GEMINI_GENERATE: geminiGenerate,
    VALIDATE_KEY: validateKey
  };
  const handler = request && handlers[request.action];
  if (handler) {
    handler(request)
      .then(sendResponse)
      .catch(err => sendResponse({ ok: false, status: 0, error: err.message }));
    return true; // keep the channel open for the async response
  }
  return false;
});
