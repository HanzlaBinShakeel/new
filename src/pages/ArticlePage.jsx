import { Link, useParams } from 'react-router-dom';
import { getArticleBySlug } from '../data/articles';
import { useLanguage } from '../i18n/LanguageContext';
import PageBanner from '../components/PageBanner';
import AnimatedSection from '../components/AnimatedSection';
import styles from './ArticlePage.module.css';

export default function ArticlePage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <>
        <PageBanner title={t('common.articleNotFound')} />
        <AnimatedSection className={styles.section}>
          <div className="container">
            <Link to="/publications" className="btn btn-primary">
              {t('common.backToArticles')}
            </Link>
          </div>
        </AnimatedSection>
      </>
    );
  }

  return (
    <>
      <PageBanner label={t('article.category')} title={article.title} description={article.date} />
      <AnimatedSection className={styles.section}>
        <div className="container">
          {article.image && (
            <img src={article.image} alt={article.title} className={styles.heroImg} />
          )}
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <Link to="/publications" className={styles.back}>
            {t('common.backToArticles')}
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}
