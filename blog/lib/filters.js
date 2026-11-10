const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Parse a Date or "YYYY-MM-DD…" string to UTC parts so timezones never shift the day
function parts(value) {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate() };
}

const pad = (n) => String(n).padStart(2, '0');

export function isoDate(value) {
  const p = parts(value);
  return p ? `${p.y}-${pad(p.m + 1)}-${pad(p.d)}` : '';
}

export function readableDate(value) {
  const p = parts(value);
  return p ? `${MONTHS[p.m]} ${p.d}, ${p.y}` : '';
}

export function readingTime(html = '') {
  const text = String(html).replace(/<[^>]*>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function slugifyTag(tag = '') {
  return String(tag).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function apaCitation({ title, date, url, author = 'Kulshreshtha, R.', container = 'Rishi Kulshreshtha — Writing' }) {
  const p = parts(date);
  const when = p ? `(${p.y}, ${MONTHS[p.m]} ${p.d})` : '(n.d.)';
  return `${author} ${when}. ${title}. ${container}. ${url}`;
}

export function bibtex({ title, date, url, slug = '', author = 'Kulshreshtha, Rishi', container = 'Rishi Kulshreshtha — Writing' }) {
  const p = parts(date);
  const key = `kulshreshtha${p ? p.y : ''}${slugifyTag(slug).split('-')[0] || 'post'}`;
  const lines = [
    `@online{${key},`,
    `  author = {${author}},`,
    `  title = {${title}},`,
    `  organization = {${container}},`,
  ];
  if (p) lines.push(`  date = {${isoDate(date)}},`, `  year = {${p.y}},`);
  lines.push(`  url = {${url}}`, '}');
  return lines.join('\n');
}

// JSON for inline <script type="application/ld+json">; escapes "<" so content can't close the tag
export function jsonLd(obj) {
  return JSON.stringify(obj, null, 2).replace(/</g, '\\u003c');
}

export function blogPostingLd({ title, description, date, updated, tags = [], url, image, site }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: isoDate(date),
    dateModified: isoDate(updated || date),
    keywords: tags.filter((t) => t !== 'posts').join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    image,
    inLanguage: 'en',
    author: { '@id': site.author.id },
    publisher: { '@id': site.author.id },
  };
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Feed timestamps are pinned to UTC midnight of the post's date
export function dateRfc822(value) {
  const p = parts(value);
  if (!p) return '';
  const dow = DAYS[new Date(Date.UTC(p.y, p.m, p.d)).getUTCDay()];
  return `${dow}, ${pad(p.d)} ${MONTHS[p.m].slice(0, 3)} ${p.y} 00:00:00 +0000`;
}

export function dateRfc3339(value) {
  const iso = isoDate(value);
  return iso ? `${iso}T00:00:00Z` : '';
}
