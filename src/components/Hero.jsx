import { motion } from 'framer-motion';
import { heroPortrait } from '../assets';
import { hero } from '../data/content';
import HeroBackground from './HeroBackground';
import styles from './Hero.module.css';

const PORTRAIT_WIDTH = 520;
const PORTRAIT_HEIGHT = 480;

export default function Hero() {
  return (
    <section id="home" className={styles.hero} aria-label="Hero">
      <HeroBackground />

      <motion.div className={styles.inner}>
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
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
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
      </motion.div>
    </section>
  );
}
