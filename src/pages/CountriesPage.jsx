import ContentPage from './ContentPage';
import { useLanguage } from '../i18n/LanguageContext';

export default function CountriesPage() {
  const { t } = useLanguage();
  return <ContentPage label={t('nav.countries')} title={t('pages.countriesTitle')} body={t('pages.countriesBody')} />;
}
