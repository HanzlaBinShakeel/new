import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logo } from '../assets';
import { nav } from '../data/content';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const onHero = !scrolled;

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${onHero ? styles.onHero : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className={`container ${styles.inner}`}>
        <a href="#home" className={styles.logo}>
          <img src={logo} alt="Rateb Y. Rabie, KCHS" width={160} height={120} />
        </a>

        <nav className={styles.nav} aria-label="Main navigation">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${item.href === '#home' ? styles.active : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.lang} aria-label="Language: English">
            <span className={styles.flag} aria-hidden>
              🇬🇧
            </span>
            English
            <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" aria-hidden>
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </button>
          <a href="#contact" className={styles.contactBtn}>
            Contact Us
          </a>
        </div>

        <button
          className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {item.label}
              </motion.a>
            ))}
            <a href="#contact" className={styles.contactBtn} onClick={() => setMenuOpen(false)}>
              Contact Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
