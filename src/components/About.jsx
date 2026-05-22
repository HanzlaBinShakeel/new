import { motion } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
import { aboutSection, biography } from '../data/content';
import styles from './About.module.css';

export default function About() {
  return (
    <>
      <AnimatedSection id="about" className={styles.about}>
        <div className="container">
          <div className={styles.grid}>
            <Reveal className={styles.images}>
              <motion.div
                className={styles.imgMain}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img src="https://rateb.rabie.us/wp-content/uploads/2024/12/home4-image1-copyright.jpg" alt="Rateb Y. Rabie" />
              </motion.div>
              <div className={styles.badge}>
                <span>Support our mission</span>
                <strong>Blueprint for Peace</strong>
              </div>
            </Reveal>

            <Reveal delay={1} className={styles.text}>
              <span className="section-label">{aboutSection.label}</span>
              <h2 className="section-title">{aboutSection.title}</h2>
              <p className="section-desc">{aboutSection.description}</p>
              <a href="#cv" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                {aboutSection.cta}
              </a>
            </Reveal>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="message" className={styles.bio}>
        <motion.div className="container">
          <div className={styles.bioGrid}>
            <Reveal>
              <span className="section-label">Biography</span>
              <h2 className="section-title">{biography.title}</h2>
            </Reveal>
            <Reveal delay={2}>
              <motion.div
                className={styles.bioText}
                dangerouslySetInnerHTML={{
                  __html: biography.text.split('\n\n').map((p) => `<p>${p}</p>`).join(''),
                }}
              />
              <div className={styles.links}>
                <a href="https://hcef.org/" target="_blank" rel="noopener noreferrer">HCEF</a>
                <a href="https://www.kthps.org/" target="_blank" rel="noopener noreferrer">KTH</a>
                <a href="https://www.linkedin.com/in/rateb-rabie-898b663/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://en.wikipedia.org/wiki/Rateb_Y._Rabie" target="_blank" rel="noopener noreferrer">Wikipedia</a>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </AnimatedSection>
    </>
  );
}
