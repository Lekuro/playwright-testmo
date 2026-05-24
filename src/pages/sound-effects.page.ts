import { Locator, Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { BenefitFreeAccountModal } from '../modals/benefit-free-account';

export class SoundEffectsPage {
  public readonly url = '/sound-effects';
  public readonly header: HeaderComponent;
  public readonly benefitFreeAccountModal: BenefitFreeAccountModal;
  public readonly page: Page;

  private readonly searchInputLocator: Locator;
  private readonly searchSubmitButtonLocator: Locator;
  private readonly priceFacetToggleLocator: Locator;
  private readonly freeLabelLocator: Locator;
  private readonly firstTrackLocator: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.benefitFreeAccountModal = new BenefitFreeAccountModal(page);
    this.searchInputLocator = this.page.getByRole('textbox').first();
    this.searchSubmitButtonLocator = this.page.getByRole('button', { name: /search/i }).first();
    this.priceFacetToggleLocator = this.page
      .locator('#facet-item-priceRange .facet-item-header, #facet-item-priceRange [class*="facet-item-title"], #facet-item-priceRange')
      .first();
    this.freeLabelLocator = this.page.locator('label.custom-control-label', { hasText: 'Free' }).first();
    this.firstTrackLocator = this.page.locator('.div-product-card').first();
  }

  public async goTo(): Promise<void> {
    await this.page.goto(this.url);
  }

  public async searchFor(term: string): Promise<void> {
    await this.searchInputLocator.waitFor({ state: 'visible' });
    await this.searchInputLocator.fill(term);
    if (await this.searchSubmitButtonLocator.isVisible()) {
      await this.searchSubmitButtonLocator.click();
    } else {
      await this.page.keyboard.press('Enter');
    }
  }

  public async clickPrice(): Promise<void> {
    if (await this.freeLabelLocator.isVisible()) {
      return;
    }

    await this.priceFacetToggleLocator.waitFor({ state: 'visible' });
    await this.priceFacetToggleLocator.click();
    await this.freeLabelLocator.waitFor({ state: 'visible' });
  }

  public async selectFreeCheckbox(): Promise<void> {
    await this.freeLabelLocator.waitFor({ state: 'visible' });
    await this.freeLabelLocator.click();
  }

  public async hoverFirstTrack(): Promise<void> {
    await this.firstTrackLocator.waitFor({ state: 'visible' });
    await this.firstTrackLocator.scrollIntoViewIfNeeded();
    await this.firstTrackLocator.hover();
  }

  public async clickFirstDownload(): Promise<void> {
    await this.hoverFirstTrack();
    const downloadButton = this.firstTrackLocator
      .locator(
        'button.track-download-comp, button[aria-label*="download"], button:has([data-testid="download"]), button:has-text("Download")'
      )
      .first();
    await downloadButton.waitFor({ state: 'visible' });
    await downloadButton.click();
  }
}
