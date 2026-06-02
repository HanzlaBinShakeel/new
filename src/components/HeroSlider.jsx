import { useState, useEffect, useCallback } from 'react';
import { heroSlides } from '../data/heroSlides';
import styles from './HeroSlider.module.css';

const INTERVAL_MS = 6000;

export default function HeroSlider({ index, onIndexChange }) {
  const slides = heroSlides;
  const [internalIndex, setInternalIndex] = useState(0);
  const active = index ?? internalIndex;
  const setIndex = onIndexChange ?? setInternalIndex;
  const total = slides.length;

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [total, setIndex]);

  const goTo = useCallback(
    (next) => {
      setIndex((next + total) % total);
    },
    [total, setIndex]
  );

  if (total === 0) return null;

  const safeIndex = Math.min(Math.max(active, 0), total - 1);
  const current = slides[safeIndex];

  return (
    <div className={styles.wrap}>
      <div className={styles.frame}>
        <div className={styles.viewport}>
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`${styles.slide} ${i === safeIndex ? styles.active : ''}`}
              aria-hidden={i !== safeIndex}
            >
              <img src={slide.src} alt={slide.alt} className={styles.image} draggable={false} />
            </div>
          ))}
          <div className={styles.shine} aria-hidden />
        </div>

        <div className={styles.caption}>
          <div className={styles.captionAccent} aria-hidden />
          <div className={styles.captionText}>
            <p className={styles.title}>{current.title}</p>
            <div className={styles.meta}>
              <span className={styles.badge}>Gallery</span>
              <span className={styles.counter}>
                {String(safeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.progress} aria-hidden>
          <div
            className={styles.progressFill}
            style={{ width: `${((safeIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {total > 1 && (
        <div className={styles.controls}>
          <button type="button" className={styles.arrow} onClick={() => goTo(safeIndex - 1)} aria-label="Previous">
            ‹
          </button>
          <div className={styles.thumbs} role="tablist" aria-label="Slide thumbnails">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === safeIndex}
                aria-label={s.title}
                className={i === safeIndex ? styles.thumbActive : styles.thumb}
                onClick={() => setIndex(i)}
              >
                <img src={s.src} alt="" />
              </button>
            ))}
          </div>
          <button type="button" className={styles.arrow} onClick={() => goTo(safeIndex + 1)} aria-label="Next">
            ›
          </button>
        </div>
      )}
    </div>
  );
}
