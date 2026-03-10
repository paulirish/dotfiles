import { test, expect } from '@playwright/test';

test.describe('initial render', () => {
  test('renders all three initial players', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.player')).toHaveCount(3);
  });

  test('XSS payload in initial data renders as escaped text, not HTML', async ({ page }) => {
    await page.goto('/');

    // One initial player has `<img src=x onerror="alert(1)">` as their name.
    // It should appear as visible text, not as an <img> element.
    const xssPlayer = page.locator('.player').filter({ hasText: '<img' });
    await expect(xssPlayer).toBeVisible();

    // The literal angle bracket should be in the text content.
    await expect(xssPlayer.locator('.name')).toHaveText('<img src=x onerror="alert(1)">');

    // No <img> element should have been injected inside .name.
    await expect(xssPlayer.locator('.name img')).toHaveCount(0);
  });
});

test.describe('adding players', () => {
  test('adds a new player and shows them in the list', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[name="name"]', 'Zara');
    await page.fill('input[name="score"]', '750');
    await page.click('button[type="submit"]');

    await expect(page.locator('.player')).toHaveCount(4);
    await expect(page.locator('.player').filter({ hasText: 'Zara' })).toBeVisible();
  });

  test('form resets after submission', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[name="name"]', 'Temp');
    await page.fill('input[name="score"]', '1');
    await page.click('button[type="submit"]');

    await expect(page.locator('input[name="name"]')).toHaveValue('');
  });

  test('<script> tag in name is escaped, script does not execute', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[name="name"]', '<script>window.__xss = true</script>');
    await page.fill('input[name="score"]', '9999');
    await page.click('button[type="submit"]');

    // Should appear as literal text in the list.
    const entry = page.locator('.player').filter({ hasText: '<script>' });
    await expect(entry).toBeVisible();

    // The injected script must not have run.
    const xssRan = await page.evaluate(() => /** @type {any} */ (window).__xss);
    expect(xssRan).toBeUndefined();
  });

  test('onerror handler in name is escaped, handler does not execute', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[name="name"]', '<img src=x onerror="window.__onerror=true">');
    await page.fill('input[name="score"]', '500');
    await page.click('button[type="submit"]');

    // No <img> injected into any .name cell.
    await expect(page.locator('.player .name img')).toHaveCount(0);

    // The onerror handler must not have run.
    const handlerRan = await page.evaluate(() => /** @type {any} */ (window).__onerror);
    expect(handlerRan).toBeUndefined();
  });
});

test.describe('leaderboard sorting', () => {
  test('list is sorted highest score first', async ({ page }) => {
    await page.goto('/');

    const scores = await page.locator('.player .score').allTextContents();
    const nums = scores.map(Number);
    const sorted = [...nums].sort((a, b) => b - a);
    expect(nums).toEqual(sorted);
  });

  test('new top-scorer goes to rank 1', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[name="name"]', 'Champion');
    await page.fill('input[name="score"]', '99999');
    await page.click('button[type="submit"]');

    const firstPlayer = page.locator('.player').first();
    await expect(firstPlayer.locator('.name')).toHaveText('Champion');
    await expect(firstPlayer).toHaveAttribute('data-rank', '1');
  });
});
