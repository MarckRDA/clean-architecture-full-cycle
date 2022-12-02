import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/Address";
import FindCustomerUseCase from "./find.customer.usercase";

describe("Unit Test find customer use case", () => {
  
  const customer = new Customer('123', 'John')
  const address = new Address('Street', 123, 'Zip', 'City')
  customer.changeAddress(address)

  const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    }
  }


  it('Should find a customer', async () => {
    const customerRepository = MockRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = {
        id: '123'
    }

    const output = {
        id: '123',
        name: 'John',
        address: {
            street: 'Street',
            city: 'City',
            number: 123,
            zip: 'Zip'
        }
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })

  it('should not find a customer', async () => {
    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: '123'
    }

    expect(() => {
      return usecase.execute(input)
    }).rejects.toThrow('Customer not found')
  })
});
