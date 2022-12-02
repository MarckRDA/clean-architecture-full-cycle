import CustomerFactory from "../../../domain/customer/factory/customer-factory";
import Address from "../../../domain/customer/value-object/Address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "Josua",
  new Address("Street 1", 123, "Zip 1", "City 1")
);

const customer2 = CustomerFactory.createWithAddress(
  "Maria",
  new Address("Street 2", 456, "Zip 2", "City 2")
);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test for listing customer use case", () => {
  it("should list a customer", async () => {
    const repository = MockRepository();
    const useCase = new ListCustomerUseCase(repository);

    const output = await useCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[1].id).toBe(customer2.id);
  });
});
