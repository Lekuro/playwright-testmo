import { BrowserContext, Page, test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { MusicPage } from '../pages/music.page';
import { SoundEffectsPage } from '../pages/sound-effects.page';
import { VideoPage } from '../pages/video.page';

interface RegisteredFixtures {
  context: BrowserContext;
  page: Page;
  loginPage: LoginPage;
  homePage: HomePage;
  musicPage: MusicPage;
  soundEffectsPage: SoundEffectsPage;
  videoPage: VideoPage;
}

export const test = base.extend<RegisteredFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  musicPage: async ({ page }, use) => {
    await use(new MusicPage(page));
  },
  soundEffectsPage: async ({ page }, use) => {
    await use(new SoundEffectsPage(page));
  },
  videoPage: async ({ page }, use) => {
    await use(new VideoPage(page));
  }
});

export { expect } from '@playwright/test';
