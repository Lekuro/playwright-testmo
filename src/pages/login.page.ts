import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  public readonly url = '/login';

  private readonly emailInputLocator: Locator;
  private readonly passwordInputLocator: Locator;
  private readonly loginButtonLocator: Locator;

  public constructor(private readonly page: Page) {
    this.emailInputLocator = this.page.locator('input[type="email"], input[name="email"]').first();
    this.passwordInputLocator = this.page.locator('input[type="password"], input[name="password"]').first();
    this.loginButtonLocator = this.page.locator('button[type="submit"], button:has-text("Log in"), button:has-text("Sign in")').first();
  }

  public async goTo(): Promise<void> {
    await this.page.goto('/login');
  }

  public async login(email: string, password: string): Promise<void> {
    await this.goTo();
    await this.emailInputLocator.fill(email);
    await this.passwordInputLocator.fill(password);
    await this.checkHumanVerificationIfPresent();
    await expect(this.loginButtonLocator).toBeEnabled({ timeout: 30000 });
    await this.loginButtonLocator.click();
    await expect(this.page).not.toHaveURL(/\/login/, { timeout: 45000 });
  }

  private async checkHumanVerificationIfPresent(): Promise<void> {
    const verificationWidget = this.page.getByText(/verify you are human|verifying\.\.\.|verification failed/i).first();
    const challengeVisible = await verificationWidget.isVisible();

    if (!challengeVisible) {
      return;
    }

    const verificationFailed = this.page.getByText(/verification failed/i).first();

    try {
      const result = await Promise.race([
        verificationWidget.waitFor({ state: 'hidden', timeout: 120000 }).then(() => 'passed' as const),
        verificationFailed.waitFor({ state: 'visible', timeout: 120000 }).then(() => 'failed' as const)
      ]);

      if (result === 'failed') {
        throw new Error('Cloudflare verification failed. Complete the checkbox manually once and rerun auth setup.');
      }
    } catch {
      throw new Error('Cloudflare verification did not complete in time. Complete "Verify you are human" manually and rerun auth setup.');
    }
  }
}
