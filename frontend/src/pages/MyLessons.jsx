import { useRef, useState } from 'react';
import { clearLocalLessons, deleteLocalLesson, duplicateLocalLesson, exportLocalLessons, importLocalLessons, listLocalLessons } from '../lib/localLessons.js';

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function downloadBackup() {
  const blob = new Blob([exportLocalLessons()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `ilmueducator-lessons-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function MyLessons({ onBack, onOpenLesson }) {
  const fileInput = useRef(null);
  const [lessons, setLessons] = useState(listLocalLessons);
  const [notice, setNotice] = useState('');
  const refresh = () => setLessons(listLocalLessons());
  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try { const count = importLocalLessons(await file.text()); refresh(); setNotice(`${count} lesson${count === 1 ? '' : 's'} restored on this device.`); }
    catch (error) { setNotice(error.message || 'The backup could not be restored.'); }
    event.target.value = '';
  };
  const handleDelete = (id) => { deleteLocalLesson(id); refresh(); setNotice('Lesson removed from this device.'); };
  const handleDuplicate = (id) => { const copy = duplicateLocalLesson(id); refresh(); if (copy) setNotice('A fresh copy is ready in your library.'); };
  const handleClear = () => { if (!window.confirm('Remove every saved lesson from this browser? Export a backup first if you may need them later.')) return; clearLocalLessons(); refresh(); setNotice('All saved lessons were removed from this device.'); };

  return <main className="library-main"><section className="library-card"><div className="library-header"><div><span className="teach-eyebrow">PRIVATE LESSON LIBRARY</span><h1>My Lessons</h1><p>Saved only in this browser. Export a backup before clearing browser data.</p></div><button className="teach-back" onClick={onBack}>← Back to lesson builder</button></div><div className="library-actions"><button className="teach-primary" onClick={downloadBackup} disabled={!lessons.length}>Export backup</button><button className="new-lesson-btn" onClick={() => fileInput.current?.click()}>Restore backup</button><button className="library-danger" onClick={handleClear} disabled={!lessons.length}>Clear all</button><input ref={fileInput} className="visually-hidden" type="file" accept="application/json,.json" onChange={handleImport} /></div>{notice && <p className="library-notice" role="status">{notice}</p>}{!lessons.length ? <div className="library-empty"><span>📚</span><h2>No saved lessons yet</h2><p>Generate a lesson and it will appear here automatically, only on this device.</p><button className="teach-primary" onClick={onBack}>Create a lesson</button></div> : <div className="library-grid">{lessons.map((lesson) => { const completed = lesson.teachSession?.completed?.length || 0; const objectives = lesson.result?.lesson?.objectives?.length || 0; return <article className="library-lesson" key={lesson.id}><div className="library-lesson-top"><span>{lesson.subject}</span><time dateTime={lesson.updatedAt}>{formatDate(lesson.updatedAt)}</time></div><h2>{lesson.title}</h2><p>{[lesson.year, lesson.country].filter(Boolean).join(' · ') || 'Lesson plan'}</p>{lesson.teachSession && <div className="library-progress">{completed}/{objectives} objectives · {lesson.teachSession.status}</div>}<div className="library-lesson-actions"><button className="teach-primary" onClick={() => onOpenLesson(lesson)}>Open lesson</button><button className="new-lesson-btn" onClick={() => handleDuplicate(lesson.id)}>Duplicate</button><button className="library-delete" aria-label={`Delete ${lesson.title}`} onClick={() => handleDelete(lesson.id)}>Delete</button></div></article>; })}</div>}</section></main>;
}
