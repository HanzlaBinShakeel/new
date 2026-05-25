import ContentPage from './ContentPage';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutBiographyPage() {
  const { t } = useLanguage();

  return (
    <ContentPage
      label={t('about.label')}
      title={t('about.biographyTitle')}
      description={t('about.biographyTitle')}
      body={t('about.biographyText')}
    />
  );
}
