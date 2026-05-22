import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  biography,
  stats,
  organizations,
  pillars,
  articles,
  site,
  faqs,
} from '../data/content';
import Stats from './Stats';
import styles from './HomeLanding.module.css';

const bioExcerpt = biography.text.split('\n\n')[0];

export default function HomeLanding() {
  const latestArticles = articles.slice(0, 4);

  return (
    <>
      <Stats />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.split}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">About</span>
              <h2 className="section-title">{biography.title}</h2>
              <p className={styles.text}>{bioExcerpt}</p>
              <Link to="/about" className="btn btn-primary">
                Read Full Biography
              </Link>
            </motion.div>
            <motion.div
              className={styles.pillarsMini}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {pillars.slice(0, 2).map((p) => (
                <div key={p.num} className={styles.pillarCard}>
                  <span>{p.num}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              ))}
              <Link to="/leadership" className={styles.textLink}>
                View all initiatives →
              </Link>
            </motion.div>
          </div>
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
            <span className="section-label">Leadership</span>
            <h2 className="section-title">Organizations & Impact</h2>
            <p className={styles.text}>
              Building bridges between the West and Palestine through faith, heritage, and
              humanitarian action.
            </p>
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
              Leadership & Initiatives
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
            <span className="section-label">Questions & Answers</span>
            <h2 className="section-title">Practical guide for the next generation</h2>
          </motion.div>
          <div className={styles.faqGrid}>
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.question}
                className={styles.faqCard}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
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
            <span className="section-label">From the Blog</span>
            <h2 className="section-title">My Articles</h2>
            <p className={styles.text}>
              Reflections on faith, peace, justice, and Palestine — from{' '}
              <a href="https://rateb.rabie.us/" target="_blank" rel="noopener noreferrer">
                rateb.rabie.us
              </a>
            </p>
          </motion.div>
          <div className={styles.articleGrid}>
            {latestArticles.map((article, i) => (
              <motion.a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.articleCard}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
              >
                <img src={article.image} alt={article.title} loading="lazy" />
                <div>
                  <time>{article.date}</time>
                  <h3>{article.title}</h3>
                </div>
              </motion.a>
            ))}
          </div>
          <div className={styles.centerLink}>
            <Link to="/publications" className="btn btn-outline">
              All Publications
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
            <h2>Make a donation for your nation&apos;s future</h2>
            <p>All our members help reach success. Support HCEF and programs in the Holy Land.</p>
            <div className={styles.ctaBtns}>
              <a href={site.donateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Donate Now
              </a>
              <Link to="/contact" className="btn btn-outline">
                Connect With Me
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
