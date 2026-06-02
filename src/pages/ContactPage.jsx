import PageBanner from '../components/PageBanner';
import Contact from '../components/Contact';
import Donate from '../components/Donate';
import { useLanguage } from '../i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner
        label={t('nav.connect')}
        title={t('contact.pageTitle')}
        description={t('contact.pageDesc')}
      />
      <Contact />
      <Donate />
    </>
  );
}
