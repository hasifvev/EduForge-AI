import { useLang } from '../context/LanguageContext.jsx';

/**
 * LessonQualityScore — Agent 5 self-evaluation display
 * Shows the 4-dimension Bloom's-aligned scoring with progress bars
 */
export default function LessonQualityScore({ evaluation }) {
  const { t } = useLang();
  if (!evaluation) return null;

  const { scores, overall_score, grade, strengths = [], weaknesses = [], suggestion,
    blooms_levels_present = [], blooms_levels_missing = [] } = evaluation;

  const dimensions = [
    { key: 'learning_coverage', label: t.quality_coverage, icon: '📚', color: '#6366f1' },
    { key: 'student_engagement', label: t.quality_engagement, icon: '⚡', color: '#8b5cf6' },
    { key: 'difficulty_balance', label: t.quality_difficulty, icon: '⚖️', color: '#06b6d4' },
    { key: 'blooms_taxonomy', label: t.quality_blooms, icon: '🧠', color: '#10b981' },
  ];

  const gradeColors = { A: '#10b981', B: '#6366f1', C: '#f59e0b', D: '#ef4444' };
  const gradeColor = gradeColors[grade] || '#6366f1';

  return (
    <div className="quality-card" id="lesson-quality-score">
      <div className="quality-header">
        <div className="quality-header-left">
          <h3 className="quality-title">{t.quality_title}</h3>
          <p className="quality-subtitle">{t.quality_subtitle}</p>
        </div>
        <div className="quality-grade-badge" style={{ borderColor: gradeColor, color: gradeColor }}>
          <div className="quality-grade-letter">{grade}</div>
          <div className="quality-grade-score">{overall_score}/100</div>
        </div>
      </div>

      {/* 4 dimension bars */}
      <div className="quality-dimensions">
        {dimensions.map(dim => {
          const score = scores?.[dim.key] ?? 0;
          return (
            <div key={dim.key} className="quality-dim">
              <div className="quality-dim-header">
                <span className="quality-dim-icon">{dim.icon}</span>
                <span className="quality-dim-label">{dim.label}</span>
                <span className="quality-dim-score">{score}%</span>
              </div>
              <div className="quality-bar-track">
                <div
                  className="quality-bar-fill"
                  style={{ width: `${score}%`, background: dim.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="quality-section">
          <div className="quality-section-title quality-strengths-title">✓ {t.quality_strengths}</div>
          {strengths.map((s, i) => (
            <div key={i} className="quality-strength-item">
              <span className="quality-strength-dot">✓</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      )}

      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <div className="quality-section">
          <div className="quality-section-title quality-weak-title">⚠ {t.quality_weaknesses}</div>
          {weaknesses.map((w, i) => (
            <div key={i} className="quality-weak-item">
              <span className="quality-weak-dot">⚠</span>
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}

      {/* Suggestion */}
      {suggestion && (
        <div className="quality-suggestion">
          <div className="quality-suggestion-icon">→</div>
          <div>
            <div className="quality-suggestion-label">{t.quality_suggestion}</div>
            <div className="quality-suggestion-text">{suggestion}</div>
          </div>
        </div>
      )}

      {/* Bloom's levels */}
      {(blooms_levels_present.length > 0 || blooms_levels_missing.length > 0) && (
        <div className="quality-blooms">
          <div className="quality-blooms-title">{t.quality_blooms_present}</div>
          <div className="quality-blooms-chips">
            {blooms_levels_present.map(l => (
              <span key={l} className="blooms-chip blooms-chip-present">{l}</span>
            ))}
            {blooms_levels_missing.map(l => (
              <span key={l} className="blooms-chip blooms-chip-missing">{l} ✕</span>
            ))}
          </div>
        </div>
      )}

      <div className="quality-disclaimer">{t.quality_disclaimer}</div>
    </div>
  );
}
