import { test, expect } from "@playwright/test"
import { AuthService, BaseService } from "../../services";
import usersJson from "../../data/users.json" with { type: "json" };
import type { User } from "../../types"


const users = usersJson as User[];
const standardUser = users.find((u) => u.username === "standard_user")!;// el ! es para hacer un tipo Guard clause, pero no controlado y me va a mandar un undefined si no ecuentra al user
const API_URL = process.env.API_URL ?? "https://omnipizza-backend.onrender.com"

test.describe("Auth services tests", () => {
    let auth: AuthService;

    test.beforeAll(async () => {
        auth = await AuthService.create(API_URL)
    })

    test("Successful login returns token", async () => {
        const response = await auth.login(standardUser);
        expect(response.access_token).toBeTruthy();
        expect(typeof response.access_token).toBe("string");
    });

    test.afterAll(async () => {
        await auth.dispose();
    })

})


