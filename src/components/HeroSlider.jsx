import { useState, useEffect, useCallback } from 'react';
import { heroSlides } from '../data/heroSlides';
import styles from './HeroSlider.module.css';

const INTERVAL_MS = 5500;

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

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total, setIndex]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total, setIndex]);

  if (total === 0) return null;

  const current = slides[active];

  return (
    <div className={styles.wrap}>
      <div className={styles.viewport}>
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${i === active ? styles.active : ''}`}
            aria-hidden={i !== active}
          >
            <img src={slide.src} alt={slide.title} className={styles.image} draggable={false} />
          </div>
        ))}
        <div className={styles.titleBar}>
          <p className={styles.title}>{current.title}</p>
          <span className={styles.counter}>
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>

      {total > 1 && (
        <div className={styles.controls}>
          <button type="button" onClick={prev} aria-label="Previous image">
            ‹
          </button>
          <div className={styles.dots}>
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={i === active ? styles.dotActive : styles.dot}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
              />
            ))}
          </div>
          <button type="button" onClick={next} aria-label="Next image">
            ›
          </button>
        </div>
      )}
    </div>
  );
}
