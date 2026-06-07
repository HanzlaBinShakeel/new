import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeLeft, fadeRight } from '../utils/motion';
import HeroSlider from './HeroSlider';
import styles from './Hero.module.css';

/** Full-resolution cutout served from /public (1560×1440, no bundler resize). */
const PORTRAIT_SRC = `${import.meta.env.BASE_URL}hero-portrait.png`;
const PORTRAIT_WIDTH = 1560;
const PORTRAIT_HEIGHT = 1440;

export default function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [galleryHeight, setGalleryHeight] = useState(null);
  const [portraitScale, setPortraitScale] = useState({ x: 0.9, y: 1 });
  const galleryRef = useRef(null);
  const portraitRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = galleryRef.current;
    if (!node) return;

    const update = () => setGalleryHeight(node.offsetHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(node);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  /** Fit inside portrait column: bottom aligns with gallery, nothing clipped off-screen. */
  useEffect(() => {
    const img = portraitRef.current;
    const col = img?.parentElement;
    if (!img || !col || !galleryHeight) return;

    const fit = () => {
      img.style.setProperty('transform', 'none');
      requestAnimationFrame(() => {
        const colWidth = col.clientWidth;
        const naturalW = img.offsetWidth;
        const naturalH = img.offsetHeight;
        if (!colWidth || !naturalW || !naturalH) return;

        let scaleY = 1;
        if (naturalH < galleryHeight - 1) {
          scaleY = Math.min(galleryHeight / naturalH, 1.1);
        } else if (naturalH > galleryHeight + 1) {
          scaleY = galleryHeight / naturalH;
        }

        let scaleX = 1;
        const scaledW = naturalW * scaleX;
        if (scaledW > colWidth - 4) {
          scaleX = (colWidth - 4) / naturalW;
        }

        setPortraitScale({
          x: Math.min(scaleX, 1),
          y: Math.min(scaleY, 1.1),
        });
      });
    };

    fit();
    if (!img.complete) img.addEventListener('load', fit);
    window.addEventListener('resize', fit);
    return () => {
      img.removeEventListener('load', fit);
      window.removeEventListener('resize', fit);
    };
  }, [galleryHeight]);

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
          <div ref={galleryRef} className={styles.galleryMeasure}>
            <HeroSlider index={slideIndex} onIndexChange={setSlideIndex} />
          </div>
        </motion.div>

        <motion.div
          className={styles.portraitCol}
          {...portraitProps}
          style={galleryHeight ? { height: galleryHeight } : undefined}
        >
          <img
            ref={portraitRef}
            src={PORTRAIT_SRC}
            alt="Sir Rateb Y. Rabie, KCHS speaking at a podium"
            className={styles.portrait}
            width={PORTRAIT_WIDTH}
            height={PORTRAIT_HEIGHT}
            sizes="(min-width: 1200px) 38vw, (min-width: 1025px) 34vw, 92vw"
            decoding="sync"
            loading="eager"
            fetchPriority="high"
            draggable={false}
            style={{
              transform: `scale(${portraitScale.x}, ${portraitScale.y})`,
              transformOrigin: 'top center',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
