import { Locator, Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { BenefitFreeAccountModal } from '../modals/benefit-free-account';

export class VideoPage {
  public readonly url = '/video';
  public readonly header: HeaderComponent;
  public readonly benefitFreeAccountModal: BenefitFreeAccountModal;
  private readonly searchInputLocator: Locator;
  private readonly searchSubmitButtonLocator: Locator;
  private readonly firstVideoResultLocator: Locator;
  private readonly addToCartButtonLocator: Locator;

  public constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.searchInputLocator = this.page.getByRole('textbox').first();
    this.searchSubmitButtonLocator = this.page.getByRole('button', { name: /search/i }).first();
    this.firstVideoResultLocator = this.page.locator('a[href*="/stock-video-"]').first();
    this.addToCartButtonLocator = this.page.getByRole('button', { name: /add to cart/i }).first();
    this.benefitFreeAccountModal = new BenefitFreeAccountModal(page);
  }

  public async goTo(): Promise<void> {
    await this.page.goto(this.url);
  }

  public addToCartButton(): Locator {
    return this.addToCartButtonLocator;
  }

  public async clickAddToCart(): Promise<void> {
    await this.addToCartButtonLocator.click();
  }

  public async searchFor(term: string): Promise<void> {
    await this.searchInputLocator.waitFor({ state: 'visible' });
    await this.searchInputLocator.fill(term);

    if (await this.searchSubmitButtonLocator.isVisible()) {
      await this.searchSubmitButtonLocator.click();
      return;
    }

    await this.page.keyboard.press('Enter');
  }

  public async openFirstVideoResult(): Promise<void> {
    await this.firstVideoResultLocator.waitFor({ state: 'visible' });
    await this.firstVideoResultLocator.click();
  }
}
