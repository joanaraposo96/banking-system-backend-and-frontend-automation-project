import { expect } from "@playwright/test";

export async function postAccount(request, user, expectedStatus) {
    const response = await request.post('/accounts', { data: user });

    expect(response.status()).toBe(expectedStatus);

    const body = await response.json();

    expect(body).toHaveProperty('id');

    return body;
}