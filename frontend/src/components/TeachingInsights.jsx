import { useLang } from '../context/LanguageContext.jsx';

const DIFFICULTY_COLORS = { mudah: '#22C55E', sederhana: '#FBBF24', sukar: '#F97316' };

export default function TeachingInsights({ insights }) {
  const { t } = useLang();
  if (!insights) return null;

  const diffColor = DIFFICULTY_COLORS[insights.estimated_class_difficulty] || '#64748b';
  const diffLabel = t[`difficulty_${insights.estimated_class_difficulty}`] || insights.estimated_class_difficulty;

  return (
    <aside className="insights-panel">
      <div className="insights-header">
        <h2 className="insights-title">💡 {t.insights_title}</h2>
        <p className="insights-sub">{t.insights_sub}</p>
        <div className="insights-meta">
          <span className="meta-badge" style={{ background: diffColor + '20', color: diffColor, border: `1px solid ${diffColor}` }}>
            {diffLabel}
          </span>
          {insights.time_estimate_minutes && (
            <span className="meta-badge meta-time">
              🕐 {insights.time_estimate_minutes} {t.minutes}
            </span>
          )}
        </div>
      </div>

      {/* Misconceptions */}
      {insights.misconceptions?.length > 0 && (
        <div className="insight-section">
          <h3 className="insight-section-title">⚠️ {t.misconceptions_title}</h3>
          {insights.misconceptions.map((m, i) => (
            <div key={i} className="misconception-card">
              <div className="mis-mistake">❌ {m.mistake}</div>
              <div className="mis-correction">✅ {m.correction}</div>
              {m.example && <div className="mis-example">💬 {m.example}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Teaching Tips */}
      {insights.teaching_tips?.length > 0 && (
        <div className="insight-section">
          <h3 className="insight-section-title">📌 {t.tips_title}</h3>
          <ul className="tips-list">
            {insights.teaching_tips.map((tip, i) => (
              <li key={i} className="tip-item">{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Real-Life Malaysian Examples */}
      {insights.daily_examples?.length > 0 && (
        <div className="insight-section">
          <h3 className="insight-section-title">🇲🇾 {t.examples_title}</h3>
          <div className="examples-grid">
            {insights.daily_examples.map((ex, i) => (
              <div key={i} className="example-chip">{ex}</div>
            ))}
          </div>
        </div>
      )}

      {/* Intervention */}
      {insights.intervention_strategy && (
        <div className="insight-section">
          <h3 className="insight-section-title">🔧 {t.intervention_title}</h3>
          <p className="intervention-text">{insights.intervention_strategy}</p>
        </div>
      )}

      {/* Extension */}
      {insights.extension_activity && (
        <div className="insight-section">
          <h3 className="insight-section-title">🚀 {t.extension_title}</h3>
          <p className="extension-text">{insights.extension_activity}</p>
        </div>
      )}
    </aside>
  );
}
