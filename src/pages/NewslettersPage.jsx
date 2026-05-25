import ContentPage from './ContentPage';
import { pageContent } from '../data/content';

export default function NewslettersPage() {
  const { title, body } = pageContent.newsletters;
  return <ContentPage label="Publications" title={title} body={body} />;
}
