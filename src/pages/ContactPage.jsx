import PageBanner from '../components/PageBanner';
import Contact from '../components/Contact';
import Donate from '../components/Donate';

export default function ContactPage() {
  return (
    <>
      <PageBanner
        label="Connect With Me"
        title="Get in Touch"
        description="Questions, partnerships, donations, and newsletter — we welcome your message."
      />
      <Contact />
      <Donate />
    </>
  );
}
