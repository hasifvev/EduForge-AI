const STORAGE_KEY = 'ilmueducator:local-lessons:v1';
const LEGACY_STORAGE_KEYS = ['eduhelp:local-lessons:v1', 'eduforge:local-lessons:v1'];
const MAX_LESSONS = 20;

const createId = () => globalThis.crypto?.randomUUID?.() || `lesson-${Date.now()}-${Math.random().toString(16).slice(2)}`;

function readStoreForKey(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value.filter((item) => item?.id && item?.result) : [];
  } catch {
    return [];
  }
}

function readStore() {
  try {
    if (localStorage.getItem(STORAGE_KEY) !== null) return readStoreForKey(STORAGE_KEY);
    for (const key of LEGACY_STORAGE_KEYS) {
      const legacy = readStoreForKey(key);
      if (legacy.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));
        return legacy;
      }
    }
    return [];
  } catch {
    return [];
  }
}

function writeStore(lessons) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons.slice(0, MAX_LESSONS)));
}

function metadata(result) {
  return { title: result.topic || 'Untitled lesson', subject: result.subject || 'General', year: result.year || '', country: result.country || '' };
}

export function listLocalLessons() {
  return readStore().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function saveLocalLesson(result, existingId) {
  const now = new Date().toISOString();
  const lessons = readStore();
  const existing = lessons.find((item) => item.id === existingId);
  const next = { id: existing?.id || createId(), createdAt: existing?.createdAt || now, updatedAt: now, ...metadata(result), result, teachSession: existing?.teachSession || null };
  writeStore([next, ...lessons.filter((item) => item.id !== next.id)]);
  return next;
}

export function updateLocalTeachSession(id, teachSession) {
  const lessons = readStore();
  const existing = lessons.find((item) => item.id === id);
  if (!existing) return null;
  const next = { ...existing, teachSession, updatedAt: new Date().toISOString() };
  writeStore([next, ...lessons.filter((item) => item.id !== id)]);
  return next;
}

export function duplicateLocalLesson(id) {
  const source = readStore().find((item) => item.id === id);
  if (!source) return null;
  const now = new Date().toISOString();
  const copy = { ...source, id: createId(), title: `${source.title} (copy)`, createdAt: now, updatedAt: now, teachSession: null };
  writeStore([copy, ...readStore()]);
  return copy;
}

export function deleteLocalLesson(id) { writeStore(readStore().filter((item) => item.id !== id)); }
export function clearLocalLessons() { localStorage.removeItem(STORAGE_KEY); }
export function exportLocalLessons() { return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), lessons: listLocalLessons() }, null, 2); }

export function importLocalLessons(serialized) {
  const payload = JSON.parse(serialized);
  if (!payload || !Array.isArray(payload.lessons)) throw new Error('That file is not an IlmuEducator lesson backup.');
  const valid = payload.lessons.filter((item) => item?.result && typeof item.result === 'object').map((item) => ({ ...item, id: item.id || createId(), createdAt: item.createdAt || new Date().toISOString(), updatedAt: item.updatedAt || new Date().toISOString(), ...metadata(item.result), teachSession: item.teachSession || null }));
  if (!valid.length) throw new Error('That backup does not contain any usable lessons.');
  const importedIds = new Set(valid.map((item) => item.id));
  writeStore([...valid, ...readStore().filter((item) => !importedIds.has(item.id))]);
  return valid.length;
}
