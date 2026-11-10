import matter from 'gray-matter';

// Front matter only: 11ty (blog/) renders the posts, SvelteKit just needs the latest one for the home card
const rawFiles = import.meta.glob('/blog/posts/*.md', { eager: true, query: '?raw', import: 'default' });

export const posts = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const { data } = matter(raw);
    return {
      slug: path.replace(/^.*\/(.+)\.md$/, '$1'),
      title: data.title || '',
      date: data.date ? new Date(data.date).toISOString().slice(0, 10) : '',
      description: data.description || '',
      draft: data.draft === true,
    };
  })
  .filter((p) => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date));
