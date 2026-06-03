/** Navigation per Website Menus.docx */
export const nav = [
  { labelKey: 'nav.home', path: '/' },
  {
    labelKey: 'nav.about',
    path: '/about',
    children: [
      { labelKey: 'nav.bio', path: '/about/bio' },
      { labelKey: 'nav.honorsAwards', path: '/about/honors-awards' },
      { labelKey: 'nav.notableAccomplishments', path: '/about/accomplishments' },
      { labelKey: 'nav.coreSkills', path: '/about/skills' },
      { labelKey: 'nav.visionManagement', path: '/about/vision-management' },
      { labelKey: 'nav.longBio', path: '/about/long-bio' },
      { labelKey: 'nav.imagePrinting', path: '/about/image-printing' },
      { labelKey: 'nav.alDewan', path: '/about/al-dewan' },
    ],
  },
  {
    labelKey: 'nav.leadership',
    path: '/leadership',
    children: [
      {
        labelKey: 'nav.hcefFull',
        href: 'https://hcef.org/',
        external: true,
      },
      {
        labelKey: 'nav.kthFull',
        href: 'https://www.kthps.org/',
        external: true,
      },
      {
        labelKey: 'nav.jpiFull',
        href: 'https://www.jerusalem-pi.org/',
        external: true,
      },
      {
        labelKey: 'nav.bethlehemMuseum',
        href: 'https://bethlehemmuseum.org/',
        external: true,
      },
    ],
  },
  {
    labelKey: 'nav.publications',
    path: '/publications',
    children: [
      { labelKey: 'nav.articles', path: '/publications' },
      { type: 'group', labelKey: 'nav.articleCategories' },
      { labelKey: 'articleCategories.reflections', path: '/publications/reflections' },
      { labelKey: 'articleCategories.perspectives', path: '/publications/perspectives' },
      { labelKey: 'articleCategories.politicalAnalysis', path: '/publications/political-analysis' },
      { labelKey: 'articleCategories.nationBuilding', path: '/publications/nation-building' },
      { labelKey: 'articleCategories.leadership', path: '/publications/leadership' },
      { labelKey: 'nav.booksSpecial', path: '/publications/books' },
      { labelKey: 'nav.newsletters', path: '/publications/newsletters' },
    ],
  },
  {
    labelKey: 'nav.connect',
    path: '/contact',
    children: [
      { labelKey: 'nav.contactCard', path: '/contact' },
      { type: 'group', labelKey: 'nav.socialMedia' },
      {
        labelKey: 'nav.whatsapp',
        href: 'https://wa.me/13019222779',
        external: true,
      },
      {
        labelKey: 'nav.facebook',
        href: 'https://www.facebook.com/rateb.rabie',
        external: true,
      },
      {
        labelKey: 'nav.instagram',
        href: 'https://www.instagram.com/ratebrabie/',
        external: true,
      },
      {
        labelKey: 'nav.linkedin',
        href: 'https://www.linkedin.com/in/rateb-rabie-898b663/',
        external: true,
      },
      { type: 'group', labelKey: 'nav.websites' },
      {
        labelKey: 'nav.hcef',
        href: 'https://hcef.org/',
        external: true,
      },
      {
        labelKey: 'nav.kth',
        href: 'https://www.kthps.org/',
        external: true,
      },
      {
        labelKey: 'nav.wikipedia',
        href: 'https://en.wikipedia.org/wiki/Rateb_Y._Rabie',
        external: true,
      },
    ],
  },
];

export function navChildKey(child) {
  return child.path || child.href || child.labelKey;
}

export function isNavItemActive(pathname, child) {
  if (child.path) {
    return pathname === child.path || (child.path !== '/' && pathname.startsWith(`${child.path}/`));
  }
  return false;
}
