import { Page } from "@playwright/test";

export class OrderPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectProduct(productName: string, categoryName?: string) {
    if (categoryName) {
      await this.page.click(`a:has-text("${categoryName}")`);
      await this.page.waitForTimeout(1000);
    }

    await this.page.waitForSelector(`a:has-text("${productName}")`, { timeout: 10000 });
    await this.page.click(`a:has-text("${productName}")`);
  }

  async addToCart() {
    await this.page.click("a:has-text('Add to cart')");
    const dialog = this.page.waitForEvent("dialog");
    const message = await (await dialog).message();
    await (await dialog).accept();
    return message;
  }

  async placeOrder(name: string, country: string, city: string, card: string, month: string, year: string) {
    await this.page.click("#cartur");
    await this.page.click("button:has-text('Place Order')");

    await this.page.fill("#name", name);
    await this.page.fill("#country", country);
    await this.page.fill("#city", city);
    await this.page.fill("#card", card);
    await this.page.fill("#month", month);
    await this.page.fill("#year", year);

    await this.page.click("button:has-text('Purchase')");

    const confirmation = await this.page.textContent(".sweet-alert > h2");
    
    await this.page.click("button.confirm");
    await this.page.waitForTimeout(2000);
    
    await this.page.click("#orderModal > div > div > div.modal-footer > button.btn.btn-secondary");
    
    await this.page.waitForTimeout(1000);

    return confirmation;
  }
}