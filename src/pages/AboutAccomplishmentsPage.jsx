import PageBanner from '../components/PageBanner';
import AnimatedSection, { Reveal } from '../components/AnimatedSection';
import { Stagger, StaggerItem } from '../components/Motion';
import { useAboutContent } from '../hooks/useAboutContent';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './ContentPage.module.css';
import awardStyles from './AwardsPage.module.css';

export default function AboutAccomplishmentsPage() {
  const { t } = useLanguage();
  const { notableAccomplishments, accomplishmentsIntro } = useAboutContent();
  const list = Array.isArray(notableAccomplishments) ? notableAccomplishments : [];

  return (
    <>
      <PageBanner
        label={t('nav.about')}
        title={t('nav.notableAccomplishments')}
        description={t('aboutSub.accomplishments.desc')}
      />
      <AnimatedSection className={styles.section}>
        <div className="container">
          <Reveal delay={0}>
            <p className={styles.prose}>{accomplishmentsIntro}</p>
          </Reveal>
          <Stagger as="ul" className={awardStyles.list}>
            {list.map((item) => (
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
