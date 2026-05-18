import { motion } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
import { organizations } from '../data/content';
import styles from './Organizations.module.css';

export default function Organizations() {
  return (
    <AnimatedSection id="organizations" className={styles.section}>
      <motion.div className="container">
        <Reveal className={styles.header}>
          <span className="section-label">Way to success</span>
          <h2 className="section-title">Organizations & Impact</h2>
          <p className="section-desc">
            Building bridges between the West and Palestine through faith, heritage, and humanitarian action.
          </p>
        </Reveal>

        <div className={styles.cards}>
          {organizations.map((org, i) => (
            <Reveal key={org.abbr} delay={i}>
              <motion.a
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className={styles.imgWrap}>
                  <img src={org.image} alt={org.name} />
                  <div className={styles.imgOverlay} />
                  <span className={styles.abbr}>{org.abbr}</span>
                </div>
                <motion.div className={styles.body}>
                  <h3>{org.name}</h3>
                  <span className={styles.role}>{org.role}</span>
                  <p>{org.description}</p>
                  <span className={styles.link}>Visit website →</span>
                </motion.div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
