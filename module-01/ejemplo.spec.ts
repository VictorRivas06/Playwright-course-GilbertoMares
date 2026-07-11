import { test, expect } from "@playwright/test";

const USERNAME = process.env.TEST_USER_USERNAME ?? "standard_user"
const PASSWORD = process.env.TEST_USER_PASSWORD ?? "pizza123"

//describe es como si fuera mi plan/suite de pruebas
test.describe("Smoke OmniPizza(M01)", () => {
    test("TC-01 - Successful login with valid credentials", async ({ page }) => {
        //Arrange
        await page.goto("/");
        //Act
        await page.getByTestId("username-desktop").fill(USERNAME);
        await page.getByTestId("password-desktop").fill(PASSWORD);
        await page.getByTestId("login-button-desktop").click();
        //Assert
        await expect(page).toHaveURL("/catalog");
        await expect(page).toHaveURL(/\/catalog/) //Se recomienda usar expresiones regular
    })
    test("TC-02 - Caralog shows at least 1 pizza", async ({ page }) => {
        //Arrange
        await page.goto("/");
        //Act
        await page.getByTestId("username-desktop").fill(USERNAME);
        await page.getByTestId("password-desktop").fill(PASSWORD);
        await page.getByTestId("market-MX").click();
        await page.getByTestId("login-button-desktop").click();
        //Assert
        const pizzaCards = page.locator('[data-testid^="pizza-card-"]')
        await expect(pizzaCards.first()).toBeVisible();
        const count = await pizzaCards.count();
        expect(count).toBeGreaterThan(0); //valores bajo 0 son incorrectos o bajo lo que yo coloque  "< 1"
        expect(count).toBeGreaterThanOrEqual(1); // por lo menos sea igual o mayor  "> = 1"
    })
})


