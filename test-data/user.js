import { faker } from "@faker-js/faker";

export default function createUserData () {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        cpf: `${faker.string.numeric(3)}.${faker.string.numeric(3)}.${faker.string.numeric(3)}-${faker.string.numeric(2)}`,
        initialBalance: faker.number.int({ min: 0, max: 100000 })
    }
}