import PageBanner from '../components/PageBanner';
import About from '../components/About';
import CV from '../components/CV';
import Stats from '../components/Stats';

export default function AboutPage() {
  return (
    <>
      <PageBanner
        label="About"
        title="Biography, Career & Honors"
        description="Sir Rateb Y. Rabie, KCHS — social entrepreneur dedicated to peace, justice, and transformational leadership."
      />
      <About />
      <Stats />
      <CV />
    </>
  );
}
