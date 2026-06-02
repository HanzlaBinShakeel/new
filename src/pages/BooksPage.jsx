import ContentPage from './ContentPage';
import { useLanguage } from '../i18n/LanguageContext';

export default function BooksPage() {
  const { t } = useLanguage();
  return (
    <ContentPage
      label={t('nav.publications')}
      title={t('nav.booksSpecial')}
      body={t('pages.booksBody')}
    />
  );
}
