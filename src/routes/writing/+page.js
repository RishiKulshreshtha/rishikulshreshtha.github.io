import { posts } from '$lib/blog/posts.js';

export const prerender = true;

export function load() {
  return {
    posts: posts.map(({ slug, title, date, description, tags }) => ({ slug, title, date, description, tags })),
  };
}
