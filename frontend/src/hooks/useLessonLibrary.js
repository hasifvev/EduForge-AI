import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ilmueducator.lesson-library.v1';
const LEGACY_STORAGE_KEYS = ['eduhelp.lesson-library.v1', 'eduforge.lesson-library.v1'];
const MAX_SAVED_LESSONS = 12;

function readLibraryForKey(key) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(key) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function readLibrary() {
  try {
    if (window.localStorage.getItem(STORAGE_KEY) !== null) return readLibraryForKey(STORAGE_KEY);
    for (const key of LEGACY_STORAGE_KEYS) {
      const legacy = readLibraryForKey(key);
      if (legacy.length) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));
        return legacy;
      }
    }
    return [];
  } catch {
    return [];
  }
}

export function useLessonLibrary() {
  const [lessons, setLessons] = useState(readLibrary);
  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons)); } catch {}
  }, [lessons]);
  const saveLesson = useCallback((result) => {
    const id = result.generation_id || `lesson_${Date.now()}`;
    const lesson = { id, savedAt: new Date().toISOString(), title: result.topic || 'Untitled lesson', subject: result.subject || '', year: result.year || '', result };
    setLessons(current => [lesson, ...current.filter(item => item.id !== id)].slice(0, MAX_SAVED_LESSONS));
  }, []);
  const deleteLesson = useCallback((id) => setLessons(current => current.filter(lesson => lesson.id !== id)), []);
  return { lessons, saveLesson, deleteLesson };
}
