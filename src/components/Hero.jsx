import { useState } from 'react';
import { motion } from 'framer-motion';
import { heroPortrait } from '../assets';
import { useLanguage } from '../i18n/LanguageContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeUp, staggerDelay } from '../utils/motion';
import HeroSlider from './HeroSlider';
import styles from './Hero.module.css';

const PORTRAIT_WIDTH = 420;
const PORTRAIT_HEIGHT = 520;

export default function Hero() {
  const { t } = useLanguage();
  const [slideIndex, setSlideIndex] = useState(0);
  const reduced = useReducedMotion();

  const gridProps = reduced
    ? {}
    : {
        initial: 'hidden',
        animate: 'visible',
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
        },
      };

  const itemProps = reduced
    ? {}
    : {
        variants: fadeUp,
        custom: staggerDelay(0),
      };

  return (
    <section id="home" className={styles.hero} aria-label="Hero">
      <div className={styles.bg} aria-hidden>
        <motion.div
          className={styles.bokeh}
          animate={reduced ? undefined : { scale: [1, 1.06, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.inner}>
        <motion.div className={styles.heroGrid} {...gridProps}>
          <motion.div className={styles.galleryCol} {...itemProps}>
            <HeroSlider index={slideIndex} onIndexChange={setSlideIndex} />
          </motion.div>

          <motion.div className={styles.portraitCol} {...itemProps}>
            <motion.img
              src={heroPortrait}
              alt="Sir Rateb Y. Rabie, KCHS speaking at a podium"
              className={styles.portrait}
              width={PORTRAIT_WIDTH}
              height={PORTRAIT_HEIGHT}
              decoding="sync"
              fetchPriority="high"
              draggable={false}
              animate={reduced ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <motion.div className={styles.copyCol} {...itemProps}>
            <h1 className={styles.title}>
              <span className={styles.titleLine}>{t('hero.title')}</span>
              <span className={styles.titleLine}>{t('hero.subtitle')}</span>
            </h1>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
