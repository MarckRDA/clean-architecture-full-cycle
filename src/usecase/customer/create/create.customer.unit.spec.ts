import CustomerCreateUseCase from "./create.customer.usecase";

const input = {
  name: "John",
  address: {
    street: "Street",
    city: "City",
    number: 123,
    zip: "Zip",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });

  it("should thrown an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);
    input.name = "";
    
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow('Name is required')
  });

  it("should thrown an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);
    input.address.street = ""
    
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow('Street is required')
  });
});
