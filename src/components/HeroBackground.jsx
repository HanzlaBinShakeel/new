import { useState, useEffect } from 'react';
import { galleryImages } from '../data/gallery';
import styles from './HeroBackground.module.css';

const INTERVAL_MS = 6000;

export default function HeroBackground() {
  const [index, setIndex] = useState(0);
  const images = galleryImages;

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return <div className={styles.fallback} aria-hidden />;

  return (
    <div className={styles.wrap} aria-hidden>
      {images.map((img, i) => (
        <div
          key={img.id}
          className={`${styles.slide} ${i === index ? styles.active : ''}`}
          style={{ backgroundImage: `url(${img.src})` }}
        />
      ))}
      <div className={styles.overlay} />
    </div>
  );
}
