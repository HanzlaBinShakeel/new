import { motion } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
import { careerHighlights, skills } from '../data/content';
import styles from './Career.module.css';

export default function Career() {
  return (
    <AnimatedSection id="career" className={styles.career}>
      <div className="container">
        <div className={styles.split}>
          <Reveal>
            <span className="section-label">Way to success</span>
            <h2 className="section-title">Humanitarian Career</h2>
            <p className="section-desc">
              Over 25 years of visionary leadership — from the Holy Land to communities worldwide.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <ul className={styles.highlights}>
              {careerHighlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span className={styles.bullet} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className={styles.skillsWrap}>
          <h3>Core Knowledge & Skills</h3>
          <div className={styles.skills}>
            {skills.map((skill) => (
              <motion.span
                key={skill}
                className={styles.skill}
                whileHover={{ scale: 1.05, borderColor: 'var(--gold)' }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </AnimatedSection>
  );
}
