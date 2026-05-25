import { useParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Articles from '../components/Articles';
import { articles } from '../data/content';

export default function ReflectionsPage() {
  const { type } = useParams();
  const filtered = type
    ? articles.filter((a) => a.tag === type)
    : articles;
  const title =
    type === 'work'
      ? 'Work Related Reflections'
      : type === 'personal'
        ? 'Personal Views'
        : 'Reflections and Articles';

  return (
    <>
      <PageBanner
        label="Reflections"
        title={title}
        description="Articles and reflections on faith, peace, justice, and Palestine."
      />
      <Articles items={filtered} hideHeader />
    </>
  );
}
