import { Page, Locator } from "@playwright/test"

export class BasePage {
    //Constructor explicito
    constructor(protected readonly page: Page) { }

    protected testIdByResponsive(base: string): Locator {
        const size = this.page.viewportSize();
        const suffix = size && size.width < 768 ? "-responsive" : "-desktop";
        return this.page.getByTestId(`${base}${suffix}`).or(this.page.getByTestId(base).first());
    }

    protected async waitForUrl(UrlPattern: RegExp, timeout = 15_000): Promise<void> { //si tengo async, necesito una promesa
        await this.page.waitForURL(UrlPattern, { timeout });
    }
    //cambiar el nombre de mis screenshot para tener sentido en mis capturas de pantalla
    async screenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `test-results/${name}.png` })
    }
}

