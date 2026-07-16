import { useLang } from '../context/LanguageContext.jsx';

const STEPS = [
  { key: 'step_curriculum', msgKey: 'step_curriculum_msg', icon: '🧠', color: '#6366f1' },
  { key: 'step_experience', msgKey: 'step_experience_msg', icon: '🎨', color: '#8b5cf6' },
  { key: 'step_content', msgKey: 'step_content_msg', icon: '✏️', color: '#06b6d4' },
  { key: 'step_teacher', msgKey: 'step_teacher_msg', icon: '💡', color: '#f59e0b' },
  { key: 'step_evaluator', msgKey: 'step_evaluator_msg', icon: '⭐', color: '#10b981' },
];

// Color shifts as each agent activates
const ORB_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981'];

export default function GenerationProgress({ step }) {
  const { t } = useLang();
  const currentStep = Math.min(step, STEPS.length - 1);
  const orbColor = ORB_COLORS[currentStep] || '#6366f1';
  const progress = Math.min(((step) / STEPS.length) * 100, 100);

  return (
    <div className="progress-screen">

      {/* Animated Orb */}
      <div className="progress-orb-wrap">
        <div className="progress-orb" style={{ '--orb-color': orbColor }}>
          <div className="orb-ring orb-ring-1" style={{ borderColor: `${orbColor}40` }} />
          <div className="orb-ring orb-ring-2" style={{ borderColor: `${orbColor}25` }} />
          <div className="orb-ring orb-ring-3" style={{ borderColor: `${orbColor}15` }} />
          <span className="orb-icon">{STEPS[currentStep]?.icon || '✦'}</span>
        </div>
      </div>

      <h2 className="progress-title">{t.progress_title}</h2>

      {/* Active step thinking message */}
      {STEPS[currentStep] && (
        <div className="progress-thinking" style={{ color: orbColor }}>
          <span className="thinking-dots">
            <span /><span /><span />
          </span>
          {t[STEPS[currentStep].msgKey] || ''}
        </div>
      )}

      {/* Step list */}
      <div className="steps-list">
        {STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          const pending = i > step;
          return (
            <div key={s.key} className={`step-row ${done ? 'step-done' : active ? 'step-active' : 'step-pending'}`}>
              <div className="step-indicator" style={active ? { borderColor: s.color, boxShadow: `0 0 8px ${s.color}60` } : {}}>
                {done
                  ? <span className="step-check">✓</span>
                  : active
                    ? <span className="step-spinner" style={{ borderTopColor: s.color }} />
                    : <span className="step-num">{i + 1}</span>
                }
              </div>
              <div className="step-info">
                <span className="step-icon">{s.icon}</span>
                <div className="step-text-wrap">
                  <span className="step-label">{t[s.key]}</span>
                  {active && <span className="step-msg">{t[s.msgKey]}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="progress-bar-outer">
        <div
          className="progress-bar-inner"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg, #6366f1, ${orbColor})` }}
        />
      </div>

      <p className="progress-quote">{t.progress_quote}</p>
    </div>
  );
}
