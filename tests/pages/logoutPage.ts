import { Page } from "@playwright/test";

export class LogoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickLogout() {
    await this.page.click("#logout2");
    await this.page.waitForTimeout(2000);
  }

  async isLoginVisible() {
    await this.page.waitForTimeout(1000);
    return this.page.locator("#login2").isVisible();
  }

  async isLogoutVisible() {
    await this.page.waitForTimeout(1000);
    return this.page.locator("#logout2").isVisible();
  }
}