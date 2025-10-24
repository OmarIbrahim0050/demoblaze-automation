import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/registerPage";
import { LoginPage } from "../pages/loginPage";
import { LogoutPage } from "../pages/logoutPage";

test.describe("User Logout", () => {
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

  test("User can log out", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const logoutPage = new LogoutPage(page);

    await loginPage.open();
    await loginPage.openLoginModal();
    await loginPage.login(username, password);

    await page.waitForSelector("#nameofuser", { timeout: 10000 });
    
    await page.waitForSelector("#logout2", { timeout: 10000 });
    expect(await logoutPage.isLogoutVisible()).toBeTruthy();

    await logoutPage.clickLogout();

    await page.waitForSelector("#login2", { timeout: 10000 });
    expect(await logoutPage.isLoginVisible()).toBeTruthy();
    
    console.log(`Logout successful for user: ${username}`);
  });
});