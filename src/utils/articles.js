import { articles } from '../data/articles';
import { ARTICLE_CATEGORIES, getCategoryById } from '../data/articleCategories';

export function groupArticlesByCategory(items = articles) {
  return ARTICLE_CATEGORIES.map((cat) => ({
    category: cat,
    articles: items
      .filter((a) => a.articleCategory === cat.id)
      .sort((a, b) => articles.indexOf(a) - articles.indexOf(b)),
  })).filter((g) => g.articles.length > 0);
}

export function getArticlesForCategory(categoryId, items = articles) {
  if (!categoryId || categoryId === 'all') return items;
  return items.filter((a) => a.articleCategory === categoryId);
}

export { ARTICLE_CATEGORIES, getCategoryById };
