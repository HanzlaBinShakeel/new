import { writeFileSync } from 'fs';

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

function inferTag(title, categories) {
  const t = title.toLowerCase();
  const personal =
    /valentine|easter|christmas|thankful|semitic|gazans|crucified/i.test(t) ||
    categories?.some((c) => /personal/i.test(c.name || ''));
  return personal ? 'personal' : 'work';
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
  const cats = post._embedded?.['wp:term']?.[0] || [];

  return {
    slug: post.slug,
    title,
    date,
    category: 'Articles',
    tag: inferTag(title, cats),
    image: getFeaturedImage(post),
    excerpt: stripHtml(post.excerpt?.rendered || '').replace(/<[^>]+>/g, '').trim(),
    content: stripHtml(post.content?.rendered || ''),
  };
});

const out = `/* Auto-generated from rateb.rabie.us WordPress API */\nexport const articles = ${JSON.stringify(articles, null, 2)};\n\nexport function getArticleBySlug(slug) {\n  return articles.find((a) => a.slug === slug);\n}\n`;

writeFileSync(new URL('../src/data/articles.js', import.meta.url), out);
console.log(`Wrote ${articles.length} articles to src/data/articles.js`);
