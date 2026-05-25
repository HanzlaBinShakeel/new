import ContentPage from './ContentPage';
import { pageContent } from '../data/content';

export default function BooksPage() {
  const { title, body } = pageContent.books;
  return <ContentPage label="Publications" title={title} body={body} />;
}
