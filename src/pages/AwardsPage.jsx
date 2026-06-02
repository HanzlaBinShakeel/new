import PageBanner from '../components/PageBanner';
import AnimatedSection from '../components/AnimatedSection';
import { Stagger, StaggerItem } from '../components/Motion';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './ContentPage.module.css';
import awardStyles from './AwardsPage.module.css';

export default function AwardsPage() {
  const { t } = useLanguage();
  const awards = t('awards');

  return (
    <>
      <PageBanner
        label={t('pages.awardsLabel')}
        title={t('pages.awardsTitle')}
        description={t('pages.awardsDesc')}
      />
      <AnimatedSection className={styles.section}>
        <div className="container">
          <Stagger as="ul" className={awardStyles.list}>
            {Array.isArray(awards) &&
              awards.map((item) => (
                <StaggerItem key={item} as="li">
                  {item}
                </StaggerItem>
              ))}
          </Stagger>
        </div>
      </AnimatedSection>
    </>
  );
}
