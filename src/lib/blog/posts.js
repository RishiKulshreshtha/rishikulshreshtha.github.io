import { marked } from 'marked';

const rawFiles = import.meta.glob('../../posts/*.md', { eager: true, query: '?raw', import: 'default' });

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const metaStr = match[1];
  const content = match[2].trim();
  const meta = {};

  for (const line of metaStr.split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^"|"$/g, ''));
    }
    meta[key] = value;
  }

  return { meta, content };
}

export const posts = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const slug = path.replace(/^.*\/(.+)\.md$/, '$1');
    const { meta, content } = parseFrontmatter(raw);
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || '',
      description: meta.description || '',
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      draft: meta.draft === 'true',
      html: marked.parse(content),
      raw: content,
    };
  })
  .filter(p => !p.draft)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function getPost(slug) {
  return posts.find(p => p.slug === slug) || null;
}
