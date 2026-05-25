import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpaRedirect from '../components/SpaRedirect';
import styles from './Layout.module.css';

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <SpaRedirect />
      <Header />
      <main className={isHome ? undefined : styles.mainInner}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
