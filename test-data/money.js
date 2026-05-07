import { faker } from "@faker-js/faker";

export function createMoneyData({min = 0, max = 1000} = {}) {
    return {
        amount: faker.number.int({ min, max})
    }
}