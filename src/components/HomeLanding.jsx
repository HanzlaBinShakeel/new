import { useState } from 'react';
import { Link } from 'react-router-dom';
import { organizations, site } from '../data/content';
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

      <Section className={`${styles.section} ${styles.orgs}`}>
        <div className="container">
          <Reveal className={styles.sectionHead} delay={0}>
            <span className="section-label">{t('home.leadershipLabel')}</span>
            <h2 className="section-title">{t('home.leadershipTitle')}</h2>
            <p className={styles.text}>{t('home.leadershipDesc')}</p>
          </Reveal>
          <Stagger className={styles.orgGrid}>
            {organizations.map((org) => (
              <StaggerItem key={org.abbr}>
                <HoverLift
                  as="a"
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.orgCard}
                >
                  <span className={styles.orgAbbr}>{org.abbr}</span>
                  <h3>{org.name}</h3>
                  <p>{org.description}</p>
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
            <h2>{t('home.donateTitle')}</h2>
            <p>{t('home.donateDesc')}</p>
            <div className={styles.ctaBtns}>
              <a
                href={site.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {t('common.donateNow')}
              </a>
              <Link to="/contact" className="btn btn-outline">
                {t('home.connectWithMe')}
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
