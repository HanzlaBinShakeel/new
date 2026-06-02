import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { bannerStagger, bannerItem } from '../utils/motion';
import styles from './PageBanner.module.css';

export default function PageBanner({ label, title, description }) {
  const reduced = useReducedMotion();

  const content = (
    <>
      {label && (
        <motion.span className="section-label" variants={bannerItem}>
          {label}
        </motion.span>
      )}
      <motion.h1 className={styles.title} variants={bannerItem}>
        {title}
      </motion.h1>
      {description && (
        <motion.p className={styles.desc} variants={bannerItem}>
          {description}
        </motion.p>
      )}
    </>
  );

  return (
    <section className={styles.banner}>
      <div className={styles.bg} aria-hidden />
      <div className="container">
        {reduced ? (
          <div>
            {label && <span className="section-label">{label}</span>}
            <h1 className={styles.title}>{title}</h1>
            {description && <p className={styles.desc}>{description}</p>}
          </div>
        ) : (
          <motion.div
            variants={bannerStagger}
            initial="hidden"
            animate="visible"
          >
            {content}
          </motion.div>
        )}
      </div>
    </section>
  );
}
