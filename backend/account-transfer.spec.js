import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { createUserData, createTransferData, putAccount  } from "..";
import { postAccount, postTransfer } from "..";
import { log } from "node:console";


test.describe('Account depositing', () =>{
    let account1;
    let account2;

    test.beforeEach(async ({ request}) => {
        const user1 = createUserData();
        const user2 = createUserData();
        account1 = await postAccount(request, user1, 201);
        account2 = await postAccount(request, user2, 201);
    });

    test('Should allow depositing of money between two accounts', async ({ request }) =>{
        const transfer = createTransferData(account2.id);
        const amount = transfer.amount;

        const body = await postTransfer(request, account1, transfer, 200);

        const totalBalanceAccount1 = account1.balance - amount;
        const totalBalanceAccount2 = account2.balance + amount;

        expect(body.message).toBe('Transferência realizada com sucesso');
        expect(body.sourceBalance).toBe(totalBalanceAccount1);
        expect(body.targetBalance).toBe(totalBalanceAccount2);
    });

    test('Should return status 400 if transferred amount is greater than balance', async ({ request }) => {
        const amount = account1.balance + faker.number.int({ min: 1, max: 100 });

        const transfer = createTransferData(account2.id, amount);

        const body = await postTransfer(request, account1, transfer, 400);

        expect(body.error).toBe('Saldo insuficiente');
    });

    test('Should return status 400 if transferred amount is invalid', async ({ request }) => {
        const transfer = createTransferData(account2.id, 0);

        const body = await postTransfer(request, account1, transfer, 400);

        expect(body.error).toBe('amount deve ser maior que 0');
    });

    test('Should return status 400 if origin account is the same as destination account', async ({ request }) => {
        const transfer = createTransferData(account2.id);

        const body = await postTransfer(request, account2, transfer, 400);

        expect(body.error).toBe('Conta origem e destino não podem ser iguais');
    });

    test('Should return status 404 if account id does not exist', async ({ request }) => {
        const updatedAccount = {
            ...account2,
            id: `${account2.id}_error`
        }

        const transfer = createTransferData(updatedAccount);

        const body = await postTransfer(request, account1, transfer, 404);

        expect(body.error).toBe('Conta destino não encontrada');
    });
});