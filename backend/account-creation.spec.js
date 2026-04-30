test.describe('Account Creation', () => {

    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        cpf: `${faker.string.numeric(3)}.${faker.string.numeric(3)}.${faker.string.numeric(3)}-${faker.string.numeric(2)}`,
        initialBalance: faker.number.float({ max: 100000, fractionDigits: 0}).toLocaleString('pt-PT') // Applies thousands separator (e.g., 100.000)
    }

    test('Successfully register a new account', async ({ request }) => {
        const response = await request.post('/accounts', { data: user })
    });

});