import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { nav } from '../data/content';
import styles from './HomeIntro.module.css';

const teasers = [
  {
    path: '/about',
    label: 'About',
    title: 'Biography & Career',
    text: 'Learn about Sir Rateb Y. Rabie’s life, honors, and decades of humanitarian leadership.',
  },
  {
    path: '/leadership',
    label: 'Leadership',
    title: 'Initiatives & Impact',
    text: 'Explore HCEF, Know Thy Heritage, Jerusalem Peace Institute, and global programs.',
  },
  {
    path: '/publications',
    label: 'Publications',
    title: 'Articles & Reflections',
    text: 'Read essays on peace, justice, faith, and Palestine from over the years.',
  },
  {
    path: '/contact',
    label: 'Connect',
    title: 'Get in Touch',
    text: 'Contact, donate, and subscribe for updates on advocacy and events.',
  },
];

export default function HomeIntro() {
  const pageLinks = nav.filter((item) => item.path !== '/');

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Welcome</span>
          <h2 className="section-title">Explore the full site</h2>
          <p className={styles.desc}>
            This landing page introduces our mission. Visit each section for biography, leadership
            programs, publications, and ways to connect.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {teasers.map((item, i) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link to={item.path} className={styles.card}>
                <span className={styles.cardLabel}>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className={styles.arrow}>Explore →</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className={styles.quickNav}>
          {pageLinks.map((item) => (
            <Link key={item.path} to={item.path} className={styles.quickLink}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
