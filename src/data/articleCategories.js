/** Category taxonomy from Website Articles RYR Categorized.xlsx */
export const ARTICLE_CATEGORIES = [
  {
    id: 'reflections',
    label: 'Reflections',
    labelKey: 'articleCategories.reflections',
    descKey: 'articleCategories.reflectionsDesc',
  },
  {
    id: 'perspectives',
    label: 'Perspectives',
    labelKey: 'articleCategories.perspectives',
    descKey: 'articleCategories.perspectivesDesc',
  },
  {
    id: 'political-analysis',
    label: 'Political Analysis',
    labelKey: 'articleCategories.politicalAnalysis',
    descKey: 'articleCategories.politicalAnalysisDesc',
  },
  {
    id: 'nation-building',
    label: 'Nation-Building',
    labelKey: 'articleCategories.nationBuilding',
    descKey: 'articleCategories.nationBuildingDesc',
  },
  {
    id: 'leadership',
    label: 'Leadership',
    labelKey: 'articleCategories.leadership',
    descKey: 'articleCategories.leadershipDesc',
  },
];

/** Spreadsheet column C → site category id */
export const CATEGORY_NAME_TO_ID = {
  Reflections: 'reflections',
  Perspectives: 'perspectives',
  'Political Analysis': 'political-analysis',
  'Nation-Building': 'nation-building',
  Leadership: 'leadership',
};

/** Slug → category id (from xlsx + manual assignments for other site articles) */
export const ARTICLE_CATEGORY_BY_SLUG = {
  'palestine-and-the-promise-of-freedom-a-fourth-of-july-message': 'reflections',
  'congratulations-to-his-holiness-pope-leo-xiv-from-the-palestinian-christians': 'perspectives',
  'the-passing-of-pope-francis-a-legacy-of-compassion-and-moral-courage': 'perspectives',
  'easter-reflection-he-is-risen-and-so-will-palestine': 'perspectives',
  'faith-politics-and-deception-the-misuse-of-christianity-for-power': 'perspectives',
  'trump-a-self-proclaimed-man-of-peace': 'political-analysis',
  'why-christians-should-be-thankful-to-the-palestinian-people': 'nation-building',
  'a-message-of-peace-to-the-people-of-israel-and-their-supporters': 'reflections',
  'why-does-israel-prohibit-dna-testing': 'political-analysis',
  'who-are-the-real-jew-haters-here': 'political-analysis',
  'how-could-i-be-accused-of-being-anti-semitic-when-i-myself-semitic': 'political-analysis',
  'reflections-on-gaza-media-narratives-u-s-policy-and-the-fight-for-justice': 'political-analysis',
  'parallels-of-resistance-the-american-patriots-and-palestinian-freedom-fighters': 'leadership',
  'jesus-and-the-gazans-crucified-unjustly': 'perspectives',
  'ramadan-and-lent-prayer-reflection-and-hope-for-palestine': 'perspectives',
  'happy-valentines-day-from-palestine-to-the-world': 'reflections',
  'christmas-in-bethlehem-will-look-very-different-this-year': 'reflections',
  'jerusalem-is-for-all': 'nation-building',
  'a-message-from-hcefs-president-happy-4th-of-july-everyone': 'reflections',
  // Additional articles on site (logical grouping)
  'what-jerusalem-means-to-us-christian-perspectives-and-reflections': 'perspectives',
  'what-jerusalem-means-to-us-muslim-perspectives-and-reflections': 'perspectives',
  'what-jerusalem-means-to-us-jewish-perspectives-and-reflections': 'perspectives',
  'cutting-aid-to-over-five-million-palestinian-refugees-is-not-how-we-make-america-great-again':
    'political-analysis',
  'hcef-statement-on-u-s-president-trumps-unjust-decision-on-jerusalem-by-rateb-y-rabie-president-ceo':
    'political-analysis',
  'christians-at-risk-fostering-greater-solidarity': 'perspectives',
  'building-bridges-not-walls-my-visit-to-palestine': 'reflections',
  'why-are-the-sufferings-of-the-palestinian-christians-being-made-invisible': 'perspectives',
};

export function getCategoryIdForSlug(slug) {
  return ARTICLE_CATEGORY_BY_SLUG[slug] || 'perspectives';
}

export function getCategoryById(id) {
  return ARTICLE_CATEGORIES.find((c) => c.id === id);
}
