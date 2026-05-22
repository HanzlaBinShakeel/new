import { motion } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
import { biography } from '../data/content';
import styles from './About.module.css';

export default function About() {
  return (
    <AnimatedSection id="about" className={styles.bio}>
      <div className="container">
        <div className={styles.bioGrid}>
          <Reveal>
            <span className="section-label">Biography</span>
            <h2 className="section-title">{biography.title}</h2>
          </Reveal>
          <Reveal delay={2}>
            <div
              className={styles.bioText}
              dangerouslySetInnerHTML={{
                __html: biography.text.split('\n\n').map((p) => `<p>${p}</p>`).join(''),
              }}
            />
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
