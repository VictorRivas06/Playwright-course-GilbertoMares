import { test as omnipizaaTest } from "./omnipizza"
import { AuthService } from "../services"
import { expect } from '@playwright/test';

const API_URL = process.env.API_URL ?? "https://omnipizza-backend.onrender.com"

type ApiFixtures = {
    accessToken: string;
}

type ApiWorkerFixctures = {
    authService: AuthService
}

export const test = omnipizaaTest.extend<ApiFixtures, ApiWorkerFixctures>({
    authService: [
        async ({ }, use) => {
            const auth = await AuthService.create(API_URL);
            await use(auth);
            await auth.dispose();
        },
        { scope: "worker" }
    ],

    accessToken: async ({ authService, standardUser }, use) => {
        const { access_token } = await authService.login(standardUser);
        await use(access_token);
    },

})

export { expect };
