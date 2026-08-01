import { test as base, expect, Page } from '@playwright/test';
import { LoginPage, CatalogPage, MenuPage, CheckoutPage, ProfilePage, PizzaCustomizerModal, } from "../pages";
import { Market, User } from '../types';
import marketJson from "../data/markets.json" with {type: "json"};
import usersJson from "../data/users.json" with {type: "json"};

const markets = marketJson as Market[];
const users = usersJson as User[];

type PageFixtures = {
    loginPage: LoginPage;
    catalogPage: CatalogPage;
    menuPage: MenuPage;
    checkoutPage: CheckoutPage;
    profilePage: ProfilePage;
    pizzaCustomizerModal: PizzaCustomizerModal;
    standardUser: User;
}

type WorkerFixtures = {
    defaultMarket: Market
}

export const test = base.extend<PageFixtures, WorkerFixtures>({
    //worker fixture, por que cada worker lo va a usar chrome, etc, etc, cada hilo puede traer esa info
    defaultMarket: [async ({ }, use) => {
        const us = markets.find((m) => m.code === "US");
        if (!us) throw new Error("Us market not found in data/markets.json");
        await use(us);
    }, { scope: "worker" }],
    standardUser: async ({ }, use) => {
        const u = users.find((u) => u.username === "standard_user");
        if (!u) throw new Error("standard_user not found in data/users.json");
        await use(u);
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    catalogPage: async ({ page }, use) => {
        await use(new CatalogPage(page))
    },
    menuPage: async ({ page }, use) => {
        await use(new MenuPage(page))
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page))
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page))
    },
    pizzaCustomizerModal: async ({ page }, use) => {
        await use(new PizzaCustomizerModal(page))
    }
});

export { expect };
export type { Market, User };
