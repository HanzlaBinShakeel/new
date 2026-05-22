import PageBanner from '../components/PageBanner';
import Pillars from '../components/Pillars';
import Organizations from '../components/Organizations';
import Career from '../components/Career';

export default function LeadershipPage() {
  return (
    <>
      <PageBanner
        label="Leadership & Initiatives"
        title="Programs That Drive Change"
        description="Holy Land Christian Ecumenical Foundation, Know Thy Heritage, Jerusalem Peace Institute, and global advocacy."
      />
      <Organizations />
      <Pillars />
      <Career />
    </>
  );
}
