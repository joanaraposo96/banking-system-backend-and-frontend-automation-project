import { expect } from "@playwright/test";

export async function getAccount(request, account, expectedStatus) {
    const response = await request.get(`/accounts/${account.id}`);

    expect(response.status()).toBe(expectedStatus);

    const body = await response.json();

    return body;
}