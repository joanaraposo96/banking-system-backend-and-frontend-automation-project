import { expect } from "@playwright/test";

export async function postTransfer(request, account, transfer) {
    const response = await request.post(`/accounts/${account.id}/transfer`, { data : transfer });

    expect(response.status()).toBe(200);

    const body = response.json();

    return body;
}
