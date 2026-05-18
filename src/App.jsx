import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Pillars from './components/Pillars';
import Organizations from './components/Organizations';
import Career from './components/Career';
import Stats from './components/Stats';
import CV from './components/CV';
import Articles from './components/Articles';
import Donate from './components/Donate';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Pillars />
        <Organizations />
        <Stats />
        <Career />
        <CV />
        <Articles />
        <Donate />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
