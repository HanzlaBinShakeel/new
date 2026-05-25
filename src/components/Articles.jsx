import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
import { articles } from '../data/content';
import styles from './Articles.module.css';

const INITIAL_COUNT = 8;

export default function Articles({ items = articles, hideHeader = false }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, INITIAL_COUNT);

  return (
    <AnimatedSection id="articles" className={styles.section}>
      <motion.div className="container">
        {!hideHeader && (
          <Reveal className={styles.header}>
            <span className="section-label">From the Blog</span>
            <h2 className="section-title">My Articles</h2>
            <p className="section-desc">
              Reflections on faith, peace, justice, and Palestine — shared with the world.
            </p>
          </Reveal>
        )}

        <div className={styles.grid}>
          {visible.map((article, i) => (
            <Reveal key={article.url} delay={i % 4}>
              <motion.a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className={styles.imgWrap}>
                  <img src={article.image} alt={article.title} loading="lazy" />
                  <span className={styles.category}>{article.category}</span>
                </div>
                <div className={styles.body}>
                  <time>{article.date}</time>
                  <h3>{article.title}</h3>
                  <span className={styles.read}>Read article →</span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>

        {items.length > INITIAL_COUNT && (
          <motion.div className={styles.more} layout>
            <button className="btn btn-outline" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less' : `View All ${items.length} Articles`}
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatedSection>
  );
}
