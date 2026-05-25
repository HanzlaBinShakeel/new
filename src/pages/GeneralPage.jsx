import ContentPage from './ContentPage';
import { pageContent } from '../data/content';

export default function GeneralPage() {
  const { title, body } = pageContent.general;
  return <ContentPage label="General" title={title} body={body} />;
}
