import { test, expect } from "@playwright/test";

const USERNAME = process.env.TEST_USER_USERNAME ?? "standard_user"
const PASSWORD = process.env.TEST_USER_PASSWORD ?? "pizza123"

test.describe("Smoke with Locators (M02)", () => {
    test("TC-02 - Caralog shows at least 1 pizza", async ({ page }) => {
        //Arrange
        await page.goto("/");

        //Act
        const hOneHeader = await page.getByRole("heading", { level: 1 }).textContent();
        console.log(hOneHeader);

        const welcomeHeader = await page.getByRole("heading", { name: "Welcome back!", level: 2 }).textContent(); // ctrl + space para que me aparezcan las opciones que tiene un objeto
        console.log(welcomeHeader);

        const userNameLabel = await page.getByText("USERNAME").textContent();
        console.log(userNameLabel);

        const userNameLabelDOM = await page.getByText("Username").textContent(); //en el DOM esta el texto
        console.log(userNameLabelDOM);

        const textExact = await page.getByText("Please enter your details.", { exact: true }).innerText();
        console.log(textExact);

        await page.getByRole("textbox", { name: "standard_user" }).fill(USERNAME);
        await page.getByPlaceholder("••••••••").fill(PASSWORD);
        await page.getByRole("img", { name: "US flag" }).click();
        await page.getByRole("button", { name: /sign in/i }).click() //on la i es ignorar mayusculas y minisculas
        await page.getByAltText("Pepperoni").click();  //lo busca por el alt de una imagen

        //Assert
        const pizzaCards = page.locator('[data-testid^="pizza-card-"]')
        await expect(pizzaCards.first()).toBeVisible(); //encontrar la primera pizza

        const hawaian = await pizzaCards.nth(2).innerText();  //nth 
        console.log(hawaian);

        const funghi = await pizzaCards.filter({ hasText: "Funghi" }).textContent();
        console.log(funghi)

        const count = await pizzaCards.count();
        expect(count).toBeGreaterThan(0); //valores bajo 0 son incorrectos o bajo lo que yo coloque  "< 1"
        expect(count).toBeGreaterThanOrEqual(1); // por lo menos sea igual o mayor  "> = 1"

        const fourCheese = await page.getByRole("heading", { level: 3 }).filter({ hasText: "Cheese" }).innerHTML();
        console.log(fourCheese)

    })
})


