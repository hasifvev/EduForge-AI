import { useState, useCallback } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import FileUploadZone from '../components/FileUploadZone.jsx';
import GenerationProgress from '../components/GenerationProgress.jsx';
import { useGeneration } from '../hooks/useGeneration.js';
import Dashboard from './Dashboard.jsx';

const PERSONAS = [
  { id: 'Beginner', emoji: '🌱', label_key: 'persona_beginner' },
  { id: 'Mixed Ability', emoji: '🔀', label_key: 'persona_mixed' },
  { id: 'On-Level', emoji: '⭐', label_key: 'persona_onlevel' },
  { id: 'Gifted & Talented', emoji: '🚀', label_key: 'persona_gifted' },
  { id: 'SEN Support', emoji: '💚', label_key: 'persona_sen' },
];

export default function Home() {
  const { t } = useLang();
  const { status, step, result, error, generate, reset } = useGeneration();

  const [form, setForm] = useState({
    subject: '',
    year: '',
    topic: '',
    language: '',
    objectives: '',
    country: '',
    curriculumStandard: '',
    studentPersona: 'On-Level',
  });
  const [file, setFile] = useState(null);
  const [formError, setFormError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [customYear, setCustomYear] = useState('');

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setForm(f => ({
      ...f,
      country: country.name,
      curriculumStandard: country.curriculum,
      year: '', // reset grade when country changes
    }));
  };

  const handlePersonaSelect = (personaId) => {
    setForm(f => ({ ...f, studentPersona: personaId }));
  };

  const handleGenerate = useCallback((e) => {
    e.preventDefault();
    if (!form.subject || !form.year || !form.topic) {
      setFormError(t.error_fields);
      return;
    }
    setFormError('');
    const lang = form.language || t.languages[0];
    generate({ ...form, language: lang, file });
  }, [form, file, generate, t]);

  const currentGrades = selectedCountry
    ? (t.gradeSystems[selectedCountry.gradeSystem] || t.gradeSystems.us)
    : t.gradeSystems.us;

  if (status === 'complete' && result) {
    return <Dashboard result={result} onReset={reset} />;
  }

  if (status === 'generating' || status === 'uploading') {
    return <GenerationProgress step={step} />;
  }

  return (
    <main className="home-main">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-badge">✦ OpenAI Build Week 2026</div>
        <h1 className="hero-headline">
          {t.hero_headline.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
        </h1>
        <p className="hero-sub">{t.hero_sub}</p>

        {/* Agent pills */}
        <div className="hero-agents">
          {['🧠 Curriculum', '🎨 Designer', '✏️ Generator', '💡 Teacher', '⭐ Evaluator'].map((a, i) => (
            <div key={i} className="hero-agent-pill">{a}</div>
          ))}
        </div>
      </section>

      {/* ── Form ────────────────────────────────────────────────────────── */}
      <section className="form-section">
        <form className="lesson-form" onSubmit={handleGenerate}>

          {/* Upload */}
          <div className="form-block">
            <FileUploadZone onFileSelect={setFile} selectedFile={file} />
            <div className="divider"><span>{t.upload_or}</span></div>
          </div>

          {/* Country Quick-Select */}
          <div className="field-group">
            <label className="field-label">{t.field_country}</label>
            <div className="country-quickrow">
              {t.countries.map(c => (
                <button
                  key={c.code}
                  type="button"
                  className={`country-chip ${selectedCountry?.code === c.code ? 'active' : ''}`}
                  onClick={() => handleCountrySelect(c)}
                  title={c.name}
                >
                  <span className="country-flag">{c.flag}</span>
                  <span className="country-name">{c.name}</span>
                </button>
              ))}
            </div>
            {selectedCountry && (
              <div className="curriculum-badge">
                <span className="curriculum-badge-icon">📚</span>
                {t.confidence_high}: <strong>{selectedCountry.curriculum}</strong>
                <button type="button" className="curriculum-clear" onClick={() => { setSelectedCountry(null); setForm(f => ({ ...f, country: '', curriculumStandard: '' })); }}>✕</button>
              </div>
            )}
            {!selectedCountry && (
              <input
                className="field-input field-input-sm"
                placeholder={t.country_other}
                value={form.country}
                onChange={set('country')}
              />
            )}
          </div>

          {/* Subject + Grade */}
          <div className="form-grid">
            <div className="field-group">
              <label className="field-label">{t.field_subject}</label>
              <select className="field-select" value={form.subject} onChange={set('subject')} required>
                <option value="">—</option>
                {t.subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="field-group">
              <label className="field-label">{t.field_year}</label>
              {currentGrades.length > 0 ? (
                <select className="field-select" value={form.year} onChange={set('year')} required>
                  <option value="">—</option>
                  {currentGrades.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              ) : (
                <input
                  className="field-input"
                  placeholder="e.g. Grade 5, Year 3, Form 2..."
                  value={form.year}
                  onChange={set('year')}
                  required
                />
              )}
            </div>
          </div>

          {/* Topic */}
          <div className="field-group">
            <label className="field-label">{t.field_topic}</label>
            <input
              className="field-input"
              value={form.topic}
              onChange={set('topic')}
              placeholder={t.topic_placeholder}
              required
            />
          </div>

          {/* Student Persona */}
          <div className="field-group">
            <label className="field-label">{t.field_persona}</label>
            <div className="persona-row">
              {PERSONAS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  className={`persona-chip ${form.studentPersona === p.id ? 'active' : ''}`}
                  onClick={() => handlePersonaSelect(p.id)}
                >
                  {t[p.label_key] || `${p.emoji} ${p.id}`}
                </button>
              ))}
            </div>
          </div>

          {/* Language + Curriculum */}
          <div className="form-grid">
            <div className="field-group">
              <label className="field-label">{t.field_language}</label>
              <div className="language-chips">
                {t.languages.map(l => (
                  <button
                    key={l}
                    type="button"
                    className={`lang-chip ${form.language === l ? 'active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, language: l }))}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="field-group">
              <label className="field-label">{t.field_curriculum}</label>
              <input
                className="field-input"
                placeholder={t.curriculum_placeholder}
                value={form.curriculumStandard}
                onChange={set('curriculumStandard')}
              />
            </div>
          </div>

          {/* Objectives */}
          <div className="field-group">
            <label className="field-label">{t.field_objectives}</label>
            <textarea
              className="field-textarea"
              value={form.objectives}
              onChange={set('objectives')}
              placeholder={t.objectives_placeholder}
              rows={2}
            />
          </div>

          {formError && <div className="form-error">{formError}</div>}
          {error && <div className="form-error">{t.error_generate}</div>}

          <button type="submit" className="generate-btn" id="generate-btn">
            <span className="generate-btn-icon">✦</span>
            {t.generate_btn}
          </button>
        </form>
      </section>

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section className="how-section">
        <h2 className="how-title">{t.how_title}</h2>
        <div className="how-steps">
          {[t.step1, t.step2, t.step3, t.step4].map((s, i) => (
            <div key={i} className="how-step">
              <div className="how-num">{i + 1}</div>
              <p className="how-text">{s}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
