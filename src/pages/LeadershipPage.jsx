import PageBanner from '../components/PageBanner';
import Pillars from '../components/Pillars';
import Organizations from '../components/Organizations';
import Career from '../components/Career';
import { useLanguage } from '../i18n/LanguageContext';

export default function LeadershipPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner
        label={t('nav.leadership')}
        title={t('home.leadershipTitle')}
        description={t('home.leadershipDesc')}
      />
      <Organizations />
      <Pillars />
      <Career />
    </>
  );
}
