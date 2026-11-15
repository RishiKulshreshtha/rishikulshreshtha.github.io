import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import site from '../blog/_data/site.js';

// Use the newest published post from the built feed; post tests skip when nothing is published
const feed = JSON.parse(readFileSync(new URL('../docs/writing/feed.json', import.meta.url), 'utf8'));
const POST = feed.items[0] ? new URL(feed.items[0].url).pathname : null;
const needsPost = () => test.skip(!POST, 'no published posts');

test.describe('Writing index', () => {
  test('is indexable and lists posts or the empty state', async ({ page }) => {
    await page.goto('/writing');
    await expect(page.locator('h1')).toHaveText('WRITING');
    await expect(page.locator(POST ? '.blog__card' : '.blog__empty').first()).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://rishikulshreshtha.github.io/writing');
    await expect(page.locator('.comments')).toHaveCount(0);
  });

  test('an unknown slug returns 404', async ({ page }) => {
    const response = await page.goto('/writing/this-post-does-not-exist');
    expect(response.status()).toBe(404);
  });

  test('removed hello-world post returns 404', async ({ page }) => {
    const response = await page.goto('/writing/hello-world');
    expect(response.status()).toBe(404);
  });
});

test.describe('Post page', () => {
  test.beforeEach(needsPost);

  test('has h1, canonical, BlogPosting JSON-LD and cite box', async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator('h1.post__title')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://rishikulshreshtha.github.io${POST}`);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
    await expect(page.locator('meta[name="citation_title"]')).toHaveCount(1);

    const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent());
    expect(ld['@type']).toBe('BlogPosting');
    expect(ld.author['@id']).toBe('https://rishikulshreshtha.github.io/#person');

    await expect(page.locator('.cite [data-cite="apa"]')).toContainText('Kulshreshtha, R.');
    await expect(page.locator('.cite [data-cite="bibtex"]')).toContainText('@online{');
  });

  test('comments box renders with the configured giscus repo', async ({ page }) => {
    test.skip(!site.giscus.repoId, 'giscus not configured');
    await page.goto(POST);
    await expect(page.locator('.comments h2')).toHaveText('Comments');
    await expect(page.locator('[data-giscus]')).toHaveAttribute('data-repo-id', site.giscus.repoId);
  });

  test('raw markdown source is served', async ({ request }) => {
    const res = await request.get(`${POST}.md`);
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain('title:');
  });
});

test.describe('Theme and navigation', () => {
  test('theme toggle persists rk-theme', async ({ page }) => {
    await page.goto(POST || '/writing');
    const before = await page.locator('html').getAttribute('data-theme');
    await page.locator('.nav__theme').click();
    const after = await page.locator('html').getAttribute('data-theme');
    expect(after).not.toBe(before);
    expect(await page.evaluate(() => localStorage.getItem('rk-theme'))).toBe(after);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', after);
  });

  test('mobile menu opens', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/writing');
    await page.locator('.nav__toggle').click();
    await expect(page.locator('.nav__toggle')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('a.nav__link', { hasText: 'ABOUT' })).toBeVisible();
  });

  test('home → Writing navigation works', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.nav__link', { hasText: 'WRITING' }).click();
    await expect(page).toHaveURL(/\/writing$/);
    await expect(page.locator('h1')).toHaveText('WRITING');
  });

  test('nav links on blog pages reach SvelteKit routes', async ({ page }) => {
    await page.goto('/writing');
    await page.locator('a.nav__link', { hasText: 'ABOUT' }).click();
    await expect(page).toHaveURL(/\/about$/);
  });
});

test.describe('Accessibility', () => {
  for (const [name, url] of [['index', '/writing'], ...(POST ? [['post', POST]] : [])]) {
    for (const scheme of ['dark', 'light']) {
      test(`axe: ${name} (${scheme})`, async ({ page }) => {
        await page.addInitScript((s) => localStorage.setItem('rk-theme', s), scheme);
        await page.goto(url);
        const results = await new AxeBuilder({ page }).exclude('.giscus').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        expect(results.violations).toEqual([]);
      });
    }
  }
});
