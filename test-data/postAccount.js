import { expect } from "@playwright/test";

export default async function postAccount(request, user, expectedStatus) {
    const response = await request.post('/accounts', { data: user });
    const body = await response.json();
    expect(response.status()).toBe(expectedStatus);

    return body;
}