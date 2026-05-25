import ContentPage from './ContentPage';
import { pageContent } from '../data/content';

export default function AboutHistoryPage() {
  const { title, body } = pageContent.history;
  return <ContentPage label="About" title={title} body={body} />;
}
