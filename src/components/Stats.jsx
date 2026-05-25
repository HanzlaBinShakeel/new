import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { stats } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Stats.module.css';

function Counter({ value, suffix }) {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref} className={styles.value}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useLanguage();
  const [ref, inView] = useInView();

  return (
    <section className={styles.stats} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              className={styles.item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className={styles.label}>{t(stat.labelKey)}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
