import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { createUserData } from "..";
import { postAccount, postDeposit } from "..";
import { createMoneyData } from "../test-data/money";
import { create } from "node:domain";

test.describe('Account depositing', () =>{
    let account;

    test.beforeEach(async ({ request}) => {
        const user = createUserData();
        account = await postAccount(request, user, 201);
    });

    test('Should allow depositing of money into account', async ({ request }) =>{
        const deposit = createMoneyData();

        console.log(deposit);

        const sum = account.balance + deposit.amount;

        const body = await postDeposit(request, account, deposit, 200);

        expect(body.message).toBe('Depósito realizado');
        expect(body.balance).toBe(sum);
    });

    test('Should return status 400 if amount is lower or equal to 0', async ({ request }) =>{
        const deposit = createMoneyData({min: -1000, max: -1});

        const body = await postDeposit(request, account, deposit, 400);

        expect(body.error).toBe('amount deve ser maior que 0');
    });

    test('Should return status 404 if ID does not exist', async ({ request }) =>{
        const updatedAccount = {
            ...account,
            id: `${account.id}_error`
        }

        const deposit = createMoneyData();

        const body = await postDeposit(request, updatedAccount, deposit, 404);

        expect(body.error).toBe('Conta não encontrada');
    });
});