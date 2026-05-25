import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher({ onHero, scrolled, mobile }) {
  const { lang, setLang, languages, current } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  if (mobile) {
    return (
      <div className={styles.mobileLangs}>
        {languages.map((l) => (
          <button
            key={l.code}
            type="button"
            className={lang === l.code ? styles.mobileActive : ''}
            onClick={() => setLang(l.code)}
          >
            <span aria-hidden>{l.flag}</span> {l.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`${styles.wrap} ${open ? styles.open : ''} ${onHero ? styles.onHero : ''} ${scrolled ? styles.scrolled : ''}`}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.label}`}
      >
        <span className={styles.flag} aria-hidden>
          {current.flag}
        </span>
        {current.label}
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
      <ul className={styles.menu} role="listbox">
        {languages.map((l) => (
          <li key={l.code}>
            <button
              type="button"
              role="option"
              aria-selected={lang === l.code}
              className={lang === l.code ? styles.active : ''}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
            >
              <span aria-hidden>{l.flag}</span>
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
