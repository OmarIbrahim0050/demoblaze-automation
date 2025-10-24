import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/registerPage";
import { LoginPage } from "../pages/loginPage";
import { OrderPage } from "../pages/orderPage";
import { LogoutPage } from "../pages/logoutPage";

test.describe("E2E Flow: Register → Login → Buy → Logout", () => {
  let username: string;
  const password = "123456";

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const registerPage = new RegisterPage(page);

    await registerPage.open();
    await registerPage.openSignUpModal();

    username = await registerPage.register(undefined, password);
    const alertMessage = await registerPage.isRegistrationAlertVisible();
    expect(alertMessage).toContain("Sign up successful");

    await page.close();
  });

  test("Complete E2E flow", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const orderPage = new OrderPage(page);
    const logoutPage = new LogoutPage(page);

    // Login
    await loginPage.open();
    await loginPage.openLoginModal();
    await loginPage.login(username, password);
    expect(await loginPage.isLoggedIn()).toContain(username);

    // Select product under Monitors category and add to cart
    await page.goto("https://www.demoblaze.com/");
    await orderPage.selectProduct("Apple monitor 24", "Monitors");
    const alertMsg = await orderPage.addToCart();
    expect(alertMsg).toContain("Product added");

    // Place order
    const confirmation = await orderPage.placeOrder(
      username,
      "Egypt",
      "Cairo",
      "1234567890123456",
      "10",
      "2025"
    );
    expect(confirmation).toContain("Thank you for your purchase!");

    // Logout
    expect(await logoutPage.isLogoutVisible()).toBeTruthy();
    await logoutPage.clickLogout();
    expect(await logoutPage.isLoginVisible()).toBeTruthy();

    console.log(`E2E flow completed successfully for user: ${username}`);
  });
});
