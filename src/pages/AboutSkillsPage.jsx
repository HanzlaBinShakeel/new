import PageBanner from '../components/PageBanner';
import AnimatedSection, { Reveal } from '../components/AnimatedSection';
import { Stagger, StaggerItem } from '../components/Motion';
import { useAboutContent } from '../hooks/useAboutContent';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './ContentPage.module.css';
import skillStyles from './AboutSkillsPage.module.css';

export default function AboutSkillsPage() {
  const { t } = useLanguage();
  const { skills, skillsIntro } = useAboutContent();
  const list = Array.isArray(skills) ? skills : [];

  return (
    <>
      <PageBanner
        label={t('nav.about')}
        title={t('nav.coreSkills')}
        description={t('aboutSub.skills.desc')}
      />
      <AnimatedSection className={styles.section}>
        <div className="container">
          <Reveal delay={0}>
            <p className={styles.prose}>{skillsIntro}</p>
          </Reveal>
          <Stagger className={skillStyles.grid}>
            {list.map((skill) => (
              <StaggerItem key={skill}>
                <span className={skillStyles.chip}>{skill}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </AnimatedSection>
    </>
  );
}
