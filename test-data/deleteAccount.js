import { expect } from "@playwright/test";

export default async function deleteAccount(request, account, expectedStatus) {
    const response = await request.delete(`/accounts/${account.id}`);
    expect(response.status()).toBe(expectedStatus);
}