import { useState } from 'react';

const PERSONA_ICONS = { Beginner: '🌱', 'On-Level': '📗', Gifted: '🚀', 'SEN Support': '💛' };
const RESOURCE_ICONS = {
  'Flashcards': '🃏', 'Kad Imbas': '🃏',
  'Quiz': '❓', 'Kuiz': '❓',
  'Matching Game': '🔗', 'Permainan Matching': '🔗', 'Permainan Padanan': '🔗',
  'Study Notes': '📄', 'Nota Pelajaran': '📄', 'Nota': '📄',
  'Mock Exam': '📝', 'Kertas Percubaan': '📝', 'Kertas Percubaan (Penuh)': '📝',
  'Mock Exam (Full)': '📝', 'Mock Exam Mark Scheme': '📋', 'Skema Pemarkahan': '📋',
  'Cloze Passage': '✏️', 'Petikan Cloze': '✏️', 'Isi Tempat Kosong': '✏️',
  'Study Map': '🗺️', 'Peta Belajar': '🗺️',
};

function getResourceIcon(resource) {
  for (const [key, icon] of Object.entries(RESOURCE_ICONS)) {
    if (resource.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return '📚';
}

export default function StudySchedule({ data }) {
  const [activePersona, setActivePersona] = useState('all');
  const [completedDays, setCompletedDays] = useState(new Set());

  if (!data || !data.schedule?.length) return null;

  const toggleDay = (time) => {
    setCompletedDays(s => {
      const n = new Set(s);
      n.has(time) ? n.delete(time) : n.add(time);
      return n;
    });
  };

  const progress = (completedDays.size / data.schedule.length) * 100;

  const personas = ['all', 'beginner', 'on_level', 'gifted', 'sen_support'];
  const personaLabels = {
    all: '👤 All Levels',
    beginner: '🌱 Beginner',
    on_level: '📗 On-Level',
    gifted: '🚀 Gifted',
    sen_support: '💛 SEN Support',
  };

  const printSchedule = () => {
    const w = window.open('', '_blank');
    const html = `<!DOCTYPE html><html><head><title>${data.title}</title>
    <style>
      body { font-family: Arial, sans-serif; max-width: 750px; margin: 40px auto; }
      h1 { font-size: 20px; } h2 { font-size: 15px; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
      table { width: 100%; border-collapse: collapse; margin-top: 12px; }
      th, td { border: 1px solid #ccc; padding: 8px 12px; text-align: left; font-size: 13px; }
      th { background: #f0f0f0; }
      .diff { margin: 24px 0; padding: 12px; background: #f9f9f9; }
      .diff h3 { margin: 0 0 8px; font-size: 14px; }
      .diff p { margin: 4px 0; font-size: 13px; }
    </style></head><body>
    <h1>${data.title}</h1>
    <p>📅 ${data.total_weeks} weeks · ${data.total_lessons} lessons · ${data.overview}</p>
    <table>
      <thead><tr><th>Time</th><th>Activity</th><th>Resource</th><th>Duration</th><th>Notes</th></tr></thead>
      <tbody>
        ${data.schedule.map(d => `
          <tr><td>${d.time}</td><td>${d.activity}</td><td>${d.resource}</td><td>${d.duration_minutes} min</td><td>${d.persona_note || ''}</td></tr>
        `).join('')}
      </tbody>
    </table>
    ${data.differentiation ? `
    <div class="diff">
      <h2>Differentiation Guide</h2>
      ${Object.entries(data.differentiation).map(([k, v]) => `<p><strong>${k.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> ${v}</p>`).join('')}
    </div>` : ''}
    </body></html>`;
    w.document.write(html);
    w.document.close();
    w.print();
  };

  return (
    <div className="schedule-wrapper">
      <div className="sch-header">
        <div>
          <h3 className="sch-title">{data.title}</h3>
          <div className="sch-meta">
            <span>📅 {data.total_weeks} weeks</span>
            <span>·</span>
            <span>📚 {data.total_lessons} lessons</span>
            <span>·</span>
            <span>👤 {data.persona}</span>
          </div>
          {data.overview && <p className="sch-overview">{data.overview}</p>}
        </div>
        <button onClick={printSchedule} className="sch-print-btn">🖨️ Print Plan</button>
      </div>

      {/* Progress bar */}
      <div className="sch-progress-row">
        <span className="sch-progress-label">Progress: {completedDays.size} / {data.schedule.length} activities</span>
        <div className="sch-progress-bar">
          <div className="sch-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="sch-progress-pct">{Math.round(progress)}%</span>
      </div>

      {/* Persona filter */}
      {data.differentiation && (
        <div className="sch-persona-tabs">
          {personas.map(p => (
            <button key={p} onClick={() => setActivePersona(p)}
              className={`sch-persona-tab ${activePersona === p ? 'sch-persona-tab--active' : ''}`}>
              {personaLabels[p]}
            </button>
          ))}
        </div>
      )}

      {/* Differentiation guide panel */}
      {activePersona !== 'all' && data.differentiation?.[activePersona] && (
        <div className="sch-diff-panel">
          <div className="sch-diff-label">{personaLabels[activePersona]} — Teacher Guidance</div>
          <p className="sch-diff-text">{data.differentiation[activePersona]}</p>
        </div>
      )}

      {/* Schedule timeline */}
      <div className="sch-timeline">
        {data.schedule.map((day, i) => {
          const done = completedDays.has(day.time);
          return (
            <div key={i} className={`sch-day ${done ? 'sch-day--done' : ''}`}>
              <div className="sch-day-check" onClick={() => toggleDay(day.time)} role="checkbox"
                aria-checked={done} tabIndex={0} onKeyDown={e => e.key === 'Enter' && toggleDay(day.time)}>
                <span className="sch-check-box">{done ? '✅' : '⬜'}</span>
              </div>
              <div className="sch-day-content">
                <div className="sch-day-header">
                  <span className="sch-day-time">{day.time}</span>
                  <span className="sch-day-duration">⏱ {day.duration_minutes} min</span>
                </div>
                <div className="sch-day-activity">{day.activity}</div>
                <div className="sch-day-resource">
                  <span className="sch-resource-icon">{getResourceIcon(day.resource)}</span>
                  <span className="sch-resource-name">{day.resource}</span>
                </div>
                {day.persona_note && activePersona === 'all' && (
                  <div className="sch-persona-note">💬 {day.persona_note}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Differentiation table */}
      {data.differentiation && activePersona === 'all' && (
        <div className="sch-diff-table">
          <h4 className="sch-diff-table-title">📊 Differentiation at a Glance</h4>
          <div className="sch-diff-grid">
            {Object.entries(data.differentiation).map(([persona, guidance]) => (
              <div key={persona} className={`sch-diff-card sch-diff-card--${persona.replace('_', '-')}`}>
                <div className="sch-diff-card-title">
                  {personaLabels[persona] || persona}
                </div>
                <p className="sch-diff-card-text">{guidance}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
