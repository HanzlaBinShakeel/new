import { logo } from '../assets';
import { site, nav, socials } from '../data/content';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img src={logo} alt={site.name} width={160} height={120} />
            <h3>Experts in crafting solutions that resonate</h3>
            <p>{site.tagline}</p>
          </div>

          <div>
            <h4>Menu</h4>
            <ul>
              {nav.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Say Hello</h4>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <div className={styles.langs}>
              {site.languages.map((lang) => (
                <span key={lang}>{lang}</span>
              ))}
            </div>
          </div>

          <div>
            <h4>Socials</h4>
            <ul>
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()}. All rights reserved for Rateb Rabie, KCHS.</p>
          <a href="https://rateb.rabie.us/privacy-policy/" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
