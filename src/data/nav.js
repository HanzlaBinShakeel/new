export const nav = [
  { labelKey: 'nav.home', path: '/' },
  {
    labelKey: 'nav.about',
    path: '/about',
    children: [
      { labelKey: 'nav.cv', path: '/about/cv' },
      { labelKey: 'nav.biography', path: '/about/biography' },
      { labelKey: 'nav.message', path: '/about/message' },
      { labelKey: 'nav.history', path: '/about/history' },
      { labelKey: 'nav.family', path: '/about/family' },
    ],
  },
  {
    labelKey: 'nav.reflections',
    path: '/reflections',
    children: [
      { labelKey: 'nav.workRelated', path: '/reflections/work' },
      { labelKey: 'nav.personalViews', path: '/reflections/personal' },
    ],
  },
  {
    labelKey: 'nav.publications',
    path: '/publications',
    children: [
      { labelKey: 'nav.books', path: '/publications/books' },
      { labelKey: 'nav.newsletters', path: '/publications/newsletters' },
      { labelKey: 'nav.allArticles', path: '/publications' },
    ],
  },
  { labelKey: 'nav.photoAlbums', path: '/photo-albums' },
  { labelKey: 'nav.awards', path: '/awards' },
  { labelKey: 'nav.countries', path: '/countries' },
  { labelKey: 'nav.general', path: '/general' },
  { labelKey: 'nav.contact', path: '/contact' },
];
