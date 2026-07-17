import { useState } from 'react';
import { escapeHtml } from '../utils/escapeHtml.js';

export default function StudyNotes({ data }) {
  const [open, setOpen] = useState(new Set([0]));

  if (!data || !data.sections?.length) return null;

  const toggle = (i) => setOpen(s => {
    const n = new Set(s);
    n.has(i) ? n.delete(i) : n.add(i);
    return n;
  });

  const printNotes = () => {
    const w = window.open('', '_blank');
    const html = `<!DOCTYPE html><html><head><title>${escapeHtml(data.title)}</title>
    <style>
      body { font-family: Georgia, serif; max-width: 700px; margin: 40px auto; color: #111; line-height: 1.7; }
      h1 { font-size: 24px; border-bottom: 2px solid #333; padding-bottom: 8px; }
      h2 { font-size: 18px; margin-top: 28px; color: #333; }
      .subtitle { color: #666; font-style: italic; margin-bottom: 24px; }
      .grade-badge { background: #f0f0f0; padding: 3px 10px; border-radius: 12px; font-size: 13px; display: inline-block; margin-bottom: 20px; }
      p { margin: 8px 0 12px; }
      ul { margin: 8px 0 16px; padding-left: 20px; }
      li { margin-bottom: 6px; }
      .key-point { background: #fffde7; padding: 2px 6px; border-radius: 4px; }
      @media print { body { margin: 20px; } }
    </style></head><body>
    <h1>${escapeHtml(data.title)}</h1>
    ${data.subtitle ? `<p class="subtitle">${escapeHtml(data.subtitle)}</p>` : ''}
    ${data.grade_band_label ? `<span class="grade-badge">📚 ${escapeHtml(data.grade_band_label)}</span>` : ''}
    ${data.sections.map(s => `
      <h2>${escapeHtml(s.heading)}</h2>
      <p>${escapeHtml(s.content)}</p>
      <ul>${s.key_points.map(p => `<li class="key-point">${escapeHtml(p)}</li>`).join('')}</ul>
    `).join('')}
    </body></html>`;
    w.document.write(html);
    w.document.close();
    w.print();
  };

  return (
    <div className="study-notes-wrapper">
      <div className="sn-header">
        <div>
          <h3 className="sn-title">{data.title}</h3>
          {data.subtitle && <p className="sn-subtitle">{data.subtitle}</p>}
          {data.grade_band_label && <span className="sn-grade-badge">📚 {data.grade_band_label}</span>}
        </div>
        <button onClick={printNotes} className="sn-print-btn" aria-label="Print study notes">🖨️ Print</button>
      </div>

      <div className="sn-sections">
        {data.sections.map((section, i) => (
          <div key={i} className={`sn-section ${open.has(i) ? 'sn-section--open' : ''}`}>
            <button
              className="sn-section-toggle"
              onClick={() => toggle(i)}
              aria-expanded={open.has(i)}
              aria-controls={`sn-section-${i}`}
            >
              <span className="sn-section-num">{i + 1}</span>
              <span className="sn-section-heading">{section.heading}</span>
              <span className="sn-section-arrow">{open.has(i) ? '▲' : '▼'}</span>
            </button>

            {open.has(i) && (
              <div className="sn-section-body" id={`sn-section-${i}`}>
                <p className="sn-content">{section.content}</p>
                <ul className="sn-key-points">
                  {section.key_points.map((pt, j) => (
                    <li key={j} className="sn-key-point">
                      <span className="sn-bullet">✦</span> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
