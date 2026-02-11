import { test, expect } from '@playwright/test';

test('assets list loads', async ({ page }) => {
  await page.goto('/assets');
  await expect(page.getByRole('heading', { name: 'Assets' })).toBeVisible();
  await expect(page.getByRole('main').getByRole('link', { name: 'Add Asset' })).toBeVisible();
});
