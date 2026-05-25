import ContentPage from './ContentPage';
import { useLanguage } from '../i18n/LanguageContext';

export default function NewslettersPage() {
  const { t } = useLanguage();
  return (
    <ContentPage
      label={t('nav.publications')}
      title={t('pages.newslettersTitle')}
      body={t('pages.newslettersBody')}
    />
  );
}
