import { useParams, Navigate } from 'react-router-dom';
import ContentPage from './ContentPage';
import { useAboutContent } from '../hooks/useAboutContent';
import { useLanguage } from '../i18n/LanguageContext';

const SLUGS = ['vision-management', 'long-bio', 'image-printing', 'al-dewan'];

export default function AboutSubPage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const { getSubPage } = useAboutContent();

  if (!SLUGS.includes(slug)) {
    return <Navigate to="/about" replace />;
  }

  const page = getSubPage(slug);

  return (
    <ContentPage
      label={t('nav.about')}
      title={page.title}
      description={page.desc}
      body={page.body}
    />
  );
}
