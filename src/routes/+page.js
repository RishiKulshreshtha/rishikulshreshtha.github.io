import { posts } from '$lib/blog/posts.js';

export const prerender = true;

export function load() {
  const [latestPost] = posts;
  return {
    latestPost: latestPost
      ? { slug: latestPost.slug, title: latestPost.title, description: latestPost.description }
      : null,
  };
}
