import { Page } from "@playwright/test"
import { LoginPage } from "../pages/Locators/LoginPage";
import { Type } from "../actions/Type";
import { Click } from "../actions/Click";

export class LoginActions {
    private readonly pageObject = new LoginPage();
    private readonly type: Type;
    private readonly click: Click;

    constructor(private readonly page: Page) {
        this.type = new Type(page);
        this.click = new Click(page);
    }

    async typeUsername(username: string) {

        await this.type.input(
            this.pageObject.txtUsername,
            username
        );

    }
    async typePassword(password: string) {

        await this.type.input(
            this.pageObject.txtPassword,
            password
        );
    }
    async clickSignIn() {

        await this.click.button(
            this.pageObject.btnSignIn
        );

    }
    async login(username: string, password: string) {
        await this.typeUsername(username);
        await this.typePassword(password);
        await this.clickSignIn();
    }
}
