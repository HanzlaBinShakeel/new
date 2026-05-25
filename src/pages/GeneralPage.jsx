import ContentPage from './ContentPage';
import { useLanguage } from '../i18n/LanguageContext';

export default function GeneralPage() {
  const { t } = useLanguage();
  return <ContentPage label={t('nav.general')} title={t('pages.generalTitle')} body={t('pages.generalBody')} />;
}
