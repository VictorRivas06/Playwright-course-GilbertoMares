import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Market, User, Currency } from "../types";
import marketJson from "../data/markets.json" with { type: "json" };
import userJson from "../data/users.json" with { type: "json" };

const markets = marketJson as Market[];
const users = userJson as User[];

const standardUser = users.find((user) => user.username == "standard_user");
//Guard clause
if (!standardUser) {
  throw new Error(
    "data/users.json does not contain a user with username 'standar_user'.Check the data seed before running ",
  );
}

const CurrencySymbol: Partial<Record<Currency, string>> = {
  // partial le decimos que no necesitamos todos, si no solo algunos
  MXN: "$",
  JPY: "￥",
  //USD: "$",
  //CHF: "CHF"
};

test.describe("Smoke parametrized by market", () => {
  for (const market of markets) {
    test(`TC-${market.code} - login + catalog in market ${market.code}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      //Arrange
      await loginPage.goTo();
      //Act
      await loginPage.loginMarket(standardUser, market.code);
      //Assert
      //await loginPage.verifyLoginError();

      await expect(page).toHaveURL(/\/catalog/);
      const symbol = CurrencySymbol[market.currency]
      console.log(`Simbolo para  ${market.code}, Symbol:'${symbol}'`);

      if (!symbol) return;
      await expect(page.locator("body")).toContainText(symbol);

    });
  }
});