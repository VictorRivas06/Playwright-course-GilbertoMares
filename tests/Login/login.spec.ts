import { test } from "@playwright/test";
import { LoginActions } from "../../AppAccionts/LoginActions"

test("Successful Login", async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");

    const login = new LoginActions(page);

    await login.login(
        "standard_user",
        "secret_sauce"
    );

});