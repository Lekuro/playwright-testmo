import { Locator, Page } from '@playwright/test';

export class BenefitFreeAccountModal {
  private readonly rootLocator: Locator;
  private readonly signUpTabLocator: Locator;
  private readonly alreadyMemberTextLocator: Locator;
  private readonly benefitsTitleLocator: Locator;
  private readonly downloadFreeElementsTextLocator: Locator;
  private readonly viewFavoritesTextLocator: Locator;
  private readonly purchaseElementsTextLocator: Locator;

  public constructor(private readonly page: Page) {
    this.rootLocator = this.page.getByRole('dialog').first();
    this.signUpTabLocator = this.rootLocator.getByRole('tab', { name: /sign up/i }).first();
    this.alreadyMemberTextLocator = this.rootLocator.getByText(/already a member/i).first();
    this.benefitsTitleLocator = this.rootLocator.getByRole('heading', { name: /benefits of your free account/i }).first();
    this.downloadFreeElementsTextLocator = this.rootLocator.getByText(/download free elements/i).first();
    this.viewFavoritesTextLocator = this.rootLocator.getByText(/view favorites/i).first();
    this.purchaseElementsTextLocator = this.rootLocator.getByText(/purchase elements/i).first();
  }

  public root(): Locator {
    return this.rootLocator;
  }

  public signUpTab(): Locator {
    return this.signUpTabLocator;
  }

  public alreadyMemberText(): Locator {
    return this.alreadyMemberTextLocator;
  }

  public benefitsTitle(): Locator {
    return this.benefitsTitleLocator;
  }

  public downloadFreeElementsText(): Locator {
    return this.downloadFreeElementsTextLocator;
  }

  public viewFavoritesText(): Locator {
    return this.viewFavoritesTextLocator;
  }

  public purchaseElementsText(): Locator {
    return this.purchaseElementsTextLocator;
  }
}
