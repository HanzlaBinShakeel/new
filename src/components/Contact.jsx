import { motion } from 'framer-motion';
import AnimatedSection, { Reveal } from './AnimatedSection';
import { site, socials } from '../data/content';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <AnimatedSection id="contact" className={styles.section}>
      <motion.div className="container">
        <motion.div className={styles.grid}>
          <Reveal>
            <span className="section-label">Contacts</span>
            <h2 className="section-title">
              Have questions?
              <br />
              Get in touch!
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
                alert('Thank you for your message. We will be in touch soon.');
              }}
            >
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows={5} required />
              <label className={styles.checkbox}>
                <input type="checkbox" required />
                I agree with the site&apos;s privacy policy.
              </label>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </Reveal>
        </motion.div>

        <Reveal className={styles.newsletter}>
          <h3>Sign up for our newsletter</h3>
          <p>Receive updates from {site.name}. You can unsubscribe anytime.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing!');
            }}
          >
            <input type="email" placeholder="Email (required)" required />
            <button type="submit" className="btn btn-outline">
              Subscribe
            </button>
          </form>
        </Reveal>
      </motion.div>
    </AnimatedSection>
  );
}
