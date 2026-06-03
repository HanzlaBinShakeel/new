import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAP_PATH = join(__dirname, '../src/data/articleCategoryMap.json');

const API = 'https://rateb.rabie.us/wp-json/wp/v2/posts?per_page=100&_embed';

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

function getFeaturedImage(post) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (media?.source_url) return media.source_url;
  const img = post.content?.rendered?.match(/<img[^>]+src="([^"]+)"/i);
  return img?.[1] || '';
}

let categoryMap = {};
try {
  categoryMap = JSON.parse(readFileSync(MAP_PATH, 'utf8'));
} catch {
  console.warn('No articleCategoryMap.json — run npm run sync-article-categories after xlsx');
}

const res = await fetch(API);
const posts = await res.json();

const articles = posts.map((post) => {
  const title = post.title.rendered.replace(/&#(\d+);/g, (_, n) =>
    String.fromCharCode(Number(n))
  );
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    slug: post.slug,
    title,
    date,
    category: 'Articles',
    articleCategory: categoryMap[post.slug] || 'perspectives',
    image: getFeaturedImage(post),
    excerpt: stripHtml(post.excerpt?.rendered || '').replace(/<[^>]+>/g, '').trim(),
    content: stripHtml(post.content?.rendered || ''),
  };
});

const out = `/* Auto-generated from rateb.rabie.us WordPress API */
import { getCategoryIdForSlug } from './articleCategories.js';

export const articles = ${JSON.stringify(articles, null, 2)};

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categoryId) {
  return articles.filter((a) => a.articleCategory === categoryId);
}

export function normalizeArticle(article) {
  if (!article.articleCategory) {
    return { ...article, articleCategory: getCategoryIdForSlug(article.slug) };
  }
  return article;
}
`;

writeFileSync(new URL('../src/data/articles.js', import.meta.url), out);
console.log(`Wrote ${articles.length} articles to src/data/articles.js`);
