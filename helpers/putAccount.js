import { expect } from "@playwright/test";

export async function putAccount(request, account, updatedAccount, expectedStatus) {
    const response = await request.put(`/accounts/${account.id}`, { data: updatedAccount });

    expect(response.status()).toBe(expectedStatus);

    const body = await response.json();
    
    return body;
}