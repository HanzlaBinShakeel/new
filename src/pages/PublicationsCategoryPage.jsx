import { Navigate, useParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Articles from '../components/Articles';
import { ARTICLE_CATEGORIES } from '../data/articleCategories';
import { getArticlesByCategory } from '../data/articles';
import { useLanguage } from '../i18n/LanguageContext';

export default function PublicationsCategoryPage() {
  const { categoryId } = useParams();
  const { t } = useLanguage();
  const cat = ARTICLE_CATEGORIES.find((c) => c.id === categoryId);

  if (!cat) {
    return <Navigate to="/publications" replace />;
  }

  const items = getArticlesByCategory(categoryId);
  if (!items.length) {
    return <Navigate to="/publications" replace />;
  }

  return (
    <>
      <PageBanner
        label={t('publications.label')}
        title={t(cat.labelKey)}
        description={t(cat.descKey)}
      />
      <Articles items={items} hideHeader grouped={false} activeCategory={categoryId} />
    </>
  );
}
