import PageBanner from '../components/PageBanner';
import CV from '../components/CV';

export default function AboutCvPage() {
  return (
    <>
      <PageBanner
        label="About"
        title="Curriculum Vitae"
        description="Professional experience, leadership, and honors."
      />
      <CV />
    </>
  );
}
