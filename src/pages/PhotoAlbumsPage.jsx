import ContentPage from './ContentPage';
import { pageContent } from '../data/content';
import ImageGallery from '../components/ImageGallery';

export default function PhotoAlbumsPage() {
  const { title, body } = pageContent.photoAlbums;
  return (
    <>
      <ContentPage label="Gallery" title={title} body={body} />
      <ImageGallery />
    </>
  );
}
