import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/gallery';
import styles from './ImageGallery.module.css';

const AUTOPLAY_MS = 5000;

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.96,
  }),
};

export default function ImageGallery() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const total = galleryImages.length;
  const current = galleryImages[index];

  const goTo = useCallback(
    (next, dir) => {
      if (total === 0) return;
      setDirection(dir ?? (next > index ? 1 : -1));
      setIndex((next + total) % total);
    },
    [index, total]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, next, total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (total === 0) return null;

  return (
    <section
      id="gallery"
      className={styles.section}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Photo gallery"
    >
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Moments & Milestones</span>
          <h2 className="section-title">A Legacy of Leadership</h2>
          <p className={styles.desc}>
            Highlights from events, advocacy, and service — documenting a lifelong commitment to peace
            and justice.
          </p>
        </motion.div>

        <div className={styles.stage}>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={prev}
            aria-label="Previous image"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className={styles.viewport}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                className={styles.slide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={current.src} alt={current.alt} className={styles.mainImage} loading="lazy" />
                <motion.div
                  className={styles.shine}
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                />
              </motion.div>
            </AnimatePresence>

            <div className={styles.counter}>
              <span className={styles.counterCurrent}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.counterSep}>/</span>
              <span className={styles.counterTotal}>{String(total).padStart(2, '0')}</span>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={next}
            aria-label="Next image"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className={styles.thumbs} role="tablist" aria-label="Gallery thumbnails">
          {galleryImages.map((img, i) => (
            <button
              key={img.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`View image ${i + 1}`}
              className={`${styles.thumb} ${i === index ? styles.thumbActive : ''}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
            >
              <img src={img.src} alt="" loading="lazy" />
              {i === index && (
                <motion.span
                  className={styles.thumbRing}
                  layoutId="thumbRing"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className={styles.progress}>
          <motion.div
            className={styles.progressBar}
            key={index}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
          />
        </div>
      </div>
    </section>
  );
}
