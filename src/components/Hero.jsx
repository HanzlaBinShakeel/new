import { useState } from 'react';
import { motion } from 'framer-motion';
import { heroPortrait } from '../assets';
import { useLanguage } from '../i18n/LanguageContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeLeft, fadeRight, blurUp } from '../utils/motion';
import HeroSlider from './HeroSlider';
import styles from './Hero.module.css';

const PORTRAIT_WIDTH = 520;
const PORTRAIT_HEIGHT = 480;

export default function Hero() {
  const { t } = useLanguage();
  const [slideIndex, setSlideIndex] = useState(0);
  const reduced = useReducedMotion();

  const leftProps = reduced
    ? {}
    : {
        variants: fadeLeft,
        initial: 'hidden',
        animate: 'visible',
        custom: 0.1,
      };

  const rightProps = reduced
    ? {}
    : {
        variants: fadeRight,
        initial: 'hidden',
        animate: 'visible',
        custom: 0.25,
      };

  const copyProps = reduced
    ? {}
    : {
        variants: blurUp,
        initial: 'hidden',
        animate: 'visible',
        custom: 0.45,
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
        <motion.div className={styles.leftCol} {...leftProps}>
          <HeroSlider index={slideIndex} onIndexChange={setSlideIndex} />
          <motion.div className={styles.copy} {...copyProps}>
            <h1 className={styles.title}>{t('hero.title')}</h1>
            <p className={styles.subtitle}>{t('hero.subtitle')}</p>
          </motion.div>
        </motion.div>

        <motion.div className={styles.portraitCol} {...rightProps}>
          <motion.img
            src={heroPortrait}
            alt="Sir Rateb Y. Rabie, KCHS speaking at a podium"
            className={styles.portrait}
            width={PORTRAIT_WIDTH}
            height={PORTRAIT_HEIGHT}
            decoding="sync"
            fetchPriority="high"
            draggable={false}
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
