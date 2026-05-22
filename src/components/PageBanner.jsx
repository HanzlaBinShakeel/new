import { motion } from 'framer-motion';
import styles from './PageBanner.module.css';

export default function PageBanner({ label, title, description }) {
  return (
    <section className={styles.banner}>
      <div className={styles.bg} aria-hidden />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {label && <span className="section-label">{label}</span>}
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.desc}>{description}</p>}
        </motion.div>
      </div>
    </section>
  );
}
