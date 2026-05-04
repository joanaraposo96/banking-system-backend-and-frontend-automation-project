import { expect } from "@playwright/test"

export async function listAccounts(request, expectedStatus) {
    const response = await request.get('/accounts');

    expect(response.status()).toBe(expectedStatus);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();

    return body;
}