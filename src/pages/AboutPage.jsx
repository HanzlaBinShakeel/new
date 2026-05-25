import PageBanner from '../components/PageBanner';
import About from '../components/About';
import CV from '../components/CV';
import Stats from '../components/Stats';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner
        label={t('about.label')}
        title={t('about.pageTitle')}
        description={t('about.pageDesc')}
      />
      <About />
      <Stats />
      <CV />
    </>
  );
}
