import { expect } from "@playwright/test"

export async function listAccounts(request, expectedStatus) {
    const response = await request.get('/accounts');
    const body = await response.json();
    expect(response.status()).toBe(expectedStatus);
    return body;
}