import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { organizations, site } from '../data/content';
import { articles } from '../data/articles';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './HomeLanding.module.css';

export default function HomeLanding() {
  const { t } = useLanguage();
  const latestArticles = articles.slice(0, 4);
  const faqs = t('faqs');

  return (
    <>
      <section className={styles.aboutCampaign}>
        <div className="container">
          <motion.div
            className={styles.aboutCampaignInner}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">{t('home.aboutLabel')}</span>
            <h2 className="section-title">{t('home.aboutTitle')}</h2>
            <p className={styles.text}>{t('home.aboutDesc')}</p>
            <Link to="/about/bio" className="btn btn-primary">
              {t('common.aboutMe')}
            </Link>
          </motion.div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.orgs}`}>
        <div className="container">
          <motion.div
            className={styles.sectionHead}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">{t('home.leadershipLabel')}</span>
            <h2 className="section-title">{t('home.leadershipTitle')}</h2>
            <p className={styles.text}>{t('home.leadershipDesc')}</p>
          </motion.div>
          <div className={styles.orgGrid}>
            {organizations.map((org, i) => (
              <motion.a
                key={org.abbr}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.orgCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <span className={styles.orgAbbr}>{org.abbr}</span>
                <h3>{org.name}</h3>
                <p>{org.description}</p>
              </motion.a>
            ))}
          </div>
          <div className={styles.centerLink}>
            <Link to="/leadership" className="btn btn-outline">
              {t('common.leadershipInitiatives')}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <motion.div
            className={styles.sectionHead}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">{t('home.faqLabel')}</span>
            <h2 className="section-title">{t('home.faqTitle')}</h2>
          </motion.div>
          <div className={styles.faqGrid}>
            {Array.isArray(faqs) &&
              faqs.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  className={styles.faqCard}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.articles}`}>
        <div className="container">
          <motion.div
            className={styles.sectionHead}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">{t('home.blogLabel')}</span>
            <h2 className="section-title">{t('home.blogTitle')}</h2>
            <p className={styles.text}>{t('home.blogDesc')}</p>
          </motion.div>
          <div className={styles.articleGrid}>
            {latestArticles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
              >
                <Link to={`/articles/${article.slug}`} className={styles.articleCard}>
                  <img src={article.image} alt={article.title} loading="lazy" />
                  <div>
                    <time>{article.date}</time>
                    <h3>{article.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className={styles.centerLink}>
            <Link to="/publications" className="btn btn-outline">
              {t('common.allPublications')}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <motion.div
            className={styles.ctaInner}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2>{t('home.donateTitle')}</h2>
            <p>{t('home.donateDesc')}</p>
            <div className={styles.ctaBtns}>
              <a
                href={site.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {t('common.donateNow')}
              </a>
              <Link to="/contact" className="btn btn-outline">
                {t('home.connectWithMe')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
