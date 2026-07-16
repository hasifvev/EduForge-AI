import { useLang } from '../context/LanguageContext.jsx';

/**
 * AIRationale — "Why did AI choose this strategy?"
 * Displays Agent 2 Experience Designer's pedagogical reasoning
 */
export default function AIRationale({ experienceDesign }) {
  const { t } = useLang();
  if (!experienceDesign) return null;

  const {
    primary_activity,
    why_primary_activity,
    why_quiz,
    why_matching,
    rationale,
    confidence_score = 80,
    difficulty_calibration,
    engagement_strategy,
  } = experienceDesign;

  const confidenceColor = confidence_score >= 85 ? '#10b981' : confidence_score >= 70 ? '#f59e0b' : '#ef4444';

  return (
    <div className="rationale-card" id="ai-rationale">
      <div className="rationale-header">
        <div>
          <h3 className="rationale-title">{t.rationale_title}</h3>
          <p className="rationale-subtitle">{t.rationale_subtitle}</p>
        </div>
        <div className="confidence-badge" style={{ borderColor: confidenceColor }}>
          <div className="confidence-value" style={{ color: confidenceColor }}>{confidence_score}%</div>
          <div className="confidence-label">{t.confidence_label}</div>
        </div>
      </div>

      {/* Primary choice */}
      <div className="rationale-choice">
        <div className="rationale-choice-header">
          <span className="rationale-choice-icon">
            {primary_activity === 'quiz' ? '📝' : '🔀'}
          </span>
          <span className="rationale-choice-label">
            AI chose: <strong style={{ textTransform: 'capitalize' }}>{primary_activity}</strong> first
          </span>
        </div>
        {why_primary_activity && (
          <p className="rationale-choice-reason">{why_primary_activity}</p>
        )}
      </div>

      {/* Full rationale */}
      {rationale && (
        <div className="rationale-full">
          <div className="rationale-full-label">📖 Full Reasoning</div>
          <p className="rationale-full-text">{rationale}</p>
        </div>
      )}

      {/* Quiz vs Matching breakdown */}
      <div className="rationale-comparison">
        <div className="rationale-compare-item">
          <div className="rationale-compare-icon">📝</div>
          <div className="rationale-compare-label">Quiz</div>
          <div className="rationale-compare-text">{why_quiz || 'Assessment of knowledge recall and application'}</div>
        </div>
        <div className="rationale-compare-vs">→</div>
        <div className="rationale-compare-item">
          <div className="rationale-compare-icon">🔀</div>
          <div className="rationale-compare-label">Matching</div>
          <div className="rationale-compare-text">{why_matching || 'Vocabulary retention and conceptual mapping'}</div>
        </div>
      </div>

      {/* Calibration notes */}
      {(difficulty_calibration || engagement_strategy) && (
        <div className="rationale-notes">
          {difficulty_calibration && (
            <div className="rationale-note">
              <span className="rationale-note-icon">⚖️</span>
              <span>{difficulty_calibration}</span>
            </div>
          )}
          {engagement_strategy && (
            <div className="rationale-note">
              <span className="rationale-note-icon">💡</span>
              <span>{engagement_strategy}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
