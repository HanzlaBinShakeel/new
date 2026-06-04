import { useState } from 'react';
import { motion } from 'framer-motion';
import { heroPortrait } from '../assets';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeLeft, fadeRight } from '../utils/motion';
import HeroSlider from './HeroSlider';
import styles from './Hero.module.css';

const PORTRAIT_WIDTH = 1560;
const PORTRAIT_HEIGHT = 1440;

export default function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const reduced = useReducedMotion();

  const galleryProps = reduced
    ? {}
    : {
        variants: fadeLeft,
        initial: 'hidden',
        animate: 'visible',
        custom: 0.1,
      };

  const portraitProps = reduced
    ? {}
    : {
        variants: fadeRight,
        initial: 'hidden',
        animate: 'visible',
        custom: 0.2,
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
        <motion.div className={styles.galleryCol} {...galleryProps}>
          <HeroSlider index={slideIndex} onIndexChange={setSlideIndex} />
        </motion.div>

        <motion.div className={styles.portraitCol} {...portraitProps}>
          <div className={styles.portraitScale}>
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
