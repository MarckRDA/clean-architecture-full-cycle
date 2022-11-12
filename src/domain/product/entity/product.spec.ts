import Product from "./product";

describe("Product unit tests", () => {

  it("Should throw error when id is empty", () => {
    expect(() => {
      const product = new Product('', 'Product', 100)
    }).toThrowError('Id is required')
  });

  it("Should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product('123', 'product', -1)
     }).toThrowError('Price must be greater than zero')
  });

  it("Should change name", () => {
    const product = new Product('123', 'product', 15)
    product.changeName('product2')
    expect(product.name).toBe('product2')
  });

  it("Should change price", () => {
    const product = new Product('123', 'product', 15)
    product.changePrice(100)
    expect(product.price).toBe(100)
  });

});
