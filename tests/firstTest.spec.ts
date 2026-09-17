import { test, expect } from '@playwright/test';

test('My first Playwright test', async ({ page }) => {

    await page.goto('https://uat-phidashboard.fynity.in/dashboard/login');

    await expect(page).toHaveTitle(/Playwright/);
    console.log("Hello")
});