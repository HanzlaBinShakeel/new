import ContentPage from './ContentPage';
import ImageGallery from '../components/ImageGallery';
import { useLanguage } from '../i18n/LanguageContext';

export default function PhotoAlbumsPage() {
  const { t } = useLanguage();

  return (
    <>
      <ContentPage
        label={t('pages.galleryLabel')}
        title={t('pages.photoAlbumsTitle')}
        body={t('pages.photoAlbumsBody')}
      />
      <ImageGallery />
    </>
  );
}
