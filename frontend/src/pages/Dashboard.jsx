import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import TeachingInsights from '../components/TeachingInsights.jsx';
import GamePreview from '../components/GamePreview.jsx';
import LessonQualityScore from '../components/LessonQualityScore.jsx';
import AIRationale from '../components/AIRationale.jsx';
import Flashcards from '../components/Flashcards.jsx';
import StudyNotes from '../components/StudyNotes.jsx';
import MockExam from '../components/MockExam.jsx';
import ClozePassage from '../components/ClozePassage.jsx';
import MindMap from '../components/MindMap.jsx';
import StudySchedule from '../components/StudySchedule.jsx';
import TeachMode from './TeachMode.jsx';

const RESOURCE_ICONS = { quiz: '🎯', matching: '🧩', memory: '🧠', term_sprint: '⚡', worksheet: '📄', answer_key: '🔑' };

function downloadHTML(html, filename) {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function formatTime(ms) {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

export default function Dashboard({ result, savedLesson, onReset, onOpenLibrary, onSaveTeachSession }) {
  const { t } = useLang();
  const [preview, setPreview] = useState(null);
  const [visibleCards, setVisibleCards] = useState(0);
  const [studyHubTab, setStudyHubTab] = useState('flashcards');
  const [teachMode, setTeachMode] = useState(false);

  const {
    lesson, resources, teaching_insights,
    lesson_evaluation, analytics, study_materials,
    generation_id, created_at, source_preview, source_notice,
    subject, year, topic, country, studentPersona,
  } = result;

  // Magic Moment: reveal cards one by one
  useEffect(() => {
    const total = 9; // analytics + 6 resource cards + quality + rationale
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
      key: 'memory', label: 'Memory Match', icon: RESOURCE_ICONS.memory,
      count: resources.matching?.data?.pairs?.length, countLabel: t.pairs_count,
      hasGame: true, gameType: 'memory', engineConfig: resources.matching?.engineConfig, html: null,
      description: 'A second game mode for reinforcing the same key vocabulary.',
    },
    {
      key: 'term_sprint', label: 'Term Sprint', icon: RESOURCE_ICONS.term_sprint,
      count: resources.matching?.data?.pairs?.length, countLabel: t.questions_count,
      hasGame: true, gameType: 'term_sprint', engineConfig: resources.matching?.engineConfig, html: null,
      description: 'A fast retrieval quiz using the same verified lesson vocabulary.',
    },
    {
      key: 'worksheet', label: t.resource_worksheet, icon: RESOURCE_ICONS.worksheet,
      hasGame: false, html: resources.worksheet?.html,
      description: 'Curriculum-aligned practice, from recall to application.',
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

  if (teachMode) return <TeachMode result={result} initialSession={savedLesson?.teachSession} onSaveSession={onSaveTeachSession} onBack={() => setTeachMode(false)} />;

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
          <button className="new-lesson-btn" onClick={onOpenLibrary}>My Lessons</button>
          <button className="teach-launch" onClick={() => setTeachMode(true)}>⚡ Teach on this device</button>
          <button className="new-lesson-btn" onClick={onReset} id="new-lesson-btn">{t.new_lesson_btn}</button>
        </div>
      </div>

      {source_preview && source_notice && <div className="source-preview-notice">{source_notice}</div>}

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
                    onClick={() => setPreview({ type: res.gameType || res.key, engineConfig: res.engineConfig })}
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

      {/* ── Study Hub ──────────────────────────────────────────────── */}
      {study_materials && (
        <div className="study-hub">
          <div className="study-hub-header">
            <h2 className="study-hub-title">📚 Study Hub</h2>
            <p className="study-hub-sub">AI-generated materials tailored to your curriculum &amp; grade level</p>
          </div>

          <div className="study-hub-tabs" role="tablist">
            {[
              { id: 'flashcards', label: 'Flashcards', icon: '🃏', count: study_materials.flashcards?.cards?.length },
              { id: 'study_notes', label: 'Study Notes', icon: '📄', count: study_materials.study_notes?.sections?.length },
              { id: 'mock_exam', label: 'Mock Exam', icon: '📝', count: study_materials.mock_exam?.questions?.length },
              { id: 'cloze', label: 'Cloze', icon: '✏️', count: study_materials.cloze_passage?.blanks?.length },
              { id: 'mind_map', label: 'Study Map', icon: '🗺️' },
              { id: 'schedule', label: 'Schedule', icon: '📅', count: study_materials.study_schedule?.total_weeks },
            ].map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={studyHubTab === tab.id}
                id={`study-hub-tab-${tab.id}`}
                className={`study-hub-tab ${studyHubTab === tab.id ? 'study-hub-tab--active' : ''}`}
                onClick={() => setStudyHubTab(tab.id)}
              >
                <span className="sh-tab-icon">{tab.icon}</span>
                <span className="sh-tab-label">{tab.label}</span>
                {tab.count != null && (
                  <span className="sh-tab-count">{tab.count}{tab.id === 'schedule' ? 'wk' : ''}</span>
                )}
              </button>
            ))}
          </div>

          <div className="study-hub-panel" role="tabpanel" aria-labelledby={`study-hub-tab-${studyHubTab}`}>
            {studyHubTab === 'flashcards' && <Flashcards data={study_materials.flashcards} />}
            {studyHubTab === 'study_notes' && <StudyNotes data={study_materials.study_notes} />}
            {studyHubTab === 'mock_exam' && <MockExam data={study_materials.mock_exam} />}
            {studyHubTab === 'cloze' && <ClozePassage data={study_materials.cloze_passage} />}
            {studyHubTab === 'mind_map' && <MindMap data={study_materials.study_map} />}
            {studyHubTab === 'schedule' && <StudySchedule data={study_materials.study_schedule} />}
          </div>
        </div>
      )}

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
