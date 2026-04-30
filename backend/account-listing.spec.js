import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import postAccount from "../test-data/postAccount";

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
        const response = await request.get('/accounts');
        const body = await response.json();

            for (const i of body) {
                const response = await request.delete(`/accounts/${body[i].id}`);
                const body = response.json();
                expect(response.status()).toBe(401);
            }
    });

});