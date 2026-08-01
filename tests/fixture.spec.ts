import { expect, test } from "../fixtures/omnipizza"

test.describe("Fixture inject POM", () => {
    test("The fixture deliver login/catalog pages ready to use", async ({ loginPage, catalogPage, standardUser, defaultMarket }) => {
        //Arrange
        await loginPage.goto();
        //Act 
        await loginPage.loginInMarket(standardUser, defaultMarket.code)
        //Assert
        await catalogPage.expectLoaded();
        await catalogPage.expectHasPizzas();
    })

    //Obligar a que me traiga un 500, estoy haciendo un MOCK no un test de API, solo estoy forzando la señal
    test("UI reacts when the API respond 500", async ({ page, loginPage, standardUser, defaultMarket }) => {
        await page.route("**/api/pizaa*", (route) => {
            route.fulfill({
                status: 500,
                contentType: "application/json",
                body: JSON.stringify({ detail: "Internal Server Error (moked)" })
            });
        })
        await loginPage.loginInMarket(standardUser, defaultMarket.code)
        await expect(page.locator("body")).toBeVisible
    })
})