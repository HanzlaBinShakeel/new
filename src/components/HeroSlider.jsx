import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroSlides } from '../data/heroSlides';
import { slideVariants, DURATION, EASE_OUT } from '../utils/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './HeroSlider.module.css';

const INTERVAL_MS = 6000;

export default function HeroSlider({ index, onIndexChange }) {
  const slides = heroSlides;
  const [internalIndex, setInternalIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const active = index ?? internalIndex;
  const setActive = onIndexChange ?? setInternalIndex;
  const total = slides.length;

  const goTo = useCallback(
    (next) => {
      const n = (next + total) % total;
      const fwd = n > active || (n === 0 && active === total - 1);
      setDirection(fwd ? 1 : -1);
      setActive(n);
    },
    [total, setActive, active]
  );

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => goTo(active + 1), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [total, active, goTo]);

  if (total === 0) return null;

  const safeIndex = Math.min(Math.max(active, 0), total - 1);
  const current = slides[safeIndex];

  return (
    <div className={styles.wrap}>
      <div className={styles.frame}>
        <div className={styles.viewport}>
          {reduced ? (
            <div className={styles.slideActive}>
              <img src={current.src} alt={current.alt} className={styles.image} draggable={false} />
            </div>
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                className={styles.slideActive}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <img src={current.src} alt={current.alt} className={styles.image} draggable={false} />
              </motion.div>
            </AnimatePresence>
          )}
          <div className={styles.shine} aria-hidden />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`caption-${safeIndex}`}
            className={styles.caption}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: DURATION.md, ease: EASE_OUT }}
          >
            <div className={styles.captionAccent} aria-hidden />
            <div className={styles.captionText}>
              <p className={styles.title}>{current.title}</p>
              <div className={styles.meta}>
                <span className={styles.counter}>
                  {String(safeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.progress} aria-hidden>
          <motion.div
            className={styles.progressFill}
            animate={{ width: `${((safeIndex + 1) / total) * 100}%` }}
            transition={{ duration: DURATION.lg, ease: EASE_OUT }}
          />
        </div>
      </div>

      {total > 1 && (
        <div className={styles.controls}>
          <motion.button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(safeIndex - 1)}
            aria-label="Previous"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            ‹
          </motion.button>
          <div className={styles.thumbs} role="tablist" aria-label="Slide thumbnails">
            {slides.map((s, i) => (
              <motion.button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === safeIndex}
                aria-label={s.title}
                className={i === safeIndex ? styles.thumbActive : styles.thumb}
                onClick={() => goTo(i)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <img src={s.src} alt="" />
              </motion.button>
            ))}
          </div>
          <motion.button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(safeIndex + 1)}
            aria-label="Next"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            ›
          </motion.button>
        </div>
      )}
    </div>
  );
}
