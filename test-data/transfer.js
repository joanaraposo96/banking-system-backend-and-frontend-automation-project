import { faker } from "@faker-js/faker";

export function createTransferData(accountId, amount = undefined, { min = 0, max = 1000 } = {}) {
    return {
        targetId: accountId,
        amount: amount ?? faker.number.int({ min, max })
    }
}