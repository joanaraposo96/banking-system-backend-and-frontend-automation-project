import { expect, test } from "@playwright/test";
import { createUserData, createTransferData  } from "..";
import { postAccount, postTransfer } from "..";


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

        const body = await postTransfer(request, account1, transfer, 201);

        const totalBalanceAccount1 = account1.balance - transfer.amount;
        const totalBalanceAccount2 = account2.balance + transfer.amount;

        expect(body.message).toBe('Transferência realizada com sucesso');
        expect(body.sourceBalance).toBe(totalBalanceAccount1);
        expect(body.targetBalance).toBe(totalBalanceAccount2);
    });

});