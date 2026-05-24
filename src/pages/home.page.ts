import { Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';

export class HomePage {
  public readonly url = '/';
  public readonly header: HeaderComponent;

  public constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
  }

  public async goTo(): Promise<void> {
    await this.page.goto('/');
  }
}
