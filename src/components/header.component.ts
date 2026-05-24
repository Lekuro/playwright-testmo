import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  private readonly logoLocator: Locator;
  private readonly profileMenuLocator: Locator;
  private readonly logoutButtonLocator: Locator;

  public constructor(private readonly page: Page) {
    this.logoLocator = this.page
      .locator('header')
      .getByRole('link')
      .filter({ has: this.page.locator('img[alt*="MotionElements"], img[alt*="motion elements"], svg') })
      .first();
    this.profileMenuLocator = this.page
      .locator('[data-testid="user-menu"], .user-menu, [aria-label*="profile"], [aria-label*="account"]')
      .first();
    this.logoutButtonLocator = this.page.locator('a[href*="logout"], button:has-text("Log out"), button:has-text("Sign out")').first();
  }

  public logo(): Locator {
    return this.logoLocator;
  }

  public profileMenu(): Locator {
    return this.profileMenuLocator;
  }

  public logoutButton(): Locator {
    return this.logoutButtonLocator;
  }
}
