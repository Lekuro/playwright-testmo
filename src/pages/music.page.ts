import { Locator, Page } from '@playwright/test';

export class MusicPage {
  public readonly url = '/music';

  private readonly addToFavoritesButtonLocator: Locator;

  public constructor(private readonly page: Page) {
    this.addToFavoritesButtonLocator = this.page
      .locator('button[aria-label*="favorite"], button:has-text("Add to favorites"), [data-testid="favorite"]')
      .first();
  }

  public async goto(): Promise<void> {
    await this.page.goto('/music');
  }
}
