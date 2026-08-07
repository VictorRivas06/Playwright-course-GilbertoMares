import { Page } from "@playwright/test";

export class Type {

    constructor(protected readonly page: Page) { }

    async input(locator: string, text: string) {

        const element = this.page.getByPlaceholder(locator);
        await element.fill(text);

    }

}