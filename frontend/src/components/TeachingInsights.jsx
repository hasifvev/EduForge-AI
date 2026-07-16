import { useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

export default function TeachingInsights({ insights }) {
  const { t } = useLang();
  const [openSections, setOpenSections] = useState({ misconceptions: true, tips: false, examples: false, intervention: false, extension: false });

  if (!insights) return null;

  const toggle = (key) => setOpenSections(s => ({ ...s, [key]: !s[key] }));

  const difficultyColor = {
    easy: '#22c55e', moderate: '#f59e0b', challenging: '#ef4444',
  }[insights.estimated_class_difficulty] || '#6366f1';

  const difficultyLabel = {
    easy: t.difficulty_easy,
    moderate: t.difficulty_moderate,
    challenging: t.difficulty_challenging,
  }[insights.estimated_class_difficulty] || insights.estimated_class_difficulty;

  return (
    <div className="insights-panel" id="teaching-insights">
      <div className="insights-header">
        <h3 className="insights-title">{t.insights_title}</h3>
        <p className="insights-sub">{t.insights_sub}</p>
        <div className="insights-meta">
          {insights.estimated_class_difficulty && (
            <span className="meta-badge" style={{ background: `${difficultyColor}15`, color: difficultyColor, border: `1px solid ${difficultyColor}40` }}>
              ⚡ {difficultyLabel}
            </span>
          )}
          {insights.time_estimate_minutes && (
            <span className="meta-badge meta-time">
              ⏱ {insights.time_estimate_minutes} {t.minutes}
            </span>
          )}
        </div>
      </div>

      {/* Misconceptions — open by default */}
      <AccordionSection
        title={t.misconceptions_title}
        icon="⚠️"
        open={openSections.misconceptions}
        onToggle={() => toggle('misconceptions')}
        accent="#ef4444"
      >
        {insights.misconceptions?.map((m, i) => (
          <div key={i} className="misconception-card">
            <div className="mis-mistake">❌ {m.mistake}</div>
            <div className="mis-correction">✓ {m.correction}</div>
            {m.example && <div className="mis-example">💬 {m.example}</div>}
          </div>
        ))}
      </AccordionSection>

      {/* Teaching Tips */}
      <AccordionSection
        title={t.tips_title}
        icon="💡"
        open={openSections.tips}
        onToggle={() => toggle('tips')}
        accent="#f59e0b"
      >
        <ul className="tips-list">
          {insights.teaching_tips?.map((tip, i) => (
            <li key={i} className="tip-item">{tip}</li>
          ))}
        </ul>
      </AccordionSection>

      {/* Real-life Examples */}
      <AccordionSection
        title={t.examples_title}
        icon="🌍"
        open={openSections.examples}
        onToggle={() => toggle('examples')}
        accent="#06b6d4"
      >
        <div className="examples-grid">
          {insights.daily_examples?.map((ex, i) => (
            <span key={i} className="example-chip">{ex}</span>
          ))}
        </div>
      </AccordionSection>

      {/* Intervention Strategy */}
      <AccordionSection
        title={t.intervention_title}
        icon="🚑"
        open={openSections.intervention}
        onToggle={() => toggle('intervention')}
        accent="#8b5cf6"
      >
        <p className="intervention-text">{insights.intervention_strategy}</p>
      </AccordionSection>

      {/* Extension Activity */}
      <AccordionSection
        title={t.extension_title}
        icon="🚀"
        open={openSections.extension}
        onToggle={() => toggle('extension')}
        accent="#10b981"
      >
        <p className="extension-text">{insights.extension_activity}</p>
        {insights.differentiation_note && (
          <div className="differentiation-note">
            <span className="diff-icon">⚖️</span>
            <span><strong>{t.differentiation_label}:</strong> {insights.differentiation_note}</span>
          </div>
        )}
      </AccordionSection>
    </div>
  );
}

function AccordionSection({ title, icon, open, onToggle, accent, children }) {
  return (
    <div className="accordion-section" style={{ '--accent': accent }}>
      <button className="accordion-trigger" onClick={onToggle} type="button">
        <div className="accordion-trigger-left">
          <span className="accordion-icon">{icon}</span>
          <span className="accordion-title">{title}</span>
        </div>
        <span className={`accordion-chevron ${open ? 'open' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="accordion-body">
          {children}
        </div>
      )}
    </div>
  );
}
