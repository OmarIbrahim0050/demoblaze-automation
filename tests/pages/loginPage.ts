import { Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("https://www.demoblaze.com/");
  }

  async openLoginModal() {
    await this.page.click("#login2");
  }

  async login(username: string, password: string) {
    await this.page.fill("#loginusername", username);
    await this.page.fill("#loginpassword", password);
    await this.page.click("button[onclick='logIn()']");
  }

  async isLoggedIn() {
    await this.page.waitForSelector("#nameofuser", { timeout: 5000 });
    const welcomeText = await this.page.textContent("#nameofuser");
    return welcomeText;
  }
}
