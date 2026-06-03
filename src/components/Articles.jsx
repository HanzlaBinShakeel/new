import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
import { HoverLift } from './Motion';
import { articles } from '../data/articles';
import { ARTICLE_CATEGORIES } from '../data/articleCategories';
import { groupArticlesByCategory, getArticlesForCategory } from '../utils/articles';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Articles.module.css';

function ArticleCard({ article, categoryLabel }) {
  const { t } = useLanguage();

  return (
    <HoverLift>
      <Link to={`/articles/${article.slug}`} className={styles.card}>
        <div className={styles.imgWrap}>
          <img src={article.image} alt={article.title} loading="lazy" />
          <span className={styles.category}>{categoryLabel}</span>
        </div>
        <div className={styles.body}>
          <time>{article.date}</time>
          <h3>{article.title}</h3>
          <span className={styles.read}>{t('common.readArticle')}</span>
        </div>
      </Link>
    </HoverLift>
  );
}

export default function Articles({
  items = articles,
  hideHeader = false,
  activeCategory = 'all',
  grouped = true,
}) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState(activeCategory);
  const filtered = getArticlesForCategory(filter, items);
  const groups = grouped && filter === 'all' ? groupArticlesByCategory(items) : null;

  const categoryLabel = (id) => {
    const cat = ARTICLE_CATEGORIES.find((c) => c.id === id);
    return cat ? t(cat.labelKey) : t('article.category');
  };

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

        <Reveal className={styles.filters} delay={1}>
          <button
            type="button"
            className={filter === 'all' ? styles.filterActive : styles.filter}
            onClick={() => setFilter('all')}
          >
            {t('articleCategories.all')}
          </button>
          {ARTICLE_CATEGORIES.map((cat) => {
            const count = items.filter((a) => a.articleCategory === cat.id).length;
            if (!count) return null;
            return (
              <button
                key={cat.id}
                type="button"
                className={filter === cat.id ? styles.filterActive : styles.filter}
                onClick={() => setFilter(cat.id)}
              >
                {t(cat.labelKey)} ({count})
              </button>
            );
          })}
        </Reveal>

        {groups ? (
          <div className={styles.grouped}>
            {groups.map((group) => (
              <section key={group.category.id} id={group.category.id} className={styles.categorySection}>
                <Reveal className={styles.categoryHead}>
                  <h3 className={styles.categoryTitle}>{t(group.category.labelKey)}</h3>
                  <p className={styles.categoryDesc}>{t(group.category.descKey)}</p>
                  <Link to={`/publications/${group.category.id}`} className={styles.viewCategory}>
                    {t('articleCategories.viewCategory')} →
                  </Link>
                </Reveal>
                <motion.div className={styles.grid} layout>
                  {group.articles.map((article, i) => (
                    <Reveal key={article.slug} delay={i % 4}>
                      <ArticleCard
                        article={article}
                        categoryLabel={categoryLabel(article.articleCategory)}
                      />
                    </Reveal>
                  ))}
                </motion.div>
              </section>
            ))}
          </div>
        ) : (
          <motion.div className={styles.grid} layout>
            {filtered.map((article, i) => (
              <Reveal key={article.slug} delay={i % 4}>
                <ArticleCard
                  article={article}
                  categoryLabel={categoryLabel(article.articleCategory)}
                />
              </Reveal>
            ))}
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
}
