import { expect } from "@playwright/test";

export async function postDeposit(request, account, deposit, expectedStatus) {
    const response = await request.post(`/accounts/${account.id}/deposit`, { data : deposit });

    expect(response.status()).toBe(expectedStatus);

    const body = await response.json();

    return body;
}