import { motion } from 'framer-motion';
import { heroPortrait } from '../assets';
import { hero } from '../data/content';
import styles from './Hero.module.css';

const PORTRAIT_WIDTH = 1169;
const PORTRAIT_HEIGHT = 1080;

export default function Hero() {
  return (
    <section id="home" className={styles.hero} aria-label="Hero">
      <motion.div
        className={styles.bg}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        aria-hidden
      >
        <motion.div
          className={styles.lightStreak}
          animate={{ opacity: [0.4, 0.7, 0.4], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.lightStreak2}
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className={styles.bokeh} />
      </motion.div>

      <motion.div
        className={styles.copy}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>
      </motion.div>

      <motion.div
        className={styles.portraitCol}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={heroPortrait}
          alt="Sir Rateb Y. Rabie, KCHS speaking at a podium"
          className={styles.portrait}
          width={PORTRAIT_WIDTH}
          height={PORTRAIT_HEIGHT}
          decoding="sync"
          fetchPriority="high"
          draggable={false}
        />
      </motion.div>
    </section>
  );
}
