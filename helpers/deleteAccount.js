import { expect } from "@playwright/test";

export async function deleteAccount(request, account, expectedStatus) {
    const response = await request.delete(`/accounts/${account.id}`);
    const body = response.json();

    expect(response.status()).toBe(expectedStatus);

    return body;
}