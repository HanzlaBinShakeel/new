import AnimatedSection, { Reveal } from './AnimatedSection';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './CV.module.css';

export default function CV() {
  const { t } = useLanguage();
  const awards = t('awards');
  return (
    <AnimatedSection id="cv" className={styles.section}>
      <div className="container">
        <Reveal>
          <span className="section-label">Curriculum Vitae</span>
          <h2 className="section-title">Sir Rateb Yacoub Rabie, KCHS</h2>
        </Reveal>

        <div className={styles.grid}>
          <Reveal delay={1} className={styles.block}>
            <h3>Career Highlights</h3>
            <p>
              Success driven visionary and accomplished Social Entrepreneur with over 25 years of
              experience in managing nonprofit organizations. Developed revitalizing strategies,
              overhauled programs, and built organizations and strong community networks in the United
              States, Latin America, Australia, and the Middle East.
            </p>
            <p>
              Recognized by both American and Arab organizations as a world leader in large-scale
              humanitarian program design, support, networking, and fundraising — mostly in the USA
              and Latin America.
            </p>
          </Reveal>

          <Reveal delay={2} className={styles.block}>
            <h3>Professional Experience</h3>
            <div className={styles.role}>
              <strong>Holy Land Christian Ecumenical Foundation (HCEF)</strong>
              <span>President/CEO · 1998–Present</span>
              <p>
                Founded and grew HCEF into a well-respected foundation with over 20 programs — including
                the Bethlehem Museum and Know Thy Heritage Youth Leadership program.
              </p>
            </div>
            <div className={styles.role}>
              <strong>Know Thy Heritage (KTH)</strong>
              <span>President/CEO/Founder · 2011–Present</span>
              <p>
                Global movement with 450+ alumni from 25 countries — empowering Palestinian diaspora
                youth as Ambassadors of Peace.
              </p>
            </div>
            <div className={styles.role}>
              <strong>Jerusalem Peace Institute (JPI)</strong>
              <span>Co-founder / Former Chair · 2020–2025</span>
              <p>
                Promoting a just and lasting peace in Jerusalem through advocacy, research, and dialogue.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div id="awards" className={styles.awards}>
            <h3>Honors & Awards</h3>
            <ul>
              {Array.isArray(awards) &&
                awards.map((award) => (
                  <li key={award}>{award}</li>
                ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </AnimatedSection>
  );
}
