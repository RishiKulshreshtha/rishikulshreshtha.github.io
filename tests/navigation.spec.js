import { test, expect } from '@playwright/test';

test.describe('Main navigation', () => {
  test('nav links go to real, unlocked routes', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav__lock')).toHaveCount(0);

    await page.locator('a.nav__link', { hasText: 'ABOUT' }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator('h1, h2').filter({ hasText: 'ABOUT ME' })).toBeVisible();

    await page.locator('a.nav__link', { hasText: 'PROJECTS' }).click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test('active nav link is marked with aria-current', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('a.nav__link[href="/about"]')).toHaveAttribute('aria-current', 'page');
  });

  test('logo links back to home', async ({ page }) => {
    await page.goto('/about');
    await page.locator('.nav__logo').click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('social links and footer meta links are present', async ({ page }) => {
    await expect(page.locator('.footer__link').first()).toBeVisible();
    await expect(page.locator('.footer__copy')).toContainText('Rishi Kulshreshtha');
  });

  test('footer links to Playground', async ({ page }) => {
    await page.locator('.footer__meta-link', { hasText: 'PLAYGROUND' }).click();
    await expect(page).toHaveURL(/\/playground$/);
  });

  test('footer links to Accessibility Statement', async ({ page }) => {
    await page.locator('.footer__meta-link', { hasText: 'ACCESSIBILITY STATEMENT' }).click();
    await expect(page).toHaveURL(/\/accessibility-statement$/);
  });
});

test.describe('Hero', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('EXPLORE and SAY HELLO are real, unlocked links', async ({ page }) => {
    const explore = page.locator('.hero__actions a', { hasText: 'EXPLORE' });
    const sayHello = page.locator('.hero__actions a', { hasText: 'SAY HELLO' });
    await expect(explore).toBeVisible();
    await expect(sayHello).toBeVisible();
  });

  test('EXPLORE scrolls to the highlights section', async ({ page }) => {
    await page.locator('.hero__actions a', { hasText: 'EXPLORE' }).click();
    await expect(page.locator('#highlights')).toBeInViewport({ timeout: 2000 });
  });

  test('SAY HELLO scrolls to the contact section', async ({ page }) => {
    await page.locator('.hero__actions a', { hasText: 'SAY HELLO' }).click();
    await expect(page.locator('#contact')).toBeInViewport({ timeout: 2000 });
  });
});

test.describe('Cursor', () => {
  test('cursor dot and ring elements are in the DOM', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.cursor__dot')).toBeAttached();
    await expect(page.locator('.cursor__ring')).toBeAttached();
  });
});

test.describe('404 handling', () => {
  test('an unknown writing slug 404s', async ({ page }) => {
    const response = await page.goto('/writing/this-post-does-not-exist');
    expect(response.status()).toBe(404);
  });
});
