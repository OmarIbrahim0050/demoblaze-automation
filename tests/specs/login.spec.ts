import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/registerPage";
import { LoginPage } from "../pages/loginPage";

test.describe("User Login", () => {
  let username: string;
  const password = "123456";

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const registerPage = new RegisterPage(page);

    await registerPage.open();
    await registerPage.openSignUpModal();

    // Generate dynamic username
    username = await registerPage.register(undefined, password);
    const alertMessage = await registerPage.isRegistrationAlertVisible();
    expect(alertMessage).toContain("Sign up successful");

    await page.close();
  });

  test("should login successfully with registered user", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.openLoginModal();
    await loginPage.login(username, password);

    const loggedUser = await loginPage.isLoggedIn();
    expect(loggedUser).toContain(username);
  });
});
