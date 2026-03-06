import { test, expect } from '@playwright/test';

test.describe('Navigation — locking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all four nav links are locked on first load', async ({ page }) => {
    const lockIcons = page.locator('.nav__lock');
    await expect(lockIcons).toHaveCount(4);
  });

  test('clicking a locked nav link does not navigate to that section', async ({ page }) => {
    const aboutLink = page.locator('a.nav__link[href="#about"]');
    await aboutLink.click();
    // About section should not exist in DOM yet
    await expect(page.locator('#about')).not.toBeAttached();
  });

  test('clicking locked ABOUT link scrolls to the Memory Match game', async ({ page }) => {
    await page.locator('a.nav__link[href="#about"]').click();
    await expect(page.locator('#game-memory')).toBeInViewport();
  });

  test('SKILLS nav link is locked on first load (game 2 not won)', async ({ page }) => {
    const skillsLink = page.locator('a.nav__link[href="#skills"]');
    await expect(skillsLink).toHaveAttribute('aria-label', /locked/i);
  });
});

test.describe('Footer', () => {
  test('PRESS START TO CONTINUE is a button', async ({ page }) => {
    await page.goto('/');
    await page.locator('.skip-gate__btn').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.footer__credits')).toBeVisible();
    const tag = await page.locator('.footer__credits').evaluate(el => el.tagName.toLowerCase());
    expect(tag).toBe('button');
  });

  test('clicking PRESS START scrolls to hero section', async ({ page }) => {
    await page.goto('/');
    await page.locator('.skip-gate__btn').click();
    await page.waitForTimeout(1000);
    // Scroll to bottom first
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator('.footer__credits').click();
    await expect(page.locator('#hero')).toBeInViewport({ timeout: 3000 });
  });
});

test.describe('Navigation — skip gate', () => {
  test('skip button is visible below the Memory Match game', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.skip-gate__btn')).toBeVisible();
  });

  test('skip button text reflects terminal style', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.skip-gate__btn')).toContainText('skip_games.sh');
  });

  test('clicking skip reveals all sections', async ({ page }) => {
    await page.goto('/');
    await page.locator('.skip-gate__btn').click();
    await expect(page.locator('#about')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('#skills')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('#achievements')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('#contact')).toBeVisible({ timeout: 3000 });
  });

  test('skip gate disappears after skipping', async ({ page }) => {
    await page.goto('/');
    await page.locator('.skip-gate__btn').click();
    await expect(page.locator('.skip-gate')).not.toBeVisible({ timeout: 3000 });
  });

  test('after skipping, nav links have no lock icons', async ({ page }) => {
    await page.goto('/');
    await page.locator('.skip-gate__btn').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.nav__lock')).toHaveCount(0);
  });
});
