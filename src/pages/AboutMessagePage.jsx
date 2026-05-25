import ContentPage from './ContentPage';
import { pageContent } from '../data/content';

export default function AboutMessagePage() {
  const { title, body } = pageContent.message;
  return <ContentPage label="About" title={title} body={body} />;
}
