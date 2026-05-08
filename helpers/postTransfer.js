import { expect } from "@playwright/test";

export async function postTransfer(request, account, transfer, expectedStatus) {
    const response = await request.post(`/accounts/${account.id}/transfer`, { data : transfer });

    expect(response.status()).toBe(expectedStatus);

    const body = await response.json();

    return body;
}
