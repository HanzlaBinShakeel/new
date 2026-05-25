import { Link } from 'react-router-dom';
import { logo } from '../assets';
import { site, nav, socials } from '../data/content';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/">
              <img src={logo} alt={site.name} width={577} height={433} />
            </Link>
            <h3>Experts in crafting solutions that resonate</h3>
            <p>{site.tagline}</p>
          </div>

          <div>
            <h4>Menu</h4>
            <ul>
              {nav.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                  {item.children?.map((child) => (
                    <Link key={child.path} to={child.path} className={styles.subLink}>
                      {child.label}
                    </Link>
                  ))}
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
