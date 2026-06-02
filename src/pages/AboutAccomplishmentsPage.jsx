import PageBanner from '../components/PageBanner';
import AnimatedSection from '../components/AnimatedSection';
import { careerHighlights } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './ContentPage.module.css';
import awardStyles from './AwardsPage.module.css';

export default function AboutAccomplishmentsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner
        label={t('nav.about')}
        title={t('nav.notableAccomplishments')}
        description={t('aboutSub.accomplishments.desc')}
      />
      <AnimatedSection className={styles.section}>
        <div className="container">
          <p className={styles.prose}>{t('aboutSub.accomplishments.body')}</p>
          <ul className={awardStyles.list}>
            {careerHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </AnimatedSection>
    </>
  );
}
