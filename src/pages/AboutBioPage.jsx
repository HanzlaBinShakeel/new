import ContentPage from './ContentPage';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutBioPage() {
  const { t } = useLanguage();

  return (
    <ContentPage
      label={t('nav.about')}
      title={t('nav.bio')}
      description={t('about.bioDesc')}
      body={t('about.biographyText')}
    />
  );
}
