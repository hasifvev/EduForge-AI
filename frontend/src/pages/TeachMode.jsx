import { useMemo, useState } from 'react';

export default function TeachMode({ result, initialSession, onSaveSession, onBack }) {
  const objectives = result.lesson?.objectives || [];
  const [session, setSession] = useState(() => initialSession || ({
    id: crypto.randomUUID(), title: `${result.subject || 'Lesson'}: ${result.topic || 'Live lesson'}`,
    startedAt: new Date().toISOString(), completed: [], reflection: '', status: 'ready',
  }));
  const completedCount = useMemo(() => session.completed.length, [session.completed]);
  const update = (change) => setSession((current) => {
    const next = { ...current, ...change }; onSaveSession?.(next); return next;
  });
  const toggleObjective = (index) => update({ completed: session.completed.includes(index) ? session.completed.filter((item) => item !== index) : [...session.completed, index] });
  return <main className="teach-main"><button className="teach-back" onClick={onBack}>← Back to materials</button><section className="teach-card"><span className="teach-eyebrow">PRIVATE TEACH MODE</span><h1>{result.topic}</h1><p>{result.subject} · {result.year} · saved only in this browser.</p><div className="teach-stats"><div><strong>{completedCount}/{objectives.length}</strong><span>objectives completed</span></div><div><strong>{session.status}</strong><span>lesson status</span></div></div><div className="teach-objectives"><h2>Lesson flow</h2><ol>{objectives.map((objective, index) => <li key={objective}><label><input type="checkbox" checked={session.completed.includes(index)} onChange={() => toggleObjective(index)} /> {objective}</label></li>)}</ol></div><div className="teach-objectives"><h2>Teacher reflection</h2><textarea value={session.reflection} onChange={(event) => update({ reflection: event.target.value })} maxLength="1000" rows="5" placeholder="Capture misconceptions, what worked, or what to reteach next time…" /></div>{session.status === 'ready' ? <button className="teach-primary" onClick={() => update({ status: 'in progress' })}>Start lesson</button> : <button className="teach-secondary" onClick={() => update({ status: 'completed', completedAt: new Date().toISOString() })}>Complete lesson</button>}<p className="teach-local-note">This device keeps the lesson plan and your reflection locally. Nothing is sent to a cloud service.</p></section></main>;
}
