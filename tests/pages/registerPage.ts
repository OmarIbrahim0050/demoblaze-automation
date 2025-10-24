import { Page } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("https://www.demoblaze.com/");
  }

  async openSignUpModal() {
    await this.page.click("#signin2");
  }


  generateUsername(baseName = "omar_test"): string {
    const randomSuffix = Math.floor(Math.random() * 1000000);
    return `${baseName}_${randomSuffix}`;
  }

  async register(username?: string, password: string = "123456") {

    const finalUsername = username || this.generateUsername();

    await this.page.fill("#sign-username", finalUsername);
    await this.page.fill("#sign-password", password);
    await this.page.click("button[onclick='register()']");

    return finalUsername; 
  }

  async isRegistrationAlertVisible() {
    const dialog = this.page.waitForEvent("dialog");
    const message = await (await dialog).message();
    await (await dialog).accept();
    return message;
  }
}
