import { useState, useCallback } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import FileUploadZone from '../components/FileUploadZone.jsx';
import GenerationProgress from '../components/GenerationProgress.jsx';
import { useGeneration } from '../hooks/useGeneration.js';
import Dashboard from './Dashboard.jsx';

export default function Home() {
  const { t } = useLang();
  const { status, step, result, error, generate, reset } = useGeneration();

  const [form, setForm] = useState({ subject: '', year: '', topic: '', language: '', objectives: '' });
  const [file, setFile] = useState(null);
  const [formError, setFormError] = useState('');

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleGenerate = useCallback((e) => {
    e.preventDefault();
    if (!form.subject || !form.year || !form.topic) { setFormError(t.error_fields); return; }
    setFormError('');
    const lang = form.language || t.languages[0];
    generate({ ...form, language: lang, file });
  }, [form, file, generate, t]);

  if (status === 'complete' && result) {
    return <Dashboard result={result} onReset={reset} />;
  }

  if (status === 'generating' || status === 'uploading') {
    return <GenerationProgress step={step} />;
  }

  return (
    <main className="home-main">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">🇲🇾 OpenAI Build Week 2026</div>
        <h1 className="hero-headline">
          {t.hero_headline.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
        </h1>
        <p className="hero-sub">{t.hero_sub}</p>
      </section>

      {/* Form */}
      <section className="form-section">
        <form className="lesson-form" onSubmit={handleGenerate}>

          {/* Upload Zone */}
          <div className="form-block">
            <FileUploadZone onFileSelect={setFile} selectedFile={file} />
            <div className="divider"><span>{t.upload_or}</span></div>
          </div>

          {/* Fields */}
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
              <select className="field-select" value={form.year} onChange={set('year')} required>
                <option value="">—</option>
                {t.years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">{t.field_topic}</label>
            <input
              className="field-input"
              value={form.topic}
              onChange={set('topic')}
              placeholder={t.languages[0] === 'English' ? 'e.g. Forms of Energy' : 'cth. Bentuk-bentuk Tenaga'}
              required
            />
          </div>

          <div className="form-grid">
            <div className="field-group">
              <label className="field-label">{t.field_language}</label>
              <select className="field-select" value={form.language} onChange={set('language')}>
                <option value="">Auto</option>
                {t.languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">{t.field_objectives}</label>
            <textarea
              className="field-textarea"
              value={form.objectives}
              onChange={set('objectives')}
              placeholder={t.objectives_placeholder}
              rows={3}
            />
          </div>

          {formError && <div className="form-error">{formError}</div>}
          {error && <div className="form-error">{t.error_generate}</div>}

          <button type="submit" className="generate-btn">
            <span className="generate-btn-icon">✦</span>
            {t.generate_btn}
          </button>
        </form>
      </section>

      {/* How it works */}
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
