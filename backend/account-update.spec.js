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

    test('Should return status 404 ID id does not exist', async ({ request }) => {
        const wrongAccountID = {
            id: `${account.id}+error`
        }

        const updatedAccount = {
            ...account,
            name: faker.person.fullName(),
            email: faker.internet.email()
        }

        const body = await putAccount(request, wrongAccountID, updatedAccount, 404);
        
        expect(body.error).toBe('Conta não encontrada');
    });

});