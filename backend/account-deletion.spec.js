import { expect, test } from "@playwright/test";
import { deleteAccount, postAccount } from "..";
import { createUserData } from "..";

test.describe('Delete accounts', () => {
    let account;

    test.beforeEach(async ({ request }) => {
        const user = createUserData();
        account = await postAccount(request, user, 201);
    });

    test('Should allow deleting an account from system', async ({ request }) => {
        const body = await deleteAccount(request, account, 200);
        
        expect(body.message).toBe('Conta removida com sucesso');
    });

    test('Should return status 404 if ID does not exist', async ({ request }) => {
        const updatedAccount = {
            ...account,
            id: `${account.id}_error`
        }

        const body = await deleteAccount(request, updatedAccount, 404);

        expect(body.error).toBe('Conta não encontrada');
    });
});

