import { useState } from 'react';

const QUESTION_TYPE_LABELS = {
  mcq: 'MCQ',
  short_answer: 'Short Answer',
  structured: 'Structured',
  essay: 'Essay / Extended',
  fill_blank: 'Fill in the Blank',
};

export default function MockExam({ data }) {
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const [expandedQ, setExpandedQ] = useState(null);

  if (!data || !data.questions?.length) return null;

  // Group questions by section
  const sections = data.questions.reduce((acc, q) => {
    if (!acc[q.section]) acc[q.section] = [];
    acc[q.section].push(q);
    return acc;
  }, {});

  const printExam = () => {
    const w = window.open('', '_blank');
    const answersHtml = showMarkScheme ? data.questions.map(q =>
      `<div class="answer"><strong>Q${q.id} (${q.marks} marks)</strong><br/>${q.expected_answer}<br/><em>Rubric: ${q.rubric}</em></div>`
    ).join('') : '';

    const html = `<!DOCTYPE html><html><head><title>${data.title}</title>
    <style>
      body { font-family: Arial, sans-serif; max-width: 750px; margin: 40px auto; color: #111; }
      .exam-header { border: 2px solid #000; padding: 16px; margin-bottom: 24px; }
      .exam-header h1 { font-size: 20px; margin: 0 0 6px; }
      .exam-meta { display: flex; gap: 24px; font-size: 13px; margin-top: 8px; }
      .section-label { font-weight: bold; font-size: 15px; margin: 20px 0 10px; border-bottom: 1px solid #888; padding-bottom: 4px; }
      .question { margin: 16px 0; padding: 12px; border-left: 3px solid #333; }
      .q-marks { float: right; font-weight: bold; background: #f5f5f5; padding: 2px 8px; border-radius: 4px; }
      .answer-lines { margin-top: 12px; }
      .answer-line { border-bottom: 1px solid #ccc; height: 24px; margin-bottom: 4px; }
      .mark-scheme { margin-top: 40px; border-top: 2px solid #000; padding-top: 16px; }
      .answer { margin: 12px 0; padding: 10px; background: #f9f9f9; }
      @media print { body { margin: 20px; } }
    </style></head><body>
    <div class="exam-header">
      <h1>${data.title}</h1>
      <div class="exam-meta">
        <span>📋 <strong>${data.exam_board}</strong></span>
        <span>⏱ ${data.duration_minutes} minutes</span>
        <span>📊 Total: ${data.total_marks} marks</span>
        <span>🎓 ${data.grade_band}</span>
      </div>
      <p style="margin-top:10px; font-size:13px; color:#555;">${data.format_style}</p>
    </div>
    ${Object.entries(sections).map(([sectionName, qs]) => `
      <div class="section-label">${sectionName}</div>
      ${qs.map(q => `
        <div class="question">
          <span class="q-marks">[${q.marks} mark${q.marks > 1 ? 's' : ''}]</span>
          <strong>Question ${q.id}.</strong>
          <p style="white-space:pre-line; margin: 8px 0;">${q.question}</p>
          <div class="answer-lines">
            ${Array.from({ length: Math.min(q.marks * 2, 8) }).map(() => '<div class="answer-line"></div>').join('')}
          </div>
        </div>
      `).join('')}
    `).join('')}
    ${showMarkScheme ? `<div class="mark-scheme"><h2>Mark Scheme</h2>${answersHtml}</div>` : ''}
    </body></html>`;
    w.document.write(html);
    w.document.close();
    w.print();
  };

  return (
    <div className="mock-exam-wrapper">
      <div className="me-header">
        <div className="me-header-left">
          <h3 className="me-title">{data.title}</h3>
          <div className="me-meta">
            <span className="me-badge me-badge--board">📋 {data.exam_board}</span>
            <span className="me-badge me-badge--format">{data.format_style}</span>
            <span className="me-badge me-badge--grade">🎓 {data.grade_band}</span>
          </div>
          <div className="me-stats">
            <span>⏱ {data.duration_minutes} min</span>
            <span>·</span>
            <span>📊 {data.total_marks} marks</span>
            <span>·</span>
            <span>📝 {data.questions.length} questions</span>
          </div>
        </div>
        <div className="me-actions">
          <button
            onClick={() => setShowMarkScheme(s => !s)}
            className={`me-btn ${showMarkScheme ? 'me-btn--active' : ''}`}
          >
            {showMarkScheme ? '🔒 Hide Mark Scheme' : '🔓 Show Mark Scheme'}
          </button>
          <button onClick={printExam} className="me-btn me-btn--print">🖨️ Print Paper</button>
        </div>
      </div>

      <div className="me-paper">
        {Object.entries(sections).map(([sectionName, qs]) => (
          <div key={sectionName} className="me-section">
            <div className="me-section-header">
              <h4 className="me-section-name">{sectionName}</h4>
              <span className="me-section-marks">{qs.reduce((s, q) => s + q.marks, 0)} marks</span>
            </div>

            {qs.map(q => (
              <div key={q.id} className={`me-question ${expandedQ === q.id ? 'me-question--expanded' : ''}`}>
                <div className="me-q-header" onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)}>
                  <span className="me-q-num">Q{q.id}</span>
                  {q.question_type && (
                    <span className="me-q-type">{QUESTION_TYPE_LABELS[q.question_type] || q.question_type}</span>
                  )}
                  <span className="me-q-marks">[{q.marks} mark{q.marks > 1 ? 's' : ''}]</span>
                  <span className="me-q-toggle">{expandedQ === q.id ? '▲' : '▼'}</span>
                </div>

                <div className={`me-q-body ${expandedQ === q.id ? 'me-q-body--open' : ''}`}>
                  <p className="me-q-text">{q.question}</p>

                  {/* Answer lines for short/structured */}
                  {['short_answer', 'structured', 'fill_blank'].includes(q.question_type) && (
                    <div className="me-answer-lines">
                      {Array.from({ length: Math.min(q.marks * 2, 8) }).map((_, i) => (
                        <div key={i} className="me-answer-line" />
                      ))}
                    </div>
                  )}

                  {/* Essay answer box */}
                  {q.question_type === 'essay' && (
                    <div className="me-essay-box" aria-label="Essay answer area">
                      {Array.from({ length: 10 }).map((_, i) => <div key={i} className="me-answer-line" />)}
                    </div>
                  )}

                  {/* Mark scheme reveal */}
                  {showMarkScheme && (
                    <div className="me-mark-scheme">
                      <div className="me-ms-label">📋 Expected Answer</div>
                      <p className="me-ms-answer">{q.expected_answer}</p>
                      {q.rubric && (
                        <>
                          <div className="me-ms-label">⚖️ Marking Rubric</div>
                          <p className="me-ms-rubric">{q.rubric}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
