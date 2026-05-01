import { expect } from "@playwright/test";

export default async function deleteAccount(request, account) {
    const response = await request.delete(`/delete/${account.id}`);
    expect(response.status()).toBe(200);
}