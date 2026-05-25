import { useParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Articles from '../components/Articles';
import { articles } from '../data/articles';
import { useLanguage } from '../i18n/LanguageContext';

export default function ReflectionsPage() {
  const { type } = useParams();
  const { t } = useLanguage();
  const filtered = type ? articles.filter((a) => a.tag === type) : articles;
  const title =
    type === 'work'
      ? t('reflections.workTitle')
      : type === 'personal'
        ? t('reflections.personalTitle')
        : t('reflections.allTitle');

  return (
    <>
      <PageBanner label={t('reflections.label')} title={title} description={t('reflections.desc')} />
      <Articles items={filtered} hideHeader />
    </>
  );
}
