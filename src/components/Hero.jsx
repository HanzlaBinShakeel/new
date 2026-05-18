import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroSlides, site } from '../data/content';
import styles from './Hero.module.css';

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[index];

  return (
    <section id="home" className={styles.hero}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={styles.bg}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={slide.image} alt="" />
          <div className={styles.overlay} />
        </motion.div>
      </AnimatePresence>

      <div className={styles.gradientOrb} aria-hidden />
      <div className={styles.gradientOrb2} aria-hidden />

      <div className={`container ${styles.content}`}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {slide.eyebrow}
        </motion.p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          {slide.title}
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {slide.subtitle}
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <a href="#about" className="btn btn-primary">
            {slide.cta}
          </a>
          <a href={site.donateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Donate Now
          </a>
        </motion.div>

        <div className={styles.meta}>
          <span className={styles.name}>{site.name}</span>
          <motion.div className={styles.dots}>
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={i === index ? styles.active : ''}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </motion.div>
          <span className={styles.counter}>
            {String(index + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <motion.a
        href="#about"
        className={styles.scroll}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span>Scroll Down</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.a>
    </section>
  );
}
