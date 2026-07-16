import { LanguageProvider, useLang } from './context/LanguageContext.jsx';
import LanguageToggle from './components/LanguageToggle.jsx';
import Home from './pages/Home.jsx';

function AppInner() {
  const { t } = useLang();
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-logo">⚡</span>
          <span className="brand-name">{t.brand}</span>
          <span className="brand-tag">{t.tagline}</span>
        </div>
        <div className="header-right">
          <LanguageToggle />
        </div>
      </header>
      <Home />
      <footer className="app-footer">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
