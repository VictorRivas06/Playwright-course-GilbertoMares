import { expect, type Locator } from "@playwright/test"
import { BasePage } from "./BasePage"
import type { CountryCode, User } from "../types"

export class LoginPage extends BasePage {
    readonly path = "/";

    //Object Repository
    private txtUserName: string = "username";
    private txtPassword: string = "password";
    private btnMarket: string = "market-";
    private btnSignIn: string = "login-button";
    private lblError: string = "login-error";

    //Accesor y Mutator - Getter y Setter
    private get usernameInput(): Locator {
        return this.testIdByResponsive(this.txtUserName);
    }

    private get passwordInput(): Locator {
        return this.testIdByResponsive(this.txtPassword);
    }

    private get signInButtonm(): Locator {
        return this.testIdByResponsive(this.btnSignIn);
    }

    private get errorMessage(): Locator {
        return this.testIdByResponsive(this.lblError);
    }

    private marketFlag(countryCode: CountryCode): Locator {
        return this.testIdByResponsive(`${this.btnMarket}${countryCode}`)
    }

    //Acciones en mi pagina
    async goTo(): Promise<void> {
        await this.page.goto(this.path)
    }

    /*async typeUserName(userName: string): Promise<void> {
        this.usernameInput.fill(userName);
    }*/

    async slectMarket(code: CountryCode): Promise<void> {
        await this.marketFlag(code).click();
    }

    async loginAs(user: User): Promise<void> {
        await this.usernameInput.fill(user.username)
        await this.passwordInput.fill(user.password)
        await this.signInButtonm.click();
    }

    async loginMarket(user: User, code: CountryCode): Promise<void> {
        await this.slectMarket(code);
        await this.loginAs(user);
        await this.waitForUrl(/\/catalog/);
    }

    async verifyLoginError(): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
    }
}

