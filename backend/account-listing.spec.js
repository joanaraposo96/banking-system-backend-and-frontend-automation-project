import { test, expect } from "@playwright/test";
import { postAccount, listAccounts, deleteAccount } from "../api";
import { createUserData } from "../test-data";

test.describe('List all accounts', () => {

    let account;

    test.beforeEach(async ({ request }) => {
        const user = createUserData();
        account = await postAccount(request, user, 201);
    });

    test('Should return all registered accounts', async ({ request }) => {
        await listAccounts(request, 200);
    });

    test('Should return an empty array when there are no accounts registered', async ({ request }) => {
        const accounts = await listAccounts(request, 200);

            for (const account of accounts) {
                await deleteAccount(request, account, 200);
            }

        const body = await listAccounts(request, 200);
        expect(body).toHaveLength(0);
    });

    test('Should return status 404 when the same account is deleted twice', async ({ request }) => {
        await deleteAccount(request, account, 200);
        await deleteAccount(request, account, 404);
    });

});