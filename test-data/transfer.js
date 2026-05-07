import { faker } from "@faker-js/faker";

export function createTransferData(accountId) {
    return {
        targetId: accountId,
        amount: faker.number.int({ min: 0, max: 1000 })
    }
}