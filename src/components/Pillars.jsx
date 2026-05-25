import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Pillars.module.css';

export default function Pillars() {
  const { t } = useLanguage();
  const pillars = t('pillars');
  const faqs = t('faqs');
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <AnimatedSection className={styles.section}>
      <motion.div className="container">
        <div className={styles.header}>
          <Reveal>
            <span className="section-label">{t('home.faqLabel')}</span>
            <h2 className="section-title">{t('home.faqTitle')}</h2>
          </Reveal>
        </div>

        <div className={styles.grid}>
          <div className={styles.pillars}>
            {Array.isArray(pillars) &&
              pillars.map((p, i) => (
                <Reveal key={p.title} delay={i}>
                  <motion.article
                    className={styles.pillar}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={styles.num}>0{i + 1}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </motion.article>
                </Reveal>
              ))}
          </div>

          <Reveal delay={2} className={styles.faq}>
            {Array.isArray(faqs) &&
              faqs.map((faq, i) => (
                <div key={faq.q} className={`${styles.faqItem} ${openFaq === i ? styles.open : ''}`}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span>{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      className={styles.plus}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className={styles.answer}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
          </Reveal>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
