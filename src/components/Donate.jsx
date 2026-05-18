import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { site } from '../data/content';
import styles from './Donate.module.css';

const amounts = [50, 100, 200];

export default function Donate() {
  const [ref, inView] = useInView();
  const [selected, setSelected] = useState(50);
  const [custom, setCustom] = useState('');

  const total = custom ? parseFloat(custom) || 0 : selected;

  return (
    <section className={styles.donate} ref={ref}>
      <div
        className={styles.bg}
        style={{
          backgroundImage: `url(https://rateb.rabie.us/wp-content/uploads/2024/09/donate-section-bg-2.jpg)`,
        }}
      />
      <div className={styles.overlay} />

      <motion.div
        className={`container ${styles.content}`}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-label">Contribute For Us</span>
        <h2 className="section-title">Make a donation for your nation&apos;s future</h2>
        <p className={styles.desc}>All our members help reach success.</p>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            window.open(site.donateUrl, '_blank');
          }}
        >
          <div className={styles.amounts}>
            {amounts.map((amt) => (
              <button
                key={amt}
                type="button"
                className={selected === amt && !custom ? styles.active : ''}
                onClick={() => {
                  setSelected(amt);
                  setCustom('');
                }}
              >
                ${amt}.00
              </button>
            ))}
            <input
              type="number"
              placeholder="Custom amount"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              min="1"
            />
          </div>

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
            <button type="submit" className="btn btn-primary">
              Donate Now
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
