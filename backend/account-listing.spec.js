import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import postAccount from "../test-data/postAccount";
import listAccounts from "../test-data/listAccounts";
import deleteAccount from "../test-data/deleteAccount";

test.describe('List all accounts', () => {

    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        cpf: `${faker.string.numeric(3)}.${faker.string.numeric(3)}.${faker.string.numeric(3)}-${faker.string.numeric(2)}`,
        initialBalance: faker.number.int({ min: 0, max: 100000 })
    }

    test.beforeEach(async ({ request }) => {
        postAccount(request, user);
    })

    test('Should return all registered accounts', async ({ request }) => {
        const response = await request.get('/accounts');
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(Array.isArray(body)).toBe(true);
    });

    test('Should return an empty array when there are no accounts registered', async ({ request }) => {
        // 1. Delete all existing accounts
        const accounts = await listAccounts(request);

            for (const account of accounts) {
                const response = await request.delete(`/accounts/${account.id}`);
                expect(response.status()).toBe(200);
            }

        // 2. Request accounts again
        const body = await listAccounts(request);

        // 3. Assert
        expect(Array.isArray(body)).toBe(true);
        expect(body).toHaveLength(0); // → []
    });

    test('Should return status 404 when the same account is deleted twice', async ({ request }) => {
    });

});