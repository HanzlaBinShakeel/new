import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AboutBiographyPage from './pages/AboutBiographyPage';
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

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="about/biography" element={<AboutBiographyPage />} />
          <Route path="about/cv" element={<AboutCvPage />} />
          <Route path="about/message" element={<AboutMessagePage />} />
          <Route path="about/history" element={<AboutHistoryPage />} />
          <Route path="about/family" element={<AboutFamilyPage />} />
          <Route path="reflections" element={<ReflectionsPage />} />
          <Route path="reflections/:type" element={<ReflectionsPage />} />
          <Route path="publications" element={<PublicationsPage />} />
          <Route path="publications/books" element={<BooksPage />} />
          <Route path="publications/newsletters" element={<NewslettersPage />} />
          <Route path="photo-albums" element={<PhotoAlbumsPage />} />
          <Route path="awards" element={<AwardsPage />} />
          <Route path="countries" element={<CountriesPage />} />
          <Route path="general" element={<GeneralPage />} />
          <Route path="leadership" element={<LeadershipPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
