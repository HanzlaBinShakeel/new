import ContentPage from './ContentPage';
import { pageContent } from '../data/content';

export default function AboutFamilyPage() {
  const { title, body } = pageContent.family;
  return <ContentPage label="About" title={title} body={body} />;
}
