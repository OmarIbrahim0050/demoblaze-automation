import { test, expect } from "@playwright/test";
import { OrderPage } from "../pages/orderPage";

test("Place order for Apple Monitor 24 under Monitors category", async ({ page }) => {
  const order = new OrderPage(page);

  await page.goto("https://www.demoblaze.com/");

  await order.selectProduct("Apple monitor 24", "Monitors");

  const alertMsg = await order.addToCart();
  expect(alertMsg).toContain("Product added");

  const confirmation = await order.placeOrder(
    "Omar Ibrahim",
    "Egypt",
    "Cairo",
    "1234567890123456",
    "10",
    "2025"
  );

  expect(confirmation).toContain("Thank you for your purchase!");
});
