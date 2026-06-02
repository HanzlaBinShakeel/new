import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, Stagger, StaggerItem } from './Motion';
import { site } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Donate.module.css';

const amounts = [50, 100, 200];

export default function Donate() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(50);
  const [custom, setCustom] = useState('');

  const total = custom ? parseFloat(custom) || 0 : selected;

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
        <span className="section-label">Contribute For Us</span>
        <h2 className="section-title">{t('home.donateTitle')}</h2>
        <p className={styles.desc}>{t('home.donateDesc')}</p>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            window.open(site.donateUrl, '_blank');
          }}
        >
          <Stagger className={styles.amounts}>
            {amounts.map((amt) => (
              <StaggerItem key={amt}>
                <motion.button
                  type="button"
                  className={selected === amt && !custom ? styles.active : ''}
                  onClick={() => {
                    setSelected(amt);
                    setCustom('');
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  ${amt}.00
                </motion.button>
              </StaggerItem>
            ))}
          </Stagger>

          <div className={styles.fields}>
            <input type="text" placeholder="First Name *" required />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email Address *" required />
            <textarea placeholder="Comment" rows={3} />
          </div>

          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Donation Total:</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <motion.button
              type="submit"
              className="btn btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {t('common.donateNow')}
            </motion.button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
