import { expect } from "@playwright/test"

export default async function getAccount(request, account) {
    const response = await request.get(`/accounts/${account.id}`);
    expect(response.status()).toBe(200);
}