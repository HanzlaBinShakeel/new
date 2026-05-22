import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SpaRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('spa-redirect');
    if (!stored) return;
    sessionStorage.removeItem('spa-redirect');
    const path = stored.startsWith('/') ? stored : `/${stored}`;
    navigate(path, { replace: true });
  }, [navigate]);

  return null;
}
