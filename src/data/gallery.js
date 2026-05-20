const modules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
});

export const galleryImages = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src], index) => ({
    id: index + 1,
    src,
    alt: `Rateb Y. Rabie — Photo ${index + 1}`,
  }));
