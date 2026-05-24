import { expect, test } from '../src/fixtures/fixture';

test.describe('Sound Effects Page - Unregistered User', () => {
  test('C7 Logo navigate to home page', async ({ page, soundEffectsPage }) => {
    await soundEffectsPage.goTo();
    await expect(soundEffectsPage.header.logo()).toBeVisible();
    await soundEffectsPage.header.logo().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('C2 Download Sound Effect is impossible', async ({ soundEffectsPage }) => {
    await soundEffectsPage.goTo();
    await soundEffectsPage.searchFor('nature');
    await soundEffectsPage.clickPrice();
    await soundEffectsPage.selectFreeCheckbox();
    await soundEffectsPage.clickFirstDownload();

    await expect(soundEffectsPage.benefitFreeAccountModal.root()).toBeVisible();
    await expect(soundEffectsPage.benefitFreeAccountModal.signUpTab()).toBeVisible();
    await expect(soundEffectsPage.benefitFreeAccountModal.alreadyMemberText()).toBeVisible();
    await expect(soundEffectsPage.benefitFreeAccountModal.benefitsTitle()).toBeVisible();
  });
});
