import { useParams, Navigate } from 'react-router-dom';
import ContentPage from './ContentPage';
import { useLanguage } from '../i18n/LanguageContext';

const SLUGS = ['vision-management', 'long-bio', 'image-printing', 'al-dewan'];

export default function AboutSubPage() {
  const { slug } = useParams();
  const { t } = useLanguage();

  if (!SLUGS.includes(slug)) {
    return <Navigate to="/about" replace />;
  }

  const key = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  return (
    <ContentPage
      label={t('nav.about')}
      title={t(`aboutSub.${key}.title`)}
      description={t(`aboutSub.${key}.desc`)}
      body={t(`aboutSub.${key}.body`)}
    />
  );
}
