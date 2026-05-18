import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
import { pillars, faqs } from '../data/content';
import styles from './Pillars.module.css';

export default function Pillars() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <AnimatedSection className={styles.section}>
      <motion.div className="container">
        <div className={styles.header}>
          <Reveal>
            <span className="section-label">Questions & Answers</span>
            <h2 className="section-title">Practical guide for the next generation</h2>
          </Reveal>
        </div>

        <div className={styles.grid}>
          <div className={styles.pillars}>
            {pillars.map((p, i) => (
              <Reveal key={p.num} delay={i}>
                <motion.article
                  className={styles.pillar}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={styles.num}>{p.num}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2} className={styles.faq}>
            {faqs.map((faq, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.open : ''}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span>{faq.question}</span>
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
                      <p>{faq.answer}</p>
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
