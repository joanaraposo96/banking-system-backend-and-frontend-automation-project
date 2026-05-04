import { expect } from "@playwright/test";

export async function getAccount(request, account, expectedStatus) {
    const response = await request.get(`/accounts/${account.id}`);
    const body = await response.json();
    expect(response.status()).toBe(expectedStatus);
    expect(body).toBeTruthy();
    expect(typeof body).toBe('object');
    return body;
}