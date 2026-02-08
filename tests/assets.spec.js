import { test, expect } from '@playwright/test';

test('assets list loads', async ({ page }) => {
  await page.goto('/assets');
  await expect(page.getByRole('heading', { name: 'Asset' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add Asset' })).toBeVisible();
});
