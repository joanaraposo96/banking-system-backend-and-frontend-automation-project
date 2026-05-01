import { expect } from "@playwright/test";

export default async function postAccount(request, user) {
    const response = await request.post('/accounts', { data: user });
    expect(response.status()).toBe(201);
}