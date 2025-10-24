import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/registerPage";
import { LoginPage } from "../pages/loginPage";
import { OrderPage } from "../pages/orderPage";
import { LogoutPage } from "../pages/logoutPage";

test("Complete E2E Flow: Register → Login → Buy → Logout", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const orderPage = new OrderPage(page);
  const logoutPage = new LogoutPage(page);
  const password = "123456";

  // 1. Register
  await registerPage.open();
  await registerPage.openSignUpModal();
  const username = await registerPage.register(undefined, password);
  const registerAlert = await registerPage.isRegistrationAlertVisible();
  expect(registerAlert).toContain("Sign up successful");

  // 2. Login
  await loginPage.open();
  await loginPage.openLoginModal();
  await loginPage.login(username, password);
  expect(await loginPage.isLoggedIn()).toContain(username);

  // 3. Select product and add to cart
  await page.goto("https://www.demoblaze.com/");
  await orderPage.selectProduct("Apple monitor 24", "Monitors");
  const cartAlert = await orderPage.addToCart();
  expect(cartAlert).toContain("Product added");

  // 4. Place order
  const orderConfirmation = await orderPage.placeOrder(
    username,
    "Egypt",
    "Cairo",
    "1234567890123456",
    "10",
    "2025"
  );
  expect(orderConfirmation).toContain("Thank you for your purchase!");

  // 5. Logout
  expect(await logoutPage.isLogoutVisible()).toBeTruthy();
  await logoutPage.clickLogout();
  expect(await logoutPage.isLoginVisible()).toBeTruthy();

 console.log(`E2E flow completed successfully for user: ${username}`);
});