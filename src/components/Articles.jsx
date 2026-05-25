import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
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
      <motion.div className="container">
        {!hideHeader && (
          <Reveal className={styles.header}>
            <span className="section-label">{t('publications.fromBlog')}</span>
            <h2 className="section-title">{t('publications.myArticles')}</h2>
            <p className="section-desc">{t('publications.articlesDesc')}</p>
          </Reveal>
        )}

        <div className={styles.grid}>
          {visible.map((article, i) => (
            <Reveal key={article.slug} delay={i % 4}>
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.35 }}>
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
              </motion.div>
            </Reveal>
          ))}
        </div>

        {items.length > INITIAL_COUNT && (
          <motion.div className={styles.more} layout>
            <button className="btn btn-outline" onClick={() => setShowAll(!showAll)}>
              {showAll
                ? t('common.showLess')
                : t('common.viewAllArticles', { count: items.length })}
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatedSection>
  );
}
