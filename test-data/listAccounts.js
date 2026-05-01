import { expect } from "@playwright/test"

export default async function getAccount(request) {
    const response = await request.get('/accounts');
    const body = response.json();
    expect(response.status()).toBe(200);
    return body;
}