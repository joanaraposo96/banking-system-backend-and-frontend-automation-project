import { test, expect } from "@playwright/test";
import { getAccount, postAccount } from "..";
import { createUserData } from "..";

test.describe('Retrieve accounts', () => {

    let account;

    test.beforeEach(async ({ request }) => {
        const user = createUserData();
        account = await postAccount(request, user, 201);
    })

    test('Should return data of a specific account', async ({ request }) => {
        const responseBody = await getAccount(request, account, 200);
        expect(responseBody).toHaveProperty('id', account.id);
        expect(responseBody).toHaveProperty('email', account.email);
    });

});