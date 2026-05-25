import ContentPage from './ContentPage';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutMessagePage() {
  const { t } = useLanguage();
  return <ContentPage label={t('about.label')} title={t('pages.messageTitle')} body={t('pages.messageBody')} />;
}
