#!/usr/bin/env node
/**
 * Apply categories from Website Articles RYR Categorized.xlsx to articles.js
 * Run: npm run sync-article-categories
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const XLSX = join(ROOT, 'Website Articles RYR Categorized.xlsx');
const ARTICLES_PATH = join(ROOT, 'src/data/articles.js');
const MAP_PATH = join(ROOT, 'src/data/articleCategoryMap.json');

const manualExtras = {
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

const xlsxMap = JSON.parse(
  execSync(`python3 "${join(__dirname, 'parse-article-xlsx.py')}" "${XLSX}"`, { encoding: 'utf8' })
);

const fullMap = { ...manualExtras, ...xlsxMap };
writeFileSync(MAP_PATH, JSON.stringify(fullMap, null, 2) + '\n');

const articlesJs = readFileSync(ARTICLES_PATH, 'utf8');
const match = articlesJs.match(/export const articles = (\[[\s\S]*?\]);/);
if (!match) throw new Error('Could not parse articles.js');
const articles = JSON.parse(match[1]);

for (const a of articles) {
  a.articleCategory = fullMap[a.slug] || a.articleCategory || 'perspectives';
  delete a.tag;
}

const out = `/* Auto-generated — categories from Website Articles RYR Categorized.xlsx */
import { getCategoryIdForSlug } from './articleCategories.js';

export const articles = ${JSON.stringify(articles, null, 2)};

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categoryId) {
  return articles.filter((a) => a.articleCategory === categoryId);
}

/** Ensure category is set (for legacy data) */
export function normalizeArticle(article) {
  if (!article.articleCategory) {
    return { ...article, articleCategory: getCategoryIdForSlug(article.slug) };
  }
  return article;
}
`;

writeFileSync(ARTICLES_PATH, out);
console.log(`Categorized ${articles.length} articles (${Object.keys(xlsxMap).length} from xlsx)`);
