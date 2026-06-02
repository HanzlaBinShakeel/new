import { galleryImages } from './gallery';

/**
 * Hero slider titles — edit the `title` for each image.
 * Order matches gallery-01.jpg … gallery-16.jpg (sorted by filename).
 */
const SLIDE_TITLES = [
  'Holy Land & Heritage',
  'Community Leadership',
  'Faith & Peace',
  'Palestinian Diaspora',
  'Humanitarian Work',
  'Interfaith Dialogue',
  'Know Thy Heritage',
  'HCEF Programs',
  'Bethlehem & the Holy Land',
  'Global Advocacy',
  'Youth Leadership',
  'Ecumenical Foundation',
  'Peace & Justice',
  'Cultural Identity',
  'International Engagement',
  'Transformational Leadership',
];

export const heroSlides = galleryImages.map((img, index) => ({
  ...img,
  title: SLIDE_TITLES[index] ?? `Photo ${index + 1}`,
}));
