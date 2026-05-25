import { expect, test } from '../src/fixtures/fixture';

test.describe('Video Page - Unregistered User', () => {
  test('C1 Logo navigate to home page', async ({ page, videoPage }) => {
    await videoPage.goTo();
    await expect(videoPage.header.logo()).toBeVisible();
    await videoPage.header.logo().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('C3 Add Video to cart is impossible', async ({ videoPage }) => {
    await videoPage.goTo();
    await videoPage.searchFor('people');
    await videoPage.openFirstVideoResult();

    await expect(videoPage.addToCartButton()).toBeVisible();

    await videoPage.clickAddToCart();

    await expect(videoPage.benefitFreeAccountModal.root()).toBeVisible();
    await expect(videoPage.benefitFreeAccountModal.signUpTab()).toBeVisible();
    await expect(videoPage.benefitFreeAccountModal.alreadyMemberText()).toBeVisible();
    await expect(videoPage.benefitFreeAccountModal.benefitsTitle()).toBeVisible();
    await expect(videoPage.benefitFreeAccountModal.downloadFreeElementsText()).toBeVisible();
    await expect(videoPage.benefitFreeAccountModal.viewFavoritesText()).toBeVisible();
    await expect(videoPage.benefitFreeAccountModal.purchaseElementsText()).toBeVisible();
  });
});
