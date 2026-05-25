import ContentPage from './ContentPage';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutFamilyPage() {
  const { t } = useLanguage();
  return <ContentPage label={t('about.label')} title={t('pages.familyTitle')} body={t('pages.familyBody')} />;
}
