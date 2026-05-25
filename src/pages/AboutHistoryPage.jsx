import ContentPage from './ContentPage';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutHistoryPage() {
  const { t } = useLanguage();
  return <ContentPage label={t('about.label')} title={t('pages.historyTitle')} body={t('pages.historyBody')} />;
}
