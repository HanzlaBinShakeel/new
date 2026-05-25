import { motion } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './About.module.css';

export default function About() {
  const { t } = useLanguage();
  const paragraphs = t('about.biographyText').split('\n\n');

  return (
    <AnimatedSection id="about" className={styles.bio}>
      <div className="container">
        <div className={styles.bioGrid}>
          <Reveal>
            <span className="section-label">{t('about.label')}</span>
            <h2 className="section-title">{t('about.biographyTitle')}</h2>
          </Reveal>
          <Reveal delay={2}>
            <div className={styles.bioText}>
              {paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <div className={styles.links}>
              <a href="https://hcef.org/" target="_blank" rel="noopener noreferrer">
                HCEF
              </a>
              <a href="https://www.kthps.org/" target="_blank" rel="noopener noreferrer">
                KTH
              </a>
              <a
                href="https://www.linkedin.com/in/rateb-rabie-898b663/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://en.wikipedia.org/wiki/Rateb_Y._Rabie"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </AnimatedSection>
  );
}
