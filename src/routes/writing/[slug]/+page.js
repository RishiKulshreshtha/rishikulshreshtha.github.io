import { error } from '@sveltejs/kit';
import { posts, getPost } from '$lib/blog/posts.js';

export const prerender = true;

export function entries() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function load({ params }) {
  const post = getPost(params.slug);
  if (!post) error(404, 'Post not found');
  return { post };
}
