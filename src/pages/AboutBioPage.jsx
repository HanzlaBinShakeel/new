import ContentPage from './ContentPage';
import { useAboutContent } from '../hooks/useAboutContent';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutBioPage() {
  const { t } = useLanguage();
  const { bio } = useAboutContent();

  return (
    <ContentPage
      label={t('nav.about')}
      title={bio.title}
      description={bio.desc}
      body={bio.body}
    />
  );
}
