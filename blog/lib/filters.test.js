import { describe, it, expect } from 'vitest';
import { isoDate, readableDate, readingTime, slugifyTag, apaCitation, bibtex, jsonLd, blogPostingLd } from './filters.js';

describe('dates', () => {
  it('formats strings and Dates without timezone drift', () => {
    expect(isoDate('2026-03-06')).toBe('2026-03-06');
    expect(isoDate(new Date('2026-03-06T00:00:00Z'))).toBe('2026-03-06');
    expect(readableDate('2026-03-06')).toBe('March 6, 2026');
  });
  it('returns empty string for missing or invalid input', () => {
    expect(isoDate('')).toBe('');
    expect(readableDate('nope')).toBe('');
  });
});

describe('readingTime', () => {
  it('is at least 1 minute and strips tags', () => {
    expect(readingTime('<p>hi</p>')).toBe(1);
    expect(readingTime(`<p>${'word '.repeat(440)}</p>`)).toBe(2);
    expect(readingTime(`<p>${'word '.repeat(441)}</p>`)).toBe(3);
  });
});

describe('slugifyTag', () => {
  it('slugifies', () => {
    expect(slugifyTag('AI & LLMs')).toBe('ai-llms');
    expect(slugifyTag(' Drupal ')).toBe('drupal');
  });
});

describe('citations', () => {
  const post = { title: 'Hello', date: '2026-03-06', url: 'https://example.com/writing/hello', slug: 'hello' };
  it('builds APA', () => {
    expect(apaCitation(post)).toBe('Kulshreshtha, R. (2026, March 6). Hello. https://example.com/writing/hello');
  });
  it('builds BibTeX', () => {
    const out = bibtex(post);
    expect(out).toContain('@online{kulshreshtha2026hello,');
    expect(out).toContain('author = {Kulshreshtha, Rishi},');
    expect(out).toContain('date = {2026-03-06},');
    expect(out).toContain('url = {https://example.com/writing/hello}');
    expect(out).not.toContain('organization');
  });
});

describe('structured data', () => {
  const site = { author: { id: 'https://example.com/#person' } };
  it('references the author by @id and defaults dateModified', () => {
    const ld = blogPostingLd({ title: 'T', description: 'D', date: '2026-03-06', tags: ['posts', 'a'], url: 'u', image: 'i', site });
    expect(ld.author).toEqual({ '@id': 'https://example.com/#person' });
    expect(ld.dateModified).toBe('2026-03-06');
    expect(ld.keywords).toBe('a');
  });
  it('escapes < in JSON-LD', () => {
    expect(jsonLd({ a: '</script>' })).not.toContain('</script>');
  });
});

import { dateRfc822, dateRfc3339 } from './filters.js';

describe('feed dates', () => {
  it('pins to UTC midnight', () => {
    expect(dateRfc822('2026-03-06')).toBe('Fri, 06 Mar 2026 00:00:00 +0000');
    expect(dateRfc3339(new Date('2026-03-06T00:00:00Z'))).toBe('2026-03-06T00:00:00Z');
  });
});
