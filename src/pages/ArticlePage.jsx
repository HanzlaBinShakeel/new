import { Link, useParams } from 'react-router-dom';
import { getArticleBySlug } from '../data/articles';
import { ARTICLE_CATEGORIES } from '../data/articleCategories';
import { useLanguage } from '../i18n/LanguageContext';
import PageBanner from '../components/PageBanner';
import AnimatedSection, { Reveal } from '../components/AnimatedSection';
import { scaleIn } from '../components/Motion';
import styles from './ArticlePage.module.css';

export default function ArticlePage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const article = getArticleBySlug(slug);
  const cat = article
    ? ARTICLE_CATEGORIES.find((c) => c.id === article.articleCategory)
    : null;

  if (!article) {
    return (
      <>
        <PageBanner title={t('common.articleNotFound')} />
        <AnimatedSection className={styles.section}>
          <div className="container">
            <Reveal delay={0}>
              <Link to="/publications" className="btn btn-primary">
                {t('common.backToArticles')}
              </Link>
            </Reveal>
          </div>
        </AnimatedSection>
      </>
    );
  }

  return (
    <>
      <PageBanner
        label={cat ? t(cat.labelKey) : t('article.category')}
        title={article.title}
        description={article.date}
      />
      <AnimatedSection className={styles.section}>
        <div className="container">
          {article.image && (
            <Reveal delay={0} variant={scaleIn}>
              <img src={article.image} alt={article.title} className={styles.heroImg} />
            </Reveal>
          )}
          <Reveal delay={1}>
            <div
              className={styles.prose}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </Reveal>
          <Reveal delay={2}>
            <Link to="/publications" className={styles.back}>
              {t('common.backToArticles')}
            </Link>
          </Reveal>
        </div>
      </AnimatedSection>
    </>
  );
}
