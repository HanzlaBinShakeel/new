import PageBanner from '../components/PageBanner';
import Articles from '../components/Articles';

export default function PublicationsPage() {
  return (
    <>
      <PageBanner
        label="Publications"
        title="Articles & Reflections"
        description="Essays on faith, peace, justice, and Palestine — shared with the world."
      />
      <Articles />
    </>
  );
}
