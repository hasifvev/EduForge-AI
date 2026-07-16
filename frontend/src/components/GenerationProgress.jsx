import { useLang } from '../context/LanguageContext.jsx';

const STEPS = ['step_curriculum', 'step_experience', 'step_content', 'step_teacher'];
const ICONS = ['🧠', '🎨', '✏️', '💡'];

export default function GenerationProgress({ step }) {
  const { t } = useLang();

  return (
    <div className="progress-screen">
      <div className="progress-orb">
        <div className="orb-ring orb-ring-1" />
        <div className="orb-ring orb-ring-2" />
        <div className="orb-ring orb-ring-3" />
        <span className="orb-icon">{ICONS[Math.min(step, 3)]}</span>
      </div>

      <h2 className="progress-title">{t.progress_title}</h2>

      <div className="steps-list">
        {STEPS.map((key, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={key} className={`step-row ${done ? 'step-done' : active ? 'step-active' : 'step-pending'}`}>
              <div className="step-indicator">
                {done ? <span className="step-check">✓</span> : active ? <span className="step-spinner" /> : <span className="step-num">{i + 1}</span>}
              </div>
              <div className="step-info">
                <span className="step-icon">{ICONS[i]}</span>
                <span className="step-label">{t[key]}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="progress-bar-outer">
        <div className="progress-bar-inner" style={{ width: `${Math.min((step / 4) * 100, 100)}%` }} />
      </div>

      <p className="progress-quote">{t.progress_quote}</p>
    </div>
  );
}
