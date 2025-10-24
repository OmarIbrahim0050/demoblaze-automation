import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/registerPage";

test.describe("User Registration", () => {
  test("should register new user with dynamic username", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.open();
    await registerPage.openSignUpModal();

    const username = await registerPage.register();

    const alertMessage = await registerPage.isRegistrationAlertVisible();

    console.log(`Registered with username: ${username}`);
    expect(alertMessage).toContain("Sign up successful");
  });
});
