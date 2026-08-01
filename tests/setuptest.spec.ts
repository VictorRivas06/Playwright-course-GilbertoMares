import { test } from "../fixtures/omnipizza"

test.describe("Setup & auth", () => {
    test("land on /catalog", async ({ page, catalogPage }) => {
        await page.goto("/catalog");
        await catalogPage.expectLoaded()
        await catalogPage.expectHasPizzas()
    })
})