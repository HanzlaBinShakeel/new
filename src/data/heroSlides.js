import manifest from './heroSlides.manifest.json';

const slideModules = import.meta.glob('../assets/hero-slides/slide-*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', {
  eager: true,
  import: 'default',
});

const srcByFile = Object.fromEntries(
  Object.entries(slideModules).map(([path, src]) => [path.split('/').pop(), src])
);

export const heroSlides = manifest.map((entry) => ({
  id: entry.id,
  title: entry.title,
  src: srcByFile[entry.file],
  alt: entry.title,
})).filter((s) => s.src);

export function getHeroSlide(index) {
  return heroSlides[index];
}
