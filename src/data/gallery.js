const modules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
});

/** Never include logo or hero assets in the slider */
const EXCLUDE_PATTERN =
  /logo|hero-portrait|hero-bg|removebg|Picsart|gallery-21/i;

export const galleryImages = Object.entries(modules)
  .filter(([path]) => !EXCLUDE_PATTERN.test(path))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src], index) => ({
    id: index + 1,
    src,
    alt: `Rateb Y. Rabie — Photo ${index + 1}`,
  }));
