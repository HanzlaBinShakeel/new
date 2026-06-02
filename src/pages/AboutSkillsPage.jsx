import PageBanner from '../components/PageBanner';
import AnimatedSection from '../components/AnimatedSection';
import { skills } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './ContentPage.module.css';
import skillStyles from './AboutSkillsPage.module.css';

export default function AboutSkillsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner
        label={t('nav.about')}
        title={t('nav.coreSkills')}
        description={t('aboutSub.skills.desc')}
      />
      <AnimatedSection className={styles.section}>
        <div className="container">
          <p className={styles.prose}>{t('aboutSub.skills.body')}</p>
          <ul className={skillStyles.grid}>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </AnimatedSection>
    </>
  );
}
