import { useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import TeachingInsights from '../components/TeachingInsights.jsx';
import GamePreview from '../components/GamePreview.jsx';

const RESOURCE_ICONS = { quiz: '🎯', matching: '🧩', worksheet: '📄', answer_key: '🔑' };

function downloadHTML(html, filename) {
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

export default function Dashboard({ result, onReset }) {
  const { t } = useLang();
  const [preview, setPreview] = useState(null); // { type, engineConfig }

  const { lesson, resources, teaching_insights, generation_id, created_at } = result;

  const resourceList = [
    {
      key: 'quiz',
      label: t.resource_quiz,
      icon: RESOURCE_ICONS.quiz,
      count: resources.quiz?.data?.questions?.length,
      countLabel: t.questions_count,
      hasGame: true,
      engineConfig: resources.quiz?.engineConfig,
      html: null,
    },
    {
      key: 'matching',
      label: t.resource_matching,
      icon: RESOURCE_ICONS.matching,
      count: resources.matching?.data?.pairs?.length,
      countLabel: t.pairs_count,
      hasGame: true,
      engineConfig: resources.matching?.engineConfig,
      html: null,
    },
    {
      key: 'worksheet',
      label: t.resource_worksheet,
      icon: RESOURCE_ICONS.worksheet,
      count: resources.worksheet ? null : null,
      hasGame: false,
      html: resources.worksheet?.html,
    },
    {
      key: 'answer_key',
      label: t.resource_answerkey,
      icon: RESOURCE_ICONS.answer_key,
      hasGame: false,
      html: resources.answer_key?.html,
    },
  ];

  return (
    <main className="dashboard-main">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">{t.dashboard_title}</h1>
          <p className="dashboard-sub">{t.dashboard_sub}</p>
          <div className="dashboard-meta">
            ID: {generation_id} · {new Date(created_at).toLocaleString()}
          </div>
        </div>
        <div className="dashboard-header-right">
          <div className="time-saved-box">
            <div className="time-saved-label">{t.time_saved}</div>
            <div className="time-saved-pct">{t.time_saved_pct}</div>
          </div>
          <button className="new-lesson-btn" onClick={onReset}>{t.new_lesson_btn}</button>
        </div>
      </div>

      {/* Lesson Summary */}
      {lesson?.summary && (
        <div className="lesson-summary-bar">
          <div className="summary-objectives">
            {lesson.objectives?.slice(0, 3).map((obj, i) => (
              <span key={i} className="objective-tag">✓ {obj}</span>
            ))}
          </div>
          <p className="summary-text">{lesson.summary}</p>
        </div>
      )}

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Resources */}
        <div className="resources-section">
          <div className="resources-grid">
            {resourceList.map((res) => (
              <div key={res.key} className={`resource-card resource-${res.key}`}>
                <div className="resource-icon">{res.icon}</div>
                <div className="resource-body">
                  <h3 className="resource-label">{res.label}</h3>
                  {res.count && (
                    <p className="resource-count">{res.count} {res.countLabel}</p>
                  )}
                </div>
                <div className="resource-actions">
                  {res.hasGame && res.engineConfig && (
                    <button
                      className="btn-play"
                      onClick={() => setPreview({ type: res.key, engineConfig: res.engineConfig })}
                    >
                      ▶ {t.btn_play}
                    </button>
                  )}
                  {res.html && (
                    <button
                      className="btn-download"
                      onClick={() => downloadHTML(res.html, `eduforge-${res.key}.html`)}
                    >
                      ↓ {t.btn_download}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teaching Insights */}
        <TeachingInsights insights={teaching_insights} />
      </div>

      {/* Game Preview Modal */}
      {preview && (
        <GamePreview
          type={preview.type}
          engineConfig={preview.engineConfig}
          onClose={() => setPreview(null)}
        />
      )}
    </main>
  );
}
