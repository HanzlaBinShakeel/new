import PageBanner from '../components/PageBanner';
import Articles from '../components/Articles';
import { useLanguage } from '../i18n/LanguageContext';

export default function PublicationsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner
        label={t('publications.label')}
        title={t('publications.title')}
        description={t('publications.desc')}
      />
      <Articles />
    </>
  );
}
