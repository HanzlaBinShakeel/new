import { useState } from 'react';
import { motion } from 'framer-motion';
import { heroPortrait } from '../assets';
import { useLanguage } from '../i18n/LanguageContext';
import HeroSlider from './HeroSlider';
import styles from './Hero.module.css';

const PORTRAIT_WIDTH = 520;
const PORTRAIT_HEIGHT = 480;

export default function Hero() {
  const { t } = useLanguage();
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <section id="home" className={styles.hero} aria-label="Hero">
      <div className={styles.bg} aria-hidden>
        <div className={styles.bokeh} />
        <div className={styles.overlay} />
      </div>

      <motion.div className={styles.inner}>
        <motion.div
          className={styles.leftCol}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroSlider index={slideIndex} onIndexChange={setIndex} />
          <div className={styles.copy}>
            <h1 className={styles.title}>{t('hero.title')}</h1>
            <p className={styles.subtitle}>{t('hero.subtitle')}</p>
          </div>
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
