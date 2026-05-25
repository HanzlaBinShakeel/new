import { motion } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
import { site, socials } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Contact.module.css';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="contact" className={styles.section}>
      <motion.div className="container">
        <motion.div className={styles.grid}>
          <Reveal>
            <span className="section-label">{t('contact.label')}</span>
            <h2 className="section-title">
              {t('contact.title')}
              <br />
              {t('contact.titleLine2')}
            </h2>
            <div className={styles.info}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={`mailto:${site.hcefEmail}`}>{site.hcefEmail}</a>
              <a href={`tel:${site.hcefPhone}`}>Tel: {site.hcefPhone}</a>
              <a href={`tel:${site.cell}`}>Cell: {site.cell}</a>
              <a href={`tel:${site.phone}`}>{site.phone}</a>
            </div>
            <div className={styles.socials}>
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.name}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={2}>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                alert(t('contact.thankYou'));
              }}
            >
              <input type="text" placeholder={t('contact.namePlaceholder')} required />
              <input type="email" placeholder={t('contact.emailPlaceholder')} required />
              <textarea placeholder={t('contact.messagePlaceholder')} rows={5} required />
              <label className={styles.checkbox}>
                <input type="checkbox" required />
                {t('contact.agreePrivacy')}
              </label>
              <button type="submit" className="btn btn-primary">
                {t('contact.sendMessage')}
              </button>
            </form>
          </Reveal>
        </motion.div>

        <Reveal className={styles.newsletter}>
          <h3>{t('contact.newsletterTitle')}</h3>
          <p>{t('contact.newsletterDesc')}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(t('contact.subscribeThanks'));
            }}
          >
            <input type="email" placeholder={t('contact.emailRequired')} required />
            <button type="submit" className="btn btn-outline">
              {t('common.subscribe')}
            </button>
          </form>
        </Reveal>
      </motion.div>
    </AnimatedSection>
  );
}
