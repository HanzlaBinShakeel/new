import ContentPage from './ContentPage';
import { biography } from '../data/content';

export default function AboutBiographyPage() {
  return (
    <ContentPage
      label="About"
      title="Biography (BIO)"
      description={biography.title}
      body={biography.text}
    />
  );
}
