import { galleryImages } from './gallery';

/** Titles from "My Pictures with titles.docx" — order matches gallery-01 … gallery-14 */
const SLIDE_TITLES = [
  'Reception with Her Majesty Queen Rania Al Abdullah of Jordan',
  'The Most Reverend Cardinal Donald W. Wuerl, Archbishop, Archdiocese of Washington (Former)',
  'Conversation with His Highness Prince Hassan Bin Talal of Jordan',
  'Official meeting with President Yasser Arafat of Palestine (Former)',
  'Presentation ceremony by President Yasser Arafat of Palestine (former)',
  'Presentation ceremony by President Yasser Arafat of Palestine (former)',
  'Reception with His Majesty King Hussein of Jordan (Former)',
  'Reception with His Majesty King Abdullah II of Jordan',
  'Banquet ceremony with distinguished guest Mr. Mehdi Hasan Broadcaster/Journalist',
  'Reception with His Majesty King Abdullah II of Jordan',
  'Award presentation to the former Deputy Prime Minister of Jordan, Dr. Marwan Muasher (Former)',
  'Honoring Mr. Mehdi Hasan Broadcaster/Journalist',
  'Reception with His Highness Prince Hassan Bin Talal of Jordan',
  'Meeting with His Holiness Saint Pope John Paul II in Jerusalem',
];

export const heroSlides = galleryImages
  .slice(0, SLIDE_TITLES.length)
  .map((img, index) => ({
    ...img,
    title: SLIDE_TITLES[index],
  }));
