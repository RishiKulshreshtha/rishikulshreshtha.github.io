export const prerender = true;

const SITE_URL = 'https://rishikulshreshtha.github.io';

const staticRoutes = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.9' },
  { path: '/projects', changefreq: 'monthly', priority: '0.8' },
  { path: '/playground', changefreq: 'monthly', priority: '0.3' },
  { path: '/accessibility-statement', changefreq: 'yearly', priority: '0.4' },
];

export function GET() {
  const buildDate = new Date().toISOString().slice(0, 10);

  const staticEntries = staticRoutes.map(
    (route) => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticEntries.join('')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
