import { test, expect } from '@playwright/test';

test.describe('Memory Match', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('game section is visible on load', async ({ page }) => {
    await expect(page.locator('#game-memory')).toBeVisible();
  });

  test('renders 16 cards', async ({ page }) => {
    await expect(page.locator('.memory__card')).toHaveCount(16);
  });

  test('all cards start face-down showing "?"', async ({ page }) => {
    const backs = page.locator('.memory__card-back');
    await expect(backs).toHaveCount(16);
  });

  test('clicking a card flips it face-up', async ({ page }) => {
    await page.locator('.memory__card').first().click();
    await expect(page.locator('.memory__card--flipped')).toHaveCount(1);
  });

  test('clicking two non-matching cards flips them back', async ({ page }) => {
    const cards = page.locator('.memory__card');
    // Click cards until we find a non-matching pair
    await cards.nth(0).click();
    await cards.nth(2).click();
    // After mismatch delay (700ms) + buffer, both should flip back
    await page.waitForTimeout(1100);
    await expect(page.locator('.memory__card--flipped')).toHaveCount(0);
  });

  test('restart button resets the board', async ({ page }) => {
    await page.locator('.memory__card').first().click();
    await expect(page.locator('.memory__card--flipped')).toHaveCount(1);
    await page.locator('button:has-text("RESTART")').click();
    await expect(page.locator('.memory__card--flipped')).toHaveCount(0);
    await expect(page.locator('.memory__card-back')).toHaveCount(16);
  });
});

test.describe('Sliding Puzzle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Unlock via skip so the puzzle is visible
    await page.locator('.skip-gate__btn').click();
    await expect(page.locator('#game-sliding')).toBeVisible({ timeout: 3000 });
  });

  test('renders 9 tiles (8 numbered + 1 empty)', async ({ page }) => {
    await expect(page.locator('.puzzle__tile')).toHaveCount(9);
  });

  test('empty tile has no text content', async ({ page }) => {
    const empty = page.locator('.puzzle__tile--empty');
    await expect(empty).toHaveCount(1);
    await expect(empty).toHaveText('');
  });

  test('movable tiles are visually highlighted', async ({ page }) => {
    await expect(page.locator('.puzzle__tile--movable').first()).toBeVisible();
  });

  test('clicking a movable tile updates the board', async ({ page }) => {
    const movable = page.locator('.puzzle__tile--movable').first();
    await movable.click();
    await expect(page.locator('.puzzle__tile--empty')).toHaveCount(1);
    const moveCount = await page.locator('#game-sliding .game__stat').first().textContent();
    expect(moveCount).toContain('1');
  });

  test('shuffle button reshuffles the board', async ({ page }) => {
    await page.locator('button:has-text("SHUFFLE")').click();
    await expect(page.locator('.puzzle__tile')).toHaveCount(9);
    // Move count resets to 0
    await expect(page.locator('.game__stat').first()).toContainText('0');
  });
});

test.describe('Whack-a-Bug', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.skip-gate__btn').click();
    await expect(page.locator('#game-whack')).toBeVisible({ timeout: 3000 });
  });

  test('shows START button before game begins', async ({ page }) => {
    await expect(page.locator('#game-whack button:has-text("START")')).toBeVisible();
  });

  test('clicking START hides the start button and shows the grid', async ({ page }) => {
    await page.locator('#game-whack button:has-text("START")').click();
    await expect(page.locator('#game-whack button:has-text("START")')).not.toBeVisible();
    await expect(page.locator('.mole__grid')).toBeVisible();
  });

  test('shows 9 mole holes after start', async ({ page }) => {
    await page.locator('#game-whack button:has-text("START")').click();
    await expect(page.locator('.mole__grid .mole__hole')).toHaveCount(9);
  });

  test('score increases when active mole is whacked', async ({ page }) => {
    await page.locator('#game-whack button:has-text("START")').click();
    await expect(page.locator('.mole__hole--active')).toBeVisible({ timeout: 3000 });
    await page.locator('.mole__hole--active').click();
    await expect(page.locator('#game-whack .game__stat').first()).toContainText('1/');
  });

  test('shows timer countdown after start', async ({ page }) => {
    await page.locator('#game-whack button:has-text("START")').click();
    await expect(page.locator('#game-whack .game__stat').nth(1)).toContainText('TIME:');
  });
});
