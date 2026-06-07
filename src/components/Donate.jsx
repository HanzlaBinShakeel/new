import { Link } from 'react-router-dom';
import { Reveal } from './Motion';
import { site } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Donate.module.css';

export default function Donate() {
  const { t } = useLanguage();

  return (
    <section className={styles.donate}>
      <div
        className={styles.bg}
        style={{
          backgroundImage: `url(https://rateb.rabie.us/wp-content/uploads/2024/09/donate-section-bg-2.jpg)`,
        }}
      />
      <div className={styles.overlay} />

      <Reveal className={`container ${styles.content}`} standalone>
        <span className="section-label">{t('nav.connect')}</span>
        <h2 className="section-title">{t('home.ctaTitle')}</h2>
        <p className={styles.desc}>{t('home.ctaDesc')}</p>
        <div className={styles.footer}>
          <Link to="/contact" className="btn btn-primary">
            {t('home.connectWithMe')}
          </Link>
          <a href={`mailto:${site.email}`} className="btn btn-outline">
            {site.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
