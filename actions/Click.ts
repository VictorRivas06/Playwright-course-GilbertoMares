import { Page, Locator } from '@playwright/test';

export class Click {
    constructor(private readonly page: Page) { }

    async button(locator: string) {
        await this.page.getByRole("button", { name: locator }).click();
    }
}