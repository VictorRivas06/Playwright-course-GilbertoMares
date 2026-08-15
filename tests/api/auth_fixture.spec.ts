import { test, expect } from "../../fixtures/api";

test.describe("Auth Services with Fixture", () => {
    test("Successful login", async ({ authService, standardUser }) => {
        const response = await authService.login(standardUser);
        expect(response.access_token).toBeTruthy();
        expect(typeof response.access_token).toBe("string");
    })
})