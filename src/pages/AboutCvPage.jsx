import PageBanner from '../components/PageBanner';
import CV from '../components/CV';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutCvPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner label={t('about.label')} title={t('about.cvTitle')} description={t('about.cvDesc')} />
      <CV />
    </>
  );
}
