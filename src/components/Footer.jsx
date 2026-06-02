import { Link } from 'react-router-dom';
import { logo } from '../assets';
import { site, nav, socials } from '../data/content';
import { navChildKey } from '../data/nav';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Section, Stagger, StaggerItem, Reveal } from './Motion';
import styles from './Footer.module.css';

function FooterChildLink({ child }) {
  const { t } = useLanguage();
  if (child.type === 'group') return null;
  const label = t(child.labelKey);
  if (child.external || child.href) {
    return (
      <a
        key={navChildKey(child)}
        href={child.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.subLink}
      >
        {label}
      </a>
    );
  }
  return (
    <Link key={navChildKey(child)} to={child.path} className={styles.subLink}>
      {label}
    </Link>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <Section as="footer" className={styles.footer}>
      <div className="container">
        <Stagger className={styles.grid}>
          <StaggerItem className={styles.brand}>
            <Link to="/">
              <img src={logo} alt={site.name} width={577} height={433} />
            </Link>
            <h3>{t('footer.experts')}</h3>
            <p>{t('footer.tagline')}</p>
          </StaggerItem>

          <StaggerItem>
            <h4>{t('footer.menu')}</h4>
            <ul>
              {nav.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{t(item.labelKey)}</Link>
                  {item.children?.map((child) => (
                    <FooterChildLink key={navChildKey(child)} child={child} />
                  ))}
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h4>{t('footer.sayHello')}</h4>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <div className={styles.langs}>
              <LanguageSwitcher mobile />
            </div>
          </StaggerItem>

          <StaggerItem>
            <h4>{t('footer.socials')}</h4>
            <ul>
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>

        <Reveal className={styles.bottom} delay={1}>
          <p>
            © {new Date().getFullYear()}. {t('footer.rights')}
          </p>
          <a href="https://rateb.rabie.us/privacy-policy/" target="_blank" rel="noopener noreferrer">
            {t('common.privacyPolicy')}
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
