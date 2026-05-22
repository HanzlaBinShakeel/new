import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpaRedirect from '../components/SpaRedirect';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <SpaRedirect />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
