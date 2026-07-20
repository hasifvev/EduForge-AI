import { useLang } from '../context/LanguageContext.jsx';

export default function MaterialIntelligence({ intelligence }) {
  const { t } = useLang();

  if (!intelligence?.summary) return null;

  const isLimited = intelligence.confidence !== 'source-grounded';

  return (
    <section className="lesson-summary-bar" aria-labelledby="material-intelligence-title">
      <h2 id="material-intelligence-title" style={{ margin: '0 0 0.5rem' }}>
        📄 {t.material_intelligence_title}
      </h2>
      <p className="summary-text">{intelligence.summary}</p>
      {isLimited && <p className="summary-text" style={{ color: '#a16207' }}>{t.material_intelligence_limited}</p>}

      {intelligence.topics?.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ marginBottom: '0.45rem' }}>🧭 {t.material_intelligence_topics}</h3>
          {intelligence.topics.map((item) => (
            <div key={item.name} style={{ marginBottom: '0.7rem' }}>
              <strong>{item.name}</strong>
              <p style={{ margin: '0.2rem 0' }}>{item.explanation}</p>
              {item.evidence && <small><em>{t.material_intelligence_evidence}: “{item.evidence}”</em></small>}
            </div>
          ))}
        </div>
      )}

      {intelligence.learning_goals?.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ marginBottom: '0.45rem' }}>💬 {t.material_intelligence_explain}</h3>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {intelligence.learning_goals.map((item) => (
              <li key={item.goal}>
                {item.goal}
                {item.evidence && <small style={{ display: 'block' }}><em>{t.material_intelligence_evidence}: “{item.evidence}”</em></small>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {intelligence.teacher_note && <p style={{ margin: '1rem 0 0', fontSize: '0.9rem' }}>🧑‍🏫 {intelligence.teacher_note}</p>}
    </section>
  );
}
