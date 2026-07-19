import { useState, useCallback } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import FileUploadZone from '../components/FileUploadZone.jsx';
import GenerationProgress from '../components/GenerationProgress.jsx';
import { useGeneration } from '../hooks/useGeneration.js';
import Dashboard from './Dashboard.jsx';
import { buildMaterialSearchUrl, getCurriculumMapping, getSubjectsForCountry, getTopicSuggestions } from '../utils/curriculumMapping.js';
import { WORLD_LANGUAGE_OPTIONS } from '../utils/curriculumCatalog.js';

const PERSONAS = [
  { id: 'Beginner', emoji: '🌱', label_key: 'persona_beginner' },
  { id: 'Mixed Ability', emoji: '🔀', label_key: 'persona_mixed' },
  { id: 'On-Level', emoji: '⭐', label_key: 'persona_onlevel' },
  { id: 'Gifted & Talented', emoji: '🚀', label_key: 'persona_gifted' },
  { id: 'SEN Support', emoji: '💚', label_key: 'persona_sen' },
];
const DEMO_SCENARIOS = [
  { id: 'ngss', countryCode: 'US', subject: 'Science', year: 'Grade 5', topic: 'States of Matter', language: 'English', curriculum: 'NGSS 5-PS1-1' },
  { id: 'kssm', countryCode: 'MY', subject: 'Sains', year: 'Tingkatan 1', topic: 'Keadaan Jirim', language: 'Bahasa Melayu', curriculum: 'KSSM Malaysia' },
  { id: 'aqa', countryCode: 'GB', subject: 'History', year: 'Year 10', topic: 'Norman Conquest 1066', language: 'English', curriculum: 'AQA GCSE History' },
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
    materialUrl: '',
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
      subject: '',
      topic: '',
      year: '', // reset grade when country changes
    }));
  };

  const handlePersonaSelect = (personaId) => {
    setForm(f => ({ ...f, studentPersona: personaId }));
  };
  const loadDemoScenario = (scenario) => {
    const country = t.countries.find((item) => item.code === scenario.countryCode);
    setSelectedCountry(country || null);
    setFile(null);
    setForm((current) => ({ ...current, subject: scenario.subject, year: scenario.year, topic: scenario.topic, language: scenario.language, country: country?.name || '', curriculumStandard: scenario.curriculum, objectives: '', materialUrl: '' }));
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

  const curriculumMapping = getCurriculumMapping(selectedCountry?.code, form.subject, form.year);
  const materialSearchUrl = buildMaterialSearchUrl({ countryCode: selectedCountry?.code, country: form.country, subject: form.subject, year: form.year, topic: form.topic });

  const availableSubjects = getSubjectsForCountry(selectedCountry?.code, t.subjects, form.year);
  const topicSuggestions = form.subject && form.year ? getTopicSuggestions(selectedCountry?.code, form.subject, form.year) : [];

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
        <div className="demo-scenario-row" aria-label={t.demo_scenarios_label}>
          {DEMO_SCENARIOS.map((scenario) => (
            <button key={scenario.id} type="button" className="demo-scenario-btn" onClick={() => loadDemoScenario(scenario)}>{t.demo_scenarios[scenario.id]}</button>
          ))}
        </div>
      </section>

      {/* ── Form ────────────────────────────────────────────────────────── */}
      <section className="form-section">
        <form className="lesson-form" onSubmit={handleGenerate}>

          {/* Upload */}
          <div className="form-block">
            <FileUploadZone
              onFileSelect={(selectedFile) => {
                setFile(selectedFile);
                if (selectedFile) setFormError('');
              }}
              onFileTooLarge={(selectedFile) => {
                setFile(null);
                setFormError(`“${selectedFile.name}” is too large. Upload a file that is 4 MB or smaller.`);
              }}
              selectedFile={file}
            />
            <div className="divider"><span>{t.upload_or}</span></div>
          </div>

          <div className="field-group">
            <label className="field-label">{t.field_material_link}</label>
            <input
              className="field-input"
              type="url"
              inputMode="url"
              value={form.materialUrl}
              onChange={set('materialUrl')}
              placeholder={t.material_link_placeholder}
            />
            <a className="material-search-link" href={materialSearchUrl} target="_blank" rel="noreferrer">{t.material_search_label}</a>
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
            {selectedCountry && form.subject && form.year && curriculumMapping.framework && (
              <>
                <div className="curriculum-map">{curriculumMapping.framework} · {curriculumMapping.subject} · {curriculumMapping.grade}</div>
                {curriculumMapping.sourceUrl && <a className="curriculum-source-link" href={curriculumMapping.sourceUrl} target="_blank" rel="noreferrer">{t.curriculum_source_link || 'Official curriculum guide'}</a>}
              </>
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
              <select className="field-select" value={form.subject} onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value, topic: '' }))} required>
                <option value="">—</option>
                {availableSubjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="field-group">
              <label className="field-label">{t.field_year}</label>
              {currentGrades.length > 0 ? (
                <select className="field-select" value={form.year} onChange={(event) => setForm((current) => ({ ...current, year: event.target.value, subject: '', topic: '' }))} required>
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
              list="topic-suggestions"
              required
            />
            <datalist id="topic-suggestions">
              {topicSuggestions.map((topic) => <option key={topic} value={topic} />)}
            </datalist>
            {topicSuggestions.length > 0 && (
              <div className="topic-suggestions" aria-label={t.topic_suggestions_label}>
                {topicSuggestions.map((topic) => <button key={topic} type="button" onClick={() => setForm((current) => ({ ...current, topic }))}>{topic}</button>)}
              </div>
            )}
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
              <input
                className="field-input field-input-sm"
                value={form.language}
                onChange={set('language')}
                placeholder={t.language_any_placeholder || 'Any language'}
                list="world-language-options"
              />
              <datalist id="world-language-options">
                {WORLD_LANGUAGE_OPTIONS.map((language) => <option key={language} value={language} />)}
              </datalist>
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

          {formError && <div className="form-error" role="alert">{formError}</div>}
          {error && (
            <div className="form-error" role="alert">
              <div>{error}</div>
              {error.includes('Demo mode only') && (
                <div className="demo-error-actions">
                  {DEMO_SCENARIOS.map((scenario) => (
                    <button key={scenario.id} type="button" onClick={() => loadDemoScenario(scenario)}>{t.demo_scenarios[scenario.id]}</button>
                  ))}
                </div>
              )}
            </div>
          )}

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
