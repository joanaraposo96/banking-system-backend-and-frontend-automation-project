import { test, expect } from "@playwright/test";
import postAccount from "../test-data/postAccount";
import listAccounts from "../test-data/listAccounts";
import deleteAccount from "../test-data/deleteAccount";
import createUserData from "../test-data/user";

test.describe('List all accounts', () => {

    let account;

    test.beforeEach(async ({ request }) => {
        const user = createUserData();
        account = await postAccount(request, user, 201);
    })

    test('Should return all registered accounts', async ({ request }) => {
        const response = await request.get('/accounts');
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(Array.isArray(body)).toBe(true);
    });

    test('Should return an empty array when there are no accounts registered', async ({ request }) => {
        const accounts = await listAccounts(request);

            for (const account of accounts) {
                const response = await request.delete(`/accounts/${account.id}`);
                expect(response.status()).toBe(200);
            }

        const body = await listAccounts(request);

        expect(Array.isArray(body)).toBe(true);
        expect(body).toHaveLength(0); // → []
    });

    test('Should return status 404 when the same account is deleted twice', async ({ request }) => {
        await deleteAccount(request, account, 200);
        await deleteAccount(request, account, 404);
    });

});