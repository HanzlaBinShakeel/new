import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logo } from '../assets';
import { nav, site } from '../data/content';
import { navChildKey } from '../data/nav';
import { useLanguage } from '../i18n/LanguageContext';
import NavDropdown from './NavDropdown';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './Header.module.css';

export default function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const onHero = isHome && !scrolled;

  return (
    <>
      <div
        className={`${styles.topBar} ${onHero ? styles.topBarHero : ''} ${scrolled ? styles.topBarHidden : ''}`}
      >
        <div className={`container ${styles.topInner}`}>
          <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className={styles.phone}>
            {site.phone}
          </a>
          <a
            href={site.donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.donateTop}
          >
            {t('common.donateNow')}
          </a>
        </div>
      </div>

      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${onHero ? styles.onHero : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Rateb Y. Rabie, KCHS" width={577} height={433} />
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            {nav.map((item) => (
              <NavDropdown key={item.path} item={item} onHero={onHero} scrolled={scrolled} />
            ))}
          </nav>

          <div className={styles.actions}>
            <LanguageSwitcher onHero={onHero} scrolled={scrolled} />
            <Link to="/contact" className={styles.contactBtn}>
              {t('nav.connect')}
            </Link>
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
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {nav.map((item) => (
                <div key={item.path} className={styles.mobileGroup}>
                  <Link to={item.path} onClick={() => setMenuOpen(false)}>
                    {t(item.labelKey)}
                  </Link>
                  {item.children?.map((child) => {
                    if (child.type === 'group') {
                      return (
                        <span key={navChildKey(child)} className={styles.mobileGroupLabel}>
                          {t(child.labelKey)}
                        </span>
                      );
                    }
                    if (child.external || child.href) {
                      return (
                        <a
                          key={navChildKey(child)}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.mobileChild}
                          onClick={() => setMenuOpen(false)}
                        >
                          {t(child.labelKey)} ↗
                        </a>
                      );
                    }
                    return (
                      <Link
                        key={navChildKey(child)}
                        to={child.path}
                        className={styles.mobileChild}
                        onClick={() => setMenuOpen(false)}
                      >
                        {t(child.labelKey)}
                      </Link>
                    );
                  })}
                </div>
              ))}
              <LanguageSwitcher mobile />
              <a
                href={site.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.donateMobile}
                onClick={() => setMenuOpen(false)}
              >
                {t('common.donateNow')}
              </a>
              <Link to="/contact" className={styles.contactBtn} onClick={() => setMenuOpen(false)}>
                {t('nav.connect')}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
