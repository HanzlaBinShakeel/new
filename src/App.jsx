import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AboutBioPage from './pages/AboutBioPage';
import AboutHonorsPage from './pages/AboutHonorsPage';
import AboutAccomplishmentsPage from './pages/AboutAccomplishmentsPage';
import AboutSkillsPage from './pages/AboutSkillsPage';
import AboutSubPage from './pages/AboutSubPage';
import AboutCvPage from './pages/AboutCvPage';
import AboutMessagePage from './pages/AboutMessagePage';
import AboutHistoryPage from './pages/AboutHistoryPage';
import AboutFamilyPage from './pages/AboutFamilyPage';
import ReflectionsPage from './pages/ReflectionsPage';
import PublicationsPage from './pages/PublicationsPage';
import BooksPage from './pages/BooksPage';
import NewslettersPage from './pages/NewslettersPage';
import PhotoAlbumsPage from './pages/PhotoAlbumsPage';
import AwardsPage from './pages/AwardsPage';
import CountriesPage from './pages/CountriesPage';
import GeneralPage from './pages/GeneralPage';
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
          <Route path="about/biography" element={<Navigate to="/about/bio" replace />} />
          <Route path="about/honors-awards" element={<AboutHonorsPage />} />
          <Route path="about/accomplishments" element={<AboutAccomplishmentsPage />} />
          <Route path="about/skills" element={<AboutSkillsPage />} />
          <Route path="about/cv" element={<AboutCvPage />} />
          <Route path="about/message" element={<AboutMessagePage />} />
          <Route path="about/history" element={<AboutHistoryPage />} />
          <Route path="about/family" element={<AboutFamilyPage />} />
          <Route path="about/:slug" element={<AboutSubPage />} />
          <Route path="reflections" element={<ReflectionsPage />} />
          <Route path="reflections/:type" element={<ReflectionsPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="publications" element={<PublicationsPage />} />
          <Route path="publications/books" element={<BooksPage />} />
          <Route path="publications/newsletters" element={<NewslettersPage />} />
          <Route path="photo-albums" element={<PhotoAlbumsPage />} />
          <Route path="awards" element={<Navigate to="/about/honors-awards" replace />} />
          <Route path="countries" element={<CountriesPage />} />
          <Route path="general" element={<GeneralPage />} />
          <Route path="leadership" element={<LeadershipPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
