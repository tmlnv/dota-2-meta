import { expect, test } from '@playwright/test';
import { ALL_ROLES, MMRMAPPING } from '../src/components/config';

test.beforeEach( async ({ page }) => {
    await page.goto('http://localhost:5173/');
});

test.describe('all', () => {
    test('has title', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Dota 2 Meta/);

        await new Promise(res => setTimeout(res, 2000));
    });

    for (let role of ALL_ROLES) {
        test(`Role dropdown - ${role}`, async ({ page }) => {
            await page.locator('#roleDropdown div').click();
            await page.getByText(role).click();
            
            expect(page.locator('div').filter({ hasText: role })).toBeVisible;
        });
    };

    for (let mmr in MMRMAPPING) {
        test(`Mmr dropdown - ${mmr}`, async ({ page }) => {
            await page.locator('#mmrDropdown div').click();
            await page.getByText(mmr).click();
            
            expect(page.locator('div').filter({ hasText: mmr })).toBeVisible;
        });
    };
});