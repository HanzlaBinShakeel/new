import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './NavDropdown.module.css';

export default function NavDropdown({ item, onHero, scrolled }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();
  const label = t(item.labelKey);
  const hasChildren = item.children?.length > 0;
  const isActive =
    pathname === item.path ||
    item.children?.some((c) => pathname === c.path || pathname.startsWith(`${c.path}/`));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  if (!hasChildren) {
    return (
      <NavLink
        to={item.path}
        end={item.path === '/'}
        className={({ isActive: active }) =>
          `${styles.link} ${active || isActive ? styles.active : ''} ${onHero ? styles.onHero : ''} ${scrolled ? styles.scrolled : ''}`
        }
      >
        {label}
      </NavLink>
    );
  }

  return (
    <div
      ref={ref}
      className={`${styles.wrap} ${open ? styles.open : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to={item.path}
        className={`${styles.link} ${styles.hasChild} ${isActive ? styles.active : ''} ${onHero ? styles.onHero : ''} ${scrolled ? styles.scrolled : ''}`}
        onClick={() => setOpen(false)}
      >
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </NavLink>
      <ul className={styles.menu} role="menu">
        {item.children.map((child) => (
          <li key={child.path}>
            <Link to={child.path} role="menuitem" onClick={() => setOpen(false)}>
              {t(child.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
