import { useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../data/content';
import { articles } from '../data/articles';
import { ARTICLE_CATEGORIES } from '../data/articleCategories';
import { groupArticlesByCategory, getArticlesForCategory } from '../utils/articles';
import { useLanguage } from '../i18n/LanguageContext';
import { Section, Reveal, Stagger, StaggerItem, HoverLift, scaleIn } from './Motion';
import styles from './HomeLanding.module.css';

export default function HomeLanding() {
  const { t } = useLanguage();
  const [articleFilter, setArticleFilter] = useState('all');
  const articleGroups =
    articleFilter === 'all' ? groupArticlesByCategory(articles) : null;
  const filteredArticles = getArticlesForCategory(articleFilter, articles);
  const faqs = t('faqs');
  const pillars = t('pillars');

  return (
    <>
      <Section className={styles.aboutCampaign}>
        <div className="container">
          <Reveal className={styles.aboutCampaignInner} delay={0}>
            <span className="section-label">{t('home.aboutLabel')}</span>
            <h2 className="section-title">{t('home.aboutTitle')}</h2>
            <p className={styles.text}>{t('home.aboutDesc')}</p>
            <Link to="/about/bio" className="btn btn-primary">
              {t('common.aboutMe')}
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section className={`${styles.section} ${styles.initiatives}`}>
        <div className="container">
          <Reveal className={styles.sectionHead} delay={0}>
            <span className="section-label">{t('home.leadershipLabel')}</span>
            <h2 className="section-title">{t('home.leadershipTitle')}</h2>
            <p className={styles.text}>{t('home.leadershipDesc')}</p>
          </Reveal>
          <Stagger className={styles.initiativeGrid}>
            {Array.isArray(pillars) &&
              pillars.map((pillar, i) => (
                <StaggerItem key={pillar.title}>
                  <HoverLift as="article" className={styles.initiativeCard}>
                    <span className={styles.initiativeNum}>0{i + 1}</span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.desc}</p>
                  </HoverLift>
                </StaggerItem>
              ))}
          </Stagger>
          <Reveal className={styles.centerLink} delay={2}>
            <Link to="/leadership" className="btn btn-outline">
              {t('common.leadershipInitiatives')}
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section className={styles.section}>
        <div className="container">
          <Reveal className={styles.sectionHead} delay={0}>
            <span className="section-label">{t('home.faqLabel')}</span>
            <h2 className="section-title">{t('home.faqTitle')}</h2>
          </Reveal>
          <Stagger className={styles.faqGrid}>
            {Array.isArray(faqs) &&
              faqs.map((faq) => (
                <StaggerItem key={faq.q}>
                  <div className={styles.faqCard}>
                    <h3>{faq.q}</h3>
                    <p>{faq.a}</p>
                  </div>
                </StaggerItem>
              ))}
          </Stagger>
        </div>
      </Section>

      <Section className={`${styles.section} ${styles.articles}`} id="articles">
        <div className="container">
          <Reveal className={styles.sectionHead} delay={0}>
            <span className="section-label">{t('home.blogLabel')}</span>
            <h2 className="section-title">{t('home.blogTitle')}</h2>
            <p className={styles.text}>{t('home.blogDesc')}</p>
          </Reveal>

          <Reveal className={styles.categoryFilters} delay={1}>
            <button
              type="button"
              className={articleFilter === 'all' ? styles.filterActive : styles.filter}
              onClick={() => setArticleFilter('all')}
            >
              {t('articleCategories.all')}
            </button>
            {ARTICLE_CATEGORIES.map((cat) => {
              const count = articles.filter((a) => a.articleCategory === cat.id).length;
              if (!count) return null;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={articleFilter === cat.id ? styles.filterActive : styles.filter}
                  onClick={() => setArticleFilter(cat.id)}
                >
                  {t(cat.labelKey)} ({count})
                </button>
              );
            })}
          </Reveal>

          {articleGroups ? (
            <div className={styles.categoryGrouped}>
              {articleGroups.map((group) => (
                <section
                  key={group.category.id}
                  id={`home-${group.category.id}`}
                  className={styles.categorySection}
                >
                  <Reveal className={styles.categoryHead}>
                    <h3 className={styles.categoryTitle}>{t(group.category.labelKey)}</h3>
                    <p className={styles.categoryDesc}>{t(group.category.descKey)}</p>
                    <Link
                      to={`/publications/${group.category.id}`}
                      className={styles.viewCategory}
                    >
                      {t('articleCategories.viewCategory')} →
                    </Link>
                  </Reveal>
                  <Stagger className={styles.articleGrid}>
                    {group.articles.map((article) => (
                      <StaggerItem key={article.slug}>
                        <HoverLift>
                          <Link to={`/articles/${article.slug}`} className={styles.articleCard}>
                            <img src={article.image} alt={article.title} loading="lazy" />
                            <div>
                              <span className={styles.articleCategory}>
                                {t(group.category.labelKey)}
                              </span>
                              <time>{article.date}</time>
                              <h3>{article.title}</h3>
                            </div>
                          </Link>
                        </HoverLift>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </section>
              ))}
            </div>
          ) : (
            <Stagger className={styles.articleGrid}>
              {filteredArticles.map((article) => {
                const cat = ARTICLE_CATEGORIES.find((c) => c.id === article.articleCategory);
                return (
                  <StaggerItem key={article.slug}>
                    <HoverLift>
                      <Link to={`/articles/${article.slug}`} className={styles.articleCard}>
                        <img src={article.image} alt={article.title} loading="lazy" />
                        <div>
                          {cat && (
                            <span className={styles.articleCategory}>{t(cat.labelKey)}</span>
                          )}
                          <time>{article.date}</time>
                          <h3>{article.title}</h3>
                        </div>
                      </Link>
                    </HoverLift>
                  </StaggerItem>
                );
              })}
            </Stagger>
          )}

          <Reveal className={styles.centerLink} delay={2}>
            <Link to="/publications" className="btn btn-outline">
              {t('common.allPublications')}
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section className={styles.cta}>
        <div className="container">
          <Reveal className={styles.ctaInner} delay={0} variant={scaleIn}>
            <h2>{t('home.ctaTitle')}</h2>
            <p>{t('home.ctaDesc')}</p>
            <div className={styles.ctaBtns}>
              <Link to="/contact" className="btn btn-primary">
                {t('home.connectWithMe')}
              </Link>
              <a href={`mailto:${site.email}`} className="btn btn-outline">
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
