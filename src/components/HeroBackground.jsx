import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { galleryImages } from '../data/gallery';
import styles from './HeroBackground.module.css';

const INTERVAL_MS = 5000;

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
        <motion.div
          key={img.id}
          className={styles.slide}
          style={{ backgroundImage: `url(${img.src})` }}
          animate={{
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1.1 : 1.05,
          }}
          transition={{
            opacity: { duration: 1.6, ease: 'easeInOut' },
            scale: { duration: INTERVAL_MS / 1000, ease: 'linear' },
          }}
        />
      ))}
      <div className={styles.overlay} />
      <motion.div
        className={styles.lightStreak}
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
