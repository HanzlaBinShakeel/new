import AnimatedSection, { Reveal } from './AnimatedSection';
import { Stagger, StaggerItem } from './Motion';
import { careerHighlights, skills } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Career.module.css';

export default function Career() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="career" className={styles.career}>
      <div className="container">
        <div className={styles.split}>
          <Reveal>
            <span className="section-label">{t('home.leadershipLabel')}</span>
            <h2 className="section-title">Humanitarian Career</h2>
            <p className="section-desc">
              Over 25 years of visionary leadership — from the Holy Land to communities worldwide.
            </p>
          </Reveal>
          <Stagger as="ul" className={styles.highlights}>
            {careerHighlights.map((item) => (
              <StaggerItem key={item} as="li" className={styles.highlightItem}>
                <span className={styles.bullet} />
                {item}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className={styles.skillsWrap} delay={1}>
          <h3>{t('nav.coreSkills')}</h3>
          <Stagger className={styles.skills}>
            {skills.map((skill) => (
              <StaggerItem key={skill}>
                <span className={styles.skill}>{skill}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </AnimatedSection>
  );
}
