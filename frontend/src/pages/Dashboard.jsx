import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import TeachingInsights from '../components/TeachingInsights.jsx';
import GamePreview from '../components/GamePreview.jsx';
import LessonQualityScore from '../components/LessonQualityScore.jsx';
import AIRationale from '../components/AIRationale.jsx';

const RESOURCE_ICONS = { quiz: '🎯', matching: '🧩', worksheet: '📄', answer_key: '🔑' };

function downloadHTML(html, filename) {
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

function formatTime(ms) {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

export default function Dashboard({ result, onReset }) {
  const { t } = useLang();
  const [preview, setPreview] = useState(null);
  const [visibleCards, setVisibleCards] = useState(0); // Magic Moment stagger

  const {
    lesson, resources, teaching_insights,
    lesson_evaluation, analytics,
    generation_id, created_at,
    subject, year, topic, country, studentPersona,
  } = result;

  // Magic Moment: reveal cards one by one
  useEffect(() => {
    const total = 7; // analytics + 4 resource cards + quality + rationale
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleCards(i);
      if (i >= total) clearInterval(timer);
    }, 180);
    return () => clearInterval(timer);
  }, []);

  const resourceList = [
    {
      key: 'quiz', label: t.resource_quiz, icon: RESOURCE_ICONS.quiz,
      count: resources.quiz?.data?.questions?.length, countLabel: t.questions_count,
      hasGame: true, engineConfig: resources.quiz?.engineConfig, html: null,
      description: lesson?.experience_design?.quiz_focus,
    },
    {
      key: 'matching', label: t.resource_matching, icon: RESOURCE_ICONS.matching,
      count: resources.matching?.data?.pairs?.length, countLabel: t.pairs_count,
      hasGame: true, engineConfig: resources.matching?.engineConfig, html: null,
      description: lesson?.experience_design?.matching_focus,
    },
    {
      key: 'worksheet', label: t.resource_worksheet, icon: RESOURCE_ICONS.worksheet,
      hasGame: false, html: resources.worksheet?.html,
      description: 'Printable fill-in-the-blank activity',
    },
    {
      key: 'answer_key', label: t.resource_answerkey, icon: RESOURCE_ICONS.answer_key,
      hasGame: false, html: resources.answer_key?.html,
      description: 'Complete answer key for all activities',
    },
  ];

  // Curriculum confidence badge
  const confidenceKey = lesson?.confidenceLevel || 'general';
  const curricBadge = {
    high: { text: t.confidence_high, suffix: lesson?.curriculum_source, color: '#10b981' },
    inferred: { text: t.confidence_inferred, suffix: '', color: '#f59e0b' },
    general: { text: t.confidence_general, suffix: '', color: '#6366f1' },
  }[confidenceKey];

  return (
    <main className="dashboard-main">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">{t.dashboard_title}</h1>
          <p className="dashboard-sub">{t.dashboard_sub}</p>
          <div className="dashboard-context-pills">
            {subject && <span className="context-pill">📚 {subject}</span>}
            {year && <span className="context-pill">🎓 {year}</span>}
            {country && <span className="context-pill">🌍 {country}</span>}
            {studentPersona && <span className="context-pill persona-pill">
              {studentPersona === 'Gifted & Talented' ? '🚀' :
                studentPersona === 'Beginner' ? '🌱' :
                  studentPersona === 'Mixed Ability' ? '🔀' :
                    studentPersona === 'SEN Support' ? '💚' : '⭐'} {studentPersona}
            </span>}
          </div>
          {curricBadge && (
            <div className="curriculum-confidence-badge" style={{ color: curricBadge.color }}>
              📚 {curricBadge.text}{curricBadge.suffix ? `: ${curricBadge.suffix}` : ''}
            </div>
          )}
        </div>
        <div className="dashboard-header-right">
          <button className="new-lesson-btn" onClick={onReset} id="new-lesson-btn">{t.new_lesson_btn}</button>
        </div>
      </div>

      {/* ── Analytics Bar ───────────────────────────────────────────────── */}
      {analytics && visibleCards >= 1 && (
        <div className="analytics-bar card-reveal">
          <div className="analytics-item">
            <span className="analytics-value">⚡ {formatTime(analytics.generation_time_ms)}</span>
            <span className="analytics-label">{t.analytics_time}</span>
          </div>
          <div className="analytics-divider" />
          <div className="analytics-item">
            <span className="analytics-value">🤖 {analytics.agent_calls}</span>
            <span className="analytics-label">{t.analytics_agents}</span>
          </div>
          <div className="analytics-divider" />
          <div className="analytics-item">
            <span className="analytics-value">📦 {analytics.resources_created}</span>
            <span className="analytics-label">{t.analytics_resources}</span>
          </div>
          <div className="analytics-divider" />
          <div className="analytics-item">
            <span className="analytics-value">⏱ ~{analytics.estimated_time_saved_minutes} {t.analytics_minutes}</span>
            <span className="analytics-label">{t.analytics_saved}</span>
          </div>
          <div className="analytics-divider" />
          <div className="analytics-item">
            <span className="analytics-value">🤖 {analytics.model}</span>
            <span className="analytics-label">Model</span>
          </div>
        </div>
      )}

      {/* ── Lesson Summary ──────────────────────────────────────────────── */}
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

      {/* ── Resources Grid (Magic Moment stagger) ──────────────────────── */}
      <div className="resources-grid">
        {resourceList.map((res, i) => (
          visibleCards >= i + 2 && (
            <div key={res.key} className={`resource-card resource-${res.key} card-reveal`}
              style={{ animationDelay: `${i * 50}ms` }}>
              <div className="resource-icon">{res.icon}</div>
              <div className="resource-body">
                <h3 className="resource-label">{res.label}</h3>
                {res.count && <p className="resource-count">{res.count} {res.countLabel}</p>}
                {res.description && <p className="resource-desc">{res.description}</p>}
              </div>
              <div className="resource-actions">
                {res.hasGame && res.engineConfig && (
                  <button
                    className="btn-play"
                    id={`btn-play-${res.key}`}
                    onClick={() => setPreview({ type: res.key, engineConfig: res.engineConfig })}
                  >
                    ▶ {t.btn_play}
                  </button>
                )}
                {res.html && (
                  <button
                    className="btn-download"
                    id={`btn-download-${res.key}`}
                    onClick={() => downloadHTML(res.html, `eduforge-${res.key}.html`)}
                  >
                    ↓ {t.btn_download}
                  </button>
                )}
              </div>
            </div>
          )
        ))}
      </div>

      {/* ── AI Rationale + Quality Score ────────────────────────────────── */}
      <div className="insight-panel-grid">
        {visibleCards >= 6 && lesson?.experience_design && (
          <div className="card-reveal">
            <AIRationale experienceDesign={lesson.experience_design} />
          </div>
        )}
        {visibleCards >= 7 && lesson_evaluation && (
          <div className="card-reveal">
            <LessonQualityScore evaluation={lesson_evaluation} />
          </div>
        )}
      </div>

      {/* ── Teaching Insights ───────────────────────────────────────────── */}
      {teaching_insights && <TeachingInsights insights={teaching_insights} />}

      {/* ── AI Disclaimer ───────────────────────────────────────────────── */}
      <div className="ai-disclaimer">
        {t.ai_review_disclaimer}
      </div>

      {/* ── Game Preview Modal ──────────────────────────────────────────── */}
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
