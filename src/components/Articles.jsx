import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
import { HoverLift } from './Motion';
import { articles } from '../data/articles';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Articles.module.css';

const INITIAL_COUNT = 8;

export default function Articles({ items = articles, hideHeader = false }) {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, INITIAL_COUNT);

  return (
    <AnimatedSection id="articles" className={styles.section}>
      <div className="container">
        {!hideHeader && (
          <Reveal className={styles.header}>
            <span className="section-label">{t('publications.fromBlog')}</span>
            <h2 className="section-title">{t('publications.myArticles')}</h2>
            <p className="section-desc">{t('publications.articlesDesc')}</p>
          </Reveal>
        )}

        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {visible.map((article, i) => (
              <Reveal key={article.slug} delay={i % 4}>
                <HoverLift>
                  <Link to={`/articles/${article.slug}`} className={styles.card}>
                    <div className={styles.imgWrap}>
                      <img src={article.image} alt={article.title} loading="lazy" />
                      <span className={styles.category}>{t('article.category')}</span>
                    </div>
                    <div className={styles.body}>
                      <time>{article.date}</time>
                      <h3>{article.title}</h3>
                      <span className={styles.read}>{t('common.readArticle')}</span>
                    </div>
                  </Link>
                </HoverLift>
              </Reveal>
            ))}
          </AnimatePresence>
        </motion.div>

        {items.length > INITIAL_COUNT && (
          <Reveal className={styles.more} delay={1}>
            <motion.button
              type="button"
              className="btn btn-outline"
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {showAll
                ? t('common.showLess')
                : t('common.viewAllArticles', { count: items.length })}
            </motion.button>
          </Reveal>
        )}
      </div>
    </AnimatedSection>
  );
}
