import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AboutBioPage from './pages/AboutBioPage';
import AboutHonorsPage from './pages/AboutHonorsPage';
import AboutAccomplishmentsPage from './pages/AboutAccomplishmentsPage';
import AboutSkillsPage from './pages/AboutSkillsPage';
import AboutSubPage from './pages/AboutSubPage';
import PublicationsPage from './pages/PublicationsPage';
import PublicationsCategoryPage from './pages/PublicationsCategoryPage';
import BooksPage from './pages/BooksPage';
import NewslettersPage from './pages/NewslettersPage';
import LeadershipPage from './pages/LeadershipPage';
import ContactPage from './pages/ContactPage';
import ArticlePage from './pages/ArticlePage';

const basename = (() => {
  const base = import.meta.env.BASE_URL || '/new/';
  const trimmed = base.replace(/\/$/, '');
  return trimmed || '/new';
})();

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="about/bio" element={<AboutBioPage />} />
          <Route path="about/honors-awards" element={<AboutHonorsPage />} />
          <Route path="about/accomplishments" element={<AboutAccomplishmentsPage />} />
          <Route path="about/skills" element={<AboutSkillsPage />} />
          <Route path="about/:slug" element={<AboutSubPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="publications" element={<PublicationsPage />} />
          <Route path="publications/books" element={<BooksPage />} />
          <Route path="publications/newsletters" element={<NewslettersPage />} />
          <Route path="publications/:categoryId" element={<PublicationsCategoryPage />} />
          <Route path="leadership" element={<LeadershipPage />} />
          <Route path="contact" element={<ContactPage />} />
          {/* Legacy URLs → current menu pages */}
          <Route path="about/biography" element={<Navigate to="/about/bio" replace />} />
          <Route path="about/cv" element={<Navigate to="/about/skills" replace />} />
          <Route path="about/message" element={<Navigate to="/contact" replace />} />
          <Route path="about/history" element={<Navigate to="/about/long-bio" replace />} />
          <Route path="about/family" element={<Navigate to="/about/bio" replace />} />
          <Route path="reflections" element={<Navigate to="/publications" replace />} />
          <Route path="reflections/:type" element={<Navigate to="/publications" replace />} />
          <Route path="awards" element={<Navigate to="/about/honors-awards" replace />} />
          <Route path="photo-albums" element={<Navigate to="/" replace />} />
          <Route path="countries" element={<Navigate to="/about" replace />} />
          <Route path="general" element={<Navigate to="/about" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
