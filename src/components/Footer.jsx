import { Link } from 'react-router-dom';
import { logo } from '../assets';
import { site, nav, socials } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/">
              <img src={logo} alt={site.name} width={577} height={433} />
            </Link>
            <h3>{t('footer.experts')}</h3>
            <p>{t('footer.tagline')}</p>
          </div>

          <div>
            <h4>{t('footer.menu')}</h4>
            <ul>
              {nav.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{t(item.labelKey)}</Link>
                  {item.children?.map((child) => (
                    <Link key={child.path} to={child.path} className={styles.subLink}>
                      {t(child.labelKey)}
                    </Link>
                  ))}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t('footer.sayHello')}</h4>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <div className={styles.langs}>
              <LanguageSwitcher mobile />
            </div>
          </div>

          <div>
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
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()}. {t('footer.rights')}
          </p>
          <a href="https://rateb.rabie.us/privacy-policy/" target="_blank" rel="noopener noreferrer">
            {t('common.privacyPolicy')}
          </a>
        </div>
      </div>
    </footer>
  );
}
