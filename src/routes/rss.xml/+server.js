import { posts } from '$lib/blog/posts.js';

export const prerender = true;

const SITE_URL = 'https://rishikulshreshtha.github.io';

function escapeXml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/writing/${post.slug}`;
      const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Rishi Kulshreshtha — Writing</title>
    <link>${SITE_URL}/writing</link>
    <description>Notes on Drupal, web accessibility, and AI-readiness.</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
