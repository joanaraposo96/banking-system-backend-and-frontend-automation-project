import { expect, test } from "@playwright/test";
import { createUserData } from "..";
import { postAccount } from "..";

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
    });

});