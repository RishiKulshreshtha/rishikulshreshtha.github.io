import { test, expect } from '@playwright/test';

test.describe('Theme toggle', () => {
  test('page loads with a valid theme (dark or light)', async ({ page }) => {
    await page.goto('/');
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(['dark', 'light']).toContain(theme);
  });

  test('toggle button is visible in the nav', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav__theme')).toBeVisible();
  });

  test('clicking the toggle switches the theme', async ({ page }) => {
    await page.goto('/');
    const before = await page.locator('html').getAttribute('data-theme');
    await page.locator('.nav__theme').click();
    const after = await page.locator('html').getAttribute('data-theme');
    expect(after).not.toBe(before);
    expect(['dark', 'light']).toContain(after);
  });

  test('toggling twice returns to original theme', async ({ page }) => {
    await page.goto('/');
    const original = await page.locator('html').getAttribute('data-theme');
    await page.locator('.nav__theme').click();
    await page.locator('.nav__theme').click();
    const restored = await page.locator('html').getAttribute('data-theme');
    expect(restored).toBe(original);
  });

  test('theme persists after page reload', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav__theme').click();
    const theme = await page.locator('html').getAttribute('data-theme');

    await page.reload();
    const reloaded = await page.locator('html').getAttribute('data-theme');
    expect(reloaded).toBe(theme);
  });
});
