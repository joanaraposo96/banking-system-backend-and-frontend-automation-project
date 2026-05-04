import { expect } from "@playwright/test";

export async function postAccount(request, user, expectedStatus) {
    const response = await request.post('/accounts', { data: user });
    const body = await response.json();
    expect(response.status()).toBe(expectedStatus);
    expect(body).toBeTruthy();
    expect(typeof body).toBe('object');
    return body;
}