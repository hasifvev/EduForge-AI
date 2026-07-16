import { useLang } from '../context/LanguageContext.jsx';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang();
  return (
    <button className="lang-toggle" onClick={toggleLang} title="Toggle language / Tukar bahasa">
      <span className={lang === 'en' ? 'lang-active' : 'lang-inactive'}>EN</span>
      <span className="lang-sep">|</span>
      <span className={lang === 'bm' ? 'lang-active' : 'lang-inactive'}>BM</span>
    </button>
  );
}
