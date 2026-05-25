import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { galleryImages } from '../data/gallery';
import { heroPortrait } from '../assets';
import { useLanguage } from '../i18n/LanguageContext';
import HeroBackground from './HeroBackground';
import styles from './Hero.module.css';

const PORTRAIT_WIDTH = 520;
const PORTRAIT_HEIGHT = 480;

export default function Hero() {
  const { t } = useLanguage();
  const [slideIndex, setSlideIndex] = useState(0);
  const total = galleryImages.length || 1;

  const prev = useCallback(() => {
    setSlideIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setSlideIndex((i) => (i + 1) % total);
  }, [total]);

  return (
    <section id="home" className={styles.hero} aria-label="Hero">
      <HeroBackground index={slideIndex} onIndexChange={setSlideIndex} />

      <motion.div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className={styles.title}>{t('hero.title')}</h1>
          <p className={styles.subtitle}>{t('hero.subtitle')}</p>
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

      {total > 1 && (
        <div className={styles.controls} aria-label="Hero slideshow controls">
          <button type="button" onClick={prev} aria-label="Previous slide">
            ‹
          </button>
          <button type="button" onClick={next} aria-label="Next slide">
            ›
          </button>
        </div>
      )}
    </section>
  );
}
