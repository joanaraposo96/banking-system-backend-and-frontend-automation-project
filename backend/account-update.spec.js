import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { createUserData } from "../test-data";
import { postAccount } from "../api";
import { putAccount } from "../api";


test.describe('Update accounts', () => {

    let account;

    test.beforeEach(async ({ request }) => {
        const user = createUserData();
        account = await postAccount(request, user, 201);
    })

    test('Should allow updating account email and name', async ({ request }) => {
        const updatedAccount = {
            ...account,
            name: faker.person.fullName(),
            email: faker.internet.email()
        }

        const body = await putAccount(request, account, updatedAccount, 200);

        expect(body.name).toBe(updatedAccount.name);
        expect(body.email).toBe(updatedAccount.email);
    });

    test('Should not allow updating cpf or balance', async ({ request }) => {
        const updatedAccount = {
            ...account,
            cpf: `${faker.string.numeric(3)}.${faker.string.numeric(3)}.${faker.string.numeric(3)}-${faker.string.numeric(2)}`,
            balance: faker.number.int({ min: 0, max: 100000 })
        }

        const body = await putAccount(request, account, updatedAccount, 400);

        console.log(body);
    });

});