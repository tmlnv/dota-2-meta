import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://dota-2-meta.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Dota 2 Meta/);
});
