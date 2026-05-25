import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANG, LANGUAGES, STORAGE_KEY } from './languages';
import en from './translations/en';
import es from './translations/es';
import ar from './translations/ar';

const bundles = { en, es, ar };

const LanguageContext = createContext(null);

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANG;
    const saved = localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.some((l) => l.code === saved) ? saved : DEFAULT_LANG;
  });

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = current.dir;
    document.body.classList.toggle('rtl', current.dir === 'rtl');
  }, [lang, current.dir]);

  const t = (key, vars) => {
    let value = getNested(bundles[lang], key) ?? getNested(bundles.en, key) ?? key;
    if (typeof value === 'string' && vars) {
      Object.entries(vars).forEach(([k, v]) => {
        value = value.replace(`{${k}}`, String(v));
      });
    }
    return value;
  };

  const setLang = (code) => {
    if (LANGUAGES.some((l) => l.code === code)) setLangState(code);
  };

  const value = useMemo(() => ({ lang, setLang, t, current, languages: LANGUAGES }), [lang, current]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
