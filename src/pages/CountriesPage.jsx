import ContentPage from './ContentPage';
import { pageContent } from '../data/content';

export default function CountriesPage() {
  const { title, body } = pageContent.countries;
  return <ContentPage label="Travel" title={title} body={body} />;
}
