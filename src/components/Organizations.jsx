import AnimatedSection, { Reveal } from './AnimatedSection';
import { HoverLift } from './Motion';
import { organizations } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Organizations.module.css';

export default function Organizations() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="organizations" className={styles.section}>
      <div className="container">
        <Reveal className={styles.header}>
          <span className="section-label">{t('home.leadershipLabel')}</span>
          <h2 className="section-title">{t('home.leadershipTitle')}</h2>
          <p className="section-desc">{t('home.leadershipDesc')}</p>
        </Reveal>

        <div className={styles.cards}>
          {organizations.map((org, i) => (
            <Reveal key={org.abbr} delay={i}>
              <HoverLift
                as="a"
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div className={styles.imgWrap}>
                  <img src={org.image} alt={org.name} />
                  <div className={styles.imgOverlay} />
                  <span className={styles.abbr}>{org.abbr}</span>
                </div>
                <div className={styles.body}>
                  <h3>{org.name}</h3>
                  <span className={styles.role}>{org.role}</span>
                  <p>{org.description}</p>
                  <span className={styles.link}>Visit website →</span>
                </div>
              </HoverLift>
            </Reveal>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
