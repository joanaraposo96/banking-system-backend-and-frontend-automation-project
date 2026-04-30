import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe('Account Creation', () => {

    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        cpf: `${faker.string.numeric(3)}.${faker.string.numeric(3)}.${faker.string.numeric(3)}-${faker.string.numeric(2)}`,
        initialBalance: faker.number.int({ min: 0, max: 100000 })
    }

    test('Should create a new account successfully', async ({ request }) => {
        const response = await request.post('/accounts', { data: user });
        const body = await response.json();
        expect(response.status()).toBe(201);
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('balance');
        expect(body).toHaveProperty('createdAt');
    });

    test('Should return status 400 when initial balance is negative', async ({ request }) => {
        const updatedUser = {
            ...user,
            initialBalance: faker.number.int({ min: -100000, max: -1 })
        }

        const response = await request.post('/accounts', { data: updatedUser });
        const body = response.json();
        expect(response.status()).toBe(400);
    });

    test('Should return status 400 when missing mandatory fields', async ({ request }) => {
        const updatedUser = {
            ...user,
            name: ''
        }

        const response = await request.post('/accounts', { data: updatedUser });
        const body = response.json();
        expect(response.status()).toBe(400);
    })

    test('Should return status 400 when cpf is already registered', async ({ request }) => {
        const responseNEW = await request.post('/accounts', { data: user });
        const bodyNEW = await responseNEW.json();

        const updatedUser = {
            ...user,
            cpf: bodyNEW.cpf
        }

        const responseDUPLICATE = await request.post('/accounts', { data: updatedUser });
        const bodyDUPLICATE = responseDUPLICATE.json();
        expect(responseDUPLICATE.status()).toBe(400);
    });

});