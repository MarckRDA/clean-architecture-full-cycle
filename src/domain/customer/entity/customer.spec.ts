import Address from "../value-object/Address";
import Customer from "./customer";

describe("Custumer unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer('', 'John');
    }).toThrowError('Id is required')
  });

  it("Should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer('123', '');
    }).toThrowError('Name is required')
  });

  it("Should change name", () => {
    // Arrange
    const customer = new Customer('123', 'John');
    
    // Act
    customer.changeName('Jane')

    // Assert
    expect(customer.name).toBe('Jane')
  });

  it("Should activate customer", () => {
    // Arrange
    const customer = new Customer('123', 'John');
    const address = new Address('Street 1', 123, '12345-678', 'Rio de Janeiro')
    
    // Act
    customer.Address = address
    customer.activate()

    // Assert
    expect(customer.isActive()).toBe(true)
  });

  it("Should deactivate customer", () => {
    // Arrange
    const customer = new Customer('123', 'John');
    
    // Act
    customer.deactivate()

    // Assert
    expect(customer.isActive()).toBe(false)
  });

  it("Should throw an error if customer has not an address when try to activate then", () => {
    expect(() => {
        const customer = new Customer('123', 'John');    
        customer.activate()
    }).toThrowError('Address is mandatory to activate a customer')
  });

  it("Should add reward points", () => {
    const customer = new Customer('123', 'John');
    expect(customer.rewardPoints).toBe(0)
    
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  });

});
